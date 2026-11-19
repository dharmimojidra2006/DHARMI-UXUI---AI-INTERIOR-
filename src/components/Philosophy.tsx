import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { STUDIO_PHILOSOPHY } from '../data/projectsData';
import { KineticMaskReveal, ARCHITECTURAL_EASE } from './EditorialMotion';

export const Philosophy: React.FC = () => {
  const [activePillar, setActivePillar] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const streamX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const current = STUDIO_PHILOSOPHY[activePillar] || STUDIO_PHILOSOPHY[0];

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      data-cursor-dark="true"
      className="relative py-24 md:py-36 border-b border-[#2A3D6E] dark:border-[#2A3759] bg-[#1C2D58] dark:bg-[#141C30] text-[#F3EBDD] overflow-hidden transition-colors duration-300"
    >
      {/* Subtle Scroll-Scrubbed Architectural Ribbon Band */}
      <div
        aria-hidden="true"
        className="border-y border-[#3D5288]/45 dark:border-[#2A3759] py-3.5 mb-16 md:mb-24 overflow-hidden select-none"
      >
        <motion.div
          style={prefersReduced ? undefined : { x: streamX }}
          className="flex items-center gap-8 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.28em] text-[#E598AC] will-change-transform"
        >
          <span>Space · Proportion · Atmosphere</span>
          <span className="text-[#5C6D9B]">/</span>
          <span>Material · Tactility · Light</span>
          <span className="text-[#5C6D9B]">/</span>
          <span>Experience · Human Scale · Ritual</span>
          <span className="text-[#5C6D9B]">/</span>
          <span>Detail · Joinery · Craft</span>
          <span className="text-[#5C6D9B]">/</span>
          <span>Design Philosophy & Ethos</span>
          <span className="text-[#5C6D9B]">/</span>
          <span>Space · Material · Experience · Detail</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#E598AC] uppercase tracking-[0.18em] mb-4">
          <span>04 / Ethos</span>
          <span aria-hidden="true">·</span>
          <span>Core Design Principles</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#3D5288]/50 dark:border-[#2A3759] gap-6 mb-14 md:mb-20">
          <KineticMaskReveal>
            <h2 className="text-4xl sm:text-6xl font-serif-architectural font-light text-[#F3EBDD] tracking-tight leading-none">
              Design Philosophy
            </h2>
          </KineticMaskReveal>
          <p className="max-w-md text-xs sm:text-sm text-[#D9CBB1] font-light leading-relaxed">
            The philosophical framework guiding Dharmi Mojidra’s investigations across interior architecture, product craft, and spatial research.
          </p>
        </div>

        {/* Interactive Split Manifesto Chamber: Left Interactive Pillar Ledger + Right Animated Focal Readout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
          {/* Left Interactive Pillar Selector Index (6 cols) */}
          <div className="lg:col-span-6 border-t border-[#3D5288]/55 dark:border-[#2A3759]">
            {STUDIO_PHILOSOPHY.map((item, idx) => {
              const isActive = activePillar === idx;
              return (
                <button
                  key={item.pillar}
                  type="button"
                  onMouseEnter={() => setActivePillar(idx)}
                  onFocus={() => setActivePillar(idx)}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full py-6 border-b border-[#3D5288]/55 dark:border-[#2A3759] flex items-baseline justify-between gap-6 text-left transition-all cursor-pointer group ${
                    isActive ? 'pl-3 sm:pl-5' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-xs transition-colors ${
                        isActive ? 'text-[#E598AC]' : 'text-[#8AA4EA]/75'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <div>
                      <span
                        className={`block text-3xl sm:text-4xl md:text-5xl font-serif-architectural tracking-wider transition-colors ${
                          isActive
                            ? 'text-[#F3EBDD]'
                            : 'text-[#D9CBB1]/65 group-hover:text-[#F3EBDD]'
                        }`}
                      >
                        {item.pillar}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#E598AC]/90 mt-1 block">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`h-px shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'w-10 bg-[#E598AC]'
                        : 'w-4 bg-[#3D5288] group-hover:w-7 group-hover:bg-[#E598AC]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Animated Active Pillar Reading Plate (6 cols) */}
          <div className="lg:col-span-6">
            <div className="border border-[#3D5288]/60 dark:border-[#2A3759] bg-[#162347] dark:bg-[#101626] p-8 sm:p-10 md:p-12 min-h-[300px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.pillar}
                  initial={prefersReduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-[#E598AC]">
                    <span>Principle 0{activePillar + 1} / {current.pillar}</span>
                    <span className="text-[#BFB299]">{current.subtitle}</span>
                  </div>

                  <p className="text-2xl sm:text-3xl font-serif-architectural text-[#F3EBDD] leading-snug font-light">
                    {current.statement}
                  </p>

                  <p className="text-sm sm:text-base text-[#D9CBB1] font-light leading-relaxed">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-8 mt-8 border-t border-[#3D5288]/50 dark:border-[#2A3759] flex items-center justify-between text-[11px] font-mono text-[#BFB299]">
                <span>Explore all 04 pillars on hover or click</span>
                <span className="text-[#E598AC]">
                  {String(activePillar + 1).padStart(2, '0')} / 04
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Manifesto Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: ARCHITECTURAL_EASE }}
          className="border-t border-b border-[#3D5288]/60 dark:border-[#2A3759] py-12 md:py-16 text-center max-w-4xl mx-auto"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#E598AC] block mb-4">
            Manifesto
          </span>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif-architectural italic text-[#F3EBDD] leading-snug font-light text-balance">
            "Spaces are not merely containers for objects; they are sensory instruments that shape our emotional equilibrium, our conversations, and our relationship with light."
          </blockquote>
          <div className="mt-5 text-xs font-mono text-[#D9CBB1]">
            — Dharmi Mojidra, Design Philosophy Notes
          </div>
        </motion.div>
      </div>
    </section>
  );
};
