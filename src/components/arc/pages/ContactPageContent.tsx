"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcTibbixelCopyFrame } from "@/components/arc/ArcTibbixelCopyFrame";
import {
  ARC_ABOUT_COMPACT_BODY_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { ContactForm } from "@/components/pages/ContactForm";
import {
  ServiceCreamPlate,
  ServiceWave,
  ServiceWaveInset,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
  serviceAboveCrestBottomMaskStyle,
} from "@/components/arc/servicePlate";
import { contactPage } from "@/content/pages/contact";
import { liveSiteFaqs } from "@/content/pages/shared";
import { serviceSharedCreamPlate } from "@/content/pages/serviceTemplate";
import { images } from "@/content/site";
import { siteMeta } from "@/content/siteMeta";
import { ARC_GALLERY_CLEAR_BELOW_LOGO, ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { cn } from "@/lib/utils";

export function ContactPageContent() {
  const { hero, closing } = contactPage;
  const creamPlateSrc = serviceSharedCreamPlate.src;

  return (
    <>
      {/* Hero — Arc360 crest physics: masked silk plate + pearl wave inside one shell
          so Reach out can tuck under with no hard seam / white gap. */}
      <div
        className={cn(
          "relative z-20 flex min-h-[min(58dvh,30rem)] flex-col sm:min-h-[min(64dvh,34rem)] md:min-h-[min(68dvh,38rem)]",
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-arc-cream"
          style={serviceAboveCrestBottomMaskStyle}
          aria-hidden
        >
          <Image
            src={images.aboutHeroMedia}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[78%_center] md:object-center"
          />
          {/* Warm lip into the cream plate so the crest doesn’t flash a flat seam. */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-arc-champagne/50 via-arc-champagne/18 to-transparent sm:h-36" />
        </div>

        <section
          id="contact-hero"
          className={cn(
            "relative z-10 flex flex-1 flex-col justify-center py-10 sm:py-12 md:py-14",
            ARC_GALLERY_CLEAR_BELOW_LOGO,
          )}
        >
          <div
            className={cn(
              "mx-auto flex w-full flex-col items-center px-6 text-center sm:px-10 md:px-12",
              ARC_PAGE_RAIL_MAX,
            )}
          >
            <ArcTextReveal variant="heading" trigger="mount">
              <h1 className="leading-[0.92] tracking-tight">
                <TitleEmphasis
                  className={cn(
                    "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
                    "text-[clamp(6.5rem,28vw,9.5rem)] md:text-[clamp(5.25rem,13vw,9.75rem)]",
                    "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
                  )}
                >
                  {hero.title}
                </TitleEmphasis>{" "}
                <TitleEmphasis
                  className={cn(
                    "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
                    "text-[clamp(6.5rem,28vw,9.5rem)] md:text-[clamp(5.25rem,13vw,9.75rem)]",
                    "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
                  )}
                >
                  {hero.titleEmphasis}
                </TitleEmphasis>
              </h1>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" className="mt-auto" />
      </div>

      {/* Reach out — cream plate tucked under the pearl crest (no top gap). */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} />
        <ServiceWaveInset />

        <section className="relative z-10 px-6 pb-16 pt-16 sm:px-10 sm:pb-20 sm:pt-20 md:px-12 md:pt-24">
          <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="text-center lg:text-left">
              <ArcTextReveal variant="heading">
                <h2 className="leading-[0.92] tracking-tight">
                  <TitleEmphasis
                    className={cn(
                      "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
                      "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
                      "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
                    )}
                  >
                    Reach out your way
                  </TitleEmphasis>
                </h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className={cn("mx-auto mt-4 max-w-xl lg:mx-0", ARC_ABOUT_COMPACT_BODY_CLASS)}>
                  {hero.body}
                </p>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={2}>
                <blockquote className="mx-auto mt-8 max-w-xl border-l-0 pl-0 lg:mx-0 lg:border-l-2 lg:border-arc-teal-ink/50 lg:pl-5">
                  <p className={ARC_ABOUT_COMPACT_BODY_CLASS}>{closing.quote}</p>
                  <p className="mt-2 font-sans text-sm text-arc-charcoal/65">
                    {closing.line}
                  </p>
                </blockquote>
              </ArcTextReveal>
              <ul className="mx-auto mt-10 flex w-full max-w-sm flex-col items-center space-y-8 text-center lg:max-w-none">
                <li className="flex w-full flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <Phone className="size-6 shrink-0 text-arc-teal-ink sm:size-7" aria-hidden />
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-arc-teal-ink sm:text-sm">
                      Phone
                    </p>
                  </div>
                  <ArcTextReveal variant="line" delayIndex={3} className="min-w-0">
                    <a
                      href={`tel:${siteMeta.phoneTel}`}
                      className="font-serif text-2xl font-semibold tracking-tight text-arc-charcoal transition-colors hover:text-arc-teal-ink sm:text-3xl md:text-[2rem]"
                    >
                      {siteMeta.phone}
                    </a>
                  </ArcTextReveal>
                </li>
                <li className="flex w-full flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <Mail className="size-6 shrink-0 text-arc-teal-ink sm:size-7" aria-hidden />
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-arc-teal-ink sm:text-sm">
                      Email
                    </p>
                  </div>
                  <ArcTextReveal variant="line" delayIndex={4} className="min-w-0">
                    <a
                      href={`mailto:${siteMeta.email}`}
                      className="break-all font-serif text-xl font-semibold tracking-tight text-arc-charcoal transition-colors hover:text-arc-teal-ink sm:text-2xl md:text-[1.75rem]"
                    >
                      {siteMeta.email}
                    </a>
                  </ArcTextReveal>
                </li>
                <li className="flex w-full flex-col items-center gap-2">
                  <div className="flex items-center justify-center gap-3">
                    <MapPin className="size-6 shrink-0 text-arc-teal-ink sm:size-7" aria-hidden />
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-arc-teal-ink sm:text-sm">
                      Address
                    </p>
                  </div>
                  <ArcTextReveal variant="line" delayIndex={5} className="min-w-0">
                    <p className="max-w-xs font-serif text-lg font-semibold leading-snug tracking-tight text-arc-charcoal sm:max-w-sm sm:text-xl md:text-[1.35rem]">
                      {siteMeta.address.line1}
                      <br />
                      {siteMeta.address.line2}
                    </p>
                  </ArcTextReveal>
                </li>
              </ul>
            </div>

            <div
              className={cn(
                "overflow-hidden rounded-2xl border border-arc-charcoal/10 bg-white sm:rounded-3xl",
                "shadow-[0_24px_64px_rgba(44,44,44,0.12),0_10px_32px_rgba(131,208,187,0.14)]",
                "ring-1 ring-arc-teal/20",
              )}
            >
              <ArcTibbixelCopyFrame>
                <ArcTextReveal variant="heading">
                  <h3 className="leading-[0.92] tracking-tight">
                    <TitleEmphasis
                      className={cn(
                        "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
                        "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
                        "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
                      )}
                    >
                      Send a message
                    </TitleEmphasis>
                  </h3>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p className="mt-2 font-sans text-sm text-arc-charcoal/65">
                    Every note is read by our care team.
                  </p>
                </ArcTextReveal>
                <div className="mt-6 w-full text-left">
                  <ContactForm />
                </div>
              </ArcTibbixelCopyFrame>
            </div>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* FAQ — tiled cream plate (same soft-blend repeats as Every pathway) */}
      <div
        className={cn(
          "relative z-[9] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} maskBottom={false} tileMedia />
        <ServiceWaveInset />

        <div className="relative z-10">
          <ArcFaqSection
            id="faq"
            className="border-t-0 bg-transparent"
            categories={{ general: "Getting started" }}
            faqByCategory={{ general: liveSiteFaqs }}
          />
        </div>
      </div>
    </>
  );
}
