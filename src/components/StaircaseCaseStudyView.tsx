import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, StaircaseDrawingItem } from '../types';
import { Maximize2 } from 'lucide-react';
import { CaseStudyCoverHeader } from './CaseStudyCoverHeader';
import { DrawingLightbox } from './DrawingLightbox';

interface Props {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const StaircaseCaseStudyView: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const study = project.staircaseCaseStudy;

  // Interactive plan mode: both | staircase | water
  const [planMode, setPlanMode] = useState<'both' | 'staircase' | 'water'>('both');

  // Interactive orthographic cut mode: both | section | elevation
  const [sectionMode, setSectionMode] = useState<'both' | 'section' | 'elevation'>('both');

  // Fullscreen Lightbox across all extracted plates
  const [lightboxDrawingId, setLightboxDrawingId] = useState<string | null>(null);

  const allDrawings: StaircaseDrawingItem[] = useMemo(() => {
    if (!study) return [];
    return [
      study.moodboard,
      study.plans.staircasePlan,
      study.plans.waterBodyPlan,
      ...study.sectionsAndElevation,
      ...study.joineryDetails,
      ...study.views3D,
    ];
  }, [study]);

  const openLightbox = (drawingId: string) => {
    setLightboxDrawingId(drawingId);
  };

  if (!study) return null;

  const indexSections = [
    { id: 'st-brief', label: '01. Project Brief' },
    { id: 'st-concept', label: '02. Concept Brief' },
    { id: 'st-moodboard', label: '03. Mood Board' },
    { id: 'st-plans', label: '04. Plans (Staircase & Water)' },
    { id: 'st-sections', label: '05. Section AA’ & Elevation' },
    { id: 'st-details', label: '06. Details A (1:8) & B (1:10)' },
    { id: 'st-views', label: '07. 3D Views & Model' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sectionAA = study.sectionsAndElevation[0];
  const elevationPlate = study.sectionsAndElevation[1];

  return (
    <div className="space-y-14">
      {/* EDITORIAL COVER: TOP METADATA + LEFT BRIEF + RIGHT COMPACT COVER + BOTTOM THUMBNAILS */}
      <CaseStudyCoverHeader
        projectNumber={project.number}
        categoryLabel={project.categoryLabel}
        location={project.location}
        projectType="Two-Flight Tensile Staircase · Framed Space"
        title={project.title}
        subtitle={study.subHeader}
        description={project.summary}
        metaItems={[
          { label: 'Structure', value: 'Two-Flight · Wooden Treads & Tensile Ropes' },
          { label: 'Measurements', value: study.measurementsUnit },
          { label: 'Total Plates', value: `${allDrawings.length} Plates` },
        ]}
        scopeTags={project.scope}
        coverPlate={{
          plate: 'Plate 08',
          label: 'Isometric 3D View',
          caption: study.subHeader,
          imageUrl: project.heroImage,
          isPortraitAmbient: true,
          onClick: () => openLightbox('stair-3d-01'),
        }}
        thumbnailStripTitle="Mood Board, Measured Plans, Section AA’, Elevation & Scale Details"
        thumbnails={[
          {
            id: study.moodboard.id,
            plate: study.moodboard.plate,
            label: 'Mood Board',
            subtitle: study.moodboard.title,
            imageUrl: study.moodboard.imageUrl,
            onClick: () => openLightbox(study.moodboard.id),
          },
          {
            id: study.plans.staircasePlan.id,
            plate: study.plans.staircasePlan.plate,
            label: 'Staircase Plan',
            subtitle: study.plans.staircasePlan.title,
            imageUrl: study.plans.staircasePlan.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.plans.staircasePlan.id),
          },
          {
            id: sectionAA.id,
            plate: sectionAA.plate,
            label: 'Section AA’',
            subtitle: sectionAA.title,
            imageUrl: sectionAA.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(sectionAA.id),
          },
          {
            id: study.joineryDetails[0].id,
            plate: study.joineryDetails[0].plate,
            label: 'Detail - A (Scale 1:8)',
            subtitle: study.joineryDetails[0].title,
            imageUrl: study.joineryDetails[0].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.joineryDetails[0].id),
          },
        ]}
      />

      {/* TWO-COLUMN MONOGRAPH LAYOUT: STICKY INDEX + SEQUENTIAL CASE STUDY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sticky Sidebar Index */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-20 border-l border-[#D9CBB1] dark:border-[#2A3759] pl-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block">
              Case Study Sequence
            </span>
            <nav className="space-y-1.5 text-xs font-mono">
              {indexSections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="block w-full text-left text-[#3D5288] dark:text-[#BFB299] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors py-1 truncate cursor-pointer"
                >
                  {sec.label}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => openLightbox(allDrawings[0]?.id || 'stair-moodboard')}
              className="w-full text-left pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] space-y-1 cursor-pointer transition-colors group"
            >
              <p className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] font-medium transition-colors">
                Extracted Plates
              </p>
              <p>Click any plate, plan, detail, or 3D view to inspect at full resolution.</p>
            </button>
          </div>
        </aside>

        {/* Main Sequential Narrative */}
        <div className="lg:col-span-9 space-y-24">
          {/* 01. PROJECT BRIEF */}
          <motion.section
            id="st-brief"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>Project Brief</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Form, Materials & Structural Expression
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7">
                <p className="text-lg sm:text-xl text-[#1C2D58] dark:text-[#EFE6D5] font-light leading-relaxed font-sans">
                  {study.projectBrief}
                </p>
              </div>

              <div className="md:col-span-5 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 space-y-3.5 text-xs font-mono">
                <span className="text-[10px] uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  {study.measurementsUnit}
                </span>
                {study.keyDimensions.map((dim) => (
                  <div
                    key={dim.label}
                    className="pt-2 border-t first:border-t-0 first:pt-0 border-[#D9CBB1]/70 dark:border-[#2A3759]"
                  >
                    <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block text-[10px] mb-0.5">
                      {dim.label}
                    </span>
                    <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">
                      {dim.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 02. CONCEPT BRIEF */}
          <motion.section
            id="st-concept"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>02</span>
              <span aria-hidden="true">·</span>
              <span>Concept Brief</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Visual Lightness Against a Brick Frame
            </h2>

            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 sm:p-10 mb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-4">
                Concept Brief
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5] font-light leading-relaxed">
                “{study.conceptBrief}”
              </blockquote>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.conceptDevelopment.spatialPrinciples.map((principle, idx) => (
                <div
                  key={idx}
                  className="border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-5"
                >
                  <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] block mb-2">
                    0{idx + 1}
                  </span>
                  <p className="text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                    {principle}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 03. MOOD BOARD */}
          <motion.section
            id="st-moodboard"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>Mood Board</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Timber, Stone, Tensile Rods & Water Atmosphere
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Materiality & Atmospheric Palette
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div
                onClick={() => openLightbox(study.moodboard.id)}
                className="lg:col-span-7 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>
                    <strong className="text-[#802C43] dark:text-[#C45D77]">{study.moodboard.plate}</strong>
                    <span className="mx-1.5">·</span>
                    <span className="text-[#263D78] dark:text-[#EFE6D5]">Mood Board Collage</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                    <span>Inspect</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                  <img
                    src={study.moodboard.imageUrl}
                    alt={study.moodboard.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </div>
                <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                  {study.moodboard.subtitle}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 sm:p-6 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block mb-4">
                    Materials & Elements Specified
                  </span>
                  <ul className="space-y-3 text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light">
                    {study.materialSpecifications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#802C43] dark:text-[#C45D77] font-mono text-xs mt-1">
                          ·
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#D9CBB1] dark:border-[#2A3759] flex flex-wrap gap-2">
                  {project.materialPalette.map((mat) => (
                    <div
                      key={mat.name}
                      className="inline-flex items-center gap-2 border border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9]/60 dark:bg-[#18223A] px-2.5 py-1.5 text-[11px] font-mono text-[#263D78] dark:text-[#EFE6D5]"
                    >
                      <span
                        aria-hidden="true"
                        className="w-3 h-3 border border-[#C7B697] dark:border-[#3A4B75] shrink-0"
                        style={{ backgroundColor: mat.colorHex }}
                      />
                      <span>{mat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 04. ARCHITECTURAL PLANS (STAIRCASE PLAN & WATER BODY PLAN) */}
          <motion.section
            id="st-plans"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>04</span>
                <span aria-hidden="true">·</span>
                <span>Plans</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                {study.measurementsUnit} · Click Plans to Zoom
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Staircase Plan & Water Body Plan
            </h2>

            {/* Interactive Plan Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
                <button
                  type="button"
                  onClick={() => setPlanMode('both')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planMode === 'both'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Compare Both Plans
                </button>
                <button
                  type="button"
                  onClick={() => setPlanMode('staircase')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planMode === 'staircase'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Staircase Plan
                </button>
                <button
                  type="button"
                  onClick={() => setPlanMode('water')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planMode === 'water'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Water Body Plan
                </button>
              </div>
              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Footprint 2843 × 2794 mm
              </span>
            </div>

            <div
              className={`grid gap-6 ${
                planMode === 'both' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {(planMode === 'both' || planMode === 'staircase') && (
                <div
                  onClick={() => openLightbox(study.plans.staircasePlan.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">
                        {study.plans.staircasePlan.plate}
                      </strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">
                        {study.plans.staircasePlan.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Zoom Plan</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 flex justify-center">
                    <img
                      src={study.plans.staircasePlan.imageUrl}
                      alt={study.plans.staircasePlan.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[480px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {study.plans.staircasePlan.subtitle}
                  </p>
                </div>
              )}

              {(planMode === 'both' || planMode === 'water') && (
                <div
                  onClick={() => openLightbox(study.plans.waterBodyPlan.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">
                        {study.plans.waterBodyPlan.plate}
                      </strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">
                        {study.plans.waterBodyPlan.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Zoom Plan</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 flex justify-center">
                    <img
                      src={study.plans.waterBodyPlan.imageUrl}
                      alt={study.plans.waterBodyPlan.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[480px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {study.plans.waterBodyPlan.subtitle}
                  </p>
                </div>
              )}
            </div>
          </motion.section>

          {/* 05. SECTION AA' & ELEVATION */}
          <motion.section
            id="st-sections"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>05</span>
                <span aria-hidden="true">·</span>
                <span>Section & Elevation</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Vertical Finish Levels: +100 / +1302 / +2502 mm
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Section AA’ & Orthographic Elevation
            </h2>

            <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 w-fit mb-6">
              <button
                type="button"
                onClick={() => setSectionMode('both')}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  sectionMode === 'both'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                Compare Both
              </button>
              <button
                type="button"
                onClick={() => setSectionMode('section')}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  sectionMode === 'section'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                Section AA’
              </button>
              <button
                type="button"
                onClick={() => setSectionMode('elevation')}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  sectionMode === 'elevation'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                Elevation
              </button>
            </div>

            <div
              className={`grid gap-6 ${
                sectionMode === 'both' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {(sectionMode === 'both' || sectionMode === 'section') && (
                <div
                  onClick={() => openLightbox(sectionAA.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{sectionAA.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{sectionAA.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Inspect</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 flex justify-center">
                    <img
                      src={sectionAA.imageUrl}
                      alt={sectionAA.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[520px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {sectionAA.subtitle}
                  </p>
                </div>
              )}

              {(sectionMode === 'both' || sectionMode === 'elevation') && (
                <div
                  onClick={() => openLightbox(elevationPlate.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">
                        {elevationPlate.plate}
                      </strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">
                        {elevationPlate.title}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Inspect</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 flex justify-center">
                    <img
                      src={elevationPlate.imageUrl}
                      alt={elevationPlate.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[520px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {elevationPlate.subtitle}
                  </p>
                </div>
              )}
            </div>
          </motion.section>

          {/* 06. CONSTRUCTION DETAILS A (1:8) & B (1:10) */}
          <motion.section
            id="st-details"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>06</span>
                <span aria-hidden="true">·</span>
                <span>Joinery & Structural Details</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Detail - A (Scale 1:8) · Detail - B (Scale 1:10)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Tensile Suspension & Tread Assembly Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {study.joineryDetails.map((detail, idx) => (
                <div
                  key={detail.id}
                  onClick={() => openLightbox(detail.id)}
                  className={`${
                    idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                  } bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span className="truncate pr-2">
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{detail.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{detail.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Zoom Detail</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 flex items-center justify-center">
                    <img
                      src={detail.imageUrl}
                      alt={detail.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[460px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>

                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {detail.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 07. 3D VIEWS & PHYSICAL MODEL */}
          <motion.section
            id="st-views"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 pb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>07</span>
                <span aria-hidden="true">·</span>
                <span>3D Views & Physical Scale Model</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                4 Perspectives · Click Any View to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Spatial Perspectives & Material Scale Model
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {study.views3D.map((view) => (
                <div
                  key={view.id}
                  onClick={() => openLightbox(view.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span className="truncate pr-2">
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{view.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{view.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Zoom</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 flex justify-center">
                    <img
                      src={view.imageUrl}
                      alt={view.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-h-[500px] h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {view.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Bottom Next / Previous Project Navigation */}
          <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => {
                onSelectProject(prevProject);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-left group border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#263D78] dark:hover:border-[#EFE6D5] p-4 transition-colors cursor-pointer"
            >
              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-1">
                ← Previous Project
              </span>
              <span className="text-base font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                {prevProject.number} — {prevProject.title}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectProject(nextProject);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-right group border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#263D78] dark:hover:border-[#EFE6D5] p-4 transition-colors cursor-pointer"
            >
              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-1">
                Next Project →
              </span>
              <span className="text-base font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                {nextProject.number} — {nextProject.title}
              </span>
            </button>
          </div>
        </div>
      </div>

      <DrawingLightbox
        items={allDrawings}
        activeId={lightboxDrawingId}
        onSelectId={setLightboxDrawingId}
        onClose={() => setLightboxDrawingId(null)}
      />
    </div>
  );
};
