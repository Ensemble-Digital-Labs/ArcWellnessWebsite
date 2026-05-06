"use client";

import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Reserved — Tibbixel SVG path (frame disabled; asset kept for easy restore). */
export const TIBBIXEL_COPY_FRAME_SVG =
  "/assets/decoration/micro-statement-tibbixel-frame.svg";

type ArcTibbixelCopyFrameProps = {
  children: ReactNode;
  /** Unused while frame art is off — kept so callers don’t need churn when restoring. */
  ornamentMotion?: CSSProperties;
  /** Outer wrapper — width / alignment (e.g. `max-w-*`, `text-center`). */
  className?: string;
  /** Extra classes on the inner copy stack (padding overrides). */
  innerClassName?: string;
  /** Unused while frame art is off. */
  ornamentClassName?: string;
};

/**
 * Copy wrapper only — Tibbixel SVG ornament is currently disabled site-wide.
 * Inner padding matches the previous framed layout so type rhythm stays stable.
 */
export function ArcTibbixelCopyFrame({
  children,
  className,
  innerClassName,
}: ArcTibbixelCopyFrameProps) {
  return (
    <div className={cn("relative isolate w-full", className)}>
      <div
        className={cn(
          "relative z-10 flex flex-col items-center text-center",
          "px-[clamp(1.65rem,6.5vw,3.5rem)] py-[clamp(2rem,7.5vw,4.5rem)]",
          "sm:px-[clamp(1.85rem,6vw,3.25rem)] sm:py-[clamp(2.25rem,7vw,4.25rem)]",
          "md:px-[clamp(2rem,5.5vw,3.75rem)] md:py-[clamp(2.5rem,6.5vw,4.75rem)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
