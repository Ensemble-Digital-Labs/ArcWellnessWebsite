import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ProgramsPageContent } from "@/components/arc/pages/ProgramsPageContent";
import { programsPage } from "@/content/pages/programs";

export const metadata: Metadata = {
  title: programsPage.seo.title,
  description: programsPage.seo.description,
};

export default function ProgramsPage() {
  return (
    <ArcMarketingShell>
      <ProgramsPageContent />
    </ArcMarketingShell>
  );
}
