import type { ArcChapterHeroCanvasTile } from "@/components/arc/ArcChapterHeroImageCanvas";
import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { RETAIL_IMAGES } from "@/content/retailImages";

const TRIANGLE_HERO_TILES = {
  top: {
    placement: "left-1/2 top-0 z-30 -translate-x-1/2",
    widthClass: "w-[min(54%,260px)] lg:w-[min(52%,290px)]",
    aspectClass: "aspect-[3/4]",
    rotate: 5,
    order: 0,
    enterFrom: { x: 0, y: 48, scale: 0.92, rotate: 10 },
    scrollSpread: { x: 0, y: -8, rotate: 0 },
  },
  bottomLeft: {
    placement: "bottom-0 left-0 z-10 sm:bottom-1",
    widthClass: "w-[min(50%,260px)] lg:w-[min(48%,280px)]",
    aspectClass: "aspect-[4/5]",
    rotate: -6,
    order: 1,
    enterFrom: { x: -24, y: 40, scale: 0.92, rotate: -12 },
    scrollSpread: { x: 0, y: 6, rotate: 0 },
  },
  bottomRight: {
    placement: "bottom-0 right-0 z-10 sm:bottom-1",
    widthClass: "w-[min(44%,228px)] lg:w-[min(42%,248px)]",
    aspectClass: "aspect-[4/5]",
    rotate: 6.5,
    order: 2,
    enterFrom: { x: 24, y: 40, scale: 0.92, rotate: 12 },
    scrollSpread: { x: 0, y: 6, rotate: 0 },
  },
} as const;

function triangleHero(
  top: { src: string; alt: string },
  bottomLeft: { src: string; alt: string },
  bottomRight: { src: string; alt: string },
): readonly ArcChapterHeroCanvasTile[] {
  return [
    { ...TRIANGLE_HERO_TILES.top, ...top },
    { ...TRIANGLE_HERO_TILES.bottomLeft, ...bottomLeft },
    { ...TRIANGLE_HERO_TILES.bottomRight, ...bottomRight },
  ];
}

/**
 * NOTE (Financing): 3-window arc set kept for possible restore — Financing hero no longer
 * mounts these (see `FinancingPageContent` → Contact-style silk plate + pearl crest).
 * To bring the windows back: pass `heroCanvasTiles={FINANCING_HERO_CANVAS_TILES}` again.
 */
export const FINANCING_HERO_CANVAS_TILES = triangleHero(
  {
    src: RETAIL_IMAGES.patientFiFinancingBrochure,
    alt: "PatientFi financing brochure at ARC Wellness",
  },
  {
    src: CLINIC_INTERIOR_IMAGES.consultationLounge,
    alt: CLINIC_INTERIOR_ALT.consultationLounge,
  },
  {
    src: RETAIL_IMAGES.arcSupplementShelvingUnits,
    alt: "ARC supplement shelving in the clinic retail area",
  },
);

export const PROGRAMS_HERO_CANVAS_TILES = triangleHero(
  {
    src: CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,
    alt: CLINIC_INTERIOR_ALT.ivTherapyReclinerRoom,
  },
  {
    src: "/assets/sections/who-we-are/biometric-consultation-room.webp",
    alt: "Biometric consultation room at ARC Wellness",
  },
  {
    src: CLINIC_INTERIOR_IMAGES.consultationLounge,
    alt: CLINIC_INTERIOR_ALT.consultationLounge,
  },
);

export const AESTHETICS_HERO_CANVAS_TILES = triangleHero(
  {
    src: MEDICAL_SPA_NAMED_IMAGES.emfaceForeheadRedLightTreatment,
    alt: "Emface forehead treatment at ARC Wellness",
  },
  {
    src: "/assets/sections/whole-body/facial-aesthetic-treatment.webp",
    alt: "Facial aesthetic treatment at ARC Wellness",
  },
  {
    src: CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay,
    alt: CLINIC_INTERIOR_ALT.retailKneskoSkinProductDisplay,
  },
);

/**
 * NOTE (Contact): 3-window arc set kept for possible restore — Contact hero no longer
 * mounts these (see `ContactPageContent` → plate-only `ArcMarketingChapterHero`).
 * To bring the windows back: pass `heroCanvasTiles={CONTACT_HERO_CANVAS_TILES}` again.
 */
export const CONTACT_HERO_CANVAS_TILES = triangleHero(
  {
    src: CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall,
    alt: CLINIC_INTERIOR_ALT.receptionBacklitLogoWall,
  },
  {
    src: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
    alt: CLINIC_INTERIOR_ALT.lobbyReceptionDeskProducts,
  },
  {
    src: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
    alt: CLINIC_INTERIOR_ALT.hallwayAccentSeating,
  },
);
