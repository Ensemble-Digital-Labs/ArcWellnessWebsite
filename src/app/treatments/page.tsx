import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { Arc360PageContent } from "@/components/arc/pages/Arc360PageContent";
import { arc360Content } from "@/content/pages/arc-360";

export const metadata: Metadata = {
  title: arc360Content.seo.title,
  description: arc360Content.seo.description,
};

export default function TreatmentsPage() {
  return (
    <ArcMarketingShell>
      <Arc360PageContent />
    </ArcMarketingShell>
  );
}
