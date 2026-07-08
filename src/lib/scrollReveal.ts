"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { enforceArcScrollTopAfterLayout } from "@/lib/arcScrollTopGuard";
import { prefersReducedMotion } from "@/lib/motionPrefs";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ensemble-style scroll reveal: `[data-scroll-section]` fades/slides in on enter (single long scroll, not CSS snap).
 * Call after Locomotive + scrollerProxy (`arc-locomotive-ready`).
 */
export function initArcScrollReveal() {
  if (prefersReducedMotion()) return;

  ScrollTrigger.getAll().forEach((t) => {
    const tr = t.trigger as HTMLElement | undefined;
    if (tr?.hasAttribute?.("data-scroll-section")) {
      t.kill();
    }
  });

  const sections = document.querySelectorAll("[data-scroll-section]");
  if (!sections.length) return;

  sections.forEach((section, i) => {
    const el = section as HTMLElement;
    gsap.fromTo(
      el,
      { opacity: 0, y: 52, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.95,
        ease: ARC_VOOBAN_EASE,
        delay: Math.min(i * 0.06, 0.28),
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          ...arcScrollTriggerScrollerProps(),
          start: "top 94%",
          end: "top 45%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });

  ScrollTrigger.refresh();
  enforceArcScrollTopAfterLayout();

  const viewportH = window.innerHeight || 800;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < viewportH * 1.2) {
      gsap.set(section, { opacity: 1, y: 0, filter: "blur(0px)" });
    }
  });
}
