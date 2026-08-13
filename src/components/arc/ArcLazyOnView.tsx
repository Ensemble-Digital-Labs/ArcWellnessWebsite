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
 */
export function ArcLazyOnView({
  children,
  rootMargin = "420px 0px",
  className,
  placeholderClassName,
  style,
}: ArcLazyOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

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

  return (
    <div
      ref={ref}
      className={cn(!show ? placeholderClassName : undefined, className)}
      style={style}
    >
      {show ? children : null}
    </div>
  );
}
