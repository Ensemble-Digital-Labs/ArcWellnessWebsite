"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";

gsap.registerPlugin(ScrollTrigger);

type ScrollExpandHeroProps = {
  bgImageSrc: string;
  mediaSrc: string;
  title: string;
  intro: string;
  scrollHint?: string;
  textBlend?: boolean;
};

/**
 * Hero expand animation driven by scroll progress inside the pinned block (ensemble / Locomotive model).
 */
export function ScrollExpandHero({
  bgImageSrc,
  mediaSrc,
  title,
  intro,
  scrollHint = "Scroll to explore",
  textBlend,
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
              className="h-screen w-screen max-w-none"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="absolute inset-0 bg-black/35" />
          </motion.div>

          <div className="pointer-events-none absolute left-0 top-8 z-20 max-w-xl px-6 md:top-12 md:px-12 lg:max-w-xl">
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

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-start">
            <div className="relative flex min-h-[calc(100dvh-7.25rem)] w-full flex-col items-center justify-center pt-12 md:pt-8">
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

                <div className="relative z-10 mt-4 flex flex-col items-center text-center transition-none">
                  <p
                    className="font-sans text-sm font-medium text-[#e8f5f2] md:text-base"
                    style={{ transform: `translateX(-${textTranslateX}px)` }}
                  >
                    {scrollHint}
                  </p>
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
                  className="text-center font-serif text-3xl font-semibold leading-tight text-[#f7f4ef] md:text-4xl lg:text-5xl"
                  style={{ transform: `translateX(${textTranslateX}px)` }}
                >
                  {restOfTitle}
                </motion.span>
              </div>

              <button
                type="button"
                className="absolute bottom-10 right-6 z-20 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#f7f4ef] transition-opacity hover:opacity-90 md:bottom-14 md:right-12 md:text-sm"
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
