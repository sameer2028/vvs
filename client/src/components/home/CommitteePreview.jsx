import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, Globe, Newspaper } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { committeeCategories } from '../../data/mockData';

const categoryIcons = {
  'youth-parliament': Landmark,
  'global-diplomacy': Globe,
  'media': Newspaper,
};

const categoryColors = {
  'youth-parliament': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  'global-diplomacy': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  'media': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
};

export default function CommitteePreview() {
  return (
    <section className="section-padding bg-surface" id="committees-preview">
      <div className="container-wide mx-auto">
        <SectionHeader
          label="Committees"
          title="The Committee Experience"
          subtitle="Six dynamic committees across three categories — Youth Parliament, Global Diplomacy and Media."
        />

        <div className="space-y-10">
          {committeeCategories.map((category, catIndex) => {
            const Icon = categoryIcons[category.slug] || Landmark;
            const colors = categoryColors[category.slug] || categoryColors['youth-parliament'];

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <Icon size={16} className={colors.text} />
                  </div>
                  <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-slate">
                    {category.name}
                  </h3>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Committee cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.committees.map((committee, i) => (
                    <motion.div
                      key={committee.slug}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                    >
                      <Link
                        to={`/committees/${committee.slug}`}
                        id={`committee-card-${committee.slug}`}
                        className="group block bg-white rounded-xl border border-border p-6
                          hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                          transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className={`inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded ${colors.bg} ${colors.text} ${colors.border} border mb-2`}>
                              {category.name}
                            </span>
                            <h4
                              className="text-xl font-bold text-navy group-hover:text-gold transition-colors"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {committee.name}
                            </h4>
                          </div>
                          <ArrowRight
                            size={18}
                            className="text-slate-light group-hover:text-gold group-hover:translate-x-1 transition-all mt-1"
                          />
                        </div>

                        <p className="text-sm text-slate leading-relaxed line-clamp-3">
                          {committee.agenda}
                        </p>

                        <div className="mt-4 pt-4 border-t border-border-light">
                          <span className="text-xs font-semibold text-gold group-hover:text-gold-dark transition-colors">
                            Explore Committee →
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/committees"
            id="view-all-committees"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy
              hover:text-gold transition-colors"
          >
            View All Committees
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
