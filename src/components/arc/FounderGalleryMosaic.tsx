"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ROTATE_INTERVAL_MS_A = 3800;
const ROTATE_INTERVAL_MS_B = 4600;

/** Crossfade length — keep < min(ROTATE_*) so slides don’t stack transitions. */
const CROSSFADE_DURATION_SEC = 1.05;
const CROSSFADE_EASE: [number, number, number, number] = [0.33, 0, 0.2, 1];

const mosaicContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

const mosaicItem: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const mosaicItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Masonry-style regions — 2-column grid (reference layout). */
const areaClasses = [
  "col-start-2 col-end-3 row-start-1 row-end-3",
  "col-start-1 col-end-2 row-start-2 row-end-4",
  "col-start-1 col-end-2 row-start-4 row-end-6",
  "col-start-2 col-end-3 row-start-3 row-end-5",
] as const;

export type FounderMosaicPanel = {
  title: string;
  imageSrc: string;
};

type FounderGalleryMosaicProps = {
  panels: readonly FounderMosaicPanel[];
  portraitAlt: string;
  className?: string;
};

function useFourPanels(panels: readonly FounderMosaicPanel[]): FounderMosaicPanel[] {
  return React.useMemo(() => {
    const first = panels[0];
    if (!first) {
      return [];
    }
    const out = panels.slice(0, 4).map((p) => ({ ...p }));
    while (out.length < 4) {
      const slot = panels[out.length % panels.length] ?? first;
      out.push({ title: slot.title, imageSrc: slot.imageSrc });
    }
    return out;
  }, [panels]);
}

/** Two pools of 3–4 distinct images for the auto-rotating tiles (different order / phase). */
function useRotatePools(panels: readonly FounderMosaicPanel[]) {
  return React.useMemo(() => {
    if (panels.length === 0) {
      return { poolA: [] as FounderMosaicPanel[], poolB: [] as FounderMosaicPanel[] };
    }
    const n = panels.length;
    const at = (i: number) => panels[i % n]!;
    const uniqBySrc = (items: FounderMosaicPanel[]) => {
      const seen = new Set<string>();
      return items.filter((p) => {
        if (seen.has(p.imageSrc)) return false;
        seen.add(p.imageSrc);
        return true;
      });
    };
    const poolA = uniqBySrc([at(1), at(2), at(3), at(4)]);
    const poolB = uniqBySrc([at(2), at(4), at(0), at(3)]);
    const fallback = uniqBySrc([...panels]);
    return {
      poolA: poolA.length >= 3 ? poolA : fallback.slice(0, Math.min(4, fallback.length)),
      poolB: poolB.length >= 3 ? poolB : [...fallback].reverse().slice(0, Math.min(4, fallback.length)),
    };
  }, [panels]);
}

function useRotatingIndex(length: number, intervalMs: number, enabled: boolean) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setI((x) => (x + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs, enabled]);

  React.useEffect(() => {
    if (i >= length) setI(0);
  }, [i, length]);

  return i;
}

function MosaicCellOverlay({ title }: { title: string }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
        aria-hidden
      />
      <span className="absolute bottom-2 left-2 right-2 z-[1] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95 drop-shadow-sm sm:bottom-3 sm:left-3 sm:text-xs">
        {title}
      </span>
    </>
  );
}

function RotatingMosaicCell({
  slides,
  intervalMs,
  itemVariants,
  areaIndex,
}: {
  slides: FounderMosaicPanel[];
  intervalMs: number;
  itemVariants: Variants;
  areaIndex: number;
}) {
  const reduceMotion = useReducedMotion();
  const idx = useRotatingIndex(
    slides.length,
    intervalMs,
    !reduceMotion && slides.length > 1,
  );
  const current = slides[idx] ?? slides[0];
  if (!current) return null;

  return (
    <motion.div
      variants={itemVariants}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
        mass: 0.75,
      }}
      className={cn(
        "relative min-h-[100px] min-w-0 overflow-hidden rounded-xl border border-arc-charcoal/10 shadow-[0_12px_36px_rgba(0,0,0,0.1)] sm:min-h-0 sm:shadow-xl",
        areaClasses[areaIndex],
      )}
    >
      <div className="absolute inset-0">
        {reduceMotion || slides.length <= 1 ? (
          <Image
            src={current.imageSrc}
            alt={`${current.title} — ARC Wellness`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 300px, 42vw"
          />
        ) : (
          slides.map((slide, i) => {
            const active = i === idx;
            return (
              <motion.div
                key={slide.imageSrc}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                }}
                transition={{
                  duration: CROSSFADE_DURATION_SEC,
                  ease: CROSSFADE_EASE,
                }}
                style={{ zIndex: active ? 2 : 1 }}
              >
                <Image
                  src={slide.imageSrc}
                  alt={`${slide.title} — ARC Wellness`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 300px, 42vw"
                />
              </motion.div>
            );
          })
        )}
      </div>
      <div
        className="absolute inset-0 z-[3] bg-gradient-to-t from-black/45 via-transparent to-transparent"
        aria-hidden
      />
      {reduceMotion ? (
        <span className="absolute bottom-2 left-2 right-2 z-[4] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95 drop-shadow-sm sm:bottom-3 sm:left-3 sm:text-xs">
          {current.title}
        </span>
      ) : (
        <motion.span
          key={idx}
          className="absolute bottom-2 left-2 right-2 z-[4] font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95 drop-shadow-sm sm:bottom-3 sm:left-3 sm:text-xs"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.14,
            ease: CROSSFADE_EASE,
          }}
        >
          {current.title}
        </motion.span>
      )}
    </motion.div>
  );
}

/**
 * Four-cell mosaic: two tiles hold 3–4 rotating images; two stay fixed.
 */
export function FounderGalleryMosaic({
  panels,
  portraitAlt,
  className,
}: FounderGalleryMosaicProps) {
  const reduceMotion = useReducedMotion();
  const cells = useFourPanels(panels);
  const { poolA, poolB } = useRotatePools(panels);
  const itemVariants = reduceMotion ? mosaicItemReduced : mosaicItem;

  if (cells.length < 4 || !poolA.length || !poolB.length) {
    return null;
  }

  /* Cells 0 & 2 = static; 1 & 3 = auto-rotating pools */
  const static0 = cells[0]!;
  const static2 = cells[2]!;

  return (
    <motion.div
      className={cn(
        "grid w-full min-w-0 max-w-full grid-cols-2 grid-rows-[minmax(32px,1fr)_minmax(88px,150px)_minmax(32px,1fr)_minmax(88px,150px)_minmax(32px,1fr)] gap-2 sm:grid-rows-[50px_150px_50px_150px_50px] sm:gap-4",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
      variants={mosaicContainer}
    >
      <motion.div
        key={`static-0-${static0.imageSrc}`}
        variants={itemVariants}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 18,
          mass: 0.75,
        }}
        className={cn(
          "relative min-h-[100px] min-w-0 overflow-hidden rounded-xl border border-arc-charcoal/10 shadow-[0_12px_36px_rgba(0,0,0,0.1)] sm:min-h-0 sm:shadow-xl",
          areaClasses[0],
        )}
      >
        <Image
          src={static0.imageSrc}
          alt={portraitAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 300px, 42vw"
        />
        <MosaicCellOverlay title={static0.title} />
      </motion.div>

      <RotatingMosaicCell
        slides={poolA}
        intervalMs={ROTATE_INTERVAL_MS_A}
        itemVariants={itemVariants}
        areaIndex={1}
      />

      <motion.div
        key={`static-2-${static2.imageSrc}`}
        variants={itemVariants}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 18,
          mass: 0.75,
        }}
        className={cn(
          "relative min-h-[100px] min-w-0 overflow-hidden rounded-xl border border-arc-charcoal/10 shadow-[0_12px_36px_rgba(0,0,0,0.1)] sm:min-h-0 sm:shadow-xl",
          areaClasses[2],
        )}
      >
        <Image
          src={static2.imageSrc}
          alt={`${static2.title} — ARC Wellness`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 300px, 42vw"
        />
        <MosaicCellOverlay title={static2.title} />
      </motion.div>

      <RotatingMosaicCell
        slides={poolB}
        intervalMs={ROTATE_INTERVAL_MS_B}
        itemVariants={itemVariants}
        areaIndex={3}
      />
    </motion.div>
  );
}
