"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocomotiveScroll } from "@/lib/locomotive";
import { ScrollRevealInit } from "@/components/arc/ScrollRevealInit";
import "locomotive-scroll/dist/locomotive-scroll.css";

type ArcScrollShellProps = {
  children: ReactNode;
};

/**
 * Ensemble v2 pattern: Lenis-driven scroll inside `#main`, not the document — pairs with GSAP ScrollTrigger `scroller: #main`.
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

  useLocomotiveScroll(scrollContainerRef, reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove("arc-scroll-lock");
      document.body.classList.remove("arc-scroll-lock");
      return;
    }
    document.documentElement.classList.add("arc-scroll-lock");
    document.body.classList.add("arc-scroll-lock");
    return () => {
      document.documentElement.classList.remove("arc-scroll-lock");
      document.body.classList.remove("arc-scroll-lock");
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return <div className="relative w-full bg-arc-cream">{children}</div>;
  }

  return (
    <div
      ref={scrollContainerRef}
      id="main"
      className="relative h-[100dvh] w-full overflow-hidden bg-arc-cream"
    >
      <div
        data-scroll-content
        className="relative min-h-full bg-arc-cream pt-[7.25rem]"
      >
        <ScrollRevealInit />
        {children}
      </div>
    </div>
  );
}
