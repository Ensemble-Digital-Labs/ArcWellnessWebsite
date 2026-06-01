"use client";

import { ArcServicesShowcaseSlider } from "@/components/arc/ArcServicesShowcaseSlider";
import { ArcTreatmentsRuledGrid } from "@/components/arc/ArcTreatmentsRuledGrid";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { ArcTreatmentsPinExplorer } from "@/components/arc/ArcTreatmentsPinExplorer";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { homeInvestSupport } from "@/content/homepage";
import { allTreatments, treatmentsHub } from "@/content/pages/treatments";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";
import { images } from "@/content/site";

export function TreatmentsPageContent() {
  const { hero } = treatmentsHub;

  return (
    <>
      <ScrollChapterIntroSection
        id="treatments-hero"
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.body}
        imageSrc={images.investBanner}
        floatingMedia={{
          src: images.services[0],
          alt: "Facial aesthetic treatment at ARC Wellness",
        }}
        ctaHref="/book"
        ctaLabel="Book a free consultation"
      />

      <ArcTreatmentsPinExplorer
        id="treatments-explore"
        title="our modalities"
        subtitle="Physician-led plans that combine devices, infusions, aesthetics, and supplements."
        treatments={allTreatments}
      />

      <PinnedSection id="services-showcase" pinDistanceMultiplier={0.72} className="w-full overflow-hidden bg-arc-charcoal py-0">
        <ArcServicesShowcaseSlider slides={SERVICES_SHOWCASE_SLIDES} className="w-full max-w-none" />
      </PinnedSection>

      <ArcTreatmentsRuledGrid
        id="treatments-index"
        title="Every"
        titleEmphasis="pathway"
        subtitle="Numbered index of physician-led modalities—select a row to read how each fits your plan."
        treatments={allTreatments}
      />

      <InvestCTASection imageSrc={images.heroMedia} supportingLine={homeInvestSupport} />
    </>
  );
}
