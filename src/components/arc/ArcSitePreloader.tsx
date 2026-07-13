"use client";

import { useEffect, useState } from "react";
import { PATH_SECTION_INTRO_BACKGROUND_SRC } from "@/content/backgroundDecoration";
import { images } from "@/content/site";

/**
 * Homepage intro preloader — a branded cream splash that appears on the FIRST
 * homepage load per tab, warms critical above-the-fold imagery in the
 * background, then crossfades away to reveal the hero.
 *
 * Once-per-tab + no-flash behavior is driven by the pre-paint inline script in
 * `layout.tsx`, which sets `html[data-arc-intro="active"]` before first paint.
 * This component only animates/removes that attribute; it never decides to show
 * the overlay on its own (so a refresh with the flag already set stays clean).
 */

/** Above-the-fold art warmed while the splash holds, so the hero paints instantly on reveal. */
const PRELOAD_SRCS: readonly string[] = [
  images.logo,
  PATH_SECTION_INTRO_BACKGROUND_SRC,
  images.heroMedia,
  images.founderPortrait,
];

/** Minimum on-screen time so the brand moment never feels like a flicker. */
const MIN_HOLD_MS = 1400;
/** Hard cap so a slow/failed asset never keeps the splash up. */
const MAX_WAIT_MS = 3500;
/** Must match the `data-arc-intro="exiting"` fade duration in `globals.css`. */
const FADE_MS = 900;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function ArcSitePreloader() {
  // SSR-rendered so the overlay exists in the initial HTML (CSS keeps it hidden
  // unless the pre-paint script marked this load as the first visit).
  const [rendered, setRendered] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (html.getAttribute("data-arc-intro") !== "active") {
      setRendered(false);
      return;
    }

    let cancelled = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    const startedAt = performance.now();

    const assetsReady = Promise.all(PRELOAD_SRCS.map(preloadImage));
    const maxWait = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS));

    void Promise.race([assetsReady, maxWait]).then(() => {
      if (cancelled) return;
      const remaining = Math.max(0, MIN_HOLD_MS - (performance.now() - startedAt));
      exitTimer = setTimeout(() => {
        if (cancelled) return;
        html.setAttribute("data-arc-intro", "exiting");
        removeTimer = setTimeout(() => {
          if (cancelled) return;
          html.removeAttribute("data-arc-intro");
          setRendered(false);
        }, FADE_MS);
      }, remaining);
    });

    return () => {
      cancelled = true;
      if (exitTimer) clearTimeout(exitTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, []);

  if (!rendered) return null;

  return (
    <div id="arc-preloader" role="presentation" aria-hidden="true">
      <div className="arc-preloader__inner">
        {/* Plain img: this must paint before hydration, ahead of next/image work. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.logo}
          alt=""
          className="arc-preloader__logo"
          width={520}
          height={220}
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
