"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";

import {
  InvestCTAActions,
  InvestCTABackdrop,
  InvestCTAHeadline,
  InvestCTASignoffBlock,
  investCopyBlockClass,
  investMobilePanelClass,
  type InvestCTASignoff,
  investSectionShellClass,
} from "@/components/arc/investCtaShared";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { homeInvestCtaLabel, homeInvestSignoff } from "@/content/homepage";
import { siteMeta } from "@/content/siteMeta";
import { usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { useArcDesktopPinScrub } from "@/lib/useArcDesktopPinScrub";
import { ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";

type InvestCTASectionProps = {
  imageSrc: string;
  supportingLine?: string;
  signoff?: InvestCTASignoff;
  ctaLabel?: string;
  ctaHref?: string;
  pin?: boolean;
  /** Soft cream feather from the section above (About founder → invest). */
  topSeam?: boolean;
  /** Override default top blend (Home uses tighter handoff). */
  topSeamClassName?: string;
  /** Pull section up under previous band — off for Home matched pairs. */
  topSeamOverlap?: boolean;
};

const staticMotion = { opacity: 1, transform: "none" } satisfies CSSProperties;

function InvestCTAContent({
  imageSrc,
  supportingLine,
  signoff,
  ctaLabel,
  ctaHref,
  scrollReveal,
  topSeam = false,
  topSeamClassName,
}: {
  imageSrc: string;
  supportingLine?: string;
  signoff: InvestCTASignoff;
  ctaLabel: string;
  ctaHref: string;
  scrollReveal: boolean;
  topSeam?: boolean;
  topSeamClassName?: string;
}) {
  return (
    <>
      <InvestCTABackdrop imageSrc={imageSrc} />
      {topSeam ? (
        <ArcSectionSeamBlend
          edge="top"
          tone="cream"
          variant="soft"
          scope="background"
          className={topSeamClassName}
        />
      ) : null}
      <div
        {...(scrollReveal ? { "data-scroll-section": true } : {})}
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[90rem] justify-center",
          "px-5 sm:px-8 xl:px-14",
          "xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,0.34fr)_minmax(0,1fr)] xl:items-center xl:justify-normal xl:gap-8",
        )}
      >
        <div className={cn(investMobilePanelClass, "text-center xl:hidden")}>
          <InvestCTAHeadline
            headlineMotion={staticMotion}
            className="mx-auto text-center"
          />
          {supportingLine ? (
            <p
              className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-white/92 [text-shadow:0_1px_16px_rgba(0,0,0,0.38)] sm:text-[15px]"
              style={staticMotion}
            >
              {supportingLine}
            </p>
          ) : null}
          <InvestCTAActions
            motionStyle={staticMotion}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
            className="flex justify-center"
          />
          <div className="mt-8">
            <InvestCTASignoffBlock
              signoff={signoff}
              motionStyle={staticMotion}
              stacked
              centered
            />
          </div>
        </div>

        <div className={cn(investCopyBlockClass, "hidden max-w-xl xl:col-start-1 xl:block")}>
          <InvestCTAHeadline headlineMotion={staticMotion} />
          {supportingLine ? (
            <p
              className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/92 [text-shadow:0_1px_16px_rgba(0,0,0,0.38)]"
              style={staticMotion}
            >
              {supportingLine}
            </p>
          ) : null}
          <InvestCTAActions
            motionStyle={staticMotion}
            ctaLabel={ctaLabel}
            ctaHref={ctaHref}
          />
        </div>

        <div aria-hidden className="hidden xl:block xl:col-start-2" />

        <div className="hidden xl:col-start-3 xl:flex xl:items-end xl:justify-end">
          <div className={cn(investCopyBlockClass, "max-w-sm")}>
            <InvestCTASignoffBlock signoff={signoff} motionStyle={staticMotion} />
          </div>
        </div>
      </div>
    </>
  );
}

export function InvestCTASection({
  imageSrc,
  supportingLine,
  signoff = homeInvestSignoff,
  ctaLabel = homeInvestCtaLabel,
  ctaHref = siteMeta.bookingUrl,
  pin = false,
  topSeam = false,
  topSeamClassName,
  topSeamOverlap = true,
}: InvestCTASectionProps) {
  const desktopPinScrub = useArcDesktopPinScrub();
  const pinEnabled = pin && desktopPinScrub;
  const { setPinProgress } = usePathPinScrubProgress();

  useEffect(() => {
    if (!pinEnabled) setPinProgress(1);
  }, [pinEnabled, setPinProgress]);

  const content = (
    <InvestCTAContent
      imageSrc={imageSrc}
      supportingLine={supportingLine}
      signoff={signoff}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      scrollReveal={pinEnabled}
      topSeam={topSeam}
      topSeamClassName={topSeamClassName}
    />
  );

  return (
    <PinnedSection
      id="book"
      pinDistanceMultiplier={0.5}
      onProgress={setPinProgress}
      disabled={!pinEnabled}
      className={cn(
        investSectionShellClass,
        topSeam && topSeamOverlap && ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
      )}
    >
      {content}
    </PinnedSection>
  );
}
