import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, CalendarDays, MapPin, Sparkles, Award, Radio, Coffee, UtensilsCrossed, Users, Mic, LogOut, ClipboardCheck } from 'lucide-react';

/**
 * Determines the event phase based on current time.
 */
function getEventPhase() {
  const now = new Date();
  const day1Start = new Date('2026-09-26T08:45:00+05:30');
  const day2Start = new Date('2026-09-27T00:00:00+05:30');
  const eventEnd = new Date('2026-09-27T17:30:00+05:30');

  if (now < day1Start) return 'pre';
  if (now >= day1Start && now < day2Start) return 'day1';
  if (now >= day2Start && now <= eventEnd) return 'day2';
  return 'post';
}

/**
 * Checks if a session is currently active based on time range.
 */
function isSessionActive(timeStr, eventDay) {
  const phase = getEventPhase();
  if ((eventDay === 1 && phase !== 'day1') || (eventDay === 2 && phase !== 'day2')) return false;

  const now = new Date();
  // Parse time like "8:45 AM" or "12:30 PM"
  const parts = timeStr.split(' – ');
  if (parts.length !== 2) return false;

  const parseTime = (t) => {
    const match = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return null;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    const d = new Date(now);
    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const start = parseTime(parts[0]);
  const end = parseTime(parts[1]);
  if (!start || !end) return false;

  return now >= start && now < end;
}

const day1Schedule = [
  {
    time: '8:45 AM – 9:15 AM',
    title: 'Reporting',
    description: 'Delegate check-in and registration desk',
    icon: ClipboardCheck,
    type: 'logistics',
  },
  {
    time: '9:15 AM – 10:15 AM',
    title: 'Opening Ceremony',
    description: 'Inauguration, welcome address and keynote',
    icon: Mic,
    type: 'ceremony',
  },
  {
    time: '10:30 AM – 12:30 PM',
    title: 'Committee Session 1',
    description: 'First round of committee debates and deliberations',
    icon: Users,
    type: 'session',
  },
  {
    time: '12:30 PM – 1:15 PM',
    title: 'Lunch',
    description: 'Lunch break for all delegates',
    icon: UtensilsCrossed,
    type: 'break',
  },
  {
    time: '1:15 PM – 3:15 PM',
    title: 'Committee Session 2',
    description: 'Continuation of committee proceedings and moderated caucus',
    icon: Users,
    type: 'session',
  },
  {
    time: '3:15 PM – 3:30 PM',
    title: 'Break',
    description: 'Tea and refreshment break',
    icon: Coffee,
    type: 'break',
  },
  {
    time: '3:30 PM – 5:00 PM',
    title: 'Committee Session 3',
    description: 'Final committee session of Day 1',
    icon: Users,
    type: 'session',
  },
  {
    time: '5:30 PM',
    title: 'End of Day 1',
    description: 'Day 1 proceedings conclude',
    icon: LogOut,
    type: 'logistics',
    isEndMarker: true,
  },
];

const day2Schedule = [
  {
    time: '8:45 AM – 9:00 AM',
    title: 'Reporting',
    description: 'Day 2 delegate check-in',
    icon: ClipboardCheck,
    type: 'logistics',
  },
  {
    time: '9:00 AM – 11:00 AM',
    title: 'Committee Session 4',
    description: 'Resumed committee proceedings',
    icon: Users,
    type: 'session',
  },
  {
    time: '11:00 AM – 11:15 AM',
    title: 'Break',
    description: 'Short refreshment break',
    icon: Coffee,
    type: 'break',
  },
  {
    time: '11:15 AM – 1:15 PM',
    title: 'Committee Session 5',
    description: 'Extended committee deliberations and draft resolutions',
    icon: Users,
    type: 'session',
  },
  {
    time: '1:15 PM – 1:45 PM',
    title: 'Lunch',
    description: 'Lunch break for all delegates',
    icon: UtensilsCrossed,
    type: 'break',
  },
  {
    time: '1:45 PM – 3:30 PM',
    title: 'Committee Session 6 (Wind Up)',
    description: 'Final committee session — resolution voting and closing remarks',
    icon: Users,
    type: 'session',
  },
  {
    time: '3:30 PM – 5:30 PM',
    title: 'Valedictory & Closing Ceremony',
    description: 'Awards, recognitions, closing address and vote of thanks',
    icon: Award,
    type: 'ceremony',
  },
  {
    time: '5:30 PM',
    title: 'Departure',
    description: 'Conference concludes — safe travels!',
    icon: LogOut,
    type: 'logistics',
    isEndMarker: true,
  },
];

function ScheduleItem({ item, index, eventDay }) {
  const IconComponent = item.icon;
  const active = !item.isEndMarker && isSessionActive(item.time, eventDay);

  const typeColors = {
    session: { bg: 'bg-[#2c72b8]/10', border: 'border-[#2c72b8]/20', iconBg: 'bg-[#2c72b8]', text: 'text-[#2c72b8]' },
    ceremony: { bg: 'bg-[#c69a4a]/10', border: 'border-[#c69a4a]/30', iconBg: 'bg-[#c69a4a]', text: 'text-[#c69a4a]' },
    break: { bg: 'bg-emerald-50', border: 'border-emerald-200/50', iconBg: 'bg-emerald-500', text: 'text-emerald-600' },
    logistics: { bg: 'bg-slate-50', border: 'border-slate-200/50', iconBg: 'bg-slate-500', text: 'text-slate-500' },
  };
  const colors = typeColors[item.type] || typeColors.session;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.05 * index }}
      className={`relative flex items-start gap-4 p-4 sm:p-5 rounded-xl border transition-all ${
        active
          ? 'bg-[#0b1a30] border-red-400/30 shadow-lg shadow-red-500/5 ring-1 ring-red-400/20'
          : `${colors.bg} ${colors.border}`
      }`}
    >
      {/* Timeline dot / icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        active ? 'bg-red-500' : colors.iconBg
      }`}>
        <IconComponent size={18} className="text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold tracking-wide ${
            active ? 'text-red-400' : colors.text
          }`}>
            {item.time}
          </span>
          {active && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-400/30 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
              </span>
              NOW
            </span>
          )}
        </div>
        <h4 className={`text-base sm:text-lg font-bold mt-1 ${
          active ? 'text-white' : 'text-[#14284b]'
        }`} style={{ fontFamily: 'var(--font-heading)' }}>
          {item.title}
        </h4>
        <p className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${
          active ? 'text-white/60' : 'text-slate'
        }`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function SchedulePage() {
  const [phase, setPhase] = useState(getEventPhase);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(getEventPhase());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const isLive = phase === 'day1' || phase === 'day2';

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
              {isLive && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 border border-red-400/40 rounded-full text-[10px] font-bold text-red-400 tracking-widest uppercase">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                  </span>
                  LIVE
                </span>
              )}
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

      {/* ── 2. 2-Day Timetable Schedule ──────────────────── */}
      <section className="relative z-20 container-wide mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:-mt-8 lg:-mt-14 mb-16 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Day 1 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col"
          >
            {/* Day 1 Header */}
            <div className={`p-6 border-b flex items-center justify-between ${
              phase === 'day1'
                ? 'bg-gradient-to-r from-[#0b1a30] via-[#1a2e4a] to-[#0b1a30] border-red-400/20'
                : 'bg-[#0b1a30] border-[#2c72b8]/30'
            } text-white`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  phase === 'day1' ? 'bg-red-500 text-white' : 'bg-[#2c72b8] text-white'
                }`}>
                  D1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Day 1 — Opening & Committee Debates
                    {phase === 'day1' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-400/30 rounded-full text-[10px] font-bold text-red-400 tracking-wider">
                        <Radio size={10} className="animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#c69a4a] font-semibold">Saturday, 26 September 2026</p>
                </div>
              </div>
              <CalendarDays size={22} className="text-[#c69a4a]" />
            </div>

            {/* Day 1 Schedule Items */}
            <div className="p-4 sm:p-6 space-y-3 flex-1">
              {day1Schedule.map((item, index) => (
                <ScheduleItem key={index} item={item} index={index} eventDay={1} />
              ))}
            </div>
          </motion.div>

          {/* Day 2 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col"
          >
            {/* Day 2 Header */}
            <div className={`p-6 border-b flex items-center justify-between ${
              phase === 'day2'
                ? 'bg-gradient-to-r from-[#0b1a30] via-[#1a2e4a] to-[#0b1a30] border-red-400/20'
                : 'bg-[#0b1a30] border-[#2c72b8]/30'
            } text-white`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  phase === 'day2' ? 'bg-red-500 text-white' : 'bg-[#2c72b8] text-white'
                }`}>
                  D2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    Day 2 — Resolutions & Valedictory
                    {phase === 'day2' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-400/30 rounded-full text-[10px] font-bold text-red-400 tracking-wider">
                        <Radio size={10} className="animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#c69a4a] font-semibold">Sunday, 27 September 2026</p>
                </div>
              </div>
              <Award size={22} className="text-[#c69a4a]" />
            </div>

            {/* Day 2 Schedule Items */}
            <div className="p-4 sm:p-6 space-y-3 flex-1">
              {day2Schedule.map((item, index) => (
                <ScheduleItem key={index} item={item} index={index} eventDay={2} />
              ))}
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
              <span className="text-[#c69a4a] font-bold">
                {isLive
                  ? 'The conference is currently in session!'
                  : phase === 'post'
                    ? 'Thank you for being part of VVS 2.0!'
                    : '26–27 September 2026 • Reporting at 8:45 AM'}
              </span>
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
