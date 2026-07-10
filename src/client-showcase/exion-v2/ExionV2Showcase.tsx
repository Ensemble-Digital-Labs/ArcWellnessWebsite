"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { exionV2Assets } from "@/client-showcase/exion-v2/exion-v2-assets";
import { exionV2Content as c } from "@/client-showcase/exion-v2/exion-v2-content";
import { EXION_V2_MOCK } from "@/client-showcase/exion-v2/exion-v2-tokens";
import { exionV2Type } from "@/client-showcase/exion-v2/exion-v2-typography";
import { ExionV2HeroSection } from "@/client-showcase/exion-v2/components/ExionV2HeroSection";
import { ExionAssetImage, ExionOverlayImage } from "@/client-showcase/exion-v2/components/ExionAssetImage";
import { ExionIcon } from "@/client-showcase/exion-v2/components/ExionIcon";
import { exionV2SectionId } from "@/client-showcase/exion-v2/exion-v2-sections";

function ExionV2StatsBand() {
  return (
    <section
      id={exionV2SectionId("stats")}
      aria-labelledby={`${exionV2SectionId("stats")}-heading`}
      className="relative -mt-[clamp(2rem,5vw,3.75rem)] overflow-hidden px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-[4.5rem]"
    >
      <ExionOverlayImage asset={c.stats.background} className="inset-0" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-arc-cream/96 from-0% via-arc-cream/72 via-[42%] to-transparent to-[58%]"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[1440px]">
        <div className="max-w-[36rem] lg:max-w-[34rem]">
          <h2
            id={`${exionV2SectionId("stats")}-heading`}
            className="max-w-[18rem] font-serif text-[clamp(1.85rem,4vw,2.85rem)] font-normal leading-[1.1] text-arc-charcoal sm:max-w-md"
          >
            {c.stats.headline}
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-arc-charcoal/72 sm:text-[15px]">
            {c.stats.body}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7 border-t border-arc-charcoal/8 pt-8 sm:grid-cols-4 sm:gap-x-4 lg:mt-12">
            {c.stats.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-serif text-[clamp(1.85rem,3.6vw,2.35rem)] font-normal leading-none text-arc-champagne">
                  {metric.value}
                </dt>
                <dd className="mt-2 font-sans text-[10px] leading-snug text-arc-charcoal/62 sm:text-[11px]">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function ExionV2TreatmentCards() {
  return (
    <section
      id={exionV2SectionId("treatments")}
      aria-labelledby={`${exionV2SectionId("treatments")}-heading`}
      className="bg-arc-cream px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={`${exionV2SectionId("treatments")}-heading`} className={exionV2Type.sectionHeadline}>
            {c.treatments.headline}
          </h2>
          <p className={cn("mt-3", exionV2Type.sectionSubhead)}>{c.treatments.subhead}</p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3 lg:gap-5 xl:gap-7">
          {c.treatments.cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col border border-arc-charcoal/[0.07] bg-[color-mix(in_srgb,var(--arc-cream)_55%,white)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-arc-charcoal/[0.04]">
                <ExionAssetImage asset={card.image} fill className="object-cover object-center" sizes="(min-width: 1024px) 28vw, 90vw" />
              </div>

              <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
                <h3 className={exionV2Type.cardTitle}>{card.title}</h3>
                <p className={cn("mt-1.5", exionV2Type.cardTagline)}>{card.tagline}</p>
                <p className={cn("mt-3 max-w-[34ch]", exionV2Type.cardBody)}>{card.body}</p>

                <ul className="mt-5 space-y-2 border-t border-arc-charcoal/[0.06] pt-4">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className={cn("flex gap-2.5", exionV2Type.cardBullet)}>
                      <Plus className="mt-px size-3 shrink-0 text-arc-champagne" strokeWidth={2.25} aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExionV2WhyDifferent() {
  return (
    <section
      id={exionV2SectionId("why-different")}
      aria-labelledby={`${exionV2SectionId("why-different")}-heading`}
      className="relative overflow-hidden px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      style={{ backgroundColor: EXION_V2_MOCK.dark }}
    >
      <ExionOverlayImage asset={c.whyDifferent.background} className="inset-0" />
      <div className="relative z-[1] mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <div className="lg:pt-2">
          <h2
            id={`${exionV2SectionId("why-different")}-heading`}
            className="font-serif text-[clamp(1.9rem,4vw,2.9rem)] font-normal leading-[1.08]"
          >
            {c.whyDifferent.headline}
          </h2>
          <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/70 sm:text-[15px]">
            {c.whyDifferent.body}
          </p>
        </div>

        <ul className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12">
          {c.whyDifferent.features.map((feature) => (
            <li key={feature.title}>
              <ExionIcon name={feature.icon} src={exionV2Assets.icons[feature.icon]} label={feature.title} />
              <h3 className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-arc-champagne">
                {feature.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/66">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ExionV2Experience() {
  return (
    <section
      id={exionV2SectionId("experience")}
      aria-labelledby={`${exionV2SectionId("experience")}-heading`}
      className="relative overflow-hidden pb-0 pt-10 text-white sm:pt-12 lg:pt-14"
      style={{ backgroundColor: EXION_V2_MOCK.dark }}
    >
      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h2
          id={`${exionV2SectionId("experience")}-heading`}
          className="text-center font-serif text-[clamp(1.75rem,3.6vw,2.65rem)] font-normal leading-[1.12] text-white"
        >
          {c.experience.headline}
        </h2>

        <div className="relative mt-10 overflow-x-auto lg:mt-12 lg:overflow-visible">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.experienceIconsRow}
            alt=""
            className="mx-auto min-w-[720px] w-full max-w-[1400px] opacity-[0.96]"
          />
        </div>

        <ol className="mt-8 grid gap-8 pb-12 sm:grid-cols-2 sm:pb-14 lg:mt-10 lg:grid-cols-5 lg:gap-4 lg:pb-16">
          {c.experience.steps.map((step) => (
            <li key={step.title} className="text-center lg:px-1">
              <h3 className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-arc-champagne sm:text-[10px] lg:sr-only">
                {step.title}
              </h3>
              <p className="mt-2 font-sans text-[11px] leading-relaxed text-white/72 sm:text-xs lg:mt-0">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* §5 → §6 cream handoff — wave baked into composite */}
      <div className="relative h-[clamp(5.5rem,14vw,10rem)] w-full" aria-hidden>
        <ExionOverlayImage asset={c.experience.background} className="inset-0 [&_img]:object-cover [&_img]:object-[center_bottom]" />
      </div>
    </section>
  );
}

function ExionV2Results() {
  return (
    <section
      id={exionV2SectionId("results")}
      aria-labelledby={`${exionV2SectionId("results")}-heading`}
      className="-mt-px bg-arc-cream px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12">
        <div className="lg:pt-2">
          <h2
            id={`${exionV2SectionId("results")}-heading`}
            className="font-serif text-[clamp(1.85rem,3.8vw,2.75rem)] font-normal leading-[1.12] text-arc-charcoal"
          >
            {c.results.headline}
          </h2>
          <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-arc-charcoal/72 sm:text-[15px]">
            {c.results.body}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
          {c.results.pairs.map((pair, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden bg-arc-charcoal/5">
                  <ExionAssetImage asset={pair.before} fill className="object-cover object-center" sizes="130px" />
                </div>
                <figcaption className="mt-1.5 text-center font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-arc-charcoal/48">
                  Before
                </figcaption>
              </figure>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden bg-arc-charcoal/5">
                  <ExionAssetImage asset={pair.after} fill className="object-cover object-center" sizes="130px" />
                </div>
                <figcaption className="mt-1.5 text-center font-sans text-[8px] font-semibold uppercase tracking-[0.22em] text-arc-charcoal/48">
                  After
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {c.results.disclaimer ? (
        <p className="mx-auto mt-10 max-w-[1440px] px-5 text-center font-sans text-[10px] text-arc-charcoal/45 sm:px-8 lg:px-12">
          {c.results.disclaimer}
        </p>
      ) : null}
    </section>
  );
}

function ExionV2CtaBand() {
  return (
    <section
      id={exionV2SectionId("cta")}
      aria-labelledby={`${exionV2SectionId("cta")}-heading`}
      className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      style={{ backgroundColor: EXION_V2_MOCK.dark }}
    >
      <ExionOverlayImage asset={c.cta.background} className="inset-0" />

      <div className="relative z-[1] mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
        <div className="relative mx-auto size-28 sm:size-32 lg:mx-0">
          <div className="absolute inset-0 rounded-full bg-arc-champagne/18 blur-2xl" aria-hidden />
          <div className="relative flex size-full items-center justify-center rounded-full border border-arc-champagne/45 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.cta.profileArt}
              alt=""
              className="size-full object-contain opacity-90"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <SparklesFallback />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h2
            id={`${exionV2SectionId("cta")}-heading`}
            className="font-serif text-[clamp(1.9rem,4.2vw,3rem)] font-normal leading-[1.08] text-white"
          >
            {c.cta.headline}
          </h2>
          <p className="mt-3 font-sans text-sm text-white/66 sm:text-[15px]">{c.cta.body}</p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            <Link
              href={c.bookingUrl}
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-sm px-8 py-3.5",
                "bg-arc-champagne font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-arc-charcoal",
                "transition-colors hover:bg-arc-champagne-hover sm:text-[11px]",
              )}
            >
              {c.cta.button}
            </Link>
            {c.cta.subtext ? (
              <p className="max-w-xs font-sans text-[11px] leading-relaxed text-white/58 sm:max-w-sm sm:text-xs">
                {c.cta.subtext}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function SparklesFallback() {
  return (
    <svg viewBox="0 0 120 120" className="absolute inset-3 text-arc-champagne" aria-hidden>
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <path
        d="M78 38c-8 10-18 14-28 14s-22-6-30-16c6 14 18 24 34 24s28-10 34-24c-6 8-14 12-22 12s-18-4-24-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExionV2Showcase() {
  return (
    <div className="min-h-screen bg-arc-cream text-arc-charcoal">
      <main>
        {/* §1 Hero */}
        <ExionV2HeroSection />
        {/* §2 Stats */}
        <ExionV2StatsBand />
        {/* §3 Treatments */}
        <ExionV2TreatmentCards />
        {/* §4 Why different — dark band begins */}
        <ExionV2WhyDifferent />
        {/* §5 Experience — continues dark; wave handoff at bottom */}
        <ExionV2Experience />
        {/* §6 Results */}
        <ExionV2Results />
        {/* §7 CTA */}
        <ExionV2CtaBand />
      </main>
    </div>
  );
}
