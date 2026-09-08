import { motion } from 'framer-motion';
import { Landmark, Globe, Newspaper, ArrowRight, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { committeeCategories } from '../../data/mockData';

const categoryIcons = {
  'youth-parliament': Landmark,
  'global-diplomacy': Globe,
  'media': Newspaper,
};

const categoryColors = {
  'youth-parliament': { bg: 'bg-[#eaf2fb]', text: 'text-[#14284b]', accent: 'border-[#2c72b8]/20' },
  'global-diplomacy': { bg: 'bg-[#eaf2fb]', text: 'text-[#14284b]', accent: 'border-[#2c72b8]/20' },
  'media': { bg: 'bg-[#eaf2fb]', text: 'text-[#14284b]', accent: 'border-[#2c72b8]/20' },
};

const arenaHighlights = [
  {
    title: 'YOUTH PARLIAMENT',
    icon: Landmark,
    description: 'Lok Sabha & All India Political Parties Meet (AIPPM).'
  },
  {
    title: 'GLOBAL DIPLOMACY',
    icon: Globe,
    description: 'UNGA, UNSC & UNHRC international simulation councils.'
  },
  {
    title: 'MEDIA CONCLAVE',
    icon: Newspaper,
    description: 'International Press Bureau for journalists & photographers.'
  },
  {
    title: 'AWARDS & HONORS',
    icon: Award,
    description: '40+ Medals, Trophies, Certificates & Cash Prizes.'
  }
];

export default function CommitteesPage() {
  return (
    <div className="committees-page pt-20 lg:pt-24 bg-[#F9F6F0]">
      {/* ── 1. Hero Section (Matching About & Venue Pages) ────────── */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6 space-y-5 text-left"
            >
              {/* Pre-title Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#2c72b8]/40" />
                <span className="text-xs font-bold tracking-[0.25em] text-[#2c72b8] uppercase">
                  OFFICIAL COMMITTEES & AGENDAS
                </span>
                <div className="h-px w-12 bg-[#2c72b8]/40" />
              </div>

              {/* Main Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14284b] leading-[1.08]"
                style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
              >
                The Committee<br />
                <span className="text-[#c69a4a] italic font-serif">Experience</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-dark leading-relaxed max-w-xl">
                Six dynamic committees across three categories — Youth Parliament, Global Diplomacy, and Media Conclave. Choose your arena, draft resolutions, and articulate your vision at VVS 2.0.
              </p>

              {/* Key Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-border/80 shadow-xs">
                  <Landmark size={18} className="text-[#2c72b8] shrink-0" />
                  <span className="text-xs font-semibold text-[#14284b]">Youth Parliament & MUN</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-border/80 shadow-xs">
                  <Globe size={18} className="text-[#2c72b8] shrink-0" />
                  <span className="text-xs font-semibold text-[#14284b]">Global UN Councils</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-border/80 shadow-xs">
                  <Newspaper size={18} className="text-[#2c72b8] shrink-0" />
                  <span className="text-xs font-semibold text-[#14284b]">International Press</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-border/80 shadow-xs">
                  <Award size={18} className="text-[#2c72b8] shrink-0" />
                  <span className="text-xs font-semibold text-[#14284b]">40+ Trophies & Cash Prizes</span>
                </div>
              </div>

              {/* Arenas Summary Card */}
              <div className="inline-flex items-center gap-3 p-3.5 px-5 bg-white rounded-2xl border border-border shadow-sm mt-2">
                <div className="w-10 h-10 rounded-full bg-[#2c72b8] text-white flex items-center justify-center shrink-0">
                  <Sparkles size={20} />
                </div>
                <div className="flex flex-col">
                  <small className="text-[11px] font-semibold text-slate uppercase tracking-wider">Conference Arenas</small>
                  <strong className="text-sm font-bold text-[#14284b]">6 Specialized Committees • 300+ Delegates</strong>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm sm:max-w-md rounded-2xl overflow-hidden shadow-2xl bg-transparent">
                <img
                  src="/committee.png"
                  alt="VVS Committee Arenas & Agendas"
                  className="w-full h-auto object-cover block rounded-2xl mx-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Deep Navy Arenas Bar (4 Columns) ───────────────────── */}
      <section className="bg-[#0f2240] text-white py-12 sm:py-16 relative border-y border-[#2c72b8]/30">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/15">
            {arenaHighlights.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center px-4 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#2c72b8]/20 border border-[#2c72b8]/40 flex items-center justify-center mb-4 text-[#4388cc]">
                    <IconComponent size={26} />
                  </div>
                  <h3
                    className="text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-white mb-2"
                    style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Committee Categories & Cards Grid ──────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {committeeCategories.map((category, catIndex) => {
            const Icon = categoryIcons[category.slug] || Landmark;
            const colors = categoryColors[category.slug] || categoryColors['youth-parliament'];

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#eaf2fb] border border-[#2c72b8]/20 flex items-center justify-center text-[#14284b] shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl font-bold text-[#14284b]"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate">{category.description}</p>
                  </div>
                </div>

                {/* Committee Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.committees.map((committee, i) => (
                    <motion.div
                      key={committee.slug}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                    >
                      <Link
                        to={`/committees/${committee.slug}`}
                        id={`committees-page-${committee.slug}`}
                        className="group block bg-white rounded-2xl border border-border p-6 h-full
                          hover:border-[#2c72b8]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <span className={`inline-block text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.accent} mb-4`}>
                            {category.name}
                          </span>

                          <h3
                            className="text-xl font-bold text-[#14284b] mb-3 group-hover:text-[#2c72b8] transition-colors"
                            style={{ fontFamily: 'var(--font-detail, "Outfit", sans-serif)' }}
                          >
                            {committee.name}
                          </h3>

                          <div className="mb-4 bg-[#f8fbff] p-4 rounded-xl border border-[#e4eaf2]">
                            <span className="text-[11px] font-bold tracking-wider uppercase text-[#2c72b8] mb-1.5 block">
                              Agenda
                            </span>
                            <p className="text-xs sm:text-sm text-slate leading-relaxed">
                              {committee.agenda}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                          <span className="text-xs font-bold text-[#2c72b8] group-hover:underline">
                            View Details
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-[#2c72b8] group-hover:translate-x-1.5 transition-transform"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
