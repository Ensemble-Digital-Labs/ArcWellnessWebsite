"use client";

import { useLayoutEffect, useState } from "react";
import { initArcStableScrollMode } from "@/lib/arcScrollMode";

/**
 * Native vs Locomotive scroll mode, locked on first client measure.
 */
export function useStableNativeScroll(): boolean {
  const [nativeScroll, setNativeScroll] = useState(false);

  useLayoutEffect(() => {
    setNativeScroll(initArcStableScrollMode());
  }, []);

  return nativeScroll;
}
