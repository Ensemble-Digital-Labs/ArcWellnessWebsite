"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArcChapterHeroImageCanvas,
  ArcChapterHeroImageCanvasMobile,
  type ArcChapterHeroCanvasTile,
} from "@/components/arc/ArcChapterHeroImageCanvas";
import { ArcPinProgressRail } from "@/components/arc/ArcPinProgressRail";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcStandardCta } from "@/components/arc/ArcStandardCta";
import {
  ARC_HEADLINE_TAGLINE_EMPHASIS_DARK_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
  arcHeadlineTaglineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
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
  headline?: string;
  /** Handwriting emphasis (Birthstone), paired with `headline` for serif + script split. */
  headlineEmphasis?: string;
  body: string;
  /** Photography plate for `split-photo` layout only. */
  imageSrc?: string;
  /** `ambient-full`, marble/ambient edge-to-edge; no rear photo or floating inset. */
  layout?: "split-photo" | "ambient-full";
  /** Vooban-style overlapping still, offsets into the hero photo column */
  floatingMedia?: ScrollChapterFloatingMedia;
  ctaHref?: string;
  ctaLabel?: string;
  /**
   * `visible-on-load`, copy readable at scroll progress 0 (scroll still adds motion).
   * `scroll-reveal`, fades in from zero as user scrolls (can feel empty on first paint).
   */
  introMode?: "visible-on-load" | "scroll-reveal";
  /** `pin-scrub` locks the viewport while scroll drives motion; `enter-once` plays in on arrival. */
  motion?: "pin-scrub" | "enter-once";
  /**
   * `wide`, more of the photo visible (less scale/inset); good for clinic interiors.
   * `cinematic`, tighter crop + Ken Burns for pinned homepage-style chapters.
   */
  backgroundFrame?: "wide" | "cinematic";
  /** Tailwind `object-*` position for the background still (e.g. `object-[40%_50%]`). */
  imageObjectPosition?: string;
  /** Ambient art behind the left copy card (crossfades on scroll when multiple). */
  copyColumnAmbients?: readonly string[];
  /** Floating clinic stills on the right for `ambient-full` heroes. */
  heroCanvasTiles?: readonly ArcChapterHeroCanvasTile[];
  /** `compact`, smaller script line for long taglines (treatment detail heroes). */
  headlineEmphasisSize?: "default" | "compact";
  /** Override copy color logic, default auto-detects from `-light` ambient paths. */
  copyTone?: "light" | "dark";
  /** Script emphasis on light plates — teal matches About; rose on dark photography. */
  headlineEmphasisTone?: "teal";
  /** Soft cream feather at section bottom (About page seams). */
  bottomSeam?: boolean;
};

/**
 * Second “chapter” after hero: **pin + scrub** on `#main` (locked viewport while scrolling)
 * so progress drives gradient, image pan/scale, and copy motion, split layout uses left
 * copy column and right photography (header logo stays top-left site-wide).
 */
export function ScrollChapterIntroSection({
  id,
  className,
  headline,
  headlineEmphasis,
  body,
  imageSrc,
  floatingMedia,
  ctaHref,
  ctaLabel,
  introMode = "visible-on-load",
  motion = "enter-once",
  backgroundFrame,
  imageObjectPosition,
  copyColumnAmbients,
  heroCanvasTiles,
  layout = "split-photo",
  headlineEmphasisSize = "default",
  copyTone,
  headlineEmphasisTone,
  bottomSeam = false,
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
            scrollStart: layout === "ambient-full" ? "top 82%" : "top 88%",
          });
          return;
        }

        const scroller = getArcScrollTriggerScroller();
        const endDist = () =>
          Math.round(getArcScrollViewportHeight(scroller) * 1.12);

        ScrollTrigger.create({
          trigger: section, ...arcScrollTriggerScrollerProps(),
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
  }, [reduceMotion, motion, layout]);

  const p = reduceMotion ? 1 : progress;
  const visibleOnLoad = introMode === "visible-on-load";

  const bodyReveal = visibleOnLoad
    ? Math.min(1, 0.88 + p * 0.14)
    : Math.min(1, Math.max(0, (p - 0.1) * 2.2));
  const ctaReveal = visibleOnLoad
    ? Math.min(1, 0.82 + p * 0.2)
    : Math.min(1, Math.max(0, (p - 0.22) * 2.5));

  const wideBackground =
    backgroundFrame === "wide" ||
    (backgroundFrame !== "cinematic" && motion === "enter-once");

  const imagePan = wideBackground ? p * 3 - 1.5 : p * 10 - 5;
  const imageScale = wideBackground
    ? visibleOnLoad
      ? 1 + p * 0.02
      : 1.02 + p * 0.03
    : visibleOnLoad
      ? 1.06 + p * 0.05
      : 1.1 + p * 0.06;
  const imageInset = wideBackground ? "inset-0" : "inset-[-8%]";
  const bgObjectPosition =
    imageObjectPosition ??
    (wideBackground
      ? "object-[36%_40%] md:object-[40%_42%]"
      : "object-[55%_center] md:object-[58%_center]");
  const bodyDrift = visibleOnLoad ? (0.1 - p) * 10 : (0.4 - p) * 28;
  const gradientMid = visibleOnLoad ? 42 + p * 10 : 36 + p * 14;
  const ruleScale = visibleOnLoad ? Math.min(1, 0.85 + p * 0.2) : Math.min(1, p * 1.45);
  const ruleOpacity = visibleOnLoad ? Math.min(1, 0.7 + p * 0.35) : Math.min(1, p * 1.55);
  const floatReveal = visibleOnLoad
    ? Math.min(1, 0.78 + p * 0.25)
    : Math.min(1, Math.max(0, (p - 0.18) * 2.4));
  const floatY = visibleOnLoad ? (0.35 - p) * 10 : (1 - p) * 18 - 8;
  const floatRotate = visibleOnLoad ? (0.25 - p) * 1.5 : (0.5 - p) * 2.5;
  const imageRotate = visibleOnLoad ? (0.35 - p) * 1.2 : (0.5 - p) * 2;

  const pinScrub = motion === "pin-scrub";
  const heroCanvasAnimation = motion === "enter-once" ? "enter-once" : "scroll-scrub";
  const ambientFullBleed = layout === "ambient-full";
  const compactEmphasis = headlineEmphasisSize === "compact";
  const ambientEnterOnce = ambientFullBleed && motion === "enter-once" && !reduceMotion;
  const heroCopyReveal = ambientEnterOnce
    ? Math.min(1, Math.max(0, (p - 0.04) * 1.08))
    : 1;
  const heroCopyLift = ambientEnterOnce ? (1 - p) * 28 : 0;
  const ambientCount = copyColumnAmbients?.length ?? 0;
  const ambientsIncludeLightPlate =
    copyColumnAmbients?.some((src) =>
      /-light|welcome-copy-stage-cream|cream\.png/i.test(src),
    ) ?? false;
  const onDarkCopy =
    copyTone === "dark"
      ? true
      : copyTone === "light"
        ? false
        : ambientFullBleed
          ? !ambientsIncludeLightPlate && ambientCount === 0
          : ambientCount > 0 && !ambientsIncludeLightPlate;
  const resolvedEmphasisTone = headlineEmphasisTone ?? "teal";
  const lightPlateEmphasisClass = arcHeadlineEmphasisClass(resolvedEmphasisTone);
  const singleTileHero = Boolean(heroCanvasTiles?.length === 1);

  const ambientLayerOpacity = (index: number) => {
    if (ambientCount <= 1) return index === 0 ? 1 : 0;
    const t = p * (ambientCount - 1);
    const active = Math.min(ambientCount - 1, Math.floor(t));
    const blend = t - active;
    if (index === active) return 1 - blend;
    if (index === active + 1) return blend;
    return 0;
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative isolate flex flex-col",
        ambientFullBleed
          ? cn(
              "overflow-x-clip overflow-y-visible",
              onDarkCopy ? "bg-arc-charcoal" : "bg-arc-cream",
            )
          : "overflow-hidden bg-arc-cream",
        pinScrub ? "min-h-[100dvh]" : "min-h-[min(90dvh,840px)]",
        className,
      )}
    >
      {pinScrub ? <ArcPinProgressRail progress={p} /> : null}

      {ambientFullBleed && ambientCount > 0 ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {copyColumnAmbients!.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
              style={{ opacity: ambientLayerOpacity(index) }}
            />
          ))}
          {bottomSeam ? (
            <div
              className="absolute inset-x-0 bottom-0 z-[1] h-[min(30vh,13rem)] bg-gradient-to-t from-arc-cream from-20% via-arc-cream/92 via-45% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_55%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_55%,transparent_100%)]"
              aria-hidden
            />
          ) : null}
        </div>
      ) : null}

      {!ambientFullBleed && imageSrc ? (
        <>
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div
              className={cn("absolute will-change-transform", imageInset)}
              style={{
                transform: `translateX(${imagePan}%) scale(${imageScale}) rotate(${imageRotate}deg)`,
              }}
            >
              <Image
                src={imageSrc}
                alt=""
                fill
                className={cn("object-cover", bgObjectPosition)}
                sizes="100vw"
              />
            </div>
          </div>
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
        </>
      ) : null}

      <div
        className={cn(
          "relative z-10 mx-auto w-full",
          ambientFullBleed
            ? cn(
                "flex min-h-[min(90dvh,840px)] flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 md:grid md:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] md:items-center md:gap-10 md:px-12 md:py-24 lg:gap-14 lg:px-16 xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)]",
                ARC_PAGE_RAIL_MAX,
              )
            : cn(
                "flex flex-col md:flex-row md:items-stretch",
                pinScrub ? "min-h-[100dvh]" : "min-h-[min(90dvh,840px)]",
                ARC_PAGE_RAIL_MAX,
              ),
        )}
      >
        {singleTileHero && heroCanvasTiles?.[0] ? (
          <div className="order-1 mt-6 flex w-full justify-center sm:mt-8 md:hidden">
            <div className="relative aspect-[4/5] w-[min(72vw,280px)] overflow-hidden rounded-sm border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
              <Image
                src={heroCanvasTiles[0].src}
                alt={heroCanvasTiles[0].alt}
                fill
                className="object-cover"
                sizes="72vw"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        ) : ambientFullBleed && heroCanvasTiles && heroCanvasTiles.length > 1 ? (
          <ArcChapterHeroImageCanvasMobile
            tiles={heroCanvasTiles}
            scrollTriggerRootRef={sectionRef}
            reduceMotion={reduceMotion}
            animation={heroCanvasAnimation}
            className="order-1 md:hidden"
          />
        ) : null}

        <div
          className={cn(
            "flex flex-col justify-center",
            ambientFullBleed
              ? "order-2 w-full shrink-0 md:order-none md:max-w-[min(100%,48rem)] md:flex-none"
              : "relative w-full flex-[1.02] overflow-hidden sm:py-20 md:max-w-[min(100%,34rem)] md:flex-none md:py-24",
          )}
        >
          {!ambientFullBleed && ambientCount > 0 ? (
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              {copyColumnAmbients!.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 34rem"
                  style={{ opacity: ambientLayerOpacity(index) }}
                />
              ))}
            </div>
          ) : null}
          {!ambientFullBleed && ambientCount === 0 ? (
            <div
              className="pointer-events-none absolute inset-0 bg-arc-cream/92 backdrop-blur-[2px] md:bg-arc-cream/88"
              aria-hidden
            />
          ) : null}
          <div
            className={cn(
              "relative z-10 flex flex-col justify-center",
              !ambientFullBleed && "px-6 py-16 sm:px-10 md:px-12 lg:px-14",
            )}
          >
          {!ambientFullBleed ? (
            <div
              className={cn(
                "mb-2 h-16 w-px origin-top sm:h-20 md:h-24",
                onDarkCopy ? "bg-white/35" : "bg-arc-charcoal/25",
              )}
              style={{
                transform: `scaleY(${ruleScale})`,
                opacity: ruleOpacity,
              }}
              aria-hidden
            />
          ) : null}

          {headline ? (
            <h2
              className={cn(
                "font-serif font-semibold tracking-tight will-change-[transform,opacity]",
                ambientFullBleed && headlineEmphasis
                  ? compactEmphasis
                    ? "mt-6 flex max-w-full flex-col items-start gap-0 text-[clamp(2.5rem,12vw,4.5rem)] leading-[0.92] tracking-tight md:mt-0 md:text-[clamp(3.25rem,11vw,7.25rem)]"
                    : "mt-6 inline-flex max-w-none flex-wrap items-baseline gap-x-[0.18em] text-[clamp(2.5rem,12vw,4.5rem)] leading-[0.92] tracking-tight md:mt-0 md:text-[clamp(3.25rem,11vw,7.25rem)]"
                  : headlineEmphasis
                    ? "flex max-w-[min(100%,32rem)] flex-wrap items-baseline gap-x-[0.28em] text-3xl leading-[1.14] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.45rem]"
                    : "max-w-[22ch] text-3xl leading-[1.22] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.45rem]",
                onDarkCopy
                  ? "text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.35)]"
                  : "text-arc-charcoal",
                ambientEnterOnce && heroCopyReveal <= 0 && "opacity-0",
              )}
              style={
                ambientEnterOnce
                  ? {
                      opacity: heroCopyReveal,
                      transform: `translate3d(0, ${heroCopyLift}px, 0)`,
                    }
                  : undefined
              }
            >
              {ambientFullBleed && headlineEmphasis ? (
                <>
                  <span
                    className={cn(
                      "font-serif font-semibold tracking-tight",
                      !onDarkCopy && "text-arc-charcoal",
                    )}
                  >
                    {headline}
                  </span>
                  <TitleEmphasis
                    className={cn(
                      compactEmphasis
                        ? "mt-3 block max-w-[min(100%,30rem)] text-[0.52em] font-normal leading-[1.06] sm:mt-3.5 sm:max-w-[min(100%,36rem)] sm:text-[0.54em] md:mt-4 md:max-w-[min(100%,42rem)] md:text-[0.56em] lg:text-[0.58em]"
                        : "inline align-baseline leading-none tracking-tight",
                      onDarkCopy
                        ? compactEmphasis
                          ? ARC_HEADLINE_TAGLINE_EMPHASIS_DARK_CLASS
                          : "text-[1.42em] text-arc-teal [text-shadow:0_2px_20px_rgba(0,0,0,0.4),0_0_32px_var(--arc-teal-glow)]"
                        : compactEmphasis
                          ? arcHeadlineTaglineEmphasisClass(resolvedEmphasisTone, false)
                          : lightPlateEmphasisClass,
                    )}
                  >
                    {headlineEmphasis}
                  </TitleEmphasis>
                </>
              ) : (
                <>
                  <ArcVoobanHeadline
                    text={headline}
                    scrollProgress={p}
                    as="span"
                    variant={headlineEmphasis ? "inline" : "block"}
                    className="inline font-serif font-semibold tracking-tight"
                  />
                  {headlineEmphasis ? (
                    <TitleEmphasis
                      className={cn(
                        "inline align-baseline leading-none tracking-tight",
                        onDarkCopy
                          ? "text-[1.35em] text-arc-teal [text-shadow:0_2px_20px_rgba(0,0,0,0.4),0_0_32px_var(--arc-teal-glow)] sm:text-[1.42em] md:text-[1.5em]"
                          : lightPlateEmphasisClass,
                      )}
                    >
                      {headlineEmphasis}
                    </TitleEmphasis>
                  ) : null}
                </>
              )}
            </h2>
          ) : null}

          {body.trim() ? (
            <p
              className={cn(
                "max-w-xl font-sans leading-relaxed sm:text-[1.05rem] md:text-lg",
                onDarkCopy
                  ? "text-white/88 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]"
                  : "text-arc-charcoal/88",
                headline ? "mt-6 sm:mt-7 md:mt-8" : "mt-0",
              )}
              style={{
                opacity: bodyReveal,
                transform: `translateY(${10 + bodyDrift}px)`,
              }}
            >
              {body}
            </p>
          ) : null}

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
        </div>

        {ambientFullBleed && heroCanvasTiles && heroCanvasTiles.length > 0 ? (
          <ArcChapterHeroImageCanvas
            tiles={heroCanvasTiles}
            scrollTriggerRootRef={sectionRef}
            reduceMotion={reduceMotion}
            animation={heroCanvasAnimation}
            className="order-3 hidden md:flex"
          />
        ) : null}

        {!ambientFullBleed ? (
          <>
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
          </>
        ) : null}
      </div>

      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          scope="background"
          variant={ambientFullBleed ? "soft" : "default"}
          tone="cream"
        />
      ) : null}
    </section>
  );
}
