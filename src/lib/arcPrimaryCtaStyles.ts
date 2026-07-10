import { cn } from "@/lib/utils";

/** Teal pill — primary booking / section CTA (matches nav “Book now”). */
export const ARC_PRIMARY_CTA_CLASS = cn(
  "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full",
  "border border-arc-teal bg-arc-teal px-5 py-2.5",
  "font-sans text-xs font-bold uppercase tracking-[0.14em] text-white",
  "shadow-[0_4px_20px_rgba(131,208,187,0.35)]",
  "transition-[filter,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:brightness-105 hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream/80",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
  "sm:px-6 sm:py-3 sm:text-sm",
);
