"use client";

import Link from "next/link";
import { ArcMarketingChapterHero } from "@/components/arc/ArcMarketingChapterHero";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { homeInvestSupport } from "@/content/homepage";
import { AESTHETICS_HERO_CANVAS_TILES } from "@/content/marketingHeroCanvas";
import { aestheticsPage } from "@/content/pages/aesthetics";
import { images } from "@/content/site";
import { ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

export function AestheticsPageContent() {
  const { hero, principles, linkedTreatments } = aestheticsPage;

  return (
    <>
      <ArcMarketingChapterHero
        id="aesthetics-hero"
        headline={hero.title.trim()}
        headlineEmphasis={hero.titleEmphasis}
        heroCanvasTiles={AESTHETICS_HERO_CANVAS_TILES}
        bottomSeam
      />

      <ArcScrollEditorialSection
        id="aesthetics-approach"
        title="Our"
        titleEmphasis="approach"
        headlineLayout="stacked"
        bodyTypography="editorial"
        revealLines
        paragraphs={principles}
        imageSrc={images.services[0]}
        imageAlt="Facial aesthetics at ARC Wellness"
        headlineEmphasisTone="teal"
        topSeam
        bottomSeam
        compactBottom
        seamVariant="soft"
      />

      <section
        className={cn(
          "relative bg-arc-teal-muted/25 px-6 py-14 sm:px-10",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {linkedTreatments.map((t, index) => (
            <ArcTextReveal key={t.slug} variant="line" delayIndex={index % 6}>
              <Link
                href={`/treatments/${t.slug}`}
                className="rounded-full border border-arc-teal/25 bg-white px-5 py-2.5 font-sans text-sm font-medium text-arc-charcoal hover:bg-arc-teal-muted/40"
              >
                {t.label}
              </Link>
            </ArcTextReveal>
          ))}
        </div>
      </section>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
      />
    </>
  );
}
