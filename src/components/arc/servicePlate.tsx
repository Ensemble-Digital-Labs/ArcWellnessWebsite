"use client";

import Image from "next/image";
import { type CSSProperties } from "react";

import {
  ArcWaveSeparator,
  ARC_WAVE_TOP_FILL_D,
} from "@/components/arc/ArcWaveSeparator";
import { cn } from "@/lib/utils";

/**
 * Plate + wave physics shared by every EXION-template service act
 * (see `.cursor/rules/service-section-plates.mdc`).
 *
 * One plate Image per section; each act pulls up by the wave height so the
 * crest of the previous act overlaps it, and masks its own bottom edge to the
 * wave path so the plate never squares off above the crest.
 */

export const SERVICE_DARK_ACT =
  "color-mix(in srgb, var(--arc-charcoal) 82%, #000000)";

export const SERVICE_WAVE_H_CLASS = "h-[60px] sm:h-[90px] lg:h-[120px]";
export const SERVICE_WAVE_MT_CLASS =
  "-mt-[60px] sm:-mt-[90px] lg:-mt-[120px]";
export const SERVICE_WAVE_H_VAR_CLASS =
  "[--service-wave-h:60px] sm:[--service-wave-h:90px] lg:[--service-wave-h:120px]";

const ABOVE_CREST_BOTTOM_MASK = [
  `linear-gradient(#fff 0%, #fff calc(100% - var(--service-wave-h)), transparent calc(100% - var(--service-wave-h)))`,
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#fff" d="${ARC_WAVE_TOP_FILL_D}"/></svg>`,
  )}")`,
].join(", ");

export const serviceAboveCrestBottomMaskStyle: CSSProperties = {
  maskImage: ABOVE_CREST_BOTTOM_MASK,
  WebkitMaskImage: ABOVE_CREST_BOTTOM_MASK,
  maskSize: "100% 100%, 100% var(--service-wave-h)",
  WebkitMaskSize: "100% 100%, 100% var(--service-wave-h)",
  maskPosition: "0 0, 0 100%",
  WebkitMaskPosition: "0 0, 0 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

const PLATE_OBJECT_CLASS = "object-cover object-[center_30%]";

export function ServiceCreamPlate({
  src,
  maskBottom = true,
  stableMedia = false,
}: {
  src: string;
  maskBottom?: boolean;
  /** Tall pinned plate for very long acts (FAQ) so the art does not stretch. */
  stableMedia?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
      style={maskBottom ? serviceAboveCrestBottomMaskStyle : undefined}
      aria-hidden
    >
      {stableMedia ? (
        <div className="absolute inset-x-0 top-0 h-[min(280dvh,160rem)] w-full">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover object-top"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-arc-cream sm:h-40"
            aria-hidden
          />
        </div>
      ) : (
        <div className="absolute inset-0">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className={PLATE_OBJECT_CLASS}
          />
        </div>
      )}
    </div>
  );
}

export function ServiceDarkPlate({
  src,
  maskBottom = true,
}: {
  src: string;
  maskBottom?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={
        maskBottom
          ? {
              backgroundColor: SERVICE_DARK_ACT,
              ...serviceAboveCrestBottomMaskStyle,
            }
          : { backgroundColor: SERVICE_DARK_ACT }
      }
      aria-hidden
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

/** Crest closing an act. `tone="pearl"` on cream, default gold on dark. */
export function ServiceWave({
  tone,
  className,
}: {
  tone?: "pearl";
  className?: string;
}) {
  return (
    <div className={cn("relative z-30", SERVICE_WAVE_H_CLASS, className)}>
      <ArcWaveSeparator
        topColor="transparent"
        bottomColor="transparent"
        shine
        tone={tone}
      />
    </div>
  );
}

/** Clears the incoming crest so act content never sits under the overlap. */
export function ServiceWaveInset() {
  return (
    <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />
  );
}

export function ServiceGoldRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-px w-16 bg-gradient-to-r from-transparent via-arc-champagne to-transparent",
        className,
      )}
    />
  );
}

export function ServiceEmblemIcon({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={128}
      height={128}
      unoptimized
      className={cn("select-none object-contain", className)}
    />
  );
}
