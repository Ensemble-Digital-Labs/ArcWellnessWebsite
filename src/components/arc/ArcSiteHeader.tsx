"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import type Lenis from "lenis";
import { cn } from "@/lib/utils";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { images } from "@/content/site";
import { ArcNavDrawerMenu } from "@/components/arc/ArcNavDrawerMenu";
import { ArcNavDrawerBookCta } from "@/components/arc/ArcNavDrawerBookCta";
import { ArcNavDrawerTopBar } from "@/components/arc/ArcNavDrawerTopBar";
import { ArcDesktopNav } from "@/components/arc/ArcDesktopNav";
import { ARC_PRIMARY_NAV_LINKS, ARC_TREATMENT_NAV_LINKS } from "@/lib/arcMarketingNav";
import { forwardWheelEventToLenis, getStableNativeScroll } from "@/lib/arcScrollMode";
import { ARC_HEADER_CHROME_RESET_EVENT } from "@/lib/arcHeaderChromeRecovery";
import {
  ARC_INSIGHTS_HEADER_CHROME_EVENT,
  insightsLogoShouldHide,
  insightsLogoHomeLinkActive,
  INSIGHTS_HEADER_CHROME_RESET,
  type ArcInsightsHeaderChromeDetail,
} from "@/lib/arcInsightsHeaderSync";

/**
 * Logo fades out while the page is moving (past a small top offset). It fades back in with a fixed
 * eased duration when you’re near the top **or** scroll has settled, no translate bobbing, opacity-only.
 */
const LOGO_SHOW_BELOW_SCROLL_Y = 48;
/** Treat Lenis as “stopped” when |velocity| is below this (logo can show while moving if above threshold). */
const LOGO_VELOCITY_STOP_EPS = 0.022;
/**
 * Fade-in to full opacity uses fixed wall-clock duration so returns to the hero feel consistent.
 * (Per-frame lerp toward 1 near y≈0 used to read as an instant snap.)
 */
const LOGO_FADE_IN_DURATION_MS = 540;
/** Fade-out while scrolling, eased over time so it doesn’t “pop” off. */
const LOGO_FADE_OUT_DURATION_MS = 480;
/** Match Lenis: velocity is px per animation frame (`animatedScroll - lastScroll`). */
const LOGO_NATIVE_VELOCITY_BLEND = 0.35;

type LogoFadeSession = { start: number; from: number };

function logoWantHidden(scrollY: number, velocity: number): boolean {
  const pastTop = scrollY >= LOGO_SHOW_BELOW_SCROLL_Y;
  const isStopped = Math.abs(velocity) < LOGO_VELOCITY_STOP_EPS;
  return pastTop && !isStopped;
}

function easeOutCubic(t: number): number {
  const u = Math.min(1, Math.max(0, t));
  return 1 - (1 - u) ** 3;
}

function easeInOutQuad(t: number): number {
  const u = Math.min(1, Math.max(0, t));
  return u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2;
}

function getLocomotiveLenis(): Lenis | null {
  const ls = (window as unknown as { locomotiveScroll?: { lenisInstance?: Lenis | null } })
    .locomotiveScroll;
  return ls?.lenisInstance ?? null;
}

/** Top inset for scroll content when a solid header bar pushes the page down. */
export const SITE_HEADER_OFFSET = "0";

/** Overlay / drawer / chrome, high enough to sit above pinned sections and modals below full-screen lightboxes. */
const NAV_STACK_OVERLAY = "z-[1000]";
const NAV_STACK_DRAWER = "z-[1001]";
const NAV_STACK_CHROME = "z-[11000]";
/** Drawer + chrome while menu is open, chrome (logo, close) stays above the drawer. */
const NAV_STACK_DRAWER_OPEN = "z-[11001]";
const NAV_STACK_CHROME_OPEN = "z-[11002]";

/** Mobile wordmark, explicit height so `h-full` + narrow max-w doesn’t cap size invisibly. */
const ARC_HEADER_LOGO_LINK_CLASS =
  "relative z-10 col-start-1 row-start-1 inline-flex w-fit shrink-0 items-center justify-start bg-transparent px-0 max-md:min-h-[6rem] max-md:py-1 sm:max-md:min-h-[6.5rem] md:h-28 md:pr-2 lg:h-32 xl:h-36";
const ARC_HEADER_LOGO_IMG_CLASS =
  "arc-header-logo object-contain object-left max-md:h-[5.5rem] max-md:w-auto max-md:max-w-[min(72vw,15rem)] sm:max-md:h-[6rem] sm:max-md:max-w-[min(76vw,16rem)] md:h-full md:w-auto md:max-w-[min(42vw,320px)] lg:max-w-[min(36vw,360px)]";
const ARC_HEADER_LOGO_MOTION_WRAP_CLASS =
  "inline-flex max-md:h-[5.5rem] max-md:w-auto max-md:max-w-[min(72vw,15rem)] sm:max-md:h-[6rem] sm:max-md:max-w-[min(76vw,16rem)] md:h-full md:max-w-[min(42vw,320px)] lg:max-w-[min(36vw,360px)]";

/** Hash anchors for logo-demo routes only (`sectionBasePath` set). */
const NAV_LINK_DEFS = [
  { label: "About", anchor: "about", shape: "1", previewSrc: images.whoWeAre },
  { label: "Services", anchor: "services", shape: "2", previewSrc: images.services[0] },
  { label: "Your path", anchor: "path", shape: "3", previewSrc: images.services[2] },
  { label: "Invest in you", anchor: "book", shape: "4", previewSrc: images.investBanner },
  { label: "Contact", anchor: "contact", shape: "5", previewSrc: images.heroMedia },
] as const;

function buildArcNavLinks(sectionBasePath?: string) {
  const base =
    sectionBasePath && sectionBasePath !== "/" ? sectionBasePath.replace(/\/$/, "") : "";
  return NAV_LINK_DEFS.map((def) => ({
    label: def.label,
    shape: def.shape,
    previewSrc: def.previewSrc,
    href: base ? `${base}#${def.anchor}` : `/#${def.anchor}`,
  }));
}

type NavLinkItem = {
  label: string;
  href: string;
  shape: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  previewSrc: string;
};

const navRowRootVariants = {
  initial: {},
  hover: {},
};

/** Stagger container for per-letter motion (inherits hover from parent row). */
const navTitleStagger = {
  initial: {},
  hover: {
    transition: { staggerChildren: 0.045, delayChildren: 0.06 },
  },
};

const navTitleLetter = {
  initial: { x: 0 },
  hover: {
    x: 12,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
};

const navArrowVariants = {
  initial: { x: "100%", opacity: 0 },
  hover: {
    x: "0%",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};

const navLinkPreviewVariants = {
  initial: { scale: 0, rotate: "-14deg", opacity: 0 },
  hover: {
    scale: 1,
    rotate: "10deg",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 26 },
  },
};

/** Circular preview for treatment sub-links, pops in beside the label on hover. */
const navTreatmentPreviewVariants = {
  initial: { scale: 0.72, rotate: "-8deg", opacity: 0 },
  hover: {
    scale: 1,
    rotate: "6deg",
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 340, damping: 22 },
  },
};

/** Mobile nav links, full-width tap target; touch uses CSS :active, not pointer-hover JS. */
const ARC_NAV_LINK_ROW_CLASS =
  "group relative flex w-full min-h-[52px] touch-manipulation items-center justify-between gap-4 overflow-visible border-b py-3 font-serif text-3xl font-semibold tracking-tight transition-colors duration-300 sm:min-h-[56px] sm:py-4 sm:text-4xl";

type TreatmentNavLink = (typeof ARC_TREATMENT_NAV_LINKS)[number];

function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return canHover;
}

function ArcNavTreatmentLinkRow({
  item,
  closeMenu,
  reducedMotion,
  canHover,
}: {
  item: TreatmentNavLink;
  closeMenu: () => void;
  reducedMotion: boolean;
  canHover: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(py, { stiffness: 300, damping: 30, mass: 0.5 });
  const previewRotate = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const showFloatingPreview = canHover && !reducedMotion;
  const showInlineThumb = !showFloatingPreview;

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!showFloatingPreview) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (!w || !h) return;
    px.set((e.clientX - rect.left) / w - 0.5);
    py.set((e.clientY - rect.top) / h - 0.5);
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
      href={item.href}
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
          "hover:bg-arc-teal-muted/45 hover:pr-[10.75rem] hover:text-arc-teal sm:hover:pr-[12.5rem]",
        showInlineThumb &&
          (hovered
            ? "bg-arc-teal-muted/35 text-arc-teal"
            : "active:bg-arc-teal-muted/35 active:text-arc-teal"),
      )}
    >
      <span className="relative z-10 min-w-0 flex-1 font-medium leading-snug">{item.label}</span>

      {showFloatingPreview ? (
        <motion.div
          className="pointer-events-none absolute right-1 top-1/2 z-30 size-[10.5rem] -translate-y-1/2 sm:right-2 sm:size-[12rem]"
          style={{ rotate: previewRotate }}
          initial="initial"
          animate={hovered ? "hover" : "initial"}
          variants={navTreatmentPreviewVariants}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_20px_48px_rgba(0,0,0,0.32)] ring-[3px] ring-white/70">
            <Image
              src={item.thumbSrc}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 168px, 192px"
              unoptimized
            />
          </div>
        </motion.div>
      ) : null}

      {showInlineThumb ? (
        <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-arc-cream-deep ring-2 ring-arc-charcoal/10 sm:size-16">
          <Image
            src={item.thumbSrc}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
            unoptimized
          />
        </span>
      ) : null}
    </Link>
  );
}

function ArcNavMenuLinkRow({
  item,
  reducedMotion,
  closeMenu,
  assignRef,
  nested = false,
  canHover,
}: {
  item: NavLinkItem;
  reducedMotion: boolean;
  closeMenu: () => void;
  assignRef: (el: HTMLAnchorElement | null) => void;
  /** When true, omit outer `<li>`, parent list item wraps this row (e.g. Treatments + sub-list). */
  nested?: boolean;
  canHover: boolean;
}) {
  const showRichMotion = canHover && !reducedMotion;
  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 280, damping: 32, mass: 0.55 });
  const springY = useSpring(py, { stiffness: 280, damping: 32, mass: 0.55 });
  const top = useTransform(springY, [0.5, -0.5], ["38%", "62%"]);
  const left = useTransform(springX, [0.5, -0.5], ["62%", "38%"]);

  const resetHover = () => {
    px.set(0);
    py.set(0);
    setHovered(false);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!showRichMotion || e.pointerType === "touch") return;
    setHovered(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!showRichMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (!w || !h) return;
    px.set((e.clientX - rect.left) / w - 0.5);
    py.set((e.clientY - rect.top) / h - 0.5);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch") return;
    resetHover();
  };

  const linkRow = (
    <Link
      ref={assignRef}
      href={item.href}
      onClick={closeMenu}
      {...(showRichMotion
        ? {
            onPointerEnter: handlePointerEnter,
            onPointerMove: handlePointerMove,
            onPointerLeave: handlePointerLeave,
          }
        : {})}
      className={cn(
        ARC_NAV_LINK_ROW_CLASS,
        nested ? "border-b-0" : "last:border-b-0",
        showRichMotion && hovered
          ? "border-arc-teal/40 text-arc-teal"
          : showRichMotion
            ? "border-arc-charcoal/10 text-arc-charcoal"
            : "border-arc-charcoal/10 text-arc-charcoal active:border-arc-teal/40 active:text-arc-teal",
      )}
    >
        {showRichMotion ? (
          <motion.div
            className="pointer-events-none absolute left-0 top-1/2 z-[1] h-[5.5rem] w-[7.25rem] sm:h-[7rem] sm:w-[9.25rem]"
            style={{
              top,
              left,
              x: "-12%",
              y: "-50%",
            }}
            initial="initial"
            animate={hovered ? "hover" : "initial"}
            variants={navLinkPreviewVariants}
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_18px_44px_rgba(0,0,0,0.22)] ring-1 ring-white/35">
              <Image
                src={item.previewSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width:640px) 120px, 180px"
                unoptimized
              />
            </div>
          </motion.div>
        ) : null}

        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 scale-x-0 bg-arc-teal-muted/60 transition-transform duration-300 ease-out",
            showRichMotion && hovered && "scale-x-100",
            !showRichMotion && "group-active:scale-x-100",
          )}
          aria-hidden
        />

        {!showRichMotion ? (
          <>
            <span className="relative z-10 min-w-0 flex-1">{item.label}</span>
            <ArrowRight
              className="relative z-10 size-7 shrink-0 translate-x-0 text-arc-teal opacity-100 sm:size-9"
              strokeWidth={1.75}
              aria-hidden
            />
          </>
        ) : (
          <motion.div
            className="pointer-events-none relative z-10 flex w-full min-w-0 items-center justify-between gap-4"
            initial="initial"
            animate={hovered ? "hover" : "initial"}
            variants={navRowRootVariants}
          >
            <motion.span
              className="inline-flex min-w-0 flex-1 flex-wrap items-baseline pr-4"
              variants={navTitleStagger}
            >
              {item.label.split("").map((char, ci) => (
                <motion.span
                  key={`${item.href}-c-${ci}`}
                  variants={navTitleLetter}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>

            <div className="shrink-0 overflow-hidden py-1">
              <motion.span variants={navArrowVariants} className="flex" aria-hidden>
                <ArrowRight className="size-7 text-arc-teal sm:size-9" strokeWidth={1.75} />
              </motion.span>
            </div>
          </motion.div>
        )}
      </Link>
  );

  if (nested) {
    return linkRow;
  }

  return (
    <li className="arc-nav-menu-item" data-shape={item.shape}>
      {linkRow}
    </li>
  );
}

function ArcNavTreatmentsSeeMore({
  reducedMotion,
  closeMenu,
  menuOpen,
  canHover,
}: {
  reducedMotion: boolean;
  closeMenu: () => void;
  menuOpen: boolean;
  canHover: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) setOpen(false);
  }, [menuOpen]);

  return (
    <div className="border-b border-arc-charcoal/10 pb-3 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="arc-nav-treatments-list"
        className="flex w-full min-h-[44px] items-center justify-between gap-3 py-1 pl-1 font-sans text-sm font-medium tracking-wide text-arc-charcoal/58 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/40 active:text-arc-teal [@media(hover:hover)_and_(pointer:fine)]:hover:text-arc-teal"
      >
        <span>See all treatments</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-arc-teal/70 transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
      <div
        id="arc-nav-treatments-list"
        className={cn(
          open ? "visible overflow-visible opacity-100" : "invisible max-h-0 overflow-hidden opacity-0",
          reducedMotion ? "" : "transition-[max-height,opacity] duration-300 ease-out",
        )}
        aria-hidden={!open}
      >
        <ul className="mt-1 space-y-1 py-1 pr-1 sm:pr-2">
          {ARC_TREATMENT_NAV_LINKS.map((t) => (
            <li key={t.href}>
              <ArcNavTreatmentLinkRow
                item={t}
                closeMenu={closeMenu}
                reducedMotion={reducedMotion}
                canHover={canHover}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Left-aligned logo + fullscreen slide-in menu (GSAP), ARC palette and section anchors.
 * Inspired by a Webflow-style overlay; uses standard GSAP easing (no CustomEase).
 */
export type ArcSiteHeaderProps = {
  /** Defaults to main site wordmark from `site.ts`. */
  logoSrc?: string;
  logoAlt?: string;
  homeHref?: string;
  /** e.g. `/logodemov1`, `/logodemov2`, `/logodemov3`, scope fullscreen menu links to this route’s section IDs. */
  sectionBasePath?: string;
  /** Insights feed, logo home link only near page top so filter tabs stay tappable. */
  logoClickOnlyAtTop?: boolean;
  /** Homepage hero, hide wordmark until scroll clears the marketing hero (less visual clutter). */
  hideLogoInHero?: boolean;
};

const LOGO_HOME_LINK_SCROLL_MAX = 120;

const ARC_MARKETING_HERO_SELECTOR = "[data-arc-marketing-hero]";

function getMarketingHeroScrollEnd(): number {
  if (typeof document === "undefined") return 800;
  const hero = document.querySelector(ARC_MARKETING_HERO_SELECTOR);
  if (!(hero instanceof HTMLElement)) return window.innerHeight;

  const pinSpacer = hero.parentElement?.classList.contains("pin-spacer")
    ? hero.parentElement
    : null;
  const host = pinSpacer ?? hero;
  return host.offsetTop + host.offsetHeight;
}

function isInMarketingHeroZone(scrollY: number): boolean {
  return scrollY < getMarketingHeroScrollEnd() - 24;
}

function readSiteScrollY(): number {
  const lenis = getLocomotiveLenis();
  if (lenis) {
    const s = lenis.scroll as number | { y?: number };
    if (typeof s === "number") return s;
    if (typeof s?.y === "number") return s.y;
  }
  if (getStableNativeScroll()) return window.scrollY;
  const main = document.getElementById("main");
  if (main) return main.scrollTop;
  return window.scrollY;
}

function applyLogoScrollFade(
  logoOpacity: MotionValue<number>,
  wantHidden: boolean,
  fadeInRef: { current: LogoFadeSession | null },
  fadeOutRef: { current: LogoFadeSession | null },
) {
  const o = logoOpacity.get();

  if (wantHidden) {
    fadeInRef.current = null;
    if (o <= 0.008) {
      fadeOutRef.current = null;
      logoOpacity.set(0);
      return;
    }
    if (fadeOutRef.current === null) {
      fadeOutRef.current = {
        start: performance.now(),
        from: o,
      };
    }
    const sess = fadeOutRef.current;
    const t = Math.min(1, (performance.now() - sess.start) / LOGO_FADE_OUT_DURATION_MS);
    const eased = easeInOutQuad(t);
    logoOpacity.set(sess.from * (1 - eased));
    if (t >= 1) fadeOutRef.current = null;
    return;
  }

  fadeOutRef.current = null;
  if (o >= 0.999) {
    fadeInRef.current = null;
    logoOpacity.set(1);
    return;
  }
  if (fadeInRef.current === null) {
    fadeInRef.current = {
      start: performance.now(),
      from: o,
    };
  }
  const sess = fadeInRef.current;
  const t = Math.min(1, (performance.now() - sess.start) / LOGO_FADE_IN_DURATION_MS);
  const eased = easeOutCubic(t);
  logoOpacity.set(sess.from + (1 - sess.from) * eased);
  if (t >= 1) fadeInRef.current = null;
}

/** Menu open: fade the wordmark out (same eased fade as scroll-hide), all viewports. */
function applyMenuOpenLogoPolicy(
  logoOpacity: MotionValue<number>,
  fadeInRef: React.MutableRefObject<LogoFadeSession | null>,
  fadeOutRef: React.MutableRefObject<LogoFadeSession | null>,
) {
  applyLogoScrollFade(logoOpacity, true, fadeInRef, fadeOutRef);
}

export function ArcSiteHeader({
  logoSrc = images.logo,
  logoAlt = "ARC Wellness",
  homeHref = "/",
  sectionBasePath,
  logoClickOnlyAtTop = false,
  hideLogoInHero = false,
}: ArcSiteHeaderProps = {}) {
  const navLinks =
    sectionBasePath && sectionBasePath !== "/"
      ? buildArcNavLinks(sectionBasePath)
      : ARC_PRIMARY_NAV_LINKS.map((item) => ({
          label: item.label,
          shape: item.shape,
          previewSrc: item.previewSrc,
          href: item.href,
        }));
  const containerRef = useRef<HTMLDivElement>(null);
  const headerChromeRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<(HTMLElement | null)[]>([]);
  const wasMenuOpened = useRef(false);
  const [mobileNavReady, setMobileNavReady] = useState(false);
  const [menuEverOpened, setMenuEverOpened] = useState(false);
  const isMenuOpenRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [logoHomeLinkActive, setLogoHomeLinkActive] = useState(true);
  const canHover = useCanHover();

  const logoOpacity = useMotionValue(hideLogoInHero ? 0 : 1);
  const [logoPointerDisabled, setLogoPointerDisabled] = useState(hideLogoInHero);
  /** Fixed-duration fade-in after stop (`null` = not running). */
  const logoFadeInSessionRef = useRef<{ start: number; from: number } | null>(null);
  /** Eased fade-out while scrolling (`null` = idle / fully hidden). */
  const logoFadeOutSessionRef = useRef<{ start: number; from: number } | null>(null);
  const insightsChromeRef = useRef<ArcInsightsHeaderChromeDetail>({
    ...INSIGHTS_HEADER_CHROME_RESET,
  });
  const nativeScrollMotionRef = useRef({
    y: 0,
    velocity: 0,
  });

  isMenuOpenRef.current = isMenuOpen;

  useMotionValueEvent(logoOpacity, "change", (value) => {
    setLogoPointerDisabled(value < 0.08);
  });

  useEffect(() => {
    if (!isMenuOpen) return;
    applyMenuOpenLogoPolicy(logoOpacity, logoFadeInSessionRef, logoFadeOutSessionRef);
  }, [isMenuOpen, logoOpacity]);

  useEffect(() => {
    if (!logoClickOnlyAtTop) {
      insightsChromeRef.current = { ...INSIGHTS_HEADER_CHROME_RESET };
      return;
    }

    const onInsightsChrome = (event: Event) => {
      const detail = (event as CustomEvent<ArcInsightsHeaderChromeDetail>).detail;
      insightsChromeRef.current = detail;
      if (
        insightsLogoShouldHide(detail.mastheadVisible, detail.ctaSectionVisible)
      ) {
        logoFadeInSessionRef.current = null;
        logoFadeOutSessionRef.current = null;
        logoOpacity.set(0);
      }
    };

    window.addEventListener(ARC_INSIGHTS_HEADER_CHROME_EVENT, onInsightsChrome);
    return () => {
      window.removeEventListener(ARC_INSIGHTS_HEADER_CHROME_EVENT, onInsightsChrome);
      insightsChromeRef.current = { ...INSIGHTS_HEADER_CHROME_RESET };
    };
  }, [logoClickOnlyAtTop, logoOpacity]);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;

    const tick = () => {
      if (cancelled) return;

      if (isMenuOpenRef.current) {
        applyMenuOpenLogoPolicy(
          logoOpacity,
          logoFadeInSessionRef,
          logoFadeOutSessionRef,
        );
        raf = requestAnimationFrame(tick);
        return;
      }

      if (
        logoClickOnlyAtTop &&
        insightsLogoShouldHide(
          insightsChromeRef.current.mastheadVisible,
          insightsChromeRef.current.ctaSectionVisible,
        )
      ) {
        logoFadeInSessionRef.current = null;
        logoFadeOutSessionRef.current = null;
        logoOpacity.set(0);
        raf = requestAnimationFrame(tick);
        return;
      }

      const lenis = getLocomotiveLenis();
      const scrollY = lenis ? lenis.animatedScroll : readSiteScrollY();
      let wantHidden = false;

      if (hideLogoInHero && isInMarketingHeroZone(scrollY)) {
        wantHidden = true;
      } else if (!reducedMotion) {
        if (lenis) {
          wantHidden = logoWantHidden(scrollY, lenis.velocity);
        } else {
          const frameDelta = scrollY - nativeScrollMotionRef.current.y;
          nativeScrollMotionRef.current.velocity =
            nativeScrollMotionRef.current.velocity * (1 - LOGO_NATIVE_VELOCITY_BLEND) +
            frameDelta * LOGO_NATIVE_VELOCITY_BLEND;
          nativeScrollMotionRef.current.y = scrollY;
          wantHidden = logoWantHidden(scrollY, nativeScrollMotionRef.current.velocity);
        }
      }

      applyLogoScrollFade(
        logoOpacity,
        wantHidden,
        logoFadeInSessionRef,
        logoFadeOutSessionRef,
      );

      raf = requestAnimationFrame(tick);
    };

    nativeScrollMotionRef.current.y = readSiteScrollY();
    nativeScrollMotionRef.current.velocity = 0;

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, logoOpacity, logoClickOnlyAtTop, hideLogoInHero]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!logoClickOnlyAtTop) {
      setLogoHomeLinkActive(true);
      return;
    }

    let raf = 0;
    const sync = () => {
      const chrome = insightsChromeRef.current;
      setLogoHomeLinkActive(
        insightsLogoHomeLinkActive(readSiteScrollY(), chrome.ctaSectionVisible, LOGO_HOME_LINK_SCROLL_MAX),
      );
      raf = requestAnimationFrame(sync);
    };

    sync();
    return () => cancelAnimationFrame(raf);
  }, [logoClickOnlyAtTop]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const menu = menuRef.current;
    const backdrop = backdropRef.current;
    if (!overlay || !menu || !backdrop) return;
    const strips = backdrop.querySelectorAll<HTMLElement>(".arc-nav-backdrop-strip");
    const links = menuLinksRef.current.filter(Boolean);
    const bookCta = menu.querySelector<HTMLElement>(".arc-nav-menu-book-cta");
    if (bookCta) gsap.set(bookCta, { clearProps: "transform,opacity" });

    if (reducedMotion) {
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(menu, { xPercent: 100 });
      gsap.set(strips, { xPercent: 101 });
      if (links.length) gsap.set(links, { yPercent: 40, opacity: 0, rotate: 0 });
      setMobileNavReady(true);
      return;
    }

    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(menu, { xPercent: 100 });
    gsap.set(strips, { xPercent: 101 });
    if (links.length) gsap.set(links, { yPercent: 110, opacity: 0, rotate: 6 });
    setMobileNavReady(true);
  }, [reducedMotion]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.pointerEvents = isMenuOpen ? "auto" : "none";
  }, [isMenuOpen]);

  useEffect(() => {
    if (reducedMotion || getStableNativeScroll()) return;
    const header = headerChromeRef.current;
    if (!header) return;

    const onWheel = (event: WheelEvent) => {
      if (isMenuOpenRef.current) return;
      forwardWheelEventToLenis(event);
    };

    header.addEventListener("wheel", onWheel, { capture: true, passive: true });
    return () => header.removeEventListener("wheel", onWheel, { capture: true });
  }, [reducedMotion]);

  useEffect(() => {
    const onChromeReset = () => {
      setIsMenuOpen(false);
      isMenuOpenRef.current = false;

      const overlay = overlayRef.current;
      const menu = menuRef.current;
      const backdrop = backdropRef.current;
      if (!overlay || !menu || !backdrop) return;

      const strips = backdrop.querySelectorAll<HTMLElement>(".arc-nav-backdrop-strip");
      const links = menuLinksRef.current.filter(Boolean);

      gsap.killTweensOf([overlay, menu, ...strips, ...links]);
      gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(menu, { xPercent: 100 });
      gsap.set(strips, { xPercent: 101 });
      if (links.length) gsap.set(links, { yPercent: 0, opacity: 1, rotate: 0 });

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      if (main) main.style.overflow = "";
    };

    window.addEventListener(ARC_HEADER_CHROME_RESET_EVENT, onChromeReset as EventListener);
    return () => window.removeEventListener(ARC_HEADER_CHROME_RESET_EVENT, onChromeReset as EventListener);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      if (getStableNativeScroll()) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      } else {
        const main = document.getElementById("main");
        if (main) main.style.overflow = "hidden";
      }
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      if (main) main.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const main = document.getElementById("main");
      if (main) main.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const root = containerRef.current;
    const shapesRoot = root.querySelector(".arc-nav-shapes");
    const items = root.querySelectorAll<HTMLElement>(".arc-nav-menu-item[data-shape]");
    const cleanups: Array<() => void> = [];

    items.forEach((item) => {
      const shapeIndex = item.getAttribute("data-shape");
      const shape = shapeIndex
        ? shapesRoot?.querySelector<SVGElement>(`.arc-bg-shape-${shapeIndex}`)
        : null;
      if (!shape) return;
      const shapeEls = shape.querySelectorAll<SVGElement>(".arc-shape-el");

      const onEnter = () => {
        shapesRoot?.querySelectorAll(".arc-bg-shape").forEach((s) => s.classList.remove("arc-bg-shape--active"));
        shape.classList.add("arc-bg-shape--active");
        gsap.fromTo(
          shapeEls,
          { scale: 0.5, opacity: 0, rotation: -8 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "back.out(1.5)",
            overwrite: "auto",
          },
        );
      };
      const onLeave = () => {
        gsap.to(shapeEls, {
          scale: 0.85,
          opacity: 0,
          duration: 0.28,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => shape.classList.remove("arc-bg-shape--active"),
        });
      };
      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reducedMotion, isMenuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const menu = menuRef.current;
    const backdrop = backdropRef.current;
    if (!overlay || !menu || !backdrop) return;

    const strips = backdrop.querySelectorAll<HTMLElement>(".arc-nav-backdrop-strip");
    const links = menuLinksRef.current.filter(Boolean);

    if (reducedMotion) {
      gsap.set(overlay, { autoAlpha: isMenuOpen ? 1 : 0, pointerEvents: isMenuOpen ? "auto" : "none" });
      gsap.set(menu, { xPercent: isMenuOpen ? 0 : 100 });
      gsap.set(strips, { xPercent: isMenuOpen ? 0 : 101 });
      links.forEach((el) => gsap.set(el, { yPercent: isMenuOpen ? 0 : 40, opacity: isMenuOpen ? 1 : 0, rotate: 0 }));
      return;
    }

    if (isMenuOpen) {
      wasMenuOpened.current = true;
      setMenuEverOpened(true);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(overlay, { pointerEvents: "auto" })
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, 0)
        .fromTo(strips, { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.5 }, 0)
        .fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.55 }, 0.08)
        .fromTo(
          links,
          { yPercent: 110, rotate: 6, opacity: 0 },
          { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.05, duration: 0.45 },
          0.25,
        );
      return () => {
        tl.kill();
      };
    }

    if (!wasMenuOpened.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.in" } });
    tl.to(links, { yPercent: 60, opacity: 0, stagger: 0.03, duration: 0.25 })
      .to(menu, { xPercent: 100, duration: 0.45 }, 0.05)
      .to(strips, { xPercent: 101, stagger: 0.06, duration: 0.35 }, 0.1)
      .to(overlay, { autoAlpha: 0, duration: 0.3 }, 0.15)
      .set(overlay, { pointerEvents: "none" });

    return () => {
      tl.kill();
    };
  }, [isMenuOpen, reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);
  const navShellHidden =
    !mobileNavReady || (!isMenuOpen && !menuEverOpened);
  const blockLogoPointer =
    isMenuOpen ||
    logoPointerDisabled ||
    (logoClickOnlyAtTop && !logoHomeLinkActive);

  return (
    <div ref={containerRef}>
      <div
        ref={overlayRef}
        id="arc-nav-overlay"
        hidden={navShellHidden}
        className={cn(
          "fixed inset-0 bg-black/55",
          NAV_STACK_OVERLAY,
          !isMenuOpen && "pointer-events-none invisible",
        )}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
        aria-hidden={!isMenuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      />

      <nav
        ref={menuRef}
        id="arc-nav-mobile-drawer"
        hidden={navShellHidden}
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-y-0 right-0 flex max-h-[100dvh] w-full max-w-[min(100vw,28rem)] flex-col bg-arc-cream text-arc-charcoal shadow-[-12px_0_40px_rgba(0,0,0,0.12)] sm:max-w-[min(100vw,32rem)]",
          isMenuOpen ? NAV_STACK_DRAWER_OPEN : NAV_STACK_DRAWER,
          !isMenuOpen && "pointer-events-none",
        )}
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
        aria-label="Site navigation"
      >
        <div ref={backdropRef} className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="arc-nav-backdrop-strip absolute inset-y-0 right-0 w-full bg-arc-teal-muted/90" />
          <div className="arc-nav-backdrop-strip absolute inset-y-0 right-0 w-full bg-arc-teal/25" />
          <div className="arc-nav-backdrop-strip absolute inset-y-0 right-0 w-full bg-arc-cream-deep/80" />

          <div className="arc-nav-shapes absolute inset-0 opacity-90">
            <svg
              className="arc-bg-shape arc-bg-shape-1 pointer-events-none absolute -right-8 top-16 h-64 w-64 text-arc-teal/20"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden
            >
              <circle className="arc-shape-el" cx="60" cy="80" r="36" fill="currentColor" />
              <circle className="arc-shape-el" cx="130" cy="50" r="48" fill="currentColor" />
            </svg>
            <svg
              className="arc-bg-shape arc-bg-shape-2 pointer-events-none absolute bottom-24 right-4 h-72 w-72 text-arc-teal/15"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden
            >
              <path
                className="arc-shape-el"
                d="M0 120 Q80 40 200 100"
                stroke="currentColor"
                strokeWidth="28"
                fill="none"
              />
            </svg>
            <svg
              className="arc-bg-shape arc-bg-shape-3 pointer-events-none absolute right-10 top-1/3 h-56 w-56 text-arc-charcoal/10"
              viewBox="0 0 200 200"
              aria-hidden
            >
              <circle className="arc-shape-el" cx="40" cy="40" r="6" fill="currentColor" />
              <circle className="arc-shape-el" cx="100" cy="40" r="6" fill="currentColor" />
              <circle className="arc-shape-el" cx="160" cy="40" r="6" fill="currentColor" />
              <circle className="arc-shape-el" cx="70" cy="100" r="8" fill="currentColor" />
              <circle className="arc-shape-el" cx="130" cy="100" r="8" fill="currentColor" />
            </svg>
            <svg
              className="arc-bg-shape arc-bg-shape-4 pointer-events-none absolute -bottom-4 right-0 h-80 w-80 text-arc-teal/12"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden
            >
              <path
                className="arc-shape-el"
                d="M40 60 Q100 20 160 60 Q120 120 60 140 Q20 100 40 60"
                fill="currentColor"
              />
            </svg>
            <svg
              className="arc-bg-shape arc-bg-shape-5 pointer-events-none absolute bottom-40 right-24 h-48 w-48 text-arc-teal/18"
              viewBox="0 0 200 200"
              fill="none"
              aria-hidden
            >
              <line className="arc-shape-el" x1="0" y1="40" x2="200" y2="200" stroke="currentColor" strokeWidth="20" />
            </svg>
          </div>
        </div>

        <ArcNavDrawerTopBar>
          <ArcNavDrawerBookCta closeMenu={closeMenu} />
        </ArcNavDrawerTopBar>

        <div className="arc-scroll-subtle relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-8 pb-12 pt-2 max-md:touch-pan-y sm:px-10 sm:pt-4">
          {sectionBasePath && sectionBasePath !== "/" ? (
            <ul className="flex flex-col gap-2">
              {navLinks.map((item, i) => (
                <ArcNavMenuLinkRow
                  key={item.href}
                  item={item}
                  reducedMotion={reducedMotion}
                  closeMenu={closeMenu}
                  canHover={canHover}
                  assignRef={(el) => {
                    menuLinksRef.current[i] = el;
                  }}
                />
              ))}
            </ul>
          ) : (
            <ArcNavDrawerMenu
              closeMenu={closeMenu}
              reducedMotion={reducedMotion}
              menuOpen={isMenuOpen}
              canHover={canHover}
              registerTopLinkRef={(index, el) => {
                menuLinksRef.current[index] = el;
              }}
            />
          )}
        </div>
      </nav>

      <header
        ref={headerChromeRef}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 isolate flex w-full justify-center bg-transparent",
          isMenuOpen ? NAV_STACK_CHROME_OPEN : NAV_STACK_CHROME,
        )}
      >
        <div
          className={cn(
            "pointer-events-none relative mx-auto grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 px-3 sm:gap-x-3 sm:px-4 md:px-6 lg:px-10",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          <Link
            href={homeHref}
            className={cn(
              ARC_HEADER_LOGO_LINK_CLASS,
              blockLogoPointer
                ? "pointer-events-none [&_*]:pointer-events-none"
                : "pointer-events-auto",
            )}
            aria-label="ARC Wellness home"
            tabIndex={blockLogoPointer ? -1 : undefined}
          >
            <motion.div
              className={ARC_HEADER_LOGO_MOTION_WRAP_CLASS}
              style={{ opacity: logoOpacity }}
            >
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={720}
                height={240}
                priority
                placeholder="empty"
                unoptimized
                className={ARC_HEADER_LOGO_IMG_CLASS}
              />
            </motion.div>
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="arc-nav-overlay"
            className={cn(
              "pointer-events-auto relative z-30 col-start-2 row-start-1 flex min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-self-end gap-2.5 self-center rounded-full border border-white/40 bg-black/55 px-4 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-black/65 sm:gap-3 sm:bg-black/25 sm:px-5 sm:py-3 sm:text-sm sm:backdrop-blur-md md:px-6 md:py-3.5 md:text-base",
              "xl:hidden",
            )}
          >
            {isMenuOpen ? "Close" : "Menu"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
              className={`size-5 shrink-0 transition-transform duration-300 sm:size-6 ${isMenuOpen ? "rotate-[135deg]" : "rotate-0"}`}
              aria-hidden
            >
              <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16Z" fill="currentColor" />
              <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      <ArcDesktopNav />
    </div>
  );
}
