import { motion } from 'framer-motion';

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
          {label}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-navy leading-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-5 ${centered ? 'gold-line-center' : 'gold-line'}`} />
    </motion.div>
  );
}
