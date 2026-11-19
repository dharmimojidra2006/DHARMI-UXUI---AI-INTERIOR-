import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ProjectCaseStudy, ProjectCategory } from '../types';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import {
  KineticMaskReveal,
  AnimatedDatumRule,
  ARCHITECTURAL_EASE,
} from './EditorialMotion';

interface Props {
  projects: ProjectCaseStudy[];
  onSelectProject: (p: ProjectCaseStudy) => void;
}

export const ProjectsGrid: React.FC<Props> = ({ projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [portraitOverrides, setPortraitOverrides] = useState<Record<string, boolean>>({});
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isUserDragging, setIsUserDragging] = useState(false);

  const railRef = useRef<HTMLDivElement | null>(null);
  const scrollAccumRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isFocusWithinRef = useRef(false);
  const isTouchingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const didDragRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Works' },
    { id: 'adaptive-reuse', label: 'Adaptive Reuse & Spa' },
    { id: 'furniture', label: 'Furniture Craft' },
    { id: 'residential', label: 'Residential' },
    { id: 'architectural-element', label: 'Spatial Element' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const shouldLoop = filteredProjects.length > 1;
  const railProjects = shouldLoop
    ? [...filteredProjects, ...filteredProjects]
    : filteredProjects;

  // Reset scroll offset when category filter changes
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    scrollAccumRef.current = 0;
  }, [activeCategory]);

  // Continuous automatic horizontal drift with seamless loop & pause on hover/focus/drag/touch
  useEffect(() => {
    if (!shouldLoop || isAutoPaused) return;
    if (typeof window === 'undefined') return;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let rafId = 0;
    let lastTime = performance.now();
    const SPEED_PX_PER_SEC = 42;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const el = railRef.current;
      if (
        el &&
        !isHoveringRef.current &&
        !isFocusWithinRef.current &&
        !isDraggingRef.current &&
        !isTouchingRef.current
      ) {
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0) {
          scrollAccumRef.current += SPEED_PX_PER_SEC * dt;
          if (scrollAccumRef.current >= 1) {
            const delta = Math.floor(scrollAccumRef.current);
            scrollAccumRef.current -= delta;
            let nextLeft = el.scrollLeft + delta;
            if (nextLeft >= halfWidth) {
              nextLeft -= halfWidth;
            }
            el.scrollLeft = nextLeft;
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [shouldLoop, isAutoPaused, activeCategory]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const scheduleTouchResume = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      isTouchingRef.current = false;
    }, 1400);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = railRef.current;
    if (!el) return;

    const dx = e.clientX - dragStartXRef.current;
    if (!didDragRef.current) {
      if (Math.abs(dx) <= 6) return;
      didDragRef.current = true;
      setIsUserDragging(true);
      if (!el.hasPointerCapture?.(e.pointerId)) {
        el.setPointerCapture?.(e.pointerId);
      }
    }

    let nextScroll = dragStartScrollRef.current - dx;
    if (shouldLoop) {
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0) {
        if (nextScroll < 0) {
          nextScroll += halfWidth;
          dragStartScrollRef.current += halfWidth;
        } else if (nextScroll >= halfWidth) {
          nextScroll -= halfWidth;
          dragStartScrollRef.current -= halfWidth;
        }
      }
    }
    el.scrollLeft = nextScroll;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsUserDragging(false);
    const el = railRef.current;
    if (el?.hasPointerCapture?.(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 60);
  };

  const isPortraitCover = (projectId: string): boolean => {
    if (projectId in portraitOverrides) {
      return portraitOverrides[projectId];
    }
    return (
      projectId === 'kitchen-interior' ||
      projectId === 'residential-interior' ||
      projectId === 'furniture-design' ||
      projectId === 'staircase-design'
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

  const handleCardActivate = (project: ProjectCaseStudy) => {
    if (didDragRef.current) return;
    onSelectProject(project);
  };

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 border-b border-[#D9CBB1] dark:border-[#2A3759] bg-[#E9DFC9] dark:bg-[#101626] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#802C43] dark:text-[#C45D77] uppercase tracking-[0.18em] mb-3">
              <span>02 / Projects</span>
              <span aria-hidden="true">·</span>
              <span>Exhibition Gallery</span>
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

        {/* Category Filter Tabs + Exhibition Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-10 border-b border-[#D9CBB1]/75 dark:border-[#2A3759]/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
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

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
              {String(filteredProjects.length).padStart(2, '0')} Plates
            </span>

            {shouldLoop && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsAutoPaused((p) => !p)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD] dark:bg-[#18223A] text-[10px] font-mono uppercase tracking-wider text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] transition-colors cursor-pointer"
                  aria-label={isAutoPaused ? 'Resume exhibition auto-scroll' : 'Pause exhibition auto-scroll'}
                >
                  {isAutoPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span className="hidden sm:inline">{isAutoPaused ? 'Resume' : 'Auto'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =============================================================== */}
      {/* FULL-BLEED CONTINUOUS HORIZONTAL EXHIBITION RAIL                */}
      {/* =============================================================== */}
      <div className="space-y-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-[0.16em] text-[#802C43] dark:text-[#C45D77]">
            Exhibition Rail · {shouldLoop ? 'Hover to pause, drag or swipe sideways' : 'Select plate to open project overview'}
          </span>
        </div>

        <div
          ref={railRef}
          onMouseEnter={() => {
            isHoveringRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveringRef.current = false;
          }}
          onFocus={() => {
            isFocusWithinRef.current = true;
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              isFocusWithinRef.current = false;
            }
          }}
          onTouchStart={() => {
            isTouchingRef.current = true;
            if (resumeTimerRef.current) {
              window.clearTimeout(resumeTimerRef.current);
            }
          }}
          onTouchEnd={scheduleTouchResume}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex gap-6 sm:gap-8 overflow-x-auto pb-8 px-6 md:px-10 no-scrollbar select-none ${
            isUserDragging ? 'cursor-grabbing' : 'cursor-grab'
          } ${!shouldLoop ? 'justify-center' : ''}`}
        >
          {railProjects.map((project, idx) => {
            const portraitHero = isPortraitCover(project.id);
            const isDuplicate = shouldLoop && idx >= filteredProjects.length;
            return (
              <article
                key={`${project.id}-${idx}`}
                aria-hidden={isDuplicate ? true : undefined}
                onClick={() => handleCardActivate(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
                tabIndex={isDuplicate ? -1 : 0}
                role="button"
                aria-label={`Open ${project.title} project overview`}
                data-cursor="project"
                className="shrink-0 w-[84vw] sm:w-[66vw] lg:w-[46vw] max-w-[660px] border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] hover:border-[#802C43] dark:hover:border-[#C45D77] transition-colors cursor-pointer group flex flex-col justify-between text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#802C43] dark:focus-visible:outline-[#C45D77]"
              >
                <div>
                  <div className="px-5 py-3 bg-[#E3D7BF] dark:bg-[#141C30] border-b border-[#D9CBB1] dark:border-[#2A3759] flex items-center justify-between gap-3 text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
                    <span className="text-[#802C43] dark:text-[#C45D77] font-semibold truncate">
                      {project.number} · {project.categoryLabel}
                    </span>
                    <span className="shrink-0">{project.location}</span>
                  </div>

                  <div className="relative aspect-[16/10] bg-[#D9CBB1] dark:bg-[#141C30] overflow-hidden flex items-center justify-center">
                    {portraitHero && (
                      <img
                        src={project.heroImage}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        decoding="async"
                        draggable={false}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center scale-110 blur-2xl opacity-45 dark:opacity-35 pointer-events-none select-none"
                      />
                    )}
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      referrerPolicy="no-referrer"
                      onLoad={(e) => handleCoverLoad(project.id, e)}
                      className={
                        portraitHero
                          ? 'relative z-10 h-full w-auto max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none'
                          : 'relative z-10 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out pointer-events-none'
                      }
                    />
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-serif-architectural font-light text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm font-serif-architectural italic text-[#802C43] dark:text-[#C45D77] mt-1">
                        {project.subtitle}
                      </p>
                    </div>
                    <span className="text-3xl font-serif-architectural text-[#C7B697] dark:text-[#3A4B75] font-light shrink-0">
                      {project.number}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#1C2D58] dark:text-[#DDD1BC] font-light leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="pt-3 flex items-center justify-between border-t border-[#D9CBB1] dark:border-[#2A3759] text-xs font-mono">
                    <span className="text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] inline-flex items-center gap-1.5 uppercase tracking-wider font-medium">
                      <span>View Project Overview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    {project.year && (
                      <span className="text-[11px] text-[#5C6D9B] dark:text-[#988C75]">
                        {project.year}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
