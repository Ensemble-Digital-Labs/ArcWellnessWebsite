"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  insightHref,
  insightsPage,
  type InsightEntry,
  type InsightKind,
} from "@/content/pages/insights";
import { refreshArcScrollLayout } from "@/lib/arcScrollLayoutRefresh";
import { ARC_PINNED_CLEAR_BELOW_LOGO } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type InsightFilter = "all" | InsightKind;

const TAB_LABELS: Record<InsightFilter, string> = {
  all: "All posts",
  blog: "Blogs",
  "case-study": "Case studies",
};

/** Per-column top offset — middle column drops for HLK-style canvas rhythm. */
const CANVAS_COLUMN_OFFSET = [
  "pt-0",
  "pt-0 sm:pt-[4.5rem] lg:pt-[7.5rem] xl:pt-[9rem]",
  "pt-0 sm:pt-6 lg:pt-10 xl:pt-14",
] as const;

const CANVAS_COLUMN_GAP = "gap-y-14 sm:gap-y-16 lg:gap-y-[4.5rem] xl:gap-y-20";

function useCanvasColumnCount(): number {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const mqSm = window.matchMedia("(min-width: 640px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      if (mqLg.matches) setCount(3);
      else if (mqSm.matches) setCount(2);
      else setCount(1);
    };

    sync();
    mqSm.addEventListener("change", sync);
    mqLg.addEventListener("change", sync);
    return () => {
      mqSm.removeEventListener("change", sync);
      mqLg.removeEventListener("change", sync);
    };
  }, []);

  return count;
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

function InsightCard({ entry, columnIndex }: { entry: InsightEntry; columnIndex: number }) {
  const href = insightHref(entry);
  /** Slight aspect variation by column keeps the canvas from feeling grid-locked. */
  const aspectClass =
    columnIndex === 1
      ? "aspect-[4/5]"
      : columnIndex === 2
        ? "aspect-[5/6]"
        : "aspect-square";

  return (
    <article className="group break-inside-avoid">
      <Link
        href={href}
        className={cn(
          "relative block overflow-hidden bg-arc-charcoal/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          aspectClass,
        )}
      >
        <Image
          src={entry.imageSrc}
          alt={entry.imageAlt}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
      </Link>

      <div className="mt-5 sm:mt-6">
        <h3 className="font-sans text-[1.05rem] font-bold leading-snug tracking-tight text-arc-charcoal sm:text-lg lg:text-xl">
          <Link
            href={href}
            className="underline-offset-[5px] transition-[color,text-decoration] duration-200 hover:text-arc-teal-ink hover:underline focus-visible:outline-none focus-visible:underline"
          >
            {entry.title}
          </Link>
        </h3>
        <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-arc-charcoal/45 sm:text-[11px]">
          {formatMetaDate(entry.publishedAt)}
          <span className="mx-2 text-arc-charcoal/28" aria-hidden>
            /
          </span>
          {kindLabelUpper(entry.kind)}
        </p>
      </div>
    </article>
  );
}

function InsightsCanvasGrid({ items }: { items: readonly InsightEntry[] }) {
  const columnCount = useCanvasColumnCount();
  const columns = useMemo(
    () => distributeToColumns(items, columnCount),
    [items, columnCount],
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
          {columnItems.map((entry) => (
            <InsightCard key={entry.id} entry={entry} columnIndex={columnIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ArcInsightsFeedSection({
  id = "insights-feed",
  entries,
}: {
  id?: string;
  entries: readonly InsightEntry[];
}) {
  const { feed } = insightsPage;
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);
  const prevFilterRef = useRef<InsightFilter | null>(null);
  const counts = useMemo(() => getCounts(entries), [entries]);

  const readFilterFromUrl = (): InsightFilter => {
    if (typeof window === "undefined") return "all";
    const q = new URLSearchParams(window.location.search).get("filter");
    if (q === "blog" || q === "case-study") return q;
    return "all";
  };

  const [filter, setFilter] = useState<InsightFilter>("all");

  useEffect(() => {
    setFilter(readFilterFromUrl());
  }, []);

  const selectFilter = (tab: InsightFilter) => {
    setFilter(tab);
    const query = tab === "all" ? "" : `?filter=${tab}`;
    window.history.replaceState(null, "", `${pathname}${query}`);
  };

  const filtered = useMemo(() => {
    if (filter === "all") return [...entries];
    return entries.filter((e) => e.kind === filter);
  }, [entries, filter]);

  useEffect(() => {
    if (prevFilterRef.current === null) {
      prevFilterRef.current = filter;
      return;
    }
    if (prevFilterRef.current === filter) return;
    prevFilterRef.current = filter;

    refreshArcScrollLayout({ anchor: sectionRef.current });
  }, [filter]);

  const tabs: InsightFilter[] = ["all", "blog", "case-study"];

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "scroll-mt-28 bg-white px-5 pb-20 sm:px-8 sm:pb-24 md:px-12 md:pb-28 lg:px-16 xl:px-20",
        ARC_PINNED_CLEAR_BELOW_LOGO,
      )}
    >
      <div className="mx-auto w-full max-w-[min(100%,1440px)]">
        <header className="border-b border-arc-charcoal/10 pb-10 text-center sm:pb-12 md:pb-14">
          <h1 className="font-sans text-[clamp(2.75rem,9vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.03em] text-arc-charcoal">
            {feed.masthead}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-arc-charcoal/62 sm:text-base md:mt-6">
            {feed.subtitle}
          </p>
        </header>

        <div
          className="mt-8 flex flex-wrap items-end justify-center gap-x-6 gap-y-3 border-b border-arc-charcoal/12 sm:mt-10 sm:gap-x-10 md:gap-x-14"
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
                  "relative min-h-[44px] pb-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:text-[13px]",
                  active
                    ? "text-arc-charcoal after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-arc-charcoal"
                    : "text-arc-charcoal/45 hover:text-arc-charcoal/80",
                )}
              >
                {TAB_LABELS[tab]}
                {showCount ? (
                  <sup className="ml-0.5 text-[10px] font-bold tabular-nums">{count}</sup>
                ) : null}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-14 text-center font-sans text-base text-arc-charcoal/60 sm:mt-16">
            No posts in this category yet. Explore our{" "}
            <Link
              href="/treatments"
              className="font-semibold text-arc-charcoal underline-offset-2 hover:underline"
            >
              treatments
            </Link>
            .
          </p>
        ) : (
          <InsightsCanvasGrid items={filtered} />
        )}
      </div>
    </section>
  );
}
