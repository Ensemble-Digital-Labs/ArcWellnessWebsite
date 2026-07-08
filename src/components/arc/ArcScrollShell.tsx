"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT, bindArcBookingNavigationMarker, useLocomotiveScroll } from "@/lib/locomotive";
import {
  enforceArcScrollTopAfterLayout,
  initArcScrollTopGuard,
  isArcScrollTopGuardActive,
  releaseArcScrollTopGuard,
} from "@/lib/arcScrollTopGuard";
import { useStableNativeScroll } from "@/lib/useStableNativeScroll";
import { useArcScrollResizeRefresh } from "@/lib/useArcScrollResizeRefresh";
import {
  pauseArcScrollForPageHide,
  scheduleArcPageRecovery,
  shouldRecoverArcPageOnShow,
} from "@/lib/arcScrollRecovery";
import { ScrollRevealInit } from "@/components/arc/ScrollRevealInit";
import "locomotive-scroll/dist/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger);

type ArcScrollShellProps = {
  children: ReactNode;
};

/**
 * Desktop: Lenis-driven scroll inside `#main`, pairs with GSAP ScrollTrigger `scroller: #main`.
 * Mobile / touch: native document scroll (Locomotive breaks iOS Safari + mobile previews).
 */
export function ArcScrollShell({ children }: ArcScrollShellProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const nativeScroll = useStableNativeScroll();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const locomotiveDisabled = reducedMotion || nativeScroll;
  useLocomotiveScroll(scrollContainerRef, locomotiveDisabled);
  useArcScrollResizeRefresh(!reducedMotion);

  useEffect(() => bindArcBookingNavigationMarker(), []);

  useLayoutEffect(() => {
    initArcScrollTopGuard();
    requestAnimationFrame(() => enforceArcScrollTopAfterLayout());
  }, []);

  useEffect(() => {
    if (!isArcScrollTopGuardActive()) return;

    const releaseOnUserScroll = () => releaseArcScrollTopGuard();
    window.addEventListener("wheel", releaseOnUserScroll, { passive: true, once: true });
    window.addEventListener("touchmove", releaseOnUserScroll, { passive: true, once: true });
    window.addEventListener("keydown", releaseOnUserScroll, { once: true });

    const timers = [120, 450, 900, 1700].map((ms) =>
      window.setTimeout(() => enforceArcScrollTopAfterLayout(), ms),
    );

    return () => {
      window.removeEventListener("wheel", releaseOnUserScroll);
      window.removeEventListener("touchmove", releaseOnUserScroll);
      window.removeEventListener("keydown", releaseOnUserScroll);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (locomotiveDisabled) {
      document.documentElement.classList.remove("arc-scroll-lock");
      document.body.classList.remove("arc-scroll-lock");
      return;
    }

    const syncScrollLock = () => {
      const narrow =
        window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      if (narrow) {
        document.documentElement.classList.remove("arc-scroll-lock");
        document.body.classList.remove("arc-scroll-lock");
        return;
      }
      document.documentElement.classList.add("arc-scroll-lock");
      document.body.classList.add("arc-scroll-lock");
    };

    syncScrollLock();
    window.addEventListener("resize", syncScrollLock, { passive: true });
    return () => {
      window.removeEventListener("resize", syncScrollLock);
      document.documentElement.classList.remove("arc-scroll-lock");
      document.body.classList.remove("arc-scroll-lock");
    };
  }, [locomotiveDisabled]);

  useEffect(() => {
    if (reducedMotion || !nativeScroll) return;
    const timer = window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent(ARC_LOCOMOTIVE_READY_EVENT, { detail: { scrollEl: null } }),
      );
    }, 50);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, nativeScroll]);

  useEffect(() => {
    if (reducedMotion || !nativeScroll) return;
    const onScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, nativeScroll]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (shouldRecoverArcPageOnShow(event)) scheduleArcPageRecovery();
    };

    const onPageHide = () => {
      pauseArcScrollForPageHide();
    };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  if (reducedMotion) {
    return <div className="relative w-full bg-arc-cream">{children}</div>;
  }

  if (nativeScroll) {
    return (
      <div id="main" className="relative w-full touch-pan-y overflow-x-clip bg-arc-cream">
        <ScrollRevealInit />
        {children}
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      id="main"
      className="relative h-[100dvh] w-full overflow-hidden bg-arc-cream"
    >
      <div data-scroll-content className="relative min-h-full bg-arc-cream">
        <ScrollRevealInit />
        {children}
      </div>
    </div>
  );
}
