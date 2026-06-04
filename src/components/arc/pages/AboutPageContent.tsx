"use client";

import { ArcAboutNarrativePinSection } from "@/components/arc/ArcAboutNarrativePinSection";
import { ArcClinicSpaceTeaserSection } from "@/components/arc/ArcClinicSpaceTeaserSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcValuesRevealSection } from "@/components/arc/ArcValuesRevealSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { aboutPage } from "@/content/pages/about";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

export function AboutPageContent() {
  const { hero, clinicTour, mission, vision, values, founder, differentiators } = aboutPage;

  const storyLines = hero.paragraphs;

  return (
    <>
      <ScrollChapterIntroSection
        id="about-hero"
        motion="enter-once"
        eyebrow={hero.eyebrow}
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.paragraphs[0] ?? hero.paragraphs.join(" ")}
        introMode="visible-on-load"
        imageSrc={images.clinicInteriors.consultationLounge}
        floatingMedia={{
          src: images.membershipCohortHero,
          alt: "Consultation at ARC Wellness",
        }}
        ctaHref="/book"
        ctaLabel="Book a free consultation"
      />

      <ArcAboutNarrativePinSection
        id="about-story"
        motion="enter-once"
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleEmphasis={hero.titleEmphasis}
        storyLines={storyLines}
        ctaHref="/contact"
        ctaLabel="Meet our team"
      />

      <ArcClinicSpaceTeaserSection
        id="about-clinic"
        eyebrow={clinicTour.eyebrow}
        title={clinicTour.title}
        titleEmphasis={clinicTour.titleEmphasis}
        slides={clinicTour.slides}
      />

      <ArcScrollEditorialSection
        id="mission"
        eyebrow="Mission"
        title={mission.title}
        titleEmphasis={mission.subtitle}
        paragraphs={[mission.body]}
        imageSrc={images.whoWeAre}
        imageAlt="Consultation at ARC Wellness"
        revealLines
      />

      <ArcScrollEditorialSection
        id="vision"
        variant="muted"
        eyebrow="Vision"
        title={vision.title}
        titleEmphasis={vision.subtitle}
        paragraphs={[vision.body]}
        imageSrc={images.clinicInteriors.ivTherapyReclinerRoom}
        imageAlt="IV therapy lounge at ARC Wellness"
        imagePosition="left"
        revealLines
      />

      <ArcValuesRevealSection
        id="values"
        eyebrow={values.eyebrow}
        title={values.title}
        titleEmphasis={values.titleEmphasis}
        intro={values.intro}
        items={values.items}
      />

      <ArcScrollEditorialSection
        id="differentiators"
        eyebrow="How we care"
        title="What sets us apart"
        paragraphs={differentiators.map((d) => `${d.title} — ${d.body}`)}
        imageSrc={images.clinicInteriors.hallwayAccentSeating}
        imageAlt="ARC Wellness interior"
        revealLines
        cta={{ href: "/treatments", label: "Explore treatments" }}
      />

      <ArcScrollEditorialSection
        id="founder"
        variant="muted"
        eyebrow={founder.title}
        title="A note from"
        titleEmphasis="our founder"
        paragraphs={[
          ...founder.paragraphs,
          `— ${founder.signoff}`,
          founder.role,
        ]}
        imageSrc={images.founderPortrait}
        imageAlt="Dr. Danish Jabbar, Founder & Medical Director"
        imagePosition="left"
        revealLines
      />

      <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
    </>
  );
}
