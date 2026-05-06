import Image from "next/image";
import Link from "next/link";
import { PinnedSection } from "@/components/arc/PinnedSection";

type WhoWeAreSectionProps = {
  imageSrc: string;
};

export function WhoWeAreSection({ imageSrc }: WhoWeAreSectionProps) {
  return (
    <PinnedSection
      id="about"
      className="flex min-h-[100dvh] flex-col justify-center bg-arc-cream px-6 py-20 md:flex-row md:items-center md:gap-16 md:px-12 lg:mx-auto lg:max-w-7xl lg:px-8"
    >
      <div data-scroll-section className="mb-12 flex-1 md:mb-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-arc-teal-ink">
            Who we are
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-arc-teal/60" aria-hidden />
        </div>
        <h2 className="mb-8 font-serif text-3xl font-semibold leading-tight text-arc-charcoal md:text-4xl lg:text-[2.75rem]">
          Care That&apos;s Intentional. Results That Last.
        </h2>
        <div className="space-y-5 font-sans text-sm leading-relaxed text-arc-charcoal/90 md:text-base">
          <p>
            ARC Wellness brings together aesthetics, wellness, and longevity under one roof—so
            you can feel confident in your skin and supported in your health for the long term.
          </p>
          <p>
            Our team combines evidence-informed treatments with a calm, elevated experience.
            Every plan is tailored to your goals, pace, and lifestyle.
          </p>
          <p>
            Whether you&apos;re focused on prevention, restoration, or refinement, we&apos;re here
            to guide you with clarity and care.
          </p>
        </div>
        <Link
          href="#book"
          className="mt-10 inline-block bg-arc-teal px-8 py-3 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-[0_1px_2px_rgba(0,0,0,0.22),0_12px_32px_-8px_rgba(78,196,176,0.5)] transition-[color,background-color,box-shadow] hover:bg-arc-teal-hover hover:shadow-[0_1px_2px_rgba(0,0,0,0.25),0_14px_36px_-8px_rgba(54,157,136,0.45)]"
        >
          Book Your Consultation
        </Link>
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
