import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Home } from 'lucide-react';
import logoImage from '../../assets/favicon.png';

export default function DelegateLayout() {
  const { delegate, delegateLogout } = useAuth();

  const handleLogout = () => {
    delegateLogout();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-border sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/delegate" className="flex items-center gap-3 group">
            <img src={logoImage} alt="VVS 2.0" className="h-9 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                Delegate Portal
              </span>
              <span className="text-[10px] text-slate font-medium">
                {delegate?.fullName}
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate hover:text-navy rounded-lg hover:bg-surface transition-colors"
            >
              <Home size={14} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate hover:text-error rounded-lg hover:bg-error/5 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Simple footer */}
      <footer className="border-t border-border bg-white py-4">
        <p className="text-center text-xs text-slate">
          © {new Date().getFullYear()} Vasant Vaani Sansad 2.0
        </p>
      </footer>
    </div>
  );
}
