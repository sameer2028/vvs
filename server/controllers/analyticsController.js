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
