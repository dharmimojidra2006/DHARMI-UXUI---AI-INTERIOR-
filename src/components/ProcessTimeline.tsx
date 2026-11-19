import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PROCESS_STAGES } from '../data/projectsData';
import { KineticMaskReveal, AnimatedDatumRule, ARCHITECTURAL_EASE } from './EditorialMotion';

export const ProcessTimeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState(0);
  const prefersReduced = useReducedMotion();
  const active = PROCESS_STAGES[selectedStage];
  const progressPct = ((selectedStage + 1) / PROCESS_STAGES.length) * 100;

  return (
    <section
      id="process"
      className="py-24 md:py-36 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9] dark:bg-[#101626] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-4">
          <span>05 / Methodology</span>
          <span aria-hidden="true">·</span>
          <span>Design-Thinking Lifecycle</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6">
          <div>
            <KineticMaskReveal>
              <h2 className="text-4xl sm:text-6xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight leading-none">
                Design Process
              </h2>
            </KineticMaskReveal>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] mt-4">
              {PROCESS_STAGES.map((stage, i) => (
                <React.Fragment key={stage.step}>
                  {i > 0 && <span aria-hidden="true">→</span>}
                  <button
                    type="button"
                    onClick={() => setSelectedStage(i)}
                    className={`cursor-pointer transition-colors ${
                      selectedStage === i
                        ? 'text-[#263D78] dark:text-[#EFE6D5] font-semibold underline underline-offset-4 decoration-[#802C43] dark:decoration-[#C45D77]'
                        : 'hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                    }`}
                  >
                    {stage.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
            Good architecture is not accidental. We employ an iterative, research-grounded framework ensuring every aesthetic choice is backed by ergonomic and contextual logic.
          </p>
        </div>

        <AnimatedDatumRule className="mb-12" />

        {/* Architectural Blueprint Progress Ruler + Stage Selectors */}
        <div className="mb-10 space-y-3">
          {/* Continuous animated ruler bar */}
          <div className="relative h-1 bg-[#D9CBB1] dark:bg-[#2A3759] overflow-hidden">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
              className="h-full bg-[#802C43] dark:bg-[#C45D77]"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PROCESS_STAGES.map((stage, idx) => {
              const isActive = selectedStage === idx;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setSelectedStage(idx)}
                  className={`relative p-4 text-left border transition-colors cursor-pointer ${
                    isActive
                      ? 'border-[#263D78] dark:border-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProcessTab"
                      className="absolute inset-0 bg-[#263D78] dark:bg-[#EFE6D5]"
                      transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="text-[11px] font-mono opacity-75 mb-1">
                      Phase {stage.step}
                    </div>
                    <div className="text-base font-serif-architectural font-semibold truncate">
                      {stage.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Architectural Deep Dive */}
        <div className="border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-8 md:p-12 transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.step}
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#D9CBB1] dark:border-[#2A3759] pb-4">
                  <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.16em]">
                    Stage {active.step} In Depth
                  </span>
                  <span className="text-4xl font-serif-architectural font-light text-[#802C43] dark:text-[#C45D77] leading-none">
                    {active.step}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light">
                  {active.title}
                </h3>

                <p className="text-sm sm:text-base text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                  {active.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block">
                    Standard Phase Deliverables
                  </span>
                  <ul className="space-y-2 text-xs font-mono text-[#263D78] dark:text-[#EFE6D5]">
                    {active.artifacts.map((art, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="w-2 h-px bg-[#802C43] dark:bg-[#C45D77]" />
                        <span>{art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#D9CBB1] dark:border-[#2A3759] pt-6 lg:pt-0 lg:pl-10 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-xs font-mono uppercase text-[#802C43] dark:text-[#C45D77] tracking-wider mb-5">
                    Design-Thinking Case Example ({active.name})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-6 bg-[#E9DFC9] dark:bg-[#141C30] transition-colors duration-300">
                      <div className="text-[11px] font-mono text-[#802C43] dark:text-[#C45D77] uppercase mb-2">
                        Applied in Market to Mindfulness
                      </div>
                      <h5 className="text-base font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] mb-2">
                        {selectedStage === 0 && 'Heritage Brick & Skylight Survey'}
                        {selectedStage === 1 && 'Sensory Quietude & Acoustic Zoning'}
                        {selectedStage === 2 && 'Circular Flower-Waste Upcycling'}
                        {selectedStage === 3 && '150 mm Plinth & Clerestory Light'}
                        {selectedStage === 4 && 'Dimensioned Sections AA’ & BB’'}
                        {selectedStage === 5 && 'Daylight Monitor & Flow Validation'}
                      </h5>
                      <p className="text-xs text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">
                        Adaptive spatial zoning insulated the central meditation hall beneath existing skylights while connecting retail directly to Manek Chowk.
                      </p>
                    </div>

                    <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-6 bg-[#E9DFC9] dark:bg-[#141C30] transition-colors duration-300">
                      <div className="text-[11px] font-mono text-[#802C43] dark:text-[#C45D77] uppercase mb-2">
                        Applied in RC College Spa Retreat
                      </div>
                      <h5 className="text-base font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] mb-2">
                        {selectedStage === 0 && 'Archival Heritage Structural Survey'}
                        {selectedStage === 1 && 'Sensory Stress Interviews'}
                        {selectedStage === 2 && 'Inverted Stepwell (Vav) Analogy'}
                        {selectedStage === 3 && 'Lime Tadelakt Moisture Tests'}
                        {selectedStage === 4 && 'Reversible Clamping Detail Drawings'}
                        {selectedStage === 5 && 'Acoustic Reverberation Modeling'}
                      </h5>
                      <p className="text-xs text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">
                        Historic 90-year-old load-bearing sandstone arches preserved through decoupled structural plinths.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-5 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedStage((selectedStage - 1 + PROCESS_STAGES.length) % PROCESS_STAGES.length)}
                    className="text-[#3D5288] dark:text-[#BFB299] hover:text-[#802C43] dark:hover:text-[#EFE6D5] transition-colors cursor-pointer"
                  >
                    ← Previous Stage
                  </button>
                  <span className="text-[#802C43] dark:text-[#C45D77]">Step 0{selectedStage + 1} of 06</span>
                  <button
                    type="button"
                    onClick={() => setSelectedStage((selectedStage + 1) % PROCESS_STAGES.length)}
                    className="text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] font-medium transition-colors cursor-pointer"
                  >
                    Next Stage →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
