"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HERO_TITLE_KEYWORDS = ["Aesthetics", "Wellness", "Longevity"] as const;

/** Larger serif line: parent uses flex + items-baseline so script scales with the white words. */
const HERO_TITLE_KEYWORD_EMPHASIS_CLASS =
  "shrink-0 text-[1.55em] text-arc-teal sm:text-[1.68em] md:text-[1.86em] lg:text-[2.05em] [text-shadow:0_2px_22px_rgba(0,0,0,0.55),0_0_40px_rgba(118,179,168,0.38)]";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Whole-word matches only; longer keywords first for alternation safety. */
function emphasizeTitleWords(
  text: string,
  keywords: readonly string[],
  emphasisClassName?: string,
): ReactNode {
  if (!keywords.length) return text;
  const alternation = [...keywords]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
  const re = new RegExp(`\\b(?:${alternation})\\b`, "g");
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      const chunk = text.slice(last, m.index);
      if (chunk) parts.push(chunk);
    }
    parts.push(
      <TitleEmphasis key={`hero-kw-${key++}`} className={emphasisClassName}>
        {m[0]}
      </TitleEmphasis>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    const tail = text.slice(last);
    if (tail) parts.push(tail);
  }
  return parts.length ? parts : text;
}

type ScrollExpandHeroProps = {
  bgImageSrc: string;
  mediaSrc: string;
  title: string;
  intro: string;
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
  const mediaWidth = 300 + progress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + progress * (isMobileState ? 200 : 400);
  const textTranslateX = progress * (isMobileState ? 180 : 150);

  const firstWord = title.split(" ")[0] ?? "";
  const restOfTitle = title.split(" ").slice(1).join(" ");
  const restWithEmphasis = emphasizeTitleWords(
    restOfTitle,
    titleKeywords,
    textBlend
      ? "shrink-0 text-[1.48em] text-[#f2efe9] sm:text-[1.6em] md:text-[1.76em] lg:text-[1.94em] [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]"
      : HERO_TITLE_KEYWORD_EMPHASIS_CLASS,
  );

  return (
    <div className="overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section
        ref={heroRef}
        className="relative flex min-h-[100dvh] flex-col items-center justify-start"
      >
        <h1 className="sr-only">{title}</h1>
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <motion.div
            className="absolute inset-0 z-0 h-full"
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
            <div className="pointer-events-none absolute left-0 top-40 z-20 max-w-xl px-6 sm:top-44 md:top-48 md:px-12 lg:top-52 lg:max-w-xl">
              <p className="pointer-events-auto mb-8 font-sans text-sm leading-relaxed text-[#f7f4ef]/95 drop-shadow md:text-base">
                {intro}
              </p>
              <Link
                href="#book"
                className="pointer-events-auto inline-block bg-arc-teal px-8 py-3 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-arc-teal-hover"
              >
                Book Now
              </Link>
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
                  "relative z-10 mt-[min(42vh,320px)] flex w-full flex-col items-center justify-center gap-2 px-4 text-center md:mt-[min(38vh,280px)] md:gap-4",
                  textBlend ? "mix-blend-difference" : "mix-blend-normal",
                )}
              >
                <motion.span
                  className="font-serif text-3xl font-semibold leading-tight text-[#f7f4ef] md:text-4xl lg:text-5xl"
                  style={{ transform: `translateX(-${textTranslateX}px)` }}
                >
                  {firstWord}
                </motion.span>
                <motion.span
                  className="flex w-full max-w-[min(100%,44rem)] flex-wrap items-baseline justify-center gap-x-0 gap-y-1 text-center font-serif text-3xl font-semibold leading-snug text-[#f7f4ef] md:max-w-[min(100%,52rem)] md:text-4xl md:leading-snug lg:text-5xl lg:leading-snug"
                  style={{ transform: `translateX(${textTranslateX}px)` }}
                >
                  {restWithEmphasis}
                </motion.span>
              </div>

              <button
                type="button"
                className="absolute bottom-16 right-6 z-20 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#f7f4ef] transition-opacity hover:opacity-90 md:bottom-20 md:right-12 md:text-sm"
              >
                <Play className="size-5 fill-current" aria-hidden />
                Watch our story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
