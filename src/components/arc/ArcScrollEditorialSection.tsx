"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { ArcScrollSplitReveal } from "@/components/arc/ArcScrollSplitReveal";
import { ArcTextUnderlineCta } from "@/components/arc/ArcTextUnderlineCta";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

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
              trigger: el,
              ...arcScrollTriggerScrollerProps(),
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
  eyebrow?: string;
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
};

function EditorialBody({
  eyebrow,
  title,
  titleEmphasis,
  paragraphs,
  cta,
  revealLines,
}: Pick<
  ArcScrollEditorialSectionProps,
  "eyebrow" | "title" | "titleEmphasis" | "paragraphs" | "cta" | "revealLines"
>) {
  return (
    <div data-scroll-section className="flex min-w-0 flex-1 flex-col justify-center">
      {eyebrow ? (
        <div className="mb-6 flex items-center gap-3">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-arc-teal-ink">
            {eyebrow}
          </span>
          <span className="h-px max-w-[120px] flex-1 bg-arc-teal/50" aria-hidden />
        </div>
      ) : null}
      <h2 className="max-w-[20ch] font-serif text-3xl font-semibold leading-[1.1] tracking-tight text-arc-charcoal sm:text-4xl lg:text-[2.65rem]">
        {titleEmphasis ? (
          <>
            {title}{" "}
            <TitleEmphasis className="text-[1.2em] leading-[1.04] text-arc-rose-gold-ink sm:text-[1.28em]">
              {titleEmphasis}
            </TitleEmphasis>
          </>
        ) : (
          title
        )}
      </h2>
      {revealLines ? (
        <ArcScrollSplitReveal
          className="mt-6 sm:mt-8 md:max-w-xl"
          lines={paragraphs}
          lineClassName="font-sans text-sm leading-relaxed text-arc-charcoal/88 sm:text-base"
        />
      ) : (
        <div className="mt-6 space-y-4 font-sans text-sm leading-relaxed text-arc-charcoal/88 sm:mt-8 sm:text-base md:max-w-xl">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      )}
      {cta ? (
        <div className="mt-8 sm:mt-10">
          <ArcTextUnderlineCta href={cta.href} accent="roseGoldInk">
            {cta.label}
          </ArcTextUnderlineCta>
        </div>
      ) : null}
    </div>
  );
}

export function ArcScrollEditorialSection({
  id,
  eyebrow,
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
}: ArcScrollEditorialSectionProps) {
  const imageWrapRef = useRef<HTMLDivElement>(null);
  useVoobanImageReveal(imageWrapRef, Boolean(imageSrc) && !pinned);
  const bg = variant === "muted" ? "bg-arc-teal-muted/30" : "bg-arc-cream";

  const inner = (
    <div
      className={cn(
        "flex flex-col gap-10 px-6 py-16 sm:px-10 sm:py-20 md:flex-row md:items-center md:gap-14 md:px-12 lg:mx-auto lg:py-24",
        ARC_PAGE_RAIL_MAX,
        imagePosition === "left" && imageSrc ? "md:flex-row-reverse" : "",
      )}
    >
      {imageSrc ? (
        <div
          ref={imageWrapRef}
          data-scroll-section
          className={cn(
            "group relative aspect-[4/5] w-full shrink-0 overflow-hidden md:max-w-md lg:max-w-lg",
            imageHoverExpand &&
              "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_64px_rgba(44,44,44,0.14)]",
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              imageHoverExpand && "group-hover:scale-[1.08]",
            )}
            sizes="(min-width: 768px) 40vw, 100vw"
          />
        </div>
      ) : null}
      <EditorialBody
        eyebrow={eyebrow}
        title={title}
        titleEmphasis={titleEmphasis}
        paragraphs={paragraphs}
        cta={cta}
        revealLines={revealLines}
      />
    </div>
  );

  if (pinned) {
    return (
      <PinnedSection id={id} pinDistanceMultiplier={0.85} className={cn(bg, className)}>
        <div className="flex min-h-[100dvh] flex-col justify-center">{inner}</div>
      </PinnedSection>
    );
  }

  return (
    <section id={id} className={cn(bg, className)}>
      {inner}
    </section>
  );
}
