export type ServicesShowcaseSlide = {
  title: string;
  description: string;
  imageSrc: string;
  /** Uppercase label above the slide title (`mb-2` line); defaults to whole-body care. */
  eyebrow?: string;
  /** Bottom nav chip text (often shorter); defaults to `title`. */
  navLabel?: string;
  /**
   * Mobile/tablet cover focal (0–1), like CSS object-position.
   * `(0.5, 0.2)` is the default (center, upper). Higher `x` pans the crop right.
   * Laptop+ ignores this and uses the shared top crop.
   */
  coverAnchorMobile?: { x: number; y: number };
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
 * Bump `SHOWCASE_ASSETS_VERSION` when replacing rasters so caches drop soft encodes.
 */
const SHOWCASE_ASSETS_VERSION = "20260813-sharp";

function showcaseAsset(src: string) {
  return `${src}?v=${SHOWCASE_ASSETS_VERSION}`;
}

export const SERVICES_SHOWCASE_SLIDES: readonly ServicesShowcaseSlide[] = [
  {
    title: "Longevity",
    description: "Healthy Aging • Hormone Balance • Metabolic Health",
    imageSrc: showcaseAsset("/assets/sections/whole-body/longevity.webp"),
    // Mobile: pan crop right of default center so the subject reads better in tall frames.
    coverAnchorMobile: { x: 0.72, y: 0.2 },
  },
  {
    title: "Strength & Performance",
    description: "Core Strength • Pelvic Health • Mental Performance",
    imageSrc: showcaseAsset(
      "/assets/sections/whole-body/strength-and-performance.webp",
    ),
    coverAnchorMobile: { x: 0.72, y: 0.2 },
  },
  {
    title: "Advanced Therapies",
    description: "IV Infusions • Peptides • Targeted Supplements",
    imageSrc: showcaseAsset(
      "/assets/sections/whole-body/advanced-therapies.webp",
    ),
    coverAnchorMobile: { x: 0.88, y: 0.2 },
  },
  {
    title: "Aesthetic Rejuvenation",
    description: "Natural-Looking Results • Healthy Skin • Lasting Confidence",
    imageSrc: showcaseAsset(
      "/assets/sections/whole-body/aesthetic-rejuvenation.webp",
    ),
  },
  {
    title: "Personalized Wellness",
    description:
      "Physician Consultation • Root Cause Medicine • Advanced Lab Testing",
    imageSrc: showcaseAsset(
      "/assets/sections/whole-body/personalized-wellness.webp",
    ),
  },
  {
    title: "Confidence in the Details",
    description: "Warm Welcome • Personalized Guidance • Ongoing Support",
    imageSrc: showcaseAsset(
      "/assets/sections/whole-body/confidence-in-the-details.webp",
    ),
  },
];
