import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Download } from 'lucide-react';
import Button from '../common/Button';
import { eventSettings } from '../../data/mockData';
import heroBg from '../../assets/hero_bg.png';
import heroBgMobile from '../../assets/hero-bg-mobile.png';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
          <div className="text-center">
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy tabular-nums"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] sm:text-xs text-slate uppercase tracking-wider mt-1">
              {unit.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-xl text-gold/50 font-light -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <>
      <style>{`
        .hero-bg {
          background-image: url('${heroBgMobile}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        @media (min-width: 768px) {
          .hero-bg {
            background-image: url('${heroBg}');
          }
        }
      `}</style>
      <section
        id="hero"
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-ivory hero-bg"
      >
        {/* Semi-transparent overlay to ensure text is readable over the image */}
        <div className="absolute inset-0 bg-navy/10 backdrop-blur-[1px]" />

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Content */}
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold-subtle text-gold-dark text-xs font-semibold tracking-[0.15em] uppercase rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                26–27 September 2026
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Vasant Vaani
              <br />
              <span className="relative">
                Sansad
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gold rounded-full" />
              </span>{' '}
              <span className="text-gold">2.0</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg sm:text-xl lg:text-2xl text-slate font-light italic"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              "Where Voices Become Leaders."
            </motion.p>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-slate"
            >
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-gold" />
                26–27 September 2026
              </span>
              <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-gold" />
                Vasant Kanya Mahavidyalaya, Varanasi
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button to="/register" size="lg" variant="primary" id="hero-register-btn">
                Register Now
                <ArrowRight size={18} />
              </Button>
              <Button href="/brochure.pdf" target="_blank" rel="noopener noreferrer" size="lg" variant="secondary" id="hero-brochure-btn">
                View Brochure
                <Download size={18} />
              </Button>
              <Button to="/committees" size="lg" variant="outline" id="hero-explore-btn">
                Explore Committees
              </Button>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-14 pt-10 border-t border-border"
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-slate mb-4">
                Countdown to VVS 2.0
              </p>
              <div className="flex justify-center">
                <CountdownTimer targetDate={eventSettings.startDate} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
      </section>
    </>
  );
}
