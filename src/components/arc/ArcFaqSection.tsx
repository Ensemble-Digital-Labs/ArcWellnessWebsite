"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type ArcFaqItem = {
  id: string;
  question: string;
  answer: string;
};

type ArcFaqSectionProps = {
  id?: string;
  className?: string;
  categories: Readonly<Record<string, string>>;
  faqByCategory: Readonly<Record<string, readonly ArcFaqItem[]>>;
};

function ArcFaqAccordionRow({
  item,
  reduceMotion,
}: {
  item: ArcFaqItem;
  reduceMotion: boolean | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-arc-teal/12 bg-arc-cream/40 transition-colors">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <span
          className={cn(
            "min-w-0 text-balance font-sans text-sm font-semibold transition-colors sm:text-[0.9375rem]",
            open ? "text-arc-charcoal" : "text-arc-charcoal/85",
          )}
        >
          {item.question}
        </span>
        <motion.span
          animate={open ? "open" : "closed"}
          variants={{
            open: { rotate: 45 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          className="inline-flex shrink-0"
        >
          <Plus
            className={cn(
              "size-5 text-arc-teal-ink",
              open ? "text-arc-teal-ink" : "text-arc-charcoal/45",
            )}
            strokeWidth={2}
            aria-hidden
          />
        </motion.span>
      </button>
      {reduceMotion ? (
        open ? (
          <div className="border-t border-arc-teal/10 px-4 pb-4 pt-0 sm:px-5">
            <p className="font-sans text-sm leading-relaxed text-arc-charcoal/75 sm:text-[0.9375rem]">
              {item.answer}
            </p>
          </div>
        ) : null
      ) : (
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="border-t border-arc-teal/10 px-4 pb-4 pt-3 sm:px-5">
            <p className="font-sans text-sm leading-relaxed text-arc-charcoal/75 sm:text-[0.9375rem]">
              {item.answer}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function ArcFaqSection({
  id = "faq",
  className,
  categories,
  faqByCategory,
}: ArcFaqSectionProps) {
  const reduceMotion = useReducedMotion();
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => categoryKeys[0] ?? "",
  );

  const activeItems = faqByCategory[selectedCategory] ?? [];

  return (
    <section
      id={id}
      className={cn(
        "relative min-h-[100dvh] scroll-mt-32 border-t border-arc-teal/15 bg-arc-cream sm:scroll-mt-40 md:scroll-mt-44 lg:scroll-mt-52",
        className,
      )}
    >
      <div
        data-scroll-section
        className="relative mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-start px-6 pb-16 pt-40 sm:pt-44 md:pt-48 md:px-10 lg:flex-row lg:items-start lg:gap-14 lg:px-12 lg:pb-20 lg:pt-[13rem]"
      >
        <header className="mb-10 shrink-0 text-left lg:sticky lg:top-48 lg:mb-0 lg:w-[38%] lg:max-w-sm lg:pt-4 xl:top-52">
          <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-arc-teal-ink">
            Questions
          </p>
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-arc-charcoal md:text-4xl">
            Frequently asked
          </h2>
          <p className="mt-4 font-sans text-sm leading-relaxed text-arc-charcoal/72 md:text-[0.9375rem]">
            Straight answers about how we work—before you book.
          </p>
        </header>

        <div className="relative min-w-0 flex-1 lg:pt-2">
          <div
            className="pointer-events-none absolute -right-1 top-10 z-0 max-w-[min(100%,100vw-2rem)] select-none overflow-hidden text-right font-serif text-[clamp(1.65rem,7vw,4.25rem)] font-semibold leading-none tracking-tight text-arc-charcoal/[0.06] sm:-right-2 sm:top-12 lg:right-0 lg:top-16"
            aria-hidden
          >
            <span className="whitespace-nowrap">ARC WELLNESS</span>
          </div>

          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {Object.entries(categories).map(([key, label]) => {
                const selected = selectedCategory === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCategory(key)}
                    className={cn(
                      "relative overflow-hidden rounded-full border px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[0.8125rem]",
                      selected
                        ? "border-arc-teal text-white"
                        : "border-arc-teal/25 bg-white/70 text-arc-charcoal/75 hover:border-arc-teal/40 hover:text-arc-charcoal",
                    )}
                  >
                    <span className="relative z-10">{label}</span>
                    {selected ? (
                      <motion.span
                        layoutId="faq-tab-pill"
                        className="absolute inset-0 z-0 bg-gradient-to-r from-arc-teal to-arc-teal-hover"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                        }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border border-arc-teal/15 bg-white/90 p-3 shadow-[0_20px_50px_rgba(44,44,44,0.07)] backdrop-blur-sm sm:p-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedCategory}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  {activeItems.map((item) => (
                    <ArcFaqAccordionRow
                      key={item.id}
                      item={item}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
