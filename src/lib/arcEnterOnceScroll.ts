import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import { ARC_VOOBAN_EASE } from "@/lib/arcVoobanMotion";

export type ArcEnterOnceProgressOptions = {
  trigger: HTMLElement;
  onProgress: (value: number) => void;
  /** Animate when the section is already in view on first paint (typical page heroes). */
  playIfVisibleOnLoad?: boolean;
  duration?: number;
  /** Seconds to wait before auto-play on load — lets Lenis/layout settle. */
  loadDelay?: number;
  scrollStart?: string;
};

/** True when the section is in the upper viewport on first paint (above-the-fold hero). */
export function isArcSectionVisibleOnLoad(trigger: HTMLElement): boolean {
  const scroller = getArcScrollTriggerScroller();
  const vh = getArcScrollViewportHeight(scroller);
  const rect = trigger.getBoundingClientRect();
  return rect.top < vh * 0.92 && rect.bottom > 48;
}

/**
 * Drives normalized progress 0→1 once — scroll into view, or immediately on load when already visible.
 */
export function bindArcEnterOnceProgress(options: ArcEnterOnceProgressOptions): () => void {
  const {
    trigger,
    onProgress,
    playIfVisibleOnLoad = true,
    duration = 1.85,
    loadDelay = 0.16,
    scrollStart = "top 88%",
  } = options;

  const progressObj = { value: 0 };
  let tween: gsap.core.Tween | null = null;
  let played = false;

  const play = () => {
    if (played) return;
    played = true;
    tween?.kill();
    tween = gsap.to(progressObj, {
      value: 1,
      duration,
      ease: ARC_VOOBAN_EASE,
      onUpdate: () => onProgress(progressObj.value),
    });
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger,
      ...arcScrollTriggerScrollerProps(),
      start: scrollStart,
      once: true,
      onEnter: play,
    });
  }, trigger);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (playIfVisibleOnLoad && isArcSectionVisibleOnLoad(trigger)) {
      gsap.delayedCall(loadDelay, play);
    }
  });

  return () => {
    tween?.kill();
    ctx.revert();
  };
}

/** Run a one-shot GSAP timeline when scrolled into view or already visible on load. */
export function playArcEnterOnceWhenVisible(
  trigger: HTMLElement,
  play: () => void,
  options?: { loadDelay?: number; scrollStart?: string },
): () => void {
  const loadDelay = options?.loadDelay ?? 0.16;
  const scrollStart = options?.scrollStart ?? "top 88%";
  let played = false;

  const runOnce = () => {
    if (played) return;
    played = true;
    play();
  };

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger,
      ...arcScrollTriggerScrollerProps(),
      start: scrollStart,
      once: true,
      onEnter: runOnce,
    });
  }, trigger);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (isArcSectionVisibleOnLoad(trigger)) {
      gsap.delayedCall(loadDelay, runOnce);
    }
  });

  return () => ctx.revert();
}
