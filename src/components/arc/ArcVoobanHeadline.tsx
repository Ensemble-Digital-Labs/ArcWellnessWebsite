"use client";

import { voobanWordRevealStyle } from "@/lib/arcVoobanMotion";
import { cn } from "@/lib/utils";

type ArcVoobanHeadlineProps = {
  text: string;
  scrollProgress: number;
  className?: string;
  as?: "h1" | "h2";
};

/** Headline with per-word mask reveal on scroll scrub (Vooban-style) */
export function ArcVoobanHeadline({
  text,
  scrollProgress,
  className,
  as: Tag = "h2",
}: ArcVoobanHeadlineProps) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mr-[0.28em] inline-block overflow-hidden align-top last:mr-0">
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
