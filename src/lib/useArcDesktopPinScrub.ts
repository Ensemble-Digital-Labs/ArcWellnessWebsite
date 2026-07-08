"use client";

import { useStableNativeScroll } from "@/lib/useStableNativeScroll";

/**
 * Full-screen GSAP pin scrub — enabled on both Lenis desktop and native document scroll
 * (native uses `pinType: "fixed"` + scroller proxy; see `arcNativeScrollProxy.ts`).
 */
export function useArcDesktopPinScrub() {
  useStableNativeScroll();
  return true;
}
