export default function StatCard({ title, value, icon: Icon, trend, trendValue, onClick }) {
  return (
    <div 
      className={`bg-white rounded-xl border border-border p-5 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-slate text-sm font-medium">{title}</div>
        <div className="p-2 rounded-lg bg-surface text-navy">
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div 
          className="text-3xl font-bold text-navy"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {value}
        </div>
        
        {trend && (
          <div className={`text-xs font-medium flex items-center gap-1 ${
            trend === 'up' ? 'text-success' : 
            trend === 'down' ? 'text-error' : 
            'text-slate'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
}
