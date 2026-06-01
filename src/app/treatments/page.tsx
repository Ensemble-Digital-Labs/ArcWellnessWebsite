import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { TreatmentsPageContent } from "@/components/arc/pages/TreatmentsPageContent";
import { treatmentsHub } from "@/content/pages/treatments";

export const metadata: Metadata = {
  title: treatmentsHub.seo.title,
  description: treatmentsHub.seo.description,
};

export default function TreatmentsPage() {
  return (
    <ArcMarketingShell>
      <TreatmentsPageContent />
    </ArcMarketingShell>
  );
}
