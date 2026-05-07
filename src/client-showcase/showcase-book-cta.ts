import { cn } from "@/lib/utils";
import { showcaseRoseClass } from "@/client-showcase/design-tokens";

const shell =
  "inline-flex w-fit shrink-0 items-center justify-center rounded-md border-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors";

/**
 * Primary book/consultation CTA — outlined rose-gold (matches `ShowcaseScienceBeautyBand`).
 * - `dark`: photo / `#0a0a0a` / main nav on ambient image
 * - `light`: cream, white, utility bar
 */
export function showcaseBookCtaClass(surface: "light" | "dark", className?: string) {
  return cn(
    shell,
    "px-6 py-3",
    surface === "dark"
      ? cn(
          "border-arc-rose-gold/90 [text-shadow:0_1px_18px_rgba(0,0,0,0.4)]",
          showcaseRoseClass.bright,
          "hover:border-arc-rose-gold hover:bg-arc-rose-gold/10",
        )
      : cn(
          "border-arc-rose-gold-ink/50",
          showcaseRoseClass.ink,
          "hover:border-arc-rose-gold-ink hover:bg-arc-rose-gold/12",
        ),
    className,
  );
}
