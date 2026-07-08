import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { AestheticsPageContent } from "@/components/arc/pages/AestheticsPageContent";
import { aestheticsPage } from "@/content/pages/aesthetics";

export const metadata: Metadata = {
  title: aestheticsPage.seo.title,
  description: aestheticsPage.seo.description,
};

export default function AestheticsPage() {
  return (
    <ArcMarketingShell>
      <AestheticsPageContent />
    </ArcMarketingShell>
  );
}
