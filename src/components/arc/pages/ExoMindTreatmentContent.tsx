"use client";

import Link from "next/link";
import { Brain, Flower, type LucideIcon } from "lucide-react";

import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcPrimaryCta } from "@/components/arc/ArcPrimaryCta";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcWindowFrame } from "@/components/arc/ArcWindowFrame";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import type { TreatmentPage } from "@/content/pages/treatments";
import {
  exomindBenefitPills,
  exomindClosing,
  exomindDecades,
  exomindDisclaimer,
  exomindHero,
  exomindNeuroplasticity,
  exomindWhatIs,
  type ExoMindIconItem,
} from "@/content/pages/exomind";
import { siteMeta } from "@/content/siteMeta";
import {
  ARC_PAGE_RAIL_MAX,
  ARC_PINNED_CLEAR_BELOW_LOGO,
  ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
} from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

type ExoMindTreatmentContentProps = {
  treatment: TreatmentPage;
};

const EYEBROW_CLASS =
  "font-sans text-xs font-semibold uppercase tracking-[0.22em] text-arc-teal-ink";

/** Small gold divider ornament used between heading blocks (echoes the infographic). */
function GoldRule({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-px w-16 bg-gradient-to-r from-transparent via-arc-champagne to-transparent",
        className,
      )}
    />
  );
}

function IconBadge({
  icon: Icon,
  size = "md",
}: {
  icon: LucideIcon;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-arc-champagne/45 bg-arc-cream text-arc-teal-ink",
        size === "md" ? "h-14 w-14" : "h-11 w-11",
      )}
    >
      <Icon
        className={size === "md" ? "h-6 w-6" : "h-5 w-5"}
        strokeWidth={1.5}
        aria-hidden
      />
    </span>
  );
}

function IconStat({ item }: { item: ExoMindIconItem }) {
  const { icon: Icon, label } = item;
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-arc-champagne/45 bg-arc-cream text-arc-teal-ink sm:h-12 sm:w-12">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-arc-charcoal/80 sm:text-[0.6875rem]">
        {label}
      </span>
    </div>
  );
}

export function ExoMindTreatmentContent({ treatment }: ExoMindTreatmentContentProps) {
  const bookHref = siteMeta.bookingUrl;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        className={cn(
          "relative overflow-hidden bg-arc-cream pb-16 sm:pb-20",
          ARC_PINNED_CLEAR_BELOW_LOGO,
        )}
      >
        <div
          className={cn(
            "relative z-10 mx-auto grid grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-2 md:gap-12 md:px-12",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          {/* Copy */}
          <div className="flex flex-col">
            <ArcTextReveal variant="body" trigger="mount">
              <p className={EYEBROW_CLASS}>{exomindHero.eyebrow}</p>
            </ArcTextReveal>
            <ArcTextReveal variant="heading" trigger="mount" delayIndex={1}>
              <h1 className="mt-4 font-serif text-[clamp(2.75rem,9vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-arc-charcoal">
                {exomindHero.title}
                <sup className="ml-1 align-super font-sans text-[0.28em] font-semibold text-arc-teal-ink">
                  ®
                </sup>
              </h1>
            </ArcTextReveal>
            <ArcTextReveal variant="body" trigger="mount" delayIndex={2}>
              <p className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-champagne sm:text-base">
                {exomindHero.subhead}
              </p>
            </ArcTextReveal>
            <GoldRule className="mt-6" />
            <ArcTextReveal variant="body" trigger="mount" delayIndex={3}>
              <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-arc-charcoal/85 sm:text-base">
                {exomindHero.intro}
              </p>
            </ArcTextReveal>

            <ArcTextReveal variant="body" trigger="mount" delayIndex={4}>
              <div className="mt-8 grid grid-cols-5 gap-1.5 sm:max-w-md sm:gap-3">
                {exomindBenefitPills.map((pill) => (
                  <IconStat key={pill.label} item={pill} />
                ))}
              </div>
            </ArcTextReveal>

            <ArcTextReveal variant="body" trigger="mount" delayIndex={5}>
              <div className="mt-9">
                <ArcPrimaryCta href={bookHref}>{exomindClosing.ctaLabel}</ArcPrimaryCta>
              </div>
            </ArcTextReveal>
          </div>

          {/* Device photo + badge */}
          <div className="relative lg:pl-8">
            <ArcTextReveal variant="body" trigger="mount" delayIndex={2}>
              <ArcWindowFrame
                src={exomindHero.imageSrc}
                alt={exomindHero.imageAlt}
                feather
                priority
                className="aspect-[4/5] w-full sm:aspect-[5/6]"
                imageClassName="object-cover object-center"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </ArcTextReveal>

            <div className="mx-auto mt-6 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-arc-champagne/50 bg-arc-cream/95 px-5 text-center shadow-[0_12px_40px_rgba(44,44,44,0.12)] sm:h-40 sm:w-40 lg:absolute lg:-bottom-8 lg:left-0 lg:mt-0">
              <p className="font-serif text-sm font-semibold leading-tight text-arc-charcoal sm:text-base">
                {exomindHero.badge.lines.join(" ")}
              </p>
              <p className="mt-2 font-sans text-[0.625rem] leading-snug text-arc-charcoal/70">
                {exomindHero.badge.note}
              </p>
            </div>
          </div>
        </div>

        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      </section>

      {/* ---------- What is ExoMind ---------- */}
      <section
        className={cn(
          "relative overflow-hidden bg-arc-cream-deep px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="max-w-2xl">
            <ArcTextReveal variant="heading">
              <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight text-arc-charcoal">
                {exomindWhatIs.title}{" "}
                <TitleEmphasis className="text-arc-teal-ink">
                  {exomindWhatIs.titleEmphasis}
                </TitleEmphasis>
              </h2>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={1}>
              <p className="mt-6 font-sans text-sm leading-relaxed text-arc-charcoal/85 sm:text-base">
                {exomindWhatIs.body}
              </p>
            </ArcTextReveal>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 lg:grid-cols-4 lg:gap-x-8">
            {exomindWhatIs.features.map((feature, i) => (
              <ArcTextReveal key={feature.title} variant="body" delayIndex={i + 1}>
                <div className="flex flex-col items-start gap-4 lg:border-l lg:border-arc-charcoal/12 lg:pl-6">
                  <IconBadge icon={feature.icon} />
                  <div>
                    <h3 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-arc-charcoal">
                      {feature.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-arc-charcoal/78">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </ArcTextReveal>
            ))}
          </div>
        </div>
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      </section>

      {/* ---------- Supporting you through the decades ---------- */}
      <section
        className={cn(
          "relative overflow-hidden bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-2xl text-center">
            <ArcTextReveal variant="heading">
              <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight text-arc-charcoal">
                {exomindDecades.title}{" "}
                <TitleEmphasis className="text-arc-teal-ink">
                  {exomindDecades.titleEmphasis}
                </TitleEmphasis>
              </h2>
            </ArcTextReveal>
            <GoldRule className="mx-auto mt-6" />
            <ArcTextReveal variant="body" delayIndex={1}>
              <p className="mt-6 font-serif text-lg italic leading-relaxed text-arc-charcoal/80 sm:text-xl">
                {exomindDecades.intro}
              </p>
            </ArcTextReveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-3">
            {exomindDecades.tiers.map((tier, i) => (
              <ArcTextReveal key={tier.range} variant="body" delayIndex={i + 1}>
                <article className="flex h-full flex-col rounded-2xl border border-arc-teal/15 bg-arc-cream/60 p-6 sm:p-7">
                  <IconBadge icon={tier.icon} />
                  <h3 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-arc-charcoal">
                    {tier.range}
                  </h3>
                  <p className="mt-1 font-sans text-xs font-bold uppercase tracking-[0.14em] text-arc-champagne">
                    {tier.theme}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-arc-charcoal/80">
                    {tier.body}
                  </p>

                  <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-arc-teal-ink">
                    ExoMind may help support:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {tier.supports.map((support) => (
                      <li
                        key={support}
                        className="flex items-start gap-2.5 font-sans text-sm leading-snug text-arc-charcoal/80"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-arc-teal"
                        />
                        {support}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 rounded-xl bg-arc-teal-muted/60 px-4 py-3 font-serif text-sm italic leading-snug text-arc-charcoal/78 md:mt-auto md:pt-4">
                    {tier.note}
                  </p>
                </article>
              </ArcTextReveal>
            ))}
          </div>
        </div>
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      </section>

      {/* ---------- The power of neuroplasticity ---------- */}
      <section
        className={cn(
          "relative overflow-hidden bg-arc-teal-muted/40 px-6 py-16 sm:px-10 sm:py-20 md:px-12 md:py-24",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="muted" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto", ARC_PAGE_RAIL_MAX)}>
          <div className="mx-auto max-w-2xl text-center">
            <ArcTextReveal variant="heading">
              <h2 className="font-serif text-[clamp(2rem,6vw,3rem)] font-semibold leading-[1.1] tracking-tight text-arc-charcoal">
                {exomindNeuroplasticity.title}{" "}
                <TitleEmphasis className="text-arc-teal-ink">
                  {exomindNeuroplasticity.titleEmphasis}
                </TitleEmphasis>
              </h2>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={1}>
              <p className="mt-5 font-serif text-lg italic text-arc-charcoal/85 sm:text-xl">
                {exomindNeuroplasticity.lede}
              </p>
            </ArcTextReveal>
            <ArcTextReveal variant="body" delayIndex={2}>
              <p className="mt-4 font-sans text-sm leading-relaxed text-arc-charcoal/80 sm:text-base">
                {exomindNeuroplasticity.body}
              </p>
            </ArcTextReveal>
          </div>

          {/* Focal brain block */}
          <ArcTextReveal variant="body" delayIndex={1}>
            <div className="mx-auto mt-12 flex max-w-xl flex-col items-center rounded-3xl border border-arc-teal/20 bg-arc-cream/70 px-6 py-10 text-center sm:mt-14 sm:px-10">
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-arc-champagne/45 bg-arc-cream text-arc-teal-ink">
                <Brain className="h-10 w-10" strokeWidth={1.25} aria-hidden />
              </span>
              <p className="mt-6 font-serif text-2xl font-semibold leading-tight tracking-tight text-arc-charcoal sm:text-3xl">
                {exomindNeuroplasticity.center.words.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </p>
              <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-arc-charcoal/78">
                {exomindNeuroplasticity.center.body}
              </p>
            </div>
          </ArcTextReveal>

          {/* Two support lists */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10">
            {[
              {
                title: exomindNeuroplasticity.helpsTitle,
                items: exomindNeuroplasticity.helps,
              },
              {
                title: exomindNeuroplasticity.networkTitle,
                items: exomindNeuroplasticity.network,
              },
            ].map((group, gi) => (
              <ArcTextReveal key={group.title} variant="body" delayIndex={gi + 1}>
                <div className="rounded-2xl border border-arc-teal/12 bg-arc-cream/55 p-6 sm:p-7">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-arc-teal-ink">
                    {group.title}
                  </p>
                  <ul className="mt-5 grid grid-cols-1 gap-4">
                    {group.items.map((item) => (
                      <li key={item.label} className="flex items-center gap-3">
                        <IconBadge icon={item.icon} size="sm" />
                        <span className="font-sans text-sm font-medium text-arc-charcoal/85">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ArcTextReveal>
            ))}
          </div>
        </div>
        <ArcSectionSeamBlend edge="bottom" tone="muted" variant="soft" scope="background" />
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section
        className={cn(
          "relative overflow-hidden bg-arc-cream px-6 py-20 text-center sm:px-10 sm:py-24 md:px-12",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto max-w-2xl", ARC_PAGE_RAIL_MAX)}>
          <ArcTextReveal variant="body">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-arc-champagne/45 bg-arc-cream text-arc-teal-ink">
              <Flower className="h-6 w-6" strokeWidth={1.5} aria-hidden />
            </span>
          </ArcTextReveal>
          <ArcTextReveal variant="heading" delayIndex={1}>
            <h2 className="mt-6 font-serif text-[clamp(1.9rem,5.5vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-arc-charcoal">
              {exomindClosing.title}{" "}
              <TitleEmphasis className="text-arc-teal-ink">
                {exomindClosing.titleEmphasis}
              </TitleEmphasis>
            </h2>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={2}>
            <p className="mt-5 font-sans text-base font-semibold uppercase tracking-[0.18em] text-arc-champagne">
              {exomindClosing.words}
            </p>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={3}>
            <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-arc-charcoal/80 sm:text-base">
              {exomindClosing.support}
            </p>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={4}>
            <div className="mt-9 flex justify-center">
              <ArcPrimaryCta href={bookHref}>{exomindClosing.ctaLabel}</ArcPrimaryCta>
            </div>
          </ArcTextReveal>
          <ArcTextReveal variant="body" delayIndex={5}>
            <p className="mx-auto mt-10 max-w-lg font-sans text-xs leading-relaxed text-arc-charcoal/55">
              {exomindDisclaimer}
            </p>
          </ArcTextReveal>
        </div>
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
      </section>

      {/* ---------- FAQ (reuse existing treatment FAQs) ---------- */}
      {treatment.faqs?.length ? (
        <ArcFaqSection
          id="treatment-faq"
          categories={{ treatment: treatment.title }}
          faqByCategory={{ treatment: treatment.faqs }}
          topSeam
          bottomSeam
        />
      ) : null}

      {/* ---------- Back link ---------- */}
      <section
        className={cn(
          "relative bg-arc-cream px-6 py-12 sm:px-10 md:px-12",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
          <ArcTextReveal variant="line">
            <Link
              href="/treatments"
              className="inline-flex min-h-[44px] items-center font-sans text-sm font-semibold uppercase tracking-[0.18em] text-arc-teal-ink transition-colors hover:text-arc-teal-ink-hover"
            >
              ← All treatments
            </Link>
          </ArcTextReveal>
        </div>
      </section>
    </>
  );
}
