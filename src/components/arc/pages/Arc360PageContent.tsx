"use client";

import Image from "next/image";
import { Check, Sparkles } from "lucide-react";

import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcTreatmentsRuledGrid } from "@/components/arc/ArcTreatmentsRuledGrid";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ServiceCreamPlate,
  ServiceDarkPlate,
  ServiceEmblemIcon,
  ServiceGoldRule,
  ServiceWave,
  ServiceWaveInset,
  serviceAboveCrestBottomMaskStyle,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
} from "@/components/arc/servicePlate";
import {
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import { arc360Content } from "@/content/pages/arc-360";
import { allTreatments, treatmentsHub } from "@/content/pages/treatments";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import {
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

const HERO_OBJECT =
  "object-cover object-[72%_38%] sm:object-[68%_40%] md:object-[62%_42%] lg:object-[55%_center]";

/**
 * Tighter than `ARC_GALLERY_CLEAR_BELOW_LOGO`: that clearance assumes copy in the
 * left rail, which has to clear the wordmark itself. This hero is centre-aligned,
 * so it only needs to clear the nav pill and can start higher.
 */
const HERO_CLEAR_BELOW_NAV =
  "pt-[max(6.25rem,env(safe-area-inset-top))] sm:pt-[max(6.75rem,env(safe-area-inset-top))] md:pt-[max(7rem,env(safe-area-inset-top))] lg:pt-[max(7.5rem,env(safe-area-inset-top))]";

const CREAM_HEADLINE_CLASS = cn(
  "font-title-emphasis block tracking-tight text-arc-teal-ink",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
);

const DARK_HEADLINE_CLASS = cn(
  "font-title-emphasis block tracking-tight text-[#d9b878]",
  "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
  "[text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
);

const HEADLINE_SIZE = {
  fontSize: "clamp(2.5rem, 8vw, 4.35rem)",
  fontSizeAdjust: "none",
} as const;

const DARK_BODY_COLOR = "rgba(247,241,232,0.82)";

/** Arc 360 concierge membership page — EXION plate/wave system, own section shape. */
export function Arc360PageContent() {
  const {
    hero,
    connected,
    pillars,
    blueprint,
    decades,
    protecting,
    relationship,
    creamPlate,
    closing,
  } = arc360Content;
  const { ruledGrid } = treatmentsHub;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <div
        className={cn(
          "relative z-20 flex min-h-[100dvh] flex-col",
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
          style={serviceAboveCrestBottomMaskStyle}
          aria-hidden
        >
          <Image
            src={hero.imageSrc}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={hero.imageObjectClass ?? HERO_OBJECT}
          />
          {/* Soft-focus pocket under the fixed Arc logo: the marble veining runs
              straight through the top-left corner and swallows the mark. Radial
              mask so the blur and tint fade out with no visible edge. */}
          <div
            className="absolute left-0 top-0 h-[20rem] w-[20rem] backdrop-blur-[10px] sm:h-[26rem] sm:w-[26rem]"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(240,227,215,0.62) 0%, rgba(240,227,215,0.24) 45%, transparent 72%)",
              maskImage:
                "radial-gradient(circle at top left, #000 0%, #000 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at top left, #000 0%, #000 40%, transparent 75%)",
            }}
          />
          {/* Light veil only: the hero art is an abstract plate with an open
              centre, so a heavy scrim would flatten the gold and teal veining. */}
          <div className="absolute inset-0 hidden bg-gradient-to-b from-arc-cream/25 via-arc-cream/10 to-arc-champagne/22 md:block" />
          {/* Warm champagne wash on the bottom edge so the hero resolves into
              the gold pillars plate instead of cutting from cream to tan. */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-arc-champagne/60 via-arc-champagne/24 to-transparent sm:h-72" />
        </div>

        <section
          className={cn(
            "relative z-10 flex flex-1 flex-col",
            HERO_CLEAR_BELOW_NAV,
          )}
        >
          <div
            className={cn(
              "mx-auto flex w-full flex-1 flex-col justify-center px-6 sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            {/* No mobile scrim card here: the hero art is a light abstract
                plate, so the copy reads on its own with just text-shadow. */}
            <div className="relative mx-auto w-fit max-w-md text-center md:max-w-none">
              <div className="relative z-10">
                <ArcTextReveal variant="heading" trigger="mount">
                  <h1 className="font-serif text-[clamp(2.25rem,6.5vw,4rem)] font-normal leading-none tracking-tight text-arc-charcoal [text-shadow:0_1px_12px_rgba(245,240,232,0.85)] md:[text-shadow:none]">
                    <span className="block font-semibold leading-none md:whitespace-nowrap">
                      {hero.title}
                    </span>
                    <TitleEmphasis
                      className={cn(
                        arcHeadlineEmphasisClass("teal"),
                        "mt-0.5 inline-block leading-[0.82]",
                      )}
                    >
                      {hero.titleEmphasisLines.map((line, i) => (
                        <span
                          key={line}
                          className={cn(
                            // Longer sentence than a typical service emphasis line,
                            // so it only goes single-line once the rail is wide.
                            "block leading-[0.82] lg:whitespace-nowrap",
                            i > 0 && "-mt-[0.18em] text-center",
                          )}
                        >
                          {line}
                        </span>
                      ))}
                    </TitleEmphasis>
                  </h1>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={1}>
                  <p className="mt-5 font-sans text-xs font-bold uppercase tracking-[0.22em] text-arc-charcoal [text-shadow:0_1px_10px_rgba(245,240,232,0.8)] sm:text-sm md:[text-shadow:none]">
                    {hero.subhead}
                  </p>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={2}>
                  <p className="mx-auto mt-5 font-sans text-sm font-medium leading-relaxed text-arc-charcoal/92 [text-shadow:0_1px_10px_rgba(245,240,232,0.75)] sm:mt-6 sm:text-base md:max-w-2xl md:font-normal md:text-arc-charcoal/78 md:[text-shadow:none]">
                    {hero.intro}
                  </p>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={3}>
                  <a
                    href={hero.jumpHref}
                    className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-arc-teal-ink/30 bg-arc-cream/85 px-6 py-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-arc-teal-ink shadow-[0_10px_30px_rgba(44,44,44,0.12)] backdrop-blur-sm transition-colors hover:border-arc-teal-ink/55 hover:bg-arc-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream sm:text-xs"
                  >
                    {hero.jumpLabel}
                    <span aria-hidden>↓</span>
                  </a>
                </ArcTextReveal>
              </div>
            </div>
          </div>

          <ArcTextReveal
            variant="body"
            trigger="mount"
            delayIndex={4}
            className={cn(
              // mt keeps the pill off the jump chip when the copy column is tall.
              "relative z-30 mx-auto mb-3 mt-10 flex justify-center px-6 sm:mb-4 sm:mt-12 sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="inline-flex w-full max-w-md items-center justify-center gap-2.5 rounded-full border border-[#d9b878]/70 bg-[color-mix(in_srgb,#c19a5b_48%,#2c2c2c)] px-6 py-3.5 text-center shadow-[0_16px_48px_rgba(44,44,44,0.22),0_0_0_1px_rgba(255,248,231,0.35)_inset] ring-1 ring-[#c19a5b]/40 backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,#c19a5b_42%,rgba(44,44,44,0.35))] sm:w-auto sm:max-w-none sm:px-8">
              <Sparkles className="h-4 w-4 shrink-0 text-white" aria-hidden />
              <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white">
                {hero.closingLine}
              </span>
            </div>
          </ArcTextReveal>
        </section>

        <ServiceWave tone="pearl" className="mt-auto" />

        <span className="sr-only">{hero.imageAlt}</span>
      </div>

      {/* ---------- Your health is connected ---------- */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlate.src} />
        <ServiceWaveInset />

        <section className="relative z-10 px-6 py-14 sm:px-10 sm:py-16 md:px-12 md:py-20">
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
              "relative z-10 mx-auto grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none lg:text-left">
              <ArcTextReveal variant="heading">
                <h2 className="text-balance leading-[0.88] text-arc-teal-ink">
                  {connected.titleLines.map((line, i) => (
                    <span
                      key={line}
                      className={cn(CREAM_HEADLINE_CLASS, i > 0 && "-mt-[0.12em]")}
                      style={HEADLINE_SIZE}
                    >
                      {line}
                    </span>
                  ))}
                </h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className="mx-auto mt-6 max-w-md font-sans text-sm leading-relaxed text-arc-charcoal/78 sm:text-base lg:mx-0 lg:max-w-xl">
                  {connected.body}
                </p>
              </ArcTextReveal>
              <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2.5 text-left lg:mx-0 lg:max-w-xl">
                {connected.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 font-sans text-sm text-arc-charcoal/80 sm:text-[0.9375rem]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-arc-teal-ink"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ArcTextReveal
              variant="body"
              delayIndex={2}
              className="relative -mx-6 w-[calc(100%+3rem)] max-w-none sm:-mx-10 sm:w-[calc(100%+5rem)] lg:mx-0 lg:w-full"
            >
              <div className="rounded-none border-y border-arc-champagne/30 bg-arc-cream/40 p-0 shadow-none sm:rounded-[28px] sm:border sm:border-arc-champagne/25 sm:p-2 md:p-3.5 md:shadow-[0_28px_80px_rgba(44,44,44,0.14)]">
                <div className="relative aspect-[4/3] w-full min-h-[14.5rem] overflow-hidden rounded-none sm:aspect-[16/10] sm:min-h-0 sm:rounded-[18px] lg:aspect-video">
                  <Image
                    src={connected.imageSrc}
                    alt={connected.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </ArcTextReveal>
          </div>

          <div
            className={cn(
              "relative z-10 mx-auto mt-14 max-w-3xl text-center sm:mt-16",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <ServiceGoldRule className="mx-auto" />
            {connected.pullQuote.map((line, i) => (
              <ArcTextReveal key={line} variant="body" delayIndex={i + 1}>
                <p className="mt-4 font-serif text-lg italic leading-relaxed text-arc-charcoal sm:text-xl">
                  {line}
                </p>
              </ArcTextReveal>
            ))}
          </div>

          <div className="relative z-10 mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-5 gap-y-10 sm:mt-16 sm:grid-cols-4 md:gap-x-6">
            {pillars.map((pillar, i) => (
              <ArcTextReveal key={pillar.title} variant="body" delayIndex={i}>
                <div className="flex h-full flex-col items-center text-center">
                  <ServiceEmblemIcon
                    src={pillar.iconSrc}
                    className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"
                  />
                  <h3 className="mt-2 sm:mt-3">
                    <TitleEmphasis className="block text-[clamp(1.45rem,3.6vw,2rem)] leading-[0.92] tracking-tight text-arc-teal-ink [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                      {pillar.title}
                    </TitleEmphasis>
                  </h3>
                  <p className="mt-1.5 max-w-[14rem] font-sans text-sm leading-relaxed text-arc-charcoal/70 sm:mt-2 sm:text-[0.9375rem]">
                    {pillar.body}
                  </p>
                </div>
              </ArcTextReveal>
            ))}
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* ---------- Every pathway (kept from the treatments hub) ---------- */}
      <div
        className={cn(
          "relative z-[6] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlate.src} />
        <ServiceWaveInset />

        <ArcTreatmentsRuledGrid
          id="treatments-index"
          title={ruledGrid.title}
          titleEmphasis={ruledGrid.titleEmphasis}
          subtitle={ruledGrid.subtitle}
          treatments={allTreatments}
          className="scroll-mt-32 bg-transparent pt-4 sm:scroll-mt-40 sm:pt-6 md:scroll-mt-44 lg:scroll-mt-52"
        />

        <ServiceWave tone="pearl" />
      </div>

      {/* ---------- Your Arc Blueprint ---------- */}
      <div
        className={cn(
          "relative z-[5] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlate.src} />
        <ServiceWaveInset />

        <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
          <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
            <div className="mx-auto max-w-4xl text-center">
              <ArcTextReveal variant="heading">
                <h2 className="text-balance leading-[0.92]">
                  <span className={CREAM_HEADLINE_CLASS} style={HEADLINE_SIZE}>
                    {blueprint.title} {blueprint.titleEmphasis}
                  </span>
                </h2>
              </ArcTextReveal>
              <ServiceGoldRule className="mx-auto mt-6" />
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className="mt-6 font-serif text-lg italic leading-relaxed text-arc-charcoal sm:text-xl">
                  {blueprint.intro}
                </p>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={2}>
                <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-arc-charcoal/78 sm:text-base">
                  {blueprint.body}
                </p>
              </ArcTextReveal>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
              {blueprint.cards.map((card, i) => (
                <ArcTextReveal
                  key={card.title}
                  variant="body"
                  delayIndex={i + 1}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col rounded-[1.75rem] border-4 border-arc-champagne bg-white p-7 text-center shadow-[0_20px_50px_-30px_rgba(120,90,40,0.35)] transition-transform duration-500 ease-out hover:-translate-y-2">
                    <h3>
                      <TitleEmphasis className="block text-[clamp(1.6rem,3.8vw,2.1rem)] leading-[0.95] tracking-tight text-arc-teal-ink [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                        {card.title}
                      </TitleEmphasis>
                    </h3>
                    <p className="mt-1 font-serif text-lg italic text-arc-champagne">
                      {card.tagline}
                    </p>
                    <p className="my-auto pt-4 font-sans text-sm leading-relaxed text-arc-charcoal/70">
                      {card.body}
                    </p>
                  </article>
                </ArcTextReveal>
              ))}
            </div>

            <ArcTextReveal variant="body" delayIndex={2}>
              <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-lg italic leading-relaxed text-arc-charcoal sm:text-xl">
                {blueprint.closingLine}
              </p>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* ---------- Dark acts: decades + what we protect ---------- */}
      <div className="relative z-[1] isolate">
        <div
          className={cn(
            "relative z-[1] overflow-hidden",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceDarkPlate src={decades.backgroundSrc} />
          <ServiceWaveInset />

          <section className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
            <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
              <div className="mx-auto max-w-3xl text-center">
                <ArcTextReveal variant="heading">
                  <h2 className="text-balance leading-[0.92]">
                    <span className={DARK_HEADLINE_CLASS} style={HEADLINE_SIZE}>
                      {decades.title} {decades.titleEmphasis}
                    </span>
                  </h2>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p
                    className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
                    style={{ color: DARK_BODY_COLOR }}
                  >
                    {decades.intro}
                  </p>
                </ArcTextReveal>
              </div>

              {/* Wrapping flex rather than a grid so the short last row
                  (5 cards over 3 columns) centers instead of hanging left. */}
              <ol className="mt-14 flex flex-wrap justify-center gap-8">
                {decades.steps.map((step, i) => (
                  <ArcTextReveal
                    as="li"
                    key={step.age}
                    variant="body"
                    delayIndex={i + 1}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]"
                  >
                    <div className="flex h-full flex-col rounded-[1.5rem] border border-[#d9b878]/30 bg-white/[0.04] p-7 backdrop-blur-sm">
                      <p
                        className="font-serif text-[clamp(2.5rem,7vw,3.5rem)] leading-none text-[#d9b878]"
                        aria-hidden
                      >
                        {step.age}
                      </p>
                      <h3 className="mt-3">
                        <span className="sr-only">{step.age}: </span>
                        <TitleEmphasis className="block text-[clamp(1.5rem,3.6vw,2rem)] leading-[0.95] tracking-tight text-[#d9b878] [-webkit-text-stroke:0.05em_color-mix(in_srgb,currentColor_50%,transparent)] [text-shadow:0_2px_14px_rgba(0,0,0,0.35)]">
                          {step.title}
                        </TitleEmphasis>
                      </h3>
                      <ul className="mt-5 flex flex-col gap-2.5">
                        {step.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 font-sans text-sm sm:text-[0.9375rem]"
                            style={{ color: DARK_BODY_COLOR }}
                          >
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#d9b878]"
                              strokeWidth={2}
                              aria-hidden
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <p
                        className="mt-auto pt-6 font-serif text-base italic leading-relaxed sm:text-lg"
                        style={{ color: "rgba(247,241,232,0.72)" }}
                      >
                        {step.closingLine}
                      </p>
                    </div>
                  </ArcTextReveal>
                ))}
              </ol>
            </div>
          </section>

          <ServiceWave />
        </div>

        <div
          className={cn(
            "relative z-0 overflow-hidden",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceDarkPlate src={decades.backgroundSrc} />
          <ServiceWaveInset />

          <section className="relative z-10 px-6 pb-16 pt-6 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
            <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
              <div className="mx-auto max-w-2xl text-center">
                <ArcTextReveal variant="heading">
                  <h2 className="text-balance leading-[0.92]">
                    <span className={DARK_HEADLINE_CLASS} style={HEADLINE_SIZE}>
                      {protecting.title} {protecting.titleEmphasis}
                    </span>
                  </h2>
                </ArcTextReveal>
              </div>

              <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
                {protecting.items.map((item, i) => (
                  <ArcTextReveal
                    key={item.title}
                    variant="body"
                    delayIndex={i + 1}
                    className={cn(
                      i === protecting.items.length - 1 &&
                        "col-span-2 justify-self-center sm:col-span-1",
                    )}
                  >
                    <div className="flex flex-col items-center text-center">
                      <ServiceEmblemIcon
                        src={item.iconSrc}
                        className="h-24 w-24 sm:h-28 sm:w-28"
                      />
                      <h3 className="mt-4 max-w-[12rem]">
                        <TitleEmphasis className="block text-[clamp(1.6rem,4vw,2.15rem)] leading-[0.92] tracking-tight text-[#d9b878] [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_2px_14px_rgba(0,0,0,0.35),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                          {item.title}
                        </TitleEmphasis>
                      </h3>
                      <p
                        className="mt-2 max-w-[15rem] font-sans text-sm leading-relaxed sm:text-base"
                        style={{ color: "rgba(247,241,232,0.72)" }}
                      >
                        {item.facets.join(" · ")}
                      </p>
                    </div>
                  </ArcTextReveal>
                ))}
              </div>
            </div>
          </section>

          <ServiceWave tone="pearl" />
        </div>
      </div>

      {/* ---------- More than a visit → Invest ---------- */}
      <div className="relative z-0 isolate">
        <div
          className={cn(
            "relative z-0",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceCreamPlate src={creamPlate.src} maskBottom={false} />
          <ServiceWaveInset />

          <section className="relative z-10 px-6 pb-16 pt-6 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
            <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
              <div className="mx-auto max-w-3xl text-center">
                <ArcTextReveal variant="heading">
                  <h2 className="text-balance leading-[0.92]">
                    <span className={CREAM_HEADLINE_CLASS} style={HEADLINE_SIZE}>
                      {relationship.title} {relationship.titleEmphasis}
                    </span>
                  </h2>
                </ArcTextReveal>
                <ServiceGoldRule className="mx-auto mt-6" />
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p className="mt-6 font-serif text-lg italic leading-relaxed text-arc-charcoal sm:text-xl">
                    {relationship.intro}
                  </p>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={2}>
                  <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-arc-charcoal/78 sm:text-base">
                    {relationship.body}
                  </p>
                </ArcTextReveal>
              </div>

              <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
                {relationship.triad.map((item, i) => (
                  <ArcTextReveal
                    key={item.title}
                    variant="body"
                    delayIndex={i + 1}
                  >
                    <div className="flex h-full flex-col items-center text-center">
                      <ServiceEmblemIcon
                        src={item.iconSrc}
                        className="h-20 w-20 sm:h-24 sm:w-24"
                      />
                      <h3 className="mt-3">
                        <TitleEmphasis className="block text-[clamp(1.5rem,3.6vw,2rem)] leading-[0.92] tracking-tight text-arc-teal-ink [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]">
                          {item.title}
                        </TitleEmphasis>
                      </h3>
                      <p className="mt-2 max-w-[18rem] font-sans text-sm leading-relaxed text-arc-charcoal/70 sm:text-[0.9375rem]">
                        {item.body}
                      </p>
                    </div>
                  </ArcTextReveal>
                ))}
              </div>

              <div className="mx-auto mt-14 max-w-2xl text-center sm:mt-16">
                <ServiceGoldRule className="mx-auto" />
                {relationship.closingLines.map((line, i) => (
                  <ArcTextReveal key={line} variant="body" delayIndex={i + 1}>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-arc-charcoal/78 sm:text-base">
                      {line}
                    </p>
                  </ArcTextReveal>
                ))}
              </div>
            </div>
          </section>

          <div aria-hidden className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS} />
        </div>
      </div>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={closing.supportingLine || homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}
