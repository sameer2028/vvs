import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    verifiedPayments: 0,
    pendingPayments: 0,
    totalCommittees: 0,
    recentRegistrations: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/dashboard`, { credentials: 'include',  credentials: 'include' });
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
          Welcome back, {user?.name.split(' ')[0]}
        </h1>
        <p className="text-slate mt-1">Here's an overview of VVS 2.0 registrations.</p>
      </div>

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

      <div className="bg-white rounded-xl border border-border overflow-hidden">
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
    </div>
  );
}
