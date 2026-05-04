"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SeamlessLoopVideo, type SeamlessLoopVideoHandle } from "@/components/arc/SeamlessLoopVideo";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcMicroStatementSectionProps = {
  id?: string;
  className?: string;
  eyebrow?: string;
  headlineBefore: string;
  headlineEmphasis: string;
  headlineAfter?: string;
  uspLine: string;
  linkHref?: string;
  linkLabel?: string;
  /**
   * Full-viewport **pin + scrub** on `#main` (same family as hero / chapter intros).
   * Typography fades and drifts in with scroll progress; omit on secondary micro strips.
   */
  pinnedScrollMotion?: boolean;
  /**
   * When **`pinnedScrollMotion`**: ambient loop under typography (`muted` / `playsInline` / `loop`).
   * Omit or use with **`prefers-reduced-motion`** (falls back to cream only).
   */
  pinnedBackgroundVideoSrc?: string;
  /** Optional poster for video + reduced-motion static backdrop */
  pinnedBackgroundPosterSrc?: string;
};

function headlineAfterNode(headlineAfter: string) {
  if (!headlineAfter) return null;
  if (/^[\u2014\u2013\-.,;:!?]/.test(headlineAfter)) {
    return <span className="font-serif text-arc-charcoal">{headlineAfter}</span>;
  }
  return (
    <>
      {" "}
      <span className="font-serif text-arc-charcoal">{headlineAfter}</span>
    </>
  );
}

/**
 * Minimal block: **catchphrase** (serif + one Birthstone emphasis) + **one USP line** — no body wall.
 * Optional **`pinnedScrollMotion`**: one locked viewport with scrubbed reveal (ensemble `#main` scroller).
 */
export function ArcMicroStatementSection({
  id,
  className,
  eyebrow,
  headlineBefore,
  headlineEmphasis,
  headlineAfter = "",
  uspLine,
  linkHref,
  linkLabel,
  pinnedScrollMotion = false,
  pinnedBackgroundVideoSrc,
  pinnedBackgroundPosterSrc,
}: ArcMicroStatementSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<SeamlessLoopVideoHandle | null>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pinnedScrollMotion) return;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let revert: (() => void) | null = null;
    let cancelled = false;

    const playVideo = () => {
      if (!pinnedBackgroundVideoSrc) return;
      videoRef.current?.play();
    };

    const pauseVideo = () => {
      videoRef.current?.pause();
    };

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!section || !main) return;

      const endDist = () =>
        main.clientHeight || Math.round(window.innerHeight || 720);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          id: "arc-micro-statement-pin",
          trigger: section,
          scroller: main,
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
          // Pinned sections use `position: fixed`; IntersectionObserver with `root: #main`
          // often reports not intersecting while pinned — drive playback from scroll lifecycle instead.
          onEnter: playVideo,
          onEnterBack: playVideo,
          onLeave: pauseVideo,
          onLeaveBack: pauseVideo,
        });
      }, section);

      revert = () => ctx.revert();

      const syncVideoIfPinned = () => {
        ScrollTrigger.refresh();
        const st = ScrollTrigger.getById("arc-micro-statement-pin");
        if (st?.isActive) playVideo();
      };
      requestAnimationFrame(syncVideoIfPinned);
      window.setTimeout(syncVideoIfPinned, 120);
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
  }, [pinnedScrollMotion, reduceMotion, pinnedBackgroundVideoSrc]);

  const p = pinnedScrollMotion && reduceMotion ? 1 : pinnedScrollMotion ? progress : 1;

  const fadeUp = (start: number, speed: number) => {
    if (!pinnedScrollMotion) return { opacity: 1, transform: "translate3d(0,0,0)" };
    const t = Math.min(1, Math.max(0, (p - start) * speed));
    return {
      opacity: t,
      transform: `translate3d(0, ${(1 - t) * 28}px, 0)`,
    };
  };

  const eyebrowMotion = fadeUp(0, 2.75);
  const headlineMotion = fadeUp(0.08, 2.35);
  const uspMotion = fadeUp(0.16, 2.05);
  const linkMotion = fadeUp(0.26, 2.2);
  const bgBreath = pinnedScrollMotion ? Math.min(1, p * 1.15) : 0;

  const inner = (
    <>
      {eyebrow ? (
        <p
          className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-arc-teal sm:text-xs"
          style={pinnedScrollMotion ? eyebrowMotion : undefined}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className="font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-arc-charcoal sm:text-4xl md:text-[2.65rem] md:leading-[1.08]"
        style={pinnedScrollMotion ? headlineMotion : undefined}
      >
        <span className="text-balance">
          {headlineBefore}{" "}
          <TitleEmphasis className="text-[1.38em] leading-[1.05] text-arc-teal sm:text-[1.44em] md:text-[1.52em] lg:text-[1.58em]">
            {headlineEmphasis}
          </TitleEmphasis>
          {headlineAfterNode(headlineAfter)}
        </span>
      </h2>

      <p
        className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-arc-charcoal/82 sm:text-base md:mt-7 md:text-[1.05rem]"
        style={pinnedScrollMotion ? uspMotion : undefined}
      >
        {uspLine}
      </p>

      {linkHref && linkLabel ? (
        <Link
          href={linkHref}
          className="group mt-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-arc-teal transition-colors hover:text-arc-teal-hover sm:mt-10 sm:text-sm"
          style={pinnedScrollMotion ? linkMotion : undefined}
        >
          {linkLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </Link>
      ) : null}
    </>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        pinnedScrollMotion && pinnedBackgroundVideoSrc && !reduceMotion
          ? "bg-arc-charcoal"
          : "bg-arc-cream",
        pinnedScrollMotion
          ? "relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-16 md:px-10"
          : "py-24 sm:py-28 md:min-h-[min(62dvh,560px)] md:py-32",
        className,
      )}
    >
      {pinnedScrollMotion ? (
        <>
          {pinnedBackgroundVideoSrc && !reduceMotion ? (
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
              <SeamlessLoopVideo
                ref={videoRef}
                className="z-0 h-full w-full"
                style={{ objectPosition: "50% 42%" }}
                src={pinnedBackgroundVideoSrc}
                poster={pinnedBackgroundPosterSrc}
              />
            </div>
          ) : (
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-arc-cream bg-cover bg-center"
              style={
                pinnedBackgroundPosterSrc
                  ? { backgroundImage: `url(${pinnedBackgroundPosterSrc})` }
                  : undefined
              }
              aria-hidden
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-arc-cream/88 via-arc-cream/72 to-arc-cream/86"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/20 via-transparent to-black/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_65%_at_50%_42%,rgba(118,179,168,0.18),transparent_62%)] transition-opacity duration-300"
            style={{ opacity: 0.28 + bgBreath * 0.4 }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center md:max-w-4xl">
            {inner}
          </div>
        </>
      ) : (
        <div
          data-scroll-section
          className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:max-w-4xl md:px-10"
        >
          {inner}
        </div>
      )}
    </section>
  );
}
