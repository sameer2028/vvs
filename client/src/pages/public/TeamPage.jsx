import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ExternalLink } from 'lucide-react';

function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      className="group bg-white rounded-xl border border-border overflow-hidden
        hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
        transition-all duration-300 flex flex-col items-center p-5 text-center"
    >
      {/* Compact Photo */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-surface to-border-light border-2 border-gold/20 flex items-center justify-center overflow-hidden mb-4 group-hover:border-gold/60 transition-all duration-300 shadow-sm flex-shrink-0">
        {member.imageUrl && member.imageUrl !== '/assets/placeholder.jpg' ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <User size={32} className="text-slate-light" />
        )}
      </div>

      <div className="relative w-full">
        <h3
          className="text-base sm:text-lg font-bold text-navy"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm text-gold font-medium mt-1">
          {member.role}
        </p>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-slate hover:text-navy transition-colors">
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include' });
        const data = await response.json();
        // Sort by order if available
        const sortedTeam = (data.teamMembers || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setTeamMembers(sortedTeam);
      } catch (err) {
        console.error('Failed to load team members:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const organisingTeam = teamMembers.filter(m => m.type !== 'guest');
  const guestPanel = teamMembers.filter(m => m.type === 'guest');

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white py-14 lg:py-20 border-b border-[#2c72b8]/30">
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

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-0.5 w-10 bg-[#c69a4a] rounded-full" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#c69a4a] uppercase">
                LEADERSHIP & GUESTS
              </span>
              <div className="h-0.5 w-10 bg-[#c69a4a] rounded-full" />
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              The People <span className="text-[#c69a4a] italic font-serif">Behind VVS</span>
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
              Meet our esteemed guest panel and the core committee driving Vasant Vaani Sansad 2.0.
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full mx-auto pt-1" />
          </motion.div>
        </div>
      </section>

      {/* Dynamic Team Members */}
      <section className="section-padding bg-ivory">
        <div className="container-wide mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center text-slate py-12 border border-dashed border-border rounded-xl max-w-3xl mx-auto">
              Team members and guests will be updated shortly.
            </div>
          ) : (
            <div className="space-y-16">
              {guestPanel.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                    Guest Panel
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {guestPanel.map((member, i) => (
                      <TeamCard key={member._id || i} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {organisingTeam.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                    Organising Committee
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {organisingTeam.map((member, i) => (
                      <TeamCard key={member._id || i} member={member} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
