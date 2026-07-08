import { ArcServicesShowcaseSlider } from "@/components/arc/ArcServicesShowcaseSlider";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";
import { ARC_HOME_WHOLE_BODY_BOTTOM_SEAM_SOFT_CLASS, ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS } from "@/lib/arc-layout";

type WholeBodySectionProps = {
  /** Soft cream feather from founder portrait into the slider. */
  topSeam?: boolean;
  /** Soft cream exit into the path intro band. */
  bottomSeam?: boolean;
};

/**
 * Whole-body services showcase — full-viewport slider band (scrolls with the page, not pinned).
 */
export function WholeBodySection({ topSeam = false, bottomSeam = false }: WholeBodySectionProps) {
  return (
    <section
      id="services"
      className="relative w-full overflow-x-clip bg-arc-cream"
    >
      <div className="relative h-[100dvh] min-h-[320px] w-full overflow-hidden">
        {topSeam ? (
          <ArcSectionSeamBlend
            edge="top"
            tone="cream"
            variant="soft"
            scope="background"
            className={ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS}
          />
        ) : null}
        {bottomSeam ? (
          <ArcSectionSeamBlend
            edge="bottom"
            tone="cream"
            variant="soft"
            scope="background"
            className={ARC_HOME_WHOLE_BODY_BOTTOM_SEAM_SOFT_CLASS}
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
