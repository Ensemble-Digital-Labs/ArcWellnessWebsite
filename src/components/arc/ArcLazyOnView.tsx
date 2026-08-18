"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ArcLazyOnViewProps = {
  children: ReactNode;
  /** Shown until near-viewport mount (avoids a cream flash / layout pop). */
  placeholder?: ReactNode;
  /** IntersectionObserver rootMargin — load a bit before the block enters view. */
  rootMargin?: string;
  className?: string;
  /** Reserved space before mount to limit layout jump (e.g. min-h-[100dvh]). */
  placeholderClassName?: string;
  style?: CSSProperties;
};

/**
 * Defers mounting (and therefore dynamic-import download) until near the viewport.
 * Use for WebGL / heavy client islands that hurt homepage unused-JS / LCP.
 *
 * Placeholder stays under children briefly after mount so the section never
 * flashes cream while the island / dynamic chunk boots.
 */
export function ArcLazyOnView({
  children,
  placeholder,
  rootMargin = "560px 0px",
  className,
  placeholderClassName,
  style,
}: ArcLazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [keepPlaceholder, setKeepPlaceholder] = useState(Boolean(placeholder));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setShow(true);
        io.disconnect();
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!show || !placeholder) {
      if (show) setKeepPlaceholder(false);
      return;
    }
    let cancelled = false;
    let hideTimer = 0;
    const outer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hideTimer = window.setTimeout(() => {
          if (!cancelled) setKeepPlaceholder(false);
        }, 320);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(outer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [show, placeholder]);

  const showPlaceholder = Boolean(placeholder) && keepPlaceholder;

  return (
    <div
      ref={ref}
      className={cn("relative", !show && placeholderClassName, className)}
      style={style}
    >
      {showPlaceholder ? (
        <div
          className={cn(show && "pointer-events-none absolute inset-0 z-0")}
          aria-hidden={show || undefined}
        >
          {placeholder}
        </div>
      ) : null}
      {show ? <div className="relative z-[1] min-h-0 w-full">{children}</div> : null}
    </div>
  );
}
