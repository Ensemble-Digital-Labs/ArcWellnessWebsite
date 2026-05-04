import { ArcServicesShowcaseSlider } from "@/components/arc/ArcServicesShowcaseSlider";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";

export function WholeBodySection() {
  return (
    <PinnedSection
      id="services"
      className="w-full overflow-hidden bg-arc-charcoal py-0"
    >
      <ArcServicesShowcaseSlider
        slides={SERVICES_SHOWCASE_SLIDES}
        className="w-full max-w-none"
      />
    </PinnedSection>
  );
}
