"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { cn } from "@/lib/utils";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { BACKGROUND_DECORATION_IMAGES } from "@/content/backgroundDecoration";

gsap.registerPlugin(ScrollTrigger);

/** Subtle ambient texture for USP stat cells (matches decoration/background pattern). */
const USP_CELL_AMBIENT = BACKGROUND_DECORATION_IMAGES[0];

const USP_ITEMS = [
  { value: "12+", label: "Treatment Modalities" },
  { value: "FDA", label: "Cleared Technology" },
  { value: "0", label: "Membership Required" },
  { value: "Free", label: "Initial Consultation" },
] as const;

const CONCERN_PANELS = [
  {
    title: "Low Energy & Burnout",
    image: "/assets/sections/concerns/concern-low-energy-burnout.png",
    blurb:
      "We connect sleep, stress, hormones, and nutrition so fatigue is understood as a pattern—not dismissed as “just busy.”",
  },
  {
    title: "Hormonal Imbalance & Weight Gain",
    image: "/assets/sections/concerns/concern-hormonal-imbalance-weight-gain.png",
    blurb:
      "Metabolic and hormonal insight paired with lifestyle support, aimed at sustainable change rather than quick fixes.",
  },
  {
    title: "Poor Sleep & Recovery",
    image: "/assets/sections/concerns/concern-poor-sleep-recovery.png",
    blurb:
      "From circadian rhythm to stress load, we map what blocks restorative sleep and recovery in your real life.",
  },
  {
    title: "Aging Skin & Body Changes",
    image: "/assets/sections/concerns/concern-aging-skin-body-changes.png",
    blurb:
      "Evidence-based aesthetics and longevity-aligned care, tuned to how you want to look and feel over time.",
  },
  {
    title: "Brain Fog & Focus Issues",
    image: "/assets/sections/concerns/concern-brain-fog-focus-issues.png",
    blurb:
      "Whole-person assessment to clarify cognition—nutrition, sleep, hormones, and stress—before jumping to stimulants alone.",
  },
] as const;

const CONCERNS_SECTION_BG = "/assets/sections/concerns/concerns-section-background.png";

export function ArcConcernsPinnedSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!section || !main) return;

      const endDist = () =>
        Math.round((main.clientHeight || Math.round(window.innerHeight || 720)) * 0.92);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          id: "arc-concerns-pin",
          trigger: section,
          scroller: main,
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        });
      }, section);

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
  }, [reduceMotion]);

  const p = reduceMotion ? 1 : progress;

  /** USP bar fades and rises in later in the pin scrub so it reads as a second beat. */
  const uspReveal = Math.min(1, Math.max(0, (p - 0.28) / 0.52));

  return (
    <section
      ref={sectionRef}
      className={cn(
        "bg-arc-cream relative flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={CONCERNS_SECTION_BG}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-[50%_40%]"
        />
        {/* Light wash so type and cards stay readable; image remains visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/80 via-arc-cream/55 to-arc-cream/45" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col px-6 pb-4 pt-28 sm:pb-6 sm:pt-32 md:px-10 md:pt-36 lg:pt-40 [@media(max-height:780px)]:pb-3 [@media(max-height:780px)]:pt-20 [@media(max-height:680px)]:pt-16">
          <div
            className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col"
            style={{
              opacity: Math.min(1, p * 1.6),
              transform: `translate3d(0, ${Math.max(0, 26 - p * 26)}px, 0)`,
            }}
          >
            <div className="shrink-0 text-center">
              <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-arc-charcoal sm:text-4xl md:text-[2.65rem] md:leading-[1.08]">
                <span className="text-balance">
                  Your concerns,{" "}
                  <TitleEmphasis className="text-[1.52em] leading-[1.04] text-arc-teal-ink sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]">
                    thoughtfully mapped
                  </TitleEmphasis>
                </span>
              </h2>
            </div>

            <div className="mt-6 flex min-h-0 w-full flex-1 gap-2 overflow-hidden sm:mt-8 md:mt-10 [@media(max-height:780px)]:mt-4 [@media(max-height:680px)]:mt-3">
              {CONCERN_PANELS.map((panel, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={panel.title}
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "group relative h-full min-h-0 min-w-0 overflow-hidden text-left transition-[flex] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal-ink/45",
                      "flex-1 md:flex-[1]",
                      isActive ? "md:flex-[2.8]" : "md:flex-[1]",
                    )}
                    aria-expanded={isActive}
                    aria-label={panel.title}
                  >
                    <Image
                      src={panel.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 18vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/26 to-black/15" />
                    {/*
                      Fixed rem widths (no % of panel) so copy doesn’t re-wrap on every flex frame
                      while the column expands/collapses.
                    */}
                    <div className="absolute bottom-0 left-0 z-10 min-w-0 max-w-[10.5rem] p-3 sm:max-w-[11.5rem] sm:p-4 md:max-w-[12.5rem] md:p-5">
                      <p className="text-pretty text-left font-sans text-xs font-semibold leading-snug text-[#f7f4ef] drop-shadow sm:text-sm md:text-[0.95rem]">
                        {panel.title}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 z-20 min-w-0 max-w-[15rem] p-3 sm:max-w-[16rem] sm:p-4 md:p-5",
                        "[@media(max-height:780px)]:max-w-[14rem] [@media(max-height:780px)]:p-3",
                        /* Open: fade/slide in. Close: no transition — avoids slow fade + blur “ghost” while flex collapses. */
                        isActive
                          ? cn(
                              "visible translate-y-0 opacity-100",
                              reduceMotion ? "" : "transition-[opacity,transform] duration-300 ease-out",
                            )
                          : "pointer-events-none invisible translate-y-1 opacity-0",
                      )}
                      aria-hidden={!isActive}
                    >
                      <div
                        className={cn(
                          "rounded-lg border border-white/18 px-3 py-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.35)] sm:px-3.5 sm:py-3",
                          isActive ? "bg-black/55 backdrop-blur-md" : "bg-transparent backdrop-blur-none",
                        )}
                      >
                        <p className="text-pretty text-left font-sans text-[0.65rem] font-medium leading-relaxed text-[#f7f4ef]/95 sm:text-xs md:text-[0.8125rem] [@media(max-height:780px)]:text-[0.62rem]">
                          {panel.blurb}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full-bleed bar — scroll-scrubbed fade + lift (ties to same pin progress as hero-style sections) */}
        <div
          className="mt-auto grid w-full shrink-0 grid-cols-2 border-t border-arc-charcoal/20 will-change-[opacity,transform] md:grid-cols-4"
          style={{
            opacity: uspReveal,
            transform: `translate3d(0, ${(1 - uspReveal) * 36}px, 0)`,
          }}
        >
          {USP_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "relative isolate flex min-h-[7rem] flex-col items-center justify-center overflow-hidden px-3 py-5 text-center sm:min-h-[8.25rem] sm:px-4 sm:py-6 md:min-h-[9rem] md:py-8 lg:min-h-[10rem] lg:py-9",
                "[@media(max-height:780px)]:min-h-[6.25rem] [@media(max-height:780px)]:py-4 md:[@media(max-height:780px)]:min-h-[6.75rem]",
                i < 2 ? "border-b border-arc-charcoal/15 md:border-b-0" : "",
                i === 0 || i === 2 ? "border-r border-arc-charcoal/15" : "",
                i === 1 ? "md:border-r md:border-arc-charcoal/15" : "",
              )}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <Image
                  src={USP_CELL_AMBIENT}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="relative z-10">
                <p className="font-serif text-2xl font-bold leading-none text-[#f7f4ef] drop-shadow-[0_1px_14px_rgba(0,0,0,0.7)] sm:text-3xl md:text-4xl lg:text-[2.5rem]">
                  {item.value}
                </p>
                <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f7f4ef]/92 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)] sm:text-sm md:text-[0.8125rem] md:tracking-[0.14em]">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
