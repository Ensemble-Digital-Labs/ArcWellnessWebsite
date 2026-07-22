"use client";

import { useEffect, useRef, type RefObject } from "react";

const SLOP_PX = 8;
const H_DOMINANCE = 1.05;

type Options = {
  /** Called after a horizontal pan ends (use to snap carousels). */
  onHorizontalEnd?: () => void;
  /**
   * When true, attempt horizontal handling even if scrollWidth has not
   * expanded yet (iOS flex carousels often report equal widths until layout settles).
   */
  assumeScrollable?: boolean;
};

/**
 * Enables horizontal overflow scrolling on an element even when an ancestor
 * (e.g. `#main` with `touch-action: pan-y` for Lenis) would otherwise block
 * pan-x on iOS. Vertical page scroll still wins if the gesture is mostly vertical.
 */
export function useArcTouchHorizontalScroll(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
  options?: Options,
) {
  const onHorizontalEndRef = useRef(options?.onHorizontalEnd);
  onHorizontalEndRef.current = options?.onHorizontalEnd;
  const assumeScrollable = options?.assumeScrollable ?? false;

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let mode: "undecided" | "h" | "v" = "undecided";
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    let lastMode: "undecided" | "h" | "v" = "undecided";

    const canScrollX = () =>
      assumeScrollable || el.scrollWidth > el.clientWidth + 2;

    const onStart = (e: TouchEvent) => {
      if (!canScrollX()) return;
      const t = e.touches[0];
      if (!t) return;
      mode = "undecided";
      lastMode = "undecided";
      startX = t.clientX;
      startY = t.clientY;
      startScroll = el.scrollLeft;
    };

    const onMove = (e: TouchEvent) => {
      if (!canScrollX()) return;
      const t = e.touches[0];
      if (!t) return;

      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (mode === "undecided") {
        if (Math.hypot(dx, dy) < SLOP_PX) return;
        mode = Math.abs(dx) > Math.abs(dy) * H_DOMINANCE ? "h" : "v";
        lastMode = mode;
      }

      if (mode === "h") {
        // Required so Lenis / #main pan-y does not steal the gesture.
        e.preventDefault();
        el.scrollLeft = startScroll - dx;
      }
    };

    const onEnd = () => {
      const ended = lastMode;
      mode = "undecided";
      lastMode = "undecided";
      if (ended === "h") onHorizontalEndRef.current?.();
    };

    // Take over hit-testing for this strip; JS decides h vs v.
    const prevTouchAction = el.style.touchAction;
    el.style.touchAction = "none";

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });

    return () => {
      el.style.touchAction = prevTouchAction;
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [enabled, ref, assumeScrollable]);
}
