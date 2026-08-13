"use client";

import dynamic from "next/dynamic";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcLazyOnView } from "@/components/arc/ArcLazyOnView";
import { SERVICES_SHOWCASE_SLIDES } from "@/content/servicesShowcaseSlides";
import { ARC_HOME_WHOLE_BODY_TOP_SEAM_SOFT_CLASS } from "@/lib/arc-layout";

const ArcServicesShowcaseSlider = dynamic(
  () =>
    import("@/components/arc/ArcServicesShowcaseSlider").then((m) => ({
      default: m.ArcServicesShowcaseSlider,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100dvh] w-full bg-arc-cream" aria-hidden />
    ),
  },
);

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
 * Three.js slider mounts only when near viewport so homepage unused-JS / LCP
 * are not taxed by WebGL on first paint.
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
        <ArcLazyOnView placeholderClassName="min-h-[100dvh] w-full bg-arc-cream">
          <ArcServicesShowcaseSlider
            slides={SERVICES_SHOWCASE_SLIDES}
            className="w-full max-w-none"
          />
        </ArcLazyOnView>
      </div>
    </section>
  );
}
