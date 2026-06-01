"use client";

import Link from "next/link";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { homeInvestSupport } from "@/content/homepage";
import type { TreatmentPage } from "@/content/pages/treatments";
import { images } from "@/content/site";

type TreatmentDetailContentProps = {
  treatment: TreatmentPage;
};

export function TreatmentDetailContent({ treatment }: TreatmentDetailContentProps) {
  return (
    <>
      <ScrollChapterIntroSection
        id="treatment-hero"
        headline={treatment.title}
        body={`${treatment.tagline}. ${treatment.intro}`}
        imageSrc={treatment.imageSrc}
        ctaHref="/book"
        ctaLabel="Book consultation"
      />

      {treatment.highlights?.length ? (
        <section className="border-y border-arc-teal/12 bg-arc-teal-muted/30 px-6 py-10 sm:px-10">
          <ul className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {treatment.highlights.map((h) => (
              <li
                key={h}
                data-scroll-section
                className="rounded-full border border-arc-teal/20 bg-white/80 px-5 py-2.5 text-center font-sans text-sm font-medium text-arc-charcoal/85"
              >
                {h}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {treatment.sections.map((section, i) => (
        <ArcScrollEditorialSection
          key={section.heading ?? i}
          eyebrow={treatment.categoryLabel}
          title={section.heading ?? treatment.title}
          paragraphs={
            section.body
              ? [section.body, ...(section.bullets ?? [])]
              : [...(section.bullets ?? [])]
          }
          variant={i % 2 === 0 ? "cream" : "muted"}
          imageSrc={i === 0 ? treatment.imageSrc : undefined}
          imageAlt={treatment.imageAlt}
          imagePosition={i % 2 === 0 ? "right" : "left"}
          pinned={i === 0}
        />
      ))}

      {treatment.faqs?.length ? (
        <section className="bg-arc-cream px-6 py-16 sm:px-10 md:px-12" id="faq">
          <div className="mx-auto max-w-3xl">
            <h2 data-scroll-section className="font-serif text-3xl font-semibold text-arc-charcoal">
              Common questions
            </h2>
            <dl className="mt-8 space-y-4">
              {treatment.faqs.map((faq) => (
                <div
                  key={faq.id}
                  data-scroll-section
                  className="rounded-2xl border border-arc-teal/12 bg-white p-6"
                >
                  <dt className="font-sans font-semibold text-arc-charcoal">{faq.question}</dt>
                  <dd className="mt-2 font-sans text-sm leading-relaxed text-arc-charcoal/75">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-10 sm:px-10">
        <Link
          href="/treatments"
          className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-arc-teal-ink hover:text-arc-teal-ink-hover"
        >
          ← All treatments
        </Link>
      </section>

      <InvestCTASection
        imageSrc={images.investBanner}
        supportingLine={homeInvestSupport}
      />
    </>
  );
}
