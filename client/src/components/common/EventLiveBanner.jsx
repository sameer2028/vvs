import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, MapPin, X } from 'lucide-react';
import { eventSettings } from '../../data/mockData';

/**
 * Determines the event phase based on current time.
 * - 'pre': Before the event starts
 * - 'day1': During Day 1 (Sept 26, 9 AM – 11:59 PM)
 * - 'day2': During Day 2 (Sept 27, 12 AM – 11:59 PM)
 * - 'post': After the event ends
 */
function getEventPhase() {
  const now = new Date();
  const day1Start = new Date('2026-09-26T09:00:00+05:30');
  const day2Start = new Date('2026-09-27T00:00:00+05:30');
  const eventEnd = new Date('2026-09-27T23:59:59+05:30');

  if (now < day1Start) return 'pre';
  if (now >= day1Start && now < day2Start) return 'day1';
  if (now >= day2Start && now <= eventEnd) return 'day2';
  return 'post';
}

export default function EventLiveBanner() {
  const [phase, setPhase] = useState(getEventPhase);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(getEventPhase());
    }, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Don't show after event or if dismissed
  if (phase === 'post' || dismissed) return null;

  // Pre-event state (show on the day before, i.e. Sept 25 onward)
  const now = new Date();
  const showPreBanner = now >= new Date('2026-09-25T00:00:00+05:30');
  if (phase === 'pre' && !showPreBanner) return null;

  const isLive = phase === 'day1' || phase === 'day2';
  const dayLabel = phase === 'day1' ? 'Day 1' : phase === 'day2' ? 'Day 2' : '';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[60] ${
          isLive
            ? 'bg-gradient-to-r from-[#0b1a30] via-[#1a3a5c] to-[#0b1a30]'
            : 'bg-gradient-to-r from-[#14284b] via-[#1e3a5f] to-[#14284b]'
        }`}
        style={{ height: '36px' }}
      >
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center relative">
          <div className="flex items-center gap-2 sm:gap-3 text-white">
            {isLive ? (
              <>
                {/* Pulsing live dot */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                  <span className="text-red-400">LIVE</span>
                  <span className="text-white/60 mx-1.5">—</span>
                  <span className="text-[#c69a4a] font-semibold">{dayLabel}</span>
                  <span className="hidden sm:inline text-white/70 font-normal ml-1.5">
                    is happening now at VKM, Varanasi
                  </span>
                </span>
                <Radio size={14} className="text-red-400 animate-pulse hidden sm:block" />
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-[#c69a4a]" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  <span className="text-[#c69a4a]">VVS 2.0 starts tomorrow!</span>
                  <span className="hidden sm:inline text-white/60 ml-1.5">
                    26–27 Sept • Vasant Kanya Mahavidyalaya, Varanasi
                  </span>
                </span>
              </>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>

        {/* Bottom gold accent line */}
        {isLive && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c69a4a]/60 to-transparent" />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Hook to get the current banner height for offsetting content.
 * Returns 36 when visible, 0 when hidden.
 */
export function useEventBannerOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const phase = getEventPhase();
    const now = new Date();
    const showPreBanner = now >= new Date('2026-09-25T00:00:00+05:30');

    if (phase === 'post') {
      setOffset(0);
    } else if (phase === 'pre' && !showPreBanner) {
      setOffset(0);
    } else {
      setOffset(36);
    }
  }, []);

  return offset;
}
