import { cn } from "@/lib/utils";

/** Frosted glass pill — hero + dark-photo sections (e.g. `#book`). */
export const arcGlassCtaClass = cn(
  "inline-flex items-center justify-center rounded-full",
  "border border-white/35 bg-white/14 px-5 py-2.5 backdrop-blur-md",
  "shadow-[0_8px_28px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.22)]",
  "font-serif text-xs font-black uppercase tracking-[0.12em] text-white",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:border-white/50 hover:bg-white/22 hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black/45",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  "sm:px-6 sm:py-3 sm:text-sm",
);
