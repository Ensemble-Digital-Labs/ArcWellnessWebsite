import { cn } from "@/lib/utils";
import { showcaseAccentClass } from "@/client-showcase/design-tokens";

const shell =
  "inline-flex w-fit shrink-0 items-center justify-center rounded-md border-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors";

/**
 * Primary book/consultation CTA, outlined teal (matches `ShowcaseScienceBeautyBand`).
 * - `dark`: photo / `#0a0a0a` / main nav on ambient image
 * - `light`: cream, white, utility bar
 */
export function showcaseBookCtaClass(surface: "light" | "dark", className?: string) {
  return cn(
    shell,
    "px-6 py-3",
    surface === "dark"
      ? cn(
          "border-arc-teal/90 [text-shadow:0_1px_18px_rgba(0,0,0,0.4)]",
          showcaseAccentClass.bright,
          "hover:border-arc-teal hover:bg-arc-teal/10",
        )
      : cn(
          "border-arc-teal-ink/50",
          showcaseAccentClass.ink,
          "hover:border-arc-teal-ink hover:bg-arc-teal/12",
        ),
    className,
  );
}
