"use client";

import LocomotiveScroll from "locomotive-scroll";
import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

/** Fired after Lenis + scrollerProxy + first refresh — pins/scrub must register after this. */
export const ARC_LOCOMOTIVE_READY_EVENT = "arc-locomotive-ready";

function getLenisFromScroll(inst: InstanceType<typeof LocomotiveScroll> | null) {
  if (!inst) return undefined;
  const withAlt = inst as InstanceType<typeof LocomotiveScroll> & {
    LenisInstance?: InstanceType<typeof LocomotiveScroll>["lenisInstance"];
  };
  return inst.lenisInstance ?? withAlt.LenisInstance;
}

function resizeLenisAndRefresh(inst: InstanceType<typeof LocomotiveScroll> | null) {
  const L = getLenisFromScroll(inst);
  if (L && typeof L.resize === "function") {
    try {
      L.resize();
    } catch {
      /* noop */
    }
  }
  ScrollTrigger.refresh();
}

/**
 * Ensemble v2–style Locomotive Scroll v5 (Lenis) + GSAP ScrollTrigger scroller proxy on `#main`.
 * Pins/scrub must be created after `ARC_LOCOMOTIVE_READY_EVENT` (see useArcFullscreenPin, hero).
 */
export function useLocomotiveScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  disabled: boolean,
) {
  useEffect(() => {
    if (disabled || prefersReducedMotion()) return;

    if (typeof window !== "undefined" && (window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      return;
    }

    let locomotiveScrollInstance: InstanceType<typeof LocomotiveScroll> | null =
      null;

    const timer = window.setTimeout(() => {
      const scrollEl = containerRef.current;
      if (!scrollEl) return;

      const contentEl =
        scrollEl.querySelector<HTMLElement>("[data-scroll-content]") || scrollEl.firstElementChild;
      if (!contentEl || !(contentEl instanceof HTMLElement)) return;

      try {
        locomotiveScrollInstance = new LocomotiveScroll({
          lenisOptions: {
            wrapper: scrollEl,
            content: contentEl,
            smoothWheel: true,
            duration: 1.35,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          },
        });

        if (typeof window !== "undefined") {
          (window as unknown as { locomotiveScroll: typeof locomotiveScrollInstance }).locomotiveScroll =
            locomotiveScrollInstance;
        }

        const lenis = getLenisFromScroll(locomotiveScrollInstance);
        if (lenis && typeof lenis.on === "function") {
          lenis.on("scroll", () => {
            ScrollTrigger.update();
          });
        }

        const getLenis = () => getLenisFromScroll(locomotiveScrollInstance);

        ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (!locomotiveScrollInstance) return 0;
            const L = getLenis();
            try {
              if (L) {
                if (arguments.length && typeof value === "number") {
                  L.scrollTo(value, { immediate: true });
                  return value;
                }
                const scrollPos =
                  typeof L.scroll === "number"
                    ? L.scroll
                    : ((L.scroll as { y?: number })?.y ?? (L.scroll as number) ?? 0);
                return scrollPos;
              }
              return arguments.length ? value : scrollEl.scrollTop || 0;
            } catch {
              return arguments.length ? value : 0;
            }
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: scrollEl.style.transform ? "transform" : "fixed",
        });

        ScrollTrigger.addEventListener("refresh", () => {
          const L = getLenisFromScroll(locomotiveScrollInstance);
          if (L && typeof L.resize === "function") {
            try {
              L.resize();
            } catch {
              /* noop — do not call ScrollTrigger.refresh() here (refresh loop) */
            }
          }
        });

        ScrollTrigger.refresh();

        resizeLenisAndRefresh(locomotiveScrollInstance);
        window.setTimeout(() => resizeLenisAndRefresh(locomotiveScrollInstance), 400);
        window.setTimeout(() => resizeLenisAndRefresh(locomotiveScrollInstance), 1600);
        window.setTimeout(() => ScrollTrigger.refresh(), 800);

        window.dispatchEvent(
          new CustomEvent(ARC_LOCOMOTIVE_READY_EVENT, {
            detail: { scrollEl },
          }),
        );

        window.setTimeout(() => ScrollTrigger.refresh(), 50);
      } catch (e) {
        console.error("Locomotive Scroll initialization error:", e);
      }
    }, 450);

    return () => {
      window.clearTimeout(timer);
      if (locomotiveScrollInstance) {
        locomotiveScrollInstance.destroy();
      }
      if (typeof window !== "undefined") {
        delete (window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [containerRef, disabled]);
}
