"use client";

import { useEffect, type RefObject } from "react";

type Options = {
  /** Multiplier for drag distance → scroll offset */
  sensitivity?: number;
};

/**
 * Pointer drag to scroll a horizontal overflow track (Vooban-style gallery explore).
 */
export function useHorizontalDragScroll(
  trackRef: RefObject<HTMLElement | null>,
  enabled = true,
  options?: Options,
) {
  const sensitivity = options?.sensitivity ?? 1.35;

  useEffect(() => {
    if (!enabled) return;
    const track = trackRef.current;
    if (!track) return;

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;
    let pointerId: number | null = null;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
      track.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || e.pointerId !== pointerId) return;
      const dx = (e.clientX - startX) * sensitivity;
      track.scrollLeft = startScroll - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDragging || (pointerId !== null && e.pointerId !== pointerId)) return;
      isDragging = false;
      pointerId = null;
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      track.style.cursor = "";
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("lostpointercapture", endDrag);

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("lostpointercapture", endDrag);
    };
  }, [trackRef, enabled, sensitivity]);
}
