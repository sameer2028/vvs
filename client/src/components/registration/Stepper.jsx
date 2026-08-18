import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border-light -z-10" />
        
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gold transition-all duration-500 ease-in-out -z-10"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? 'var(--color-gold)' : isActive ? 'var(--color-navy)' : '#fff',
                  borderColor: isCompleted || isActive ? 'transparent' : 'var(--color-border)',
                  color: isCompleted || isActive ? '#fff' : 'var(--color-slate)'
                }}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 text-sm sm:text-base font-bold shadow-sm ${isActive ? 'ring-4 ring-navy/20' : ''}`}
              >
                {isCompleted ? <Check size={18} /> : index + 1}
              </motion.div>
              <div className="hidden sm:block absolute mt-12 w-24 text-center">
                <span className={`text-xs font-medium ${isActive ? 'text-navy' : isCompleted ? 'text-slate-dark' : 'text-slate-light'}`}>
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
