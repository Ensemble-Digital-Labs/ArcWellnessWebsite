import Image from "next/image";
import Link from "next/link";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { cn } from "@/lib/utils";

type InvestCTASectionProps = {
  imageSrc: string;
  /** One supporting line under the headline (concentrated CTA band). */
  supportingLine?: string;
};

export function InvestCTASection({ imageSrc, supportingLine }: InvestCTASectionProps) {
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
        <h2
          className={cn(
            "font-serif text-3xl font-semibold leading-snug text-[#f7f4ef] drop-shadow md:text-4xl lg:text-5xl",
            supportingLine ? "mb-6 md:mb-7" : "mb-10 md:mb-12",
          )}
        >
          Invest in You. Live Fully. Age Intentionally.
        </h2>
        {supportingLine ? (
          <p className="mx-auto mb-10 max-w-2xl font-sans text-sm leading-relaxed text-[#f7f4ef]/88 md:mb-12 md:text-base">
            {supportingLine}
          </p>
        ) : null}
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
