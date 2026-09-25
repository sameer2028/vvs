import { motion } from 'framer-motion';
import { ArrowRight, Radio } from 'lucide-react';
import Button from '../common/Button';
import { eventSettings } from '../../data/mockData';

function getEventPhase() {
  const now = new Date();
  const day1Start = new Date('2026-09-26T09:00:00+05:30');
  const eventEnd = new Date('2026-09-27T23:59:59+05:30');
  if (now < day1Start) return 'pre';
  if (now <= eventEnd) return 'live';
  return 'post';
}

export default function CtaBanner() {
  const phase = getEventPhase();
  const isLive = phase === 'live';
  const isPost = phase === 'post';
  const isRegOpen = eventSettings.registrationOpen;

  return (
    <section className="relative overflow-hidden bg-navy" id="cta-banner">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Gold accent lines */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${
        isLive ? 'via-red-400/60' : 'via-gold/60'
      } to-transparent`} />

      <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {isLive ? (
            <>
              {/* LIVE state */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/15 border border-red-400/30 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-xs font-bold text-red-400 tracking-widest uppercase">Event is Live</span>
                <Radio size={12} className="text-red-400 animate-pulse" />
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                VVS 2.0 is <span className="text-gold">Happening Now!</span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
                The conference is in session at Vasant Kanya Mahavidyalaya, Varanasi.
                Follow the schedule and stay updated!
              </p>
              <Button to="/schedule" variant="gold" size="lg" id="cta-schedule-btn">
                View Live Schedule
                <ArrowRight size={18} />
              </Button>
            </>
          ) : isPost ? (
            <>
              {/* Post-event state */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Thank You, <span className="text-gold">Delegates!</span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
                VVS 2.0 has concluded. Thank you to all 300+ delegates for making this
                conference a resounding success. Stay tuned for highlights and awards!
              </p>
              <Button to="/vvs-1" variant="gold" size="lg" id="cta-gallery-btn">
                View Gallery
                <ArrowRight size={18} />
              </Button>
            </>
          ) : (
            <>
              {/* Pre-event / Registration closed state */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRegOpen ? 'Ready to Lead?' : 'See You Tomorrow!'}
              </h2>
              <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
                {isRegOpen
                  ? 'Join 300+ delegates from across India. Debate, collaborate and develop the skills that define tomorrow\'s leaders.'
                  : 'Registrations are now closed. We look forward to welcoming all delegates at VKM, Varanasi on 26–27 September!'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {isRegOpen ? (
                  <Button to="/register" variant="gold" size="lg" id="cta-register-btn">
                    Register Now — ₹599
                    <ArrowRight size={18} />
                  </Button>
                ) : (
                  <Button to="/schedule" variant="gold" size="lg" id="cta-schedule-btn">
                    View Schedule
                    <ArrowRight size={18} />
                  </Button>
                )}
                <Button to="/committees" variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10">
                  Explore Committees
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
