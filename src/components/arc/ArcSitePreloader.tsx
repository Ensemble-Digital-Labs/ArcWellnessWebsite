"use client";

import { useEffect, useState } from "react";
import {
  INSIGHTS_FEED_AMBIENT_SRC,
  PATH_SECTION_INTRO_BACKGROUND_SRC,
} from "@/content/backgroundDecoration";
import { SERVICE_PAGE_LCP_HERO_SRCS, SHARED_SITE_BACKGROUND_SRCS } from "@/content/servicePageLcpHeroes";
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
  images.heroMedia,
  PATH_SECTION_INTRO_BACKGROUND_SRC,
  images.founderPortrait,
];

/**
 * Full-bleed hero plates served through next/image on inner pages. Nearly every
 * marketing page hero (Contact, Programs, Financing, Aesthetics, Treatments,
 * treatment detail) shares the same marble plate, so warming these one time
 * makes those heroes paint instantly on the first navigation. Also warms the
 * About page silk-floral hero plate (`ScrollChapterIntroSection`), shared
 * silk / cream-gold / dark-teal section plates, plus curated **service +
 * shared condition LCP** heroes (see `servicePageLcpHeroes.ts`).
 *
 * These are warmed via the exact `/_next/image` variant (not the raw file) so the
 * cached URL matches what the destination pages actually request.
 */
const WARM_OPTIMIZED_HERO_SRCS: readonly string[] = [
  images.aboutHeroMedia,
  INSIGHTS_FEED_AMBIENT_SRC,
  images.heroMedia,
  ...SHARED_SITE_BACKGROUND_SRCS,
  ...SERVICE_PAGE_LCP_HERO_SRCS,
];

/** Next.js default `deviceSizes` — used to pick the same width next/image would for `sizes="100vw"`. */
const NEXT_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;

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

/** Build the optimized URL next/image requests for a full-bleed `sizes="100vw"` plate on this screen. */
function nextImageVariantUrl(src: string, quality = 75): string {
  const target = Math.ceil(window.innerWidth * (window.devicePixelRatio || 1));
  const width =
    NEXT_DEVICE_SIZES.find((w) => w >= target) ??
    NEXT_DEVICE_SIZES[NEXT_DEVICE_SIZES.length - 1];
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/**
 * Warm shared inner-page + service LCP hero plates in the background (idle,
 * non-blocking) so navigation from the homepage lands on an already-cached
 * hero. Skipped on Save-Data connections. Does not gate the splash.
 */
function warmInnerPageHeroAssets() {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) return;

  const warm = () => {
    for (const src of WARM_OPTIMIZED_HERO_SRCS) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = nextImageVariantUrl(src);
    }
  };

  const idle = (
    window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }
  ).requestIdleCallback;
  if (idle) idle(warm, { timeout: 2500 });
  else window.setTimeout(warm, 600);
}

export function ArcSitePreloader() {
  // SSR-rendered so the overlay exists in the initial HTML (CSS keeps it hidden
  // unless the pre-paint script marked this load as the first visit).
  const [rendered, setRendered] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const splashActive = html.getAttribute("data-arc-intro") === "active";

    // Idle-warm inner + service LCP heroes on every homepage mount (splash or
    // not). Splash itself stays gated to first visit; this never blocks it.
    warmInnerPageHeroAssets();

    if (!splashActive) {
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
