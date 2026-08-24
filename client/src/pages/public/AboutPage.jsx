import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Eye,
  Handshake,
  Building2,
  Globe,
  Bird,
  BookOpen,
  Calendar,
  GraduationCap,
  Heart,
  School,
  Vote,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const defaultCampusImg = "/vkm.jpeg";


  const pillars = [
    {
      title: 'OUR PURPOSE',
      icon: Users,
      description: 'To empower young minds to think critically, speak fearlessly and lead responsibly.'
    },
    {
      title: 'OUR MISSION',
      icon: Target,
      description: 'To create a platform that promotes dialogue, diplomacy and democratic values among youth.'
    },
    {
      title: 'OUR VISION',
      icon: Eye,
      description: 'To inspire a generation of ethical leaders who will shape a just, inclusive and sustainable world.'
    },
    {
      title: 'OUR BELIEF',
      icon: Handshake,
      description: 'Every voice matters. Every idea counts. Together, we make change possible.'
    }
  ];

  const standsFor = [
    {
      title: 'PARLIAMENTARY VALUES',
      icon: Building2,
      description: 'Encouraging informed debate, respect and democratic spirit.'
    },
    {
      title: 'GLOBAL PERSPECTIVE',
      icon: Globe,
      description: 'Connecting local voices with global issues.'
    },
    {
      title: 'LEADERSHIP DEVELOPMENT',
      icon: Users,
      description: 'Nurturing confidence, empathy and leadership skills.'
    },
    {
      title: 'PEACE & DIPLOMACY',
      icon: Bird,
      description: 'Promoting dialogue, understanding and peaceful resolutions.'
    },
    {
      title: 'KNOWLEDGE & INTEGRITY',
      icon: BookOpen,
      description: 'Upholding truth, ethics and academic excellence.'
    }
  ];

  return (
    <div className="about-page pt-20 lg:pt-24 bg-[#F9F6F0]">
      {/* ── 1. Hero Section (Matching Design Mockup) ──────────────── */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy Column */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              className="lg:col-span-6 space-y-5 text-left"
            >
              {/* Pre-title Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-[#2c72b8]/40" />
                <span className="text-xs font-bold tracking-[0.25em] text-[#2c72b8] uppercase">
                  ABOUT VVS
                </span>
                <div className="h-px w-12 bg-[#2c72b8]/40" />
              </div>

              {/* Main Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14284b] leading-[1.08]"
                style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
              >
                About <span className="text-[#c69a4a] italic font-serif">VVS</span>
              </h1>

              {/* Subtitle */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-[#14284b]/30" />
                <span className="text-sm font-bold tracking-[0.2em] text-[#14284b] uppercase">
                  VASANT VAANI SANSAD
                </span>
                <div className="h-px w-10 bg-[#14284b]/30" />
              </div>

              {/* Tagline */}
              <h2
                className="text-xl sm:text-2xl font-semibold text-[#14284b] leading-snug mt-2"
                style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
              >
                Where Voices Rise.<br />
                Ideas Unite. Leaders Emerge.
              </h2>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-dark leading-relaxed max-w-xl">
                Vasant Vaani Sansad (VVS) is the official Youth Parliament & Model United Nations initiative of Vasant Kanya Mahavidyalaya, Varanasi. It brings together young leaders, thinkers and changemakers from across the country to deliberate, debate and design solutions for a better tomorrow.
              </p>
            </motion.div>

            {/* Right Arch Podium Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-6 relative flex justify-end"
            >
              <div
                className="relative w-full rounded-2xl overflow-hidden border-2 border-[#2c72b8]/30 shadow-2xl bg-white"
              >
                <img
                  src="/about.png"
                  alt="About VVS Infographic"
                  className="w-full h-auto object-contain block"
                />
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Deep Navy 4-Pillars Bar (Purpose, Mission, Vision, Belief) ── */}
      <section className="bg-[#0f2240] text-white py-12 sm:py-16 relative border-y border-[#2c72b8]/30">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/15">
            {pillars.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="text-center px-4 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#2c72b8]/20 border border-[#2c72b8]/40 flex items-center justify-center mb-4 text-[#4388cc]">
                    <IconComponent size={26} />
                  </div>
                  <h3
                    className="text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-white mb-2"
                    style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. WHAT VVS STANDS FOR (5 Columns Grid) ───────────────────── */}
      <section className="py-14 sm:py-20 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px w-12 bg-[#2c72b8]/40" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#2c72b8] uppercase">
                WHAT VVS STANDS FOR
              </span>
              <div className="h-px w-12 bg-[#2c72b8]/40" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#2c72b8] mx-auto mt-1" />
          </div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {standsFor.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white rounded-2xl border border-border p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between"
                >
                  <div className="w-16 h-16 rounded-full bg-[#eaf2fb] border border-[#2c72b8]/20 flex items-center justify-center mb-5 text-[#14284b]">
                    <IconComponent size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4
                      className="text-xs sm:text-sm font-bold tracking-wider text-[#14284b] uppercase"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-dark leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Host Institution & Electoral Literacy Club ─────────────── */}
      <section className="py-14 sm:py-20 bg-white border-t border-border">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* VKM Institution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#2c72b8]">
                Host Institution
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#14284b]" style={{ fontFamily: 'var(--font-heading)' }}>
                Vasant Kanya Mahavidyalaya
              </h2>
              <p className="text-sm sm:text-base text-slate leading-relaxed">
                Established in 1954 under the inspiration of <strong>Dr. Annie Besant</strong> and founded by <strong>Dr. Rohit Mehta</strong>, VKM is an esteemed institution affiliated with <strong>Banaras Hindu University (BHU)</strong>.
              </p>
              <p className="text-sm sm:text-base text-slate leading-relaxed">
                Guided by the motto <em>"Education as Service"</em>, VKM promotes holistic education, cultural awareness, and leadership among women scholars.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: 'Founded', value: '1954' },
                  { label: 'Affiliation', value: 'BHU' },
                  { label: 'Focus', value: "Women's Ed." },
                  { label: 'Motto', value: 'Edu. as Service' },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-[#eaf2fb]/60 rounded-xl text-center border border-[#2c72b8]/15">
                    <div className="text-base font-bold text-[#14284b]" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.value}
                    </div>
                    <div className="text-[11px] text-slate mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-lg border border-border h-[300px] sm:h-[360px]"
            >
              <img src={defaultCampusImg} alt="VKM BHU Campus" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* Electoral Literacy Club */}
          <div className="bg-[#eaf2fb]/40 rounded-2xl border border-[#2c72b8]/20 p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#2c72b8] text-white flex items-center justify-center">
                <Vote size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#14284b]" style={{ fontFamily: 'var(--font-heading)' }}>
                Electoral Literacy Club (ELC)
              </h3>
            </div>
            <p className="text-sm sm:text-base text-slate leading-relaxed mb-6">
              Founded on 3 November 2023 by the Department of Political Science at VKM, the Electoral Literacy Club serves as the organizational backbone behind VVS.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'Electoral Awareness',
                'Democratic Values',
                'Civic Responsibility',
                'Voter Rights',
                'Critical Analysis',
                'Combating Misinformation',
              ].map((obj) => (
                <div key={obj} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-border shadow-xs">
                  <Heart size={15} className="text-[#2c72b8] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#14284b]">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
