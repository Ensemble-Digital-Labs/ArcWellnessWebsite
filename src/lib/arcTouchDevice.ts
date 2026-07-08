"use client";

/** Coarse pointer / phone — used for Lenis + GSAP tuning (not a separate scroll engine). */
export function prefersTouchPointer(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return true;
  return (
    navigator.maxTouchPoints > 0 &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

/**
 * Same GSAP scrub lag as laptop — DevTools mobile preview uses desktop wheel + scrub 1.
 * Keep one value so phone and laptop preview feel aligned.
 */
export function arcScrollScrubLag(): number {
  return 1;
}
