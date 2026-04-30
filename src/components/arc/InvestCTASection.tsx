import Image from "next/image";
import Link from "next/link";
import { PinnedSection } from "@/components/arc/PinnedSection";

type InvestCTASectionProps = {
  imageSrc: string;
};

export function InvestCTASection({ imageSrc }: InvestCTASectionProps) {
  return (
    <PinnedSection
      id="book"
      className="relative flex min-h-[100dvh] scroll-mt-28 items-center justify-center"
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-arc-charcoal/45" />
      <div data-scroll-section className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-10 font-serif text-3xl font-semibold leading-snug text-[#f7f4ef] drop-shadow md:text-4xl lg:text-5xl">
          Invest in You. Live Fully. Age Intentionally.
        </h2>
        <Link
          href="#book"
          className="inline-block bg-arc-teal px-10 py-3.5 font-sans text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-arc-teal-hover"
        >
          Book Now
        </Link>
      </div>
    </PinnedSection>
  );
}
