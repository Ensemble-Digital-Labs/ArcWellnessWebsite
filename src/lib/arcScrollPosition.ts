"use client";

import { getArcScrollTriggerScroller, getStableNativeScroll } from "@/lib/arcScrollMode";
import { arcNativeScrollToY } from "@/lib/arcNativeScrollInteraction";

type LocomotiveWindow = Window & {
  locomotiveScroll?: {
    lenisInstance?: {
      scroll?: number | { y?: number };
      scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
    };
  };
};

function readTransformScrollY(scroller: HTMLElement): number {
  const content =
    scroller.querySelector<HTMLElement>("[data-scroll-content]") ??
    (scroller.firstElementChild instanceof HTMLElement ? scroller.firstElementChild : null);
  if (!content) return scroller.scrollTop || 0;

  const scrollerTop = scroller.getBoundingClientRect().top;
  const contentTop = content.getBoundingClientRect().top;
  return Math.max(0, scrollerTop - contentTop);
}

/** Read Lenis / document scroll — never trust `#main.scrollTop` alone (stays 0 under Lenis). */
export function readArcPageScrollY(): number {
  if (typeof window === "undefined") return 0;
  if (getStableNativeScroll()) return window.scrollY;

  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;
  const scroller = getArcScrollTriggerScroller();
  const transformY = scroller ? readTransformScrollY(scroller) : 0;

    if (lenis) {
    const candidates: number[] = [transformY];
    const s = lenis.scroll;
    if (typeof s === "number" && Number.isFinite(s)) candidates.push(s);
    if (s && typeof s === "object" && typeof s.y === "number") candidates.push(s.y);

    const lenisRecord = lenis as {
      animatedScroll?: number;
      actualScroll?: number;
      targetScroll?: number;
    };
    if (typeof lenisRecord.animatedScroll === "number") candidates.push(lenisRecord.animatedScroll);
    if (typeof lenisRecord.actualScroll === "number") candidates.push(lenisRecord.actualScroll);
    if (typeof lenisRecord.targetScroll === "number") candidates.push(lenisRecord.targetScroll);

    return Math.max(0, Math.max(...candidates));
  }

  if (scroller) return transformY;
  return window.scrollY;
}

/** Lenis scroll plus transform-derived offset for modal lock / layout stabilize. */
export function captureArcPageScrollY(): number {
  return readArcPageScrollY();
}

export function arcRestoreScrollY(y: number) {
  const target = Math.max(0, y);

  if (getStableNativeScroll()) {
    arcNativeScrollToY(target);
    return;
  }

  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;
  if (lenis?.scrollTo) {
    lenis.scrollTo(target, { immediate: true });
    return;
  }

  const scroller = getArcScrollTriggerScroller();
  if (scroller) {
    scroller.scrollTop = target;
    return;
  }

  window.scrollTo({ top: target, behavior: "auto" });
}
