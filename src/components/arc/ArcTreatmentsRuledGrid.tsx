"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  ARC_EDITORIAL_BODY_CLASS,
  ARC_STACKED_HEADLINE_SERIF_CLASS,
  TitleEmphasis,
  arcHeadlineEmphasisClass,
} from "@/components/arc/TitleEmphasis";
import type { TreatmentPage } from "@/content/pages/treatments";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ArcTreatmentsRuledGridProps = {
  id?: string;
  title: string;
  titleEmphasis?: string;
  subtitle?: string;
  treatments: readonly TreatmentPage[];
  /** Accent for script headings + row labels — teal matches About. */
  accentTone?: "teal";
  topSeam?: boolean;
  bottomSeam?: boolean;
  className?: string;
};

const ROMAN_NUMERALS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
] as const;

function treatmentRomanNumeral(index: number): string {
  return ROMAN_NUMERALS[index] ?? String(index + 1);
}

const rowRootVariants = {
  initial: {},
  hover: {},
};

const titleStaggerVariants = {
  initial: {},
  hover: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const titleLetterVariants = {
  initial: { x: 0 },
  hover: {
    x: 10,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
};

const arrowVariants = {
  initial: { x: "100%", opacity: 0 },
  hover: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};

const previewVariants = {
  initial: { scale: 0, rotate: "-12deg", opacity: 0 },
  hover: {
    scale: 1,
    rotate: "10deg",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 24 },
  },
};

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return canHover;
}

function TreatmentInteractiveRow({
  treatment,
  index,
  accentTone,
}: {
  treatment: TreatmentPage;
  index: number;
  accentTone: "teal";
}) {
  const reducedMotion = useReducedMotion();
  const canHover = useCanHover();
  const showInteractivePreview = canHover && !reducedMotion;
  const accentInk = "text-arc-teal-ink";
  const accentBright = "text-arc-teal";

  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 280, damping: 32, mass: 0.55 });
  const springY = useSpring(py, { stiffness: 280, damping: 32, mass: 0.55 });
  const top = useTransform(springY, [0.5, -0.5], ["38%", "62%"]);
  const left = useTransform(springX, [0.5, -0.5], ["72%", "52%"]);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!showInteractivePreview) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (!w || !h) return;
    px.set((e.clientX - rect.left) / w - 0.5);
    py.set((e.clientY - rect.top) / h - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  return (
    <li className="border-b border-arc-charcoal/12">
      <Link
        href={`/treatments/${treatment.slug}`}
        onMouseEnter={() => showInteractivePreview && setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative flex items-center gap-4 overflow-visible px-4 py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream sm:gap-8 sm:px-6 sm:py-8 md:gap-10 md:px-8 md:py-9"
      >
        {showInteractivePreview ? (
          <span
            className={cn(
              "pointer-events-none absolute inset-0 z-0 transition-[opacity,background-color] duration-300 ease-out",
              hovered ? "bg-arc-charcoal/78 opacity-100" : "bg-arc-teal-muted/0 opacity-0",
            )}
            aria-hidden
          />
        ) : (
          <span
            className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 scale-x-0 bg-arc-teal-muted/45 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            aria-hidden
          />
        )}

        {showInteractivePreview ? (
          <motion.div
            className="pointer-events-none absolute z-[5] size-[clamp(6.5rem,16vw,10.5rem)]"
            style={{
              top,
              left,
              x: "-50%",
              y: "-50%",
            }}
            initial="initial"
            animate={hovered ? "hover" : "initial"}
            variants={previewVariants}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/40 bg-arc-cream-deep shadow-[0_18px_44px_rgba(44,44,44,0.2)] ring-2 ring-white/50">
              <Image
                src={treatment.imageSrc}
                alt=""
                fill
                sizes="(max-width: 768px) 120px, 168px"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-arc-charcoal/25 via-transparent to-transparent" />
            </div>
          </motion.div>
        ) : null}

        <p
          className={cn(
            "relative z-10 shrink-0 font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-normal leading-[0.82] tracking-tight transition-colors duration-300 sm:pt-0.5",
            showInteractivePreview && hovered
              ? cn(
                  accentBright,
                  "[text-shadow:0_1px_12px_rgba(0,0,0,0.4)]",
                )
              : cn(
                  "text-arc-charcoal/22",
                  "group-hover:text-arc-teal-ink/40",
                ),
          )}
          aria-hidden
        >
          {treatmentRomanNumeral(index)}
        </p>

        {showInteractivePreview ? (
          <motion.div
            className="relative z-10 flex min-w-0 flex-1 items-center justify-between gap-4 sm:gap-6"
            initial="initial"
            animate={hovered ? "hover" : "initial"}
            variants={rowRootVariants}
          >
            <div className="min-w-0 flex-1 pr-2 sm:pr-4">
              <p
                className={cn(
                  "font-sans text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                  hovered
                    ? cn(accentBright, "[text-shadow:0_1px_10px_rgba(0,0,0,0.35)]")
                    : accentInk,
                )}
              >
                {treatment.categoryLabel}
              </p>
              <motion.h3
                className={cn(
                  "mt-1.5 flex flex-wrap font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight transition-colors duration-300",
                  hovered
                    ? "text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
                    : "text-arc-charcoal",
                )}
                variants={titleStaggerVariants}
              >
                {treatment.title.split("").map((char, ci) => (
                  <motion.span
                    key={`${treatment.slug}-char-${ci}`}
                    variants={titleLetterVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h3>
              <p
                className={cn(
                  "mt-2.5 break-words transition-colors duration-300 md:mt-3",
                  "font-serif text-[clamp(1rem,2.1vw,1.25rem)] font-medium leading-[1.42] tracking-tight",
                  hovered
                    ? "text-white/92 [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]"
                    : "text-arc-charcoal/88",
                )}
              >
                {treatment.tagline}
              </p>
            </div>

            <div className="hidden shrink-0 overflow-hidden sm:block">
              <motion.span variants={arrowVariants} className="flex" aria-hidden>
                <ArrowRight
                  className={cn(
                    "size-6 transition-colors duration-300 md:size-7",
                    hovered ? "text-white" : accentInk,
                  )}
                  strokeWidth={1.75}
                />
              </motion.span>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="relative z-10 min-w-0 flex-1">
              <p className={cn("font-sans text-[10px] font-semibold uppercase tracking-[0.22em]", accentInk)}>
                {treatment.categoryLabel}
              </p>
              <h3
                className={cn(
                  "mt-1.5 break-words font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-arc-charcoal transition-colors",
                  "group-hover:text-arc-teal-ink",
                )}
              >
                {treatment.title}
              </h3>
              <p
                className={cn(
                  "mt-2.5 break-words md:mt-3",
                  "font-serif text-[clamp(1rem,2.1vw,1.25rem)] font-medium leading-[1.42] tracking-tight text-arc-charcoal/88",
                )}
              >
                {treatment.tagline}
              </p>
            </div>

            <span
              className={cn(
                "relative z-10 inline-flex shrink-0 items-center gap-2 self-start font-sans text-[11px] font-semibold uppercase tracking-[0.18em] sm:self-center",
                accentInk,
              )}
            >
              View
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </span>
          </>
        )}
      </Link>
    </li>
  );
}

/**
 * Treatment index, same text system as About values / mission (stacked serif + script, editorial body, ruled rows).
 */
export function ArcTreatmentsRuledGrid({
  id,
  title,
  titleEmphasis,
  subtitle,
  treatments,
  accentTone = "teal",
  topSeam = false,
  bottomSeam = false,
  className,
}: ArcTreatmentsRuledGridProps) {
  const rows = treatments.filter((t) => t.slug !== "overview");
  const emphasisClass = arcHeadlineEmphasisClass(accentTone);

  return (
    <section
      id={id}
      className={cn(
        "relative bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24 lg:py-28",
        className,
      )}
    >
      {topSeam ? (
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
      ) : null}
      {bottomSeam ? (
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      ) : null}
      <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
        <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
          <header className="mb-10 min-w-0 lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:pt-2 xl:top-32">
            <ArcTextReveal variant="heading">
              <div className="pb-[0.12em] pl-[0.06em]">
                <h2
                  className={cn(
                    "inline-flex max-w-full flex-wrap items-baseline gap-x-[0.28em] text-arc-charcoal sm:flex-nowrap",
                    ARC_STACKED_HEADLINE_SERIF_CLASS,
                  )}
                >
                  <TitleEmphasis
                    className={cn(emphasisClass, "shrink-0 leading-none")}
                  >
                    {title}
                  </TitleEmphasis>
                  {titleEmphasis ? (
                    <TitleEmphasis
                      className={cn(emphasisClass, "shrink-0 leading-none")}
                    >
                      {titleEmphasis}
                    </TitleEmphasis>
                  ) : null}
                </h2>
              </div>
            </ArcTextReveal>
            {subtitle ? (
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className={cn("mt-8 min-w-0 sm:mt-10", ARC_EDITORIAL_BODY_CLASS, "text-arc-charcoal/90")}>
                  {subtitle}
                </p>
              </ArcTextReveal>
            ) : null}
          </header>

          <ul className="min-w-0 border-t border-arc-charcoal/12">
            {rows.map((t, idx) => (
              <TreatmentInteractiveRow key={t.slug} treatment={t} index={idx} accentTone={accentTone} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
