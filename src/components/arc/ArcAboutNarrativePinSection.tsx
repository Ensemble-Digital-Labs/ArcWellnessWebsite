"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcPinProgressRail } from "@/components/arc/ArcPinProgressRail";
import { ArcScrollRevealMask, ArcScrollSplitReveal } from "@/components/arc/ArcScrollSplitReveal";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcStandardCta } from "@/components/arc/ArcStandardCta";
import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_SPLIT_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import {
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { pathPinFadeUp } from "@/lib/arcPinReveal";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcAboutNarrativePinSectionProps = {
  id?: string;
  title: string;
  titleEmphasis: string;
  storyLines: readonly string[];
  sideImageSrc?: string;
  sideImageAlt?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** `pin-scrub` locks viewport; `enter-once` reveals lines automatically when scrolled into view. */
  motion?: "pin-scrub" | "enter-once";
  headlineEmphasisTone?: "teal";
  /** Soft cream feather at section top — overlaps previous band (About page seams). */
  topSeam?: boolean;
  /** Soft cream feather at section bottom — eases into next band (About page seams). */
  bottomSeam?: boolean;
};

function useStorySideImageReveal(
  imageRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const el = imageRef.current;
    if (!el) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled || !imageRef.current) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 32, scale: 1.03 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: ARC_VOOBAN_EASE,
            scrollTrigger: {
              trigger: imageRef.current, ...arcScrollTriggerScrollerProps(),
              start: "top 90%",
              once: true,
            },
          },
        );
      }, imageRef.current);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1600);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [enabled, imageRef]);
}

const storySideImageFrameClass =
  "group relative overflow-hidden rounded-sm border border-arc-charcoal/8 bg-arc-cream-deep shadow-[0_20px_48px_rgba(44,44,44,0.1)] motion-reduce:opacity-100 sm:shadow-[0_24px_56px_rgba(44,44,44,0.12)]";

function StorySideImage({
  src,
  alt,
  imageRef,
  aspectClass,
  sizes,
  objectClass,
}: {
  src: string;
  alt: string;
  imageRef: React.RefObject<HTMLDivElement | null>;
  aspectClass: string;
  sizes: string;
  objectClass: string;
}) {
  return (
    <div ref={imageRef} className={cn(storySideImageFrameClass, aspectClass, "w-full")}>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none",
          objectClass,
        )}
        sizes={sizes}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-arc-charcoal/12 via-transparent to-arc-cream/10"
        aria-hidden
      />
    </div>
  );
}

/**
 * Pinned about narrative, scroll scrubs line-by-line text reveal (Vooban-style).
 */
export function ArcAboutNarrativePinSection({
  id,
  title,
  titleEmphasis,
  storyLines,
  sideImageSrc,
  sideImageAlt = "",
  ctaHref,
  ctaLabel,
  motion = "enter-once",
  headlineEmphasisTone = "teal",
  topSeam = false,
  bottomSeam = false,
}: ArcAboutNarrativePinSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sideImageMobileRef = useRef<HTMLDivElement>(null);
  const sideImageDesktopRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const revealSideImage = Boolean(sideImageSrc) && !reduceMotion;
  useStorySideImageReveal(sideImageMobileRef, revealSideImage);
  useStorySideImageReveal(sideImageDesktopRef, revealSideImage);

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

      if (motion === "enter-once") {
        setProgress(1);
        return;
      }

      const scroller = getArcScrollTriggerScroller();
      const lineCount = storyLines.length;
      const endDist = () =>
        Math.round(getArcScrollViewportHeight(scroller) * Math.min(2.2, 0.95 + lineCount * 0.18));

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section, ...arcScrollTriggerScrollerProps(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
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
  }, [reduceMotion, motion, storyLines.length]);

  const pinScrub = motion === "pin-scrub";
  const p = reduceMotion || !pinScrub ? 1 : progress;
  const headerBase = pathPinFadeUp(p, 0, 2.4);
  const headerMotion = {
    ...headerBase,
    opacity: Math.max(0.96, typeof headerBase.opacity === "number" ? headerBase.opacity : 0),
    transform:
      p < 0.02
        ? "translate3d(0, 0, 0)"
        : headerBase.transform,
  };
  const ctaMotion = pathPinFadeUp(p, 0.55, 2.5);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative flex flex-col overflow-hidden bg-arc-cream",
        pinScrub
          ? "min-h-[100dvh]"
          : topSeam
            ? "py-20 sm:py-24"
            : "border-t border-arc-charcoal/8 py-20 sm:py-24",
      )}
    >
      {topSeam ? <ArcSectionSeamBlend edge="top" scope="background" /> : null}
      {pinScrub ? (
        <ArcPinProgressRail
          progress={p}
          label={`${String(Math.min(storyLines.length, Math.ceil(p * storyLines.length) || 1)).padStart(2, "0")} / ${String(storyLines.length).padStart(2, "0")}`}
        />
      ) : null}

      <div
        className={cn(
          "relative z-10 mx-auto w-full px-6 sm:px-10 md:px-12",
          pinScrub ? "min-h-[100dvh] py-20" : "py-0",
          sideImageSrc
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-stretch lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] xl:gap-14"
            : "flex flex-col justify-center",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        <div className="min-w-0">
          <div style={headerMotion}>
            <ArcScrollRevealMask className="overflow-visible pb-[0.12em]">
              <h2
                className={cn(
                  "max-w-full text-balance text-arc-charcoal",
                  ARC_SPLIT_HEADLINE_SERIF_CLASS,
                )}
              >
                <span className="block">{title}</span>
                <TitleEmphasis
                  className={cn(
                    arcHeadlineEmphasisClass(headlineEmphasisTone),
                    "mt-2 block max-w-full text-balance leading-[1.06] sm:leading-[1.04]",
                  )}
                >
                  {titleEmphasis}
                </TitleEmphasis>
              </h2>
            </ArcScrollRevealMask>
          </div>

          {sideImageSrc ? (
            <div className="mt-8 w-full max-w-md sm:mt-10 lg:hidden">
              <StorySideImage
                src={sideImageSrc}
                alt={sideImageAlt}
                imageRef={sideImageMobileRef}
                aspectClass="aspect-[4/3] sm:aspect-[5/4]"
                sizes="(max-width: 1023px) 100vw, 0px"
                objectClass="object-cover object-[50%_42%]"
              />
            </div>
          ) : null}

          <ArcScrollSplitReveal
            className={cn(
              "max-w-3xl",
              sideImageSrc ? "mt-8 sm:mt-10 lg:mt-12" : "mt-10 sm:mt-12 md:mt-14",
            )}
            lines={storyLines}
            scrubProgress={pinScrub ? p : undefined}
            lineClassName={cn(ARC_EDITORIAL_BODY_CLASS, "text-arc-charcoal/92")}
          />

          {ctaHref && ctaLabel ? (
            <div className="mt-10 sm:mt-12" style={ctaMotion}>
              <ArcStandardCta href={ctaHref}>{ctaLabel}</ArcStandardCta>
            </div>
          ) : null}
        </div>

        {sideImageSrc ? (
          <aside className="hidden min-w-0 lg:flex lg:sticky lg:top-[14vh] lg:self-start xl:top-20">
            <StorySideImage
              src={sideImageSrc}
              alt={sideImageAlt}
              imageRef={sideImageDesktopRef}
              aspectClass="aspect-[4/5] min-h-[22rem] w-full lg:min-h-[26rem] xl:min-h-[28rem]"
              sizes="(min-width: 1024px) 26vw, 0px"
              objectClass="object-cover object-[50%_42%] lg:object-[48%_38%]"
            />
          </aside>
        ) : null}
      </div>

      {bottomSeam ? <ArcSectionSeamBlend edge="bottom" scope="background" /> : null}
    </section>
  );
}
