/**
 * Editorial / aesthetic imagery — mood & composition for highlighting spa services (heroes, feature strips, lookbooks).
 * See `public/assets/sections/editorial-spa/README.md`.
 *
 * Distinct from **`patientExperienceImages`** (model lifestyle) and **`medicalSpaServiceImages`** (modality shots).
 */
export const EDITORIAL_SPA_IMAGES = [
  "/assets/sections/editorial-spa/editorial-spa-01.png",
  "/assets/sections/editorial-spa/editorial-spa-02.png",
  "/assets/sections/editorial-spa/editorial-spa-03.png",
  "/assets/sections/editorial-spa/editorial-spa-04.png",
  "/assets/sections/editorial-spa/editorial-spa-05.png",
] as const;

export type EditorialSpaImageSrc = (typeof EDITORIAL_SPA_IMAGES)[number];
