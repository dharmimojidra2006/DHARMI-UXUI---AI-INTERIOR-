import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ARCHITECTURAL_EASE } from './EditorialMotion';

export type IntroStage = 'active' | 'revealing' | 'done';

interface Props {
  stage: IntroStage;
  onSkip: () => void;
}

export const CinematicIntroOverlay: React.FC<Props> = ({ stage, onSkip }) => {
  const [namePhase, setNamePhase] = useState<'waiting' | 'visible' | 'exiting'>('waiting');

  useEffect(() => {
    if (stage !== 'active') {
      setNamePhase('exiting');
      return;
    }

    const showTimer = window.setTimeout(() => {
      setNamePhase('visible');
    }, 650);

    const fadeOutTimer = window.setTimeout(() => {
      setNamePhase('exiting');
    }, 2400);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeOutTimer);
    };
  }, [stage]);

  // Allow Escape key to skip intro smoothly & pause accidental wheel/touch scrolling while active
  useEffect(() => {
    if (stage !== 'active') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSkip();
      }
    };

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [stage, onSkip]);

  if (stage === 'done') return null;

  const isActive = stage === 'active';
  const showName = isActive && namePhase === 'visible';

  return (
    <div
      aria-live="polite"
      aria-label="Exhibition opening sequence for Dharmi Mojidra"
      className={`fixed inset-0 z-[35] select-none transition-opacity duration-700 ${
        isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Quiet Warm Architectural Frame Lines during Intro */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.02 }}
        transition={{ duration: 0.9, ease: ARCHITECTURAL_EASE }}
        className="pointer-events-none absolute inset-5 sm:inset-8 border border-[#D9CBB1]/60 dark:border-[#2A3759]/75"
      >
        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#802C43]/70 dark:border-[#C45D77]/75" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-[#802C43]/70 dark:border-[#C45D77]/75" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-[#802C43]/70 dark:border-[#C45D77]/75" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#802C43]/70 dark:border-[#C45D77]/75" />
      </motion.div>

      {/* Center Designer Name Signature Emergence */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <AnimatePresence>
          {showName && (
            <motion.div
              key="intro-signature"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 1.015 }}
              transition={{ duration: 0.8, ease: ARCHITECTURAL_EASE }}
              className="relative flex flex-col items-center py-10 px-8 sm:px-16"
            >
              {/* Feathered Gallery Light Mist Halo for Crisp Contrast over Flowing Liquid Silk */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 opacity-95 bg-[radial-gradient(ellipse_at_center,rgba(233,223,201,0.92)_0%,rgba(233,223,201,0.68)_42%,rgba(233,223,201,0)_76%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(16,22,38,0.92)_0%,rgba(16,22,38,0.68)_44%,rgba(16,22,38,0)_76%)]"
              />

              <motion.p
                initial={{ letterSpacing: '0.32em', opacity: 0 }}
                animate={{ letterSpacing: '0.44em', opacity: 1 }}
                exit={{ letterSpacing: '0.5em', opacity: 0 }}
                transition={{ duration: 1.05, ease: ARCHITECTURAL_EASE }}
                className="font-serif-architectural font-medium uppercase text-[#263D78] dark:text-[#EFE6D5] text-[clamp(1.65rem,4.2vw,3.35rem)] leading-tight text-balance"
              >
                DHARMI MOJIDRA
              </motion.p>

              <motion.div
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.75, delay: 0.16, ease: ARCHITECTURAL_EASE }}
                className="w-20 h-px bg-[#802C43] dark:bg-[#C45D77] mt-5 origin-center"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Skip Intro Control */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
        transition={{ duration: 0.45, delay: 0.2, ease: ARCHITECTURAL_EASE }}
        className="absolute bottom-7 right-7 sm:bottom-10 sm:right-10"
      >
        <button
          type="button"
          onClick={onSkip}
          aria-label="Skip opening animation and enter portfolio cover"
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] border border-[#C7B697] dark:border-[#3A4B75] bg-[#F3EBDD]/90 dark:bg-[#18223A]/90 text-[11px] font-mono uppercase tracking-[0.18em] text-[#263D78] dark:text-[#EFE6D5] hover:border-[#802C43] dark:hover:border-[#C45D77] hover:text-[#802C43] dark:hover:text-[#C45D77] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D78] dark:focus-visible:outline-[#EFE6D5]"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};
