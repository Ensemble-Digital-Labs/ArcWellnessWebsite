"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ExionV2AssetRef } from "@/client-showcase/exion-v2/exion-v2-assets";
import { exionV2ImageAlt, exionV2ImageSrc } from "@/client-showcase/exion-v2/exion-v2-assets";

type ExionAssetImageProps = {
  asset: ExionV2AssetRef;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
};

function ExionAssetPlaceholder({ className, label }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[color-mix(in_srgb,var(--arc-cream-deep)_72%,var(--arc-charcoal)_8%)]",
        className,
      )}
      aria-hidden
    >
      <span className="max-w-[80%] text-center font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-arc-charcoal/38">
        {label ?? "EXION mock asset"}
      </span>
    </div>
  );
}

/** Mock-only image — loads from `/assets/client-showcase/exion-v2/` only. */
export function ExionAssetImage({
  asset,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: ExionAssetImageProps) {
  const [failed, setFailed] = useState(false);
  const src = exionV2ImageSrc(asset);

  if (failed) {
    return (
      <ExionAssetPlaceholder
        className={cn(fill ? "absolute inset-0" : className, "border border-dashed border-arc-charcoal/12")}
        label="Drop asset in mock folder"
      />
    );
  }

  const shared = {
    src,
    alt: exionV2ImageAlt(asset) || "EXION v2 mockup",
    className,
    sizes,
    priority,
    onError: () => setFailed(true),
  };

  if (fill) {
    return <Image {...shared} fill />;
  }

  return <Image {...shared} width={width ?? 800} height={height ?? 600} />;
}

/** Optional overlay PNG from mock overlays folder only. */
export function ExionOverlayImage({
  asset,
  className,
}: {
  asset: ExionV2AssetRef;
  className?: string;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible || !asset.src) return null;

  return (
    <div className={cn("pointer-events-none absolute", className)} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        alt=""
        className="h-full w-full object-cover object-center"
        onError={() => setVisible(false)}
      />
    </div>
  );
}

export { EXION_V2_MOCK } from "@/client-showcase/exion-v2/exion-v2-tokens";
