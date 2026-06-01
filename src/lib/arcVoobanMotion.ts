/**
 * Motion tokens from Vooban extraction (DESIGN.md §6.5) — adapted for ARC brand.
 * Durations: micro ~78ms, small ~150ms, medium ~300ms.
 */

/** GSAP ease — close to Vooban `--ease-out` / power curve entrances */
export const ARC_VOOBAN_EASE = "power4.out";

/** CSS transition / custom cubic (Vooban `--ease-custom` family) */
export const ARC_VOOBAN_CSS_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export const ARC_VOOBAN_DURATION = {
  micro: 0.08,
  small: 0.15,
  medium: 0.3,
  reveal: 0.85,
  pinScrub: 0.75,
} as const;

/** Masked line reveal driven by normalized progress 0–1 */
export function voobanLineRevealStyle(t: number, index = 0, total = 1) {
  const start = index / Math.max(1, total);
  const end = (index + 1.08) / Math.max(1, total);
  const local = Math.min(1, Math.max(0, (t - start) / (end - start)));
  const eased = 1 - (1 - local) ** 2.2;
  return {
    opacity: Math.max(index === 0 ? 0.9 : 0, eased),
    transform: `translate3d(0, ${(1 - eased) * 108}%, 0)`,
    filter: `blur(${(1 - eased) * 5}px)`,
  } as const;
}

/** Word in a headline row */
export function voobanWordRevealStyle(
  wordIndex: number,
  wordCount: number,
  scrollProgress: number,
  baseVisible = 0.92,
) {
  const start = (wordIndex / wordCount) * 0.55;
  const end = start + 0.45 / wordCount;
  const t = Math.min(1, Math.max(0, (scrollProgress - start) / (end - start)));
  const eased = 1 - (1 - t) ** 2.4;
  return {
    opacity: Math.max(baseVisible, eased),
    transform: `translate3d(0, ${(1 - eased) * 100}%, 0)`,
  } as const;
}
