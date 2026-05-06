import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { showcaseInternalHref } from "@/client-showcase/content";
import { showcaseDesign } from "@/client-showcase/design-tokens";
import { wholeBodyCards } from "@/client-showcase/mock-page-content";

export function WholeBodyFiveCards() {
  return (
    <section id="services" className="scroll-mt-36 border-t border-arc-charcoal/10 py-16 sm:py-20 lg:py-24" style={{ backgroundColor: showcaseDesign.beige }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center font-serif text-[clamp(1.65rem,3.2vw,2.35rem)] font-semibold leading-snug text-arc-charcoal">
          Whole-Body Care. Inside and Out.
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {wholeBodyCards.map((card) => (
            <article
              key={card.title}
              className={cn(
                "flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md",
                card.highlighted
                  ? "border-transparent ring-2 ring-[#8a9b7e] ring-offset-2 ring-offset-[#f2efe8]"
                  : "border-arc-charcoal/10",
              )}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image src={card.imageSrc} alt="" fill className="object-cover object-center" sizes="(min-width: 1024px) 18vw, 50vw" />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5">
                <div
                  className="mx-auto flex size-12 items-center justify-center rounded-full border-2 bg-white"
                  style={{ borderColor: showcaseDesign.sage }}
                >
                  <card.Icon className="size-5" style={{ color: showcaseDesign.sageOutline }} strokeWidth={1.5} aria-hidden />
                </div>
                <h3 className="mt-4 text-center font-serif text-lg font-semibold leading-snug text-arc-charcoal">{card.title}</h3>
                <ul className="mt-3 space-y-2 font-sans text-xs leading-relaxed text-arc-charcoal/75 sm:text-[13px]">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-arc-charcoal/35" aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-sans text-xs font-semibold leading-snug text-arc-charcoal sm:text-[13px]">{card.summary}</p>
                <Link
                  href={showcaseInternalHref("/#contact")}
                  className="mt-4 inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-arc-charcoal/80 hover:text-arc-charcoal"
                >
                  Learn more
                  <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
