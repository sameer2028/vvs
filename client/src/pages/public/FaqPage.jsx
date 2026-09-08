import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/mockData';

function AccordionItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white hover:border-gold/20 transition-colors">
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full text-left px-6 py-5 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-navy pr-4">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-slate shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold' : ''
            }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0">
              <div className="w-full h-px bg-border mb-4" />
              <p className="text-sm text-slate leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include', credentials: 'include' });
        const data = await response.json();
        // Sort by order if available
        const sortedFaqs = (data.faqs || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        setFaqs(sortedFaqs);
      } catch (err) {
        console.error('Failed to load FAQs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white py-14 lg:py-20 border-b border-[#2c72b8]/30">
        {/* Kashi Temple Dome Outline SVG Watermark */}
        <div className="absolute right-0 bottom-0 top-0 opacity-15 pointer-events-none flex items-end justify-end">
          <svg viewBox="0 0 600 400" className="h-full w-auto text-white fill-none stroke-current" strokeWidth="1.5">
            <path d="M 300 80 Q 350 140 370 220 L 230 220 Q 250 140 300 80 Z" />
            <path d="M 300 40 L 300 80" strokeWidth="3" />
            <circle cx="300" cy="35" r="5" fill="currentColor" />
            <path d="M 210 220 L 390 220 L 400 400 L 200 400 Z" />
            <path d="M 150 160 Q 185 200 200 260 L 100 260 Q 115 200 150 160 Z" />
            <path d="M 450 160 Q 485 200 500 260 L 400 260 Q 415 200 450 160 Z" />
          </svg>
        </div>

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-0.5 w-10 bg-[#c69a4a] rounded-full" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#c69a4a] uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <div className="h-0.5 w-10 bg-[#c69a4a] rounded-full" />
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              Frequently Asked <span className="text-[#c69a4a] italic font-serif">Questions</span>
            </h1>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl mx-auto">
              Everything you need to know about VVS 2.0.
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full mx-auto pt-1" />
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center text-slate py-12 border border-dashed border-border rounded-xl">
              Check back later for frequently asked questions.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              {faqs.map((item, idx) => (
                <AccordionItem
                  key={item._id || idx}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === idx}
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
