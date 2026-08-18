import { motion } from 'framer-motion';
import { Clock, CalendarDays } from 'lucide-react';

export default function SchedulePage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="bg-navy text-white py-5 sm:py-7">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Schedule
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Conference Schedule
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Two impactful days of parliamentary debate, global diplomacy and media coverage.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl border border-border p-12 sm:p-16">
              <div className="w-16 h-16 rounded-2xl bg-gold-subtle flex items-center justify-center mx-auto mb-6">
                <Clock size={28} className="text-gold" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-navy mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Schedule Coming Soon
              </h2>
              <p className="text-base text-slate max-w-md mx-auto mb-8">
                The detailed timetable for VVS 2.0 is being finalized. Check back soon for
                session timings, room allocations and more.
              </p>

              {/* Day cards */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <div className="flex-1 w-full bg-surface rounded-xl p-5 border border-border">
                  <CalendarDays size={20} className="text-gold mx-auto mb-2" />
                  <div className="text-lg font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                    Day 1
                  </div>
                  <div className="text-sm text-slate">26 September 2026</div>
                </div>
                <div className="flex-1 w-full bg-surface rounded-xl p-5 border border-border">
                  <CalendarDays size={20} className="text-gold mx-auto mb-2" />
                  <div className="text-lg font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                    Day 2
                  </div>
                  <div className="text-sm text-slate">27 September 2026</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
