"use client";

import Image from "next/image";
import Link from "next/link";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { PinnedSection } from "@/components/arc/PinnedSection";

type WhoWeAreSectionProps = {
  imageSrc: string;
};

const BODY_PARAGRAPHS = [
  "ARC Wellness brings together aesthetics, wellness, and longevity under one roof, so you can feel confident in your skin and supported in your health for the long term.",
  "Our team combines evidence-informed treatments with a calm, elevated experience. Every plan is tailored to your goals, pace, and lifestyle.",
  "Whether you're focused on prevention, restoration, or refinement, we're here to guide you with clarity and care.",
] as const;

export function WhoWeAreSection({ imageSrc }: WhoWeAreSectionProps) {
  return (
    <PinnedSection
      id="about"
      className="flex min-h-[100dvh] flex-col justify-center bg-arc-cream px-6 py-20 md:flex-row md:items-center md:gap-16 md:px-12 lg:mx-auto lg:max-w-7xl lg:px-8"
    >
      <div className="mb-12 flex-1 md:mb-0">
        <ArcTextReveal variant="heading">
          <h2 className="mb-8 font-serif text-3xl font-semibold leading-tight text-arc-charcoal md:text-4xl lg:text-[2.75rem]">
            Care That&apos;s Intentional. Results That Last.
          </h2>
        </ArcTextReveal>
        <div className="space-y-5 font-sans text-sm leading-relaxed text-arc-charcoal/90 md:text-base">
          {BODY_PARAGRAPHS.map((paragraph, index) => (
            <ArcTextReveal key={paragraph.slice(0, 48)} variant="body" delayIndex={index + 1}>
              <p>{paragraph}</p>
            </ArcTextReveal>
          ))}
        </div>
        <ArcTextReveal variant="body" delayIndex={BODY_PARAGRAPHS.length + 1}>
          <Link
            href="#book"
            className="mt-10 inline-block bg-arc-teal px-8 py-3 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-[0_1px_2px_rgba(0,0,0,0.22),0_12px_32px_-8px_rgba(131,208,187,0.5)] transition-[color,background-color,box-shadow] hover:bg-arc-teal-hover hover:shadow-[0_1px_2px_rgba(0,0,0,0.25),0_14px_36px_-8px_rgba(107,184,163,0.45)]"
          >
            Book Your Consultation
          </Link>
        </ArcTextReveal>
      </div>
      <div
        data-scroll-section
        className="relative aspect-[4/5] w-full flex-1 overflow-hidden md:max-w-md lg:max-w-lg"
      >
        <Image
          src={imageSrc}
          alt="Consultation at ARC Wellness"
          fill
          className="object-cover"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>
    </PinnedSection>
  );
}
