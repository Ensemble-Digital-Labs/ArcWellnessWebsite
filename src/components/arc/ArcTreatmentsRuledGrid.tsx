"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import type { TreatmentPage } from "@/content/pages/treatments";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ArcTreatmentsRuledGridProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleEmphasis?: string;
  subtitle?: string;
  treatments: readonly TreatmentPage[];
  className?: string;
};

/**
 * Vooban-style service index: numbered overlines, ruled rows, arrow links — no card chrome.
 */
export function ArcTreatmentsRuledGrid({
  id,
  eyebrow = "Full index",
  title,
  titleEmphasis,
  subtitle,
  treatments,
  className,
}: ArcTreatmentsRuledGridProps) {
  const rows = treatments.filter((t) => t.slug !== "overview");

  return (
    <section id={id} className={cn("bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12", className)}>
      <div className={ARC_PAGE_RAIL_MAX}>
        <div data-scroll-section className="mb-10 max-w-2xl md:mb-12">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-arc-teal-ink">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-arc-charcoal sm:text-4xl">
            {title}{" "}
            {titleEmphasis ? (
              <TitleEmphasis className="text-[1.12em] text-arc-rose-gold-ink">{titleEmphasis}</TitleEmphasis>
            ) : null}
          </h2>
          {subtitle ? (
            <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/72">{subtitle}</p>
          ) : null}
        </div>

        <ul className="border-t border-arc-charcoal/12">
          {rows.map((t, idx) => (
            <li key={t.slug} data-scroll-section className="border-b border-arc-charcoal/12">
              <Link
                href={`/treatments/${t.slug}`}
                className="group grid grid-cols-1 gap-3 py-6 transition-colors hover:bg-arc-teal-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:py-7 md:gap-10 md:py-8"
              >
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-arc-charcoal/55 tabular-nums">
                  <span className="text-arc-teal-ink">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="mx-2 text-arc-charcoal/25">/</span>
                  <span>{t.categoryLabel}</span>
                </p>

                <div className="min-w-0">
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-arc-charcoal transition-colors group-hover:text-arc-teal-ink sm:text-[1.65rem]">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl font-sans text-sm leading-relaxed text-arc-charcoal/65">{t.tagline}</p>
                </div>

                <span className="inline-flex items-center gap-2 self-start font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-teal-ink sm:self-center">
                  View
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
