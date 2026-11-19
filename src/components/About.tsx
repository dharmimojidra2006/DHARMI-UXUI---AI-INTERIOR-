import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import {
  KineticMaskReveal,
  ClipCuratedPlate,
  ParallaxLayer,
  AnimatedDatumRule,
  ARCHITECTURAL_EASE,
} from './EditorialMotion';

export const About: React.FC = () => {
  const [hoveredFocus, setHoveredFocus] = useState<number | null>(null);

  const focusAreas = [
    'Interior Design',
    'Spatial Planning',
    'Hospitality & Wellness',
    'Furniture Design',
    'Material Exploration',
    'Visual Communication',
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-36 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9] dark:bg-[#101626] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20">
        {/* Editorial Magazine Folio Top Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77] mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <span>02 / Profile</span>
            <span aria-hidden="true" className="text-[#C7B697] dark:text-[#3A4B75]">
              ·
            </span>
            <span className="text-[#3D5288] dark:text-[#BFB299]">Portrait & Practice</span>
          </div>
          <span className="font-serif-architectural italic normal-case tracking-normal text-sm text-[#3D5288] dark:text-[#BFB299]">
            Dharmi Mojidra · Ahmedabad
          </span>
        </div>

        {/* Oversized Editorial Spread Title overlapping Grid */}
        <div className="mb-10 md:mb-16">
          <div className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-3">
            The Designer
          </div>
          <KineticMaskReveal>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light tracking-tight leading-[0.96]">
              Dharmi Mojidra
            </h2>
          </KineticMaskReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.12, ease: ARCHITECTURAL_EASE }}
            className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] mt-3 tracking-[0.16em] uppercase"
          >
            Graduating Interior Design Designer
          </motion.p>
          <AnimatedDatumRule className="mt-6" delay={0.15} />
        </div>

        {/* Asymmetric Editorial Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Portrait Frame with Parallax Depth & Clip-Path Reveal (5 cols) */}
          <div className="lg:col-span-5">
            <ParallaxLayer offset={24}>
              <ClipCuratedPlate direction="up" className="group">
                <div
                  data-cursor="view"
                  className="relative aspect-3/4 bg-[#DFD2B8] dark:bg-[#18223A] border border-[#C7B697] dark:border-[#2A3759] p-3 overflow-hidden"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src="/assets/aistudio/WhatsApp_Image_2026-11-16_at_3.19.34_PM_b38e79f0.jpeg"
                      alt="Dharmi Mojidra, Graduating Interior Designer"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top grayscale-15 group-hover:grayscale-0 group-hover:scale-[1.035] transition-all duration-700 ease-out"
                    />
                  </div>
                </div>
                {/* Unboxed Exhibition Plate Caption beneath frame */}
                <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#802C43] dark:text-[#C45D77]">
                  <span>Dharmi Mojidra · Interior Design Portfolio</span>
                  <span className="text-[#3D5288] dark:text-[#BFB299]">Fig. 01</span>
                </div>
              </ClipCuratedPlate>
            </ParallaxLayer>
          </div>

          {/* Right Editorial Prose, Academic Datum & Focus Index (7 cols) */}
          <div className="lg:col-span-7 space-y-12 lg:pt-4">
            {/* Editorial Lead Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: ARCHITECTURAL_EASE }}
              className="space-y-6"
            >
              <p className="text-xl sm:text-2xl md:text-[1.7rem] text-[#1C2D58] dark:text-[#DDD1BC] font-serif-architectural leading-[1.48] font-light">
                "Dharmi Mojidra is a graduating interior design student from Indus University, Ahmedabad. Her design approach explores the relationship between people, space, material and experience. Her academic work spans interior design, adaptive reuse, hospitality, wellness, furniture design, spatial research and UX/UI exploration."
              </p>
            </motion.div>

            {/* Unboxed Architectural Education Datum Ledger */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: 0.08, ease: ARCHITECTURAL_EASE }}
              className="border-y border-[#C7B697] dark:border-[#2A3759] py-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start"
            >
              <div className="sm:col-span-4 flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.16em]">
                <GraduationCap className="w-4 h-4 text-[#802C43] dark:text-[#C45D77]" />
                <span>Education</span>
              </div>

              <div className="sm:col-span-8 space-y-1.5">
                <h3 className="text-2xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-semibold">
                  Indus University
                </h3>
                <div className="text-xs font-mono text-[#1C2D58] dark:text-[#DDD1BC] space-y-1">
                  <p>Bachelor of Interior Design</p>
                  <p>Ahmedabad, Gujarat, India</p>
                  <p className="text-[#802C43] dark:text-[#C45D77] pt-1 font-medium">
                    Class of 2026 · Graduating Practice
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Current Focus — Interactive Architectural Index Rows */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.14, ease: ARCHITECTURAL_EASE }}
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.16em] mb-4">
                <span>Current Focus</span>
                <span className="text-[#3D5288] dark:text-[#BFB299]">01 — 06</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                {focusAreas.map((focus, idx) => {
                  const isActive = hoveredFocus === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredFocus(idx)}
                      onMouseLeave={() => setHoveredFocus(null)}
                      className="py-3.5 border-b border-[#D9CBB1] dark:border-[#2A3759] flex items-center justify-between gap-3 transition-colors duration-300 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`text-[11px] font-mono transition-colors ${
                            isActive
                              ? 'text-[#802C43] dark:text-[#C45D77]'
                              : 'text-[#5C6D9B] dark:text-[#988C75]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="text-sm sm:text-base font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] truncate group-hover:translate-x-1 transition-transform duration-300">
                          {focus}
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`h-px transition-all duration-300 ${
                          isActive
                            ? 'w-6 bg-[#802C43] dark:bg-[#C45D77]'
                            : 'w-2 bg-[#C7B697] dark:bg-[#3A4B75]'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
