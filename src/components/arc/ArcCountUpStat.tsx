"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ArcCountUpStatProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
  align?: "center" | "left";
  numberClassName?: string;
  labelClassName?: string;
  className?: string;
  durationMs?: number;
  /** Delay before the count starts, e.g. to wait for a fade-in to finish. */
  startDelayMs?: number;
};

function prefersInstantCount(): boolean {
  if (typeof window === "undefined") return false;
  // Phones / small viewports: skip RAF count-up — it fights touch scrolling.
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * In-view count-up stat. Animates from 0 to `value` the first time it scrolls
 * into view. When the user prefers reduced motion (or is on mobile), it renders
 * the final value immediately with no animation.
 *
 * Desktop animation writes the number via a DOM ref (not React state per frame)
 * so scroll stays smooth while the counter runs.
 */
export function ArcCountUpStat({
  value,
  prefix = "+",
  suffix = "%",
  label,
  align = "center",
  numberClassName,
  labelClassName,
  className,
  durationMs = 2400,
  startDelayMs = 0,
}: ArcCountUpStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const write = (n: number) => {
      if (valueRef.current) valueRef.current.textContent = String(n);
    };

    if (reducedMotion || prefersInstantCount()) {
      write(value);
      setDisplay(value);
      return;
    }

    let raf = 0;
    const startCounting = () => {
      const start = performance.now();
      let lastShown = -1;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        // easeOutQuart — gentle, smooth deceleration with a long tail.
        const eased = 1 - Math.pow(1 - t, 4);
        const next = Math.round(eased * value);
        // Skip duplicate paints when the rounded value hasn't changed.
        if (next !== lastShown) {
          lastShown = next;
          write(next);
        }
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const timeout = window.setTimeout(startCounting, startDelayMs);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [inView, reducedMotion, value, durationMs, startDelayMs]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        align === "left" ? "items-start text-left" : "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "font-serif text-[clamp(2.5rem,7vw,3.75rem)] font-semibold leading-none tracking-tight text-arc-teal-ink tabular-nums",
          numberClassName,
        )}
      >
        {prefix}
        <span ref={valueRef}>{display}</span>
        {suffix}
      </span>
      {label ? (
        <span
          className={cn(
            "mt-3 max-w-[14rem] font-sans text-sm leading-snug text-arc-charcoal/78",
            labelClassName,
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
