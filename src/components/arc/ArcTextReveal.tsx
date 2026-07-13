"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** ExoMind-inspired editorial reveals — crisp opacity + small translate, no blur. */
export type ArcTextRevealVariant = "heading" | "body" | "line";

type ArcTextRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay multiplier — `delayIndex * 0.09s`. */
  delayIndex?: number;
  variant?: ArcTextRevealVariant;
  as?: "div" | "span" | "p" | "li";
  /**
   * `inView` — scroll-triggered (default, for below-the-fold copy).
   * `mount` — plays on mount when `when` is true (hero / above-the-fold).
   */
  trigger?: "inView" | "mount";
  /** Gate for `mount` reveals — e.g. wait until the intro preloader clears. */
  when?: boolean;
};

const VIEWPORT = {
  once: true as const,
  amount: 0.1,
  margin: "0px 0px -10% 0px",
};

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.95;

const VARIANT_MOTION: Record<
  ArcTextRevealVariant,
  { hidden: { opacity: number; x?: number; y?: number }; shown: { opacity: number; x: number; y: number } }
> = {
  heading: {
    hidden: { opacity: 0, y: 26 },
    shown: { opacity: 1, x: 0, y: 0 },
  },
  body: {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, x: 0, y: 0 },
  },
  line: {
    hidden: { opacity: 0, x: 28 },
    shown: { opacity: 1, x: 0, y: 0 },
  },
};

/**
 * Per-block text reveal — Framer `whileInView` (scroll) or `animate` on mount (hero).
 * Pair with section-level `[data-scroll-section]` only on imagery — not on the same node.
 */
export function ArcTextReveal({
  children,
  className,
  delayIndex = 0,
  variant = "body",
  as = "div",
  trigger = "inView",
  when = true,
}: ArcTextRevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];
  const motionState = VARIANT_MOTION[variant];

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const transition = {
    duration: DURATION,
    delay: delayIndex * 0.09,
    ease: EASE,
  };

  if (trigger === "mount") {
    return (
      <Component
        className={cn(className)}
        initial={motionState.hidden}
        animate={when ? motionState.shown : motionState.hidden}
        transition={transition}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={cn(className)}
      initial={motionState.hidden}
      whileInView={motionState.shown}
      viewport={VIEWPORT}
      transition={transition}
    >
      {children}
    </Component>
  );
}
