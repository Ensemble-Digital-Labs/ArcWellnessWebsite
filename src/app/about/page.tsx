import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { AboutPageContent } from "@/components/arc/pages/AboutPageContent";
import { aboutPage } from "@/content/pages/about";

export const metadata: Metadata = {
  title: aboutPage.seo.title,
  description: aboutPage.seo.description,
};

export default function AboutPage() {
  return (
    <ArcMarketingShell headerProps={{ hideLogoInHero: true }}>
      <AboutPageContent />
    </ArcMarketingShell>
  );
}
