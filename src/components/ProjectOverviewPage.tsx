import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, MapPin, Maximize2 } from 'lucide-react';
import { ProjectCaseStudy } from '../types';
import { ARCHITECTURAL_EASE } from './EditorialMotion';
import { DrawingLightbox } from './DrawingLightbox';

interface ContentSectionItem {
  id: string;
  num: string;
  label: string;
  meta?: string;
}

interface OverviewMetadata {
  projectType: string;
  projectBrief: string;
  designConcept: string;
  contents: ContentSectionItem[];
}

function getProjectOverviewData(project: ProjectCaseStudy): OverviewMetadata {
  if (project.adaptiveReuseCaseStudy) {
    const study = project.adaptiveReuseCaseStudy;
    return {
      projectType: 'Adaptive Reuse · Spa & Wellness Retreat',
      projectBrief: study.projectBrief,
      designConcept: study.conceptBrief,
      contents: [
        { id: 'ar-brief', num: '01', label: 'Project Brief', meta: 'Site & Program' },
        {
          id: 'ar-site',
          num: '02',
          label: 'Heritage Site Context',
          meta: `${study.sitePhotos.length} Existing Views`,
        },
        { id: 'ar-concept', num: '03', label: 'Concept Brief', meta: 'Adaptive Strategy' },
        {
          id: 'ar-planning',
          num: '04',
          label: 'Space Planning & Development',
          meta: `${study.spacePlanning.length} Spatial Zones`,
        },
        { id: 'ar-moodboard', num: '05', label: 'Mood Board', meta: 'Material Atmosphere' },
        { id: 'ar-plans', num: '06', label: 'Ground & First Floor Plans', meta: 'Rendered Plans' },
        {
          id: 'ar-sections',
          num: '07',
          label: 'Architectural Sections',
          meta: `${study.sections.length} Measured Cuts (AA’–DD’)`,
        },
        {
          id: 'ar-views',
          num: '08',
          label: '3D Interior Views',
          meta: 'Spa, Restaurant & Deluxe Suite',
        },
      ],
    };
  }

  if (project.marketMindfulnessCaseStudy) {
    const study = project.marketMindfulnessCaseStudy;
    return {
      projectType: 'Adaptive Reuse · Wellness & Sustainable Retail',
      projectBrief: study.projectBrief,
      designConcept: study.conceptBrief,
      contents: [
        { id: 'mm-brief', num: '01', label: 'Project Brief', meta: 'Site & Program' },
        {
          id: 'mm-site',
          num: '02',
          label: 'Existing Market Context',
          meta: `${study.existingMarketPhotos.length} Site Views`,
        },
        { id: 'mm-concept', num: '03', label: 'Concept Brief', meta: 'Mindfulness & Retail' },
        {
          id: 'mm-planning',
          num: '04',
          label: 'Space Planning & Development',
          meta: `${study.spacePlanning.length} Spatial Zones`,
        },
        { id: 'mm-plan', num: '05', label: 'Architectural CAD Plan', meta: 'Measured Layout' },
        {
          id: 'mm-sections',
          num: '06',
          label: 'Architectural Sections',
          meta: `${study.sections.length} Sections (AA’ & BB’)`,
        },
      ],
    };
  }

  if (project.kitchenCaseStudy) {
    const study = project.kitchenCaseStudy;
    return {
      projectType: 'Interior Design · Parallel Galley Kitchen',
      projectBrief: study.projectBrief,
      designConcept: study.conceptBrief,
      contents: [
        { id: 'kit-brief', num: '01', label: 'Project Brief & Intent', meta: 'Spatial Requirements' },
        { id: 'kit-concept', num: '02', label: 'Concept Brief', meta: 'Parallel Galley Flow' },
        {
          id: 'kit-plans',
          num: '03',
          label: 'Plans & Cabinet Layout',
          meta: `${study.cadPlans.length} CAD & ${study.renderedPlans.length} Rendered Plans`,
        },
        {
          id: 'kit-elevations',
          num: '04',
          label: 'Sections & Elevations',
          meta: 'Elevations A & B',
        },
        { id: 'kit-renders', num: '05', label: '3D Visualisation & Renders', meta: 'Interior Views' },
        {
          id: 'kit-materials',
          num: '06',
          label: 'Moodboard & Material Palette',
          meta: `${study.materials.length} Surface Finishes`,
        },
        {
          id: 'kit-fixtures',
          num: '07',
          label: 'Kitchen Fixtures & Specifications',
          meta: `${study.fixtures.length} Specified Products`,
        },
        { id: 'kit-final', num: '08', label: 'Final Kitchen Presentation', meta: 'Complete Synthesis' },
      ],
    };
  }

  if (project.fusionFurnitureCaseStudy) {
    const study = project.fusionFurnitureCaseStudy;
    return {
      projectType: 'Furniture Design · 2-in-1 Royal Breeze Swing',
      projectBrief: study.projectBrief,
      designConcept: study.conceptBrief,
      contents: [
        { id: 'ff-intro', num: '01', label: 'Project Introduction & Brief', meta: study.furnitureTitle },
        {
          id: 'ff-concept',
          num: '02',
          label: 'Concept & Inspiration',
          meta: 'Punjab Royal × Goa Coastal',
        },
        {
          id: 'ff-development',
          num: '03',
          label: 'Design Development',
          meta: 'Concept Sketches & Evolution',
        },
        {
          id: 'ff-drawings',
          num: '04',
          label: 'Technical Drawings & Dimensions',
          meta: 'Working Drawing (mm)',
        },
        {
          id: 'ff-joinery',
          num: '05',
          label: 'Joinery & Construction',
          meta: `${study.joineryDetails.length} Exploded Details`,
        },
        {
          id: 'ff-materials',
          num: '06',
          label: 'Material & Colour Palette',
          meta: `${study.materials.length} Timber & Cane Finishes`,
        },
        {
          id: 'ff-final',
          num: '07',
          label: 'Final Furniture Design',
          meta: 'Hanging Jhula & Floor Seating',
        },
      ],
    };
  }

  if (project.villaCaseStudy) {
    const study = project.villaCaseStudy;
    return {
      projectType: `Residential Interior · ${study.theme}`,
      projectBrief: study.projectBrief,
      designConcept: study.conceptBrief,
      contents: [
        { id: 'villa-brief', num: '01', label: 'Project Brief', meta: 'Unchanged Villa Plan' },
        {
          id: 'villa-concept',
          num: '02',
          label: 'Concept Brief & Objectives',
          meta: 'Spatial Continuity',
        },
        {
          id: 'villa-theme',
          num: '03',
          label: 'Natural Modern Materiality',
          meta: `${study.moodboards.length} Material Boards`,
        },
        {
          id: 'villa-plans',
          num: '04',
          label: 'Floor Plans (CAD & Rendered)',
          meta: 'Ground & First Floor',
        },
        {
          id: 'villa-sections',
          num: '05',
          label: 'Villa Sections',
          meta: `${study.sections.length} Sections (AA’–DD’)`,
        },
        {
          id: 'villa-bedroom',
          num: '06',
          label: 'Bedroom Plan & Elevations',
          meta: `Plan + ${study.bedroom.elevations.length} Elevations (A–D)`,
        },
        {
          id: 'villa-bathroom',
          num: '07',
          label: 'Bathroom Plan & Sections',
          meta: `Plan + ${study.bathroom.sections.length} Sections (AA’–DD’)`,
        },
      ],
    };
  }

  if (project.staircaseCaseStudy) {
    const study = project.staircaseCaseStudy;
    return {
      projectType: 'Architectural Element · Two-Flight Tensile Staircase',
      projectBrief: study.projectBrief,
      designConcept: study.conceptBrief,
      contents: [
        { id: 'st-brief', num: '01', label: 'Project Brief', meta: 'Form, Materials & Structure' },
        { id: 'st-concept', num: '02', label: 'Concept Brief', meta: 'Visual Lightness & Brick Frame' },
        { id: 'st-moodboard', num: '03', label: 'Mood Board', meta: 'Materials & Water Atmosphere' },
        {
          id: 'st-plans',
          num: '04',
          label: 'Plans (Staircase & Water Body)',
          meta: '2843 × 2794 mm (All in mm)',
        },
        {
          id: 'st-sections',
          num: '05',
          label: 'Section AA’ & Elevation',
          meta: '+100 / +1302 / +2502 mm Levels',
        },
        {
          id: 'st-details',
          num: '06',
          label: 'Details A (1:8) & B (1:10)',
          meta: '15 mm Tensile Rope & Tread Assembly',
        },
        {
          id: 'st-views',
          num: '07',
          label: '3D Views & Physical Model',
          meta: `${study.views3D.length} Perspectives`,
        },
      ],
    };
  }

  // Fallback for standard 16-step case study
  return {
    projectType: 'Spatial UX/UI Research & Product Design',
    projectBrief: `${project.summary} ${project.designBrief.challenge}`,
    designConcept: project.conceptDevelopment.primaryMetaphor,
    contents: [
      { id: 'sec-intro', num: '01', label: 'Introduction', meta: 'Context & Scope' },
      { id: 'sec-brief', num: '02', label: 'Design Brief & Objectives', meta: 'Programmatic Challenge' },
      { id: 'sec-site', num: '03', label: 'Context & Environment', meta: 'Studio Ecosystem' },
      { id: 'sec-research', num: '04', label: 'Research & Field Findings', meta: 'Practitioner Interviews' },
      { id: 'sec-users', num: '05', label: 'User Study & Archetypes', meta: 'Spatial Personas' },
      { id: 'sec-concept', num: '06', label: 'Concept & Rationale', meta: 'Design Principles' },
      { id: 'sec-ideation', num: '07', label: 'Ideation & Iterations', meta: 'Wireframes & Tokens' },
      { id: 'sec-zoning', num: '08', label: 'System Architecture', meta: '4 Core Workspaces' },
      { id: 'sec-spatial', num: '09', label: 'Spatial Workflow', meta: 'Navigation Mechanics' },
      { id: 'sec-materials', num: '10', label: 'Taxonomy Modules', meta: 'Material Categories' },
      { id: 'sec-furniture', num: '11', label: 'Interface Specifications', meta: 'Lighting & Viewport' },
      { id: 'sec-drawings', num: '12', label: 'Information Architecture Diagrams', meta: 'System Flows' },
      { id: 'sec-visuals', num: '13', label: 'Interface Visualisations', meta: 'Desktop & iPad Views' },
      { id: 'sec-final', num: '14', label: 'Final Outcome', meta: 'Synthesis & Deliverables' },
      { id: 'sec-reflection', num: '15', label: 'Designer Reflection', meta: 'Critical Learnings' },
    ],
  };
}

interface Props {
  project: ProjectCaseStudy;
  prevProject: ProjectCaseStudy;
  nextProject: ProjectCaseStudy;
  onSelectProject: (p: ProjectCaseStudy) => void;
  onExploreComplete: (targetSectionId?: string) => void;
  onCloseToProjects: () => void;
}

export const ProjectOverviewPage: React.FC<Props> = ({
  project,
  prevProject,
  nextProject,
  onSelectProject,
  onExploreComplete,
  onCloseToProjects,
}) => {
  const [isPortrait, setIsPortrait] = useState(
    project.id === 'kitchen-interior' ||
      project.id === 'residential-interior' ||
      project.id === 'furniture-design' ||
      project.id === 'staircase-design'
  );
  const [zoomOpen, setZoomOpen] = useState(false);

  const overview = getProjectOverviewData(project);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    setIsPortrait(img.naturalHeight > img.naturalWidth * 1.04);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: ARCHITECTURAL_EASE }}
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14 space-y-16"
    >
      {/* =============================================================== */}
      {/* A. PROJECT INTRODUCTION                                         */}
      {/* =============================================================== */}
      <section className="space-y-8 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
        {/* Top Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77] border-b border-[#D9CBB1]/80 dark:border-[#2A3759] pb-4">
          <span className="font-semibold">Project {project.number}</span>
          <div className="flex items-center gap-1.5 text-[#3D5288] dark:text-[#BFB299]">
            <MapPin className="w-3.5 h-3.5 text-[#802C43] dark:text-[#C45D77]" />
            <span>{project.location}</span>
          </div>
        </div>

        {/* Two-Column Introduction Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Title, Brief, Concept, Primary CTA */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <h1 className="text-3xl sm:text-5xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight leading-[1.06]">
                {project.title}
              </h1>
            </div>

            {/* Project Brief */}
            <div className="space-y-2 border-t border-[#D9CBB1] dark:border-[#2A3759] pt-5">
              <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77]">
                Project Brief
              </span>
              <p className="text-sm sm:text-base text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                {overview.projectBrief}
              </p>
            </div>

            {/* Design Concept */}
            <div className="space-y-2 border-l-2 border-[#802C43] dark:border-[#C45D77] pl-4 py-1">
              <span className="block text-[11px] font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77]">
                Design Concept
              </span>
              <p className="text-sm sm:text-base text-[#263D78] dark:text-[#EFE6D5] font-serif-architectural italic leading-relaxed">
                {overview.designConcept}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onExploreComplete()}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-mono uppercase tracking-[0.18em] bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58] hover:bg-[#802C43] dark:hover:bg-[#C45D77] dark:hover:text-[#F3EBDD] transition-colors cursor-pointer"
              >
                <span>Explore Complete Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onCloseToProjects}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs font-mono uppercase tracking-[0.16em] border border-[#C7B697] dark:border-[#3A4B75] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Projects</span>
              </button>
            </div>
          </div>

          {/* Right Column: Main Cover Photograph / Visual */}
          <div className="lg:col-span-6">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setZoomOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setZoomOpen(true);
                }
              }}
              aria-label={`Zoom and inspect ${project.title} cover image`}
              className="border border-[#C7B697] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] bg-[#F3EBDD] dark:bg-[#18223A] p-3 sm:p-4 transition-colors cursor-pointer group"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#D9CBB1] dark:bg-[#141C30] flex items-center justify-center">
                {isPortrait && (
                  <img
                    src={project.heroImage}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-45 dark:opacity-35 pointer-events-none select-none"
                  />
                )}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onLoad={handleImageLoad}
                  className={
                    isPortrait
                      ? 'relative z-10 h-full w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]'
                      : 'relative z-10 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]'
                  }
                />
                <div className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F3EBDD]/90 dark:bg-[#18223A]/90 border border-[#D9CBB1] dark:border-[#3A4B75] text-[10px] font-mono uppercase tracking-wider text-[#263D78] dark:text-[#EFE6D5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span>Zoom</span>
                  <Maximize2 className="w-3 h-3 text-[#802C43] dark:text-[#C45D77]" />
                </div>
              </div>
              <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                <span className="text-[#802C43] dark:text-[#C45D77]">
                  Plate {project.number}.01 · Cover Visual
                </span>
                {project.year && <span>{project.year}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* B. PROJECT CONTENTS / ARCHITECTURAL INDEX                       */}
      {/* =============================================================== */}
      <section className="space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77] mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Project Contents</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight">
              Presentation Index & Drawings
            </h2>
          </div>
          <p className="text-xs font-mono text-[#3D5288] dark:text-[#BFB299]">
            Select any chapter below to jump directly to that section
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#C7B697] dark:border-[#2A3759]">
          {overview.contents.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onExploreComplete(item.id)}
              className="group border-b border-[#C7B697] dark:border-[#2A3759] md:odd:border-r py-4 px-4 sm:px-6 flex items-center justify-between gap-4 text-left hover:bg-[#F3EBDD] dark:hover:bg-[#18223A] transition-colors cursor-pointer"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="font-mono text-xs text-[#802C43] dark:text-[#C45D77] shrink-0">
                  {item.num}
                </span>
                <div className="min-w-0">
                  <span className="block font-serif-architectural text-lg sm:text-xl text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors truncate">
                    {item.label}
                  </span>
                  {item.meta && (
                    <span className="block text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] truncate mt-0.5">
                      {item.meta}
                    </span>
                  )}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 text-[#C7B697] dark:text-[#3A4B75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          ))}
        </div>

        {/* Prominent Bottom Complete Presentation CTA */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#E3D7BF]/65 dark:bg-[#141C30]/80 border border-[#C7B697] dark:border-[#2A3759] p-6 sm:p-8">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77] block">
              Full Case Study Presentation
            </span>
            <p className="text-base sm:text-lg font-serif-architectural text-[#263D78] dark:text-[#EFE6D5]">
              View all {overview.contents.length} documented chapters, technical drawings, and plates for {project.title}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onExploreComplete()}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-mono uppercase tracking-[0.18em] bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58] hover:bg-[#802C43] dark:hover:bg-[#C45D77] dark:hover:text-[#F3EBDD] transition-colors cursor-pointer shrink-0"
          >
            <span>Explore Complete Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Previous / Next Project Switcher */}
      <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => onSelectProject(prevProject)}
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
          onClick={() => onSelectProject(nextProject)}
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

      <DrawingLightbox
        items={[
          {
            id: `${project.id}-overview-cover`,
            plate: `Plate ${project.number}.01`,
            title: project.title,
            subtitle: project.subtitle,
            imageUrl: project.heroImage,
          },
        ]}
        activeId={zoomOpen ? `${project.id}-overview-cover` : null}
        onSelectId={() => {}}
        onClose={() => setZoomOpen(false)}
      />
    </motion.div>
  );
};
