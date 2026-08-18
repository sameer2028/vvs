import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../../assets/favicon.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Committees', path: '/committees' },
  { label: 'Awards', path: '/awards' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Team', path: '/team' },
  { label: 'VVS 1.0', path: '/vvs-1' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-navbar)] border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <img 
              src={logoImage} 
              alt="VVS 2.0 Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-gold bg-gold-subtle'
                      : 'text-slate-dark hover:text-navy hover:bg-surface'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/delegate/login"
              id="nav-delegate-login"
              className="px-4 py-2.5 text-sm font-semibold text-navy border border-border rounded-lg
                hover:bg-surface transition-all duration-200"
            >
              Delegate Login
            </Link>
            <Link
              to="/register"
              id="nav-register-btn"
              className="px-6 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg
                hover:bg-navy-light transition-all duration-200
                shadow-[0_2px_8px_rgba(27,42,74,0.2)] hover:shadow-[0_4px_12px_rgba(27,42,74,0.3)]
                active:scale-[0.98]"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {isOpen ? <X size={24} className="text-navy" /> : <Menu size={24} className="text-navy" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-gold bg-gold-subtle'
                        : 'text-slate-dark hover:text-navy hover:bg-surface'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-border mt-3 space-y-2">
                <Link
                  to="/delegate/login"
                  className="block w-full text-center px-6 py-3 text-navy border border-border text-sm font-semibold rounded-lg
                    hover:bg-surface transition-all duration-200"
                >
                  Delegate Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center px-6 py-3 bg-navy text-white text-sm font-semibold rounded-lg
                    hover:bg-navy-light transition-all duration-200"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
