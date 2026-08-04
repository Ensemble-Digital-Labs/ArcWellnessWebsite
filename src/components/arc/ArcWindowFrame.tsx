import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * ARC brand image frame — clips content into the signature "arch window" silhouette
 * (domed head, straight jambs, softly rounded base), echoing the logo's arch.
 *
 * Reusable across the site as the brand photography frame. The arch is produced with
 * elliptical `border-radius` (not SVG/clip-path), so it scales responsively at any size,
 * plays nicely with `next/image` `fill`, and keeps hover motion cheap.
 *
 * Usage — framed photo (dome on top):
 *   <ArcWindowFrame src={img} alt="" className="aspect-[4/5] w-full" interactive />
 *
 * Usage — sideways window (dome on the right):
 *   <ArcWindowFrame archFacing="right" bordered className="w-full" />
 *
 * Usage — empty decorative frame (brand outline):
 *   <ArcWindowFrame bordered className="aspect-[3/4] w-full" />
 */
export type ArcWindowFrameProps = {
  /** Photo to frame. Omit for an empty decorative arch (pair with `bordered`). */
  src?: string;
  alt?: string;
  /** Sizing / layout classes for the frame (e.g. `aspect-[4/5] w-full`). */
  className?: string;
  /** Extra classes for the `next/image` element (e.g. `object-top`). */
  imageClassName?: string;
  /** `next/image` responsive sizes hint. */
  sizes?: string;
  priority?: boolean;
  /**
   * Depth of the domed head as a % of the facing axis.
   * - `archFacing="top"` (default): % of height — higher = taller arch. ~42 classic; ~28 short/wide.
   * - `archFacing="right"`: % of width — higher = deeper side dome.
   */
  archDepth?: number;
  /**
   * Which edge carries the arch dome. Default `top` (upright window).
   * `right` turns the silhouette sideways — curve head on the right.
   */
  archFacing?: "top" | "right";
  /** Radius (px) of the two non-arch corners. Default 14. */
  baseRadius?: number;
  /** Thin brand outline tracing the arch (also used for empty frames). */
  bordered?: boolean;
  /**
   * Soft cream fade tracing the whole arch (all borders), so the image dissolves into a
   * cream background. Fades to cream only — keeps the photo sharp. Opt-in, for select
   * "blended" placements on a cream surface.
   */
  feather?: boolean;
  /** Feather thickness in px (how far the cream fade reaches inward). Default 44. */
  featherSize?: number;
  /** Subtle zoom on hover — requires this element (or an ancestor) to carry `group`. */
  interactive?: boolean;
  /** Custom media (e.g. crossfading slides) when a single `src` is not enough. Renders under feather. */
  media?: ReactNode;
  /** Overlay content rendered above the image (captions, scrims, etc.). */
  children?: ReactNode;
};

function archBorderRadius(
  archFacing: "top" | "right",
  archDepth: number,
  baseRadius: number,
): string {
  if (archFacing === "right") {
    // Right dome: TR/BR share 50% vertical radius so curves meet mid-right;
    // horizontal radius = archDepth of the width.
    return `${baseRadius}px ${archDepth}% ${archDepth}% ${baseRadius}px / ${baseRadius}px 50% 50% ${baseRadius}px`;
  }
  // Top dome: TL/TR share 50% horizontal radius so curves meet mid-top;
  // vertical radius = archDepth of the height.
  return `50% 50% ${baseRadius}px ${baseRadius}px / ${archDepth}% ${archDepth}% ${baseRadius}px ${baseRadius}px`;
}

export function ArcWindowFrame({
  src,
  alt = "",
  className,
  imageClassName,
  sizes = "(max-width: 768px) 90vw, 33vw",
  priority = false,
  archDepth = 42,
  archFacing = "top",
  baseRadius = 14,
  bordered = false,
  feather = false,
  featherSize = 44,
  interactive = false,
  media,
  children,
}: ArcWindowFrameProps) {
  const archRadius = archBorderRadius(archFacing, archDepth, baseRadius);
  const archStyle: CSSProperties = { borderRadius: archRadius };

  // Inset cream vignette follows `border-radius`, so the fade hugs the arch on every edge.
  // A crisp opaque cream ring (`inset 0 0 0 1.5px`) caps the very edge so the anti-aliased
  // clip boundary can't leave a faint hairline where the photo meets the cream surface.
  const featherStyle: CSSProperties = {
    borderRadius: archRadius,
    boxShadow: `inset 0 0 0 3px var(--arc-cream), inset 0 0 ${featherSize}px ${Math.round(featherSize * 0.55)}px var(--arc-cream), inset 0 0 ${Math.round(featherSize * 0.45)}px ${Math.round(featherSize * 0.2)}px var(--arc-cream)`,
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-arc-cream",
        interactive && "group",
        bordered && "border border-arc-charcoal/15 shadow-[0_10px_30px_rgba(44,44,44,0.08)]",
        className,
      )}
      style={archStyle}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover object-center",
            interactive &&
              "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]",
            imageClassName,
          )}
        />
      ) : (
        media
      )}
      {feather ? (
        /* Cream fade tracing the arch on all borders — keeps the photo sharp (no blur). */
        <div aria-hidden className="pointer-events-none absolute inset-0" style={featherStyle} />
      ) : null}
      {children}
    </div>
  );
}
