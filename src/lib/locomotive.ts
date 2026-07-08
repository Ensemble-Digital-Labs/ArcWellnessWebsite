"use client";

import LocomotiveScroll from "locomotive-scroll";
import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getStableNativeScroll } from "@/lib/arcScrollMode";
import { enforceArcScrollTopAfterLayout } from "@/lib/arcScrollTopGuard";
import { prefersReducedMotion } from "@/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

/** Fired after Lenis + scrollerProxy + first refresh — pins/scrub must register after this. */
export const ARC_LOCOMOTIVE_READY_EVENT = "arc-locomotive-ready";

const ARC_EXTERNAL_BOOKING_KEY = "arc-booking-external-nav";

let arcLocomotiveReadyFlag = false;
let activeLocomotiveInstance: InstanceType<typeof LocomotiveScroll> | null = null;
let lenisScrollCleanup: (() => void) | null = null;
let scrollerProxyScrollEl: HTMLElement | null = null;

export function isArcLocomotiveReady(): boolean {
  if (typeof window === "undefined") return false;
  return (
    arcLocomotiveReadyFlag ||
    Boolean((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll)
  );
}

/** Run after Lenis exists — safe if the ready event already fired (e.g. late-mounting sections). */
export function whenArcLocomotiveReady(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (isArcLocomotiveReady()) {
    queueMicrotask(fn);
    return () => {};
  }

  const handler = () => queueMicrotask(fn);
  window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, handler as EventListener);
  return () => window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, handler as EventListener);
}

function markArcLocomotiveReady() {
  arcLocomotiveReadyFlag = true;
}

function getLenisFromScroll(inst: InstanceType<typeof LocomotiveScroll> | null) {
  if (!inst) return undefined;
  const withAlt = inst as InstanceType<typeof LocomotiveScroll> & {
    LenisInstance?: InstanceType<typeof LocomotiveScroll>["lenisInstance"];
  };
  return inst.lenisInstance ?? withAlt.LenisInstance;
}

function readArcLocomotiveScrollY(): number {
  const lenis = getLenisFromScroll(activeLocomotiveInstance);
  if (lenis) {
    const s = lenis.scroll as number | { y?: number } | undefined;
    if (typeof s === "number") return s;
    if (s && typeof s === "object" && typeof s.y === "number") return s.y;
  }
  if (scrollerProxyScrollEl) return scrollerProxyScrollEl.scrollTop;
  return 0;
}

function resizeLenisAndRefresh(inst: InstanceType<typeof LocomotiveScroll> | null) {
  const L = getLenisFromScroll(inst);
  if (L && typeof L.resize === "function") {
    try {
      L.resize();
    } catch {
      /* noop */
    }
  }
  ScrollTrigger.refresh();
  enforceArcScrollTopAfterLayout();
}

function ensureScrollerProxy(scrollEl: HTMLElement) {
  if (scrollerProxyScrollEl === scrollEl) return;

  scrollerProxyScrollEl = scrollEl;

  ScrollTrigger.scrollerProxy(scrollEl, {
    scrollTop(value) {
      const L = getLenisFromScroll(activeLocomotiveInstance);
      try {
        if (L) {
          if (arguments.length && typeof value === "number") {
            L.scrollTo(value, { immediate: true });
            return value;
          }
          const scrollPos =
            typeof L.scroll === "number"
              ? L.scroll
              : ((L.scroll as { y?: number })?.y ?? (L.scroll as number) ?? 0);
          return scrollPos;
        }
        return arguments.length ? value : scrollEl.scrollTop || 0;
      } catch {
        return arguments.length ? value : 0;
      }
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollEl.style.transform ? "transform" : "fixed",
  });
}

function bindLenisScrollListener(inst: InstanceType<typeof LocomotiveScroll>) {
  lenisScrollCleanup?.();

  const lenis = getLenisFromScroll(inst);
  if (!lenis || typeof lenis.on !== "function") {
    lenisScrollCleanup = null;
    return;
  }

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);
  lenisScrollCleanup = () => {
    lenis.off?.("scroll", onScroll);
  };
}

/** Tear down Lenis only — keep GSAP ScrollTriggers (bfcache return / booking back). */
export function destroyArcLocomotiveInstanceOnly() {
  lenisScrollCleanup?.();
  lenisScrollCleanup = null;

  if (activeLocomotiveInstance) {
    try {
      activeLocomotiveInstance.destroy();
    } catch {
      /* noop */
    }
    activeLocomotiveInstance = null;
  }

  if (typeof window !== "undefined") {
    delete (window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll;
  }
}

function mountArcLocomotiveScroll(
  scrollEl: HTMLElement,
  contentEl: HTMLElement,
  options?: { restoreScrollY?: number },
): InstanceType<typeof LocomotiveScroll> | null {
  destroyArcLocomotiveInstanceOnly();

  try {
    activeLocomotiveInstance = new LocomotiveScroll({
      lenisOptions: {
        wrapper: scrollEl,
        content: contentEl,
        smoothWheel: true,
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });

    if (typeof window !== "undefined") {
      (window as unknown as { locomotiveScroll: typeof activeLocomotiveInstance }).locomotiveScroll =
        activeLocomotiveInstance;
    }

    bindLenisScrollListener(activeLocomotiveInstance);
    ensureScrollerProxy(scrollEl);

    const restoreY = options?.restoreScrollY;
    if (typeof restoreY === "number" && restoreY > 0) {
      const lenis = getLenisFromScroll(activeLocomotiveInstance);
      lenis?.scrollTo?.(restoreY, { immediate: true });
    }

    resizeLenisAndRefresh(activeLocomotiveInstance);
    activeLocomotiveInstance.start?.();

    return activeLocomotiveInstance;
  } catch (e) {
    console.error("Locomotive Scroll initialization error:", e);
    destroyArcLocomotiveInstanceOnly();
    return null;
  }
}

function getArcLocomotiveElements() {
  const scrollEl = document.getElementById("main");
  if (!scrollEl) return null;

  const contentEl =
    scrollEl.querySelector<HTMLElement>("[data-scroll-content]") ??
    (scrollEl.firstElementChild instanceof HTMLElement ? scrollEl.firstElementChild : null);

  if (!contentEl) return null;
  return { scrollEl, contentEl };
}

/** Full Lenis remount after browser back from Mangomint (bfcache leaves RAF stopped). */
export function reinitArcLocomotiveScroll(): boolean {
  if (typeof window === "undefined" || getStableNativeScroll() || prefersReducedMotion()) {
    return false;
  }

  const elements = getArcLocomotiveElements();
  if (!elements) return false;

  const { scrollEl, contentEl } = elements;
  const scrollBefore = readArcLocomotiveScrollY();

  const inst = mountArcLocomotiveScroll(scrollEl, contentEl, {
    restoreScrollY: scrollBefore,
  });
  if (!inst) return false;

  markArcLocomotiveReady();

  window.setTimeout(() => resizeLenisAndRefresh(inst), 400);
  window.setTimeout(() => {
    resizeLenisAndRefresh(inst);
    ScrollTrigger.refresh(true);
  }, 900);

  window.dispatchEvent(
    new CustomEvent(ARC_LOCOMOTIVE_READY_EVENT, {
      detail: { scrollEl, recovered: true },
    }),
  );

  return true;
}

export function markArcBookingExternalNavigation() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(ARC_EXTERNAL_BOOKING_KEY, "1");
  } catch {
    /* noop */
  }
}

export function consumeArcBookingExternalNavigation(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const pending = sessionStorage.getItem(ARC_EXTERNAL_BOOKING_KEY);
    if (!pending) return false;
    sessionStorage.removeItem(ARC_EXTERNAL_BOOKING_KEY);
    return true;
  } catch {
    return false;
  }
}

export function hasArcBookingExternalNavigation(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(ARC_EXTERNAL_BOOKING_KEY) === "1";
  } catch {
    return false;
  }
}

function isArcBookingHref(href: string): boolean {
  try {
    const url = new URL(href, window.location.href);
    return url.hostname.includes("mangomint.com") || url.pathname.includes("booking.mangomint");
  } catch {
    return href.includes("booking.mangomint.com");
  }
}

export function bindArcBookingNavigationMarker() {
  if (typeof document === "undefined") return () => {};

  const markFromEvent = (event: Event) => {
    const anchor = (event.target as Element | null)?.closest("a");
    if (!anchor?.href || !isArcBookingHref(anchor.href)) return;
    markArcBookingExternalNavigation();
  };

  document.addEventListener("mousedown", markFromEvent, true);
  document.addEventListener("click", markFromEvent, true);

  return () => {
    document.removeEventListener("mousedown", markFromEvent, true);
    document.removeEventListener("click", markFromEvent, true);
  };
}

/**
 * Ensemble v2–style Locomotive Scroll v5 (Lenis) + GSAP ScrollTrigger scroller proxy on `#main`.
 * Pins/scrub must be created after `ARC_LOCOMOTIVE_READY_EVENT` (see useArcFullscreenPin, hero).
 */
export function useLocomotiveScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  disabled: boolean,
) {
  useEffect(() => {
    if (disabled || prefersReducedMotion()) return;

    if (typeof window !== "undefined" && (window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      return;
    }

    let refreshListenerBound = false;

    const timer = window.setTimeout(() => {
      const scrollEl = containerRef.current;
      if (!scrollEl) return;

      const contentEl =
        scrollEl.querySelector<HTMLElement>("[data-scroll-content]") || scrollEl.firstElementChild;
      if (!contentEl || !(contentEl instanceof HTMLElement)) return;

      const inst = mountArcLocomotiveScroll(scrollEl, contentEl);
      if (!inst) return;

      if (!refreshListenerBound) {
        ScrollTrigger.addEventListener("refresh", () => {
          const L = getLenisFromScroll(activeLocomotiveInstance);
          if (L && typeof L.resize === "function") {
            try {
              L.resize();
            } catch {
              /* noop */
            }
          }
        });
        refreshListenerBound = true;
      }

      window.setTimeout(() => resizeLenisAndRefresh(inst), 400);
      window.setTimeout(() => resizeLenisAndRefresh(inst), 1600);
      window.setTimeout(() => ScrollTrigger.refresh(), 800);

      markArcLocomotiveReady();
      window.dispatchEvent(
        new CustomEvent(ARC_LOCOMOTIVE_READY_EVENT, {
          detail: { scrollEl },
        }),
      );

      window.setTimeout(() => ScrollTrigger.refresh(), 50);
    }, 450);

    return () => {
      window.clearTimeout(timer);
      destroyArcLocomotiveInstanceOnly();
      scrollerProxyScrollEl = null;
      arcLocomotiveReadyFlag = false;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [containerRef, disabled]);
}
