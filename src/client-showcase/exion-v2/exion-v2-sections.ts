/**
 * EXION v2 mockup — seven-section page map (client showcase only).
 *
 * Curved transitions are baked into section composite backgrounds where noted;
 * do not insert standalone wave separators between these sections.
 *
 * @see `/client-showcase/exion-v2`
 */
export const EXION_V2_SECTIONS = [
  {
    id: "hero",
    index: 1,
    label: "Hero",
    tone: "cream",
    headline: "EXION, refinement at every layer.",
    background: "hero-section-background.webp",
  },
  {
    id: "stats",
    index: 2,
    label: "Benefits & statistics",
    tone: "cream",
    headline: "Beautiful skin begins beneath the surface.",
    background: "stats-section-background.webp",
  },
  {
    id: "treatments",
    index: 3,
    label: "Treatment types",
    tone: "cream",
    headline: "Three transformative treatments.",
  },
  {
    id: "why-different",
    index: 4,
    label: "Why EXION is different",
    tone: "dark",
    headline: "Why EXION is different.",
    background: "why-different-section-background.webp",
  },
  {
    id: "experience",
    index: 5,
    label: "The EXION experience",
    tone: "dark",
    headline: "The EXION experience.",
    /** Cream-to-dark wave handoff into §6 — not a full-section bg */
    transitionBackground: "experience-section-background.webp",
  },
  {
    id: "results",
    index: 6,
    label: "Before & after",
    tone: "cream",
    headline: "Real results. Refined confidence.",
  },
  {
    id: "cta",
    index: 7,
    label: "Footer CTA",
    tone: "dark",
    headline: "Your best skin. Starts within.",
    background: "cta-section-background.webp",
  },
] as const;

export type ExionV2SectionId = (typeof EXION_V2_SECTIONS)[number]["id"];

export function exionV2SectionId(id: ExionV2SectionId): string {
  return `exion-v2-${id}`;
}
