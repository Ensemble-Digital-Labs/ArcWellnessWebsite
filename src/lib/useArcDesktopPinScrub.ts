"use client";

import { useStableNativeScroll } from "@/lib/useStableNativeScroll";

/**
 * Full-screen GSAP pin scrub on the Lenis / `#main` desktop scroll path.
 * Off on native-scroll sessions (phones at load). Does not wait on layout locks —
 * pins register on first render so they catch `arc-locomotive-ready`.
 */
export function useArcDesktopPinScrub() {
  const nativeScroll = useStableNativeScroll();
  return !nativeScroll;
}
