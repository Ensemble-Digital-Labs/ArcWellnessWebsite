"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { memo, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT, whenArcLocomotiveReady } from "@/lib/locomotive";
import {
  arcScrollTriggerPinOptions,
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { arcScrollScrubLag } from "@/lib/arcTouchDevice";
import { resizeArcScrollViewport } from "@/lib/arcScrollLayoutRefresh";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { homeHeroSecondaryCta } from "@/content/homepage";
import { siteMeta } from "@/content/siteMeta";
import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
import {
  ARC_PAGE_RAIL_MAX,
  ARC_CREAM_BLUR_GRADIENT_BOTTOM,
  ARC_CREAM_BLUR_MASK_BOTTOM,
} from "@/lib/arc-layout";
import {
  heroPrimaryCtaClass,
  heroSecondaryCtaClass,
  heroPrimaryCtaClassLight,
  heroSecondaryCtaClassLight,
} from "@/lib/heroCtaStyles";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HERO_TITLE_KEYWORDS = ["Wellness", "Longevity", "Aesthetics"] as const;

/** Bottom-of-hero sliding ticker, brand phrases (reference: bullet-separated marquee bar). */
const HERO_KEYWORD_MARQUEE_ITEMS = [
  "Low Energy & Burnout",
  "Hormonal Imbalance",
  "Weight Gain",
  "Poor Sleep & Recovery",
  "Aging Skin & Body Changes",
  "Brain Fog & Focus",
] as const;

/** Playfair all-caps, on cream or teal hero ticker bar. */
const HERO_MARQUEE_LABEL_CLASS =
  "font-serif text-xs font-semibold uppercase leading-none tracking-[0.14em] sm:text-sm md:text-base";

const HERO_MARQUEE_DOT_CLASS =
  "select-none font-sans text-xs font-semibold leading-none sm:text-sm";

const HeroKeywordMarquee = memo(function HeroKeywordMarquee({
  variant = "teal",
}: {
  /** `cream` on reference hero (client: ticker matches cream headline on mint wall). */
  variant?: "teal" | "cream";
}) {
  /** Bar visible on first paint; motion after fonts + scroll proxy settle. */
  const [marqueeVisible] = useState(true);
  const [marqueeOn, setMarqueeOn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let stableTimer: number | undefined;

    const enableMotion = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setMarqueeOn(true);
        });
      });
    };

    const scheduleAfterScrollStable = (delayMs: number) => {
      window.clearTimeout(stableTimer);
      stableTimer = window.setTimeout(enableMotion, delayMs);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setMarqueeOn(true);
      return () => {
        cancelled = true;
      };
    }

    const onScrollReady = () => {
      void document.fonts.ready.then(() => {
        if (!cancelled) scheduleAfterScrollStable(1400);
      });
    };

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onScrollReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      queueMicrotask(onScrollReady);
    }

    const fallback = window.setTimeout(() => {
      if (!cancelled) enableMotion();
    }, 7200);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onScrollReady as EventListener);
      window.clearTimeout(stableTimer);
      window.clearTimeout(fallback);
    };
  }, []);

  const isCream = variant === "cream";

  return (
    <div
      data-arc-hero-marquee
      className={cn(
        "pointer-events-none isolate overflow-x-hidden pb-[max(0.375rem,env(safe-area-inset-bottom))] transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-opacity [transform:translateZ(0)]",
        isCream
          ? "border-t border-arc-cream/40 bg-arc-cream shadow-[0_-8px_28px_rgba(44,44,44,0.08)]"
          : "border-t border-white/15 bg-arc-teal shadow-[0_-10px_36px_rgba(44,44,44,0.12),0_-2px_24px_var(--arc-teal-glow)]",
        marqueeVisible ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <div
        className={cn(
          "arc-marquee-track flex items-center gap-8 whitespace-nowrap py-2 sm:gap-11 sm:py-2.5",
          marqueeOn && "animate-arc-marquee",
        )}
        style={{ width: "max-content" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} className="inline-flex shrink-0 items-center gap-8 sm:gap-11">
            {HERO_KEYWORD_MARQUEE_ITEMS.map((label) => (
              <span key={`${dup}-${label}`} className="inline-flex shrink-0 items-center gap-8 sm:gap-11">
                <span
                  className={cn(
                    HERO_MARQUEE_LABEL_CLASS,
                    isCream ? "text-arc-charcoal/88" : "text-arc-charcoal",
                  )}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    HERO_MARQUEE_DOT_CLASS,
                    isCream ? "text-arc-charcoal/40" : "text-arc-charcoal/45",
                  )}
                >
                  ·
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
});

/**
 * Hero on photography, reference layout: left stack (sans connectors + teal script keywords).
 */
const HERO_TYPE_DEPTH =
  "[text-shadow:0_2px_16px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.35)]";

/** White halo + stroke, hero Birthstone keywords only (teal fill). */
const HERO_KEYWORD_WHITE_OUTLINE =
  "[text-shadow:-1px_-1px_0_rgba(255,255,255,0.98),1px_-1px_0_rgba(255,255,255,0.98),-1px_1px_0_rgba(255,255,255,0.98),1px_1px_0_rgba(255,255,255,0.98),0_2px_10px_rgba(255,255,255,0.75),0_3px_14px_rgba(0,0,0,0.28),0_0_30px_var(--arc-teal-glow)] [-webkit-text-stroke:0.045em_rgba(255,255,255,0.9)] [paint-order:stroke_fill]";

/** Birthstone keywords, large script accent; parent row scales down only when width requires it. */
const HERO_TITLE_KEYWORD_AS_LINE_BODY_CLASS = cn(
  "text-[1.92em] sm:text-[2.14em] md:text-[2.38em] lg:text-[2.62em]",
  "text-arc-teal-ink",
  HERO_KEYWORD_WHITE_OUTLINE,
);

const HERO_TITLE_KEYWORD_BLEND_AS_LINE_BODY_CLASS = cn(
  "text-[1.84em] sm:text-[2.05em] md:text-[2.28em] lg:text-[2.48em]",
  "text-arc-teal-ink",
  HERO_KEYWORD_WHITE_OUTLINE,
);

const HERO_REF_CONNECTOR_SHADOW = "[text-shadow:0_1px_8px_rgba(0,0,0,0.32)]";

/** Reference mockup, pixel-matched to client hero comp (Where/Converge ~32px, script ~80px). */
const HERO_REF_LINE_ALIGN = "max-md:text-center md:text-left";

const HERO_REF_WHERE_CLASS = cn(
  "block font-sans text-[1.75rem] font-medium leading-none text-arc-cream md:text-[2rem]",
  HERO_REF_LINE_ALIGN,
  HERO_REF_CONNECTOR_SHADOW,
);

const HERO_REF_KEYWORD_LINE_CLASS = cn(
  "block font-title-emphasis text-[clamp(3.15rem,6.8vw,5.85rem)] font-normal not-italic leading-[1.02] tracking-tight text-arc-cream md:text-[clamp(3.5rem,7.2vw,6.35rem)]",
  HERO_REF_LINE_ALIGN,
  HERO_REF_CONNECTOR_SHADOW,
);

const HERO_REF_CONVERGE_CLASS = cn(
  "block font-sans text-[1.75rem] font-medium leading-none text-arc-cream md:text-[2rem]",
  "mt-2 md:mt-2.5",
  HERO_REF_LINE_ALIGN,
  HERO_REF_CONNECTOR_SHADOW,
);

const HERO_REF_INTRO_TYPE = cn(
  "font-sans text-base font-normal leading-[1.6] text-arc-cream/95 md:text-[1.125rem]",
  "max-w-[min(100%,21rem)] sm:max-w-[22rem] md:max-w-[min(100%,22.5rem)]",
  "max-md:mx-auto max-md:text-center md:text-left",
  HERO_REF_CONNECTOR_SHADOW,
);

/** Mobile-only panel behind hero copy, keeps photography visible outside the text block. */
const HERO_REF_MOBILE_TEXT_SCRIM = cn(
  "max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:bg-black/45",
  "max-md:px-5 max-md:py-6 max-md:shadow-[0_12px_40px_rgba(0,0,0,0.24)]",
);

/** Light-surface variants — charcoal connectors + teal script, no photo drop shadow (textured hero). */
const HERO_REF_WHERE_LIGHT_CLASS = cn(
  "block font-sans text-[1.75rem] font-medium leading-none text-arc-charcoal md:text-[2rem]",
  HERO_REF_LINE_ALIGN,
);

const HERO_REF_KEYWORD_LINE_LIGHT_CLASS = cn(
  "block font-title-emphasis text-[clamp(3.15rem,6.8vw,5.85rem)] font-normal not-italic leading-[1.02] tracking-tight text-arc-teal md:text-[clamp(3.5rem,7.2vw,6.35rem)]",
  HERO_REF_LINE_ALIGN,
);

const HERO_REF_CONVERGE_LIGHT_CLASS = cn(
  "block font-sans text-[1.75rem] font-medium leading-none text-arc-charcoal md:text-[2rem]",
  "mt-2 md:mt-2.5",
  HERO_REF_LINE_ALIGN,
);

const HERO_REF_INTRO_TYPE_LIGHT = cn(
  "font-sans text-base font-normal leading-[1.6] text-arc-charcoal/78 md:text-[1.125rem]",
  "max-w-[min(100%,21rem)] sm:max-w-[22rem] md:max-w-[min(100%,22.5rem)]",
  "max-md:mx-auto max-md:text-center md:text-left",
);

/** Stacked headline, matches reference mockup line breaks. */
function HeroReferenceHeadline({
  light = false,
  center = false,
  oneLine = false,
}: {
  light?: boolean;
  center?: boolean;
  /** On xl+, render the whole title on a single left-to-right line (stacked below xl). */
  oneLine?: boolean;
}) {
  const centerAlign = center ? "md:text-center" : undefined;
  const whereClass = cn(light ? HERO_REF_WHERE_LIGHT_CLASS : HERO_REF_WHERE_CLASS, centerAlign);
  const keywordClass = cn(
    light ? HERO_REF_KEYWORD_LINE_LIGHT_CLASS : HERO_REF_KEYWORD_LINE_CLASS,
    centerAlign,
  );
  const convergeClass = cn(
    light ? HERO_REF_CONVERGE_LIGHT_CLASS : HERO_REF_CONVERGE_CLASS,
    centerAlign,
  );

  const stacked = (
    <>
      <span className={whereClass}>Where</span>
      <TitleEmphasis className={cn(keywordClass, "mt-1")}>Wellness,</TitleEmphasis>
      <TitleEmphasis className={cn(keywordClass, "mt-0.5")}>Longevity &</TitleEmphasis>
      <TitleEmphasis className={cn(keywordClass, "mt-0.5")}>Aesthetics</TitleEmphasis>
      <span className={convergeClass}>Converge.</span>
    </>
  );

  if (!oneLine) return stacked;

  const inlineConnector = cn(
    "font-sans font-medium leading-none tracking-tight text-[clamp(2rem,2.5vw,2.9rem)]",
    light ? "text-arc-charcoal" : cn("text-arc-cream", HERO_REF_CONNECTOR_SHADOW),
  );
  const inlineKeyword = cn(
    "font-title-emphasis font-normal not-italic leading-[1.0] tracking-tight text-[clamp(3.5rem,6.2vw,7.25rem)]",
    light ? "text-arc-teal" : cn("text-arc-cream", HERO_REF_CONNECTOR_SHADOW),
  );

  return (
    <>
      <span className="flex w-full flex-col xl:hidden">{stacked}</span>
      <span className="hidden w-full flex-col items-center xl:flex">
        <span className={cn(inlineConnector, "leading-none")}>Where</span>
        <span className="flex items-baseline justify-center gap-x-[0.26em] whitespace-nowrap leading-none pb-[0.5em] pt-[0.08em]">
          <TitleEmphasis className={inlineKeyword}>Wellness,</TitleEmphasis>
          <TitleEmphasis className={inlineKeyword}>Longevity &</TitleEmphasis>
          <TitleEmphasis className={inlineKeyword}>Aesthetics</TitleEmphasis>
        </span>
        <span className={cn(inlineConnector, "mt-1 leading-none")}>Converge.</span>
      </span>
    </>
  );
}

/** Sans connectors + lead/closing, cream on photography. */
const HERO_TITLE_CONNECTOR_CLASS = cn(
  "font-sans font-medium tracking-tight text-arc-cream",
  HERO_TYPE_DEPTH,
);

const HERO_REF_CONNECTOR_CLASS = cn(
  "font-sans font-normal tracking-tight text-arc-cream",
  HERO_REF_CONNECTOR_SHADOW,
);

const HERO_INTRO_TYPE = cn(
  "font-sans text-sm font-normal leading-relaxed text-arc-cream/92 sm:text-[0.9375rem] md:text-base md:leading-relaxed lg:text-[1.0625rem] lg:leading-relaxed",
  "max-w-md md:max-w-lg",
  HERO_TYPE_DEPTH,
);

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Keep the full keyword phrase on one line (non-breaking commas / “and”). */
function lockHeroKeywordPhraseOnOneLine(text: string): string {
  return text
    .replace(/,\s+/g, ",\u00a0")
    .replace(/\s+and\s+/gi, "\u00a0and\u00a0")
    .replace(/\s*&\s*/g, "\u00a0&\u00a0");
}

/** One-line keyword row, scales down to fit available width (no clip on narrow phones). */
function HeroKeywordOneLine({
  children,
  allowWrap = false,
}: {
  children: ReactNode;
  allowWrap?: boolean;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (allowWrap) return;
    const line = lineRef.current;
    if (!line) return;

    const fitLine = () => {
      line.style.fontSize = "";
      const maxWidth = line.clientWidth;
      if (maxWidth <= 0) return;

      let sizePx = parseFloat(window.getComputedStyle(line).fontSize);
      const minPx = 11;

      while (line.scrollWidth > maxWidth && sizePx > minPx) {
        sizePx -= 0.5;
        line.style.fontSize = `${sizePx}px`;
      }
    };

    const scheduleFit = () => {
      requestAnimationFrame(fitLine);
    };

    scheduleFit();
    void document.fonts.ready.then(scheduleFit);

    const ro = new ResizeObserver(scheduleFit);
    ro.observe(line);
    window.addEventListener("resize", scheduleFit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleFit);
    };
  }, [children, allowWrap]);

  return (
    <span
      ref={lineRef}
      className={cn(
        "block w-full min-w-0 max-w-full text-center font-sans text-2xl font-medium leading-[1.06] sm:text-3xl md:text-left md:text-[1.85rem] lg:text-4xl",
        allowWrap ? "whitespace-normal text-balance" : "whitespace-nowrap",
      )}
    >
      {children}
    </span>
  );
}

/** Whole-word matches only; longer keywords first for alternation safety. */
function emphasizeTitleWords(
  text: string,
  keywords: readonly string[],
  keywordClassName?: string,
  betweenClassName?: string,
): ReactNode {
  if (!keywords.length) return text;
  const alternation = [...keywords]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
  const re = new RegExp(`\\b(?:${alternation})\\b`, "g");
  const parts: ReactNode[] = [];
  let last = 0;
  let kwKey = 0;
  let plainKey = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      const chunk = text.slice(last, m.index);
      if (chunk) {
        parts.push(
          betweenClassName ? (
            <span key={`hero-plain-${plainKey++}`} className={betweenClassName}>
              {chunk}
            </span>
          ) : (
            chunk
          ),
        );
      }
    }
    parts.push(
      <TitleEmphasis key={`hero-kw-${kwKey++}`} className={keywordClassName}>
        {m[0]}
      </TitleEmphasis>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    const tail = text.slice(last);
    if (tail) {
      parts.push(
        betweenClassName ? (
          <span key={`hero-plain-${plainKey++}`} className={betweenClassName}>
            {tail}
          </span>
        ) : (
          tail
        ),
      );
    }
  }
  return parts.length ? parts : text;
}

/**
 * If the title tail ends with a final `Word.`, return that word for its own line (hero stack).
 */
function splitTitleRestForClosingLine(rest: string): { lead: string; closing: string | null } {
  const trimmed = rest.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) return { lead: trimmed, closing: null };
  const last = words[words.length - 1] ?? "";
  if (!last.endsWith(".")) return { lead: trimmed, closing: null };
  return {
    lead: words.slice(0, -1).join(" "),
    closing: last,
  };
}

type ScrollExpandHeroProps = {
  /** Full-bleed hero photography, scales with scroll (replaces former center frame + secondary back layer). */
  bgImageSrc: string;
  title: string;
  /** Plain string or rich nodes (e.g. `<strong>` for emphasis). */
  intro: ReactNode;
  textBlend?: boolean;
  /** Words in the title (after the first line) to render in signature script. Omit to use ARC defaults. */
  titleKeywords?: readonly string[];
  /** Bottom teal keyword marquee, off on homepage reference layout. */
  showKeywordMarquee?: boolean;
  /** Render the headline / intro / CTAs. Off = image-only hero (e.g. About page). */
  showCopy?: boolean;
  /** Small uppercase kicker above the overlay heading (e.g. "Our story"). */
  overlayEyebrow?: string;
  /** Signature-script heading overlaid on the image (e.g. "About Us"). Independent of `showCopy`. */
  overlayHeading?: string;
  /** Cream feather at the hero's bottom edge, soft handoff into the next section. */
  bottomSeam?: boolean;
  /** Disable the scroll-driven zoom + pin — background stays static (no scale). */
  staticBackground?: boolean;
  /** Background is a light surface (e.g. cream texture): charcoal/teal copy, no dark scrim. */
  lightSurface?: boolean;
  /** Center the hero copy on md+ (defaults to the left reference stack). */
  centerCopy?: boolean;
  /** Match client reference mockup, cream script, left stack, light overlay. */
  referenceLayout?: boolean;
  /** Staggered mount-time copy reveal (homepage hero — syncs with intro preloader). */
  copyReveal?: boolean;
};

/**
 * Hero expand animation driven by scroll progress inside the pinned block (ensemble / Locomotive model).
 */
function useArcHeroCopyRevealReady(enabled: boolean) {
  const [ready, setReady] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setReady(true);
      return;
    }

    setReady(false);
    const html = document.documentElement;

    // Unlock as soon as the preloader begins its exit fade ("exiting") rather
    // than waiting for it to be fully removed — so the hero copy reveals in sync
    // with the background instead of lagging ~900ms behind it.
    const unlock = () => {
      if (html.getAttribute("data-arc-intro") !== "active") setReady(true);
    };

    unlock();
    const observer = new MutationObserver(unlock);
    observer.observe(html, { attributes: true, attributeFilter: ["data-arc-intro"] });
    const fallback = window.setTimeout(unlock, 5500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [enabled]);

  return ready;
}

export function ScrollExpandHero({
  bgImageSrc,
  title,
  intro,
  textBlend,
  titleKeywords = DEFAULT_HERO_TITLE_KEYWORDS,
  showKeywordMarquee = true,
  showCopy = true,
  overlayEyebrow,
  overlayHeading,
  bottomSeam = false,
  staticBackground = false,
  lightSurface = false,
  centerCopy = false,
  referenceLayout = false,
  copyReveal = false,
}: ScrollExpandHeroProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const copyRevealReady = useArcHeroCopyRevealReady(copyReveal);

  const heroRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const heroScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const heroImageReadyRef = useRef(false);

  useLayoutEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motionMq.matches);

    syncMotion();
    motionMq.addEventListener("change", syncMotion);

    return () => {
      motionMq.removeEventListener("change", syncMotion);
    };
  }, []);

  useLayoutEffect(() => {
    const bg = heroBgRef.current;
    if (!bg) return;
    bg.style.transformOrigin = "center center";
    bg.style.transform = reduceMotion && !staticBackground ? "scale(1.42)" : "scale(1)";
  }, [reduceMotion, staticBackground]);

  useEffect(() => {
    if (reduceMotion || staticBackground) return;

    let revert: (() => void) | null = null;
    let cancelled = false;
    heroImageReadyRef.current = false;

    const applyHeroProgress = (p: number) => {
      const scale = 1 + p * 0.42;
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `scale(${scale})`;
      }
    };

    const refreshHeroScrollTrigger = () => {
      const st = heroScrollTriggerRef.current;
      if (!st) return;
      st.refresh();
      applyHeroProgress(st.progress);
    };

    const setup = () => {
      if (cancelled) return;
      const hero = heroRef.current;
      if (!hero) return;

      const scroller = getArcScrollTriggerScroller();
      const endDist = () => getArcScrollViewportHeight(scroller);

      let heroTrigger: ScrollTrigger | undefined;

      const ctx = gsap.context(() => {
        heroTrigger = ScrollTrigger.create({
          trigger: hero,
          ...arcScrollTriggerScrollerProps(),
          ...arcScrollTriggerPinOptions(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: arcScrollScrubLag(),
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => applyHeroProgress(self.progress),
        });
      }, hero);

      heroScrollTriggerRef.current = heroTrigger ?? null;

      revert = () => {
        heroScrollTriggerRef.current = null;
        ctx.revert();
      };
      applyHeroProgress(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => refreshHeroScrollTrigger());
      });
    };

    const unregisterReady = whenArcLocomotiveReady(setup);
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 2000);

    let resizeTimer: number | undefined;
    const onLayoutChange = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (cancelled || !heroScrollTriggerRef.current) return;
        resizeArcScrollViewport();
        refreshHeroScrollTrigger();
      }, 100);
    };

    const main = document.getElementById("main");
    const resizeObserver =
      main && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(onLayoutChange)
        : null;
    if (main && resizeObserver) resizeObserver.observe(main);
    window.addEventListener("resize", onLayoutChange, { passive: true });
    window.visualViewport?.addEventListener("resize", onLayoutChange);

    return () => {
      cancelled = true;
      unregisterReady();
      window.clearTimeout(fallback);
      window.clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", onLayoutChange);
      window.visualViewport?.removeEventListener("resize", onLayoutChange);
      revert?.();
    };
  }, [reduceMotion, bgImageSrc, staticBackground]);

  const handleHeroImageReady = () => {
    if (heroImageReadyRef.current) return;
    heroImageReadyRef.current = true;
    const st = heroScrollTriggerRef.current;
    if (!st) return;
    st.refresh();
    const bg = heroBgRef.current;
    if (bg) {
      bg.style.transform = `scale(${1 + st.progress * 0.42})`;
    }
  };

  const firstWord = title.split(" ")[0] ?? "";
  const restOfTitle = title.split(" ").slice(1).join(" ");
  const { lead: restLead, closing: restClosing } =
    splitTitleRestForClosingLine(restOfTitle);
  const restForEmphasis = lockHeroKeywordPhraseOnOneLine(
    restClosing ? restLead : restOfTitle,
  );
  const connectorClass = referenceLayout ? HERO_REF_CONNECTOR_CLASS : HERO_TITLE_CONNECTOR_CLASS;
  const keywordClass = referenceLayout
    ? HERO_REF_KEYWORD_LINE_CLASS
    : textBlend
      ? HERO_TITLE_KEYWORD_BLEND_AS_LINE_BODY_CLASS
      : HERO_TITLE_KEYWORD_AS_LINE_BODY_CLASS;
  const restWithEmphasis = referenceLayout
    ? null
    : emphasizeTitleWords(restForEmphasis, titleKeywords, keywordClass, connectorClass);

  const heroTitleClosingLineClass = cn(
    "block w-full max-w-[min(100%,42rem)] text-center font-sans leading-snug sm:max-w-[min(100%,44rem)] md:text-left md:leading-snug lg:max-w-[min(100%,48rem)] lg:leading-snug",
    referenceLayout
      ? "text-2xl font-medium sm:text-3xl md:text-[1.75rem] lg:text-[2rem]"
      : "text-2xl font-semibold sm:text-3xl md:text-[1.85rem] lg:text-4xl",
    connectorClass,
  );

  const heroLeadWordClass = cn(
    "block font-sans leading-[1.08]",
    referenceLayout
      ? "text-lg font-normal sm:text-xl md:text-[1.25rem]"
      : "text-xl font-medium sm:text-2xl md:text-[1.65rem] lg:text-[1.75rem]",
    connectorClass,
  );

  return (
    <div className="overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section
        ref={heroRef}
        data-arc-marketing-hero
        className={cn(
          "relative flex h-[100dvh] min-h-[100dvh] flex-col items-center justify-start",
          !showKeywordMarquee && showCopy && "max-md:h-auto max-md:min-h-[88dvh] max-md:pb-4",
        )}
      >
        <div
          className={cn(
            "relative flex h-full min-h-0 w-full flex-col items-center overflow-hidden",
            !showKeywordMarquee && showCopy ? "max-md:min-h-full" : "",
          )}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div
              ref={heroBgRef}
              data-arc-hero-bg
              className="absolute inset-0 h-full w-full will-change-transform"
            >
              <Image
                src={bgImageSrc}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
                onLoadingComplete={handleHeroImageReady}
              />
            </div>
            {referenceLayout ? (
              lightSurface ? (
                /* Soft cream pocket under the fixed header logo — calms floral noise in the top-left. */
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden
                  style={{
                    background: [
                      "radial-gradient(ellipse 52% 44% at 0% 0%, color-mix(in srgb, var(--arc-cream) 94%, transparent) 0%, color-mix(in srgb, var(--arc-cream) 58%, transparent) 34%, color-mix(in srgb, var(--arc-cream) 18%, transparent) 58%, transparent 74%)",
                      "linear-gradient(135deg, color-mix(in srgb, var(--arc-cream) 55%, transparent) 0%, transparent 28%)",
                    ].join(", "),
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0 hidden bg-gradient-to-r from-black/22 via-black/5 to-transparent md:block"
                  aria-hidden
                />
              )
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/18 to-black/8" />
                <div className="absolute inset-0 bg-black/10" />
              </>
            )}
          </div>

          {overlayHeading ? (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
              <div
                className={cn(
                  "w-full px-5 text-center sm:px-8 md:pl-[clamp(2.75rem,10.5vw,9.5rem)] md:pr-10 md:text-left lg:pl-[clamp(3.5rem,11vw,10rem)] xl:pl-[clamp(4rem,12vw,11rem)]",
                )}
              >
                {overlayEyebrow ? (
                  <ArcTextReveal variant="body" trigger="mount" when>
                    <span
                      className={cn(
                        "mb-3 block font-sans text-xs font-semibold uppercase tracking-[0.22em] text-arc-cream/90 sm:text-sm",
                        HERO_REF_CONNECTOR_SHADOW,
                      )}
                    >
                      {overlayEyebrow}
                    </span>
                  </ArcTextReveal>
                ) : null}
                <ArcTextReveal variant="heading" delayIndex={overlayEyebrow ? 1 : 0} trigger="mount" when>
                  <TitleEmphasis
                    className={cn(
                      "block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-cream",
                      "text-[clamp(4.5rem,17vw,12rem)] max-md:text-[clamp(6.5rem,25vw,10rem)]",
                      HERO_REF_LINE_ALIGN,
                      HERO_REF_CONNECTOR_SHADOW,
                    )}
                  >
                    {overlayHeading}
                  </TitleEmphasis>
                </ArcTextReveal>
              </div>
            </div>
          ) : null}

          <div
            className={cn(
              "relative z-10 flex h-full min-h-0 w-full items-center",
              showKeywordMarquee ? "flex-1" : "min-h-[100dvh]",
              referenceLayout
                ? cn(
                    "justify-center px-5 pt-[max(4.5rem,env(safe-area-inset-top))] sm:px-8 md:justify-start md:pl-[clamp(2.75rem,10.5vw,9.5rem)] md:pr-10 lg:pl-[clamp(3.5rem,11vw,10rem)] xl:pl-[clamp(4rem,12vw,11rem)]",
                    centerCopy && "md:justify-center md:pl-10 lg:pl-10 xl:pl-10",
                    showKeywordMarquee
                      ? "pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-[calc(4rem+env(safe-area-inset-bottom))]"
                      : "pb-12",
                  )
                : cn(
                    "mx-auto flex-col justify-center",
                    ARC_PAGE_RAIL_MAX,
                    "px-6 pt-[max(5.5rem,env(safe-area-inset-top))] md:px-12 lg:px-14",
                    showKeywordMarquee
                      ? "pb-[calc(3.75rem+env(safe-area-inset-bottom))]"
                      : "pb-[max(6.5rem,env(safe-area-inset-bottom))]",
                  ),
              textBlend ? "mix-blend-difference" : "mix-blend-normal",
            )}
          >
            {showCopy ? (
            <div
              className={cn(
                "z-20 flex w-full flex-col",
                referenceLayout
                  ? "max-w-[min(100%,22rem)] sm:max-w-[24rem] md:max-w-[min(34vw,26rem)] lg:max-w-[min(32vw,24.5rem)]"
                  : "max-w-xl gap-4 sm:max-w-2xl sm:gap-5 md:max-w-[34rem] md:gap-6 lg:max-w-[36rem]",
                "max-md:mx-auto max-md:items-center max-md:text-center md:items-start md:text-left",
                centerCopy && "md:mx-auto md:items-center md:text-center",
                centerCopy && "xl:max-w-none",
                referenceLayout && !lightSurface && HERO_REF_MOBILE_TEXT_SCRIM,
                showKeywordMarquee && referenceLayout && "-translate-y-3 sm:-translate-y-4 md:-translate-y-5",
              )}
            >
              {copyReveal ? (
                <ArcTextReveal
                  variant="heading"
                  trigger="mount"
                  when={copyRevealReady}
                  delayIndex={0}
                >
                  <h1
                    className={cn(
                      "pointer-events-auto m-0 flex w-full min-w-0 max-w-full flex-col",
                      referenceLayout
                        ? "items-center gap-0 text-center leading-none md:items-start md:text-left"
                        : "items-center gap-1 text-center sm:gap-1.5 md:items-start md:gap-2 md:text-left",
                      centerCopy && "md:items-center md:text-center",
                    )}
                  >
                    {referenceLayout ? (
                      <HeroReferenceHeadline
                        light={lightSurface}
                        center={centerCopy}
                        oneLine={centerCopy}
                      />
                    ) : (
                      <>
                        <span className={heroLeadWordClass}>{firstWord}</span>
                        <HeroKeywordOneLine>{restWithEmphasis}</HeroKeywordOneLine>
                        {restClosing ? (
                          <span className={heroTitleClosingLineClass}>{restClosing}</span>
                        ) : null}
                      </>
                    )}
                  </h1>
                </ArcTextReveal>
              ) : (
                <motion.h1
                  className={cn(
                    "pointer-events-auto m-0 flex w-full min-w-0 max-w-full flex-col",
                    referenceLayout
                      ? "items-center gap-0 text-center leading-none md:items-start md:text-left"
                      : "items-center gap-1 text-center sm:gap-1.5 md:items-start md:gap-2 md:text-left",
                    centerCopy && "md:items-center md:text-center",
                  )}
                >
                  {referenceLayout ? (
                    <HeroReferenceHeadline
                      light={lightSurface}
                      center={centerCopy}
                      oneLine={centerCopy}
                    />
                  ) : (
                    <>
                      <span className={heroLeadWordClass}>{firstWord}</span>
                      <HeroKeywordOneLine>{restWithEmphasis}</HeroKeywordOneLine>
                      {restClosing ? (
                        <span className={heroTitleClosingLineClass}>{restClosing}</span>
                      ) : null}
                    </>
                  )}
                </motion.h1>
              )}

              {copyReveal ? (
                <ArcTextReveal
                  variant="body"
                  trigger="mount"
                  when={copyRevealReady}
                  delayIndex={1}
                >
                  <p
                    className={cn(
                      referenceLayout
                        ? lightSurface
                          ? HERO_REF_INTRO_TYPE_LIGHT
                          : HERO_REF_INTRO_TYPE
                        : HERO_INTRO_TYPE,
                      "max-md:mx-auto",
                      centerCopy && "md:mx-auto md:text-center",
                      referenceLayout && "mt-6 md:mt-7",
                    )}
                  >
                    {intro}
                  </p>
                </ArcTextReveal>
              ) : (
                <p
                  className={cn(
                    referenceLayout
                      ? lightSurface
                        ? HERO_REF_INTRO_TYPE_LIGHT
                        : HERO_REF_INTRO_TYPE
                      : HERO_INTRO_TYPE,
                    "max-md:mx-auto",
                    centerCopy && "md:mx-auto md:text-center",
                    referenceLayout && "mt-6 md:mt-7",
                  )}
                >
                  {intro}
                </p>
              )}

              {copyReveal ? (
                <ArcTextReveal
                  variant="body"
                  trigger="mount"
                  when={copyRevealReady}
                  delayIndex={2}
                >
                  <div
                    className={cn(
                      "pointer-events-auto flex w-full max-w-full flex-col items-stretch gap-2 max-md:gap-2 md:w-max md:flex-row md:flex-nowrap md:items-center md:justify-start md:gap-2",
                      centerCopy && "md:mx-auto md:justify-center",
                      referenceLayout && "mt-6 md:mt-7",
                    )}
                  >
                    <Link
                      href={siteMeta.bookingUrl}
                      className={cn(
                        lightSurface ? heroPrimaryCtaClassLight : heroPrimaryCtaClass,
                        "w-full justify-center md:w-auto",
                      )}
                      {...bookingLinkExternalProps(siteMeta.bookingUrl)}
                    >
                      Begin your Journey
                    </Link>
                    <Link
                      href={homeHeroSecondaryCta.href}
                      className={cn(
                        lightSurface ? heroSecondaryCtaClassLight : heroSecondaryCtaClass,
                        "w-full justify-center md:w-auto",
                      )}
                    >
                      {homeHeroSecondaryCta.label}
                    </Link>
                  </div>
                </ArcTextReveal>
              ) : (
                <div
                  className={cn(
                    "pointer-events-auto flex w-full max-w-full flex-col items-stretch gap-2 max-md:gap-2 md:w-max md:flex-row md:flex-nowrap md:items-center md:justify-start md:gap-2",
                    centerCopy && "md:mx-auto md:justify-center",
                    referenceLayout && "mt-6 md:mt-7",
                  )}
                >
                  <Link
                    href={siteMeta.bookingUrl}
                    className={cn(
                      lightSurface ? heroPrimaryCtaClassLight : heroPrimaryCtaClass,
                      "w-full justify-center md:w-auto",
                    )}
                    {...bookingLinkExternalProps(siteMeta.bookingUrl)}
                  >
                    Begin your Journey
                  </Link>
                  <Link
                    href={homeHeroSecondaryCta.href}
                    className={cn(
                      lightSurface ? heroSecondaryCtaClassLight : heroSecondaryCtaClass,
                      "w-full justify-center md:w-auto",
                    )}
                  >
                    {homeHeroSecondaryCta.label}
                  </Link>
                </div>
              )}
            </div>
            ) : null}
          </div>

          {showKeywordMarquee ? (
            <div className="absolute bottom-0 left-0 right-0 z-[30] w-full max-w-none">
              <HeroKeywordMarquee variant={referenceLayout ? "cream" : "teal"} />
            </div>
          ) : null}

          {bottomSeam ? (
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 z-[30] h-[min(26vh,12rem)]",
                ARC_CREAM_BLUR_GRADIENT_BOTTOM,
                ARC_CREAM_BLUR_MASK_BOTTOM,
              )}
              aria-hidden
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
