/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsGrid } from './components/ProjectsGrid';
import { Philosophy } from './components/Philosophy';
import { ProcessTimeline } from './components/ProcessTimeline';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PROJECTS } from './data/projectsData';
import { ProjectCaseStudy } from './types';
import { CustomCursor } from './components/CustomCursor';
import { OrganicSculptureStage } from './components/OrganicSculptureStage';
import { CinematicIntroOverlay, IntroStage } from './components/CinematicIntroOverlay';
import { ThemeProvider } from './context/ThemeContext';
import { useAmbientSoundscape } from './hooks/useAmbientSoundscape';

const INTRO_SESSION_KEY = 'dharmi-exhibition-intro-seen';

function getInitialIntroStage(): IntroStage {
  if (typeof window === 'undefined') return 'done';
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return 'done';
  }
  try {
    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === '1') {
      return 'done';
    }
  } catch {
    // Ignore restricted storage environments
  }
  return 'active';
}

function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, '1');
  } catch {
    // Ignore restricted storage environments
  }
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [introStage, setIntroStage] = useState<IntroStage>(getInitialIntroStage);
  const { isSoundOn, toggleSound } = useAmbientSoundscape();

  useEffect(() => {
    if (introStage === 'done') return;

    if (introStage === 'active') {
      const revealTimer = window.setTimeout(() => {
        markIntroSeen();
        setIntroStage('revealing');
      }, 2850);

      return () => window.clearTimeout(revealTimer);
    }

    if (introStage === 'revealing') {
      const settleTimer = window.setTimeout(() => {
        setIntroStage('done');
      }, 1350);

      return () => window.clearTimeout(settleTimer);
    }
  }, [introStage]);

  const handleSkipIntro = useCallback(() => {
    markIntroSeen();
    setIntroStage((prev) => (prev === 'done' ? 'done' : 'revealing'));
  }, []);

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreProjects = () => {
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAbout = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#E9DFC9] dark:bg-[#101626] text-[#263D78] dark:text-[#EFE6D5] selection:bg-[#802C43] dark:selection:bg-[#C45D77] selection:text-[#F3EBDD] dark:selection:text-[#101626] flex flex-col font-sans transition-colors duration-300">
        {/* Subtle Warm Architectural Paper Grain */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[5] pointer-events-none paper-grain-overlay"
        />

        <CustomCursor />
        <OrganicSculptureStage introStage={introStage} />

        {/* Cinematic Once-Per-Open Exhibition Intro Overlay */}
        <CinematicIntroOverlay stage={introStage} onSkip={handleSkipIntro} />

        {/* Architectural Sticky Bar, Chapter Spine Rail & Index Drawer */}
        <Navbar
          projects={PROJECTS}
          onOpenContact={handleOpenContact}
          onExploreProjects={handleExploreProjects}
          onSelectProject={(project) => setSelectedProject(project)}
          introActive={introStage === 'active'}
        />

        {/* Main Page Flow */}
        <main className="grow">
          {/* 01 / Opening Portfolio Cover */}
          <Hero
            projects={PROJECTS}
            onExploreProjects={handleExploreProjects}
            onOpenAbout={handleOpenAbout}
            onSelectProject={(project) => setSelectedProject(project)}
            coverReady={introStage !== 'active'}
            isSoundOn={isSoundOn}
            onToggleSound={toggleSound}
          />

          {/* 02 / About Dharmi Mojidra */}
          <About />

          {/* 03 / Selected Works Exhibition & Rail */}
          <ProjectsGrid
            projects={PROJECTS}
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* 04 / Design Philosophy */}
          <Philosophy />

          {/* 05 / 6-Step Process Timeline */}
          <ProcessTimeline />

          {/* 06 / Skills & Representation */}
          <SkillsSection />

          {/* 07 / Education & Academic Rigor */}
          <EducationSection />

          {/* 08 / Contact & Inquiries */}
          <ContactSection />
        </main>

        {/* Portfolio Colophon & Footer */}
        <Footer />

        {/* Full 16-Step Case Study Modal Viewer with Animated Transition */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetailModal
              key={selectedProject.id}
              project={selectedProject}
              allProjects={PROJECTS}
              onClose={() => setSelectedProject(null)}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
