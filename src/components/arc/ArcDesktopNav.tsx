"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  ARC_NAV_HOME_ITEM,
  ARC_NAV_TOP_ITEMS,
  ARC_NAV_BOOK_CTA,
  isNavHrefExact,
  isNavItemActive,
  navItemHasPanel,
  type NavColumn,
  type NavGroup,
  type NavLeaf,
  type NavTopItem,
} from "@/content/navigation";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { bookingLinkExternalProps } from "@/lib/arcBookingLink";
import { getStableNativeScroll } from "@/lib/arcScrollMode";
import { cn } from "@/lib/utils";
import type Lenis from "lenis";

const DESKTOP_NAV_ITEMS: readonly NavTopItem[] = [ARC_NAV_HOME_ITEM, ...ARC_NAV_TOP_ITEMS];

/** Always show the nav while scroll is within this distance from the top. */
const NAV_TOP_PIN_Y = 48;
/** Minimum scroll delta (px) before toggling hide/show — avoids jitter. */
const NAV_SCROLL_DELTA = 6;

function getLocomotiveLenis(): Lenis | null {
  const ls = (window as unknown as { locomotiveScroll?: { lenisInstance?: Lenis | null } })
    .locomotiveScroll;
  return ls?.lenisInstance ?? null;
}

function readScrollY(): number {
  if (typeof window === "undefined") return 0;
  const lenis = getLocomotiveLenis();
  if (lenis) return lenis.animatedScroll;
  if (getStableNativeScroll()) return window.scrollY || document.documentElement.scrollTop || 0;
  const main = document.getElementById("main");
  if (main) return main.scrollTop;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function DesktopLeaf({ leaf, active }: { leaf: NavLeaf; active: boolean }) {
  if (leaf.href) {
    return (
      <Link
        href={leaf.href}
        {...bookingLinkExternalProps(leaf.href)}
        aria-current={active ? "page" : undefined}
        className={cn(
          "block rounded-md py-1 font-sans text-[0.9375rem] leading-snug transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/40",
          active
            ? "font-semibold text-arc-teal"
            : "text-arc-charcoal/72 hover:text-arc-teal",
        )}
      >
        {leaf.label}
      </Link>
    );
  }

  const suffix = leaf.comingSoon ? "Soon" : leaf.future ? "Future" : null;
  return (
    <span className="flex items-baseline gap-2 py-1 font-sans text-[0.9375rem] leading-snug text-arc-charcoal/38">
      {leaf.label}
      {suffix ? (
        <span className="rounded-full bg-arc-charcoal/5 px-1.5 py-px text-[0.625rem] font-medium uppercase tracking-[0.12em] text-arc-charcoal/45">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}

type PanelCell = { group: NavGroup; key: string };

/** Flatten columns → groups, then optionally slice into fixed-length rows. */
function panelRows(
  columns: readonly NavColumn[],
  columnsPerRow: number | undefined,
): PanelCell[][] {
  const cells: PanelCell[] = [];
  columns.forEach((column, colIndex) => {
    column.groups.forEach((group, groupIndex) => {
      cells.push({ group, key: `${colIndex}-${groupIndex}` });
    });
  });
  if (!columnsPerRow) return [cells];

  const rows: PanelCell[][] = [];
  for (let i = 0; i < cells.length; i += columnsPerRow) {
    rows.push(cells.slice(i, i + columnsPerRow));
  }
  return rows;
}

function DesktopMegaPanel({
  columns,
  columnsPerRow,
  pathname,
  onNavigate,
}: {
  columns: readonly NavColumn[];
  columnsPerRow?: number;
  pathname: string | null;
  onNavigate: () => void;
}) {
  const rows = panelRows(columns, columnsPerRow);

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center gap-x-4 gap-y-8">
          {row.map(({ group, key }) => {
            const hubOnly = group.items.length === 0;
            const headingActive = Boolean(
              group.headingHref && isNavHrefExact(group.headingHref, pathname),
            );
            return (
              <div
                key={key}
                className={cn("min-w-[11rem] space-y-2", hubOnly && "text-center")}
              >
                {group.heading ? (
                  group.headingHref ? (
                    <Link
                      href={group.headingHref}
                      onClick={onNavigate}
                      aria-current={headingActive ? "page" : undefined}
                      className={cn(
                        "border-b border-arc-charcoal/12 pb-2 font-serif text-lg font-semibold tracking-tight transition-colors duration-200 hover:text-arc-teal",
                        hubOnly ? "inline-block" : "block",
                        headingActive ? "text-arc-teal" : "text-arc-charcoal",
                      )}
                    >
                      {group.heading}
                    </Link>
                  ) : (
                    <p
                      className={cn(
                        "border-b border-arc-charcoal/12 pb-2 font-serif text-lg font-semibold tracking-tight text-arc-charcoal",
                        hubOnly ? "inline-block" : "block",
                      )}
                    >
                      {group.heading}
                    </p>
                  )
                ) : null}
                {!hubOnly ? (
                  <ul className="space-y-0.5">
                    {group.items.map((leaf) => (
                      <li key={leaf.label} onClick={leaf.href ? onNavigate : undefined}>
                        <DesktopLeaf
                          leaf={leaf}
                          active={Boolean(leaf.href && isNavHrefExact(leaf.href, pathname))}
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function DesktopNavTrigger({
  item,
  open,
  active,
  onOpen,
  onToggle,
}: {
  item: NavTopItem;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  const hasPanel = navItemHasPanel(item);
  const triggerClass = cn(
    "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 font-sans text-[0.875rem] font-medium tracking-tight transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/40 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
    open && active
      ? "bg-arc-teal/20 font-semibold text-arc-teal ring-1 ring-arc-teal/35"
      : open
        ? "bg-white/70 text-arc-teal"
        : active
          ? "bg-arc-teal font-semibold text-white shadow-[0_4px_12px_rgba(131,208,187,0.4)]"
          : "text-arc-charcoal hover:bg-white/50 hover:text-arc-teal",
  );

  const chevron = hasPanel ? (
    <ChevronDown
      className={cn("size-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
      strokeWidth={2}
      aria-hidden
    />
  ) : null;

  // Items with a dropdown never navigate — they only open the mega-menu (hover / focus / toggle).
  if (item.href && !hasPanel) {
    return (
      <Link href={item.href} className={triggerClass} aria-current={active ? "page" : undefined}>
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      onFocus={onOpen}
      className={triggerClass}
      aria-expanded={open}
      aria-haspopup={hasPanel ? "menu" : undefined}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
      {chevron}
    </button>
  );
}

/**
 * Laptop / desktop navigation (lg+). Neko-inspired layout: inline top-level links with hover
 * mega-menus and a teal "Book now" pill. The site wordmark is NOT part of this bar — the large
 * logo is rendered separately by `ArcSiteHeader`. Hides on scroll down, fades in on scroll up
 * (always visible near page top). Mobile keeps the existing logo + drawer.
 */
export function ArcDesktopNav() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  /** Last item that had a panel — kept mounted during the close fade so it doesn't pop. */
  const [displayItem, setDisplayItem] = useState<NavTopItem | null>(null);
  const [revealed, setRevealed] = useState(true);
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [tabPanelLeft, setTabPanelLeft] = useState<number | null>(null);
  const lastScrollYRef = useRef(0);
  /** Distance travelled in the current direction; resets when direction flips. */
  const dirAccumRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = readScrollY();
    dirAccumRef.current = 0;

    if (reducedMotion) {
      setRevealed(true);
      return;
    }

    let raf = 0;
    const tick = () => {
      const scrollY = readScrollY();
      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (scrollY <= NAV_TOP_PIN_Y) {
        setRevealed(true);
        dirAccumRef.current = 0;
      } else if (delta !== 0) {
        // Accumulate movement per direction so slow, small scrolls still trigger.
        if (Math.sign(delta) !== Math.sign(dirAccumRef.current)) {
          dirAccumRef.current = 0;
        }
        dirAccumRef.current += delta;

        if (dirAccumRef.current > NAV_SCROLL_DELTA) {
          setRevealed(false);
          setOpenId(null);
        } else if (dirAccumRef.current < -NAV_SCROLL_DELTA) {
          setRevealed(true);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openItem = openId
    ? DESKTOP_NAV_ITEMS.find((i) => i.id === openId && navItemHasPanel(i)) ?? null
    : null;

  // Keep the panel's content mounted while it fades out (open -> closed keeps last content).
  useEffect(() => {
    if (openItem) setDisplayItem(openItem);
  }, [openItem]);

  const closeMenu = () => setOpenId(null);
  const navVisible = reducedMotion ? true : revealed;
  const menuOpen = Boolean(openItem?.columns);
  const panelItem = openItem ?? displayItem;
  const alignPanelToTab = panelItem?.panelAlign === "tab";
  const panelLeftPx = alignPanelToTab ? tabPanelLeft : null;

  // Narrow menus (Start Here) anchor under their tab; wide menus stay centered on the pill.
  useLayoutEffect(() => {
    if (!alignPanelToTab || !panelItem) {
      setTabPanelLeft(null);
      return;
    }

    const measure = () => {
      const pill = pillRef.current;
      const trigger = triggerRefs.current[panelItem.id];
      if (!pill || !trigger) {
        setTabPanelLeft(null);
        return;
      }
      const pillRect = pill.getBoundingClientRect();
      const triggerRect = trigger.getBoundingClientRect();
      setTabPanelLeft(triggerRect.left + triggerRect.width / 2 - pillRect.left);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [alignPanelToTab, panelItem, menuOpen]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[10999] hidden xl:block"
    >
      <div
        className={cn(
          "mx-auto grid grid-cols-[1fr_auto_1fr] items-start gap-x-6 px-6 pt-4 lg:px-10",
          ARC_PAGE_RAIL_MAX,
        )}
      >
        {/* Left spacer — the large wordmark is rendered by ArcSiteHeader, on top of this row. */}
        <div aria-hidden />

        {/* Center: floating nav pill (+ mega-menu card anchored beneath it).
            Only this cell fades on scroll — the Book now pill stays visible at all times.
            onMouseLeave lives here (pointer-events-auto) so leaving the pill+card closes the
            dropdown — the outer container is pointer-events-none and never fires leave events. */}
        <div
          ref={pillRef}
          className={cn(
            "pointer-events-auto relative justify-self-center",
            "transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)] duration-[600ms] will-change-[opacity]",
            navVisible ? "opacity-100" : "opacity-0",
            // When faded out, force this cell + all descendants non-interactive (children set
            // pointer-events-auto, which would otherwise stay clickable while invisible).
            !navVisible && "pointer-events-none [&_*]:pointer-events-none",
            reducedMotion && "motion-reduce:transition-none",
          )}
          aria-hidden={!navVisible}
          onMouseLeave={closeMenu}
        >
          <nav aria-label="Primary">
            <ul
              className={cn(
                "flex items-center gap-x-1 rounded-full border border-black/30 px-2.5 py-1.5",
                "bg-arc-cream shadow-[0_12px_32px_rgba(44,44,44,0.10)]",
              )}
            >
              {DESKTOP_NAV_ITEMS.map((item) => (
                <li
                  key={item.id}
                  ref={(el) => {
                    triggerRefs.current[item.id] = el;
                  }}
                  onMouseEnter={() =>
                    navItemHasPanel(item) ? setOpenId(item.id) : setOpenId(null)
                  }
                >
                  <DesktopNavTrigger
                    item={item}
                    open={openId === item.id}
                    active={isNavItemActive(item, pathname)}
                    onOpen={() => navItemHasPanel(item) && setOpenId(item.id)}
                    onToggle={() =>
                      setOpenId((cur) => (cur === item.id ? null : item.id))
                    }
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Mega-menu — floating rounded card (pt-3 bridges the gap).
              Default: centered under the pill. Start Here (`panelAlign: "tab"`): under that tab. */}
          {panelItem?.columns ? (
            <div
              className={cn(
                "absolute top-full z-20 pt-3",
                panelLeftPx == null && "left-1/2 -translate-x-1/2",
                "transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]",
                menuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1.5 opacity-0",
                reducedMotion && "motion-reduce:transition-none",
              )}
              style={
                panelLeftPx != null
                  ? {
                      left: panelLeftPx,
                      transform: menuOpen
                        ? "translate(-50%, 0)"
                        : "translate(-50%, -0.375rem)",
                    }
                  : undefined
              }
              aria-hidden={!menuOpen}
            >
              <div className="max-h-[70vh] w-max max-w-[min(66rem,calc(100vw-24rem))] overflow-y-auto rounded-2xl border border-black/30 bg-arc-cream p-6 shadow-[0_24px_48px_rgba(44,44,44,0.14)]">
                <div
                  key={panelItem.id}
                  className={cn(reducedMotion ? "" : "animate-[arc-nav-fade_160ms_ease-out]")}
                >
                  <DesktopMegaPanel
                    columns={panelItem.columns}
                    columnsPerRow={panelItem.panelColumnsPerRow}
                    pathname={pathname}
                    onNavigate={closeMenu}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right: Book now pill */}
        <Link
          href={ARC_NAV_BOOK_CTA.href}
          {...bookingLinkExternalProps(ARC_NAV_BOOK_CTA.href)}
          className={cn(
            "group pointer-events-auto inline-flex w-max shrink-0 items-center gap-2 justify-self-end whitespace-nowrap rounded-full bg-arc-teal py-2.5 pl-6 pr-5",
            "border border-white/50",
            "font-sans text-[0.9375rem] font-semibold tracking-tight text-white",
            "shadow-[0_10px_28px_rgba(131,208,187,0.38)] transition-[filter,transform] duration-300",
            "hover:-translate-y-px hover:brightness-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-arc-cream/80",
            "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
          )}
        >
          {ARC_NAV_BOOK_CTA.label}
          <ArrowRight
            className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </div>

      {/* Click-away scrim while a mega-menu is open */}
      {openItem ? (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={closeMenu}
          className="pointer-events-auto fixed inset-0 -z-10 cursor-default"
        />
      ) : null}
    </div>
  );
}
