"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Hero §1 — gold line with center diamond (mock eyebrow → body separator). */
export function ExionHeroDiamondDivider({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const leftGrad = `exion-hero-divider-l-${uid}`;
  const rightGrad = `exion-hero-divider-r-${uid}`;

  return (
    <svg
      viewBox="0 0 300 12"
      fill="none"
      className={cn("h-3.5 w-full max-w-[20rem] text-[#9A7B52] sm:max-w-[22rem]", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={leftGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="28%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={rightGrad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="72%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <line x1="8" y1="6" x2="138" y2="6" stroke={`url(#${leftGrad})`} strokeWidth="0.85" strokeLinecap="round" />
      <path d="M150 6L153.2 3.2L156.4 6L153.2 8.8L150 6Z" fill="currentColor" />
      <line x1="162" y1="6" x2="292" y2="6" stroke={`url(#${rightGrad})`} strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  );
}
