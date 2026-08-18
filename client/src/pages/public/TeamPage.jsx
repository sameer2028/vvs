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
        transition-all duration-300"
    >
      {/* Photo placeholder or Image */}
      <div className="aspect-[3/3.5] bg-gradient-to-br from-surface to-border-light flex items-center justify-center relative overflow-hidden">
        {member.imageUrl && member.imageUrl !== '/assets/placeholder.jpg' ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-white border-2 border-border flex items-center justify-center group-hover:border-gold/30 transition-colors">
            <User size={32} className="text-slate-light" />
          </div>
        )}
      </div>

      <div className="p-5 text-center relative">
        <h3
          className="text-lg font-bold text-navy"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {member.name}
        </h3>
        <p className="text-sm text-gold font-medium mt-1">
          {member.role}
        </p>
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 text-slate hover:text-navy transition-colors">
            <ExternalLink size={16} />
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
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`);
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
      <section className="bg-navy text-white py-5 sm:py-7">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Leadership & Guests
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The People Behind VVS
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Meet our esteemed guest panel and the core committee driving Vasant Vaani Sansad 2.0.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
