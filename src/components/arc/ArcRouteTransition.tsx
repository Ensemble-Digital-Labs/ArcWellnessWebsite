"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { arcRestoreScrollY } from "@/lib/arcScrollPosition";
import {
  isArcRouteTransitionPath,
  parseInternalArcHref,
  shouldAnimateArcRouteChange,
} from "@/lib/arcRouteTransition";

const EASE = [0.22, 1, 0.36, 1] as const;
/**
 * Fixed beat the curtain holds AFTER the new route commits, before it reveals.
 * Keyed off route commit (not click) so every destination reveals with the same
 * cadence — the only unavoidable variance is how long the cream covers while a
 * page loads (invisible under the opaque curtain; uniform in production builds).
 */
const POST_COMMIT_HOLD_MS = 0;
const CURTAIN_FADE_S = 0.2;
const CONTENT_FADE_S = 0.4;

type ArcRouteTransitionProps = {
  children: ReactNode;
};

/**
 * Next-native between-page transitions for marketing routes.
 * A brief cream curtain on internal navigation + soft content fade-in —
 * no Barba / custom router; works with App Router + Lenis scroll shell.
 */
export function ArcRouteTransition({ children }: ArcRouteTransitionProps) {
  const pathname = usePathname() ?? "/";
  const reducedMotion = useReducedMotion();
  const transitionsEnabled = !reducedMotion && isArcRouteTransitionPath(pathname);

  const [curtainVisible, setCurtainVisible] = useState(false);
  const coverStartedAt = useRef(0);
  const isFirstPath = useRef(true);
  const revealTimer = useRef<number | null>(null);

  const clearRevealTimer = () => {
    if (revealTimer.current) {
      window.clearTimeout(revealTimer.current);
      revealTimer.current = null;
    }
  };

  const scheduleCurtainReveal = () => {
    clearRevealTimer();
    revealTimer.current = window.setTimeout(() => {
      setCurtainVisible(false);
      coverStartedAt.current = 0;
      revealTimer.current = null;
    }, POST_COMMIT_HOLD_MS);
  };

  // Start the curtain as early as possible on in-app link clicks.
  useEffect(() => {
    if (!transitionsEnabled) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const parsed = parseInternalArcHref(href);
      if (!parsed) return;

      if (
        !shouldAnimateArcRouteChange(pathname, parsed.pathname) ||
        parsed.pathname === pathname
      ) {
        return;
      }

      coverStartedAt.current = Date.now();
      setCurtainVisible(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, transitionsEnabled]);

  // Route committed — scroll to top (unless hash) and reveal the new page.
  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }

    clearRevealTimer();

    if (!isArcRouteTransitionPath(pathname)) {
      setCurtainVisible(false);
      coverStartedAt.current = 0;
      return;
    }

    const hash = window.location.hash;
    if (!hash || hash.length <= 1) {
      arcRestoreScrollY(0);
    }

    if (!transitionsEnabled) {
      setCurtainVisible(false);
      coverStartedAt.current = 0;
      return;
    }

    if (!coverStartedAt.current) {
      coverStartedAt.current = Date.now();
      setCurtainVisible(true);
    }

    scheduleCurtainReveal();
    return clearRevealTimer;
  }, [pathname, transitionsEnabled]);

  useEffect(() => clearRevealTimer, []);

  return (
    <>
      <motion.div
        key={pathname}
        initial={transitionsEnabled ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: transitionsEnabled ? CONTENT_FADE_S : 0,
          ease: EASE,
        }}
        className="min-h-full"
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {curtainVisible && transitionsEnabled ? (
          <motion.div
            key="arc-route-curtain"
            role="presentation"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: CURTAIN_FADE_S, ease: EASE }}
            className="pointer-events-none fixed inset-0 z-[11500] bg-arc-cream"
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
