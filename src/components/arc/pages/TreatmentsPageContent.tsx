"use client";

import { ArcTreatmentsRuledGrid } from "@/components/arc/ArcTreatmentsRuledGrid";
import { ArcTreatmentsPinExplorer } from "@/components/arc/ArcTreatmentsPinExplorer";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { homeInvestSupport } from "@/content/homepage";
import { allTreatments, treatmentsHub } from "@/content/pages/treatments";
import { images } from "@/content/site";

export function TreatmentsPageContent() {
  const { hero, pinExplorer, ruledGrid } = treatmentsHub;

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
        title={pinExplorer.title}
        subtitle={pinExplorer.subtitle}
        treatments={allTreatments}
      />

      <ArcTreatmentsRuledGrid
        id="treatments-index"
        title={ruledGrid.title}
        titleEmphasis={ruledGrid.titleEmphasis}
        subtitle={ruledGrid.subtitle}
        treatments={allTreatments}
      />

      <InvestCTASection imageSrc={images.heroMedia} supportingLine={homeInvestSupport} />
    </>
  );
}
