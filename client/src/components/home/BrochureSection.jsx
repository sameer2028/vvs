import { motion } from 'framer-motion';
import { Download, FileText, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

export default function BrochureSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-navy relative overflow-hidden" id="brochure">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gold blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold blur-[100px]" />
      </div>

      <div className="container-wide mx-auto relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-surface/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-center shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-5">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Download the Official Brochure
            </h2>
            <p className="text-white/80 text-xs sm:text-base mb-5 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Get all the details about Vasant Vaani Sansad 2.0, including committee agendas, rules of procedure, and event schedules in our brochure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-gold text-navy text-sm sm:text-base font-bold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-md"
              >
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                Download Brochure
              </a>
              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white/10 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                View Online
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
