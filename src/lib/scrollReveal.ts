import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { arcScrollTriggerScrollerProps } from "@/lib/arcScrollMode";
import { enforceArcScrollTopAfterLayout } from "@/lib/arcScrollTopGuard";
import { isArcModalScrollLockActive } from "@/lib/arcModalScrollLockState";
import { ARC_VOOBAN_DURATION, ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_START = "top 88%";
const REVEAL_HIDDEN = { autoAlpha: 0, y: 48, filter: "blur(4px)" } as const;
const REVEAL_SHOWN = { autoAlpha: 1, y: 0, filter: "blur(0px)" } as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealDone(el: HTMLElement) {
  return el.dataset.arcRevealDone === "1";
}

function markRevealDone(el: HTMLElement) {
  el.dataset.arcRevealDone = "1";
}

/** Snap a section to its revealed state and stop any in-flight reveal tween. */
export function finishArcScrollReveal(el: HTMLElement) {
  gsap.killTweensOf(el, "opacity,y,filter,autoAlpha");
  gsap.set(el, REVEAL_SHOWN);
  markRevealDone(el);
}

/**
 * After layout/scroll refresh, keep already-revealed sections visible without
 * pre-flashing content that still needs to animate in.
 */
export function reconcileArcScrollReveals(root: ParentNode = document) {
  if (prefersReducedMotion()) return;

  const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-section]", root);
  const vh = window.innerHeight || 800;

  sections.forEach((el) => {
    if (revealDone(el)) return;

    const rect = el.getBoundingClientRect();

    // Scrolled past — stay visible (no reverse hide).
    if (rect.bottom < -24) {
      finishArcScrollReveal(el);
      return;
    }

    const st = ScrollTrigger.getAll().find((t) => t.trigger === el);
    if (st && st.progress >= 1) {
      finishArcScrollReveal(el);
      return;
    }

    // Trigger zone active — let the enter tween run.
    if (st?.isActive) return;

    const revealPlaying = gsap.getTweensOf(el, true).some(
      (t) => t.vars.scrollTrigger && (t.isActive() || t.progress() > 0),
    );

    // Fast scroll skipped onEnter — snap only when well inside the viewport.
    if (!revealPlaying && rect.top < vh * 0.55 && rect.bottom > vh * 0.1) {
      finishArcScrollReveal(el);
    }
  });
}

function killRevealTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    const target = trigger.trigger as HTMLElement | undefined;
    if (target?.hasAttribute?.("data-scroll-section")) {
      trigger.kill();
    }
  });
}

/**
 * Ensemble-style scroll reveal: `[data-scroll-section]` fades/slides in on enter.
 */
export function initArcScrollReveal() {
  if (prefersReducedMotion()) return;

  killRevealTriggers();

  const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-section]");
  if (!sections.length) return;

  sections.forEach((el) => {
    delete el.dataset.arcRevealDone;
    gsap.set(el, REVEAL_HIDDEN);
  });

  sections.forEach((el) => {
    gsap.to(el, {
      ...REVEAL_SHOWN,
      duration: ARC_VOOBAN_DURATION.reveal,
      ease: ARC_VOOBAN_EASE,
      overwrite: "auto",
      onComplete: () => markRevealDone(el),
      scrollTrigger: {
        trigger: el,
        ...arcScrollTriggerScrollerProps(),
        start: REVEAL_START,
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      },
    });
  });

  ScrollTrigger.refresh();
  reconcileArcScrollReveals();
  if (!isArcModalScrollLockActive()) {
    enforceArcScrollTopAfterLayout();
  }

  // Long fallback: only unstick sections that never revealed after scroll settles.
  window.setTimeout(() => {
    sections.forEach((el) => {
      if (revealDone(el)) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        finishArcScrollReveal(el);
      }
    });
  }, 3200);
}
