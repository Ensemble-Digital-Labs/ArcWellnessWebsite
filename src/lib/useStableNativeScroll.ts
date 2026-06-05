"use client";

import { useEffect, useState } from "react";
import { prefersNativeScroll } from "@/lib/arcScrollMode";

/**
 * Native vs Locomotive scroll mode, locked on first client measure.
 * Do not flip on window resize (devtools / F12) — remounting `#main` while GSAP pins
 * are active causes React `removeChild` crashes.
 */
export function useStableNativeScroll(): boolean {
  const [nativeScroll, setNativeScroll] = useState(false);

  useEffect(() => {
    setNativeScroll(prefersNativeScroll());
  }, []);

  return nativeScroll;
}
