"use client";

import { useEffect } from "react";
import { ARC_LOCOMOTIVE_READY_EVENT, whenArcLocomotiveReady } from "@/lib/locomotive";
import { initArcScrollReveal } from "@/lib/scrollReveal";

/**
 * Runs ensemble-style `[data-scroll-section]` reveals after Lenis + scrollerProxy exist.
 */
export function ScrollRevealInit() {
  useEffect(() => {
    const run = () => {
      requestAnimationFrame(() => initArcScrollReveal());
    };

    const unregisterReady = whenArcLocomotiveReady(run);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, run as EventListener);

    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      run();
    }

    return () => {
      unregisterReady();
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, run as EventListener);
    };
  }, []);

  return null;
}
