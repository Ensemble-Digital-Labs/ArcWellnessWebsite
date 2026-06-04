"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcScrollEditorialSection } from "@/components/arc/ArcScrollEditorialSection";
import { ArcTibbixelCopyFrame } from "@/components/arc/ArcTibbixelCopyFrame";
import { ContactForm } from "@/components/pages/ContactForm";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import { ScrollChapterIntroSection } from "@/components/arc/ScrollChapterIntroSection";
import { contactPage } from "@/content/pages/contact";
import { liveSiteFaqs } from "@/content/pages/shared";
import { homeInvestSupport } from "@/content/homepage";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";

export function ContactPageContent() {
  const { hero, channels, closing } = contactPage;

  return (
    <>
      <ScrollChapterIntroSection
        id="contact-hero"
        headline={`${hero.title} ${hero.titleEmphasis}`}
        body={hero.body}
        imageSrc={images.heroMedia}
        floatingMedia={{
          src: images.heroBg,
          alt: "ARC Wellness exterior at sunset",
        }}
        ctaHref={`tel:${siteMeta.phoneTel}`}
        ctaLabel={`Call ${siteMeta.phone}`}
      />

      <ArcScrollEditorialSection
        id="visit"
        title="St. Louis clinic"
        paragraphs={[
          `${siteMeta.address.line1}, ${siteMeta.address.line2}`,
          siteMeta.hours[0] ?? "",
          channels.find((c) => c.id === "phone")?.body ?? "",
        ]}
        imageSrc={images.heroBg}
        imageAlt="ARC Wellness exterior"
        pinned
        cta={{ href: siteMeta.bookingUrl, label: "Book online" }}
      />

      <section className="bg-arc-teal-muted/25 px-6 py-16 sm:px-10 sm:py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div data-scroll-section>
            <h2 className="font-serif text-3xl font-semibold text-arc-charcoal sm:text-4xl">Reach out your way</h2>
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
            <blockquote className="mt-10 border-l-2 border-arc-rose-gold-ink/50 pl-5">
              <p className="font-serif text-xl italic text-arc-charcoal">{closing.quote}</p>
              <p className="mt-2 font-sans text-sm text-arc-charcoal/65">{closing.line}</p>
            </blockquote>
          </div>

          <div data-scroll-section className="rounded-2xl border border-arc-teal/15 bg-arc-cream shadow-[0_16px_48px_rgba(44,44,44,0.08)]">
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
      />

      <InvestCTASection imageSrc={images.investBanner} supportingLine={homeInvestSupport} />
    </>
  );
}
