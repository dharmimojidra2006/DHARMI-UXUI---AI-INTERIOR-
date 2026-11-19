import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data/projectsData';
import { Layout, PenTool, Search, Monitor } from 'lucide-react';
import { KineticMaskReveal, AnimatedDatumRule, ARCHITECTURAL_EASE } from './EditorialMotion';

export const SkillsSection: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const categories = [
    {
      id: 'interior',
      title: 'Interior Design',
      icon: Layout,
      skills: SKILLS_DATA.interiorDesign,
      description: 'Core spatial layout, joinery design, lighting design, and materiality orchestration.'
    },
    {
      id: 'representation',
      title: 'Representation',
      icon: PenTool,
      skills: SKILLS_DATA.representation,
      description: 'Precision CAD drafting, 3D modeling, spatial rendering, and publication presentation.'
    },
    {
      id: 'research',
      title: 'Design Research',
      icon: Search,
      skills: SKILLS_DATA.designResearch,
      description: 'Fieldwork mapping, climatic analysis, programmatic scheduling, and user behavioral study.'
    },
    {
      id: 'uxui',
      title: 'UX / UI',
      icon: Monitor,
      skills: SKILLS_DATA.uxui,
      description: 'Cross-disciplinary user research, digital spatial tooling, information architecture, and interface design.'
    }
  ];

  return (
    <section
      id="skills"
      className="py-24 md:py-36 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9] dark:bg-[#101626] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-4">
          <span>06 / Competencies</span>
          <span aria-hidden="true">·</span>
          <span>Technical & Creative Repertoire</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6">
          <KineticMaskReveal>
            <h2 className="text-4xl sm:text-6xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight leading-none">
              Skills & Software
            </h2>
          </KineticMaskReveal>
          <p className="max-w-md text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
            Proficiencies developed across rigorous academic studios at Indus University, live site interventions, and independent spatial research.
          </p>
        </div>

        <AnimatedDatumRule className="mb-12" />

        {/* Architectural Specification Ledger Rows */}
        <div className="border-t border-[#C7B697] dark:border-[#2A3759]">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isHovered = hoveredRow === idx;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.06, ease: ARCHITECTURAL_EASE }}
                onMouseEnter={() => setHoveredRow(idx)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`border-b border-[#C7B697] dark:border-[#2A3759] py-8 md:py-10 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start transition-colors duration-300 ${
                  isHovered
                    ? 'bg-[#F3EBDD] dark:bg-[#18223A]'
                    : 'bg-transparent'
                }`}
              >
                {/* Index & Category Title (4 cols) */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center justify-between lg:justify-start gap-3 text-xs font-mono text-[#802C43] dark:text-[#C45D77]">
                    <span className="font-semibold">0{idx + 1}</span>
                    <span aria-hidden="true">/</span>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[#3D5288] dark:text-[#BFB299]">Indus University Tested</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light">
                    {cat.title}
                  </h3>
                </div>

                {/* Rationale Description (4 cols) */}
                <div className="lg:col-span-4 text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                  {cat.description}
                </div>

                {/* Technical Capability Schedule (4 cols) */}
                <div className="lg:col-span-4">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-mono text-[#263D78] dark:text-[#EFE6D5]">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2">
                        <span
                          className={`h-px transition-all duration-300 ${
                            isHovered
                              ? 'w-3 bg-[#802C43] dark:bg-[#C45D77]'
                              : 'w-1.5 bg-[#802C43]/70 dark:bg-[#C45D77]/70'
                          }`}
                        />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
