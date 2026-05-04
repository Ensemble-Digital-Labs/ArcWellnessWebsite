import Image from "next/image";
import { Check } from "lucide-react";
import { PinnedSection } from "@/components/arc/PinnedSection";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { cn } from "@/lib/utils";

type ArcFounderIntroSectionProps = {
  id?: string;
  className?: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow: string;
  headline: string;
  headlineEmphasisWord: string;
  roleTitle: string;
  intro: string;
  deliverablesHeading: string;
  deliverables: readonly string[];
};

/**
 * Physician-founder introduction — portrait + role line + intro + “what he delivers” checklist.
 * Matches welcome split rhythm; cream panel so it alternates with white welcome band.
 */
export function ArcFounderIntroSection({
  id,
  className,
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  headlineEmphasisWord,
  roleTitle,
  intro,
  deliverablesHeading,
  deliverables,
}: ArcFounderIntroSectionProps) {
  const emphasisIdx = headline.indexOf(headlineEmphasisWord);
  const hasEmphasis =
    headlineEmphasisWord.length > 0 && emphasisIdx !== -1;
  const before = hasEmphasis
    ? headline.slice(0, emphasisIdx).trimEnd()
    : headline.trimEnd();
  const after = hasEmphasis
    ? headline.slice(emphasisIdx + headlineEmphasisWord.length).trimStart()
    : "";

  return (
    <PinnedSection
      id={id}
      className={cn(
        "flex min-h-[100dvh] flex-col justify-center bg-arc-cream px-6 py-20 md:flex-row md:items-center md:gap-14 md:px-12 lg:mx-auto lg:max-w-7xl lg:gap-20 lg:px-8",
        className,
      )}
    >
      <div
        data-scroll-section
        className="relative order-2 mb-12 aspect-[4/5] w-full overflow-hidden md:order-1 md:mb-0 md:max-w-md md:flex-1 lg:max-w-lg"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-top"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>

      <div data-scroll-section className="order-1 flex-1 md:order-2 md:max-w-xl lg:max-w-lg">
        <div className="mb-5 flex items-center gap-3 md:mb-6">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-arc-teal">
            {eyebrow}
          </span>
          <span className="h-px flex-1 max-w-[120px] bg-arc-teal/60" aria-hidden />
        </div>

        <h2 className="mb-2 font-serif text-3xl font-semibold leading-tight tracking-tight text-arc-charcoal md:text-4xl lg:text-[2.5rem]">
          {hasEmphasis ? (
            <>
              {before}
              {before ? " " : null}
              <TitleEmphasis className="text-[1.06em] text-arc-teal md:text-[1.04em]">
                {headlineEmphasisWord}
              </TitleEmphasis>
              {after ? <> {after}</> : null}
            </>
          ) : (
            headline
          )}
        </h2>

        <p className="mb-6 font-sans text-sm font-medium uppercase tracking-[0.18em] text-arc-charcoal/70 md:mb-8 md:text-xs">
          {roleTitle}
        </p>

        <p className="mb-8 font-sans text-sm leading-relaxed text-arc-charcoal/90 md:mb-10 md:text-base">
          {intro}
        </p>

        <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-arc-charcoal/80">
          {deliverablesHeading}
        </p>
        <ul className="space-y-3.5">
          {deliverables.map((line) => (
            <li key={line} className="flex gap-3 text-left">
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-arc-teal/15 text-arc-teal"
                aria-hidden
              >
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <span className="font-sans text-sm leading-snug text-arc-charcoal/90 md:text-[0.95rem]">
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PinnedSection>
  );
}
