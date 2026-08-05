import type { Metadata } from "next";
import { preload } from "react-dom";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { CaseStudiesPageContent } from "@/components/arc/pages/CaseStudiesPageContent";
import { INSIGHTS_FEED_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { insightsPage } from "@/content/pages/insights";
import { getInsightEntries } from "@/lib/insightsStore";

export const metadata: Metadata = {
  title: insightsPage.seo.title,
  description: insightsPage.seo.description,
};

export default function CaseStudiesPage() {
  const entries = getInsightEntries();

  preload(INSIGHTS_FEED_AMBIENT_SRC, { as: "image", fetchPriority: "high" });
  for (const entry of entries.slice(0, 3)) {
    preload(entry.imageSrc, { as: "image", fetchPriority: "high" });
  }

  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <CaseStudiesPageContent entries={entries} />
    </ArcMarketingShell>
  );
}
