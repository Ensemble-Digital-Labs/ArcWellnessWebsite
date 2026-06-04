"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcPinProgressRail } from "@/components/arc/ArcPinProgressRail";
import { ArcStandardCta } from "@/components/arc/ArcStandardCta";
import { ArcVoobanHeadline } from "@/components/arc/ArcVoobanHeadline";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { bindArcEnterOnceProgress } from "@/lib/arcEnterOnceScroll";
import {
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type ScrollChapterFloatingMedia = {
  src: string;
  alt: string;
};

type ScrollChapterIntroSectionProps = {
  id?: string;
  className?: string;
  eyebrow?: string;
  headline?: string;
  body: string;
  imageSrc: string;
  /** Vooban-style overlapping still — offsets into the hero photo column */
  floatingMedia?: ScrollChapterFloatingMedia;
  ctaHref?: string;
  ctaLabel?: string;
  /**
   * `visible-on-load` — copy readable at scroll progress 0 (scroll still adds motion).
   * `scroll-reveal` — fades in from zero as user scrolls (can feel empty on first paint).
   */
  introMode?: "visible-on-load" | "scroll-reveal";
  /** `pin-scrub` locks the viewport while scroll drives motion; `enter-once` plays in on arrival. */
  motion?: "pin-scrub" | "enter-once";
};

/**
 * Second “chapter” after hero: **pin + scrub** on `#main` (locked viewport while scrolling)
 * so progress drives gradient, image pan/scale, and copy motion — split layout uses left
 * copy column and right photography (header logo stays top-left site-wide).
 */
export function ScrollChapterIntroSection({
  id,
  className,
  eyebrow,
  headline,
  body,
  imageSrc,
  floatingMedia,
  ctaHref,
  ctaLabel,
  introMode = "visible-on-load",
  motion = "enter-once",
}: ScrollChapterIntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      if (!section) return;

      let disposeEnterOnce: (() => void) | null = null;

      const ctx = gsap.context(() => {
        if (motion === "enter-once") {
          disposeEnterOnce = bindArcEnterOnceProgress({
            trigger: section,
            onProgress: setProgress,
            playIfVisibleOnLoad: true,
          });
          return;
        }

        const scroller = getArcScrollTriggerScroller();
        const endDist = () =>
          Math.round(getArcScrollViewportHeight(scroller) * 1.12);

        ScrollTrigger.create({
          trigger: section,
          ...arcScrollTriggerScrollerProps(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        });
      }, section);

      revert = () => {
        disposeEnterOnce?.();
        ctx.revert();
      };
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const onReady = () => queueMicrotask(setup);

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);

    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      onReady();
    }

    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [reduceMotion, motion]);

  const p = reduceMotion ? 1 : progress;
  const visibleOnLoad = introMode === "visible-on-load";

  const bodyReveal = visibleOnLoad
    ? Math.min(1, 0.88 + p * 0.14)
    : Math.min(1, Math.max(0, (p - 0.1) * 2.2));
  const ctaReveal = visibleOnLoad
    ? Math.min(1, 0.82 + p * 0.2)
    : Math.min(1, Math.max(0, (p - 0.22) * 2.5));

  const imagePan = p * 10 - 5;
  const imageScale = visibleOnLoad ? 1.06 + p * 0.05 : 1.1 + p * 0.06;
  const bodyDrift = visibleOnLoad ? (0.1 - p) * 10 : (0.4 - p) * 28;
  const gradientMid = visibleOnLoad ? 42 + p * 10 : 36 + p * 14;
  const ruleScale = visibleOnLoad ? Math.min(1, 0.85 + p * 0.2) : Math.min(1, p * 1.45);
  const ruleOpacity = visibleOnLoad ? Math.min(1, 0.7 + p * 0.35) : Math.min(1, p * 1.55);
  const floatReveal = visibleOnLoad
    ? Math.min(1, 0.78 + p * 0.25)
    : Math.min(1, Math.max(0, (p - 0.18) * 2.4));
  const floatY = visibleOnLoad ? (0.35 - p) * 10 : (1 - p) * 18 - 8;
  const floatRotate = visibleOnLoad ? (0.25 - p) * 1.5 : (0.5 - p) * 2.5;
  const eyebrowSlide = {
    opacity: Math.min(1, visibleOnLoad ? 0.88 + p * 0.14 : p * 2),
    transform: `translate3d(${visibleOnLoad ? -14 + p * 14 : -24 + p * 24}px, 0, 0)`,
  };
  const imageRotate = visibleOnLoad ? (0.35 - p) * 1.2 : (0.5 - p) * 2;

  const pinScrub = motion === "pin-scrub";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-arc-cream",
        pinScrub ? "min-h-[100dvh]" : "min-h-[min(90dvh,840px)]",
        className,
      )}
    >
      {pinScrub ? <ArcPinProgressRail progress={p} /> : null}

      {/* Full-bleed photography (locked section — pans while pinned) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-[-8%] will-change-transform"
          style={{
            transform: `translateX(${imagePan}%) scale(${imageScale}) rotate(${imageRotate}deg)`,
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-[55%_center] md:object-[58%_center]"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Progress-driven mist — wide screens: sweep L→R; narrow: top sheet so photo shows below */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{
          background: `linear-gradient(180deg,
            rgba(247, 244, 239, ${0.97 - p * 0.08}) 0%,
            rgba(247, 244, 239, ${0.72 - p * 0.25}) 52%,
            rgba(247, 244, 239, 0) 100%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background: `linear-gradient(100deg,
            rgba(247, 244, 239, ${0.94 - p * 0.12}) 0%,
            rgba(247, 244, 239, ${0.78 - p * 0.2}) ${gradientMid - 6}%,
            rgba(247, 244, 239, ${0.35 - p * 0.28}) ${gradientMid + 8}%,
            rgba(247, 244, 239, 0) ${Math.min(88, gradientMid + 38)}%)`,
        }}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col md:flex-row md:items-stretch",
          pinScrub ? "min-h-[100dvh]" : "min-h-[min(90dvh,840px)]",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        {/* Copy column — uses width so center isn’t consumed by a logo */}
        <div className="flex w-full flex-[1.02] flex-col justify-center bg-arc-cream/92 px-6 py-16 backdrop-blur-[2px] sm:px-10 sm:py-20 md:max-w-[min(100%,34rem)] md:flex-none md:bg-arc-cream/88 md:px-12 md:py-24 lg:px-14">
          {eyebrow ? (
            <p
              className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.28em] text-arc-teal-ink will-change-transform"
              style={eyebrowSlide}
            >
              {eyebrow}
            </p>
          ) : null}

          <div
            className="mb-2 h-16 w-px origin-top bg-arc-charcoal/25 sm:h-20 md:h-24"
            style={{
              transform: `scaleY(${ruleScale})`,
              opacity: ruleOpacity,
            }}
            aria-hidden
          />

          {headline ? (
            <ArcVoobanHeadline
              text={headline}
              scrollProgress={p}
              className="max-w-[22ch] font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-arc-charcoal sm:text-[2rem] md:text-[2.25rem] lg:text-[2.45rem]"
            />
          ) : null}

          <p
            className={cn(
              "max-w-xl font-sans leading-relaxed text-arc-charcoal/88 sm:text-[1.05rem] md:text-lg",
              headline ? "mt-6 sm:mt-7 md:mt-8" : "mt-0",
            )}
            style={{
              opacity: bodyReveal,
              transform: `translateY(${10 + bodyDrift}px)`,
            }}
          >
            {body}
          </p>

          {ctaHref && ctaLabel ? (
            <ArcStandardCta
              href={ctaHref}
              className="mt-8 w-fit sm:mt-10"
              style={{
                opacity: ctaReveal,
                transform: `translateY(${6 + (0.35 - p) * 20}px)`,
              }}
            >
              {ctaLabel}
            </ArcStandardCta>
          ) : null}

          {visibleOnLoad && pinScrub ? (
            <p
              className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-arc-charcoal/45 motion-reduce:hidden"
              style={{ opacity: Math.max(0.35, 0.75 - p * 0.45) }}
              aria-hidden
            >
              Scroll to read our story
            </p>
          ) : null}
        </div>

        {/* Spacer: photo reads on the right; on md+ this flexes so copy doesn’t max out full rail */}
        <div className="relative hidden min-h-[min(40dvh,320px)] flex-1 md:block">
          {floatingMedia ? (
            <div
              className="pointer-events-none absolute right-6 top-[18%] z-20 w-[min(42vw,280px)] motion-reduce:transform-none lg:right-10 lg:top-[14%] lg:w-[min(36vw,320px)]"
              style={{
                opacity: floatReveal,
                transform: `translate3d(0, ${floatY}px, 0) rotate(${floatRotate}deg)`,
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-arc-cream/40 shadow-[0_24px_60px_rgba(44,44,44,0.28)]">
                <Image
                  src={floatingMedia.src}
                  alt={floatingMedia.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 320px, 42vw"
                />
              </div>
            </div>
          ) : null}
        </div>

        {floatingMedia ? (
          <div
            className="relative mx-auto mt-8 aspect-[4/5] w-full max-w-[220px] md:hidden"
            style={{
              opacity: floatReveal,
              transform: `translate3d(0, ${floatY * 0.6}px, 0)`,
            }}
          >
            <div className="relative h-full overflow-hidden rounded-sm border border-arc-charcoal/10 shadow-[0_16px_40px_rgba(44,44,44,0.12)]">
              <Image
                src={floatingMedia.src}
                alt={floatingMedia.alt}
                fill
                className="object-cover"
                sizes="220px"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
