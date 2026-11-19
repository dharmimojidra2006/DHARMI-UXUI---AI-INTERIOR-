import React from 'react';
import { motion } from 'motion/react';
import { KineticMaskReveal, AnimatedDatumRule, ARCHITECTURAL_EASE } from './EditorialMotion';

export const EducationSection: React.FC = () => {
  return (
    <section
      id="education"
      className="py-24 md:py-36 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E3D7BF] dark:bg-[#141C30] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-4">
          <span>07 / Formation</span>
          <span aria-hidden="true">·</span>
          <span>Academic Foundation</span>
        </div>

        <div className="mb-12">
          <KineticMaskReveal>
            <h2 className="text-4xl sm:text-6xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight leading-none">
              Education
            </h2>
          </KineticMaskReveal>
          <AnimatedDatumRule className="mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Chronology & University Anchor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: ARCHITECTURAL_EASE }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="text-4xl sm:text-5xl font-serif-architectural font-light text-[#802C43] dark:text-[#C45D77] tracking-tight">
              2022 — 2026
            </div>

            <div className="border-l border-[#263D78] dark:border-[#C45D77] pl-6 py-2 space-y-4">
              <div>
                <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-1.5">
                  2022 — 2026 · Graduating Cohort
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-semibold">
                  INDUS UNIVERSITY
                </h3>
                <p className="text-base font-serif-architectural text-[#1C2D58] dark:text-[#DDD1BC] mt-1">
                  Bachelor of Interior Design
                </p>
                <p className="text-xs font-mono text-[#3D5288] dark:text-[#BFB299] mt-1">
                  Ahmedabad, Gujarat, India
                </p>
              </div>

              <div className="pt-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] flex items-center gap-2.5">
                <span aria-hidden="true" className="w-5 h-px bg-[#802C43] dark:bg-[#C45D77]" />
                <span className="font-medium tracking-wide uppercase">Graduating Senior · Emerging Practice</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Multidisciplinary Statement & Unboxed Academic Rigor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: ARCHITECTURAL_EASE }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-8 md:p-12 space-y-6 transition-colors duration-300">
              <blockquote className="text-xl sm:text-2xl md:text-[1.65rem] font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5] leading-relaxed font-light">
                "Developing a multidisciplinary design practice through academic projects, spatial research, furniture design, visualization and user-centered design."
              </blockquote>

              <p className="text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                At Indus University, the curriculum emphasizes both hands-on materiality in physical workshops and analytical spatial planning. Dharmi Mojidra’s coursework has spanned historic conservation, adaptive reuse, urban interiors, ergonomic furniture joinery, and digital spatial systems.
              </p>

              <div className="pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#3D5288] dark:text-[#BFB299]">
                <div>
                  <span className="text-[#802C43] dark:text-[#C45D77] block mb-0.5">Academic Focus</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Urban & Adaptive Reuse</span>
                </div>
                <div>
                  <span className="text-[#802C43] dark:text-[#C45D77] block mb-0.5">Location</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Ahmedabad Hub</span>
                </div>
                <div>
                  <span className="text-[#802C43] dark:text-[#C45D77] block mb-0.5">Recognition</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Academic Honors</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
