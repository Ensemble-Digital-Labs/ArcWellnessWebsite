"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ServiceCreamPlate,
  ServiceDarkPlate,
  ServiceGoldRule,
  ServiceWave,
  ServiceWaveInset,
  serviceAboveCrestBottomMaskStyle,
  SERVICE_WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
} from "@/components/arc/servicePlate";
import { ARC_ABOUT_COMPACT_BODY_CLASS } from "@/components/arc/TitleEmphasis";
import type {
  ConditionNarrativeSection,
  ConditionPageContent as ConditionContent,
  ConditionRecommendedService,
  ConditionServiceGroup,
} from "@/content/pages/conditions/types";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

const DEFAULT_HERO_OBJECT =
  "object-cover object-[92%_42%] sm:object-[78%_45%] md:object-[65%_45%] lg:object-[58%_center]";

/** Cream-plate twin of Discover’s gold title-emphasis (teal ink on cream). */
const CREAM_DISCOVER_HEADLINE = cn(
  "font-title-emphasis block font-normal not-italic tracking-tight text-arc-teal-ink",
  "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
);

const DARK_GOLD_HEADLINE =
  "font-title-emphasis block tracking-tight text-[#d9b878] [-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)] [text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";

type ConditionPageContentProps = {
  content: ConditionContent;
};

function CreamNarrative({
  section,
  plateSrc,
  zClass,
  withExitWave = true,
  featherToInvest = false,
}: {
  section: ConditionNarrativeSection;
  plateSrc: string;
  zClass: string;
  withExitWave?: boolean;
  featherToInvest?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-x-clip",
        zClass,
        SERVICE_WAVE_MT_CLASS,
        SERVICE_WAVE_H_VAR_CLASS,
      )}
    >
      <ServiceCreamPlate
        src={plateSrc}
        maskBottom={withExitWave && !featherToInvest}
      />
      <ServiceWaveInset />

      <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-3xl text-center">
            <ArcTextReveal variant="heading">
              <h2 className="text-balance leading-[0.92]">
                <span
                  className={CREAM_DISCOVER_HEADLINE}
                  style={{
                    fontSize: "clamp(2rem, 6.5vw, 3.5rem)",
                    fontSizeAdjust: "none",
                  }}
                >
                  {section.title}
                </span>
              </h2>
            </ArcTextReveal>
            <ServiceGoldRule className="mx-auto mt-6" />
            <div className="mx-auto mt-6 max-w-2xl space-y-4">
              {section.paragraphs
                .filter((paragraph) => paragraph.trim().length > 0)
                .map((paragraph, i) => (
                <ArcTextReveal
                  key={`${section.title}-${i}`}
                  variant="body"
                  delayIndex={i + 1}
                >
                  <p className={ARC_ABOUT_COMPACT_BODY_CLASS}>{paragraph}</p>
                </ArcTextReveal>
              ))}
            </div>

            {section.bullets?.length ? (
              <ul className="mx-auto mt-8 max-w-xl space-y-2.5 text-left">
                {section.bullets.map((item, i) => (
                  <ArcTextReveal key={item} variant="body" delayIndex={i}>
                    <li className="flex gap-2.5 font-sans text-sm text-arc-charcoal/80 sm:text-[0.9375rem]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
                      <span>{item}</span>
                    </li>
                  </ArcTextReveal>
                ))}
              </ul>
            ) : null}

            {section.bulletGroups?.length ? (
              <div className="mx-auto mt-10 grid max-w-3xl gap-8 text-left sm:grid-cols-2">
                {section.bulletGroups.map((group, gi) => (
                  <ArcTextReveal key={group.heading} variant="body" delayIndex={gi}>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-arc-teal-ink sm:text-xl">
                        {group.heading}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 font-sans text-sm text-arc-charcoal/80"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-champagne" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ArcTextReveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {withExitWave && !featherToInvest ? <ServiceWave tone="pearl" /> : null}
      {featherToInvest ? (
        <>
          <div
            aria-hidden
            className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
          />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />
        </>
      ) : null}
    </div>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: ConditionRecommendedService;
  index: number;
}) {
  const inner = (
    <>
      <span className="font-serif text-lg tracking-tight text-[#d9b878] transition-colors group-hover:text-arc-champagne-hover sm:text-xl">
        {service.label}
      </span>
      {service.href ? (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-[#d9b878]/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#d9b878]"
        />
      ) : null}
    </>
  );

  return (
    <li>
      <ArcTextReveal variant="body" delayIndex={index}>
        {service.href ? (
          <Link
            href={service.href}
            className="group relative flex min-h-[3.25rem] items-center justify-center gap-3 py-3.5 text-center transition-colors sm:min-h-[3.5rem] sm:py-4"
          >
            {inner}
          </Link>
        ) : (
          <div className="flex min-h-[3.25rem] items-center justify-center gap-3 py-3.5 text-center sm:min-h-[3.5rem] sm:py-4">
            {inner}
          </div>
        )}
      </ArcTextReveal>
    </li>
  );
}

function DiscoverGroups({ groups }: { groups: readonly ConditionServiceGroup[] }) {
  const services = groups.flatMap((group) => group.services);

  return (
    <ul className="mx-auto mt-10 max-w-2xl divide-y divide-[#d9b878]/25 border-y border-[#d9b878]/25 sm:mt-12">
      {services.map((service, i) => (
        <ServiceRow key={`${service.label}-${i}`} service={service} index={i} />
      ))}
    </ul>
  );
}

/**
 * Short condition landing — EXION curve/plate language:
 * 1. Hero
 * 2. Imagine (cream)
 * 3. Optional extras (cream)
 * 4. Discover (dark, golden type)
 * 5. Optional philosophy / related
 * 6. Invest CTA
 */
export function ConditionPageContent({ content }: ConditionPageContentProps) {
  const {
    hero,
    imagine,
    extras,
    discover,
    disclaimer,
    philosophy,
    related,
    creamPlateSrc,
    darkPlateSrc,
    closing,
  } = content;

  const flatServices = discover.services ?? [];
  const grouped = discover.groups ?? [];

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
            className={hero.imageObjectClass ?? DEFAULT_HERO_OBJECT}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/35 via-arc-cream/15 to-arc-cream/30" />
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
            <div className="relative mx-auto w-full max-w-xl text-center md:max-w-3xl lg:max-w-4xl">
              <div className="relative z-10">
                <div className="-translate-y-3 sm:-translate-y-4 md:-translate-y-5 lg:-translate-y-6">
                  <ArcTextReveal variant="heading" trigger="mount">
                    <h1 className="font-serif text-[clamp(2.75rem,7.5vw,4.75rem)] font-bold leading-none tracking-tight text-black [text-shadow:0_1px_12px_rgba(245,240,232,0.85)] md:[text-shadow:none]">
                      {hero.title}
                    </h1>
                  </ArcTextReveal>
                  <ArcTextReveal variant="body" trigger="mount" delayIndex={1}>
                    <p className="mx-auto mt-5 max-w-2xl font-sans text-sm font-bold uppercase tracking-[0.22em] text-black [text-shadow:0_1px_10px_rgba(245,240,232,0.8)] sm:text-base md:text-lg md:[text-shadow:none]">
                      {hero.subhead}
                    </p>
                  </ArcTextReveal>
                </div>
                <div className="mx-auto mt-6 max-w-xl space-y-4 md:max-w-3xl lg:max-w-4xl">
                  {hero.paragraphs.map((paragraph, i) => (
                    <ArcTextReveal
                      key={paragraph.slice(0, 32)}
                      variant="body"
                      trigger="mount"
                      delayIndex={i + 2}
                    >
                      <p className="font-sans text-sm font-semibold leading-relaxed text-black [text-shadow:0_1px_10px_rgba(245,240,232,0.75)] sm:text-base md:[text-shadow:none]">
                        {paragraph}
                      </p>
                    </ArcTextReveal>
                  ))}
                </div>
                {hero.closingLine ? (
                  <ArcTextReveal
                    variant="body"
                    trigger="mount"
                    delayIndex={hero.paragraphs.length + 2}
                  >
                    <div className="mx-auto mt-8 inline-flex max-w-md rounded-full border-2 border-arc-champagne bg-arc-cream/90 px-6 py-3 shadow-[0_10px_28px_-12px_rgba(120,90,40,0.45)] backdrop-blur-[3px] md:bg-arc-cream/85">
                      <p className="font-sans text-sm font-bold leading-snug text-black sm:text-[0.9375rem]">
                        {hero.closingLine}
                      </p>
                    </div>
                  </ArcTextReveal>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <span className="sr-only">{hero.imageAlt}</span>
        <ServiceWave tone="pearl" />
      </div>

      <CreamNarrative
        section={imagine}
        plateSrc={creamPlateSrc}
        zClass="z-[10]"
        withExitWave
      />

      {extras?.map((section, i) => (
        <CreamNarrative
          key={section.title}
          section={section}
          plateSrc={creamPlateSrc}
          // Descend z so each pearl crest stays above the next cream plate
          // (alternating z buried the wave on odd→even extras — hard seam).
          zClass={
            (["z-[9]", "z-[8]", "z-[7]", "z-[6]", "z-[5]"] as const)[i] ?? "z-[5]"
          }
          withExitWave
        />
      ))}

      {/* ---------- Discover (dark plate, golden type) ---------- */}
      <div
        className={cn(
          "relative z-[6] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceDarkPlate
          src={darkPlateSrc}
          maskBottom={Boolean(philosophy || related)}
        />
        <ServiceWaveInset />

        <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
          <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
            <div className="mx-auto max-w-3xl text-center">
              <ArcTextReveal variant="heading">
                <h2 className="text-balance leading-[0.92]">
                  <span
                    className={DARK_GOLD_HEADLINE}
                    style={{
                      fontSize: "clamp(2rem, 6.5vw, 3.5rem)",
                      fontSizeAdjust: "none",
                    }}
                  >
                    {discover.title}
                  </span>
                </h2>
              </ArcTextReveal>
              <ServiceGoldRule className="mx-auto mt-6" />
              <ArcTextReveal variant="body" delayIndex={1}>
                <p
                  className="mx-auto mt-6 max-w-none whitespace-nowrap px-2 text-center font-sans text-[clamp(0.7rem,2.4vw,1rem)] leading-relaxed tracking-tight"
                  style={{ color: "rgba(217,184,120,0.82)" }}
                >
                  {discover.intro}
                </p>
              </ArcTextReveal>
            </div>

            {grouped.length > 0 ? (
              <DiscoverGroups groups={grouped} />
            ) : (
              <ul className="mx-auto mt-10 max-w-2xl divide-y divide-[#d9b878]/25 border-y border-[#d9b878]/25 sm:mt-12">
                {flatServices.map((service, i) => (
                  <ServiceRow key={service.label} service={service} index={i} />
                ))}
              </ul>
            )}

            {disclaimer ? (
              <ArcTextReveal variant="body" delayIndex={2}>
                <p
                  className="mx-auto mt-10 max-w-2xl text-center font-sans text-xs leading-relaxed sm:text-sm"
                  style={{ color: "rgba(217,184,120,0.65)" }}
                >
                  {disclaimer}
                </p>
              </ArcTextReveal>
            ) : null}
          </div>
        </section>

        {philosophy || related ? (
          <ServiceWave />
        ) : (
          <>
            <div
              aria-hidden
              className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
            />
            <div
              className={cn("relative z-10", SERVICE_WAVE_H_CLASS)}
              aria-hidden
            />
          </>
        )}
      </div>

      {philosophy ? (
        <CreamNarrative
          section={philosophy}
          plateSrc={creamPlateSrc}
          zClass="z-[5]"
          withExitWave={Boolean(related)}
          featherToInvest={!related}
        />
      ) : null}

      {related ? (
        <div
          className={cn(
            "relative z-[4] overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceCreamPlate src={creamPlateSrc} maskBottom={false} />
          <ServiceWaveInset />
          <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
            <div
              className={cn(
                "relative z-10 mx-auto max-w-2xl text-center",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <ArcTextReveal variant="heading">
                <h2 className="font-serif text-[clamp(1.5rem,4vw,2.25rem)] font-semibold text-arc-teal-ink">
                  {related.title}
                </h2>
              </ArcTextReveal>
              {related.intro ? (
                <p className="mt-4 font-sans text-sm text-arc-charcoal/72 sm:text-base">
                  {related.intro}
                </p>
              ) : null}
              <ul className="mt-8 divide-y divide-arc-charcoal/12 border-y border-arc-charcoal/12">
                {related.items.map((item, i) => (
                  <li key={item.label}>
                    <ArcTextReveal variant="body" delayIndex={i}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="group flex min-h-[3rem] items-center justify-center gap-3 py-3 font-serif text-lg text-arc-charcoal transition-colors hover:text-arc-teal-ink"
                        >
                          {item.label}
                          <ArrowRight className="h-4 w-4 text-arc-teal-ink/70 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : (
                        <span className="flex min-h-[3rem] items-center justify-center py-3 font-serif text-lg text-arc-charcoal/70">
                          {item.label}
                        </span>
                      )}
                    </ArcTextReveal>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <div
            aria-hidden
            className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
          />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />
        </div>
      ) : null}

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={closing?.supportingLine ?? homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}
