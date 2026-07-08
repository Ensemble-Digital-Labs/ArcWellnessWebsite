"use client";

import Link from "next/link";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { homeInvestSupport } from "@/content/homepage";
import { type InsightEntry, type InsightKind } from "@/content/pages/insights";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";
import { ARC_PAGE_RAIL_MAX, ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type InsightDetailContentProps = {
  entry: InsightEntry;
};

function backHref(kind: InsightKind): string {
  return kind === "blog" ? "/case-studies?filter=blog" : "/case-studies?filter=case-study";
}

function backLabel(kind: InsightKind): string {
  return kind === "blog" ? "← All blogs" : "← All case studies";
}

export function InsightDetailContent({ entry }: InsightDetailContentProps) {
  return (
    <>
      <ScrollChapterIntroSection
        id="insight-hero"
        headline={entry.title}
        body={entry.excerpt}
        imageSrc={entry.imageSrc}
        ctaHref={siteMeta.bookingUrl}
        ctaLabel="Book a consultation"
        bottomSeam
      />

      <section
        className={cn(
          "relative bg-arc-cream px-6 py-14 sm:px-10 md:px-12 md:py-20",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto w-full max-w-3xl", ARC_PAGE_RAIL_MAX)}>
          <div className="space-y-6">
            {entry.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                data-scroll-section
                className="font-sans text-base leading-relaxed text-arc-charcoal/80 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Link
            href={backHref(entry.kind)}
            className="mt-10 inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.16em] text-arc-teal hover:text-arc-teal-hover"
          >
            {backLabel(entry.kind)}
          </Link>
        </div>
      </section>

      <InvestCTASection imageSrc={images.heroMedia} supportingLine={homeInvestSupport} topSeam />
    </>
  );
}
