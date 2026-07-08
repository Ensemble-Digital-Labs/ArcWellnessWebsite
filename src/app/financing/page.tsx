import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { FinancingPageContent } from "@/components/arc/pages/FinancingPageContent";
import { financingPage } from "@/content/pages/financing";

export const metadata: Metadata = {
  title: financingPage.seo.title,
  description: financingPage.seo.description,
};

export default function FinancingPage() {
  return (
    <ArcMarketingShell>
      <FinancingPageContent />
    </ArcMarketingShell>
  );
}
