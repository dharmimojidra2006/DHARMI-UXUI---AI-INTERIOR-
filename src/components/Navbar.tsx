import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowUpRight, Plus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ProjectCaseStudy } from '../types';
import { ARCHITECTURAL_EASE } from './EditorialMotion';

interface Props {
  projects: ProjectCaseStudy[];
  onOpenContact: () => void;
  onExploreProjects: () => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  introActive?: boolean;
}

const CHAPTERS = [
  { id: 'cover', num: '01', label: 'Cover', href: '#cover' },
  { id: 'about', num: '02', label: 'Profile', href: '#about' },
  { id: 'projects', num: '03', label: 'Selected Works', href: '#projects' },
  { id: 'philosophy', num: '04', label: 'Philosophy', href: '#philosophy' },
  { id: 'process', num: '05', label: 'Process', href: '#process' },
  { id: 'skills', num: '06', label: 'Competencies', href: '#skills' },
  { id: 'education', num: '07', label: 'Formation', href: '#education' },
  { id: 'contact', num: '08', label: 'Dialogue', href: '#contact' },
];

export const Navbar: React.FC<Props> = ({
  projects,
  onOpenContact,
  onExploreProjects,
  onSelectProject,
  introActive = false,
}) => {
  const [indexDrawerOpen, setIndexDrawerOpen] = useState(false);
  const [hoveredProjectIdx, setHoveredProjectIdx] = useState(0);
  const [isPastCover, setIsPastCover] = useState(false);
  const [activeChapter, setActiveChapter] = useState('cover');

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const threshold = Math.max(240, window.innerHeight * 0.65);
      setIsPastCover(window.scrollY > threshold);

      const scrollCenter = window.scrollY + window.innerHeight * 0.38;
      let currentId = 'cover';
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (el && el.offsetTop <= scrollCenter) {
          currentId = ch.id;
        }
      }
      setActiveChapter(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && indexDrawerOpen) {
        setIndexDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [indexDrawerOpen]);

  const navLinks = [
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'process', label: 'Process', href: '#process' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIndexDrawerOpen(false);
    if (href === '#cover') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeChapterObj = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0];
  const previewProject = projects[hoveredProjectIdx] || projects[0];

  return (
    <>
      {/* Subtle Top-Left & Top-Right Cover Utility Bar (visible on opening cover) */}
      <div
        className={`fixed top-5 left-5 sm:top-7 sm:left-8 z-40 transition-all duration-500 hidden sm:flex items-center gap-3 ${
          isPastCover || introActive
            ? 'opacity-0 pointer-events-none -translate-y-2'
            : 'opacity-100 pointer-events-auto translate-y-0'
        }`}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#802C43] dark:text-[#C45D77]">
          01 / Exhibition Monograph
        </span>
        <span aria-hidden="true" className="text-[#C7B697] dark:text-[#3A4B75] text-xs">
          ·
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3D5288] dark:text-[#BFB299]">
          2026
        </span>
      </div>

      <div
        className={`fixed top-5 right-5 sm:top-7 sm:right-[8.125rem] z-40 transition-all duration-500 flex items-center gap-2.5 ${
          isPastCover || introActive
            ? 'opacity-0 pointer-events-none -translate-y-2'
            : 'opacity-100 pointer-events-auto translate-y-0'
        }`}
      >
        <button
          type="button"
          onClick={() => setIndexDrawerOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD]/90 dark:bg-[#18223A]/90 text-[10px] font-mono uppercase tracking-[0.18em] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors cursor-pointer whitespace-nowrap"
          aria-label="Open Architectural Index Menu"
        >
          <span>Index</span>
          <Plus className="w-3 h-3" />
        </button>
        <ThemeToggle />
      </div>

      {/* Persistent Sticky Editorial Navigation Header */}
      <header
        aria-hidden={!isPastCover}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isPastCover
            ? 'opacity-100 translate-y-0 pointer-events-auto visible bg-[#E9DFC9]/95 dark:bg-[#101626]/95 backdrop-blur-md border-[#C7B697] dark:border-[#2A3759] py-3.5 shadow-2xs'
            : 'opacity-0 -translate-y-full pointer-events-none invisible bg-[#E9DFC9]/95 dark:bg-[#101626]/95 border-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-4 lg:gap-8">
          {/* Zone 1: Personal wordmark + live active chapter */}
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="#cover"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm sm:text-base font-sans font-bold tracking-[0.18em] uppercase text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors whitespace-nowrap shrink-0"
            >
              Dharmi Mojidra
            </a>
            <span
              aria-hidden="true"
              className="hidden xl:inline-block w-3 h-px bg-[#C7B697] dark:bg-[#3A4B75]"
            />
            <span className="hidden xl:inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-[#802C43] dark:text-[#C45D77] whitespace-nowrap">
              {activeChapterObj.num} · {activeChapterObj.label}
            </span>
          </div>

          {/* Zone 2: Clean 5-link row with active underline */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[11px] font-mono tracking-[0.16em] uppercase text-[#1C2D58]/80 dark:text-[#BFB299]">
            {navLinks.map((link) => {
              const isActive = activeChapter === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#263D78] dark:text-[#EFE6D5] font-medium'
                      : 'hover:text-[#263D78] dark:hover:text-[#EFE6D5]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbarActiveUnderline"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#802C43] dark:bg-[#C45D77]"
                      transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle + Index Menu + Explore Work */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <ThemeToggle className="hidden sm:inline-flex" />

            <button
              type="button"
              onClick={() => setIndexDrawerOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#263D78] dark:text-[#EFE6D5] border border-[#C7B697] dark:border-[#3A4B75] hover:border-[#802C43] dark:hover:border-[#C45D77] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Open Architectural Index"
            >
              <span>Index</span>
              <Plus className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={onExploreProjects}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.14em] text-[#F3EBDD] dark:text-[#1C2D58] bg-[#263D78] dark:bg-[#EFE6D5] hover:bg-[#802C43] dark:hover:bg-[#C45D77] dark:hover:text-[#F3EBDD] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIndexDrawerOpen(!indexDrawerOpen)}
              className="lg:hidden p-2 text-[#263D78] dark:text-[#EFE6D5] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {indexDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Architectural Scroll Progress Hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#802C43] dark:bg-[#C45D77]"
        />
      </header>

      {/* Desktop Right-Edge Minimal Chapter Spine Indicator */}
      <aside
        aria-label="Exhibition Section Navigator"
        className={`hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-2 transition-opacity duration-300 ${
          isPastCover ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {CHAPTERS.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => handleNavClick(ch.href)}
              className="group flex items-center gap-2 py-0.5 cursor-pointer"
              title={`${ch.num} ${ch.label}`}
              aria-label={`Jump to ${ch.num} ${ch.label}`}
            >
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-all duration-200 ${
                  isActive
                    ? 'opacity-100 text-[#802C43] dark:text-[#C45D77] translate-x-0'
                    : 'opacity-0 group-hover:opacity-80 text-[#3D5288] dark:text-[#BFB299] translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {ch.num} {ch.label}
              </span>
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive
                    ? 'w-5 bg-[#802C43] dark:bg-[#C45D77]'
                    : 'w-2 bg-[#C7B697] dark:bg-[#3A4B75] group-hover:w-3.5 group-hover:bg-[#263D78] dark:group-hover:bg-[#EFE6D5]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Full-Screen Architectural Index Overlay Drawer */}
      <AnimatePresence>
        {indexDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio Exhibition Index"
            className="fixed inset-0 z-50 bg-[#E9DFC9]/98 dark:bg-[#101626]/98 backdrop-blur-md overflow-y-auto flex flex-col justify-between"
          >
            {/* Top Bar inside Drawer */}
            <div className="max-w-7xl w-full mx-auto px-6 md:px-10 py-6 flex items-center justify-between border-b border-[#D9CBB1] dark:border-[#2A3759]">
              <div className="flex items-center gap-3">
                <span className="font-serif-architectural text-xl font-semibold text-[#263D78] dark:text-[#EFE6D5]">
                  Dharmi Mojidra
                </span>
                <span aria-hidden="true" className="text-[#C7B697] dark:text-[#3A4B75]">
                  /
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#3D5288] dark:text-[#BFB299]">
                  Architectural Exhibition Index
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setIndexDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#263D78] dark:border-[#EFE6D5] text-xs font-mono uppercase tracking-[0.16em] text-[#263D78] dark:text-[#EFE6D5] hover:bg-[#802C43] hover:border-[#802C43] hover:text-[#F3EBDD] dark:hover:bg-[#C45D77] dark:hover:border-[#C45D77] dark:hover:text-[#F3EBDD] transition-colors cursor-pointer"
                >
                  <span>Close</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Center Two-Column Architectural Index */}
            <div className="max-w-7xl w-full mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 grow items-start">
              {/* Left: Portfolio Chapters 01–08 */}
              <div className="lg:col-span-5 space-y-5">
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#802C43] dark:text-[#C45D77]">
                  Portfolio Chapters (01 — 08)
                </div>

                <nav className="divide-y divide-[#D9CBB1] dark:divide-[#2A3759] border-y border-[#D9CBB1] dark:border-[#2A3759]">
                  {CHAPTERS.map((ch, idx) => {
                    const isActive = activeChapter === ch.id;
                    return (
                      <motion.button
                        key={ch.id}
                        type="button"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + idx * 0.03, duration: 0.45, ease: ARCHITECTURAL_EASE }}
                        onClick={() => handleNavClick(ch.href)}
                        className="w-full py-3.5 flex items-baseline justify-between group text-left cursor-pointer"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-[#802C43] dark:text-[#C45D77]">
                            {ch.num}
                          </span>
                          <span
                            className={`text-2xl sm:text-3xl font-serif-architectural font-light transition-transform duration-300 group-hover:translate-x-2 ${
                              isActive
                                ? 'italic text-[#802C43] dark:text-[#C45D77]'
                                : 'text-[#263D78] dark:text-[#EFE6D5] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77]'
                            }`}
                          >
                            {ch.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#C7B697] dark:text-[#3A4B75] group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors" />
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Right: Selected Works Live Catalog with Plate Preview */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#802C43] dark:text-[#C45D77]">
                  <span>Selected Works Catalogue (01 — {String(projects.length).padStart(2, '0')})</span>
                  <span className="text-[#3D5288] dark:text-[#BFB299]">Click to open case study</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-7 divide-y divide-[#D9CBB1] dark:divide-[#2A3759] border-y border-[#D9CBB1] dark:border-[#2A3759]">
                    {projects.map((p, idx) => {
                      const isSelected = idx === hoveredProjectIdx;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onMouseEnter={() => setHoveredProjectIdx(idx)}
                          onFocus={() => setHoveredProjectIdx(idx)}
                          onClick={() => {
                            setIndexDrawerOpen(false);
                            onSelectProject(p);
                          }}
                          className={`w-full py-3 px-2 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#F3EBDD] dark:bg-[#18223A]'
                              : 'hover:bg-[#F3EBDD]/60 dark:hover:bg-[#18223A]/60'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-[11px] text-[#802C43] dark:text-[#C45D77]">
                                {p.number}
                              </span>
                              <span className="font-serif-architectural text-lg text-[#263D78] dark:text-[#EFE6D5] truncate">
                                {p.title}
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-[#3D5288] dark:text-[#BFB299] truncate pl-7">
                              {p.categoryLabel} · {p.location}
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#802C43] dark:text-[#C45D77]" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Live Exhibition Preview Plate */}
                  {previewProject && (
                    <div className="hidden md:block md:col-span-5 border border-[#D9CBB1] dark:border-[#2A3759] bg-[#F3EBDD] dark:bg-[#18223A] p-3 space-y-2.5">
                      <div className="aspect-4/3 w-full overflow-hidden bg-[#D9CBB1] dark:bg-[#141C30]">
                        <img
                          src={previewProject.heroImage}
                          alt={previewProject.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#802C43] dark:text-[#C45D77]">
                          <span>Plate {previewProject.number}</span>
                          <span>{previewProject.year}</span>
                        </div>
                        <div className="font-serif-architectural text-base text-[#263D78] dark:text-[#EFE6D5] leading-snug">
                          {previewProject.title}
                        </div>
                        <p className="text-[11px] font-serif-architectural italic text-[#3D5288] dark:text-[#BFB299] line-clamp-2">
                          {previewProject.subtitle}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Colophon Bar inside Drawer */}
            <div className="max-w-7xl w-full mx-auto px-6 md:px-10 py-5 border-t border-[#D9CBB1] dark:border-[#2A3759] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#3D5288] dark:text-[#BFB299]">
              <span>Dharmi Mojidra · Indus University, Ahmedabad · Class of 2026</span>
              <button
                type="button"
                onClick={() => {
                  setIndexDrawerOpen(false);
                  onOpenContact();
                }}
                className="text-[#802C43] dark:text-[#C45D77] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Start a Conversation →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
