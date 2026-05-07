"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { arcGlassCtaClass } from "@/lib/arcGlassCta";
import { pathPinFadeUp, usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { cn } from "@/lib/utils";

type InvestCTASectionProps = {
  imageSrc: string;
  /** One supporting line under the headline (concentrated CTA band). */
  supportingLine?: string;
};

/** Luminous rose-gold on dark photography (does not use cream-surface ink). */
const investHeadlineEmphasisClass = cn(
  "font-title-emphasis tracking-tight not-italic text-arc-rose-gold",
  "text-[1.62em] sm:text-[1.7em] md:text-[1.78em] lg:text-[1.86em] xl:text-[1.92em]",
  "[text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_40px_var(--arc-rose-gold-glow),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]",
);

/** Glass pill — sentence case + sans to match invest reference beside hero glass system */
const investReserveGlassClass = cn(
  arcGlassCtaClass,
  "font-sans text-sm font-medium normal-case tracking-normal sm:text-[0.9375rem]",
);

/** Solid terracotta accent pill — pairs with glass CTA in reference */
/**
 * Pin scrub — fade frosted top strip by this fraction of `p` (matches founder “opening phase” length).
 */
const INVEST_PIN_TOP_BLEND_END = 0.3;

/** Same gradient / blur / mask as `ArcFounderIntroSection` top blend (dark photo + charcoal grade). */
const investPinnedTopBlendLayerClass = cn(
  "pointer-events-none absolute inset-x-0 top-0 z-[8] h-[min(28vh,11rem)]",
  /* Neutral charcoal frost — matches founder strip; no teal/green */
  "bg-gradient-to-b from-arc-charcoal/[0.48] via-arc-charcoal/[0.2] to-transparent",
  "backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-xl",
  "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]",
  "mask-image-[linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]",
);

const investMemberSolidClass = cn(
  "inline-flex items-center justify-center gap-2 rounded-full",
  "border border-white/20 bg-[#bc6c5c] px-6 py-3",
  "font-sans text-sm font-medium text-white sm:text-[0.9375rem]",
  "shadow-[0_8px_28px_rgba(0,0,0,0.22)]",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:border-white/30 hover:bg-[#a85d52] hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/45",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

export function InvestCTASection({ imageSrc, supportingLine }: InvestCTASectionProps) {
  const { p, setPinProgress } = usePathPinScrubProgress();
  const headlineMotion = pathPinFadeUp(p, 0.08, 2.35);
  const supportingMotion = pathPinFadeUp(p, 0.16, 2.05);
  const ctaMotion = pathPinFadeUp(p, 0.26, 2.2);

  const investTopBarOpacity = Math.max(0, 1 - Math.min(1, p / INVEST_PIN_TOP_BLEND_END));

  return (
    <PinnedSection
      id="book"
      pinDistanceMultiplier={0.5}
      onProgress={setPinProgress}
      className="relative flex min-h-[100dvh] scroll-mt-28 items-center justify-center"
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-arc-charcoal/45" />
      <motion.div
        aria-hidden
        style={{ opacity: investTopBarOpacity }}
        className={investPinnedTopBlendLayerClass}
      />
      <div data-scroll-section className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2
          className={cn(
            "font-serif text-3xl font-semibold leading-snug text-[#f7f4ef] drop-shadow md:text-4xl lg:text-5xl",
            supportingLine ? "mb-6 md:mb-7" : "mb-10 md:mb-12",
          )}
          style={headlineMotion}
        >
          Invest in{" "}
          <TitleEmphasis className={investHeadlineEmphasisClass}>You</TitleEmphasis>.{" "}
          <TitleEmphasis className={investHeadlineEmphasisClass}>Live</TitleEmphasis>{" "}
          Fully.{" "}
          <TitleEmphasis className={investHeadlineEmphasisClass}>Age</TitleEmphasis>{" "}
          Intentionally.
        </h2>
        {supportingLine ? (
          <p
            className="mx-auto mb-10 max-w-2xl font-sans text-sm leading-relaxed text-[#f7f4ef]/88 md:mb-12 md:text-base"
            style={supportingMotion}
          >
            {supportingLine}
          </p>
        ) : null}
        <div
          className="mx-auto flex w-full max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          style={ctaMotion}
        >
          <Link href="#book" className={cn(investReserveGlassClass, "w-full sm:w-auto")}>
            Reserve a call
          </Link>
          <Link href="#book" className={cn(investMemberSolidClass, "w-full sm:w-auto")}>
            <span>Become a member</span>
            <span aria-hidden className="text-base leading-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </PinnedSection>
  );
}
