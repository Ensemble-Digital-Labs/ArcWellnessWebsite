"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import {
  getWelcomeGallerySlots,
  WELCOME_GALLERY_FOCAL_INDEX,
} from "@/content/welcomeGallery";
import { ARC_PINNED_CLEAR_BELOW_LOGO } from "@/lib/arc-layout";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery motion completes in the first ~half of progress; remaining scroll is stable, readable copy.
 */
const GALLERY_PROGRESS_END = 0.52;

/** Copy block fade (Framer) — keep in sync with `copyStageBgOpacity` below. */
const COPY_FADE_IN_START = 0.34;
const COPY_FADE_IN_END = 0.56;

/** Full-bleed art behind the about copy phase (after collage fades). */
const WELCOME_COPY_STAGE_BG = "/assets/decoration/background/about-copy-stage.png";

/** Same right-anchored crop as phones for every width below 1440px; center only on wide desktops. */
const COPY_STAGE_BG_OBJECT =
  "object-cover object-right min-[1440px]:object-center";

/** Background art ramps in slightly earlier so it reads during the collage → copy handoff. */
function copyStageBgOpacity(sectionProgress: number): number {
  const start = 0.28;
  const end = GALLERY_PROGRESS_END;
  if (sectionProgress <= start) return 0;
  if (sectionProgress >= end) return 1;
  return (sectionProgress - start) / (end - start);
}

/**
 * Staggered vw/vh frames — scaled ~1.2× vs CodePen reference so the collage reads closer to **full-bleed**.
 */
const IMAGE_STYLES: readonly string[] = [
  "w-[30vw] h-[30vh]",
  "w-[42vw] h-[36vh] -top-[36vh] left-[6vw]",
  "w-[24vw] h-[62vh] -top-[18vh] -left-[28vw]",
  "w-[19vw] h-[26vh] left-[28vw] -top-[1vh] sm:w-[20vw] sm:h-[30vh] sm:left-[30vw] sm:-top-[2vh] md:w-[20vw] md:h-[46vh] md:left-[28vw] md:-top-[5vh]",
  "w-[24vw] h-[34vh] top-[34vh] left-[6vw]",
  "w-[38vw] h-[30vh] top-[32vh] -left-[27vw]",
  "w-[15vw] h-[16vh] top-[34vh] left-[28vw] sm:w-[16vw] sm:h-[17vh] sm:top-[36vh] sm:left-[30vw] md:w-[18vw] md:h-[18vh] md:top-[34vh] md:left-[32vw]",
];

function defaultGallerySrcs(): string[] {
  return getWelcomeGallerySlots();
}

type ArcWelcomeSplitSectionProps = {
  id?: string;
  className?: string;
  /** Primary image for reduced-motion split layout. */
  imageSrc: string;
  /**
   * Optional — defaults to **`getWelcomeGallerySlots()`** (focal at index
   * **`WELCOME_GALLERY_FOCAL_INDEX`**, see `welcomeGallery.ts`). Pass 7 paths for a fixed order.
   */
  galleryImageSrcs?: readonly string[];
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
};

function splitHeadline(headline: string, headlineEmphasisWord: string) {
  const emphasisIdx = headline.indexOf(headlineEmphasisWord);
  const hasEmphasis =
    headlineEmphasisWord.length > 0 && emphasisIdx !== -1;
  const before = hasEmphasis
    ? headline.slice(0, emphasisIdx).trimEnd()
    : headline.trimEnd();
  const after = hasEmphasis
    ? headline.slice(emphasisIdx + headlineEmphasisWord.length).trimStart()
    : "";
  return { hasEmphasis, before, after };
}

export function ArcWelcomeSplitSection({
  id,
  className,
  imageSrc,
  galleryImageSrcs,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
}: ArcWelcomeSplitSectionProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const split = splitHeadline(headline, headlineEmphasisWord);

  if (reduceMotion) {
    return (
      <PinnedSection
        id={id}
        className={cn(
          ARC_PINNED_CLEAR_BELOW_LOGO,
          "relative box-border flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-arc-cream px-5 pb-5 scroll-mt-28 sm:px-7 md:px-10 lg:px-12",
          className,
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <Image
            src={WELCOME_COPY_STAGE_BG}
            alt=""
            fill
            className={COPY_STAGE_BG_OBJECT}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-arc-cream/30" />
        </div>
        <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col">
          <WelcomeSplitStaticBody
            imageSrc={imageSrc}
            split={split}
            headline={headline}
            headlineEmphasisWord={headlineEmphasisWord}
            paragraph1={paragraph1}
            paragraph2={paragraph2}
            proofLead={proofLead}
            proofRest={proofRest}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
          />
        </div>
      </PinnedSection>
    );
  }

  return (
    <WelcomeImmersiveScrollBody
      id={id}
      className={className}
      gallerySrcs={
        galleryImageSrcs?.length
          ? [...galleryImageSrcs]
          : defaultGallerySrcs()
      }
      split={split}
      headline={headline}
      headlineEmphasisWord={headlineEmphasisWord}
      paragraph1={paragraph1}
      paragraph2={paragraph2}
      proofLead={proofLead}
      proofRest={proofRest}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
    />
  );
}

type SplitHeadline = ReturnType<typeof splitHeadline>;

function WelcomeSplitStaticBody({
  imageSrc,
  split,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
}: {
  imageSrc: string;
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  const { hasEmphasis, before, after } = split;

  return (
    <div
      className={cn(
        "mx-auto grid min-h-0 w-full max-w-6xl flex-1 grid-cols-1 content-start gap-5",
        "sm:gap-6",
        "md:grid-cols-12 md:items-start md:gap-x-10 md:gap-y-0 lg:max-w-7xl lg:gap-x-14",
      )}
    >
      <div
        data-scroll-section
        className={cn(
          "relative w-full shrink-0 overflow-hidden rounded-sm bg-arc-cream-deep/15",
          "h-[min(28vh,240px)] min-h-[150px] max-h-[280px] sm:h-[min(30vh,260px)] sm:max-h-[300px]",
          "md:col-span-5 md:h-[min(68dvh,600px)] md:min-h-[260px] md:max-h-none lg:col-span-5",
        )}
      >
        <Image
          src={imageSrc}
          alt="Consultation at ARC Wellness"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 38vw, 100vw"
          priority={false}
        />
      </div>

      <div
        data-scroll-section
        className={cn(
          "flex min-h-0 flex-col justify-start md:col-span-7 lg:col-span-7",
          "pt-0.5 md:pt-1 md:pb-2 md:pl-2 lg:pl-4",
        )}
      >
        <h2 className="mb-3 max-w-[22ch] font-serif text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-arc-charcoal sm:text-3xl md:mb-4 md:max-w-none md:text-[2rem] md:leading-[1.1] lg:text-[2.35rem]">
          {hasEmphasis ? (
            <>
              {before}
              {before ? " " : null}
              <TitleEmphasis className="text-[1.38em] leading-[1.05] sm:text-[1.44em] md:text-[1.52em] lg:text-[1.58em] text-arc-teal">
                {headlineEmphasisWord}
              </TitleEmphasis>
              {after ? <> {after}</> : null}
            </>
          ) : (
            headline
          )}
        </h2>

        <div className="max-w-xl space-y-2.5 font-sans text-[13px] leading-[1.55] text-arc-charcoal/88 sm:space-y-3 sm:text-[0.92rem] md:text-[0.95rem] md:leading-relaxed lg:text-base">
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
          <p className="text-arc-charcoal">
            <strong className="font-semibold text-arc-charcoal">{proofLead}</strong>{" "}
            {proofRest}
          </p>
        </div>

        <Link
          href={ctaHref}
          className="group mt-5 inline-flex w-fit items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-arc-teal transition-colors hover:text-arc-teal-hover sm:mt-6 sm:text-xs md:mt-7 md:text-sm"
        >
          {ctaLabel}
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 sm:size-4"
            strokeWidth={2}
          />
        </Link>
      </div>
    </div>
  );
}

function WelcomeImmersiveScrollBody({
  id,
  className,
  gallerySrcs,
  split,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
}: {
  id?: string;
  className?: string;
  gallerySrcs: string[];
  split: SplitHeadline;
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyStageBgRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);

  /** Center / focal tile — reference layout slot + **`WELCOME_GALLERY_FOCAL_SRC`** (strong zoom). */
  const focalIndex = WELCOME_GALLERY_FOCAL_INDEX;

  const scaleFocal = useTransform(progress, [0, GALLERY_PROGRESS_END, 1], [1, 4.25, 4.25]);
  const scalePeripheral = useTransform(progress, [0, GALLERY_PROGRESS_END, 1], [1, 1.08, 1.08]);

  const opacityImage = useTransform(progress, [0, GALLERY_PROGRESS_END, 1], [1, 0, 0]);
  const opacityCopy = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END, 1],
    [0, 1, 1],
  );
  const copyScale = useTransform(
    progress,
    [COPY_FADE_IN_START, COPY_FADE_IN_END, 1],
    [0.94, 1, 1],
  );

  const { hasEmphasis, before, after } = split;

  const pictures = Array.from({ length: 7 }, (_, index) => ({
    src: gallerySrcs[index % gallerySrcs.length] ?? gallerySrcs[0],
    scale: index === focalIndex ? scaleFocal : scalePeripheral,
    frameClass: IMAGE_STYLES[index]!,
    isFocal: index === focalIndex,
  }));

  useEffect(() => {
    let revert: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const main = document.querySelector<HTMLElement>("#main");
      if (!section || !main) return;

      const ctx = gsap.context(() => {
        const syncCopyStageBg = (sectionProgress: number) => {
          const el = copyStageBgRef.current;
          if (!el) return;
          el.style.opacity = String(copyStageBgOpacity(sectionProgress));
        };

        const st = ScrollTrigger.create({
          trigger: section,
          scroller: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            progress.set(p);
            syncCopyStageBg(p);
          },
        });

        syncCopyStageBg(st.progress);
      }, section);

      revert = () => ctx.revert();

      const syncBgFromTrigger = () => {
        const stNow = ScrollTrigger.getAll().find((t) => t.trigger === section);
        const el = copyStageBgRef.current;
        if (!stNow || !el) return;
        el.style.opacity = String(copyStageBgOpacity(stNow.progress));
      };

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        syncBgFromTrigger();
      });
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        syncBgFromTrigger();
      }, 120);
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
      className={cn(
        "relative h-[240vh] scroll-mt-28 bg-arc-cream pt-0",
        className,
      )}
    >
      {/* Full-bleed sticky stage — collage uses full viewport (runs under fixed logo); copy carries logo clearance */}
      <div className="sticky top-0 flex h-[100dvh] max-h-[100dvh] min-h-0 w-full flex-col overflow-hidden bg-arc-cream">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-2 z-0 overflow-hidden sm:top-2.5 md:top-3">
          <div className="absolute inset-0 flex items-center justify-center origin-center scale-[1.12] sm:scale-[1.22] md:scale-[1.3]">
            {pictures.map(({ src, scale, frameClass, isFocal }, index) => (
              <motion.div
                key={`${src}-${index}`}
                style={{ scale, opacity: opacityImage }}
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  isFocal ? "z-10" : "z-[1]",
                )}
              >
                <div className={cn("relative overflow-hidden rounded-sm bg-arc-cream-deep/10", frameClass)}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 30vw"
                    priority={isFocal}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          ref={copyStageBgRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] overflow-hidden opacity-0"
        >
          {/* Plain img: avoids Next/Image + motion stacking quirks; opacity driven by GSAP (see ScrollTrigger). */}
          <img
            alt=""
            src={WELCOME_COPY_STAGE_BG}
            className={cn(
              "absolute inset-0 h-full w-full",
              COPY_STAGE_BG_OBJECT,
            )}
            width={1920}
            height={1080}
            decoding="async"
            fetchPriority="high"
          />
          <div className="pointer-events-none absolute inset-0 bg-arc-cream/10" />
        </div>

        <motion.div
          style={{ opacity: opacityCopy, scale: copyScale }}
          className={cn(
            ARC_PINNED_CLEAR_BELOW_LOGO,
            "relative z-20 mx-auto flex h-full w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 pb-8 sm:px-7 md:max-w-4xl md:px-10 lg:px-12",
          )}
        >
          <div className="pointer-events-auto max-w-2xl text-center md:max-w-3xl">
            <h2 className="mb-4 font-serif text-[1.65rem] font-semibold leading-[1.12] tracking-tight text-arc-charcoal sm:mb-5 sm:text-3xl md:text-[2rem] md:leading-[1.1] lg:text-[2.35rem]">
              {hasEmphasis ? (
                <>
                  {before}
                  {before ? " " : null}
                  <TitleEmphasis className="text-[1.38em] leading-[1.05] sm:text-[1.44em] md:text-[1.52em] lg:text-[1.58em] text-arc-teal">
                    {headlineEmphasisWord}
                  </TitleEmphasis>
                  {after ? <> {after}</> : null}
                </>
              ) : (
                headline
              )}
            </h2>

            <div className="space-y-3 font-sans text-[13px] leading-relaxed text-arc-charcoal/88 sm:text-[0.92rem] md:text-[0.95rem] md:leading-relaxed lg:text-base">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
              <p className="text-arc-charcoal">
                <strong className="font-semibold text-arc-charcoal">{proofLead}</strong>{" "}
                {proofRest}
              </p>
            </div>

            <Link
              href={ctaHref}
              className="group mt-6 inline-flex items-center justify-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-arc-teal transition-colors hover:text-arc-teal-hover sm:mt-8 sm:text-xs md:text-sm"
            >
              {ctaLabel}
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 sm:size-4"
                strokeWidth={2}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
