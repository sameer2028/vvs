import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { InstagramIcon as Instagram } from '../common/SocialIcons';
import logoImage from '../../assets/favicon.png';

const quickLinks = [
  { label: 'About', path: '/about' },
  { label: 'Committees', path: '/committees' },
  { label: 'Venue', path: '/venue' },
  { label: 'Awards', path: '/awards' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Team', path: '/team' },
  { label: 'FAQ', path: '/faq' },
];

const committees = [
  { label: 'Lok Sabha', path: '/committees/lok-sabha' },
  { label: 'AIPPM', path: '/committees/aippm' },
  { label: 'UPLA', path: '/committees/upla' },
  { label: 'UNHRC', path: '/committees/unhrc' },
  { label: 'UNCSW', path: '/committees/uncsw' },
  { label: 'Press Conclave', path: '/committees/press-conclave' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      {/* Main Footer */}
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 bg-white/10 p-2 inline-block rounded-xl border border-white/20">
              <img 
                src={logoImage} 
                alt="VVS 2.0 Logo" 
                className="h-14 w-auto object-contain" 
              />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              A Platform Where Voices Become Leaders. The flagship Youth Parliament & MUN conference of Vasant Kanya Mahavidyalaya, BHU.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/ig._vvs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center
                  hover:bg-gold/20 hover:text-gold transition-all duration-200"
                aria-label="Instagram"
                id="footer-instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:vasantvaanisansad@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center
                  hover:bg-gold/20 hover:text-gold transition-all duration-200"
                aria-label="Email"
                id="footer-email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-gold transition-colors duration-200 flex items-center gap-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Committees */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Committees
            </h4>
            <ul className="space-y-2.5">
              {committees.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">
                  Vasant Kanya Mahavidyalaya,<br />
                  Kammacha, Varanasi
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold shrink-0" />
                <a href="mailto:vasantvaanisansad@gmail.com" className="text-sm text-white/60 hover:text-gold transition-colors">
                  vasantvaanisansad@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold shrink-0" />
                <div className="text-sm text-white/60">
                  <span>Preeti: 9631897232</span><br />
                  <span>Shreya: 9305786651</span>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                to="/register"
                id="footer-register-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy text-sm font-semibold
                  rounded-lg hover:bg-gold-light transition-all duration-200"
              >
                Register Now
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Vasant Vaani Sansad. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              26–27 September 2026 • Vasant Kanya Mahavidyalaya, Varanasi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
