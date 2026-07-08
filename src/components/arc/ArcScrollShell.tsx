"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bindArcBookingNavigationMarker, useLocomotiveScroll } from "@/lib/locomotive";
import { prefersTouchPointer } from "@/lib/arcTouchDevice";
import {
  enforceArcScrollTopAfterLayout,
  initArcScrollTopGuard,
  isArcScrollTopGuardActive,
  releaseArcScrollTopGuard,
} from "@/lib/arcScrollTopGuard";
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
 * Lenis-driven scroll inside `#main` for all viewports (same path as laptop).
 * `prefers-reduced-motion` only — static document scroll fallback.
 */
export function ArcScrollShell({ children }: ArcScrollShellProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const scrollModeReady = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  useLocomotiveScroll(scrollContainerRef, reducedMotion || !scrollModeReady);
  useArcScrollResizeRefresh(!reducedMotion);

  useEffect(() => bindArcBookingNavigationMarker(), []);

  useLayoutEffect(() => {
    initArcScrollTopGuard();
    if (!prefersTouchPointer()) {
      requestAnimationFrame(() => enforceArcScrollTopAfterLayout());
    }
  }, []);

  useEffect(() => {
    if (!isArcScrollTopGuardActive() || prefersTouchPointer()) return;

    const releaseOnUserScroll = () => releaseArcScrollTopGuard();
    window.addEventListener("wheel", releaseOnUserScroll, { passive: true, once: true });
    window.addEventListener("touchstart", releaseOnUserScroll, { passive: true, once: true });
    window.addEventListener("touchmove", releaseOnUserScroll, { passive: true, once: true });
    window.addEventListener("keydown", releaseOnUserScroll, { once: true });

    const timers = [120, 450, 900, 1700].map((ms) =>
      window.setTimeout(() => enforceArcScrollTopAfterLayout(), ms),
    );

    return () => {
      window.removeEventListener("wheel", releaseOnUserScroll);
      window.removeEventListener("touchstart", releaseOnUserScroll);
      window.removeEventListener("touchmove", releaseOnUserScroll);
      window.removeEventListener("keydown", releaseOnUserScroll);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove("arc-scroll-lock");
      document.body.classList.remove("arc-scroll-lock");
      document.documentElement.classList.remove("arc-native-scroll");
      document.body.classList.remove("arc-native-scroll");
      return;
    }

    document.documentElement.classList.remove("arc-native-scroll");
    document.body.classList.remove("arc-native-scroll");
    document.documentElement.classList.add("arc-scroll-lock");
    document.body.classList.add("arc-scroll-lock");

    return () => {
      document.documentElement.classList.remove("arc-scroll-lock");
      document.body.classList.remove("arc-scroll-lock");
    };
  }, [reducedMotion]);

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

  /** One `#main` shell for SSR + client — avoids hero / pin height jump on hydration. */
  return (
    <div
      ref={scrollContainerRef}
      id="main"
      className="relative h-[100dvh] w-full overflow-hidden bg-arc-cream touch-pan-y"
    >
      <div data-scroll-content className="relative min-h-full bg-arc-cream">
        {scrollModeReady ? <ScrollRevealInit /> : null}
        {children}
      </div>
    </div>
  );
}
