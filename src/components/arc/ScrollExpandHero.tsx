"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { images } from "@/content/site";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { arcGlassCtaClass } from "@/lib/arcGlassCta";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HERO_TITLE_KEYWORDS = ["Aesthetics", "Wellness", "Longevity"] as const;
const HERO_AMBIENT_BG = "/assets/decoration/background/ambient-03.png" as const;

/** Bottom-of-hero sliding ticker — brand phrases (reference: bullet-separated marquee bar). */
const HERO_KEYWORD_MARQUEE_ITEMS = [
  "Low Energy & Burnout",
  "Hormonal Imbalance & Weight Gain",
  "Poor Sleep & Recovery",
  "Aging Skin & Body Changes",
  "Brain Fog & Focus Issues",
] as const;

/** Playfair all-caps — on `bg-arc-rose-gold` (same token as hero keyword emphasis). */
const HERO_MARQUEE_LABEL_CLASS =
  "font-serif text-sm font-semibold uppercase tracking-[0.14em] text-arc-charcoal sm:text-base md:text-lg [text-shadow:0_1px_0_rgba(255,255,255,0.42),0_1px_12px_rgba(0,0,0,0.06)]";

const HeroKeywordMarquee = memo(function HeroKeywordMarquee() {
  /**
   * Luminous rose-gold bar (`--arc-rose-gold`, matches hero title keywords) + copy render immediately; horizontal motion waits until fonts + locomotive + ScrollTrigger settle.
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
        "pointer-events-none isolate overflow-hidden border-t border-arc-charcoal/10 bg-arc-rose-gold pb-[max(0.5rem,env(safe-area-inset-bottom))] opacity-0 shadow-[0_-10px_36px_rgba(44,44,44,0.12),0_-2px_24px_var(--arc-rose-gold-glow)] transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-opacity [transform:translateZ(0)]",
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
                <span className="select-none font-sans text-sm font-semibold text-arc-charcoal/50 sm:text-base">
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

/** Keywords: cream line body; connectors: rose-gold (swapped vs legacy hero). */
const HERO_TITLE_KEYWORD_AS_LINE_BODY_CLASS =
  "shrink-0 text-[1.72em] text-[#f7f4ef] sm:text-[1.88em] md:text-[2.08em] lg:text-[2.32em] [text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_52px_rgba(0,0,0,0.35)]";

const HERO_TITLE_KEYWORD_BLEND_AS_LINE_BODY_CLASS =
  "shrink-0 text-[1.64em] text-[#f7f4ef] sm:text-[1.78em] md:text-[1.96em] lg:text-[2.16em] [text-shadow:0_2px_20px_rgba(0,0,0,0.65),0.02em_0_0_rgba(247,244,239,0.35),-0.02em_0_0_rgba(247,244,239,0.35)]";

const HERO_TITLE_CONNECTOR_ROSE_CLASS =
  "text-arc-rose-gold [text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_44px_var(--arc-rose-gold-glow),0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_35%,transparent)]";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
 * Vertex at top-left of SVG; mirror for other corners.
 */
function HeroIntroCornerOrnament() {
  return (
    <svg
      viewBox="0 0 96 96"
      className="h-[3.5rem] w-[3.5rem] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:h-[3.85rem] sm:w-[3.85rem] md:h-[4.25rem] md:w-[4.25rem]"
      fill="none"
      aria-hidden
    >
      <g className="stroke-arc-rose-gold" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer L */}
        <path
          d="M 14 14 H 62 C 72 14 78 18 80 26 C 82 32 78 38 72 36"
          strokeWidth={1.45}
          opacity={0.92}
        />
        <path
          d="M 14 14 V 62 C 14 72 18 78 26 80 C 32 82 38 78 36 72"
          strokeWidth={1.45}
          opacity={0.92}
        />
        {/* Inner L */}
        <path d="M 22 22 H 54 C 62 22 66 26 67 32" strokeWidth={1.05} opacity={0.5} />
        <path d="M 22 22 V 54 C 22 62 26 66 32 67" strokeWidth={1.05} opacity={0.5} />
        {/* Horizontal finial (scroll nub) */}
        <path
          d="M 62 14 C 74 12 82 20 78 30 C 74 38 64 34 60 26"
          strokeWidth={1.2}
          opacity={0.78}
        />
        {/* Vertical finial */}
        <path
          d="M 14 62 C 12 74 20 82 30 78 C 38 74 34 64 26 60"
          strokeWidth={1.2}
          opacity={0.78}
        />
        {/* Tiny quatrefoil knot at the vertex */}
        <path
          d="M 14 11 v 6 M 11 14 h 6 M 12.5 12.5 l 3 3 M 12.5 15.5 l 3 -3"
          strokeWidth={0.9}
          opacity={0.55}
        />
      </g>
    </svg>
  );
}

function HeroIntroOrnamentFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "pointer-events-auto relative isolate max-w-[20rem] sm:max-w-[22rem] md:max-w-[24rem]",
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
  bgImageSrc: string;
  mediaSrc: string;
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
  mediaSrc,
  title,
  intro,
  textBlend,
  titleKeywords = DEFAULT_HERO_TITLE_KEYWORDS,
}: ScrollExpandHeroProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setScrollProgress(1);
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const hero = heroRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!hero || !main) return;

      const endDist = () =>
        main.clientHeight || Math.round(window.innerHeight || 720);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: hero,
          scroller: main,
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
      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 120);
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
  }, [reduceMotion, bgImageSrc, mediaSrc]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const progress = reduceMotion ? 1 : scrollProgress;
  const mediaBaseW = 300;
  const mediaBaseH = 400;
  const mediaWidth = mediaBaseW + progress * (isMobileState ? 650 : 1250);
  const mediaHeight = mediaBaseH + progress * (isMobileState ? 200 : 400);
  const textTranslateX = progress * (isMobileState ? 180 : 150);
  /** Upper headline moves as one unit — avoids “Where” peeling away from the rest with opposite motion. */
  const headlineParallaxX = textTranslateX * 0.22;
  /**
   * Media is center-anchored and grows with scroll; intro (top absolute) + title (large mt) were
   * anchored independently, so one looked like it drifted up and the other down. One shared Y shift
   * keeps copy + CTAs moving together as the clip expands.
   */
  const sharedContentShiftY = (mediaHeight - mediaBaseH) * 0.18;

  const firstWord = title.split(" ")[0] ?? "";
  const restOfTitle = title.split(" ").slice(1).join(" ");
  const { lead: restLead, closing: restClosing } =
    splitTitleRestForClosingLine(restOfTitle);
  const restForEmphasis = restClosing ? restLead : restOfTitle;
  const restWithEmphasis = emphasizeTitleWords(
    restForEmphasis,
    titleKeywords,
    textBlend ? HERO_TITLE_KEYWORD_BLEND_AS_LINE_BODY_CLASS : HERO_TITLE_KEYWORD_AS_LINE_BODY_CLASS,
    HERO_TITLE_CONNECTOR_ROSE_CLASS,
  );

  /** Headline stack layout (middle line keeps cream default for inherited baseline; keywords/connectors override). */
  const heroTitleLineLayoutClass =
    "flex w-full max-w-[min(100%,38rem)] flex-wrap items-baseline justify-start gap-x-0 gap-y-1 text-left font-serif text-2xl font-bold leading-snug sm:max-w-[min(100%,40rem)] sm:text-3xl md:text-[1.85rem] md:leading-snug lg:max-w-[44rem] lg:text-4xl lg:leading-snug";

  const titleLine2and3ClassTop = cn(heroTitleLineLayoutClass, "text-[#f7f4ef]");

  /** Closing line (“Converge.”) — rose-gold stack to match connectors + framed intro. */
  const heroTitleClosingLineClass = cn(heroTitleLineLayoutClass, HERO_TITLE_CONNECTOR_ROSE_CLASS);

  /** Lead word — rose-gold to match hero connectors + ornament intro. */
  const heroLeadWordClass = cn(
    "block font-serif text-2xl font-bold leading-[1.08] sm:text-3xl md:text-3xl lg:text-4xl",
    HERO_TITLE_CONNECTOR_ROSE_CLASS,
  );

  return (
    <div className="overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section
        ref={heroRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-start"
      >
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <div className="absolute inset-0 z-0 h-full">
            <Image
              src={HERO_AMBIENT_BG}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <motion.div
            className="absolute inset-0 z-[1] h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - progress }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              className="h-full min-h-[100dvh] w-full max-w-none object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>

          <div
            className={cn(
              "relative z-10 mx-auto flex w-full flex-col items-center justify-start",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-60 z-20 flex flex-col gap-5 px-6 sm:top-64 sm:gap-6 md:top-72 md:gap-7 md:px-12 lg:top-[18.25rem]"
              style={{
                transform: `translate3d(0, ${sharedContentShiftY}px, 0)`,
              }}
            >
              <motion.h1
                className="pointer-events-auto m-0 flex w-full min-w-0 flex-col gap-1.5 text-left sm:max-w-[min(100%,46rem)] sm:gap-2 md:gap-2"
                style={{
                  transform: `translate3d(${headlineParallaxX}px, 0, 0)`,
                }}
              >
                <span className={heroLeadWordClass}>{firstWord}</span>
                <span className={titleLine2and3ClassTop}>{restWithEmphasis}</span>
                {restClosing ? (
                  <span className={heroTitleClosingLineClass}>{restClosing}</span>
                ) : null}
              </motion.h1>
              <div className="pointer-events-auto mt-1 flex w-full max-w-[min(100%,46rem)] flex-col items-start gap-3 sm:mt-2 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2">
                <Link href="#book" className={arcGlassCtaClass}>
                  Begin your Journey
                </Link>
                <Link href="#path" className={arcGlassCtaClass}>
                  See How it Works
                </Link>
              </div>
            </div>

            <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center pt-12 md:pt-8">
              <div
                className="absolute left-1/2 top-[52%] z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-none md:top-1/2"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.35)",
                }}
              >
                <div className="relative size-full">
                  <Image
                    src={mediaSrc}
                    alt=""
                    width={1280}
                    height={720}
                    className="size-full rounded-xl object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-black/45"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.55 - progress * 0.25 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>

              <div
                className={cn(
                  "relative z-10 mt-[min(28vh,200px)] flex w-full flex-col items-end px-4 sm:px-8 md:mt-[min(24vh,180px)] md:px-12 lg:px-14",
                  textBlend ? "mix-blend-difference" : "mix-blend-normal",
                )}
                style={{
                  transform: `translate3d(0, ${sharedContentShiftY}px, 0)`,
                }}
              >
                <HeroIntroOrnamentFrame>
                  <p
                    className={cn(
                      "text-left font-sans text-sm font-semibold leading-relaxed md:text-base [&_strong]:font-bold",
                      HERO_TITLE_CONNECTOR_ROSE_CLASS,
                      "[&_strong]:text-arc-rose-gold",
                    )}
                  >
                    {intro}
                  </p>
                </HeroIntroOrnamentFrame>
              </div>

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
