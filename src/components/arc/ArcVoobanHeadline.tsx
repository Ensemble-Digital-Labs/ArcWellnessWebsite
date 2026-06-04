"use client";

import { voobanWordRevealStyle } from "@/lib/arcVoobanMotion";
import { cn } from "@/lib/utils";

type ArcVoobanHeadlineProps = {
  text: string;
  scrollProgress: number;
  className?: string;
  as?: "h1" | "h2" | "span";
  /** `inline` — sits beside script emphasis on one baseline (no top-aligned mask boxes). */
  variant?: "block" | "inline";
};

/** Headline with per-word mask reveal on scroll scrub (Vooban-style) */
export function ArcVoobanHeadline({
  text,
  scrollProgress,
  className,
  as: Tag = "h2",
  variant = "block",
}: ArcVoobanHeadlineProps) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const inline = variant === "inline";

  return (
    <Tag className={cn(!inline && "pb-[0.06em]", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn(
            "mr-[0.28em] inline-block overflow-hidden last:mr-0",
            inline ? "align-baseline pb-[0.1em]" : "align-top pb-[0.2em]",
          )}
        >
          <span
            className="inline-block will-change-transform"
            style={voobanWordRevealStyle(i, words.length, scrollProgress)}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
