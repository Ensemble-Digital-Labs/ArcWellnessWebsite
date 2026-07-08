"use client";

import { getStableNativeScroll } from "@/lib/arcScrollMode";
import {
  beginArcModalScrollLock,
  endArcModalScrollLock,
  isArcModalScrollLockActive,
} from "@/lib/arcModalScrollLockState";
import { arcRestoreScrollY, captureArcPageScrollY, readArcPageScrollY } from "@/lib/arcScrollPosition";
import { releaseArcScrollTopGuard } from "@/lib/arcScrollTopGuard";

type LocomotiveWindow = Window & {
  locomotiveScroll?: {
    stop?: () => void;
    start?: () => void;
    resize?: () => void;
    lenisInstance?: {
      stop?: () => void;
      start?: () => void;
    };
  };
};

let holdScrollRaf = 0;
let lockedScrollY = 0;

function isInsideGalleryScroller(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("[data-arc-clinic-gallery-scroll]"));
}

function blockPageScrollGesture(event: Event) {
  if (!isArcModalScrollLockActive()) return;
  if (isInsideGalleryScroller(event.target)) return;
  event.preventDefault();
  event.stopPropagation();
}

function startHoldScrollY(y: number) {
  lockedScrollY = y;
  cancelAnimationFrame(holdScrollRaf);

  const tick = () => {
    if (!isArcModalScrollLockActive()) return;
    const current = readArcPageScrollY();
    if (Math.abs(current - lockedScrollY) > 2) {
      arcRestoreScrollY(lockedScrollY);
    }
    holdScrollRaf = requestAnimationFrame(tick);
  };

  holdScrollRaf = requestAnimationFrame(tick);
}

function stopHoldScrollY() {
  cancelAnimationFrame(holdScrollRaf);
  holdScrollRaf = 0;
}

function bindPageScrollBlockers() {
  document.addEventListener("wheel", blockPageScrollGesture, {
    capture: true,
    passive: false,
  });
  document.addEventListener("touchmove", blockPageScrollGesture, {
    capture: true,
    passive: false,
  });

  return () => {
    document.removeEventListener("wheel", blockPageScrollGesture, true);
    document.removeEventListener("touchmove", blockPageScrollGesture, true);
  };
}

/**
 * Pause page scroll for a fullscreen overlay without toggling `#main` overflow
 * (overflow:hidden resets Lenis and jumps to the top).
 */
export function lockArcPageScrollForModal(explicitScrollY?: number): () => void {
  if (typeof window === "undefined") return () => {};

  releaseArcScrollTopGuard();

  const scrollY =
    typeof explicitScrollY === "number" ? explicitScrollY : captureArcPageScrollY();

  beginArcModalScrollLock();
  const unbindGestures = bindPageScrollBlockers();
  startHoldScrollY(scrollY);

  if (getStableNativeScroll()) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    arcRestoreScrollY(scrollY);

    return () => {
      stopHoldScrollY();
      unbindGestures();
      endArcModalScrollLock();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      arcRestoreScrollY(scrollY);
    };
  }

  const loco = (window as LocomotiveWindow).locomotiveScroll;
  loco?.stop?.();
  loco?.lenisInstance?.stop?.();
  arcRestoreScrollY(scrollY);

  return () => {
    stopHoldScrollY();
    unbindGestures();
    endArcModalScrollLock();
    arcRestoreScrollY(scrollY);
    loco?.lenisInstance?.start?.();
    loco?.start?.();
    requestAnimationFrame(() => {
      arcRestoreScrollY(scrollY);
      try {
        loco?.resize?.();
      } catch {
        /* noop */
      }
    });
  };
}

export { isArcModalScrollLockActive } from "@/lib/arcModalScrollLockState";
