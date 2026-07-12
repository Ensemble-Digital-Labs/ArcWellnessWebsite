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
);

/** Readable panel on phone/tablet, cream type on mint wall needs a surface. */
export const investMobilePanelClass = cn(
  "w-full max-w-lg rounded-2xl",
  "bg-arc-charcoal/78 px-6 py-7",
  "sm:px-8 sm:py-9",
);

export const investCopyBlockClass = "relative w-full max-w-full";

/** Matches hero reference script lines (`Wellness,` / `Longevity &` / `Aesthetics`). */
const INVEST_CTA_KEYWORD_LINE_CLASS = cn(
  "block font-title-emphasis text-[clamp(2.15rem,6.8vw,5.85rem)] font-normal not-italic leading-[1.02] tracking-tight text-arc-cream md:text-[clamp(2.5rem,7.2vw,6.35rem)]",
  "[text-shadow:0_1px_8px_rgba(0,0,0,0.32)]",
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
      <TitleEmphasis className={cn(INVEST_CTA_KEYWORD_LINE_CLASS, "mt-0.5")}>
        Live Fully.
      </TitleEmphasis>
      <TitleEmphasis className={cn(INVEST_CTA_KEYWORD_LINE_CLASS, "mt-0.5")}>
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
  return (
    <div
      className={cn(
        stacked ? (centered ? "text-center" : "text-left") : "text-right",
      )}
      style={motionStyle}
    >
      <p
        className={cn(
          "font-title-emphasis leading-[1.2] text-arc-cream",
          "[text-shadow:0_2px_20px_rgba(0,0,0,0.4)]",
          stacked
            ? "text-[clamp(1.25rem,4.8vw,1.55rem)]"
            : "whitespace-nowrap text-[clamp(1.5rem,3.2vw,2.65rem)]",
        )}
      >
        {signoff.preamble}
      </p>
      <p
        className={cn(
          "mt-1 font-title-emphasis leading-none text-arc-cream",
          stacked
            ? "text-[clamp(1.4rem,5.2vw,1.7rem)]"
            : "text-[clamp(1.7rem,3.5vw,2.85rem)]",
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
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/35 xl:hidden"
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-black/22 via-black/5 to-black/22 xl:block"
      />
    </>
  );
}
