import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { CaseStudiesPageContent } from "@/components/arc/pages/CaseStudiesPageContent";
import { insightsPage } from "@/content/pages/insights";
import { getInsightEntries } from "@/lib/insightsStore";

export const metadata: Metadata = {
  title: insightsPage.seo.title,
  description: insightsPage.seo.description,
};

export default function CaseStudiesPage() {
  const entries = getInsightEntries();

  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <CaseStudiesPageContent entries={entries} />
    </ArcMarketingShell>
  );
}
