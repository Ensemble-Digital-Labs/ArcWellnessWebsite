import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { showcaseInternalHref, showcasePathSteps } from "@/client-showcase/content";
import { showcaseDesign, showcaseRoseClass } from "@/client-showcase/design-tokens";
import { showcaseBookCtaClass } from "@/client-showcase/showcase-book-cta";
import { PATH_SECTION_INTRO_BACKGROUND_SRC } from "@/content/backgroundDecoration";

/** Lowercase roman for timeline circles (matches reference art). */
const ROMAN_CIRCLE = ["i", "ii", "iii", "iv", "v"] as const;

export function ProcessTimelineDesign() {
  const steps = showcasePathSteps;

  return (
    <section
      id="path"
      className="relative scroll-mt-36 overflow-hidden border-t border-white/10 py-16 sm:py-20 lg:py-28"
      style={{ backgroundColor: showcaseDesign.pillarForest }}
    >
      {/* Soft plate from main site path intro — reads as depth on forest */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-soft-light sm:opacity-[0.28]" aria-hidden>
        <Image
          src={PATH_SECTION_INTRO_BACKGROUND_SRC}
          alt=""
          fill
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" aria-hidden />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h2 className="font-serif text-[clamp(1.65rem,3.4vw,2.65rem)] font-normal leading-[1.15] tracking-[-0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            Your <span className={showcaseRoseClass.bright}>Path</span> to Feeling and Living at Your{" "}
            <span className={showcaseRoseClass.bright}>Best</span>
          </h2>
        </header>

        <ol className="mt-14 space-y-0 sm:mt-16 lg:mt-20">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step.title}
                className={cn(
                  "border-t border-white/[0.09] pt-10 first:border-t-0 first:pt-0",
                  !isLast && "pb-10 sm:pb-12",
                )}
              >
                <div className="flex gap-5 sm:gap-8 lg:gap-12">
                  {/* Timeline rail */}
                  <div className="flex w-11 shrink-0 flex-col items-center sm:w-12">
                    <div
                      className="relative z-[1] flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-arc-rose-gold bg-black/25 font-serif text-[15px] font-normal leading-none text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] sm:size-11 sm:text-base"
                      aria-hidden
                    >
                      {ROMAN_CIRCLE[index]}
                    </div>
                    {!isLast ? (
                      <div
                        className="mt-3 min-h-[3rem] w-px flex-1 bg-gradient-to-b from-arc-rose-gold/75 to-arc-rose-gold/35 sm:mt-4 sm:min-h-[4rem]"
                        aria-hidden
                      />
                    ) : null}
                  </div>

                  {/* Title block + description */}
                  <div className="min-w-0 flex-1 lg:grid lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
                    <div>
                      <h3 className="font-serif text-2xl font-normal tracking-tight text-white sm:text-[1.65rem] lg:text-[1.85rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/48 sm:text-[10px] sm:tracking-[0.24em]">
                        {step.stepMeta}
                      </p>
                    </div>
                    <p className="mt-5 font-sans text-[15px] leading-relaxed text-white/78 lg:mt-0 lg:max-w-xl lg:pt-1 lg:text-base lg:leading-[1.75] xl:max-w-none">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 flex justify-center border-t border-white/10 pt-12 sm:mt-16 sm:pt-14">
          <Link href={showcaseInternalHref("/#book")} className={showcaseBookCtaClass("dark", "px-8 py-3.5")}>
            Start your journey
          </Link>
        </div>
      </div>
    </section>
  );
}
