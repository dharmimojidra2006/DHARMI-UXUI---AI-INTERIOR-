import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, MarketMindfulnessDrawingItem } from '../types';
import { Maximize2 } from 'lucide-react';
import { CaseStudyCoverHeader } from './CaseStudyCoverHeader';
import { DrawingLightbox } from './DrawingLightbox';

interface Props {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const MarketMindfulnessCaseStudyView: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const study = project.marketMindfulnessCaseStudy;

  // Interactive section switcher: both | aa | bb
  const [sectionMode, setSectionMode] = useState<'both' | 'aa' | 'bb'>('both');

  // Lightbox across all plates
  const [lightboxDrawingId, setLightboxDrawingId] = useState<string | null>(null);

  const allDrawings: MarketMindfulnessDrawingItem[] = useMemo(() => {
    if (!study) return [];
    return [
      {
        id: 'mm-cover-hero',
        plate: 'Cover',
        title: project.title,
        subtitle: study.subHeader,
        imageUrl: project.heroImage,
        category: 'mood-photo',
      },
      ...study.moodPhotos,
      ...study.existingMarketPhotos,
      study.plan.drawing,
      ...study.sections.map((s) => s.drawing),
    ];
  }, [study, project.title, project.heroImage]);

  const openLightbox = (drawingId: string) => {
    setLightboxDrawingId(drawingId);
  };

  if (!study) return null;

  const indexSections = [
    { id: 'mm-brief', label: '01. Project Brief' },
    { id: 'mm-site', label: '02. Existing Market (4 Views)' },
    { id: 'mm-concept', label: '03. Concept Brief' },
    { id: 'mm-planning', label: '04. Space Planning & Development' },
    { id: 'mm-plan', label: '05. Architectural CAD Plan' },
    { id: 'mm-sections', label: '06. Sections (AA’ & BB’)' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-14">
      {/* EDITORIAL COVER: TOP METADATA + LEFT BRIEF + RIGHT COMPACT COVER + BOTTOM THUMBNAILS */}
      <CaseStudyCoverHeader
        projectNumber={project.number}
        categoryLabel={project.categoryLabel}
        location={project.location}
        projectType="Meditation, Spa & Sustainable Retail"
        title={project.title}
        subtitle={study.subHeader}
        description={project.summary}
        metaItems={[
          { label: 'Existing Site', value: 'Fruit Market, Manek Chowk' },
          { label: 'Proposed Programme', value: 'Meditation · Spa · Sustainable Retail' },
          { label: 'Plates', value: 'Extracted Plates' },
        ]}
        scopeTags={project.scope}
        coverPlate={{
          plate: 'Cover',
          label: 'Cover Visual',
          caption: study.subHeader,
          imageUrl: project.heroImage,
          onClick: () => openLightbox('mm-cover-hero'),
        }}
        thumbnailStripTitle="Existing Site, Architectural CAD Plan, Sections & Mood Board"
        thumbnails={[
          {
            id: study.existingMarketPhotos[0].id,
            plate: study.existingMarketPhotos[0].plate,
            label: 'Existing Site · Manek Chowk',
            subtitle: study.existingMarketPhotos[0].title,
            imageUrl: study.existingMarketPhotos[0].imageUrl,
            onClick: () => openLightbox(study.existingMarketPhotos[0].id),
          },
          {
            id: study.plan.drawing.id,
            plate: study.plan.drawing.plate,
            label: 'CAD Floor Plan',
            subtitle: study.plan.drawing.title,
            imageUrl: study.plan.drawing.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.plan.drawing.id),
          },
          {
            id: study.sections[0].drawing.id,
            plate: study.sections[0].drawing.plate,
            label: 'Section AA’',
            subtitle: study.sections[0].drawing.title,
            imageUrl: study.sections[0].drawing.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.sections[0].drawing.id),
          },
          {
            id: study.moodPhotos[1].id,
            plate: study.moodPhotos[1].plate,
            label: 'Sustainable Retail',
            subtitle: study.moodPhotos[1].title,
            imageUrl: study.moodPhotos[1].imageUrl,
            onClick: () => openLightbox(study.moodPhotos[1].id),
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
              onClick={() => openLightbox(allDrawings[0]?.id || 'mm-cover-hero')}
              className="w-full text-left pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] space-y-1 cursor-pointer transition-colors group"
            >
              <p className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] font-medium transition-colors">
                Extracted Plates
              </p>
              <p>Click any market photograph, CAD plan, or section to zoom and inspect details.</p>
            </button>
          </div>
        </aside>

        {/* Main Sequential Narrative */}
        <div className="lg:col-span-9 space-y-24">
          {/* 01. PROJECT BRIEF */}
          <motion.section
            id="mm-brief"
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
              Reimagining Manek Chowk’s Fruit Market
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <p className="text-lg sm:text-xl text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed font-sans">
                  {study.projectBrief}
                </p>
              </div>

              <div className="md:col-span-4 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Site</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Fruit Market, Manek Chowk, Ahmedabad</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Approach</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Adaptive Reuse Within Existing Structural Grid</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">New Functions</span>
                  <span className="text-[#802C43] dark:text-[#C45D77] font-semibold">Meditation, Spa & Sustainable Retail</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 02. EXISTING MARKET DOCUMENTATION — 4 SITE PHOTOGRAPHS */}
          <motion.section
            id="mm-site"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>02</span>
                <span aria-hidden="true">·</span>
                <span>Site Context & Existing Market Hall</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                4 Documentation Photographs · Click Any Image to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Existing Market Structure & Context
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              {study.existingMarketPhotos.map((photo, idx) => {
                const spanClass =
                  idx === 0
                    ? 'lg:col-span-4'
                    : idx === 1
                      ? 'lg:col-span-2'
                      : idx === 2
                        ? 'lg:col-span-2'
                        : 'lg:col-span-4';
                return (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(photo.id)}
                    className={`${spanClass} bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3 flex flex-col justify-between cursor-pointer group transition-colors`}
                  >
                    <div className="h-56 sm:h-64 overflow-hidden bg-[#E3D7BF] dark:bg-[#141C30] flex items-center justify-center">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pt-2.5 flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                      <span className="truncate">{photo.title}</span>
                      <Maximize2 className="w-3 h-3 shrink-0 ml-2 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* 03. CONCEPT BRIEF */}
          <motion.section
            id="mm-concept"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>03</span>
              <span aria-hidden="true">·</span>
              <span>Concept Brief</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              From Chaotic Trade to Mindful Circularity
            </h2>

            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 sm:p-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-4">
                Concept Brief
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5] font-light leading-relaxed">
                “{study.conceptBrief}”
              </blockquote>
            </div>
          </motion.section>

          {/* 04. SPACE PLANNING & DESIGN DEVELOPMENT (VERBATIM 3 ZONES + ATMOSPHERIC REFERENCES) */}
          <motion.section
            id="mm-planning"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>04</span>
              <span aria-hidden="true">·</span>
              <span>Space Planning & Design Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Meditation, Wellness & Floral Upcycling Ecosystem
            </h2>

            {/* 3 Verbatim Programme Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {study.spacePlanning.map((step) => (
                <div
                  key={step.number}
                  className="border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-6 space-y-3"
                >
                  <div className="flex items-baseline gap-3 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-3">
                    <span className="text-2xl font-serif-architectural text-[#802C43] dark:text-[#C45D77] font-light tabular-nums">
                      0{step.number}
                    </span>
                    <h3 className="text-lg font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Atmospheric Reference Pair: Meditation Sanctuary & Botanical Retail */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {study.moodPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo.id)}
                  className={`${
                    idx === 0 ? 'md:col-span-7' : 'md:col-span-5'
                  } bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{photo.plate}</strong> · {photo.title}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                  </div>
                  <div className="py-3 overflow-hidden">
                    <div className="aspect-16/10 w-full bg-[#E3D7BF] dark:bg-[#141C30] overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  <p className="pt-2.5 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {photo.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 05. ARCHITECTURAL PLAN (CAD) */}
          <motion.section
            id="mm-plan"
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
                <span>Architectural Plan</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                AutoCAD Ground Plan · Section Cuts A–A’ & B–B’ · Click to Zoom
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Adaptive Reuse Spatial Layout
            </h2>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div
                onClick={() => openLightbox(study.plan.drawing.id)}
                className="xl:col-span-8 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>
                    <strong className="text-[#802C43] dark:text-[#C45D77]">{study.plan.drawing.plate}</strong>
                    <span className="mx-1.5">·</span>
                    <span className="text-[#263D78] dark:text-[#EFE6D5]">{study.plan.drawing.title}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                    <span>Zoom CAD Plan</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="py-5 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                  <img
                    src={study.plan.drawing.imageUrl}
                    alt={study.plan.drawing.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </div>

                <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                  {study.plan.drawing.subtitle}
                </p>
              </div>

              <div className="xl:col-span-4 space-y-5">
                <div className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block mb-3">
                    Drawing Callouts & Zoning
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#1C2D58] dark:text-[#DDD1BC] font-sans leading-relaxed">
                    {study.plan.annotations.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-[#5C6D9B] dark:text-[#988C75] text-[11px] mt-0.5">
                          0{idx + 1}.
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block mb-2.5">
                    Key CAD Dimensions (mm)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {study.plan.dimensions.map((dim) => (
                      <span
                        key={dim}
                        className="px-2.5 py-1 bg-[#F8F3E8] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#263D78] dark:text-[#EFE6D5] tabular-nums"
                      >
                        {dim}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 06. ARCHITECTURAL SECTIONS AA' & BB' */}
          <motion.section
            id="mm-sections"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 pb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>06</span>
                <span aria-hidden="true">·</span>
                <span>Architectural Sections</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Section AA’ & Section BB’ · Click Either Cut to Zoom
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Sectional Studies Across the Clerestory Hall
            </h2>

            {/* Interactive Section Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
                <button
                  type="button"
                  onClick={() => setSectionMode('both')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sectionMode === 'both'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Both Sections
                </button>
                <button
                  type="button"
                  onClick={() => setSectionMode('aa')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sectionMode === 'aa'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Section AA’
                </button>
                <button
                  type="button"
                  onClick={() => setSectionMode('bb')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    sectionMode === 'bb'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Section BB’
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Existing Coffered Beams · Raised Skylight Monitor · 1600 mm Arched Retail Modules
              </span>
            </div>

            <div className="space-y-6">
              {study.sections
                .filter((sec) => {
                  if (sectionMode === 'aa') return sec.drawing.id === 'mm-sec-aa';
                  if (sectionMode === 'bb') return sec.drawing.id === 'mm-sec-bb';
                  return true;
                })
                .map((sec) => (
                  <div
                    key={sec.drawing.id}
                    onClick={() => openLightbox(sec.drawing.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{sec.drawing.plate}</strong>
                        <span className="mx-2">·</span>
                        <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{sec.drawing.title}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                        <span>Inspect Full Resolution</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="py-5 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                      <img
                        src={sec.drawing.imageUrl}
                        alt={sec.drawing.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      />
                    </div>

                    <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                        {sec.drawing.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5 shrink-0">
                        {sec.dimensions.map((dim) => (
                          <span
                            key={dim}
                            className="px-2 py-0.5 bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] text-[11px] font-mono text-[#263D78] dark:text-[#EFE6D5]"
                          >
                            {dim}
                          </span>
                        ))}
                      </div>
                    </div>
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
