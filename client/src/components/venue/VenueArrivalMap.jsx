import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

/**
 * Real geographic coordinates (lat, lng) for Varanasi landmarks.
 * All positions derived from verified geographic data.
 *
 * Bounding box used for coordinate projection:
 *   Lat: 25.265 (S) → 25.470 (N)
 *   Lng: 82.840 (W) → 83.045 (E)
 *
 * SVG viewport: 1000 × 600 (16.67:10 ratio ≈ widescreen)
 */

const MAP_BOUNDS = {
  latMin: 25.255,
  latMax: 25.470,
  lngMin: 82.835,
  lngMax: 83.055,
  svgW: 1000,
  svgH: 600,
};

function project(lat, lng) {
  const x =
    ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) *
    MAP_BOUNDS.svgW;
  // SVG Y is inverted: north = small Y
  const y =
    ((MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) *
    MAP_BOUNDS.svgH;
  return { x, y };
}

// ── Real coordinates ────────────────────────────────────────────────────────
const VENUE = project(25.2935, 82.9947); // Vasant Kanya Mahavidyalaya, Kammachha

const LANDMARKS = [
  {
    id: 'airport',
    label: 'Lal Bahadur Shastri\nInt\'l Airport',
    shortLabel: 'Airport (VNS)',
    lat: 25.4524,
    lng: 82.8593,
    dist: '26 km · ~50 min',
    color: '#93c5fd',   // soft blue
    bgClass: 'bg-blue-950',
    borderClass: 'border-blue-500/40',
    textClass: 'text-blue-300',
    routeColor: '#4a6fa5',
    isGold: false,
  },
  {
    id: 'cantt',
    label: 'Varanasi\nCantt',
    shortLabel: 'Varanasi Cantt',
    lat: 25.3084,
    lng: 82.9611,
    dist: '4.8 km · ~18 min',
    color: '#a5b4fc',
    bgClass: 'bg-indigo-950',
    borderClass: 'border-indigo-400/40',
    textClass: 'text-indigo-300',
    routeColor: '#4a6fa5',
    isGold: false,
  },
  {
    id: 'junction',
    label: 'Varanasi\nJunction (BSB)',
    shortLabel: 'Varanasi Junction',
    lat: 25.3176,
    lng: 82.9990,
    dist: '4.5 km · ~15 min',
    color: '#d4af37',
    bgClass: 'bg-[#1a1400]',
    borderClass: 'border-gold/60',
    textClass: 'text-gold',
    routeColor: '#c9a227',
    isGold: true,
  },
  {
    id: 'godowlia',
    label: 'Godowlia\nCrossing',
    shortLabel: 'Godowlia',
    lat: 25.3078,
    lng: 83.0103,
    dist: '2.5 km · ~10 min',
    color: '#fcd34d',
    bgClass: 'bg-amber-950',
    borderClass: 'border-amber-400/40',
    textClass: 'text-amber-300',
    routeColor: '#c9a227',
    isGold: true,
  },
  {
    id: 'bhu',
    label: 'BHU\n(Lanka Gate)',
    shortLabel: 'BHU, Lanka',
    lat: 25.2677,
    lng: 82.9913,
    dist: '2.8 km · ~12 min',
    color: '#d4af37',
    bgClass: 'bg-[#1a1400]',
    borderClass: 'border-gold/60',
    textClass: 'text-gold',
    routeColor: '#c9a227',
    isGold: true,
  },
];

// Ganga River approximate polyline (verified northward curve east of city)
const GANGA_POINTS = [
  project(25.255, 83.044),
  project(25.275, 83.040),
  project(25.300, 83.032),
  project(25.318, 83.024),
  project(25.332, 83.010),
  project(25.345, 82.998),
  project(25.360, 82.988),
  project(25.380, 82.975),
  project(25.400, 82.960),
  project(25.425, 82.942),
  project(25.455, 82.925),
  project(25.470, 82.910),
];

function polylinePoints(pts) {
  return pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

// Build quadratic bezier path from landmark to venue
function buildRoute(lm) {
  const from = project(lm.lat, lm.lng);
  const to = VENUE;
  // Mid-control point: slightly offset perpendicular for a gentle curve
  const mx = (from.x + to.x) / 2 + (to.y - from.y) * 0.15;
  const my = (from.y + to.y) / 2 - (to.x - from.x) * 0.15;
  return `M ${from.x.toFixed(1)},${from.y.toFixed(1)} Q ${mx.toFixed(1)},${my.toFixed(1)} ${to.x.toFixed(1)},${to.y.toFixed(1)}`;
}

// Landmark pin offset (so label cards don't overlap the path endpoint)
const PIN_OFFSET = { x: 0, y: -28 };

export default function VenueArrivalMap({ venueName, address, directionsUrl }) {
  const mapsUrl = directionsUrl || 'https://maps.google.com/?q=Vasant+Kanya+Mahavidyalaya+Kammacha+Varanasi';
  const displayName = venueName || 'Vasant Kanya Mahavidyalaya';
  const displayAddress = address || 'Kammachha, Varanasi';

  return (
    <section
      className="bg-[#080e1f] border-t border-gold/20 text-white"
      style={{ fontFamily: 'inherit' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold/30 bg-gold/8 text-gold text-[11px] font-bold uppercase tracking-[0.22em] mb-5">
            <span>◈</span> Arrival & Navigation Guide
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2"
            style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}
          >
            Find Your Way to VVS
          </h2>
          <p className="text-base sm:text-lg text-gold/85 font-medium italic" style={{ fontFamily: 'Georgia, serif' }}>
            {displayName}
          </p>
          <p className="text-sm text-slate-400 mt-0.5 font-medium">{displayAddress}</p>
        </motion.div>

        {/* ── Desktop SVG Map ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:block relative w-full rounded-2xl overflow-hidden border border-white/8 shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
          style={{ background: '#070c1a' }}
        >
          <svg
            viewBox={`0 0 ${MAP_BOUNDS.svgW} ${MAP_BOUNDS.svgH}`}
            className="w-full"
            style={{ display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Fine grid */}
              <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.028)" strokeWidth="0.8" />
              </pattern>

              {/* Ganga river gradient */}
              <linearGradient id="gangaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.18" />
              </linearGradient>

              {/* Gold glow filter for VVS pin */}
              <filter id="goldGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="8" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Soft pulse ring */}
              <filter id="softRing" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" />
              </filter>

              {/* Route dash animation */}
              <style>{`
                .route-dash {
                  stroke-dasharray: 6 7;
                  animation: dashMove 2s linear infinite;
                }
                @keyframes dashMove {
                  to { stroke-dashoffset: -26; }
                }
                .vvs-pulse {
                  animation: vvsPulse 2.4s ease-in-out infinite;
                }
                @keyframes vvsPulse {
                  0%, 100% { opacity: 0.35; r: 22; }
                  50% { opacity: 0.08; r: 38; }
                }
              `}</style>
            </defs>

            {/* Background fill */}
            <rect width={MAP_BOUNDS.svgW} height={MAP_BOUNDS.svgH} fill="#070c1a" />
            <rect width={MAP_BOUNDS.svgW} height={MAP_BOUNDS.svgH} fill="url(#mapgrid)" />

            {/* Subtle ambient radial around VVS */}
            <radialGradient id="venueAmbient" cx={VENUE.x / MAP_BOUNDS.svgW} cy={VENUE.y / MAP_BOUNDS.svgH} r="0.35" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
            <rect width={MAP_BOUNDS.svgW} height={MAP_BOUNDS.svgH} fill="url(#venueAmbient)" />

            {/* ── GANGA RIVER ─────────────────────────────────────────────── */}
            {/* River body */}
            <polyline
              points={polylinePoints(GANGA_POINTS)}
              fill="none"
              stroke="url(#gangaGrad)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* River edge shimmer */}
            <polyline
              points={polylinePoints(GANGA_POINTS)}
              fill="none"
              stroke="#93c5fd"
              strokeWidth="1.4"
              strokeOpacity="0.22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* River label */}
            <text
              x={GANGA_POINTS[5].x + 32}
              y={GANGA_POINTS[5].y - 12}
              fill="rgba(147,197,253,0.45)"
              fontSize="9.5"
              letterSpacing="3"
              fontWeight="600"
              textAnchor="middle"
              transform={`rotate(-68, ${GANGA_POINTS[5].x + 32}, ${GANGA_POINTS[5].y - 12})`}
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
            >
              Ganga
            </text>

            {/* ── LANDMARK ROUTES ─────────────────────────────────────────── */}
            {LANDMARKS.map(lm => (
              <path
                key={`route-${lm.id}`}
                d={buildRoute(lm)}
                fill="none"
                stroke={lm.routeColor}
                strokeWidth={lm.isGold ? 2.2 : 1.8}
                strokeOpacity={lm.isGold ? 0.85 : 0.65}
                className="route-dash"
                strokeLinecap="round"
              />
            ))}

            {/* ── VVS PULSE RINGS ──────────────────────────────────────────── */}
            <circle
              cx={VENUE.x}
              cy={VENUE.y}
              r="38"
              fill="#d4af37"
              opacity="0.06"
              filter="url(#softRing)"
            />
            <circle
              cx={VENUE.x}
              cy={VENUE.y}
              r="22"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1"
              strokeOpacity="0.35"
              className="vvs-pulse"
            />
            <circle cx={VENUE.x} cy={VENUE.y} r="13" fill="#d4af37" fillOpacity="0.18" />
            <circle cx={VENUE.x} cy={VENUE.y} r="7" fill="#d4af37" filter="url(#goldGlow)" />

            {/* ── LANDMARK DOTS ────────────────────────────────────────────── */}
            {LANDMARKS.map(lm => {
              const pos = project(lm.lat, lm.lng);
              return (
                <circle
                  key={`dot-${lm.id}`}
                  cx={pos.x}
                  cy={pos.y}
                  r="5"
                  fill={lm.color}
                  fillOpacity="0.9"
                  stroke="#080e1f"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* ── VVS DESTINATION LABEL (HTML overlay) ──────────────────────── */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${(VENUE.x / MAP_BOUNDS.svgW) * 100}%`,
              top: `${(VENUE.y / MAP_BOUNDS.svgH) * 100}%`,
              transform: 'translate(-50%, -110%)',
            }}
          >
            <div className="flex flex-col items-center gap-1.5">
              {/* Gold star icon */}
              <div className="w-12 h-12 rounded-xl bg-[#0a1020] border-2 border-gold flex items-center justify-center shadow-[0_0_24px_rgba(212,175,55,0.55)]">
                <span className="text-gold text-xl">★</span>
              </div>
              {/* Info card */}
              <div className="bg-[#080e1f]/95 border border-gold/60 rounded-xl px-4 py-2.5 text-center shadow-2xl min-w-[190px] backdrop-blur-sm">
                <span className="block text-[9px] font-extrabold uppercase tracking-[0.2em] text-gold/70 mb-0.5">Destination Venue</span>
                <span className="block text-sm font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>VVS 2.0</span>
                <span className="block text-[11px] text-gold font-semibold leading-tight">Vasant Kanya Mahavidyalaya</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Kammachha, Varanasi</span>
              </div>
            </div>
          </div>

          {/* ── LANDMARK LABELS (HTML overlays) ──────────────────────────── */}
          {LANDMARKS.map(lm => {
            const pos = project(lm.lat, lm.lng);
            // Anchor label away from center
            const dx = pos.x - VENUE.x;
            const dy = pos.y - VENUE.y;
            const angle = Math.atan2(dy, dx);
            const offsetDist = 52;
            const ox = Math.cos(angle) * offsetDist;
            const oy = Math.sin(angle) * offsetDist;
            const pivotX = (pos.x / MAP_BOUNDS.svgW) * 100;
            const pivotY = (pos.y / MAP_BOUNDS.svgH) * 100;
            const alignLeft = dx > 0 ? 'left' : 'right';

            return (
              <div
                key={`label-${lm.id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `calc(${pivotX}% + ${ox}px)`,
                  top: `calc(${pivotY}% + ${oy}px)`,
                  transform: alignLeft === 'left'
                    ? 'translateY(-50%)'
                    : 'translate(-100%, -50%)',
                }}
              >
                <div className={`flex flex-col border rounded-lg px-3 py-2 shadow-lg ${lm.bgClass} ${lm.borderClass} min-w-[130px]`}>
                  <span className={`text-[10px] font-bold ${lm.textClass} leading-snug whitespace-pre-line`}>{lm.label}</span>
                  <span className="text-[9px] text-slate-400 mt-0.5">{lm.dist}</span>
                </div>
              </div>
            );
          })}

          {/* ── GANGA LABEL badge ────────────────────────────────────────── */}
          <div
            className="absolute pointer-events-none"
            style={{ right: '4%', top: '40%', transform: 'translateY(-50%)' }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400/50 italic" style={{ fontFamily: 'Georgia, serif' }}>
              Holy River Ganga →
            </span>
          </div>
        </motion.div>

        {/* ── Mobile Vertical Arrival Timeline ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:hidden max-w-sm mx-auto"
        >
          {[
            LANDMARKS[0], // Airport
            LANDMARKS[2], // Varanasi Junction
            null,         // null = VVS center card
            LANDMARKS[1], // Cantt
            LANDMARKS[3], // Godowlia
            LANDMARKS[4], // BHU
          ].map((lm, i) => {
            if (lm === null) {
              // Central VVS card
              return (
                <div key="vvs-card" className="flex flex-col items-center py-1">
                  <div className="w-0.5 h-6 border-l-2 border-dashed border-gold" />
                  <div className="w-full border-2 border-gold rounded-2xl bg-gradient-to-b from-[#0e1728] to-[#080e1f] p-5 text-center shadow-[0_0_30px_rgba(212,175,55,0.25)] my-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest mb-2">
                      ★ Destination
                    </span>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>VVS 2.0</h3>
                    <p className="text-sm font-semibold text-gold">Vasant Kanya Mahavidyalaya</p>
                    <p className="text-xs text-slate-400 mt-0.5">Kammachha, Varanasi</p>
                  </div>
                  <div className="w-0.5 h-6 border-l-2 border-dashed border-gold" />
                </div>
              );
            }
            return (
              <div key={lm.id} className="flex flex-col items-center">
                {i > 0 && <div className={`w-0.5 h-5 border-l-2 border-dashed ${lm.isGold ? 'border-gold/60' : 'border-blue-500/40'}`} />}
                <div className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 border ${lm.bgClass} ${lm.borderClass}`}>
                  <span className={`text-lg ${lm.textClass}`}>●</span>
                  <div>
                    <p className={`text-xs font-bold ${lm.textClass} leading-snug`}>{lm.shortLabel}</p>
                    <p className="text-[11px] text-slate-400">{lm.dist}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ── Footer CTA ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-4 font-medium">
            {displayAddress}
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gold text-navy text-sm font-bold rounded-xl
              hover:bg-amber-400 transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)]
              active:scale-95 tracking-wide"
          >
            <Navigation size={16} />
            Get Directions →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
