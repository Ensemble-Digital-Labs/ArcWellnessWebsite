"use client";

/** Defer layout refresh while the user is actively touch-scrolling (iOS address bar / momentum). */
let userScrollActiveUntil = 0;

export function markArcUserScrolling() {
  userScrollActiveUntil = performance.now() + 520;
}

/** @deprecated Use {@link markArcUserScrolling} */
export const markArcNativeUserScrolling = markArcUserScrolling;

export function shouldDeferArcScrollLayoutRefresh(): boolean {
  return performance.now() < userScrollActiveUntil;
}

/** @deprecated Use {@link shouldDeferArcScrollLayoutRefresh} */
export const shouldDeferArcNativeLayoutRefresh = shouldDeferArcScrollLayoutRefresh;

/** Document scroll on touch — always `window`, never `documentElement.scrollTop`. */
export function arcNativeScrollToY(y: number) {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: Math.max(0, y), left: window.scrollX, behavior: "auto" });
}
