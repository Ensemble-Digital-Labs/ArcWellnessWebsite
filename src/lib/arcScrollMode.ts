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

/**
 * Fixed header chrome (logo, menu) sits above `#main`; wheel there does not reach Lenis.
 * Re-dispatch on `#main` so speed/easing match normal page scroll.
 */
export function forwardWheelEventToLenis(event: WheelEvent): void {
  if (prefersNativeScroll()) return;
  const main = getArcScrollTriggerScroller();
  if (!main) return;

  main.dispatchEvent(
    new WheelEvent("wheel", {
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      deltaMode: event.deltaMode,
      clientX: event.clientX,
      clientY: event.clientY,
      bubbles: false,
      cancelable: true,
    }),
  );
}
