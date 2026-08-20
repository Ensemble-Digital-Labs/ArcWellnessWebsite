import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { LibraryDeskPageContent } from "@/components/arc/pages/LibraryDeskPageContent";
import { libraryDeskPage } from "@/content/library/desk";

export const metadata: Metadata = {
  title: libraryDeskPage.seo.title,
  description: libraryDeskPage.seo.description,
  alternates: { canonical: "/library/desk" },
};

/** From the Arc Desk — booklets and long-form guides. */
export default function LibraryDeskPage() {
  return (
    <ArcMarketingShell headerProps={{ logoClickOnlyAtTop: true }}>
      <LibraryDeskPageContent />
    </ArcMarketingShell>
  );
}
