import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy } from '../types';
import { ArchitecturalDrawings } from './ArchitecturalDrawings';
import { VillaCaseStudyView } from './VillaCaseStudyView';
import { AdaptiveReuseCaseStudyView } from './AdaptiveReuseCaseStudyView';
import { MarketMindfulnessCaseStudyView } from './MarketMindfulnessCaseStudyView';
import { KitchenCaseStudyView } from './KitchenCaseStudyView';
import { FusionFurnitureCaseStudyView } from './FusionFurnitureCaseStudyView';
import { StaircaseCaseStudyView } from './StaircaseCaseStudyView';
import { ARCHITECTURAL_EASE } from './EditorialMotion';
import { CaseStudyCoverHeader, CoverThumbnailCard } from './CaseStudyCoverHeader';
import { ProjectOverviewPage } from './ProjectOverviewPage';
import { DrawingLightbox, LightboxPlateItem } from './DrawingLightbox';
import { 
  X, ArrowLeft, ArrowRight, Share2, Check, BookOpen
} from 'lucide-react';

interface Props {
  project: ProjectCaseStudy | null;
  allProjects: ProjectCaseStudy[];
  onClose: () => void;
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const ProjectDetailModal: React.FC<Props> = ({
  project,
  allProjects,
  onClose,
  onSelectProject,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [viewMode, setViewMode] = useState<'overview' | 'complete'>('overview');
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Handle ESC key to close modal (DrawingLightbox captures ESC in capture phase when open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxId) {
          e.preventDefault();
          setLightboxId(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxId]);

  // Reset modal scroll, preview state & return to overview stage when switching projects
  useEffect(() => {
    setLightboxId(null);
    setViewMode('overview');
    setPendingSectionId(null);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setReadProgress(0);
    }
  }, [project?.id]);

  // Smooth scroll to requested TOC section after transitioning to complete presentation
  useEffect(() => {
    if (viewMode !== 'complete' || !pendingSectionId) return;

    const timer = window.setTimeout(() => {
      const targetEl = document.getElementById(pendingSectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setPendingSectionId(null);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [viewMode, pendingSectionId, project?.id]);

  const handleExploreComplete = (targetSectionId?: string) => {
    setViewMode('complete');
    if (targetSectionId) {
      setPendingSectionId(targetSectionId);
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setReadProgress(0);
    }
  };

  const handleBackToOverview = () => {
    setViewMode('overview');
    setPendingSectionId(null);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setReadProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
  };

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const sectionsList = [
    { id: 'sec-intro', label: '01. Introduction' },
    { id: 'sec-brief', label: '02. Design Brief & Objectives' },
    { id: 'sec-site', label: '03. Site Context' },
    { id: 'sec-research', label: '04. Research & Site Findings' },
    { id: 'sec-users', label: '05. User Study' },
    { id: 'sec-concept', label: '06. Concept & Rationale' },
    { id: 'sec-ideation', label: '07. Ideation' },
    { id: 'sec-zoning', label: '08. Zoning' },
    { id: 'sec-spatial', label: '09. Spatial Planning' },
    { id: 'sec-materials', label: '10. Material Palette' },
    { id: 'sec-furniture', label: '11. Furniture & Lighting' },
    { id: 'sec-drawings', label: '12. Technical Drawings' },
    { id: 'sec-visuals', label: '13. Visualizations' },
    { id: 'sec-final', label: '14. Final Design' },
    { id: 'sec-reflection', label: '15. Reflection' },
  ];

  return (
    <motion.div
      ref={scrollContainerRef}
      onScroll={handleModalScroll}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.34, ease: ARCHITECTURAL_EASE }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#E9DFC9]/97 dark:bg-[#101626]/97 backdrop-blur-md transition-colors duration-300"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Floating Utility Bar */}
      <header className="sticky top-0 z-40 bg-[#E9DFC9]/94 dark:bg-[#101626]/94 backdrop-blur-md border-b border-[#D9CBB1] dark:border-[#2A3759] px-4 md:px-8 py-3.5 flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3 min-w-0">
          {viewMode === 'complete' ? (
            <button
              type="button"
              onClick={handleBackToOverview}
              className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#802C43] dark:text-[#C45D77] hover:text-[#263D78] dark:hover:text-[#EFE6D5] transition-colors py-1 cursor-pointer shrink-0 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Project Contents</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors py-1 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Projects</span>
            </button>
          )}
          <span aria-hidden="true" className="text-[#C7B697] dark:text-[#3A4B75] hidden sm:inline">/</span>
          <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] hidden sm:inline truncate">
            Project {project.number} — {project.title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Previous / Next Switcher */}
          <div className="hidden md:flex items-center gap-1 border-r border-[#D9CBB1] dark:border-[#2A3759] pr-3 mr-1">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-1.5 text-xs font-mono text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5] transition-colors cursor-pointer"
              title={`Previous: ${prevProject.title}`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] px-1">
              {project.number} / {String(allProjects.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-1.5 text-xs font-mono text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5] transition-colors cursor-pointer"
              title={`Next: ${nextProject.title}`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleShare}
            className="px-3 py-1.5 text-xs font-mono border border-[#C7B697] dark:border-[#3A4B75] hover:border-[#263D78] dark:hover:border-[#EFE6D5] text-[#263D78] dark:text-[#EFE6D5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#802C43] dark:text-[#C45D77]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors ml-1 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Modal Reading Progress Hairline */}
        <div
          aria-hidden="true"
          style={{ transform: `scaleX(${readProgress.toFixed(4)})`, transformOrigin: '0% 50%' }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#802C43] dark:bg-[#C45D77] transition-transform duration-75"
        />
      </header>

      {/* Stage 1: Project Overview & Contents vs Stage 2: Complete Project Presentation */}
      {viewMode === 'overview' ? (
        <ProjectOverviewPage
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={onSelectProject}
          onExploreComplete={handleExploreComplete}
          onCloseToProjects={onClose}
        />
      ) : (
      <>
      {project.villaCaseStudy ? (
        <VillaCaseStudyView
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
          onSelectProject={onSelectProject}
        />
      ) : (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {project.adaptiveReuseCaseStudy ? (
          <AdaptiveReuseCaseStudyView
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        ) : project.marketMindfulnessCaseStudy ? (
          <MarketMindfulnessCaseStudyView
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        ) : project.kitchenCaseStudy ? (
          <KitchenCaseStudyView
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        ) : project.fusionFurnitureCaseStudy ? (
          <FusionFurnitureCaseStudyView
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        ) : project.staircaseCaseStudy ? (
          <StaircaseCaseStudyView
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            onSelectProject={onSelectProject}
          />
        ) : (
        <>
        {/* SECTION 1: PROJECT COVER */}
        {(() => {
          const coverThumbnails: CoverThumbnailCard[] = project.technicalDrawings.map((drawing) => ({
            id: `cover-tech-${drawing.id}`,
            plate: `${drawing.type} · ${drawing.scale}`,
            label: drawing.title,
            subtitle: drawing.caption,
            svgBadgeType: `${drawing.type} · ${drawing.scale}`,
            onClick: () =>
              document
                .getElementById('sec-drawings')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          }));

          return (
            <CaseStudyCoverHeader
              projectNumber={project.number}
              categoryLabel={project.categoryLabel}
              yearOrPeriod={project.year}
              location={project.location}
              projectType="Spatial UX/UI Product Study"
              title={project.title}
              subtitle={project.subtitle}
              description={project.summary}
              metaItems={[
                { label: 'Location', value: project.location },
                { label: 'Portfolio Year', value: project.year },
                {
                  label: 'Designer',
                  value: 'Dharmi Mojidra',
                },
              ]}
              scopeTags={project.scope}
              coverPlate={{
                plate: `Pl. ${project.number}.01`,
                label: 'Cover Visual',
                caption: project.subtitle,
                imageUrl: project.heroImage,
                isPortraitAmbient: false,
                onClick: () => setLightboxId('cover-hero'),
              }}
              thumbnailStripTitle="Technical Drawings & Spatial Schematics"
              thumbnails={coverThumbnails}
            />
          );
        })()}

        {/* Editorial Layout: Left Sticky Mini Table of Contents, Right 16-Step Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Nav Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20 border-l border-[#D9CBB1] dark:border-[#2A3759] pl-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#802C43] dark:text-[#C45D77] block">
                Case Study Index
              </span>
              <nav className="space-y-1.5 text-xs font-mono">
                {sectionsList.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5] transition-colors py-1 truncate"
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setLightboxId('cover-hero')}
                className="w-full text-left pt-6 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] hover:text-[#802C43] dark:hover:text-[#C45D77] space-y-1 cursor-pointer transition-colors group"
              >
                <p className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] font-medium transition-colors">
                  Extracted Plates
                </p>
                <p>Click any plate, schematic, or visual to zoom and inspect details.</p>
              </button>

              <div className="pt-4 border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                <p>Dharmi Mojidra</p>
                <p>Interior Designer</p>
                <p>Ahmedabad, India</p>
              </div>
            </div>
          </aside>

          {/* Main Case Study Content Area */}
          <main className="lg:col-span-9 space-y-20">
            {/* SECTION 2: INTRODUCTION */}
            <section id="sec-intro" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                01 — Project Introduction
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Curating Atmosphere & Human Interaction
              </h2>
              <p className="text-base md:text-lg text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed font-sans font-light">
                {project.introduction}
              </p>
            </section>

            {/* SECTION 3: DESIGN BRIEF */}
            <section id="sec-brief" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                02 — Design Brief & Objectives
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                The Programmatic Challenge
              </h2>
              <div className="bg-[#F3EBDD] dark:bg-[#141C30] border border-[#D9CBB1] dark:border-[#2A3759] p-6 lg:p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] tracking-wider mb-1">Context</h3>
                  <p className="text-sm font-sans text-[#263D78] dark:text-[#EFE6D5]">{project.designBrief.clientOrContext}</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] tracking-wider mb-1">Spatial Challenge</h3>
                  <p className="text-sm font-sans text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">{project.designBrief.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] tracking-wider mb-2">Core Objectives</h3>
                  <ul className="space-y-2 text-sm font-sans text-[#1C2D58] dark:text-[#DDD1BC]">
                    {project.designBrief.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#802C43] dark:text-[#C45D77] font-mono text-xs mt-0.5">[{i + 1}]</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 4: SITE CONTEXT */}
            <section id="sec-site" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                03 — Site Context & Environment
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Ahmedabad Microclimate & Vernacular Geography
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#18223A]">
                  <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-2">Location & Urban Fabric</h4>
                  <p className="text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">{project.siteContext.locationDetails}</p>
                </div>
                <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#18223A]">
                  <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-2">Microclimatic Conditions</h4>
                  <p className="text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">{project.siteContext.microclimate}</p>
                </div>
                <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#18223A]">
                  <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-2">Cultural Memory</h4>
                  <p className="text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">{project.siteContext.culturalContext}</p>
                </div>
              </div>
            </section>

            {/* SECTION 5: RESEARCH */}
            <section id="sec-research" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                04 — Research Methodology
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Observational Fieldwork & Empirical Discovery
              </h2>
              <p className="text-sm md:text-base text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed mb-6 font-light">
                {project.research.methodology}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.research.insights.map((ins, idx) => (
                  <div key={idx} className="border-l-2 border-[#263D78] dark:border-[#C45D77] pl-4 py-1">
                    <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] block">Insight 0{idx + 1}</span>
                    <p className="text-xs md:text-sm text-[#263D78] dark:text-[#EFE6D5] mt-1">{ins}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 6: USER STUDY */}
            <section id="sec-users" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                05 — User Study & Spatial Personas
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Designing for Human Behavior & Circadian Rhythm
              </h2>
              <div className="space-y-4">
                {project.userStudy.map((u, i) => (
                  <div key={i} className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#141C30]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#D9CBB1] dark:border-[#2A3759] mb-3">
                      <h4 className="text-sm font-mono font-semibold text-[#263D78] dark:text-[#EFE6D5]">{u.role}</h4>
                      <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">User Archetype 0{i + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                      <div>
                        <span className="text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75] uppercase block">Need / Friction</span>
                        <p className="text-[#1C2D58] dark:text-[#DDD1BC] mt-0.5">{u.needs}</p>
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-[#802C43] dark:text-[#C45D77] uppercase block">Architectural Response</span>
                        <p className="text-[#263D78] dark:text-[#EFE6D5] mt-0.5">{u.spatialResponse}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: CONCEPT DEVELOPMENT */}
            <section id="sec-concept" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                06 — Concept Development
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-4">
                The Guiding Architectural Metaphor
              </h2>
              <blockquote className="border-l-2 border-[#802C43] dark:border-[#C45D77] pl-6 py-2 my-6 text-lg md:text-xl font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5]">
                "{project.conceptDevelopment.primaryMetaphor}"
              </blockquote>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {project.conceptDevelopment.spatialPrinciples.map((principle, idx) => (
                  <div key={idx} className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#18223A]">
                    <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] block mb-2">Principle 0{idx + 1}</span>
                    <p className="text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">{principle}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: IDEATION */}
            <section id="sec-ideation" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                07 — Brainstorming & Ideation Iterations
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Testing Hypotheses through Physical & Digital Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75]">Exploration Streams</h4>
                  <ul className="space-y-2 text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC]">
                    {project.ideation.explorations.map((exp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#802C43] dark:text-[#C45D77] font-mono text-xs">/</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#141C30]">
                  <h4 className="text-xs font-mono uppercase text-[#802C43] dark:text-[#C45D77] mb-2">Design Evolution</h4>
                  <p className="text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed">{project.ideation.evolution}</p>
                </div>
              </div>
            </section>

            {/* SECTION 9: ZONING */}
            <section id="sec-zoning" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                08 — Zoning & Volumetric Massing
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-4">
                Spatial Allocation & Hierarchy
              </h2>
              <p className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75] mb-6">
                {project.zoning.publicToPrivateRatio}
              </p>
              <div className="space-y-3">
                {project.zoning.zones.map((zone, i) => (
                  <div key={i} className="border border-[#D9CBB1] dark:border-[#2A3759] p-4 bg-[#F3EBDD] dark:bg-[#18223A]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-medium text-[#263D78] dark:text-[#EFE6D5]">{zone.name}</span>
                      <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77]">{zone.percentage}% Area</span>
                    </div>
                    {/* Visual bar */}
                    <div className="w-full h-1.5 bg-[#D9CBB1] dark:bg-[#2A3759] mb-2 overflow-hidden">
                      <div 
                        className="h-full bg-[#263D78] dark:bg-[#C45D77]" 
                        style={{ width: `${zone.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-[#3D5288] dark:text-[#BFB299]">{zone.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: SPATIAL PLANNING */}
            <section id="sec-spatial" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                09 — Spatial Planning & Circulation
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                The Choreography of Movement
              </h2>
              <p className="text-sm md:text-base text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed mb-6 font-light">
                {project.spatialPlanning.circulationConcept}
              </p>
              <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-6 bg-[#F3EBDD] dark:bg-[#141C30]">
                <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-3">Key Spatial Transitions</h4>
                <div className="space-y-3">
                  {project.spatialPlanning.keyTransitions.map((trans, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC]">
                      <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] font-semibold">T.0{i + 1}</span>
                      <span>{trans}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 11: MATERIAL PALETTE */}
            <section id="sec-materials" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                10 — Material Palette & Tactility
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                The Physical Substance of Atmosphere
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.materialPalette.map((mat, i) => (
                  <div key={i} className="border border-[#D9CBB1] dark:border-[#2A3759] p-5 bg-[#F3EBDD] dark:bg-[#18223A] flex flex-col justify-between">
                    <div>
                      {/* Swatch color representation */}
                      <div className="flex items-center justify-between mb-3">
                        <div 
                          className="w-8 h-8 border border-[#C7B697] dark:border-[#3A4B75]" 
                          style={{ backgroundColor: mat.colorHex }}
                        />
                        <span className="text-[10px] font-mono text-[#802C43] dark:text-[#C45D77] uppercase">{mat.category}</span>
                      </div>
                      <h4 className="text-sm font-serif-architectural font-semibold text-[#263D78] dark:text-[#EFE6D5] mb-1">
                        {mat.name}
                      </h4>
                      <p className="text-xs text-[#3D5288] dark:text-[#BFB299] leading-relaxed mb-3">
                        {mat.description}
                      </p>
                    </div>
                    <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-2 text-[11px] font-mono text-[#5C6D9B] dark:text-[#988C75]">
                      Finish: <span className="text-[#263D78] dark:text-[#EFE6D5]">{mat.finish}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: FURNITURE & LIGHTING */}
            <section id="sec-furniture" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                11 — Furniture & Lighting Architecture
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Micro-Scale Tactility & Circadian Lux Levels
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-6 bg-[#F3EBDD] dark:bg-[#18223A]">
                  <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-3">Lighting Strategy</h4>
                  <p className="text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed mb-4">
                    {project.furnitureAndLighting.lightingStrategy}
                  </p>
                  <h5 className="text-[11px] font-mono text-[#802C43] dark:text-[#C45D77] uppercase mb-2">Key Fixtures</h5>
                  <ul className="space-y-1.5 text-xs text-[#3D5288] dark:text-[#BFB299] font-mono">
                    {project.furnitureAndLighting.fixtures.map((f, i) => (
                      <li key={i}>· {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[#D9CBB1] dark:border-[#2A3759] p-6 bg-[#F3EBDD] dark:bg-[#18223A]">
                  <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-3">Bespoke Furniture Specifications</h4>
                  <ul className="space-y-3 text-xs md:text-sm text-[#1C2D58] dark:text-[#DDD1BC]">
                    {project.furnitureAndLighting.keyPieces.map((p, i) => (
                      <li key={i} className="border-l-2 border-[#263D78] dark:border-[#C45D77] pl-3 py-0.5">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* SECTION 13: TECHNICAL DRAWINGS (Interactive CAD Viewer) */}
            <section id="sec-drawings" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block">
                  12 — Technical Drawings & Blueprints
                </span>
                <span className="text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">AutoCAD & Vector Graphics</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Orthographic Projections & Measured Sections
              </h2>
              <ArchitecturalDrawings 
                drawings={project.technicalDrawings} 
                projectTitle={project.title} 
              />
            </section>

            {/* SECTION 14: 3D VISUALIZATIONS */}
            <section id="sec-visuals" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                13 — 3D Visualizations & Perspectives
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Atmospheric Light & Render Studies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.visualizations.map((vis, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxId(`vis-${i}`)}
                    className="border border-[#D9CBB1] dark:border-[#2A3759] hover:border-[#802C43]/60 dark:hover:border-[#C45D77]/60 bg-[#F3EBDD] dark:bg-[#18223A] p-4 cursor-pointer group transition-colors"
                  >
                    {vis.imageUrl ? (
                      <div className="aspect-[2224/1573] bg-[#F8F3E8] dark:bg-[#1E2A47] overflow-hidden mb-3 border border-[#D9CBB1] dark:border-[#2A3759] p-1.5">
                        <img 
                          src={vis.imageUrl} 
                          alt={vis.perspective}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="aspect-4/3 bg-[#E3D7BF] dark:bg-[#141C30] overflow-hidden mb-3 border border-[#D9CBB1] dark:border-[#2A3759]">
                        <img 
                          src={project.heroImage} 
                          alt={vis.perspective}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    )}
                    <h4 className="text-xs font-mono font-medium text-[#263D78] dark:text-[#EFE6D5] mb-1">{vis.perspective}</h4>
                    <p className="text-xs text-[#3D5288] dark:text-[#BFB299]">{vis.caption}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 15: FINAL DESIGN */}
            <section id="sec-final" className="scroll-mt-24 border-b border-[#D9CBB1] dark:border-[#2A3759] pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                14 — Final Design Resolution
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Spatial Synthesis & Deliverables
              </h2>
              <p className="text-sm md:text-base text-[#1C2D58] dark:text-[#DDD1BC] leading-relaxed mb-6 font-light">
                {project.finalDesign.description}
              </p>
              <div className="bg-[#F3EBDD] dark:bg-[#18223A] border border-[#D9CBB1] dark:border-[#2A3759] p-6">
                <h4 className="text-xs font-mono uppercase text-[#5C6D9B] dark:text-[#988C75] mb-3">Project Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#263D78] dark:text-[#EFE6D5]">
                  {project.finalDesign.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <span className="w-1.5 h-1.5 bg-[#802C43] dark:bg-[#C45D77]" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 16: REFLECTION & OUTCOME */}
            <section id="sec-reflection" className="scroll-mt-24 pb-14">
              <span className="text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-wider block mb-2">
                15 — Designer Reflection &amp; Project Outcome
              </span>
              <h2 className="text-2xl md:text-3xl font-serif-architectural text-[#263D78] dark:text-[#EFE6D5] font-light mb-6">
                Critical Learnings by Dharmi Mojidra
              </h2>
              <div className="space-y-6">
                <blockquote className="border-l-2 border-[#263D78] dark:border-[#C45D77] pl-6 py-2 text-base md:text-lg font-serif-architectural italic text-[#263D78] dark:text-[#EFE6D5]">
                  "{project.reflection.learnings}"
                </blockquote>
                <div className="flex items-center gap-2 text-xs font-mono text-[#5C6D9B] dark:text-[#988C75]">
                  <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">Project Focus:</span>
                  <span>{project.reflection.academicSignificance}</span>
                </div>
              </div>
            </section>

            {/* Bottom Next/Previous Project Switcher */}
            <div className="border-t border-[#D9CBB1] dark:border-[#2A3759] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button
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
          </main>
        </div>
        </>
        )}
      </div>
      )}

      {/* Persistent Bottom Return-to-Contents Bar inside Complete Presentation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="border-t border-[#C7B697] dark:border-[#2A3759] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBackToOverview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 border border-[#802C43] dark:border-[#C45D77] text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77] hover:bg-[#802C43] hover:text-[#F3EBDD] dark:hover:bg-[#C45D77] dark:hover:text-[#101626] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Back to Project Contents</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#C7B697] dark:border-[#3A4B75] text-xs font-mono uppercase tracking-[0.16em] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#263D78] dark:hover:border-[#EFE6D5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Projects Exhibition</span>
          </button>
        </div>
      </div>
      </>
      )}
      <DrawingLightbox
        items={[
          {
            id: 'cover-hero',
            plate: `Pl. ${project.number}.01`,
            title: `${project.number} — ${project.title}`,
            subtitle: project.subtitle,
            imageUrl: project.heroImage,
          },
          ...project.visualizations.map((vis, i): LightboxPlateItem => ({
            id: `vis-${i}`,
            plate: `Visual 0${i + 1}`,
            title: vis.perspective,
            subtitle: vis.caption,
            imageUrl: vis.imageUrl || project.heroImage,
          })),
        ]}
        activeId={lightboxId}
        onSelectId={setLightboxId}
        onClose={() => setLightboxId(null)}
      />
    </motion.div>
  );
};
