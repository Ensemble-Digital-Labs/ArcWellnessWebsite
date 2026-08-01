"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";

import {
  InvestCTAActions,
  InvestCTABackdrop,
  InvestCTAHeadline,
  InvestCTASignoffBlock,
  investCopyBlockClass,
  investMobileStackClass,
  type InvestCTASignoff,
  investSectionShellClass,
} from "@/components/arc/investCtaShared";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
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
  topSeam = false,
  topSeamClassName,
}: {
  imageSrc: string;
  supportingLine?: string;
  signoff: InvestCTASignoff;
  ctaLabel: string;
  ctaHref: string;
  topSeam?: boolean;
  topSeamClassName?: string;
}) {
  return (
    <>
      <InvestCTABackdrop imageSrc={imageSrc} />
      {topSeam ? (
        topSeamClassName ? (
          <div aria-hidden className={topSeamClassName} />
        ) : (
          <ArcSectionSeamBlend
            edge="top"
            tone="cream"
            variant="soft"
            scope="background"
          />
        )
      ) : null}
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[90rem] justify-center",
          "px-5 sm:px-8 xl:px-14",
          "xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,0.34fr)_minmax(0,1fr)] xl:items-center xl:justify-normal xl:gap-8",
        )}
      >
        <div className={cn(investMobileStackClass, "text-center xl:hidden")}>
          <ArcTextReveal variant="heading">
            <InvestCTAHeadline
              headlineMotion={staticMotion}
              className="mx-auto text-center"
            />
          </ArcTextReveal>
          {supportingLine ? (
            <ArcTextReveal variant="body" delayIndex={1}>
              <p
                className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55),0_1px_6px_rgba(0,0,0,0.4)] sm:text-[15px]"
                style={staticMotion}
              >
                {supportingLine}
              </p>
            </ArcTextReveal>
          ) : null}
          <ArcTextReveal variant="body" delayIndex={supportingLine ? 2 : 1}>
            <InvestCTAActions
              motionStyle={staticMotion}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              className="flex justify-center"
            />
          </ArcTextReveal>
          <div className="mt-8">
            <ArcTextReveal variant="heading" delayIndex={supportingLine ? 3 : 2}>
              <InvestCTASignoffBlock
                signoff={signoff}
                motionStyle={staticMotion}
                stacked
                centered
              />
            </ArcTextReveal>
          </div>
        </div>

        <div className={cn(investCopyBlockClass, "hidden max-w-xl xl:col-start-1 xl:block")}>
          <ArcTextReveal variant="heading">
            <InvestCTAHeadline headlineMotion={staticMotion} />
          </ArcTextReveal>
          {supportingLine ? (
            <ArcTextReveal variant="body" delayIndex={1}>
              <p
                className="mt-5 max-w-md font-sans text-[15px] leading-relaxed text-white/92 [text-shadow:0_1px_16px_rgba(0,0,0,0.38)]"
                style={staticMotion}
              >
                {supportingLine}
              </p>
            </ArcTextReveal>
          ) : null}
          <ArcTextReveal variant="body" delayIndex={supportingLine ? 2 : 1}>
            <InvestCTAActions
              motionStyle={staticMotion}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
            />
          </ArcTextReveal>
        </div>

        <div aria-hidden className="hidden xl:block xl:col-start-2" />

        <div className="hidden xl:col-start-3 xl:flex xl:items-end xl:justify-end">
          <div className={cn(investCopyBlockClass, "max-w-sm")}>
            <ArcTextReveal variant="heading">
              <InvestCTASignoffBlock signoff={signoff} motionStyle={staticMotion} />
            </ArcTextReveal>
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
