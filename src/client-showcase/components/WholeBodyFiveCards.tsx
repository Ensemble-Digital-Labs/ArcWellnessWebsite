"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign, showcaseRoseClass } from "@/client-showcase/design-tokens";
import {
  wholeBodyCards,
  wholeBodySectionHeading,
  type WholeBodyCardData,
} from "@/client-showcase/mock-page-content";

const EASE = [0.33, 0, 0.2, 1] as const;
const VIEWPORT = { once: true as const, amount: 0.1, margin: "0px 0px 14% 0px" } as const;

/** Ambient plate — same family as main site (`public/assets/decoration/background/`). */
const SERVICES_AMBIENT_BG = "/assets/decoration/background/ambient-04.png" as const;

function ServicesAmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <Image
        src={SERVICES_AMBIENT_BG}
        alt=""
        fill
        className="object-cover object-[center_25%]"
        sizes="100vw"
      />
    </div>
  );
}

const cardGridStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.03 },
  },
} as const;

const headlineReveal = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
} as const;

const cardReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: EASE },
  },
} as const;

function pillarArticleClass(card: WholeBodyCardData) {
  return cn(
    "group relative flex h-full min-h-0 flex-col",
    "rounded-2xl border p-4 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)] sm:p-5",
    "lg:rounded-none lg:border-0 lg:border-l lg:border-white/15 lg:px-3 lg:py-8 xl:px-4 lg:shadow-none lg:first:border-l-0",
    card.highlighted
      ? "border-transparent text-white shadow-[0_16px_48px_-24px_rgba(0,0,0,0.55)] lg:ring-1 lg:ring-white/10"
      : "border-white/18 bg-black/30 text-white backdrop-blur-md lg:border-white/12 lg:bg-transparent lg:backdrop-blur-none lg:shadow-none",
  );
}

function pillarArticleStyle(card: WholeBodyCardData): CSSProperties | undefined {
  if (!card.highlighted) return undefined;
  return { backgroundColor: showcaseDesign.pillarForest };
}

function ServicePillarCard({ card, index }: { card: WholeBodyCardData; index: number }) {
  const n = index + 1;
  const badge = `N° ${String(n).padStart(2, "0")}`;
  const hi = Boolean(card.highlighted);

  return (
    <>
      <div className={cn("mb-3 flex items-center gap-2 sm:mb-4", hi ? "text-white/65" : "text-white/60")}>
        <p className="shrink-0 font-mono text-[9px] font-medium uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em]">
          {card.pillarLabel}
        </p>
        <span className={cn("h-px min-w-[1rem] flex-1", hi ? "bg-white/25" : "bg-white/22")} aria-hidden />
      </div>

      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-lg sm:mb-5">
        <Image
          src={card.imageSrc}
          alt=""
          fill
          className={cn(
            "object-cover object-center transition-[transform,opacity] duration-700 ease-out",
            "group-hover:scale-[1.04]",
            hi && "opacity-95 group-hover:opacity-100",
          )}
          sizes="(min-width: 1024px) 19vw, 90vw"
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
            hi ? "from-black/35" : "from-black/55",
          )}
          aria-hidden
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-black/55 px-2 py-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-[2px] sm:left-3 sm:top-3 sm:text-[9px]">
          {badge}
        </span>
        {card.mostChosen ? (
          <span
            className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-arc-charcoal/90 sm:right-3 sm:top-3 sm:text-[9px]"
            style={{ backgroundColor: showcaseDesign.pillarPeach }}
          >
            Most chosen
          </span>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-0.5 pb-1 lg:px-0">
        <h3
          className={cn(
            "font-serif text-[1.15rem] font-semibold leading-[1.15] tracking-tight sm:text-xl",
            showcaseRoseClass.bright,
          )}
        >
          {card.title}
        </h3>
        <ul
          className={cn(
            "mt-3 space-y-2.5 font-sans text-[13px] font-bold leading-snug sm:text-[15px] sm:leading-snug",
            hi ? "text-white/88" : "text-white/84",
          )}
        >
          {card.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5">
              <span className={cn("h-px w-3.5 shrink-0", hi ? "bg-white/40" : "bg-white/45")} aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p
          className={cn(
            "mt-4 font-serif text-[13px] italic leading-relaxed sm:text-sm",
            showcaseRoseClass.bright,
          )}
        >
          {card.quote}
        </p>
        <Link
          href={showcaseInternalHref("/#contact")}
          className={cn(
            "mt-auto pt-5 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors",
            "text-arc-rose-gold hover:text-arc-rose-gold-hover",
          )}
        >
          Explore
          <span aria-hidden className="text-sm font-light transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </>
  );
}

function WholeBodySectionHeader() {
  const h = wholeBodySectionHeading;
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-12 lg:gap-x-16">
      <h2
        className={cn(
          "max-w-2xl font-serif text-[clamp(1.95rem,4vw,3.15rem)] font-semibold leading-[1.1] tracking-[-0.025em]",
          showcaseRoseClass.bright,
        )}
      >
        {h.title}
      </h2>
      <p className="max-w-md font-sans text-[15px] leading-relaxed text-white/76 lg:max-w-none lg:justify-self-end lg:text-right lg:text-[0.95rem] [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]">
        {h.supporting}
      </p>
    </div>
  );
}

type Props = {
  introDelaySec?: number;
};

export function WholeBodyFiveCards({ introDelaySec = 0 }: Props) {
  const reduceMotion = useReducedMotion();
  const sectionClass =
    "relative overflow-hidden scroll-mt-36 border-t border-white/12 py-20 sm:py-24 lg:py-28";

  const cardRow = (
    <div className="mt-10 lg:mt-12">
      <div className="flex justify-center py-2 lg:py-3" aria-hidden>
        <span className="size-1.5 rounded-full bg-arc-teal shadow-[0_0_0_5px_rgba(78,196,176,0.22)]" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:mt-8 lg:grid-cols-5 lg:gap-0 lg:gap-y-0">
        {wholeBodyCards.map((card, index) => (
          <article key={card.pillarLabel} className={pillarArticleClass(card)} style={pillarArticleStyle(card)}>
            <ServicePillarCard card={card} index={index} />
          </article>
        ))}
      </div>
    </div>
  );

  if (reduceMotion) {
    return (
      <section id="services" className={sectionClass}>
        <ServicesAmbientBackdrop />
        <div className="relative z-[1] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <WholeBodySectionHeader />
          {cardRow}
        </div>
      </section>
    );
  }

  return (
    <section id="services" className={sectionClass}>
      <ServicesAmbientBackdrop />
      <motion.div
        className="relative z-[1] mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.14,
              delayChildren: 0.05 + introDelaySec,
            },
          },
        }}
      >
        <motion.div variants={headlineReveal}>
          <WholeBodySectionHeader />
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center py-2 lg:mt-12 lg:py-3"
          aria-hidden
          variants={headlineReveal}
        >
          <span className="size-1.5 rounded-full bg-arc-teal shadow-[0_0_0_5px_rgba(78,196,176,0.22)]" />
        </motion.div>

        <motion.div
          className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:mt-8 lg:grid-cols-5 lg:gap-0"
          variants={cardGridStagger}
        >
          {wholeBodyCards.map((card, index) => (
            <motion.article
              key={card.pillarLabel}
              variants={cardReveal}
              whileHover={{ y: -5, transition: { duration: 0.38, ease: EASE } }}
              className={cn(pillarArticleClass(card), "will-change-transform")}
              style={pillarArticleStyle(card)}
            >
              <ServicePillarCard card={card} index={index} />
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
