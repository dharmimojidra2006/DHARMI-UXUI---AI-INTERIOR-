import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, ProjectCategory } from '../types';
import { ArrowUpRight, ArrowRight, ArrowLeft, Columns3, Layers } from 'lucide-react';
import {
  KineticMaskReveal,
  AnimatedDatumRule,
  ARCHITECTURAL_EASE,
} from './EditorialMotion';

interface Props {
  projects: ProjectCaseStudy[];
  onSelectProject: (p: ProjectCaseStudy) => void;
}

type GalleryViewMode = 'monograph' | 'rail';

export const ProjectsGrid: React.FC<Props> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [viewMode, setViewMode] = useState<GalleryViewMode>('monograph');
  const railRef = useRef<HTMLDivElement | null>(null);

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Works' },
    { id: 'adaptive-reuse', label: 'Adaptive Reuse & Spa' },
    { id: 'furniture', label: 'Furniture Craft' },
    { id: 'residential', label: 'Residential' },
    { id: 'digital-ux', label: 'UX/UI Spatial' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const [portraitOverrides, setPortraitOverrides] = useState<Record<string, boolean>>({});

  const scrollRail = (dir: 'prev' | 'next') => {
    const el = railRef.current;
    if (!el) return;
    const step = Math.max(360, el.clientWidth * 0.72);
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
  };

  const isPortraitCover = (projectId: string): boolean => {
    if (projectId in portraitOverrides) {
      return portraitOverrides[projectId];
    }
    return (
      projectId === 'kitchen-interior' ||
      projectId === 'residential-interior' ||
      projectId === 'furniture-design'
    );
  };

  const handleCoverLoad = (projectId: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.naturalWidth || !img.naturalHeight) return;
    const isPortrait = img.naturalHeight > img.naturalWidth * 1.04;
    setPortraitOverrides((prev) =>
      prev[projectId] === isPortrait ? prev : { ...prev, [projectId]: isPortrait }
    );
  };

  return (
    <section
      id="projects"
      className="relative py-24 md:py-36 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9] dark:bg-[#101626] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-3">
              <span>03 / Monograph</span>
              <span aria-hidden="true">·</span>
              <span>Interior Design Portfolio</span>
            </div>
            <KineticMaskReveal>
              <h2 className="text-4xl sm:text-6xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] tracking-tight leading-none">
                Selected Works
              </h2>
            </KineticMaskReveal>
          </div>

          <div className="max-w-md text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
            Each project functions as an architectural inquiry exploring how human scale, material honesty, and spatial sequencing transform daily living.
          </div>
        </div>

        <AnimatedDatumRule className="mb-8" />

        {/* Interactive Filter Controls + Gallery Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-14 border-b border-[#D9CBB1]/75 dark:border-[#2A3759]/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-3.5 py-2 text-xs font-mono uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#F3EBDD] dark:text-[#1C2D58]'
                      : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#802C43] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterBg"
                      className="absolute inset-0 bg-[#263D78] dark:bg-[#EFE6D5]"
                      transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Gallery Presentation Switcher: Monograph vs Horizontal Rail */}
          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
            <span className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
              {String(filteredProjects.length).padStart(2, '0')} Plates
            </span>
            <div className="inline-flex items-center border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD] dark:bg-[#18223A] p-0.5 text-[11px] font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setViewMode('monograph')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                  viewMode === 'monograph'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Monograph</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('rail')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                  viewMode === 'rail'
                    ? 'bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58]'
                    : 'text-[#3D5288] dark:text-[#BFB299] hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                }`}
              >
                <Columns3 className="w-3 h-3" />
                <span>Exhibition Rail</span>
              </button>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* MODE A: HORIZONTAL EXHIBITION GALLERY RAIL                      */}
        {/* =============================================================== */}
        {viewMode === 'rail' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77]">
                Horizontal Gallery Strip · Scroll or step sideways
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRail('prev')}
                  className="p-2 border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD] dark:bg-[#18223A] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] transition-colors cursor-pointer"
                  aria-label="Previous exhibition plate"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail('next')}
                  className="p-2 border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD] dark:bg-[#18223A] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] transition-colors cursor-pointer"
                  aria-label="Next exhibition plate"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={railRef}
              className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
            >
              {filteredProjects.map((project) => {
                const portraitHero = isPortraitCover(project.id);
                return (
                <article
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  data-cursor="project"
                  className="snap-start shrink-0 w-[86vw] sm:w-[70vw] lg:w-[54vw] max-w-[740px] border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] hover:border-[#802C43] dark:hover:border-[#C45D77] transition-colors cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="px-5 py-3 bg-[#E3D7BF] dark:bg-[#141C30] border-b border-[#D9CBB1] dark:border-[#2A3759] flex items-center justify-between text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                      <span className="text-[#802C43] dark:text-[#C45D77] font-semibold">
                        Plate {project.number} · {project.categoryLabel}
                      </span>
                      <span>{project.location} · {project.year}</span>
                    </div>

                    <div className="relative aspect-[16/10] bg-[#D9CBB1] dark:bg-[#141C30] overflow-hidden flex items-center justify-center">
                      {portraitHero && (
                        <img
                          src={project.heroImage}
                          alt=""
                          aria-hidden="true"
                          loading="eager"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-45 dark:opacity-35 pointer-events-none select-none"
                        />
                      )}
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onLoad={(e) => handleCoverLoad(project.id, e)}
                        className={
                          portraitHero
                            ? 'relative z-10 h-full w-auto max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out'
                            : 'relative z-10 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out'
                        }
                      />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm font-serif-architectural italic text-[#802C43] dark:text-[#C45D77] mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                      <span className="text-3xl font-serif-architectural text-[#C7B697] dark:text-[#3A4B75] font-light">
                        {project.number}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono">
                      <span className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] inline-flex items-center gap-1.5 uppercase tracking-wider">
                        <span>Explore Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* MODE B: MINIMAL TWO-COLUMN PROJECT INTRODUCTIONS (01–06)        */}
        {/* =============================================================== */}
        {viewMode === 'monograph' && (
          <div className="space-y-24 md:space-y-36">
            {filteredProjects.map((project) => {
              const portraitHero = isPortraitCover(project.id);

              return (
                <article
                  key={project.id}
                  className="group border-b border-[#D9CBB1] dark:border-[#2A3759] pb-20 md:pb-28 last:border-b-0"
                >
                  {/* Minimal Two-Column Presentation: Left Editorial Intro + Right Large Landscape Cover Image */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* LEFT SIDE (5 cols): Number, Category, Title, Subtitle, Short Description, Location & Single CTA */}
                    <div className="lg:col-span-5 space-y-6">
                      {/* Project Number & Category */}
                      <div className="flex flex-wrap items-baseline gap-2.5 text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77]">
                        <span className="text-4xl font-serif-architectural font-light leading-none">
                          {project.number}
                        </span>
                        <span aria-hidden="true">/</span>
                        <span className="font-semibold">{project.categoryLabel}</span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3
                          onClick={() => onSelectProject(project)}
                          data-cursor="project"
                          className="text-3xl sm:text-4xl lg:text-[2.65rem] font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors cursor-pointer leading-[1.1] tracking-tight text-balance"
                        >
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base font-serif-architectural italic text-[#802C43] dark:text-[#C45D77] mt-2.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Short Description */}
                      <p className="text-sm sm:text-base text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Location */}
                      <div className="pt-3 border-t border-[#D9CBB1]/75 dark:border-[#2A3759]/75 text-xs font-mono text-[#3D5288] dark:text-[#BFB299]">
                        <span className="text-[#5C6D9B] dark:text-[#988C75] uppercase tracking-wider mr-2">
                          Location
                        </span>
                        <span className="text-[#263D78] dark:text-[#EFE6D5] font-medium">
                          {project.location}
                        </span>
                      </div>

                      {/* Single Clear Action Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          data-cursor="project"
                          className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-mono uppercase tracking-[0.18em] bg-[#263D78] dark:bg-[#EFE6D5] text-[#F3EBDD] dark:text-[#1C2D58] hover:bg-[#802C43] dark:hover:bg-[#C45D77] dark:hover:text-[#F3EBDD] transition-colors cursor-pointer"
                        >
                          <span>EXPLORE COMPLETE PROJECT</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* RIGHT SIDE (7 cols): Single Large Framed Landscape Cover Image */}
                    <div className="lg:col-span-7">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectProject(project)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectProject(project);
                          }
                        }}
                        data-cursor="project"
                        aria-label={`Explore complete ${project.title} project`}
                        className="relative bg-[#F3EBDD] dark:bg-[#18223A] border border-[#C7B697] dark:border-[#2A3759] hover:border-[#802C43] dark:hover:border-[#C45D77] p-3 sm:p-4 transition-colors duration-300 cursor-pointer group/cover shadow-xs"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E3D7BF]/80 dark:bg-[#141C30] border border-[#D9CBB1]/80 dark:border-[#2A3759] flex items-center justify-center">
                          {portraitHero && (
                            <img
                              src={project.heroImage}
                              alt=""
                              aria-hidden="true"
                              loading="eager"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-45 dark:opacity-35 pointer-events-none select-none"
                            />
                          )}
                          <img
                            src={project.heroImage}
                            alt={project.title}
                            loading="eager"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onLoad={(e) => handleCoverLoad(project.id, e)}
                            className={
                              portraitHero
                                ? 'relative z-10 h-full w-auto max-w-full object-contain mx-auto block shadow-[0_12px_32px_rgba(28,45,88,0.18)] transition-transform duration-700 ease-out group-hover/cover:scale-[1.02]'
                                : 'relative z-10 w-full h-full object-cover object-center block transition-transform duration-700 ease-out group-hover/cover:scale-[1.03]'
                            }
                          />

                          {/* Subtle Editorial Hover Overlay */}
                          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#263D78]/20 dark:bg-[#101626]/40 backdrop-blur-[2px] opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="inline-flex items-center gap-2 bg-[#F3EBDD]/95 dark:bg-[#18223A]/95 text-[#263D78] dark:text-[#EFE6D5] border border-[#802C43]/50 dark:border-[#C45D77]/60 px-5 py-2.5 text-xs font-mono uppercase tracking-[0.2em] shadow-md translate-y-2 group-hover/cover:translate-y-0 transition-transform duration-300">
                              <span>EXPLORE COMPLETE PROJECT</span>
                              <ArrowUpRight className="w-4 h-4 text-[#802C43] dark:text-[#C45D77]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
