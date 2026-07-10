"use client";

import { useState } from "react";
import {
  Activity,
  Check,
  ClipboardList,
  Gem,
  Grid3X3,
  Layers,
  RefreshCw,
  Scan,
  ShieldCheck,
  Sparkles,
  Target,
  Waves,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FALLBACKS = {
  stimulate: Gem,
  rebuild: Grid3X3,
  renew: Waves,
  refine: Check,
  dualEnergy: Zap,
  fibroblasts: Activity,
  precise: Target,
  safe: ShieldCheck,
  consultation: Sparkles,
  plan: ClipboardList,
  treatment: Scan,
  results: Layers,
  maintain: RefreshCw,
} as const;

type IconKey = keyof typeof FALLBACKS;

type ExionIconProps = {
  name: IconKey;
  src: string;
  className?: string;
  label: string;
  /** Hero §1 uses plain gold line icons without circle frame. */
  variant?: "framed" | "plain";
};

/** Uses custom SVG when present in mock icons folder; falls back to lucide (never both). */
export function ExionIcon({ name, src, className, label, variant = "framed" }: ExionIconProps) {
  const Fallback = FALLBACKS[name];
  const [useFallback, setUseFallback] = useState(false);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center text-arc-champagne",
        variant === "framed" &&
          "size-11 rounded-full border border-arc-champagne/50 bg-arc-champagne/[0.06]",
        variant === "plain" && "size-16 sm:size-[4rem]",
        className,
      )}
      aria-hidden
    >
      {useFallback ? (
        <Fallback className="size-[58%]" strokeWidth={1.35} />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          className="size-full object-contain"
          onError={() => setUseFallback(true)}
        />
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}
