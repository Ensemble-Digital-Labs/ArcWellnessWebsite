"use client";

import { useEffect } from "react";
import { ArcInsightsFeedSection } from "@/components/arc/ArcInsightsFeedSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { libraryEducationPage } from "@/content/pages/library-education";
import type { InsightEntry } from "@/content/pages/insights";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import { updateInsightsHeaderChrome } from "@/lib/arcInsightsHeaderSync";

const INSIGHTS_CTA_SECTION_ID = "book";

/** Education hub — blog feed under Arc Library. */
export function LibraryEducationPageContent({
  entries,
}: {
  entries: readonly InsightEntry[];
}) {
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
      <ArcInsightsFeedSection
        id="library-education"
        entries={entries}
        bottomSeam
        masthead={libraryEducationPage.masthead}
        filterAriaLabel={libraryEducationPage.filterAriaLabel}
        filterUnderlineId="education-filter-underline"
      />
      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
      />
    </>
  );
}
