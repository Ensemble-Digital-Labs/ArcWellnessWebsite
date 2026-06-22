"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { memo, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import {
  arcScrollTriggerPinOptions,
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { arcGlassCtaClass } from "@/lib/arcGlassCta";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HERO_TITLE_KEYWORDS = ["Wellness", "Longevity", "Aesthetics"] as const;

/** Bottom-of-hero sliding ticker — brand phrases (reference: bullet-separated marquee bar). */
const HERO_KEYWORD_MARQUEE_ITEMS = [
  "Low Energy & Burnout",
  "Hormonal Imbalance",
  "Weight Gain",
  "Poor Sleep & Recovery",
  "Aging Skin & Body Changes",
  "Brain Fog & Focus",
] as const;

/** Playfair all-caps — on `bg-arc-teal` (signature brand bar). */
const HERO_MARQUEE_LABEL_CLASS =
  "font-serif text-sm font-semibold uppercase tracking-[0.14em] text-white sm:text-base md:text-lg [text-shadow:0_1px_2px_rgba(44,44,44,0.22),0_1px_8px_rgba(0,0,0,0.12)]";

const HeroKeywordMarquee = memo(function HeroKeywordMarquee() {
  /**
   * Signature teal bar (`--arc-teal`) + copy render immediately; horizontal motion waits until fonts + locomotive + ScrollTrigger settle.
   */
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

    /** Past locomotive’s deferred `ScrollTrigger.refresh` / resize bursts (~400–1600ms after init). */
    const scheduleAfterScrollStable = () => {
      window.clearTimeout(stableTimer);
      stableTimer = window.setTimeout(enableMotion, 1400);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setMarqueeOn(true);
      return () => {
        cancelled = true;
      };
    }

    let fontsReady = false;
    let scrollReady = false;

    const tryScheduleMarquee = () => {
      if (cancelled || !fontsReady || !scrollReady) return;
      scheduleAfterScrollStable();
    };

    let locoHandled = false;
    const onLocomotiveReady = () => {
      if (locoHandled) return;
      locoHandled = true;
      scrollReady = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onLocomotiveReady as EventListener);
      tryScheduleMarquee();
    };

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onLocomotiveReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      queueMicrotask(onLocomotiveReady);
    }

    void document.fonts.ready.then(() => {
      if (cancelled) return;
      fontsReady = true;
      tryScheduleMarquee();
    });

    /** Locomotive mounts ~450ms in; if the ready event is missed, assume scroll proxy is up after this window. */
    const locoFallback = window.setTimeout(() => {
      if (!cancelled && !locoHandled) onLocomotiveReady();
    }, 3200);

    const absoluteFallback = window.setTimeout(() => {
      if (cancelled) return;
      if (!fontsReady) fontsReady = true;
      if (!scrollReady) scrollReady = true;
      tryScheduleMarquee();
    }, 7200);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onLocomotiveReady as EventListener);
      window.clearTimeout(stableTimer);
      window.clearTimeout(locoFallback);
      window.clearTimeout(absoluteFallback);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none isolate overflow-hidden border-t border-white/15 bg-arc-teal pb-[max(0.5rem,env(safe-area-inset-bottom))] opacity-0 shadow-[0_-10px_36px_rgba(44,44,44,0.12),0_-2px_24px_var(--arc-teal-glow)] transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-opacity [transform:translateZ(0)]",
        marqueeOn && "opacity-100",
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex items-center gap-8 whitespace-nowrap py-2.5 sm:gap-11 sm:py-3",
          marqueeOn && "animate-arc-marquee",
        )}
        style={{ width: "max-content" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} className="inline-flex shrink-0 items-center gap-8 sm:gap-11">
            {HERO_KEYWORD_MARQUEE_ITEMS.map((label) => (
              <span key={`${dup}-${label}`} className="inline-flex shrink-0 items-center gap-8 sm:gap-11">
                <span className={HERO_MARQUEE_LABEL_CLASS}>{label}</span>
                <span className="select-none font-sans text-sm font-semibold text-white/55 sm:text-base">
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
 * Hero on bright photography — dark fill + light outline reads on sunlit walls and glass;
 * script keywords use larger teal accent so they pop against serif connectors.
 */
const HERO_READABLE_SHADOW =
  "[text-shadow:-1px_-1px_0_rgba(255,255,255,0.98),1px_-1px_0_rgba(255,255,255,0.98),-1px_1px_0_rgba(255,255,255,0.98),1px_1px_0_rgba(255,255,255,0.98),0_2px_10px_rgba(255,255,255,0.8),0_3px_14px_rgba(0,0,0,0.32)]";

const HERO_READABLE_TYPE = cn("text-[#141414]", HERO_READABLE_SHADOW);

/** Birthstone keywords — large script accent; parent row scales down only when width requires it. */
const HERO_TITLE_KEYWORD_AS_LINE_BODY_CLASS = cn(
  "text-[1.92em] sm:text-[2.14em] md:text-[2.38em] lg:text-[2.62em]",
  "text-arc-teal-ink",
  HERO_READABLE_SHADOW,
  "[-webkit-text-stroke:0.045em_rgba(255,255,255,0.9)] [paint-order:stroke_fill]",
);

const HERO_TITLE_KEYWORD_BLEND_AS_LINE_BODY_CLASS = cn(
  "text-[1.84em] sm:text-[2.05em] md:text-[2.28em] lg:text-[2.48em]",
  "text-arc-teal-ink",
  HERO_READABLE_SHADOW,
  "[-webkit-text-stroke:0.045em_rgba(255,255,255,0.9)] [paint-order:stroke_fill]",
);

/** Serif connectors + lead/closing — charcoal with light outline. */
const HERO_TITLE_CONNECTOR_CLASS = cn("font-serif font-bold", HERO_READABLE_TYPE);

const HERO_INTRO_TYPE = cn(
  "text-center font-sans text-base font-semibold leading-relaxed max-md:mx-auto md:text-left md:text-lg lg:text-xl [&_strong]:font-bold",
  HERO_READABLE_TYPE,
  "[&_strong]:text-arc-teal-ink",
);

/** Frosted pills on bright hero — dark label for contrast (does not change other sections). */
const HERO_GLASS_CTA_CLASS = cn(
  arcGlassCtaClass,
  "border-arc-charcoal/22 bg-white/62 text-arc-charcoal hover:border-arc-charcoal/38 hover:bg-white/78",
  "focus-visible:ring-offset-arc-cream/80",
);

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Keep the full keyword phrase on one line (non-breaking commas / “and”). */
function lockHeroKeywordPhraseOnOneLine(text: string): string {
  return text.replace(/,\s+/g, ",\u00a0").replace(/\s+and\s+/gi, "\u00a0and\u00a0");
}

/** One-line keyword row — scales down to fit available width (no clip on narrow phones). */
function HeroKeywordOneLine({ children }: { children: ReactNode }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
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
  }, [children]);

  return (
    <span
      ref={lineRef}
      className="block w-full min-w-0 max-w-full whitespace-nowrap text-center font-serif text-2xl font-bold leading-[1.06] sm:text-3xl md:text-left md:text-[1.85rem] lg:text-4xl"
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

/**
 * Ornate frame corner (clip-art / certificate style): double-line L with scroll finials.
 * Dark stroke + light halo — matches hero intro copy on bright photography.
 */
function HeroIntroCornerOrnament() {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-[3.5rem] w-[3.5rem] [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.98))_drop-shadow(0_1px_3px_rgba(255,255,255,0.88))_drop-shadow(0_2px_12px_rgba(0,0,0,0.42))] sm:h-[3.85rem] sm:w-[3.85rem] md:h-[4.25rem] md:w-[4.25rem]"
      fill="none"
      aria-hidden
    >
      <g className="stroke-[#141414]" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer L */}
        <path
          d="M 14 14 H 62 C 72 14 78 18 80 26 C 82 32 78 38 72 36"
          strokeWidth={1.85}
          opacity={0.98}
        />
        <path
          d="M 14 14 V 62 C 14 72 18 78 26 80 C 32 82 38 78 36 72"
          strokeWidth={1.85}
          opacity={0.98}
        />
        {/* Inner L */}
        <path d="M 22 22 H 54 C 62 22 66 26 67 32" strokeWidth={1.35} opacity={0.72} />
        <path d="M 22 22 V 54 C 22 62 26 66 32 67" strokeWidth={1.35} opacity={0.72} />
        {/* Horizontal finial (scroll nub) */}
        <path
          d="M 62 14 C 74 12 82 20 78 30 C 74 38 64 34 60 26"
          strokeWidth={1.45}
          opacity={0.92}
        />
        {/* Vertical finial */}
        <path
          d="M 14 62 C 12 74 20 82 30 78 C 38 74 34 64 26 60"
          strokeWidth={1.45}
          opacity={0.92}
        />
        {/* Tiny quatrefoil knot at the vertex */}
        <path
          d="M 14 11 v 6 M 11 14 h 6 M 12.5 12.5 l 3 3 M 12.5 15.5 l 3 -3"
          strokeWidth={1.1}
          opacity={0.78}
        />
      </g>
    </svg>
  );
}

function HeroIntroOrnamentFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "pointer-events-auto relative isolate w-full max-w-[min(100%,22rem)] sm:max-w-[24rem] md:max-w-[27rem]",
      )}
    >
      {/* Two corners only — top-right & bottom-left (mirror of the other pair). */}
      <span className="pointer-events-none absolute right-0 top-0 scale-x-[-1]">
        <HeroIntroCornerOrnament />
      </span>
      <span className="pointer-events-none absolute bottom-0 left-0 scale-y-[-1]">
        <HeroIntroCornerOrnament />
      </span>
      {/* Generous inset so flourishes sit clearly away from the copy */}
      <div className="relative z-10 px-7 pb-9 pt-7 sm:px-9 sm:pb-11 sm:pt-9 md:px-10 md:pb-12 md:pt-10">
        {children}
      </div>
    </div>
  );
}

type ScrollExpandHeroProps = {
  /** Full-bleed hero photography — scales with scroll (replaces former center frame + secondary back layer). */
  bgImageSrc: string;
  title: string;
  /** Plain string or rich nodes (e.g. `<strong>` for emphasis). */
  intro: ReactNode;
  textBlend?: boolean;
  /** Words in the title (after the first line) to render in signature script. Omit to use ARC defaults. */
  titleKeywords?: readonly string[];
};

/**
 * Hero expand animation driven by scroll progress inside the pinned block (ensemble / Locomotive model).
 */
export function ScrollExpandHero({
  bgImageSrc,
  title,
  intro,
  textBlend,
  titleKeywords = DEFAULT_HERO_TITLE_KEYWORDS,
}: ScrollExpandHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  /** SSR + first client paint must match — viewport is read only after hydration. */
  const [isMobileState, setIsMobileState] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const mobileLayout = hasHydrated && isMobileState;

  useLayoutEffect(() => {
    setHasHydrated(true);

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMobile = () => setIsMobileState(mobileMq.matches);
    const syncMotion = () => setReduceMotion(motionMq.matches);

    syncMobile();
    syncMotion();

    mobileMq.addEventListener("change", syncMobile);
    motionMq.addEventListener("change", syncMotion);

    return () => {
      mobileMq.removeEventListener("change", syncMobile);
      motionMq.removeEventListener("change", syncMotion);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setScrollProgress(1);
    } else if (isMobileState) {
      setScrollProgress(0);
    }
  }, [reduceMotion, isMobileState]);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(max-width: 767px)").matches) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const refreshAllScrollTriggers = () => {
      ScrollTrigger.refresh();
    };

    const setup = () => {
      if (cancelled) return;
      const hero = heroRef.current;
      if (!hero) return;

      const scroller = getArcScrollTriggerScroller();
      const endDist = () => getArcScrollViewportHeight(scroller);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: hero,
          ...arcScrollTriggerScrollerProps(),
          ...arcScrollTriggerPinOptions(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        });
      }, hero);

      revert = () => ctx.revert();
      requestAnimationFrame(refreshAllScrollTriggers);
      window.setTimeout(refreshAllScrollTriggers, 120);
      /** Hero pin must exist before downstream pinned sections (concerns → welcome) measure scroll distance. */
      window.setTimeout(refreshAllScrollTriggers, 450);
    };

    const onReady = () => queueMicrotask(setup);

    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);

    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      onReady();
    }

    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [reduceMotion, isMobileState, bgImageSrc]);

  const progress = reduceMotion ? 1 : mobileLayout ? 0 : scrollProgress;
  /** Full-bleed background zoom — was previously a separate center frame. */
  const bgScale = mobileLayout ? 1 : 1 + progress * 0.42;
  const textTranslateX = progress * (mobileLayout ? 180 : 150);
  /** Upper headline moves as one unit — avoids “Where” peeling away from the rest with opposite motion. */
  const headlineParallaxX = textTranslateX * 0.22;
  const sharedContentShiftY = progress * (mobileLayout ? 12 : 48);

  const firstWord = title.split(" ")[0] ?? "";
  const restOfTitle = title.split(" ").slice(1).join(" ");
  const { lead: restLead, closing: restClosing } =
    splitTitleRestForClosingLine(restOfTitle);
  const restForEmphasis = lockHeroKeywordPhraseOnOneLine(
    restClosing ? restLead : restOfTitle,
  );
  const restWithEmphasis = emphasizeTitleWords(
    restForEmphasis,
    titleKeywords,
    textBlend ? HERO_TITLE_KEYWORD_BLEND_AS_LINE_BODY_CLASS : HERO_TITLE_KEYWORD_AS_LINE_BODY_CLASS,
    HERO_TITLE_CONNECTOR_CLASS,
  );

  /** Closing line (“Converge.”) — matches lead + connectors for legibility. */
  const heroTitleClosingLineClass = cn(
    "block w-full max-w-[min(100%,42rem)] text-center font-serif text-2xl font-bold leading-snug sm:max-w-[min(100%,44rem)] sm:text-3xl md:text-left md:text-[1.85rem] md:leading-snug lg:max-w-[min(100%,48rem)] lg:text-4xl lg:leading-snug",
    HERO_TITLE_CONNECTOR_CLASS,
  );

  /** Lead word — same readable stack as the rest of the headline. */
  const heroLeadWordClass = cn(
    "block font-serif text-2xl font-bold leading-[1.08] sm:text-3xl md:text-3xl lg:text-4xl",
    HERO_TITLE_CONNECTOR_CLASS,
  );

  return (
    <div className="overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section
        ref={heroRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-start max-md:min-h-[88dvh] max-md:pb-4"
      >
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center overflow-hidden max-md:min-h-full">
          <div className="absolute inset-0 z-0 h-full overflow-hidden">
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `scale(${bgScale})`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={bgImageSrc}
                alt=""
                width={1920}
                height={1080}
                className="h-full min-h-[100dvh] w-full max-w-none object-cover object-center"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div
            className={cn(
              "relative z-10 mx-auto flex w-full flex-col items-center justify-start",
              ARC_PAGE_RAIL_MAX,
              "max-md:pb-28 md:min-h-[100dvh]",
            )}
          >
            {/* Headline + CTAs — stacked in flow on mobile; absolute on md+ */}
            <div
              className={cn(
                "z-20 flex w-full flex-col gap-3 px-6",
                "max-md:relative max-md:shrink-0 max-md:items-center max-md:pt-[7.25rem]",
                "md:pointer-events-none md:absolute md:inset-x-0 md:top-64 md:gap-7 md:px-12 lg:top-[16.25rem]",
              )}
              style={{
                transform: mobileLayout
                  ? undefined
                  : `translate3d(0, ${sharedContentShiftY}px, 0)`,
              }}
            >
              <motion.h1
                className="pointer-events-auto m-0 flex w-full min-w-0 max-w-full flex-col items-center gap-1.5 text-center sm:max-w-[min(100%,46rem)] sm:gap-2 md:items-start md:gap-2 md:text-left"
                style={
                  mobileLayout
                    ? undefined
                    : { transform: `translate3d(${headlineParallaxX}px, 0, 0)` }
                }
              >
                <span className={heroLeadWordClass}>{firstWord}</span>
                <HeroKeywordOneLine>{restWithEmphasis}</HeroKeywordOneLine>
                {restClosing ? (
                  <span className={heroTitleClosingLineClass}>{restClosing}</span>
                ) : null}
              </motion.h1>
              <div className="pointer-events-auto flex w-full max-w-[min(100%,46rem)] flex-col gap-2.5 max-md:mx-auto max-md:items-center max-md:justify-center sm:mt-2 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2 md:items-start md:justify-start">
                <Link href="/book" className={cn(HERO_GLASS_CTA_CLASS, "max-md:justify-center")}>
                  Begin your Journey
                </Link>
                <Link href="#path" className={cn(HERO_GLASS_CTA_CLASS, "max-md:justify-center")}>
                  See How it Works
                </Link>
              </div>
            </div>

            <div
              className={cn(
                "relative flex w-full flex-col",
                "max-md:items-center max-md:gap-6 max-md:px-6 max-md:pb-2 max-md:pt-2",
                "md:absolute md:inset-x-0 md:bottom-[calc(11.5rem+env(safe-area-inset-bottom))] md:items-end md:px-12 lg:bottom-[calc(13rem+env(safe-area-inset-bottom))] lg:px-14",
                textBlend ? "mix-blend-difference" : "mix-blend-normal",
              )}
              style={
                mobileLayout
                  ? undefined
                  : { transform: `translate3d(0, ${sharedContentShiftY}px, 0)` }
              }
            >
              <HeroIntroOrnamentFrame>
                <p className={HERO_INTRO_TYPE}>{intro}</p>
              </HeroIntroOrnamentFrame>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-[30] w-full max-w-none">
            <HeroKeywordMarquee />
          </div>
        </div>
      </section>
    </div>
  );
}
