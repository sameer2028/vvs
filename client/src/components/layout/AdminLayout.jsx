import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  LogOut, 
  Menu,
  X,
  Folder,
  UserCheck,
  Settings
} from 'lucide-react';
import { useState } from 'react';
import logoImage from '../../assets/favicon.png';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Allocations', path: '/admin/allocations', icon: UserCheck },
    { name: 'Committees', path: '/admin/committees', icon: Folder },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-screen w-full bg-surface flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static h-full w-64 bg-navy text-white flex flex-col z-30
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="bg-white/10 p-1.5 rounded-lg border border-white/20 flex items-center gap-2">
            <img src={logoImage} alt="VVS Admin" className="h-8 w-auto object-contain" />
            <span className="font-bold text-lg tracking-tight text-white" style={{ fontFamily: 'var(--font-heading)' }}>Admin</span>
          </div>
          <button className="lg:hidden text-slate-light hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                ${isActive ? 'bg-gold text-navy font-medium' : 'text-slate-light hover:bg-navy-light hover:text-white'}
              `}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-light mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gold-subtle flex items-center justify-center text-navy font-bold text-sm">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-slate-light capitalize">{user?.role?.replace('_', ' ')}</div>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-light hover:text-error hover:bg-error/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-border p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="VVS Admin" className="h-8 w-auto object-contain" />
            <span className="font-bold text-lg text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Admin</span>
          </div>
          <button className="p-2 text-navy hover:bg-surface rounded-lg" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
