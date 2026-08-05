"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Phone, Sparkles, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { ArcFaqSection } from "@/components/arc/ArcFaqSection";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { InvestCTASection } from "@/components/arc/InvestCTASection";
import {
  ARC_ABOUT_COMPACT_BODY_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import {
  ServiceCreamPlate,
  ServiceDarkPlate,
  ServiceEmblemIcon,
  ServiceWave,
  ServiceWaveInset,
  SERVICE_WAVE_H_CLASS,
  SERVICE_WAVE_H_VAR_CLASS,
  SERVICE_WAVE_MT_CLASS,
  serviceAboveCrestBottomMaskStyle,
} from "@/components/arc/servicePlate";
import { homeInvestSupport } from "@/content/homepage";
import { programsPage } from "@/content/pages/programs";
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

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V"] as const;

const EMPHASIS_HERO_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.9] tracking-tight text-arc-teal-ink",
  // Single word on mobile; full phrase from md up.
  "text-[clamp(5.5rem,22vw,7.5rem)] md:text-[clamp(5.5rem,9vw,8rem)] lg:text-[clamp(6.75rem,8vw,9.25rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

const EMPHASIS_SECTION_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-arc-teal-ink",
  "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
  "[text-shadow:0_1px_2px_rgba(255,255,255,0.5)]",
);

const EMPHASIS_DARK_SECTION_CLASS = cn(
  "inline-block font-title-emphasis font-normal not-italic leading-[0.95] tracking-tight text-[#d9b878]",
  "text-[clamp(3.25rem,9vw,5.25rem)] md:text-[clamp(3.5rem,6.5vw,5.5rem)]",
  "[-webkit-text-stroke:0.04em_color-mix(in_srgb,currentColor_45%,transparent)]",
  "[text-shadow:0_2px_18px_rgba(0,0,0,0.4),0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent),-0.02em_0_0_color-mix(in_srgb,currentColor_30%,transparent)]",
);

const DARK_BODY_CLASS =
  "font-sans text-base leading-relaxed sm:text-lg [color:rgba(247,241,232,0.82)]";

export function ProgramsPageContent() {
  const {
    hero,
    memberships,
    membershipsIntro,
    choice,
    why,
    faqs,
    terms,
  } = programsPage;
  const creamPlateSrc = serviceSharedCreamPlate.src;
  const darkPlateSrc = serviceSharedDarkPlate.src;
  const router = useRouter();
  const [callTier, setCallTier] = useState<string | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!callTier) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCallTier(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [callTier]);

  const onMembershipCardActivate = (
    e: MouseEvent<HTMLButtonElement>,
    tierName: string,
  ) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      router.push("/contact");
      return;
    }
    setCallTier(tierName);
  };

  return (
    <>
      {/* Hero — shorter than Financing: title-only, multi-word phrase. */}
      <div
        className={cn(
          "relative z-20 flex min-h-[min(42dvh,22rem)] flex-col sm:min-h-[min(52dvh,28rem)] md:min-h-[min(64dvh,36rem)] lg:min-h-[min(68dvh,40rem)]",
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
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-arc-champagne/50 via-arc-champagne/18 to-transparent sm:h-36" />
        </div>

        <section
          id="programs-hero"
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
              <h1
                className="leading-[0.9] tracking-tight"
                aria-label={`${hero.title} ${hero.titleEmphasis}`}
              >
                <TitleEmphasis className={EMPHASIS_HERO_CLASS}>
                  {hero.title}
                  <span className="hidden md:inline"> {hero.titleEmphasis}</span>
                </TitleEmphasis>
              </h1>
            </ArcTextReveal>
          </div>
        </section>

        <ServiceWave tone="pearl" className="mt-auto" />
      </div>

      {/* Choose membership — sticky left, cards right */}
      <div
        className={cn(
          "relative z-10 overflow-x-clip",
          SERVICE_WAVE_MT_CLASS,
          SERVICE_WAVE_H_VAR_CLASS,
        )}
      >
        <ServiceCreamPlate src={creamPlateSrc} />
        <ServiceWaveInset />

        <section
          id="memberships"
          className="relative z-10 px-6 pb-14 pt-16 sm:px-10 sm:pb-16 sm:pt-20 md:px-12 md:pb-20 md:pt-24"
        >
          <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
            <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
              <header className="mb-10 min-w-0 text-center lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:self-start lg:pt-2 lg:text-left xl:top-32">
                <ArcTextReveal variant="heading">
                  <h2 className="leading-[0.92] tracking-tight">
                    <TitleEmphasis className={EMPHASIS_SECTION_CLASS}>
                      {membershipsIntro.title}
                    </TitleEmphasis>
                  </h2>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={1}>
                  <p
                    className={cn(
                      "mx-auto mt-6 max-w-xl sm:mt-8 lg:mx-0",
                      ARC_ABOUT_COMPACT_BODY_CLASS,
                    )}
                  >
                    {hero.detail}
                  </p>
                </ArcTextReveal>
                <ArcTextReveal variant="body" delayIndex={2}>
                  <p className="mt-8 hidden items-center gap-2 lg:mt-10 lg:flex">
                    <Sparkles
                      className="size-4 shrink-0 text-[#c9a05a]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="font-serif text-base italic text-arc-charcoal/70">
                      {membershipsIntro.closing}
                    </span>
                  </p>
                </ArcTextReveal>
              </header>

              <div className="min-w-0">
                <ul className="flex flex-col gap-5 sm:gap-6">
                  {memberships.map((tier, idx) => (
                    <li key={tier.id}>
                      <ArcTextReveal variant="body" delayIndex={idx + 1}>
                        <button
                          type="button"
                          onClick={(e) => onMembershipCardActivate(e, tier.name)}
                          aria-label={`Speak with us to know more about the ${tier.name} program.`}
                          className={cn(
                            "group grid w-full grid-cols-1 items-center gap-5 rounded-[1.5rem] border border-[#c9a05a]/55 bg-white/75 p-5 text-left sm:grid-cols-[auto_1fr] sm:gap-6 sm:rounded-[1.75rem] sm:p-6 md:p-7",
                            "shadow-[0_16px_48px_rgba(44,44,44,0.06)] ring-1 ring-[#c9a05a]/20",
                            "transition-[background-color,box-shadow,transform,border-color,color] duration-500 ease-out",
                            "hover:-translate-y-0.5 hover:border-arc-teal-ink hover:bg-arc-teal-ink hover:shadow-[0_22px_56px_rgba(69,136,114,0.35)] hover:ring-arc-teal/40",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream",
                          )}
                        >
                          <div className="flex justify-center sm:justify-start">
                            <ServiceEmblemIcon
                              src={tier.iconSrc}
                              plate
                              className="h-20 w-20 transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24"
                            />
                          </div>

                          <div className="min-w-0 text-center sm:text-left">
                            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-baseline sm:gap-0">
                              <h3 className="shrink-0 font-serif text-[clamp(1.65rem,4vw,2.15rem)] font-semibold tracking-tight text-arc-charcoal transition-colors duration-500 group-hover:text-white">
                                {tier.name}
                              </h3>
                              <span
                                aria-hidden
                                className="mx-3 hidden min-w-[2.5rem] flex-1 border-b border-dotted border-[#c9a05a]/70 transition-colors duration-500 group-hover:border-white/45 sm:block"
                              />
                              <span className="inline-flex items-center rounded-full bg-arc-teal-ink px-4 py-1.5 font-sans text-sm font-semibold tracking-wide text-white transition-colors duration-500 group-hover:bg-white group-hover:text-arc-teal-ink sm:text-base">
                                {tier.price}
                                <span className="ml-1 text-[0.7em] font-medium opacity-80">
                                  {tier.pricePeriod}
                                </span>
                              </span>
                            </div>

                            <p
                              className={cn(
                                "mt-3 transition-colors duration-500 group-hover:text-white/85",
                                ARC_ABOUT_COMPACT_BODY_CLASS,
                              )}
                            >
                              {tier.tagline}
                            </p>

                            <p className="mt-5 font-title-emphasis text-[clamp(1.65rem,4vw,2.25rem)] font-semibold leading-none tracking-tight text-[#c9a05a] transition-colors duration-500 group-hover:text-[#e8d4a8]">
                              Plus:
                            </p>
                            <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-arc-charcoal/45 transition-colors duration-500 group-hover:text-white/55">
                              Your membership includes
                            </p>
                            <ul className="mt-2.5 space-y-1.5">
                              {tier.includes.map((perk) => (
                                <li
                                  key={perk}
                                  className="flex items-start justify-center gap-2 font-sans text-sm leading-snug text-arc-charcoal/75 transition-colors duration-500 group-hover:text-white/85 sm:justify-start sm:text-[0.9375rem]"
                                >
                                  <Check
                                    className="mt-0.5 size-3.5 shrink-0 text-[#c9a05a] transition-colors duration-500 group-hover:text-[#e8d4a8]"
                                    strokeWidth={2.25}
                                    aria-hidden
                                  />
                                  <span>{perk}</span>
                                </li>
                              ))}
                            </ul>

                            <p className="mt-4 font-sans text-sm leading-snug text-arc-charcoal/65 transition-colors duration-500 group-hover:text-white/80 sm:text-[0.9375rem]">
                              <span className="font-semibold text-arc-teal-ink transition-colors duration-500 group-hover:text-white">
                                Ideal for:{" "}
                              </span>
                              {tier.idealFor}
                            </p>

                            <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-teal-ink transition-colors duration-500 group-hover:text-white sm:text-[0.8125rem]">
                              <span className="lg:hidden">
                                Speak with us to know more about this program
                              </span>
                              <span className="hidden lg:inline">
                                Speak with us to know more about this program →
                              </span>
                            </p>
                          </div>
                        </button>
                      </ArcTextReveal>
                    </li>
                  ))}
                </ul>

                <ArcTextReveal variant="body" delayIndex={4}>
                  <p className="mt-8 flex flex-col items-center gap-2 text-center lg:hidden">
                    <Sparkles
                      className="size-4 text-[#c9a05a]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="font-serif text-base italic text-arc-charcoal/70 sm:text-lg">
                      {membershipsIntro.closing}
                    </span>
                  </p>
                </ArcTextReveal>
              </div>
            </div>
          </div>
        </section>

        <ServiceWave tone="pearl" />
      </div>

      {/* Dark acts: Your Choice + Why Become a Member */}
      <div className="relative z-[1] isolate">
        {/* Your Membership. Your Choice. */}
        <div
          className={cn(
            "relative z-[9] overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceDarkPlate src={darkPlateSrc} />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

          <section
            id="membership-choice"
            className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
          >
            <div
              className={cn(
                "relative z-10 mx-auto max-w-5xl text-center",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <ArcTextReveal variant="heading">
                <h2 className="leading-[0.92] tracking-tight">
                  <TitleEmphasis className={EMPHASIS_DARK_SECTION_CLASS}>
                    {choice.title} {choice.titleEmphasis}
                  </TitleEmphasis>
                </h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={1}>
                <p className={cn("mx-auto mt-6 max-w-4xl", DARK_BODY_CLASS)}>
                  {choice.body}
                </p>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={2}>
                <p className={cn("mx-auto mt-4 max-w-4xl", DARK_BODY_CLASS)}>
                  {choice.closing}
                </p>
              </ArcTextReveal>
            </div>
          </section>

          <ServiceWave />
        </div>

        {/* Why Become an Arc Wellness Member? */}
        <div
          className={cn(
            "relative z-[8] overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceDarkPlate src={darkPlateSrc} />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

          <section
            id="why-member"
            className="relative z-10 px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-14 md:px-12 md:pb-24 md:pt-16"
          >
            <div className={cn("relative z-10 mx-auto w-full", ARC_PAGE_RAIL_MAX)}>
              <div className="min-w-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] xl:gap-16">
                <header className="mb-10 min-w-0 text-center lg:sticky lg:top-28 lg:mb-0 lg:max-w-[38rem] lg:self-start lg:pt-2 lg:text-left xl:top-32">
                  <ArcTextReveal variant="heading">
                    <h2 className="leading-[0.92] tracking-tight">
                      <TitleEmphasis className={EMPHASIS_DARK_SECTION_CLASS}>
                        {why.title} {why.titleEmphasis}
                      </TitleEmphasis>
                    </h2>
                  </ArcTextReveal>
                </header>

                <ul className="min-w-0 border-t border-[#d9b878]/25">
                  {why.items.map((item, idx) => (
                    <li
                      key={item.title}
                      className="border-b border-[#d9b878]/25"
                    >
                      <div className="grid grid-cols-1 gap-4 py-7 sm:grid-cols-[minmax(4.5rem,6.5rem)_1fr] sm:gap-8 sm:py-8">
                        <p
                          className="font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-normal leading-[0.82] tracking-tight text-[#d9b878]"
                          aria-hidden
                        >
                          {ROMAN_NUMERALS[idx] ?? String(idx + 1)}
                        </p>
                        <div className="min-w-0">
                          <h3 className="font-serif text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-[#d9b878]">
                            {item.title}
                          </h3>
                          <p className={cn("mt-2.5", DARK_BODY_CLASS)}>
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <ServiceWave tone="pearl" />
        </div>
      </div>

      {/* FAQ + terms — tiled cream plate (same as service-page FAQ).
          z-0 so the dark act’s pearl crest sits above the cream pull-up. */}
      <div className="relative z-0 isolate">
        <div
          className={cn(
            "relative z-0 overflow-x-clip",
            SERVICE_WAVE_MT_CLASS,
            SERVICE_WAVE_H_VAR_CLASS,
          )}
        >
          <ServiceCreamPlate src={creamPlateSrc} maskBottom={false} tileMedia />
          <div className={cn("relative z-10", SERVICE_WAVE_H_CLASS)} aria-hidden />

          <div className="relative z-10">
            <ArcFaqSection
              id="membership-faq"
              className="border-t-0 bg-transparent pb-0"
              categories={{ membership: "Memberships" }}
              faqByCategory={{ membership: faqs }}
              emphasisHeading
            />
            <div
              className={cn(
                "relative z-10 mx-auto px-6 pb-14 sm:px-10 sm:pb-16 md:px-12 md:pb-20",
                ARC_PAGE_RAIL_MAX,
              )}
            >
              <p className="mx-auto max-w-3xl text-center font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal/45">
                {terms.title}
              </p>
              <p className="mx-auto mt-3 max-w-3xl text-center font-sans text-sm leading-relaxed text-arc-charcoal/55">
                {terms.body}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className={ARC_HOME_TESTIMONIALS_BOTTOM_SEAM_SOFT_CLASS}
          />
        </div>
      </div>

      <InvestCTASection
        imageSrc={images.heroMedia}
        supportingLine={homeInvestSupport}
        topSeam
        topSeamOverlap={false}
        topSeamClassName={ARC_HOME_INVEST_TOP_SEAM_SOFT_CLASS}
      />

      {portalReady && callTier
        ? createPortal(
            <div
              className="fixed inset-0 z-[300] flex items-end justify-center bg-arc-charcoal/50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-[2px] sm:items-center"
              role="presentation"
              onClick={() => setCallTier(null)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="membership-call-title"
                className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-[#c9a05a]/40 bg-arc-cream shadow-[0_28px_80px_rgba(44,44,44,0.28)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setCallTier(null)}
                  className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full text-arc-charcoal/55 transition-colors hover:bg-arc-charcoal/8 hover:text-arc-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45"
                  aria-label="Close"
                >
                  <X className="size-5" strokeWidth={1.75} />
                </button>

                <div className="px-6 pb-6 pt-8 text-center sm:px-8 sm:pb-8 sm:pt-10">
                  <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-arc-teal-ink/70">
                    Speak with us
                  </p>
                  <h2
                    id="membership-call-title"
                    className="mt-3 font-serif text-[clamp(1.75rem,6vw,2.25rem)] font-semibold tracking-tight text-arc-charcoal"
                  >
                    Learn more about {callTier}
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-arc-charcoal/70 sm:text-base">
                    Call Arc Wellness and our team will help you choose the
                    membership that fits your goals.
                  </p>
                  <p className="mt-5 font-serif text-xl tracking-tight text-arc-teal-ink sm:text-2xl">
                    {siteMeta.phone}
                  </p>

                  <div className="mt-7 flex flex-col gap-3">
                    <a
                      href={`tel:${siteMeta.phoneTel}`}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-arc-teal-ink px-6 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-arc-teal-ink-hover"
                    >
                      <Phone className="size-4" strokeWidth={2} aria-hidden />
                      Call now
                    </a>
                    <button
                      type="button"
                      onClick={() => setCallTier(null)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-arc-charcoal/15 bg-white/70 px-6 font-sans text-sm font-semibold tracking-tight text-arc-charcoal/70 transition-colors hover:border-arc-charcoal/25 hover:text-arc-charcoal"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
