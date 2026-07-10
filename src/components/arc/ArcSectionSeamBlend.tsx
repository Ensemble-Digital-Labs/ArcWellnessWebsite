import {
  ARC_CREAM_DEEP_SECTION_TOP_BLEND_SOFT_CLASS,
  ARC_LIGHT_SECTION_BOTTOM_BLEND_CLASS,
  ARC_LIGHT_SECTION_BOTTOM_BLEND_SOFT_CLASS,
  ARC_LIGHT_SECTION_TOP_BLEND_CLASS,
  ARC_LIGHT_SECTION_TOP_BLEND_SOFT_CLASS,
  ARC_MUTED_SECTION_BOTTOM_BLEND_CLASS,
  ARC_MUTED_SECTION_TOP_BLEND_CLASS,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ArcSectionSeamBlendProps = {
  edge: "top" | "bottom";
  /** `cream` for blur overlays (always arc-cream). `muted` aliases to the same cream blur — section fill may still be teal-muted. */
  tone?: "cream" | "muted" | "cream-deep";
  /** `soft` = gradient only, no backdrop blur (gallery / editorial handoffs). */
  variant?: "default" | "soft";
  /** `background` feathers only the plate — keeps collage / photography / copy visible. */
  scope?: "full" | "background";
  className?: string;
};

/** Soft gradient feather between adjacent About/marketing sections — no hard border cut. */
export function ArcSectionSeamBlend({
  edge,
  tone = "cream",
  variant = "default",
  scope = "full",
  className,
}: ArcSectionSeamBlendProps) {
  const topClass =
    tone === "muted"
      ? ARC_MUTED_SECTION_TOP_BLEND_CLASS
      : tone === "cream-deep"
        ? variant === "soft"
          ? ARC_CREAM_DEEP_SECTION_TOP_BLEND_SOFT_CLASS
          : ARC_CREAM_DEEP_SECTION_TOP_BLEND_SOFT_CLASS
        : variant === "soft"
          ? ARC_LIGHT_SECTION_TOP_BLEND_SOFT_CLASS
          : ARC_LIGHT_SECTION_TOP_BLEND_CLASS;
  const bottomClass =
    tone === "muted"
      ? ARC_MUTED_SECTION_BOTTOM_BLEND_CLASS
      : variant === "soft"
        ? ARC_LIGHT_SECTION_BOTTOM_BLEND_SOFT_CLASS
        : ARC_LIGHT_SECTION_BOTTOM_BLEND_CLASS;

  return (
    <div
      aria-hidden
      className={cn(
        edge === "top" ? topClass : bottomClass,
        scope === "background" && "z-[2]",
        className,
      )}
    />
  );
}
