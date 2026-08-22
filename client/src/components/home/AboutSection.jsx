import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Brain, Globe, Crown } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const highlights = [
  { icon: MessageSquare, label: 'Public Speaking' },
  { icon: Brain, label: 'Critical Thinking' },
  { icon: Globe, label: 'Diplomacy' },
  { icon: Crown, label: 'Leadership' },
];

export default function AboutSection() {
  const [aboutImage, setAboutImage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include' });
        const data = await response.json();
        if (data.aboutImage) {
          setAboutImage(data.aboutImage);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="section-padding bg-ivory" id="about-section">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              About VVS
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              A Platform Where Voices{' '}
              <span className="text-gold">Become Leaders</span>
            </h2>
            <div className="gold-line mb-6" />

            <p className="text-base text-slate leading-relaxed mb-4">
              Vasant Vaani Sansad is the flagship Youth Parliament and Model United Nations
              conference of Vasant Kanya Mahavidyalaya, Banaras Hindu University.
            </p>
            <p className="text-base text-slate leading-relaxed mb-8">
              The event brings students together to debate, collaborate and engage with
              real-world political and international issues — developing leadership, public
              speaking, diplomacy, negotiation and critical-thinking skills through rigorous
              parliamentary and diplomatic simulations.
            </p>

            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-border
                    hover:border-gold/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold-subtle flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-gold-dark" />
                  </div>
                  <span className="text-sm font-medium text-navy">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-md mx-auto w-full flex justify-center"
          >
            {aboutImage ? (
              <img 
                src={aboutImage} 
                alt="About VVS 2.0 Poster" 
                className="w-full h-auto max-h-[680px] object-contain rounded-2xl shadow-xl border border-border" 
              />
            ) : (
              <div className="relative w-full rounded-2xl overflow-hidden bg-surface aspect-[4/3] border border-border shadow-md flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gold-subtle flex items-center justify-center mx-auto mb-4">
                    <Globe size={36} className="text-gold" />
                  </div>
                  <p
                    className="text-xl font-semibold text-navy"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    VVS 2.0
                  </p>
                  <p className="text-sm text-slate mt-1">Youth Parliament & MUN</p>
                  <p className="text-xs text-slate/60 mt-3">
                    Conference imagery will be added via Admin Portal
                  </p>
                </div>
              </div>
            )}

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold-subtle/50 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
