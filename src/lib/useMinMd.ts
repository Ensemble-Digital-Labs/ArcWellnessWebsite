"use client";

import { useSyncExternalStore } from "react";

const MD_QUERY = "(min-width: 768px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(MD_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(MD_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True at `md` (768px)+. Server / first paint assumes mobile to avoid loading hidden desktop-only media. */
export function useMinMd() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
