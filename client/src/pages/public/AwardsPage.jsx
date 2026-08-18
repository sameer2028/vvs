import { motion } from 'framer-motion';
import {
  Trophy, Award, Medal, Package, Users, GraduationCap, Share2, TrendingUp,
} from 'lucide-react';
import SectionHeader from '../../components/common/SectionHeader';
import { awardsAndBenefits } from '../../data/mockData';

const iconMap = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  'package': Package,
  users: Users,
  'graduation-cap': GraduationCap,
  'share-2': Share2,
  'trending-up': TrendingUp,
};

export default function AwardsPage() {
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
              Awards & Benefits
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              What Awaits You
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Compete for prestigious awards, build real-world skills, and become part of a national community.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="section-padding bg-ivory">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awardsAndBenefits.map((item, i) => {
              const Icon = iconMap[item.icon] || Award;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="group bg-white rounded-xl border border-border p-6
                    hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                    transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold-subtle flex items-center justify-center mb-5
                    group-hover:bg-gold/20 transition-colors">
                    <Icon size={26} className="text-gold-dark" />
                  </div>
                  <h3
                    className="text-lg font-bold text-navy mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-slate italic">
              Exact prize amounts and award categories will be announced by the organizing team.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
