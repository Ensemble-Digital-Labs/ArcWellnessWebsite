"use client";

import Image from "next/image";
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import {
  HERO_CTA_CLIP_ANOTHER_D,
  HERO_CTA_CLIP_RECT_D,
  HERO_CTA_CLIP_SQUIGGLE_D,
  heroCtaPreviewClipIdForIndex,
} from "@/components/arc/heroCtaPreviewClipPaths";

/** Preview card size (matches layout + `aspect-[5/3]`). */
const PREVIEW_W = 160;
const PREVIEW_H = 96;
const GAP = 0;
const LERP = 0.16;
/** Editorial tilt — negative = CCW, reads “lifted card” next to right-aligned type */
const ROTATE_DEG = -5;
const VIEWPORT_EDGE_PAD = 12;

export type HeroCtaPreviewSlide = {
  src: string;
  alt?: string;
};

type HeroCtaCursorPreviewsProps = {
  previews: readonly [HeroCtaPreviewSlide, HeroCtaPreviewSlide];
  children: ReactNode;
  className?: string;
};

/**
 * Hero text CTAs: hover reveals a **preview card to the left** of the active link,
 * vertically keyed to that row (with light vertical bias from the pointer), **lerped** motion,
 * slight **rotation** for an editorial / spa mood. Off when **`prefers-reduced-motion`**.
 */
export function HeroCtaCursorPreviews({
  previews,
  children,
  className,
}: HeroCtaCursorPreviewsProps) {
  const clipUid = useId().replace(/:/g, "");
  const [hovered, setHovered] = useState<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hoveredRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const applyTransform = (x: number, y: number, rotate: number) => {
    const el = previewRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) rotate(${rotate}deg)`;
  };

  useEffect(() => {
    if (reduceMotion) return;
    let id = 0;
    const tick = () => {
      const idx = hoveredRef.current;
      if (idx !== null && previewRef.current) {
        const item = itemRefs.current[idx];
        if (item) {
          const r = item.getBoundingClientRect();
          let left = r.left - PREVIEW_W - GAP;
          left = Math.max(VIEWPORT_EDGE_PAD, left);
          const midY = r.top + r.height / 2;
          const mouseBias = (mouseRef.current.y - midY) * 0.14;
          const top = midY - PREVIEW_H / 2 + mouseBias;
          targetRef.current = { x: left, y: top };

          const t = targetRef.current;
          const s = smoothRef.current;
          smoothRef.current = {
            x: s.x + (t.x - s.x) * LERP,
            y: s.y + (t.y - s.y) * LERP,
          };
          const { x, y } = smoothRef.current;
          applyTransform(x, y, ROTATE_DEG);
        }
      }

      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  const onMove = (e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const onEnterSlide = (index: number) => {
    if (reduceMotion) return;
    setHovered(index);
    const item = itemRefs.current[index];
    if (item && previewRef.current) {
      const r = item.getBoundingClientRect();
      let left = r.left - PREVIEW_W - GAP;
      left = Math.max(VIEWPORT_EDGE_PAD, left);
      const top = r.top + r.height / 2 - PREVIEW_H / 2;
      targetRef.current = { x: left, y: top };
      smoothRef.current = { x: left, y: top };
      applyTransform(left, top, ROTATE_DEG);
    }
  };

  const kids = Children.toArray(children).filter(isValidElement);

  const showCard = hovered !== null && !reduceMotion;

  return (
    <>
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <defs>
          <clipPath id={`${clipUid}-squiggle`} clipPathUnits="objectBoundingBox">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={HERO_CTA_CLIP_SQUIGGLE_D}
              fill="black"
            />
          </clipPath>
          <clipPath id={`${clipUid}-rect`} clipPathUnits="objectBoundingBox">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={HERO_CTA_CLIP_RECT_D}
              fill="black"
            />
          </clipPath>
          <clipPath id={`${clipUid}-another`} clipPathUnits="objectBoundingBox">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={HERO_CTA_CLIP_ANOTHER_D}
              fill="black"
            />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={previewRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[95] hidden w-[min(46vw,160px)] max-w-[160px] sm:block",
          "transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:hidden",
          showCard ? "opacity-100" : "opacity-0",
        )}
        aria-hidden
      >
        <div className="relative aspect-[5/3] w-full">
          {previews.map((p, i) => {
            const clipKey = heroCtaPreviewClipIdForIndex(i);
            const active = hovered === i;
            return (
              <div
                key={p.src}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform,filter] duration-500 ease-out",
                  /* Drop-shadow only while active; hidden layers still paint a boxy shadow in some browsers */
                  active &&
                    "drop-shadow-[0_22px_48px_rgba(0,0,0,0.52)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.28)]",
                  active
                    ? "opacity-100 blur-0 scale-100"
                    : "opacity-0 scale-105 blur-sm",
                )}
                style={{ clipPath: `url(#${clipUid}-${clipKey})` }}
              >
                {/* Clipped placeholder while the image loads */}
                <div
                  className="pointer-events-none absolute inset-0 bg-arc-charcoal/25"
                  aria-hidden
                />
                <Image
                  src={p.src}
                  alt={p.alt ?? ""}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={className}
        onMouseMove={onMove}
        onMouseLeave={() => setHovered(null)}
      >
        {kids.map((child, i) => (
          <span
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="inline-flex max-w-full justify-start"
            onMouseEnter={() => onEnterSlide(i)}
          >
            {child}
          </span>
        ))}
      </div>
    </>
  );
}
