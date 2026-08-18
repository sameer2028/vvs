import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-navy" id="cta-banner">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Lead?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed">
            Join 300+ delegates from across India. Debate, collaborate and develop the skills
            that define tomorrow's leaders.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/register" variant="gold" size="lg" id="cta-register-btn">
              Register Now — ₹599
              <ArrowRight size={18} />
            </Button>
            <Button to="/committees" variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10">
              Explore Committees
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
