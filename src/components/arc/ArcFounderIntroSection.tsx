"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import {
  ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS,
  ARC_HOME_FOUNDER_CARD_EDGE_BOTTOM_CLASS,
} from "@/lib/arc-layout";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { arcScrollScrubLag } from "@/lib/arcTouchDevice";
import { whenArcLocomotiveReady } from "@/lib/locomotive";
import { prefersReducedMotion } from "@/lib/motionPrefs";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Resting inset → full left–right bleed (section has no side padding). */
const DESKTOP_WIDTH = { start: "78%", end: "100%" } as const;
const DESKTOP_RADIUS = { start: "48px", end: "0px" } as const;
const MOBILE_WIDTH = { start: "90%", end: "100%" } as const;
const MOBILE_RADIUS = { start: "36px", end: "0px" } as const;

const FOUNDER_NAME_EMPHASIS_CLASS =
  "text-[1.35em] leading-[1.01] text-arc-cream sm:text-[1.4em] md:text-[1.45em] lg:text-[1.5em]";
const FOUNDER_EYEBROW_CLASS =
  "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-arc-champagne sm:text-[0.7rem]";
const FOUNDER_BODY_CLASS =
  "space-y-4 font-sans text-sm leading-relaxed text-arc-cream/90 sm:space-y-5 sm:text-[0.95rem] md:text-base md:leading-relaxed";

type ArcFounderIntroSectionProps = {
  id?: string;
  className?: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  headlineEmphasisWord: string;
  headlineEmphasisWord2?: string;
  roleTitle: string;
  letterParagraphs: readonly string[];
  closingLine?: string;
  topSeam?: boolean;
  /** Soft cream exit into the next section (e.g. whole-body slider). */
  bottomSeam?: boolean;
};

function splitHeadline(
  headline: string,
  headlineEmphasisWord: string,
  headlineEmphasisWord2?: string,
) {
  const e1 = headlineEmphasisWord.trim();
  const e2 = headlineEmphasisWord2?.trim() ?? "";
  const i1 = e1.length ? headline.indexOf(e1) : -1;
  const i2 = e2.length && i1 !== -1 ? headline.indexOf(e2, i1 + e1.length) : -1;
  const hasDoubleEmphasis = i1 !== -1 && i2 !== -1;
  const hasSingleEmphasis = !hasDoubleEmphasis && e1.length > 0 && i1 !== -1;

  return {
    hasDoubleEmphasis,
    hasSingleEmphasis,
    e1,
    e2,
    beforeSingle: hasSingleEmphasis ? headline.slice(0, i1).trimEnd() : "",
    afterSingle: hasSingleEmphasis ? headline.slice(i1 + e1.length).trimStart() : "",
    beforeDouble: hasDoubleEmphasis ? headline.slice(0, i1).trimEnd() : "",
    gapDouble: hasDoubleEmphasis ? headline.slice(i1 + e1.length, i2) : "",
    afterDouble: hasDoubleEmphasis ? headline.slice(i2 + e2.length).trimStart() : "",
  };
}

function expandRange() {
  const mobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;
  return {
    width: mobile ? MOBILE_WIDTH : DESKTOP_WIDTH,
    radius: mobile ? MOBILE_RADIUS : DESKTOP_RADIUS,
  };
}

function setCardExpanded(card: HTMLElement, expanded: boolean) {
  const { width, radius } = expandRange();
  gsap.set(card, {
    width: expanded ? width.end : width.start,
    borderRadius: expanded ? radius.end : radius.start,
  });
}

/** Freeze copy + portrait layout at resting card width so scrub only grows teal chrome. */
function lockContentRailWidth(card: HTMLElement, content: HTMLElement, restingWidth: string) {
  content.style.width = "";
  content.style.maxWidth = "";
  gsap.set(card, { width: restingWidth });
  const measured = Math.round(content.getBoundingClientRect().width);
  if (measured <= 0) return;
  content.style.width = `${measured}px`;
  content.style.maxWidth = `${measured}px`;
  content.style.marginLeft = "auto";
  content.style.marginRight = "auto";
}

function clearContentRailLock(content: HTMLElement) {
  content.style.width = "";
  content.style.maxWidth = "";
  content.style.marginLeft = "";
  content.style.marginRight = "";
}

/**
 * Physician-founder teal card — scroll expands shell inset→bleed.
 * Inner rail stays locked so text/portrait don’t reflow during the scrub.
 */
export function ArcFounderIntroSection({
  id,
  className,
  imageSrc,
  imageAlt,
  headline,
  headlineEmphasisWord,
  headlineEmphasisWord2,
  roleTitle,
  letterParagraphs,
  closingLine,
  topSeam = false,
  bottomSeam = false,
}: ArcFounderIntroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const split = splitHeadline(headline, headlineEmphasisWord, headlineEmphasisWord2);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    if (prefersReducedMotion()) {
      setCardExpanded(card, true);
      clearContentRailLock(content);
      return;
    }

    let cancelled = false;
    let revert: (() => void) | null = null;

    const setup = () => {
      if (cancelled) return;
      const sec = sectionRef.current;
      const el = cardRef.current;
      const rail = contentRef.current;
      if (!sec || !el || !rail) return;

      revert?.();
      const { width, radius } = expandRange();

      lockContentRailWidth(el, rail, width.start);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { width: width.start, borderRadius: radius.start },
          {
            width: width.end,
            borderRadius: radius.end,
            ease: "none",
            overwrite: "auto",
            scrollTrigger: {
              id: "arc-founder-card-expand",
              trigger: sec,
              ...arcScrollTriggerScrollerProps(),
              start: "top 90%",
              end: "top 18%",
              scrub: arcScrollScrubLag(),
              invalidateOnRefresh: true,
            },
          },
        );
      }, sec);

      revert = () => {
        ctx.revert();
        clearContentRailLock(rail);
      };
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 160);
    };

    const unregisterReady = whenArcLocomotiveReady(() => queueMicrotask(setup));
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!cancelled) setup();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      unregisterReady();
      window.clearTimeout(fallback);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      revert?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative scroll-mt-28 overflow-hidden bg-arc-cream px-0 pb-0",
        className,
      )}
    >
      {topSeam ? (
        <ArcSectionSeamBlend
          edge="top"
          tone="cream"
          variant="soft"
          scope="background"
          className="h-[min(10vh,4.5rem)] bg-gradient-to-b from-arc-cream from-40% via-arc-cream/75 via-70% to-transparent [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)] mask-image-[linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)]"
        />
      ) : null}

      {/*
        Teal SHELL scrub-expands. Inner rail is locked to resting width in px
        so copy + portrait stay stable while chrome goes edge-to-edge.
      */}
      <div
        ref={cardRef}
        data-scroll-section
        className="relative mx-auto w-[90%] overflow-hidden rounded-[36px] bg-arc-teal-ink md:w-[78%] md:rounded-[48px]"
      >
        <div aria-hidden className={cn(ARC_HOME_FOUNDER_CARD_EDGE_BOTTOM_CLASS, "max-lg:hidden")} />

        <div
          ref={contentRef}
          className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center justify-items-center gap-6 px-5 pb-10 pt-12 text-center sm:gap-8 sm:px-8 sm:pb-12 sm:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:justify-items-stretch lg:gap-8 lg:px-8 lg:pb-11 lg:pt-14 lg:text-left xl:gap-10 xl:px-10 xl:pb-12 xl:pt-16"
        >
          <div className="relative flex w-full min-w-0 max-w-xl flex-col items-center justify-center pb-2 text-center lg:max-w-none lg:items-start lg:self-stretch lg:pb-3 lg:text-left">
            <ArcTextReveal variant="heading" className="w-full">
              <h2 className="mb-2 max-w-full break-words font-serif text-[2rem] font-normal leading-[1.08] tracking-tight text-arc-cream sm:text-[2.35rem] sm:leading-[1.06] md:text-[2.65rem] lg:text-[2.85rem]">
                {split.hasDoubleEmphasis ? (
                  <>
                    {split.beforeDouble}
                    {split.beforeDouble ? " " : null}
                    <TitleEmphasis className={FOUNDER_NAME_EMPHASIS_CLASS}>{split.e1}</TitleEmphasis>
                    {split.gapDouble || " "}
                    <TitleEmphasis className={FOUNDER_NAME_EMPHASIS_CLASS}>{split.e2}</TitleEmphasis>
                    {split.afterDouble ? <> {split.afterDouble}</> : null}
                  </>
                ) : split.hasSingleEmphasis ? (
                  <>
                    {split.beforeSingle}
                    {split.beforeSingle ? " " : null}
                    <TitleEmphasis className={FOUNDER_NAME_EMPHASIS_CLASS}>{split.e1}</TitleEmphasis>
                    {split.afterSingle ? <> {split.afterSingle}</> : null}
                  </>
                ) : (
                  headline
                )}
              </h2>
            </ArcTextReveal>

            <ArcTextReveal variant="body" delayIndex={1} className="w-full">
              <p className={cn("mb-6 sm:mb-8", FOUNDER_EYEBROW_CLASS)}>{roleTitle}</p>
            </ArcTextReveal>

            <div className={cn(FOUNDER_BODY_CLASS, "w-full max-lg:mx-auto")}>
              {letterParagraphs.map((paragraph, index) => (
                <ArcTextReveal key={paragraph.slice(0, 48)} variant="body" delayIndex={index + 2}>
                  <p>{paragraph}</p>
                </ArcTextReveal>
              ))}
              {closingLine ? (
                <ArcTextReveal variant="body" delayIndex={letterParagraphs.length + 2}>
                  <p className="text-base font-semibold sm:text-[1.05rem] md:text-lg">
                    {closingLine}
                  </p>
                </ArcTextReveal>
              ) : null}
            </div>
          </div>

          <div className="relative flex min-h-[460px] w-full max-w-[460px] translate-x-[8%] items-end justify-center self-center sm:min-h-[520px] sm:max-w-[520px] sm:translate-x-[10%] lg:-mr-12 lg:min-h-[580px] lg:max-w-none lg:translate-x-0 lg:justify-end lg:self-end xl:-mr-14 xl:min-h-[620px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={958}
              height={1287}
              unoptimized
              className="h-full max-h-[440px] w-full max-w-none object-contain object-bottom sm:max-h-[500px] lg:max-h-none lg:w-[128%] lg:translate-x-[12%] lg:object-right-bottom xl:w-[132%] xl:translate-x-[14%]"
              sizes="(min-width: 1024px) 52vw, 520px"
              priority={false}
            />
          </div>
        </div>
      </div>

      {bottomSeam ? (
        <div aria-hidden className={ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS} />
      ) : null}
    </section>
  );
}
