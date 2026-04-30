"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ensemble-style scroll reveal: `[data-scroll-section]` fades/slides in on enter (single long scroll, not CSS snap).
 * Call after Locomotive + scrollerProxy (`arc-locomotive-ready`).
 */
export function initArcScrollReveal() {
  if (prefersReducedMotion()) return;

  const scroller = document.querySelector("#main");
  if (!scroller) return;

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
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.05,
        ease: "power2.out",
        delay: Math.min(i * 0.04, 0.24),
        overwrite: "auto",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 94%",
          end: "top 45%",
          toggleActions: "play none none none",
          once: true,
        },
      },
    );
  });

  ScrollTrigger.refresh();

  const viewportH = window.innerHeight || 800;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < viewportH * 1.2) {
      gsap.set(section, { opacity: 1, y: 0 });
    }
  });
}
