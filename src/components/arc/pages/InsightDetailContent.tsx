"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ServiceCreamPlate,
  ServiceDarkPlate,
  ServiceGoldRule,
  ServiceWave,
  ServiceWaveInset,
  serviceAboveCrestBottomMaskStyle,
  SERVICE_WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
} from "@/components/arc/servicePlate";
import { ARC_ABOUT_COMPACT_BODY_CLASS } from "@/components/arc/TitleEmphasis";
import { homeInvestSupport } from "@/content/homepage";
import {
  type InsightArticle,
  type InsightArticleSection,
  type InsightEntry,
  type InsightKind,
  type InsightSectionList,
} from "@/content/pages/insights";
import {
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
} from "@/content/pages/serviceTemplate";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";
import {
  ARC_GALLERY_CLEAR_BELOW_LOGO,
  ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS,
  ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS,
  ARC_PAGE_RAIL_MAX,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

/**
 * Blog / case-study detail — condition plate/wave stack.
 * Prefer typed `entry.article`; fall back to Word-import heuristics on `body`.
 */

const DEFAULT_HERO_OBJECT =
  "object-cover object-[72%_center] sm:object-[65%_center] lg:object-center";

const CREAM_HEADLINE = cn(
  "font-title-emphasis block font-normal not-italic tracking-tight text-arc-teal-ink",
  "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.45),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
);

const DARK_GOLD_HEADLINE =
  "font-title-emphasis block tracking-tight text-[#d9b878] [-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)] [text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]";

const SECTION_Z = [
  "z-[10]",
  "z-[9]",
  "z-[8]",
  "z-[7]",
  "z-[6]",
  "z-[5]",
  "z-[4]",
  "z-[3]",
] as const;

type InsightDetailContentProps = {
  entry: InsightEntry;
};

type NextStep = { label: string; href: string };

function backHref(kind: InsightKind): string {
  return kind === "blog"
    ? "/case-studies?filter=blog"
    : "/case-studies?filter=case-study";
}

function backLabel(kind: InsightKind): string {
  return kind === "blog" ? "All blogs" : "All case studies";
}

function kindLabel(kind: InsightKind): string {
  return kind === "blog" ? "Blog" : "Case study";
}

function NextStepRow({ step, index }: { step: NextStep; index: number }) {
  return (
    <li>
      <ArcTextReveal variant="body" delayIndex={index}>
        <Link
          href={step.href}
          className="group relative flex min-h-[3.25rem] items-center justify-center gap-3 py-3.5 text-center transition-colors sm:min-h-[3.5rem] sm:py-4"
        >
          <span className="font-serif text-lg tracking-tight text-[#d9b878] transition-colors group-hover:text-arc-champagne-hover sm:text-xl">
            {step.label}
          </span>
          <ArrowRight
            aria-hidden
            className="h-4 w-4 shrink-0 text-[#d9b878]/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#d9b878]"
          />
        </Link>
      </ArcTextReveal>
    </li>
  );
}

function ProseBlock({
  paragraphs,
  tone = "cream",
}: {
  paragraphs: readonly string[];
  tone?: "cream" | "dark";
}) {
  if (!paragraphs.length) return null;
  return (
    <div className="mx-auto mt-6 max-w-4xl space-y-4">
      {paragraphs.map((paragraph, i) => (
        <ArcTextReveal
          key={`${paragraph.slice(0, 24)}-${i}`}
          variant="body"
          delayIndex={Math.min(i + 1, 5)}
        >
          <p
            className={
              tone === "dark"
                ? "font-sans text-sm leading-relaxed sm:text-base"
                : ARC_ABOUT_COMPACT_BODY_CLASS
            }
            style={
              tone === "dark" ? { color: "rgba(217,184,120,0.82)" } : undefined
            }
          >
            {paragraph}
          </p>
        </ArcTextReveal>
      ))}
    </div>
  );
}

function SectionList({ list }: { list: InsightSectionList }) {
  if (list.style === "bullets") {
    const useGrid =
      list.items.length >= 3 && list.items.every((item) => item.length <= 72);
    return useGrid ? (
      <ul className="mx-auto mt-8 grid max-w-4xl gap-x-12 gap-y-5 text-left sm:grid-cols-2">
        {list.items.map((item, i) => (
          <ArcTextReveal key={item} variant="body" delayIndex={i}>
            <li className="flex gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
              <span className="font-serif text-base leading-snug tracking-tight text-arc-teal-ink sm:text-lg">
                {item}
              </span>
            </li>
          </ArcTextReveal>
        ))}
      </ul>
    ) : (
      <ul className="mx-auto mt-8 max-w-4xl space-y-3 text-left">
        {list.items.map((item, i) => (
          <ArcTextReveal key={item} variant="body" delayIndex={i}>
            <li className="flex gap-2.5 font-sans text-sm text-arc-charcoal/80 sm:text-[0.9375rem]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal-ink" />
              <span>{item}</span>
            </li>
          </ArcTextReveal>
        ))}
      </ul>
    );
  }

  if (list.style === "cards") {
    return (
      <ul className="mx-auto mt-10 grid max-w-4xl gap-4 text-left sm:grid-cols-2 sm:gap-5">
        {list.items.map((item, i) => (
          <ArcTextReveal key={item.label} variant="body" delayIndex={i}>
            <li className="h-full rounded-2xl border border-arc-charcoal/10 bg-arc-cream/55 px-5 py-5 sm:px-6 sm:py-6">
              <p className="font-serif text-lg tracking-tight text-arc-teal-ink sm:text-xl">
                {item.label}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-arc-charcoal/75 sm:text-[0.9375rem]">
                {item.body}
              </p>
            </li>
          </ArcTextReveal>
        ))}
      </ul>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl overflow-x-auto">
      <div className="grid min-w-[20rem] grid-cols-[minmax(5rem,0.9fr)_1fr_1fr] gap-px rounded-xl border border-arc-charcoal/12 bg-arc-charcoal/12 text-left">
        <div className="bg-arc-cream/80 px-3 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal/55 sm:px-4" />
        <div className="bg-arc-cream/80 px-3 py-3 font-serif text-sm text-arc-teal-ink sm:px-4 sm:text-base">
          {list.leftTitle}
        </div>
        <div className="bg-arc-cream/80 px-3 py-3 font-serif text-sm text-arc-teal-ink sm:px-4 sm:text-base">
          {list.rightTitle}
        </div>
        {list.rows.map((row) => (
          <div key={row.label} className="contents">
            <div className="bg-arc-cream/70 px-3 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-arc-charcoal/60 sm:px-4 sm:text-[0.7rem]">
              {row.label}
            </div>
            <div className="bg-arc-cream/55 px-3 py-3 font-sans text-sm text-arc-charcoal/80 sm:px-4">
              {row.left}
            </div>
            <div className="bg-arc-cream/55 px-3 py-3 font-sans text-sm text-arc-charcoal/80 sm:px-4">
              {row.right}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreamPlateShell({
  zClass,
  plateSrc,
  children,
}: {
  zClass: string;
  plateSrc: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-x-clip",
        zClass,
        SERVICE_WAVE_MT_CLASS,
        SERVICE_WAVE_H_VAR_CLASS,
      )}
    >
      <ServiceCreamPlate src={plateSrc} />
      <ServiceWaveInset />
      <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-5xl text-center">{children}</div>
        </div>
      </section>
      <ServiceWave tone="pearl" />
    </div>
  );
}

function CreamTitle({ children }: { children: string }) {
  return (
    <ArcTextReveal variant="heading">
      <h2 className="text-balance leading-[0.92]">
        <span
          className={CREAM_HEADLINE}
          style={{
            fontSize: "clamp(1.65rem, 5vw, 2.75rem)",
            fontSizeAdjust: "none",
          }}
        >
          {children}
        </span>
      </h2>
    </ArcTextReveal>
  );
}

function TypedSection({
  section,
  plateSrc,
  zClass,
}: {
  section: InsightArticleSection;
  plateSrc: string;
  zClass: string;
}) {
  return (
    <CreamPlateShell zClass={zClass} plateSrc={plateSrc}>
      <CreamTitle>{section.title}</CreamTitle>
      <ServiceGoldRule className="mx-auto mt-6" />
      {section.callout ? (
        <ArcTextReveal variant="body" delayIndex={1}>
          <div className="mx-auto mt-8 inline-flex max-w-2xl rounded-full border-2 border-arc-champagne bg-arc-cream/90 px-6 py-3 shadow-[0_10px_28px_-12px_rgba(120,90,40,0.45)]">
            <p className="font-sans text-sm font-bold leading-snug text-black sm:text-[0.9375rem]">
              {section.callout}
            </p>
          </div>
        </ArcTextReveal>
      ) : null}
      <ProseBlock paragraphs={section.body} />
      {section.list ? <SectionList list={section.list} /> : null}
      {section.closing?.length ? (
        <ProseBlock paragraphs={section.closing} />
      ) : null}
    </CreamPlateShell>
  );
}

function TypedArticle({
  entry,
  article,
  creamPlateSrc,
  darkPlateSrc,
  nextSteps,
}: {
  entry: InsightEntry;
  article: InsightArticle;
  creamPlateSrc: string;
  darkPlateSrc: string;
  nextSteps: readonly NextStep[];
}) {
  let z = 0;
  const nextZ = () =>
    SECTION_Z[Math.min(z++, SECTION_Z.length - 1)] ?? "z-[3]";

  return (
    <>
      <InsightHero entry={entry} closingLine={article.closingLine} />

      <CreamPlateShell zClass={nextZ()} plateSrc={creamPlateSrc}>
        <ServiceGoldRule className="mx-auto" />
        <ProseBlock paragraphs={article.overview} />
        {article.overviewCallout ? (
          <ArcTextReveal variant="body" delayIndex={2}>
            <div className="mx-auto mt-8 inline-flex max-w-2xl rounded-full border-2 border-arc-champagne bg-arc-cream/90 px-6 py-3 shadow-[0_10px_28px_-12px_rgba(120,90,40,0.45)]">
              <p className="font-sans text-sm font-bold leading-snug text-black sm:text-[0.9375rem]">
                {article.overviewCallout}
              </p>
            </div>
          </ArcTextReveal>
        ) : null}
      </CreamPlateShell>

      {article.sections.map((section) => (
        <TypedSection
          key={section.title}
          section={section}
          plateSrc={creamPlateSrc}
          zClass={nextZ()}
        />
      ))}

      <DarkPerspective
        zClass={nextZ()}
        darkPlateSrc={darkPlateSrc}
        title={article.perspective.title}
        paragraphs={article.perspective.body}
      />

      <ContinuePathPlate
        zClass={nextZ()}
        darkPlateSrc={darkPlateSrc}
        nextSteps={nextSteps}
      />

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}

function InsightHero({
  entry,
  closingLine,
}: {
  entry: InsightEntry;
  closingLine?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-20 flex min-h-[100dvh] flex-col",
        SERVICE_WAVE_H_VAR_CLASS,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
        style={serviceAboveCrestBottomMaskStyle}
        aria-hidden
      >
        <Image
          src={entry.imageSrc}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className={DEFAULT_HERO_OBJECT}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-arc-cream/35 via-arc-cream/15 to-arc-cream/30" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-arc-cream/40 to-transparent sm:h-32" />
      </div>

      <section
        id="insight-hero"
        className={cn(
          "relative z-10 flex flex-1 flex-col",
          ARC_GALLERY_CLEAR_BELOW_LOGO,
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full flex-1 flex-col justify-center px-6 sm:px-10 md:px-12",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          <div className="relative mx-auto w-full max-w-xl text-center md:max-w-3xl lg:max-w-4xl">
            <div className="relative z-10">
              <div className="-translate-y-3 sm:-translate-y-4 md:-translate-y-5 lg:-translate-y-6">
                <ArcTextReveal variant="heading" trigger="mount">
                  <h1 className="font-serif text-[clamp(2.75rem,7.5vw,4.75rem)] font-bold leading-none tracking-tight text-black [text-shadow:0_1px_12px_rgba(245,240,232,0.85)] md:[text-shadow:none]">
                    {entry.title}
                  </h1>
                </ArcTextReveal>
                <ArcTextReveal variant="body" trigger="mount" delayIndex={1}>
                  <p className="mx-auto mt-5 max-w-2xl font-sans text-sm font-bold uppercase tracking-[0.22em] text-black [text-shadow:0_1px_10px_rgba(245,240,232,0.8)] sm:text-base md:text-lg md:[text-shadow:none]">
                    {kindLabel(entry.kind)}
                    {entry.publishedAt ? ` · ${entry.publishedAt}` : ""}
                  </p>
                </ArcTextReveal>
              </div>
              <ArcTextReveal variant="body" trigger="mount" delayIndex={2}>
                <p className="mx-auto mt-6 max-w-xl font-sans text-sm font-semibold leading-relaxed text-black [text-shadow:0_1px_10px_rgba(245,240,232,0.75)] sm:text-base md:max-w-3xl md:[text-shadow:none] lg:max-w-4xl">
                  {entry.excerpt}
                </p>
              </ArcTextReveal>
              {closingLine ? (
                <ArcTextReveal variant="body" trigger="mount" delayIndex={3}>
                  <div className="mx-auto mt-8 inline-flex max-w-md rounded-full border-2 border-arc-champagne bg-arc-cream/90 px-6 py-3 shadow-[0_10px_28px_-12px_rgba(120,90,40,0.45)] backdrop-blur-[3px] md:bg-arc-cream/85">
                    <p className="font-sans text-sm font-bold leading-snug text-black sm:text-[0.9375rem]">
                      {closingLine}
                    </p>
                  </div>
                </ArcTextReveal>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <span className="sr-only">{entry.imageAlt}</span>
      <ServiceWave tone="pearl" />
    </div>
  );
}

function DarkPerspective({
  zClass,
  darkPlateSrc,
  title,
  paragraphs,
}: {
  zClass: string;
  darkPlateSrc: string;
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <div
      className={cn(
        "relative overflow-x-clip",
        zClass,
        SERVICE_WAVE_MT_CLASS,
        SERVICE_WAVE_H_VAR_CLASS,
      )}
    >
      <ServiceDarkPlate src={darkPlateSrc} />
      <ServiceWaveInset />
      <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-5xl text-center">
            <ArcTextReveal variant="heading">
              <h2 className="text-balance leading-[0.92]">
                <span
                  className={DARK_GOLD_HEADLINE}
                  style={{
                    fontSize: "clamp(1.65rem, 5vw, 2.75rem)",
                    fontSizeAdjust: "none",
                  }}
                >
                  {title}
                </span>
              </h2>
            </ArcTextReveal>
            <ServiceGoldRule className="mx-auto mt-6" />
            <ProseBlock paragraphs={paragraphs} tone="dark" />
          </div>
        </div>
      </section>
      <ServiceWave />
    </div>
  );
}

function ContinuePathPlate({
  zClass,
  darkPlateSrc,
  nextSteps,
}: {
  zClass: string;
  darkPlateSrc: string;
  nextSteps: readonly NextStep[];
}) {
  return (
    <div
      className={cn(
        "relative overflow-x-clip",
        zClass,
        SERVICE_WAVE_MT_CLASS,
        SERVICE_WAVE_H_VAR_CLASS,
      )}
    >
      <ServiceDarkPlate src={darkPlateSrc} maskBottom={false} />
      <ServiceWaveInset />
      <section className="relative z-10 px-6 pb-16 pt-4 sm:px-10 sm:pb-20 md:px-12 md:pb-24">
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-5xl text-center">
            <ArcTextReveal variant="heading">
              <h2 className="text-balance leading-[0.92]">
                <span
                  className={DARK_GOLD_HEADLINE}
                  style={{
                    fontSize: "clamp(1.65rem, 5vw, 2.75rem)",
                    fontSizeAdjust: "none",
                  }}
                >
                  Continue your path
                </span>
              </h2>
            </ArcTextReveal>
            <ServiceGoldRule className="mx-auto mt-6" />
            <ArcTextReveal variant="body" delayIndex={1}>
              <p
                className="mx-auto mt-6 max-w-2xl font-sans text-sm leading-relaxed sm:text-base"
                style={{ color: "rgba(217,184,120,0.82)" }}
              >
                Ready for personalized care, or want to keep reading?
              </p>
            </ArcTextReveal>
          </div>
          <ul className="mx-auto mt-10 max-w-3xl divide-y divide-[#d9b878]/25 border-y border-[#d9b878]/25 sm:mt-12">
            {nextSteps.map((step, i) => (
              <NextStepRow key={step.label} step={step} index={i} />
            ))}
          </ul>
        </div>
      </section>
      <div
        aria-hidden
        className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
      />
      <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />
    </div>
  );
}

function DarkClose({
  zClass,
  nextZClass,
  darkPlateSrc,
  title,
  paragraphs,
  nextSteps,
}: {
  zClass: string;
  nextZClass: string;
  darkPlateSrc: string;
  title: string;
  paragraphs: readonly string[];
  nextSteps: readonly NextStep[];
}) {
  return (
    <>
      <DarkPerspective
        zClass={zClass}
        darkPlateSrc={darkPlateSrc}
        title={title}
        paragraphs={paragraphs}
      />
      <ContinuePathPlate
        zClass={nextZClass}
        darkPlateSrc={darkPlateSrc}
        nextSteps={nextSteps}
      />
    </>
  );
}

/* ---------- Legacy Word-import path (posts without `article`) ---------- */

type LegacySection = {
  title: string | null;
  paragraphs: readonly string[];
  blocks?: readonly { title: string; paragraphs: readonly string[] }[];
};

function isArticleSubheading(paragraph: string): boolean {
  const t = paragraph.trim();
  if (t.length < 3 || t.length > 80) return false;
  if (/[.!]$/.test(t)) return false;
  if (t.includes(". ") || t.includes("? ")) return false;
  if (/:\s+\S.{36,}/.test(t)) return false;
  const words = t.replace(/[?:]$/, "").split(/\s+/);
  if (words.length < 2 || words.length > 14) return false;
  const significant = words.filter(
    (w) =>
      !/^(and|or|the|a|an|of|in|to|for|your|when|with|&|through|on)$/i.test(w),
  );
  if (!significant.length) return false;
  return significant.every((w) => /^[A-Z0-9]/.test(w));
}

function isArcPerspectiveTitle(title: string | null): boolean {
  return Boolean(
    title &&
      (/arc perspective/i.test(title) ||
        /where the arc begins/i.test(title) ||
        /supporting you through the decades/i.test(title)),
  );
}

function isBulletOnlySection(section: LegacySection): boolean {
  if (!section.title || isArcPerspectiveTitle(section.title)) return false;
  if (section.paragraphs.length < 2) return false;
  return section.paragraphs.every((p) => {
    const t = p.trim();
    return t.length <= 90 && !/[.!?]$/.test(t) && !/:\s+\S.{20,}/.test(t);
  });
}

function coalesceMicroSections(sections: LegacySection[]): LegacySection[] {
  const out: LegacySection[] = [];
  for (const section of sections) {
    if (
      section.title &&
      section.paragraphs.length === 0 &&
      !(section.blocks && section.blocks.length)
    ) {
      const prev = out[out.length - 1];
      if (prev && !isArcPerspectiveTitle(section.title)) {
        out.push(section);
        continue;
      }
    }
    const isMicro =
      Boolean(section.title) &&
      !isArcPerspectiveTitle(section.title) &&
      (isBulletOnlySection(section) ||
        section.paragraphs.length <= 2 ||
        (section.paragraphs.length <= 3 &&
          (section.title?.split(/\s+/).length ?? 0) <= 4));
    const prev = out[out.length - 1];
    if (isMicro && prev && !isArcPerspectiveTitle(prev.title)) {
      if (prev.paragraphs.length === 0 && prev.title && !prev.blocks?.length) {
        out[out.length - 1] = {
          title: prev.title,
          paragraphs: [],
          blocks: [
            { title: section.title!, paragraphs: section.paragraphs },
          ],
        };
        continue;
      }
      out[out.length - 1] = {
        ...prev,
        blocks: [
          ...(prev.blocks ?? []),
          { title: section.title!, paragraphs: section.paragraphs },
        ],
      };
      continue;
    }
    out.push(section);
  }
  return out.filter(
    (s) =>
      s.paragraphs.length > 0 ||
      Boolean(s.blocks?.length) ||
      isArcPerspectiveTitle(s.title),
  );
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

function partitionParagraphs(paragraphs: readonly string[]): {
  prose: string[];
  bullets: string[];
} {
  if (paragraphs.length < 2) return { prose: [...paragraphs], bullets: [] };
  let splitAt = paragraphs.length;
  for (let i = paragraphs.length - 1; i >= 0; i--) {
    const p = paragraphs[i]!;
    const isBullet =
      p.length <= 90 &&
      !/[.!?]$/.test(p) &&
      !isArticleSubheading(p) &&
      !/:\s+\S/.test(p);
    if (isBullet) {
      splitAt = i;
      continue;
    }
    break;
  }
  if (splitAt >= paragraphs.length) {
    return { prose: [...paragraphs], bullets: [] };
  }
  const bullets = paragraphs.slice(splitAt);
  if (bullets.length < 2) return { prose: [...paragraphs], bullets: [] };
  return { prose: paragraphs.slice(0, splitAt), bullets: [...bullets] };
}

function LegacyCreamSection({
  section,
  plateSrc,
  zClass,
}: {
  section: LegacySection;
  plateSrc: string;
  zClass: string;
}) {
  const { prose, bullets } = partitionParagraphs(section.paragraphs);
  const title = section.title ?? "Overview";
  return (
    <CreamPlateShell zClass={zClass} plateSrc={plateSrc}>
      <CreamTitle>{title}</CreamTitle>
      <ServiceGoldRule className="mx-auto mt-6" />
      <ProseBlock paragraphs={prose} />
      {bullets.length > 0 ? (
        <SectionList list={{ style: "bullets", items: bullets }} />
      ) : null}
      {section.blocks?.map((block) => {
        const nested = partitionParagraphs(block.paragraphs);
        return (
          <div key={block.title} className="mt-12 sm:mt-14">
            <ArcTextReveal variant="heading">
              <h3 className="font-serif text-[clamp(1.25rem,3.2vw,1.65rem)] font-semibold tracking-tight text-arc-teal-ink">
                {block.title}
              </h3>
            </ArcTextReveal>
            <ProseBlock paragraphs={nested.prose} />
            {nested.bullets.length > 0 ? (
              <SectionList
                list={{ style: "bullets", items: nested.bullets }}
              />
            ) : null}
          </div>
        );
      })}
    </CreamPlateShell>
  );
}

function LegacyArticle({
  entry,
  creamPlateSrc,
  darkPlateSrc,
  nextSteps,
}: {
  entry: InsightEntry;
  creamPlateSrc: string;
  darkPlateSrc: string;
  nextSteps: readonly NextStep[];
}) {
  const sections = splitBodyIntoSections(entry.body);
  const perspectiveIndex = sections.findIndex((s) =>
    isArcPerspectiveTitle(s.title),
  );
  const creamSections =
    perspectiveIndex >= 0 ? sections.slice(0, perspectiveIndex) : sections;
  const perspective =
    perspectiveIndex >= 0 ? sections[perspectiveIndex]! : null;
  const trailing =
    perspectiveIndex >= 0 ? sections.slice(perspectiveIndex + 1) : [];

  let z = 0;
  const nextZ = () =>
    SECTION_Z[Math.min(z++, SECTION_Z.length - 1)] ?? "z-[3]";

  const darkTitle = perspective?.title ?? "This Is Where the Arc Begins";
  const darkParas =
    perspective?.paragraphs ??
    ([
      "At Arc Wellness, we believe some of the most meaningful conversations in healthcare happen before a diagnosis—when something has changed, and you want to understand your body better.",
    ] as const);

  return (
    <>
      <InsightHero entry={entry} />
      {creamSections.map((section, i) => (
        <LegacyCreamSection
          key={`${entry.id}-c-${section.title ?? "o"}-${i}`}
          section={section}
          plateSrc={creamPlateSrc}
          zClass={nextZ()}
        />
      ))}
      {trailing.map((section, i) => (
        <LegacyCreamSection
          key={`${entry.id}-t-${section.title ?? "m"}-${i}`}
          section={section}
          plateSrc={creamPlateSrc}
          zClass={nextZ()}
        />
      ))}
      <DarkClose
        zClass={nextZ()}
        nextZClass={nextZ()}
        darkPlateSrc={darkPlateSrc}
        title={
          isArcPerspectiveTitle(darkTitle)
            ? "This Is Where the Arc Begins"
            : darkTitle
        }
        paragraphs={darkParas}
        nextSteps={nextSteps}
      />
      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />
    </>
  );
}

export function InsightDetailContent({ entry }: InsightDetailContentProps) {
  const creamPlateSrc = serviceSharedCreamPlate.src;
  const darkPlateSrc = serviceSharedDarkPlate.src;
  const nextSteps: readonly NextStep[] = [
    { label: "Book a consultation", href: siteMeta.bookingUrl },
    { label: backLabel(entry.kind), href: backHref(entry.kind) },
    { label: "Explore treatments", href: "/treatments" },
  ];

  if (entry.article) {
    return (
      <TypedArticle
        entry={entry}
        article={entry.article}
        creamPlateSrc={creamPlateSrc}
        darkPlateSrc={darkPlateSrc}
        nextSteps={nextSteps}
      />
    );
  }

  return (
    <LegacyArticle
      entry={entry}
      creamPlateSrc={creamPlateSrc}
      darkPlateSrc={darkPlateSrc}
      nextSteps={nextSteps}
    />
  );
}
