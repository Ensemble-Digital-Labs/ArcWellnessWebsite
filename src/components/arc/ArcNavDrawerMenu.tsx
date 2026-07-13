"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import {
  ARC_NAV_HOME_ITEM,
  ARC_NAV_TOP_ITEMS,
  type NavColumn,
  type NavLeaf,
  type NavTopItem,
  navItemHasPanel,
} from "@/content/navigation";
import { CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { ArcNavDrawerAccordion } from "@/components/arc/ArcNavDrawerAccordion";
import { ArcNavDrawerSubLinkRow } from "@/components/arc/ArcNavDrawerSubLinkRow";
import { cn } from "@/lib/utils";

const NAV_PREVIEW = {
  facialAesthetic: "/assets/sections/whole-body/facial-aesthetic-treatment.webp",
  membershipCohort: "/assets/sections/who-we-are/biometric-consultation-room.webp",
} as const;

const DRAWER_META: Record<
  string,
  { shape: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"; previewSrc: string }
> = {
  home: { shape: "1", previewSrc: CLINIC_INTERIOR_IMAGES.heroReceptionInterior },
  about: { shape: "1", previewSrc: CLINIC_INTERIOR_IMAGES.receptionBacklitLogoWall },
  services: { shape: "2", previewSrc: NAV_PREVIEW.facialAesthetic },
  conditions: { shape: "3", previewSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceBtlConsoleFacialTreatment },
  "start-here": { shape: "4", previewSrc: CLINIC_INTERIOR_IMAGES.consultationLounge },
  "arc-library": { shape: "5", previewSrc: CLINIC_INTERIOR_IMAGES.hallwayAccentSeating },
  financing: { shape: "6", previewSrc: CLINIC_INTERIOR_IMAGES.consultationLounge },
  shop: { shape: "7", previewSrc: CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay },
  contact: { shape: "8", previewSrc: CLINIC_INTERIOR_IMAGES.lobbyReceptionDeskProducts },
};

const DRAWER_NAV_ITEMS: readonly NavTopItem[] = [ARC_NAV_HOME_ITEM, ...ARC_NAV_TOP_ITEMS];

const TOP_ROW_CLASS =
  "group relative flex w-full min-h-[52px] touch-manipulation items-center justify-between gap-4 overflow-visible border-b py-3 font-serif text-3xl font-semibold tracking-tight transition-colors duration-300 sm:min-h-[56px] sm:py-4 sm:text-4xl";

const DROPDOWN_TOGGLE_ZONE_CLASS =
  "flex min-h-[52px] min-w-[3.25rem] shrink-0 items-center justify-center self-stretch border-l border-arc-charcoal/25 pl-3 pr-1 sm:min-h-[56px] sm:min-w-[3.5rem] sm:pl-4";

function DrawerDropdownCue({ open }: { open: boolean }) {
  return (
    <ChevronDown
      className={cn(
        "size-7 shrink-0 text-arc-teal transition-transform duration-[720ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-8",
        open ? "rotate-0" : "-rotate-90",
      )}
      strokeWidth={1.75}
      aria-hidden
    />
  );
}

function DrawerDropdownToggle({
  open,
  onToggle,
  panelId,
  itemLabel,
}: {
  open: boolean;
  onToggle: () => void;
  panelId: string;
  itemLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={open ? `Collapse ${itemLabel} menu` : `Expand ${itemLabel} menu`}
      className={cn(
        "relative z-20 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/40",
        DROPDOWN_TOGGLE_ZONE_CLASS,
      )}
    >
      <DrawerDropdownCue open={open} />
    </button>
  );
}

const navRowRootVariants = { initial: {}, hover: {} };
const navTitleStagger = {
  initial: {},
  hover: { transition: { staggerChildren: 0.045, delayChildren: 0.06 } },
};
const navTitleLetter = {
  initial: { x: 0 },
  hover: { x: 12, transition: { type: "spring" as const, stiffness: 380, damping: 26 } },
};
const navArrowVariants = {
  initial: { x: "100%", opacity: 0 },
  hover: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};


type DrawerMenuProps = {
  closeMenu: () => void;
  reducedMotion: boolean;
  menuOpen: boolean;
  canHover: boolean;
  registerTopLinkRef?: (index: number, el: HTMLElement | null) => void;
};

function DrawerSubLink({
  leaf,
  closeMenu,
  reducedMotion,
  canHover,
}: {
  leaf: NavLeaf;
  closeMenu: () => void;
  reducedMotion: boolean;
  canHover: boolean;
}) {
  return (
    <ArcNavDrawerSubLinkRow
      leaf={leaf}
      closeMenu={closeMenu}
      reducedMotion={reducedMotion}
      canHover={canHover}
      inAccordion
    />
  );
}

function DrawerExpandable({
  panelId,
  open,
  reducedMotion,
  children,
}: {
  panelId: string;
  open: boolean;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  return (
    <ArcNavDrawerAccordion id={panelId} open={open} reducedMotion={reducedMotion}>
      <div className="space-y-3 pb-3 pt-1 pr-1 sm:pr-2">{children}</div>
    </ArcNavDrawerAccordion>
  );
}

function DrawerGroupHeading({
  children,
  href,
  closeMenu,
}: {
  children: ReactNode;
  href?: string;
  closeMenu?: () => void;
}) {
  const className =
    "block border-b border-arc-charcoal/12 pb-2 pl-2 pt-1 font-serif text-lg font-semibold tracking-tight text-arc-charcoal sm:pl-3 sm:text-xl";

  if (href && closeMenu) {
    return (
      <Link
        href={href}
        onClick={closeMenu}
        className={cn(className, "transition-colors duration-200 hover:text-arc-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/40")}
      >
        {children}
      </Link>
    );
  }

  return <p className={className}>{children}</p>;
}

function DrawerColumnGroups({
  columns,
  closeMenu,
  reducedMotion,
  canHover,
}: {
  columns: readonly NavColumn[];
  closeMenu: () => void;
  reducedMotion: boolean;
  canHover: boolean;
}) {
  return (
    <>
      {columns.map((column, colIndex) =>
        column.groups.map((group, groupIndex) => (
          <div key={`${colIndex}-${groupIndex}`} className="space-y-1">
            {group.heading ? (
              <DrawerGroupHeading
                href={group.headingHref}
                closeMenu={group.headingHref ? closeMenu : undefined}
              >
                {group.heading}
              </DrawerGroupHeading>
            ) : null}
            <ul className="mt-1 space-y-1 py-1 pr-1 sm:pr-2">
              {group.items.map((leaf) => (
                <li key={leaf.label}>
                  <DrawerSubLink
                    leaf={leaf}
                    closeMenu={closeMenu}
                    reducedMotion={reducedMotion}
                    canHover={canHover}
                  />
                </li>
              ))}
            </ul>
          </div>
        )),
      )}
    </>
  );
}

function DrawerTopLinkRow({
  item,
  closeMenu,
  reducedMotion,
  canHover,
  assignRef,
  hideTrailingArrow = false,
  rowIndex = 0,
  className,
}: {
  item: NavTopItem;
  closeMenu: () => void;
  reducedMotion: boolean;
  canHover: boolean;
  assignRef?: (el: HTMLAnchorElement | null) => void;
  hideTrailingArrow?: boolean;
  /** Used to keep hover previews below the fixed Close control on first rows. */
  rowIndex?: number;
  className?: string;
}) {
  const meta = DRAWER_META[item.id] ?? DRAWER_META.about;
  const href = item.href!;
  const showRichMotion = canHover && !reducedMotion;
  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 280, damping: 32, mass: 0.55 });
  const springY = useSpring(py, { stiffness: 280, damping: 32, mass: 0.55 });
  const nearDrawerTop = rowIndex < 2;
  const top = useTransform(springY, [0.5, -0.5], nearDrawerTop ? ["58%", "72%"] : ["38%", "62%"]);
  const left = useTransform(springX, [0.5, -0.5], ["62%", "38%"]);
  const previewYOffset = nearDrawerTop ? "-35%" : "-50%";
  const previewHoverRotate = nearDrawerTop ? "6deg" : "10deg";

  const resetHover = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  return (
    <Link
      ref={assignRef}
      href={href}
      onClick={closeMenu}
      {...(showRichMotion
        ? {
            onPointerEnter: (e: React.PointerEvent<HTMLAnchorElement>) => {
              if (e.pointerType === "touch") return;
              setHovered(true);
            },
            onPointerMove: (e: React.PointerEvent<HTMLAnchorElement>) => {
              if (e.pointerType === "touch") return;
              const rect = e.currentTarget.getBoundingClientRect();
              if (!rect.width || !rect.height) return;
              px.set((e.clientX - rect.left) / rect.width - 0.5);
              py.set((e.clientY - rect.top) / rect.height - 0.5);
            },
            onPointerLeave: (e: React.PointerEvent<HTMLAnchorElement>) => {
              if (e.pointerType === "touch") return;
              resetHover();
            },
          }
        : {})}
      className={cn(
        TOP_ROW_CLASS,
        "border-arc-charcoal/10 text-arc-charcoal",
        showRichMotion && hovered && "border-arc-teal/40 text-arc-teal",
        className,
      )}
    >
      {showRichMotion ? (
        <motion.div
          className={cn(
            "pointer-events-none absolute left-0 top-1/2 z-[1] sm:h-[7rem] sm:w-[9.25rem]",
            nearDrawerTop ? "h-[4.75rem] w-[6.25rem]" : "h-[5.5rem] w-[7.25rem]",
          )}
          style={{ top, left, x: nearDrawerTop ? "-6%" : "-12%", y: previewYOffset }}
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          variants={{
            initial: { scale: 0, rotate: "-14deg", opacity: 0 },
            hover: {
              scale: 1,
              rotate: previewHoverRotate,
              opacity: 1,
              transition: { type: "spring" as const, stiffness: 320, damping: 26 },
            },
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_18px_44px_rgba(0,0,0,0.22)] ring-1 ring-white/35">
            <Image
              src={meta.previewSrc}
              alt=""
              fill
              className="object-cover"
              sizes="180px"
              unoptimized
            />
          </div>
        </motion.div>
      ) : null}

      <span
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 scale-x-0 bg-arc-teal-muted/60 transition-transform duration-300 ease-out",
          showRichMotion && hovered && "scale-x-100",
        )}
        aria-hidden
      />

      {!showRichMotion ? (
        <>
          <span className="relative z-10 min-w-0 flex-1">{item.label}</span>
          {!hideTrailingArrow ? (
            <ArrowRight className="relative z-10 size-7 shrink-0 text-arc-teal sm:size-9" strokeWidth={1.75} />
          ) : null}
        </>
      ) : (
        <motion.div
          className="pointer-events-none relative z-10 flex w-full min-w-0 items-center justify-between gap-4"
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          variants={navRowRootVariants}
        >
          <motion.span className="inline-flex min-w-0 flex-1 flex-wrap items-baseline pr-4" variants={navTitleStagger}>
            {item.label.split("").map((char, ci) => (
              <motion.span key={`${item.id}-c-${ci}`} variants={navTitleLetter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
          {!hideTrailingArrow ? (
            <div className="shrink-0 overflow-hidden py-1">
              <motion.span variants={navArrowVariants} className="flex" aria-hidden>
                <ArrowRight className="size-7 text-arc-teal sm:size-9" strokeWidth={1.75} />
              </motion.span>
            </div>
          ) : null}
        </motion.div>
      )}
    </Link>
  );
}

function DrawerNavItem({
  item,
  index,
  closeMenu,
  reducedMotion,
  menuOpen,
  canHover,
  registerTopLinkRef,
}: {
  item: NavTopItem;
  index: number;
  closeMenu: () => void;
  reducedMotion: boolean;
  menuOpen: boolean;
  canHover: boolean;
  registerTopLinkRef?: (index: number, el: HTMLElement | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const meta = DRAWER_META[item.id] ?? DRAWER_META.about;
  const hasPanel = navItemHasPanel(item);
  const panelId = `arc-nav-drawer-${item.id}`;

  useEffect(() => {
    if (!menuOpen) setOpen(false);
  }, [menuOpen]);

  if (!hasPanel && item.href) {
    return (
      <li className="arc-nav-menu-item" data-shape={meta.shape}>
        <DrawerTopLinkRow
          item={item}
          closeMenu={closeMenu}
          reducedMotion={reducedMotion}
          canHover={canHover}
          rowIndex={index}
          assignRef={(el) => registerTopLinkRef?.(index, el)}
        />
      </li>
    );
  }

  return (
    <li className="arc-nav-menu-item flex flex-col" data-shape={meta.shape}>
      {item.href ? (
        <div
          ref={(el) => registerTopLinkRef?.(index, el)}
          className="flex w-full items-stretch border-b border-arc-charcoal/10"
        >
          <DrawerTopLinkRow
            item={item}
            closeMenu={closeMenu}
            reducedMotion={reducedMotion}
            canHover={canHover}
            hideTrailingArrow
            rowIndex={index}
            className="min-w-0 flex-1 border-b-0"
          />
          <DrawerDropdownToggle
            open={open}
            onToggle={() => setOpen((v) => !v)}
            panelId={panelId}
            itemLabel={item.label}
          />
        </div>
      ) : (
        <button
          type="button"
          ref={(el) => registerTopLinkRef?.(index, el)}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            TOP_ROW_CLASS,
            "w-full items-stretch border-arc-charcoal/10 text-arc-charcoal",
          )}
        >
          <span className="relative z-10 min-w-0 flex-1 self-center text-left">{item.label}</span>
          <span className={cn("relative z-10", DROPDOWN_TOGGLE_ZONE_CLASS)} aria-hidden>
            <DrawerDropdownCue open={open} />
          </span>
        </button>
      )}
      {item.columns ? (
        <DrawerExpandable panelId={panelId} open={open} reducedMotion={reducedMotion}>
          <DrawerColumnGroups
            columns={item.columns}
            closeMenu={closeMenu}
            reducedMotion={reducedMotion}
            canHover={canHover}
          />
        </DrawerExpandable>
      ) : null}
    </li>
  );
}

export function ArcNavDrawerMenu({
  closeMenu,
  reducedMotion,
  menuOpen,
  canHover,
  registerTopLinkRef,
}: DrawerMenuProps) {
  return (
    <ul className="flex flex-col gap-2 pt-4 sm:pt-6">
      {DRAWER_NAV_ITEMS.map((item, index) => (
        <DrawerNavItem
          key={item.id}
          item={item}
          index={index}
          closeMenu={closeMenu}
          reducedMotion={reducedMotion}
          menuOpen={menuOpen}
          canHover={canHover}
          registerTopLinkRef={registerTopLinkRef}
        />
      ))}
    </ul>
  );
}
