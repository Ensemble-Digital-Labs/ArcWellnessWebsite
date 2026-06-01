import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { CaseStudiesPageContent } from "@/components/arc/pages/CaseStudiesPageContent";
import { caseStudiesPage } from "@/content/pages/case-studies";

export const metadata: Metadata = {
  title: caseStudiesPage.seo.title,
  description: caseStudiesPage.seo.description,
};

export default function CaseStudiesPage() {
  return (
    <ArcMarketingShell>
      <CaseStudiesPageContent />
    </ArcMarketingShell>
  );
}
