"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseRoseClass } from "@/client-showcase/design-tokens";
import { showcaseBookCtaClass } from "@/client-showcase/showcase-book-cta";
import { whoWeAreCopy } from "@/client-showcase/mock-page-content";

const COL_EASE = [0.33, 0, 0.2, 1] as const;
const COL_DURATION = 1.15;
const COL_VIEWPORT = { once: true as const, amount: 0.38 };
const SECOND_COL_DELAY = 0.12;

type Props = {
  imageSrc: string;
  /** Aligns with global section stagger when this block is not wrapped in `ShowcaseSectionReveal`. */
  introDelaySec?: number;
};

function CopyColumn() {
  const [firstParagraph, ...restParagraphs] = whoWeAreCopy.paragraphs;

  return (
    <div className="max-w-xl lg:max-w-none lg:pr-4">
      <div className="border-l-2 border-arc-rose-gold-ink/40 pl-4 sm:pl-5">
        <p
          className={cn(
            "max-w-md text-balance font-sans text-[10px] font-semibold uppercase leading-snug tracking-[0.2em] sm:text-[11px] sm:tracking-[0.24em]",
            showcaseRoseClass.ink,
          )}
        >
          {whoWeAreCopy.eyebrow}
        </p>
      </div>

      <h2 className="mt-6 whitespace-pre-line font-serif text-[clamp(1.9rem,4vw,3rem)] font-normal leading-[1.12] tracking-[-0.02em] text-arc-charcoal sm:mt-8 sm:leading-[1.1]">
        {whoWeAreCopy.headlineParts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className={cn("font-medium italic", showcaseRoseClass.ink)}>
              {part}
            </span>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
      </h2>

      <div className="mt-7 space-y-5 sm:mt-8">
        <p className="font-sans text-[15px] leading-[1.7] text-arc-charcoal/76 sm:text-base">{firstParagraph}</p>
        {restParagraphs.map((p, i) => (
          <p
            key={i}
            className="rounded-r-lg border-l-2 border-arc-rose-gold-ink/25 bg-white/55 py-3 pl-4 font-serif text-[1.05rem] leading-relaxed text-arc-charcoal/88 sm:py-4 sm:pl-5 sm:text-[1.125rem]"
          >
            {p}
          </p>
        ))}
      </div>

      <Link
        href={showcaseInternalHref("/#book")}
        className={cn("mt-9 sm:mt-10", showcaseBookCtaClass("light", "px-8 py-3.5"))}
      >
        Book your consultation
      </Link>
    </div>
  );
}

/**
 * Per-column blur-lift reveals so tall stacked layouts read clearly (whole-section IO was too coarse).
 */
export function WhoWeAreRevealGrid({ imageSrc, introDelaySec = 0 }: Props) {
  const reduceMotion = useReducedMotion();

  const colMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, filter: "blur(5px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: COL_VIEWPORT,
        transition: { duration: COL_DURATION, delay: introDelaySec, ease: COL_EASE },
      };

  const imageMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16, filter: "blur(5px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: COL_VIEWPORT,
        transition: { duration: COL_DURATION, delay: introDelaySec + SECOND_COL_DELAY, ease: COL_EASE },
      };

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:gap-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 xl:gap-20">
      <motion.div className="min-w-0" {...colMotion}>
        <CopyColumn />
      </motion.div>
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_24px_56px_-20px_rgba(44,44,44,0.22)] ring-1 ring-arc-charcoal/[0.07] lg:aspect-[3/4]"
        {...imageMotion}
      >
        <Image
          src={imageSrc}
          alt="Physician consulting with a patient at ARC Wellness"
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 42vw, 100vw"
        />
      </motion.div>
    </div>
  );
}
