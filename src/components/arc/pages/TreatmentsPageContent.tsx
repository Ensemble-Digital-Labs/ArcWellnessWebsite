"use client";

import { ArcTreatmentsRuledGrid } from "@/components/arc/ArcTreatmentsRuledGrid";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ABOUT_HERO_COPY_AMBIENT_IMAGES } from "@/content/backgroundDecoration";
import { homeInvestSupport } from "@/content/homepage";
import { allTreatments, treatmentsHub } from "@/content/pages/treatments";
import { TREATMENTS_HERO_CANVAS_TILES } from "@/content/treatmentsHeroCanvas";
import { images } from "@/content/site";

export function TreatmentsPageContent() {
  const { hero, ruledGrid } = treatmentsHub;

  return (
    <>
      <ScrollChapterIntroSection
        id="treatments-hero"
        layout="ambient-full"
        motion="enter-once"
        headline={hero.title}
        headlineEmphasis={hero.titleEmphasis}
        body=""
        introMode="visible-on-load"
        copyColumnAmbients={ABOUT_HERO_COPY_AMBIENT_IMAGES}
        heroCanvasTiles={TREATMENTS_HERO_CANVAS_TILES}
        bottomSeam
      />

      <ArcTreatmentsRuledGrid
        id="treatments-index"
        title={ruledGrid.title}
        titleEmphasis={ruledGrid.titleEmphasis}
        subtitle={ruledGrid.subtitle}
        treatments={allTreatments}
        topSeam
        bottomSeam
      />

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
      />
    </>
  );
}
