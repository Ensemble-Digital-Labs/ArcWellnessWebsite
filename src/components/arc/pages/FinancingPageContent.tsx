"use client";

import { ArcMarketingChapterHero } from "@/components/arc/ArcMarketingChapterHero";
import { ArcValuesRevealSection } from "@/components/arc/ArcValuesRevealSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { homeInvestSupport } from "@/content/homepage";
import { FINANCING_HERO_CANVAS_TILES } from "@/content/marketingHeroCanvas";
import { financingPage } from "@/content/pages/financing";
import { images } from "@/content/site";

export function FinancingPageContent() {
  const { hero, options } = financingPage;

  return (
    <>
      <ArcMarketingChapterHero
        id="financing-hero"
        headline={hero.title}
        headlineEmphasis={hero.titleEmphasis}
        heroCanvasTiles={FINANCING_HERO_CANVAS_TILES}
        bottomSeam
      />

      <ArcValuesRevealSection
        id="financing-options"
        title="Payment"
        titleEmphasis="options"
        intro={hero.body}
        items={options}
        topSeam
        compactTop
        bottomSeam
        compactBottom
      />

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
      />
    </>
  );
}
