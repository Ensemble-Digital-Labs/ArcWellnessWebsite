"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useArcFullscreenPin } from "@/lib/arcSectionPins";

type PinnedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

/** Pins this block for one viewport of scroll inside `#main` (ensemble-style stack). */
export function PinnedSection({ id, className, children }: PinnedSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  useArcFullscreenPin(ref);

  return (
    <section ref={ref} id={id} className={cn(className)}>
      {children}
    </section>
  );
}
