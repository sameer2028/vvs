import { motion } from 'framer-motion';
import { Clock, CalendarDays, MapPin, Sparkles, Award } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="schedule-page pt-20 lg:pt-24 bg-[#F9F6F0]">
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
                CONFERENCE TIMETABLE
              </span>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              Conference <span className="text-[#c69a4a] italic font-serif">Schedule</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Two impactful days of parliamentary debate, global diplomacy, press briefings and executive sessions at VVS 2.0.
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full pt-1" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. 2-Day Timetable Schedule Cards Grid ──────────────────── */}
      <section className="relative z-20 container-wide mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:-mt-8 lg:-mt-14 mb-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Day 1 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Day 1 Header */}
            <div className="bg-[#0b1a30] text-white p-6 border-b border-[#2c72b8]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2c72b8] text-white flex items-center justify-center font-bold text-sm">
                  D1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    Day 1 — Opening & Committee Debates
                  </h3>
                  <p className="text-xs text-[#c69a4a] font-semibold">Saturday, 26 September 2026</p>
                </div>
              </div>
              <CalendarDays size={22} className="text-[#c69a4a]" />
            </div>

            {/* Day 1 Body - To Be Announced */}
            <div className="p-8 text-center flex flex-col items-center justify-center my-auto min-h-[240px]">
              <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4 border border-[#2c72b8]/20">
                <Clock size={24} />
              </div>
              <h4 className="text-xl font-bold text-[#14284b] mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                Schedule To Be Announced
              </h4>
              <p className="text-xs sm:text-sm text-slate max-w-xs leading-relaxed">
                Detailed session timings and agenda lineup for Day 1 will be released soon by the Secretariat.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf2fb] text-[#14284b] border border-[#2c72b8]/20 text-xs font-bold">
                <Sparkles size={14} className="text-[#2c72b8]" />
                <span>Stay Tuned</span>
              </div>
            </div>
          </motion.div>

          {/* Day 2 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Day 2 Header */}
            <div className="bg-[#0b1a30] text-white p-6 border-b border-[#2c72b8]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2c72b8] text-white flex items-center justify-center font-bold text-sm">
                  D2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    Day 2 — Resolutions & Valedictory
                  </h3>
                  <p className="text-xs text-[#c69a4a] font-semibold">Sunday, 27 September 2026</p>
                </div>
              </div>
              <Award size={22} className="text-[#c69a4a]" />
            </div>

            {/* Day 2 Body - To Be Announced */}
            <div className="p-8 text-center flex flex-col items-center justify-center my-auto min-h-[240px]">
              <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4 border border-[#2c72b8]/20">
                <Clock size={24} />
              </div>
              <h4 className="text-xl font-bold text-[#14284b] mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                Schedule To Be Announced
              </h4>
              <p className="text-xs sm:text-sm text-slate max-w-xs leading-relaxed">
                Detailed session timings and agenda lineup for Day 2 will be released soon by the Secretariat.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf2fb] text-[#14284b] border border-[#2c72b8]/20 text-xs font-bold">
                <Sparkles size={14} className="text-[#2c72b8]" />
                <span>Stay Tuned</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 3. Bottom Navy Banner ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white rounded-2xl border border-[#2c72b8]/30 p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center gap-5 justify-between"
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#2c72b8]/20 border border-[#2c72b8]/40 text-[#c69a4a] flex items-center justify-center shrink-0">
              <MapPin size={24} />
            </div>
            <div className="text-sm sm:text-base font-semibold text-white/90">
              Venue: Vasant Kanya Mahavidyalaya (VKM), Kammacha, Varanasi.<br />
              <span className="text-[#c69a4a] font-bold">Official conference schedule will be announced soon.</span>
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
      </section>
    </div>
  );
}
