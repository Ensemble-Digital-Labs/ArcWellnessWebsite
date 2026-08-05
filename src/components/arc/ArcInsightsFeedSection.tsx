"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { INSIGHTS_FEED_AMBIENT_SRC } from "@/content/backgroundDecoration";
import {
  insightHref,
  insightsPage,
  type InsightEntry,
  type InsightKind,
} from "@/content/pages/insights";
import { refreshArcScrollLayout } from "@/lib/arcScrollLayoutRefresh";
import {
  updateInsightsHeaderChrome,
  resetInsightsHeaderChrome,
  INSIGHTS_HEADER_CHROME_RESET,
} from "@/lib/arcInsightsHeaderSync";
import { ARC_PINNED_CLEAR_BELOW_LOGO } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcWindowFrame } from "@/components/arc/ArcWindowFrame";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";

/** Matches Contact / Financing masthead — Birthstone script, not heavy uppercase sans. */
const INSIGHTS_MASTHEAD_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.9] tracking-tight text-black",
  "text-[clamp(5.5rem,22vw,7.5rem)] md:text-[clamp(6.5rem,13vw,10.5rem)] lg:text-[clamp(7.75rem,11vw,11.5rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

type InsightFilter = "all" | InsightKind;

const TAB_LABELS: Record<InsightFilter, string> = {
  all: "All posts",
  blog: "Blogs",
  "case-study": "Case studies",
};

/** Per-column top offset, middle column drops for HLK-style canvas rhythm. */
const CANVAS_COLUMN_OFFSET = [
  "pt-0",
  "pt-0 sm:pt-[4.5rem] lg:pt-[7.5rem] xl:pt-[9rem]",
  "pt-0 sm:pt-6 lg:pt-10 xl:pt-14",
] as const;

const CANVAS_COLUMN_GAP = "gap-y-14 sm:gap-y-16 lg:gap-y-[4.5rem] xl:gap-y-20";

const INSIGHTS_FILTER_TRANSITION = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1] as const,
};

function subscribeCanvasColumns(onStoreChange: () => void) {
  const mqSm = window.matchMedia("(min-width: 640px)");
  const mqLg = window.matchMedia("(min-width: 1024px)");
  mqSm.addEventListener("change", onStoreChange);
  mqLg.addEventListener("change", onStoreChange);
  return () => {
    mqSm.removeEventListener("change", onStoreChange);
    mqLg.removeEventListener("change", onStoreChange);
  };
}

function getCanvasColumnCount(): number {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

/** SSR + first paint: 3-col so laptop doesn’t remount after a 1-col lazy pass. */
function getCanvasColumnCountServer(): number {
  return 3;
}

function useCanvasColumnCount(): number {
  return useSyncExternalStore(
    subscribeCanvasColumns,
    getCanvasColumnCount,
    getCanvasColumnCountServer,
  );
}

function distributeToColumns(items: readonly InsightEntry[], columnCount: number): InsightEntry[][] {
  const columns: InsightEntry[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount]!.push(item);
  });
  return columns;
}

function getCounts(entries: readonly InsightEntry[]) {
  return {
    all: entries.length,
    blog: entries.filter((e) => e.kind === "blog").length,
    caseStudy: entries.filter((e) => e.kind === "case-study").length,
  };
}

function tabCount(
  filter: InsightFilter,
  counts: ReturnType<typeof getCounts>,
): number {
  if (filter === "all") return counts.all;
  if (filter === "blog") return counts.blog;
  return counts.caseStudy;
}

function kindLabelUpper(kind: InsightKind): string {
  return kind === "blog" ? "Blog" : "Case study";
}

function formatMetaDate(publishedAt: string): string {
  return publishedAt.toUpperCase();
}

/** First row on laptop (3-col) — eager so they don’t wait behind the masthead plate. */
const INSIGHTS_EAGER_PREVIEW_COUNT = 3;

const INSIGHT_CARD_EASE = [0.22, 1, 0.36, 1] as const;

function InsightCard({
  entry,
  columnIndex,
  rowIndex,
  priority = false,
  reduceMotion = false,
}: {
  entry: InsightEntry;
  columnIndex: number;
  rowIndex: number;
  priority?: boolean;
  reduceMotion?: boolean;
}) {
  const href = insightHref(entry);
  const cardRef = useRef<HTMLElement>(null);
  /**
   * `useInView` + `animate` (not `whileInView` / `initial`) so reveals still play on
   * first paint — AnimatePresence `initial={false}` would otherwise skip them.
   */
  const inView = useInView(cardRef, {
    once: true,
    amount: 0.16,
    margin: "0px 0px -5% 0px",
  });
  const show = reduceMotion || inView;

  /** Slight aspect variation by column keeps the canvas from feeling grid-locked. */
  const aspectClass =
    columnIndex === 1
      ? "aspect-[4/5]"
      : columnIndex === 2
        ? "aspect-[5/6]"
        : "aspect-square";

  return (
    <motion.article
      ref={cardRef}
      className="group break-inside-avoid"
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: INSIGHT_CARD_EASE,
        delay: reduceMotion ? 0 : rowIndex * 0.1 + columnIndex * 0.07,
      }}
    >
      <Link
        href={href}
        className="relative block rounded-t-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream"
      >
        <ArcWindowFrame
          src={entry.imageSrc}
          alt={entry.imageAlt}
          className={cn("w-full", aspectClass)}
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-arc-charcoal/0 transition-colors duration-300 group-hover:bg-arc-charcoal/18 motion-reduce:group-hover:bg-transparent"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-100"
            aria-hidden
          >
            <span className="flex size-[4.75rem] items-center justify-center rounded-full bg-arc-charcoal font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)] sm:size-20">
              View
            </span>
          </span>
        </ArcWindowFrame>
      </Link>

      <div className="mt-5 sm:mt-6">
        <h3 className="font-sans text-[1.05rem] font-bold leading-snug tracking-tight text-arc-charcoal sm:text-lg lg:text-xl">
          <Link
            href={href}
            className="underline-offset-[5px] transition-[color,text-decoration] duration-200 hover:text-arc-teal hover:underline focus-visible:outline-none focus-visible:underline"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-arc-charcoal/55 sm:text-[11px]">
          {formatMetaDate(entry.publishedAt)}
          <span className="mx-2 text-arc-charcoal/30" aria-hidden>
            /
          </span>
          {kindLabelUpper(entry.kind)}
        </p>
      </div>
    </motion.article>
  );
}

function InsightsCanvasGrid({
  items,
  reduceMotion,
}: {
  items: readonly InsightEntry[];
  reduceMotion: boolean;
}) {
  const columnCount = useCanvasColumnCount();
  const columns = useMemo(
    () => distributeToColumns(items, columnCount),
    [items, columnCount],
  );

  const eagerIds = useMemo(
    () => new Set(items.slice(0, INSIGHTS_EAGER_PREVIEW_COUNT).map((e) => e.id)),
    [items],
  );

  const populatedColumns = useMemo(
    () =>
      columns
        .map((columnItems, columnIndex) => ({ columnItems, columnIndex }))
        .filter(({ columnItems }) => columnItems.length > 0),
    [columns],
  );

  return (
    <div
      className={cn(
        "mt-12 sm:mt-14 lg:mt-16",
        columnCount === 1
          ? "flex flex-col gap-14 sm:gap-16"
          : "flex items-start gap-x-8 sm:gap-x-10 lg:gap-x-12 xl:gap-x-16",
      )}
    >
      {populatedColumns.map(({ columnItems, columnIndex }) => (
        <div
          key={`col-${columnIndex}`}
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            CANVAS_COLUMN_GAP,
            CANVAS_COLUMN_OFFSET[columnIndex] ?? CANVAS_COLUMN_OFFSET[0],
          )}
        >
          {columnItems.map((entry, rowIndex) => (
            <InsightCard
              key={entry.id}
              entry={entry}
              columnIndex={columnIndex}
              rowIndex={rowIndex}
              priority={eagerIds.has(entry.id)}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function InsightsFilterPanel({
  filter,
  items,
  reduceMotion,
  animateEntrance,
  onSettled,
}: {
  filter: InsightFilter;
  items: readonly InsightEntry[];
  reduceMotion: boolean;
  /** False on first paint so cards aren’t hidden while images load. */
  animateEntrance: boolean;
  onSettled?: () => void;
}) {
  const runEntrance = animateEntrance && !reduceMotion;

  if (items.length === 0) {
    return (
      <motion.p
        initial={runEntrance ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={runEntrance ? { opacity: 0, y: -8 } : undefined}
        transition={INSIGHTS_FILTER_TRANSITION}
        onAnimationComplete={(latest) => {
          if (
            typeof latest === "object" &&
            latest !== null &&
            "opacity" in latest &&
            latest.opacity === 1
          ) {
            onSettled?.();
          }
        }}
        className="mt-14 text-center font-sans text-base text-arc-charcoal/70 sm:mt-16"
      >
        No posts in this category yet. Explore our{" "}
        <Link
          href="/treatments"
          className="font-semibold text-arc-charcoal underline-offset-2 hover:text-arc-teal hover:underline"
        >
          treatments
        </Link>
        .
      </motion.p>
    );
  }

  return (
    <motion.div
      initial={runEntrance ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={runEntrance ? { opacity: 0, y: -12 } : undefined}
      transition={INSIGHTS_FILTER_TRANSITION}
      onAnimationComplete={(latest) => {
        if (
          typeof latest === "object" &&
          latest !== null &&
          "opacity" in latest &&
          latest.opacity === 1
        ) {
          onSettled?.();
        }
      }}
    >
      <InsightsCanvasGrid items={items} reduceMotion={reduceMotion} />
    </motion.div>
  );
}

export function ArcInsightsFeedSection({
  id = "insights-feed",
  entries,
  bottomSeam = false,
}: {
  id?: string;
  entries: readonly InsightEntry[];
  bottomSeam?: boolean;
}) {
  const { feed } = insightsPage;
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const mastheadTitleRef = useRef<HTMLHeadingElement>(null);
  const counts = useMemo(() => getCounts(entries), [entries]);
  const reduceMotion = useReducedMotion();
  const scrollRefreshTimerRef = useRef<number | null>(null);

  const readFilterFromUrl = (): InsightFilter => {
    if (typeof window === "undefined") return "all";
    const q = new URLSearchParams(window.location.search).get("filter");
    if (q === "blog" || q === "case-study") return q;
    return "all";
  };

  const [filter, setFilter] = useState<InsightFilter>("all");
  /** Skip grid fade on first paint so preview images aren’t obscured while loading. */
  const [filterEntranceReady, setFilterEntranceReady] = useState(false);

  useEffect(() => {
    setFilter(readFilterFromUrl());
    setFilterEntranceReady(true);
  }, []);

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

  const filtered = useMemo(() => {
    if (filter === "all") return [...entries];
    return entries.filter((e) => e.kind === filter);
  }, [entries, filter]);

  const scheduleScrollLayoutRefresh = () => {
    if (scrollRefreshTimerRef.current !== null) {
      window.clearTimeout(scrollRefreshTimerRef.current);
    }
    scrollRefreshTimerRef.current = window.setTimeout(() => {
      scrollRefreshTimerRef.current = null;
      refreshArcScrollLayout();
    }, reduceMotion ? 0 : 360);
  };

  useEffect(
    () => () => {
      if (scrollRefreshTimerRef.current !== null) {
        window.clearTimeout(scrollRefreshTimerRef.current);
      }
    },
    [],
  );

  const selectFilter = (tab: InsightFilter) => {
    if (tab === filter) return;
    setFilter(tab);
    const query = tab === "all" ? "" : `?filter=${tab}`;
    window.history.replaceState(null, "", `${pathname}${query}`);
    if (reduceMotion) scheduleScrollLayoutRefresh();
  };

  const tabs: InsightFilter[] = ["all", "blog", "case-study"];

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative isolate scroll-mt-28 bg-black"
    >
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
            <header className="pb-10 text-center sm:pb-12 md:pb-14">
              <ArcTextReveal variant="heading" trigger="mount" when>
                <h1
                  ref={mastheadTitleRef}
                  id="insights-masthead-title"
                  className="leading-[0.9] tracking-tight"
                >
                  <TitleEmphasis className={INSIGHTS_MASTHEAD_CLASS}>
                    {feed.masthead}
                  </TitleEmphasis>
                </h1>
              </ArcTextReveal>
              {/* Spacer keeps former subtitle gap under the masthead. */}
              <div
                className="mx-auto mt-5 h-[2.75rem] max-w-2xl sm:h-[3.25rem] md:mt-6"
                aria-hidden
              />
            </header>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-arc-cream px-5 pb-20 sm:px-8 sm:pb-24 md:px-12 md:pb-28 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-[min(100%,1440px)]">
          <div
            id="insights-filter-bar"
            className="flex flex-wrap items-end justify-center gap-x-6 gap-y-3 border-b-2 border-arc-charcoal/25 pt-8 sm:gap-x-10 sm:pt-10 md:gap-x-14"
            role="tablist"
            aria-label="Filter insights"
          >
            {tabs.map((tab) => {
              const active = filter === tab;
              const count = tabCount(tab, counts);
              const showCount = tab !== "all";
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectFilter(tab)}
                  className={cn(
                    "relative min-h-[44px] pb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream sm:text-[13px]",
                    active ? "text-arc-charcoal" : "text-arc-charcoal/55 hover:text-arc-charcoal/90",
                  )}
                >
                  {TAB_LABELS[tab]}
                  {showCount ? (
                    <sup className="ml-0.5 text-[10px] font-bold tabular-nums">{count}</sup>
                  ) : null}
                  {active ? (
                    <motion.span
                      layoutId="insights-filter-underline"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-arc-charcoal"
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="relative mt-0">
            <AnimatePresence mode="wait" initial={false}>
              <InsightsFilterPanel
                key={filter}
                filter={filter}
                items={filtered}
                reduceMotion={reduceMotion ?? false}
                animateEntrance={filterEntranceReady}
                onSettled={scheduleScrollLayoutRefresh}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      {bottomSeam ? (
        <ArcSectionSeamBlend
          edge="bottom"
          tone="cream"
          variant="soft"
          scope="background"
          className="z-20"
        />
      ) : null}
    </section>
  );
}
