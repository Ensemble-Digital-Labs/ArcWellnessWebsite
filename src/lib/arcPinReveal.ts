"use client";

import { useEffect, useState, type CSSProperties } from "react";

/** Same scrub curve as `ArcMicroStatementSection` — opacity + 28px rise from pin progress `p`. */
export function pathPinFadeUp(p: number, start: number, speed: number): CSSProperties {
  const t = Math.min(1, Math.max(0, (p - start) * speed));
  return {
    opacity: t,
    transform: `translate3d(0, ${(1 - t) * 28}px, 0)`,
  };
}

/** Progress 0→1 from `PinnedSection` / `useArcFullscreenPin` `onProgress`; `p === 1` when reduced-motion (pin hook skipped). */
export function usePathPinScrubProgress() {
  const [pinProgress, setPinProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const p = reduceMotion ? 1 : pinProgress;
  return { p, setPinProgress };
}
