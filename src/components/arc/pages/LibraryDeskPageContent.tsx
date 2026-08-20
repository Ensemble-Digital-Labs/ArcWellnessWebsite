"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Download, FileText, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ArcLibraryMasthead } from "@/components/arc/ArcLibraryMasthead";
import { LibraryPdfPages } from "@/components/arc/pages/LibraryPdfPages";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { INSIGHTS_FEED_AMBIENT_SRC } from "@/content/backgroundDecoration";
import {
  LIBRARY_BOOKLETS,
  libraryDeskPage,
  type LibraryBooklet,
} from "@/content/library/desk";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import {
  ARC_FULLSCREEN_MODAL_Z_CLASS,
  ARC_PINNED_CLEAR_BELOW_LOGO,
} from "@/lib/arc-layout";
import {
  resetInsightsHeaderChrome,
  updateInsightsHeaderChrome,
  INSIGHTS_HEADER_CHROME_RESET,
} from "@/lib/arcInsightsHeaderSync";
import { cn } from "@/lib/utils";

const cardButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2";

function BookletPdfOverlay({
  booklet,
  onClose,
}: {
  booklet: LibraryBooklet;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 flex h-[100dvh] flex-col bg-arc-charcoal/70 p-3 backdrop-blur-[2px] sm:p-5",
        ARC_FULLSCREEN_MODAL_Z_CLASS,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booklet-pdf-title"
      onClick={onClose}
    >
      <div
        className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-arc-cream shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-arc-charcoal/12 px-4 py-3 sm:px-5">
          <h2
            id="booklet-pdf-title"
            className="min-w-0 truncate font-serif text-lg text-arc-charcoal sm:text-xl"
          >
            {booklet.title}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={booklet.pdfSrc}
              download
              className={cn(
                cardButtonClass,
                "border border-arc-charcoal/20 bg-transparent text-arc-charcoal hover:border-arc-teal-ink hover:text-arc-teal-ink",
              )}
            >
              <Download className="size-4" aria-hidden />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full text-arc-charcoal transition-colors hover:bg-arc-charcoal/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50"
              aria-label="Close booklet"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </header>
        <div
          data-pdf-scroll
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <LibraryPdfPages src={booklet.pdfSrc} />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function BookletCard({
  booklet,
  index,
  reduceMotion,
  onRead,
}: {
  booklet: LibraryBooklet;
  index: number;
  reduceMotion: boolean;
  onRead: (booklet: LibraryBooklet) => void;
}) {
  return (
    <motion.article
      className="flex h-full flex-col rounded-3xl border border-arc-charcoal/12 bg-white/85 p-6 text-center shadow-[0_12px_40px_rgba(45,45,45,0.06)] sm:p-8"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => onRead(booklet)}
        className="group relative mb-6 block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-arc-charcoal/10 bg-[#ebe4d6] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2"
      >
        <Image
          src={booklet.coverSrc}
          alt={booklet.coverAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          priority={index === 0}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-arc-charcoal/0 transition-colors duration-300 group-hover:bg-arc-charcoal/15 motion-reduce:group-hover:bg-transparent"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-arc-charcoal/75 via-arc-charcoal/30 to-transparent px-5 pb-5 pt-16 text-center sm:px-6 sm:pb-6">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
            Booklet · {booklet.pageCount} pages
          </p>
        </div>
      </button>

      <h3 className="font-serif text-xl leading-snug text-arc-charcoal sm:text-2xl">
        <button
          type="button"
          onClick={() => onRead(booklet)}
          className="underline-offset-[5px] transition-colors hover:text-arc-teal-ink hover:underline focus-visible:outline-none focus-visible:underline"
        >
          {booklet.title}
        </button>
      </h3>

      <p className="mt-2 text-pretty font-serif text-base leading-snug text-arc-teal-ink sm:text-lg">
        {booklet.subtitleLines?.length
          ? booklet.subtitleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
          : booklet.subtitle}
      </p>
      <p className="mt-4 flex-1 text-pretty font-sans text-sm leading-relaxed text-arc-charcoal/80 sm:text-base">
        {booklet.description}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => onRead(booklet)}
          className={cn(
            cardButtonClass,
            "bg-arc-charcoal text-white hover:bg-arc-teal-ink",
          )}
        >
          <FileText className="size-4" aria-hidden />
          Read
        </button>
        <a
          href={booklet.pdfSrc}
          download
          className={cn(
            cardButtonClass,
            "border border-arc-charcoal/20 bg-transparent text-arc-charcoal hover:border-arc-teal-ink hover:text-arc-teal-ink",
          )}
        >
          <Download className="size-4" aria-hidden />
          Download
        </a>
      </div>
    </motion.article>
  );
}

/** From the Arc Desk — booklet library under Arc Library. */
export function LibraryDeskPageContent() {
  const mastheadTitleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const [openBooklet, setOpenBooklet] = useState<LibraryBooklet | null>(null);

  useEffect(() => {
    const mastheadTitle = mastheadTitleRef.current;
    if (!mastheadTitle) return;

    const mastheadObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        updateInsightsHeaderChrome({
          mastheadVisible: entry.isIntersecting,
          ...(entry.isIntersecting ? { ctaSectionVisible: false } : {}),
        });
      },
      { threshold: 0 },
    );

    mastheadObserver.observe(mastheadTitle);
    updateInsightsHeaderChrome({ ...INSIGHTS_HEADER_CHROME_RESET });

    return () => {
      mastheadObserver.disconnect();
      resetInsightsHeaderChrome();
    };
  }, []);

  return (
    <>
      <section id="library-desk" className="relative isolate scroll-mt-28 bg-black">
        <div className="relative overflow-hidden pb-2 sm:pb-3">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image
              src={INSIGHTS_FEED_AMBIENT_SRC}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-x-0 bottom-0 z-[1] h-[min(7vh,3.25rem)] bg-gradient-to-t from-arc-cream from-50% via-arc-cream/55 via-85% to-transparent [-webkit-mask-image:linear-gradient(to_top,black_0%,black_22%,transparent_100%)] mask-image-[linear-gradient(to_top,black_0%,black_22%,transparent_100%)]"
              aria-hidden
            />
          </div>

          <div
            className={cn(
              "relative z-10 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20",
              ARC_PINNED_CLEAR_BELOW_LOGO,
            )}
          >
            <div className="mx-auto w-full max-w-[min(100%,1440px)]">
              <ArcLibraryMasthead
                copy={libraryDeskPage.masthead}
                titleRef={mastheadTitleRef}
                titleId="library-desk-masthead-title"
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 bg-arc-cream px-5 pb-20 sm:px-8 sm:pb-24 md:px-12 md:pb-28 lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-[min(100%,1440px)]">
            <ul className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              {LIBRARY_BOOKLETS.map((booklet, index) => (
                <li key={booklet.slug}>
                  <BookletCard
                    booklet={booklet}
                    index={index}
                    reduceMotion={reduceMotion ?? false}
                    onRead={setOpenBooklet}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ArcSectionSeamBlend edge="bottom" />
      </section>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
      />

      {openBooklet ? (
        <BookletPdfOverlay booklet={openBooklet} onClose={() => setOpenBooklet(null)} />
      ) : null}
    </>
  );
}
