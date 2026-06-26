"use client";

import { useEffect } from "react";
import { getStableNativeScroll } from "@/lib/arcScrollMode";
import {
  currentScrollYForStabilize,
  refreshNativeScrollPinLayout,
  resizeArcScrollViewport,
  stabilizeViewportAfterLayoutShift,
} from "@/lib/arcScrollLayoutRefresh";

const RESIZE_DEBOUNCE_MS = 480;

/**
 * Keeps scroll layout in sync when the viewport changes.
 * Desktop Lenis: viewport only — never ScrollTrigger.refresh (React DOM fights).
 * Mobile native: remeasure pin spacers + anchor `#path`.
 */
export function useArcScrollResizeRefresh(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let timer: number | undefined;

    const onResize = () => {
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

        resizeArcScrollViewport();
        if (pathAnchor && anchorTopBefore !== undefined) {
          stabilizeViewportAfterLayoutShift({
            anchor: pathAnchor,
            anchorTopBefore,
            scrollBefore,
          });
        }
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
