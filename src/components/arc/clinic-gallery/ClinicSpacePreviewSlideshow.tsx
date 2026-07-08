"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { ClinicCarouselSlide } from "@/components/arc/ArcClinicCarouselSection";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 5500;

type ClinicSpacePreviewSlideshowProps = {
  slides: readonly ClinicCarouselSlide[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onOpenGallery: () => void;
  reduceMotion: boolean;
  className?: string;
  galleryReturnFocusRef?: RefObject<HTMLButtonElement | null>;
};

function slideTitle(label: string) {
  return label.replace(/^\d+\s*\/\s*/, "");
}

export function ClinicSpacePreviewSlideshow({
  slides,
  activeIndex,
  onActiveIndexChange,
  onOpenGallery,
  reduceMotion,
  className,
  galleryReturnFocusRef,
}: ClinicSpacePreviewSlideshowProps) {
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const slide = slides[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      onActiveIndexChange(((index % count) + count) % count);
    },
    [count, onActiveIndexChange],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (reduceMotion || paused || count <= 1) return;
    const timer = window.setInterval(() => goNext(), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, count, goNext, paused, reduceMotion]);

  useEffect(() => {
    const strip = thumbStripRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-thumb-index="${activeIndex}"]`);
    if (!strip || !thumb) return;
    const target = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2;
    strip.scrollTo({
      left: Math.max(0, target),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reduceMotion]);

  if (!slide) return null;

  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`;
  const progress = count > 1 ? ((activeIndex + 1) / count) * 100 : 100;
  const fadeMs = reduceMotion ? 0 : 450;

  return (
    <div
      className={cn("w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mb-4 flex h-7 items-center justify-start">
        <button
          ref={galleryReturnFocusRef}
          type="button"
          onClick={onOpenGallery}
          className="font-serif text-base italic text-arc-teal-ink underline-offset-[0.2em] transition-colors hover:text-arc-charcoal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream/90 sm:text-lg"
        >
          View full gallery
        </button>
      </div>

      <div className="h-px w-full overflow-hidden bg-arc-charcoal/10" aria-hidden>
        <div
          className="h-full bg-arc-teal transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="group relative mt-4">
        <button
          type="button"
          onClick={onOpenGallery}
          className={cn(
            "relative block aspect-[3/2] w-full overflow-hidden rounded-sm bg-arc-charcoal/5",
            "shadow-[0_16px_40px_rgba(44,44,44,0.1)]",
            "transition-shadow duration-300 hover:shadow-[0_20px_48px_rgba(44,44,44,0.14)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream/90",
          )}
          aria-label={`${slide.label}. Open full gallery.`}
        >
          {slides.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.src}
                className={cn(
                  "absolute inset-0 transition-opacity ease-out",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                style={{ transitionDuration: `${fadeMs}ms` }}
                aria-hidden={!isActive}
              >
                <Image
                  src={item.src}
                  alt={isActive ? item.alt : ""}
                  fill
                  className={cn("object-cover", item.objectPosition ?? "object-center")}
                  sizes="(max-width: 1024px) 92vw, 50vw"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            );
          })}

          <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-arc-charcoal/50 px-2 py-1 font-sans text-xs tabular-nums text-white/90 backdrop-blur-[2px]">
            {counter}
          </span>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 min-h-[38%] bg-gradient-to-t from-arc-charcoal/82 via-arc-charcoal/45 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5"
            aria-hidden
          >
            <div className="relative min-h-[4.5rem] sm:min-h-[5rem]">
              {slides.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={`caption-${item.src}`}
                    className={cn(
                      "text-left transition-opacity ease-out",
                      isActive ? "relative opacity-100" : "absolute inset-x-0 bottom-0 opacity-0",
                    )}
                    style={{ transitionDuration: `${fadeMs}ms` }}
                  >
                    <p className="font-serif text-lg font-medium leading-snug text-white sm:text-xl">
                      {slideTitle(item.label)}
                    </p>
                    {item.caption ? (
                      <p className="mt-1.5 line-clamp-2 max-w-[36ch] font-sans text-sm leading-relaxed text-white/88 sm:text-[0.9375rem]">
                        {item.caption}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className={cn(
                "absolute left-3 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-arc-charcoal/40 text-white shadow-sm backdrop-blur-sm",
                "opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100",
                "hover:bg-arc-charcoal/55",
                "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50",
              )}
              aria-label="Previous photo"
            >
              <ChevronLeft className="size-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className={cn(
                "absolute right-3 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-arc-charcoal/40 text-white shadow-sm backdrop-blur-sm",
                "opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100",
                "hover:bg-arc-charcoal/55",
                "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50",
              )}
              aria-label="Next photo"
            >
              <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          ref={thumbStripRef}
          className="mt-4 flex h-14 gap-2 overflow-x-auto overscroll-x-contain sm:h-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Choose a clinic photo"
        >
          {slides.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.src}
                type="button"
                data-thumb-index={index}
                onClick={() => goTo(index)}
                className={cn(
                  "relative h-full w-[3.25rem] shrink-0 overflow-hidden rounded-sm border transition-[border-color,opacity] duration-300 sm:w-16",
                  isActive
                    ? "border-arc-teal ring-2 ring-arc-teal/25"
                    : "border-arc-charcoal/12 opacity-65 hover:border-arc-teal/30 hover:opacity-100",
                )}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className={cn("object-cover", item.objectPosition ?? "object-center")}
                  sizes="64px"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
