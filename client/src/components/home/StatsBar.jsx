import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, CalendarDays } from 'lucide-react';
import { eventSettings } from '../../data/mockData';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const stats = [
  {
    value: eventSettings.stats.delegates,
    suffix: '+',
    label: 'Delegates',
    icon: Users,
  },
  {
    value: eventSettings.stats.awards,
    suffix: '+',
    label: 'Awards',
    icon: Award,
  },
  {
    value: eventSettings.stats.days,
    suffix: '',
    label: 'Days',
    icon: CalendarDays,
  },
];

export default function StatsBar() {
  return (
    <section className="relative -mt-1 bg-navy">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-2">
                <stat.icon size={22} className="text-gold" />
              </div>
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-white/60 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
