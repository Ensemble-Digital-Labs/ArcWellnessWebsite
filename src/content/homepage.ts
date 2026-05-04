/**
 * Homepage narrative blocks — concentrated copy (see `documents/homepage-section-model-reference.md`).
 */

export const homeMicro1 = {
  headlineBefore: "Intentional care,",
  headlineEmphasis: "every step",
  headlineAfter: "",
  uspLine:
    "Aesthetics, wellness, and longevity—designed as one continuous journey in St. Louis.",
  linkHref: "/#about",
  linkLabel: "Explore the practice",
} as const;

/** Edit name, role, and copy with final approved credentials. Photo: `images.founderPortrait` in `site.ts`. */
export const homeFounder = {
  eyebrow: "Your physician",
  headline: "Meet Dr. Danish Jabbar",
  headlineEmphasisWord: "Jabbar",
  roleTitle: "Founder & lead physician",
  intro:
    "Dr. Jabbar founded ARC Wellness to deliver physician-led care that treats aesthetics and whole-body wellness as one plan. He brings hospital-seasoned judgment to every consult—so recommendations stay honest, proportionate, and aligned with how you actually live.",
  deliverablesHeading: "What he delivers",
  deliverables: [
    "Natural-looking aesthetic outcomes—refinement without an “overdone” look",
    "Integrated planning across skin, vitality, and longevity goals you name as priorities",
    "Evidence-informed protocols and transparent options, including when the best advice is to wait or do less",
    "Ongoing partnership: follow-up, adjustment, and accountability—not a one-off visit",
  ] as const,
} as const;

export const homeWelcome = {
  headline: "Where confidence meets calm.",
  headlineEmphasisWord: "confidence",
  paragraph1:
    "ARC Wellness pairs advanced aesthetics with whole-body wellness for people who want to age with intention—not hurry.",
  paragraph2:
    "Every plan stays personal: your pace, your goals, and a medical-aesthetic environment that feels quietly luxurious.",
  proofLead: "Rooted in St. Louis.",
  proofRest: "Concierge continuity from first consult through long-term follow-up.",
  ctaHref: "/#services",
  ctaLabel: "See our pillars of care",
} as const;

export const homeTrustStrip = {
  items: [
    "Evidence-informed protocols",
    "Transparent treatment plans",
    "Space designed for calm",
  ] as const,
} as const;

export const homeMicro2 = {
  eyebrow: "Why ARC",
  headlineBefore: "Results",
  headlineEmphasis: "you can feel",
  headlineAfter: "—without losing yourself.",
  uspLine: "Natural-looking refinement, measurable wellness markers, and a team that respects your timeline.",
  linkHref: "/#path",
  linkLabel: "View your path",
} as const;

export const homeInvestSupport =
  "Reserve a private consult to map aesthetics, vitality, and longevity goals in one cohesive plan.";
