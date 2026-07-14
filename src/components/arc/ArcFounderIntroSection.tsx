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
  ARC_HOME_FOUNDER_CARD_EDGE_LEFT_CLASS,
  ARC_HOME_FOUNDER_CARD_EDGE_RIGHT_CLASS,
} from "@/lib/arc-layout";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { arcScrollScrubLag } from "@/lib/arcTouchDevice";
import { whenArcLocomotiveReady } from "@/lib/locomotive";
import { prefersReducedMotion } from "@/lib/motionPrefs";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Desktop resting → expanded (matches demo inset-to-bleed scrub). */
const DESKTOP_WIDTH = { start: "78%", end: "100%" } as const;
const DESKTOP_RADIUS = { start: "48px", end: "28px" } as const;
/** Milder expand on narrow viewports so the card stays readable. */
const MOBILE_WIDTH = { start: "90%", end: "100%" } as const;
const MOBILE_RADIUS = { start: "36px", end: "28px" } as const;

const FOUNDER_NAME_EMPHASIS_CLASS =
  "text-[1.35em] leading-[1.01] text-arc-teal sm:text-[1.4em] md:text-[1.45em] lg:text-[1.5em]";
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

/** Pin the content rail to the resting card width so scrub only grows teal chrome. */
function lockContentRailWidth(card: HTMLElement, content: HTMLElement, restingWidth: string) {
  content.style.width = "";
  content.style.maxWidth = "";
  gsap.set(card, { width: restingWidth });
  // Measure after resting width is applied — rail fills the card, then we freeze px.
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
 * Physician-founder teal split card with scroll-driven inset→bleed expand
 * (width + border-radius scrub — not CSS transform scale).
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

      // Freeze copy + portrait at resting card size before shell expands.
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
        // Flush to services — no cream strip; keep bottom soft blur on the card itself.
        "relative scroll-mt-28 overflow-hidden bg-arc-cream px-4 pb-0 sm:px-6 lg:mt-2 lg:px-8",
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
        Only the teal SHELL scrub-expands. Inner rail is locked to resting card width in px
        so copy/portrait never reflow during the scrub (including the start of the range).
      */}
      <div
        ref={cardRef}
        data-scroll-section
        className="relative mx-auto w-[90%] overflow-hidden rounded-[36px] bg-arc-teal-ink md:w-[78%] md:rounded-[48px]"
      >
        {/* Cream edge feathers — L/R on all sizes; bottom lip desktop-only. */}
        <div aria-hidden className={ARC_HOME_FOUNDER_CARD_EDGE_LEFT_CLASS} />
        <div aria-hidden className={ARC_HOME_FOUNDER_CARD_EDGE_RIGHT_CLASS} />
        <div aria-hidden className={cn(ARC_HOME_FOUNDER_CARD_EDGE_BOTTOM_CLASS, "max-lg:hidden")} />

        <div
          ref={contentRef}
          className="relative z-10 mx-auto grid w-full max-w-[1180px] items-stretch gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:px-14 lg:py-24"
        >
          <div className="relative min-w-0 text-left">
            <ArcTextReveal variant="heading">
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

            <ArcTextReveal variant="body" delayIndex={1}>
              <p className={cn("mb-6 sm:mb-8", FOUNDER_EYEBROW_CLASS)}>{roleTitle}</p>
            </ArcTextReveal>

            <div className={FOUNDER_BODY_CLASS}>
              {letterParagraphs.map((paragraph, index) => (
                <ArcTextReveal key={paragraph.slice(0, 48)} variant="body" delayIndex={index + 2}>
                  <p>{paragraph}</p>
                </ArcTextReveal>
              ))}
              {closingLine ? (
                <ArcTextReveal variant="body" delayIndex={letterParagraphs.length + 2}>
                  <p className="font-serif text-[1.05rem] font-semibold leading-snug text-arc-cream sm:text-lg">
                    {closingLine}
                  </p>
                </ArcTextReveal>
              ) : null}
            </div>
          </div>

          {/* Demo #doctor portrait: flow img, object-cover object-top, min-h 360/520 */}
          <div className="h-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={958}
              height={1287}
              unoptimized
              className="h-full min-h-[360px] w-full object-cover object-top lg:min-h-[520px]"
              sizes="(min-width: 1024px) 420px, 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>

      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_FOUNDER_BOTTOM_SEAM_SOFT_CLASS}
        />
      ) : null}
    </section>
  );
}
