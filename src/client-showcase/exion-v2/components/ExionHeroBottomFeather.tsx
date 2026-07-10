import { cn } from "@/lib/utils";
import { EXION_V2_SOFT_CREAM_RIDGE, EXION_V2_SOFT_CREAM_RIDGE_LIP } from "@/client-showcase/exion-v2/exion-v2-curves";
import { EXION_V2_MOCK } from "@/client-showcase/exion-v2/exion-v2-tokens";

/** Blurred organic exit at the base of hero §1 (mock cream handoff). */
export function ExionHeroBottomFeather({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[clamp(3.5rem,8vw,6.25rem)] overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="exion-hero-feather-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={EXION_V2_MOCK.cream} stopOpacity="0" />
            <stop offset="42%" stopColor={EXION_V2_MOCK.cream} stopOpacity="0.55" />
            <stop offset="100%" stopColor={EXION_V2_MOCK.cream} stopOpacity="1" />
          </linearGradient>
          <filter id="exion-hero-feather-blur" x="-5%" y="-30%" width="110%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
          </filter>
        </defs>
        <path d={EXION_V2_SOFT_CREAM_RIDGE} fill="url(#exion-hero-feather-grad)" filter="url(#exion-hero-feather-blur)" />
        <path
          d={EXION_V2_SOFT_CREAM_RIDGE_LIP}
          fill="none"
          stroke={EXION_V2_MOCK.champagne}
          strokeWidth="1.5"
          opacity="0.35"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-arc-cream" />
    </div>
  );
}
