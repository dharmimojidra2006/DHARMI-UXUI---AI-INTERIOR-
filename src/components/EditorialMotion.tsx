import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export const ARCHITECTURAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface KineticTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * Masked upward architectural reveal — mimics drafting ink rising cleanly across a baseline.
 */
export const KineticMaskReveal: React.FC<KineticTextProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 32,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: yOffset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: 0.72,
          delay,
          ease: ARCHITECTURAL_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

/**
 * Architectural plate wipe reveal using GPU clip-path + subtle scale settle.
 */
export const ClipCuratedPlate: React.FC<ClipRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const initialClip =
    direction === 'left'
      ? 'inset(0% 100% 0% 0%)'
      : direction === 'right'
        ? 'inset(0% 0% 0% 100%)'
        : 'inset(10% 0% 0% 0%)';

  return (
    <motion.div
      initial={{ clipPath: initialClip, opacity: 0.15 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.88,
        delay,
        ease: ARCHITECTURAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

/**
 * Scroll-scrubbed GPU depth offset for editorial spreads & portrait/plate counter-motion.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  className = '',
  offset = 28,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

interface DatumRuleProps {
  className?: string;
  delay?: number;
}

/**
 * Expanding architectural hairline rule driven by scroll entry.
 */
export const AnimatedDatumRule: React.FC<DatumRuleProps> = ({
  className = '',
  delay = 0,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={`h-px bg-[#C7B697] dark:bg-[#2A3759] ${className}`} />;
  }

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay, ease: ARCHITECTURAL_EASE }}
      style={{ transformOrigin: 'left center' }}
      className={`h-px bg-[#C7B697] dark:bg-[#2A3759] ${className}`}
    />
  );
};
