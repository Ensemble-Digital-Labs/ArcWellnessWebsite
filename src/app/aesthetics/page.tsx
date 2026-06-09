import type { Metadata } from "next";
import Link from "next/link";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { aestheticsPage } from "@/content/pages/aesthetics";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

export const metadata: Metadata = {
  title: aestheticsPage.seo.title,
  description: aestheticsPage.seo.description,
};

export default function AestheticsPage() {
  const { hero, principles, linkedTreatments } = aestheticsPage;

  return (
    <ArcMarketingShell>
      <ScrollChapterIntroSection
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.body}
        imageSrc={images.services[0]}
        ctaHref="/book"
        ctaLabel="Book aesthetics consult"
      />
      <ArcScrollEditorialSection
        title="Our approach"
        paragraphs={principles}
        imageSrc={images.services[0]}
        imageAlt="Facial aesthetics"
        pinned
      />
      <section className="bg-arc-teal-muted/25 px-6 py-14 sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {linkedTreatments.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              data-scroll-section
              className="rounded-full border border-arc-teal/25 bg-white px-5 py-2.5 font-sans text-sm font-medium text-arc-charcoal hover:bg-arc-teal-muted/40"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </section>
      <InvestCTASection imageSrc={images.heroMedia} supportingLine={homeInvestSupport} />
    </ArcMarketingShell>
  );
}
