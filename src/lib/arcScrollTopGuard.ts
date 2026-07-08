"use client";

import { getStableNativeScroll } from "@/lib/arcScrollMode";
import { arcRestoreScrollY, readArcPageScrollY } from "@/lib/arcScrollPosition";
import { isArcModalScrollLockActive } from "@/lib/arcModalScrollLockState";

/** True until the user scrolls or we intentionally navigate to a hash. */
let guardInitialTop = true;
let guardHasHash = false;

function readScrollY(): number {
  return readArcPageScrollY();
}

function scrollToY(y: number) {
  arcRestoreScrollY(y);
}

/** Call once on shell mount — keep refresh at the hero unless URL has a hash. */
export function initArcScrollTopGuard() {
  if (typeof window === "undefined") return;

  guardHasHash = Boolean(window.location.hash && window.location.hash.length > 1);

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  /** Native document scroll — never force y=0 or snap back after GSAP layout. */
  if (getStableNativeScroll()) {
    guardInitialTop = false;
    return;
  }

  guardInitialTop = !guardHasHash;

  if (guardInitialTop) {
    scrollToY(0);
  }
}

/** After pin spacers / ScrollTrigger.refresh — snap back if we never meant to leave the hero. */
export function enforceArcScrollTopAfterLayout() {
  if (!guardInitialTop || guardHasHash) return;
  /** Native document scroll — do not snap back after pin-spacer layout (breaks touch scroll). */
  if (getStableNativeScroll()) return;
  if (isArcModalScrollLockActive()) return;

  const y = readScrollY();
  const heroBand = window.innerHeight * 0.92;
  if (y > 6 && y <= heroBand) {
    scrollToY(0);
  }
}

export function releaseArcScrollTopGuard() {
  guardInitialTop = false;
}

export function isArcScrollTopGuardActive(): boolean {
  return guardInitialTop && !guardHasHash;
}
