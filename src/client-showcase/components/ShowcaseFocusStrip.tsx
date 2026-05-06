import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Activity, Brain, Moon, Scale, Sparkles } from "lucide-react";
import { CLIENT_SHOWCASE_BASE } from "@/client-showcase/content";

type FocusItem = {
  label: string;
  Icon: LucideIcon;
};

const ITEMS: FocusItem[] = [
  { label: "Energy & burnout", Icon: Activity },
  { label: "Hormones & metabolism", Icon: Scale },
  { label: "Sleep & recovery", Icon: Moon },
  { label: "Skin & body changes", Icon: Sparkles },
  { label: "Focus & cognition", Icon: Brain },
];

export function ShowcaseFocusStrip() {
  return (
    <section className="border-b border-arc-charcoal/10 bg-white py-8 sm:py-10" aria-label="Areas we address">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-5 md:gap-x-8">
          {ITEMS.map(({ label, Icon }) => (
            <li key={label}>
              <Link
                href={`${CLIENT_SHOWCASE_BASE}#concerns`}
                className="group flex flex-col items-center gap-2 text-center sm:min-w-[5.5rem]"
              >
                <span className="flex size-14 items-center justify-center rounded-full border border-arc-charcoal/10 bg-arc-cream/80 text-arc-teal-ink shadow-sm transition-colors group-hover:border-arc-teal/35 group-hover:bg-arc-teal-muted/50 sm:size-16">
                  <Icon className="size-6 opacity-90 sm:size-7" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="max-w-[9rem] font-sans text-[11px] font-medium leading-snug text-arc-charcoal/80 sm:max-w-none sm:text-xs">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
