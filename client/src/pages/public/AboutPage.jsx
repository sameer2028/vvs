import { motion } from 'framer-motion';
import { BookOpen, School, Vote, Heart } from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';

export default function AboutPage() {
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
              About
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              About Vasant Vaani Sansad
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Understanding the vision, the institution, and the movement behind VVS.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* About VVS */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-border p-8 sm:p-10 mb-10"
          >
            <h2
              className="text-2xl sm:text-3xl font-bold text-navy mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What is VVS?
            </h2>
            <div className="gold-line mb-6" />
            <p className="text-base text-slate leading-relaxed mb-4">
              Vasant Vaani Sansad (VVS) is the flagship Youth Parliament and Model United Nations
              conference of Vasant Kanya Mahavidyalaya, Banaras Hindu University. It is positioned
              as a platform where students debate, collaborate, engage with real-world political
              and international issues, and develop leadership, public speaking, diplomacy,
              negotiation and critical-thinking skills.
            </p>
            <p className="text-base text-slate leading-relaxed">
              VVS 2.0 is the second edition of this conference, building upon the legacy established
              by VVS 1.0. With 300+ expected delegates, 40+ awards, and six committees across
              Youth Parliament, Global Diplomacy and Media, VVS 2.0 aims to be a defining experience
              for student leaders from across India.
            </p>
          </motion.div>

          {/* Core Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16"
          >
            {[
              'Critical Thinking', 'Public Speaking', 'Diplomacy',
              'Leadership', 'Negotiation', 'Policy Awareness',
            ].map((skill, i) => (
              <div
                key={skill}
                className="bg-white rounded-xl border border-border p-5 text-center hover:border-gold/30 transition-colors"
              >
                <span className="text-sm font-medium text-navy">{skill}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vasant Kanya Mahavidyalaya */}
      <section className="section-padding bg-surface">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-subtle flex items-center justify-center">
                <School size={20} className="text-gold-dark" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Vasant Kanya Mahavidyalaya
              </h2>
            </div>
            <div className="gold-line mb-6" />

            <div className="bg-white rounded-xl border border-border p-8 sm:p-10">
              <p className="text-base text-slate leading-relaxed mb-4">
                Vasant Kanya Mahavidyalaya was established in 1954, inspired by Dr. Annie Besant
                and founded by Dr. Rohit Mehta of the Theosophical Society. The college is focused
                on women's education and promotes holistic learning, emphasizing culture, modernity
                and nation-building.
              </p>
              <p className="text-base text-slate leading-relaxed mb-6">
                With the motto <em className="text-navy font-medium">"Education as Service"</em>,
                VKM continues to nurture students who are not just academically accomplished but
                are also socially conscious leaders.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Est.', value: '1954' },
                  { label: 'Focus', value: "Women's Ed." },
                  { label: 'Motto', value: 'Edu. as Service' },
                  { label: 'Affiliation', value: 'BHU' },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-surface rounded-lg">
                    <div className="text-lg font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                      {item.value}
                    </div>
                    <div className="text-xs text-slate mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Electoral Literacy Club */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-subtle flex items-center justify-center">
                <Vote size={20} className="text-gold-dark" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Electoral Literacy Club
              </h2>
            </div>
            <div className="gold-line mb-6" />

            <div className="bg-white rounded-xl border border-border p-8 sm:p-10">
              <p className="text-base text-slate leading-relaxed mb-6">
                The Electoral Literacy Club was created on 3 November 2023 by students of the
                Department of Political Science at Vasant Kanya Mahavidyalaya. It serves as an
                organizational pillar behind VVS.
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
                  <div key={obj} className="flex items-center gap-2 p-3 bg-surface rounded-lg">
                    <Heart size={14} className="text-gold shrink-0" />
                    <span className="text-sm text-navy">{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
