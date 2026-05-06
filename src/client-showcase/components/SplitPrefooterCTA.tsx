import Image from "next/image";
import Link from "next/link";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";

type SplitPrefooterCTAProps = {
  imageSrc: string;
};

const emphasis = "font-title-emphasis text-[1.38em] tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.35)] sm:text-[1.48em]";

export function SplitPrefooterCTA({ imageSrc }: SplitPrefooterCTAProps) {
  return (
    <section id="book" className="scroll-mt-36 border-t border-arc-charcoal/10">
      <div className="relative grid min-h-[320px] md:min-h-[380px] md:grid-cols-2">
        <div
          className="flex flex-col items-start justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          style={{ backgroundColor: showcaseDesign.forest }}
        >
          <h2 className="max-w-lg font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-snug text-white">
            Invest in <TitleEmphasis className={emphasis}>You</TitleEmphasis>.{" "}
            <TitleEmphasis className={emphasis}>Live</TitleEmphasis> Fully.{" "}
            <TitleEmphasis className={emphasis}>Age</TitleEmphasis> Intentionally.
          </h2>
        </div>
        <div className="relative min-h-[240px] md:min-h-full">
          <Image src={imageSrc} alt="" fill className="object-cover object-center" sizes="(min-width: 768px) 50vw, 100vw" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Link
            href={showcaseInternalHref("/#contact")}
            className="pointer-events-auto rounded-md px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-arc-charcoal shadow-lg transition-colors hover:opacity-95 sm:text-sm"
            style={{ backgroundColor: showcaseDesign.sage }}
          >
            Book now
          </Link>
        </div>
      </div>
    </section>
  );
}
