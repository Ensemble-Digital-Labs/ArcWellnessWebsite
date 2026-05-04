import { ArcFooter } from "@/components/arc/ArcFooter";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ScrollExpandHero } from "@/components/arc/ScrollExpandHero";
import { SiteHeader } from "@/components/arc/SiteHeader";
import { WhoWeAreSection } from "@/components/arc/WhoWeAreSection";
import { WholeBodySection } from "@/components/arc/WholeBodySection";
import { YourPathSection } from "@/components/arc/YourPathSection";
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
          intro="ARC Wellness pairs thoughtful aesthetics with whole-body wellness—so you can age intentionally and live with confidence."
        />

        <ScrollChapterIntroSection
          id="chapters"
          headline="Care, chapter by chapter"
          body="Scroll through each chapter of care—from philosophy and services to your ongoing path and next step with our team."
          imageSrc={images.whoWeAre}
        />

        <WhoWeAreSection imageSrc={images.whoWeAre} />
        <WholeBodySection imageUrls={images.services} />
        <YourPathSection />
        <InvestCTASection imageSrc={images.investBanner} />
        <ArcFooter />
      </ArcScrollShell>
    </>
  );
}
