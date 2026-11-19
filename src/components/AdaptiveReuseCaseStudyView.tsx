import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, AdaptiveReuseDrawingItem } from '../types';
import {
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight,
} from 'lucide-react';
import { CaseStudyCoverHeader } from './CaseStudyCoverHeader';

interface Props {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const AdaptiveReuseCaseStudyView: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const study = project.adaptiveReuseCaseStudy;

  // Interactive plans toggle
  const [planMode, setPlanMode] = useState<'both' | 'ground' | 'first'>('both');

  // Interactive sections selector
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Interactive 3D views space switcher
  const [activeViewGroup, setActiveViewGroup] = useState<'spa' | 'restaurant' | 'deluxe'>('spa');

  // Fullscreen Lightbox state across all 29 extracted plates
  const [lightboxDrawingId, setLightboxDrawingId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const allDrawings: AdaptiveReuseDrawingItem[] = useMemo(() => {
    if (!study) return [];
    return [
      {
        id: 'rc-cover-hero',
        plate: 'Cover',
        title: project.title,
        subtitle: study.subHeader,
        imageUrl: project.heroImage,
        category: 'spa-view',
      },
      ...study.sitePhotos,
      study.moodboard,
      study.plans.ground.drawing,
      study.plans.first.drawing,
      ...study.sections,
      ...study.interiorViews.spaRoom,
      ...study.interiorViews.restaurant,
      study.interiorViews.deluxePlan,
      ...study.interiorViews.deluxeRoom,
    ];
  }, [study, project.title, project.heroImage]);

  const activeLightboxIndex = lightboxDrawingId
    ? allDrawings.findIndex((d) => d.id === lightboxDrawingId)
    : -1;
  const activeLightboxDrawing =
    activeLightboxIndex >= 0 ? allDrawings[activeLightboxIndex] : null;

  const openLightbox = (drawingId: string) => {
    setLightboxDrawingId(drawingId);
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxDrawingId(null);
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 25, 250));
  const handleZoomOut = () => {
    setZoomLevel((z) => {
      const next = Math.max(z - 25, 50);
      if (next <= 100) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };
  const handleResetZoom = () => {
    setZoomLevel(100);
    setPanPosition({ x: 0, y: 0 });
  };

  // Capture-phase keyboard navigation so ESC closes Lightbox before modal
  useEffect(() => {
    if (!lightboxDrawingId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxDrawingId((curr) => {
          const idx = allDrawings.findIndex((d) => d.id === curr);
          const nextIdx = (idx + 1) % allDrawings.length;
          return allDrawings[nextIdx]?.id || curr;
        });
        setPanPosition({ x: 0, y: 0 });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxDrawingId((curr) => {
          const idx = allDrawings.findIndex((d) => d.id === curr);
          const prevIdx = (idx - 1 + allDrawings.length) % allDrawings.length;
          return allDrawings[prevIdx]?.id || curr;
        });
        setPanPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [lightboxDrawingId, allDrawings]);

  if (!study) return null;

  const indexSections = [
    { id: 'ar-brief', label: '01. Project Brief' },
    { id: 'ar-site', label: '02. Heritage Site Context (7 Views)' },
    { id: 'ar-concept', label: '03. Concept Brief' },
    { id: 'ar-planning', label: '04. Space Planning & Development' },
    { id: 'ar-moodboard', label: '05. Mood Board' },
    { id: 'ar-plans', label: '06. Ground & First Floor Plans' },
    { id: 'ar-sections', label: '07. Architectural Sections (AA’–DD’)' },
    { id: 'ar-views', label: '08. 3D Views — Spa, Restaurant & Deluxe' },
  ];

  const featuredSection = study.sections[activeSectionIdx] || study.sections[0];

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
        projectType="Spa & Wellness Retreat"
        title={project.title}
        subtitle={study.subHeader}
        description={project.summary}
        metaItems={[
          { label: 'Existing Building', value: 'R.C. College of Commerce, Mirzapur' },
          { label: 'Proposed Typology', value: 'Spa & Wellness Retreat' },
          { label: 'Total Plates', value: `${allDrawings.length} Extracted Plates` },
        ]}
        scopeTags={project.scope}
        coverPlate={{
          plate: 'Cover',
          label: 'Cover Visual',
          caption: study.subHeader,
          imageUrl: project.heroImage,
          onClick: () => openLightbox('rc-cover-hero'),
        }}
        thumbnailStripTitle="Heritage Site Context, Floor Plans, Sections & Mood Board"
        thumbnails={[
          {
            id: study.sitePhotos[0].id,
            plate: study.sitePhotos[0].plate,
            label: 'Heritage Site · R.C. College',
            subtitle: study.sitePhotos[0].title,
            imageUrl: study.sitePhotos[0].imageUrl,
            onClick: () => openLightbox(study.sitePhotos[0].id),
          },
          {
            id: study.plans.ground.drawing.id,
            plate: study.plans.ground.drawing.plate,
            label: 'Ground Floor Plan',
            subtitle: study.plans.ground.drawing.title,
            imageUrl: study.plans.ground.drawing.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.plans.ground.drawing.id),
          },
          {
            id: study.sections[0].id,
            plate: study.sections[0].plate,
            label: 'Section AA’',
            subtitle: study.sections[0].title,
            imageUrl: study.sections[0].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.sections[0].id),
          },
          {
            id: study.moodboard.id,
            plate: study.moodboard.plate,
            label: 'Material Mood Board',
            subtitle: study.moodboard.title,
            imageUrl: study.moodboard.imageUrl,
            onClick: () => openLightbox(study.moodboard.id),
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
                  className="block w-full text-left text-[#3D5288] dark:text-[#BFB299] hover:text-[#802C43] dark:hover:text-[#EFE6D5] transition-colors py-1 truncate cursor-pointer"
                >
                  {sec.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] space-y-1">
              <p className="text-[#263D78] dark:text-[#EFE6D5] font-medium">{allDrawings.length} Extracted Plates</p>
              <p>Click any site photo, plan, section, or render to inspect at full resolution.</p>
            </div>
          </div>
        </aside>

        {/* Main Sequential Narrative */}
        <div className="lg:col-span-9 space-y-24">
          {/* 01. PROJECT BRIEF */}
          <motion.section
            id="ar-brief"
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
              Adaptive Reuse of R.C. College of Commerce, Mirzapur
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <p className="text-lg sm:text-xl text-[#1C2D58] dark:text-[#EFE6D5] font-light leading-relaxed font-sans">
                  {study.projectBrief}
                </p>
              </div>

              <div className="md:col-span-4 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Site</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">R.C. College of Commerce, Mirzapur, Ahmedabad</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Approach</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Retain Existing Heritage Character</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Proposed Program</span>
                  <span className="text-[#802C43] dark:text-[#C45D77] font-semibold">Spa, Yoga, Meditation, Café & Relaxation</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 02. HERITAGE SITE CONTEXT — 7 EXISTING PHOTOGRAPHS */}
          <motion.section
            id="ar-site"
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
                <span>Site Context & Existing Structure</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                7 Documentation Photographs · Click Any Image to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Existing Heritage Building Documentation
            </h2>

            {/* Asymmetric Editorial Grid of the 7 Existing Site Photos */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Row 1: Wide Façade + Tall Tower + Colonnade */}
              <div
                onClick={() => openLightbox(study.sitePhotos[0].id)}
                className="md:col-span-5 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#E3D7BF] dark:bg-[#141C30]">
                  <img
                    src={study.sitePhotos[0].imageUrl}
                    alt={study.sitePhotos[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-2.5 flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                  <span className="truncate">{study.sitePhotos[0].title}</span>
                  <Maximize2 className="w-3 h-3 shrink-0 ml-2 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                </div>
              </div>

              <div
                onClick={() => openLightbox(study.sitePhotos[1].id)}
                className="md:col-span-3 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="aspect-4/5 md:h-full overflow-hidden bg-[#E3D7BF] dark:bg-[#141C30]">
                  <img
                    src={study.sitePhotos[1].imageUrl}
                    alt={study.sitePhotos[1].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-2.5 flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                  <span className="truncate">{study.sitePhotos[1].title}</span>
                  <Maximize2 className="w-3 h-3 shrink-0 ml-2 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                </div>
              </div>

              <div
                onClick={() => openLightbox(study.sitePhotos[2].id)}
                className="md:col-span-4 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="aspect-4/3 overflow-hidden bg-[#E3D7BF] dark:bg-[#141C30]">
                  <img
                    src={study.sitePhotos[2].imageUrl}
                    alt={study.sitePhotos[2].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="pt-2.5 flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                  <span className="truncate">{study.sitePhotos[2].title}</span>
                  <Maximize2 className="w-3 h-3 shrink-0 ml-2 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                </div>
              </div>

              {/* Row 2: 4 Lower Documentation Views */}
              {study.sitePhotos.slice(3).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(photo.id)}
                  className="md:col-span-3 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="aspect-4/3 overflow-hidden bg-[#E3D7BF] dark:bg-[#141C30]">
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
              ))}
            </div>
          </motion.section>

          {/* 03. CONCEPT BRIEF */}
          <motion.section
            id="ar-concept"
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
              Restorative Adaptive Reuse Strategy
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

          {/* 04. SPACE PLANNING AND DESIGN DEVELOPMENT (STEPS 1-4 VERBATIM) */}
          <motion.section
            id="ar-planning"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>04</span>
              <span aria-hidden="true">·</span>
              <span>Space Planning and Design Development</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Programme, Zoning & Structural Adaptation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <p className="text-sm sm:text-base text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 05. MOOD BOARD */}
          <motion.section
            id="ar-moodboard"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>05</span>
                <span aria-hidden="true">·</span>
                <span>Mood Board</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Materials, Textures, Hydrotherapy & Biophilic Inspirations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Material & Sensory Mood Board
            </h2>

            <div
              onClick={() => openLightbox(study.moodboard.id)}
              className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                <span>
                  <strong className="text-[#802C43] dark:text-[#C45D77]">{study.moodboard.plate}</strong>
                  <span className="mx-1.5">·</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5]">{study.moodboard.title}</span>
                </span>
                <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                  <span>Inspect Board</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="py-5 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                <img
                  src={study.moodboard.imageUrl}
                  alt={study.moodboard.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                />
              </div>

              <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs sm:text-sm text-[#3D5288] dark:text-[#BFB299] font-light">
                {study.moodboard.subtitle}
              </p>
            </div>
          </motion.section>

          {/* 06. FLOOR PLANS — GROUND FLOOR & FIRST FLOOR */}
          <motion.section
            id="ar-plans"
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
                <span>Architectural Plans</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Ground Floor & First Floor · Click Plan to Zoom
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Ground & First Floor Rendered Plans
            </h2>

            {/* Interactive View Switcher */}
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
                  Side by Side
                </button>
                <button
                  type="button"
                  onClick={() => setPlanMode('ground')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planMode === 'ground'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Ground Floor
                </button>
                <button
                  type="button"
                  onClick={() => setPlanMode('first')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planMode === 'first'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  First Floor
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Key Site Nodes: Villa 01 · Villa 02 · Swimming Pool · Spa / Massage Area · Meditation Space · Zen Garden
              </span>
            </div>

            <div
              className={`grid gap-6 ${
                planMode === 'both' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {(planMode === 'both' || planMode === 'ground') && (
                <div
                  onClick={() => openLightbox(study.plans.ground.drawing.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 cursor-pointer group transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{study.plans.ground.drawing.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{study.plans.ground.drawing.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                      <span>Zoom Plan</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                    <img
                      src={study.plans.ground.drawing.imageUrl}
                      alt={study.plans.ground.drawing.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>

                  <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {study.plans.ground.drawing.subtitle}
                  </p>
                </div>
              )}

              {(planMode === 'both' || planMode === 'first') && (
                <div
                  onClick={() => openLightbox(study.plans.first.drawing.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 cursor-pointer group transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{study.plans.first.drawing.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{study.plans.first.drawing.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                      <span>Zoom Plan</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                    <img
                      src={study.plans.first.drawing.imageUrl}
                      alt={study.plans.first.drawing.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>

                  <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {study.plans.first.drawing.subtitle}
                  </p>
                </div>
              )}
            </div>
          </motion.section>

          {/* 07. SECTIONS AA' - DD' */}
          <motion.section
            id="ar-sections"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>07</span>
                <span aria-hidden="true">·</span>
                <span>Sections (NTS)</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Section AA’, BB’, CC’ & DD’
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Architectural Sections Through Heritage Wings & Pavilions
            </h2>

            {/* Section Selector Tabs */}
            <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 overflow-x-auto no-scrollbar mb-6">
              {study.sections.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSectionIdx(idx)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeSectionIdx === idx
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  {sec.plate}
                </button>
              ))}
            </div>

            {/* Active Featured Section Stage */}
            <div
              onClick={() => openLightbox(featuredSection.id)}
              className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors mb-6"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                <span>
                  <strong className="text-[#802C43] dark:text-[#C45D77]">{featuredSection.plate}</strong>
                  <span className="mx-2">·</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{featuredSection.title}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                  <span>Inspect Full Resolution</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="py-5 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                <img
                  src={featuredSection.imageUrl}
                  alt={featuredSection.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              </div>

              <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs sm:text-sm text-[#3D5288] dark:text-[#BFB299] font-light">
                {featuredSection.subtitle}
              </p>
            </div>

            {/* 4-Plate Thumbnail Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {study.sections.map((sec, idx) => {
                const isSelected = idx === activeSectionIdx;
                return (
                  <div
                    key={sec.id}
                    className={`bg-[#F3EBDD] dark:bg-[#18223A] border p-3 transition-all ${
                      isSelected ? 'border-[#802C43] dark:border-[#C45D77]' : 'border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#263D78] dark:hover:border-[#EFE6D5]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveSectionIdx(idx)}
                      className="w-full text-left cursor-pointer group"
                    >
                      <div className="aspect-[16/7] bg-[#F8F3E8] dark:bg-[#1E2A47] overflow-hidden mb-2.5 border border-[#D9CBB1] dark:border-[#2A3759] flex items-center justify-center">
                        <img
                          src={sec.imageUrl}
                          alt={sec.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isSelected ? 'text-[#802C43] dark:text-[#C45D77] font-semibold' : 'text-[#263D78] dark:text-[#EFE6D5]'}>
                          {sec.plate}
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(sec.id);
                          }}
                          className="text-[11px] text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] inline-flex items-center gap-0.5"
                          title={`Open ${sec.plate} in fullscreen`}
                        >
                          Zoom <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* 08. 3D VIEWS — SPA ROOM, RESTAURANT & DELUXE ROOM */}
          <motion.section
            id="ar-views"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 pb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>08</span>
                <span aria-hidden="true">·</span>
                <span>3D Views & Interior Visualisations</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Spa Room (5) · Restaurant (2) · Deluxe Room Plan & Views (8)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Interior Atmosphere Across Wellness Zones
            </h2>

            {/* Space Switcher Bar */}
            <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 overflow-x-auto no-scrollbar mb-8">
              <button
                type="button"
                onClick={() => setActiveViewGroup('spa')}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeViewGroup === 'spa'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                Spa Room ({study.interiorViews.spaRoom.length} Views)
              </button>
              <button
                type="button"
                onClick={() => setActiveViewGroup('restaurant')}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeViewGroup === 'restaurant'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                Restaurant ({study.interiorViews.restaurant.length} Views)
              </button>
              <button
                type="button"
                onClick={() => setActiveViewGroup('deluxe')}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeViewGroup === 'deluxe'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                Deluxe Room (Plan & {study.interiorViews.deluxeRoom.length} Views)
              </button>
            </div>

            {/* SPA ROOM VIEWS */}
            {activeViewGroup === 'spa' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {study.interiorViews.spaRoom.map((view, idx) => (
                  <div
                    key={view.id}
                    onClick={() => openLightbox(view.id)}
                    className={`${
                      idx === 0 ? 'md:col-span-7' : idx === 1 ? 'md:col-span-5' : 'md:col-span-4'
                    } bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3.5 flex flex-col justify-between cursor-pointer group transition-colors`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{view.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{view.title}</span>
                      </span>
                      <Maximize2 className="w-3 h-3 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                    </div>
                    <div className="my-auto py-3 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                      <img
                        src={view.imageUrl}
                        alt={view.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto max-h-72 object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {view.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* RESTAURANT VIEWS */}
            {activeViewGroup === 'restaurant' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {study.interiorViews.restaurant.map((view) => (
                  <div
                    key={view.id}
                    onClick={() => openLightbox(view.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{view.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{view.title}</span>
                      </span>
                      <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                    </div>
                    <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                      <img
                        src={view.imageUrl}
                        alt={view.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {view.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* DELUXE ROOM PLAN + 7 VIEWS */}
            {activeViewGroup === 'deluxe' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Anchor: Deluxe Suite Rendered Plan */}
                <div
                  onClick={() => openLightbox(study.interiorViews.deluxePlan.id)}
                  className="lg:col-span-4 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{study.interiorViews.deluxePlan.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{study.interiorViews.deluxePlan.title}</span>
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                  </div>
                  <div className="py-5 flex justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                    <img
                      src={study.interiorViews.deluxePlan.imageUrl}
                      alt={study.interiorViews.deluxePlan.title}
                      referrerPolicy="no-referrer"
                      className="w-full max-w-xs h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {study.interiorViews.deluxePlan.subtitle}
                  </p>
                </div>

                {/* Right Grid: 7 Deluxe 3D Perspectives */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {study.interiorViews.deluxeRoom.map((view) => (
                    <div
                      key={view.id}
                      onClick={() => openLightbox(view.id)}
                      className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3.5 flex flex-col justify-between cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                        <span className="truncate pr-2">
                          <strong className="text-[#802C43] dark:text-[#C45D77]">{view.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{view.title}</span>
                        </span>
                        <Maximize2 className="w-3 h-3 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                      </div>
                      <div className="my-auto py-3 flex justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                        <img
                          src={view.imageUrl}
                          alt={view.title}
                          referrerPolicy="no-referrer"
                          className="max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                        {view.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>

          {/* Bottom Next / Previous Project Navigation */}
          <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="button"
              onClick={() => {
                onSelectProject(prevProject);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-left group border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-4 transition-colors cursor-pointer"
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
              className="w-full sm:w-auto text-right group border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-4 transition-colors cursor-pointer"
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

      {/* FULLSCREEN DRAWING & PHOTO LIGHTBOX INSPECTOR */}
      {activeLightboxDrawing && (
        <div
          className="fixed inset-0 z-50 bg-[#101626]/95 backdrop-blur-md flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-4 border-b border-[#EFE6D5]/15 text-[#EFE6D5] shrink-0">
            <div className="text-xs font-mono">
              <span className="text-[#E598AC] font-semibold">
                {activeLightboxDrawing.plate}
              </span>
              <span className="mx-2 text-[#EFE6D5]/40">·</span>
              <span className="text-[#EFE6D5] font-medium">
                {activeLightboxDrawing.title}
              </span>
              <span className="hidden md:inline text-[#EFE6D5]/55 ml-3">
                ({activeLightboxIndex + 1} / {allDrawings.length})
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Zoom Controls */}
              <div className="flex items-center border border-[#EFE6D5]/25 bg-[#101626]/70 px-2 py-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1 hover:text-[#E598AC] cursor-pointer"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 min-w-12 text-center tabular-nums">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1 hover:text-[#E598AC] cursor-pointer"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1 ml-1 hover:text-[#E598AC] cursor-pointer"
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="px-3 py-1.5 bg-[#F3EBDD] dark:bg-[#1C2845] text-[#263D78] dark:text-[#EFE6D5] hover:bg-[#802C43] hover:text-[#F8F3E8] dark:hover:bg-[#C45D77] dark:hover:text-[#101626] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close [ESC]</span>
              </button>
            </div>
          </div>

          {/* Interactive Drawing Viewport */}
          <div
            className="grow overflow-auto p-4 sm:p-8 flex items-center justify-center relative"
            onMouseDown={(e) => {
              if (zoomLevel > 100) {
                setIsDragging(true);
                setDragStart({
                  x: e.clientX - panPosition.x,
                  y: e.clientY - panPosition.y,
                });
              }
            }}
            onMouseMove={(e) => {
              if (isDragging && zoomLevel > 100) {
                setPanPosition({
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y,
                });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            style={{
              cursor:
                zoomLevel > 100 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            <div
              className="bg-[#F8F3E8] dark:bg-[#1E2A47] p-3 sm:p-6 shadow-2xl max-w-5xl w-full transition-transform origin-center"
              style={{
                transform: `scale(${zoomLevel / 100}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
            >
              <img
                src={activeLightboxDrawing.imageUrl}
                alt={activeLightboxDrawing.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[75vh] object-contain mx-auto select-none"
              />
            </div>
          </div>

          {/* Lightbox Footer Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-8 py-3.5 border-t border-[#EFE6D5]/15 text-xs font-mono text-[#EFE6D5]/80 shrink-0">
            <span className="truncate max-w-xl">
              {activeLightboxDrawing.subtitle}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const prevIdx =
                    (activeLightboxIndex - 1 + allDrawings.length) %
                    allDrawings.length;
                  openLightbox(allDrawings[prevIdx].id);
                }}
                className="px-3 py-1.5 border border-[#EFE6D5]/25 hover:border-[#E598AC] text-[#EFE6D5] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextIdx =
                    (activeLightboxIndex + 1) % allDrawings.length;
                  openLightbox(allDrawings[nextIdx].id);
                }}
                className="px-3 py-1.5 border border-[#EFE6D5]/25 hover:border-[#E598AC] text-[#EFE6D5] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
