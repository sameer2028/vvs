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
          className={`text-slate shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-gold' : ''
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
        const response = await fetch('/api/settings');
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
      <section className="bg-navy text-white py-5 sm:py-7">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              FAQ
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Everything you need to know about VVS 2.0.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
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
