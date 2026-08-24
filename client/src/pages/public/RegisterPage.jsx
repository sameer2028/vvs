import { motion } from 'framer-motion';
import { Landmark, Calendar, MapPin, Award, UserPlus, ExternalLink, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';

const highlights = [
  {
    value: '6 Arenas',
    label: 'Committees & IP',
    description: 'Youth Parliament, UN & Press Conclave',
    icon: Landmark
  },
  {
    value: '26 – 27 Sept',
    label: '2026 Dates',
    description: 'Two days of high-stakes diplomacy',
    icon: Calendar
  },
  {
    value: 'VKM Campus',
    label: 'BHU, Varanasi',
    description: 'Kammacha, Varanasi, UP',
    icon: MapPin
  },
  {
    value: '40+ Awards',
    label: 'Trophies & Prizes',
    description: 'Best Delegate & High Commendation',
    icon: Award
  }
];

const steps = [
  {
    number: '01',
    title: 'Fill Delegate Details',
    desc: 'Enter your personal information, contact details, and institutional affiliation in the official Google Form.'
  },
  {
    number: '02',
    title: 'Select Preferences',
    desc: 'Choose your top 3 committee preferences and preferred portfolio allocations for VVS 2.0.'
  },
  {
    number: '03',
    title: 'Allotment & Confirmation',
    desc: 'Receive your committee allocation, portfolio allotment, and payment confirmation details via email.'
  }
];

export default function RegisterPage() {
  return (
    <div className="register-page pt-20 lg:pt-24 bg-[#F9F6F0]">
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
                DELEGATE REGISTRATION
              </span>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              Secure Your <span className="text-[#c69a4a] italic font-serif">Seat</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
              Join 300+ delegates from top institutions across the nation for two days of parliamentary debate, diplomacy, and leadership at VVS 2.0.
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full pt-1" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. 4-Highlights Bar (Floating White Card) ─────────────────── */}
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

      {/* ── 3. Central Registration Form Card ───────────────────────── */}
      <section className="py-10 sm:py-16 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-8 sm:p-12 shadow-xl text-center relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mx-auto mb-5 border border-[#2c72b8]/20">
              <UserPlus size={28} />
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-[#14284b] mb-2"
              style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
            >
              Official Delegate Form
            </h2>

            <div className="w-12 h-0.5 bg-[#c69a4a] rounded-full mx-auto my-3" />

            <p className="text-sm sm:text-base text-slate leading-relaxed max-w-md mx-auto mb-8">
              Click the button below to fill out the official registration form, select your committee preferences, and reserve your portfolio for VVS 2.0.
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfYvqGHp7Q5H6o-G_IMFGFFsOFPykCfn5F1Jwn6Xe0Rjyfiqg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#2c72b8] hover:bg-[#14284b] text-white font-bold text-base sm:text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Open Registration Form
              <ExternalLink size={20} />
            </a>

            {/* Watermark Icon */}
            <div className="absolute -bottom-8 -right-8 text-[#14284b]/5 pointer-events-none">
              <UserPlus size={160} strokeWidth={1} />
            </div>
          </motion.div>

          {/* ── 4. 3-Step Registration Process Grid ────────────────────── */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
                <h3
                  className="text-2xl sm:text-3xl font-bold text-[#14284b]"
                  style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                >
                  Registration Process
                </h3>
                <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest text-[#2c72b8] bg-[#eaf2fb] px-3 py-1 rounded-full border border-[#2c72b8]/20">
                        STEP {step.number}
                      </span>
                      <CheckCircle2 size={20} className="text-[#c69a4a]" />
                    </div>
                    <h4
                      className="text-xl font-bold text-[#14284b] mb-2"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── 5. Bottom Help Banner ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white rounded-2xl border border-[#2c72b8]/30 p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center gap-5 justify-between"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#2c72b8]/20 border border-[#2c72b8]/40 text-[#c69a4a] flex items-center justify-center shrink-0">
                <HelpCircle size={24} />
              </div>
              <div className="text-sm sm:text-base font-semibold text-white/90">
                Need assistance with registration?<br />
                <span className="text-[#c69a4a] font-bold">Contact Delegate Affairs via WhatsApp at 9450378138 or Email vasantvaanisansad@gmail.com</span>
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
