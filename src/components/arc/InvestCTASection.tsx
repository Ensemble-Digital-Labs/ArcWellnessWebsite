"use client";

import type { CSSProperties } from "react";

import {
  InvestCTAActions,
  InvestCTABackdrop,
  InvestCTAHeadline,
  investSectionShellClass,
} from "@/components/arc/investCtaShared";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { usePathPinScrubProgress } from "@/lib/arcPinReveal";

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
}: {
  imageSrc: string;
  supportingLine?: string;
  pin: boolean;
  investTopBarOpacity: number;
}) {
  return (
    <>
      <InvestCTABackdrop
        imageSrc={imageSrc}
        showTopBlend={pin}
        topBlendOpacity={investTopBarOpacity}
      />
      <div
        {...(pin ? { "data-scroll-section": true } : {})}
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
  const { p, setPinProgress } = usePathPinScrubProgress();
  const investTopBarOpacity = Math.max(0, 1 - Math.min(1, p / INVEST_PIN_TOP_BLEND_END));

  const content = (
    <InvestCTAContent
      imageSrc={imageSrc}
      supportingLine={supportingLine}
      pin={pin}
      investTopBarOpacity={pin ? investTopBarOpacity : 1}
    />
  );

  if (!pin) {
    return (
      <section id="book" className={investSectionShellClass}>
        {content}
      </section>
    );
  }

  return (
    <PinnedSection
      id="book"
      pinDistanceMultiplier={0.5}
      onProgress={setPinProgress}
      className={investSectionShellClass}
    >
      {content}
    </PinnedSection>
  );
}
