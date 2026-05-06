import Image from "next/image";
import {
  ARC_HEADLINE_TITLE_EMPHASIS_CLASS,
  TitleEmphasis,
} from "@/components/arc/TitleEmphasis";

type Panel = { title: string; imageSrc: string };

type SimpleFounderProps = {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  headlineEmphasisWord: string;
  headlineEmphasisWord2: string;
  heroMeetLead: string;
  heroNameItalic: string;
  roleTitle: string;
  intro: string;
  deliverablesHeading: string;
  deliverables: readonly string[];
  accordionPanels: readonly Panel[];
};

export function SimpleFounder({
  id = "founder",
  imageSrc,
  imageAlt,
  headlineEmphasisWord,
  headlineEmphasisWord2,
  heroMeetLead,
  heroNameItalic,
  roleTitle,
  intro,
  deliverablesHeading,
  deliverables,
  accordionPanels,
}: SimpleFounderProps) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-arc-charcoal/10 bg-arc-cream-deep/40 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-2xl shadow-lg lg:mx-0">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover object-top" sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-arc-charcoal/55">{heroMeetLead}</p>
            <p className="font-serif text-3xl italic text-arc-charcoal sm:text-4xl">{heroNameItalic}</p>
            <p className="mt-1 font-sans text-sm font-medium text-arc-charcoal/70">{roleTitle}</p>

            <h2 className="mt-8 font-serif text-2xl font-semibold text-arc-charcoal sm:text-3xl">
              <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{headlineEmphasisWord}</TitleEmphasis>{" "}
              <TitleEmphasis className={ARC_HEADLINE_TITLE_EMPHASIS_CLASS}>{headlineEmphasisWord2}</TitleEmphasis>
            </h2>

            <p className="mt-5 font-sans text-base leading-relaxed text-arc-charcoal/85">{intro}</p>

            <h3 className="mt-10 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-arc-charcoal/55">
              {deliverablesHeading}
            </h3>
            <ul className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-arc-charcoal/85 sm:text-base">
              {deliverables.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-arc-teal" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {accordionPanels.map((panel) => (
                <figure key={panel.title} className="overflow-hidden rounded-xl border border-arc-charcoal/10 bg-white shadow-sm">
                  <div className="relative aspect-square w-full">
                    <Image src={panel.imageSrc} alt={panel.title} fill className="object-cover object-center" sizes="(min-width: 1024px) 15vw, 33vw" />
                  </div>
                  <figcaption className="px-2 py-2 text-center font-sans text-[11px] font-medium uppercase tracking-wide text-arc-charcoal/70 sm:text-xs">
                    {panel.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
