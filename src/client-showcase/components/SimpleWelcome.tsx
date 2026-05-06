import Image from "next/image";
import Link from "next/link";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";

type SimpleWelcomeProps = {
  id?: string;
  imageSrc: string;
  headline: string;
  headlineEmphasisWord: string;
  paragraph1: string;
  paragraph2: string;
  proofLead: string;
  proofRest: string;
  ctaHref: string;
  ctaLabel: string;
};

export function SimpleWelcome({
  id = "about",
  imageSrc,
  headline,
  headlineEmphasisWord,
  paragraph1,
  paragraph2,
  proofLead,
  proofRest,
  ctaHref,
  ctaLabel,
}: SimpleWelcomeProps) {
  const parts = headline.split(headlineEmphasisWord);
  const hasSplit = parts.length > 1;

  return (
    <section id={id} className="scroll-mt-28 border-t border-arc-charcoal/10 bg-arc-cream py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg lg:order-none">
          <Image src={imageSrc} alt="" fill className="object-cover object-center" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold leading-snug text-arc-charcoal sm:text-3xl md:text-[2.25rem]">
            {hasSplit ? (
              <>
                {parts[0]}
                <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{headlineEmphasisWord}</TitleEmphasis>
                {parts.slice(1).join(headlineEmphasisWord)}
              </>
            ) : (
              headline
            )}
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-arc-charcoal/85">{paragraph1}</p>
          <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/85">{paragraph2}</p>
          <p className="mt-6 font-sans text-sm font-medium text-arc-charcoal">
            <span className="text-arc-teal-ink">{proofLead}</span> {proofRest}
          </p>
          <Link
            href={ctaHref}
            className="mt-8 inline-flex rounded-full border border-arc-charcoal/20 bg-white px-5 py-2.5 font-sans text-sm font-semibold text-arc-charcoal shadow-sm transition-colors hover:border-arc-teal/40 hover:text-arc-teal-ink"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
