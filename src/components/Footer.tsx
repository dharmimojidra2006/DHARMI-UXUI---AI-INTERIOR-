import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ARCHITECTURAL_EASE } from './EditorialMotion';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#D9CBB1] dark:border-[#2A3759] bg-[#E3D7BF] dark:bg-[#141C30] py-16 md:py-20 text-xs font-mono text-[#3D5288] dark:text-[#BFB299] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: ARCHITECTURAL_EASE }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-14 border-b border-[#D9CBB1] dark:border-[#2A3759]"
        >
          <div className="md:col-span-6 space-y-3">
            <span className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-semibold tracking-wide uppercase block">
              Dharmi Mojidra
            </span>
            <p className="font-serif-architectural text-base text-[#1C2D58] dark:text-[#DDD1BC] italic max-w-sm">
              Spaces shaped by material, atmosphere and the way people experience them.
            </p>
            <p className="text-[#802C43] dark:text-[#C45D77]">
              Interior Design Portfolio
            </p>
          </div>

          <div className="md:col-span-6 flex md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors border-b border-[#263D78] dark:border-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] pb-1 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D78] dark:focus-visible:outline-[#EFE6D5]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#3D5288] dark:text-[#988C75] text-[11px]">
          <div>
            © {new Date().getFullYear()} DHARMI MOJIDRA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>AHMEDABAD</span>
            <span aria-hidden="true" className="text-[#802C43] dark:text-[#C45D77]">
              ·
            </span>
            <span>INTERIOR ARCHITECTURE</span>
            <span aria-hidden="true" className="text-[#802C43] dark:text-[#C45D77]">
              ·
            </span>
            <span>PORTFOLIO MONOGRAPH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
