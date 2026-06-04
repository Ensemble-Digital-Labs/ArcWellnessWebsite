"use client";

import Link from "next/link";
import { ArcAboutNarrativePinSection } from "@/components/arc/ArcAboutNarrativePinSection";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ABOUT_HERO_COPY_AMBIENT_IMAGES } from "@/content/backgroundDecoration";
import { homeInvestSupport } from "@/content/homepage";
import type { TreatmentPage } from "@/content/pages/treatments";
import {
  buildTreatmentHeroCanvasTiles,
  splitTreatmentSectionHeading,
  treatmentSectionParagraphs,
} from "@/content/treatmentDetailHero";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type TreatmentDetailContentProps = {
  treatment: TreatmentPage;
};

export function TreatmentDetailContent({ treatment }: TreatmentDetailContentProps) {
  return (
    <>
      <ScrollChapterIntroSection
        id="treatment-hero"
        layout="ambient-full"
        motion="enter-once"
        introMode="visible-on-load"
        headline={treatment.title}
        headlineEmphasis={treatment.tagline}
        headlineEmphasisSize="compact"
        body=""
        copyColumnAmbients={ABOUT_HERO_COPY_AMBIENT_IMAGES}
        heroCanvasTiles={buildTreatmentHeroCanvasTiles(treatment)}
      />

      <ArcAboutNarrativePinSection
        id="treatment-intro"
        motion="enter-once"
        title="About"
        titleEmphasis={treatment.title}
        storyLines={[treatment.intro]}
        sideImageSrc={treatment.imageSrc}
        sideImageAlt={treatment.imageAlt}
      />

      {treatment.highlights?.length ? (
        <ArcScrollEditorialSection
          id="treatment-highlights"
          title="What to"
          titleEmphasis="expect"
          headlineLayout="split"
          bodyTypography="editorial"
          revealLines
          paragraphs={treatment.highlights}
          variant="cream"
        />
      ) : null}

      {treatment.sections.map((section, i) => {
        const heading = section.heading ?? treatment.title;
        const { title, titleEmphasis } = splitTreatmentSectionHeading(heading);
        const paragraphs = treatmentSectionParagraphs(section);
        if (!paragraphs.length) return null;

        return (
          <ArcScrollEditorialSection
            key={`${heading}-${i}`}
            id={`treatment-section-${i}`}
            title={title}
            titleEmphasis={titleEmphasis}
            headlineLayout="split"
            bodyTypography="editorial"
            revealLines
            paragraphs={paragraphs}
            imageSrc={i % 2 === 0 ? treatment.imageSrc : undefined}
            imageAlt={treatment.imageAlt}
            imagePosition={i % 2 === 0 ? "right" : "left"}
            variant="cream"
          />
        );
      })}

      {treatment.faqs?.length ? (
        <ArcFaqSection
          id="treatment-faq"
          className="border-t-0"
          categories={{ treatment: treatment.title }}
          faqByCategory={{ treatment: treatment.faqs }}
        />
      ) : null}

      <section className="bg-arc-cream px-6 py-12 sm:px-10 md:px-12">
        <div className={cn("mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
          <Link
            href="/treatments"
            className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-rose-gold-ink transition-colors hover:text-arc-rose-gold-ink-hover"
          >
            ← All treatments
          </Link>
        </div>
      </section>

      <InvestCTASection
        imageSrc={treatment.imageSrc}
        supportingLine={homeInvestSupport}
        pin={false}
      />
    </>
  );
}
