import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";

type SimpleMicroStatementProps = {
  posterSrc: string;
  headlineBefore: string;
  headlineEmphasis: ReactNode;
  headlineAfter: ReactNode;
  uspLine: string;
  linkHref: string;
  linkLabel: string;
};

export function SimpleMicroStatement({
  posterSrc,
  headlineBefore,
  headlineEmphasis,
  headlineAfter,
  uspLine,
  linkHref,
  linkLabel,
}: SimpleMicroStatementProps) {
  return (
    <section className="relative overflow-hidden bg-arc-charcoal text-[#f7f4ef]" aria-labelledby="showcase-micro-heading">
      <div className="relative aspect-[21/9] min-h-[200px] w-full sm:aspect-[24/9] sm:min-h-[240px] md:min-h-[280px]">
        <Image src={posterSrc} alt="" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-arc-charcoal via-arc-charcoal/55 to-arc-charcoal/25" />
      </div>
      <div className="relative z-[1] mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2
          id="showcase-micro-heading"
          className="font-serif text-2xl font-semibold leading-snug sm:text-3xl md:text-[2.1rem]"
        >
          {headlineBefore}{" "}
          <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{headlineEmphasis}</TitleEmphasis>
          {headlineAfter}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/85 sm:text-base">{uspLine}</p>
        <Link
          href={linkHref}
          className="mt-8 inline-flex font-sans text-sm font-semibold text-arc-teal underline-offset-4 hover:text-white hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
