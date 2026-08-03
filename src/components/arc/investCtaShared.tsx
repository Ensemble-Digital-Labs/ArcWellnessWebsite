import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { siteMeta } from "@/content/siteMeta";
import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
import { heroPrimaryCtaClass } from "@/lib/heroCtaStyles";
import { cn } from "@/lib/utils";

export type InvestCTASignoff = {
  preamble: string;
  name: string;
};

export const investSectionShellClass = cn(
  "relative isolate scroll-mt-28 overflow-hidden",
  "flex min-h-[100dvh] min-h-[100svh] items-center justify-center",
  "px-0 py-8",
  "pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5rem,env(safe-area-inset-top))]",
  "sm:py-14",
  "xl:min-h-[min(100dvh,56rem)] xl:py-16",
  // Ultra-wide (16:9 monitors): let the band grow taller so object-cover crops
  // far less of the 16:9 wall image top/bottom. `min(100dvh,…)` keeps shorter
  // wide monitors capped at their own viewport height.
  "2xl:min-h-[min(100dvh,76rem)]",
);

/**
 * Mobile/tablet copy stack — no dark card.
 * Legibility comes from `InvestCTABackdrop` veil + cream text shadows.
 * Nudge below true center so the group clears the sticky logo/menu band.
 */
export const investMobileStackClass = cn(
  "w-full max-w-lg",
  "md:max-w-xl lg:max-w-2xl",
  "mt-16 translate-y-12 px-1 py-2 sm:mt-20 sm:translate-y-14 sm:px-2",
);

export const investCopyBlockClass = "relative w-full max-w-full";

/** Matches hero reference script lines (`Wellness,` / `Longevity &` / `Aesthetics`). */
/** Large + tight stack on phone; `md+` restores the prior laptop/desktop scale. */
const INVEST_CTA_KEYWORD_LINE_CLASS = cn(
  "block font-title-emphasis font-normal not-italic tracking-tight text-arc-cream",
  "text-[clamp(3.2rem,9.8vw,3.85rem)] leading-[0.82]",
  "md:text-[clamp(2.5rem,7.2vw,6.35rem)] md:leading-[1.02]",
  "[text-shadow:0_2px_22px_rgba(0,0,0,0.58),0_1px_6px_rgba(0,0,0,0.45)]",
);

/** Pull follow-on lines closer on mobile only. */
const INVEST_CTA_KEYWORD_LINE_FOLLOW_CLASS = cn(
  "mt-0 max-md:-mt-1.5",
  "md:mt-0.5",
);

export function InvestCTAHeadline({
  headlineMotion,
  className,
}: {
  headlineMotion?: CSSProperties;
  className?: string;
}) {
  return (
    <h2
      className={cn("relative", className)}
      style={headlineMotion}
    >
      <TitleEmphasis className={INVEST_CTA_KEYWORD_LINE_CLASS}>Invest in You.</TitleEmphasis>
      <TitleEmphasis
        className={cn(INVEST_CTA_KEYWORD_LINE_CLASS, INVEST_CTA_KEYWORD_LINE_FOLLOW_CLASS)}
      >
        Live Fully.
      </TitleEmphasis>
      <TitleEmphasis
        className={cn(INVEST_CTA_KEYWORD_LINE_CLASS, INVEST_CTA_KEYWORD_LINE_FOLLOW_CLASS)}
      >
        Age Intentionally.
      </TitleEmphasis>
    </h2>
  );
}

export function InvestCTAActions({
  motionStyle,
  ctaLabel = "Reserve your Consultation",
  ctaHref = siteMeta.bookingUrl,
  className,
}: {
  motionStyle?: CSSProperties;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 sm:mt-7 xl:mt-8", className)} style={motionStyle}>
      <Link
        href={ctaHref}
        className={cn(heroPrimaryCtaClass, "w-full justify-center sm:w-auto")}
        {...bookingLinkExternalProps(ctaHref)}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export function InvestCTASignoffBlock({
  signoff,
  motionStyle,
  stacked = false,
  centered = false,
}: {
  signoff: InvestCTASignoff;
  motionStyle?: CSSProperties;
  stacked?: boolean;
  centered?: boolean;
}) {
  const alignClass = stacked
    ? centered
      ? "text-center"
      : "text-left"
    : "text-right";

  return (
    <div className={alignClass} style={motionStyle}>
      <p
        className={cn(
          "font-title-emphasis text-arc-cream",
          "[text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_1px_6px_rgba(0,0,0,0.4)]",
          stacked
            ? "text-[clamp(1.55rem,5.8vw,1.95rem)] leading-[1.05]"
            : "text-[clamp(1.65rem,3.2vw,2.65rem)] leading-[1.2]",
        )}
      >
        {signoff.preamble}
      </p>
      <p
        className={cn(
          "font-title-emphasis leading-none text-arc-cream",
          "[text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_1px_6px_rgba(0,0,0,0.4)]",
          stacked
            ? "-mt-0.5 text-[clamp(1.7rem,6.2vw,2.15rem)]"
            : "mt-1 text-[clamp(1.85rem,3.5vw,2.85rem)]",
        )}
      >
        {signoff.name}
      </p>
    </div>
  );
}

export function InvestCTABackdrop({ imageSrc }: { imageSrc: string }) {
  return (
    <>
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover object-[center_40%] xl:object-center"
        sizes="100vw"
        priority={false}
      />
      {/* Mobile/tablet: soft full-bleed veil (no card) so cream type stays readable. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/48 via-black/32 to-black/55 xl:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,transparent_72%)] xl:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-black/22 via-black/5 to-black/22 xl:block"
      />
    </>
  );
}
