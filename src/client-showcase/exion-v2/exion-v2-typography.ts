import { cn } from "@/lib/utils";

/** EXION v2 mock typography — client-showcase only. */
export const exionV2Type = {
  /** Treatment card title — serif, all-caps (§3). */
  cardTitle:
    "font-serif text-[clamp(1.05rem,1.65vw,1.35rem)] font-normal uppercase leading-[1.15] tracking-[0.14em] text-arc-charcoal",
  /** Treatment card tagline — italic serif, warm gold-brown (§3). */
  cardTagline:
    "font-serif text-[clamp(0.8rem,1.1vw,0.95rem)] font-normal italic leading-snug text-[#9A7B52] tracking-[0.01em]",
  /** Treatment card body — small sans. */
  cardBody:
    "font-sans text-[11px] leading-[1.72] text-arc-charcoal/72 sm:text-xs sm:leading-[1.75]",
  /** Treatment card bullet line. */
  cardBullet:
    "font-sans text-[10px] leading-snug text-arc-charcoal/68 sm:text-[11px] sm:leading-relaxed",
  /** Section headline — centered serif. */
  sectionHeadline:
    "font-serif text-[clamp(1.75rem,3.6vw,2.65rem)] font-normal leading-[1.1] tracking-[-0.01em] text-arc-charcoal",
  /** Section subhead — sans below headline. */
  sectionSubhead:
    "font-sans text-[11px] leading-relaxed text-arc-charcoal/62 sm:text-xs sm:text-arc-charcoal/65",
  /** Hero §1 — main title line (EXION,). */
  heroTitleLead:
    "block font-serif text-[clamp(2.85rem,6.2vw,4.65rem)] font-bold leading-[0.94] tracking-[-0.02em] text-[#1A1A1A]",
  /** Hero §1 — italic second line (single line, slightly smaller than lead). */
  heroTitleEmphasis:
    "mt-0.5 block font-serif text-[clamp(1.5rem,3.65vw,2.9rem)] font-medium italic leading-[0.98] tracking-[-0.01em] text-[#1A1A1A] whitespace-nowrap",
  /** Hero §1 — eyebrow under headline. */
  heroEyebrow:
    "font-sans text-[11px] font-bold uppercase tracking-[0.32em] text-arc-charcoal/78 sm:text-[12px] sm:tracking-[0.34em]",
  /** Hero §1 — body paragraph. */
  heroBody:
    "max-w-[34rem] font-sans text-[14px] font-medium leading-[1.76] text-arc-charcoal/88 sm:text-[15px] sm:leading-[1.78]",
  /** Hero §1 — pillar title (STIMULATE, etc.). */
  heroPillarTitle:
    "font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A7B52] sm:text-[12px] sm:tracking-[0.2em]",
  /** Hero §1 — pillar description. */
  heroPillarBody:
    "mt-1.5 font-sans text-[11px] font-semibold leading-[1.45] text-arc-charcoal/82 sm:text-[12px]",
  /** Hero §1 — bottom accent bar (inside card). */
  heroMarquee:
    "whitespace-nowrap text-center font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8C7D6A] sm:text-[10px] sm:tracking-[0.24em] lg:text-[11px] lg:tracking-[0.26em]",
  /** Hero §1 — callout eyebrow lines (stacked). */
  heroCalloutEyebrow:
    "font-sans text-[8px] font-bold uppercase leading-[1.35] tracking-[0.14em] text-[#9A7B52] sm:text-[9px] sm:tracking-[0.16em]",
  /** Hero §1 — callout subtitle lines. */
  heroCalloutTitle:
    "font-sans text-[10px] font-semibold leading-[1.4] text-[#5C5348] sm:text-[11px] sm:leading-[1.45]",
} as const;

export function exionV2TypeClass(...keys: (keyof typeof exionV2Type)[]) {
  return cn(...keys.map((key) => exionV2Type[key]));
}
