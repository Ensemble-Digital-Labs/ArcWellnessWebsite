"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcWindowFrame } from "@/components/arc/ArcWindowFrame";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { CONCERN_PANELS, CONCERNS_SECTION_BG } from "@/content/concernsSection";
import { homeConcerns } from "@/content/homeConcerns";
import { ARC_HOME_CONCERNS_BOTTOM_SEAM_SOFT_CLASS } from "@/lib/arc-layout";

const PANEL_COUNT = CONCERN_PANELS.length;
const AUTOPLAY_MS = 4200;
const SWIPE_THRESHOLD_PX = 40;

/** Shortest signed distance from `active` to card `i` around the ring (infinite loop). */
function ringOffset(i: number, active: number): number {
  let offset = i - active;
  const half = PANEL_COUNT / 2;
  if (offset > half) offset -= PANEL_COUNT;
  else if (offset < -half) offset += PANEL_COUNT;
  return offset;
}

type CardVisual = {
  mult: number;
  scale: number;
  blur: number;
  opacity: number;
  zIndex: number;
};

/** Coverflow depth ramp: center sharp + large, neighbors shrink/blur/fade toward the edges. */
function cardVisual(offset: number): CardVisual {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);
  if (abs === 0) return { mult: 0, scale: 1, blur: 0, opacity: 1, zIndex: 30 };
  if (abs === 1) return { mult: sign * 1, scale: 0.82, blur: 1.5, opacity: 0.92, zIndex: 20 };
  if (abs === 2) return { mult: sign * 1.85, scale: 0.64, blur: 3.5, opacity: 0.5, zIndex: 10 };
  return { mult: sign * 2.6, scale: 0.5, blur: 6, opacity: 0, zIndex: 0 };
}

export function ArcConcernsPinnedSection({
  className,
  bottomSeam = false,
}: {
  className?: string;
  /** Soft cream exit into wellness intro below. */
  bottomSeam?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const prevActiveRef = useRef(active);

  // Shortest signed change in `active` this render — used to detect cards that wrap
  // around the ring (they must teleport, not slide across the whole stage).
  const prevActive = prevActiveRef.current;
  const activeDelta = ringOffset(active, prevActive);
  useEffect(() => {
    prevActiveRef.current = active;
  });

  useEffect(() => {
    ScrollTrigger.getById("arc-concerns-pin")?.kill(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback((i: number) => {
    setActive(((i % PANEL_COUNT) + PANEL_COUNT) % PANEL_COUNT);
  }, []);
  const goNext = useCallback(() => setActive((a) => (a + 1) % PANEL_COUNT), []);
  const goPrev = useCallback(() => setActive((a) => (a - 1 + PANEL_COUNT) % PANEL_COUNT), []);

  // Autoplay — restarts on each `active` change so manual nav gets a full dwell.
  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [active, reducedMotion, paused, goNext]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setPaused(true);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = dragStartX.current;
    dragStartX.current = null;
    setPaused(false);
    if (start === null) return;
    const dx = e.clientX - start;
    if (dx > SWIPE_THRESHOLD_PX) goPrev();
    else if (dx < -SWIPE_THRESHOLD_PX) goNext();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden border-t border-arc-cream/80 bg-arc-cream",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={CONCERNS_SECTION_BG}
          alt=""
          fill
          priority={false}
          sizes="(max-width: 1280px) 100vw, 1600px"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/78 via-arc-cream/52 to-arc-cream/40" />
      </div>

      <section
        className={cn(
          "relative z-10 flex flex-col overflow-hidden",
          "max-md:min-h-0 max-md:h-auto",
          "md:h-[100dvh] md:max-h-[100dvh] md:min-h-0",
          // Short/landscape viewports: let the section grow to its content (page scrolls)
          // instead of forcing 100dvh, which centered the block and pushed cards into the text.
          "[@media(max-height:760px)]:!h-auto [@media(max-height:760px)]:!max-h-none",
        )}
      >
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center [@media(max-height:760px)]:justify-start">
          <div className="flex min-h-0 flex-col pb-10 pt-24 sm:pb-12 sm:pt-32 md:pt-36 lg:pt-40 [@media(max-height:900px)]:pt-32 [@media(max-height:820px)]:pb-6 [@media(max-height:820px)]:pt-[8.75rem] [@media(max-height:700px)]:pt-[7rem] [@media(max-height:700px)]:pb-4">
              <div className="mx-auto w-full max-w-4xl shrink-0 px-4 text-center sm:px-6 md:px-10">
                <ArcTextReveal variant="heading">
                  <h2 className="font-serif text-3xl font-bold leading-[1.12] tracking-tight text-arc-charcoal sm:text-4xl md:text-[2.65rem] md:leading-[1.08] [@media(max-height:820px)]:text-[1.85rem] [@media(max-height:820px)]:sm:text-[2.05rem] [@media(max-height:820px)]:md:text-[2.35rem]">
                    <span className="text-balance">
                      {homeConcerns.titleBefore}{" "}
                      <TitleEmphasis className="text-[1.52em] leading-[1.04] text-arc-teal-ink sm:text-[1.6em] md:text-[1.72em] lg:text-[1.82em] [text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.015em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]">
                        {homeConcerns.titleEmphasis}
                      </TitleEmphasis>
                    </span>
                  </h2>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p className="mx-auto mt-4 max-w-2xl text-pretty font-sans text-base leading-relaxed text-arc-charcoal/78 sm:mt-5 sm:text-lg md:mt-6 [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:text-sm [@media(max-height:820px)]:sm:text-base">
                    {homeConcerns.intro}
                  </p>
                </ArcTextReveal>
              </div>

              {/* Coverflow carousel — infinite loop of arch-window cards, focused center + blurred sides. */}
              <div
                role="group"
                aria-roledescription="carousel"
                aria-label="Reasons people begin their journey with ARC"
                tabIndex={0}
                data-arc-h-scroll
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={() => {
                  dragStartX.current = null;
                  setPaused(false);
                }}
                onPointerEnter={() => setPaused(true)}
                onKeyDown={onKeyDown}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                className="relative mx-auto mt-8 w-full touch-pan-y select-none outline-none sm:mt-10 md:mt-12 [@media(max-height:820px)]:mt-5 [@media(max-height:700px)]:mt-3"
                style={
                  {
                    // Height also capped by viewport height so on short/landscape screens the
                    // cards shrink instead of growing into the heading above.
                    "--arc-cc-w": "clamp(150px, 44vw, 244px)",
                    "--arc-cc-h": "clamp(230px, min(82vw, 52dvh), 430px)",
                    "--arc-cc-step": "clamp(146px, 40vw, 232px)",
                    height: "var(--arc-cc-h)",
                  } as CSSProperties
                }
              >
                {CONCERN_PANELS.map((panel, i) => {
                  const offset = ringOffset(i, active);
                  const prevOffset = ringOffset(i, prevActive);
                  // Non-wrapping cards all move by exactly `-activeDelta`; any other
                  // movement means this card jumped across the ring seam this step,
                  // so teleport it (no transition) to avoid the sweep-across flash.
                  const wrapped = offset - prevOffset !== -activeDelta;
                  const { mult, scale, blur, opacity, zIndex } = cardVisual(offset);
                  const isCenter = offset === 0;
                  const hidden = Math.abs(offset) >= 3;
                  const style: CSSProperties = {
                    width: "var(--arc-cc-w)",
                    height: "var(--arc-cc-h)",
                    transform: `translate(calc(-50% + (var(--arc-cc-step) * ${mult})), -50%) scale(${scale})`,
                    opacity,
                    filter: blur ? `blur(${blur}px)` : undefined,
                    zIndex,
                    pointerEvents: hidden ? "none" : undefined,
                    transition:
                      reducedMotion || wrapped
                        ? "none"
                        : "transform 750ms cubic-bezier(0.22,1,0.36,1), opacity 750ms ease, filter 750ms ease",
                  };
                  return (
                    <button
                      key={panel.title}
                      type="button"
                      aria-label={isCenter ? undefined : `Show ${panel.title}`}
                      aria-hidden={hidden}
                      aria-current={isCenter}
                      tabIndex={-1}
                      onClick={() => {
                        if (!isCenter && !hidden) goTo(i);
                      }}
                      style={style}
                      className="absolute left-1/2 top-1/2 block cursor-pointer"
                    >
                      <ArcWindowFrame
                        src={panel.image}
                        sizes="(max-width: 768px) 60vw, 244px"
                        archDepth={40}
                        interactive={isCenter}
                        priority={i < 2}
                        className="h-full w-full border border-arc-teal/35 shadow-[0_20px_50px_rgba(44,44,44,0.16)]"
                      >
                        <div
                          className={cn(
                            "pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start gap-1 p-4 text-left sm:p-5",
                            "transition-opacity duration-500 ease-out",
                            isCenter ? "opacity-100" : "opacity-0",
                          )}
                        >
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-black/92 from-15% via-black/60 to-transparent"
                          />
                          <p
                            className="font-title-emphasis relative text-[clamp(1.4rem,4.8vw,2rem)] leading-[1.12] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.95),0_1px_3px_rgba(0,0,0,0.9)]"
                          >
                            {panel.title}
                          </p>
                          <p className="relative max-w-[16rem] font-sans text-[0.75rem] font-medium leading-snug text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.95),0_1px_2px_rgba(0,0,0,0.9)] sm:text-[0.8rem]">
                            {panel.tagline}
                          </p>
                        </div>
                      </ArcWindowFrame>
                    </button>
                  );
                })}
              </div>

              {/* Pagination dots — active elongated. */}
              <div className="mt-6 flex shrink-0 items-center justify-center gap-2 sm:mt-8">
                {CONCERN_PANELS.map((panel, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={panel.title}
                      type="button"
                      aria-label={`Show ${panel.title}`}
                      aria-current={isActive}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500 ease-out",
                        isActive
                          ? "w-6 bg-arc-teal-ink"
                          : "w-1.5 bg-arc-charcoal/25 hover:bg-arc-charcoal/45",
                      )}
                    />
                  );
                })}
              </div>
          </div>
        </div>
      </section>

      {/* Breathing room before Wellness — desktop only; mobile flows straight into lounge photo. */}
      <div
        aria-hidden
        className="relative z-[1] hidden h-[min(12vh,6rem)] shrink-0 md:block"
      />

      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={cn(ARC_HOME_CONCERNS_BOTTOM_SEAM_SOFT_CLASS, "max-md:hidden")}
        />
      ) : null}
    </div>
  );
}
