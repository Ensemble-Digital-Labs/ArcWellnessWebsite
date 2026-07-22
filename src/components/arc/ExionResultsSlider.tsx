"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type ExionResultSlide = {
  src: string;
  alt: string;
};

type ExionResultsSliderProps = {
  slides: readonly ExionResultSlide[];
  className?: string;
};

const AUTO_ADVANCE_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;
const SLOP_PX = 8;

/** Intrinsic ratio of EXION before/after plates (~9094×3721). */
const BA_WIDTH = 2444;
const BA_HEIGHT = 1000;

export function ExionResultsSlider({
  slides,
  className,
}: ExionResultsSliderProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const draggingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [fineHover, setFineHover] = useState(false);

  const applyTransform = useCallback((index: number, offsetPx: number, animate: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animate
      ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transform = `translate3d(calc(${-index * 100}% + ${offsetPx}px), 0, 0)`;
  }, []);

  const goTo = useCallback(
    (index: number, animate = true) => {
      const next = ((index % slides.length) + slides.length) % slides.length;
      activeIndexRef.current = next;
      setActiveIndex(next);
      applyTransform(next, 0, animate && !reduceMotion);
    },
    [applyTransform, reduceMotion, slides.length],
  );

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncMotion = () => setReduceMotion(motionMq.matches);
    const syncHover = () => setFineHover(hoverMq.matches);
    syncMotion();
    syncHover();
    motionMq.addEventListener("change", syncMotion);
    hoverMq.addEventListener("change", syncHover);
    return () => {
      motionMq.removeEventListener("change", syncMotion);
      hoverMq.removeEventListener("change", syncHover);
    };
  }, []);

  // Keep transform in sync when reduceMotion flips or slides change.
  useEffect(() => {
    applyTransform(activeIndexRef.current, 0, false);
  }, [applyTransform, slides.length]);

  /**
   * Index + translate carousel (not overflow scroll).
   * Horizontal: preventDefault so #main pan-y / Lenis cannot steal the gesture.
   * Vertical: do not preventDefault — page keeps scrolling.
   */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || slides.length < 2) return;

    let mode: "undecided" | "h" | "v" = "undecided";
    let startX = 0;
    let startY = 0;
    let width = 1;
    let pointerId: number | null = null;

    const begin = (x: number, y: number) => {
      mode = "undecided";
      startX = x;
      startY = y;
      width = el.clientWidth || 1;
      draggingRef.current = true;
      setPaused(true);
      applyTransform(activeIndexRef.current, 0, false);
    };

    const move = (x: number, y: number, prevent: () => void) => {
      const dx = x - startX;
      const dy = y - startY;

      if (mode === "undecided") {
        if (Math.hypot(dx, dy) < SLOP_PX) return;
        mode = Math.abs(dx) > Math.abs(dy) * 1.1 ? "h" : "v";
        if (mode === "v") {
          draggingRef.current = false;
          setPaused(false);
        }
      }

      if (mode !== "h") return;

      prevent();
      const atStart = activeIndexRef.current === 0 && dx > 0;
      const atEnd = activeIndexRef.current === slides.length - 1 && dx < 0;
      const resisted = atStart || atEnd ? dx * 0.35 : dx;
      applyTransform(activeIndexRef.current, resisted, false);
    };

    const finish = (x: number) => {
      const dx = x - startX;
      const wasH = mode === "h";
      mode = "undecided";
      pointerId = null;
      draggingRef.current = false;
      setPaused(false);

      if (!wasH) return;

      if (dx <= -SWIPE_THRESHOLD_PX || dx <= -width * 0.15) {
        goTo(activeIndexRef.current + 1, true);
      } else if (dx >= SWIPE_THRESHOLD_PX || dx >= width * 0.15) {
        goTo(activeIndexRef.current - 1, true);
      } else {
        goTo(activeIndexRef.current, true);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t || e.touches.length > 1) return;
      begin(t.clientX, t.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      move(t.clientX, t.clientY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      finish(t?.clientX ?? startX);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      pointerId = e.pointerId;
      el.setPointerCapture(e.pointerId);
      begin(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      move(e.clientX, e.clientY, () => {
        if (e.cancelable) e.preventDefault();
      });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      finish(e.clientX);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [applyTransform, goTo, slides.length]);

  useEffect(() => {
    if (reduceMotion || paused || slides.length < 2) return;

    const id = window.setInterval(() => {
      if (draggingRef.current) return;
      goTo(activeIndexRef.current + 1, true);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [paused, reduceMotion, goTo, slides.length]);

  if (!slides.length) return null;

  const goPrev = () => goTo(activeIndex - 1, true);
  const goNext = () => goTo(activeIndex + 1, true);

  const arrowClass =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-arc-charcoal/15 bg-white/95 text-arc-charcoal shadow-md transition hover:bg-white";

  return (
    <div className={cn("min-w-0", className)}>
      <div
        className="relative overflow-visible"
        onMouseEnter={() => {
          if (fineHover) setPaused(true);
        }}
        onMouseLeave={() => {
          if (fineHover) setPaused(false);
        }}
      >
        <div
          ref={viewportRef}
          className="cursor-grab touch-pan-y overflow-hidden pb-3 pt-3 active:cursor-grabbing sm:pb-5"
          aria-roledescription="carousel"
          aria-label="EXION before and after results"
        >
          <div ref={trackRef} className="flex w-full will-change-transform">
            {slides.map((slide, i) => (
              <article
                key={slide.src}
                className="w-full min-w-full shrink-0 basis-full px-0"
                aria-label={`Result ${i + 1} of ${slides.length}`}
                aria-hidden={i === activeIndex ? undefined : true}
              >
                <div className="exion-results-lift mx-auto w-full overflow-hidden rounded-none border-y border-arc-teal/12 bg-white p-0 sm:max-w-2xl sm:rounded-2xl sm:border sm:p-2 lg:max-w-3xl">
                  <div className="relative w-full overflow-hidden sm:rounded-xl">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={BA_WIDTH}
                      height={BA_HEIGHT}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
                      className="pointer-events-none h-auto w-full select-none object-contain"
                      draggable={false}
                      priority={i === 0 || i === activeIndex}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous result"
              onClick={goPrev}
              className={cn(
                arrowClass,
                "absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 sm:flex sm:-translate-x-1/3",
              )}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next result"
              onClick={goNext}
              className={cn(
                arrowClass,
                "absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 sm:flex sm:translate-x-1/3",
              )}
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-3 sm:mt-5 sm:gap-2">
          <button
            type="button"
            aria-label="Previous result"
            onClick={goPrev}
            className={cn(arrowClass, "sm:hidden")}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center justify-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Go to result ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                onClick={() => goTo(i, true)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === activeIndex
                    ? "w-6 bg-arc-teal-ink"
                    : "w-2 bg-arc-charcoal/25 hover:bg-arc-charcoal/40",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next result"
            onClick={goNext}
            className={cn(arrowClass, "sm:hidden")}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
