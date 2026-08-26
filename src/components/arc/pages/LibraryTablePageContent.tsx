"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

import { ArcLibraryMasthead } from "@/components/arc/ArcLibraryMasthead";
import { LibraryBookletsGrid } from "@/components/arc/pages/LibraryBookletsGrid";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { INSIGHTS_FEED_AMBIENT_SRC } from "@/content/backgroundDecoration";
import { LIBRARY_TABLE_BOOKLETS } from "@/content/library/table";
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

/** From the Arc Table — recipes and nutrition booklets. */
export function LibraryTablePageContent() {
  const mastheadTitleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

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
            <LibraryBookletsGrid
              booklets={LIBRARY_TABLE_BOOKLETS}
              reduceMotion={reduceMotion ?? false}
              heading={libraryTablePage.collectionHeading}
            />
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
