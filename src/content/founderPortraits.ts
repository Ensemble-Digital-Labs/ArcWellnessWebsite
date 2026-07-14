/**
 * Dr. Danish Jabbar, same physician, two editorial sets:
 * - **Smiling**, warm, approachable marketing.
 * - **Professional**, formal, boardroom / clinical tone (not smiling).
 *
 * See `public/assets/sections/founder/README.md`.
 *
 * Homepage teal card uses transparent **cutout**
 * (`/assets/sections/founder/physician-jabbar-cutout.webp`) via `images.founderPortrait`.
 * About founder note uses **`images.founderNotePortrait`** (framed professional).
 * Switch to a smiling/professional path for other campaigns.
 */
export const PHYSICIAN_PROFESSIONAL_PORTRAITS = [
  "/assets/sections/founder/physician-professional-01.webp",
  "/assets/sections/founder/physician-professional-02.webp",
  "/assets/sections/founder/physician-professional-03.webp",
  "/assets/sections/founder/physician-professional-04.webp",
  "/assets/sections/founder/physician-professional-05.webp",
] as const;

export const PHYSICIAN_SMILING_PORTRAITS = [
  "/assets/sections/founder/physician-smiling-01.webp",
  "/assets/sections/founder/physician-smiling-02.webp",
  "/assets/sections/founder/physician-smiling-03.webp",
  "/assets/sections/founder/physician-smiling-04.webp",
  "/assets/sections/founder/physician-smiling-05.webp",
  "/assets/sections/founder/physician-smiling-06.webp",
] as const;

export const ALL_FOUNDER_PORTRAIT_PATHS = [
  ...PHYSICIAN_PROFESSIONAL_PORTRAITS, ...PHYSICIAN_SMILING_PORTRAITS,
] as const;

export type ProfessionalPortraitSrc = (typeof PHYSICIAN_PROFESSIONAL_PORTRAITS)[number];
export type SmilingPortraitSrc = (typeof PHYSICIAN_SMILING_PORTRAITS)[number];
export type FounderPortraitSrc = (typeof ALL_FOUNDER_PORTRAIT_PATHS)[number];
