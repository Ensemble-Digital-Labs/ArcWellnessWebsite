"use client";

import { AnimatePresence, useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import { PinnedSection } from "@/components/arc/PinnedSection";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import type { ImageData } from "@/components/ui/img-sphere";
import { TESTIMONIALS_SECTION_BACKGROUND_SRC } from "@/content/backgroundDecoration";
import {
  TESTIMONIAL_SPHERE_TILE_COUNT,
} from "@/content/testimonialSphereBaseImages";
import { pathPinFadeUp, usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { useArcDesktopPinScrub } from "@/lib/useArcDesktopPinScrub";
import { useStableNativeScroll } from "@/lib/useStableNativeScroll";
import { useMinMd } from "@/lib/useMinMd";
import {
  ARC_FULLSCREEN_MODAL_Z_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_TOP_SEAM_SOFT_CLASS,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { useArcHorizontalSwipeNavigate } from "@/lib/useArcHorizontalSwipeNavigate";

const SphereImageGrid = dynamic(
  () => import("@/components/ui/img-sphere"),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto aspect-square w-full max-w-[600px]" aria-hidden />
    ),
  },
);

export type ArcTestimonialItem = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  quote: string;
  attribution: string;
  /** Short label, e.g. care focus or visit type */
  context: string;
};

type ArcTestimonialsSectionProps = {
  id?: string;
  className?: string;
  items: readonly ArcTestimonialItem[];
  /** Full-screen pin scrub, off by default to shorten homepage scroll. */
  pin?: boolean;
  /** Soft cream feather from path steps above. */
  topSeam?: boolean;
  /** Soft cream exit into invest CTA. */
  bottomSeam?: boolean;
};

type CarouselSlot = "prev" | "active" | "next" | "offLeft" | "offRight";

function circularOffset(index: number, selected: number, len: number): number {
  let diff = index - selected;
  if (diff > len / 2) diff -= len;
  if (diff < -len / 2) diff += len;
  return diff;
}

function offsetToSlot(offset: number): CarouselSlot {
  if (offset === 0) return "active";
  if (offset === -1) return "prev";
  if (offset === 1) return "next";
  if (offset < -1) return "offLeft";
  return "offRight";
}

/** Default carousel spacing (large laptop / desktop). */
const carouselSlotLayoutDefault: Record<
  CarouselSlot,
  {
    x: string;
    y: string;
    rotateY: number;
    scale: number;
    opacity: number;
    zIndex: number;
    width: string;
  }
> = {
  offLeft: {
    x: "-215%",
    y: "-50%",
    rotateY: 42,
    scale: 0.52,
    opacity: 0,
    zIndex: 0,
    width: "26%",
  },
  prev: {
    x: "-138%",
    y: "-50%",
    rotateY: 32,
    scale: 0.72,
    opacity: 0.94,
    zIndex: 2,
    width: "28%",
  },
  active: {
    x: "-50%",
    y: "-50%",
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 4,
    width: "46%",
  },
  next: {
    x: "38%",
    y: "-50%",
    rotateY: -32,
    scale: 0.72,
    opacity: 0.94,
    zIndex: 2,
    width: "28%",
  },
  offRight: {
    x: "128%",
    y: "-50%",
    rotateY: -42,
    scale: 0.52,
    opacity: 0,
    zIndex: 0,
    width: "26%",
  },
};

/** Tighter stage, side cards pushed outward and clipped on short / narrow laptops. */
const carouselSlotLayoutCompact: typeof carouselSlotLayoutDefault = {
  offLeft: {
    x: "-240%",
    y: "-50%",
    rotateY: 38,
    scale: 0.48,
    opacity: 0,
    zIndex: 0,
    width: "22%",
  },
  prev: {
    x: "-178%",
    y: "-50%",
    rotateY: 34,
    scale: 0.6,
    opacity: 0.82,
    zIndex: 2,
    width: "22%",
  },
  active: {
    x: "-50%",
    y: "-50%",
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 4,
    width: "48%",
  },
  next: {
    x: "78%",
    y: "-50%",
    rotateY: -34,
    scale: 0.6,
    opacity: 0.82,
    zIndex: 2,
    width: "22%",
  },
  offRight: {
    x: "155%",
    y: "-50%",
    rotateY: -38,
    scale: 0.48,
    opacity: 0,
    zIndex: 0,
    width: "22%",
  },
};

function useCompactTestimonialCarousel() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-height: 820px), (max-width: 1320px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return compact;
}

function GoogleReviewMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function TestimonialStars({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-3.5 fill-amber-400 text-amber-400 sm:size-4"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ArcTestimonialGlassCard({
  item,
  variant = "active",
  className,
  onOpenFull,
}: {
  item: ArcTestimonialItem;
  variant?: "prev" | "active" | "next";
  className?: string;
  /** Opens full-review modal (clamped quote on the card). */
  onOpenFull?: () => void;
}) {
  const isActive = variant === "active";

  return (
    <figure
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md lg:rounded-3xl",
        isActive
          ? "border-arc-teal/35 bg-white shadow-[0_24px_70px_rgba(44,44,44,0.18),0_10px_32px_rgba(131,208,187,0.14)] ring-2 ring-arc-teal/22"
          : "border-arc-charcoal/20 bg-arc-cream-deep/96 shadow-[0_16px_48px_rgba(44,44,44,0.14)] ring-1 ring-arc-charcoal/12",
        className,
      )}
    >
      {isActive ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-arc-teal/15 via-arc-teal/70 to-arc-teal/15"
          aria-hidden
        />
      ) : null}
      <div
        className={cn(
          "flex shrink-0 items-center justify-center gap-3",
          isActive
            ? "p-4 pb-1 sm:p-5 sm:pb-3 [@media(max-height:820px)]:p-3.5 [@media(max-height:820px)]:pb-1"
            : "p-3 pb-1.5",
        )}
      >
        <GoogleReviewMark className={cn(!isActive && "scale-90")} />
        <TestimonialStars />
      </div>

      <div
        className={cn(
          "flex shrink-0 justify-center",
          isActive
            ? "mt-5 px-4 pb-2 sm:mt-0 sm:px-5 sm:pb-1 [@media(max-height:820px)]:mt-4 [@media(max-height:820px)]:px-3.5 [@media(max-height:700px)]:mt-3"
            : "px-3 pb-0.5",
        )}
      >
        <div
          className={cn(
            "relative shrink-0 overflow-hidden rounded-full bg-arc-cream-deep shadow-[0_8px_24px_rgba(28,32,36,0.12)] ring-2 ring-white",
            isActive
              ? "size-36 sm:size-32 [@media(max-height:700px)]:size-28"
              : "size-16 [@media(max-height:820px)]:size-14",
          )}
        >
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            className="object-cover object-center"
            sizes={isActive ? "144px" : "64px"}
          />
        </div>
      </div>

      <blockquote
        className={cn(
          "flex min-h-0 flex-1 flex-col items-center justify-center",
          isActive
            ? "px-4 py-3 sm:px-5 sm:py-4 [@media(max-height:820px)]:py-3"
            : "px-3 py-2",
        )}
      >
        <p
          className={cn(
            "w-full shrink-0 text-pretty text-center font-serif italic text-arc-charcoal",
            isActive
              ? "line-clamp-4 text-[0.9375rem] leading-[1.5] sm:line-clamp-5 sm:text-[1.05rem] sm:leading-[1.55] lg:text-[1.08rem] lg:leading-[1.55]"
              : "line-clamp-2 text-sm leading-snug sm:line-clamp-3 [@media(max-height:820px)]:line-clamp-2",
          )}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
        {isActive && onOpenFull ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFull();
            }}
            className="pointer-events-auto mt-1.5 shrink-0 px-2 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-arc-teal underline decoration-transparent underline-offset-4 transition-[text-decoration-color,color] hover:text-arc-teal-ink hover:decoration-arc-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 sm:mt-2 sm:min-h-[44px] sm:py-0"
          >
            Read full review
          </button>
        ) : null}
      </blockquote>

      <figcaption
        className={cn(
          "shrink-0 text-center font-sans font-semibold leading-snug text-arc-charcoal/85",
          isActive
            ? "px-4 pb-4 text-sm sm:px-5 sm:pb-5 sm:text-base [@media(max-height:820px)]:pb-3.5"
            : "px-3 pb-3 text-xs",
        )}
      >
        <cite className="not-italic">
          {item.attribution}
          {item.context ? `, ${item.context}` : null}
        </cite>
      </figcaption>
    </figure>
  );
}

function TestimonialFullReviewModal({
  item,
  onClose,
}: {
  item: ArcTestimonialItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Soft background-scroll block — avoid lockArcPageScrollForModal / Lenis.stop(),
    // which flashes the page to the top then back to testimonials on mobile.
    const blockBackgroundScroll = (event: TouchEvent | WheelEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-arc-modal-scroll]")) return;
      event.preventDefault();
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", blockBackgroundScroll, {
      passive: false,
      capture: true,
    });
    document.addEventListener("wheel", blockBackgroundScroll, {
      passive: false,
      capture: true,
    });

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", blockBackgroundScroll, true);
      document.removeEventListener("wheel", blockBackgroundScroll, true);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className={cn(
        "fixed inset-0 flex overscroll-none bg-arc-cream",
        ARC_FULLSCREEN_MODAL_Z_CLASS,
        "max-sm:items-stretch max-sm:justify-stretch max-sm:p-0 sm:items-center sm:justify-center sm:bg-arc-charcoal/40 sm:p-6",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className={cn(
          "relative flex w-full flex-col bg-white shadow-[0_28px_80px_rgba(44,44,44,0.28)]",
          "max-sm:h-[100dvh] max-sm:min-h-[100dvh] max-sm:max-h-[100dvh] max-sm:rounded-none max-sm:shadow-none",
          "sm:max-h-[min(88dvh,40rem)] sm:max-w-lg sm:rounded-3xl sm:border sm:border-arc-charcoal/12",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex shrink-0 flex-col items-center border-b border-arc-charcoal/8 px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:border-0 sm:px-8 sm:pb-0 sm:pt-8">
          <div className="flex items-center justify-center gap-3">
            <GoogleReviewMark />
            <TestimonialStars />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-arc-charcoal/12 bg-arc-cream text-arc-charcoal transition-colors hover:bg-arc-cream-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 sm:right-6 sm:top-6 sm:size-10"
            aria-label="Close review"
          >
            <X className="size-4" strokeWidth={2} aria-hidden />
          </button>
        </div>

        <div
          data-arc-modal-scroll
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-8 sm:pb-8 sm:pt-5 [&::-webkit-scrollbar]:hidden"
        >
          <h3
            id={titleId}
            className="text-center font-sans text-sm font-semibold uppercase tracking-[0.14em] text-arc-charcoal/70"
          >
            Google review
          </h3>

          <div className="mt-5 flex justify-center">
            <div className="relative size-28 overflow-hidden rounded-full bg-arc-cream-deep ring-2 ring-arc-charcoal/8 sm:size-32">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover object-center"
                sizes="128px"
              />
            </div>
          </div>

          <blockquote className="mt-5">
            <p className="text-pretty text-center font-serif text-lg italic leading-relaxed text-arc-charcoal sm:text-[1.2rem] sm:leading-[1.65]">
              &ldquo;{item.quote}&rdquo;
            </p>
          </blockquote>

          <p className="mt-8 pb-2 text-center font-sans text-base text-arc-charcoal/80 sm:text-lg">
            <span className="font-semibold text-arc-charcoal">
              {item.attribution}
            </span>
            {item.context ? (
              <span className="text-arc-charcoal/55"> · {item.context}</span>
            ) : null}
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function slotToCardVariant(slot: CarouselSlot): "prev" | "active" | "next" {
  if (slot === "active") return "active";
  if (slot === "prev" || slot === "offLeft") return "prev";
  return "next";
}

const TESTIMONIALS_CAROUSEL_HEIGHT =
  "h-[min(30rem,calc(100dvh-14rem))] [@media(max-height:820px)]:h-[min(26rem,calc(100dvh-12rem))] [@media(max-height:700px)]:h-[min(22rem,calc(100dvh-11rem))]";

function ArcTestimonial3DCarousel({
  items,
  selectedIndex,
  reduceMotion,
  onSelect,
  onOpenFull,
}: {
  items: readonly ArcTestimonialItem[];
  selectedIndex: number;
  reduceMotion: boolean | null;
  onSelect: (id: string) => void;
  onOpenFull: (id: string) => void;
}) {
  const compact = useCompactTestimonialCarousel();
  const carouselSlotLayout = compact
    ? carouselSlotLayoutCompact
    : carouselSlotLayoutDefault;
  const len = items.length;
  const prevSelectedRef = useRef(selectedIndex);
  const selectionChanged = prevSelectedRef.current !== selectedIndex;
  useEffect(() => {
    prevSelectedRef.current = selectedIndex;
  }, [selectedIndex]);
  if (len === 0) return null;

  const idx = selectedIndex >= 0 ? selectedIndex : 0;

  const visibleItems = items
    .map((item, i) => {
      const offset = circularOffset(i, idx, len);
      return { item, offset, slot: offsetToSlot(offset) };
    })
    .filter(({ offset }) => Math.abs(offset) <= 2);

  const moveDuration = selectionChanged
    ? reduceMotion
      ? 0.2
      : 0.82
    : 0;

  return (
    <div
      className="relative mx-auto hidden w-full max-w-[54rem] overflow-visible xl:max-w-[58rem] lg:block"
      aria-live="polite"
    >
      <div
        className={cn(
          "relative w-full overflow-visible [transform-style:preserve-3d] [perspective:1600px]",
          TESTIMONIALS_CAROUSEL_HEIGHT,
        )}
      >
        {visibleItems.map(({ item, slot }) => {
          const layout = carouselSlotLayout[slot];
          const isSide = slot === "prev" || slot === "next";
          const isActive = slot === "active";

          return (
            <motion.div
              key={item.id}
              className={cn(
                "absolute left-1/2 top-1/2 max-w-none origin-center will-change-transform",
                isSide && "cursor-pointer",
                (slot === "offLeft" || slot === "offRight") &&
                  "pointer-events-none",
              )}
              style={{
                width: layout.width,
                transformStyle: "preserve-3d",
              }}
              animate={{
                x: layout.x,
                y: layout.y,
                rotateY: reduceMotion ? 0 : layout.rotateY,
                scale: layout.scale,
                opacity: layout.opacity,
                zIndex: layout.zIndex,
              }}
              transition={{
                duration: moveDuration,
                ease: [0.16, 1, 0.3, 1],
                width: { duration: moveDuration },
              }}
              onClick={isSide ? () => onSelect(item.id) : undefined}
              onKeyDown={
                isSide
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(item.id);
                      }
                    }
                  : undefined
              }
              role={isSide ? "button" : undefined}
              tabIndex={isSide ? 0 : undefined}
              aria-label={
                isSide
                  ? `View testimonial from ${item.attribution}`
                  : undefined
              }
            >
              <div
                className={cn(
                  "h-full [transform-style:preserve-3d]",
                  isActive &&
                    "h-full min-h-[22rem] [@media(max-height:820px)]:min-h-[19rem] [@media(max-height:700px)]:min-h-[17rem]",
                )}
                style={{
                  minHeight: isActive ? undefined : "18rem",
                  height: isActive ? "100%" : undefined,
                }}
              >
                <ArcTestimonialGlassCard
                  item={item}
                  variant={slotToCardVariant(slot)}
                  className={cn("h-full", isSide && "pointer-events-none")}
                  onOpenFull={
                    isActive ? () => onOpenFull(item.id) : undefined
                  }
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Testimonials: **`SphereImageGrid`** + glass 3D carousel cards.
 */
export function ArcTestimonialsSection({
  id = "testimonials",
  className,
  items,
  pin = false,
  topSeam = false,
  bottomSeam = false,
}: ArcTestimonialsSectionProps) {
  const sphereHintId = useId();
  const mobileCardSwipeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const interactionResumeTimeoutRef = useRef<number | null>(null);
  const sphereMountRef = useRef<HTMLDivElement>(null);
  const [sphereNear, setSphereNear] = useState(false);
  const [sphereDesktop, setSphereDesktop] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => items[0]?.id ?? null,
  );
  /** One sphere tile highlight — not every duplicate of the same review. */
  const [activeSphereTileId, setActiveSphereTileId] = useState<string | null>(
    "sphere-1",
  );
  const [fullReviewId, setFullReviewId] = useState<string | null>(null);
  const [isSphereInteracting, setIsSphereInteracting] = useState(false);
  const { p: pinProgress, setPinProgress } = usePathPinScrubProgress();
  const staticMotion = { opacity: 1, transform: "none" } satisfies CSSProperties;
  const desktopPinScrub = useArcDesktopPinScrub();
  const nativeScroll = useStableNativeScroll();
  const isMinMd = useMinMd();
  const mobileScrollUx = nativeScroll || !isMinMd;
  const pinEnabled = pin && desktopPinScrub;
  const p = pinEnabled ? pinProgress : 1;
  const sphereMotion = pinEnabled ? pathPinFadeUp(p, 0.08, 2.35) : staticMotion;
  const hintMotion = pinEnabled ? pathPinFadeUp(p, 0.16, 2.05) : staticMotion;
  const titleMotion = pinEnabled ? pathPinFadeUp(p, 0.08, 2.35) : staticMotion;
  const cardMotion = pinEnabled ? pathPinFadeUp(p, 0.26, 2.2) : staticMotion;

  const sphereInteractionHint =
    reduceMotion === true
      ? "Tap a portrait to read the testimonials."
      : mobileScrollUx
        ? "Swipe left or right on a review to browse."
        : "Spin me with a drag, then tap a portrait to read the testimonials.";

  useEffect(() => {
    if (!pinEnabled) setPinProgress(1);
  }, [pinEnabled, setPinProgress]);

  const sphereImages: ImageData[] = useMemo(() => {
    const out: ImageData[] = [];
    for (let i = 0; i < TESTIMONIAL_SPHERE_TILE_COUNT; i++) {
      const t = items[i % items.length];
      if (!t) break;
      out.push({
        id: `sphere-${i + 1}`,
        src: t.imageSrc,
        alt: t.imageAlt,
        title: t.attribution,
        description: t.quote,
        testimonialId: t.id,
      });
    }
    return out;
  }, [items]);

  const selected = useMemo(
    () => items.find((t) => t.id === selectedId) ?? items[0] ?? null,
    [items, selectedId],
  );
  const selectedIndex = useMemo(
    () => (selected ? items.findIndex((t) => t.id === selected.id) : -1),
    [items, selected],
  );

  const holdAutoplayForMs = (ms: number) => {
    setIsSphereInteracting(true);
    if (interactionResumeTimeoutRef.current !== null) {
      window.clearTimeout(interactionResumeTimeoutRef.current);
    }
    interactionResumeTimeoutRef.current = window.setTimeout(() => {
      setIsSphereInteracting(false);
      interactionResumeTimeoutRef.current = null;
    }, ms);
  };

  const selectTestimonial = (id: string) => {
    holdAutoplayForMs(2200);
    setSelectedId(id);
    const tile = sphereImages.find((img) => img.testimonialId === id);
    if (tile) setActiveSphereTileId(tile.id);
  };

  const openFullReview = useCallback(
    (id: string) => {
      holdAutoplayForMs(2200);
      setSelectedId(id);
      setFullReviewId(id);
      const tile = sphereImages.find((img) => img.testimonialId === id);
      if (tile) setActiveSphereTileId(tile.id);
    },
    [sphereImages],
  );

  const closeFullReview = useCallback(() => {
    setFullReviewId(null);
  }, []);

  const fullReviewItem = useMemo(
    () => items.find((t) => t.id === fullReviewId) ?? null,
    [items, fullReviewId],
  );

  const goToAdjacentTestimonial = useCallback(
    (direction: 1 | -1) => {
      if (items.length < 2) return;
      const idx = selectedIndex >= 0 ? selectedIndex : 0;
      const nextItem = items[(idx + direction + items.length) % items.length];
      if (!nextItem) return;
      holdAutoplayForMs(2200);
      setSelectedId(nextItem.id);
      const tile = sphereImages.find((img) => img.testimonialId === nextItem.id);
      if (tile) setActiveSphereTileId(tile.id);
    },
    [items, selectedIndex, sphereImages],
  );

  const goToNextTestimonial = useCallback(
    () => goToAdjacentTestimonial(1),
    [goToAdjacentTestimonial],
  );

  const goToPrevTestimonial = useCallback(
    () => goToAdjacentTestimonial(-1),
    [goToAdjacentTestimonial],
  );

  useArcHorizontalSwipeNavigate(mobileCardSwipeRef, {
    enabled: mobileScrollUx && items.length > 1,
    onSwipeLeft: goToNextTestimonial,
    onSwipeRight: goToPrevTestimonial,
  });

  useEffect(() => {
    if (items.length < 2 || isSphereInteracting) return;
    const timer = window.setInterval(() => {
      setSelectedId((prev) => {
        if (!prev) return items[0]?.id ?? null;
        const idx = items.findIndex((t) => t.id === prev);
        if (idx < 0) return items[0]?.id ?? null;
        return items[(idx + 1) % items.length]?.id ?? prev;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [items, isSphereInteracting]);

  useEffect(() => {
    if (!selectedId) return;
    setActiveSphereTileId((current) => {
      const currentStillMatches = sphereImages.some(
        (img) => img.id === current && img.testimonialId === selectedId,
      );
      if (currentStillMatches) return current;
      return (
        sphereImages.find((img) => img.testimonialId === selectedId)?.id ??
        current
      );
    });
  }, [selectedId, sphereImages]);

  useEffect(() => {
    return () => {
      if (interactionResumeTimeoutRef.current !== null) {
        window.clearTimeout(interactionResumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = sphereMountRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setSphereNear(true);
        io.disconnect();
      },
      { rootMargin: "360px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setSphereDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <PinnedSection
      id={id}
      pinDistanceMultiplier={0.55}
      onProgress={setPinProgress}
      disabled={!pinEnabled}
      className={cn(
        "relative scroll-mt-28 p-0",
        !topSeam && "border-t border-arc-teal/20",
        "max-md:overflow-hidden max-md:pt-20 sm:max-md:pt-24",
        "md:h-[100dvh] md:max-h-[100dvh] md:min-h-0 md:overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={TESTIMONIALS_SECTION_BACKGROUND_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/35 via-arc-cream/18 to-arc-cream/28" />
      </div>

      {topSeam ? (
        <ArcSectionSeamBlend
          edge="top"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_TESTIMONIALS_TOP_SEAM_SOFT_CLASS}
        />
      ) : null}

      <div
        ref={sphereMountRef}
        className="flex min-h-0 flex-col max-md:overflow-hidden md:h-[100dvh] md:max-h-[100dvh] md:overflow-hidden lg:flex-row lg:items-stretch"
      >
        <div
          {...(pinEnabled ? { "data-scroll-section": true } : {})}
          className="relative z-[1] hidden min-h-0 flex-1 items-center justify-center px-2 pb-10 pt-4 sm:pt-6 lg:flex lg:h-full lg:min-h-[52vh] lg:w-1/2 lg:justify-end lg:py-6 lg:pl-8 lg:pr-3 [@media(max-height:820px)]:lg:py-4 xl:pl-12 xl:pr-5"
        >
          <div
            role="region"
            aria-labelledby={sphereHintId}
            className="flex w-full max-w-[min(100%,640px)] flex-col items-center"
            onMouseEnter={() => holdAutoplayForMs(1800)}
            onMouseMove={() => holdAutoplayForMs(1800)}
            onMouseDown={() => holdAutoplayForMs(1800)}
            onMouseLeave={() => holdAutoplayForMs(600)}
            onTouchStart={() => holdAutoplayForMs(1800)}
            onTouchEnd={() => holdAutoplayForMs(900)}
          >
            <div
              className="w-full touch-pan-y [@media(max-height:820px)]:scale-[0.92] [@media(max-height:820px)]:origin-center"
              style={sphereMotion}
            >
              {sphereNear && sphereDesktop ? (
                <SphereImageGrid
                  images={sphereImages}
                  className="w-full"
                  containerSize={600}
                  sphereRadius={285}
                  dragSensitivity={0.8}
                  momentumDecay={0.96}
                  maxRotationSpeed={6}
                  baseImageScale={0.182}
                  hoverScale={1.35}
                  perspective={1580}
                  autoRotate
                  autoRotateSpeed={0.08}
                  theme="light"
                  fitContainer
                  selectedId={activeSphereTileId}
                  showModal={false}
                  onImageSelect={(img) => {
                    setActiveSphereTileId(img.id);
                    if (img.testimonialId) {
                      holdAutoplayForMs(2200);
                      setSelectedId(img.testimonialId);
                    }
                  }}
                />
              ) : (
                <div
                  className="mx-auto aspect-square w-full max-w-[600px]"
                  aria-hidden
                />
              )}
            </div>
            <p
              id={sphereHintId}
              className="mt-4 max-w-[min(100%,20rem)] text-balance text-center font-sans text-xs leading-relaxed text-arc-charcoal sm:mt-5 sm:max-w-sm sm:text-[0.8125rem]"
              style={hintMotion}
            >
              {sphereInteractionHint}
            </p>
          </div>
        </div>

        <div
          {...(pinEnabled ? { "data-scroll-section": true } : {})}
          className="relative z-[1] flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-visible px-5 py-10 sm:px-8 lg:h-full lg:w-1/2 lg:items-end lg:justify-center lg:px-8 lg:py-6 lg:pt-28 [@media(max-height:820px)]:lg:py-4 [@media(max-height:820px)]:lg:pt-24 xl:px-12 2xl:px-14"
        >
          {selected ? (
            <div
              className="relative mx-auto flex min-h-0 w-full max-w-lg flex-col sm:max-w-xl lg:mr-0 lg:max-w-[min(100%,54rem)] lg:pr-2 xl:max-w-[58rem]"
              style={cardMotion}
            >
              <div
                style={titleMotion}
                className="relative z-[2] shrink-0 -translate-y-8 sm:-translate-y-9 lg:-translate-y-10 xl:-translate-y-12"
              >
                <ArcTextReveal variant="heading">
                  <h2
                    id="testimonials-heading"
                    className="mb-4 text-center leading-[0.9] tracking-tight sm:mb-5 lg:mx-auto lg:mb-5 lg:w-[min(100%,26rem)] [@media(max-height:820px)]:lg:mb-4 [@media(max-height:820px)]:lg:-translate-y-2"
                  >
                    <TitleEmphasis className="inline-block font-title-emphasis text-[clamp(3.5rem,14vw,4.75rem)] font-normal not-italic text-arc-charcoal sm:text-[clamp(3.25rem,10vw,4.5rem)] lg:text-[clamp(2.75rem,8vw,4.25rem)]">
                      Testimonials
                    </TitleEmphasis>
                  </h2>
                </ArcTextReveal>
              </div>

              <div className="mx-auto min-h-0 w-full flex-1 overflow-visible">
                <div
                  ref={mobileCardSwipeRef}
                  className="relative touch-pan-y lg:hidden"
                  data-arc-swipe-nav
                  aria-label="Swipe left or right to browse testimonials"
                >
                  <div className="grid h-[27rem] grid-cols-1 grid-rows-1 [@media(max-height:740px)]:h-[24rem] sm:h-[28rem]">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={selected.id}
                        className="h-full [grid-area:1/1]"
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ArcTestimonialGlassCard
                          item={selected}
                          variant="active"
                          className="h-full"
                          onOpenFull={() => openFullReview(selected.id)}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {items.length > 1 ? (
                    <div
                      className="mt-4 flex justify-center gap-1.5 sm:mt-5"
                      role="tablist"
                      aria-label="Testimonial pages"
                    >
                      {items.map((item, i) => (
                        <button
                          key={item.id}
                          type="button"
                          role="tab"
                          aria-selected={i === selectedIndex}
                          aria-label={`Testimonial ${i + 1} of ${items.length}`}
                          onClick={() => selectTestimonial(item.id)}
                          className={cn(
                            "h-1.5 rounded-full transition-[width,background-color] duration-300",
                            i === selectedIndex
                              ? "w-5 bg-arc-teal"
                              : "w-1.5 bg-arc-charcoal/25",
                          )}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>

                <ArcTestimonial3DCarousel
                  items={items}
                  selectedIndex={selectedIndex}
                  reduceMotion={reduceMotion}
                  onSelect={selectTestimonial}
                  onOpenFull={openFullReview}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {fullReviewItem ? (
          <TestimonialFullReviewModal
            key={fullReviewItem.id}
            item={fullReviewItem}
            onClose={closeFullReview}
          />
        ) : null}
      </AnimatePresence>

      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
        />
      ) : null}
    </PinnedSection>
  );
}
