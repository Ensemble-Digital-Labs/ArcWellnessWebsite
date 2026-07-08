"use client";

import { useEffect, useRef, type RefObject } from "react";

const TOUCH_SLOP_PX = 10;
const SWIPE_THRESHOLD_PX = 48;
/** Vertical movement must exceed horizontal by this ratio to count as page scroll. */
const SCROLL_DOMINANCE = 1.15;

/**
 * Horizontal swipe navigation that yields to vertical page scroll on touch devices.
 * Mirrors the gesture split used by the testimonial sphere (`img-sphere.tsx`).
 */
export function useArcHorizontalSwipeNavigate(
  ref: RefObject<HTMLElement | null>,
  {
    onSwipeLeft,
    onSwipeRight,
    onTap,
    enabled = true,
  }: {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    /** Fires on a short touch with no horizontal swipe (does not fire after vertical scroll). */
    onTap?: () => void;
    enabled?: boolean;
  },
) {
  const onSwipeLeftRef = useRef(onSwipeLeft);
  const onSwipeRightRef = useRef(onSwipeRight);
  const onTapRef = useRef(onTap);
  onSwipeLeftRef.current = onSwipeLeft;
  onSwipeRightRef.current = onSwipeRight;
  onTapRef.current = onTap;

  useEffect(() => {
    if (!enabled && !onTap) return;
    const el = ref.current;
    if (!el) return;

    let mode: "undecided" | "scroll" | "nav" = "undecided";
    let startX = 0;
    let startY = 0;

    const reset = () => {
      mode = "undecided";
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      reset();
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch || mode === "scroll") return;

      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (mode === "undecided" && Math.hypot(dx, dy) >= TOUCH_SLOP_PX) {
        if (Math.abs(dy) > Math.abs(dx) * SCROLL_DOMINANCE) {
          mode = "scroll";
        } else if (Math.abs(dx) > Math.abs(dy) * SCROLL_DOMINANCE) {
          mode = "nav";
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (!touch) {
        reset();
        return;
      }
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (enabled && mode === "nav") {
        if (dx <= -SWIPE_THRESHOLD_PX) {
          onSwipeLeftRef.current();
        } else if (dx >= SWIPE_THRESHOLD_PX) {
          onSwipeRightRef.current();
        }
      } else if (
        onTapRef.current &&
        mode === "undecided" &&
        Math.hypot(dx, dy) < TOUCH_SLOP_PX
      ) {
        onTapRef.current();
      }
      reset();
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [enabled, onTap, ref]);
}
