import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { financingPage } from "@/content/pages/financing";
import { RETAIL_IMAGES } from "@/content/retailImages";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

export const metadata: Metadata = {
  title: financingPage.seo.title,
  description: financingPage.seo.description,
};

export default function FinancingPage() {
  const { hero, options } = financingPage;

  return (
    <ArcMarketingShell>
      <ScrollChapterIntroSection
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.body}
        imageSrc={RETAIL_IMAGES.patientFiFinancingBrochure}
        ctaHref="/book"
        ctaLabel="Book consultation"
      />
      <ArcScrollEditorialSection
        eyebrow="Options"
        title="Flexible payment paths"
        paragraphs={options.map((o) => `${o.title}: ${o.body}`)}
        imageSrc={images.whoWeAre}
        imageAlt="Consultation"
        pinned
      />
      <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
    </ArcMarketingShell>
  );
}
