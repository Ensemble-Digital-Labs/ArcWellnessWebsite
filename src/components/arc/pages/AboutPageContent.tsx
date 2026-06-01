"use client";

import { ArcAboutNarrativePinSection } from "@/components/arc/ArcAboutNarrativePinSection";
import { ArcClinicCarouselSection } from "@/components/arc/ArcClinicCarouselSection";
import { ArcFounderIntroSection } from "@/components/arc/ArcFounderIntroSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcStatsBandSection } from "@/components/arc/ArcStatsBandSection";
import { ArcValuesRevealSection } from "@/components/arc/ArcValuesRevealSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { aboutPage } from "@/content/pages/about";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";

export function AboutPageContent() {
  const { hero, clinicTour, mission, vision, values, stats, founder, differentiators } = aboutPage;

  const storyLines = hero.paragraphs;

  return (
    <>
      <ScrollChapterIntroSection
        id="about-hero"
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
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleEmphasis={hero.titleEmphasis}
        storyLines={storyLines}
        ctaHref="/contact"
        ctaLabel="Meet our team"
      />

      <ArcClinicCarouselSection
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

      <ArcStatsBandSection
        id="about-stats"
        eyebrow={stats.eyebrow}
        title={stats.title}
        titleEmphasis={stats.titleEmphasis}
        items={stats.items}
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

      <ArcFounderIntroSection
        id="founder"
        imageSrc={images.founderPortrait}
        imageAlt="Dr. Danish Jabbar, Founder & Medical Director"
        headline={founder.signoff}
        headlineEmphasisWord="Dr. Danish"
        headlineEmphasisWord2="Jabbar"
        heroMeetLead="Meet Dr."
        heroNameItalic="Danish Jabbar"
        roleTitle={founder.role}
        intro={founder.paragraphs[0] ?? ""}
        deliverablesHeading="Philosophy"
        deliverables={founder.paragraphs.slice(1, 4)}
        accordionPanels={[
          { title: "Physician-led", imageSrc: images.founderPortrait },
          { title: "In practice", imageSrc: images.founderGallery[0] },
          { title: "With patients", imageSrc: images.founderGallery[1] },
          { title: "Partnership", imageSrc: images.founderGallery[2] },
        ]}
      />

      <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
    </>
  );
}
