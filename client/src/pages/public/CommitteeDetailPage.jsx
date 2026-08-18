import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FileText, Users, Landmark, Globe, Newspaper } from 'lucide-react';
import Button from '../../components/common/Button';
import { committees } from '../../data/mockData';

const categoryIcons = {
  'Youth Parliament': Landmark,
  'Global Diplomacy': Globe,
  'Media': Newspaper,
};

const categoryColors = {
  'Youth Parliament': { bg: 'bg-blue-50', text: 'text-blue-700' },
  'Global Diplomacy': { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Media': { bg: 'bg-amber-50', text: 'text-amber-700' },
};

export default function CommitteeDetailPage() {
  const { slug } = useParams();
  const committee = committees.find((c) => c.slug === slug);

  if (!committee) {
    return (
      <div className="pt-20 lg:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Committee Not Found
          </h1>
          <p className="text-slate mb-6">The committee you're looking for doesn't exist.</p>
          <Button to="/committees" variant="secondary">
            <ArrowLeft size={16} />
            Back to Committees
          </Button>
        </div>
      </div>
    );
  }

  const Icon = categoryIcons[committee.category] || Landmark;
  const colors = categoryColors[committee.category] || categoryColors['Youth Parliament'];

  return (
    <div className="pt-20 lg:pt-24">
      {/* Header */}
      <section className="bg-navy text-white py-5 sm:py-7">
        <div className="container-narrow mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/committees"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Back to Committees
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon size={16} className={colors.text} />
              </div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                {committee.category}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {committee.name}
            </h1>

            <div className="w-16 h-[3px] bg-gold rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Agenda */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl border border-border p-6 sm:p-8"
              >
                <h2
                  className="text-xl font-bold text-navy mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Agenda
                </h2>
                <div className="gold-line mb-4" />
                <p className="text-base text-navy leading-relaxed font-medium">
                  {committee.agenda}
                </p>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl border border-border p-6 sm:p-8"
              >
                <h2
                  className="text-xl font-bold text-navy mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  About the Committee
                </h2>
                <div className="gold-line mb-4" />
                <p className="text-base text-slate leading-relaxed">
                  {committee.description}
                </p>
              </motion.div>

              {/* Documents (Coming Soon) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl border border-border p-6 sm:p-8"
              >
                <h2
                  className="text-xl font-bold text-navy mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Documents
                </h2>
                <div className="gold-line mb-4" />
                <div className="space-y-3">
                  {['Background Guide', 'Rules of Procedure'].map((doc) => (
                    <div
                      key={doc}
                      className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border-light"
                    >
                      <FileText size={18} className="text-slate-light" />
                      <span className="text-sm text-slate">{doc}</span>
                      <span className="ml-auto text-xs text-slate-light italic">Coming Soon</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Register Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl border border-border p-6 sticky top-28"
              >
                <h3
                  className="text-lg font-bold text-navy mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Interested?
                </h3>
                <p className="text-sm text-slate mb-5">
                  Register for VVS 2.0 and select {committee.name} as your committee preference.
                </p>
                <Button to="/register" variant="primary" className="w-full" id={`register-from-${committee.slug}`}>
                  Register Now
                  <ArrowRight size={16} />
                </Button>

                <div className="mt-5 pt-5 border-t border-border space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Category</span>
                    <span className="font-medium text-navy">{committee.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Fee</span>
                    <span className="font-medium text-navy">₹599</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Dates</span>
                    <span className="font-medium text-navy">26–27 Sep 2026</span>
                  </div>
                </div>
              </motion.div>

              {/* Chairpersons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl border border-border p-6"
              >
                <h3
                  className="text-lg font-bold text-navy mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Chairpersons
                </h3>
                <div className="gold-line mb-4" />
                <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                  <Users size={18} className="text-slate-light" />
                  <span className="text-sm text-slate italic">To be announced</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
