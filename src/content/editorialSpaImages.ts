/**
 * Editorial / aesthetic imagery, mood & composition for highlighting spa services (heroes, feature strips, lookbooks).
 * See `public/assets/sections/editorial-spa/README.md`.
 *
 * Distinct from **`patientExperienceImages`** (model lifestyle) and **`medicalSpaServiceImages`** (modality shots).
 */

/** Bump when PNGs change, busts browser + WebGL texture cache. */
export const EDITORIAL_SPA_ASSETS_VERSION = "20260607-light";

function editorialSpaAssetPath(path: string): string {
  return `${path}?v=${EDITORIAL_SPA_ASSETS_VERSION}`;
}

export const EDITORIAL_SPA_NAMED_IMAGES = {
  anxietySpotlightCrowd: editorialSpaAssetPath(
    "/assets/sections/editorial-spa/editorial-anxiety-spotlight-crowd.webp",
  ),
} as const;

export const EDITORIAL_SPA_IMAGES = [
  editorialSpaAssetPath("/assets/sections/editorial-spa/editorial-spa-01.webp"),
  editorialSpaAssetPath("/assets/sections/editorial-spa/editorial-spa-02.webp"),
  editorialSpaAssetPath("/assets/sections/editorial-spa/editorial-spa-03.webp"),
  editorialSpaAssetPath("/assets/sections/editorial-spa/editorial-spa-04.webp"),
  editorialSpaAssetPath("/assets/sections/editorial-spa/editorial-spa-05.webp"),
  EDITORIAL_SPA_NAMED_IMAGES.anxietySpotlightCrowd,
] as const;

/** Prior dark editorial plates, rollback only. */
export const EDITORIAL_SPA_IMAGES_PREVIOUS = [
  "/assets/sections/editorial-spa/editorial-spa-01--previous.webp",
  "/assets/sections/editorial-spa/editorial-spa-02--previous.webp",
  "/assets/sections/editorial-spa/editorial-spa-03--previous.webp",
  "/assets/sections/editorial-spa/editorial-spa-04--previous.webp",
  "/assets/sections/editorial-spa/editorial-spa-05--previous.webp",
] as const;

export type EditorialSpaImageSrc = (typeof EDITORIAL_SPA_IMAGES)[number];
