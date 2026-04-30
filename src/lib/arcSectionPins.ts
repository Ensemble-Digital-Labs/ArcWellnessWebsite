"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motionPrefs";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";

gsap.registerPlugin(ScrollTrigger);

/**
 * One viewport-height of scroll distance while this section stays pinned (ensemble stack model).
 * Must run **after** Locomotive `scrollerProxy` exists — listens for `arc-locomotive-ready`.
 */
export function useArcFullscreenPin(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const trigger = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!trigger || !main) return;

      const endDist = () =>
        main.clientHeight || Math.round(window.innerHeight || 720);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger,
          scroller: main,
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }, trigger);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const onReady = () => {
      queueMicrotask(setup);
    };

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);

    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      onReady();
    }

    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null && document.querySelector("#main")) {
        setup();
      }
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [sectionRef]);
}
