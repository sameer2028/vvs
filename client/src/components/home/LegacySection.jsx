import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegacySection() {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include',  credentials: 'include' });
        const data = await response.json();
        // Get the first 4 gallery images
        const sortedGallery = (data.gallery || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setGalleryImages(sortedGallery.slice(0, 4));
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
              {[0, 1, 2, 3].map((i) => {
                const img = galleryImages[i];
                return (
                  <div
                    key={i}
                    className={`rounded-xl bg-white border border-border overflow-hidden ${
                      i === 1 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                    } relative`}
                  >
                    {img ? (
                      <img src={img.imageUrl} alt={img.caption || 'Legacy'} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/3 to-gold/3">
                        <Camera size={24} className="text-slate-light" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate mt-3 text-center italic">
              Legacy images updated via Admin Portal Gallery
            </p>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Our Legacy
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-navy leading-tight mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Beginning of{' '}
              <span className="text-gold">a Legacy</span>
            </h2>
            <div className="gold-line mb-6" />

            <p className="text-base text-slate leading-relaxed mb-4">
              VVS 1.0 marked the beginning of a tradition that brings young voices together
              to debate, deliberate and lead. What started as a vision has grown into a
              movement.
            </p>
            <p className="text-base text-slate leading-relaxed mb-8">
              VVS 2.0 builds upon this foundation — bigger, bolder and more impactful. Join
              us as we write the next chapter.
            </p>

            {/* Timeline */}
            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <div
                  className="text-2xl font-bold text-navy"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  VVS 1.0
                </div>
                <div className="text-xs text-slate mt-1">The Beginning</div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-navy/20 via-gold to-navy/20 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold" />
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold text-gold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  VVS 2.0
                </div>
                <div className="text-xs text-slate mt-1">The Evolution</div>
              </div>
            </div>

            <Link
              to="/vvs-1"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy
                hover:text-gold transition-colors"
            >
              View VVS 1.0 Gallery
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
