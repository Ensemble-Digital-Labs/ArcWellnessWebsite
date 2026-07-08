"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getStableNativeScroll } from "@/lib/arcScrollMode";
import { shouldDeferArcNativeLayoutRefresh } from "@/lib/arcNativeScrollInteraction";

gsap.registerPlugin(ScrollTrigger);

let nativeProxyBound = false;

/**
 * GSAP ScrollTrigger proxy for document scroll (phones / touch).
 * Required for pinned hero + section scrubs to match the Lenis `#main` desktop path.
 */
export function initArcNativeScrollProxy() {
  if (nativeProxyBound || typeof window === "undefined" || !getStableNativeScroll()) {
    return;
  }

  const scroller = document.documentElement;

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        window.scrollTo({ top: value, left: window.scrollX, behavior: "auto" });
        return value;
      }
      return window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: "fixed",
  });

  nativeProxyBound = true;
}

export function refreshArcNativeScrollLayout() {
  if (!nativeProxyBound || shouldDeferArcNativeLayoutRefresh()) return;
  ScrollTrigger.refresh(true);
}
