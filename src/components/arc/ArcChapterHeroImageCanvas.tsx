"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { isArcSectionVisibleOnLoad } from "@/lib/arcEnterOnceScroll";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type ArcChapterHeroCanvasTile = {
  src: string;
  alt: string;
  /** Absolute layout only — omit when using the default grid (no overlap). */
  placement?: string;
  widthClass?: string;
  /** Per-column offset in grid layout (e.g. `md:mt-6`). */
  gridClass?: string;
  aspectClass?: string;
  drift?: number;
  rotate?: number;
  order?: number;
  /** Starting offset (px) before scroll timeline settles the tile. */
  enterFrom?: { x: number; y: number; scale?: number; rotate?: number };
  /** Extra spread (px) at end of scroll scrub through the section. */
  scrollSpread?: { x: number; y: number; rotate?: number };
};

export type ArcChapterHeroCanvasAnimation = "scroll-scrub" | "enter-once";

type ArcChapterHeroImageCanvasProps = {
  tiles: readonly ArcChapterHeroCanvasTile[];
  /** Section element that owns scroll range (e.g. `#about-hero`). */
  scrollTriggerRootRef: React.RefObject<HTMLElement | null>;
  reduceMotion?: boolean;
  /** `enter-once` — fly + fade into place on load; `scroll-scrub` — tied to scroll progress. */
  animation?: ArcChapterHeroCanvasAnimation;
  className?: string;
};

type SortedTile = {
  tile: ArcChapterHeroCanvasTile;
  el: HTMLDivElement;
  index: number;
};

function sortCanvasTiles(
  tiles: readonly ArcChapterHeroCanvasTile[],
  elements: HTMLDivElement[],
): SortedTile[] {
  return [...tiles]
    .map((tile, index) => ({ tile, el: elements[index], index }))
    .filter((item): item is SortedTile => item.el != null)
    .sort((a, b) => (a.tile.order ?? a.index) - (b.tile.order ?? b.index));
}

function setTilesFromState(sorted: SortedTile[]) {
  sorted.forEach(({ tile, el }) => {
    const from = tile.enterFrom ?? { x: 80, y: 48, scale: 0.88, rotate: 6 };
    gsap.set(el, {
      opacity: 0,
      x: from.x,
      y: from.y,
      scale: from.scale ?? 0.88,
      rotation: (tile.rotate ?? 0) + (from.rotate ?? 0),
      transformOrigin: "50% 50%",
      force3D: true,
    });
  });
}

function useCanvasTilesHiddenUntilAnimate(
  tileRefs: React.RefObject<(HTMLDivElement | null)[]>,
  tiles: readonly ArcChapterHeroCanvasTile[],
  reduceMotion: boolean,
  animation: ArcChapterHeroCanvasAnimation,
  enterOncePlayedRef: React.RefObject<boolean>,
) {
  useLayoutEffect(() => {
    if (reduceMotion || animation !== "enter-once" || enterOncePlayedRef.current) return;
    tiles.forEach((tile, index) => {
      const el = tileRefs.current[index];
      if (!el) return;
      const from = tile.enterFrom ?? { x: 80, y: 48, scale: 0.88, rotate: 6 };
      gsap.set(el, {
        opacity: 0,
        x: from.x,
        y: from.y,
        scale: from.scale ?? 0.88,
        rotation: (tile.rotate ?? 0) + (from.rotate ?? 0),
        transformOrigin: "50% 50%",
        force3D: true,
      });
    });
  }, [tileRefs, tiles, reduceMotion, animation, enterOncePlayedRef]);
}

const CANVAS_TILE_HIDDEN_CLASS = "opacity-0 motion-reduce:opacity-100";

/** Keep tiles visible after enter-once — GSAP inline opacity can lose to Tailwind `opacity-0`. */
function lockCanvasTilesVisible(elements: HTMLElement[]) {
  elements.forEach((el) => {
    el.classList.remove("opacity-0");
    gsap.set(el, { opacity: 1 });
  });
}

/** Play a one-shot timeline when the hero section enters the viewport (scroll or already visible). */
function bindHeroCanvasViewportEnter(
  root: HTMLElement,
  play: () => void,
  start = "top 82%",
) {
  let played = false;
  const run = () => {
    if (played) return;
    played = true;
    play();
  };

  ScrollTrigger.create({
    trigger: root,
    ...arcScrollTriggerScrollerProps(),
    start,
    once: true,
    onEnter: run,
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (isArcSectionVisibleOnLoad(root)) run();
  });
}

function useHeroCanvasTimeline(
  scrollTriggerRootRef: React.RefObject<HTMLElement | null>,
  canvasRef: React.RefObject<HTMLElement | null>,
  tileRefs: React.RefObject<(HTMLDivElement | null)[]>,
  tiles: readonly ArcChapterHeroCanvasTile[],
  reduceMotion: boolean,
  animation: ArcChapterHeroCanvasAnimation,
  enterOncePlayedRef: React.RefObject<boolean>,
) {
  useEffect(() => {
    const root = scrollTriggerRootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || reduceMotion) return;

    const elements = (tileRefs.current ?? []).filter(
      (el): el is HTMLDivElement => el != null,
    );
    if (elements.length === 0) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        const sorted = sortCanvasTiles(tiles, elements);
        setTilesFromState(sorted);

        if (animation === "enter-once") {
          const tl = gsap.timeline({ paused: true });

          sorted.forEach(({ tile, el }, i) => {
            tl.to(
              el,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotation: tile.rotate ?? 0,
                duration: 1.15,
                ease: ARC_VOOBAN_EASE,
              },
              i * 0.2,
            );
          });

          bindHeroCanvasViewportEnter(root, () =>
            tl.play(0).eventCallback("onComplete", () => {
              enterOncePlayedRef.current = true;
              lockCanvasTilesVisible(sorted.map((s) => s.el));
            }),
          );
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "none" } });

        sorted.forEach(({ tile, el }, i) => {
          const spread = tile.scrollSpread ?? { x: (tile.drift ?? 1) * 32, y: -12, rotate: 2 };
          const slot = i * 0.11;

          tl.to(
            el,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: tile.rotate ?? 0,
              duration: 0.2,
              ease: ARC_VOOBAN_EASE,
            },
            slot,
          );

          tl.to(
            el,
            {
              x: spread.x,
              y: spread.y,
              rotation: (tile.rotate ?? 0) + (spread.rotate ?? 0),
              scale: 1,
              duration: 0.22,
              ease: "power2.inOut",
            },
            0.48 + slot,
          );
        });

        ScrollTrigger.create({
          trigger: root,
          ...arcScrollTriggerScrollerProps(),
          start: "top 92%",
          end: () => `+=${Math.round(root.offsetHeight * 0.92)}`,
          scrub: 0.85,
          animation: tl,
          invalidateOnRefresh: true,
        });

        if (isArcSectionVisibleOnLoad(root)) {
          gsap.delayedCall(0.2, () => tl.progress(0.52));
        }
      }, canvas);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1600);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [scrollTriggerRootRef, tiles, reduceMotion, animation, enterOncePlayedRef]);
}

/**
 * Right-side canvas for ambient-full chapter heroes — GSAP timeline scrubbed
 * as the section enters and moves through the viewport.
 */
export function ArcChapterHeroImageCanvas({
  tiles,
  scrollTriggerRootRef,
  reduceMotion = false,
  animation = "enter-once",
  className,
}: ArcChapterHeroImageCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const enterOncePlayedRef = useRef(false);

  const hideUntilAnimate = !reduceMotion && animation === "enter-once";

  useCanvasTilesHiddenUntilAnimate(
    tileRefs,
    tiles,
    reduceMotion,
    animation,
    enterOncePlayedRef,
  );

  useHeroCanvasTimeline(
    scrollTriggerRootRef,
    canvasRef,
    tileRefs,
    tiles,
    reduceMotion,
    animation,
    enterOncePlayedRef,
  );

  useEffect(() => {
    if (!reduceMotion) return;
    tileRefs.current.forEach((el, i) => {
      if (!el) return;
      const tile = tiles[i];
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotation: tile?.rotate ?? 0 });
    });
  }, [reduceMotion, tiles]);

  const useAbsoluteLayout = tiles.some((t) => t.placement);
  const tileMotionClass = cn(
    "will-change-transform",
    hideUntilAnimate && CANVAS_TILE_HIDDEN_CLASS,
  );

  return (
    <div
      ref={canvasRef}
      className={cn(
        "pointer-events-none relative hidden w-full min-w-0 flex-1 md:flex md:items-center md:justify-start",
        className,
      )}
    >
      <div
        className={cn(
          "relative mx-auto w-full",
          useAbsoluteLayout
            ? "h-[min(66dvh,580px)] max-w-[min(100%,680px)] lg:h-[min(70dvh,620px)]"
            : "grid max-w-[min(100%,720px)] grid-cols-3 items-end gap-4 md:gap-5 lg:gap-6",
        )}
      >
        {tiles.map((tile, index) => {
          const frame = (
            <div
              className={cn(
                "relative isolate w-full overflow-hidden rounded-sm border border-white/25 bg-arc-charcoal shadow-[0_20px_50px_rgba(0,0,0,0.45)] [transform:translateZ(0)]",
                tile.aspectClass ?? "aspect-[4/5]",
              )}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 220px, 30vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
            </div>
          );

          if (useAbsoluteLayout) {
            return (
              <div
                key={`${tile.src}-${index}`}
                className={cn("absolute", tile.placement, tile.widthClass)}
              >
                <div
                  ref={(el) => {
                    tileRefs.current[index] = el;
                  }}
                  className={cn("size-full", tileMotionClass)}
                >
                  {frame}
                </div>
              </div>
            );
          }

          return (
            <div
              key={`${tile.src}-${index}`}
              ref={(el) => {
                tileRefs.current[index] = el;
              }}
              className={cn("w-full", tileMotionClass, tile.gridClass)}
            >
              {frame}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Staggered strip — same scroll timeline, tighter layout. */
export function ArcChapterHeroImageCanvasMobile({
  tiles,
  scrollTriggerRootRef,
  reduceMotion = false,
  animation = "enter-once",
  className,
}: ArcChapterHeroImageCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hideUntilAnimate = !reduceMotion && animation === "enter-once";
  const enterOncePlayedRef = useRef(false);

  useLayoutEffect(() => {
    if (!hideUntilAnimate || enterOncePlayedRef.current) return;
    tiles.slice(0, 3).forEach((_, index) => {
      const el = tileRefs.current[index];
      if (!el) return;
      const i = index;
      gsap.set(el, {
        opacity: 0,
        y: 48 + i * 12,
        x: i === 0 ? -28 : i === 2 ? 28 : 0,
        scale: 0.86,
        rotation: i % 2 === 0 ? -6 : 6,
        force3D: true,
      });
    });
  }, [hideUntilAnimate, tiles]);

  useEffect(() => {
    const root = scrollTriggerRootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas || reduceMotion) return;

    const elements = tileRefs.current.filter((el): el is HTMLDivElement => el != null);
    if (elements.length === 0) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      const ctx = gsap.context(() => {
        elements.forEach((el, i) => {
          gsap.set(el, {
            opacity: 0,
            y: 48 + i * 12,
            x: i === 0 ? -28 : i === 2 ? 28 : 0,
            scale: 0.86,
            rotation: i % 2 === 0 ? -6 : 6,
            force3D: true,
          });
        });

        if (animation === "enter-once") {
          const tl = gsap.timeline({ paused: true });

          elements.forEach((el, i) => {
            tl.to(
              el,
              {
                opacity: 1,
                x: 0,
                y: i === 1 ? -10 : 0,
                scale: 1,
                rotation: 0,
                duration: 1.05,
                ease: ARC_VOOBAN_EASE,
              },
              i * 0.16,
            );
          });

          bindHeroCanvasViewportEnter(
            root,
            () =>
              tl.play(0).eventCallback("onComplete", () => {
                enterOncePlayedRef.current = true;
                lockCanvasTilesVisible(elements);
              }),
            "top 88%",
          );
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: "none" } });
        elements.forEach((el, i) => {
          tl.to(
            el,
            {
              opacity: 1,
              y: i === 1 ? -10 : 0,
              scale: 1,
              rotation: 0,
              duration: 0.22,
              ease: ARC_VOOBAN_EASE,
            },
            i * 0.1,
          );
          tl.to(
            el,
            {
              y: (i === 1 ? -14 : 0) + (i - 1) * 6,
              scale: 1.02,
              duration: 0.25,
              ease: "power2.inOut",
            },
            0.38 + i * 0.08,
          );
        });

        ScrollTrigger.create({
          trigger: root,
          ...arcScrollTriggerScrollerProps(),
          start: "top 94%",
          end: () => `+=${Math.round(root.offsetHeight * 0.75)}`,
          scrub: 0.8,
          animation: tl,
          invalidateOnRefresh: true,
        });
      }, canvas);

      revert = () => ctx.revert();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1600);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [scrollTriggerRootRef, reduceMotion, tiles, animation]);

  useEffect(() => {
    if (!reduceMotion) return;
    tileRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 1, y: i === 1 ? -10 : 0, scale: 1, rotation: 0 });
    });
  }, [reduceMotion]);

  const singleTile = tiles.length === 1;
  const soloTile = singleTile ? tiles[0] : null;

  if (soloTile) {
    return (
      <div
        ref={canvasRef}
        className={cn(
          "pointer-events-none relative mx-auto w-full max-w-[min(72vw,280px)] overflow-visible sm:max-w-[300px] md:hidden",
          className,
        )}
      >
        <div
          ref={(el) => {
            tileRefs.current[0] = el;
          }}
          className={cn(
            "relative aspect-[4/5] overflow-hidden rounded-sm border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35)]",
            hideUntilAnimate && CANVAS_TILE_HIDDEN_CLASS,
          )}
        >
          <Image src={soloTile.src} alt={soloTile.alt} fill className="object-cover" sizes="72vw" priority />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className={cn(
        "pointer-events-none relative mt-6 grid grid-cols-3 gap-2 overflow-visible sm:mt-8 sm:gap-3 md:hidden",
        className,
      )}
    >
      {tiles.slice(0, 3).map((tile, index) => (
        <div
          key={`${tile.src}-m-${index}`}
          ref={(el) => {
            tileRefs.current[index] = el;
          }}
          className={cn(
            "relative overflow-hidden rounded-sm border border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.35)]",
            hideUntilAnimate && CANVAS_TILE_HIDDEN_CLASS,
            index === 1 ? "aspect-[3/4]" : "aspect-[4/5]",
          )}
        >
          <Image src={tile.src} alt={tile.alt} fill className="object-cover" sizes="33vw" />
        </div>
      ))}
    </div>
  );
}
