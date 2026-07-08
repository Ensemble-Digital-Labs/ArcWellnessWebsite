import { prefersReducedMotion } from "@/lib/motionPrefs";

/** Locked on first client measure — must match `useStableNativeScroll` (no flip on resize). */
let stableNativeScrollMode: boolean | null = null;

/**
 * Use document scroll instead of Locomotive/Lenis inside `#main`.
 * Only for prefers-reduced-motion — phones use the same Lenis `#main` path as laptop.
 */
export function prefersNativeScroll(): boolean {
  if (typeof window === "undefined") return false;
  return prefersReducedMotion();
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

/** Lenis `#main` on desktop; `document.documentElement` when native proxy is active. */
export function getArcScrollTriggerScroller(): HTMLElement | undefined {
  if (typeof document === "undefined") return undefined;
  if (getStableNativeScroll()) return document.documentElement;
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

/** Pin options — fixed pins on document scroll; transform pins inside Lenis `#main`. */
export function arcScrollTriggerPinOptions(): { pinType: "fixed" } | Record<string, never> {
  if (getStableNativeScroll()) return { pinType: "fixed" };
  const scroller = document.querySelector<HTMLElement>("#main");
  return scroller ? {} : { pinType: "fixed" };
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
