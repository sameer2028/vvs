import { motion } from 'framer-motion';
import {
  Trophy, Award, Medal, Package, Users, GraduationCap, Share2, TrendingUp, Sparkles
} from 'lucide-react';
import { awardsAndBenefits } from '../../data/mockData';

const iconMap = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  'package': Package,
  users: Users,
  'graduation-cap': GraduationCap,
  'share-2': Share2,
  'trending-up': TrendingUp,
};

const highlights = [
  {
    value: 'Best Delegate',
    label: 'Awards & Trophies',
    description: 'Prestigious trophies & cash rewards',
    icon: Trophy
  },
  {
    value: 'High Commendation',
    label: 'Certificates of Honor',
    description: 'Recognizing outstanding diplomacy',
    icon: Award
  },
  {
    value: '100%',
    label: 'Accreditation',
    description: 'Official certificates for all participants',
    icon: GraduationCap
  },
  {
    value: '300+',
    label: 'Delegate Network',
    description: 'Connect with leaders from top institutions',
    icon: Users
  }
];

export default function AwardsPage() {
  return (
    <div className="experience-page pt-20 lg:pt-24 bg-[#F9F6F0]">
      {/* ── 1. Deep Navy Hero Banner with Temple Line Artwork ──────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white py-16 lg:py-24 border-b border-[#2c72b8]/30">
        {/* Kashi Temple Dome Outline SVG Watermark */}
        <div className="absolute right-0 bottom-0 top-0 opacity-15 pointer-events-none flex items-end justify-end">
          <svg viewBox="0 0 600 400" className="h-full w-auto text-white fill-none stroke-current" strokeWidth="1.5">
            <path d="M 300 80 Q 350 140 370 220 L 230 220 Q 250 140 300 80 Z" />
            <path d="M 300 40 L 300 80" strokeWidth="3" />
            <circle cx="300" cy="35" r="5" fill="currentColor" />
            <path d="M 210 220 L 390 220 L 400 400 L 200 400 Z" />
            <path d="M 150 160 Q 185 200 200 260 L 100 260 Q 115 200 150 160 Z" />
            <path d="M 450 160 Q 485 200 500 260 L 400 260 Q 415 200 450 160 Z" />
          </svg>
        </div>

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-left space-y-4"
          >
            {/* Pre-title Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-[0.25em] text-[#c69a4a] uppercase">
                EXPERIENCE VVS 2.0
              </span>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              Awards & <span className="text-[#c69a4a] italic font-serif">Excellence</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Compete for prestigious awards, build real-world leadership skills, and become part of an elite national diplomacy network at VVS 2.0.
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full pt-1" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. 4-Stats Bar (Floating White Card) ────────────────────── */}
      <section className="relative z-20 container-wide mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:-mt-8 lg:-mt-14 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border shadow-xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-border">
            {highlights.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 px-4">
                  <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center shrink-0">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <div
                      className="text-lg sm:text-xl font-bold text-[#14284b] leading-none"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs font-bold text-[#14284b] uppercase tracking-wider mt-1">
                      {item.label}
                    </div>
                    <p className="text-[11px] text-slate mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── 3. Awards & Benefits Cards Grid ──────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardsAndBenefits.map((item, i) => {
              const Icon = iconMap[item.icon] || Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="group relative bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3
                      className="text-xl font-bold text-[#14284b] mb-1"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {item.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-[#c69a4a] rounded-full my-3" />
                    <p className="text-xs sm:text-sm text-slate leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Watermark Icon */}
                  <div className="absolute -bottom-6 -right-6 text-[#14284b]/5 pointer-events-none">
                    <Icon size={140} strokeWidth={1} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── 4. Bottom Navy Banner ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white rounded-2xl border border-[#2c72b8]/30 p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center gap-5 justify-between"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#2c72b8]/20 border border-[#2c72b8]/40 text-[#c69a4a] flex items-center justify-center shrink-0">
                <Sparkles size={24} />
              </div>
              <div className="text-sm sm:text-base font-semibold text-white/90">
                Ready to experience excellence? Join us at VVS 2.0 on 26–27 September 2026.<br />
                <span className="text-[#c69a4a] font-bold">Exact prize breakdown will be announced by the Secretariat.</span>
              </div>
            </div>

            {/* Temple Silhouette Watermark */}
            <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
              <svg viewBox="0 0 200 150" className="w-48 h-auto text-white fill-none stroke-current" strokeWidth="1.5">
                <path d="M 100 20 Q 120 50 130 90 L 70 90 Q 80 50 100 20 Z" />
                <path d="M 60 90 L 140 90 L 145 150 L 55 150 Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
