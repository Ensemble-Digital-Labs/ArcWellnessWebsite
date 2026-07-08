"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getArcScrollTriggerScroller, getStableNativeScroll } from "@/lib/arcScrollMode";
import { arcNativeScrollToY, shouldDeferArcScrollLayoutRefresh } from "@/lib/arcNativeScrollInteraction";
import { reconcileArcScrollReveals } from "@/lib/scrollReveal";
import { isArcModalScrollLockActive } from "@/lib/arcModalScrollLockState";
import {
  arcRestoreScrollY,
  captureArcPageScrollY,
  readArcPageScrollY,
} from "@/lib/arcScrollPosition";

type LocomotiveWindow = Window & {
  locomotiveScroll?: {
    lenisInstance?: {
      scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
      resize?: () => void;
    };
    resize?: () => void;
  };
};

function scrollToAnchor(anchor: HTMLElement, offset = -112) {
  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;
  if (lenis?.scrollTo) {
    lenis.scrollTo(anchor, { offset, immediate: true });
    return;
  }

  const scroller = getArcScrollTriggerScroller();
  if (scroller) {
    const scrollerTop = scroller.getBoundingClientRect().top;
    const anchorTop = anchor.getBoundingClientRect().top;
    scroller.scrollTop += anchorTop - scrollerTop + offset;
    return;
  }

  const y = anchor.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
}

function getMaxScroll(scroller?: HTMLElement | null): number {
  if (scroller) {
    const content =
      scroller.querySelector<HTMLElement>("[data-scroll-content]") ?? scroller;
    return Math.max(0, content.scrollHeight - scroller.clientHeight);
  }
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function scrollToY(y: number) {
  arcRestoreScrollY(y);
}

/** Exported for resize handlers that capture scroll before layout shifts. */
export function currentScrollYForStabilize(): number {
  return readArcPageScrollY();
}

export { arcRestoreScrollY, captureArcPageScrollY };

/**
 * After pin-spacer / layout height changes, keep an anchor at the same viewport Y
 * so sections below (testimonials, invest) do not flash into view.
 */
export function stabilizeViewportAfterLayoutShift(options: {
  anchor: HTMLElement;
  anchorTopBefore: number;
  scrollBefore?: number;
}) {
  const { anchor, anchorTopBefore, scrollBefore = readArcPageScrollY() } = options;

  /** Pin spacers on first paint look like a layout shift — do not scroll away from the hero. */
  if (scrollBefore < 96) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const delta = anchor.getBoundingClientRect().top - anchorTopBefore;
      if (Math.abs(delta) <= 0.5) return;
      scrollToY(scrollBefore + delta);
    });
  });
}

function clampScrollToDocument() {
  const scroller = getArcScrollTriggerScroller();
  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;

  if (scroller) {
    const content =
      scroller.querySelector<HTMLElement>("[data-scroll-content]") ?? scroller;
    const maxScroll = Math.max(0, content.scrollHeight - scroller.clientHeight);
    const current = lenis ? readArcPageScrollY() : scroller.scrollTop;

    if (current > maxScroll) {
      if (lenis?.scrollTo) lenis.scrollTo(maxScroll, { immediate: true });
      else scroller.scrollTop = maxScroll;
    }
    return;
  }

  const maxScroll = Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  if (window.scrollY > maxScroll) {
    window.scrollTo({ top: maxScroll, behavior: "auto" });
  }
}

/**
 * Lenis / `#main` scroll — remeasure pin spacers after crossing `md` or large resize.
 * Call after React has toggled pin `disabled` on layout sections.
 */
export function refreshDesktopScrollPinLayout(options?: {
  anchor?: HTMLElement | null;
  anchorTopBefore?: number;
  scrollBefore?: number;
}) {
  if (typeof window === "undefined" || getStableNativeScroll()) return;
  if (shouldDeferArcScrollLayoutRefresh()) return;
  if (isArcModalScrollLockActive()) return;

  const pathAnchor = options?.anchor ?? document.getElementById("path");
  const anchorTopBefore =
    options?.anchorTopBefore ?? pathAnchor?.getBoundingClientRect().top;
  const scrollBefore = options?.scrollBefore ?? readArcPageScrollY();

  resizeArcScrollViewport();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      clampScrollToDocument();

      if (pathAnchor && anchorTopBefore !== undefined) {
        stabilizeViewportAfterLayoutShift({
          anchor: pathAnchor,
          anchorTopBefore,
          scrollBefore,
        });
      }
    });
  });
}

/**
 * Mobile native scroll — remeasure GSAP pin spacers after viewport height changes
 * (address bar, rotation). Window scroll avoids Locomotive DOM fights on desktop.
 */
export function refreshNativeScrollPinLayout(options?: {
  anchor?: HTMLElement | null;
  anchorTopBefore?: number;
  scrollBefore?: number;
}) {
  if (typeof window === "undefined" || !getStableNativeScroll()) return;
  if (shouldDeferArcScrollLayoutRefresh()) return;

  const pathAnchor = options?.anchor ?? document.getElementById("path");
  const anchorTopBefore =
    options?.anchorTopBefore ?? pathAnchor?.getBoundingClientRect().top;
  const scrollBefore = options?.scrollBefore ?? readArcPageScrollY();

  requestAnimationFrame(() => {
    if (shouldDeferArcScrollLayoutRefresh()) return;
    requestAnimationFrame(() => {
      if (shouldDeferArcScrollLayoutRefresh()) return;
      ScrollTrigger.refresh(true);
      clampScrollToDocument();

      if (pathAnchor && anchorTopBefore !== undefined) {
        stabilizeViewportAfterLayoutShift({
          anchor: pathAnchor,
          anchorTopBefore,
          scrollBefore,
        });
      }
    });
  });
}

/**
 * Viewport resize only — updates Lenis layout without ScrollTrigger.refresh().
 * GSAP pin-spacer swap during refresh breaks React reconciliation (insertBefore/removeChild).
 */
export function resizeArcScrollViewport() {
  if (typeof window === "undefined") return;

  const loco = (window as LocomotiveWindow).locomotiveScroll;
  try {
    loco?.lenisInstance?.resize?.();
    loco?.resize?.();
  } catch {
    /* noop */
  }
}

/** After DOM height changes (e.g. client-side filters) — resync Lenis, pins, and scroll reveals. */
export function refreshArcScrollLayout(options?: {
  anchor?: HTMLElement | null;
  /** Skip forcing `[data-scroll-section]` visible — use on viewport resize to avoid flashes. */
  skipReveal?: boolean;
}) {
  if (typeof window === "undefined") return;
  if (isArcModalScrollLockActive()) return;

  const { anchor, skipReveal = false } = options ?? {};

  const scrollBefore = currentScrollYForStabilize();
  const scrollerBefore = getArcScrollTriggerScroller();
  const maxScrollBefore = getMaxScroll(scrollerBefore);

  if (anchor) {
    scrollToAnchor(anchor);
  }

  clampScrollToDocument();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const loco = (window as LocomotiveWindow).locomotiveScroll;
      try {
        loco?.lenisInstance?.resize?.();
        loco?.resize?.();
      } catch {
        /* noop */
      }

      ScrollTrigger.refresh(true);
      clampScrollToDocument();

      if (skipReveal && !anchor && maxScrollBefore > 0) {
        const maxScrollAfter = getMaxScroll(getArcScrollTriggerScroller());
        if (maxScrollAfter > 0) {
          const ratio = scrollBefore / maxScrollBefore;
          scrollToY(Math.min(maxScrollAfter, ratio * maxScrollAfter));
        }
      }

      if (!skipReveal) {
        reconcileArcScrollReveals();
      }
    });
  });
}
