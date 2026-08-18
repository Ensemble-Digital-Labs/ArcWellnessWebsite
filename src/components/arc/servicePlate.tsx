"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

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

/**
 * Mechanism media (image / video) under the pillars icon row.
 * Mobile: wide near-bleed champagne round frame (small side gutters so corners read).
 */
export const SERVICE_MECHANISM_MEDIA_SHELL_CLASS =
  "relative min-w-0 -mx-4 w-[calc(100%+2rem)] max-w-none sm:-mx-6 sm:w-[calc(100%+3rem)] lg:mx-0 lg:w-full";

export const SERVICE_MECHANISM_MEDIA_FRAME_CLASS =
  "overflow-hidden rounded-[1.35rem] border border-arc-champagne/35 bg-arc-cream/40 p-1 shadow-[0_16px_40px_rgba(44,44,44,0.1)] sm:rounded-[28px] sm:border-arc-champagne/25 sm:p-2 md:p-3.5 md:shadow-[0_28px_80px_rgba(44,44,44,0.14)]";

export const SERVICE_MECHANISM_MEDIA_INNER_CLASS =
  "relative w-full overflow-hidden rounded-[1.05rem] sm:rounded-[18px]";

/** Bunny / iframe video tile — match 16:9 so embeds don’t letterbox inside the frame. */
export const SERVICE_MECHANISM_VIDEO_TILE_CLASS =
  "relative aspect-video w-full overflow-hidden rounded-[1.05rem] border-2 border-arc-champagne bg-arc-charcoal sm:rounded-[18px] sm:border-4";

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

/** Soft overlap between tiled cream-plate repeats (~18% of each tile). */
const TILE_OVERLAP = 0.18;
/** Fallback aspect if the plate hasn’t loaded yet (exion pillars ≈ 1672×941). */
const TILE_FALLBACK_ASPECT = 941 / 1672;

function tileMask(index: number, count: number): string {
  if (count <= 1) return "none";
  if (index === 0) {
    return "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)";
  }
  if (index === count - 1) {
    return "linear-gradient(to bottom, transparent 0%, #000 22%, #000 100%)";
  }
  return "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)";
}

/**
 * Vertically tiles a cream plate at natural aspect, with overlapping soft fades
 * so seams between duplicates blend instead of hard-cutting.
 * Used by `ServiceCreamPlate` (`tileMedia`) and service-page FAQ plates.
 */
export function CreamPlateTiledMedia({ src }: { src: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tileHeight, setTileHeight] = useState(0);
  const [tileCount, setTileCount] = useState(1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let cancelled = false;
    let naturalAspect = TILE_FALLBACK_ASPECT;

    const img = new window.Image();
    img.decoding = "async";

    const layout = () => {
      if (cancelled || !root) return;
      const width = root.clientWidth || window.innerWidth;
      const sectionHeight = root.clientHeight || window.innerHeight;
      const height = Math.max(1, width * naturalAspect);
      const step = height * (1 - TILE_OVERLAP);
      const count = Math.max(1, Math.ceil(sectionHeight / step) + 1);
      setTileHeight(height);
      setTileCount(count);
    };

    img.onload = () => {
      if (cancelled) return;
      if (img.naturalWidth > 0) {
        naturalAspect = img.naturalHeight / img.naturalWidth;
      }
      layout();
    };
    img.onerror = () => {
      if (!cancelled) layout();
    };
    img.src = src;

    const ro = new ResizeObserver(() => layout());
    ro.observe(root);
    layout();

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [src]);

  const step = tileHeight * (1 - TILE_OVERLAP);

  return (
    <div ref={rootRef} className="absolute inset-0">
      {tileHeight > 0
        ? Array.from({ length: tileCount }, (_, index) => {
            const mask = tileMask(index, tileCount);
            return (
              <div
                key={index}
                className="absolute inset-x-0"
                style={{
                  top: index * step,
                  height: tileHeight,
                  backgroundImage: `url("${src}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% auto",
                  backgroundPosition: "center top",
                  maskImage: mask,
                  WebkitMaskImage: mask,
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
            );
          })
        : null}
    </div>
  );
}

export function ServiceCreamPlate({
  src,
  maskBottom = true,
  stableMedia = false,
  tileMedia = false,
}: {
  src: string;
  maskBottom?: boolean;
  /** Tall pinned plate for very long acts (FAQ) so the art does not stretch. */
  stableMedia?: boolean;
  /**
   * Repeat the plate vertically at natural aspect with soft crossfades between
   * tiles (Arc 360 “Every pathway” and other very long cream acts).
   */
  tileMedia?: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
      style={maskBottom ? serviceAboveCrestBottomMaskStyle : undefined}
      aria-hidden
    >
      {tileMedia ? (
        <CreamPlateTiledMedia src={src} />
      ) : stableMedia ? (
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
  iconClassName,
  plate = false,
}: {
  src: string;
  className?: string;
  /** Applied to the SVG only (e.g. scale) — does not resize a cream plate. */
  iconClassName?: string;
  /** Cream-section white disk + gold rim. Omit on dark plates. */
  plate?: boolean;
}) {
  const image = (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={128}
      height={128}
      unoptimized
      className={cn(
        "select-none object-contain",
        plate ? "relative h-full w-full" : className,
        iconClassName,
      )}
    />
  );

  if (!plate) return image;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-visible",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-[6%] rounded-full bg-[#FCFBFB] shadow-[0_0_0_1.5px_#C9A05A]"
      />
      {image}
    </span>
  );
}
