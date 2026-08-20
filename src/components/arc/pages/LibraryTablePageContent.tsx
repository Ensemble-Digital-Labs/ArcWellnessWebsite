"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { ArcLibraryMasthead } from "@/components/arc/ArcLibraryMasthead";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { INSIGHTS_FEED_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { libraryTablePage } from "@/content/pages/library-table";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import { ARC_PINNED_CLEAR_BELOW_LOGO, ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import {
  resetInsightsHeaderChrome,
  updateInsightsHeaderChrome,
  INSIGHTS_HEADER_CHROME_RESET,
} from "@/lib/arcInsightsHeaderSync";
import { cn } from "@/lib/utils";

/** From the Arc Table — recipes and nutrition (recipe book coming soon). */
export function LibraryTablePageContent() {
  const mastheadTitleRef = useRef<HTMLHeadingElement>(null);

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

  const { intro, comingSoon } = libraryTablePage;

  return (
    <>
      <section id="library-table" className="relative isolate scroll-mt-28 bg-black">
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
                copy={libraryTablePage.masthead}
                titleRef={mastheadTitleRef}
                titleId="library-table-masthead-title"
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 bg-arc-cream px-5 pb-20 sm:px-8 sm:pb-24 md:px-12 md:pb-28 lg:px-16 xl:px-20">
          <div className={cn("mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-2xl leading-snug text-arc-charcoal sm:text-3xl">
                {intro.title}
              </h2>
              <div className="mt-6 space-y-4">
                {intro.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="font-sans text-base leading-relaxed text-arc-charcoal/80 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="mx-auto mt-12 max-w-2xl rounded-3xl border border-arc-charcoal/12 bg-white/90 px-6 py-8 text-center shadow-[0_12px_40px_rgba(45,45,45,0.06)] sm:px-10 sm:py-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-arc-teal-ink">
                {comingSoon.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-xl leading-snug text-arc-charcoal sm:text-2xl">
                {comingSoon.title}
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/80">
                {comingSoon.body}
              </p>
            </aside>

            <nav
              className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center"
              aria-label="Explore other Arc Library sections"
            >
              <Link
                href="/library/education"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-arc-charcoal/20 px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal transition-colors hover:border-arc-teal-ink hover:text-arc-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2"
              >
                Education
              </Link>
              <Link
                href="/library/desk"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-arc-charcoal/20 px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal transition-colors hover:border-arc-teal-ink hover:text-arc-teal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2"
              >
                From the Arc Desk
              </Link>
            </nav>
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
    </>
  );
}
