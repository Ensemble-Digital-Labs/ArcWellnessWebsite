"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TitleEmphasis } from "@/components/arc/TitleEmphasis";
import { ARC_LOCOMOTIVE_READY_EVENT } from "@/lib/locomotive";
import { bindArcEnterOnceProgress } from "@/lib/arcEnterOnceScroll";
import type { TreatmentPage } from "@/content/pages/treatments";
import { cn } from "@/lib/utils";

/** Featured image tabs in the pin row; remaining modalities live under “See more”. */
const FEATURED_TAB_COUNT = 5;

type ArcTreatmentsPinExplorerProps = {
  id?: string;
  title: string;
  subtitle: string;
  treatments: readonly TreatmentPage[];
};

export function ArcTreatmentsPinExplorer({
  id,
  title,
  subtitle,
  treatments,
}: ArcTreatmentsPinExplorerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [seeMoreOpen, setSeeMoreOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const allModalities = treatments.filter((t) => t.slug !== "overview");
  const featuredPanels = allModalities.slice(0, FEATURED_TAB_COUNT);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }
    let dispose: (() => void) | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      if (!section) return;

      dispose = bindArcEnterOnceProgress({
        trigger: section,
        onProgress: setProgress,
        playIfVisibleOnLoad: false,
        scrollStart: "top 85%",
        duration: 1.15,
      });
    };

    const onReady = () => queueMicrotask(setup);
    window.addEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
    if ((window as unknown as { locomotiveScroll?: unknown }).locomotiveScroll) onReady();
    const fallback = window.setTimeout(() => {
      if (!cancelled && dispose === null) setup();
    }, 1800);

    return () => {
      cancelled = true;
      window.removeEventListener(ARC_LOCOMOTIVE_READY_EVENT, onReady as EventListener);
      window.clearTimeout(fallback);
      dispose?.();
    };
  }, [reduceMotion]);

  const p = reduceMotion ? 1 : progress;

  const toggleSeeMore = () => setSeeMoreOpen((open) => !open);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative overflow-hidden bg-arc-charcoal py-20 sm:py-24 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-arc-charcoal/40 via-arc-charcoal/20 to-arc-charcoal/55"
        aria-hidden
      />

      <div
        className="relative z-10 flex flex-col px-4 sm:px-6 md:px-10"
        style={{
          opacity: Math.min(1, 0.72 + p * 0.28),
          transform: `translate3d(0, ${Math.max(0, 28 - p * 28)}px, 0)`,
        }}
      >
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#f7f4ef] sm:text-4xl md:text-[2.5rem]">
            Explore{" "}
            <TitleEmphasis className="text-[1.35em] text-arc-rose-gold sm:text-[1.45em]">
              {title}
            </TitleEmphasis>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-sm text-[#f7f4ef]/78 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-7xl flex-col gap-2 md:mt-8">
          <div
            className={cn(
              "flex gap-2",
              seeMoreOpen
                ? "h-[min(36vh,340px)] md:h-[min(40vh,380px)]"
                : "h-[min(44vh,420px)] sm:h-[min(46vh,460px)] md:h-[min(52vh,520px)]",
              "max-md:-mx-1 max-md:overflow-x-auto max-md:px-1 max-md:pb-1 max-md:snap-x max-md:snap-mandatory",
            )}
          >
            {featuredPanels.map((panel, idx) => {
              const isActive = !seeMoreOpen && idx === activeIndex;
              return (
                <Link
                  key={panel.slug}
                  href={`/treatments/${panel.slug}`}
                  onMouseEnter={() => {
                    setSeeMoreOpen(false);
                    setActiveIndex(idx);
                  }}
                  onFocus={() => {
                    setSeeMoreOpen(false);
                    setActiveIndex(idx);
                  }}
                  className={cn(
                    "group relative min-h-[9.5rem] min-w-0 overflow-hidden transition-[flex,opacity] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/60",
                    "h-full max-md:min-h-[10.5rem] max-md:h-auto max-md:snap-start max-md:flex-none max-md:basis-[44%]",
                    isActive ? "md:flex-[2.6]" : "md:flex-[1]",
                  )}
                >
                  <Image
                    src={panel.imageSrc}
                    alt={panel.imageAlt}
                    fill
                    sizes="(max-width: 768px) 44vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                  <div className="absolute bottom-0 left-0 z-10 p-3 sm:p-4 md:p-5">
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-arc-teal tabular-nums">
                      <span>{String(idx + 1).padStart(2, "0")}</span>
                      <span className="mx-1.5 text-white/35">/</span>
                      <span>{panel.categoryLabel}</span>
                    </p>
                    <p className="mt-1 font-serif text-base font-semibold text-white sm:text-lg md:text-xl">
                      {panel.title}
                    </p>
                  </div>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={toggleSeeMore}
              aria-expanded={seeMoreOpen}
              aria-controls="treatments-see-more-list"
              className={cn(
                "relative flex min-h-[9.5rem] min-w-0 flex-col items-center justify-center gap-2 border border-white/14 bg-white/[0.06] px-3 text-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/50",
                "h-full max-md:min-h-[10.5rem] max-md:h-auto max-md:snap-start max-md:flex-none max-md:basis-[32%]",
                seeMoreOpen
                  ? "border-arc-teal/35 bg-arc-teal/10 md:flex-[0.85]"
                  : "hover:border-white/22 hover:bg-white/[0.09] md:flex-[0.75]",
              )}
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f7f4ef]/65">
                See more
              </span>
              <span className="font-serif text-sm font-medium leading-snug text-[#f7f4ef]/88 sm:text-base">
                All treatments
              </span>
              <ChevronDown
                className={cn(
                  "size-4 text-arc-teal/80 transition-transform duration-200",
                  seeMoreOpen && "rotate-180",
                )}
                strokeWidth={1.75}
                aria-hidden
              />
            </button>
          </div>

          <div
            id="treatments-see-more-list"
            className={cn(
              "overflow-hidden rounded-lg border border-white/10 bg-black/35 backdrop-blur-sm",
              seeMoreOpen ? "visible mt-2 max-h-[min(42vh,22rem)] opacity-100" : "pointer-events-none invisible max-h-0 opacity-0",
              reduceMotion ? "" : "transition-[max-height,opacity] duration-300 ease-out",
            )}
            aria-hidden={!seeMoreOpen}
          >
            <ul
              className={cn(
                "arc-scroll-subtle arc-scroll-subtle-dark grid max-h-[min(42vh,22rem)] grid-cols-1 gap-0 overflow-y-auto overscroll-contain sm:grid-cols-2",
                seeMoreOpen ? "p-1 pr-2" : "p-0",
              )}
            >
              {allModalities.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className={cn(
                      "group flex min-h-[48px] items-center gap-3 rounded-md px-2 py-2 font-sans text-sm text-[#f7f4ef]/92 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/45 sm:px-3",
                      "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-white/10",
                    )}
                    onClick={() => setSeeMoreOpen(false)}
                  >
                    <span
                      className={cn(
                        "relative size-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20 sm:size-10",
                        "[@media(hover:hover)_and_(pointer:fine)]:group-hover:ring-arc-teal/45",
                      )}
                    >
                      <Image
                        src={t.imageSrc}
                        alt=""
                        fill
                        sizes="40px"
                        className={cn(
                          "object-cover transition-transform duration-300",
                          "[@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105",
                        )}
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                      <span className="font-medium leading-snug">{t.title}</span>
                      <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f7f4ef]/45 sm:inline">
                        {t.categoryLabel}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
