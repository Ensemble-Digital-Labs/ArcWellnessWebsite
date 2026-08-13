"use client";

import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type RefObject,
} from "react";
import type { ServicesShowcaseSlide } from "@/content/servicesShowcaseSlides";
import { servicesShowcaseNavLabel } from "@/content/servicesShowcaseSlides";
import {
  ARC_SERVICES_SHOWCASE_MOBILE_BOTTOM_LIP_CLASS,
  ARC_SERVICES_SHOWCASE_NAV_TOP_FEATHER_CLASS,
} from "@/lib/arc-layout";
import { useMinMd } from "@/lib/useMinMd";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 5000;
const CROSSFADE_MS = 700;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/** Desktop WebGL chunk — loading null so WholeBody poster stays visible. */
const WebGLShowcase = dynamic(
  () =>
    import("@/components/arc/ArcServicesShowcaseWebGL").then((m) => ({
      default: m.WebGLShowcase,
    })),
  { ssr: false, loading: () => null },
);

/** Full-viewport photography + cream category tabs overlaid at the bottom (one composition). */
const SHOWCASE_SHELL_CLASS =
  "relative isolate flex w-full max-w-none flex-col overflow-x-clip rounded-none bg-transparent";
/** Transparent so the permanent WholeBody poster underlay shows while images decode. */
const SHOWCASE_MEDIA_STAGE_CLASS =
  "relative h-[100dvh] min-h-[320px] w-full overflow-hidden bg-transparent";
const SHOWCASE_PHOTO_OBJECT_CLASS =
  "object-cover object-[center_20%] sm:object-[center_18%] lg:object-top";
const SHOWCASE_SLIDE_GLASS_CLASS =
  "inline-flex w-fit min-h-[8.75rem] max-w-[min(calc(100vw-5.5rem),40rem)] flex-col items-center justify-center gap-2 rounded-2xl border border-white/45 bg-arc-charcoal/45 px-5 py-4 text-center shadow-[0_16px_48px_rgba(0,0,0,0.28)] ring-1 ring-white/20 backdrop-blur-xl supports-[backdrop-filter]:bg-arc-charcoal/38 sm:min-h-[9.5rem] sm:max-w-[min(calc(100vw-6rem),40rem)] sm:gap-2.5 sm:px-7 sm:py-5 md:min-h-[9.75rem] md:max-w-[min(calc(100vw-3rem),40rem)]";
const SHOWCASE_SLIDE_COPY_WRAP_CLASS =
  "pointer-events-auto absolute inset-x-0 z-[1] flex w-full justify-center px-4 bottom-[calc(min(7vh,3.75rem)+12.5rem)] sm:px-6 md:px-6 md:bottom-[calc(8.25rem+min(7vh,3.75rem)+8rem)]";
const SHOWCASE_SLIDE_TITLE_CLASS =
  "flex min-h-[2.6em] max-w-full items-center justify-center font-serif text-[1.65rem] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:min-h-[2.5em] sm:text-2xl md:text-[1.85rem] lg:text-3xl [&_span]:text-white";
const SHOWCASE_SLIDE_DESC_CLASS =
  "mx-auto flex min-h-[2.75em] max-w-xl items-center justify-center font-sans text-sm font-medium leading-relaxed text-white/92 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:min-h-[2.5em] sm:text-[0.9375rem] md:leading-relaxed";
const SHOWCASE_CTRL_BTN_CLASS =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-arc-charcoal/18 bg-white/90 text-arc-charcoal shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-arc-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arc-teal/45";
const SHOWCASE_CTRL_PREV_WRAP_CLASS =
  "pointer-events-auto absolute z-20 left-[max(0.75rem,env(safe-area-inset-left))] bottom-[calc(min(7vh,3.75rem)+4.25rem)] sm:left-4 md:left-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2";
const SHOWCASE_CTRL_NEXT_WRAP_CLASS =
  "pointer-events-auto absolute z-20 right-[max(0.75rem,env(safe-area-inset-right))] bottom-[calc(min(7vh,3.75rem)+4.25rem)] sm:right-4 md:right-6 md:top-1/2 md:bottom-auto md:-translate-y-1/2";
const SHOWCASE_NAV_SHELL_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full max-md:min-h-px max-md:bg-arc-cream";
const SHOWCASE_NAV_CLASS =
  "arc-slide-nav arc-slide-nav--light slides-navigation pointer-events-auto relative hidden w-full flex-nowrap items-stretch justify-between gap-0 overflow-x-auto overflow-y-visible overscroll-x-contain bg-arc-cream px-2 py-3.5 shadow-[0_-10px_36px_rgba(131,208,187,0.14),0_-2px_12px_rgba(44,44,44,0.06)] [-ms-overflow-style:none] [scrollbar-width:none] md:flex md:px-6 md:py-5 lg:px-8 lg:py-5 [&::-webkit-scrollbar]:hidden";
const SHOWCASE_SLIDE_CONTENT_CLASS =
  "slide-content pointer-events-none absolute inset-0 z-10 flex min-h-0 flex-col px-6 pb-8 pt-[calc(7rem+1.25rem+env(safe-area-inset-top,0px))] sm:px-10 sm:pt-[calc(8.5rem+1.25rem+env(safe-area-inset-top,0px))] md:px-14 md:pt-[calc(9.5rem+1.25rem+env(safe-area-inset-top,0px))] lg:px-16 lg:pt-[calc(10rem+1.25rem+env(safe-area-inset-top,0px))]";

const LAPTOP_COVER_MQ = "(min-width: 1024px)";

function useIsLaptopCover() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(LAPTOP_COVER_MQ);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(LAPTOP_COVER_MQ).matches,
    () => false,
  );
}

function showcasePhotoObjectPosition(
  slide: ServicesShowcaseSlide | undefined,
  laptop: boolean,
): string | undefined {
  if (laptop || !slide?.coverAnchorMobile) return undefined;
  const { x, y } = slide.coverAnchorMobile;
  return `${Math.round(x * 100)}% ${Math.round(y * 100)}%`;
}

function scrollShowcaseNavItemHorizontal(item: HTMLElement) {
  const nav = item.closest(".arc-slide-nav");
  if (!(nav instanceof HTMLElement)) return;
  const maxScroll = nav.scrollWidth - nav.clientWidth;
  if (maxScroll <= 0) return;

  const navRect = nav.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  const delta =
    itemRect.left + itemRect.width / 2 - (navRect.left + navRect.width / 2);
  const next = Math.max(0, Math.min(maxScroll, nav.scrollLeft + delta));
  nav.scrollTo({ left: next, behavior: "smooth" });
}

function ServicesShowcaseNav({
  className,
  navRef,
  children,
}: {
  className?: string;
  navRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
}) {
  const localNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = localNavRef.current;
    if (!navRef) return;
    navRef.current = node;
    return () => {
      navRef.current = null;
    };
  });

  return (
    <div className={SHOWCASE_NAV_SHELL_CLASS}>
      <div aria-hidden className={ARC_SERVICES_SHOWCASE_NAV_TOP_FEATHER_CLASS} />
      <div aria-hidden className={ARC_SERVICES_SHOWCASE_MOBILE_BOTTOM_LIP_CLASS} />
      <nav
        ref={localNavRef}
        id="slidesNav"
        className={cn(SHOWCASE_NAV_CLASS, className)}
        aria-label="Slide navigation"
      >
        {children}
      </nav>
    </div>
  );
}

type ShowcaseProps = {
  slides: readonly ServicesShowcaseSlide[];
  className?: string;
};

/**
 * Image crossfade path — phones, reduced-motion, and desktop fallback while
 * the WebGL chunk downloads (WholeBody poster covers that gap).
 */
function ServicesShowcaseImage({ slides, className }: ShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const shellRef = useRef<HTMLElement>(null);
  const isLaptop = useIsLaptopCover();
  const slideCount = slides.length;

  const goTo = (next: number) => {
    if (slideCount <= 0) return;
    const wrapped = ((next % slideCount) + slideCount) % slideCount;
    setIndex((prev) => (prev === wrapped ? prev : wrapped));
  };

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        setInView(entries.some((e) => e.isIntersecting));
      },
      { rootMargin: "80px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || slideCount <= 1) return;

    let cancelled = false;
    let fadeTimer: number | null = null;
    let dwellTimer: number | null = null;

    const clearTimers = () => {
      if (fadeTimer != null) window.clearTimeout(fadeTimer);
      if (dwellTimer != null) window.clearTimeout(dwellTimer);
      fadeTimer = null;
      dwellTimer = null;
    };

    const arm = () => {
      clearTimers();
      if (document.hidden) return;
      fadeTimer = window.setTimeout(() => {
        dwellTimer = window.setTimeout(() => {
          if (cancelled) return;
          setIndex((i) => (i + 1) % slideCount);
        }, AUTO_SLIDE_MS);
      }, CROSSFADE_MS);
    };

    arm();
    const onVisibility = () => {
      if (document.hidden) clearTimers();
      else arm();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      clearTimers();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [inView, slideCount, index]);

  useEffect(() => {
    const active = document.querySelector<HTMLElement>(
      ".arc-slide-nav [data-slide-nav-item][data-active='true']",
    );
    if (active) scrollShowcaseNavItemHorizontal(active);
  }, [index]);

  const current = slides[index] ?? slides[0];
  if (!current) return null;

  return (
    <section
      ref={shellRef}
      className={cn(SHOWCASE_SHELL_CLASS, className)}
      aria-roledescription="carousel"
      aria-label="Whole-body care highlights"
    >
      <div className={SHOWCASE_MEDIA_STAGE_CLASS}>
        <div className="absolute inset-0">
          {slides.map((s, i) => {
            const nearby =
              i === index ||
              i === (index + 1) % slideCount ||
              i === (index - 1 + slideCount) % slideCount;
            if (!nearby) return null;
            return (
              <div
                key={s.imageSrc}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  i === index
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <Image
                  src={s.imageSrc}
                  alt=""
                  fill
                  className={SHOWCASE_PHOTO_OBJECT_CLASS}
                  style={{
                    objectPosition: showcasePhotoObjectPosition(s, isLaptop),
                  }}
                  sizes="100vw"
                  unoptimized
                  priority={i === 0}
                  loading={i === index || i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === index || i === 0 ? "high" : "auto"}
                />
              </div>
            );
          })}
        </div>

        <div className={SHOWCASE_SLIDE_CONTENT_CLASS}>
          <div className={SHOWCASE_SLIDE_COPY_WRAP_CLASS}>
            <div className={SHOWCASE_SLIDE_GLASS_CLASS}>
              <h2 className={SHOWCASE_SLIDE_TITLE_CLASS}>{current.title}</h2>
              <p className={SHOWCASE_SLIDE_DESC_CLASS}>{current.description}</p>
            </div>
          </div>
        </div>

        <div className={SHOWCASE_CTRL_PREV_WRAP_CLASS}>
          <button
            type="button"
            className={SHOWCASE_CTRL_BTN_CLASS}
            aria-label="Previous slide"
            onClick={() => goTo(index - 1)}
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className={SHOWCASE_CTRL_NEXT_WRAP_CLASS}>
          <button
            type="button"
            className={SHOWCASE_CTRL_BTN_CLASS}
            aria-label="Next slide"
            onClick={() => goTo(index + 1)}
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <ServicesShowcaseNav>
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              data-slide-nav-item=""
              data-active={i === index ? "true" : "false"}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={cn(
                "slide-nav-item arc-slide-nav-item",
                i === index && "active",
              )}
            >
              <div className="slide-progress-line" aria-hidden />
              <div className="slide-nav-title arc-slide-nav-label">
                {servicesShowcaseNavLabel(s)}
              </div>
            </button>
          ))}
        </ServicesShowcaseNav>
      </div>
    </section>
  );
}

/**
 * Whole-body showcase router:
 * - Phone / reduced-motion → Image crossfade (stable)
 * - Laptop+ → WebGL glass wipe, loaded as a separate chunk over the permanent poster
 */
export function ArcServicesShowcaseSlider({ slides, className }: ShowcaseProps) {
  const reduced = usePrefersReducedMotion();
  const isMinMd = useMinMd();

  // Warm the WebGL chunk on desktop after paint so scroll-in rarely waits on download.
  useEffect(() => {
    if (reduced || !isMinMd) return;
    let cancelled = false;
    const warm = () => {
      if (!cancelled) void import("@/components/arc/ArcServicesShowcaseWebGL");
    };
    const t = window.setTimeout(warm, 800);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [reduced, isMinMd]);

  if (reduced || !isMinMd) {
    return <ServicesShowcaseImage slides={slides} className={className} />;
  }

  return <WebGLShowcase slides={slides} className={className} />;
}
