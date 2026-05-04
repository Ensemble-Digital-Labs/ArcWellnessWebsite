import { ArcFooter } from "@/components/arc/ArcFooter";
import { ArcMicroStatementSection } from "@/components/arc/ArcMicroStatementSection";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { ArcTrustStripSection } from "@/components/arc/ArcTrustStripSection";
import { ArcFounderIntroSection } from "@/components/arc/ArcFounderIntroSection";
import { ArcWelcomeSplitSection } from "@/components/arc/ArcWelcomeSplitSection";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollExpandHero } from "@/components/arc/ScrollExpandHero";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { WholeBodySection } from "@/components/arc/WholeBodySection";
import { YourPathSection } from "@/components/arc/YourPathSection";
import {
  homeInvestSupport,
  homeFounder,
  homeMicro1,
  homeMicro2,
  homeTrustStrip,
  homeWelcome,
} from "@/content/homepage";
import { images, videos } from "@/content/site";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ArcScrollShell>
        <ScrollExpandHero
          bgImageSrc={images.heroBg}
          mediaSrc={images.heroMedia}
          title="Where Aesthetics, Wellness, and Longevity Converge."
          intro="ARC Wellness pairs thoughtful aesthetics with whole-body wellness—so you can age intentionally and live with confidence."
        />

        <ArcMicroStatementSection
          pinnedScrollMotion
          pinnedBackgroundVideoSrc={videos.microStatement}
          pinnedBackgroundPosterSrc={images.heroMedia}
          headlineBefore={homeMicro1.headlineBefore}
          headlineEmphasis={homeMicro1.headlineEmphasis}
          headlineAfter={homeMicro1.headlineAfter}
          uspLine={homeMicro1.uspLine}
          linkHref={homeMicro1.linkHref}
          linkLabel={homeMicro1.linkLabel}
        />

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
          eyebrow={homeFounder.eyebrow}
          headline={homeFounder.headline}
          headlineEmphasisWord={homeFounder.headlineEmphasisWord}
          roleTitle={homeFounder.roleTitle}
          intro={homeFounder.intro}
          deliverablesHeading={homeFounder.deliverablesHeading}
          deliverables={homeFounder.deliverables}
        />

        <ArcTrustStripSection items={homeTrustStrip.items} />

        <ArcMicroStatementSection
          className="pb-10 pt-24 sm:pb-12 sm:pt-28 md:pb-14 md:pt-32"
          eyebrow={homeMicro2.eyebrow}
          headlineBefore={homeMicro2.headlineBefore}
          headlineEmphasis={homeMicro2.headlineEmphasis}
          headlineAfter={homeMicro2.headlineAfter}
          uspLine={homeMicro2.uspLine}
          linkHref={homeMicro2.linkHref}
          linkLabel={homeMicro2.linkLabel}
        />

        <WholeBodySection />
        <YourPathSection />
        <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
        <ArcFooter />
      </ArcScrollShell>
    </>
  );
}
