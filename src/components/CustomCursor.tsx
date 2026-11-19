import React, { useEffect, useRef } from 'react';

type CursorVariant = 'default' | 'pointer' | 'project' | 'image' | 'zoom' | 'drag' | 'hidden';

const PROJECT_SELECTOR = '[data-cursor="project"]';
const ZOOM_SELECTOR = '[data-cursor="zoom"]';
const VIEW_SELECTOR = '[data-cursor="view"]';
const INPUT_SELECTOR = 'input, textarea, select, [contenteditable="true"]';
const INTERACTIVE_SELECTOR =
  'button, a, [role="button"], [tabindex]:not([tabindex="-1"]), label[for]';
const IMAGE_CONTAINER_SELECTOR = 'img';

function isDarkSurface(el: Element | null): boolean {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return true;
  }
  if (!el) return false;
  return Boolean(
    el.closest(
      '[data-cursor-dark="true"], [class*="bg-[#101626]"], [class*="bg-[#141C30]"], [class*="bg-[#18223A]"], [class*="bg-[#1C2D58]"], [class*="bg-[#263D78]"], [class*="bg-black"]'
    )
  );
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pointerMedia = window.matchMedia('(pointer: fine) and (hover: hover)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!pointerMedia.matches) {
      return;
    }

    let isEnabled = true;
    let isVisible = false;
    let isPressed = false;
    let fluidHover = false;
    let fluidDragging = false;
    let lastTarget: EventTarget | Element | null = null;
    let variant: CursorVariant = 'default';
    let labelText = '';
    let onDark = document.documentElement.classList.contains('dark');
    let magneticTarget: HTMLElement | null = null;

    // Coordinates: raw target vs smoothly interpolated rings
    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let trailX = -100;
    let trailY = -100;

    let animFrameId: number | null = null;
    let scrollRafId: number | null = null;
    let lastAppliedVariant: CursorVariant | null = null;
    let lastAppliedLabel = '';
    let lastAppliedDark: boolean | null = null;
    let lastAppliedPressed = false;

    const activateCursorClass = (active: boolean) => {
      if (active) {
        document.documentElement.classList.add('has-custom-cursor');
      } else {
        document.documentElement.classList.remove('has-custom-cursor');
      }
    };

    activateCursorClass(true);

    const resolveTargetContext = (target: EventTarget | Element | null) => {
      lastTarget = target;
      const el = target instanceof Element ? target : null;

      if (fluidDragging || fluidHover) {
        variant = 'drag';
        labelText = fluidDragging ? 'PULL' : 'DRAG';
        magneticTarget = null;
        onDark = el ? isDarkSurface(el) : document.documentElement.classList.contains('dark');
        return;
      }

      if (!el) {
        variant = 'default';
        labelText = '';
        magneticTarget = null;
        onDark = document.documentElement.classList.contains('dark');
        return;
      }

      onDark = isDarkSurface(el);

      // 1. Preserve native cursor inside form fields & editable controls
      if (el.closest(INPUT_SELECTOR)) {
        variant = 'hidden';
        labelText = '';
        magneticTarget = null;
        return;
      }

      // 2. Technical drawings / CAD plans / sections -> "ZOOM"
      const zoomEl = el.closest(ZOOM_SELECTOR) as HTMLElement | null;
      if (zoomEl) {
        variant = 'zoom';
        labelText = 'ZOOM';
        magneticTarget = null;
        return;
      }

      // 3. Project cards & case study titles -> "EXPLORE"
      const projectEl = el.closest(PROJECT_SELECTOR) as HTMLElement | null;
      if (projectEl) {
        variant = 'project';
        labelText = 'EXPLORE';
        magneticTarget = projectEl;
        return;
      }

      // 4. Editorial photographs & curated plates -> "VIEW"
      const viewEl = el.closest(VIEW_SELECTOR) as HTMLElement | null;
      if (viewEl) {
        variant = 'image';
        labelText = 'VIEW';
        magneticTarget = null;
        return;
      }

      const directImg = el.closest(IMAGE_CONTAINER_SELECTOR) as HTMLElement | null;
      const interactiveEl = el.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      const clickableImageWrapper = el.closest('[class*="cursor-pointer"]') as HTMLElement | null;

      if (directImg) {
        variant = 'image';
        labelText = 'VIEW';
        magneticTarget = null;
        return;
      }

      if (clickableImageWrapper && clickableImageWrapper.querySelector('img')) {
        variant = 'image';
        labelText = 'VIEW';
        magneticTarget = null;
        return;
      }

      // 5. Interactive buttons & links -> subtle magnetic expansion
      if (interactiveEl) {
        variant = 'pointer';
        labelText = '';
        magneticTarget = interactiveEl;
        return;
      }

      // 6. Default free-roaming architectural reticle
      variant = 'default';
      labelText = '';
      magneticTarget = null;
    };

    const syncVisualStyles = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const trail = trailRef.current;
      const label = labelRef.current;
      if (!dot || !ring || !trail || !label) return;

      const globalDark = document.documentElement.classList.contains('dark');
      const effectiveDark = onDark || globalDark;
      const effectiveOpacity = isVisible && variant !== 'hidden' ? '1' : '0';
      const hideDot = variant === 'project' || variant === 'image' || variant === 'zoom' || variant === 'drag';
      dot.style.opacity = hideDot ? '0' : effectiveOpacity;
      ring.style.opacity = effectiveOpacity;

      if (
        lastAppliedVariant === variant &&
        lastAppliedLabel === labelText &&
        lastAppliedDark === effectiveDark &&
        lastAppliedPressed === isPressed
      ) {
        return;
      }

      lastAppliedVariant = variant;
      lastAppliedLabel = labelText;
      lastAppliedDark = effectiveDark;
      lastAppliedPressed = isPressed;

      if (label.textContent !== labelText) {
        label.textContent = labelText;
      }

      const pressScale = isPressed ? 0.88 : 1;

      if (variant === 'project') {
        ring.style.width = `${Math.round(80 * pressScale)}px`;
        ring.style.height = `${Math.round(80 * pressScale)}px`;
        ring.style.borderColor = effectiveDark
          ? 'rgba(239, 230, 213, 0.35)'
          : 'rgba(243, 235, 221, 0.32)';
        ring.style.backgroundColor = effectiveDark
          ? 'rgba(160, 74, 96, 0.94)'
          : 'rgba(38, 61, 120, 0.94)';
        ring.style.backdropFilter = 'blur(4px)';
        ring.style.boxShadow = effectiveDark
          ? '0 10px 28px -8px rgba(0, 0, 0, 0.6)'
          : '0 10px 28px -8px rgba(28, 45, 88, 0.35)';

        label.style.opacity = '1';
        label.style.color = '#F3EBDD';
        label.style.transform = 'scale(1)';

        dot.style.transform = 'translate3d(var(--dx), var(--dy), 0) translate(-50%, -50%) scale(0.3)';
      } else if (variant === 'drag') {
        const dragSize = fluidDragging ? 68 : 74;
        ring.style.width = `${dragSize}px`;
        ring.style.height = `${dragSize}px`;
        ring.style.borderColor = effectiveDark ? '#EFE6D5' : '#802C43';
        ring.style.backgroundColor = effectiveDark
          ? 'rgba(38, 61, 120, 0.88)'
          : 'rgba(128, 44, 67, 0.92)';
        ring.style.backdropFilter = 'blur(4px)';
        ring.style.boxShadow = effectiveDark
          ? '0 12px 28px -8px rgba(0, 0, 0, 0.55)'
          : '0 12px 28px -8px rgba(128, 44, 67, 0.32)';

        label.style.opacity = '1';
        label.style.color = '#F3EBDD';
        label.style.transform = fluidDragging ? 'scale(0.94)' : 'scale(1)';

        dot.style.transform = 'translate3d(var(--dx), var(--dy), 0) translate(-50%, -50%) scale(0.3)';
      } else if (variant === 'zoom') {
        ring.style.width = `${Math.round(68 * pressScale)}px`;
        ring.style.height = `${Math.round(68 * pressScale)}px`;
        ring.style.borderColor = effectiveDark ? '#EFE6D5' : '#263D78';
        ring.style.backgroundColor = effectiveDark
          ? 'rgba(20, 28, 48, 0.94)'
          : 'rgba(248, 243, 232, 0.94)';
        ring.style.backdropFilter = 'blur(4px)';
        ring.style.boxShadow = effectiveDark
          ? '0 8px 22px -6px rgba(0, 0, 0, 0.55)'
          : '0 8px 22px -6px rgba(38, 61, 120, 0.22)';

        label.style.opacity = '1';
        label.style.color = effectiveDark ? '#EFE6D5' : '#263D78';
        label.style.transform = 'scale(1)';

        dot.style.transform = 'translate3d(var(--dx), var(--dy), 0) translate(-50%, -50%) scale(0.4)';
      } else if (variant === 'image') {
        ring.style.width = `${Math.round(64 * pressScale)}px`;
        ring.style.height = `${Math.round(64 * pressScale)}px`;
        ring.style.borderColor = effectiveDark ? '#C45D77' : '#802C43';
        ring.style.backgroundColor = effectiveDark
          ? 'rgba(16, 22, 38, 0.92)'
          : 'rgba(243, 235, 221, 0.92)';
        ring.style.backdropFilter = 'blur(4px)';
        ring.style.boxShadow = effectiveDark
          ? '0 6px 20px -6px rgba(0, 0, 0, 0.55)'
          : '0 6px 20px -6px rgba(38, 61, 120, 0.18)';

        label.style.opacity = '1';
        label.style.color = effectiveDark ? '#EFE6D5' : '#263D78';
        label.style.transform = 'scale(1)';

        dot.style.transform = 'translate3d(var(--dx), var(--dy), 0) translate(-50%, -50%) scale(0.4)';
      } else if (variant === 'pointer') {
        ring.style.width = `${Math.round(48 * pressScale)}px`;
        ring.style.height = `${Math.round(48 * pressScale)}px`;
        ring.style.borderColor = effectiveDark
          ? 'rgba(196, 93, 119, 0.85)'
          : 'rgba(128, 44, 67, 0.82)';
        ring.style.backgroundColor = effectiveDark
          ? 'rgba(196, 93, 119, 0.15)'
          : 'rgba(128, 44, 67, 0.1)';
        ring.style.backdropFilter = 'none';
        ring.style.boxShadow = 'none';

        label.style.opacity = '0';
        label.style.transform = 'scale(0.8)';

        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.backgroundColor = effectiveDark ? '#C45D77' : '#802C43';
      } else {
        ring.style.width = `${Math.round(34 * pressScale)}px`;
        ring.style.height = `${Math.round(34 * pressScale)}px`;
        ring.style.borderColor = effectiveDark
          ? 'rgba(239, 230, 213, 0.44)'
          : 'rgba(38, 61, 120, 0.38)';
        ring.style.backgroundColor = 'transparent';
        ring.style.backdropFilter = 'none';
        ring.style.boxShadow = 'none';

        label.style.opacity = '0';
        label.style.transform = 'scale(0.8)';

        dot.style.width = `${Math.round(6 * pressScale)}px`;
        dot.style.height = `${Math.round(6 * pressScale)}px`;
        dot.style.backgroundColor = effectiveDark ? '#EFE6D5' : '#263D78';
      }

      trail.style.borderColor = effectiveDark
        ? 'rgba(196, 93, 119, 0.36)'
        : 'rgba(128, 44, 67, 0.32)';
    };

    const tick = () => {
      if (!isEnabled) return;

      const reduced = motionMedia.matches;
      const dotEase = reduced ? 1 : 0.48;
      const ringEase = reduced ? 1 : 0.16;
      const trailEase = reduced ? 1 : 0.085;

      // Subtle magnetic pull on ring target for compact buttons / links
      let targetRingX = mouseX;
      let targetRingY = mouseY;

      if (magneticTarget && variant === 'pointer') {
        const rect = magneticTarget.getBoundingClientRect();
        if (rect.width > 0 && rect.width < 220 && rect.height < 80) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          targetRingX = mouseX + (centerX - mouseX) * 0.24;
          targetRingY = mouseY + (centerY - mouseY) * 0.24;
        }
      }

      if (dotX < -50 && mouseX >= 0) {
        dotX = mouseX;
        dotY = mouseY;
        ringX = targetRingX;
        ringY = targetRingY;
        trailX = mouseX;
        trailY = mouseY;
      } else {
        dotX += (mouseX - dotX) * dotEase;
        dotY += (mouseY - dotY) * dotEase;
        ringX += (targetRingX - ringX) * ringEase;
        ringY += (targetRingY - ringY) * ringEase;
        trailX += (mouseX - trailX) * trailEase;
        trailY += (mouseY - trailY) * trailEase;
      }

      const dot = dotRef.current;
      const ring = ringRef.current;
      const trail = trailRef.current;

      if (dot && ring && trail) {
        dot.style.setProperty('--dx', `${dotX.toFixed(2)}px`);
        dot.style.setProperty('--dy', `${dotY.toFixed(2)}px`);
        if (variant !== 'project' && variant !== 'image' && variant !== 'zoom' && variant !== 'drag') {
          dot.style.transform = `translate3d(${dotX.toFixed(2)}px, ${dotY.toFixed(2)}px, 0) translate(-50%, -50%)`;
        }

        ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) translate(-50%, -50%)`;

        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        const dist = Math.hypot(dx, dy);

        if (isVisible && variant === 'default' && !reduced && dist > 1.2) {
          const clampedStretch = Math.min(dist * 0.012, 0.35);
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          const trailOpacity = Math.min(dist / 36, 0.65);
          trail.style.opacity = trailOpacity.toFixed(2);
          trail.style.transform = `translate3d(${trailX.toFixed(2)}px, ${trailY.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(1)}deg) scale(${1 + clampedStretch}, ${Math.max(0.75, 1 - clampedStretch * 0.45)})`;
        } else {
          trail.style.opacity = '0';
          trail.style.transform = `translate3d(${trailX.toFixed(2)}px, ${trailY.toFixed(2)}px, 0) translate(-50%, -50%) scale(0.9)`;
        }
      }

      syncVisualStyles();
      animFrameId = window.requestAnimationFrame(tick);
    };

    const handleFluidHover = (e: Event) => {
      const custom = e as CustomEvent<{ over: boolean; dragging: boolean }>;
      fluidHover = Boolean(custom.detail?.over);
      fluidDragging = Boolean(custom.detail?.dragging);
      resolveTargetContext(lastTarget);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) isVisible = true;
      resolveTargetContext(e.target);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!isEnabled) return;
      resolveTargetContext(e.target);
    };

    const handleMouseDown = () => {
      isPressed = true;
    };

    const handleMouseUp = () => {
      isPressed = false;
    };

    const handleMouseLeaveViewport = () => {
      isVisible = false;
    };

    const handleMouseEnterViewport = () => {
      isVisible = true;
    };

    const handleScroll = () => {
      if (!isVisible || mouseX < 0 || mouseY < 0 || scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(() => {
        scrollRafId = null;
        const hoveredEl = document.elementFromPoint(mouseX, mouseY);
        resolveTargetContext(hoveredEl);
      });
    };

    const handleTouchStart = () => {
      isEnabled = false;
      isVisible = false;
      activateCursorClass(false);
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (trailRef.current) trailRef.current.style.opacity = '0';
    };

    const handlePointerChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        handleTouchStart();
      } else {
        isEnabled = true;
        activateCursorClass(true);
      }
    };

    window.addEventListener('fluid-sculpture-hover', handleFluidHover);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveViewport);
    document.addEventListener('mouseenter', handleMouseEnterViewport);
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    pointerMedia.addEventListener('change', handlePointerChange);

    animFrameId = window.requestAnimationFrame(tick);

    return () => {
      isEnabled = false;
      activateCursorClass(false);
      if (animFrameId !== null) window.cancelAnimationFrame(animFrameId);
      if (scrollRafId !== null) window.cancelAnimationFrame(scrollRafId);
      window.removeEventListener('fluid-sculpture-hover', handleFluidHover);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveViewport);
      document.removeEventListener('mouseenter', handleMouseEnterViewport);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      pointerMedia.removeEventListener('change', handlePointerChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}
    >
      {/* Subtle delayed trailing echo circle */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border pointer-events-none opacity-0 will-change-transform transition-opacity duration-300 ease-out"
        style={{
          borderColor: 'rgba(128, 44, 67, 0.32)',
        }}
      />

      {/* Fluid delayed architectural outer ring & contextual label badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border pointer-events-none flex items-center justify-center opacity-0 will-change-transform"
        style={{
          width: '34px',
          height: '34px',
          borderColor: 'rgba(38, 61, 120, 0.38)',
          transition:
            'width 260ms cubic-bezier(0.22, 1, 0.36, 1), height 260ms cubic-bezier(0.22, 1, 0.36, 1), background-color 240ms ease, border-color 240ms ease, opacity 200ms ease, box-shadow 260ms ease',
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[8.5px] font-medium uppercase tracking-[0.16em] leading-none text-center select-none px-1.5 opacity-0 whitespace-nowrap"
          style={{
            transition: 'opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      {/* Crisp low-latency precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none opacity-0 will-change-transform"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: '#263D78',
          transition:
            'width 200ms ease, height 200ms ease, background-color 200ms ease, opacity 160ms ease',
        }}
      />
    </div>
  );
};
