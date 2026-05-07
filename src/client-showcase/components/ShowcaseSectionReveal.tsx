"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type ShowcaseRevealMode = "stickySafe" | "rich";

type Props = {
  children: ReactNode;
  className?: string;
  delayIndex?: number;
  /**
   * `stickySafe` — opacity only (no transform/filter on wrapper) so `position: sticky` in the header works.
   * `rich` — opacity + soft lift + blur-to-sharp, similar to premium agency scroll reveals (e.g. Influx-style blocks).
   */
  mode?: ShowcaseRevealMode;
};

const VIEWPORT = {
  once: true as const,
  amount: 0.08,
  margin: "0px 0px 18% 0px",
} as const;

const EASE = [0.33, 0, 0.2, 1] as const;

/**
 * Section enter animation for client-showcase. Respects prefers-reduced-motion (no animation).
 */
export function ShowcaseSectionReveal({ children, className, delayIndex = 0, mode = "rich" }: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const delay = delayIndex * 0.1;

  if (mode === "stickySafe") {
    return (
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{
          duration: 1.1,
          delay,
          ease: EASE,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={VIEWPORT}
      transition={{
        duration: 1.2,
        delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}
