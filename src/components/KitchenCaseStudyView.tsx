import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, KitchenDrawingItem } from '../types';
import { Maximize2 } from 'lucide-react';
import { CaseStudyCoverHeader } from './CaseStudyCoverHeader';
import { DrawingLightbox } from './DrawingLightbox';

interface Props {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const KitchenCaseStudyView: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
}) => {
  const study = project.kitchenCaseStudy;

  // Interactive plan mode: cad vs rendered vs compare
  const [planTab, setPlanTab] = useState<'cad' | 'rendered' | 'compare'>('cad');

  // Interactive elevation mode: both | a | b (CAD vs Rendered)
  const [elevationTab, setElevationTab] = useState<'cad' | 'rendered' | 'compare'>('compare');

  // Active fixture category filter
  const [fixtureFilter, setFixtureFilter] = useState<
    'all' | 'sink' | 'faucet' | 'refrigerator' | 'appliance' | 'hardware'
  >('all');

  // Lightbox across all extracted plates, materials & fixtures
  const [lightboxDrawingId, setLightboxDrawingId] = useState<string | null>(null);

  const allDrawings: KitchenDrawingItem[] = useMemo(() => {
    if (!study) return [];
    const coverPlate: KitchenDrawingItem = {
      id: 'kit-cover-hero',
      plate: 'Cover',
      title: `${project.title} — Spatial Concept Visual`,
      subtitle: study.subHeader,
      imageUrl: project.heroImage,
      category: 'moodboard',
    };
    const materialPlates: KitchenDrawingItem[] = study.materials.map((mat, idx) => ({
      id: mat.id,
      plate: `Material 0${idx + 1}`,
      title: mat.name,
      subtitle: `${mat.application} · ${mat.stageNote}`,
      imageUrl: mat.imageUrl,
      category: 'moodboard',
    }));
    const fixturePlates: KitchenDrawingItem[] = study.fixtures.map((fix) => ({
      id: fix.id,
      plate: fix.categoryLabel,
      title: fix.name,
      subtitle: fix.brand || fix.finishOrMaterial || fix.categoryLabel,
      imageUrl: fix.imageUrl,
      category: 'moodboard',
    }));
    return [
      coverPlate,
      study.moodboard,
      ...study.cadPlans,
      ...study.cadElevations,
      ...study.renderedPlans,
      ...study.renderedElevations,
      ...materialPlates,
      ...fixturePlates,
    ];
  }, [study, project.heroImage, project.title]);

  const openLightbox = (drawingId: string) => {
    setLightboxDrawingId(drawingId);
  };

  if (!study) return null;

  const indexSections = [
    { id: 'kit-brief', label: '01. Project Brief & Intent' },
    { id: 'kit-concept', label: '02. Concept Brief' },
    { id: 'kit-plans', label: '03. Plans & Cabinet Layout' },
    { id: 'kit-elevations', label: '04. Sections & Elevations (A & B)' },
    { id: 'kit-renders', label: '05. 3D Visualisation & Renders' },
    { id: 'kit-materials', label: '06. Moodboard & Material Palette' },
    { id: 'kit-fixtures', label: '07. Kitchen Fixtures & Specifications' },
    { id: 'kit-final', label: '08. Final Kitchen Presentation' },
  ];

  const fixtureTabs = [
    { id: 'all', label: 'All Fixtures' },
    { id: 'sink', label: 'Kitchen Sink' },
    { id: 'faucet', label: 'Kitchen Faucet' },
    { id: 'refrigerator', label: 'Refrigerator' },
    { id: 'appliance', label: 'Kitchen Appliances' },
    { id: 'hardware', label: 'Hardware & Accessories' },
  ] as const;

  const filteredFixtures =
    fixtureFilter === 'all'
      ? study.fixtures
      : study.fixtures.filter((f) => f.category === fixtureFilter);

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
        projectType="Parallel Galley Kitchen"
        title={project.title}
        subtitle={study.subHeader}
        description={project.summary}
        metaItems={[
          { label: 'Spatial Typology', value: 'Parallel Galley Kitchen' },
          { label: 'Drafting Units', value: 'All Measurements in Millimeters (mm)' },
          { label: 'Specifications', value: `${allDrawings.length} Plates · ${study.fixtures.length} Fixtures` },
        ]}
        scopeTags={project.scope}
        coverPlate={{
          plate: 'Cover',
          label: 'Cover Visual',
          caption: project.subtitle,
          imageUrl: project.heroImage,
          isPortraitAmbient: true,
          onClick: () => openLightbox('kit-cover-hero'),
        }}
        thumbnailStripTitle="CAD Plans, Rendered Plates, Elevations & Mood Board"
        thumbnails={[
          {
            id: study.cadPlans[0].id,
            plate: study.cadPlans[0].plate,
            label: 'CAD Plan',
            subtitle: study.cadPlans[0].title,
            imageUrl: study.cadPlans[0].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.cadPlans[0].id),
          },
          {
            id: study.renderedPlans[0].id,
            plate: study.renderedPlans[0].plate,
            label: 'Rendered Plan',
            subtitle: study.renderedPlans[0].title,
            imageUrl: study.renderedPlans[0].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.renderedPlans[0].id),
          },
          {
            id: study.renderedElevations[0].id,
            plate: study.renderedElevations[0].plate,
            label: 'Rendered Elevation A',
            subtitle: study.renderedElevations[0].title,
            imageUrl: study.renderedElevations[0].imageUrl,
            isTechnical: true,
            onClick: () => openLightbox(study.renderedElevations[0].id),
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

      {/* TWO-COLUMN MONOGRAPH LAYOUT */}
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

            <button
              type="button"
              onClick={() => openLightbox(allDrawings[0]?.id || 'kit-cover-hero')}
              className="w-full text-left pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] space-y-1 cursor-pointer transition-colors group"
            >
              <p className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] font-medium transition-colors">
                Extracted Plates
              </p>
              <p>Click any plan, elevation, render, or moodboard to zoom in fullscreen.</p>
            </button>
          </div>
        </aside>

        {/* Main Sequential Content */}
        <div className="lg:col-span-9 space-y-24">
          {/* 01. PROJECT OVERVIEW & BRIEF */}
          <motion.section
            id="kit-brief"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>01</span>
              <span aria-hidden="true">·</span>
              <span>Project Brief & Overview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Spatial Requirements, Layout & Cohesion
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
              <div className="md:col-span-8 space-y-6">
                <p className="text-lg sm:text-xl text-[#1C2D58] dark:text-[#EFE6D5] font-light leading-relaxed font-sans">
                  {study.projectBrief}
                </p>
                <div className="border-l-2 border-[#802C43] dark:border-[#C45D77] pl-5 py-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block mb-1">
                    Design Intent
                  </span>
                  <p className="text-sm sm:text-base text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-light">
                    {study.designIntent}
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-5 space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Configuration</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Parallel Galley Kitchen</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Ceiling / Counter Datum</span>
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">2438 mm Clear · 787 / 757 mm Counters</span>
                </div>
                <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                  <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase block mb-0.5">Primary Finish Language</span>
                  <span className="text-[#802C43] dark:text-[#C45D77] font-semibold">Green/Black Stone, Wood & Cream Acrylic</span>
                </div>
              </div>
            </div>

            {/* Design Objectives */}
            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block mb-4">
                Design Objectives
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {study.objectives.map((obj, i) => (
                  <div key={i} className="bg-[#F8F3E8] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-4 space-y-2">
                    <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] font-semibold block">
                      Objective 0{i + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-light">
                      {obj}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 02. CONCEPT BRIEF */}
          <motion.section
            id="kit-concept"
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
              Parallel Workflow & Tactile Balance
            </h2>

            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 sm:p-10 mb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block mb-4">
                Concept Brief
              </span>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5] font-light leading-relaxed">
                “{study.conceptBrief}”
              </blockquote>
            </div>

            {/* Key Ergonomic & Storage Zones Extracted From Sheets */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block mb-3">
                Programmed Galley Cabinet & Appliance Zones (mm)
              </span>
              <div className="flex flex-wrap gap-2">
                {study.cabinetZones.map((zone) => (
                  <span
                    key={zone}
                    className="px-3 py-1.5 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#263D78] dark:text-[#EFE6D5]"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 03. KITCHEN FLOOR PLAN + FURNITURE & CABINET LAYOUT (SEPARATE PLATES) */}
          <motion.section
            id="kit-plans"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider">
                <span>03</span>
                <span aria-hidden="true">·</span>
                <span>Kitchen Floor Plans & Equipment Layout</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                All Measurements in MM · Click Any Plan to Enlarge
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Layout Progression: Appliances, Lower & Upper Cabinets
            </h2>

            {/* Plan Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
                <button
                  type="button"
                  onClick={() => setPlanTab('cad')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planTab === 'cad'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  CAD Plans (3)
                </button>
                <button
                  type="button"
                  onClick={() => setPlanTab('rendered')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planTab === 'rendered'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Rendered Plans (3)
                </button>
                <button
                  type="button"
                  onClick={() => setPlanTab('compare')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    planTab === 'compare'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Show All 6 Plans
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Plan 1 (Fixtures) · Plan 2 (Lower Cabinets) · Plan 3 (Lower & Upper Cabinets)
              </span>
            </div>

            {(planTab === 'cad' || planTab === 'compare') && (
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block mb-3">
                  Technical CAD Floor & Cabinetry Plans
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {study.cadPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => openLightbox(plan.id)}
                      className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                        <span>
                          <strong className="text-[#802C43] dark:text-[#C45D77]">{plan.plate}</strong>
                        </span>
                        <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]">
                          <span>Zoom</span>
                          <Maximize2 className="w-3 h-3" />
                        </span>
                      </div>
                      <div className="py-4 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                        <img
                          src={plan.imageUrl}
                          alt={plan.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="pt-2.5 border-t border-[#D9CBB1] dark:border-[#2A3759] space-y-1">
                        <h4 className="text-xs font-mono font-semibold text-[#263D78] dark:text-[#EFE6D5]">
                          {plan.title}
                        </h4>
                        <p className="text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(planTab === 'rendered' || planTab === 'compare') && (
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#802C43] dark:text-[#C45D77] block mb-3">
                  Rendered Floor & Cabinetry Plans
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {study.renderedPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => openLightbox(plan.id)}
                      className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                        <span>
                          <strong className="text-[#802C43] dark:text-[#C45D77]">{plan.plate}</strong>
                        </span>
                        <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]">
                          <span>Zoom</span>
                          <Maximize2 className="w-3 h-3" />
                        </span>
                      </div>
                      <div className="py-4 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                        <img
                          src={plan.imageUrl}
                          alt={plan.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="pt-2.5 border-t border-[#D9CBB1] dark:border-[#2A3759] space-y-1">
                        <h4 className="text-xs font-mono font-semibold text-[#263D78] dark:text-[#EFE6D5]">
                          {plan.title}
                        </h4>
                        <p className="text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>

          {/* 04. SECTIONS AND ELEVATIONS (A & B) */}
          <motion.section
            id="kit-elevations"
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
                <span>Sections & Elevations</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Elevation A & Elevation B · CAD & Material Callouts
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Interior Elevations & Counter Height Studies
            </h2>

            {/* Elevation View Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1">
                <button
                  type="button"
                  onClick={() => setElevationTab('compare')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    elevationTab === 'compare'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  CAD + Rendered Comparison
                </button>
                <button
                  type="button"
                  onClick={() => setElevationTab('cad')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    elevationTab === 'cad'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  CAD Elevations (2)
                </button>
                <button
                  type="button"
                  onClick={() => setElevationTab('rendered')}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    elevationTab === 'rendered'
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  Rendered Elevations (2)
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">
                2438 mm Ceiling · 1778 mm Mid Datum · 871 mm Upper Cabinet · 787 / 757 mm Base
              </span>
            </div>

            <div className="space-y-6">
              {(elevationTab === 'cad' || elevationTab === 'compare') &&
                study.cadElevations.map((elev) => (
                  <div
                    key={elev.id}
                    onClick={() => openLightbox(elev.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{elev.plate}</strong>
                        <span className="mx-2">·</span>
                        <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{elev.title}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                        <span>Inspect Full Resolution</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="py-5 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                      <img
                        src={elev.imageUrl}
                        alt={elev.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                    <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {elev.subtitle}
                    </p>
                  </div>
                ))}

              {(elevationTab === 'rendered' || elevationTab === 'compare') &&
                study.renderedElevations.map((elev) => (
                  <div
                    key={elev.id}
                    onClick={() => openLightbox(elev.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 sm:p-6 cursor-pointer group transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span>
                        <strong className="text-[#802C43] dark:text-[#C45D77]">{elev.plate}</strong>
                        <span className="mx-2">·</span>
                        <span className="text-[#263D78] dark:text-[#EFE6D5] font-semibold">{elev.title}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0">
                        <span>Inspect Full Resolution</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="py-5 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                      <img
                        src={elev.imageUrl}
                        alt={elev.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                    <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                      {elev.subtitle}
                    </p>
                  </div>
                ))}
            </div>
          </motion.section>

          {/* 05. 3D VISUALISATION AND RENDERS GALLERY */}
          <motion.section
            id="kit-renders"
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
                <span>Visualisation & Rendered Views</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                5 Rendered Plates · Click Any Render to Expand
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Materialized Kitchen Renders & Spatial Atmosphere
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {study.renderedElevations.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item.id)}
                  className="md:col-span-6 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{item.plate}</strong> · {item.title}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                  </div>
                  <div className="py-4 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="pt-2.5 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              ))}

              {study.renderedPlans.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item.id)}
                  className="md:col-span-4 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex flex-col justify-between cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{item.plate}</strong>
                    </span>
                    <Maximize2 className="w-3 h-3 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] shrink-0" />
                  </div>
                  <div className="py-3 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="pt-2.5 border-t border-[#D9CBB1] dark:border-[#2A3759] text-[11px] text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 06. MOODBOARD AND MATERIAL PALETTE */}
          <motion.section
            id="kit-materials"
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
                <span>Mood Board & Material Palette</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Countertops · Cabinetry · Backsplash · Flooring · Hardware
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Specified Kitchen Finishes & Surface Palette
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Moodboard Plate */}
              <div
                onClick={() => openLightbox(study.moodboard.id)}
                className="lg:col-span-5 bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 cursor-pointer group transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                  <span>
                    <strong className="text-[#802C43] dark:text-[#C45D77]">{study.moodboard.plate}</strong> · Sensory Board
                  </span>
                  <span className="flex items-center gap-1 text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]">
                    <span>Inspect</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="py-4 flex justify-center bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                  <img
                    src={study.moodboard.imageUrl}
                    alt={study.moodboard.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </div>
                <p className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                  {study.moodboard.subtitle}
                </p>
              </div>

              {/* Right Individual Extracted Material Swatches Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.materials.map((mat) => (
                  <div
                    key={mat.id}
                    onClick={() => openLightbox(mat.id)}
                    className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 flex items-center gap-4 cursor-pointer group transition-colors"
                  >
                    <div className="w-20 h-20 shrink-0 bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] p-1.5 flex items-center justify-center overflow-hidden">
                      <img
                        src={mat.imageUrl}
                        alt={mat.name}
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 shrink-0 border border-[#C7B697] dark:border-[#3A4B75]"
                          style={{ backgroundColor: mat.colorHex }}
                        />
                        <h4 className="text-sm font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] truncate">
                          {mat.name}
                        </h4>
                      </div>
                      <p className="text-xs text-[#1C2D58] dark:text-[#DDD1BC] leading-snug">
                        {mat.application}
                      </p>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block">
                        {mat.stageNote}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* 07. KITCHEN FIXTURES & SPECIFICATIONS */}
          <motion.section
            id="kit-fixtures"
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
                <span>Kitchen Fixtures & Specifications</span>
              </div>
              <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                Extracted Directly From Product Schedule & Drawings
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6 text-balance">
              Kitchen Fixtures & Specifications
            </h2>

            {/* Category Tabs */}
            <div className="flex items-center gap-1 bg-[#DFD2B8] dark:bg-[#1C2845] p-1 overflow-x-auto no-scrollbar mb-8">
              {fixtureTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFixtureFilter(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    fixtureFilter === tab.id
                      ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Product & Fixture Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                      <span className="text-[#802C43] dark:text-[#C45D77] uppercase font-semibold">
                        {fixture.categoryLabel}
                      </span>
                      {fixture.dimensions && (
                        <span className="px-2 py-0.5 bg-[#F8F3E8] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] text-[#263D78] dark:text-[#EFE6D5] tabular-nums">
                          {fixture.dimensions}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-5 py-4">
                      <button
                        type="button"
                        onClick={() => openLightbox(fixture.id)}
                        className="w-24 h-24 shrink-0 bg-[#F8F3E8] dark:bg-[#1E2A47] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-2 flex items-center justify-center cursor-pointer group transition-colors"
                        aria-label={`Zoom ${fixture.name}`}
                      >
                        <img
                          src={fixture.imageUrl}
                          alt={fixture.name}
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>

                      <div className="space-y-1.5">
                        <h3 className="text-lg font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] leading-snug">
                          {fixture.name}
                        </h3>
                        {fixture.brand && (
                          <p className="text-xs font-mono text-[#3D5288] dark:text-[#BFB299]">
                            Brand: <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">{fixture.brand}</span>
                          </p>
                        )}
                        {fixture.finishOrMaterial && (
                          <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed">
                            {fixture.finishOrMaterial}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D9CBB1] dark:border-[#2A3759]">
                    <ul className="space-y-1.5 text-xs text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">
                      {fixture.specifications.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#802C43] dark:text-[#C45D77] font-mono text-[11px] mt-0.5">·</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 08. FINAL PROJECT PRESENTATION */}
          <motion.section
            id="kit-final"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 pb-8"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider mb-3">
              <span>08</span>
              <span aria-hidden="true">·</span>
              <span>Final Kitchen Presentation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-8 text-balance">
              Complete Parallel Galley Synthesis
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {study.renderedElevations.map((elev) => (
                <div
                  key={`final-${elev.id}`}
                  onClick={() => openLightbox(elev.id)}
                  className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 p-4 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] pb-2.5 border-b border-[#D9CBB1] dark:border-[#2A3759]">
                    <span>
                      <strong className="text-[#802C43] dark:text-[#C45D77]">{elev.plate}</strong> · {elev.title}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#5C6D9B] dark:text-[#988C75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]" />
                  </div>
                  <div className="py-4 bg-[#F8F3E8] dark:bg-[#1E2A47] px-2 overflow-hidden">
                    <img
                      src={elev.imageUrl}
                      alt={elev.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5C6D9B] dark:text-[#988C75] block mb-3">
                Key Sheet Dimensions & Clearances (MM)
              </span>
              <div className="flex flex-wrap gap-2">
                {study.planDimensionsMm.map((dim) => (
                  <span
                    key={dim}
                    className="px-2.5 py-1 bg-[#F8F3E8] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#263D78] dark:text-[#EFE6D5] tabular-nums"
                  >
                    {dim}
                  </span>
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

      <DrawingLightbox
        items={allDrawings}
        activeId={lightboxDrawingId}
        onSelectId={setLightboxDrawingId}
        onClose={() => setLightboxDrawingId(null)}
      />
    </div>
  );
};
