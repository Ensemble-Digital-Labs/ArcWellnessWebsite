"use client";

import { useEffect } from "react";
import { ArcInsightsFeedSection } from "@/components/arc/ArcInsightsFeedSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import type { InsightEntry } from "@/content/pages/insights";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import { updateInsightsHeaderChrome } from "@/lib/arcInsightsHeaderSync";

const INSIGHTS_CTA_SECTION_ID = "book";

/** Insights hub: HLK-style feed (masthead, underline tabs, image grid). */
export function CaseStudiesPageContent({ entries }: { entries: readonly InsightEntry[] }) {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const cta = document.getElementById(INSIGHTS_CTA_SECTION_ID);
      if (cta && cta.getBoundingClientRect().top <= 0) {
        updateInsightsHeaderChrome({ ctaSectionVisible: true });
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <ArcInsightsFeedSection id="blogs" entries={entries} bottomSeam />
      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
      />
    </>
  );
}
