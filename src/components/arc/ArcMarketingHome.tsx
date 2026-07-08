import type { ReactNode } from "react";
import { ArcFooter } from "@/components/arc/ArcFooter";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { ArcFounderIntroSection } from "@/components/arc/ArcFounderIntroSection";
import { ArcConcernsPinnedSection } from "@/components/arc/ArcConcernsPinnedSection";
import { ArcWelcomeSplitSection } from "@/components/arc/ArcWelcomeSplitSection";
import { ArcUspStatBar } from "@/components/arc/ArcUspStatBar";
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollExpandHero } from "@/components/arc/ScrollExpandHero";
import { WholeBodySection } from "@/components/arc/WholeBodySection";
import { YourPathSection } from "@/components/arc/YourPathSection";
import { ArcTestimonialsSection } from "@/components/arc/ArcTestimonialsSection";
import { ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS } from "@/lib/arc-layout";
import {
  homeInvestSupport,
  homeFounder,
  homePathIntro,
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
  const welcome = homeWelcome;

  return (
    <>
      {header}
      <ArcScrollShell>
        <ScrollExpandHero
          bgImageSrc={images.heroMedia}
          title="Where Wellness, Longevity & Aesthetics Converge."
          referenceLayout
          intro={
            <>
              Redefining how you look, feel, and function through every decade with intentional,
              science-backed care designed for the life you are building.
            </>
          }
        />

        <ArcConcernsPinnedSection bottomSeam />

        <ArcWelcomeSplitSection
          id="about"
          topSeam
          backdropSrc={CLINIC_INTERIOR_IMAGES.consultationLounge}
          headline={welcome.headline}
          headlineEmphasisWord={welcome.headlineEmphasisWord}
          paragraphs={welcome.paragraphs}
        />

        <ArcUspStatBar />

        <ArcFounderIntroSection
          id="founder"
          topSeam
          bottomSeam
          imageSrc={images.founderPortrait}
          imageAlt="Dr. Danish Jabbar, founder and physician at ARC Wellness"
          headline={homeFounder.headline}
          headlineEmphasisWord={homeFounder.headlineEmphasisWord}
          headlineEmphasisWord2={homeFounder.headlineEmphasisWord2}
          roleTitle={homeFounder.roleTitle}
          letterParagraphs={homeFounder.letterParagraphs}
          closingLine={homeFounder.closingLine}
        />

        <WholeBodySection topSeam bottomSeam />
        <YourPathSection intro={homePathIntro} topSeam stepsSeam bottomSeam />
        <ArcTestimonialsSection items={homeTestimonials} topSeam bottomSeam />
        <InvestCTASection
          imageSrc={images.heroMedia}
          supportingLine={homeInvestSupport}
          topSeam
          topSeamOverlap={false}
          topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
        />
        <ArcFooter />
      </ArcScrollShell>
    </>
  );
}
