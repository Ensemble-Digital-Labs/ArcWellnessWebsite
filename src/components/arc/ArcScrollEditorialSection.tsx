"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { ArcScrollSplitReveal } from "@/components/arc/ArcScrollSplitReveal";
import { ArcPrimaryCta } from "@/components/arc/ArcPrimaryCta";
import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_SPLIT_HEADLINE_SERIF_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";
import { ARC_PAGE_RAIL_MAX, ARC_SECTION_SEAM_OVERLAP_SM_LG_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";

gsap.registerPlugin(ScrollTrigger);

function useVoobanImageReveal(imageWrapRef: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const el = imageWrapRef.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { clipPath: "inset(12% 8% 12% 8%)", scale: 1.08, opacity: 0.6 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: ARC_VOOBAN_EASE,
            scrollTrigger: {
              trigger: el, ...arcScrollTriggerScrollerProps(),
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }, el);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const t = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1600);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(t);
      revert?.();
    };
  }, [imageWrapRef, enabled]);
}

type ArcScrollEditorialSectionProps = {
  id?: string;
  title: string;
  titleEmphasis?: string;
  paragraphs: readonly string[];
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  cta?: { href: string; label: string };
  className?: string;
  variant?: "cream" | "muted";
  pinned?: boolean;
  /** Vooban-style line-by-line scroll reveal for body copy */
  revealLines?: boolean;
  /** Scale image on hover */
  imageHoverExpand?: boolean;
  /** `stacked`, serif title on line 1, script emphasis on line 2 (e.g. Our Mission + subtitle). */
  /** `split`, About-style inline serif + script on one line (treatment detail sections). */
  headlineLayout?: "inline" | "stacked" | "split";
  /** Larger serif body copy (mission / vision blocks). */
  bodyTypography?: "default" | "editorial";
  /** Optional sign-off block below body (founder note). */
  signature?: { signoff: string; role: string };
  headlineEmphasisTone?: "teal";
  /** Soft feather at section top (About page seams). */
  topSeam?: boolean;
  /** Soft feather at section bottom (About page seams). */
  bottomSeam?: boolean;
  /** Seam tone — `muted` for teal-muted editorial bands. */
  seamTone?: "cream" | "muted";
  /** Tighter top padding when continuing the same surface as the section above. */
  compactTop?: boolean;
  /** Tighter bottom padding when the next section shares the same surface. */
  compactBottom?: boolean;
  /** Seam gradient style — `soft` avoids backdrop blur on editorial handoffs. */
  seamVariant?: "default" | "soft";
};

const DEFAULT_BODY_LINE_CLASS =
  "font-sans text-sm leading-relaxed text-arc-charcoal/88 sm:text-base";

function EditorialBody({
  title,
  titleEmphasis,
  paragraphs,
  cta,
  revealLines,
  headlineLayout = "inline",
  bodyTypography = "default",
  signature,
  hasAdjacentImage = false,
  headlineEmphasisTone = "teal",
}: Pick<
  ArcScrollEditorialSectionProps,
  | "title"
  | "titleEmphasis"
  | "paragraphs"
  | "cta"
  | "revealLines"
  | "headlineLayout"
  | "bodyTypography"
  | "signature"
  | "headlineEmphasisTone"
> & {
  hasAdjacentImage?: boolean;
}) {
  const emphasisClass = arcHeadlineEmphasisClass(headlineEmphasisTone);
  const stackedHeadline = headlineLayout === "stacked" && titleEmphasis;
  const splitHeadline = headlineLayout === "split";
  const bodyLineClass =
    bodyTypography === "editorial" ? ARC_EDITORIAL_BODY_CLASS : DEFAULT_BODY_LINE_CLASS;
  const bodyWrapClass =
    bodyTypography === "editorial" ? "md:max-w-2xl" : "md:max-w-xl";

  return (
    <div data-scroll-section className="flex min-w-0 flex-1 flex-col justify-center">
      <div
        className={cn(
          "overflow-y-visible pb-[0.12em]",
          splitHeadline ? "overflow-x-visible" : "overflow-x-clip",
        )}
      >
        <h2
          className={cn(
            "text-arc-charcoal",
            splitHeadline
              ? cn(
                  "max-w-full",
                  hasAdjacentImage
                    ? "inline-flex max-w-full flex-wrap items-baseline gap-x-[0.28em] sm:flex-nowrap md:max-w-none"
                    : "inline-flex max-w-full flex-wrap items-baseline gap-x-[0.28em] sm:flex-nowrap",
                  ARC_SPLIT_HEADLINE_SERIF_CLASS,
                )
              : stackedHeadline
              ? cn("max-w-none", ARC_STACKED_HEADLINE_SERIF_CLASS)
              : "max-w-[20ch] font-serif text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.65rem]",
          )}
        >
          {splitHeadline ? (
            <>
              <span className="shrink-0">{title}</span>
              {titleEmphasis ? (
                <TitleEmphasis
                  className={cn(
                    emphasisClass,
                    "inline shrink-0 align-baseline leading-none",
                  )}
                >
                  {titleEmphasis}
                </TitleEmphasis>
              ) : null}
            </>
          ) : stackedHeadline ? (
            <>
              <span className="block max-w-full sm:w-max sm:whitespace-nowrap">{title}</span>
              {titleEmphasis.split("\n").map((line, index) => (
                <TitleEmphasis
                  key={`${line}-${index}`}
                  className={cn(
                    emphasisClass,
                    "block w-max max-w-full leading-none",
                    index === 0 ? "mt-3 sm:mt-3.5" : "mt-1 sm:mt-1.5",
                  )}
                >
                  {line.trim()}
                </TitleEmphasis>
              ))}
            </>
          ) : titleEmphasis ? (
            <>
              {title}{" "}
              <TitleEmphasis
                className={cn(
                  emphasisClass,
                  "text-[1.2em] leading-[1.04] sm:text-[1.28em]",
                )}
              >
                {titleEmphasis}
              </TitleEmphasis>
            </>
          ) : (
            title
          )}
        </h2>
      </div>
      {revealLines ? (
        <ArcScrollSplitReveal
          className={cn("mt-8 sm:mt-10", bodyWrapClass)}
          lines={paragraphs}
          lineClassName={bodyLineClass}
        />
      ) : (
        <div
          className={cn(
            "mt-6 space-y-4 sm:mt-8",
            bodyLineClass,
            bodyWrapClass,
          )}
        >
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      )}
      {signature ? (
        <footer className="mt-10 border-t border-arc-charcoal/10 pt-8 sm:mt-12 sm:pt-10">
          <p className="font-serif text-[clamp(1.125rem,2.2vw,1.4rem)] font-semibold tracking-tight text-arc-charcoal">
            {signature.signoff}
          </p>
          <p className="mt-2 font-serif text-[clamp(1rem,1.9vw,1.125rem)] font-medium leading-[1.4] text-arc-charcoal/72">
            {signature.role}
          </p>
        </footer>
      ) : null}
      {cta ? (
        <div className="mt-8 sm:mt-10">
          <ArcPrimaryCta href={cta.href}>{cta.label}</ArcPrimaryCta>
        </div>
      ) : null}
    </div>
  );
}

export function ArcScrollEditorialSection({
  id,
  title,
  titleEmphasis,
  paragraphs,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  cta,
  className,
  variant = "cream",
  pinned = false,
  revealLines = false,
  imageHoverExpand = true,
  headlineLayout = "inline",
  bodyTypography = "default",
  signature,
  headlineEmphasisTone = "teal",
  topSeam = false,
  bottomSeam = false,
  seamTone,
  compactTop = false,
  compactBottom = false,
  seamVariant = "default",
}: ArcScrollEditorialSectionProps) {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  useVoobanImageReveal(imageWrapRef, Boolean(imageSrc) && !pinned);
  const bg = variant === "muted" ? "bg-arc-teal-muted/30" : "bg-arc-cream";
  const resolvedSeamTone = seamTone ?? (variant === "muted" ? "muted" : "cream");

  const inner = (
    <div
      className={cn(
        "relative z-10 flex flex-col gap-10 px-6 sm:px-10 md:flex-row md:items-center md:gap-14 md:px-12 lg:mx-auto",
        topSeam && !compactTop
          ? "pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12"
          : compactTop && compactBottom
            ? "py-10 sm:py-12 lg:py-14"
            : compactTop
              ? "pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14"
              : compactBottom
                ? "pb-10 pt-16 sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24"
                : "py-16 sm:py-20 lg:py-24",
        ARC_PAGE_RAIL_MAX,
        imagePosition === "left" && imageSrc ? "md:flex-row-reverse" : "",
      )}
    >
      {imageSrc ? (
        <div
          ref={imageWrapRef}
          data-scroll-section
          className={cn(
            "group relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-sm shadow-[0_20px_48px_rgba(44,44,44,0.1)] md:max-w-md lg:max-w-lg",
            imageHoverExpand &&
              "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_64px_rgba(44,44,44,0.14)]",
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={cn(
              "object-cover object-[42%_22%] transition-transform duration-700 ease-out",
              imageHoverExpand && "group-hover:scale-[1.05]",
            )}
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      ) : null}
      <EditorialBody
        title={title}
        titleEmphasis={titleEmphasis}
        paragraphs={paragraphs}
        cta={cta}
        revealLines={revealLines}
        headlineLayout={headlineLayout}
        bodyTypography={bodyTypography}
        signature={signature}
        hasAdjacentImage={Boolean(imageSrc)}
        headlineEmphasisTone={headlineEmphasisTone}
      />
    </div>
  );

  if (pinned) {
    return (
      <PinnedSection id={id} pinDistanceMultiplier={0.85} className={cn("relative overflow-hidden", bg, className)}>
        {topSeam ? (
          <ArcSectionSeamBlend
            edge="top"
            tone={resolvedSeamTone}
            variant={seamVariant}
            scope="background"
          />
        ) : null}
        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-center">{inner}</div>
        {bottomSeam ? (
          <ArcSectionSeamBlend
            edge="bottom"
            tone={resolvedSeamTone}
            variant={seamVariant}
            scope="background"
          />
        ) : null}
      </PinnedSection>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        bg,
        topSeam && seamVariant === "soft" && ARC_SECTION_SEAM_OVERLAP_SM_LG_CLASS,
        className,
      )}
    >
      {topSeam ? (
        <ArcSectionSeamBlend
          edge="top"
          tone={resolvedSeamTone}
          variant={seamVariant}
          scope="background"
        />
      ) : null}
      {inner}
      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone={resolvedSeamTone}
          variant={seamVariant}
          scope="background"
        />
      ) : null}
    </section>
  );
}
