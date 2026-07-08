"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useArcFullscreenPin, type ArcFullscreenPinOptions } from "@/lib/arcSectionPins";

type PinnedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Marker for path-step pin coordination (mobile flash guard). */
  "data-path-steps-crossfade"?: boolean;
  pinDistanceMultiplier?: number;
  /** 0 at pin start, 1 at pin end, for scroll-scrubbed animations while pinned. */
  onProgress?: ArcFullscreenPinOptions["onProgress"];
  /** Skip pin setup (e.g. footer / testimonials on mobile native scroll). */
  disabled?: boolean;
  /** `fixed` for WebGL-heavy sections, avoids canvas flicker on transform pin. */
  pinType?: ArcFullscreenPinOptions["pinType"];
  /** Keep scroll steady when this pin toggles (path steps on breakpoint resize). */
  stabilizeScrollOnToggle?: boolean;
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
  stabilizeScrollOnToggle,
  "data-path-steps-crossfade": dataPathStepsCrossfade,
}: PinnedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  useArcFullscreenPin(ref, {
    pinDistanceMultiplier,
    onProgress,
    disabled,
    pinType,
    stabilizeScrollOnToggle,
  });

  return (
    <section
      ref={ref}
      id={id}
      data-path-steps-crossfade={dataPathStepsCrossfade ? true : undefined}
      className={cn(className)}
    >
      {children}
    </section>
  );
}
