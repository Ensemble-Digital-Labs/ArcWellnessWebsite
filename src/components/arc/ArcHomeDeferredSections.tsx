"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  homeInvestSupport,
  homePathIntro,
  homeTestimonials,
} from "@/content/homepage";
import { images } from "@/content/site";
import { ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS } from "@/lib/arc-layout";
import { WholeBodyShowcasePoster } from "@/components/arc/WholeBodyShowcasePoster";

const WholeBodySection = dynamic(
  () =>
    import("@/components/arc/WholeBodySection").then((m) => ({
      default: m.WholeBodySection,
    })),
  {
    ssr: false,
    // Same first-slide photo as the live section — never blank cream on scroll-in.
    loading: () => <WholeBodyShowcasePoster priority />,
  },
);

const YourPathSection = dynamic(
  () =>
    import("@/components/arc/YourPathSection").then((m) => ({
      default: m.YourPathSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[80dvh] w-full bg-arc-cream" aria-hidden />
    ),
  },
);

const ArcTestimonialsSection = dynamic(
  () =>
    import("@/components/arc/ArcTestimonialsSection").then((m) => ({
      default: m.ArcTestimonialsSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[100dvh] w-full bg-arc-cream" aria-hidden />
    ),
  },
);

const InvestCTASection = dynamic(
  () =>
    import("@/components/arc/InvestCTASection").then((m) => ({
      default: m.InvestCTASection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[50dvh] w-full bg-arc-cream" aria-hidden />
    ),
  },
);

/** Below-fold homepage islands — client-only so `dynamic({ ssr: false })` is legal. */
export function ArcHomeDeferredSections() {
  // Warm the whole-body chunk + first photo after first paint so scroll-in
  // doesn’t hitch on a mid-scroll JS download/parse.
  useEffect(() => {
    let cancelled = false;
    const warm = () => {
      if (cancelled) return;
      void import("@/components/arc/WholeBodySection");
    };
    const timeoutId = window.setTimeout(warm, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <WholeBodySection topSeam bottomSeam />
      <YourPathSection intro={homePathIntro} topSeam stepsSeam bottomSeam />
      <ArcTestimonialsSection items={homeTestimonials} topSeam bottomSeam />
      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}
