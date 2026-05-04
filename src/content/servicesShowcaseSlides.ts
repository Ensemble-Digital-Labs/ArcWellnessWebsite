import { EDITORIAL_SPA_IMAGES } from "@/content/editorialSpaImages";
import { PATIENT_EXPERIENCE_IMAGES } from "@/content/patientExperienceImages";

export type ServicesShowcaseSlide = {
  title: string;
  description: string;
  imageSrc: string;
};

/**
 * Six-slide editorial strip for the Whole-Body Care showcase WebGL slider.
 * Uses on-brand editorial + patient-experience photography from `public/assets/`.
 */
export const SERVICES_SHOWCASE_SLIDES: readonly ServicesShowcaseSlide[] = [
  {
    title: "Quiet luxury",
    description:
      "Spaces and rituals designed to feel intentional—not rushed—so care can breathe.",
    imageSrc: EDITORIAL_SPA_IMAGES[0],
  },
  {
    title: "Whole-body focus",
    description:
      "Care that connects how you look, feel, and move—guided with clarity and restraint.",
    imageSrc: EDITORIAL_SPA_IMAGES[1],
  },
  {
    title: "Precision, calmly delivered",
    description:
      "Medical aesthetics and longevity thinking—aligned to your goals with honest guidance.",
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
