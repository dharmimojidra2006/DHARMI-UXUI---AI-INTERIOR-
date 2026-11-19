import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Layout, PenTool, Search, Monitor } from 'lucide-react';
import {
  KineticMaskReveal,
  ClipCuratedPlate,
  ParallaxLayer,
  AnimatedDatumRule,
  ARCHITECTURAL_EASE,
} from './EditorialMotion';

interface SkillCategory {
  num: string;
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
}

const PROCESS_STEPS = [
  { number: '01', name: 'Research' },
  { number: '02', name: 'Understand' },
  { number: '03', name: 'Explore' },
  { number: '04', name: 'Develop' },
  { number: '05', name: 'Resolve' },
  { number: '06', name: 'Experience' },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    num: '01',
    id: 'interior-design',
    title: 'Interior Design',
    description:
      'Spatial organisation, custom furniture craft, lighting choreography, and tactile material curation.',
    icon: Layout,
    items: [
      'Spatial Planning',
      'Furniture Design',
      'Concept Development',
      'Material Selection',
      'Lighting Design',
      'Interior Styling',
      'Moodboarding',
    ],
  },
  {
    num: '02',
    id: 'technical-representation',
    title: 'Technical Representation',
    description:
      'Precision CAD drafting, 3D spatial modelling, visual rendering, and editorial publication layout.',
    icon: PenTool,
    items: [
      'AutoCAD',
      'SketchUp',
      '3D Visualisation',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
    ],
  },
  {
    num: '03',
    id: 'design-research',
    title: 'Design Research',
    description:
      'Contextual site documentation, precedent case studies, spatial programming, and user behaviour inquiry.',
    icon: Search,
    items: [
      'Site Analysis',
      'Case Studies',
      'User Research',
      'Programming',
      'Concept Development',
      'Visual Communication',
    ],
  },
  {
    num: '04',
    id: 'uxui-exploration',
    title: 'UX/UI Exploration',
    description:
      'Cross-disciplinary user experience research, information architecture, wireframing, and spatial UI.',
    icon: Monitor,
    items: [
      'UX Research',
      'Wireframing',
      'User Experience',
      'Information Architecture',
      'Interface Design',
    ],
  },
];

export const About: React.FC = () => {
  const [hoveredFocus, setHoveredFocus] = useState<number | null>(null);
  const [hoveredSkillRow, setHoveredSkillRow] = useState<number | null>(null);

  const designInterests = [
    'Interior Design',
    'Adaptive Reuse',
    'Hospitality & Wellness',
    'Furniture Design',
    'Spatial Research',
    'UX/UI Exploration',
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9] dark:bg-[#101626] overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20 space-y-20 md:space-y-24">
        {/* =============================================================== */}
        {/* A. INTRODUCTION / PROFILE                                       */}
        {/* =============================================================== */}
        <div>
          {/* Editorial Magazine Folio Top Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77] mb-10 md:mb-12">
            <div className="flex items-center gap-3">
              <span>01 / About</span>
              <span aria-hidden="true" className="text-[#C7B697] dark:text-[#3A4B75]">
                ·
              </span>
              <span className="text-[#3D5288] dark:text-[#BFB299]">
                Profile, Philosophy, Education & Process
              </span>
            </div>
            <span className="font-serif-architectural italic normal-case tracking-normal text-sm text-[#3D5288] dark:text-[#BFB299]">
              Ahmedabad, India
            </span>
          </div>

          {/* Oversized Editorial Spread Title */}
          <div className="mb-10 md:mb-14">
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
              Bachelor of Interior Design · Ahmedabad, India
            </motion.p>
            <AnimatedDatumRule className="mt-6" delay={0.15} />
          </div>

          {/* Asymmetric Editorial Spread: Portrait Left + Introduction & Interests Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Portrait Frame (5 cols) */}
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
                        alt="Dharmi Mojidra, Graduating Interior Design Student"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top grayscale-15 group-hover:grayscale-0 group-hover:scale-[1.035] transition-all duration-700 ease-out"
                      />
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#802C43] dark:text-[#C45D77]">
                    <span>Dharmi Mojidra · Graduating Interior Designer</span>
                    <span className="text-[#3D5288] dark:text-[#BFB299]">Fig. 01</span>
                  </div>
                </ClipCuratedPlate>
              </ParallaxLayer>
            </div>

            {/* Introduction Prose, Education Datum & Focus Areas (7 cols) */}
            <div className="lg:col-span-7 space-y-11 lg:pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: ARCHITECTURAL_EASE }}
                className="space-y-4"
              >
                <p className="text-xl sm:text-2xl md:text-[1.68rem] text-[#1C2D58] dark:text-[#DDD1BC] font-serif-architectural leading-[1.46] font-light">
                  I am a graduating interior design student based in Ahmedabad, India. My work explores the relationship between people, space, material, and human experience.
                </p>
                <p className="text-sm sm:text-base text-[#3D5288] dark:text-[#BFB299] font-light leading-relaxed">
                  Across my design portfolio, I engage with interior design, adaptive reuse, hospitality and wellness environments, bespoke furniture craft, spatial research, and UX/UI exploration—resolving concepts from site study and hand sketches through to measured AutoCAD drawings and 3D visualisations.
                </p>
              </motion.div>

              {/* C. EDUCATION DATUM */}
              <motion.div
                id="education"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: 0.08, ease: ARCHITECTURAL_EASE }}
                className="border-y border-[#C7B697] dark:border-[#2A3759] py-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start"
              >
                <div className="sm:col-span-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.16em]">
                    <GraduationCap className="w-4 h-4 text-[#802C43] dark:text-[#C45D77]" />
                    <span>Education</span>
                  </div>
                  <div className="text-2xl font-serif-architectural font-light text-[#802C43] dark:text-[#C45D77]">
                    2022 — 2026
                  </div>
                </div>

                <div className="sm:col-span-8 space-y-1.5">
                  <h3 className="text-2xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-semibold">
                    Indus University
                  </h3>
                  <div className="text-xs font-mono text-[#1C2D58] dark:text-[#DDD1BC] space-y-1">
                    <p>Bachelor of Interior Design</p>
                    <p>Ahmedabad, Gujarat, India</p>
                    <p className="text-[#802C43] dark:text-[#C45D77] pt-1 font-medium">
                      Class of 2026 · Graduating Student
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Design Interests & Disciplines */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.14, ease: ARCHITECTURAL_EASE }}
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.16em] mb-4">
                  <span>Areas of Focus</span>
                  <span className="text-[#3D5288] dark:text-[#BFB299]">01 — 06</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  {designInterests.map((focus, idx) => {
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

        {/* =============================================================== */}
        {/* B. DESIGN PHILOSOPHY                                            */}
        {/* =============================================================== */}
        <motion.div
          id="philosophy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: ARCHITECTURAL_EASE }}
          className="border border-[#C7B697] dark:border-[#2A3759] bg-[#E3D7BF]/65 dark:bg-[#141C30]/80 p-8 sm:p-12 md:p-14 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3 space-y-2">
              <span className="block text-xs font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77]">
                Design Philosophy
              </span>
              <span className="block text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                People · Space · Material · Experience
              </span>
            </div>
            <div className="lg:col-span-9 space-y-5">
              <blockquote className="font-serif-architectural italic font-light text-2xl sm:text-3xl md:text-[2.35rem] text-[#263D78] dark:text-[#EFE6D5] leading-[1.28] tracking-tight">
                “I believe a space should be designed around how people live, not just how it looks.”
              </blockquote>
              <p className="text-sm sm:text-base text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed max-w-3xl">
                Every interior begins with observing daily movement, light, and cultural memory. By balancing practical spatial function with honest materials, tactile craft, and quiet proportion, I aim to shape rooms that feel calm, purposeful, and memorable in everyday use.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =============================================================== */}
        {/* D. SKILLS & COMPETENCIES                                        */}
        {/* =============================================================== */}
        <div id="skills" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="block text-xs font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77] mb-2">
                Skills & Competencies
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight leading-none">
                Technical & Creative Repertoire
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#3D5288] dark:text-[#BFB299] font-light leading-relaxed">
              Disciplines cultivated across studio design projects, workshop prototyping, and digital spatial research.
            </p>
          </div>

          <div className="border-t border-[#C7B697] dark:border-[#2A3759]">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isHovered = hoveredSkillRow === idx;

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: ARCHITECTURAL_EASE }}
                  onMouseEnter={() => setHoveredSkillRow(idx)}
                  onMouseLeave={() => setHoveredSkillRow(null)}
                  className={`border-b border-[#C7B697] dark:border-[#2A3759] py-7 md:py-8 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start transition-colors duration-300 ${
                    isHovered ? 'bg-[#F3EBDD] dark:bg-[#18223A]' : 'bg-transparent'
                  }`}
                >
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="flex items-center gap-2.5 text-xs font-mono text-[#802C43] dark:text-[#C45D77]">
                      <span className="font-semibold">{cat.num}</span>
                      <span aria-hidden="true">/</span>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-2xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light">
                      {cat.title}
                    </h4>
                  </div>

                  <div className="lg:col-span-4 text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                    {cat.description}
                  </div>

                  <div className="lg:col-span-4">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono text-[#263D78] dark:text-[#EFE6D5]">
                      {cat.items.map((item, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className={`h-px transition-all duration-300 shrink-0 ${
                              isHovered
                                ? 'w-3 bg-[#802C43] dark:bg-[#C45D77]'
                                : 'w-1.5 bg-[#802C43]/70 dark:bg-[#C45D77]/70'
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =============================================================== */}
        {/* E. DESIGN PROCESS                                               */}
        {/* =============================================================== */}
        <div
          id="process"
          className="scroll-mt-24 pt-4 border-t border-[#C7B697] dark:border-[#2A3759]"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77]">
              Design Process
            </span>
            <span className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
              Six-Stage Studio Methodology
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between gap-x-6 gap-y-4">
            {PROCESS_STEPS.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77]">
                    {step.number}
                  </span>
                  <span className="text-lg sm:text-xl font-serif-architectural font-normal text-[#263D78] dark:text-[#EFE6D5] leading-tight">
                    {step.name}
                  </span>
                </div>
                {idx < PROCESS_STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:inline text-sm font-mono text-[#802C43]/75 dark:text-[#C45D77]/75 select-none"
                  >
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
