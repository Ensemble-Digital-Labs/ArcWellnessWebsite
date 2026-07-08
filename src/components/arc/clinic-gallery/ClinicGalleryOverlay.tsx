"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ClinicCarouselSlide } from "@/components/arc/ArcClinicCarouselSection";
import {
  ClinicGalleryStaticGrid,
} from "@/components/arc/clinic-gallery/ClinicGalleryDraggableGrid";
import { prefersNativeScroll } from "@/lib/arcScrollMode";
import { cn } from "@/lib/utils";

type ClinicGalleryOverlayProps = {
  open: boolean;
  onClose: () => void;
  slides: readonly ClinicCarouselSlide[];
  reduceMotion: boolean;
  initialSlideIndex?: number;
};

export function ClinicGalleryOverlay({
  open,
  onClose,
  slides,
  reduceMotion,
  initialSlideIndex = 0,
}: ClinicGalleryOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const scrollToFocus = () => {
      document.getElementById("clinic-gallery-focus")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    };

    let scrollTimer: number | undefined;
    const scrollFrame = window.requestAnimationFrame(() => {
      scrollToFocus();
      scrollTimer = window.setTimeout(scrollToFocus, 120);
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    if (prefersNativeScroll()) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      const main = document.getElementById("main");
      if (main) main.style.overflow = "hidden";
    }

    return () => {
      window.cancelAnimationFrame(scrollFrame);
      if (scrollTimer) window.clearTimeout(scrollTimer);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      if (main) main.style.overflow = "";
    };
  }, [open, onClose, reduceMotion, initialSlideIndex]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Clinic photo gallery"
          aria-describedby="clinic-gallery-exit-hint"
          className="fixed inset-0 z-[1100] flex flex-col bg-[#141414] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="relative z-20 flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
            <div className="min-w-0">
              <p
                id="clinic-gallery-exit-hint"
                className="font-sans text-sm text-white/55 sm:text-[0.9375rem]"
              >
                Scroll to explore our space · Hover each photo for its story · Press Esc or close to exit
              </p>
            </div>
            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/30 bg-white/12 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)]",
                "font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white",
                "transition-colors hover:border-arc-teal/50 hover:bg-arc-teal/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]",
              )}
            >
              <X className="size-4" strokeWidth={2} aria-hidden />
              Close gallery
            </motion.button>
          </header>

          <ClinicGalleryStaticGrid slides={slides} initialSlideIndex={initialSlideIndex} />
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
