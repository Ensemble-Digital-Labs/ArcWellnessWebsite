import type { ArcChapterHeroCanvasTile } from "@/components/arc/ArcChapterHeroImageCanvas";
import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";

/**
 * About hero — triangular canvas (no overlap):
 *        [img1 top]
 * [img2]     [img3]
 */
export const ABOUT_HERO_CANVAS_TILES: readonly ArcChapterHeroCanvasTile[] = [
  {
    src: CLINIC_INTERIOR_IMAGES.consultationLounge,
    alt: CLINIC_INTERIOR_ALT.consultationLounge,
    placement: "left-1/2 top-0 z-30 -translate-x-1/2",
    widthClass: "w-[min(54%,260px)] lg:w-[min(52%,290px)]",
    aspectClass: "aspect-[3/4]",
    rotate: 5,
    order: 0,
    enterFrom: { x: 0, y: -72, scale: 0.84, rotate: 14 },
    scrollSpread: { x: 0, y: -8, rotate: 0 },
  },
  {
    src: CLINIC_INTERIOR_IMAGES.waitingRoomArmchairGoldArt,
    alt: CLINIC_INTERIOR_ALT.waitingRoomArmchairGoldArt,
    placement: "bottom-0 left-0 z-10 sm:bottom-1",
    widthClass: "w-[min(50%,260px)] lg:w-[min(48%,280px)]",
    aspectClass: "aspect-[4/5]",
    rotate: -6,
    order: 1,
    enterFrom: { x: -88, y: 64, scale: 0.84, rotate: -16 },
    scrollSpread: { x: 0, y: 6, rotate: 0 },
  },
  {
    src: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
    alt: CLINIC_INTERIOR_ALT.lobbyReceptionDeskProducts,
    placement: "bottom-0 right-0 z-10 sm:bottom-1",
    widthClass: "w-[min(44%,228px)] lg:w-[min(42%,248px)]",
    aspectClass: "aspect-[4/5]",
    rotate: 6.5,
    order: 2,
    enterFrom: { x: 88, y: 64, scale: 0.84, rotate: 16 },
    scrollSpread: { x: 0, y: 6, rotate: 0 },
  },
] as const;
