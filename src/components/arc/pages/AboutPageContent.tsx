"use client";

import { ArcAboutNarrativePinSection } from "@/components/arc/ArcAboutNarrativePinSection";
import { ArcClinicSpaceTeaserSection } from "@/components/arc/ArcClinicSpaceTeaserSection";
import { ArcFounderNoteSection } from "@/components/arc/ArcFounderNoteSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcValuesRevealSection } from "@/components/arc/ArcValuesRevealSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ABOUT_HERO_CANVAS_TILES } from "@/content/aboutHeroCanvas";
import { ABOUT_HERO_COPY_AMBIENT_IMAGES } from "@/content/backgroundDecoration";
import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { aboutPage } from "@/content/pages/about";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

export function AboutPageContent() {
  const { hero, clinicTour, mission, vision, values, founder } = aboutPage;

  const storyLines = hero.paragraphs;

  return (
    <>
      <ScrollChapterIntroSection
        id="about-hero"
        layout="ambient-full"
        motion="enter-once"
        headline={hero.headline}
        headlineEmphasis={hero.headlineEmphasis}
        body=""
        introMode="visible-on-load"
        copyColumnAmbients={ABOUT_HERO_COPY_AMBIENT_IMAGES}
        heroCanvasTiles={ABOUT_HERO_CANVAS_TILES}
      />

      <ArcAboutNarrativePinSection
        id="about-story"
        motion="enter-once"
        title={hero.title}
        titleEmphasis={hero.titleEmphasis}
        storyLines={storyLines}
        sideImageSrc={hero.storySideImage}
        sideImageAlt={hero.storySideImageAlt}
      />

      <ArcClinicSpaceTeaserSection
        id="about-clinic"
        title={clinicTour.title}
        titleEmphasis={clinicTour.titleEmphasis}
        ctaPrimary={clinicTour.ctaPrimary}
        ctaSecondary={clinicTour.ctaSecondary}
        slides={clinicTour.slides}
      />

      <ArcScrollEditorialSection
        id="mission"
        title={mission.title}
        titleEmphasis={mission.subtitle}
        headlineLayout="stacked"
        bodyTypography="editorial"
        paragraphs={[mission.body]}
        imageSrc={CLINIC_INTERIOR_IMAGES.consultationLounge}
        imageAlt={CLINIC_INTERIOR_ALT.consultationLounge}
        revealLines
      />

      <ArcScrollEditorialSection
        id="vision"
        title={vision.title}
        titleEmphasis={vision.subtitle}
        headlineLayout="stacked"
        bodyTypography="editorial"
        paragraphs={[vision.body]}
        imageSrc={CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom}
        imageAlt={CLINIC_INTERIOR_ALT.ivTherapyReclinerRoom}
        imagePosition="left"
        revealLines
      />

      <ArcValuesRevealSection
        id="values"
        title={values.title}
        titleEmphasis={values.titleEmphasis}
        intro={values.intro}
        items={values.items}
      />

      <ArcFounderNoteSection
        id="founder"
        title={founder.title}
        titleEmphasis={founder.titleEmphasis}
        lead={founder.lead}
        body={founder.body}
        signoff={founder.signoff}
        role={founder.role}
        imageSrc={images.founderPortrait}
        imageAlt="Dr. Danish Jabbar, Founder & Medical Director"
      />

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
      />
    </>
  );
}
