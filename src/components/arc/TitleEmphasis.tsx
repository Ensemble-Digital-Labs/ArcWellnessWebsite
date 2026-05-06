import { cn } from "@/lib/utils";

/** Founder-style headline keywords: Birthstone scale, teal ink, light-surface shadow (cream / muted panels). */
export const ARC_HEADLINE_TITLE_EMPHASIS_CLASS =
  "text-[1.45em] leading-[1.01] text-arc-teal-ink sm:text-[1.5em] md:text-[1.56em] lg:text-[1.62em] xl:text-[1.66em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";

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
