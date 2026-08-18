import { motion } from 'framer-motion';
import { Landmark, Globe, Newspaper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/common/SectionHeader';
import { committeeCategories } from '../../data/mockData';

const categoryIcons = {
  'youth-parliament': Landmark,
  'global-diplomacy': Globe,
  'media': Newspaper,
};

const categoryColors = {
  'youth-parliament': { bg: 'bg-blue-50', text: 'text-blue-700', accent: 'border-blue-200', gradient: 'from-blue-50 to-indigo-50' },
  'global-diplomacy': { bg: 'bg-emerald-50', text: 'text-emerald-700', accent: 'border-emerald-200', gradient: 'from-emerald-50 to-teal-50' },
  'media': { bg: 'bg-amber-50', text: 'text-amber-700', accent: 'border-amber-200', gradient: 'from-amber-50 to-orange-50' },
};

export default function CommitteesPage() {
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
              Committees
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The Committee Experience
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Six dynamic committees across three categories — choose your arena and make your voice count.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Committee Categories */}
      <section className="section-padding bg-ivory">
        <div className="container-wide mx-auto">
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
                className="mb-16 last:mb-0"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <Icon size={20} className={colors.text} />
                  </div>
                  <div>
                    <h2
                      className="text-2xl font-bold text-navy"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate">{category.description}</p>
                  </div>
                </div>

                {/* Committee Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                        id={`committees-page-${committee.slug}`}
                        className="group block bg-white rounded-xl border border-border p-6 h-full
                          hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                          transition-all duration-300"
                      >
                        <span className={`inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.accent} mb-4`}>
                          {category.name}
                        </span>

                        <h3
                          className="text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {committee.name}
                        </h3>

                        <div className="mb-4">
                          <span className="text-xs font-semibold tracking-wider uppercase text-slate mb-1 block">
                            Agenda
                          </span>
                          <p className="text-sm text-slate leading-relaxed">
                            {committee.agenda}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border-light">
                          <span className="text-xs font-semibold text-gold">
                            View Details
                          </span>
                          <ArrowRight
                            size={16}
                            className="text-gold group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
