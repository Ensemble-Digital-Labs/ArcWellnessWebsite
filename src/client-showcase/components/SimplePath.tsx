import Image from "next/image";
import Link from "next/link";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";
import { PATH_SECTION_INTRO_BACKGROUND_SRC } from "@/content/backgroundDecoration";
import { showcaseInternalHref, showcasePathSteps } from "@/client-showcase/content";

function PathHeadline() {
  return (
    <>
      Your Path to{" "}
      <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>Feeling</TitleEmphasis>{" "}
      and{" "}
      <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>Living</TitleEmphasis> at Your{" "}
      <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>Best</TitleEmphasis>
    </>
  );
}

export function SimplePath() {
  return (
    <section id="path" className="scroll-mt-28 border-t border-arc-charcoal/10">
      <div className="relative overflow-hidden bg-arc-teal-muted py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-35" aria-hidden>
          <Image
            src={PATH_SECTION_INTRO_BACKGROUND_SRC}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="relative z-[1] mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-semibold leading-snug text-arc-charcoal sm:text-3xl md:text-[2.1rem]">
            <PathHeadline />
          </h2>
          <Link
            href={showcaseInternalHref("/#book")}
            className="mt-6 inline-flex font-sans text-sm font-semibold text-arc-teal-ink underline-offset-4 hover:underline"
          >
            Start your journey
          </Link>
        </div>
      </div>

      <div className="bg-arc-cream py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-20 lg:px-8">
          {showcasePathSteps.map((step) => (
            <article
              key={step.title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${step.contentOnLeft ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
                <Image src={step.imageSrc} alt={step.imageAlt} fill className="object-cover object-center" sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-arc-charcoal/55">{step.stepMeta}</p>
                <p className="mt-2 font-serif text-sm font-medium text-arc-teal-ink">{step.numeral}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">{step.title}</h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-arc-charcoal/85">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
