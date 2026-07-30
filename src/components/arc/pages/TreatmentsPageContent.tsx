"use client";

/**
 * Superseded: `/treatments` now renders `Arc360PageContent`, which keeps the
 * "Every pathway" grid as its third act. Kept as the pre-Arc-360 hub layout in
 * case the client wants the slim directory page back.
 */

import { ArcTreatmentsRuledGrid } from "@/components/arc/ArcTreatmentsRuledGrid";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ABOUT_HERO_COPY_AMBIENT_IMAGES } from "@/content/backgroundDecoration";
import { homeInvestSupport } from "@/content/homepage";
import { allTreatments, treatmentsHub } from "@/content/pages/treatments";
import { splitCenterHeroTiles } from "@/content/heroCanvasSplit";
import { TREATMENTS_HERO_CANVAS_TILES } from "@/content/treatmentsHeroCanvas";
import { images } from "@/content/site";

export function TreatmentsPageContent() {
  const { hero, ruledGrid } = treatmentsHub;

  return (
    <>
      <ScrollChapterIntroSection
        id="treatments-hero"
        layout="ambient-full"
        heroAlign="center"
        motion="enter-once"
        headline={hero.title}
        headlineEmphasis={hero.titleEmphasis}
        body=""
        introMode="visible-on-load"
        copyColumnAmbients={ABOUT_HERO_COPY_AMBIENT_IMAGES}
        heroCanvasTiles={splitCenterHeroTiles(TREATMENTS_HERO_CANVAS_TILES)}
        bottomSeam
        priorityBackground
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
