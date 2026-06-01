"use client";

import { cn } from "@/lib/utils";

type ArcPinProgressRailProps = {
  progress: number;
  className?: string;
  /** Show 01-style counter when provided */
  label?: string;
};

/** Vooban-style thin scrub indicator while a section is pinned */
export function ArcPinProgressRail({ progress, className, label }: ArcPinProgressRailProps) {
  const p = Math.min(1, Math.max(0, progress));

  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center gap-3 px-6 sm:px-10 md:px-12", className)}
      aria-hidden
    >
      <div className="h-px flex-1 overflow-hidden bg-arc-charcoal/10">
        <div
          className="h-full origin-left bg-arc-teal transition-none will-change-transform"
          style={{
            transform: `scaleX(${p})`,
            opacity: 0.35 + p * 0.65,
          }}
        />
      </div>
      {label ? (
        <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-arc-charcoal/45 tabular-nums">
          {label}
        </span>
      ) : null}
    </div>
  );
}
