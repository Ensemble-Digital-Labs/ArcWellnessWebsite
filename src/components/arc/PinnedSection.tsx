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
};

/** Pins this block for one viewport of scroll inside `#main` (ensemble-style stack). */
export function PinnedSection({
  id,
  className,
  children,
  pinDistanceMultiplier,
  onProgress,
}: PinnedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  useArcFullscreenPin(ref, { pinDistanceMultiplier, onProgress });

  return (
    <section ref={ref} id={id} className={cn(className)}>
      {children}
    </section>
  );
}
