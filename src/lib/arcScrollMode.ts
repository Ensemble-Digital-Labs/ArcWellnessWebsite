import { prefersReducedMotion } from "@/lib/motionPrefs";

/** Locked on first client measure — must match `useStableNativeScroll` (no flip on resize). */
let stableNativeScrollMode: boolean | null = null;

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

/** First paint / hydration — locks scroll mode for GSAP + `#main` for the session. */
export function initArcStableScrollMode(): boolean {
  if (typeof window === "undefined") return false;
  if (stableNativeScrollMode === null) {
    stableNativeScrollMode = prefersNativeScroll();
  }
  return stableNativeScrollMode;
}

/** Scroll mode locked at load — do not re-read viewport width on resize. */
export function getStableNativeScroll(): boolean {
  if (typeof window === "undefined") return false;
  return stableNativeScrollMode ?? initArcStableScrollMode();
}

/** Locomotive scroll container; `undefined` = window/document scroll. */
export function getArcScrollTriggerScroller(): HTMLElement | undefined {
  if (getStableNativeScroll()) return undefined;
  return document.querySelector<HTMLElement>("#main") ?? undefined;
}

export function getArcScrollViewportHeight(scroller?: HTMLElement | null): number {
  const visual =
    typeof window !== "undefined" ? window.visualViewport?.height : undefined;
  const windowH =
    typeof window !== "undefined" ? window.innerHeight || 720 : 720;
  const base = Math.round(visual ?? windowH);

  if (scroller) {
    const scrollerH = scroller.clientHeight;
    return Math.max(520, scrollerH || base);
  }

  return Math.max(520, base);
}

/** Pin scrub length — scales with viewport height (floored so short laptops still scroll). */
export function getArcPinScrollDistance(
  multiplier: number,
  scroller?: HTMLElement | null,
): number {
  return Math.round(
    getArcScrollViewportHeight(scroller) * Math.max(0.2, multiplier),
  );
}

/** Pass into ScrollTrigger.create when a custom scroller is required. */
export function arcScrollTriggerScrollerProps():
  | { scroller: HTMLElement }
  | Record<string, never> {
  const scroller = getArcScrollTriggerScroller();
  return scroller ? { scroller } : {};
}

/** Pin options when scroll runs on the document (mobile native path). */
export function arcScrollTriggerPinOptions(): { pinType: "fixed" } | Record<string, never> {
  return getArcScrollTriggerScroller() ? {} : { pinType: "fixed" };
}

/**
 * Fixed header chrome (logo, menu) sits above `#main`; wheel there does not reach Lenis.
 * Re-dispatch on `#main` so speed/easing match normal page scroll.
 */
export function forwardWheelEventToLenis(event: WheelEvent): void {
  if (getStableNativeScroll()) return;
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
