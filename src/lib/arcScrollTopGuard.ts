"use client";

import { getArcScrollTriggerScroller } from "@/lib/arcScrollMode";

/** True until the user scrolls or we intentionally navigate to a hash. */
let guardInitialTop = true;
let guardHasHash = false;

function readScrollY(): number {
  const scroller = getArcScrollTriggerScroller();
  if (scroller) return scroller.scrollTop;
  return window.scrollY;
}

function scrollToY(y: number) {
  const target = Math.max(0, y);
  const lenis = (
    window as Window & {
      locomotiveScroll?: {
        lenisInstance?: { scrollTo: (n: number, o?: { immediate?: boolean }) => void };
      };
    }
  ).locomotiveScroll?.lenisInstance;

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

/** Call once on shell mount — keep refresh at the hero unless URL has a hash. */
export function initArcScrollTopGuard() {
  if (typeof window === "undefined") return;

  guardHasHash = Boolean(window.location.hash && window.location.hash.length > 1);
  guardInitialTop = !guardHasHash;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  if (guardInitialTop) {
    scrollToY(0);
  }
}

/** After pin spacers / ScrollTrigger.refresh — snap back if we never meant to leave the hero. */
export function enforceArcScrollTopAfterLayout() {
  if (!guardInitialTop || guardHasHash) return;

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
