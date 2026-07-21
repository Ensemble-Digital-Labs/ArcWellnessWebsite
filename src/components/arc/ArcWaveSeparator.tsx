"use client";

import { useId } from "react";

type ArcWaveSeparatorProps = {
  /** CSS color of the section ABOVE the wave (fills the top band). */
  topColor: string;
  /** CSS color of the section BELOW the wave (fills under the wave crest). */
  bottomColor: string;
  /** Animate the layered shine travelling along the crest (reduced-motion safe). */
  shine?: boolean;
  /**
   * Ribbon palette:
   * - `gold` — luminous champagne on dark / photo (default; dark→dark mid crests)
   * - `pearl` — ivory / soft-white body on cream→cream, with the same animated gold sweep inside
   */
  tone?: "gold" | "pearl";
  /** Mirror the wave vertically for the opposite handoff direction. */
  flip?: boolean;
  className?: string;
};

// Ported 1:1 from the demo (arcwelness-service-demo.netlify.app/exion).
// `WAVE` is the crest path; `RIBBON` is the tapered gold band that traces it.
export const ARC_WAVE_CREST_D =
  "M0,64 C360,120 720,0 1080,40 C1260,60 1380,80 1440,72";
/** Fill only the band ABOVE the crest (used when `bottomColor` is transparent). */
export const ARC_WAVE_TOP_FILL_D =
  "M0,0 L1440,0 L1440,72 C1380,80 1260,60 1080,40 C720,0 360,120 0,64 Z";
/** Fill only the band BELOW the crest (objectBoundingBox 0–1). Clip plate under the gold ribbon. */
export const ARC_WAVE_BELOW_CREST_CLIP_BB =
  "M0,0.533333 C0.25,1 0.5,0 0.75,0.333333 C0.875,0.5 0.958333,0.666667 1,0.6 L1,1 L0,1 Z";
/**
 * Fill only ABOVE the crest (objectBoundingBox 0–1) for a wave-height box.
 * For a full-hero clip, map into the bottom band: y' = (1 - f) + y * f (see EXION hero mask).
 */
export const ARC_WAVE_ABOVE_CREST_CLIP_BB =
  "M0,0 L1,0 L1,0.6 C0.958333,0.666667 0.875,0.5 0.75,0.333333 C0.5,0 0.25,1 0,0.533333 Z";
const WAVE = ARC_WAVE_CREST_D;
const WAVE_TOP_FILL = ARC_WAVE_TOP_FILL_D;
const RIBBON =
  "M0,63.7 C360,119.4 720,-0.6 1080,38.2 C1260,57.5 1380,76 1440,69.5 " +
  "L1440,75 C1380,80.5 1260,62.5 1080,44 C720,5.5 360,121.2 0,64.5 Z";

function isTransparentColor(color: string) {
  const c = color.trim().toLowerCase();
  return c === "transparent" || c === "rgba(0,0,0,0)" || c === "rgba(0, 0, 0, 0)";
}

/**
 * Decorative wave seam between "acts". When `shine` is set, a layered
 * ribbon with a travelling light sweep traces the crest (matches the demo).
 * The sweep is disabled under `prefers-reduced-motion` (see globals.css).
 *
 * Pass `bottomColor="transparent"` to let a parent background image show
 * under the crest (top band still fills with `topColor`).
 *
 * Use `tone="pearl"` between cream plates so the crest reads on light grounds;
 * keep default `gold` on dark acts and photo handoffs.
 */
export function ArcWaveSeparator({
  topColor,
  bottomColor,
  shine = false,
  tone = "gold",
  flip = false,
  className,
}: ArcWaveSeparatorProps) {
  const uid = useId().replace(/:/g, "");
  const fillId = `curve-fill-${uid}`;
  const glowId = `curve-glow-${uid}`;
  const softId = `curve-soft-${uid}`;
  const seeThroughBottom = isTransparentColor(bottomColor);
  const pearl = tone === "pearl";

  return (
    <div
      className={className}
      style={{
        background: seeThroughBottom ? "transparent" : topColor,
        transform: flip ? "scaleY(-1)" : undefined,
        lineHeight: 0,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full overflow-visible sm:h-[90px] lg:h-[120px]"
        aria-hidden="true"
      >
        {shine ? (
          <defs>
            {pearl ? (
              <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="8%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="28%" stopColor="#f7f3eb" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="72%" stopColor="#ebe4d6" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e5d9c4" stopOpacity="0.7" />
              </linearGradient>
            ) : (
              <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c19a5b" stopOpacity="0" />
                <stop offset="6%" stopColor="#c19a5b" stopOpacity="0.45" />
                <stop offset="28%" stopColor="#d9b878" stopOpacity="0.9" />
                <stop offset="52%" stopColor="#f0d9a0" stopOpacity="1" />
                <stop offset="78%" stopColor="#c19a5b" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#a87d3f" stopOpacity="0.75" />
              </linearGradient>
            )}
            <filter
              id={glowId}
              x="-4%"
              y="-140%"
              width="108%"
              height="380%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={pearl ? "1.6" : "1.2"} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id={softId}
              x="-5%"
              y="-160%"
              width="110%"
              height="420%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={pearl ? "2.8" : "2.2"} />
            </filter>
          </defs>
        ) : null}

        {seeThroughBottom ? (
          <path d={WAVE_TOP_FILL} fill={topColor} />
        ) : (
          <path d={`${WAVE} L1440,120 L0,120 Z`} fill={bottomColor} />
        )}

        {shine ? (
          <g className="curve-shine">
            {/* Soft body — thicker / brighter on pearl so cream→cream still reads */}
            <path
              d={RIBBON}
              fill={`url(#${fillId})`}
              opacity={pearl ? 0.55 : 0.4}
              filter={`url(#${softId})`}
            />
            <path d={RIBBON} fill={`url(#${fillId})`} filter={`url(#${glowId})`} />
            {pearl ? (
              <>
                {/* Soft pearl edge — keep thinner so gold core can read */}
                <path
                  d={WAVE}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                {/* Always-on champagne thread inside the ribbon */}
                <path
                  d={WAVE}
                  fill="none"
                  stroke="#c19a5b"
                  strokeWidth="0.85"
                  strokeLinecap="round"
                  opacity="0.72"
                />
                <path
                  d={WAVE}
                  fill="none"
                  stroke="#d9b878"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                {/* Animated gold strip — richer than pale gold so it shows on white */}
                <path
                  d={WAVE}
                  fill="none"
                  stroke="#c19a5b"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeDasharray="110 1330"
                  className="curve-shine-sweep"
                  opacity="0.95"
                />
                <path
                  d={WAVE}
                  fill="none"
                  stroke="#f0d9a0"
                  strokeWidth="1.05"
                  strokeLinecap="round"
                  strokeDasharray="70 1370"
                  className="curve-shine-sweep"
                />
              </>
            ) : (
              <>
                <path
                  d={WAVE}
                  fill="none"
                  stroke={`url(#${fillId})`}
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <path
                  d={WAVE}
                  fill="none"
                  stroke={`url(#${fillId})`}
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                <path
                  d={WAVE}
                  fill="none"
                  stroke="#fff8e7"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeDasharray="70 1370"
                  className="curve-shine-sweep"
                />
              </>
            )}
          </g>
        ) : null}
      </svg>
    </div>
  );
}
