import { motion } from 'framer-motion';
import { Download, FileText, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

export default function BrochureSection() {
  return (
    <section className="section-padding bg-navy relative overflow-hidden" id="brochure">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gold blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold blur-[100px]" />
      </div>

      <div className="container-wide mx-auto relative z-10">
        <div className="max-w-4xl mx-auto bg-surface/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <FileText size={40} className="text-gold" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Download the Official Brochure
            </h2>
            <p className="text-slate-light text-lg mb-8 max-w-2xl mx-auto">
              Get all the comprehensive details about Vasant Vaani Sansad 2.0, including committee agendas, rules of procedure, and event schedules in our official brochure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-gold/20"
              >
                <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                Download Brochure
              </a>
              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                View Online
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
