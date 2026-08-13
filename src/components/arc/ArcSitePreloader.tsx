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
 * homepage load per tab, warms the LCP hero in the background, then crossfades
 * away to reveal the hero.
 *
 * PageSpeed / Slow 4G (Phase 1 LCP):
 * - Splash exit is gated on the viewport-matched hero only (not the logo).
 * - Splash logo is a small dedicated asset with `fetchPriority="low"`.
 * - Mobile hold / fade / max-wait are short so LCP is not trapped behind branding.
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

const MIN_HOLD_MS_DESKTOP = 1100;
const MIN_HOLD_MS_MOBILE = 420;
const MAX_WAIT_MS_DESKTOP = 2800;
const MAX_WAIT_MS_MOBILE = 1400;
/** Must match `data-arc-intro="exiting"` fade durations in `globals.css`. */
const FADE_MS_DESKTOP = 720;
const FADE_MS_MOBILE = 420;
const INNER_WARM_AFTER_SPLASH_MS_DESKTOP = 500;
const INNER_WARM_AFTER_SPLASH_MS_MOBILE = 2800;
const INNER_WARM_NO_SPLASH_MS_DESKTOP = 2800;
const INNER_WARM_NO_SPLASH_MS_MOBILE = 5000;

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
function nextImageVariantUrl(src: string, quality = 82): string {
  const target = Math.ceil(window.innerWidth * Math.min(window.devicePixelRatio || 1, 2.5));
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

function warmInnerPageHeroAssets() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) return;
  if (
    isNarrowViewport() &&
    (connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "3g")
  ) {
    return;
  }

  const warm = () => {
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
    const fadeMs = mobile ? FADE_MS_MOBILE : FADE_MS_DESKTOP;

    // Critical path: viewport-matched mint hero only — logo must not gate LCP.
    const lcpHeroUrl = nextImageVariantUrl(
      mobile ? images.heroMediaMobile : images.heroMedia,
      82,
    );
    const assetsReady = preloadImage(lcpHeroUrl);
    const maxWait = new Promise<void>((resolve) => setTimeout(resolve, maxWaitMs));

    void Promise.race([assetsReady, maxWait]).then(() => {
      if (cancelled) return;
      const remaining = Math.max(0, minHold - (performance.now() - startedAt));
      exitTimer = setTimeout(() => {
        if (cancelled) return;
        html.setAttribute("data-arc-intro", "exiting");
        warmSrcList(POST_SPLASH_HOMEPAGE_SRCS.map((src) => nextImageVariantUrl(src, 75)));
        removeTimer = setTimeout(() => {
          if (cancelled) return;
          html.removeAttribute("data-arc-intro");
          setRendered(false);
          innerWarmTimer = scheduleInnerPageWarm(
            mobile
              ? INNER_WARM_AFTER_SPLASH_MS_MOBILE
              : INNER_WARM_AFTER_SPLASH_MS_DESKTOP,
          );
        }, fadeMs);
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
        {/* Plain img: paints before hydration; low priority so hero wins LCP bandwidth. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.logoSplash}
          alt=""
          className="arc-preloader__logo"
          width={309}
          height={320}
          decoding="async"
          fetchPriority="low"
        />
      </div>
    </div>
  );
}
