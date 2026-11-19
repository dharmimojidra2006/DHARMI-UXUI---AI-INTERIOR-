import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { ProjectCaseStudy } from '../types';

interface Props {
  projects?: ProjectCaseStudy[];
  onExploreProjects?: () => void;
  onOpenAbout: () => void;
  onSelectProject?: (p: ProjectCaseStudy) => void;
  coverReady?: boolean;
  isSoundOn?: boolean;
  onToggleSound?: () => void;
}

const LINE_ONE_WORDS = ['INTERIOR', 'DESIGN'];
const LINE_TWO_WORD = 'PORTFOLIO';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mixRgb(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): string {
  const clamped = Math.max(0, Math.min(1, t));
  const r = Math.round(lerp(c1[0], c2[0], clamped));
  const g = Math.round(lerp(c1[1], c2[1], clamped));
  const b = Math.round(lerp(c1[2], c2[2], clamped));
  return `rgb(${r}, ${g}, ${b})`;
}

export const Hero: React.FC<Props> = ({
  onOpenAbout,
  coverReady = true,
  isSoundOn = false,
  onToggleSound,
}) => {
  const lockupRef = useRef<HTMLDivElement | null>(null);
  const scrollBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleContainerRef = useRef<HTMLHeadingElement | null>(null);
  const lineOneGlyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineTwoGlyphRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const coverReadyRef = useRef(coverReady);

  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let scrollRafId = 0;
    const updateParallax = () => {
      scrollRafId = 0;
      const y = window.scrollY;
      const vh = Math.max(window.innerHeight, 600);
      const progress = Math.min(1, Math.max(0, y / vh));

      if (lockupRef.current) {
        const shiftY = progress * -44;
        const scale = 1 - progress * 0.03;
        const opacity = Math.max(0.1, 1 - progress * 1.15);
        lockupRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
        lockupRef.current.style.opacity = opacity.toFixed(3);
      }

      if (scrollBtnRef.current) {
        const btnShiftY = progress * -22;
        const btnOpacity = Math.max(0, 1 - progress * 2.3);
        scrollBtnRef.current.style.transform = `translate3d(0, ${btnShiftY.toFixed(1)}px, 0)`;
        scrollBtnRef.current.style.opacity = btnOpacity.toFixed(3);
      }
    };

    const onScroll = () => {
      if (!reduced && !scrollRafId) {
        scrollRafId = window.requestAnimationFrame(updateParallax);
      }
    };

    // Per-letter fluid cursor reactivity state (60fps RAF, zero React re-renders)
    const line1Count = LINE_ONE_WORDS.join('').length;
    const line2Count = LINE_TWO_WORD.length;

    const l1Intensity = new Float32Array(line1Count);
    const l1WaveY = new Float32Array(line1Count);
    const l1StretchY = new Float32Array(line1Count).fill(1);
    const l1ShiftX = new Float32Array(line1Count);

    const l2Intensity = new Float32Array(line2Count);
    const l2WaveY = new Float32Array(line2Count);
    const l2Tilt = new Float32Array(line2Count);
    const l2GradMix = new Float32Array(line2Count);

    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;
    let glyphAnimId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    // Cache glyph centers smoothly & invalidate on resize/scroll
    let glyphRectsDirty = true;
    let l1Centers: { x: number; y: number }[] = [];
    let l2Centers: { x: number; y: number }[] = [];

    const measureGlyphs = () => {
      l1Centers = lineOneGlyphRefs.current.map((el) => {
        if (!el) return { x: -9999, y: -9999 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.5 };
      });
      l2Centers = lineTwoGlyphRefs.current.map((el) => {
        if (!el) return { x: -9999, y: -9999 };
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.5 };
      });
      glyphRectsDirty = false;
    };

    const markDirty = () => {
      glyphRectsDirty = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerActive = true;

      if (!reduced && window.scrollY <= window.innerHeight * 0.65) {
        const nx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
        const ny = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
        setMouseTilt({ x: nx, y: ny });
      }
    };

    const onMouseLeave = () => {
      pointerActive = false;
    };

    const tickTypography = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      if (window.scrollY > window.innerHeight * 0.95) {
        glyphAnimId = window.requestAnimationFrame(tickTypography);
        return;
      }

      if (glyphRectsDirty) {
        measureGlyphs();
      }

      const isDark = document.documentElement.classList.contains('dark');
      const smoothRate = 1 - Math.exp(-10.5 * dt);

      // Light mode: Royal Blue (#263D78) <-> Burgundy (#802C43) -> Soft Burgundy (#A04A60)
      // Dark mode: Warm Ivory (#EFE6D5) <-> Rose Burgundy (#C45D77) -> Highlight (#E598AC)
      const baseColor: [number, number, number] = isDark ? [239, 230, 213] : [38, 61, 120];
      const accentBurgundy: [number, number, number] = isDark ? [196, 93, 119] : [128, 44, 67];
      const highlightRose: [number, number, number] = isDark ? [229, 152, 172] : [160, 74, 96];
      const midIndigo: [number, number, number] = isDark ? [138, 164, 234] : [61, 82, 136];

      // 1. Update "INTERIOR DESIGN" glyphs — Liquid Stretch + Royal Blue <-> Burgundy Shift
      const radius1 = 155;
      for (let i = 0; i < line1Count; i++) {
        const el = lineOneGlyphRefs.current[i];
        const center = l1Centers[i];
        if (!el || !center) continue;

        let targetProx = 0;
        let dx = 0;
        let dy = 0;
        if (pointerActive) {
          dx = pointerX - center.x;
          dy = pointerY - center.y;
          const distSq = dx * dx + dy * dy;
          targetProx = Math.exp(-distSq / (radius1 * radius1 * 0.65));
        }

        const wavePhase = Math.sin(i * 0.68 - elapsed * 4.2 + dx * 0.018);
        const targetWaveY = targetProx * (-6.5 * Math.sign(dy || -1) * Math.min(1, Math.abs(dy) / 55) + wavePhase * 4.2);
        const targetStretchY = 1 + targetProx * (0.14 + wavePhase * 0.045);
        const targetShiftX = targetProx * Math.max(-5, Math.min(5, -dx * 0.032));

        l1Intensity[i] = lerp(l1Intensity[i], targetProx, smoothRate);
        l1WaveY[i] = lerp(l1WaveY[i], targetWaveY, smoothRate);
        l1StretchY[i] = lerp(l1StretchY[i], targetStretchY, smoothRate);
        l1ShiftX[i] = lerp(l1ShiftX[i], targetShiftX, smoothRate);

        const p = l1Intensity[i];
        if (p > 0.004 || Math.abs(l1WaveY[i]) > 0.05) {
          const scaleX = 1 - p * 0.035;
          el.style.transform = `translate3d(${l1ShiftX[i].toFixed(2)}px, ${l1WaveY[i].toFixed(2)}px, 0) scale(${scaleX.toFixed(4)}, ${l1StretchY[i].toFixed(4)})`;
          el.style.color = p > 0.72
            ? mixRgb(accentBurgundy, highlightRose, (p - 0.72) / 0.28)
            : mixRgb(baseColor, accentBurgundy, p / 0.72);
        } else {
          el.style.transform = '';
          el.style.color = '';
        }
      }

      // 2. Update "PORTFOLIO" glyphs — Flowing Cursor Gradient + Silk Arch Ripple
      const radius2 = 185;
      for (let i = 0; i < line2Count; i++) {
        const el = lineTwoGlyphRefs.current[i];
        const center = l2Centers[i];
        if (!el || !center) continue;

        let targetProx = 0;
        let dx = 0;
        let dy = 0;
        if (pointerActive) {
          dx = pointerX - center.x;
          dy = pointerY - center.y;
          const distSq = dx * dx + dy * dy;
          targetProx = Math.exp(-distSq / (radius2 * radius2 * 0.68));
        }

        // Flowing spatial gradient wave keyed to cursor x-travel + harmonic index ripple
        const flowWave = 0.5 + 0.5 * Math.sin(i * 0.75 - elapsed * 3.1 - dx * 0.015);
        const targetWaveY = targetProx * (-8.5 * Math.sin(flowWave * Math.PI) - Math.max(-4, Math.min(4, dy * 0.03)));
        const targetTilt = targetProx * Math.max(-4.5, Math.min(4.5, dx * 0.035));

        l2Intensity[i] = lerp(l2Intensity[i], targetProx, smoothRate);
        l2WaveY[i] = lerp(l2WaveY[i], targetWaveY, smoothRate);
        l2Tilt[i] = lerp(l2Tilt[i], targetTilt, smoothRate);
        l2GradMix[i] = lerp(l2GradMix[i], flowWave, smoothRate);

        const p = l2Intensity[i];
        if (p > 0.004 || Math.abs(l2WaveY[i]) > 0.05) {
          const sx = 1 + p * 0.065;
          const sy = 1 - p * 0.02 + Math.sin(l2GradMix[i] * Math.PI) * p * 0.07;
          el.style.transform = `translate3d(0, ${l2WaveY[i].toFixed(2)}px, 0) rotate(${l2Tilt[i].toFixed(2)}deg) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;

          // Soft flowing multi-stop gradient following cursor along the word
          const gradPos = l2GradMix[i];
          const activeTone =
            gradPos < 0.5
              ? mixRgb(midIndigo, accentBurgundy, gradPos * 2)
              : mixRgb(accentBurgundy, highlightRose, (gradPos - 0.5) * 2);

          // Blend smoothly from base color using proximity p
          const targetTuple: [number, number, number] = activeTone
            .replace(/[^\d,]/g, '')
            .split(',')
            .map(Number) as [number, number, number];
          el.style.color = mixRgb(baseColor, targetTuple, Math.min(1, p * 1.18));
        } else {
          el.style.transform = '';
          el.style.color = '';
        }
      }

      glyphAnimId = window.requestAnimationFrame(tickTypography);
    };

    let prevReady = coverReadyRef.current;
    const tickReadyMeasure = () => {
      if (!prevReady && coverReadyRef.current) {
        prevReady = true;
        markDirty();
        window.setTimeout(markDirty, 1050);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', markDirty, { passive: true });
    window.addEventListener('resize', markDirty, { passive: true });
    window.addEventListener('cover-intro-revealed', tickReadyMeasure);

    if (!reduced && finePointer) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);
      const headingEl = titleContainerRef.current;
      headingEl?.addEventListener('animationend', markDirty);
      document.fonts?.ready?.then(markDirty);
      const measureTimer = window.setTimeout(measureGlyphs, 1050);
      glyphAnimId = window.requestAnimationFrame(tickTypography);

      return () => {
        window.clearTimeout(measureTimer);
        headingEl?.removeEventListener('animationend', markDirty);
        window.cancelAnimationFrame(glyphAnimId);
        if (scrollRafId) window.cancelAnimationFrame(scrollRafId);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('scroll', markDirty);
        window.removeEventListener('resize', markDirty);
        window.removeEventListener('cover-intro-revealed', tickReadyMeasure);
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
      };
    }

    return () => {
      if (scrollRafId) window.cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', markDirty);
      window.removeEventListener('resize', markDirty);
      window.removeEventListener('cover-intro-revealed', tickReadyMeasure);
    };
  }, []);

  useEffect(() => {
    coverReadyRef.current = coverReady;
    if (coverReady && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cover-intro-revealed'));
    }
  }, [coverReady]);

  let l1GlyphCursor = 0;

  return (
    <section
      id="cover"
      className="relative h-dvh min-h-[620px] w-full bg-[#E9DFC9] dark:bg-[#101626] text-[#263D78] dark:text-[#EFE6D5] border-b border-[#D9CBB1] dark:border-[#2A3759] flex flex-col justify-between items-center px-6 sm:px-10 py-10 sm:py-14 overflow-hidden transition-colors duration-300"
    >
      {/* Subtle architectural datum drafting grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 architectural-datum-grid opacity-75"
      />

      {/* Quiet Warm Publication Corner Datum Marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-5 sm:inset-8 border border-[#D9CBB1]/65 dark:border-[#2A3759]/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-5 left-5 sm:top-8 sm:left-8 w-5 h-5 border-t border-l border-[#802C43]/60 dark:border-[#C45D77]/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-5 right-5 sm:top-8 sm:right-8 w-5 h-5 border-t border-r border-[#802C43]/60 dark:border-[#C45D77]/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-5 sm:bottom-8 sm:left-8 w-5 h-5 border-b border-l border-[#802C43]/60 dark:border-[#C45D77]/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 sm:bottom-8 sm:right-8 w-5 h-5 border-b border-r border-[#802C43]/60 dark:border-[#C45D77]/70"
      />

      {/* Ambient Editorial Coordinate Tags along lower frame */}
      <div
        aria-hidden="true"
        className={`pointer-events-none hidden md:flex items-center gap-2.5 absolute bottom-11 left-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[#3D5288]/80 dark:text-[#BFB299]/80 transition-opacity duration-700 ${
          coverReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>23.02° N</span>
        <span className="text-[#802C43] dark:text-[#C45D77]">/</span>
        <span>Ahmedabad, India</span>
      </div>

      {/* Bottom-right cover sculpture cue */}
      <div
        aria-hidden="true"
        className={`pointer-events-none hidden md:flex items-center gap-2 absolute bottom-11 right-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[#802C43]/85 dark:text-[#C45D77]/85 transition-opacity duration-700 ${
          coverReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span>Liquid Silk Form · Drag to Sculpt</span>
      </div>

      {/* Upper-right cover-only minimal pill-shaped Sound ON/OFF switch beside ThemeToggle */}
      {onToggleSound && (
        <div
          className={`absolute top-[3.55rem] right-5 sm:top-7 sm:right-8 z-40 transition-opacity duration-700 ${
            coverReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            type="button"
            role="switch"
            aria-checked={isSoundOn}
            onClick={onToggleSound}
            aria-label={
              isSoundOn
                ? 'Turn off ambient background soundscape'
                : 'Turn on ambient background soundscape'
            }
            className={`group inline-flex items-center justify-between gap-2 w-[88px] h-7 px-2.5 rounded-full border backdrop-blur-md font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer select-none whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D78] dark:focus-visible:outline-[#EFE6D5] ${
              isSoundOn
                ? 'bg-[#F3EBDD]/90 dark:bg-[#18223A]/90 border-[#802C43]/50 dark:border-[#C45D77]/55 text-[#802C43] dark:text-[#EFE6D5] shadow-[0_2px_10px_rgba(128,44,67,0.12)] dark:shadow-[0_2px_12px_rgba(196,93,119,0.18)]'
                : 'bg-[#F3EBDD]/75 dark:bg-[#18223A]/75 border-[#263D78]/20 dark:border-[#EFE6D5]/20 text-[#263D78]/85 dark:text-[#BFB299] hover:border-[#802C43]/45 dark:hover:border-[#C45D77]/50 hover:text-[#802C43] dark:hover:text-[#EFE6D5]'
            }`}
          >
            {isSoundOn ? (
              <Volume2
                aria-hidden="true"
                className="w-3 h-3 stroke-[1.75] text-[#802C43] dark:text-[#C45D77] transition-colors duration-300 shrink-0"
              />
            ) : (
              <VolumeX
                aria-hidden="true"
                className="w-3 h-3 stroke-[1.75] text-[#263D78]/70 dark:text-[#BFB299]/80 group-hover:text-[#802C43] dark:group-hover:text-[#C45D77] transition-colors duration-300 shrink-0"
              />
            )}

            <span
              aria-hidden="true"
              className={`relative inline-flex items-center w-[26px] h-[14px] p-[2px] rounded-full transition-colors duration-300 shrink-0 ${
                isSoundOn
                  ? 'bg-[#802C43] dark:bg-[#C45D77]'
                  : 'bg-[#D9CBB1]/90 dark:bg-[#2A3759]'
              }`}
            >
              <span
                className={`block w-[10px] h-[10px] rounded-full shadow-2xs transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isSoundOn
                    ? 'translate-x-[12px] bg-[#F3EBDD] dark:bg-[#101626]'
                    : 'translate-x-0 bg-[#263D78] dark:bg-[#BFB299]'
                }`}
              />
            </span>

            <span className="w-[21px] text-center leading-none transition-colors duration-300">
              {isSoundOn ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      )}

      {/* Top quiet breathing space */}
      <div aria-hidden="true" className="h-6 sm:h-10 shrink-0" />

      {/* Centerpiece Editorial Cover Lockup */}
      <div
        ref={lockupRef}
        className={`relative z-20 max-w-5xl w-full mx-auto text-center flex flex-col items-center will-change-transform transition-opacity duration-500 ${
          coverReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          style={{
            transform: `translate3d(${(mouseTilt.x * -5).toFixed(1)}px, ${(mouseTilt.y * -4).toFixed(1)}px, 0)`,
            transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* 1. Primary Visual Focus: Cursor-Reactive Typography */}
          <h1
            ref={titleContainerRef}
            aria-label="INTERIOR DESIGN PORTFOLIO"
            className="text-balance select-none"
          >
            {/* Line 1: INTERIOR DESIGN */}
            <span className="block overflow-visible py-1">
              <span
                aria-hidden="true"
                className={`block font-serif-architectural font-medium tracking-[0.06em] sm:tracking-[0.08em] text-[#263D78] dark:text-[#EFE6D5] text-[clamp(2.5rem,5.9vw,5.4rem)] leading-[1.04] uppercase ${
                  coverReady ? 'animate-hero-rise' : 'opacity-0'
                }`}
                style={{ animationDelay: '60ms' }}
              >
                {LINE_ONE_WORDS.map((word, wIdx) => (
                  <React.Fragment key={word}>
                    {wIdx > 0 && <span className="inline-block w-[0.26em]">&nbsp;</span>}
                    <span className="inline-block whitespace-nowrap">
                      {word.split('').map((char) => {
                        const idx = l1GlyphCursor++;
                        return (
                          <span
                            key={`${word}-${idx}`}
                            ref={(el) => {
                              lineOneGlyphRefs.current[idx] = el;
                            }}
                            className="inline-block origin-bottom will-change-transform transition-[text-shadow] duration-200"
                          >
                            {char}
                          </span>
                        );
                      })}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            </span>

            {/* Line 2: PORTFOLIO */}
            <span className="block overflow-visible mt-1 sm:mt-2 py-1">
              <span
                aria-hidden="true"
                className={`block font-serif-architectural italic font-light tracking-[0.14em] sm:tracking-[0.18em] text-[#263D78] dark:text-[#EFE6D5] text-[clamp(2.05rem,4.7vw,4.3rem)] leading-[1.1] uppercase ${
                  coverReady ? 'animate-hero-rise' : 'opacity-0'
                }`}
                style={{ animationDelay: '160ms' }}
              >
                <span className="inline-block whitespace-nowrap">
                  {LINE_TWO_WORD.split('').map((char, idx) => (
                    <span
                      key={`portfolio-${idx}`}
                      ref={(el) => {
                        lineTwoGlyphRefs.current[idx] = el;
                      }}
                      className="inline-block origin-center will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </span>
          </h1>
        </div>

        {/* Controlled Burgundy Hairline Rule */}
        <div
          aria-hidden="true"
          className={`w-16 h-px bg-[#802C43]/70 dark:bg-[#C45D77]/75 my-7 sm:my-10 ${
            coverReady ? 'animate-rule-x' : 'opacity-0'
          }`}
          style={{ animationDelay: '250ms' }}
        />

        {/* 2. Designer Name: DHARMI MOJIDRA (Controlled Burgundy Accent) */}
        <p
          className={`font-sans font-semibold uppercase tracking-[0.26em] sm:tracking-[0.32em] text-xs sm:text-sm text-[#802C43] dark:text-[#C45D77] mb-4 sm:mb-5 ${
            coverReady ? 'animate-hero-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '310ms' }}
        >
          DHARMI MOJIDRA
        </p>

        {/* 3. Design Philosophy Statement (Deep Royal Blue Prose / Soft Beige Dark) */}
        <p
          className={`font-serif-architectural italic font-normal text-lg sm:text-xl md:text-2xl text-[#1C2D58] dark:text-[#DDD1BC] max-w-xl leading-relaxed text-balance ${
            coverReady ? 'animate-hero-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '390ms' }}
        >
          "Designing spaces through material, experience and thoughtful details."
        </p>
      </div>

      {/* Mobile breathing negative space for the centered 3D silk sculpture */}
      <div aria-hidden="true" className="md:hidden h-44 shrink-0" />

      {/* 4. Subtle Scroll Indicator */}
      <button
        ref={scrollBtnRef}
        type="button"
        onClick={onOpenAbout}
        aria-label="Scroll to explore About section and projects"
        className={`relative z-20 group flex flex-col items-center gap-2.5 text-[#802C43] dark:text-[#C45D77] hover:text-[#263D78] dark:hover:text-[#EFE6D5] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263D78] dark:focus-visible:outline-[#EFE6D5] will-change-transform ${
          coverReady ? 'animate-hero-fade pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ animationDelay: '480ms' }}
      >
        <span className="font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] whitespace-nowrap">
          Scroll to explore
        </span>
        <ArrowDown className="w-3.5 h-3.5 stroke-[1.5] animate-scroll-drift" />
      </button>
    </section>
  );
};
