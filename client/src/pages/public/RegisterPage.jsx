import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
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
              Registration
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Register for VVS 2.0
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Join 300+ delegates for two days of parliamentary debate, diplomacy and leadership.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="w-16 h-[3px] bg-gold rounded-full hidden sm:block" />
              <div className="w-16 h-[3px] bg-gold rounded-full hidden sm:block" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-ivory min-h-[50vh] flex items-center justify-center">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-navy/5">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Delegate Registration
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Click the button below to fill out the official registration form and secure your spot at VVS 2.0.
            </p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfYvqGHp7Q5H6o-G_IMFGFFsOFPykCfn5F1Jwn6Xe0Rjyfiqg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] hover:brightness-110 text-navy font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
            >
              Register Here
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
