"use client";

import { useLayoutEffect, useState } from "react";
import { initArcStableScrollMode } from "@/lib/arcScrollMode";
import { initArcStableMinMd } from "@/lib/useStableMinMd";

export type ArcLayoutLocks = {
  ready: boolean;
  stableMinMd: boolean;
  nativeScroll: boolean;
};

const INITIAL_LOCKS: ArcLayoutLocks = {
  ready: false,
  stableMinMd: false,
  nativeScroll: false,
};

/** Single layout pass — locks scroll mode + `md` breakpoint (SSR-safe first paint). */
export function useArcLayoutReady(): ArcLayoutLocks {
  const [locks, setLocks] = useState<ArcLayoutLocks>(INITIAL_LOCKS);

  useLayoutEffect(() => {
    setLocks({
      ready: true,
      stableMinMd: initArcStableMinMd(),
      nativeScroll: initArcStableScrollMode(),
    });
  }, []);

  return locks;
}
