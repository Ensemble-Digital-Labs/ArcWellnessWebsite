"use client";

import { ArcInsightsFeedSection } from "@/components/arc/ArcInsightsFeedSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import type { InsightEntry } from "@/content/pages/insights";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

/** Insights hub — HLK-style feed (masthead, underline tabs, image grid). */
export function CaseStudiesPageContent({ entries }: { entries: readonly InsightEntry[] }) {
  return (
    <>
      <ArcInsightsFeedSection id="case-studies" entries={entries} />
      <InvestCTASection
        imageSrc={images.investBanner}
        supportingLine={homeInvestSupport}
        pin={false}
      />
    </>
  );
}
