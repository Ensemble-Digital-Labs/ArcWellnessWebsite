import { ArcFooter } from "@/components/arc/ArcFooter";
import { ArcScrollShell } from "@/components/arc/ArcScrollShell";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { PinnedSection } from "@/components/arc/PinnedSection";
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
          scrollHint="Scroll to explore"
        />

        <PinnedSection className="flex min-h-[100dvh] flex-col justify-center border-t border-white/10 bg-arc-cream px-6 py-16 md:px-16">
          <div data-scroll-section className="mx-auto max-w-2xl">
            <p className="text-center font-sans text-sm leading-relaxed text-arc-charcoal/85 md:text-base">
              Scroll through each chapter of care—from philosophy and services to your ongoing path and
              next step with our team.
            </p>
          </div>
        </PinnedSection>

        <WhoWeAreSection imageSrc={images.whoWeAre} />
        <WholeBodySection imageUrls={images.services} />
        <YourPathSection />
        <InvestCTASection imageSrc={images.investBanner} />
        <ArcFooter />
      </ArcScrollShell>
    </>
  );
}
