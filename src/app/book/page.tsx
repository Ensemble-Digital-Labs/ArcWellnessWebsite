import type { Metadata } from "next";
import { ArcMarketingShell } from "@/components/arc/ArcMarketingShell";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";

export const metadata: Metadata = {
  title: "Book a Consultation | Arc Wellness",
  description: "Schedule your free consultation at ARC Wellness in St. Louis.",
};

export default function BookPage() {
  return (
    <ArcMarketingShell>
      <ScrollChapterIntroSection
        headline="Book your consultation"
        body="Your first visit begins with a free conversation—goals, lifestyle, and a plan that feels realistic and personal."
        imageSrc={images.whoWeAre}
        ctaHref={siteMeta.bookingUrl}
        ctaLabel="Open online scheduler"
      />
      <ArcScrollEditorialSection
        eyebrow="Prefer to call?"
        title="We're here to help"
        paragraphs={[
          `Call ${siteMeta.phone}—we return messages within one business day.`,
          `Or email ${siteMeta.email} with a few words about what you're looking for.`,
        ]}
        imageSrc={images.heroMedia}
        imageAlt="ARC Wellness reception"
        cta={{ href: "/contact", label: "Contact page" }}
      />
    </ArcMarketingShell>
  );
}
