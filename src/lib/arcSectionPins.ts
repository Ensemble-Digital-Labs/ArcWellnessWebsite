"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  arcScrollTriggerPinOptions,
  arcScrollTriggerScrollerProps,
  getArcScrollTriggerScroller,
  getArcScrollViewportHeight,
} from "@/lib/arcScrollMode";
import {
  currentScrollYForStabilize,
  stabilizeViewportAfterLayoutShift,
} from "@/lib/arcScrollLayoutRefresh";
import { prefersReducedMotion } from "@/lib/motionPrefs";
import { whenArcLocomotiveReady } from "@/lib/locomotive";

gsap.registerPlugin(ScrollTrigger);

export type ArcFullscreenPinOptions = {
  onProgress?: (progress: number) => void;
  pinDistanceMultiplier?: number;
  disabled?: boolean;
  pinType?: "fixed" | "transform";
  stabilizeScrollOnToggle?: boolean;
};

export function revertAllArcPinTriggers() {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.vars?.pin) st.kill(true);
  });
}

export function revertPinsForSection(section: HTMLElement | null) {
  if (!section) return;
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === section) st.kill(true);
  });
}

function maybeStabilizePathScroll(anchorTopBefore: number | undefined, scrollBefore: number, enabled: boolean) {
  if (!enabled || anchorTopBefore === undefined) return;
  const pathAnchor = document.getElementById("path");
  if (!pathAnchor) return;

  window.setTimeout(() => {
    stabilizeViewportAfterLayoutShift({
      anchor: pathAnchor,
      anchorTopBefore,
      scrollBefore,
    });
  }, 420);
}

function isPinnedTargetVisible(el: HTMLElement): boolean {
  let node: HTMLElement | null = el;
  while (node) {
    const style = window.getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return false;
    node = node.parentElement;
  }
  return el.getClientRects().length > 0;
}

export function useArcFullscreenPin(
  sectionRef: RefObject<HTMLElement | null>,
  options?: ArcFullscreenPinOptions,
) {
  const onProgressRef = useRef<ArcFullscreenPinOptions["onProgress"]>(undefined);
  onProgressRef.current = options?.onProgress;
  const pinDistanceMultiplier = options?.pinDistanceMultiplier ?? 1;
  const pinType = options?.pinType;
  const disabled = options?.disabled ?? false;
  const stabilizeScrollOnToggle = options?.stabilizeScrollOnToggle ?? false;
  const revertRef = useRef<(() => void) | null>(null);
  const prevDisabledRef = useRef<boolean | null>(null);

  const teardownPin = () => {
    revertPinsForSection(sectionRef.current);
    revertRef.current?.();
    revertRef.current = null;
  };

  const runPinSetup = (shouldStabilize: boolean) => {
    const trigger = sectionRef.current;
    if (!trigger) return;

    if (!isPinnedTargetVisible(trigger)) {
      teardownPin();
      onProgressRef.current?.(1);
      return;
    }

    teardownPin();

    const scroller = getArcScrollTriggerScroller();
    const endDist = () =>
      getArcScrollViewportHeight(scroller) * Math.max(0.2, pinDistanceMultiplier);
    const pinOptions = pinType ? { pinType } : arcScrollTriggerPinOptions();

    let created: ScrollTrigger | undefined;

    const ctx = gsap.context(() => {
      created = ScrollTrigger.create({
        trigger,
        ...arcScrollTriggerScrollerProps(),
        ...pinOptions,
        start: "top top",
        end: () => `+=${endDist()}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          onProgressRef.current?.(self.progress);
        },
      });
    }, trigger);

    revertRef.current = () => ctx.revert();

    if (created) {
      onProgressRef.current?.(created.progress);
    }

    if (shouldStabilize) {
      const pathAnchor = document.getElementById("path");
      maybeStabilizePathScroll(
        pathAnchor?.getBoundingClientRect().top,
        currentScrollYForStabilize(),
        true,
      );
    }
  };

  useLayoutEffect(() => () => teardownPin(), [sectionRef]);

  useLayoutEffect(() => {
    if (disabled) teardownPin();
  }, [disabled]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onProgressRef.current?.(1);
      return;
    }

    const disabledChanged =
      prevDisabledRef.current !== null && prevDisabledRef.current !== disabled;
    prevDisabledRef.current = disabled;

    if (disabled) {
      teardownPin();
      onProgressRef.current?.(1);
      return;
    }

    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      runPinSetup(stabilizeScrollOnToggle && disabledChanged);
    };

    const unregisterReady = whenArcLocomotiveReady(setup);

    const fallback = window.setTimeout(() => {
      if (!cancelled && revertRef.current === null && document.querySelector("#main")) {
        setup();
      }
    }, 2000);

    return () => {
      cancelled = true;
      unregisterReady();
      window.clearTimeout(fallback);
      teardownPin();
    };
  }, [sectionRef, pinDistanceMultiplier, pinType, disabled, stabilizeScrollOnToggle]);
}
