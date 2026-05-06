import { EDITORIAL_SPA_IMAGES } from "@/content/editorialSpaImages";
import { PATIENT_EXPERIENCE_IMAGES } from "@/content/patientExperienceImages";

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
 * Six-slide editorial strip for the Whole-Body Care showcase WebGL slider.
 * Uses on-brand editorial + patient-experience photography from `public/assets/`.
 */
export const SERVICES_SHOWCASE_SLIDES: readonly ServicesShowcaseSlide[] = [
  {
    title: "Aesthetic Optimization",
    description: "Skin, face, body",
    eyebrow: "Aesthetic care",
    navLabel: "Aesthetic optimization",
    imageSrc: EDITORIAL_SPA_IMAGES[0],
  },
  {
    title: "Internal Health",
    description: "Hormones, energy, metabolism",
    eyebrow: "Internal care",
    navLabel: "Internal health",
    imageSrc: EDITORIAL_SPA_IMAGES[1],
  },
  {
    title: "Functional Performance",
    description: "Core, pelvic, posture",
    eyebrow: "Functional care",
    navLabel: "Functional performance",
    imageSrc: EDITORIAL_SPA_IMAGES[2],
  },
  {
    title: "Your rhythm",
    description:
      "A patient journey built around listening first—then tailoring the plan to you.",
    imageSrc: EDITORIAL_SPA_IMAGES[3],
  },
  {
    title: "Elevated environment",
    description:
      "Textures, light, and calm detail—so the experience feels as considered as the outcomes.",
    imageSrc: EDITORIAL_SPA_IMAGES[4],
  },
  {
    title: "Confidence in the details",
    description:
      "From consultation to follow-up—consistent standards and warmth at every touchpoint.",
    imageSrc: PATIENT_EXPERIENCE_IMAGES[0],
  },
];
