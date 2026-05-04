import { cn } from "@/lib/utils";

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
        "font-title-emphasis text-[1.12em] tracking-tight not-italic",
        className,
      )}
    >
      {children}
    </span>
  );
}
