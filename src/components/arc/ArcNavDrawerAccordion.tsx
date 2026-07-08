"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const ACCORDION_DURATION = 0.72;

type ArcNavDrawerAccordionProps = {
  id: string;
  open: boolean;
  reducedMotion: boolean;
  children: ReactNode;
  className?: string;
};

/** Imperative height accordion — GSAP avoids React/CSS height:auto expand flash. */
export function ArcNavDrawerAccordion({
  id,
  open,
  reducedMotion,
  children,
  className,
}: ArcNavDrawerAccordionProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    const targetHeight = () => inner.scrollHeight;

    gsap.killTweensOf(panel);

    if (reducedMotion) {
      gsap.set(panel, {
        height: open ? targetHeight() : 0,
        overflow: open ? "visible" : "hidden",
      });
      return () => gsap.killTweensOf(panel);
    }

    if (open) {
      gsap.set(panel, { height: 0, overflow: "hidden" });
      gsap.to(panel, {
        height: targetHeight(),
        duration: ACCORDION_DURATION,
        ease: "power1.out",
        onComplete: () => {
          gsap.set(panel, { height: "auto", overflow: "visible" });
        },
      });
    } else {
      const startHeight = panel.offsetHeight || targetHeight();
      gsap.set(panel, { height: startHeight, overflow: "hidden" });
      gsap.to(panel, {
        height: 0,
        duration: ACCORDION_DURATION,
        ease: "power2.inOut",
      });
    }

    return () => gsap.killTweensOf(panel);
  }, [open, reducedMotion]);

  return (
    <div
      id={id}
      ref={panelRef}
      className={cn("h-0 overflow-hidden", className)}
      aria-hidden={!open}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
