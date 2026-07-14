/** Local assets under /public/assets, see public/assets/README.md */
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { RETAIL_IMAGES } from "@/content/retailImages";
/**
 * Stock footage under `/public/assets/videos/`, use `<video>` (+ optional MP4 sources for broad browser support).
 *
 * Available keys you can point **`microStatement`** (or any prop) at:
 * - **`heroBackground`**, ambient oriental spa (often smallest file)
 * - **`spaRoom`**, wide spa room / massage bed
 * - **`treatments.*`**, face care, massage, body wellness, facial mask
 * - **`bodyCareComposition`**, editorial lifestyle
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
    /** Body massage / spa wellness mood, shorter clip. */
    bodyMassageSpa: "/assets/videos/treatments/body-massage-spa-wellness.mov",
    /** Facial mask, skincare, zen spa setting. */
    facialMaskSkincare: "/assets/videos/treatments/facial-mask-skincare-spa.mov",
  },
  /** Editorial composition, products / spa styling. */
  bodyCareComposition: "/assets/videos/lifestyle/body-care-composition.mov",
} as const;

export const images = {
  /** Header wordmark: HD transparent gold RGBA PNG (`public/assets/branding/`). */
  logo: "/assets/branding/arc-wellness-logo-transparent-gold.webp",
  /** Full-bleed hero background, scroll-zoom in `ScrollExpandHero` (mint wall, 4K WebP). */
  heroMedia: "/assets/hero/arc_wellness_mint_wall_hero_HD_4K_web.webp",
  /** Alternate hero plate, entrance glass doors (contact / showcase). */
  heroBg: "/assets/hero/arc-wellness-entrance-glass-doors.webp",
  whoWeAre: "/assets/sections/who-we-are/doctor-consultation-office.webp",
  /**
   * Homepage teal expand card — transparent **cutout** (person only).
   * Master: `public/assets/sections/founder/physician-jabbar-cutout.png` (4K).
   * See smiling/professional pools in `founderPortraits.ts` for other campaigns.
   */
  founderPortrait: "/assets/sections/founder/physician-jabbar-cutout.webp",
  /**
   * About “A Note from Our Founder” — full framed portrait (not the homepage cutout).
   */
  founderNotePortrait: "/assets/sections/founder/physician-professional-01.webp",
  /**
   * Extra portraits for **`#founder`** mosaic only, all under **`/public/assets/sections/founder/`**.
   * (Avoids clinic / service stock used elsewhere.)
   */
  founderGallery: [
    "/assets/sections/founder/physician-professional-02.webp",
    "/assets/sections/founder/physician-professional-03.webp",
    "/assets/sections/founder/physician-professional-04.webp",
    "/assets/sections/founder/physician-smiling-01.webp",
    "/assets/sections/founder/physician-smiling-02.webp",
  ] as const,
  investBanner: "/assets/hero/arc-wellness-lobby-lounge.webp",
  /** Full-bleed membership / cohort band (`SplitPrefooterCTA` on client-showcase). */
  membershipCohortHero: "/assets/sections/who-we-are/biometric-consultation-room.webp",
  services: [
    "/assets/sections/whole-body/facial-aesthetic-treatment.webp",
    "/assets/sections/whole-body/body-contouring-session.webp",
    "/assets/sections/who-we-are/biometric-consultation-room.webp",
    "/assets/hero/arc-wellness-lobby-lounge.webp",
    "/assets/hero/arc_wellness_mint_wall_hero_HD_4K_web.webp",
  ],
  /** Production St. Louis clinic interiors, `public/assets/sections/clinic-interiors/` */
  clinicInteriors: CLINIC_INTERIOR_IMAGES,
  /** Named modality / treatment-room stills, `public/assets/sections/medical-spa-services/` */
  treatmentRooms: MEDICAL_SPA_NAMED_IMAGES,
  /** Retail, supplements, injection bar, financing displays, `public/assets/sections/retail/` */
  retail: RETAIL_IMAGES,
} as const;
