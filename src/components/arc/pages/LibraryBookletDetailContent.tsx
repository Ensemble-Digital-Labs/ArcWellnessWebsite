"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { LibraryPdfPages } from "@/components/arc/pages/LibraryPdfPages";
import {
  libraryBookletAllowsDownload,
  libraryBookletDownloadSrc,
  type LibraryBooklet,
} from "@/content/library/desk";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

export function LibraryBookletDetailContent({
  booklet,
  backHref = "/library/desk",
  backLabel = "From the Arc Desk",
}: {
  booklet: LibraryBooklet;
  backHref?: string;
  backLabel?: string;
}) {
  const canDownload = libraryBookletAllowsDownload(booklet);

  return (
    <>
      <article className="bg-arc-cream pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className={cn("mx-auto px-5 sm:px-8 md:px-12", ARC_PAGE_RAIL_MAX)}>
          <div className="flex justify-center">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2.5 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70 transition-colors hover:text-arc-teal-ink sm:text-base"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {backLabel}
            </Link>
          </div>

          <header className="mx-auto mt-10 max-w-3xl text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-arc-teal-ink">
              Booklet · {booklet.pageCount} pages
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-arc-charcoal sm:text-4xl md:text-5xl">
              {booklet.title}
            </h1>
            <p className="mt-4 font-serif text-lg leading-snug text-arc-teal-ink sm:text-xl">
              {booklet.subtitle}
            </p>
            <p className="mt-6 font-sans text-base leading-relaxed text-arc-charcoal/80 sm:text-lg">
              {booklet.description}
            </p>

            {canDownload ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={booklet.pdfSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-arc-charcoal px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-arc-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2"
                >
                  Open PDF
                </a>
                <a
                  href={libraryBookletDownloadSrc(booklet)}
                  download={`${booklet.slug}.pdf`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-arc-charcoal/20 px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal transition-colors hover:border-arc-teal-ink hover:text-arc-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2"
                >
                  <Download className="size-4" aria-hidden />
                  Download
                </a>
              </div>
            ) : null}
          </header>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-arc-charcoal/15 bg-white shadow-[0_16px_48px_rgba(45,45,45,0.08)]">
            {canDownload ? (
              <iframe
                title={`${booklet.title} PDF`}
                src={`${booklet.pdfSrc}#view=FitH`}
                className="aspect-[3/4] w-full min-h-[70dvh] bg-[#ebe4d6] sm:aspect-[4/3] sm:min-h-[80dvh]"
              />
            ) : (
              <div
                data-pdf-scroll
                className="max-h-[80dvh] min-h-[70dvh] overflow-y-auto overscroll-contain bg-[#ebe4d6]"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <LibraryPdfPages src={booklet.pdfSrc} />
              </div>
            )}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-sm leading-relaxed text-arc-charcoal/65">
            This booklet is for educational purposes and is not a substitute for personalized
            medical advice.
          </p>
        </div>
      </article>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
      />
    </>
  );
}
