"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { Star } from "lucide-react";

import { PinnedSection } from "@/components/arc/PinnedSection";
import SphereImageGrid, {
  type ImageData,
} from "@/components/ui/img-sphere";
import { TESTIMONIALS_SECTION_BACKGROUND_SRC } from "@/content/backgroundDecoration";
import {
  TESTIMONIAL_SPHERE_TILE_COUNT,
  testimonialSphereBaseImages,
} from "@/content/testimonialSphereBaseImages";
import { pathPinFadeUp, usePathPinScrubProgress } from "@/lib/arcPinReveal";
import { useArcDesktopPinScrub } from "@/lib/useArcDesktopPinScrub";
import { useStableNativeScroll } from "@/lib/useStableNativeScroll";
import { useMinMd } from "@/lib/useMinMd";
import { cn } from "@/lib/utils";

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

/** Tighter stage — side cards pushed outward and clipped on short / narrow laptops. */
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
}: {
  item: ArcTestimonialItem;
  variant?: "prev" | "active" | "next";
  className?: string;
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
      <div className={cn("flex items-center gap-3", isActive ? "p-5 pb-3 sm:p-6 sm:pb-4" : "p-4 pb-2")}>
        <GoogleReviewMark className={cn(!isActive && "scale-90")} />
        <TestimonialStars />
      </div>

      <div
        className={cn(
          "relative mx-auto w-[calc(100%-1.5rem)] overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(28,32,36,0.1)] ring-1 ring-arc-charcoal/10",
          isActive ? "aspect-[4/3] max-h-52 sm:max-h-56 [@media(max-height:820px)]:max-h-44" : "aspect-[5/4] max-h-32 [@media(max-height:820px)]:max-h-28",
        )}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          className="object-cover"
          sizes={isActive ? "(max-width: 640px) 320px, 380px" : "200px"}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-arc-charcoal/15 via-transparent to-transparent" />
      </div>

      <blockquote className={cn("flex flex-1 items-center", isActive ? "px-5 py-5 sm:px-6 sm:py-6" : "px-4 py-3")}>
        <p
          className={cn(
            "w-full text-pretty text-center font-serif italic leading-relaxed text-arc-charcoal",
            isActive
              ? "text-base sm:text-lg lg:text-[1.12rem] lg:leading-[1.65]"
              : "line-clamp-3 text-sm leading-snug [@media(max-width:1320px)]:line-clamp-2 [@media(max-height:820px)]:line-clamp-2",
          )}
        >
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      <figcaption
        className={cn(
          "text-right font-sans leading-snug text-arc-charcoal/78",
          isActive ? "px-5 pb-5 text-xs sm:px-6 sm:pb-6 sm:text-sm" : "px-4 pb-4 text-[11px]",
        )}
      >
        <cite className="not-italic">
          {item.attribution}, {item.context}
        </cite>
      </figcaption>
    </figure>
  );
}

function slotToCardVariant(slot: CarouselSlot): "prev" | "active" | "next" {
  if (slot === "active") return "active";
  if (slot === "prev" || slot === "offLeft") return "prev";
  return "next";
}

const TESTIMONIALS_CAROUSEL_HEIGHT =
  "h-[min(34rem,calc(100dvh-13rem))] [@media(max-height:820px)]:h-[min(28rem,calc(100dvh-11rem))] [@media(max-height:700px)]:h-[min(24rem,calc(100dvh-10rem))]";

function ArcTestimonial3DCarousel({
  items,
  selectedIndex,
  reduceMotion,
  onSelect,
}: {
  items: readonly ArcTestimonialItem[];
  selectedIndex: number;
  reduceMotion: boolean | null;
  onSelect: (id: string) => void;
}) {
  const compact = useCompactTestimonialCarousel();
  const carouselSlotLayout = compact ? carouselSlotLayoutCompact : carouselSlotLayoutDefault;
  const len = items.length;
  if (len === 0) return null;

  const idx = selectedIndex >= 0 ? selectedIndex : 0;

  const visibleItems = items
    .map((item, i) => {
      const offset = circularOffset(i, idx, len);
      return { item, offset, slot: offsetToSlot(offset) };
    })
    .filter(({ offset }) => Math.abs(offset) <= 2);

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
          const isClickable = slot === "prev" || slot === "next";

          return (
            <motion.div
              key={item.id}
              className={cn(
                "absolute left-1/2 top-1/2 max-w-none origin-center will-change-transform",
                isClickable && "cursor-pointer",
                (slot === "offLeft" || slot === "offRight") && "pointer-events-none",
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
                duration: reduceMotion ? 0.2 : 0.82,
                ease: [0.16, 1, 0.3, 1],
                width: { duration: reduceMotion ? 0.2 : 0.82 },
              }}
              onClick={isClickable ? () => onSelect(item.id) : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(item.id);
                      }
                    }
                  : undefined
              }
              role={isClickable ? "button" : undefined}
              tabIndex={isClickable ? 0 : undefined}
              aria-label={
                isClickable ? `View testimonial from ${item.attribution}` : undefined
              }
            >
              <div
                className={cn(
                  "h-full [transform-style:preserve-3d]",
                  isClickable &&
                    "[@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90",
                  slot === "active" &&
                    "min-h-[26rem] [@media(max-height:820px)]:min-h-[22rem] [@media(max-height:700px)]:min-h-[19rem]",
                )}
                style={{
                  minHeight: slot === "active" ? undefined : "23rem",
                }}
              >
                <ArcTestimonialGlassCard
                  item={item}
                  variant={slotToCardVariant(slot)}
                  className="h-full"
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
}: ArcTestimonialsSectionProps) {
  const sphereHintId = useId();
  const reduceMotion = useReducedMotion();
  const interactionResumeTimeoutRef = useRef<number | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(
    () => items[0]?.id ?? null,
  );
  const [isSphereInteracting, setIsSphereInteracting] = useState(false);
  const { p: pinProgress, setPinProgress } = usePathPinScrubProgress();
  const staticMotion = { opacity: 1, transform: "none" } satisfies CSSProperties;
  const desktopPinScrub = useArcDesktopPinScrub();
  const nativeScroll = useStableNativeScroll();
  const isMinMd = useMinMd();
  const mobileScrollUx = nativeScroll || !isMinMd;
  const p = desktopPinScrub ? pinProgress : 1;
  const sphereMotion = desktopPinScrub ? pathPinFadeUp(p, 0.08, 2.35) : staticMotion;
  const hintMotion = desktopPinScrub ? pathPinFadeUp(p, 0.16, 2.05) : staticMotion;
  const titleMotion = desktopPinScrub ? pathPinFadeUp(p, 0.08, 2.35) : staticMotion;
  const cardMotion = desktopPinScrub ? pathPinFadeUp(p, 0.26, 2.2) : staticMotion;

  const sphereInteractionHint =
    reduceMotion === true
      ? "Tap a portrait to read the testimonials."
      : mobileScrollUx
        ? "Swipe up or down to scroll · drag sideways on the sphere to spin · tap a portrait to read."
        : "Spin me with a drag, then tap a portrait to read the testimonials.";

  useEffect(() => {
    if (!desktopPinScrub) setPinProgress(1);
  }, [desktopPinScrub, setPinProgress]);

  const sphereImages: ImageData[] = useMemo(() => {
    const base = testimonialSphereBaseImages;
    const out: ImageData[] = [];
    for (let i = 0; i < TESTIMONIAL_SPHERE_TILE_COUNT; i++) {
      const b = base[i % base.length];
      const t = items[i % items.length];
      if (!t) break;
      out.push({
        id: `sphere-${i + 1}`,
        src: b.src,
        alt: `${b.alt} (${Math.floor(i / base.length) + 1})`,
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
  };

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
    return () => {
      if (interactionResumeTimeoutRef.current !== null) {
        window.clearTimeout(interactionResumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <PinnedSection
      id={id}
      pinDistanceMultiplier={0.55}
      onProgress={setPinProgress}
      disabled={!desktopPinScrub}
      className={cn(
        "relative scroll-mt-28 border-t border-arc-teal/20 p-0",
        "max-md:overflow-visible max-md:pt-20 sm:max-md:pt-24",
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

      <div className="flex min-h-0 flex-col max-md:overflow-visible md:h-[100dvh] md:max-h-[100dvh] md:overflow-hidden lg:flex-row lg:items-stretch">
        <div
          {...(desktopPinScrub ? { "data-scroll-section": true } : {})}
          className="relative z-[1] flex min-h-[52vh] flex-1 items-center justify-center px-2 pb-10 pt-4 sm:min-h-[56vh] sm:pt-6 lg:h-full lg:min-h-0 lg:w-1/2 lg:justify-end lg:py-6 lg:pl-8 lg:pr-3 [@media(max-height:820px)]:lg:py-4 xl:pl-12 xl:pr-5"
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
              className="w-full [@media(max-height:820px)]:scale-[0.92] [@media(max-height:820px)]:origin-center"
              style={sphereMotion}
            >
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
                selectedId={selectedId}
                showModal={false}
                onImageSelect={(img) => {
                  if (img.testimonialId) selectTestimonial(img.testimonialId);
                }}
              />
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
          {...(desktopPinScrub ? { "data-scroll-section": true } : {})}
          className="relative z-[1] flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-5 py-10 sm:px-8 lg:h-full lg:w-1/2 lg:items-end lg:justify-center lg:px-8 lg:py-6 lg:pt-28 [@media(max-height:820px)]:lg:py-4 [@media(max-height:820px)]:lg:pt-24 xl:px-12 2xl:px-14"
        >
          {selected ? (
            <div
              className="relative mx-auto flex min-h-0 w-full max-w-lg flex-col sm:max-w-xl lg:mr-0 lg:max-w-[min(100%,54rem)] lg:pr-2 xl:max-w-[58rem]"
              style={cardMotion}
            >
              <div style={titleMotion} className="shrink-0">
                <h2
                  id="testimonials-heading"
                  className="mb-4 text-center font-serif text-[2.1rem] font-semibold leading-tight tracking-tight text-arc-charcoal sm:mb-5 sm:text-4xl md:text-[2.45rem] lg:mx-auto lg:mb-5 lg:w-[min(100%,26rem)] lg:text-[2.65rem] [@media(max-height:820px)]:lg:mb-4 [@media(max-height:820px)]:lg:text-[2.15rem]"
                >
                  Testimonials
                </h2>
              </div>

              <div className="mx-auto min-h-0 w-full flex-1 overflow-visible">
                <motion.div
                  key={selected.id}
                  className="lg:hidden"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ArcTestimonialGlassCard item={selected} variant="active" />
                </motion.div>

                <ArcTestimonial3DCarousel
                  items={items}
                  selectedIndex={selectedIndex}
                  reduceMotion={reduceMotion}
                  onSelect={selectTestimonial}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PinnedSection>
  );
}
