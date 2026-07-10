"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { ArcMarketingChapterHero } from "@/components/arc/ArcMarketingChapterHero";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcSectionSeamBlend } from "@/components/arc/ArcSectionSeamBlend";
import { ArcTibbixelCopyFrame } from "@/components/arc/ArcTibbixelCopyFrame";
import { ContactForm } from "@/components/pages/ContactForm";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { contactPage } from "@/content/pages/contact";
import { liveSiteFaqs } from "@/content/pages/shared";
import { homeInvestSupport } from "@/content/homepage";
import { CONTACT_HERO_CANVAS_TILES } from "@/content/marketingHeroCanvas";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";
import { ARC_SECTION_SEAM_OVERLAP_SM_CLASS } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

export function ContactPageContent() {
  const { hero, closing } = contactPage;

  return (
    <>
      <ArcMarketingChapterHero
        id="contact-hero"
        headline={hero.title}
        headlineEmphasis={hero.titleEmphasis}
        heroCanvasTiles={CONTACT_HERO_CANVAS_TILES}
        bottomSeam
      />

      <section
        className={cn(
          "relative bg-arc-cream px-6 py-16 sm:px-10 sm:py-20 md:px-12",
          ARC_SECTION_SEAM_OVERLAP_SM_CLASS,
        )}
      >
        <ArcSectionSeamBlend edge="top" tone="cream" variant="soft" scope="background" />
        <ArcSectionSeamBlend edge="bottom" tone="cream" variant="soft" scope="background" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div data-scroll-section>
            <h2 className="font-serif text-3xl font-semibold text-arc-charcoal sm:text-4xl">Reach out your way</h2>
            <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-arc-charcoal/88 sm:text-lg">
              {hero.body}
            </p>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-5 shrink-0 text-arc-charcoal" aria-hidden />
                <div>
                  <p className="font-sans text-sm font-semibold text-arc-charcoal">Phone</p>
                  <a href={`tel:${siteMeta.phoneTel}`} className="mt-1 block font-sans text-arc-charcoal">
                    {siteMeta.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-5 shrink-0 text-arc-charcoal" aria-hidden />
                <div>
                  <p className="font-sans text-sm font-semibold text-arc-charcoal">Email</p>
                  <a href={`mailto:${siteMeta.email}`} className="mt-1 block font-sans text-arc-charcoal">
                    {siteMeta.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-5 shrink-0 text-arc-charcoal" aria-hidden />
                <div>
                  <p className="font-sans text-sm font-semibold text-arc-charcoal">Address</p>
                  <p className="mt-1 font-sans text-sm text-arc-charcoal/75">
                    {siteMeta.address.line1}
                    <br />
                    {siteMeta.address.line2}
                  </p>
                </div>
              </li>
            </ul>
            <blockquote className="mt-10 border-l-2 border-arc-teal-ink/50 pl-5">
              <p className="font-serif text-xl italic text-arc-charcoal">{closing.quote}</p>
              <p className="mt-2 font-sans text-sm text-arc-charcoal/65">{closing.line}</p>
            </blockquote>
          </div>

          <div
            data-scroll-section
            className={cn(
              "overflow-hidden rounded-2xl border border-arc-charcoal/10 bg-white sm:rounded-3xl",
              "shadow-[0_24px_64px_rgba(44,44,44,0.12),0_10px_32px_rgba(131,208,187,0.14)]",
              "ring-1 ring-arc-teal/20",
            )}
          >
            <ArcTibbixelCopyFrame>
              <h3 className="font-serif text-2xl font-semibold text-arc-charcoal">Send a message</h3>
              <p className="mt-2 font-sans text-sm text-arc-charcoal/65">Every note is read by our care team.</p>
              <div className="mt-6 w-full text-left">
                <ContactForm />
              </div>
            </ArcTibbixelCopyFrame>
          </div>
        </div>
      </section>

      <ArcFaqSection
        id="faq"
        categories={{ general: "Getting started" }}
        faqByCategory={{ general: liveSiteFaqs }}
        topSeam
        bottomSeam
      />

      <InvestCTASection imageSrc={images.heroMedia} supportingLine={homeInvestSupport} topSeam />
    </>
  );
}
