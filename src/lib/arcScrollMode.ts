import { prefersReducedMotion } from "@/lib/motionPrefs";

/**
 * Use document scroll instead of Locomotive/Lenis inside `#main`.
 * Lenis + locked `html/body` overflow breaks touch scrolling on iOS and mobile previews.
 */
export function prefersNativeScroll(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return true;
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return true;
  if (window.matchMedia("(max-width: 767px)").matches) return true;
  return false;
}

/** Locomotive scroll container; `undefined` = window/document scroll. */
export function getArcScrollTriggerScroller(): HTMLElement | undefined {
  if (prefersNativeScroll()) return undefined;
  return document.querySelector<HTMLElement>("#main") ?? undefined;
}

export function getArcScrollViewportHeight(scroller?: HTMLElement | null): number {
  if (scroller) return scroller.clientHeight || window.innerHeight || 720;
  return window.innerHeight || 720;
}

/** Pass into ScrollTrigger.create when a custom scroller is required. */
export function arcScrollTriggerScrollerProps():
  | { scroller: HTMLElement }
  | Record<string, never> {
  const scroller = getArcScrollTriggerScroller();
  return scroller ? { scroller } : {};
}
