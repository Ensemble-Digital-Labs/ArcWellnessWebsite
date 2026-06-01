"use client";

import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcStandardCta } from "@/components/arc/ArcStandardCta";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { caseStudiesPage } from "@/content/pages/case-studies";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

export function CaseStudiesPageContent() {
  const { hero, comingSoon } = caseStudiesPage;

  return (
    <>
      <ScrollChapterIntroSection
        id="case-studies-hero"
        eyebrow={hero.eyebrow}
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.body}
        introMode="visible-on-load"
        imageSrc={images.clinicInteriors.hallwayDaxxifyBannerWaveArt}
        floatingMedia={{
          src: images.clinicInteriors.consultationLounge,
          alt: "ARC Wellness consultation lounge",
        }}
        ctaHref="/book"
        ctaLabel="Book a free consultation"
      />

      <section className="bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24">
        <div className={cn("mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
          <div
            data-scroll-section
            className="rounded-sm border border-arc-charcoal/10 bg-arc-teal-muted/25 px-8 py-12 text-center sm:px-12 sm:py-16"
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-arc-teal-ink">
              Coming soon
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-arc-charcoal sm:text-4xl">
              {comingSoon.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-arc-charcoal/72">
              {comingSoon.body}
            </p>
            <ArcStandardCta href="/contact" className="mt-8">
              Contact our team
            </ArcStandardCta>
          </div>
        </div>
      </section>

      <ArcScrollEditorialSection
        id="case-studies-editorial"
        eyebrow="Stay connected"
        title="Wellness"
        titleEmphasis="made personal"
        paragraphs={[
          "When articles go live, you’ll find practical guidance on recovery, aesthetics, hormones, and longevity—always physician-informed.",
          "Until then, explore treatments and programs, or reach out with a question. We read every message.",
        ]}
        imageSrc={images.clinicInteriors.retailKneskoSkinProductDisplay}
        imageAlt="Curated skincare at ARC Wellness"
        imagePosition="left"
        revealLines
        cta={{ href: "/treatments", label: "Explore treatments" }}
      />

      <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
    </>
  );
}
