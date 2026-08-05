import { images } from "@/content/site";

/**
 * Sources for the testimonial **SphereImageGrid**, duplicated to fill the sphere.
 * Local mint hero only — avoids Unsplash on the homepage critical path.
 * Swap for approved patient photography when available.
 */
export const testimonialSphereBaseImages = [
  {
    src: images.heroMedia,
    alt: "Arc Wellness",
  },
] as const;

/** ~25–35 reads closer to the reference “sparse shell” than 50+. */
export const TESTIMONIAL_SPHERE_TILE_COUNT = 32;
