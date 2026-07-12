import type { ArcChapterHeroCanvasTile } from "@/components/arc/ArcChapterHeroImageCanvas";

/** Placement slots for centered heroes: one photo left, two stacked right. */
const SPLIT_CENTER_SLOTS = {
  left: {
    placement: "left-[3%] top-1/2 z-10 -translate-y-1/2",
    widthClass: "w-[min(22%,220px)] lg:w-[min(20%,244px)]",
    aspectClass: "aspect-[3/4]",
    rotate: -5,
    enterFrom: { x: -96, y: 0, scale: 0.84, rotate: -14 },
    scrollSpread: { x: -6, y: 0, rotate: 0 },
  },
  rightUpper: {
    placement: "right-[3%] top-[6%] z-10",
    widthClass: "w-[min(21%,208px)] lg:w-[min(19%,232px)]",
    aspectClass: "aspect-[4/5]",
    rotate: 6,
    enterFrom: { x: 96, y: -48, scale: 0.84, rotate: 16 },
    scrollSpread: { x: 6, y: -4, rotate: 0 },
  },
  rightLower: {
    placement: "bottom-[22%] right-[11%] z-10",
    widthClass: "w-[min(18%,188px)] lg:w-[min(16%,204px)]",
    aspectClass: "aspect-[4/5]",
    rotate: -5,
    enterFrom: { x: 76, y: 64, scale: 0.84, rotate: 14 },
    scrollSpread: { x: 4, y: 6, rotate: 0 },
  },
} as const;

type HeroImageRef = Pick<ArcChapterHeroCanvasTile, "src" | "alt" | "order">;

/**
 * Map a triangular 3-tile hero set to the centered split layout
 * (tile order 0 → left, 1 → right upper, 2 → right lower).
 */
export function splitCenterHeroTiles(
  tiles: readonly HeroImageRef[],
): readonly ArcChapterHeroCanvasTile[] {
  const sorted = [...tiles].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const slots = [
    SPLIT_CENTER_SLOTS.left,
    SPLIT_CENTER_SLOTS.rightUpper,
    SPLIT_CENTER_SLOTS.rightLower,
  ] as const;

  return sorted.slice(0, 3).map((tile, index) => ({
    ...slots[index],
    src: tile.src,
    alt: tile.alt,
    order: index,
  }));
}
