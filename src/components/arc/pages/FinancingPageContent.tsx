"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ARC_ABOUT_COMPACT_BODY_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import {
  ServiceCreamPlate,
  ServiceDarkPlate,
  ServiceWave,
  ServiceWaveInset,
  SERVICE_WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
  serviceAboveCrestBottomMaskStyle,
} from "@/components/arc/servicePlate";
import { homeInvestSupport } from "@/content/homepage";
import { financingPage } from "@/content/pages/financing";
import {
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
} from "@/content/pages/serviceTemplate";
import { images } from "@/content/site";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V"] as const;

const EMPHASIS_HERO_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.9] tracking-tight text-arc-teal-ink",
  "text-[clamp(5.5rem,22vw,7.5rem)] md:text-[clamp(5.5rem,9vw,8rem)] lg:text-[clamp(6.75rem,8vw,9.25rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

const EMPHASIS_SECTION_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
  "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

const EMPHASIS_DARK_SECTION_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-[#d9b878]",
  "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
  "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
  "[text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
);

const DARK_BODY_CLASS =
  "font-sans text-base leading-relaxed sm:text-lg [color:rgba(247,241,232,0.82)]";

export function FinancingPageContent() {
  const {
    hero,
    intro,
    why,
    eligible,
    patientFi,
    howItWorks,
    faqs,
    commitment,
    getStarted,
    closingMessage,
  } = financingPage;
  const creamPlateSrc = serviceSharedCreamPlate.src;
  const darkPlateSrc = serviceSharedDarkPlate.src;

  return (
    <>
      {/* Hero */}
      <div
        className={cn(
          "relative z-20 flex min-h-[min(42dvh,22rem)] flex-col sm:min-h-[min(52dvh,28rem)] md:min-h-[min(64dvh,36rem)] lg:min-h-[min(68dvh,40rem)]",
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
          style={serviceAboveCrestBottomMaskStyle}
          aria-hidden
        >
          <Image
            src={images.aboutHeroMedia}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[78%_center] md:object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-arc-champagne/50 via-arc-champagne/18 to-transparent sm:h-36" />
        </div>

        <section
          id="financing-hero"
          className={cn(
            "relative z-10 flex flex-1 flex-col justify-center py-10 sm:py-12 md:py-14",
            ARC_GALLERY_CLEAR_BELOW_LOGO,
          )}
        >
          <div
            className={cn(
              "mx-auto flex w-full flex-col items-center px-6 text-center sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <ArcTextReveal variant="heading" trigger="mount">
              <h1 className="leading-[0.9] tracking-tight">
                <TitleEmphasis className={EMPHASIS_HERO_CLASS}>
                  {hero.title}
                </TitleEmphasis>
              </h1>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" className="mt-auto" />
      </div>

      {/* Intro — Invest in Your Health */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} />
        <ServiceWaveInset />

        <section
          id="financing-intro"
          className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
        >
          <div
            className={cn(
              "relative z-10 mx-auto max-w-5xl text-center",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <ArcTextReveal variant="heading">
              <h2 className="leading-[0.92] tracking-tight">
                <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                  {intro.title} {intro.titleEmphasis}
                </TitleEmphasis>
              </h2>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={1}>
              <p
                className={cn(
                  "mx-auto mt-5 max-w-2xl font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-charcoal/60 sm:mt-6 sm:text-base",
                )}
              >
                {hero.body}
              </p>
            </ArcTextReveal>
            {intro.paragraphs.map((paragraph, i) => (
              <ArcTextReveal key={paragraph} variant="body" delayIndex={i + 2}>
                <p
                  className={cn(
                    "mx-auto mt-5 max-w-4xl first:mt-8 sm:mt-6",
                    ARC_ABOUT_COMPACT_BODY_CLASS,
                  )}
                >
                  {paragraph}
                </p>
              </ArcTextReveal>
            ))}
            <ArcTextReveal variant="body" delayIndex={5}>
              <p className="mx-auto mt-8 max-w-3xl font-serif text-lg italic text-arc-charcoal/70 sm:mt-10 sm:text-xl">
                {intro.closing}
              </p>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* Why We Offer Financing */}
      <div
        className={cn(
          "relative z-[9] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} />
        <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

        <section
          id="why-financing"
          className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
        >
          <div
            className={cn(
              "relative z-10 mx-auto max-w-5xl text-center",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <ArcTextReveal variant="heading">
              <h2 className="leading-[0.92] tracking-tight">
                <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                  {why.title} {why.titleEmphasis}
                </TitleEmphasis>
              </h2>
            </ArcTextReveal>
            {why.paragraphs.map((paragraph, i) => (
              <ArcTextReveal key={paragraph} variant="body" delayIndex={i + 1}>
                <p
                  className={cn(
                    "mx-auto mt-5 max-w-4xl first:mt-8 sm:mt-6",
                    ARC_ABOUT_COMPACT_BODY_CLASS,
                  )}
                >
                  {paragraph}
                </p>
              </ArcTextReveal>
            ))}
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* What Can Be Financed? */}
      <div
        className={cn(
          "relative z-[8] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} />
        <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

        <section
          id="what-can-be-financed"
          className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
        >
          <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
            <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
              <header className="mb-10 min-w-0 text-center lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:self-start lg:pt-2 lg:text-left xl:top-32">
                <ArcTextReveal variant="heading">
                  <h2 className="leading-[0.92] tracking-tight">
                    <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                      {eligible.title} {eligible.titleEmphasis}
                    </TitleEmphasis>
                  </h2>
                </ArcTextReveal>
              </header>

              <ul className="min-w-0 border-t border-arc-charcoal/12">
                {eligible.items.map((item, idx) => (
                  <li
                    key={item.title}
                    className="border-b border-arc-charcoal/12"
                  >
                    <div className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[minmax(4.5rem,6.5rem)_1fr] sm:gap-8 sm:py-8">
                      <p
                        className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-normal leading-[0.82] tracking-tight text-arc-teal-ink"
                        aria-hidden
                      >
                        {ROMAN_NUMERALS[idx] ?? String(idx + 1)}
                      </p>
                      <div className="min-w-0">
                        <h3 className="font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-arc-teal-ink">
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-2.5",
                            ARC_ABOUT_COMPACT_BODY_CLASS,
                          )}
                        >
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* Dark acts: How it works + PatientFi */}
      <div className="relative z-[1] isolate">
        <div
          className={cn(
            "relative z-[7] overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceDarkPlate src={darkPlateSrc} />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

          <section
            id="how-financing-works"
            className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
          >
            <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
              <div className="mx-auto max-w-3xl text-center">
                <ArcTextReveal variant="heading">
                  <h2 className="leading-[0.92] tracking-tight">
                    <TitleEmphasis className={EMPHASIS_DARK_SECTION_CLASS}>
                      {howItWorks.title} {howItWorks.titleEmphasis}
                    </TitleEmphasis>
                  </h2>
                </ArcTextReveal>
              </div>

              <ol className="mx-auto mt-12 max-w-3xl space-y-0 border-t border-[#d9b878]/25">
                {howItWorks.steps.map((step, idx) => (
                  <li
                    key={step}
                    className="grid grid-cols-1 gap-3 border-b border-[#d9b878]/25 py-7 sm:grid-cols-[minmax(4rem,5.5rem)_1fr] sm:gap-8 sm:py-8"
                  >
                    <p
                      className="font-serif text-[clamp(2.5rem,6vw,3.75rem)] font-normal leading-[0.82] tracking-tight text-[#d9b878]"
                      aria-hidden
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className={cn("self-center text-left", DARK_BODY_CLASS)}>
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <ServiceWave />
        </div>

        <div
          className={cn(
            "relative z-[6] overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceDarkPlate src={darkPlateSrc} />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

          <section
            id="patientfi"
            className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
          >
            <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
              <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
                <header className="mb-10 min-w-0 text-center lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:self-start lg:pt-2 lg:text-left xl:top-32">
                  <ArcTextReveal variant="heading">
                    <h2 className="leading-[0.92] tracking-tight">
                      <TitleEmphasis className={EMPHASIS_DARK_SECTION_CLASS}>
                        {patientFi.title} {patientFi.titleEmphasis}
                      </TitleEmphasis>
                    </h2>
                  </ArcTextReveal>
                </header>

                <ul className="min-w-0 space-y-4">
                  {patientFi.items.map((item, i) => (
                    <ArcTextReveal key={item} variant="body" delayIndex={i + 1}>
                      <li className="flex items-start gap-3 rounded-2xl border border-[#d9b878]/25 bg-white/[0.04] px-5 py-4 sm:gap-4 sm:px-6 sm:py-5">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-[#d9b878] sm:size-5"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                        <span className={cn("text-left", DARK_BODY_CLASS)}>
                          {item}
                        </span>
                      </li>
                    </ArcTextReveal>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <ServiceWave tone="pearl" />
        </div>
      </div>

      {/* FAQ + commitment + closing — one cream plate into Invest soft-feather. */}
      <div className="relative z-0 isolate">
        <div
          className={cn(
            "relative z-0 overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceCreamPlate src={creamPlateSrc} maskBottom={false} tileMedia />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

          <div className="relative z-10">
            <ArcFaqSection
              id="financing-faq"
              className="border-t-0 bg-transparent pb-0"
              categories={{ financing: "Financing" }}
              faqByCategory={{ financing: faqs }}
              emphasisHeading
            />
          </div>

          <section
            id="financing-commitment"
            className="relative z-10 px-6 pb-14 pt-4 sm:px-10 sm:pb-16 md:px-12 md:pb-20"
          >
            <div
              className={cn(
                "relative z-10 mx-auto max-w-5xl text-center",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <ArcTextReveal variant="heading">
                <h2 className="leading-[0.92] tracking-tight">
                  <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                    {commitment.title} {commitment.titleEmphasis}
                  </TitleEmphasis>
                </h2>
              </ArcTextReveal>
              {commitment.paragraphs.map((paragraph, i) => (
                <ArcTextReveal key={paragraph} variant="body" delayIndex={i + 1}>
                  <p
                    className={cn(
                      "mx-auto mt-5 max-w-4xl sm:mt-6",
                      i === 0 && "mt-8",
                      ARC_ABOUT_COMPACT_BODY_CLASS,
                    )}
                  >
                    {paragraph}
                  </p>
                </ArcTextReveal>
              ))}
              <ArcTextReveal variant="body" delayIndex={3}>
                <p className="mx-auto mt-8 max-w-3xl font-serif text-lg italic text-arc-charcoal/70 sm:text-xl">
                  {commitment.closing}
                </p>
              </ArcTextReveal>
            </div>
          </section>

          <section
            id="financing-get-started"
            className="relative z-10 px-6 pb-14 pt-4 sm:px-10 sm:pb-16 md:px-12 md:pb-20"
          >
            <div
              className={cn(
                "relative z-10 mx-auto max-w-5xl text-center",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <ArcTextReveal variant="heading">
                <h2 className="leading-[0.92] tracking-tight">
                  <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                    {getStarted.title} {getStarted.titleEmphasis}
                  </TitleEmphasis>
                </h2>
              </ArcTextReveal>
              {getStarted.paragraphs.map((paragraph, i) => (
                <ArcTextReveal key={paragraph} variant="body" delayIndex={i + 1}>
                  <p
                    className={cn(
                      "mx-auto mt-5 max-w-4xl sm:mt-6",
                      i === 0 && "mt-8",
                      ARC_ABOUT_COMPACT_BODY_CLASS,
                    )}
                  >
                    {paragraph}
                  </p>
                </ArcTextReveal>
              ))}
            </div>
          </section>

          <section
            id="financing-closing"
            className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24"
          >
            <div
              className={cn(
                "relative z-10 mx-auto max-w-5xl text-center",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <ArcTextReveal variant="heading">
                <h2 className="leading-[0.92] tracking-tight">
                  <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                    {closingMessage.title} {closingMessage.titleEmphasis}
                  </TitleEmphasis>
                </h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className="mx-auto mt-6 max-w-3xl font-serif text-lg italic text-arc-charcoal/70 sm:text-xl">
                  {closingMessage.body}
                </p>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={2}>
                <p
                  className={cn(
                    "mx-auto mt-5 max-w-4xl sm:mt-6",
                    ARC_ABOUT_COMPACT_BODY_CLASS,
                  )}
                >
                  {closingMessage.closing}
                </p>
              </ArcTextReveal>
            </div>
          </section>

          <div
            aria-hidden
            className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
          />
        </div>
      </div>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}
