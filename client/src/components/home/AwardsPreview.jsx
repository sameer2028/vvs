import { motion } from 'framer-motion';
import {
  Trophy, Award, Medal, Package, Users, GraduationCap, Share2, TrendingUp,
} from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
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

export default function AwardsPreview() {
  // Show first 4 on homepage
  const previewItems = awardsAndBenefits.slice(0, 4);

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-ivory" id="awards-preview">
      <div className="container-wide mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Awards & Benefits"
          title="What Awaits You"
          subtitle="Compete for prestigious awards, develop real-world skills, and join a national community."
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {previewItems.map((item, i) => {
            const Icon = iconMap[item.icon] || Award;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="group bg-white rounded-xl border border-border p-3.5 sm:p-5
                  hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                  transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-subtle flex items-center justify-center mb-2.5
                    group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dark" />
                  </div>
                  <h4
                    className="text-xs sm:text-base font-bold text-navy mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-slate leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
