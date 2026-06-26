"use client";

import { useLayoutEffect, useState } from "react";

const MD_QUERY = "(min-width: 768px)";

/** Locked on first client measure — avoids pin / DOM swaps when devtools resizes. */
let stableMinMdMode: boolean | null = null;

export function initArcStableMinMd(): boolean {
  if (typeof window === "undefined") return false;
  if (stableMinMdMode === null) {
    stableMinMdMode = window.matchMedia(MD_QUERY).matches;
  }
  return stableMinMdMode;
}

export function getStableMinMd(): boolean {
  if (typeof window === "undefined") return false;
  return stableMinMdMode ?? initArcStableMinMd();
}

/** SSR-safe — `false` until one layout pass locks the load-time breakpoint. */
export function useStableMinMd() {
  const [stableMinMd, setStableMinMd] = useState(false);

  useLayoutEffect(() => {
    setStableMinMd(initArcStableMinMd());
  }, []);

  return stableMinMd;
}
