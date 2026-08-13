"use client";

import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcServicesShowcaseSlider } from "@/components/arc/ArcServicesShowcaseSlider";
import { WholeBodyShowcasePoster } from "@/components/arc/WholeBodyShowcasePoster";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";
import { ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS } from "@/lib/arc-layout";

type WholeBodySectionProps = {
  /** Soft cream feather from founder portrait into the slider. */
  topSeam?: boolean;
  /**
   * Kept for API compatibility. Bottom cream exit is handled by Your Path `topSeam`.
   */
  bottomSeam?: boolean;
};

/**
 * Whole-body services showcase — one viewport: full-bleed photography with cream
 * category tabs overlaid at the bottom of the same stage.
 *
 * Mount path (intentional):
 * - Homepage defers this section once (`ArcHomeDeferredSections`).
 * - Permanent first-slide poster sits under the slider so decode / WebGL boot
 *   never flash cream.
 * - No nested `ArcLazyOnView` / second `dynamic()` — those caused scroll-in glitches.
 */
export function WholeBodySection({
  topSeam = false,
  bottomSeam: _bottomSeam = false,
}: WholeBodySectionProps) {
  return (
    <section
      id="services"
      className="relative w-full overflow-x-clip bg-arc-cream max-md:pb-px"
    >
      <div className="relative w-full min-h-[100dvh]">
        {topSeam ? (
          <ArcSectionSeamBlend
            edge="top"
            tone="cream"
            variant="soft"
            scope="background"
            className={ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS}
          />
        ) : null}

        {/* Permanent photo base — never unmounts when the slider boots. */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <WholeBodyShowcasePoster className="h-full min-h-[100dvh]" priority />
        </div>

        <div className="relative z-[1]">
          <ArcServicesShowcaseSlider
            slides={SERVICES_SHOWCASE_SLIDES}
            className="w-full max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
