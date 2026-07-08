import type { ArcChapterHeroCanvasTile } from "@/components/arc/ArcChapterHeroImageCanvas";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";

/**
 * Treatments hub hero, triangular canvas (same layout as About):
 *        [Emface top]
 * [ExoMind]         [EmSella]
 */
export const TREATMENTS_HERO_CANVAS_TILES: readonly ArcChapterHeroCanvasTile[] = [
  {
    src: MEDICAL_SPA_NAMED_IMAGES.emfaceForeheadRedLightTreatment,
    alt: "Emface forehead treatment with red-light applicator at ARC Wellness",
    placement: "left-1/2 top-0 z-30 -translate-x-1/2",
    widthClass: "w-[min(54%,260px)] lg:w-[min(52%,290px)]",
    aspectClass: "aspect-[3/4]",
    rotate: 5,
    order: 0,
    enterFrom: { x: 0, y: 48, scale: 0.92, rotate: 10 },
    scrollSpread: { x: 0, y: -8, rotate: 0 },
  },
  {
    src: MEDICAL_SPA_NAMED_IMAGES.exomindBtlConsoleTreatmentBed,
    alt: "ExoMind BTL console and treatment bed at ARC Wellness",
    placement: "bottom-0 left-0 z-10 sm:bottom-1",
    widthClass: "w-[min(50%,260px)] lg:w-[min(48%,280px)]",
    aspectClass: "aspect-[4/5]",
    rotate: -6,
    order: 1,
    enterFrom: { x: -24, y: 40, scale: 0.92, rotate: -12 },
    scrollSpread: { x: 0, y: 6, rotate: 0 },
  },
  {
    src: MEDICAL_SPA_NAMED_IMAGES.emsellaBtlChairRoom,
    alt: "EmSella BTL chair in a bright treatment room at ARC Wellness",
    placement: "bottom-0 right-0 z-10 sm:bottom-1",
    widthClass: "w-[min(44%,228px)] lg:w-[min(42%,248px)]",
    aspectClass: "aspect-[4/5]",
    rotate: 6.5,
    order: 2,
    enterFrom: { x: 24, y: 40, scale: 0.92, rotate: 12 },
    scrollSpread: { x: 0, y: 6, rotate: 0 },
  },
] as const;
