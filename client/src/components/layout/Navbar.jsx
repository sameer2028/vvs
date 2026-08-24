import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../../assets/favicon.png';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Committees', path: '/committees' },
  { label: 'Venue', path: '/venue' },
  { label: 'Experience', path: '/awards' },
  { label: 'VVS 1.0', path: '/vvs-1' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparentHero = isHome && !isScrolled;

  const handleNavClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

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
        isTransparentHero
          ? 'bg-gradient-to-b from-navy/80 via-navy/40 to-transparent backdrop-blur-[2px]'
          : 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-navbar)] border-b border-border/50'
      }`}
    >
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" onClick={handleNavClick} className="flex items-center gap-2 group" id="nav-logo">
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
                onClick={handleNavClick}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? isTransparentHero
                        ? 'text-navy bg-gold font-bold shadow-sm'
                        : 'text-white bg-navy font-semibold shadow-sm'
                      : isTransparentHero
                        ? 'text-white/90 hover:text-white hover:bg-white/15'
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
              to="/register"
              onClick={handleNavClick}
              id="nav-register-btn"
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] ${
                 isTransparentHero
                   ? 'bg-gold text-navy hover:bg-gold-light shadow-[0_2px_12px_rgba(212,175,55,0.4)] font-bold'
                   : 'bg-navy text-white hover:bg-navy-light shadow-[0_2px_8px_rgba(27,42,74,0.2)]'
              }`}
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isTransparentHero ? 'hover:bg-white/10' : 'hover:bg-surface'
            }`}
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {isOpen ? (
              <X size={24} className={isTransparentHero ? 'text-white' : 'text-navy'} />
            ) : (
              <Menu size={24} className={isTransparentHero ? 'text-white' : 'text-navy'} />
            )}
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
            className={`lg:hidden overflow-hidden border-t ${
              isTransparentHero
                ? 'bg-navy/95 backdrop-blur-xl border-white/10 text-white shadow-2xl'
                : 'bg-white border-border text-navy shadow-xl'
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? isTransparentHero
                          ? 'text-navy bg-gold font-bold'
                          : 'text-white bg-navy font-semibold'
                        : isTransparentHero
                          ? 'text-white/90 hover:text-white hover:bg-white/10'
                          : 'text-slate-dark hover:text-navy hover:bg-surface'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className={`pt-3 border-t mt-3 space-y-2 ${isTransparentHero ? 'border-white/10' : 'border-border'}`}>
                <Link
                  to="/register"
                  onClick={handleNavClick}
                  className={`block w-full text-center px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isTransparentHero
                      ? 'bg-gold text-navy font-bold hover:bg-gold-light shadow-md'
                      : 'bg-navy text-white hover:bg-navy-light'
                  }`}
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
