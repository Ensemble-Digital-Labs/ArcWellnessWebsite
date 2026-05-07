import type { ReactNode } from "react";
import { ArcFooter } from "@/components/arc/ArcFooter";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { ArcFounderIntroSection } from "@/components/arc/ArcFounderIntroSection";
import { ArcConcernsPinnedSection } from "@/components/arc/ArcConcernsPinnedSection";
import { ArcWelcomeSplitSection } from "@/components/arc/ArcWelcomeSplitSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollExpandHero } from "@/components/arc/ScrollExpandHero";
import { WholeBodySection } from "@/components/arc/WholeBodySection";
import { YourPathSection } from "@/components/arc/YourPathSection";
import { ArcTestimonialsSection } from "@/components/arc/ArcTestimonialsSection";
import {
  homeInvestSupport,
  homeFounder,
  homeTestimonials,
  homeWelcome,
} from "@/content/homepage";
import { images } from "@/content/site";

export type ArcMarketingHomeProps = {
  header: ReactNode;
  /** When set, rewrites leading `/#anchor` links so CTAs stay on this route (e.g. logo demo routes). */
  sectionBasePath?: string;
};

function prefixRootHashHref(href: string, sectionBasePath: string | undefined): string {
  if (!sectionBasePath || sectionBasePath === "/") return href;
  const base = sectionBasePath.replace(/\/$/, "");
  if (href.startsWith("/#")) return `${base}#${href.slice(2)}`;
  return href;
}

export function ArcMarketingHome({ header, sectionBasePath }: ArcMarketingHomeProps) {
  const welcome =
    sectionBasePath !== undefined
      ? {
          ...homeWelcome,
          ctaHref: prefixRootHashHref(homeWelcome.ctaHref, sectionBasePath),
        }
      : homeWelcome;

  return (
    <>
      {header}
      <ArcScrollShell>
        <ScrollExpandHero
          bgImageSrc={images.heroBg}
          mediaSrc={images.heroMedia}
          title="Where Aesthetics, Wellness, and Longevity Converge."
          intro={
            <>
              ARC Wellness is a clinical sanctuary in the Presidio—pairing functional medicine,
              advanced aesthetics, and lifestyle coaching into a single, decade-by-decade plan written
              for one patient: you.
            </>
          }
        />

        <ArcConcernsPinnedSection />

        <ArcWelcomeSplitSection
          id="about"
          imageSrc={images.whoWeAre}
          headline={welcome.headline}
          headlineEmphasisWord={welcome.headlineEmphasisWord}
          paragraph1={welcome.paragraph1}
          paragraph2={welcome.paragraph2}
          proofLead={welcome.proofLead}
          proofRest={welcome.proofRest}
          ctaHref={welcome.ctaHref}
          ctaLabel={welcome.ctaLabel}
        />

        <ArcFounderIntroSection
          id="founder"
          imageSrc={images.founderPortrait}
          imageAlt="Dr. Danish Jabbar, founder and physician at ARC Wellness"
          headline={homeFounder.headline}
          headlineEmphasisWord={homeFounder.headlineEmphasisWord}
          headlineEmphasisWord2={homeFounder.headlineEmphasisWord2}
          heroMeetLead={homeFounder.heroMeetLead}
          heroNameItalic={homeFounder.heroNameItalic}
          roleTitle={homeFounder.roleTitle}
          intro={homeFounder.intro}
          deliverablesHeading={homeFounder.deliverablesHeading}
          deliverables={homeFounder.deliverables}
          accordionPanels={homeFounder.accordionPanels}
        />

        <WholeBodySection />
        <YourPathSection />
        <ArcTestimonialsSection items={homeTestimonials} />
        <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
        <ArcFooter />
      </ArcScrollShell>
    </>
  );
}
