import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ArcTextUnderlineCtaProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** `xs`/`sm` for dense UI; default matches hero / section links */
  size?: "xs" | "sm" | "md";
  /**
   * - **`teal`** — darker ink teal for cream / light grey backgrounds (default).
   * - **`tealBright`** — signature vivid teal for dark photography or heavy overlays (e.g. hero).
   * - **`champagne`** — gold on dark photography.
   */
  accent?: "teal" | "tealBright" | "champagne";
};

/**
 * Minimal CTA: label + thin **→** + full-width hairline under both (no fill, no pill).
 * Default on-light teal uses **`arc-teal-ink`**; use **`tealBright`** on dark hero/photo bands.
 */
export function ArcTextUnderlineCta({
  href,
  children,
  className,
  size = "md",
  accent = "teal",
}: ArcTextUnderlineCtaProps) {
  const rowType =
    size === "xs"
      ? "font-serif text-xs font-black uppercase tracking-[0.1em] sm:text-sm"
      : size === "sm"
      ? "font-serif text-sm font-black uppercase tracking-[0.11em] sm:text-base"
      : "font-serif text-base font-black uppercase tracking-[0.11em] sm:text-lg";

  const accentClasses =
    accent === "champagne"
      ? [
          "text-arc-champagne hover:text-arc-champagne-hover",
          "[text-shadow:0_1px_2px_rgba(0,0,0,0.28),0_0_26px_rgba(197,168,120,0.42)]",
          "focus-visible:ring-arc-champagne/45 focus-visible:ring-offset-black/35",
        ]
      : accent === "tealBright"
        ? [
            "text-arc-teal hover:text-arc-teal-hover",
            "[text-shadow:0_1px_2px_rgba(0,0,0,0.22),0_0_32px_rgba(78,196,176,0.45),0_0_1px_rgba(44,44,44,0.12)]",
            "focus-visible:ring-arc-teal/50 focus-visible:ring-offset-black/35",
          ]
        : [
            "text-arc-teal-ink hover:text-arc-teal-ink-hover",
            "[text-shadow:0_1px_0_rgba(255,255,255,0.55),0_1px_3px_rgba(44,44,44,0.14),0_0_18px_rgba(40,122,109,0.22)]",
            "focus-visible:ring-arc-teal-ink/55 focus-visible:ring-offset-arc-cream/80",
          ];

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex max-w-full flex-col items-stretch outline-none",
        "transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
        "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2",
        accentClasses,
        "motion-reduce:transition-none",
        className,
      )}
    >
      <span className={cn("inline-flex items-center gap-2.5", rowType)}>
        <span>{children}</span>
        <svg
          viewBox="0 0 44 12"
          className="h-[0.72em] w-[2.8em] min-w-[2.8em] shrink-0 translate-x-0 opacity-95 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none sm:h-3.5 sm:w-9 sm:min-w-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.62"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M1 6 H39" />
          <path d="M34 1 L39 6 L34 11" />
        </svg>
      </span>
      <svg
        viewBox="0 0 280 36"
        className="mt-2.5 h-[1.2rem] w-full opacity-95 transition-[opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 motion-reduce:transition-none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20 C8 17 10 17 15 20 C20 23 23 23 28 20" />
          <path d="M278 20 C272 17 270 17 265 20 C260 23 257 23 252 20" />

          <path d="M28 20 C38 17.5 48 16 56 17 C68 18.5 74 15 82 10 C89 6 95 7 101 12 C107 17 114 19 122 17 C127 15.8 131 14 134 13" />
          <path d="M252 20 C242 17.5 232 16 224 17 C212 18.5 206 15 198 10 C191 6 185 7 179 12 C173 17 166 19 158 17 C153 15.8 149 14 146 13" />

          <path d="M50 12 L56 17 L52 22" />
          <path d="M230 12 L224 17 L228 22" />

          <ellipse cx="42" cy="14" rx="4.5" ry="2.1" transform="rotate(-36 42 14)" />
          <ellipse cx="60" cy="12" rx="4.8" ry="2.2" transform="rotate(-20 60 12)" />
          <ellipse cx="74" cy="8.8" rx="4.7" ry="2.15" transform="rotate(-34 74 8.8)" />
          <ellipse cx="90" cy="17.6" rx="4.4" ry="2.05" transform="rotate(28 90 17.6)" />
          <ellipse cx="210" cy="14" rx="4.5" ry="2.1" transform="rotate(36 210 14)" />
          <ellipse cx="192" cy="12" rx="4.8" ry="2.2" transform="rotate(20 192 12)" />
          <ellipse cx="178" cy="8.8" rx="4.7" ry="2.15" transform="rotate(34 178 8.8)" />
          <ellipse cx="162" cy="17.6" rx="4.4" ry="2.05" transform="rotate(-28 162 17.6)" />

          <circle cx="84" cy="12.8" r="1.55" />
          <circle cx="196" cy="12.8" r="1.55" />

          <circle cx="140" cy="16.8" r="2.05" />
          <ellipse cx="140" cy="9.3" rx="4.2" ry="6.1" />
          <ellipse cx="146.4" cy="14" rx="5.65" ry="4" transform="rotate(18 146.4 14)" />
          <ellipse cx="143.9" cy="21.3" rx="5.65" ry="4" transform="rotate(56 143.9 21.3)" />
          <ellipse cx="136.1" cy="21.3" rx="5.65" ry="4" transform="rotate(-56 136.1 21.3)" />
          <ellipse cx="133.6" cy="14" rx="5.65" ry="4" transform="rotate(-18 133.6 14)" />
        </g>
      </svg>
    </Link>
  );
}
