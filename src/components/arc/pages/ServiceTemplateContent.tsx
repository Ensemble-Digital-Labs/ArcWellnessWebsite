"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties } from "react";
import { Check, Sparkles } from "lucide-react";

import { ArcCountUpStat } from "@/components/arc/ArcCountUpStat";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ServiceCreamPlate as CreamPlate,
  ServiceDarkPlate as DarkPlate,
  ServiceEmblemIcon as EmblemIcon,
  ServiceGoldRule as GoldRule,
  ServiceWave,
  serviceAboveCrestBottomMaskStyle as aboveCrestBottomMaskStyle,
  SERVICE_WAVE_H_CLASS as WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS as WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS as WAVE_MT_CLASS,
} from "@/components/arc/servicePlate";
import {
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import type { TreatmentPage } from "@/content/pages/treatments";
import type { ServicePageContent } from "@/content/pages/serviceTemplate";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ServiceTemplateContentProps = {
  treatment: TreatmentPage;
  content: ServicePageContent;
};

const experienceStyle: CSSProperties = {
  paddingTop: "clamp(1.5rem, 3vw, 3rem)",
  paddingBottom: "clamp(3.5rem, 7vw, 7rem)",
};

const DEFAULT_HERO_OBJECT =
  "object-cover object-[92%_42%] sm:object-[78%_45%] md:object-[65%_45%] lg:object-[58%_center]";

/** Shared EXION-template service page — content/assets only differ per treatment. */
export function ServiceTemplateContent({
  treatment,
  content,
}: ServiceTemplateContentProps) {
  const {
    hero,
    pillars,
    creamPlate,
    mechanism,
    treatments,
    different,
    experience,
    closing,
  } = content;

  const hasStats = Boolean(mechanism.stats?.length);
  const hasEvalBullets = Boolean(mechanism.evaluationBullets?.length);
  const hasMechanismMedia = Boolean(
    mechanism.imageSrc || mechanism.videoEmbedSrc,
  );
  const cardCount = treatments.cards.length;

  return (
    <div className="relative w-full max-w-[100%] overflow-x-clip">
    <>
      {/* ---------- Hero ---------- */}
      <div
        className={cn(
          "relative z-20 flex flex-col",
          hero.shellClass ?? (hero.compact ? "min-h-0" : "min-h-[100dvh]"),
          WAVE_H_VAR_CLASS,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
          style={aboveCrestBottomMaskStyle}
          aria-hidden
        >
          <Image
            src={hero.imageSrc}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={hero.imageObjectClass ?? DEFAULT_HERO_OBJECT}
          />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-arc-cream/55 via-arc-cream/20 to-transparent md:block" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-arc-cream/40 to-transparent sm:h-32" />
        </div>

        <section
          className={cn(
            "relative z-10 flex flex-col",
            !hero.compact && "flex-1",
            ARC_GALLERY_CLEAR_BELOW_LOGO,
          )}
        >
          {/* Text + pill stay one unit so tall phones don’t orphan the pill at the wave. */}
          <div
            className={cn(
              "mx-auto flex w-full flex-col px-6 sm:px-10 md:px-12",
              hero.compact ? "justify-start" : "flex-1 justify-center",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="arc-service-hero-copy relative mx-auto w-full max-w-md text-center md:mx-0 md:w-fit md:max-w-none md:text-left">
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
                  <h1 className="font-serif text-[clamp(2rem,7.2vw,4rem)] font-normal leading-none tracking-tight text-arc-charcoal [text-shadow:0_1px_12px_rgba(245,240,232,0.85)] md:text-[clamp(2.25rem,6.5vw,4rem)] md:[text-shadow:none]">
                    <span className="block font-semibold leading-none md:whitespace-nowrap">
                      {hero.title}
                    </span>
                    <TitleEmphasis
                      className={cn(
                        arcHeadlineEmphasisClass("teal"),
                        "mt-0.5 inline-block max-w-full leading-[0.82]",
                      )}
                    >
                      {hero.titleEmphasisLines.map((line, i) => (
                        <span
                          key={`${i}-${line}`}
                          className={cn(
                            "block whitespace-nowrap leading-[0.82]",
                            i > 0 && "-mt-[0.18em] text-center md:text-left",
                          )}
                        >
                          {line}
                        </span>
                      ))}
                    </TitleEmphasis>
                  </h1>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={1}>
                  <p
                    className={cn(
                      "text-balance font-sans text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-arc-charcoal [text-shadow:0_1px_10px_rgba(245,240,232,0.8)] sm:text-xs sm:tracking-[0.2em] md:text-sm md:tracking-[0.22em] md:[text-shadow:none]",
                      hero.copyGapClass ?? "mt-5",
                      hero.copyMaxClass ?? "md:max-w-md",
                    )}
                  >
                    {hero.subhead}
                  </p>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={2}>
                  <p
                    className={cn(
                      "font-sans text-sm font-medium leading-relaxed text-arc-charcoal/92 [text-shadow:0_1px_10px_rgba(245,240,232,0.75)] sm:text-base md:font-normal md:text-arc-charcoal/78 md:[text-shadow:none]",
                      hero.copyGapClass ?? "mt-5 sm:mt-6",
                      hero.copyMaxClass ?? "md:max-w-md",
                    )}
                  >
                    {hero.intro}
                  </p>
                </ArcTextReveal>
              </div>
            </div>

            <div
              className={cn(
                "arc-service-hero-pill relative z-30 mx-auto mt-6 flex w-full justify-center sm:mt-7 md:mt-8",
                hero.closingPillClass,
              )}
            >
              <ArcTextReveal
                variant="body"
                trigger="mount"
                delayIndex={3}
                className="flex w-full justify-center"
              >
                <div className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full border border-[#d9b878]/70 bg-[color-mix(in_srgb,#c19a5b_48%,#2c2c2c)] px-4 py-3 text-center shadow-[0_16px_48px_rgba(44,44,44,0.22),0_0_0_1px_rgba(255,248,231,0.35)_inset] ring-1 ring-[#c19a5b]/40 backdrop-blur-xl supports-[backdrop-filter]:bg-[color-mix(in_srgb,#c19a5b_42%,rgba(44,44,44,0.35))] sm:w-auto sm:max-w-none sm:gap-2.5 sm:px-8 sm:py-3.5">
                  <Sparkles
                    className="h-3.5 w-3.5 shrink-0 text-white sm:h-4 sm:w-4"
                    aria-hidden
                  />
                  <span className="min-w-0 text-balance font-sans text-[0.625rem] font-semibold uppercase leading-snug tracking-[0.12em] text-white sm:text-[0.6875rem] sm:tracking-[0.18em]">
                    {hero.closingLine}
                  </span>
                </div>
              </ArcTextReveal>
            </div>
          </div>
        </section>

        <ServiceWave tone="pearl" className="mt-auto" />

        <span className="sr-only">{hero.imageAlt}</span>
      </div>

      {/* ---------- Pillars ---------- */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          WAVE_MT_CLASS,
          WAVE_H_VAR_CLASS,
        )}
      >
        <CreamPlate src={creamPlate.src} />
        <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />

        <section
          className={cn(
            "relative z-10 mx-auto px-6 pb-14 pt-2 sm:px-10 sm:pb-16 md:px-12 md:pb-20",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-5 md:gap-x-6 lg:gap-x-8">
            {pillars.map((pillar, i) => (
              <ArcTextReveal key={pillar.title} variant="body" delayIndex={i}>
                <div className="flex h-full flex-col items-center text-center">
                  <EmblemIcon
                    src={pillar.iconSrc}
                    plate
                    className="h-24 w-24 sm:h-28 sm:w-28 md:h-[7.25rem] md:w-[7.25rem]"
                    iconClassName={
                      pillar.iconClassName ??
                      (pillar.title === "Digestion" ||
                      pillar.title === "Immunity"
                        ? "origin-center scale-[1.45]"
                        : pillar.title === "Sleep" ||
                            pillar.title === "Stress & Sleep"
                          ? "origin-center scale-[1.28]"
                          : pillar.title === "Muscle"
                            ? "origin-center scale-[1.35]"
                            : undefined)
                    }
                  />
                  <h3 className="mt-2 sm:mt-3">
                    <TitleEmphasis className="block text-[clamp(1.55rem,3.8vw,2.15rem)] leading-[0.92] tracking-tight text-arc-teal-ink [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                      {pillar.title}
                    </TitleEmphasis>
                  </h3>
                  <p className="mt-1.5 max-w-[14rem] font-sans text-sm leading-relaxed text-arc-charcoal/70 sm:mt-2 sm:text-[0.9375rem]">
                    {pillar.body}
                  </p>
                </div>
              </ArcTextReveal>
            ))}

            <ArcTextReveal
              variant="body"
              delayIndex={4}
              className="col-span-2 justify-self-center sm:col-span-1 md:col-span-1"
            >
              <div className="flex h-full flex-col items-center text-center">
                <EmblemIcon
                  src={hero.poweredByIconSrc}
                  plate
                  className="h-24 w-24 sm:h-28 sm:w-28 md:h-[7.25rem] md:w-[7.25rem]"
                />
                <h3 className="mt-2 max-w-[13rem] sm:mt-3">
                  <TitleEmphasis className="block text-[clamp(1.55rem,3.8vw,2rem)] leading-[0.92] tracking-tight text-arc-teal-ink [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                    {hero.poweredByEyebrow}
                  </TitleEmphasis>
                </h3>
                <p className="mt-1.5 max-w-[14rem] font-sans text-sm leading-relaxed text-arc-charcoal/70 sm:mt-2 sm:text-[0.9375rem]">
                  {hero.synergyLine}
                </p>
              </div>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* ---------- Mechanism ---------- */}
      <div
        className={cn(
          "relative z-[5] overflow-x-clip",
          WAVE_MT_CLASS,
          WAVE_H_VAR_CLASS,
        )}
      >
        <CreamPlate src={creamPlate.src} />
        <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />

        <section className="relative z-10 overflow-x-clip px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-0 hidden h-72 w-72 rounded-full opacity-40 md:block md:blur-2xl"
            style={{
              background:
                "radial-gradient(circle at center, rgba(193,154,91,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className={cn(
              "relative z-10 mx-auto grid min-w-0 items-center gap-8 sm:gap-12",
              hasMechanismMedia && "lg:grid-cols-2 lg:gap-16",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div
              className={cn(
                "mx-auto w-full min-w-0 max-w-lg text-center lg:max-w-none",
                hasMechanismMedia ? "lg:mx-0 lg:text-left" : "lg:mx-auto",
              )}
            >
              <div className="min-w-0 overflow-x-clip">
                <ArcTextReveal variant="heading">
                  <h2 className="mx-auto max-w-[18.5rem] text-balance leading-[0.9] text-arc-teal-ink sm:max-w-none">
                    {mechanism.titleLines.map((line, i) => (
                      <span
                        key={line}
                        className={cn(
                          "font-title-emphasis block max-w-full tracking-tight text-arc-teal-ink",
                          "[text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
                          i > 0 && "-mt-[0.12em]",
                        )}
                        style={{
                          fontSize: "clamp(1.95rem, 7.2vw, 4.35rem)",
                          fontSizeAdjust: "none",
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </h2>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p
                    className={cn(
                      "mt-6 font-sans text-sm leading-relaxed text-arc-charcoal/78 sm:text-base",
                      hasMechanismMedia
                        ? "mx-auto max-w-md lg:mx-0 lg:max-w-xl"
                        : "mx-auto max-w-2xl",
                    )}
                  >
                    {mechanism.body}
                  </p>
                </ArcTextReveal>
              </div>

              {hasStats ? (
                <div className="mt-10 grid w-full min-w-0 grid-cols-2 gap-x-3 gap-y-8 justify-items-stretch sm:grid-cols-4 sm:gap-8 sm:justify-items-center lg:justify-items-start lg:gap-5">
                  {mechanism.stats!.map((stat, i) => (
                    <ArcCountUpStat
                      key={stat.label}
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      label={stat.label}
                      align="center"
                      className="min-w-0 w-full max-w-full px-0.5 lg:items-start lg:text-left"
                      durationMs={1800}
                      startDelayMs={200 + i * 60}
                      numberClassName="text-[2.1rem] font-normal leading-none text-arc-teal-ink sm:text-[2.75rem] md:text-5xl"
                      labelClassName="mt-2 w-full max-w-full text-pretty text-[0.8125rem] leading-snug text-arc-charcoal/70 sm:text-[0.9375rem]"
                    />
                  ))}
                </div>
              ) : null}

              {hasEvalBullets ? (
                <ul
                  className={cn(
                    "mt-8 flex flex-col gap-2.5",
                    hasMechanismMedia
                      ? "mx-auto max-w-md text-left lg:mx-0 lg:max-w-xl"
                      : "mx-auto max-w-xl text-left",
                  )}
                >
                  {mechanism.evaluationBullets!.map((bullet) => (
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
              ) : null}
            </div>

            {hasMechanismMedia ? (
              <div className="relative min-w-0 w-full">
                <ArcTextReveal variant="body" delayIndex={2} className="block">
                  {/* Full-bleed like EXION — bleed lives on the media shell only, not the text column. */}
                  <div className="relative -mx-6 w-[calc(100%+3rem)] max-w-none sm:-mx-10 sm:w-[calc(100%+5rem)] lg:mx-0 lg:w-full">
                    <div className="overflow-hidden rounded-none border-y border-arc-champagne/30 bg-arc-cream/40 p-0 shadow-none sm:rounded-[28px] sm:border sm:border-arc-champagne/25 sm:p-2 md:p-3.5 md:shadow-[0_28px_80px_rgba(44,44,44,0.14)]">
                      <div
                        className={cn(
                          "relative w-full min-h-[14.5rem] overflow-hidden rounded-none sm:min-h-0 sm:rounded-[18px]",
                          mechanism.videoEmbedSrc
                            ? "aspect-video"
                            : (mechanism.imageAspectClass ?? "aspect-[3/2]"),
                        )}
                      >
                        {mechanism.videoEmbedSrc ? (
                          <iframe
                            src={mechanism.videoEmbedSrc}
                            title={
                              mechanism.videoTitle ?? `${treatment.title} video`
                            }
                            className="absolute inset-0 h-full w-full border-0"
                            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        ) : mechanism.imageSrc ? (
                          <Image
                            src={mechanism.imageSrc}
                            alt={mechanism.imageAlt ?? ""}
                            fill
                            sizes="(min-width: 1024px) 40vw, 100vw"
                            className={
                              mechanism.imageObjectClass ??
                              "object-cover object-center scale-[1.01]"
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </ArcTextReveal>
              </div>
            ) : null}
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* ---------- Treatment / pathway cards ---------- */}
      <div
        className={cn(
          "relative z-[2] overflow-x-clip",
          WAVE_MT_CLASS,
          WAVE_H_VAR_CLASS,
        )}
      >
        <CreamPlate src={creamPlate.src} />
        <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />

        <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
          <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
            <div className="mx-auto max-w-4xl text-center">
              <ArcTextReveal variant="heading">
                <h2 className="text-balance leading-[0.92]">
                  <span
                    className={cn(
                      "font-title-emphasis block tracking-tight text-arc-teal-ink",
                      "[text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
                    )}
                    style={{
                      fontSize: "clamp(2.85rem, 8.5vw, 4.35rem)",
                      fontSizeAdjust: "none",
                    }}
                  >
                    {treatments.title} {treatments.titleEmphasis}
                  </span>
                </h2>
              </ArcTextReveal>
              <GoldRule className="mx-auto mt-6" />
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className="mt-6 font-serif text-lg italic leading-relaxed text-arc-charcoal sm:text-xl">
                  {treatments.intro}
                </p>
              </ArcTextReveal>
            </div>

            <div
              className={cn(
                "mt-12 grid grid-cols-1 gap-6 sm:mt-14",
                cardCount === 2 && "md:grid-cols-2",
                cardCount === 3 && "md:grid-cols-2 lg:grid-cols-3",
                cardCount >= 4 && "md:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {treatments.cards.map((card, i) => (
                <ArcTextReveal
                  key={card.title}
                  variant="body"
                  delayIndex={i + 1}
                  className="h-full"
                >
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border-4 border-arc-champagne bg-white shadow-[0_20px_50px_-30px_rgba(120,90,40,0.35)] transition-transform duration-500 ease-out hover:-translate-y-2">
                    <div className="relative h-64 w-full shrink-0 overflow-hidden bg-arc-champagne/20 sm:h-72">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className={cn(
                          "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                          card.imageObjectClass ?? "object-center",
                        )}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-7">
                      <div className="text-center">
                        {card.eyebrow ? (
                          <p className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-arc-charcoal/45">
                            {card.eyebrow}
                          </p>
                        ) : null}
                        <h3 className={card.eyebrow ? "mt-1" : undefined}>
                          <TitleEmphasis className="block text-[clamp(1.85rem,4.2vw,2.35rem)] leading-[0.92] tracking-tight text-arc-teal-ink [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                            {card.title}
                          </TitleEmphasis>
                        </h3>
                        <p className="mt-1 font-serif text-lg italic text-arc-champagne">
                          {card.tagline}
                        </p>
                      </div>
                      {/* my-auto centers the body in whatever slack the tallest card
                          creates, keeping titles top-aligned and bullets bottom-aligned. */}
                      <p className="my-auto text-center font-sans text-sm leading-relaxed text-arc-charcoal/70">
                        {card.body}
                      </p>
                      <ul className="flex flex-col gap-2.5 pt-2">
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

        <ServiceWave tone="pearl" />
      </div>

      {/* ---------- Dark acts: Why different + Experience ---------- */}
      <div className="relative z-[1] isolate">
        <div
          className={cn(
            "relative z-[1] overflow-x-clip",
            WAVE_MT_CLASS,
            WAVE_H_VAR_CLASS,
          )}
        >
          <DarkPlate src={different.backgroundSrc} />
          <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />

          <section className="relative z-10 px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
            <div
              className={cn(
                "relative mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.6fr] lg:items-start lg:gap-16",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <div
                className={cn(
                  "mx-auto max-w-lg text-center lg:mx-0 lg:max-w-none lg:text-left",
                  "lg:sticky lg:top-44 lg:self-start xl:top-52",
                )}
              >
                <ArcTextReveal variant="heading">
                  <h2 className="text-balance leading-[0.92]">
                    <span
                      className={cn(
                        "font-title-emphasis block tracking-tight text-[#d9b878]",
                        "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
                        "[text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
                      )}
                      style={{
                        fontSize: "clamp(2.5rem, 8.5vw, 5rem)",
                        fontSizeAdjust: "none",
                      }}
                    >
                      {different.title} {different.titleEmphasis}
                    </span>
                  </h2>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p
                    className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed sm:text-lg lg:mx-0"
                    style={{ color: "rgba(247,241,232,0.82)" }}
                  >
                    {different.intro}
                  </p>
                </ArcTextReveal>
              </div>

              <div
                className={cn(
                  "grid gap-x-8 gap-y-12 sm:grid-cols-2",
                  // 10 cards → two even rows of five (avoids a 3×3 + orphan).
                  different.cards.length === 10 && "lg:grid-cols-5 lg:gap-x-5 lg:gap-y-10",
                  different.cards.length >= 5 &&
                    different.cards.length !== 10 &&
                    "lg:grid-cols-3",
                  different.cards.length === 4 && "lg:grid-cols-2",
                  different.cards.length <= 3 && "lg:grid-cols-3",
                )}
              >
                {different.cards.map((card, i) => (
                  <ArcTextReveal
                    key={card.title}
                    variant="body"
                    delayIndex={i + 1}
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      <EmblemIcon
                        src={card.iconSrc}
                        className="h-28 w-28"
                        iconClassName={
                          card.iconClassName ??
                          (card.title === "Whole Picture"
                            ? "origin-center scale-[1.65]"
                            : card.title === "Restorative Sleep" ||
                                card.title === "Muscle Protected"
                              ? "origin-center scale-[1.35]"
                              : undefined)
                        }
                      />
                      <h3 className="max-w-[16rem]">
                        <TitleEmphasis className="block text-[clamp(1.85rem,4.6vw,2.45rem)] leading-[0.92] tracking-tight text-[#d9b878] [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_2px_14px_rgba(0,0,0,0.35),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                          {card.title}
                        </TitleEmphasis>
                      </h3>
                      <p
                        className="font-sans text-base leading-relaxed sm:text-lg"
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

          <ServiceWave />
        </div>

        <div
          className={cn(
            "relative z-0 overflow-hidden",
            WAVE_MT_CLASS,
            WAVE_H_VAR_CLASS,
          )}
        >
          <DarkPlate src={different.backgroundSrc} />
          <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />

          <section
            className="relative z-10 px-6 sm:px-10 md:px-12"
            style={experienceStyle}
          >
            <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
              <div className="mx-auto max-w-2xl text-center">
                <ArcTextReveal variant="heading">
                  <h2 className="text-balance leading-[0.92]">
                    <span
                      className={cn(
                        "font-title-emphasis block tracking-tight text-[#d9b878]",
                        "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
                        "[text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
                      )}
                      style={{
                        fontSize: "clamp(3rem, 9vw, 5rem)",
                        fontSizeAdjust: "none",
                      }}
                    >
                      {experience.title} {experience.titleEmphasis}
                    </span>
                  </h2>
                </ArcTextReveal>
              </div>

              <ol
                className={cn(
                  "mt-14 grid grid-cols-2 items-start gap-x-6 gap-y-12 sm:grid-cols-3 lg:gap-6",
                  experience.steps.length === 4 && "lg:grid-cols-4",
                  experience.steps.length === 5 && "lg:grid-cols-5",
                  experience.steps.length !== 4 &&
                    experience.steps.length !== 5 &&
                    "lg:grid-cols-3",
                )}
              >
                {experience.steps.map((step, i) => (
                  <ArcTextReveal
                    as="li"
                    key={step.title}
                    variant="body"
                    delayIndex={i + 1}
                    className={cn(
                      "flex flex-col items-center justify-start text-center",
                      // Solo last cell on 2-col only — keep 5-up desktop row even.
                      i === experience.steps.length - 1 &&
                        experience.steps.length % 2 === 1 &&
                        "col-span-2 justify-self-center sm:col-span-1",
                    )}
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
                      <EmblemIcon
                        src={step.iconSrc}
                        className="h-full w-full origin-center"
                        iconClassName={
                          step.iconClassName ??
                          (step.title === "Strengthen"
                            ? "origin-center scale-[1.55]"
                            : undefined)
                        }
                      />
                    </div>
                    <h3 className="mt-4 max-w-[12rem]">
                      <TitleEmphasis className="block text-[clamp(1.85rem,4.6vw,2.45rem)] leading-[0.92] tracking-tight text-[#d9b878] [-webkit-text-stroke:0.055em_color-mix(in_srgb,currentColor_55%,transparent)] [text-shadow:0_2px_14px_rgba(0,0,0,0.35),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]">
                        {step.title}
                      </TitleEmphasis>
                    </h3>
                    <p
                      className="mt-2 max-w-[15rem] font-sans text-base leading-relaxed sm:text-lg"
                      style={{ color: "rgba(247,241,232,0.72)" }}
                    >
                      {step.body}
                    </p>
                  </ArcTextReveal>
                ))}
              </ol>
            </div>
          </section>

          <ServiceWave tone="pearl" />
        </div>
      </div>

      {/* ---------- FAQ → Invest (no BA) ---------- */}
      <div className="relative z-0 isolate">
        {treatment.faqs?.length ? (
          <div className={cn("relative z-0", WAVE_MT_CLASS, WAVE_H_VAR_CLASS)}>
            <CreamPlate src={creamPlate.src} maskBottom={false} tileMedia />
            <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />

            <div className="relative z-10">
              <ArcFaqSection
                id="treatment-faq"
                className="border-t-0 bg-transparent pb-0"
                categories={{ treatment: treatment.title }}
                faqByCategory={{ treatment: treatment.faqs }}
                emphasisHeading
              />
              <div
                className={cn(
                  "relative z-10 mx-auto px-6 pb-10 text-center sm:px-10 sm:pb-12 md:px-12",
                  ARC_PAGE_RAIL_MAX,
                )}
              >
                <ArcTextReveal variant="line">
                  <Link
                    href="/treatments#treatments-index"
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
        ) : (
          <div className={cn("relative z-0", WAVE_MT_CLASS, WAVE_H_VAR_CLASS)}>
            <CreamPlate src={creamPlate.src} maskBottom={false} />
            <div className={cn("relative z-10", WAVE_H_CLASS)} aria-hidden />
            <div
              className={cn(
                "relative z-10 mx-auto px-6 py-16 text-center sm:px-10 md:px-12",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <Link
                href="/treatments#treatments-index"
                className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-teal-ink transition-colors hover:text-arc-teal-ink-hover"
              >
                ← All treatments
              </Link>
            </div>
            <div
              aria-hidden
              className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
            />
          </div>
        )}
      </div>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={closing.supportingLine || homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
    </div>
  );
}
