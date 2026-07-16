export type ServicesShowcaseSlide = {
  title: string;
  description: string;
  imageSrc: string;
  /** Uppercase label above the slide title (`mb-2` line); defaults to whole-body care. */
  eyebrow?: string;
  /** Bottom nav chip text (often shorter); defaults to `title`. */
  navLabel?: string;
};

export const SERVICES_SHOWCASE_DEFAULT_EYEBROW = "Whole-body care";

export function servicesShowcaseEyebrow(slide: ServicesShowcaseSlide): string {
  return slide.eyebrow ?? SERVICES_SHOWCASE_DEFAULT_EYEBROW;
}

export function servicesShowcaseNavLabel(slide: ServicesShowcaseSlide): string {
  return slide.navLabel ?? slide.title;
}

/**
 * Six-slide strip for the Whole-Body Care showcase WebGL slider.
 * Photography: `public/assets/sections/whole-body/` pillar assets.
 */
export const SERVICES_SHOWCASE_SLIDES: readonly ServicesShowcaseSlide[] = [
  {
    title: "Longevity",
    description: "Healthy Aging • Hormone Balance • Metabolic Health",
    imageSrc: "/assets/sections/whole-body/longevity.webp",
  },
  {
    title: "Strength & Performance",
    description: "Core Strength • Pelvic Health • Mental Performance",
    imageSrc: "/assets/sections/whole-body/strength-and-performance.webp",
  },
  {
    title: "Advanced Therapies",
    description: "IV Infusions • Peptides • Targeted Supplements",
    imageSrc: "/assets/sections/whole-body/advanced-therapies.webp",
  },
  {
    title: "Aesthetic Rejuvenation",
    description: "Natural-Looking Results • Healthy Skin • Lasting Confidence",
    imageSrc: "/assets/sections/whole-body/aesthetic-rejuvenation.webp",
  },
  {
    title: "Personalized Wellness",
    description: "Physician Consultation • Root Cause Medicine • Advanced Lab Testing",
    imageSrc: "/assets/sections/whole-body/personalized-wellness.webp",
  },
  {
    title: "Confidence in the Details",
    description: "Warm Welcome • Personalized Guidance • Ongoing Support",
    imageSrc: "/assets/sections/whole-body/confidence-in-the-details.webp",
  },
];
