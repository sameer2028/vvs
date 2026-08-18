import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, ImagePlus } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        // Sort by order if available
        const sortedGallery = (data.gallery || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setGallery(sortedGallery);
      } catch (err) {
        console.error('Failed to load gallery images:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

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
              Our Legacy
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              VVS 1.0 — The Beginning
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Relive the moments from the first edition of Vasant Vaani Sansad.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-ivory">
        <div className="container-wide mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : gallery.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl max-w-3xl mx-auto text-slate">
              <ImagePlus size={48} className="mx-auto mb-4 text-slate-light" />
              <p>Gallery photos will be updated soon.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((img, i) => (
                  <motion.div
                    key={img._id || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className={`bg-white rounded-xl border border-border overflow-hidden group
                      hover:shadow-[var(--shadow-card-hover)] transition-all duration-300
                      ${i === 0 || i === 5 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'} relative`}
                  >
                    <img src={img.imageUrl} alt={img.caption || `VVS 1.0 Photo ${i + 1}`} className="w-full h-full object-cover" />
                    
                    {img.caption && (
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="text-white text-sm font-medium">{img.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
