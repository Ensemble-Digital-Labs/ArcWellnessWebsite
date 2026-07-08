"use client";

import { useSyncExternalStore } from "react";
import { initArcStableScrollMode } from "@/lib/arcScrollMode";

/**
 * Native vs Locomotive scroll mode, locked on first client measure.
 * useSyncExternalStore — SSR snapshot is false, client reads real touch/viewport on hydrate
 * (useState lazy init would stay false after SSR and trap phones in Lenis `#main`).
 */
export function useStableNativeScroll(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => initArcStableScrollMode(),
    () => false,
  );
}
