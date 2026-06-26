"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenArcLocomotiveReady } from "@/lib/locomotive";
import {
  arcScrollTriggerPinOptions,
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { cn } from "@/lib/utils";
import { useArcDesktopPinScrub } from "@/lib/useArcDesktopPinScrub";
import { useStableNativeScroll } from "@/lib/useStableNativeScroll";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { BACKGROUND_DECORATION_IMAGES } from "@/content/backgroundDecoration";
import { CONCERN_PANELS, CONCERNS_SECTION_BG } from "@/content/concernsSection";

gsap.registerPlugin(ScrollTrigger);

/** Subtle ambient texture for USP stat cells (matches decoration/background pattern). */
const USP_CELL_AMBIENT = BACKGROUND_DECORATION_IMAGES[0];

const USP_ITEMS = [
  { value: "12+", label: "Treatment Modalities" },
  { value: "FDA", label: "Cleared Technology" },
  { value: "0", label: "Membership Required" },
  { value: "Free", label: "Initial Consultation" },
] as const;

export function ArcConcernsPinnedSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [pinReady, setPinReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const desktopPinScrub = useArcDesktopPinScrub();
  const nativeScroll = useStableNativeScroll();
  const pinMotionActive = desktopPinScrub && pinReady;

  const selectPanel = (idx: number) => {
    setActiveIndex(idx);
    if (nativeScroll) {
      panelRefs.current[idx]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || !desktopPinScrub) {
      setProgress(1);
      setPinReady(false);
      return;
    }

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      if (!section) return;

      revert?.();
      revert = null;
      setPinReady(false);

      const scroller = getArcScrollTriggerScroller();
      const endDist = () =>
        Math.round(getArcScrollViewportHeight(scroller) * 0.92);

      const ctx = gsap.context(() => {
        ScrollTrigger.getById("arc-concerns-pin")?.kill(true);
        const st = ScrollTrigger.create({
          id: "arc-concerns-pin",
          trigger: section,
          ...arcScrollTriggerScrollerProps(),
          ...arcScrollTriggerPinOptions(),
          start: "top top",
          end: () => `+=${endDist()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        });
        setProgress(st.progress);
        setPinReady(true);
      }, section);

      revert = () => {
        setPinReady(false);
        ctx.revert();
      };
    };

    const unregisterReady = whenArcLocomotiveReady(setup);

    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 2000);

    return () => {
      cancelled = true;
      unregisterReady();
      window.clearTimeout(fallback);
      revert?.();
      setPinReady(false);
    };
  }, [reduceMotion, desktopPinScrub]);

  useEffect(() => {
    if (!nativeScroll) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    const syncActiveFromScroll = () => {
      const cards = panelRefs.current.filter(Boolean) as HTMLButtonElement[];
      if (cards.length === 0) return;

      const carouselRect = carousel.getBoundingClientRect();
      const carouselCenter = carouselRect.left + carouselRect.width / 2;

      let closestIdx = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - carouselCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    carousel.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", syncActiveFromScroll);
  }, [nativeScroll]);

  const p = reduceMotion || !desktopPinScrub || !pinReady ? 1 : progress;

  /** USP bar fades and rises in later in the pin scrub so it reads as a second beat. */
  const uspReveal = pinMotionActive
    ? Math.min(1, Math.max(0, (p - 0.28) / 0.52))
    : 1;

  return (
    <section
      ref={sectionRef}
      className={cn(
        "bg-arc-cream relative flex flex-col max-md:overflow-x-visible max-md:overflow-y-visible overflow-hidden",
        nativeScroll ? "max-md:min-h-0" : "h-[100dvh] max-h-[100dvh] min-h-0",
        "md:h-[100dvh] md:max-h-[100dvh] md:min-h-0",
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
        {/* Light wash so type and cards stay readable on bright panel photography */}
        <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/70 via-arc-cream/45 to-arc-cream/35" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col px-4 pb-4 pt-24 sm:px-6 sm:pb-6 sm:pt-32 md:px-10 md:pt-36 lg:pt-40 [@media(max-height:900px)]:pt-32 [@media(max-height:820px)]:pb-3 [@media(max-height:820px)]:pt-[8.75rem] [@media(max-height:740px)]:pt-[8rem] [@media(max-height:680px)]:pt-[7.25rem]">
          <div
            className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col max-md:flex-none"
            style={
              pinMotionActive
                ? {
                    opacity: Math.min(1, p * 1.6),
                    transform: `translate3d(0, ${Math.max(0, 26 - p * 26)}px, 0)`,
                  }
                : undefined
            }
          >
            <div className="shrink-0 text-center">
              <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-arc-charcoal sm:text-4xl md:text-[2.65rem] md:leading-[1.08] [@media(max-height:820px)]:text-[1.85rem] [@media(max-height:820px)]:sm:text-[2.05rem] [@media(max-height:820px)]:md:text-[2.35rem]">
                <span className="text-balance">
                  Crafted{" "}
                  <TitleEmphasis className="text-[1.52em] leading-[1.04] text-arc-teal-ink sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]">
                    By your Concern
                  </TitleEmphasis>
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-arc-charcoal/72 sm:mt-5 sm:text-lg md:mt-6 [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:text-sm [@media(max-height:820px)]:sm:text-base">
                Thoughtfully mapped to guide your journey to aesthetics, wellness and longevity
              </p>
            </div>

            <div
              ref={carouselRef}
              className={cn(
                "mt-5 flex w-full gap-3 sm:mt-8 md:mt-10",
                "max-md:-mx-1 max-md:min-h-0 max-md:flex-none max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:overflow-y-visible max-md:px-1 max-md:pb-1 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
                "md:mt-6 md:min-h-0 md:flex-1 md:gap-2 md:overflow-hidden",
                "[@media(max-height:780px)]:mt-4 [@media(max-height:680px)]:mt-3",
              )}
            >
              {CONCERN_PANELS.map((panel, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={panel.title}
                    ref={(node) => {
                      panelRefs.current[idx] = node;
                    }}
                    type="button"
                    onMouseEnter={() => {
                      if (!nativeScroll) setActiveIndex(idx);
                    }}
                    onFocus={() => selectPanel(idx)}
                    onClick={() => selectPanel(idx)}
                    className={cn(
                      "group relative min-w-0 overflow-hidden rounded-xl text-left transition-[flex] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-rose-gold-ink/45 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream",
                      "max-md:h-[min(62vw,17.5rem)] max-md:snap-center max-md:flex-none max-md:basis-[min(82vw,19rem)]",
                      "md:h-full md:flex-[1]",
                      isActive ? "md:flex-[2.8]" : "md:flex-[1]",
                    )}
                    aria-expanded={isActive}
                    aria-label={panel.title}
                  >
                    <Image
                      key={panel.image}
                      src={panel.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 82vw, 18vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-arc-charcoal/78 via-arc-charcoal/32 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-arc-charcoal/28 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4 md:left-0 md:right-auto md:max-w-[12.5rem] md:p-5">
                      <p className="text-pretty rounded-md bg-white px-2.5 py-2 text-left font-sans text-xs font-semibold leading-snug text-arc-charcoal shadow-[0_4px_16px_rgba(44,44,44,0.14)] sm:px-3 sm:py-2.5 sm:text-sm md:text-[0.95rem]">
                        {panel.title}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "absolute bottom-0 right-0 z-20 hidden min-w-0 max-w-[15rem] p-3 sm:max-w-[16rem] sm:p-4 md:block md:p-5",
                        "[@media(max-height:780px)]:max-w-[14rem] [@media(max-height:780px)]:p-3",
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
                          "rounded-lg border border-arc-charcoal/20 px-3 py-2.5 shadow-[0_8px_28px_rgba(44,44,44,0.18)] sm:px-3.5 sm:py-3",
                          isActive ? "bg-arc-charcoal backdrop-blur-md" : "bg-transparent backdrop-blur-none",
                        )}
                      >
                        <p className="text-pretty text-left font-sans text-[0.65rem] font-medium leading-relaxed text-white/92 sm:text-xs md:text-[0.8125rem] [@media(max-height:780px)]:text-[0.62rem]">
                          {panel.blurb}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 md:hidden">
              <div className="rounded-lg border border-arc-charcoal/20 bg-arc-charcoal px-4 py-3.5 shadow-[0_8px_28px_rgba(44,44,44,0.18)]">
                <p className="text-pretty text-left font-sans text-sm font-medium leading-relaxed text-white/92">
                  {CONCERN_PANELS[activeIndex]?.blurb}
                </p>
              </div>
              <div
                className="mt-3 flex justify-center gap-2"
                role="tablist"
                aria-label="Concern panels"
              >
                {CONCERN_PANELS.map((panel, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={panel.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={panel.title}
                      onClick={() => selectPanel(idx)}
                      className={cn(
                        "size-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream",
                        isActive ? "bg-arc-charcoal" : "bg-arc-charcoal/25 hover:bg-arc-charcoal/45",
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Full-bleed bar — scroll-scrubbed fade + lift (ties to same pin progress as hero-style sections) */}
        <div
          className="mt-6 grid w-full shrink-0 grid-cols-2 border-t-2 border-b-2 border-arc-charcoal will-change-[opacity,transform] md:mt-auto md:grid-cols-4"
          style={
            pinMotionActive
              ? {
                  opacity: uspReveal,
                  transform: `translate3d(0, ${(1 - uspReveal) * 36}px, 0)`,
                }
              : undefined
          }
        >
          {USP_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "relative isolate flex min-h-[6.25rem] flex-col items-center justify-center overflow-hidden px-3 py-4 text-center sm:min-h-[8.25rem] sm:px-4 sm:py-6 md:min-h-[9rem] md:py-8 lg:min-h-[10rem] lg:py-9",
                "[@media(max-height:780px)]:min-h-[6.25rem] [@media(max-height:780px)]:py-4 md:[@media(max-height:780px)]:min-h-[6.75rem]",
                i < 2 ? "border-b-2 border-arc-charcoal md:border-b-0" : "",
                i === 0 || i === 2 ? "border-r-2 border-arc-charcoal" : "",
                i === 1 ? "md:border-r-2 md:border-arc-charcoal" : "",
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
                <p className="font-serif text-2xl font-bold leading-none text-arc-charcoal sm:text-3xl md:text-4xl lg:text-[2.5rem] [text-shadow:0_1px_2px_rgba(255,255,255,0.55)]">
                  {item.value}
                </p>
                <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-arc-charcoal/90 sm:text-sm md:text-[0.8125rem] md:tracking-[0.14em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45)]">
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
