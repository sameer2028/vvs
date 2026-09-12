import { useState, useEffect, useMemo } from 'react';
import {
  BarChart3, Eye, Globe, TrendingUp, Users, Clock, RefreshCw,
  Search, Monitor, Smartphone, ExternalLink, Activity, Calendar,
  ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';
import { adminFetch } from '../../utils/adminFetch';

// Page name map for friendly display
const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About',
  '/committees': 'Committees',
  '/register': 'Register',
  '/venue': 'Venue',
  '/schedule': 'Schedule',
  '/awards': 'Awards',
  '/team': 'Team',
  '/vvs-1': 'VVS 1.0 Gallery',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/delegate': 'Delegate Portal',
  '/delegate/login': 'Delegate Login',
  '/delegate/payment': 'Delegate Payment',
};

function getPageName(path) {
  if (PAGE_NAMES[path]) return PAGE_NAMES[path];
  if (path.startsWith('/committees/')) {
    const slug = path.replace('/committees/', '');
    return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  return path;
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num?.toString() || '0';
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function isMobileUA(ua) {
  return /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua || '');
}

// ─── Animated Counter ──────────────────────────────────
function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return formatNumber(display);
}

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('views');
  const [sortDir, setSortDir] = useState('desc');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      const response = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/analytics/detailed`);
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Filtered and sorted pages
  const filteredPages = useMemo(() => {
    if (!data?.allPages) return [];
    let pages = [...data.allPages];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      pages = pages.filter(p =>
        p.path.toLowerCase().includes(q) ||
        getPageName(p.path).toLowerCase().includes(q)
      );
    }
    pages.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
    return pages;
  }, [data?.allPages, searchQuery, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate text-sm">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error bg-error/10 p-6 rounded-xl border border-error/20 text-center">
        <p className="font-medium">{error}</p>
        <button
          onClick={() => fetchData()}
          className="mt-3 px-4 py-2 bg-error text-white rounded-lg text-sm font-medium hover:bg-error/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const { summary, dailyTrend, hourlyDistribution, topReferrers, deviceBreakdown, recentActivity } = data;
  const maxDailyViews = Math.max(...dailyTrend.map(d => d.views), 1);
  const maxHourlyCount = Math.max(...hourlyDistribution.map(h => h.count), 1);
  const totalPages = data.allPages?.length || 0;

  // Calculate yesterday's views for comparison
  const todayIdx = dailyTrend.length - 1;
  const yesterdayViews = todayIdx > 0 ? dailyTrend[todayIdx - 1].views : 0;
  const todayChange = yesterdayViews > 0
    ? Math.round(((summary.todayPageViews - yesterdayViews) / yesterdayViews) * 100)
    : 0;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold text-navy flex items-center gap-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <div className="p-2.5 rounded-xl bg-gold/10 text-gold">
              <BarChart3 className="w-7 h-7" />
            </div>
            Website Analytics
          </h1>
          <p className="text-slate mt-1 text-sm">
            Detailed traffic insights for all public pages
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-slate hidden sm:block">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-navy hover:bg-surface transition-all shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ─── Summary Cards ──────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            label: 'Total Views',
            value: summary.totalPageViews,
            icon: Eye,
            color: 'text-gold',
            bgColor: 'bg-gold/10'
          },
          {
            label: 'Unique Visitors',
            value: summary.uniqueVisitors,
            icon: Users,
            color: 'text-navy',
            bgColor: 'bg-navy/10'
          },
          {
            label: "Today's Views",
            value: summary.todayPageViews,
            icon: TrendingUp,
            color: 'text-success',
            bgColor: 'bg-success/10',
            change: todayChange
          },
          {
            label: "Today's Visitors",
            value: summary.todayUniqueVisitors,
            icon: Globe,
            color: 'text-info',
            bgColor: 'bg-info/10'
          },
          {
            label: 'Avg Views/Day',
            value: summary.avgViewsPerDay,
            icon: Activity,
            color: 'text-warning',
            bgColor: 'bg-warning/10'
          },
          {
            label: 'Pages Tracked',
            value: totalPages,
            icon: Calendar,
            color: 'text-slate-dark',
            bgColor: 'bg-slate/10'
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-border p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate uppercase tracking-wider">{card.label}</span>
              <div className={`p-1.5 rounded-lg ${card.bgColor} ${card.color} transition-transform group-hover:scale-110`}>
                <card.icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div
              className="text-2xl font-bold text-navy"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <AnimatedNumber value={card.value} />
            </div>
            {card.change !== undefined && card.change !== 0 && (
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${card.change > 0 ? 'text-success' : 'text-error'}`}>
                {card.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(card.change)}% vs yesterday
              </div>
            )}
            {card.change === 0 && card.label === "Today's Views" && (
              <div className="flex items-center gap-1 mt-1 text-xs font-medium text-slate">
                <Minus className="w-3 h-3" />
                Same as yesterday
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ─── Daily Trend Chart ──────────────────────── */}
      <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" />
              Traffic Trend
            </h2>
            <p className="text-xs text-slate mt-0.5">Daily page views — last 30 days</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-gold inline-block"></span>
              Views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-navy/30 inline-block"></span>
              Unique
            </span>
          </div>
        </div>

        <div className="relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[10px] text-slate font-mono">
            <span>{formatNumber(maxDailyViews)}</span>
            <span>{formatNumber(Math.round(maxDailyViews / 2))}</span>
            <span>0</span>
          </div>

          {/* Chart Area */}
          <div className="ml-12 overflow-x-auto">
            <div className="flex items-end gap-[3px] min-w-[600px]" style={{ height: '200px' }}>
              {dailyTrend.map((day, i) => {
                const heightPct = maxDailyViews > 0 ? (day.views / maxDailyViews) * 100 : 0;
                const uniquePct = maxDailyViews > 0 ? (day.uniqueVisitors / maxDailyViews) * 100 : 0;
                const isToday = i === dailyTrend.length - 1;
                const dateObj = new Date(day.date + 'T00:00:00');
                const dayLabel = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-0 group relative"
                    style={{ minWidth: '16px' }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block z-20 pointer-events-none">
                      <div className="bg-navy text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                        <div className="font-semibold">{dayLabel}</div>
                        <div>{day.views} views · {day.uniqueVisitors} unique</div>
                      </div>
                    </div>

                    {/* Bar container */}
                    <div className="w-full flex items-end justify-center gap-[1px]" style={{ height: '180px' }}>
                      {/* Views bar */}
                      <div
                        className={`flex-1 rounded-t-sm transition-all duration-500 ease-out ${
                          isToday ? 'bg-gold' : 'bg-gold/60 group-hover:bg-gold'
                        }`}
                        style={{
                          height: `${Math.max(heightPct, day.views > 0 ? 2 : 0)}%`,
                          animationDelay: `${i * 20}ms`,
                          maxWidth: '10px'
                        }}
                      ></div>
                      {/* Unique visitors bar */}
                      <div
                        className="flex-1 rounded-t-sm bg-navy/20 group-hover:bg-navy/40 transition-all duration-500 ease-out"
                        style={{
                          height: `${Math.max(uniquePct, day.uniqueVisitors > 0 ? 2 : 0)}%`,
                          animationDelay: `${i * 20 + 50}ms`,
                          maxWidth: '10px'
                        }}
                      ></div>
                    </div>

                    {/* X label (show every 5th day + last day) */}
                    {(i % 5 === 0 || isToday) && (
                      <span className="text-[9px] text-slate mt-1 font-mono whitespace-nowrap">
                        {dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Hourly Heatmap + Devices + Referrers ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5 shadow-sm">
          <h2 className="text-lg font-bold text-navy flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-gold" />
            Peak Hours
          </h2>
          <p className="text-xs text-slate mb-4">Traffic distribution by hour of day</p>

          <div className="flex items-end gap-[3px]" style={{ height: '120px' }}>
            {hourlyDistribution.map((h, i) => {
              const pct = maxHourlyCount > 0 ? (h.count / maxHourlyCount) * 100 : 0;
              const isPeak = h.count === maxHourlyCount && h.count > 0;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center group relative"
                  style={{ minWidth: '12px' }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-1 hidden group-hover:block z-20 pointer-events-none">
                    <div className="bg-navy text-white text-[10px] px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
                      {h.hour}:00 — {h.count} views
                    </div>
                  </div>
                  <div
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      isPeak
                        ? 'bg-gold'
                        : pct > 60
                        ? 'bg-gold/70 group-hover:bg-gold'
                        : pct > 30
                        ? 'bg-gold/40 group-hover:bg-gold/60'
                        : 'bg-gold/15 group-hover:bg-gold/30'
                    }`}
                    style={{
                      height: `${Math.max(pct, h.count > 0 ? 4 : 1)}%`
                    }}
                  ></div>
                  {/* Label for every 3rd hour */}
                  {h.hour % 3 === 0 && (
                    <span className="text-[9px] text-slate mt-1 font-mono">
                      {h.hour.toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Peak hour highlight */}
          {maxHourlyCount > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate bg-surface rounded-lg px-3 py-2">
              <Activity className="w-3.5 h-3.5 text-gold" />
              <span>
                Peak hour: <strong className="text-navy">
                  {hourlyDistribution.find(h => h.count === maxHourlyCount)?.hour}:00
                </strong> with {maxHourlyCount} views
              </span>
            </div>
          )}
        </div>

        {/* Devices + Referrers */}
        <div className="space-y-6">
          {/* Device Breakdown */}
          <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <h2 className="text-sm font-bold text-navy flex items-center gap-2 mb-4">
              <Monitor className="w-4 h-4 text-gold" />
              Devices
            </h2>
            {deviceBreakdown.total > 0 ? (
              <div className="space-y-3">
                {[
                  { label: 'Desktop', value: deviceBreakdown.desktop, icon: Monitor, color: 'bg-navy' },
                  { label: 'Mobile', value: deviceBreakdown.mobile, icon: Smartphone, color: 'bg-gold' },
                ].map((dev, i) => {
                  const pct = Math.round((dev.value / deviceBreakdown.total) * 100);
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="flex items-center gap-2 text-navy font-medium">
                          <dev.icon className="w-3.5 h-3.5 text-slate" />
                          {dev.label}
                        </span>
                        <span className="text-slate font-mono text-xs">{pct}% · {dev.value}</span>
                      </div>
                      <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                        <div
                          className={`${dev.color} h-full rounded-full transition-all duration-700 ease-out`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate text-xs text-center py-3">No device data yet</p>
            )}
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
            <h2 className="text-sm font-bold text-navy flex items-center gap-2 mb-4">
              <ExternalLink className="w-4 h-4 text-gold" />
              Top Referrers
            </h2>
            {topReferrers.length > 0 ? (
              <div className="space-y-2.5">
                {topReferrers.slice(0, 6).map((ref, i) => {
                  let displayName;
                  try {
                    displayName = new URL(ref.referrer).hostname;
                  } catch {
                    displayName = ref.referrer.slice(0, 30);
                  }
                  return (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-navy truncate max-w-[160px] font-mono text-xs" title={ref.referrer}>
                        {displayName}
                      </span>
                      <span className="text-slate text-xs font-medium ml-2 shrink-0">{ref.count}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate text-xs text-center py-3">No referrer data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── All Pages Table ────────────────────────── */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-navy flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              All Pages
            </h2>
            <p className="text-xs text-slate mt-0.5">{totalPages} pages tracked</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface text-slate uppercase text-xs border-b border-border">
              <tr>
                <th className="px-5 py-3 font-medium">Page</th>
                <th
                  className="px-5 py-3 font-medium cursor-pointer hover:text-navy transition-colors select-none"
                  onClick={() => handleSort('views')}
                >
                  <span className="flex items-center gap-1">
                    Views
                    {sortField === 'views' && (
                      <span className="text-gold">{sortDir === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </span>
                </th>
                <th
                  className="px-5 py-3 font-medium cursor-pointer hover:text-navy transition-colors select-none"
                  onClick={() => handleSort('uniqueVisitors')}
                >
                  <span className="flex items-center gap-1">
                    Unique
                    {sortField === 'uniqueVisitors' && (
                      <span className="text-gold">{sortDir === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </span>
                </th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Share</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-slate">
                    {searchQuery ? 'No pages match your search.' : 'No page data recorded yet.'}
                  </td>
                </tr>
              ) : (
                filteredPages.map((page, i) => {
                  const sharePct = summary.totalPageViews > 0
                    ? Math.round((page.views / summary.totalPageViews) * 100)
                    : 0;
                  return (
                    <tr key={i} className="hover:bg-surface/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col">
                          <span className="font-medium text-navy">{getPageName(page.path)}</span>
                          <span className="text-[11px] text-slate font-mono">{page.path}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-navy">{page.views.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-slate">{page.uniqueVisitors.toLocaleString()}</td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-surface rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gold h-full rounded-full transition-all duration-500"
                              style={{ width: `${sharePct}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate font-mono">{sharePct}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate text-xs hidden sm:table-cell">
                        {timeAgo(page.lastVisit)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Recent Activity Feed ──────────────────── */}
      <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
        <h2 className="text-lg font-bold text-navy flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-gold" />
          Recent Activity
          <span className="ml-auto flex items-center gap-1.5 text-xs font-normal text-slate">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            Live
          </span>
        </h2>

        {recentActivity.length === 0 ? (
          <p className="text-slate text-sm text-center py-6">No activity recorded yet.</p>
        ) : (
          <div className="space-y-0 divide-y divide-border/60">
            {recentActivity.map((event, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 group hover:bg-surface/30 -mx-2 px-2 rounded-lg transition-colors"
              >
                {/* Icon */}
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isMobileUA(event.userAgent) ? 'bg-gold/10 text-gold' : 'bg-navy/10 text-navy'
                }`}>
                  {isMobileUA(event.userAgent) ? (
                    <Smartphone className="w-3.5 h-3.5" />
                  ) : (
                    <Monitor className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Page info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-navy text-sm truncate">
                      {getPageName(event.path)}
                    </span>
                    <span className="text-[10px] text-slate font-mono hidden sm:block">{event.path}</span>
                  </div>
                </div>

                {/* Visitor snippet */}
                <span className="text-[10px] font-mono text-slate/60 hidden md:block">
                  {event.visitorId?.slice(0, 10)}…
                </span>

                {/* Time */}
                <span className="text-xs text-slate shrink-0">{timeAgo(event.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
