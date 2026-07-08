"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { NavLeaf } from "@/content/navigation";
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
import { ARC_TREATMENT_NAV_LINKS } from "@/lib/arcMarketingNav";
import { cn } from "@/lib/utils";

const NAV_PREVIEW = {
  facialAesthetic: "/assets/sections/whole-body/facial-aesthetic-treatment.webp",
  membershipCohort: "/assets/sections/who-we-are/biometric-consultation-room.webp",
} as const;

const navTreatmentPreviewVariants = {
  initial: { scale: 0.72, rotate: "-8deg", opacity: 0 },
  hover: {
    scale: 1,
    rotate: "6deg",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 340, damping: 22 },
  },
};

const thumbByHref = Object.fromEntries(
  ARC_TREATMENT_NAV_LINKS.map((t) => [t.href, t.thumbSrc]),
) as Record<string, string>;

const thumbByLabel = Object.fromEntries(
  ARC_TREATMENT_NAV_LINKS.map((t) => [t.label.toLowerCase(), t.thumbSrc]),
) as Record<string, string>;

/** Thumbs for new-menu labels / routes that differ from treatment nav names. */
const thumbByHrefExtra: Record<string, string> = {
  "/treatments": NAV_PREVIEW.facialAesthetic,
  "/programs": NAV_PREVIEW.membershipCohort,
  "/financing": CLINIC_INTERIOR_IMAGES.consultationLounge,
  "/contact": CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
  "/case-studies": CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
  "/about": CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall,
};

const thumbByLabelAlias: Record<string, string> = {
  infusions: thumbByLabel["nutrient therapy"],
  peptides: thumbByLabel["peptide therapy"],
  fillers: thumbByLabel["rha fillers"],
  "book a consultation": CLINIC_INTERIOR_IMAGES.consultationLounge,
  "membership options": NAV_PREVIEW.membershipCohort,
  "pricing & financing": CLINIC_INTERIOR_IMAGES.consultationLounge,
  "contact your care team": CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
  "latest insights": CLINIC_INTERIOR_IMAGES.hallwayAccentSeating,
  "payment methods accepted": CLINIC_INTERIOR_IMAGES.consultationLounge,
  "hsa / fsa information": CLINIC_INTERIOR_IMAGES.consultationLounge,
  "how financing works": CLINIC_INTERIOR_IMAGES.consultationLounge,
  "contact our team": CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts,
  "the arc method": NAV_PREVIEW.facialAesthetic,
};

const DEFAULT_SUBLINK_THUMB = CLINIC_INTERIOR_IMAGES.consultationLounge;

export function resolveNavLeafThumb(leaf: NavLeaf): string | undefined {
  if (!leaf.href || leaf.comingSoon || leaf.future) return undefined;

  if (thumbByHref[leaf.href]) return thumbByHref[leaf.href];
  if (thumbByHrefExtra[leaf.href]) return thumbByHrefExtra[leaf.href];

  const key = leaf.label.toLowerCase();
  return thumbByLabelAlias[key] ?? thumbByLabel[key] ?? DEFAULT_SUBLINK_THUMB;
}

type ArcNavDrawerSubLinkRowProps = {
  leaf: NavLeaf;
  closeMenu: () => void;
  reducedMotion: boolean;
  canHover: boolean;
  thumbSrc?: string;
  /** Passed when rendered inside an accordion panel (kept for call-site clarity). */
  inAccordion?: boolean;
};

/** Animated sub-link row — matches the previous treatment drawer links (circular hover preview). */
export function ArcNavDrawerSubLinkRow({
  leaf,
  closeMenu,
  reducedMotion,
  canHover,
  thumbSrc: thumbSrcProp,
  inAccordion = false,
}: ArcNavDrawerSubLinkRowProps) {
  const disabled = !leaf.href || leaf.comingSoon || leaf.future;
  const badge = leaf.future ? "Future" : leaf.comingSoon ? "Soon" : null;
  const thumbSrc = thumbSrcProp ?? (leaf.href ? resolveNavLeafThumb(leaf) : undefined);

  if (disabled) {
    return (
      <span className="relative flex min-h-[56px] w-full items-center justify-between gap-3 rounded-lg py-2 pl-2 pr-2 font-sans text-[0.9375rem] text-arc-charcoal/45 sm:min-h-[64px]">
        <span className="min-w-0 flex-1 font-medium leading-snug">{leaf.label}</span>
        {badge ? (
          <span className="shrink-0 text-[0.62rem] font-bold uppercase tracking-[0.08em]">{badge}</span>
        ) : null}
      </span>
    );
  }

  const href = leaf.href!;
  const external = bookingLinkExternalProps(href);
  const thumb = thumbSrc ?? DEFAULT_SUBLINK_THUMB;

  return (
    <AnimatedThumbLinkRow
      href={href}
      label={leaf.label}
      thumbSrc={thumb}
      closeMenu={closeMenu}
      reducedMotion={reducedMotion}
      canHover={canHover}
      external={external}
    />
  );
}

function AnimatedThumbLinkRow({
  href,
  label,
  thumbSrc,
  closeMenu,
  reducedMotion,
  canHover,
  external,
}: {
  href: string;
  label: string;
  thumbSrc: string;
  closeMenu: () => void;
  reducedMotion: boolean;
  canHover: boolean;
  external: ReturnType<typeof bookingLinkExternalProps>;
}) {
  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 300, damping: 30, mass: 0.5 });
  const previewRotate = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const showFloatingPreview = canHover && !reducedMotion;
  const showInlineThumb = !showFloatingPreview;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!showFloatingPreview) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (canHover && e.pointerType === "touch") setHovered(true);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (canHover && e.pointerType === "touch") handleLeave();
  };

  return (
    <Link
      href={href}
      {...external}
      onClick={closeMenu}
      onMouseEnter={() => showFloatingPreview && setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...(canHover
        ? {
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp,
            onPointerCancel: handlePointerUp,
          }
        : {})}
      className={cn(
        "group relative flex min-h-[56px] w-full touch-manipulation items-center overflow-visible rounded-lg py-2 pl-2 pr-2 font-sans text-[0.9375rem] text-arc-charcoal/72 transition-[color,padding,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/40 sm:min-h-[64px]",
        showInlineThumb && "pl-1",
        showFloatingPreview &&
          "hover:bg-arc-teal-muted/45 hover:pr-[9.25rem] hover:text-arc-teal sm:hover:pr-[10.25rem]",
        showInlineThumb &&
          (hovered
            ? "bg-arc-teal-muted/35 text-arc-teal"
            : "active:bg-arc-teal-muted/35 active:text-arc-teal"),
      )}
    >
      <span className="relative z-10 min-w-0 flex-1 font-medium leading-snug">{label}</span>

      {showFloatingPreview ? (
        <motion.div
          className="pointer-events-none absolute right-1 top-1/2 z-30 size-[9rem] -translate-y-1/2 sm:right-2 sm:size-[10rem]"
          style={{ rotate: previewRotate }}
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          variants={navTreatmentPreviewVariants}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_20px_48px_rgba(0,0,0,0.32)] ring-[3px] ring-white/70">
            <Image
              src={thumbSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 144px, 160px"
              unoptimized
            />
          </div>
        </motion.div>
      ) : null}

      {showInlineThumb ? (
        <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-arc-cream-deep ring-2 ring-arc-charcoal/10 sm:size-16">
          <Image src={thumbSrc} alt="" fill sizes="64px" className="object-cover" unoptimized />
        </span>
      ) : null}
    </Link>
  );
}
