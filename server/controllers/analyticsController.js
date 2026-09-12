import AnalyticsLog from '../models/Analytics.js';

// @desc    Track a page view
// @route   POST /api/analytics/track
// @access  Public
export const trackPageView = async (req, res) => {
  try {
    const { path, visitorId, referrer } = req.body;

    if (!visitorId) {
      return res.status(400).json({ message: 'Visitor ID is required' });
    }

    // Do not track admin path pings
    if (path && (path.startsWith('/admin') || path.startsWith('/api'))) {
      return res.json({ success: true, ignored: true });
    }

    const userAgent = req.headers['user-agent'] || '';

    await AnalyticsLog.create({
      path: path || '/',
      visitorId,
      userAgent,
      referrer: referrer || req.headers['referer'] || ''
    });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    res.status(500).json({ message: 'Error logging page view' });
  }
};

// @desc    Get detailed website traffic analytics
// @route   GET /api/analytics/stats
// @access  Private/Admin
export const getAnalyticsStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalPageViews,
      uniqueVisitorsArr,
      todayPageViews,
      todayUniqueVisitorsArr,
      topPages
    ] = await Promise.all([
      AnalyticsLog.countDocuments(),
      AnalyticsLog.distinct('visitorId'),
      AnalyticsLog.countDocuments({ createdAt: { $gte: startOfToday } }),
      AnalyticsLog.distinct('visitorId', { createdAt: { $gte: startOfToday } }),
      AnalyticsLog.aggregate([
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
        { $project: { _id: 0, path: '$_id', count: 1 } }
      ])
    ]);

    res.json({
      totalPageViews,
      uniqueVisitors: uniqueVisitorsArr.length,
      todayPageViews,
      todayUniqueVisitors: todayUniqueVisitorsArr.length,
      topPages
    });
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    res.status(500).json({ message: 'Server Error fetching analytics stats' });
  }
};

// @desc    Get detailed analytics for the dedicated analytics page
// @route   GET /api/analytics/detailed
// @access  Private/Admin
export const getDetailedAnalytics = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    // Run all aggregations in parallel
    const [
      totalPageViews,
      uniqueVisitorsArr,
      todayPageViews,
      todayUniqueVisitorsArr,
      dailyTrend,
      hourlyDistribution,
      allPages,
      topReferrers,
      recentActivity,
      firstLog
    ] = await Promise.all([
      // Summary stats
      AnalyticsLog.countDocuments(),
      AnalyticsLog.distinct('visitorId'),
      AnalyticsLog.countDocuments({ createdAt: { $gte: startOfToday } }),
      AnalyticsLog.distinct('visitorId', { createdAt: { $gte: startOfToday } }),

      // Daily page views for last 30 days
      AnalyticsLog.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            views: { $sum: 1 },
            uniqueVisitors: { $addToSet: '$visitorId' }
          }
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            views: 1,
            uniqueVisitors: { $size: '$uniqueVisitors' }
          }
        },
        { $sort: { date: 1 } }
      ]),

      // Hourly distribution (0-23)
      AnalyticsLog.aggregate([
        {
          $group: {
            _id: { $hour: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            hour: '$_id',
            count: 1
          }
        },
        { $sort: { hour: 1 } }
      ]),

      // All pages breakdown
      AnalyticsLog.aggregate([
        {
          $group: {
            _id: '$path',
            views: { $sum: 1 },
            uniqueVisitors: { $addToSet: '$visitorId' },
            lastVisit: { $max: '$createdAt' }
          }
        },
        {
          $project: {
            _id: 0,
            path: '$_id',
            views: 1,
            uniqueVisitors: { $size: '$uniqueVisitors' },
            lastVisit: 1
          }
        },
        { $sort: { views: -1 } }
      ]),

      // Top referrers
      AnalyticsLog.aggregate([
        { $match: { referrer: { $ne: '' } } },
        {
          $group: {
            _id: '$referrer',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            referrer: '$_id',
            count: 1
          }
        }
      ]),

      // Recent activity (last 20)
      AnalyticsLog.find()
        .sort({ createdAt: -1 })
        .limit(20)
        .select('path visitorId createdAt userAgent -_id')
        .lean(),

      // First log for calculating days active
      AnalyticsLog.findOne().sort({ createdAt: 1 }).select('createdAt').lean()
    ]);

    // Calculate average views per day
    const daysActive = firstLog
      ? Math.max(1, Math.ceil((Date.now() - new Date(firstLog.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;
    const avgViewsPerDay = Math.round(totalPageViews / daysActive);

    // Device breakdown from recent user agents (sample from all logs)
    const deviceSample = await AnalyticsLog.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          mobile: {
            $sum: {
              $cond: [
                {
                  $regexMatch: {
                    input: '$userAgent',
                    regex: /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i
                  }
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const deviceBreakdown = deviceSample.length > 0
      ? {
          mobile: deviceSample[0].mobile,
          desktop: deviceSample[0].total - deviceSample[0].mobile,
          total: deviceSample[0].total
        }
      : { mobile: 0, desktop: 0, total: 0 };

    // Fill in missing days for the daily trend (ensures all 30 days appear)
    const filledDailyTrend = [];
    const trendMap = new Map(dailyTrend.map(d => [d.date, d]));
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      filledDailyTrend.push(
        trendMap.get(dateStr) || { date: dateStr, views: 0, uniqueVisitors: 0 }
      );
    }

    // Fill in missing hours (0-23)
    const hourMap = new Map(hourlyDistribution.map(h => [h.hour, h.count]));
    const filledHourly = [];
    for (let h = 0; h < 24; h++) {
      filledHourly.push({ hour: h, count: hourMap.get(h) || 0 });
    }

    res.json({
      summary: {
        totalPageViews,
        uniqueVisitors: uniqueVisitorsArr.length,
        todayPageViews,
        todayUniqueVisitors: todayUniqueVisitorsArr.length,
        avgViewsPerDay,
        daysActive
      },
      dailyTrend: filledDailyTrend,
      hourlyDistribution: filledHourly,
      allPages,
      topReferrers,
      deviceBreakdown,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching detailed analytics:', error);
    res.status(500).json({ message: 'Server Error fetching detailed analytics' });
  }
};
