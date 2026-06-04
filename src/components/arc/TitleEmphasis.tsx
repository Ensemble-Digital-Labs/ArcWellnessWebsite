import { cn } from "@/lib/utils";

/**
 * Serif half of split headlines (inline or stacked) — larger on mobile than body copy.
 * e.g. “The Arc Toward”, “Designed for calm”, “Our Mission”, “The values that shape”.
 */
export const ARC_SPLIT_HEADLINE_SERIF_CLASS =
  "font-serif font-semibold tracking-tight text-[clamp(2.15rem,10.5vw,3.25rem)] leading-[1.1] sm:leading-[1.18] lg:text-[clamp(1.65rem,5.2vw,3.25rem)]";

/** Alias — stacked Mission / Vision / Values / Founder use the same scale. */
export const ARC_STACKED_HEADLINE_SERIF_CLASS = ARC_SPLIT_HEADLINE_SERIF_CLASS;

/**
 * Serif + script split headlines on cream / light panels.
 * Birthstone emphasis should read at roughly the same visual weight as the serif half —
 * scale ~**1.45em → 1.66em** relative to the parent `<h2>` (not ~1.12em).
 */
export const ARC_HEADLINE_TITLE_EMPHASIS_CLASS =
  "text-[1.45em] leading-[1.01] text-arc-rose-gold-ink sm:text-[1.5em] md:text-[1.56em] lg:text-[1.62em] xl:text-[1.66em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";

/** Same ~1.45em → 1.66em scale on charcoal / photography — rose-gold + soft glow. */
export const ARC_HEADLINE_TITLE_EMPHASIS_DARK_CLASS =
  "text-[1.45em] text-arc-rose-gold [text-shadow:0_2px_20px_rgba(0,0,0,0.4),0_0_32px_var(--arc-rose-gold-glow)] sm:text-[1.5em] md:text-[1.56em] lg:text-[1.62em] xl:text-[1.66em]";

/** Mission / vision / values intro and editorial body paragraphs on cream. */
export const ARC_EDITORIAL_BODY_CLASS =
  "font-serif text-[clamp(0.9375rem,2.2vw,1.2rem)] font-medium leading-[1.45] tracking-tight text-arc-charcoal/90 sm:text-[clamp(1.0625rem,2.5vw,1.5rem)] md:text-[clamp(1.125rem,2.75vw,1.625rem)] lg:text-[clamp(1.2rem,2.4vw,1.75rem)]";

type TitleEmphasisProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Wrap one or a few words inside a heading for signature-style emphasis (Birthstone).
 * Parent heading should stay `font-serif`; this span overrides font for its text only.
 */
export function TitleEmphasis({ children, className }: TitleEmphasisProps) {
  return (
    <span
      className={cn(
        "font-title-emphasis text-[1.2em] tracking-tight not-italic",
        className,
      )}
    >
      {children}
    </span>
  );
}
