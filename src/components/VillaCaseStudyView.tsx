import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, VillaDrawingItem } from '../types';
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

export const VillaCaseStudyView: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const villa = project.villaCaseStudy;

  // Interactive plan controls
  const [activeFloor, setActiveFloor] = useState<'ground' | 'first'>('ground');
  const [planViewMode, setPlanViewMode] = useState<'split' | 'rendered' | 'cad'>('split');

  // Interactive section focus
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  // Fullscreen Lightbox state across all individual drawings
  const [lightboxDrawingId, setLightboxDrawingId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const allDrawings: VillaDrawingItem[] = useMemo(() => {
    if (!villa) return [];
    const coverPlate: VillaDrawingItem = {
      id: 'villa-cover-hero',
      plate: 'Cover',
      title: `${project.title} — Residential Perspective`,
      subtitle: `Theme: ${villa.theme} · Existing Villa Redesign, ${project.location}`,
      imageUrl: project.heroImage,
      category: 'moodboard',
    };
    return [
      coverPlate,
      ...villa.moodboards,
      villa.plans.ground.rendered,
      villa.plans.ground.cad,
      villa.plans.first.rendered,
      villa.plans.first.cad,
      ...villa.sections,
      villa.bedroom.plan,
      ...villa.bedroom.elevations,
      villa.bathroom.plan,
      ...villa.bathroom.sections,
    ];
  }, [villa, project.title, project.location, project.heroImage]);

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

  // Capture-phase keyboard handler so ESC closes Lightbox first without closing parent modal
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

  if (!villa) return null;

  const indexSections = [
    { id: 'villa-brief', label: '01. Project Brief' },
    { id: 'villa-concept', label: '02. Concept Brief & Objectives' },
    { id: 'villa-theme', label: '03. Natural Modern Materiality' },
    { id: 'villa-plans', label: '04. Floor Plans (CAD & Rendered)' },
    { id: 'villa-sections', label: '05. Villa Sections AA’–DD’' },
    { id: 'villa-bedroom', label: '06. Bedroom Plan & Elevations' },
    { id: 'villa-bathroom', label: '07. Bathroom Plan & Sections' },
  ];

  const currentFloorData =
    activeFloor === 'ground' ? villa.plans.ground : villa.plans.first;
  const featuredSection = villa.sections[activeSectionIdx] || villa.sections[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* EDITORIAL COVER: TOP METADATA + LEFT BRIEF + RIGHT COMPACT COVER + BOTTOM THUMBNAILS */}
      <CaseStudyCoverHeader
        projectNumber={project.number}
        categoryLabel={project.categoryLabel}
        location={project.location}
        projectType="Residential Villa · Natural Modern"
        title={project.title}
        subtitle={`Theme: ${villa.theme} · Existing Villa Redesign, ${project.location}`}
        description={project.summary}
        metaItems={[
          { label: 'Site Location', value: 'Existing Villa, Ahmedabad' },
          { label: 'Floor Plan Rule', value: 'Original Floor Plan Unchanged' },
          { label: 'Total Plates', value: `${allDrawings.length} Architectural Drawings` },
        ]}
        scopeTags={project.scope}
        coverPlate={{
          plate: 'Cover',
          label: 'Perspective Overview',
          caption: `Theme: ${villa.theme} · Residential Interior Design`,
          imageUrl: project.heroImage,
          isPortraitAmbient: true,
          onClick: () => openLightbox('villa-cover-hero'),
        }}
        thumbnailStripTitle="Floor Plans, Sections, Interior Elevations & Material Moodboards"
        thumbnails={[
          {
            id: villa.plans.ground.rendered.id,
            plate: villa.plans.ground.rendered.plate,
            label: 'Ground Floor Plan',
            subtitle: villa.plans.ground.rendered.title,
            imageUrl: villa.plans.ground.rendered.imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(villa.plans.ground.rendered.id),
          },
          {
            id: villa.sections[2].id,
            plate: villa.sections[2].plate,
            label: 'Section CC’',
            subtitle: villa.sections[2].title,
            imageUrl: villa.sections[2].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(villa.sections[2].id),
          },
          {
            id: villa.bedroom.elevations[0].id,
            plate: villa.bedroom.elevations[0].plate,
            label: 'Bedroom Elevation',
            subtitle: villa.bedroom.elevations[0].title,
            imageUrl: villa.bedroom.elevations[0].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(villa.bedroom.elevations[0].id),
          },
          {
            id: villa.moodboards[0].id,
            plate: villa.moodboards[0].plate,
            label: 'Material Moodboard',
            subtitle: villa.moodboards[0].title,
            imageUrl: villa.moodboards[0].imageUrl,
            onClick: () => openLightbox(villa.moodboards[0].id),
          },
        ]}
      />

      {/* TWO-COLUMN MONOGRAPH LAYOUT: STICKY INDEX + EDITORIAL CASE STUDY */}
      <div>
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
                  className="block w-full text-left text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5] transition-colors py-1 truncate cursor-pointer"
                >
                  {sec.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] space-y-1">
              <p className="text-[#263D78] dark:text-[#EFE6D5] font-medium">18 Extracted Plates</p>
              <p>Click any drawing to inspect at full resolution.</p>
            </div>
          </div>
        </aside>

        {/* Main Sequential Narrative */}
        <div className="lg:col-span-9 space-y-24">
          {/* 01. PROJECT BRIEF */}
          <motion.section
            id="villa-brief"
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
              Redesigning an Existing Villa Within an Unchanged Plan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8">
                <p className="text-lg sm:text-xl text-[#1C2D58] dark:text-[#EFE6D5] font-light leading-relaxed font-sans">
                  {villa.projectBrief}
                </p>
              </div>

              <div className="md:col-span-4 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Site Location</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Existing Villa, Ahmedabad</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Floor Plan Rule</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Original Floor Plan Unchanged</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Selected Theme</span>
                  <span className="text-[#802C43] dark:text-[#C45D77] font-semibold">{villa.theme}</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 02. CONCEPT BRIEF & DESIGN OBJECTIVES */}
          <motion.section
            id="villa-concept"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>02</span>
              <span aria-hidden="true">·</span>
              <span>Concept Brief & Design Objectives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Visual Continuity Through Furniture, Colours & Finishes
            </h2>

            {/* Concept Statement */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 sm:p-10 mb-10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-4">
                Concept Brief
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5] font-light leading-relaxed">
                “{villa.conceptBrief}”
              </blockquote>
            </div>

            {/* Design Objectives strictly extracted from briefs */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] mb-4">
                Core Design Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {villa.objectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-5 flex items-start gap-4"
                  >
                    <span className="text-xs font-mono tabular-nums text-[#802C43] dark:text-[#C45D77] font-semibold pt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-light">
                      {obj}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 03. NATURAL MODERN THEME & MATERIAL MOODBOARD */}
          <motion.section
            id="villa-theme"
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
                <span>Theme: {villa.theme}</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Materials, Colours & Textures
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Material & Colour Palette
            </h2>

            {/* Asymmetric Material Board Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
              {/* Left: Texture & Swatch Grid */}
              <div
                onClick={() => openLightbox(villa.moodboards[0].id)}
                className="lg:col-span-7 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>{villa.moodboards[0].plate} — Material & Swatch Collage</span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                    <span>Inspect</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-auto py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                  <img
                    src={villa.moodboards[0].imageUrl}
                    alt={villa.moodboards[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                  />
                </div>
                <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                  {villa.moodboards[0].subtitle}
                </p>
              </div>

              {/* Right: Sculptural Tactile Flatlay */}
              <div
                onClick={() => openLightbox(villa.moodboards[1].id)}
                className="lg:col-span-5 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>{villa.moodboards[1].plate} — Material Flatlay</span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                    <span>Inspect</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="my-auto py-4 flex justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                  <img
                    src={villa.moodboards[1].imageUrl}
                    alt={villa.moodboards[1].title}
                    referrerPolicy="no-referrer"
                    className="max-h-72 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                  {villa.moodboards[1].subtitle}
                </p>
              </div>
            </div>

            {/* Clean Material Finish Summary */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 sm:p-6">
              <div className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] mb-3">
                Materials & Colours Represented on Moodboard
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light">
                {villa.materialFinishesNote.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-[#802C43] dark:text-[#C45D77] font-mono text-xs mt-1">·</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 04. FLOOR PLANS — CAD & RENDERED LAYOUTS */}
          <motion.section
            id="villa-plans"
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
                <span>Architectural Plans & Furniture Layouts</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Original Shell Preserved · Click Plans to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Ground Floor & First Floor Documentation
            </h2>

            {/* Interactive Floor + Drawing Mode Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
                <button
                  type="button"
                  onClick={() => setActiveFloor('ground')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeFloor === 'ground'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Ground Floor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFloor('first')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeFloor === 'first'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  First Floor
                </button>
              </div>

              <div className="flex items-center gap-1 border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD] dark:bg-[#18223A] p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setPlanViewMode('split')}
                  className={`px-3 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planViewMode === 'split'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Compare CAD & Render
                </button>
                <button
                  type="button"
                  onClick={() => setPlanViewMode('rendered')}
                  className={`px-3 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planViewMode === 'rendered'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Rendered Plan
                </button>
                <button
                  type="button"
                  onClick={() => setPlanViewMode('cad')}
                  className={`px-3 py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planViewMode === 'cad'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  CAD Line Plan
                </button>
              </div>
            </div>

            {/* Plans Display Stage */}
            <div
              className={`grid gap-6 ${
                planViewMode === 'split' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'
              }`}
            >
              {(planViewMode === 'split' || planViewMode === 'rendered') && (
                <div
                  onClick={() => openLightbox(currentFloorData.rendered.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{currentFloorData.rendered.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{currentFloorData.rendered.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Zoom Plan</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                    <img
                      src={currentFloorData.rendered.imageUrl}
                      alt={currentFloorData.rendered.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {currentFloorData.rendered.subtitle}
                  </p>
                </div>
              )}

              {(planViewMode === 'split' || planViewMode === 'cad') && (
                <div
                  onClick={() => openLightbox(currentFloorData.cad.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{currentFloorData.cad.plate}</strong>
                      <span className="mx-1.5">·</span>
                      <span className="text-[#263D78] dark:text-[#EFE6D5]">{currentFloorData.cad.title}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors shrink-0">
                      <span>Zoom CAD</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="py-4 overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                    <img
                      src={currentFloorData.cad.imageUrl}
                      alt={currentFloorData.cad.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                    {currentFloorData.cad.subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Spaces Annotated on the Selected Plan */}
            <div className="mt-6 pt-4 border-t border-[#D9CBB1] dark:border-[#2A3759] flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs font-mono text-[#3D5288] dark:text-[#BFB299]">
              <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold uppercase tracking-wider mr-1">
                Spaces Annotated on Plan:
              </span>
              {currentFloorData.spaces.map((space, idx) => (
                <React.Fragment key={space}>
                  {idx > 0 && <span aria-hidden="true" className="text-[#802C43] dark:text-[#C45D77]">·</span>}
                  <span>{space}</span>
                </React.Fragment>
              ))}
            </div>
          </motion.section>

          {/* 05. ARCHITECTURAL SECTIONS AA' - DD' */}
          <motion.section
            id="villa-sections"
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
                <span>Longitudinal & Transverse Sections</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Sections AA’, BB’, CC’ & DD’
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Full Villa Architectural Sections
            </h2>

            {/* Featured Interactive Full-Width Section Stage */}
            <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 overflow-x-auto no-scrollbar mb-6">
              {villa.sections.map((sec, idx) => (
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
                  {sec.title}
                </button>
              ))}
            </div>

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

            {/* Thumbnail Grid of All 4 Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {villa.sections.map((sec, idx) => {
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
                      <div className="aspect-[16/8] bg-[#F8F3E8] dark:bg-[#1E2A47] overflow-hidden mb-2.5 border border-[#D9CBB1] dark:border-[#2A3759]">
                        <img
                          src={sec.imageUrl}
                          alt={sec.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isSelected ? 'text-[#802C43] dark:text-[#C45D77] font-semibold' : 'text-[#263D78] dark:text-[#EFE6D5]'}>
                          {sec.title}
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(sec.id);
                          }}
                          className="text-[11px] text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] inline-flex items-center gap-0.5"
                          title={`Open ${sec.title} in fullscreen`}
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

          {/* 06. BEDROOM PLAN & ELEVATIONS A-D */}
          <motion.section
            id="villa-bedroom"
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
                <span>Interior Detail — Bedroom Suite</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Floor Plan & Elevations A, B, C, D
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Bedroom Plan and Elevations
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Asymmetric Anchor: Rendered Bedroom Floor Plan */}
              <div
                onClick={() => openLightbox(villa.bedroom.plan.id)}
                className="lg:col-span-5 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>
                    <strong className="text-[#802C43] dark:text-[#C45D77]">{villa.bedroom.plan.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{villa.bedroom.plan.title}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]">
                    <span>Enlarge</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="my-auto py-6 flex items-center justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                  <img
                    src={villa.bedroom.plan.imageUrl}
                    alt={villa.bedroom.plan.title}
                    referrerPolicy="no-referrer"
                    className="w-full max-w-xs h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                  {villa.bedroom.plan.subtitle}
                </p>
              </div>

              {/* Right 2x2 Grid: Elevations A, B, C, D */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {villa.bedroom.elevations.map((elev) => (
                  <div
                    key={elev.id}
                    onClick={() => openLightbox(elev.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3.5 flex flex-col justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{elev.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{elev.title}</span>
                      </span>
                      <Maximize2 className="w-3 h-3 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                    </div>
                    <div className="my-auto py-3 flex justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                      <img
                        src={elev.imageUrl}
                        alt={elev.title}
                        referrerPolicy="no-referrer"
                        className="max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {elev.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 07. BATHROOM PLAN & SECTIONS AA'-DD' */}
          <motion.section
            id="villa-bathroom"
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
                <span>Interior Detail — Bathroom Suite</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Floor Plan & Sections AA’, BB’, CC’, DD’
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Bathroom Plan and Elevations
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Asymmetric Anchor: Bathroom Plan */}
              <div
                onClick={() => openLightbox(villa.bathroom.plan.id)}
                className="lg:col-span-4 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>
                    <strong className="text-[#802C43] dark:text-[#C45D77]">{villa.bathroom.plan.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{villa.bathroom.plan.title}</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]">
                    <span>Enlarge</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="my-auto py-6 flex items-center justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                  <img
                    src={villa.bathroom.plan.imageUrl}
                    alt={villa.bathroom.plan.title}
                    referrerPolicy="no-referrer"
                    className="max-h-80 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299]">
                  {villa.bathroom.plan.subtitle}
                </p>
              </div>

              {/* Right 2x2 Grid: Bathroom Sections AA'-DD' */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {villa.bathroom.sections.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => openLightbox(sec.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-3.5 flex flex-col justify-between cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{sec.plate}</strong> · <span className="text-[#263D78] dark:text-[#EFE6D5]">{sec.title}</span>
                      </span>
                      <Maximize2 className="w-3 h-3 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                    </div>
                    <div className="my-auto py-3 flex justify-center overflow-hidden bg-[#F8F3E8] dark:bg-[#1E2A47] px-2">
                      <img
                        src={sec.imageUrl}
                        alt={`Bathroom ${sec.title}`}
                        referrerPolicy="no-referrer"
                        className="max-h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <p className="pt-2 border-t border-[#D9CBB1] dark:border-[#2A3759] text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {sec.subtitle}
                    </p>
                  </div>
                ))}
              </div>
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
      </div>

      {/* FULLSCREEN DRAWING LIGHTBOX INSPECTOR */}
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
                <span>Previous Drawing</span>
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
                <span>Next Drawing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
