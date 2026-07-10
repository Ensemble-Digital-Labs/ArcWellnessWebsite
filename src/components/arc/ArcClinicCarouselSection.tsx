"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcPinProgressRail } from "@/components/arc/ArcPinProgressRail";
import { ArcScrollRevealMask, ArcScrollSplitReveal } from "@/components/arc/ArcScrollSplitReveal";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { voobanLineRevealStyle } from "@/lib/arcVoobanMotion";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import {
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { ARC_VOOBAN_CSS_EASE } from "@/lib/arcVoobanMotion";
import { useHorizontalDragScroll } from "@/lib/useHorizontalDragScroll";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type ClinicCarouselSlide = {
  src: string;
  alt: string;
  label: string;
  caption?: string;
  /** Tailwind object-position utility for crops (e.g. `object-[30%_center]`). */
  objectPosition?: string;
};

type ArcClinicCarouselSectionProps = {
  id?: string;
  title: string;
  titleEmphasis?: string;
  slides: readonly ClinicCarouselSlide[];
  className?: string;
};

export function ArcClinicCarouselSection({
  id,
  title,
  titleEmphasis,
  slides,
  className,
}: ArcClinicCarouselSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinProgress, setPinProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useHorizontalDragScroll(trackRef, !reduceMotion);

  const syncActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(cardCenter - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActiveIndex(best);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => syncActiveFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    syncActiveFromScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, [syncActiveFromScroll, slides.length]);

  useEffect(() => {
    if (reduceMotion) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
      const scroller = getArcScrollTriggerScroller();
      const endDist = () =>
        Math.max(
          Math.round(getArcScrollViewportHeight(scroller) * 1.1),
          Math.round(maxScroll() * 0.45),
        );

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          ...arcScrollTriggerScrollerProps(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setPinProgress(self.progress);
            track.scrollLeft = self.progress * maxScroll();
          },
        });
      }, section);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [reduceMotion, slides.length]);

  const counterLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  const emphasisStyle = titleEmphasis ? voobanLineRevealStyle(pinProgress, 1, 2) : null;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative flex min-h-[100dvh] flex-col overflow-hidden bg-arc-charcoal text-white",
        className,
      )}
    >
      <ArcPinProgressRail
        progress={pinProgress}
        className="[&_span]:text-white/40 [&_div]:bg-white/15 [&_div>div]:bg-arc-teal"
        label={counterLabel}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-arc-charcoal/30 via-transparent to-arc-charcoal/50" aria-hidden />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center py-20 pt-28 sm:pt-32">
        <div className={cn("mb-8 px-6 sm:mb-10 sm:px-10 md:px-12", ARC_PAGE_RAIL_MAX)}>
          <ArcScrollSplitReveal
            className="mt-0"
            lines={[title]}
            scrubProgress={pinProgress}
            lineClassName="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.35rem]"
          />
          {titleEmphasis && emphasisStyle ? (
            <ArcScrollRevealMask className="mt-1">
              <p
                className="font-serif text-3xl font-semibold tracking-tight will-change-[transform,opacity,filter] sm:text-4xl md:text-[2.35rem]"
                style={emphasisStyle}
              >
                <TitleEmphasis className="text-[1.08em] text-arc-teal">{titleEmphasis}</TitleEmphasis>
              </p>
            </ArcScrollRevealMask>
          ) : null}
          <p
            className="mt-4 font-sans text-sm text-white/50"
            style={{ opacity: Math.min(1, Math.max(0, (pinProgress - 0.35) * 2.5)) }}
          >
            <span className="hidden sm:inline">Scroll or </span>drag to explore our St. Louis clinic
          </p>
        </div>

        <div
          ref={trackRef}
          className={cn(
            "flex min-h-0 w-full snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 pt-1 sm:gap-4 sm:px-10 md:px-12",
            "cursor-grab touch-pan-x scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            reduceMotion && "cursor-default",
          )}
          role="region"
          aria-roledescription="carousel"
          aria-label="Clinic photography"
        >
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            const distance = Math.abs(idx - activeIndex);
            const scale = isActive ? 1.08 : Math.max(0.96, 1 - distance * 0.04);

            return (
              <article
                key={slide.src}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-carousel-card
                className={cn(
                  "group relative shrink-0 snap-center overflow-hidden rounded-sm border border-white/10",
                  isActive
                    ? "h-[min(54vh,460px)] w-[min(82vw,580px)]"
                    : "h-[min(42vh,340px)] w-[min(48vw,300px)]",
                )}
                style={{
                  transition: `width 0.35s ${ARC_VOOBAN_CSS_EASE}, height 0.35s ${ARC_VOOBAN_CSS_EASE}, border-color 0.25s ease`,
                  borderColor: isActive ? "rgba(78, 196, 176, 0.45)" : undefined,
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  style={{
                    transform: `scale(${scale})`,
                    transition: `transform 0.5s ${ARC_VOOBAN_CSS_EASE}`,
                  }}
                  sizes="(max-width: 768px) 82vw, 580px"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300"
                  style={{ opacity: isActive ? 1 : 0.85 }}
                />
                <div
                  className="absolute bottom-0 left-0 z-10 p-4 transition-transform duration-500 sm:p-5"
                  style={{
                    transform: isActive ? "translate3d(0, 0, 0)" : "translate3d(0, 8px, 0)",
                    transitionTimingFunction: ARC_VOOBAN_CSS_EASE,
                  }}
                >
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-arc-teal tabular-nums">
                    {slide.label}
                  </p>
                  {slide.caption ? (
                    <p
                      className="mt-1.5 max-w-[28ch] font-serif text-lg font-medium leading-snug text-white sm:text-xl"
                      style={{
                        opacity: isActive ? 1 : 0.72,
                        transition: `opacity 0.35s ${ARC_VOOBAN_CSS_EASE}`,
                      }}
                    >
                      {slide.caption}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className={cn("mt-4 flex justify-center gap-2 px-6", ARC_PAGE_RAIL_MAX)} aria-hidden>
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                idx === activeIndex ? "w-8 bg-arc-teal" : "w-2 bg-white/25",
              )}
              style={{ transitionTimingFunction: ARC_VOOBAN_CSS_EASE }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
