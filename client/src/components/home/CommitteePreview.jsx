import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, Globe, Newspaper } from 'lucide-react';
import { committeeCategories } from '../../data/mockData';

/* ─── Category visual config ─── */
const categoryConfig = {
  'youth-parliament': {
    Icon: Landmark,
    accent: '#B8943E',        /* gold */
    accentLight: '#D4B96A',
    tagBg: 'rgba(184,148,62,0.12)',
    tagText: '#D4B96A',
  },
  'global-diplomacy': {
    Icon: Globe,
    accent: '#5BA8A0',        /* muted teal */
    accentLight: '#7CC4BC',
    tagBg: 'rgba(91,168,160,0.12)',
    tagText: '#7CC4BC',
  },
  'media': {
    Icon: Newspaper,
    accent: '#C9956B',        /* warm muted amber */
    accentLight: '#DEB48E',
    tagBg: 'rgba(201,149,107,0.12)',
    tagText: '#DEB48E',
  },
};

const defaultConfig = categoryConfig['youth-parliament'];

export default function CommitteePreview() {
  return (
    <section
      className="relative overflow-hidden"
      id="committees-preview"
      style={{ background: 'linear-gradient(180deg, #0F1D35 0%, #13233D 50%, #0F1D35 100%)' }}
    >
      {/* ── Subtle background texture ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cmte-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.6" fill="rgba(184,148,62,1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cmte-dots)" />
        </svg>
      </div>

      {/* ── Subtle radial glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(184,148,62,0.04)' }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[80rem] mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase mb-2"
              style={{ color: '#B8943E' }}
            >
              Committees
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: '#F0ECE4' }}
            >
              The Committee Experience
            </h2>
            <p className="mt-2 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.75)' }}
            >
              Six dynamic committees across three categories — Youth Parliament, Global Diplomacy and Media.
            </p>
            <div className="mt-4 w-[50px] h-[2px] mx-auto rounded-full" style={{ background: '#B8943E' }} />
          </motion.div>

          {/* Category Groups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {committeeCategories.map((category, catIndex) => {
              const config = categoryConfig[category.slug] || defaultConfig;
              const Icon = config.Icon;

              return (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: catIndex * 0.08 }}
                  className="rounded-xl p-5 sm:p-6 flex flex-col h-full relative group overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = `${config.accent}40`;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.055)';
                    e.currentTarget.style.boxShadow = `0 10px 25px rgba(0,0,0,0.25), 0 0 0 1px ${config.accent}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Hover effect background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${config.accent}15, transparent 70%)`
                    }}
                  />
                  
                  <div className="flex items-center gap-3.5 mb-4 relative z-10">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{ background: config.tagBg }}
                    >
                      <Icon size={20} style={{ color: config.accent }} />
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-bold tracking-wide"
                      style={{ color: '#F0ECE4', fontFamily: 'var(--font-heading)' }}
                    >
                      {category.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm mb-5 leading-relaxed flex-1" style={{ color: 'rgba(148,163,184,0.7)' }}>
                    {category.description}
                  </p>

                  {/* List of committees just named */}
                  <div className="space-y-2.5 relative z-10 mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {category.committees
                      .filter((c) => c.isActive !== false)
                      .map((committee) => (
                        <div key={committee.slug} className="flex items-center gap-2.5">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ background: config.accent }} />
                           <span className="text-[0.875rem] font-medium transition-colors duration-300 group-hover:text-white" style={{ color: 'rgba(240,236,228,0.85)' }}>
                             {committee.name}
                           </span>
                        </div>
                      ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mt-8 sm:mt-10"
          >
            <Link
              to="/committees"
              id="view-all-committees"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 border"
              style={{
                borderColor: 'rgba(184,148,62,0.35)',
                color: '#D4B96A',
                background: 'rgba(184,148,62,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B8943E';
                e.currentTarget.style.background = 'rgba(184,148,62,0.15)';
                e.currentTarget.style.color = '#F0ECE4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184,148,62,0.35)';
                e.currentTarget.style.background = 'rgba(184,148,62,0.06)';
                e.currentTarget.style.color = '#D4B96A';
              }}
            >
              View Full Committees
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
