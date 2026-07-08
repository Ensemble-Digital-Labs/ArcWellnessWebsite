"use client";

import { useEffect } from "react";
import { getStableNativeScroll } from "@/lib/arcScrollMode";
import {
  currentScrollYForStabilize,
  refreshDesktopScrollPinLayout,
  refreshNativeScrollPinLayout,
} from "@/lib/arcScrollLayoutRefresh";
import { releaseArcScrollTopGuard } from "@/lib/arcScrollTopGuard";

const RESIZE_DEBOUNCE_MS = 480;

/**
 * Keeps scroll layout in sync when the viewport changes.
 * Desktop Lenis: remeasure Lenis + GSAP pin spacers (debounced).
 * Mobile native: remeasure pin spacers + anchor `#path`.
 */
export function useArcScrollResizeRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let timer: number | undefined;

    const onResize = () => {
      releaseArcScrollTopGuard();

      const pathAnchor = document.getElementById("path");
      const anchorTopBefore = pathAnchor?.getBoundingClientRect().top;
      const scrollBefore = currentScrollYForStabilize();

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (getStableNativeScroll()) {
          refreshNativeScrollPinLayout({
            anchor: pathAnchor,
            anchorTopBefore,
            scrollBefore,
          });
          return;
        }

        refreshDesktopScrollPinLayout({
          anchor: pathAnchor,
          anchorTopBefore,
          scrollBefore,
        });
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, [enabled]);
}
