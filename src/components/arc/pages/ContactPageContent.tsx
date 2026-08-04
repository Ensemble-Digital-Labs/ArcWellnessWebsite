"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ArcWindowFrame } from "@/components/arc/ArcWindowFrame";
import {
  ARC_ABOUT_COMPACT_BODY_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { ContactForm } from "@/components/pages/ContactForm";
import {
  ServiceCreamPlate,
  ServiceDarkPlate,
  ServiceWave,
  ServiceWaveInset,
  SERVICE_WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
  serviceAboveCrestBottomMaskStyle,
} from "@/components/arc/servicePlate";
import { contactPage } from "@/content/pages/contact";
import {
  serviceSharedCreamPlate,
  serviceSharedDarkPlate,
} from "@/content/pages/serviceTemplate";
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

              <ArcTextReveal variant="body" delayIndex={3}>
                <ArcWindowFrame
                  bordered
                  archFacing="right"
                  archDepth={36}
                  baseRadius={16}
                  className={cn(
                    "mx-auto mt-10 w-full max-w-md bg-white lg:mx-0 lg:max-w-lg",
                    "shadow-[0_20px_56px_rgba(44,44,44,0.10)] ring-1 ring-arc-teal/15",
                  )}
                >
                  <ul className="relative z-10 divide-y divide-arc-charcoal/10 py-2 pl-1 pr-[clamp(2.5rem,14%,3.75rem)] sm:py-3">
                    <li>
                      <a
                        href={`tel:${siteMeta.phoneTel}`}
                        className={cn(
                          "group flex items-start gap-4 px-4 py-4 transition-colors sm:gap-5 sm:px-5 sm:py-5",
                          "hover:bg-arc-teal/10 focus-visible:bg-arc-teal/10 focus-visible:outline-none",
                        )}
                      >
                        <span
                          className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-arc-teal/15 text-arc-teal-ink ring-1 ring-arc-teal/25 sm:size-11"
                          aria-hidden
                        >
                          <Phone className="size-4 sm:size-[1.125rem]" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-arc-charcoal/45">
                            Phone
                          </span>
                          <span className="mt-1 block font-sans text-base font-medium tracking-tight text-arc-charcoal transition-colors group-hover:text-arc-teal-ink sm:text-lg">
                            {siteMeta.phone}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${siteMeta.email}`}
                        className={cn(
                          "group flex items-start gap-4 px-4 py-4 transition-colors sm:gap-5 sm:px-5 sm:py-5",
                          "hover:bg-arc-teal/10 focus-visible:bg-arc-teal/10 focus-visible:outline-none",
                        )}
                      >
                        <span
                          className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-arc-teal/15 text-arc-teal-ink ring-1 ring-arc-teal/25 sm:size-11"
                          aria-hidden
                        >
                          <Mail className="size-4 sm:size-[1.125rem]" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-arc-charcoal/45">
                            Email
                          </span>
                          <span className="mt-1 block break-all font-sans text-base font-medium tracking-tight text-arc-charcoal transition-colors group-hover:text-arc-teal-ink sm:text-lg">
                            {siteMeta.email}
                          </span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={siteMeta.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "group flex items-start gap-4 px-4 py-4 transition-colors sm:gap-5 sm:px-5 sm:py-5",
                          "hover:bg-arc-teal/10 focus-visible:bg-arc-teal/10 focus-visible:outline-none",
                        )}
                      >
                        <span
                          className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-arc-teal/15 text-arc-teal-ink ring-1 ring-arc-teal/25 sm:size-11"
                          aria-hidden
                        >
                          <MapPin className="size-4 sm:size-[1.125rem]" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0 flex-1 text-left">
                          <span className="block font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-arc-charcoal/45">
                            Address
                          </span>
                          <span className="mt-1 block font-sans text-base font-medium leading-snug tracking-tight text-arc-charcoal transition-colors group-hover:text-arc-teal-ink sm:text-lg">
                            {siteMeta.address.line1}
                            <br />
                            {siteMeta.address.line2}
                          </span>
                        </span>
                      </a>
                    </li>
                  </ul>
                </ArcWindowFrame>
              </ArcTextReveal>
            </div>

            <ArcWindowFrame
              bordered
              archDepth={14}
              baseRadius={16}
              className={cn(
                "w-full bg-white",
                "shadow-[0_24px_64px_rgba(44,44,44,0.12),0_10px_32px_rgba(131,208,187,0.14)]",
                "ring-1 ring-arc-teal/20",
              )}
            >
              <div
                className={cn(
                  "relative z-10 flex flex-col items-center px-[clamp(1.65rem,6.5vw,3.5rem)] text-center",
                  "pb-[clamp(2rem,7.5vw,4.5rem)] pt-[clamp(3.25rem,9%,5rem)]",
                  "sm:px-[clamp(1.85rem,6vw,3.25rem)] sm:pb-[clamp(2.25rem,7vw,4.25rem)]",
                  "md:px-[clamp(2rem,5.5vw,3.75rem)] md:pb-[clamp(2.5rem,6.5vw,4.75rem)]",
                )}
              >
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
              </div>
            </ArcWindowFrame>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* Visit us — dark plate + Google Map; click opens Maps at the clinic. */}
      <div
        className={cn(
          "relative z-[9] overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceDarkPlate src={serviceSharedDarkPlate.src} maskBottom={false} />
        <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

        <section
          id="visit"
          className="relative z-10 scroll-mt-32 px-6 pb-16 pt-8 sm:scroll-mt-40 sm:px-10 sm:pb-20 sm:pt-10 md:scroll-mt-44 md:px-12 md:pb-24 lg:scroll-mt-52"
        >
          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-start lg:flex-row lg:items-start lg:gap-14">
            <header className="mb-10 shrink-0 text-center lg:sticky lg:top-48 lg:mb-0 lg:w-[38%] lg:max-w-sm lg:pt-4 lg:text-left xl:top-52">
              <ArcTextReveal variant="heading">
                <h2 className="leading-[0.92] tracking-tight">
                  <span
                    className={cn(
                      "font-title-emphasis inline-block tracking-tight text-[#d9b878]",
                      "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
                      "[text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
                    )}
                    style={{
                      fontSize: "clamp(4.5rem, 14vw, 7.5rem)",
                      fontSizeAdjust: "none",
                    }}
                  >
                    Visit us
                  </span>
                </h2>
              </ArcTextReveal>
            </header>

            <div className="relative mx-auto min-w-0 w-full flex-1 lg:mx-0 lg:pt-2">
              <a
                href={siteMeta.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/20 sm:rounded-3xl",
                  "shadow-[0_24px_64px_rgba(0,0,0,0.35)]",
                  "ring-1 ring-[#d9b878]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9b878]",
                )}
                aria-label={`Open Google Maps for ${siteMeta.address.line1}, ${siteMeta.address.line2}`}
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/3]">
                  <iframe
                    title="Arc Wellness clinic location"
                    src={siteMeta.mapsEmbedUrl}
                    className="pointer-events-none absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal shadow-md opacity-90 transition-opacity group-hover:opacity-100 sm:text-sm">
                    Open in Maps
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
