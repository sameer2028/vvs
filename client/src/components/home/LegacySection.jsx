import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Award, Sparkles, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const legacyHighlights = [
  {
    icon: Users,
    title: 'National Delegation',
    desc: 'Delegates from leading institutions nationwide.'
  },
  {
    icon: BookOpen,
    title: 'High-Impact Debates',
    desc: 'Rigorous parliamentary & diplomatic simulations.'
  },
  {
    icon: Award,
    title: 'Excellence & Awards',
    desc: 'Trophies, certificates & cash prizes conferred.'
  },
  {
    icon: Sparkles,
    title: 'VVS 2.0 Evolution',
    desc: 'Expanded committee matrix & upgraded delegate features.'
  }
];

export default function LegacySection() {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include' });
        const data = await response.json();
        // Filter photos selected to show on main page
        const homepagePhotos = (data.gallery || [])
          .filter(img => img.showOnHomepage !== false)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setGalleryImages(homepagePhotos.slice(0, 5));
      } catch (err) {
        console.error('Failed to load gallery images:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="section-padding bg-surface" id="legacy-section">
      <div className="container-wide mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3, 4].map((i) => {
                const img = galleryImages[i];
                return (
                  <div
                    key={i}
                    className={`rounded-xl bg-white border border-border overflow-hidden ${
                      i === 1 ? 'row-span-2 h-full' : 'aspect-square'
                    } relative shadow-sm`}
                  >
                    {img ? (
                      <div className="relative w-full h-full group">
                        <img src={img.imageUrl} alt={img.caption || 'Legacy'} className="w-full h-full object-cover" />
                        {img.caption && (
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2.5">
                            <p className="text-white text-[11px] font-medium leading-snug line-clamp-2">{img.caption}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/3 to-gold/3">
                        <Camera size={24} className="text-slate-light" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                Our Legacy
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The Beginning of{' '}
                <span className="text-gold">a Legacy</span>
              </h2>
              <div className="gold-line mb-6" />

              <p className="text-base text-slate leading-relaxed mb-4">
                Vasant Vaani Sansad 1.0 marked the beginning of a tradition that brings young voices together
                to debate, deliberate and lead. What started as a vision has grown into a prestigious annual movement.
              </p>
              <p className="text-base text-slate leading-relaxed mb-6">
                VVS 2.0 builds upon this foundation — bigger, bolder and more impactful. Join us as we write the next chapter.
              </p>

              {/* Legacy Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {legacyHighlights.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-border shadow-xs hover:border-gold/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gold-subtle flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={18} className="text-gold-dark" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy">{item.title}</h4>
                      <p className="text-xs text-slate mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-6 mb-6 p-4 bg-white rounded-xl border border-border">
                <div className="text-center">
                  <div
                    className="text-xl font-bold text-navy"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    VVS 1.0
                  </div>
                  <div className="text-[11px] text-slate mt-0.5">The Foundation</div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-navy/20 via-gold to-navy/20 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold" />
                </div>
                <div className="text-center">
                  <div
                    className="text-xl font-bold text-gold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    VVS 2.0
                  </div>
                  <div className="text-[11px] text-slate mt-0.5">The Evolution</div>
                </div>
              </div>
            </div>

            <div>
              <Link
                to="/vvs-1"
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-xl
                  hover:bg-navy-light transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                View Full VVS 1.0 Gallery
                <ArrowRight size={16} className="text-gold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
