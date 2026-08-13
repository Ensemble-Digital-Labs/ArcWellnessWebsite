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
 *
 * PageSpeed / Slow 4G: splash only waits on the logo + the exact `/_next/image`
 * mint-hero variant (not the raw ~1.3MB WebP). Inner-page hero warming still
 * runs, but only after the splash finishes (or after LCP settles on revisits)
 * so it does not compete with homepage LCP.
 */

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

/** Below-fold homepage art — warm after splash starts exiting (does not gate hold). */
const POST_SPLASH_HOMEPAGE_SRCS: readonly string[] = [
  PATH_SECTION_INTRO_BACKGROUND_SRC,
  images.founderPortrait,
];

/** Next.js default `deviceSizes` — used to pick the same width next/image would for `sizes="100vw"`. */
const NEXT_DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;

/** Minimum on-screen time so the brand moment never feels like a flicker. */
const MIN_HOLD_MS_DESKTOP = 1400;
const MIN_HOLD_MS_MOBILE = 850;
/** Hard cap so a slow/failed asset never keeps the splash up. */
const MAX_WAIT_MS_DESKTOP = 3500;
const MAX_WAIT_MS_MOBILE = 2400;
/** Must match the `data-arc-intro="exiting"` fade duration in `globals.css`. */
const FADE_MS = 900;
/**
 * After splash is fully gone, wait briefly then idle-warm other page heroes.
 * Keeps Slow 4G bandwidth on homepage LCP first; navigation warm-up still happens.
 */
const INNER_WARM_AFTER_SPLASH_MS_DESKTOP = 500;
const INNER_WARM_AFTER_SPLASH_MS_MOBILE = 2200;
/** Return / refresh visits (no splash): let homepage LCP settle before warming others. */
const INNER_WARM_NO_SPLASH_MS_DESKTOP = 2800;
const INNER_WARM_NO_SPLASH_MS_MOBILE = 4500;

function isNarrowViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

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

function warmSrcList(srcs: readonly string[]) {
  for (const src of srcs) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = src.startsWith("/_next/image") ? src : nextImageVariantUrl(src);
  }
}

/**
 * Warm shared inner-page + service LCP hero plates in the background (idle,
 * non-blocking) so navigation from the homepage lands on an already-cached
 * hero. Skipped on Save-Data connections. Does not gate the splash.
 */
function warmInnerPageHeroAssets() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return;
  // Skip bulk hero warming on slow cellular — protects mobile LCP / data.
  if (
    isNarrowViewport() &&
    (connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "3g")
  ) {
    return;
  }

  const warm = () => {
    // Mobile: only warm the shared homepage-adjacent plates, not every service LCP.
    const srcs = isNarrowViewport()
      ? ([
          images.aboutHeroMedia,
          images.heroMedia,
          ...SHARED_SITE_BACKGROUND_SRCS.slice(0, 3),
        ] as const)
      : WARM_OPTIMIZED_HERO_SRCS;
    warmSrcList(srcs);
  };

  const idle = (
    window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }
  ).requestIdleCallback;
  if (idle) idle(warm, { timeout: isNarrowViewport() ? 6000 : 3500 });
  else window.setTimeout(warm, isNarrowViewport() ? 1600 : 800);
}

function scheduleInnerPageWarm(delayMs: number): number {
  return window.setTimeout(() => warmInnerPageHeroAssets(), delayMs);
}

export function ArcSitePreloader() {
  // SSR-rendered so the overlay exists in the initial HTML (CSS keeps it hidden
  // unless the pre-paint script marked this load as the first visit).
  const [rendered, setRendered] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const splashActive = html.getAttribute("data-arc-intro") === "active";

    if (!splashActive) {
      setRendered(false);
      const warmTimer = scheduleInnerPageWarm(
        isNarrowViewport()
          ? INNER_WARM_NO_SPLASH_MS_MOBILE
          : INNER_WARM_NO_SPLASH_MS_DESKTOP,
      );
      return () => window.clearTimeout(warmTimer);
    }

    let cancelled = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    let innerWarmTimer: number | undefined;
    const startedAt = performance.now();
    const mobile = isNarrowViewport();
    const minHold = mobile ? MIN_HOLD_MS_MOBILE : MIN_HOLD_MS_DESKTOP;
    const maxWaitMs = mobile ? MAX_WAIT_MS_MOBILE : MAX_WAIT_MS_DESKTOP;

    // Critical path only: splash logo + viewport-matched mint hero master.
    const lcpHeroUrl = nextImageVariantUrl(
      isNarrowViewport() ? images.heroMediaMobile : images.heroMedia,
      72,
    );
    const assetsReady = Promise.all([
      preloadImage(images.logo),
      preloadImage(lcpHeroUrl),
    ]);
    const maxWait = new Promise<void>((resolve) => setTimeout(resolve, maxWaitMs));

    void Promise.race([assetsReady, maxWait]).then(() => {
      if (cancelled) return;
      const remaining = Math.max(0, minHold - (performance.now() - startedAt));
      exitTimer = setTimeout(() => {
        if (cancelled) return;
        html.setAttribute("data-arc-intro", "exiting");
        // Soft-warm below-fold homepage art while the splash fades (same UX, no gate).
        warmSrcList(POST_SPLASH_HOMEPAGE_SRCS.map((src) => nextImageVariantUrl(src, 72)));
        removeTimer = setTimeout(() => {
          if (cancelled) return;
          html.removeAttribute("data-arc-intro");
          setRendered(false);
          innerWarmTimer = scheduleInnerPageWarm(
            mobile
              ? INNER_WARM_AFTER_SPLASH_MS_MOBILE
              : INNER_WARM_AFTER_SPLASH_MS_DESKTOP,
          );
        }, FADE_MS);
      }, remaining);
    });

    return () => {
      cancelled = true;
      if (exitTimer) clearTimeout(exitTimer);
      if (removeTimer) clearTimeout(removeTimer);
      if (innerWarmTimer) window.clearTimeout(innerWarmTimer);
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
