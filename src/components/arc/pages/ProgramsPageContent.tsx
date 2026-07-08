"use client";

import { ArcMarketingChapterHero } from "@/components/arc/ArcMarketingChapterHero";
import { ArcValuesRevealSection } from "@/components/arc/ArcValuesRevealSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { homeInvestSupport } from "@/content/homepage";
import { PROGRAMS_HERO_CANVAS_TILES } from "@/content/marketingHeroCanvas";
import { programsPage } from "@/content/pages/programs";
import { images } from "@/content/site";

export function ProgramsPageContent() {
  const { hero, pillars } = programsPage;

  return (
    <>
      <ArcMarketingChapterHero
        id="programs-hero"
        headline={hero.title.trim()}
        headlineEmphasis={hero.titleEmphasis}
        heroCanvasTiles={PROGRAMS_HERO_CANVAS_TILES}
        bottomSeam
      />

      <ArcValuesRevealSection
        id="programs-pillars"
        title="Built for"
        titleEmphasis="continuity"
        intro={hero.body}
        items={pillars}
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
