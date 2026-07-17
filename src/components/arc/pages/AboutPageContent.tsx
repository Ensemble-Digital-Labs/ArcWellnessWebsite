"use client";

import { ArcAboutNarrativePinSection } from "@/components/arc/ArcAboutNarrativePinSection";
import { ArcClinicSpaceTeaserSection } from "@/components/arc/ArcClinicSpaceTeaserSection";
import { ArcFounderNoteSection } from "@/components/arc/ArcFounderNoteSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcValuesRevealSection } from "@/components/arc/ArcValuesRevealSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollExpandHero } from "@/components/arc/ScrollExpandHero";
import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { aboutPage } from "@/content/pages/about";
import { images } from "@/content/site";

export function AboutPageContent() {
  const { hero, clinicTour, mission, vision, values, founder, investSupport } = aboutPage;

  return (
    <>
      <ScrollExpandHero
        bgImageSrc={images.heroMedia}
        title="Where Wellness, Longevity & Aesthetics Converge."
        referenceLayout
        showCopy={false}
        showKeywordMarquee={false}
        overlayHeading={`${hero.headline} ${hero.headlineEmphasis}`}
        bottomSeam
        intro={null}
      />

      {/* Pull the cream story section up a few px under the pinned hero so the GSAP
          pin/fixed layer boundary can't leave a 1px compositing hairline at the seam. */}
      <div className="relative z-[5] -mt-[8px] bg-arc-cream">
        <ArcAboutNarrativePinSection
          id="about-story"
          motion="enter-once"
          title={hero.title}
          titleEmphasis={hero.titleEmphasis}
          storyLines={hero.paragraphs}
          sideImageSrc={hero.storySideImage}
          sideImageAlt={hero.storySideImageAlt}
          headlineEmphasisTone="teal"
          topSeam
          bottomSeam
        />
      </div>

      <ArcClinicSpaceTeaserSection
        id="about-clinic"
        title={clinicTour.title}
        titleEmphasis={clinicTour.titleEmphasis}
        previewIntro={clinicTour.previewIntro}
        slides={clinicTour.slides}
        headlineEmphasisTone="teal"
        topSeam
        bottomSeam
      />

      <ArcScrollEditorialSection
        id="mission"
        title={mission.title}
        titleEmphasis={mission.subtitle}
        headlineLayout="stacked"
        bodyTypography="about-compact"
        paragraphs={[mission.body]}
        imageSrc={CLINIC_INTERIOR_IMAGES.consultationLounge}
        imageAlt={CLINIC_INTERIOR_ALT.consultationLounge}
        variant="cream"
        headlineEmphasisTone="teal"
        revealLines
        topSeam
        seamTone="cream"
        seamVariant="soft"
        compactBottom
      />

      <ArcScrollEditorialSection
        id="vision"
        title={vision.title}
        titleEmphasis={vision.subtitle}
        headlineLayout="stacked"
        bodyTypography="about-compact"
        paragraphs={[vision.body]}
        imageSrc={CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom}
        imageAlt={CLINIC_INTERIOR_ALT.ivTherapyReclinerRoom}
        imagePosition="left"
        variant="cream"
        headlineEmphasisTone="teal"
        revealLines
        compactTop
        compactBottom
      />

      <ArcValuesRevealSection
        id="values"
        title={values.title}
        titleEmphasis={values.titleEmphasis}
        intro={values.intro}
        items={values.items}
        accentTone="teal"
        marbleAmbient
        topSeam
        compactTop
        bottomSeam
      />

      <ArcFounderNoteSection
        id="founder"
        title={founder.title}
        titleEmphasis={founder.titleEmphasis}
        lead={founder.lead}
        body={founder.body}
        signoff={founder.signoff}
        role={founder.role}
        imageSrc={images.founderNotePortrait}
        imageAlt="Dr. Danish Jabbar, Founder & Medical Director"
        mobileImageSrc={images.founderNotePortraitMobile}
        mobileImageAlt="Dr. Danish Jabbar, Founder & Medical Director at ARC Wellness"
        headlineEmphasisTone="teal"
        topSeam
        compactTop
        bottomSeam
        compactBottom
      />

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={investSupport}
        topSeam
      />
    </>
  );
}
