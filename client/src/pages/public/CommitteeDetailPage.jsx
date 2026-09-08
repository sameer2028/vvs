import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Landmark, Globe, Newspaper, User, Calendar, MapPin, IndianRupee, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import { committees as mockCommittees } from '../../data/mockData';

const categoryLabel = {
  'youth_parliament': 'Youth Parliament',
  'global_diplomacy': 'Global Diplomacy',
  'media': 'Media',
  'Youth Parliament': 'Youth Parliament',
  'Global Diplomacy': 'Global Diplomacy',
  'Media': 'Media',
};

const categoryIcons = {
  'Youth Parliament': Landmark,
  'Global Diplomacy': Globe,
  'Media': Newspaper,
  'youth_parliament': Landmark,
  'global_diplomacy': Globe,
  'media': Newspaper,
};

const categoryAccent = {
  'Youth Parliament': { color: '#2c72b8', bg: 'bg-blue-50', text: 'text-blue-700' },
  'Global Diplomacy': { color: '#059669', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Media': { color: '#d97706', bg: 'bg-amber-50', text: 'text-amber-700' },
  'youth_parliament': { color: '#2c72b8', bg: 'bg-blue-50', text: 'text-blue-700' },
  'global_diplomacy': { color: '#059669', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'media': { color: '#d97706', bg: 'bg-amber-50', text: 'text-amber-700' },
};

export default function CommitteeDetailPage() {
  const { slug } = useParams();
  const [committee, setCommittee] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/committees/${slug}`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setCommittee(data);
          setBoardMembers(data.boardMembers || []);
        } else {
          // Fallback to mock data
          const mock = mockCommittees.find((c) => c.slug === slug);
          if (mock) setCommittee(mock);
          else setError(true);
        }
      } catch {
        // Fallback to mock data
        const mock = mockCommittees.find((c) => c.slug === slug);
        if (mock) setCommittee(mock);
        else setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommittee();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <div className="w-10 h-10 border-4 border-[#2c72b8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !committee) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#14284b] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Committee Not Found
          </h1>
          <p className="text-slate mb-6">The committee you're looking for doesn't exist.</p>
          <Button to="/committees" variant="secondary">
            <ArrowLeft size={16} />
            Back to Committees
          </Button>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[committee.category] || Landmark;
  const accent = categoryAccent[committee.category] || categoryAccent['Youth Parliament'];

  return (
    <div className="pt-20 lg:pt-24 bg-[#F9F6F0]">

      {/* ── 1. Hero Header (Matching existing page design) ────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white py-14 lg:py-20 border-b border-[#2c72b8]/30">
        {/* Temple Dome SVG Watermark */}
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
            className="max-w-3xl text-left space-y-4"
          >
            {/* Back Link */}
            <Link
              to="/committees"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#c69a4a] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Committees
            </Link>

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-[0.25em] text-[#c69a4a] uppercase">
                {categoryLabel[committee.category] || committee.category}
              </span>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              {committee.name}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl">
              {committee.description}
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. Quick Facts Bar ────────────────────────────────────── */}
      <section className="relative z-20 container-wide mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-[#e8e5df] shadow-lg p-3 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 overflow-hidden"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${accent.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={16} className={`${accent.text} sm:hidden`} />
              <Icon size={20} className={`${accent.text} hidden sm:block`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-slate uppercase tracking-wider font-semibold">Category</p>
              <p className="text-xs sm:text-sm font-bold text-[#14284b] truncate">{categoryLabel[committee.category] || committee.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#eaf2fb] flex items-center justify-center flex-shrink-0">
              <Calendar size={16} className="text-[#2c72b8] sm:hidden" />
              <Calendar size={20} className="text-[#2c72b8] hidden sm:block" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-slate uppercase tracking-wider font-semibold">Dates</p>
              <p className="text-xs sm:text-sm font-bold text-[#14284b] truncate">26–27 Sep 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#eaf2fb] flex items-center justify-center flex-shrink-0">
              <IndianRupee size={16} className="text-[#2c72b8] sm:hidden" />
              <IndianRupee size={20} className="text-[#2c72b8] hidden sm:block" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-slate uppercase tracking-wider font-semibold">Fee</p>
              <p className="text-xs sm:text-sm font-bold text-[#14284b]">₹599</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#eaf2fb] flex items-center justify-center flex-shrink-0">
              <MapPin size={16} className="text-[#2c72b8] sm:hidden" />
              <MapPin size={20} className="text-[#2c72b8] hidden sm:block" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-[11px] text-slate uppercase tracking-wider font-semibold">Venue</p>
              <p className="text-xs sm:text-sm font-bold text-[#14284b] truncate">VKM, Varanasi</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. Agenda Section ─────────────────────────────────────── */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#e8e5df] overflow-hidden shadow-sm"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Accent Strip */}
            <div
              className="w-full lg:w-2 h-2 lg:h-auto flex-shrink-0 rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl"
              style={{ background: accent.color }}
            />

            <div className="p-6 sm:p-8 lg:p-10 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg ${accent.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={accent.text} />
                </div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-[#14284b]"
                  style={{ fontFamily: 'var(--font-detail, "Outfit", sans-serif)' }}
                >
                  Agenda
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#14284b] leading-relaxed font-medium mb-6">
                {committee.agenda}
              </p>

              <div className="h-px bg-[#e8e5df] my-5" />

              <h3
                className="text-lg font-bold text-[#14284b] mb-3"
                style={{ fontFamily: 'var(--font-detail, "Outfit", sans-serif)' }}
              >
                About the Committee
              </h3>
              <p className="text-sm sm:text-base text-[#64748b] leading-relaxed">
                {committee.description}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 4. Executive Board Section ────────────────────────────── */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-[#eaf2fb] flex items-center justify-center flex-shrink-0">
              <Users size={18} className="text-[#2c72b8]" />
            </div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#14284b]"
              style={{ fontFamily: 'var(--font-detail, "Outfit", sans-serif)' }}
            >
              Executive Board
            </h2>
            <div className="flex-1 h-px bg-[#e8e5df]" />
          </div>

          {boardMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member._id || index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.06 * index }}
                  className="group bg-white rounded-2xl border border-[#e8e5df] overflow-hidden text-center max-w-xs sm:max-w-none mx-auto w-full
                    hover:border-[#2c72b8]/30 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Whole Big Photo (Portrait aspect ratio) */}
                  <div className="w-full aspect-[3/4] sm:aspect-[4/5] bg-gradient-to-br from-[#eaf2fb] to-[#dce4f0] relative overflow-hidden flex items-center justify-center">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 p-4">
                        <User className="w-16 h-16 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#94a3b8]" />
                        <span className="text-xs text-[#94a3b8] font-medium">Photo coming soon</span>
                      </div>
                    )}
                  </div>

                  {/* Member Details */}
                  <div className="p-4 sm:p-5 flex flex-col items-center justify-center flex-1">
                    <h3
                      className="text-base sm:text-lg font-bold text-[#14284b] leading-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {member.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#c69a4a] font-semibold mt-1.5 uppercase tracking-wider">
                      {member.post}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-dashed border-[#e8e5df] p-8 text-center">
              <Users size={24} className="text-[#94a3b8] mx-auto mb-3" />
              <p className="text-sm text-[#64748b]">Executive Board members will be announced shortly.</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── 5. Register CTA ───────────────────────────────────────── */}
      <section className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[#14284b] to-[#1e3a5f] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#2c72b8]/20"
        >
          <div>
            <h3
              className="text-xl sm:text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ready to Represent?
            </h3>
            <p className="text-sm text-white/70 max-w-lg">
              Register for VVS 2.0 and select <strong className="text-[#c69a4a]">{committee.name}</strong> as your committee preference. Secure your seat today.
            </p>
          </div>
          <Button
            to="/register"
            variant="primary"
            className="flex-shrink-0 px-6"
            id={`register-from-${committee.slug}`}
          >
            Register Now
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
