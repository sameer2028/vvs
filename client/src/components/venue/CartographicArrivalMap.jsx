import { motion } from 'framer-motion';
import { Navigation, MapPin } from 'lucide-react';

/**
 * VVS 2.0 — "Find Your Way to VVS"
 * Premium cream-toned cartographic arrival map.
 */

const VENUE = { x: 455, y: 255 };          // Central VVS pin

const LANDMARKS = [
  {
    id: 'airport',
    label: 'Lal Bahadur Shastri\nInternational Airport',
    coords: '25.3176° N, 82.9739° E', // Kept original text format as requested
    dist: '26 km',
    time: '~50 min',
    icon: '✈',
    px: 105, py: 108,
    textSide: 'right',
    routeColor: '#1e3a6e',
    statIcon: '✈',
    statLabel: 'FROM AIRPORT',
  },
  {
    id: 'junction',
    label: 'Varanasi Junction',
    coords: '25.3209° N, 83.0036° E',
    dist: '6.5 km',
    time: '~20 min',
    icon: '🚂',
    px: 720, py: 110,
    textSide: 'left',
    routeColor: '#1e3a6e',
    statIcon: '🚂',
    statLabel: 'FROM VARANASI JN.',
  },
  {
    id: 'bhu',
    label: 'BHU',
    coords: '25.2606° N, 82.9915° E',
    dist: '7.8 km',
    time: '~25 min',
    icon: '🏛',
    px: 135, py: 310,
    textSide: 'right',
    routeColor: '#1e3a6e',
    statIcon: '🏛',
    statLabel: 'FROM BHU',
  },
  {
    id: 'godowlia',
    label: 'Godowlia',
    coords: '25.3108° N, 83.0102° E',
    dist: '4.2 km',
    time: '~15 min',
    icon: '🕌',
    px: 745, py: 285,
    textSide: 'left',
    routeColor: '#1e3a6e',
    statIcon: '🕌',
    statLabel: 'FROM GODOWLIA',
  },
  {
    id: 'cantt',
    label: 'Varanasi Cantt',
    coords: '25.2940° N, 83.0127° E',
    dist: '8.5 km',
    time: '~25 min',
    icon: '🏢',
    px: 455, py: 432,
    textSide: 'top',
    routeColor: '#1e3a6e',
    statIcon: '🏢',
    statLabel: 'FROM CANTT',
  },
];

// Build a smooth quadratic bezier from landmark to VVS
function buildPath(lm) {
  const mx = (lm.px + VENUE.x) / 2 + (VENUE.y - lm.py) * 0.18;
  const my = (lm.py + VENUE.y) / 2 - (VENUE.x - lm.px) * 0.08;
  return `M ${lm.px} ${lm.py} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${VENUE.x} ${VENUE.y}`;
}

// Mid-point along path to place distance label
function midPoint(lm) {
  const t = 0.42;
  const mx = (lm.px + VENUE.x) / 2 + (VENUE.y - lm.py) * 0.18;
  const my = (lm.py + VENUE.y) / 2 - (VENUE.x - lm.px) * 0.08;
  const x = (1 - t) * (1 - t) * lm.px + 2 * (1 - t) * t * mx + t * t * VENUE.x;
  const y = (1 - t) * (1 - t) * lm.py + 2 * (1 - t) * t * my + t * t * VENUE.y;
  return { x, y };
}

export default function CartographicArrivalMap() {
  const directionsUrl = 'https://maps.google.com/?q=Vasant+Kanya+Mahavidyalaya+Kammacha+Varanasi';

  return (
    <section className="venue-map-section section-padding" style={{ background: '#f5f8fc' }}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="venue-section-heading"
      >
        <span className="venue-section-label">Interactive Map</span>
        <h2>Find Your Way to VVS</h2>
        <p className="max-w-xl mx-auto" style={{ color: 'var(--venue-muted)' }}>
          Vasant Kanya Mahavidyalaya, Kammachha, Varanasi
        </p>
      </motion.div>


      {/* ── Map Canvas ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="relative max-w-5xl mx-auto"
      >
        {/* ── Map Canvas ────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, #f8f2e3 0%, #ede5cf 60%, #e8dfc8 100%)',
            boxShadow: '0 12px 48px rgba(26,39,68,0.18), 0 2px 8px rgba(26,39,68,0.10)',
            border: '1.5px solid #d4c08a',
          }}
        >
          {/* ── SVG Map ─────────────────────────────────────────────────── */}
          <div className="relative w-full" style={{ paddingBottom: '58%' }}>
            <svg
              viewBox="0 0 900 520"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Paper texture grid */}
                <pattern id="cream-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(26,39,68,0.04)" strokeWidth="0.8" />
                </pattern>

                {/* Ganga river gradient */}
                <linearGradient id="ganga-g" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6baed6" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#9ecae1" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#6baed6" stopOpacity="0.30" />
                </linearGradient>

                {/* Gold glow */}
                <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="g" />
                  <feMerge><feMergeNode in="g" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>

                {/* Dash animation */}
                <style>{`
                  .dash-anim {
                    stroke-dasharray: 7 8;
                    animation: dashFlow 2.2s linear infinite;
                  }
                  @keyframes dashFlow { to { stroke-dashoffset: -30; } }
                  .pin-pulse { animation: pinPulse 2.6s ease-in-out infinite; }
                  @keyframes pinPulse {
                    0%,100%{ r:22; opacity:0.22; }
                    50%{ r:36; opacity:0.08; }
                  }
                `}</style>
              </defs>

              {/* Background */}
              <rect width="900" height="520" fill="transparent" />
              <rect width="900" height="520" fill="url(#cream-grid)" />

              {/* ── River Ganga ────────────────────────────────────────── */}
              {/* Body */}
              <path
                d="M 820 520 C 790 440, 770 360, 750 290 C 730 220, 710 160, 690 100 C 680 60, 665 30, 650 0"
                fill="none"
                stroke="url(#ganga-g)"
                strokeWidth="42"
                strokeLinecap="round"
              />
              {/* Highlight shimmer */}
              <path
                d="M 820 520 C 790 440, 770 360, 750 290 C 730 220, 710 160, 690 100 C 680 60, 665 30, 650 0"
                fill="none"
                stroke="rgba(147,197,253,0.50)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* River label */}
              <text
                x="745"
                y="270"
                fill="rgba(59,130,246,0.52)"
                fontSize="10"
                fontWeight="600"
                letterSpacing="2.5"
                fontStyle="italic"
                transform="rotate(-72, 745, 270)"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                River Ganga
              </text>

              {/* ── Area text labels ───────────────────────────────────── */}
              <text x="195" y="240" fill="rgba(26,39,68,0.18)" fontSize="22" fontWeight="700" letterSpacing="2" style={{ fontFamily: 'Georgia, serif' }}>
                Varanasi
              </text>
              <text x="130" y="390" fill="rgba(26,39,68,0.15)" fontSize="18" fontWeight="600" letterSpacing="1.5" style={{ fontFamily: 'Georgia, serif' }}>
                BHU
              </text>

              {/* ── Compass Rose (top-left) ────────────────────────────── */}
              <g transform="translate(54, 54)">
                <circle cx="0" cy="0" r="22" fill="rgba(26,39,68,0.06)" stroke="rgba(26,39,68,0.18)" strokeWidth="1" />
                {/* N */}
                <polygon points="0,-17 -4,-4 4,-4" fill="#1a2744" opacity="0.8" />
                {/* S */}
                <polygon points="0,17 -4,4 4,4" fill="#1a2744" opacity="0.4" />
                {/* E */}
                <polygon points="17,0 4,-4 4,4" fill="#1a2744" opacity="0.4" />
                {/* W */}
                <polygon points="-17,0 -4,-4 -4,4" fill="#1a2744" opacity="0.4" />
                <text x="0" y="-24" textAnchor="middle" fill="#1a2744" fontSize="9" fontWeight="800" style={{ fontFamily: 'Georgia, serif' }}>N</text>
              </g>

              {/* India flags near Airport and Junction */}
              <g transform="translate(108,78)">
                <rect width="20" height="14" rx="1" fill="#f0f0f0" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                <rect y="0" width="20" height="4.67" fill="#FF9933" />
                <rect y="4.67" width="20" height="4.67" fill="#fff" />
                <rect y="9.33" width="20" height="4.67" fill="#138808" />
                <circle cx="10" cy="7" r="1.8" fill="none" stroke="#000080" strokeWidth="0.5" />
              </g>
              <g transform="translate(720,78)">
                <rect width="20" height="14" rx="1" fill="#f0f0f0" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                <rect y="0" width="20" height="4.67" fill="#FF9933" />
                <rect y="4.67" width="20" height="4.67" fill="#fff" />
                <rect y="9.33" width="20" height="4.67" fill="#138808" />
                <circle cx="10" cy="7" r="1.8" fill="none" stroke="#000080" strokeWidth="0.5" />
              </g>

              {/* ── Routes (landmark → VVS) ───────────────────────────── */}
              {LANDMARKS.map(lm => (
                <path
                  key={`r-${lm.id}`}
                  d={buildPath(lm)}
                  fill="none"
                  stroke="#1a2744"
                  strokeWidth="1.6"
                  strokeOpacity="0.55"
                  className="dash-anim"
                  strokeLinecap="round"
                />
              ))}

              {/* ── Distance labels on routes ─────────────────────────── */}
              {LANDMARKS.map(lm => {
                const mp = midPoint(lm);
                return (
                  <g key={`dl-${lm.id}`}>
                    <rect
                      x={mp.x - 24} y={mp.y - 13}
                      width="48" height="26"
                      rx="4"
                      fill="rgba(248,242,227,0.92)"
                      stroke="rgba(26,39,68,0.15)"
                      strokeWidth="0.8"
                    />
                    <text x={mp.x} y={mp.y - 2} textAnchor="middle" fill="#1a2744" fontSize="8" fontWeight="700" style={{ fontFamily: 'Georgia, serif' }}>
                      {lm.dist}
                    </text>
                    <text x={mp.x} y={mp.y + 8} textAnchor="middle" fill="#6b7280" fontSize="7.5" style={{ fontFamily: 'Georgia, serif' }}>
                      {lm.time}
                    </text>
                  </g>
                );
              })}

              {/* ── VVS Pulse rings ───────────────────────────────────── */}
              <circle cx={VENUE.x} cy={VENUE.y} r="36" fill="#c9a84c" className="pin-pulse" />
              <circle cx={VENUE.x} cy={VENUE.y} r="20" fill="rgba(201,168,76,0.18)" />

              {/* ── Landmark dots ─────────────────────────────────────── */}
              {LANDMARKS.map(lm => (
                <circle key={`dot-${lm.id}`} cx={lm.px} cy={lm.py} r="7" fill="#1a2744" stroke="#f3ede0" strokeWidth="2" />
              ))}

              {/* ── VVS Gold Location PIN (SVG foreignObject) ─────────────────── */}
              <foreignObject
                x={VENUE.x - 100}
                y={VENUE.y - 120}
                width="200"
                height="120"
                style={{ overflow: 'visible' }}
              >
                <div
                  className="flex flex-col items-center"
                  style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
                >
                  {/* Gold teardrop pin */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50% 50% 50% 0',
                      transform: 'rotate(-45deg)',
                      background: 'linear-gradient(135deg, #e8c84a 0%, #c9a030 60%, #a87e20 100%)',
                      boxShadow: '0 4px 20px rgba(201,160,48,0.60)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: -4,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <div style={{ transform: 'rotate(45deg)', color: '#1a2744', fontSize: 20, lineHeight: 1 }}>
                      📍
                    </div>
                  </div>
                  {/* VVS Label card */}
                  <div
                    style={{
                      background: 'rgba(248,242,227,0.97)',
                      border: '1.5px solid #c9a84c',
                      borderRadius: 10,
                      padding: '7px 14px',
                      textAlign: 'center',
                      boxShadow: '0 4px 18px rgba(26,39,68,0.18)',
                      minWidth: 155,
                      marginTop: 8,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 800, color: '#c9a030', textTransform: 'uppercase', letterSpacing: '0.18em', display: 'block' }}>→ VVS 2.0</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1a2744', display: 'block', fontFamily: 'var(--font-heading, Georgia, serif)', lineHeight: 1.3 }}>Vasant Kanya Mahavidyalaya</span>
                    <span style={{ fontSize: 10, color: '#6b7280', display: 'block' }}>Kammachha, Varanasi</span>
                  </div>
                </div>
              </foreignObject>

              {/* ── Landmark Badges (SVG foreignObject) ─────────────── */}
              {LANDMARKS.map(lm => {
                const isLeft = lm.px < 350;
                const isRight = lm.px > 580;

                const width = 240;
                const height = 90;

                // Base coordinates (centered horizontally and vertically on dot)
                let x = lm.px - width / 2;
                let y = lm.py - height / 2;

                // Adjust based on side
                if (isLeft) x = lm.px - 10;
                else if (isRight) x = lm.px - width + 10;

                if (lm.textSide === 'top') {
                  y = lm.py - height + 10;
                }

                return (
                  <foreignObject
                    key={`badge-${lm.id}`}
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{ overflow: 'visible' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isLeft ? 'flex-start' : isRight ? 'flex-end' : 'center',
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 9,
                          background: 'rgba(26,39,68,0.93)',
                          border: '1.5px solid rgba(201,168,76,0.35)',
                          borderRadius: 12,
                          padding: '7px 11px',
                          boxShadow: '0 4px 16px rgba(26,39,68,0.22)',
                          backdropFilter: 'blur(4px)',
                          maxWidth: 200,
                        }}
                      >
                        {/* Icon circle */}
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(201,168,76,0.15)',
                            border: '1.5px solid rgba(201,168,76,0.45)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 15,
                            flexShrink: 0,
                            color: '#c9a84c',
                          }}
                        >
                          {lm.icon}
                        </div>
                        <div>
                          {lm.label.split('\n').map((line, i) => (
                            <div key={i} style={{ fontSize: i === 0 ? 11 : 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? '#f5f0e4' : '#9ca3af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                              {line}
                            </div>
                          ))}
                          <div style={{ fontSize: 9, color: '#c9a84c', marginTop: 1 }}>
                            📍 {lm.coords}
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </svg>
          </div>

          {/* ── Bottom Distance Stat Bar ─────────────────────────────────── */}
          <div
            style={{
              borderTop: '1.5px solid rgba(201,168,76,0.25)',
              background: 'rgba(243,237,224,0.95)',
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 0,
              padding: '14px 8px',
            }}
          >
            {LANDMARKS.map((lm, i) => (
              <div
                key={`stat-${lm.id}`}
                style={{
                  textAlign: 'center',
                  flex: '1 0 18%',
                  padding: '4px 8px',
                  borderRight: i < LANDMARKS.length - 1 ? '1px solid rgba(26,39,68,0.12)' : 'none',
                  minWidth: 90,
                }}
              >
                <div style={{ fontSize: 9, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 3 }}>
                  {lm.statLabel}
                </div>
                <div style={{ fontSize: 13, marginBottom: 1 }}>{lm.statIcon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1a2744', lineHeight: 1, fontFamily: 'var(--font-heading, Georgia, serif)' }}>
                  {lm.dist}
                </div>
                <div style={{ fontSize: 10, color: '#6b7280', marginTop: 2 }}>{lm.time} 🚗</div>
              </div>
            ))}
          </div>
        </div>



        {/* ── Footer CTA ──────────────────────────────────────────────────── */}
        <div className="mt-8 text-center">
          <p
            className="flex items-center justify-center gap-1.5 text-sm font-semibold mb-5"
            style={{ color: '#4a5568' }}
          >
            <span style={{ color: '#c9a030' }}>📍</span> Kammachha, Varanasi
          </p>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-24" style={{ background: 'linear-gradient(to right, transparent, #c9a84c)' }} />
            <span style={{ color: '#c9a84c' }}>✦</span>
            <div className="h-px w-24" style={{ background: 'linear-gradient(to left, transparent, #c9a84c)' }} />
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#1a2744',
              color: '#f5f0e4',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '14px 36px',
              borderRadius: 8,
              boxShadow: '0 4px 20px rgba(26,39,68,0.30)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <MapPin size={16} />
            Get Directions →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
