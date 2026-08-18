import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RegistrationFlow from '../../components/registration/RegistrationFlow';

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
              <Link 
                to="/delegate/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium rounded-full transition-all backdrop-blur-sm"
              >
                Already registered? Login to Delegate Portal
              </Link>
              <div className="w-16 h-[3px] bg-gold rounded-full hidden sm:block" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-ivory min-h-screen">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <RegistrationFlow />
        </div>
      </section>
    </div>
  );
}
