import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const linkFocusRing =
  "inline-flex max-w-full rounded-none outline-none transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 active:opacity-[0.92] motion-reduce:transition-none";

const clusterRow =
  "group inline-flex items-center gap-0.5 [-webkit-tap-highlight-color:transparent] sm:gap-px";

const shellTransition = cn(
  "border border-white/[0.11] bg-[#262626]/97 backdrop-blur-[6px]",
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_-6px_rgba(0,0,0,0.45)]",
  "transition-[background-color,border-color,box-shadow,color,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
  "motion-reduce:transition-none",
);

const pillBase = cn(
  "rounded-full px-7 py-[0.65rem] font-sans text-[0.8125rem] font-medium leading-none tracking-[0.08em] sm:px-8 sm:text-sm",
  shellTransition,
);

const discBase = cn(
  "relative z-[1] flex size-[2.75rem] shrink-0 -translate-x-px items-center justify-center rounded-full sm:size-[2.875rem]",
  shellTransition,
);

type ArcSplitCtaProps = {
  href: string;
  children: ReactNode;
  emphasis?: "primary" | "secondary";
  className?: string;
};

/**
 * Split pill + icon disc — **quiet** interactions: no scale games, no icon spins.
 * Hover deepens the graphite surface, lifts shadow slightly, and softens the accent (ARC teal / cream).
 */
export function ArcSplitCta({
  href,
  children,
  emphasis = "primary",
  className,
}: ArcSplitCtaProps) {
  const accent = cn(
    emphasis === "primary"
      ? "text-arc-teal/85 group-hover:text-arc-teal"
      : "text-arc-cream/88 group-hover:text-arc-cream",
    "transition-[color,text-shadow] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
  );

  const hoverShell = cn(
    "group-hover:border-white/[0.16] group-hover:bg-[#2d2d2d]/98",
    emphasis === "primary" &&
      "group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.075),0_8px_32px_-8px_rgba(0,0,0,0.5),0_0_28px_-8px_rgba(78,196,176,0.18)]",
    emphasis === "secondary" &&
      "group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.075),0_8px_32px_-8px_rgba(0,0,0,0.5),0_0_24px_-10px_rgba(247,244,239,0.08)]",
  );

  return (
    <Link href={href} className={cn(linkFocusRing, className)}>
      <span className={clusterRow}>
        <span className={cn(pillBase, accent, hoverShell)}>{children}</span>
        <span className={cn(discBase, accent, hoverShell)} aria-hidden>
          <ArrowUpRight
            className="size-[1.05rem] opacity-[0.88] transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 motion-reduce:transition-none sm:size-[1.15rem]"
            strokeWidth={1.65}
          />
        </span>
      </span>
    </Link>
  );
}
