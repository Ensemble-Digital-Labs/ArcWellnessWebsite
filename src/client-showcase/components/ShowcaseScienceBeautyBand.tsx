"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseRoseClass } from "@/client-showcase/design-tokens";
import { showcaseBookCtaClass } from "@/client-showcase/showcase-book-cta";
import { showcaseScienceBeautyBand as band } from "@/client-showcase/mock-page-content";

const EASE = [0.33, 0, 0.2, 1] as const;
/** Slightly more generous than before so scroll-trigger reliably fires as the band enters view. */
const VIEWPORT = { once: true as const, amount: 0.18, margin: "0px 0px 12% 0px" } as const;

const staggerRoot = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.07 },
  },
} as const;

const blurLift = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: EASE },
  },
} as const;

const sectionClass =
  "scroll-mt-36 border-t border-white/10 bg-[#0a0a0a] py-14 sm:py-20 lg:py-24";

type Card = (typeof band.cards)[number];

function LeftColumn() {
  return (
    <>
      <p className="flex items-center gap-3 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.32em]">
        <span className="h-px w-8 shrink-0 bg-arc-rose-gold sm:w-10" aria-hidden />
        <span className={showcaseRoseClass.bright}>{band.eyebrow}</span>
      </p>

      <h2
        id="showcase-science-beauty-heading"
        className="mt-6 font-serif text-[clamp(1.85rem,5.2vw,3.25rem)] font-normal leading-[1.12] tracking-tight text-white sm:mt-8 lg:leading-[1.08]"
      >
        {band.headlineBefore}
        <em className={cn("italic", showcaseRoseClass.bright)}>{band.headlineEmphasis}</em>
        {band.headlineAfter}
      </h2>

      <p className="mt-5 max-w-xl font-sans text-[15px] leading-relaxed text-white/58 sm:mt-6 sm:text-base">
        {band.subhead}
      </p>

      <div className="mt-8 flex max-w-full flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
        <Link href={showcaseInternalHref("/#book")} className={showcaseBookCtaClass("dark")}>
          {band.primaryCta}
        </Link>

        <Link
          href={showcaseInternalHref("/#services")}
          className="inline-flex items-center gap-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white/88 transition-colors hover:text-arc-rose-gold sm:text-[11px] sm:tracking-[0.26em]"
        >
          <span>{band.secondaryLabel}</span>
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-arc-rose-gold/85 text-arc-rose-gold"
            aria-hidden
          >
            <Play className="size-3.5 translate-x-0.5 fill-none" strokeWidth={1.75} />
          </span>
        </Link>
      </div>
    </>
  );
}

function ValueCard({ card }: { card: Card }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-serif text-sm italic text-white/45">{card.index}</span>
        <h3 className="font-sans text-base font-semibold tracking-tight text-white sm:text-lg">
          <span className={showcaseRoseClass.bright}>{card.titleLead}</span>
          <span className="text-white/35">-</span>
          <span>{card.titleTrail}</span>
        </h3>
      </div>
      <p className="mt-3 font-sans text-sm leading-relaxed text-white/55 sm:text-[15px]">{card.description}</p>
    </>
  );
}

/**
 * Dark value band after the concern marquee — blur/lift stagger. Stagger must live on a motion
 * node whose *direct* children are motion nodes (no plain wrapper div in between).
 */
export function ShowcaseScienceBeautyBand() {
  const reduceMotion = useReducedMotion();

  const grid = (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="lg:row-span-3">
          <LeftColumn />
        </div>
        {band.cards.map((card) => (
          <article
            key={card.index}
            className="rounded-xl border border-white/12 bg-white/[0.03] px-5 py-5 sm:px-6 sm:py-6"
          >
            <ValueCard card={card} />
          </article>
        ))}
      </div>
    </div>
  );

  if (reduceMotion) {
    return (
      <section className={sectionClass} aria-labelledby="showcase-science-beauty-heading">
        {grid}
      </section>
    );
  }

  return (
    <section className={sectionClass} aria-labelledby="showcase-science-beauty-heading">
      <motion.div
        className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={staggerRoot}
      >
        <motion.div className="min-w-0 lg:row-span-3" variants={blurLift}>
          <LeftColumn />
        </motion.div>
        {band.cards.map((card) => (
          <motion.article
            key={card.index}
            variants={blurLift}
            className="rounded-xl border border-white/12 bg-white/[0.03] px-5 py-5 sm:px-6 sm:py-6"
          >
            <ValueCard card={card} />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
