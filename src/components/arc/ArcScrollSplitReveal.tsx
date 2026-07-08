"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { playArcEnterOnceWhenVisible } from "@/lib/arcEnterOnceScroll";
import { ARC_VOOBAN_EASE, voobanLineRevealStyle } from "@/lib/arcVoobanMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ArcScrollSplitRevealProps = {
  id?: string;
  className?: string;
  lines: readonly string[];
  lineClassName?: string;
  scrubProgress?: number;
};

/**
 * Vooban slideInUp, masked lines, blur + translate, scroll or pin-scrub driven.
 */
export function ArcScrollSplitReveal({
  id,
  className,
  lines,
  lineClassName,
  scrubProgress,
}: ArcScrollSplitRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (scrubProgress !== undefined) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const root = rootRef.current;
      const targets = lineRefs.current.filter(Boolean) as HTMLParagraphElement[];
      if (!root || !targets.length) return;

      let disposeEnterOnce: (() => void) | null = null;

      const ctx = gsap.context(() => {
        gsap.set(targets, { yPercent: 115, opacity: 0, filter: "blur(8px)" });

        const runReveal = () => {
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.05,
            ease: ARC_VOOBAN_EASE,
            stagger: 0.12,
            overwrite: "auto",
          });
        };

        disposeEnterOnce = playArcEnterOnceWhenVisible(root, runReveal);
      }, root);

      revert = () => {
        disposeEnterOnce?.();
        ctx.revert();
      };
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1600);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [lines, scrubProgress]);

  useEffect(() => {
    if (scrubProgress === undefined) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = lineRefs.current.filter(Boolean) as HTMLParagraphElement[];
    if (!targets.length) return;

    if (mq.matches) {
      gsap.set(targets, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
      return;
    }

    const n = targets.length;
    targets.forEach((el, i) => {
      const style = voobanLineRevealStyle(scrubProgress, i, n);
      el.style.opacity = String(style.opacity);
      el.style.transform = style.transform;
      el.style.filter = style.filter;
    });
  }, [scrubProgress, lines]);

  return (
    <div ref={rootRef} id={id} className={className}>
      {lines.map((line, i) => (
        <div key={`${line.slice(0, 24)}-${i}`} className="overflow-hidden py-0.5 sm:py-1.5">
          <p
            ref={(el) => {
              lineRefs.current[i] = el;
            }}
            className={cn(
              "will-change-[transform,opacity,filter]",
              scrubProgress === undefined && "opacity-0 motion-reduce:opacity-100",
              lineClassName,
            )}
          >
            {line}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ArcScrollRevealMask({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("overflow-hidden", className)}>{children}</div>;
}
