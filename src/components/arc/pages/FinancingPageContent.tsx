"use client";

import Image from "next/image";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ARC_ABOUT_COMPACT_BODY_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import {
  ServiceCreamPlate,
  ServiceWave,
  ServiceWaveInset,
  SERVICE_WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
  serviceAboveCrestBottomMaskStyle,
} from "@/components/arc/servicePlate";
import { homeInvestSupport } from "@/content/homepage";
import { financingPage } from "@/content/pages/financing";
import { serviceSharedCreamPlate } from "@/content/pages/serviceTemplate";
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
  "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
  "text-[clamp(6.5rem,28vw,9.5rem)] md:text-[clamp(5.25rem,13vw,9.75rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

const EMPHASIS_SECTION_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
  "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

export function FinancingPageContent() {
  const { hero, options } = financingPage;
  const creamPlateSrc = serviceSharedCreamPlate.src;

  return (
    <>
      {/* Hero — same Contact / Arc360 crest physics: masked silk plate + pearl wave. */}
      <div
        className={cn(
          "relative z-20 flex min-h-[min(58dvh,30rem)] flex-col sm:min-h-[min(64dvh,34rem)] md:min-h-[min(68dvh,38rem)]",
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
              <h1 className="leading-[0.92] tracking-tight">
                <TitleEmphasis className={EMPHASIS_HERO_CLASS}>
                  {hero.title} {hero.titleEmphasis}
                </TitleEmphasis>
              </h1>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" className="mt-auto" />
      </div>

      {/* Payment options — cream plate tucked under the pearl crest. */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} maskBottom={false} />
        <ServiceWaveInset />

        <section
          id="financing-options"
          className="relative z-10 px-6 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20 md:px-12 md:pb-24 md:pt-24"
        >
          <div
            className={cn(
              "relative z-10 mx-auto w-full",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
              <header className="mb-10 min-w-0 text-center lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:self-start lg:pt-2 lg:text-left xl:top-32">
                <ArcTextReveal variant="heading">
                  <h2 className="leading-[0.92] tracking-tight">
                    <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                      Ways to begin
                    </TitleEmphasis>
                  </h2>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p
                    className={cn(
                      "mx-auto mt-6 max-w-xl sm:mt-8 lg:mx-0",
                      ARC_ABOUT_COMPACT_BODY_CLASS,
                    )}
                  >
                    {hero.body}
                  </p>
                </ArcTextReveal>
              </header>

              <ul className="min-w-0 border-t border-arc-charcoal/12">
                {options.map((item, idx) => (
                  <li
                    key={item.title}
                    aria-label={`Option ${idx + 1} of ${options.length}: ${item.title}`}
                    className="border-b border-arc-charcoal/12"
                  >
                    <div className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[minmax(4.5rem,6.5rem)_1fr] sm:gap-8 sm:py-8 md:gap-10 md:py-9">
                      <p
                        className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-normal leading-[0.82] tracking-tight text-arc-teal-ink sm:pt-0.5"
                        aria-hidden
                      >
                        {ROMAN_NUMERALS[idx] ?? String(idx + 1)}
                      </p>
                      <div className="min-w-0">
                        <ArcTextReveal variant="line" delayIndex={0}>
                          <h3 className="break-words font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-arc-teal-ink">
                            {item.title}
                          </h3>
                        </ArcTextReveal>
                        <ArcTextReveal variant="body" delayIndex={1}>
                          <p
                            className={cn(
                              "mt-2.5 break-words md:mt-3",
                              ARC_ABOUT_COMPACT_BODY_CLASS,
                            )}
                          >
                            {item.body}
                          </p>
                        </ArcTextReveal>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Soft Home feather into global Invest CTA (kept on Financing). */}
        <div
          aria-hidden
          className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
        />
        <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />
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
