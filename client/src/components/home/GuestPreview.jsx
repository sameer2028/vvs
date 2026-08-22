import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, ExternalLink } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

export default function GuestPreview() {
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include' });
        const data = await response.json();
        
        // Filter for guests and sort by order
        const guestPanel = (data.teamMembers || [])
          .filter(m => m.type === 'guest')
          .sort((a, b) => (a.order || 0) - (b.order || 0));
          
        setGuests(guestPanel);
      } catch (err) {
        console.error('Failed to load guests:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuests();
  }, []);

  if (isLoading || guests.length === 0) return null;

  return (
    <section className="section-padding bg-ivory" id="guests-preview">
      <div className="container-wide mx-auto">
        <SectionHeader
          label="Guest Panel"
          title="Our Esteemed Guests"
          subtitle="Meet the judges and chief guests gracing Vasant Vaani Sansad 2.0."
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {guests.map((member, index) => (
            <motion.div
              key={member._id || index}
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
          ))}
        </div>
      </div>
    </section>
  );
}
