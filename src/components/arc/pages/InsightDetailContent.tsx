"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ARC_ABOUT_COMPACT_BODY_CLASS } from "@/components/arc/TitleEmphasis";
import { homeInvestSupport } from "@/content/homepage";
import {
  type InsightArticle,
  type InsightArticleSection,
  type InsightEntry,
  type InsightFaqItem,
  type InsightKind,
  type InsightSectionImage,
  type InsightSectionList,
} from "@/content/pages/insights";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

/**
 * Blog / desk article detail — editorial “Arc Desk” newsprint layout.
 * Keeps the full typed `article` content model; no longer mirrors condition plates.
 */

type InsightDetailContentProps = {
  entry: InsightEntry;
};

type NextStep = { label: string; href: string };

function backHref(kind: InsightKind): string {
  return kind === "blog" ? "/blogs?filter=blog" : "/blogs";
}

function backLabel(kind: InsightKind): string {
  return kind === "blog" ? "All blogs" : "From the Arc Desk";
}

function kindLabel(kind: InsightKind): string {
  return kind === "blog" ? "Blogs" : "Case study";
}

function BackLink({ kind }: { kind: InsightKind }) {
  return (
    <div className="flex justify-center">
      <Link
        href={backHref(kind)}
        className="inline-flex items-center gap-2.5 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-arc-charcoal/70 transition-colors hover:text-arc-teal-ink sm:text-base sm:tracking-[0.18em]"
      >
        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
        {backLabel(kind)}
      </Link>
    </div>
  );
}

const PROSE =
  "font-sans text-[0.9375rem] leading-[1.75] text-arc-charcoal/85 sm:text-base sm:leading-[1.8]";

const SECTION_HEADING =
  "font-title-emphasis font-normal not-italic text-[clamp(2.25rem,6vw,3.25rem)] leading-[0.95] tracking-tight text-arc-teal-ink text-pretty";

/** Prefer a break after `:` on laptop+ so decade titles don’t orphan the number. */
function SectionHeading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  const colon = title.indexOf(": ");
  if (colon === -1) {
    return <h2 className={cn(SECTION_HEADING, className)}>{title}</h2>;
  }
  return (
    <h2 className={cn(SECTION_HEADING, className)}>
      <span className="md:block">{title.slice(0, colon + 1)} </span>
      <span className="md:block">{title.slice(colon + 2)}</span>
    </h2>
  );
}

function ProseBlock({ paragraphs }: { paragraphs: readonly string[] }) {
  if (!paragraphs.length) return null;
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, i) => (
        <p key={`${paragraph.slice(0, 28)}-${i}`} className={PROSE}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function Hairline({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full bg-arc-charcoal/20", className)}
    />
  );
}

function MetaPill({ children }: { children: string }) {
  return (
    <span className="inline-flex rounded-full border border-arc-charcoal/25 bg-[#faf6ee]/80 px-3.5 py-1 font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-arc-charcoal/80 sm:text-xs">
      {children}
    </span>
  );
}

function SectionFigure({
  image,
  className,
}: {
  image: InsightSectionImage;
  className?: string;
}) {
  return (
    <figure className={cn("overflow-hidden", className)}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-arc-charcoal/15 bg-[#ebe4d6] sm:rounded-3xl">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 42rem"
          className="object-cover"
        />
      </div>
    </figure>
  );
}

function Callout({ children }: { children: string }) {
  return (
    <aside className="my-8 border-y border-arc-champagne/70 bg-[#f7f1e6]/70 px-5 py-5 sm:px-7 sm:py-6">
      <p className="font-serif text-base leading-snug text-arc-charcoal sm:text-lg">
        {children}
      </p>
    </aside>
  );
}

function SectionList({ list }: { list: InsightSectionList }) {
  if (list.style === "bullets") {
    const useGrid =
      list.items.length >= 3 && list.items.every((item) => item.length <= 72);
    return useGrid ? (
      <ul className="mt-8 grid gap-x-10 gap-y-4 text-left sm:grid-cols-2">
        {list.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
            <span className="font-serif text-base leading-snug text-arc-charcoal sm:text-lg">
              {item}
            </span>
          </li>
        ))}
      </ul>
    ) : (
      <ul className="mt-6 space-y-2.5 text-left">
        {list.items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
            <span className={PROSE}>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (list.style === "cards") {
    return (
      <ul className="mt-8 grid gap-4 text-left sm:grid-cols-2 sm:gap-5">
        {list.items.map((item) => {
          const lines = Array.isArray(item.body) ? item.body : null;
          const titleOnly = Array.isArray(item.body) && item.body.length === 0;
          return (
            <li
              key={item.label}
              className="border border-arc-charcoal/15 bg-[#faf6ee]/85 px-5 py-5 sm:px-6 sm:py-6"
            >
              {titleOnly ? (
                <div className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
                  <p className="font-serif text-lg leading-snug tracking-tight text-arc-teal-ink sm:text-xl">
                    {item.label}
                  </p>
                </div>
              ) : (
                <>
                  <p className="font-serif text-lg tracking-tight text-arc-teal-ink sm:text-xl">
                    {item.label}
                  </p>
                  {lines ? (
                    lines.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {lines.map((line) => (
                          <li key={line} className="flex gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
                            <span className="font-sans text-sm leading-relaxed text-arc-charcoal/80 sm:text-[0.9375rem]">
                              {line}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : null
                  ) : (
                    <p className="mt-2 font-sans text-sm leading-relaxed text-arc-charcoal/80 sm:text-[0.9375rem]">
                      {item.body}
                    </p>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <div className="grid min-w-[20rem] grid-cols-[minmax(5rem,0.9fr)_1fr_1fr] gap-px border border-arc-charcoal/20 bg-arc-charcoal/15 text-left">
        <div className="bg-[#faf6ee] px-3 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal/55 sm:px-4" />
        <div className="bg-[#faf6ee] px-3 py-3 font-serif text-sm text-arc-teal-ink sm:px-4 sm:text-base">
          {list.leftTitle}
        </div>
        <div className="bg-[#faf6ee] px-3 py-3 font-serif text-sm text-arc-teal-ink sm:px-4 sm:text-base">
          {list.rightTitle}
        </div>
        {list.rows.map((row) => (
          <div key={row.label} className="contents">
            <div className="bg-[#f7f1e6] px-3 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-arc-charcoal/60 sm:px-4 sm:text-[0.7rem]">
              {row.label}
            </div>
            <div className="bg-[#faf6ee]/90 px-3 py-3 font-sans text-sm text-arc-charcoal/80 sm:px-4">
              {row.left}
            </div>
            <div className="bg-[#faf6ee]/90 px-3 py-3 font-sans text-sm text-arc-charcoal/80 sm:px-4">
              {row.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqRow({
  item,
  reduceMotion,
}: {
  item: InsightFaqItem;
  reduceMotion: boolean | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-arc-charcoal/15 bg-[#faf6ee]/70">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span
          className={cn(
            "min-w-0 text-balance font-sans text-sm font-semibold sm:text-[0.9375rem]",
            open ? "text-arc-charcoal" : "text-arc-charcoal/85",
          )}
        >
          {item.question}
        </span>
        <motion.span
          animate={open ? "open" : "closed"}
          variants={{ open: { rotate: 45 }, closed: { rotate: 0 } }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          className="inline-flex shrink-0"
        >
          <Plus
            className={cn(
              "size-5",
              open ? "text-arc-charcoal" : "text-arc-charcoal/45",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </motion.span>
      </button>
      {reduceMotion ? (
        open ? (
          <div className="border-t border-arc-charcoal/10 px-4 pb-4 pt-0 sm:px-5">
            <p className={PROSE}>{item.answer}</p>
          </div>
        ) : null
      ) : (
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="border-t border-arc-charcoal/10 px-4 pb-4 pt-3 sm:px-5">
            <p className={PROSE}>{item.answer}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function ArticleSection({ section }: { section: InsightArticleSection }) {
  return (
    <section className="mt-12 border-t border-arc-charcoal/15 pt-10 sm:mt-14 sm:pt-12">
      <SectionHeading title={section.title} />
      <Hairline className="mt-4 mb-6 max-w-[6rem] bg-arc-champagne" />
      {section.image ? (
        <SectionFigure image={section.image} className="mb-8" />
      ) : null}
      {section.images?.length ? (
        <ul className="mb-8 grid gap-4 sm:grid-cols-3">
          {section.images.map((fig) => (
            <li key={fig.src}>
              <SectionFigure image={fig} />
            </li>
          ))}
        </ul>
      ) : null}
      <ProseBlock paragraphs={section.body} />
      {section.callout ? <Callout>{section.callout}</Callout> : null}
      {section.list ? <SectionList list={section.list} /> : null}
      {section.closing?.length ? (
        <div className="mt-6">
          <ProseBlock paragraphs={section.closing} />
        </div>
      ) : null}
    </section>
  );
}

function PerspectiveBlock({
  article,
  bookingHref,
}: {
  article: InsightArticle;
  bookingHref: string;
}) {
  const cta = article.perspective.cta;
  const label =
    cta?.label?.trim() ||
    article.primaryCtaLabel?.trim() ||
    "Book a consultation";

  return (
    <section className="mt-14 border border-arc-charcoal/20 bg-[#f7f1e6]/80 px-5 py-8 sm:mt-16 sm:px-8 sm:py-10">
      <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.22em] text-arc-teal-ink">
        From the Arc Desk
      </p>
      <SectionHeading title={article.perspective.title} className="mt-3" />
      <Hairline className="mt-4 mb-6 max-w-[6rem] bg-arc-champagne" />
      <ProseBlock paragraphs={article.perspective.body} />
      {cta ? (
        <div className="mt-8 border-t border-arc-charcoal/15 pt-7 text-center">
          <p className="font-title-emphasis font-normal not-italic text-[clamp(2rem,5.5vw,2.85rem)] leading-[0.95] tracking-tight text-arc-teal-ink text-balance">
            {cta.lead}
          </p>
          {cta.body ? (
            <p className={cn(PROSE, "mx-auto mt-3 max-w-xl")}>{cta.body}</p>
          ) : null}
          <Link
            href={bookingHref}
            className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 border border-arc-charcoal/30 bg-arc-charcoal px-6 py-2.5 font-sans text-sm font-semibold tracking-wide text-[#f2ede1] transition-colors hover:bg-arc-teal-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arc-teal-ink"
          >
            {label}
            <ArrowRight
              aria-hidden
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      ) : null}
    </section>
  );
}

function ContinuePath({ nextSteps }: { nextSteps: readonly NextStep[] }) {
  return (
    <nav
      className="mt-14 border-t border-arc-charcoal/20 pt-10 text-center sm:mt-16"
      aria-label="Continue"
    >
      <h2 className={SECTION_HEADING}>Continue your path</h2>
      <p className={cn(PROSE, "mx-auto mt-3 max-w-xl")}>
        Ready for personalized care, or want to keep reading?
      </p>
      <ul className="mx-auto mt-6 max-w-xl divide-y divide-arc-charcoal/15 border-y border-arc-charcoal/15">
        {nextSteps.map((step) => (
          <li key={step.label}>
            <Link
              href={step.href}
              className="group flex min-h-[3.25rem] items-center justify-center gap-3 py-3.5 transition-colors"
            >
              <span className="font-serif text-lg tracking-tight text-arc-charcoal group-hover:text-arc-teal-ink sm:text-xl">
                {step.label}
              </span>
              <ArrowRight
                aria-hidden
                className="h-4 w-4 shrink-0 text-arc-charcoal/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-arc-teal-ink"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TypedEditorial({
  entry,
  article,
  nextSteps,
}: {
  entry: InsightEntry;
  article: InsightArticle;
  nextSteps: readonly NextStep[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <article className="arc-blog-newsprint">
      <div
        className={cn(
          "mx-auto px-6 pb-16 sm:px-10 sm:pb-20 md:px-12 md:pb-24",
          ARC_GALLERY_CLEAR_BELOW_LOGO,
          ARC_PAGE_RAIL_MAX,
        )}
      >
        <div className="mx-auto max-w-3xl">
          <BackLink kind={entry.kind} />

          <header className="mt-8 text-center sm:mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <MetaPill>{kindLabel(entry.kind)}</MetaPill>
              {entry.publishedAt ? (
                <MetaPill>{entry.publishedAt}</MetaPill>
              ) : null}
            </div>

            <ArcTextReveal variant="heading" trigger="mount">
              <h1 className="mt-6 font-title-emphasis font-normal not-italic text-[clamp(2.75rem,10vw,5rem)] leading-[0.95] tracking-tight text-arc-teal-ink">
                {entry.titleLines?.length
                  ? entry.titleLines.map((line) => (
                      <span key={line} className="block text-balance">
                        {line}
                      </span>
                    ))
                  : entry.title}
              </h1>
            </ArcTextReveal>

            <ArcTextReveal variant="body" trigger="mount" delayIndex={1}>
              <p className="mx-auto mt-5 max-w-2xl font-sans text-base font-medium leading-relaxed text-arc-charcoal/75 sm:text-lg">
                {entry.excerpt}
              </p>
            </ArcTextReveal>

            {article.closingLine ? (
              <p className="mx-auto mt-5 max-w-md font-serif text-sm italic text-arc-teal-ink sm:text-base">
                {article.closingLine}
              </p>
            ) : null}
          </header>

          <Hairline className="mx-auto mt-8 mb-10 max-w-xs bg-arc-charcoal/25" />

          {article.overviewImage ? (
            <SectionFigure image={article.overviewImage} className="mb-8" />
          ) : null}

          <ProseBlock paragraphs={article.overview} />
          {article.overviewCallout ? (
            <Callout>{article.overviewCallout}</Callout>
          ) : null}

          {article.sections.map((section) => (
            <ArticleSection key={section.title} section={section} />
          ))}

          <PerspectiveBlock
            article={article}
            bookingHref={siteMeta.bookingUrl}
          />

          {article.faq ? (
            <section className="mt-14 sm:mt-16">
              <h2 className={SECTION_HEADING}>{article.faq.title}</h2>
              <Hairline className="mt-4 mb-6 max-w-[6rem] bg-arc-champagne" />
              <div className="space-y-3">
                {article.faq.items.map((item) => (
                  <FaqRow
                    key={item.question}
                    item={item}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </div>
              {article.disclaimer ? (
                <p
                  className={cn(
                    ARC_ABOUT_COMPACT_BODY_CLASS,
                    "mt-8 text-arc-charcoal/60",
                  )}
                >
                  {article.disclaimer}
                </p>
              ) : null}
            </section>
          ) : article.disclaimer ? (
            <p
              className={cn(
                ARC_ABOUT_COMPACT_BODY_CLASS,
                "mt-12 text-arc-charcoal/60",
              )}
            >
              {article.disclaimer}
            </p>
          ) : null}

          <ContinuePath nextSteps={nextSteps} />
        </div>
      </div>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </article>
  );
}

/** ——— Legacy body posts (no typed `article`) ——— */

type LegacySection = {
  title: string | null;
  paragraphs: string[];
  blocks?: { title: string; paragraphs: string[] }[];
};

function isArcPerspectiveTitle(title: string | null | undefined): boolean {
  if (!title) return false;
  const t = title.toLowerCase();
  return (
    t.includes("arc begins") ||
    t.includes("arc wellness perspective") ||
    t.includes("where the arc")
  );
}

function isArticleSubheading(paragraph: string): boolean {
  const p = paragraph.trim();
  if (p.length < 3 || p.length > 90) return false;
  if (/[.!?]$/.test(p)) return false;
  if (/^\d+[\).]/.test(p)) return false;
  const words = p.split(/\s+/);
  if (words.length > 14) return false;
  return true;
}

function coalesceMicroSections(sections: LegacySection[]): LegacySection[] {
  const out: LegacySection[] = [];
  for (const section of sections) {
    const prev = out[out.length - 1];
    const micro =
      section.title &&
      section.paragraphs.length === 0 &&
      !(section.blocks && section.blocks.length);
    if (micro && prev && !isArcPerspectiveTitle(section.title)) {
      prev.blocks = [
        ...(prev.blocks ?? []),
        { title: section.title!, paragraphs: [] },
      ];
      continue;
    }
    out.push(section);
  }
  return out;
}

function splitBodyIntoSections(body: readonly string[]): LegacySection[] {
  const sections: LegacySection[] = [];
  let current: LegacySection = { title: null, paragraphs: [] };
  for (const raw of body) {
    const paragraph = raw.trim();
    if (!paragraph) continue;
    if (isArticleSubheading(paragraph)) {
      if (current.title || current.paragraphs.length > 0) sections.push(current);
      current = { title: paragraph.replace(/:$/, ""), paragraphs: [] };
      continue;
    }
    current = { ...current, paragraphs: [...current.paragraphs, paragraph] };
  }
  if (current.title || current.paragraphs.length > 0) sections.push(current);
  return coalesceMicroSections(sections);
}

function LegacyEditorial({
  entry,
  nextSteps,
}: {
  entry: InsightEntry;
  nextSteps: readonly NextStep[];
}) {
  const sections = splitBodyIntoSections(entry.body);
  const perspectiveIndex = sections.findIndex((s) =>
    isArcPerspectiveTitle(s.title),
  );
  const main =
    perspectiveIndex >= 0 ? sections.slice(0, perspectiveIndex) : sections;
  const perspective =
    perspectiveIndex >= 0 ? sections[perspectiveIndex]! : null;
  const trailing =
    perspectiveIndex >= 0 ? sections.slice(perspectiveIndex + 1) : [];

  return (
    <article className="arc-blog-newsprint">
      <div
        className={cn(
          "mx-auto px-6 pb-16 sm:px-10 sm:pb-20 md:px-12 md:pb-24",
          ARC_GALLERY_CLEAR_BELOW_LOGO,
          ARC_PAGE_RAIL_MAX,
        )}
      >
        <div className="mx-auto max-w-3xl">
          <BackLink kind={entry.kind} />

          <header className="mt-8 text-center sm:mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <MetaPill>{kindLabel(entry.kind)}</MetaPill>
              {entry.publishedAt ? (
                <MetaPill>{entry.publishedAt}</MetaPill>
              ) : null}
            </div>
            <h1 className="mt-6 font-title-emphasis font-normal not-italic text-[clamp(2.75rem,10vw,5rem)] leading-[0.95] tracking-tight text-arc-teal-ink text-balance">
              {entry.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base font-medium leading-relaxed text-arc-charcoal/75 sm:text-lg">
              {entry.excerpt}
            </p>
          </header>

          <Hairline className="mx-auto mt-8 mb-10 max-w-xs bg-arc-charcoal/25" />

          {main.map((section, i) => (
            <section
              key={`${entry.id}-m-${section.title ?? "o"}-${i}`}
              className={cn(
                i === 0 ? "" : "mt-12 border-t border-arc-charcoal/15 pt-10 sm:mt-14 sm:pt-12",
              )}
            >
              {section.title ? (
                <>
                  <h2 className={SECTION_HEADING}>{section.title}</h2>
                  <Hairline className="mt-4 mb-6 max-w-[6rem] bg-arc-champagne" />
                </>
              ) : null}
              <ProseBlock paragraphs={section.paragraphs} />
              {section.blocks?.map((block) => (
                <div key={block.title} className="mt-8">
                  <h3 className="font-title-emphasis font-normal not-italic text-[clamp(1.75rem,4vw,2.25rem)] leading-[0.95] tracking-tight text-arc-teal-ink">
                    {block.title}
                  </h3>
                  <div className="mt-3">
                    <ProseBlock paragraphs={block.paragraphs} />
                  </div>
                </div>
              ))}
            </section>
          ))}

          {perspective ? (
            <section className="mt-14 border border-arc-charcoal/20 bg-[#f7f1e6]/80 px-5 py-8 sm:mt-16 sm:px-8 sm:py-10">
              <h2 className={SECTION_HEADING}>
                {perspective.title ?? "This Is Where the Arc Begins"}
              </h2>
              <Hairline className="mt-4 mb-6 max-w-[6rem] bg-arc-champagne" />
              <ProseBlock paragraphs={perspective.paragraphs} />
            </section>
          ) : null}

          {trailing.map((section, i) => (
            <section
              key={`${entry.id}-t-${section.title ?? "x"}-${i}`}
              className="mt-12 border-t border-arc-charcoal/15 pt-10 sm:mt-14 sm:pt-12"
            >
              {section.title ? (
                <>
                  <h2 className={SECTION_HEADING}>{section.title}</h2>
                  <Hairline className="mt-4 mb-6 max-w-[6rem] bg-arc-champagne" />
                </>
              ) : null}
              <ProseBlock paragraphs={section.paragraphs} />
            </section>
          ))}

          <ContinuePath nextSteps={nextSteps} />
        </div>
      </div>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </article>
  );
}

export function InsightDetailContent({ entry }: InsightDetailContentProps) {
  const nextSteps: readonly NextStep[] = [
    {
      label: entry.article?.primaryCtaLabel?.trim() || "Book a consultation",
      href: siteMeta.bookingUrl,
    },
    { label: backLabel(entry.kind), href: backHref(entry.kind) },
    { label: "Explore treatments", href: "/treatments" },
  ];

  if (entry.article) {
    return (
      <TypedEditorial
        entry={entry}
        article={entry.article}
        nextSteps={nextSteps}
      />
    );
  }

  return <LegacyEditorial entry={entry} nextSteps={nextSteps} />;
}
