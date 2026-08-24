import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Calendar, Handshake, Trophy, ImagePlus, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultPhotos = [
    { imageUrl: '/gallery.jpeg', caption: 'VVS 1.0 Youth Parliament Chamber' },
    { imageUrl: '/vkm.jpeg', caption: 'Executive Bureau & Delegates in Committee Debate' },
    { imageUrl: '/ChatGPT Image Aug 24, 2026, 01_01_56 PM.png', caption: 'VVS 1.0 Organizing Committee & Secretariat Team' },
    { imageUrl: '/about.png', caption: 'Chairperson Addressing Committee Delegates' }
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include' });
        const data = await response.json();
        const sortedGallery = (data.gallery || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setGallery(sortedGallery.length > 0 ? sortedGallery : defaultPhotos);
      } catch (err) {
        console.error('Failed to load gallery images:', err);
        setGallery(defaultPhotos);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const stats = [
    {
      value: '300+',
      label: 'Delegates',
      description: 'Young leaders from across the region',
      icon: Users
    },
    {
      value: '6',
      label: 'Committees',
      description: 'Diverse agendas & global perspectives',
      icon: Building2
    },
    {
      value: '2',
      label: 'Days',
      description: 'Of intense debate, learning and collaboration',
      icon: Calendar
    },
    {
      value: 'Countless',
      label: 'Ideas',
      description: 'That sparked change and inspired action',
      icon: Handshake
    }
  ];

  return (
    <div className="vvs1-page pt-20 lg:pt-24 bg-[#F9F6F0]">
      {/* ── 1. Deep Navy Hero Banner with Speaker Visual ────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-[#FFFFFF] py-16 lg:py-24 border-b border-[#2c72b8]/30">
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

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy Column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6 space-y-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.25em] text-[#c69a4a] uppercase">
                  VVS 1.0
                </span>
                <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
              >
                Our First Chapter<br />
                <span className="text-[#c69a4a] font-serif">The Beginning of a Legacy.</span>
              </h1>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
                VVS 1.0 marked the beginning of a journey that brought young voices together to deliberate, debate and design solutions for a better tomorrow.
              </p>

              <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full pt-1" />
            </motion.div>

            {/* Right Youth Parliament Chamber Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 relative flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border-2 border-[#2c72b8]/40 shadow-2xl bg-[#14284b] group">
                <img
                  src="/gallery.jpeg"
                  alt="VVS 1.0 Youth Parliament Chamber"
                  className="w-full h-[280px] sm:h-[340px] object-cover block"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a30]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#0b1a30]/85 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2c72b8] text-white flex items-center justify-center shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      VVS 1.0 First Edition
                    </h4>
                    <p className="text-[11px] text-white/80">
                      Vasant Kanya Mahavidyalaya, BHU
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. 4-Stats Bar (Floating White Card) ────────────────────── */}
      <section className="relative z-20 container-wide mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:-mt-8 lg:-mt-14 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border shadow-xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-border">
            {stats.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 px-4">
                  <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center shrink-0">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <div
                      className="text-xl sm:text-2xl font-bold text-[#14284b] leading-none"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {item.value}
                    </div>
                    <div className="text-xs font-bold text-[#14284b] uppercase tracking-wider mt-1">
                      {item.label}
                    </div>
                    <p className="text-[11px] text-slate mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ── 3. Glimpses from VVS 1.0 Photo Gallery ────────────────── */}
      <section className="py-10 sm:py-16 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
              <h2
                className="text-2xl sm:text-4xl font-bold text-[#14284b]"
                style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
              >
                Glimpses from VVS 1.0
              </h2>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>
          </div>

          {/* Photos Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#2c72b8] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {gallery.map((img, i) => (

                <motion.div
                  key={img._id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 h-40 sm:h-64"
                >
                  <img
                    src={img.imageUrl}
                    alt={img.caption || `VVS 1.0 Photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1a30]/90 via-[#0b1a30]/50 to-transparent p-4 opacity-100 sm:opacity-90 sm:group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-semibold leading-snug">
                      {img.caption || `VVS 1.0 Photo ${i + 1}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* ── 4. Bottom Legacy Banner ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white rounded-2xl border border-[#2c72b8]/30 p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center gap-5 justify-between"
          >
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#2c72b8]/20 border border-[#2c72b8]/40 text-[#c69a4a] flex items-center justify-center shrink-0">
                <Trophy size={24} />
              </div>
              <div className="text-sm sm:text-base font-semibold text-white/90">
                VVS 1.0 was just the beginning. The conversation continues.<br />
                <span className="text-[#c69a4a] font-bold">The legacy grows.</span>
              </div>
            </div>

            {/* Temple Silhouette Watermark */}
            <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
              <svg viewBox="0 0 200 150" className="w-48 h-auto text-white fill-none stroke-current" strokeWidth="1.5">
                <path d="M 100 20 Q 120 50 130 90 L 70 90 Q 80 50 100 20 Z" />
                <path d="M 60 90 L 140 90 L 145 150 L 55 150 Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
