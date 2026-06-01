"use client";

import { useEffect } from "react";
import { prefersNativeScroll } from "@/lib/arcScrollMode";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { initArcScrollReveal } from "@/lib/scrollReveal";

/**
 * Runs ensemble-style `[data-scroll-section]` reveals after Lenis + scrollerProxy exist,
 * or immediately on mobile native-scroll path.
 */
export function ScrollRevealInit() {
  useEffect(() => {
    const run = () => {
      requestAnimationFrame(() => initArcScrollReveal());
    };

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, run as EventListener);

    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      run();
    } else if (prefersNativeScroll()) {
      run();
    }

    return () => {
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, run as EventListener);
    };
  }, []);

  return null;
}
