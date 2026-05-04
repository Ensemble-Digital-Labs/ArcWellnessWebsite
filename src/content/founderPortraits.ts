/**
 * Dr. Danish Jabbar — same physician, two editorial sets:
 * - **Smiling** — warm, approachable marketing.
 * - **Professional** — formal, boardroom / clinical tone (not smiling).
 *
 * See `public/assets/sections/founder/README.md`.
 *
 * `site.ts` **`images.founderPortrait`** uses the **professional** lead by default;
 * switch to `PHYSICIAN_SMILING_PORTRAITS[0]` for a friendlier mood.
 */
export const PHYSICIAN_PROFESSIONAL_PORTRAITS = [
  "/assets/sections/founder/physician-professional-01.png",
  "/assets/sections/founder/physician-professional-02.png",
  "/assets/sections/founder/physician-professional-03.png",
  "/assets/sections/founder/physician-professional-04.png",
  "/assets/sections/founder/physician-professional-05.png",
] as const;

export const PHYSICIAN_SMILING_PORTRAITS = [
  "/assets/sections/founder/physician-smiling-01.png",
  "/assets/sections/founder/physician-smiling-02.png",
  "/assets/sections/founder/physician-smiling-03.png",
  "/assets/sections/founder/physician-smiling-04.png",
  "/assets/sections/founder/physician-smiling-05.png",
  "/assets/sections/founder/physician-smiling-06.png",
] as const;

export const ALL_FOUNDER_PORTRAIT_PATHS = [
  ...PHYSICIAN_PROFESSIONAL_PORTRAITS,
  ...PHYSICIAN_SMILING_PORTRAITS,
] as const;

export type ProfessionalPortraitSrc = (typeof PHYSICIAN_PROFESSIONAL_PORTRAITS)[number];
export type SmilingPortraitSrc = (typeof PHYSICIAN_SMILING_PORTRAITS)[number];
export type FounderPortraitSrc = (typeof ALL_FOUNDER_PORTRAIT_PATHS)[number];
