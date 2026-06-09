"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useArcFullscreenPin, type ArcFullscreenPinOptions } from "@/lib/arcSectionPins";

type PinnedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  pinDistanceMultiplier?: number;
  /** 0 at pin start, 1 at pin end — for scroll-scrubbed animations while pinned. */
  onProgress?: ArcFullscreenPinOptions["onProgress"];
  /** Skip pin setup (e.g. footer / testimonials on mobile native scroll). */
  disabled?: boolean;
  /** `fixed` for WebGL-heavy sections — avoids canvas flicker on transform pin. */
  pinType?: ArcFullscreenPinOptions["pinType"];
};

/** Pins this block for one viewport of scroll inside `#main` (ensemble-style stack). */
export function PinnedSection({
  id,
  className,
  children,
  pinDistanceMultiplier,
  onProgress,
  disabled = false,
  pinType,
}: PinnedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  useArcFullscreenPin(ref, { pinDistanceMultiplier, onProgress, disabled, pinType });

  return (
    <section ref={ref} id={id} className={cn(className)}>
      {children}
    </section>
  );
}
