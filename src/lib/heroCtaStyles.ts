import { cn } from "@/lib/utils";

/** Solid cream pill — primary hero CTA (reference layout). */
export const heroPrimaryCtaClass = cn(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full",
  "border border-arc-cream/95 bg-arc-cream px-5 py-2.5",
  "font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-arc-charcoal",
  "max-md:px-3.5 max-md:py-2 max-md:text-[0.6875rem] max-md:tracking-[0.11em]",
  "shadow-[0_2px_12px_rgba(0,0,0,0.12)]",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:border-arc-cream-deep hover:bg-arc-cream-deep hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-cream/85 focus-visible:ring-offset-2 focus-visible:ring-offset-black/25",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

/** Ghost cream outline — secondary hero CTA (reference layout). */
export const heroSecondaryCtaClass = cn(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full",
  "border border-arc-cream/85 bg-transparent px-5 py-2.5",
  "font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-arc-cream",
  "max-md:px-3.5 max-md:py-2 max-md:text-[0.6875rem] max-md:tracking-[0.11em]",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:border-arc-cream hover:bg-white/10 hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-cream/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/25",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

/** Solid teal pill — primary hero CTA on a light surface (e.g. textured hero). */
export const heroPrimaryCtaClassLight = cn(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full",
  "border border-arc-teal bg-arc-teal px-5 py-2.5",
  "font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white",
  "max-md:px-3.5 max-md:py-2 max-md:text-[0.6875rem] max-md:tracking-[0.11em]",
  "shadow-[0_6px_20px_var(--arc-teal-glow)]",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:-translate-y-px hover:brightness-[1.04]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

/** Charcoal outline — secondary hero CTA on a light surface. */
export const heroSecondaryCtaClassLight = cn(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full",
  "border border-arc-charcoal/35 bg-transparent px-5 py-2.5",
  "font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-arc-charcoal",
  "max-md:px-3.5 max-md:py-2 max-md:text-[0.6875rem] max-md:tracking-[0.11em]",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:border-arc-charcoal/55 hover:bg-arc-charcoal/[0.05] hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-charcoal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);
