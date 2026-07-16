import { ArcServicesShowcaseSlider } from "@/components/arc/ArcServicesShowcaseSlider";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";
import { ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS } from "@/lib/arc-layout";

type WholeBodySectionProps = {
  /** Soft cream feather from founder portrait into the slider. */
  topSeam?: boolean;
  /**
   * Kept for API compatibility. Bottom cream exit is handled by Your Path `topSeam`
   * so the category bar is never clipped by an overlay.
   */
  bottomSeam?: boolean;
};

/**
 * Whole-body services showcase — ~100dvh photography stage + in-flow category bar
 * (section may be taller than one viewport so the bar stays fully visible).
 */
export function WholeBodySection({ topSeam = false, bottomSeam: _bottomSeam = false }: WholeBodySectionProps) {
  return (
    <section
      id="services"
      className="relative w-full overflow-x-clip bg-arc-cream"
    >
      <div className="relative w-full">
        {topSeam ? (
          <ArcSectionSeamBlend
            edge="top"
            tone="cream"
            variant="soft"
            scope="background"
            className={ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS}
          />
        ) : null}
        <ArcServicesShowcaseSlider
          slides={SERVICES_SHOWCASE_SLIDES}
          className="w-full max-w-none"
        />
      </div>
    </section>
  );
}
