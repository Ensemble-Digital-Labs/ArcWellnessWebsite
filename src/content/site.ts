/** Local assets under /public/assets — see public/assets/README.md */
/**
 * Stock footage under `/public/assets/videos/` — use `<video>` (+ optional MP4 sources for broad browser support).
 *
 * Available keys you can point **`microStatement`** (or any prop) at:
 * - **`heroBackground`** — ambient oriental spa (often smallest file)
 * - **`spaRoom`** — wide spa room / massage bed
 * - **`treatments.*`** — face care, massage, body wellness, facial mask
 * - **`bodyCareComposition`** — editorial lifestyle
 */
const HERO_SPA_ORIENTAL = "/assets/videos/hero/spa-background-oriental-therapy.mov";

export const videos = {
  /** Ambient / hero-friendly loop (smallest file of the set). */
  heroBackground: HERO_SPA_ORIENTAL,
  /** Spacious spa room, massage bed centered. */
  spaRoom: "/assets/videos/environment/spa-room-massage-bed.mov",
  /**
   * First pinned micro strip on the homepage (“Intentional care…”). Reassign to any file in
   * this object (e.g. **spaRoom**, **treatments.bodyMassageSpa**, **bodyCareComposition**).
   */
  microStatement: HERO_SPA_ORIENTAL,
  treatments: {
    faceCareCosmetologist: "/assets/videos/treatments/face-care-cosmetologist.mov",
    faceMassageRelaxing: "/assets/videos/treatments/face-massage-relaxing.mov",
    faceHeadMassage: "/assets/videos/treatments/face-head-massage.mov",
    /** Body massage / spa wellness mood — shorter clip. */
    bodyMassageSpa: "/assets/videos/treatments/body-massage-spa-wellness.mov",
    /** Facial mask, skincare, zen spa setting. */
    facialMaskSkincare: "/assets/videos/treatments/facial-mask-skincare-spa.mov",
  },
  /** Editorial composition — products / spa styling. */
  bodyCareComposition: "/assets/videos/lifestyle/body-care-composition.mov",
} as const;

export const images = {
  /** Header wordmark — RGBA PNG (`scripts/make-logo-transparent.cjs` removes cream plate from source art). */
  logo: "/assets/branding/arc-wellness-logo-v3.png",
  heroBg: "/assets/hero/arc-wellness-exterior-sunset.png",
  heroMedia: "/assets/hero/arc-wellness-reception-entrance.png",
  heroCtaSeeHowItWorksPreview: "/assets/hero/hero-cta-see-how-it-works-preview.png",
  whoWeAre: "/assets/sections/who-we-are/doctor-consultation-office.png",
  /**
   * Founder — Dr. Danish Jabbar. Default: **professional** (formal) lead; use smiling variant for warmer campaigns
   * (`PHYSICIAN_SMILING_PORTRAITS` in `founderPortraits.ts`).
   */
  founderPortrait: "/assets/sections/founder/physician-professional-01.png",
  /**
   * Extra portraits for **`#founder`** mosaic only — all under **`/public/assets/sections/founder/`**.
   * (Avoids clinic / service stock used elsewhere.)
   */
  founderGallery: [
    "/assets/sections/founder/physician-professional-02.png",
    "/assets/sections/founder/physician-professional-03.png",
    "/assets/sections/founder/physician-professional-04.png",
    "/assets/sections/founder/physician-smiling-01.png",
    "/assets/sections/founder/physician-smiling-02.png",
  ] as const,
  investBanner: "/assets/hero/arc-wellness-lobby-lounge.png",
  services: [
    "/assets/sections/whole-body/facial-aesthetic-treatment.png",
    "/assets/sections/whole-body/body-contouring-session.png",
    "/assets/sections/who-we-are/biometric-consultation-room.png",
    "/assets/hero/arc-wellness-lobby-lounge.png",
    "/assets/hero/arc-wellness-reception-entrance.png",
  ],
} as const;
