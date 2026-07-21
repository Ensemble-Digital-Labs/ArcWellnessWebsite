"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { Check, Sparkles } from "lucide-react";

import { ArcCountUpStat } from "@/components/arc/ArcCountUpStat";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import {
  ArcWaveSeparator,
  ARC_WAVE_TOP_FILL_D,
} from "@/components/arc/ArcWaveSeparator";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import type { TreatmentPage } from "@/content/pages/treatments";
import {
  exionClosing,
  exionDifferent,
  exionExperience,
  exionHero,
  exionMechanism,
  exionPillars,
  exionPillarsBackground,
  exionResults,
  exionTreatments,
} from "@/content/pages/exion";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ExionTreatmentContentProps = {
  treatment: TreatmentPage;
};

/** Near-black "act" surface — deepened charcoal, no new brand hue. */
const DARK_ACT = "color-mix(in srgb, var(--arc-charcoal) 82%, #000000)";

/** Matches `ArcWaveSeparator` SVG heights. */
const EXION_WAVE_H_CLASS = "h-[60px] sm:h-[90px] lg:h-[120px]";
const EXION_WAVE_MT_CLASS = "-mt-[60px] sm:-mt-[90px] lg:-mt-[120px]";
/** CSS var for mask sizing — must stay in sync with `EXION_WAVE_H_CLASS`. */
const EXION_WAVE_H_VAR_CLASS =
  "[--exion-wave-h:60px] sm:[--exion-wave-h:90px] lg:[--exion-wave-h:120px]";

/**
 * FAQ → Invest CTA: identical matched pair to Home testimonials → invest
 * (`ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS` + `ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS`,
 * with `topSeamOverlap={false}` — do not pull CTA up or the cream lip turns into a hard line).
 *//**
 * Bottom-crest mask (hero photo, cream plate exit, etc.): fully visible above the
 * wave strip; in the strip, only ABOVE the crest — same path + viewBox as
 * `ArcWaveSeparator`. Never hand-map a % clip on a tall box.
 */
const EXION_ABOVE_CREST_BOTTOM_MASK = [
  `linear-gradient(#fff 0%, #fff calc(100% - var(--exion-wave-h)), transparent calc(100% - var(--exion-wave-h)))`,
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#fff" d="${ARC_WAVE_TOP_FILL_D}"/></svg>`,
  )}")`,
].join(", ");

const exionAboveCrestBottomMaskStyle: CSSProperties = {
  maskImage: EXION_ABOVE_CREST_BOTTOM_MASK,
  WebkitMaskImage: EXION_ABOVE_CREST_BOTTOM_MASK,
  maskSize: "100% 100%, 100% var(--exion-wave-h)",
  WebkitMaskSize: "100% 100%, 100% var(--exion-wave-h)",
  maskPosition: "0 0, 0 100%",
  WebkitMaskPosition: "0 0, 0 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

/** Same plate asset per cream section — shorter box → tighter object-cover (sharper). */
const EXION_PLATE_OBJECT_CLASS = "object-cover object-[center_30%]";

function ExionSectionPlate({ maskBottom = true }: { maskBottom?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-arc-cream"
      style={maskBottom ? exionAboveCrestBottomMaskStyle : undefined}
      aria-hidden
    >
      <Image
        src={exionPillarsBackground.src}
        alt=""
        fill
        sizes="100vw"
        unoptimized
        className={EXION_PLATE_OBJECT_CLASS}
      />
    </div>
  );
}

/** Same dark plate asset per dark section (Why different + Experience). */
function ExionDarkPlate({ maskBottom = true }: { maskBottom?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={
        maskBottom
          ? { backgroundColor: DARK_ACT, ...exionAboveCrestBottomMaskStyle }
          : { backgroundColor: DARK_ACT }
      }
      aria-hidden
    >
      <Image
        src={exionDifferent.backgroundSrc}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

/**
 * Experience band height/padding driven inline so it can't be defeated by
 * Tailwind's CSS-HMR occasionally missing newly-used spacing utilities.
 */
const experienceStyle: CSSProperties = {
  paddingTop: "clamp(1.5rem, 3vw, 3rem)",
  paddingBottom: "clamp(3.5rem, 7vw, 7rem)",
};

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
      {/*
        Definitive hero → cream plate seam:
        - Photo masked with the SAME crest path as ArcWaveSeparator (not a % guess)
        - One plate Image tucked under the crest (-mt)
        - Entry wave: transparent fills (photo above crest, plate below)
      */}
      <div
        className={cn(
          "relative z-20 flex min-h-[100dvh] flex-col",
          EXION_WAVE_H_VAR_CLASS,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={exionAboveCrestBottomMaskStyle}
          aria-hidden
        >
          <Image
            src={exionHero.imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_42%] sm:object-[72%_40%] md:object-[62%_45%] lg:object-center"
          />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-arc-cream/55 via-arc-cream/20 to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-arc-cream/40 to-transparent sm:h-32" />
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

          <ArcTextReveal
            variant="body"
            trigger="mount"
            delayIndex={3}
            className={cn(
              "relative z-30 mx-auto mb-3 flex justify-center px-6 sm:mb-4 sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-full border border-[#d9b878]/70 bg-[color-mix(in_srgb,#c19a5b_48%,#2c2c2c)] px-6 py-3.5 text-center shadow-[0_16px_48px_rgba(44,44,44,0.22),0_0_0_1px_rgba(255,248,231,0.35)_inset] ring-1 ring-[#c19a5b]/40 backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,#c19a5b_42%,rgba(44,44,44,0.35))] sm:w-auto sm:max-w-none sm:px-8">
              <Sparkles className="h-4 w-4 shrink-0 text-white" aria-hidden />
              <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white">
                {exionHero.closingLine}
              </span>
            </div>
          </ArcTextReveal>
        </section>

        {/* Entry crest — photo above (clipped), plate below (tucked via -mt) */}
        <div className={cn("relative z-30 mt-auto", EXION_WAVE_H_CLASS)}>
          <ArcWaveSeparator
            topColor="transparent"
            bottomColor="transparent"
            shine
            tone="pearl"
          />
        </div>

        <span className="sr-only">{exionHero.imageAlt}</span>
      </div>

      {/*
        Cream plate bands — one Image per section (same file, browser-cached) so each
        gets a tighter object-cover. Stacking: earlier band higher z; later band -mt
        under the exit crest. Each plate masked above its exit crest.
      */}
      {/* ---------- Pillars ---------- */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          EXION_WAVE_MT_CLASS,
          EXION_WAVE_H_VAR_CLASS,
        )}
      >
        <ExionSectionPlate />
        <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

        <section
          className={cn(
            "relative z-10 mx-auto px-6 pb-14 pt-2 sm:px-10 sm:pb-16 md:px-12 md:pb-20",
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

        <div className={cn("relative z-30", EXION_WAVE_H_CLASS)}>
          <ArcWaveSeparator
            topColor="transparent"
            bottomColor="transparent"
            shine
            tone="pearl"
          />
        </div>
      </div>

      {/* ---------- Beautiful skin / mechanism ---------- */}
      <div
        className={cn(
          "relative z-[5] overflow-x-clip",
          EXION_WAVE_MT_CLASS,
          EXION_WAVE_H_VAR_CLASS,
        )}
      >
        <ExionSectionPlate />
        <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

        <section className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
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

        <div className={cn("relative z-30", EXION_WAVE_H_CLASS)}>
          <ArcWaveSeparator
            topColor="transparent"
            bottomColor="transparent"
            shine
            tone="pearl"
          />
        </div>
      </div>

      {/* ---------- Three transformative treatments ---------- */}
      <div
        className={cn(
          "relative z-[2] overflow-x-clip",
          EXION_WAVE_MT_CLASS,
          EXION_WAVE_H_VAR_CLASS,
        )}
      >
        <ExionSectionPlate />
        <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

        <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
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

        <div className={cn("relative z-30", EXION_WAVE_H_CLASS)}>
          <ArcWaveSeparator
            topColor="transparent"
            bottomColor="transparent"
            shine
            tone="pearl"
          />
        </div>
      </div>

      {/*
        Dark plate bands — one Image each (same file as Why different), same tuck
        pattern as the cream sections.
      */}
      <div className="relative z-[1] isolate">
        {/* ---------- Why EXION is different ---------- */}
        <div
          className={cn(
            "relative z-[1] overflow-hidden",
            EXION_WAVE_MT_CLASS,
            EXION_WAVE_H_VAR_CLASS,
          )}
        >
          <ExionDarkPlate />
          <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

          <section className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
            <div
              className={cn(
                "relative mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-center lg:gap-16",
                ARC_PAGE_RAIL_MAX,
              )}
            >
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

          <div className={cn("relative z-30", EXION_WAVE_H_CLASS)}>
            <ArcWaveSeparator
              topColor="transparent"
              bottomColor="transparent"
              shine
            />
          </div>
        </div>

        {/* ---------- The EXION experience ---------- */}
        <div
          className={cn(
            "relative z-0 overflow-hidden",
            EXION_WAVE_MT_CLASS,
            EXION_WAVE_H_VAR_CLASS,
          )}
        >
          <ExionDarkPlate />
          <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

          <section
            className="relative z-10 px-6 sm:px-10 md:px-12"
            style={experienceStyle}
          >
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

          <div className={cn("relative z-30", EXION_WAVE_H_CLASS)}>
            <ArcWaveSeparator
              topColor="transparent"
              bottomColor="transparent"
              shine
              tone="pearl"
            />
          </div>
        </div>
      </div>

      {/*
        Light plate bands — Real results + FAQ (same cream asset, one Image each).
      */}
      <div className="relative z-0 isolate">
        {/* ---------- Real results. Refined confidence. ---------- */}
        <div
          className={cn(
            "relative z-[1] overflow-x-clip",
            EXION_WAVE_MT_CLASS,
            EXION_WAVE_H_VAR_CLASS,
          )}
        >
          <ExionSectionPlate maskBottom={Boolean(treatment.faqs?.length)} />
          <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

          <section className="relative z-10 px-6 pb-10 pt-12 sm:px-10 sm:pb-12 sm:pt-16 md:px-12 md:pt-20">
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

          {!treatment.faqs?.length ? (
            <>
              <div
                className={cn(
                  "relative z-10 mx-auto px-6 pb-10 text-center sm:px-10 sm:pb-12 md:px-12",
                  ARC_PAGE_RAIL_MAX,
                )}
              >
                <ArcTextReveal variant="line">
                  <Link
                    href="/treatments"
                    className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-teal-ink transition-colors hover:text-arc-teal-ink-hover"
                  >
                    ← All treatments
                  </Link>
                </ArcTextReveal>
              </div>
              <div
                aria-hidden
                className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
              />
            </>
          ) : (
            <div className={cn("relative z-30", EXION_WAVE_H_CLASS)}>
              <ArcWaveSeparator
                topColor="transparent"
                bottomColor="transparent"
                shine
                tone="pearl"
              />
            </div>
          )}
        </div>

        {/* ---------- FAQ (+ All treatments); Home testimonials→invest feather pair ---------- */}
        {treatment.faqs?.length ? (
          <div
            className={cn(
              "relative z-0",
              EXION_WAVE_MT_CLASS,
              EXION_WAVE_H_VAR_CLASS,
            )}
          >
            <ExionSectionPlate maskBottom={false} />
            <div className={cn("relative z-10", EXION_WAVE_H_CLASS)} aria-hidden />

            <div className="relative z-10">
              <ArcFaqSection
                id="treatment-faq"
                className="border-t-0 bg-transparent pb-0"
                categories={{ treatment: treatment.title }}
                faqByCategory={{ treatment: treatment.faqs }}
              />
              <div
                className={cn(
                  "relative z-10 mx-auto px-6 pb-10 text-center sm:px-10 sm:pb-12 md:px-12",
                  ARC_PAGE_RAIL_MAX,
                )}
              >
                <ArcTextReveal variant="line">
                  <Link
                    href="/treatments"
                    className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-teal-ink transition-colors hover:text-arc-teal-ink-hover"
                  >
                    ← All treatments
                  </Link>
                </ArcTextReveal>
              </div>
            </div>

            <div
              aria-hidden
              className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
            />
          </div>
        ) : null}
      </div>

      {/* ---------- Global CTA — same invest top feather as Home (no overlap pull) ---------- */}
      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={exionClosing.supportingLine ?? homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}
