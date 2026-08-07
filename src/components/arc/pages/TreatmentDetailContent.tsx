"use client";

import Link from "next/link";
import { ArcAboutNarrativePinSection } from "@/components/arc/ArcAboutNarrativePinSection";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
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
import { images } from "@/content/site";
import { ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS, ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS, ARC_PAGE_RAIL_MAX, ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type TreatmentDetailContentProps = {
  treatment: TreatmentPage;
};

export function TreatmentDetailContent({ treatment }: TreatmentDetailContentProps) {
  const sectionCount = treatment.sections.length;

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
        bottomSeam
        priorityBackground
      />

      <ArcAboutNarrativePinSection
        id="treatment-intro"
        motion="enter-once"
        title="About"
        titleEmphasis={treatment.title}
        storyLines={[treatment.intro]}
        sideImageSrc={treatment.imageSrc}
        sideImageAlt={treatment.imageAlt}
        headlineEmphasisTone="teal"
        topSeam
        bottomSeam
      />

      {treatment.highlights?.length ? (
        <ArcScrollEditorialSection
          id="treatment-highlights"
          title="What to"
          titleEmphasis="expect"
          headlineLayout="split"
          bodyTypography="about-compact"
          revealLines
          paragraphs={treatment.highlights}
          variant="cream"
          headlineEmphasisTone="teal"
          topSeam
          compactTop
          bottomSeam
          compactBottom={sectionCount > 0}
          seamVariant="soft"
        />
      ) : null}

      {treatment.sections.map((section, i) => {
        const heading = section.heading ?? treatment.title;
        const { title, titleEmphasis } = splitTreatmentSectionHeading(heading);
        const paragraphs = treatmentSectionParagraphs(section);
        if (!paragraphs.length) return null;

        const isFirst = i === 0;
        const isLast = i === sectionCount - 1;

        return (
          <ArcScrollEditorialSection
            key={`${heading}-${i}`}
            id={`treatment-section-${i}`}
            title={title}
            titleEmphasis={titleEmphasis}
            headlineLayout="split"
            bodyTypography="about-compact"
            revealLines
            paragraphs={paragraphs}
            imageSrc={i % 2 === 0 ? treatment.imageSrc : undefined}
            imageAlt={treatment.imageAlt}
            imagePosition={i % 2 === 0 ? "right" : "left"}
            variant="cream"
            headlineEmphasisTone="teal"
            topSeam
            compactTop={!isFirst || Boolean(treatment.highlights?.length)}
            bottomSeam
            compactBottom={!isLast}
            seamVariant="soft"
          />
        );
      })}

      {treatment.faqs?.length ? (
        <ArcFaqSection
          id="treatment-faq"
          categories={{ treatment: treatment.title }}
          faqByCategory={{ treatment: treatment.faqs }}
          topSeam
          bottomSeam
        />
      ) : null}

      <section
        className={cn(
          "relative bg-arc-cream px-6 py-12 sm:px-10 md:px-12",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
          <ArcTextReveal variant="line">
            <Link
              href="/treatments#treatments-index"
              className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-teal-ink transition-colors hover:text-arc-teal-ink-hover"
            >
              ← All treatments
            </Link>
          </ArcTextReveal>
        </div>
        <div aria-hidden className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS} />
      </section>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}
