import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Clock, Eye, Globe, Activity, TrendingUp } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { useAuth } from '../../context/AuthContext';
import { adminFetch } from '../../utils/adminFetch';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    verifiedPayments: 0,
    pendingPayments: 0,
    totalCommittees: 0,
    totalPageViews: 0,
    uniqueVisitors: 0,
    todayPageViews: 0,
    topPages: [],
    recentRegistrations: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/dashboard`);
        if (!response.ok) throw new Error('Failed to fetch dashboard stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-error bg-error/10 p-4 rounded-xl">{error}</div>;
  }

  const maxPageViews = stats.topPages && stats.topPages.length > 0
    ? Math.max(...stats.topPages.map(p => p.count))
    : 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
          Welcome back, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-slate mt-1">Here's an overview of VVS 2.0 registrations and website traffic.</p>
      </div>

      {/* Website Traffic Analytics Cards */}
      <div>
        <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-gold" /> Website Traffic & Visitors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Page Views" 
            value={stats.totalPageViews || 0} 
            icon={Eye} 
          />
          <StatCard 
            title="Unique Visitors" 
            value={stats.uniqueVisitors || 0} 
            icon={Globe} 
          />
          <StatCard 
            title="Today's Page Views" 
            value={stats.todayPageViews || 0} 
            icon={TrendingUp} 
            trend={stats.todayPageViews > 0 ? 'up' : null}
            trendValue={stats.todayPageViews > 0 ? 'Active Today' : ''}
          />
        </div>
      </div>

      {/* Registration Stats Cards */}
      <div>
        <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-navy-light" /> Delegate Registrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Registrations" 
            value={stats.totalRegistrations} 
            icon={Users}
          />
          <StatCard 
            title="Pending Verifications" 
            value={stats.pendingPayments} 
            icon={Clock} 
            trend={stats.pendingPayments > 0 ? 'up' : null}
            trendValue={stats.pendingPayments > 0 ? 'Requires action' : ''}
          />
          <StatCard 
            title="Verified Delegates" 
            value={stats.verifiedPayments} 
            icon={CheckCircle} 
          />
          <StatCard 
            title="Committees" 
            value={stats.totalCommittees} 
            icon={FileText} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Registrations Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-navy text-lg">Recent Registrations</h2>
            <a href="/admin/registrations" className="text-sm text-gold hover:text-gold-dark font-medium transition-colors">
              View all &rarr;
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-navy">
              <thead className="bg-surface text-slate uppercase text-xs">
                <tr>
                  <th className="px-5 py-3 font-medium">Delegate</th>
                  <th className="px-5 py-3 font-medium">Reg ID</th>
                  <th className="px-5 py-3 font-medium">Institution</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {stats.recentRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate">No registrations yet.</td>
                  </tr>
                ) : (
                  stats.recentRegistrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-5 py-4 font-medium">{reg.fullName}</td>
                      <td className="px-5 py-4 font-mono text-xs">{reg.registrationId}</td>
                      <td className="px-5 py-4 text-slate">{reg.institution}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.status === 'payment_verified' ? 'bg-success/10 text-success' :
                          reg.status === 'payment_pending' ? 'bg-warning/10 text-warning' :
                          'bg-slate/10 text-slate-dark'
                        }`}>
                          {reg.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Visited Pages Widget */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-bold text-navy text-lg mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold" /> Popular Pages
          </h2>
          {(!stats.topPages || stats.topPages.length === 0) ? (
            <p className="text-slate text-sm py-4 text-center">No visitor data recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {stats.topPages.map((page, index) => {
                const percentage = Math.round((page.count / maxPageViews) * 100);
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-mono text-xs text-navy font-semibold truncate max-w-[180px]">
                        {page.path}
                      </span>
                      <span className="text-slate text-xs font-medium">{page.count} views</span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gold h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

