import { ArcFooter } from "@/components/arc/ArcFooter";
// import { ArcMicroStatementSection } from "@/components/arc/ArcMicroStatementSection";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { ArcFounderIntroSection } from "@/components/arc/ArcFounderIntroSection";
import { ArcConcernsPinnedSection } from "@/components/arc/ArcConcernsPinnedSection";
import { ArcWelcomeSplitSection } from "@/components/arc/ArcWelcomeSplitSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollExpandHero } from "@/components/arc/ScrollExpandHero";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { WholeBodySection } from "@/components/arc/WholeBodySection";
import { YourPathSection } from "@/components/arc/YourPathSection";
import { ArcTestimonialsSection } from "@/components/arc/ArcTestimonialsSection";
import {
  homeInvestSupport,
  homeFounder,
  // homeMicro1,
  homeTestimonials,
  homeWelcome,
} from "@/content/homepage";
import { images } from "@/content/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
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

        {/* Micro statement — commented out while presenting alternate design; restore import + homeMicro1 + videos when needed. */}
        {/* <ArcMicroStatementSection
          pinnedScrollMotion
          pinnedBackgroundVideoSrc={videos.microStatement}
          pinnedBackgroundPosterSrc={images.heroMedia}
          headlineBefore={homeMicro1.headlineBefore}
          headlineEmphasis={homeMicro1.headlineEmphasis}
          headlineAfter={homeMicro1.headlineAfter}
          uspLine={homeMicro1.uspLine}
          linkHref={homeMicro1.linkHref}
          linkLabel={homeMicro1.linkLabel}
        /> */}

        <ArcConcernsPinnedSection />

        <ArcWelcomeSplitSection
          id="about"
          imageSrc={images.whoWeAre}
          headline={homeWelcome.headline}
          headlineEmphasisWord={homeWelcome.headlineEmphasisWord}
          paragraph1={homeWelcome.paragraph1}
          paragraph2={homeWelcome.paragraph2}
          proofLead={homeWelcome.proofLead}
          proofRest={homeWelcome.proofRest}
          ctaHref={homeWelcome.ctaHref}
          ctaLabel={homeWelcome.ctaLabel}
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
