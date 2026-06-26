"use client";

import type { CSSProperties } from "react";
import { useEffect } from "react";

import {
  InvestCTAActions,
  InvestCTABackdrop,
  InvestCTAHeadline,
  investSectionShellClass,
} from "@/components/arc/investCtaShared";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { useArcDesktopPinScrub } from "@/lib/useArcDesktopPinScrub";

type InvestCTASectionProps = {
  imageSrc: string;
  /** One supporting line under the headline (concentrated CTA band). */
  supportingLine?: string;
  /** Full-screen pin scrub — off for short hub pages that reflow (insights filters). */
  pin?: boolean;
};

/** Pin scrub — fade frosted top strip by this fraction of `p` (matches founder opening phase). */
const INVEST_PIN_TOP_BLEND_END = 0.3;

const staticMotion = { opacity: 1, transform: "none" } satisfies CSSProperties;

function InvestCTAContent({
  imageSrc,
  supportingLine,
  pin,
  investTopBarOpacity,
  scrollReveal,
}: {
  imageSrc: string;
  supportingLine?: string;
  pin: boolean;
  investTopBarOpacity: number;
  scrollReveal: boolean;
}) {
  return (
    <>
      <InvestCTABackdrop
        imageSrc={imageSrc}
        showTopBlend={pin}
        topBlendOpacity={investTopBarOpacity}
      />
      <div
        {...(scrollReveal ? { "data-scroll-section": true } : {})}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <InvestCTAHeadline
          supportingLine={supportingLine}
          headlineMotion={staticMotion}
          supportingMotion={staticMotion}
        />
        <InvestCTAActions motionStyle={staticMotion} />
      </div>
    </>
  );
}

export function InvestCTASection({
  imageSrc,
  supportingLine,
  pin = true,
}: InvestCTASectionProps) {
  const desktopPinScrub = useArcDesktopPinScrub();
  const pinEnabled = pin && desktopPinScrub;
  const { p, setPinProgress } = usePathPinScrubProgress();
  const investTopBarOpacity = pinEnabled
    ? Math.max(0, 1 - Math.min(1, p / INVEST_PIN_TOP_BLEND_END))
    : 1;

  useEffect(() => {
    if (!pinEnabled) setPinProgress(1);
  }, [pinEnabled, setPinProgress]);

  const content = (
    <InvestCTAContent
      imageSrc={imageSrc}
      supportingLine={supportingLine}
      pin={pinEnabled}
      investTopBarOpacity={investTopBarOpacity}
      scrollReveal={pinEnabled}
    />
  );

  return (
    <PinnedSection
      id="book"
      pinDistanceMultiplier={0.5}
      onProgress={setPinProgress}
      disabled={!pinEnabled}
      className={investSectionShellClass}
    >
      {content}
    </PinnedSection>
  );
}
