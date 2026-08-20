import type { Metadata } from "next";
import { preload } from "react-dom";

import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { LibraryEducationPageContent } from "@/components/arc/pages/LibraryEducationPageContent";
import { INSIGHTS_FEED_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { libraryEducationPage } from "@/content/pages/library-education";
import { getInsightEntries } from "@/lib/insightsStore";

export const metadata: Metadata = {
  title: libraryEducationPage.seo.title,
  description: libraryEducationPage.seo.description,
  alternates: { canonical: "/library/education" },
};

/** Education hub — blogs and clinical articles under Arc Library. */
export default function LibraryEducationPage() {
  const entries = getInsightEntries();

  preload(INSIGHTS_FEED_AMBIENT_SRC, { as: "image", fetchPriority: "high" });
  for (const entry of entries.slice(0, 3)) {
    if (entry.imageSrc) {
      preload(entry.imageSrc, { as: "image", fetchPriority: "high" });
    }
  }

  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <LibraryEducationPageContent entries={entries} />
    </ArcMarketingShell>
  );
}
