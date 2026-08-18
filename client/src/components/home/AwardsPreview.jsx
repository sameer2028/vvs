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
    <section className="section-padding bg-ivory" id="awards-preview">
      <div className="container-wide mx-auto">
        <SectionHeader
          label="Awards & Benefits"
          title="What Awaits You"
          subtitle="Compete for prestigious awards, develop real-world skills, and become part of a national community of future leaders."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {previewItems.map((item, i) => {
            const Icon = iconMap[item.icon] || Award;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="group bg-white rounded-xl border border-border p-6
                  hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                  transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center mb-4
                  group-hover:bg-gold/20 transition-colors">
                  <Icon size={22} className="text-gold-dark" />
                </div>
                <h4
                  className="text-lg font-bold text-navy mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h4>
                <p className="text-sm text-slate leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
