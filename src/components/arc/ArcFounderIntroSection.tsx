"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FounderEditorialHeroLayer,
  FounderEditorialHeroStatic,
  FOUNDER_COPY_FADE_IN_END,
  FOUNDER_COPY_FADE_IN_START,
  FOUNDER_HERO_REVEAL_END,
} from "@/components/arc/FounderEditorialHero";
import { FounderGalleryMosaic } from "@/components/arc/FounderGalleryMosaic";
import { PinnedSection } from "@/components/arc/PinnedSection";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { FOUNDER_SECTION_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { ARC_PINNED_CLEAR_BELOW_LOGO } from "@/lib/arc-layout";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type FounderAccordionPanel = {
  title: string;
  imageSrc: string;
};

type ArcFounderIntroSectionProps = {
  id?: string;
  className?: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  headline: string;
  headlineEmphasisWord: string;
  headlineEmphasisWord2?: string;
  /** First line above the large italic name (e.g. “Meet Dr.”). */
  heroMeetLead?: string;
  /** Large italic name line (e.g. “Danish Jabbar”). */
  heroNameItalic?: string;
  roleTitle: string;
  intro: string;
  deliverablesHeading: string;
  deliverables: readonly string[];
  accordionPanels?: readonly FounderAccordionPanel[];
};

function FounderImmersiveScrollBody({
  id,
  className,
  children,
  imageSrc,
  imageAlt,
  heroCopy,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  heroCopy: { meetLead: string; nameItalic: string; credential: string };
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useMotionValue(0);

  const opacityCopy = useTransform(
    progress,
    [FOUNDER_COPY_FADE_IN_START, FOUNDER_COPY_FADE_IN_END, 1],
    [0, 1, 1],
  );
  const copyScale = useTransform(
    progress,
    [FOUNDER_COPY_FADE_IN_START, FOUNDER_COPY_FADE_IN_END, 1],
    [0.94, 1, 1],
  );

  /** Frosted top strip — strongest at section entry, fades as the editorial hero establishes. */
  const topBlendOpacity = useTransform(
    progress,
    [0, FOUNDER_HERO_REVEAL_END * 0.35, FOUNDER_HERO_REVEAL_END],
    [1, 0.55, 0],
  );

  useEffect(() => {
    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!section || !main) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          scroller: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.set(self.progress);
          },
        });
      }, section);

      revert = () => ctx.revert();

      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) {
      onReady();
    }
    const fallback = window.setTimeout(() => {
      if (!cancelled && revert === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      revert?.();
    };
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative h-[340vh] scroll-mt-28 bg-arc-cream pt-0", className)}
    >
      <div className="sticky top-0 relative flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-arc-cream">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={FOUNDER_SECTION_AMBIENT_SRC}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <FounderEditorialHeroLayer
          progress={progress}
          mainSrc={imageSrc}
          mainAlt={imageAlt}
          meetLead={heroCopy.meetLead}
          nameItalic={heroCopy.nameItalic}
          credential={heroCopy.credential}
        />

        <motion.div
          aria-hidden
          style={{ opacity: topBlendOpacity }}
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-[12] h-[min(28vh,11rem)]",
            /* Neutral charcoal frost — no teal/green tint; blur picks up scene beneath */
            "bg-gradient-to-b from-arc-charcoal/[0.48] via-arc-charcoal/[0.2] to-transparent",
            "backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-xl",
            "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]",
            "mask-image-[linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]",
          )}
        />

        <motion.div
          style={{ opacity: opacityCopy }}
          className={cn(
            ARC_PINNED_CLEAR_BELOW_LOGO,
            "relative z-20 mx-auto flex h-full min-h-0 w-full max-w-3xl flex-1 flex-col justify-start px-5 pb-6 sm:px-7 md:max-w-4xl md:px-10 lg:max-w-5xl lg:px-12 xl:max-w-6xl 2xl:max-w-7xl",
            "[@media(max-height:760px)]:pb-4",
          )}
        >
          <div className="pointer-events-auto flex min-h-0 min-w-0 flex-1 flex-col justify-center">
            <motion.div
              style={{ scale: copyScale }}
              className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col justify-center origin-top"
            >
              <div
                className={cn(
                  "min-h-0 min-w-0 w-full max-w-full flex-1 overflow-y-auto overscroll-y-contain break-words text-pretty text-left",
                  "pl-0 sm:pl-1 md:pl-28 lg:pl-44 xl:pl-72 2xl:pl-[22rem]",
                  "[scrollbar-gutter:stable]",
                  "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
                  "[@media(max-height:820px)]:[&_h2]:mb-1 [@media(max-height:820px)]:[&_h2]:text-[clamp(1.65rem,4.2svh,2.15rem)] [@media(max-height:820px)]:[&_h2]:leading-[1.08]",
                  "[@media(max-height:820px)]:[&_p]:mb-3 [@media(max-height:820px)]:[&_ul]:space-y-1.5 [@media(max-height:820px)]:[&_li]:gap-2",
                )}
              >
                {children}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Physician-founder — editorial full-bleed hero (reference-style) + scroll handoff to detail copy; reduced-motion uses static hero + mosaic.
 */
export function ArcFounderIntroSection({
  id,
  className,
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  headlineEmphasisWord,
  headlineEmphasisWord2,
  heroMeetLead: heroMeetLeadProp,
  heroNameItalic: heroNameItalicProp,
  roleTitle,
  intro,
  deliverablesHeading,
  deliverables,
  accordionPanels: accordionPanelsProp,
}: ArcFounderIntroSectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const mosaicPanels =
    accordionPanelsProp?.length && accordionPanelsProp.length > 0
      ? accordionPanelsProp
      : [
          { title: "Portrait", imageSrc },
          { title: "Practice", imageSrc },
          { title: "Care", imageSrc },
          { title: "Continuity", imageSrc },
        ];

  const heroMeetLead =
    heroMeetLeadProp?.trim() || "Meet Dr.";
  const heroNameItalic =
    heroNameItalicProp?.trim() ||
    headline.replace(/^Dr\.\s*/i, "").trim() ||
    headline;
  const heroCredential = roleTitle;

  const e1 = headlineEmphasisWord.trim();
  const e2 = headlineEmphasisWord2?.trim() ?? "";
  const i1 = e1.length ? headline.indexOf(e1) : -1;
  const i2 =
    e2.length && i1 !== -1
      ? headline.indexOf(e2, i1 + e1.length)
      : -1;
  const hasDoubleEmphasis = i1 !== -1 && i2 !== -1;
  const hasSingleEmphasis =
    !hasDoubleEmphasis && e1.length > 0 && i1 !== -1;
  const beforeSingle = hasSingleEmphasis
    ? headline.slice(0, i1).trimEnd()
    : "";
  const afterSingle = hasSingleEmphasis
    ? headline.slice(i1 + e1.length).trimStart()
    : "";
  const beforeDouble = hasDoubleEmphasis ? headline.slice(0, i1).trimEnd() : "";
  const gapDouble =
    hasDoubleEmphasis ? headline.slice(i1 + e1.length, i2) : "";
  const afterDouble = hasDoubleEmphasis
    ? headline.slice(i2 + e2.length).trimStart()
    : "";

  const copyInner = (
    <>
      {eyebrow?.trim() ? (
        <div className="mb-4 flex items-center gap-3 sm:mb-5">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-arc-rose-gold-ink">
            {eyebrow}
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-arc-rose-gold-ink/45" aria-hidden />
        </div>
      ) : null}

      <h2 className="mb-2 max-w-full break-words font-serif text-[2.15rem] font-bold leading-[1.08] tracking-tight text-arc-charcoal sm:text-[2.45rem] sm:leading-[1.06] md:text-[2.9rem] md:leading-[1.05] lg:text-[3.25rem] lg:leading-[1.04] xl:text-[3.55rem]">
        {hasDoubleEmphasis ? (
          <>
            {beforeDouble}
            {beforeDouble ? " " : null}
            <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{e1}</TitleEmphasis>
            {gapDouble || " "}
            <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{e2}</TitleEmphasis>
            {afterDouble ? <> {afterDouble}</> : null}
          </>
        ) : hasSingleEmphasis ? (
          <>
            {beforeSingle}
            {beforeSingle ? " " : null}
            <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{e1}</TitleEmphasis>
            {afterSingle ? <> {afterSingle}</> : null}
          </>
        ) : (
          headline
        )}
      </h2>

      <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-arc-charcoal/70 sm:mb-5 sm:text-[0.7rem]">
        {roleTitle}
      </p>

      <p className="mb-6 font-sans text-sm leading-relaxed text-arc-charcoal/90 sm:mb-8 sm:text-[0.95rem] md:text-base">
        {intro}
      </p>

      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-arc-charcoal/80">
        {deliverablesHeading}
      </p>
      <ul className="space-y-2.5 sm:space-y-3">
        {deliverables.map((line) => (
          <li key={line} className="flex min-w-0 gap-2.5 text-left sm:gap-3">
            <span
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-arc-rose-gold-ink/12 text-arc-rose-gold-ink"
              aria-hidden
            >
              <Check className="size-3" strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1 break-words font-sans text-[0.8125rem] leading-snug text-arc-charcoal/90 sm:text-sm">
              {line}
            </span>
          </li>
        ))}
      </ul>
    </>
  );

  if (reduceMotion) {
    return (
      <PinnedSection
        id={id}
        className={cn(
          "flex min-h-[100dvh] flex-col justify-start gap-8 bg-arc-cream px-5 py-12 sm:px-6 sm:py-16 md:px-8 lg:flex-row lg:items-start lg:gap-10 lg:px-10 xl:mx-auto xl:max-w-7xl xl:gap-14 xl:px-8",
          className,
        )}
      >
        <div data-scroll-section className="w-full shrink-0 lg:col-span-full">
          <FounderEditorialHeroStatic
            mainSrc={imageSrc}
            mainAlt={imageAlt}
            meetLead={heroMeetLead}
            nameItalic={heroNameItalic}
            credential={heroCredential}
          />
        </div>

        <div
          data-scroll-section
          className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-10 lg:flex-row lg:gap-10"
        >
          <div className="flex min-h-0 w-full min-w-0 max-w-full flex-col pl-0 sm:pl-2 md:pl-24 lg:max-w-md lg:shrink-0 lg:pl-32 xl:max-w-xl xl:pl-48 2xl:pl-60">
            {copyInner}
          </div>

          <div className="w-full min-w-0 flex-1 lg:max-w-xl">
            <FounderGalleryMosaic panels={mosaicPanels} portraitAlt={imageAlt} />
          </div>
        </div>
      </PinnedSection>
    );
  }

  return (
    <FounderImmersiveScrollBody
      id={id}
      className={className}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      heroCopy={{
        meetLead: heroMeetLead,
        nameItalic: heroNameItalic,
        credential: heroCredential,
      }}
    >
      {copyInner}
    </FounderImmersiveScrollBody>
  );
}
