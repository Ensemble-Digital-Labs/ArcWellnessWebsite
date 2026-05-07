import { images } from "@/content/site";
import { editorialHeroImage } from "@/client-showcase/mock-page-content";
import { ArcDesignFooter } from "@/client-showcase/components/ArcDesignFooter";
import { ArcDesignHeader } from "@/client-showcase/components/ArcDesignHeader";
import { ArcDesignHero } from "@/client-showcase/components/ArcDesignHero";
import { ProcessTimelineDesign } from "@/client-showcase/components/ProcessTimelineDesign";
import { ShowcaseConcernMarquee } from "@/client-showcase/components/ShowcaseConcernMarquee";
import { ShowcaseFaqSection } from "@/client-showcase/components/ShowcaseFaqSection";
import { ShowcaseScienceBeautyBand } from "@/client-showcase/components/ShowcaseScienceBeautyBand";
import { ShowcaseSectionReveal } from "@/client-showcase/components/ShowcaseSectionReveal";
import { ShowcaseTestimonialsSection } from "@/client-showcase/components/ShowcaseTestimonialsSection";
import { SplitPrefooterCTA } from "@/client-showcase/components/SplitPrefooterCTA";
import { WhoWeAreDesign } from "@/client-showcase/components/WhoWeAreDesign";
import { WholeBodyFiveCards } from "@/client-showcase/components/WholeBodyFiveCards";

/**
 * Client showcase homepage aligned to the approved ARC mock: two-row header, left-aligned hero on
 * reception photography, who-we-are split, five-column whole-body cards (center card highlighted),
 * path timeline, testimonials, FAQ, split pre-footer CTA, light footer.
 */
export function ClientShowcaseHome() {
  return (
    <div id="showcase-top" className="min-h-[100dvh] bg-white">
      {/* Header must not sit inside `motion.div` — that breaks `position: sticky` for the nav */}
      <ArcDesignHeader />
      <ShowcaseSectionReveal delayIndex={1}>
        <ArcDesignHero imageSrc={editorialHeroImage} />
      </ShowcaseSectionReveal>
      <ShowcaseConcernMarquee />
      <ShowcaseScienceBeautyBand />
      {/* Who we are: inner column reveals (see WhoWeAreRevealGrid) — avoids one fade on a very tall IO target */}
      <WhoWeAreDesign imageSrc={images.whoWeAre} />
      {/* Staggered blur-lift on heading + cards (see WholeBodyFiveCards) */}
      <WholeBodyFiveCards introDelaySec={0.45} />
      <ShowcaseSectionReveal delayIndex={4}>
        <ProcessTimelineDesign />
      </ShowcaseSectionReveal>
      <ShowcaseSectionReveal delayIndex={5}>
        <ShowcaseTestimonialsSection />
      </ShowcaseSectionReveal>
      <ShowcaseSectionReveal delayIndex={6}>
        <ShowcaseFaqSection />
      </ShowcaseSectionReveal>
      <ShowcaseSectionReveal delayIndex={7}>
        <SplitPrefooterCTA imageSrc={images.membershipCohortHero} />
      </ShowcaseSectionReveal>
      <ShowcaseSectionReveal delayIndex={8}>
        <ArcDesignFooter />
      </ShowcaseSectionReveal>
    </div>
  );
}
