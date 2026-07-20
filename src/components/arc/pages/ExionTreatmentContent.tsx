"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, type CSSProperties } from "react";
import { Check, Sparkles } from "lucide-react";

import { ArcCountUpStat } from "@/components/arc/ArcCountUpStat";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcWaveSeparator } from "@/components/arc/ArcWaveSeparator";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import type { TreatmentPage } from "@/content/pages/treatments";
import {
  exionClosing,
  exionDifferent,
  exionExperience,
  exionHero,
  exionMechanism,
  exionPillars,
  exionResults,
  exionTreatments,
} from "@/content/pages/exion";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_PAGE_RAIL_MAX,
  ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ExionTreatmentContentProps = {
  treatment: TreatmentPage;
};

/** Near-black "act" surface — deepened charcoal, no new brand hue. */
const DARK_ACT = "color-mix(in srgb, var(--arc-charcoal) 82%, #000000)";
const darkActStyle: CSSProperties = { backgroundColor: DARK_ACT };
/**
 * Experience band height/padding driven inline so it can't be defeated by
 * Tailwind's CSS-HMR occasionally missing newly-used spacing utilities.
 */
const experienceStyle: CSSProperties = {
  backgroundColor: DARK_ACT,
  paddingTop: "clamp(1.5rem, 3vw, 3rem)",
  paddingBottom: "clamp(3.5rem, 7vw, 7rem)",
};

/** Flowing gold "streak" lines behind the dark acts (ported from the demo). */
function ExionGoldStreaks({
  className,
  offsetY = 0,
  style,
}: {
  className?: string;
  /** Shift all streaks down (viewBox units) to clear section-specific copy. */
  offsetY?: number;
  /** Inline sizing/positioning (bypasses Tailwind CSS-HMR for arbitrary heights). */
  style?: CSSProperties;
}) {
  const gid = `gold-streak-${useId().replace(/:/g, "")}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 400"
      preserveAspectRatio="none"
      style={style}
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c19a5b" stopOpacity="0" />
          <stop offset="50%" stopColor="#d9b878" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c19a5b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform={`translate(0 ${offsetY})`}>
        <path
          d="M-50 80 C 300 20, 500 150, 800 90 S 1250 40, 1250 40"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="1.2"
        />
        <path
          d="M-50 240 C 250 320, 550 120, 850 260 S 1250 300, 1250 300"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M-50 320 C 350 220, 650 380, 950 240 S 1250 180, 1250 180"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="0.8"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

function GoldRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-px w-16 bg-gradient-to-r from-transparent via-arc-champagne to-transparent",
        className,
      )}
    />
  );
}

/**
 * Custom gold line-art emblem (local SVG). Rendered unoptimized so the SVG is
 * served as-is from /public. Decorative — the adjacent title conveys meaning.
 */
function EmblemIcon({ src, className }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={128}
      height={128}
      unoptimized
      className={cn("select-none object-contain", className)}
    />
  );
}

export function ExionTreatmentContent({ treatment }: ExionTreatmentContentProps) {
  return (
    <>
      {/* ---------- Hero: one viewport, full-bleed imagery into the gold wave ---------- */}
      <div className="relative flex min-h-[100dvh] flex-col">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <Image
            src={exionHero.imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_42%] sm:object-[72%_40%] md:object-[62%_45%] lg:object-center"
          />
          {/* Desktop: light left-edge fade only — mobile readability is handled on the text block */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-arc-cream/55 via-arc-cream/20 to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-arc-cream/35 to-transparent sm:h-28" />
        </div>

        <section
          className={cn(
            "relative z-10 flex flex-1 flex-col",
            ARC_GALLERY_CLEAR_BELOW_LOGO,
          )}
        >
          <div
            className={cn(
              "mx-auto flex w-full flex-1 flex-col justify-center px-6 sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="relative mx-auto w-fit max-w-md text-center md:mx-0 md:text-left">
              {/* Soft cream halo only behind copy (mobile); fades out so the photo stays visible */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-5 -inset-y-4 z-0 rounded-[2rem] bg-arc-cream/70 blur-md md:hidden"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-3 -inset-y-2 z-0 rounded-3xl bg-arc-cream/60 md:hidden"
              />
              <div className="relative z-10">
                <ArcTextReveal variant="heading" trigger="mount">
                  <h1 className="font-serif text-[clamp(2.5rem,7.5vw,4.25rem)] font-normal leading-[1.02] tracking-tight text-arc-charcoal [text-shadow:0_1px_12px_rgba(245,240,232,0.85)] md:[text-shadow:none]">
                    <span className="block font-semibold">{exionHero.title}</span>
                    <span className="mt-1 block font-serif text-[0.92em] font-semibold italic text-[#9a7340] md:font-normal md:text-arc-champagne">
                      {exionHero.titleEmphasisLines.map((line) => (
                        <span key={line} className="block text-balance">
                          {line}
                        </span>
                      ))}
                    </span>
                  </h1>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={1}>
                  <p className="mt-5 font-sans text-xs font-bold uppercase tracking-[0.22em] text-arc-charcoal [text-shadow:0_1px_10px_rgba(245,240,232,0.8)] sm:text-sm md:[text-shadow:none]">
                    {exionHero.subhead}
                  </p>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={2}>
                  <p className="mt-5 font-sans text-sm font-medium leading-relaxed text-arc-charcoal/92 [text-shadow:0_1px_10px_rgba(245,240,232,0.75)] sm:mt-6 sm:text-base md:font-normal md:text-arc-charcoal/78 md:[text-shadow:none]">
                    {exionHero.intro}
                  </p>
                </ArcTextReveal>
              </div>
            </div>
          </div>

          {/* Closing chip — stays in the one-viewport hero */}
          <ArcTextReveal
            variant="body"
            trigger="mount"
            delayIndex={3}
            className={cn(
              "relative mx-auto mb-3 flex justify-center px-6 sm:mb-4 sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-full border border-arc-champagne/30 bg-white/95 px-5 py-2.5 text-center shadow-[0_8px_24px_rgba(44,44,44,0.08)] md:backdrop-blur-sm sm:w-auto sm:max-w-none">
              <Sparkles className="h-4 w-4 shrink-0 text-arc-champagne" aria-hidden />
              <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-arc-charcoal/85">
                {exionHero.closingLine}
              </span>
            </div>
          </ArcTextReveal>
        </section>

        <div className="relative z-10 mt-auto">
          <ArcWaveSeparator
            topColor="transparent"
            bottomColor="var(--arc-cream)"
            shine
          />
        </div>

        <span className="sr-only">{exionHero.imageAlt}</span>
      </div>

      {/* ---------- Pillars (brand cream) — single row of 5 ---------- */}
      <div className="relative bg-arc-cream">
        <section
          className={cn(
            "relative z-10 mx-auto px-6 py-14 sm:px-10 sm:py-16 md:px-12 md:py-20",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-5 md:gap-x-6 lg:gap-x-8">
            {exionPillars.map((pillar, i) => (
              <ArcTextReveal key={pillar.title} variant="body" delayIndex={i}>
                <div className="flex h-full flex-col items-center text-center">
                  <EmblemIcon src={pillar.iconSrc} className="h-24 w-24 sm:h-28 sm:w-28 md:h-[7.25rem] md:w-[7.25rem]" />
                  <h3 className="mt-3 font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#a87d3f] sm:mt-4 sm:text-[0.7rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 max-w-[14rem] font-sans text-[0.75rem] leading-relaxed text-arc-charcoal/70 sm:text-[0.8125rem]">
                    {pillar.body}
                  </p>
                </div>
              </ArcTextReveal>
            ))}

            <ArcTextReveal variant="body" delayIndex={4}>
              <div className="flex h-full flex-col items-center text-center">
                <EmblemIcon
                  src={exionHero.poweredByIconSrc}
                  className="h-24 w-24 sm:h-28 sm:w-28 md:h-[7.25rem] md:w-[7.25rem]"
                />
                <h3 className="mt-3 max-w-[11rem] font-sans text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#a87d3f] sm:mt-4 sm:text-[0.7rem]">
                  {exionHero.poweredByEyebrow}
                </h3>
                <p className="mt-2 max-w-[14rem] font-sans text-[0.75rem] leading-relaxed text-arc-charcoal/70 sm:text-[0.8125rem]">
                  {exionHero.synergyLine}
                </p>
              </div>
            </ArcTextReveal>
          </div>
        </section>

        <ArcWaveSeparator
          topColor="var(--arc-cream)"
          bottomColor="var(--arc-cream-deep)"
          shine
        />
      </div>

      {/* ---------- Mechanism + animated stats (recessed cream) ---------- */}
      <section className="relative overflow-hidden bg-arc-cream-deep px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
        {/* Gold ambient glow — solid radial on mobile (no blur-2xl; that janks Lenis scroll) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 z-0 h-72 w-72 rounded-full opacity-40 md:blur-2xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(193,154,91,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          className={cn(
            "relative z-10 mx-auto grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          {/* Copy + stats */}
          <div>
            <div className="w-fit lg:mx-auto">
              <ArcTextReveal variant="heading">
                <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight text-balance text-arc-charcoal">
                  {exionMechanism.titleLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-arc-charcoal/78 sm:text-base">
                  {exionMechanism.body}
                </p>
              </ArcTextReveal>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-5">
              {exionMechanism.stats.map((stat, i) => (
                <ArcCountUpStat
                  key={stat.label}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  label={stat.label}
                  align="left"
                  durationMs={1800}
                  startDelayMs={200 + i * 60}
                  numberClassName="text-[2.75rem] font-normal leading-none text-arc-champagne sm:text-5xl"
                  labelClassName="mt-2 max-w-none text-[0.7rem] text-arc-charcoal/65"
                />
              ))}
            </div>

          </div>

          {/* Framed image — lighter shadow on small screens */}
          <ArcTextReveal variant="body" delayIndex={2} className="relative">
            <div className="rounded-[28px] border border-arc-champagne/25 bg-arc-cream/40 p-3.5 shadow-[0_12px_36px_rgba(44,44,44,0.1)] md:shadow-[0_28px_80px_rgba(44,44,44,0.14)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border-4 border-arc-champagne">
                <Image
                  src={exionMechanism.imageSrc}
                  alt={exionMechanism.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </ArcTextReveal>
        </div>
      </section>

      {/* ---------- Three transformative treatments (same recessed cream as the stats band) ---------- */}
      <section className="relative overflow-hidden bg-arc-cream-deep px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-4xl text-center">
            <ArcTextReveal variant="heading">
              <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight text-arc-charcoal sm:whitespace-nowrap">
                {exionTreatments.title} {exionTreatments.titleEmphasis}
              </h2>
            </ArcTextReveal>
            <GoldRule className="mx-auto mt-6" />
            <ArcTextReveal variant="body" delayIndex={1}>
              <p className="mt-6 font-serif text-lg italic leading-relaxed text-[#a87d3f] sm:text-xl">
                {exionTreatments.intro}
              </p>
            </ArcTextReveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {exionTreatments.cards.map((card, i) => (
              <ArcTextReveal key={card.title} variant="body" delayIndex={i + 1} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border-4 border-arc-champagne bg-white shadow-[0_20px_50px_-30px_rgba(120,90,40,0.35)] transition-transform duration-500 ease-out hover:-translate-y-2">
                  <div className="relative h-64 w-full overflow-hidden sm:h-72">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-7">
                    <div className="text-center">
                      <h3 className="font-serif text-xl tracking-tight text-arc-charcoal">
                        {card.title}
                      </h3>
                      <p className="mt-1 font-serif text-lg italic text-arc-champagne">
                        {card.tagline}
                      </p>
                    </div>
                    <p className="text-center font-sans text-sm leading-relaxed text-arc-charcoal/70">
                      {card.body}
                    </p>
                    <ul className="mt-auto flex flex-col gap-2.5 pt-2">
                      {card.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 font-sans text-sm text-arc-charcoal/80"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-arc-champagne"
                            strokeWidth={2}
                            aria-hidden
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ArcTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why EXION is different: bg from top wave → end of section ---------- */}
      <div className="relative overflow-hidden" style={darkActStyle}>
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={exionDifferent.backgroundSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10">
          <ArcWaveSeparator
            topColor="var(--arc-cream-deep)"
            bottomColor="transparent"
            shine
          />
        </div>

        <section className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
          <div
            className={cn(
              "relative mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-16",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            {/* Heading */}
            <div>
              <ArcTextReveal variant="heading">
                <h2
                  className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight text-balance"
                  style={{ color: "#d9b878" }}
                >
                  {exionDifferent.title} {exionDifferent.titleEmphasis}
                </h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p
                  className="mt-6 max-w-sm font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(247,241,232,0.82)" }}
                >
                  {exionDifferent.intro}
                </p>
              </ArcTextReveal>
            </div>

            {/* Items — centered 2×2 grid */}
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {exionDifferent.cards.map((card, i) => (
                <ArcTextReveal key={card.title} variant="body" delayIndex={i + 1}>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <EmblemIcon src={card.iconSrc} className="h-28 w-28" />
                    <h3
                      className="font-sans text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ color: "#d9b878" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: "rgba(247,241,232,0.82)" }}
                    >
                      {card.body}
                    </p>
                  </div>
                </ArcTextReveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ---------- The EXION experience (continues the dark act) ---------- */}
      <section
        className="relative overflow-hidden px-6 sm:px-10 md:px-12"
        style={experienceStyle}
      >
        <ExionGoldStreaks
          className="opacity-60"
          offsetY={60}
          style={{ height: "clamp(22rem, 58vh, 34rem)" }}
        />
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-2xl text-center">
            <ArcTextReveal variant="heading">
              <h2
                className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight"
                style={{ color: "#d9b878" }}
              >
                {exionExperience.title} {exionExperience.titleEmphasis}
              </h2>
            </ArcTextReveal>
          </div>

          <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {exionExperience.steps.map((step, i) => (
              <ArcTextReveal
                as="li"
                key={step.title}
                variant="body"
                delayIndex={i + 1}
                className="flex flex-col items-center text-center"
              >
                <EmblemIcon src={step.iconSrc} className="h-24 w-24 sm:h-28 sm:w-28" />
                <h3
                  className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "#d9b878" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 max-w-[15rem] font-sans text-sm leading-relaxed"
                  style={{ color: "rgba(247,241,232,0.72)" }}
                >
                  {step.body}
                </p>
              </ArcTextReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Wave back into cream (mirror of the dark-act entry wave) ---------- */}
      <ArcWaveSeparator topColor={DARK_ACT} bottomColor="var(--arc-cream)" shine />

      {/* ---------- Real results (cream) ---------- */}
      <section className="relative overflow-hidden bg-arc-cream px-6 pt-20 pb-10 sm:px-10 sm:pt-24 sm:pb-12 md:px-12">
        <div
          className={cn(
            "relative z-10 mx-auto flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-10",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          <div className="max-w-md lg:w-1/3 lg:shrink-0">
            <ArcTextReveal variant="heading">
              <h2 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-arc-charcoal sm:text-5xl">
                {exionResults.title}{" "}
                <span className="block">{exionResults.titleEmphasis}</span>
              </h2>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={1}>
              <p className="mt-5 font-sans text-base leading-relaxed text-arc-charcoal/70">
                {exionResults.intro}
              </p>
            </ArcTextReveal>
          </div>

          <div className="min-w-0 lg:flex-1">
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exionResults.cards.map((card, i) => (
                <ArcTextReveal
                  as="li"
                  key={card.label}
                  variant="body"
                  delayIndex={i + 1}
                  className="min-w-0"
                >
                  <div className="exion-lift overflow-hidden rounded-2xl border border-arc-teal/12 bg-white p-3 shadow-[0_20px_50px_rgba(44,44,44,0.07)]">
                  <div
                    className="relative flex min-w-0 flex-col rounded-xl p-4"
                    style={{
                      height: "13rem",
                      width: "100%",
                      border: "1px solid rgba(197,168,120,0.45)",
                      borderTop: "2px solid #b8935a",
                      background:
                        "linear-gradient(135deg, #ece0cf 0%, #d8c19b 55%, #cbb083 100%)",
                    }}
                  >
                    <div className="flex min-w-0 flex-1 flex-col items-center justify-center text-center">
                      <p className="font-serif text-xl font-semibold text-arc-charcoal">
                        {card.label}
                      </p>
                      <p className="mt-1 font-sans text-xs text-arc-charcoal/60">
                        Temporary placeholder image
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded-full bg-arc-charcoal px-3 py-1 font-sans font-semibold uppercase tracking-[0.14em] text-arc-cream"
                        style={{ fontSize: "0.625rem" }}
                      >
                        Before
                      </span>
                      <span
                        className="rounded-full bg-arc-champagne px-3 py-1 font-sans font-semibold uppercase tracking-[0.14em] text-arc-charcoal"
                        style={{ fontSize: "0.625rem" }}
                      >
                        After
                      </span>
                    </div>
                  </div>
                  <p className="whitespace-nowrap px-1 pb-4 pt-3 text-center font-sans text-xs font-medium text-arc-charcoal/80">
                    {card.caption}
                  </p>
                  </div>
                </ArcTextReveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- FAQ (cream) ---------- */}
      {treatment.faqs?.length ? (
        <ArcFaqSection
          id="treatment-faq"
          className="border-t-0"
          categories={{ treatment: treatment.title }}
          faqByCategory={{ treatment: treatment.faqs }}
          bottomSeam
        />
      ) : null}

      {/* ---------- Closing line + back link (cream) ---------- */}
      <section
        className={cn(
          "relative overflow-hidden bg-arc-cream px-6 py-16 text-center sm:px-10 sm:py-20 md:px-12",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto max-w-2xl", ARC_PAGE_RAIL_MAX)}>
          <ArcTextReveal variant="line">
            <Link
              href="/treatments"
              className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-teal-ink transition-colors hover:text-arc-teal-ink-hover"
            >
              ← All treatments
            </Link>
          </ArcTextReveal>
        </div>
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      </section>

      {/* ---------- Global CTA (then global footer via ArcMarketingShell) ---------- */}
      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={exionClosing.supportingLine ?? homeInvestSupport}
        topSeam
      />
    </>
  );
}
