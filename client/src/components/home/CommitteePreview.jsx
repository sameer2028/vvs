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
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-36">
        <div className="max-w-[80rem] mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: '#B8943E' }}
            >
              Committees
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: '#F0ECE4' }}
            >
              The Committee Experience
            </h2>
            <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(148,163,184,0.75)' }}
            >
              Six dynamic committees across three categories — Youth Parliament, Global Diplomacy and Media.
            </p>
            <div className="mt-6 w-[60px] h-[2px] mx-auto rounded-full" style={{ background: '#B8943E' }} />
          </motion.div>

          {/* Category Groups */}
          <div className="space-y-16 lg:space-y-20">
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
                >
                  {/* Category heading */}
                  <div className="flex items-center gap-3 mb-7 sm:mb-8">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: config.tagBg }}
                    >
                      <Icon size={17} style={{ color: config.accent }} />
                    </div>
                    <h3
                      className="text-sm font-semibold tracking-[0.18em] uppercase"
                      style={{ color: 'rgba(240,236,228,0.7)', fontFamily: 'var(--font-heading)' }}
                    >
                      {category.name}
                    </h3>
                    <div
                      className="flex-1 h-px"
                      style={{ background: 'rgba(240,236,228,0.08)' }}
                    />
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {category.committees
                      .filter((c) => c.isActive !== false)
                      .map((committee, i) => (
                        <motion.div
                          key={committee.slug}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.06 * i }}
                        >
                          <Link
                            to={`/committees/${committee.slug}`}
                            id={`committee-card-${committee.slug}`}
                            className="group block h-full rounded-xl transition-all duration-300"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-4px)';
                              e.currentTarget.style.borderColor = `${config.accent}40`;
                              e.currentTarget.style.background = 'rgba(255,255,255,0.055)';
                              e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,0.25), 0 0 0 1px ${config.accent}15`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div className="p-6 sm:p-7 flex flex-col h-full">
                              {/* Top row: category tag + arrow */}
                              <div className="flex items-center justify-between mb-4">
                                <span
                                  className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded"
                                  style={{
                                    background: config.tagBg,
                                    color: config.tagText,
                                  }}
                                >
                                  {category.name}
                                </span>
                                <ArrowRight
                                  size={16}
                                  className="transition-all duration-300 group-hover:translate-x-1"
                                  style={{ color: 'rgba(148,163,184,0.3)' }}
                                  onMouseEnter={() => {}} /* handled by parent */
                                />
                              </div>

                              {/* Gold accent line — appears on hover */}
                              <div
                                className="w-0 h-[2px] rounded-full mb-4 transition-all duration-400 group-hover:w-10"
                                style={{ background: config.accent }}
                              />

                              {/* Committee name */}
                              <h4
                                className="text-xl sm:text-[1.375rem] font-bold leading-tight mb-3 transition-colors duration-300"
                                style={{
                                  fontFamily: 'var(--font-heading)',
                                  color: 'rgba(240,236,228,0.88)',
                                }}
                              >
                                <span className="group-hover:text-white transition-colors duration-300">
                                  {committee.name}
                                </span>
                              </h4>

                              {/* Agenda */}
                              <p
                                className="text-sm leading-relaxed line-clamp-3 flex-1"
                                style={{ color: 'rgba(148,163,184,0.55)' }}
                              >
                                {committee.agenda}
                              </p>

                              {/* Bottom CTA */}
                              <div
                                className="mt-5 pt-4 flex items-center"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                              >
                                <span
                                  className="text-xs font-semibold tracking-wider transition-colors duration-300"
                                  style={{ color: config.accent }}
                                >
                                  <span className="group-hover:opacity-100 opacity-70 transition-opacity duration-300">
                                    Explore Committee →
                                  </span>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
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
            className="text-center mt-14 sm:mt-16"
          >
            <Link
              to="/committees"
              id="view-all-committees"
              className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
              style={{ color: 'rgba(240,236,228,0.5)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#B8943E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(240,236,228,0.5)'; }}
            >
              View All Committees
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
