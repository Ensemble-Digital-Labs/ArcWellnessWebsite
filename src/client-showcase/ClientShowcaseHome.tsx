import { images } from "@/content/site";
import { editorialHeroImage } from "@/client-showcase/mock-page-content";
import { ArcDesignFooter } from "@/client-showcase/components/ArcDesignFooter";
import { ArcDesignHeader } from "@/client-showcase/components/ArcDesignHeader";
import { ArcDesignHero } from "@/client-showcase/components/ArcDesignHero";
import { PatientsAndShopBands } from "@/client-showcase/components/PatientsAndShopBands";
import { ProcessTimelineDesign } from "@/client-showcase/components/ProcessTimelineDesign";
import { SplitPrefooterCTA } from "@/client-showcase/components/SplitPrefooterCTA";
import { WhoWeAreDesign } from "@/client-showcase/components/WhoWeAreDesign";
import { WholeBodyFiveCards } from "@/client-showcase/components/WholeBodyFiveCards";

/**
 * Client showcase homepage aligned to the approved ARC mock: two-row header, left-aligned hero on
 * reception photography, who-we-are split, five-column whole-body cards (center card highlighted),
 * horizontal process timeline, patients + shop bands, split pre-footer CTA, light footer.
 */
export function ClientShowcaseHome() {
  return (
    <div id="showcase-top" className="min-h-[100dvh] bg-white">
      <ArcDesignHeader />
      <ArcDesignHero imageSrc={editorialHeroImage} />
      <WhoWeAreDesign imageSrc={images.whoWeAre} />
      <WholeBodyFiveCards />
      <ProcessTimelineDesign />
      <PatientsAndShopBands />
      <SplitPrefooterCTA imageSrc={images.investBanner} />
      <ArcDesignFooter />
    </div>
  );
}
