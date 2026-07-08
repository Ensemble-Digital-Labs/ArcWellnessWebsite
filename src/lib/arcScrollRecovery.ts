"use client";

import { resetArcHeaderChrome } from "@/lib/arcHeaderChromeRecovery";
import { getStableNativeScroll } from "@/lib/arcScrollMode";
import {
  refreshDesktopScrollPinLayout,
  refreshNativeScrollPinLayout,
  resizeArcScrollViewport,
} from "@/lib/arcScrollLayoutRefresh";
import { releaseArcScrollTopGuard } from "@/lib/arcScrollTopGuard";
import {
  consumeArcBookingExternalNavigation,
  hasArcBookingExternalNavigation,
  reinitArcLocomotiveScroll,
} from "@/lib/locomotive";

/** Menu drawer / gallery overlays set inline overflow — clear when returning to the page. */
export function clearArcScrollInlineOverflow() {
  if (typeof document === "undefined") return;

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  const main = document.getElementById("main");
  if (main) main.style.overflow = "";
}

function ensureDesktopScrollLock() {
  if (getStableNativeScroll()) return;

  document.documentElement.classList.add("arc-scroll-lock");
  document.body.classList.add("arc-scroll-lock");
}

/**
 * Browser back from Mangomint (bfcache) freezes Lenis RAF and can leave the nav overlay
 * intercepting pointer events. Reset chrome first; reload if user left ARC in the same tab.
 */
export function recoverArcPageAfterReturn() {
  if (typeof window === "undefined") return;

  const fromBooking = consumeArcBookingExternalNavigation();

  resetArcHeaderChrome();
  clearArcScrollInlineOverflow();
  releaseArcScrollTopGuard();
  ensureDesktopScrollLock();

  if (fromBooking) {
    window.location.reload();
    return;
  }

  if (getStableNativeScroll()) {
    refreshNativeScrollPinLayout();
    return;
  }

  if (!reinitArcLocomotiveScroll()) {
    resizeArcScrollViewport();
    refreshDesktopScrollPinLayout();
  }

  window.setTimeout(() => {
    if (getStableNativeScroll()) {
      refreshNativeScrollPinLayout();
      return;
    }
    reinitArcLocomotiveScroll();
    resizeArcScrollViewport();
    refreshDesktopScrollPinLayout();
  }, 450);
}

let recoveryTimer: number | undefined;

export function scheduleArcPageRecovery() {
  if (typeof window === "undefined") return;

  window.clearTimeout(recoveryTimer);
  recoveryTimer = window.setTimeout(() => {
    recoveryTimer = undefined;
    recoverArcPageAfterReturn();
  }, 16);
}

export function shouldRecoverArcPageOnShow(event: PageTransitionEvent): boolean {
  return event.persisted || hasArcBookingExternalNavigation();
}

export function pauseArcScrollForPageHide() {
  clearArcScrollInlineOverflow();
}
