import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  EXION_V2_CREAM_TO_DARK_DRAMATIC,
  EXION_V2_CREAM_TO_DARK_DRAMATIC_LIP,
  EXION_V2_CREAM_TO_DARK_SOFT,
  EXION_V2_CREAM_TO_DARK_SOFT_LIP,
  EXION_V2_CURVE_VIEWBOX,
  EXION_V2_SOFT_CREAM_RIDGE,
  EXION_V2_SOFT_CREAM_RIDGE_LIP,
} from "@/client-showcase/exion-v2/exion-v2-curves";
import { EXION_V2_MOCK } from "@/client-showcase/exion-v2/exion-v2-tokens";

type Tone = "cream" | "dark";

type ExionWaveSeparatorProps = {
  from: Tone;
  to: Tone;
  dramatic?: boolean;
  className?: string;
};

const toneHex = {
  cream: EXION_V2_MOCK.cream,
  dark: EXION_V2_MOCK.dark,
} as const;

function curvePair(from: Tone, to: Tone, dramatic: boolean) {
  if (from === "cream" && to === "dark") {
    return dramatic
      ? { fill: EXION_V2_CREAM_TO_DARK_DRAMATIC, lip: EXION_V2_CREAM_TO_DARK_DRAMATIC_LIP }
      : { fill: EXION_V2_CREAM_TO_DARK_SOFT, lip: EXION_V2_CREAM_TO_DARK_SOFT_LIP };
  }
  if (from === "dark" && to === "cream") {
    return dramatic
      ? { fill: EXION_V2_CREAM_TO_DARK_DRAMATIC, lip: EXION_V2_CREAM_TO_DARK_DRAMATIC_LIP }
      : { fill: EXION_V2_CREAM_TO_DARK_SOFT, lip: EXION_V2_CREAM_TO_DARK_SOFT_LIP };
  }
  return { fill: EXION_V2_SOFT_CREAM_RIDGE, lip: EXION_V2_SOFT_CREAM_RIDGE_LIP };
}

type MaskedCurveProps = {
  bottomColor: string;
  topColor: string;
  fillPath: string;
  lipPath: string;
  heightClass: string;
  glow?: boolean;
  className?: string;
};

/** Pixel-aligned section handoff: solid fill + masked feather lip (mock curved blur). */
function MaskedSectionCurve({
  bottomColor,
  topColor,
  fillPath,
  lipPath,
  heightClass,
  glow = false,
  className,
}: MaskedCurveProps) {
  const uid = useId().replace(/:/g, "");
  const glowFilter = `exion-v2-glow-${uid}`;
  const featherMask = `exion-v2-feather-${uid}`;
  const { width, height } = EXION_V2_CURVE_VIEWBOX;

  return (
    <div
      className={cn("relative -mt-px w-full overflow-hidden", heightClass, className)}
      style={{ backgroundColor: bottomColor }}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <filter id={glowFilter} x="-8%" y="-20%" width="116%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 0.85 0 0 0  0 0 0.65 0 0  0 0 0 0.55 0"
              result="goldBlur"
            />
            <feMerge>
              <feMergeNode in="goldBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id={`${uid}-lip-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={EXION_V2_MOCK.champagne} stopOpacity="0.15" />
            <stop offset="35%" stopColor={EXION_V2_MOCK.champagne} stopOpacity="0.85" />
            <stop offset="65%" stopColor={EXION_V2_MOCK.champagne} stopOpacity="0.75" />
            <stop offset="100%" stopColor={EXION_V2_MOCK.champagne} stopOpacity="0.2" />
          </linearGradient>

          <mask id={featherMask} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <rect width={width} height={height} fill="black" />
            <path d={fillPath} fill="white" />
            <path
              d={lipPath}
              fill="none"
              stroke="white"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.92"
            />
          </mask>
        </defs>

        {/* Bottom tone bleeds through below the curve */}
        <rect width={width} height={height} fill={bottomColor} />

        {/* Top tone — hard edge */}
        <path d={fillPath} fill={topColor} />

        {/* Feathered lip — champagne glow along curve (mock blurred separation) */}
        {glow ? (
          <>
            <path
              d={lipPath}
              fill="none"
              stroke={`url(#${uid}-lip-grad)`}
              strokeWidth="10"
              strokeLinecap="round"
              filter={`url(#${glowFilter})`}
              opacity="0.9"
            />
            <path
              d={lipPath}
              fill="none"
              stroke={EXION_V2_MOCK.champagne}
              strokeWidth="1.25"
              strokeLinecap="round"
              opacity="0.65"
            />
          </>
        ) : null}

        {/* Soft anti-alias strip on lip via masked cream/dark mix */}
        <rect
          width={width}
          height={height}
          fill={topColor}
          mask={`url(#${featherMask})`}
          opacity="0.22"
        />
      </svg>
    </div>
  );
}

/** Gentle ridge between two cream sections. */
export function ExionSoftCreamWave({ className }: { className?: string }) {
  return (
    <MaskedSectionCurve
      bottomColor={EXION_V2_MOCK.cream}
      topColor={EXION_V2_MOCK.creamDeep}
      fillPath={EXION_V2_SOFT_CREAM_RIDGE}
      lipPath={EXION_V2_SOFT_CREAM_RIDGE_LIP}
      heightClass="h-[clamp(2.75rem,6.5vw,4.5rem)]"
      className={className}
    />
  );
}

/** Cream ↔ dark transitions with dramatic or soft S-curve masking. */
export function ExionWaveSeparator({ from, to, dramatic = false, className }: ExionWaveSeparatorProps) {
  const { fill, lip } = curvePair(from, to, dramatic);
  const bottomColor = toneHex[to];
  const topColor = toneHex[from];
  const isMajorHandoff = from !== to;

  return (
    <MaskedSectionCurve
      bottomColor={bottomColor}
      topColor={topColor}
      fillPath={fill}
      lipPath={lip}
      heightClass={
        dramatic
          ? "h-[clamp(5.5rem,13vw,10rem)]"
          : isMajorHandoff
            ? "h-[clamp(4rem,9vw,7rem)]"
            : "h-[clamp(2.75rem,6.5vw,4.5rem)]"
      }
      glow={isMajorHandoff}
      className={className}
    />
  );
}
