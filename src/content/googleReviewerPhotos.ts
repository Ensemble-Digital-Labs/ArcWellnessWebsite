/**
 * Google reviewer profile photos (WebP).
 * Prefer `npm run testimonials:google-photos` when Places API works;
 * otherwise drop files under `public/assets/sections/testimonials/reviewers/`
 * and map them here (attribution labels must match `homepage.ts`).
 */
export const GOOGLE_REVIEWER_PHOTOS_VERSION = "20260805h";

/** Attribution label → local WebP path (with cache-bust query). */
export const googleReviewerPhotoByAttribution: Record<string, string> = {
  "Imran S.": `/assets/sections/testimonials/reviewers/imran-s.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
  "Sonya A.": `/assets/sections/testimonials/reviewers/sonya-a.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
  "Srinivasarao B.": `/assets/sections/testimonials/reviewers/srinivasarao-b.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
  "Khadijah Y.": `/assets/sections/testimonials/reviewers/khadijah-y.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
  "Sonya C.": `/assets/sections/testimonials/reviewers/sonya-c.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
  "Dauna B.": `/assets/sections/testimonials/reviewers/dauna-b.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
  "Justin C.": `/assets/sections/testimonials/reviewers/justin-c.webp?v=${GOOGLE_REVIEWER_PHOTOS_VERSION}`,
};
