"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getArcScrollTriggerScroller } from "@/lib/arcScrollMode";
import { prefersReducedMotion } from "@/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

type LocomotiveWindow = Window & {
  locomotiveScroll?: {
    lenisInstance?: {
      scroll?: number | { y?: number };
      scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void;
      resize?: () => void;
    };
    resize?: () => void;
  };
};

function currentScrollY(): number {
  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;
  if (lenis) {
    const s = lenis.scroll;
    if (typeof s === "number") return s;
    if (s && typeof s === "object" && typeof s.y === "number") return s.y;
  }
  const main = document.getElementById("main");
  if (main?.classList.contains("touch-pan-y")) return main.scrollTop;
  return window.scrollY;
}

function scrollToAnchor(anchor: HTMLElement, offset = -112) {
  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;
  if (lenis?.scrollTo) {
    lenis.scrollTo(anchor, { offset, immediate: true });
    return;
  }

  const main = document.getElementById("main");
  if (main?.classList.contains("touch-pan-y")) {
    const mainTop = main.getBoundingClientRect().top;
    const anchorTop = anchor.getBoundingClientRect().top;
    main.scrollTop += anchorTop - mainTop + offset;
    return;
  }

  const y = anchor.getBoundingClientRect().top + currentScrollY() + offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
}

function clampScrollToDocument() {
  const scroller = getArcScrollTriggerScroller();
  const lenis = (window as LocomotiveWindow).locomotiveScroll?.lenisInstance;

  if (scroller) {
    const content =
      scroller.querySelector<HTMLElement>("[data-scroll-content]") ?? scroller;
    const maxScroll = Math.max(0, content.scrollHeight - scroller.clientHeight);
    const current = lenis
      ? currentScrollY()
      : scroller.scrollTop;

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

/** After DOM height changes (e.g. client-side filters) — resync Lenis, pins, and scroll reveals. */
export function refreshArcScrollLayout(options?: { anchor?: HTMLElement | null }) {
  if (typeof window === "undefined") return;

  const { anchor } = options ?? {};

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

      if (!prefersReducedMotion()) {
        const viewportH = window.innerHeight || 800;
        document.querySelectorAll("[data-scroll-section]").forEach((node) => {
          const el = node as HTMLElement;
          const rect = el.getBoundingClientRect();
          if (rect.top < viewportH * 1.08 && rect.bottom > -48) {
            gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
          }
        });
      }
    });
  });
}
