"use client";

import { useId } from "react";

type ArcWaveSeparatorProps = {
  /** CSS color of the section ABOVE the wave (fills the top band). */
  topColor: string;
  /** CSS color of the section BELOW the wave (fills under the wave crest). */
  bottomColor: string;
  /** Animate the layered gold shine travelling along the crest (reduced-motion safe). */
  shine?: boolean;
  /** Mirror the wave vertically for the opposite handoff direction. */
  flip?: boolean;
  className?: string;
};

// Ported 1:1 from the demo (arcwelness-service-demo.netlify.app/exion).
// `WAVE` is the crest path; `RIBBON` is the tapered gold band that traces it.
const WAVE = "M0,64 C360,120 720,0 1080,40 C1260,60 1380,80 1440,72";
const RIBBON =
  "M0,63.7 C360,119.4 720,-0.6 1080,38.2 C1260,57.5 1380,76 1440,69.5 " +
  "L1440,75 C1380,80.5 1260,62.5 1080,44 C720,5.5 360,121.2 0,64.5 Z";

/**
 * Decorative wave seam between "acts". When `shine` is set, a layered gold
 * ribbon with a travelling light sweep traces the crest (matches the demo).
 * The sweep is disabled under `prefers-reduced-motion` (see globals.css).
 */
export function ArcWaveSeparator({
  topColor,
  bottomColor,
  shine = false,
  flip = false,
  className,
}: ArcWaveSeparatorProps) {
  const uid = useId().replace(/:/g, "");
  const fillId = `curve-fill-${uid}`;
  const glowId = `curve-glow-${uid}`;
  const softId = `curve-soft-${uid}`;

  return (
    <div
      className={className}
      style={{
        background: topColor,
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
            <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c19a5b" stopOpacity="0" />
              <stop offset="6%" stopColor="#c19a5b" stopOpacity="0.45" />
              <stop offset="28%" stopColor="#d9b878" stopOpacity="0.9" />
              <stop offset="52%" stopColor="#f0d9a0" stopOpacity="1" />
              <stop offset="78%" stopColor="#c19a5b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a87d3f" stopOpacity="0.75" />
            </linearGradient>
            <filter
              id={glowId}
              x="-4%"
              y="-140%"
              width="108%"
              height="380%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="1.2" result="blur" />
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
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>
        ) : null}

        <path d={`${WAVE} L1440,120 L0,120 Z`} fill={bottomColor} />

        {shine ? (
          <g className="curve-shine">
            <path d={RIBBON} fill={`url(#${fillId})`} opacity="0.4" filter={`url(#${softId})`} />
            <path d={RIBBON} fill={`url(#${fillId})`} filter={`url(#${glowId})`} />
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
          </g>
        ) : null}
      </svg>
    </div>
  );
}
