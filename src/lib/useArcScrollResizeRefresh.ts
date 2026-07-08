"use client";

import { useEffect } from "react";
import {
  currentScrollYForStabilize,
  refreshDesktopScrollPinLayout,
} from "@/lib/arcScrollLayoutRefresh";
import { releaseArcScrollTopGuard } from "@/lib/arcScrollTopGuard";
import { prefersTouchPointer } from "@/lib/arcTouchDevice";

const RESIZE_DEBOUNCE_MS = 480;

/**
 * Keeps scroll layout in sync when the viewport changes (Lenis + GSAP pin spacers).
 */
export function useArcScrollResizeRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let timer: number | undefined;

    const touch = prefersTouchPointer();

    const onResize = () => {
      releaseArcScrollTopGuard();

      const pathAnchor = document.getElementById("path");
      const anchorTopBefore = pathAnchor?.getBoundingClientRect().top;
      const scrollBefore = currentScrollYForStabilize();

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        refreshDesktopScrollPinLayout({
          anchor: pathAnchor,
          anchorTopBefore,
          scrollBefore,
        });
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    if (!touch) {
      window.visualViewport?.addEventListener("resize", onResize);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, [enabled]);
}
