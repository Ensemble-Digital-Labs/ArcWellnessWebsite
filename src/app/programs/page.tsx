import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { programsPage } from "@/content/pages/programs";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

export const metadata: Metadata = {
  title: programsPage.seo.title,
  description: programsPage.seo.description,
};

export default function ProgramsPage() {
  const { hero, pillars } = programsPage;

  return (
    <ArcMarketingShell>
      <ScrollChapterIntroSection
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.body}
        imageSrc={images.investBanner}
        ctaHref="/book"
        ctaLabel="Ask about programs"
      />
      <ArcScrollEditorialSection
        title="Built for continuity"
        paragraphs={pillars.map((p) => `${p.title}: ${p.body}`)}
        imageSrc={images.heroMedia}
        imageAlt="ARC Wellness"
        pinned
        cta={{ href: "/contact", label: "Contact our team" }}
      />
      <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
    </ArcMarketingShell>
  );
}
