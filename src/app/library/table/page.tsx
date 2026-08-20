import type { Metadata } from "next";

import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { LibraryTablePageContent } from "@/components/arc/pages/LibraryTablePageContent";
import { libraryTablePage } from "@/content/pages/library-table";

export const metadata: Metadata = {
  title: libraryTablePage.seo.title,
  description: libraryTablePage.seo.description,
  alternates: { canonical: "/library/table" },
};

/** From the Arc Table — recipes and nutrition education. */
export default function LibraryTablePage() {
  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <LibraryTablePageContent />
    </ArcMarketingShell>
  );
}
