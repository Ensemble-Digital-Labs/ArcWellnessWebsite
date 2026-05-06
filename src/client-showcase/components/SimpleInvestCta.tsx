import Image from "next/image";
import Link from "next/link";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { arcGlassCtaClass } from "@/lib/arcGlassCta";
import { cn } from "@/lib/utils";

type SimpleInvestCtaProps = {
  imageSrc: string;
  supportingLine?: string;
};

const investHeadlineEmphasisClass = cn(
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  "text-[1.62em] sm:text-[1.7em] md:text-[1.78em] lg:text-[1.86em] xl:text-[1.92em]",
);

const investMemberSolidClass = cn(
  "inline-flex items-center justify-center gap-2 rounded-full",
  "border border-white/20 bg-[#bc6c5c] px-6 py-3",
  "font-sans text-sm font-medium text-white sm:text-[0.9375rem]",
  "shadow-[0_8px_28px_rgba(0,0,0,0.22)]",
  "transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:border-white/30 hover:bg-[#a85d52] hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/45",
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
);

const investReserveGlassClass = cn(
  arcGlassCtaClass,
  "font-sans text-sm font-medium normal-case tracking-normal sm:text-[0.9375rem]",
);

export function SimpleInvestCta({ imageSrc, supportingLine }: SimpleInvestCtaProps) {
  return (
    <section id="book" className="scroll-mt-28 border-t border-arc-charcoal/10">
      <div className="relative flex min-h-[70dvh] items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[75dvh]">
        <Image src={imageSrc} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-arc-charcoal/45" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2
            className={cn(
              "font-serif text-3xl font-semibold leading-snug text-[#f7f4ef] drop-shadow md:text-4xl lg:text-5xl",
              supportingLine ? "mb-6 md:mb-7" : "mb-10 md:mb-12",
            )}
          >
            Invest in <TitleEmphasis className={investHeadlineEmphasisClass}>You</TitleEmphasis>.{" "}
            <TitleEmphasis className={investHeadlineEmphasisClass}>Live</TitleEmphasis> Fully.{" "}
            <TitleEmphasis className={investHeadlineEmphasisClass}>Age</TitleEmphasis> Intentionally.
          </h2>
          {supportingLine ? (
            <p className="mx-auto mb-10 max-w-2xl font-sans text-sm leading-relaxed text-[#f7f4ef]/88 md:mb-12 md:text-base">
              {supportingLine}
            </p>
          ) : null}
          <div className="mx-auto flex w-full max-w-lg flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link href="#contact" className={cn(investReserveGlassClass, "w-full sm:w-auto")}>
              Reserve a call
            </Link>
            <Link href="#contact" className={cn(investMemberSolidClass, "w-full sm:w-auto")}>
              <span>Become a member</span>
              <span aria-hidden className="text-base leading-none">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
