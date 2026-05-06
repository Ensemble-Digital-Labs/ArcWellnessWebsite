"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import type Lenis from "lenis";
import { cn } from "@/lib/utils";
import { ARC_PAGE_RAIL_MAX } from "@/lib/arc-layout";
import { images } from "@/content/site";

/**
 * Logo fades out while the page is moving (past a small top offset). It fades back in with a fixed
 * eased duration when you’re near the top **or** scroll has settled — no translate bobbing, opacity-only.
 */
const LOGO_SHOW_BELOW_SCROLL_Y = 48;
/** Treat Lenis as “stopped” when |velocity| is below this (logo can show while moving if above threshold). */
const LOGO_VELOCITY_STOP_EPS = 0.022;
/**
 * Fade-in to full opacity uses fixed wall-clock duration so returns to the hero feel consistent.
 * (Per-frame lerp toward 1 near y≈0 used to read as an instant snap.)
 */
const LOGO_FADE_IN_DURATION_MS = 540;
/** Fade-out while scrolling — eased over time so it doesn’t “pop” off. */
const LOGO_FADE_OUT_DURATION_MS = 480;

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

/** Overlay / drawer / chrome — high enough to sit above pinned sections and modals below full-screen lightboxes. */
const NAV_STACK_OVERLAY = "z-[1000]";
const NAV_STACK_DRAWER = "z-[1001]";
const NAV_STACK_CHROME = "z-[1002]";

const NAV_LINKS = [
  { label: "About", href: "/#about", shape: "1", previewSrc: images.whoWeAre },
  { label: "Services", href: "/#services", shape: "2", previewSrc: images.services[0] },
  { label: "Your path", href: "/#path", shape: "3", previewSrc: images.services[2] },
  { label: "Invest in you", href: "/#book", shape: "4", previewSrc: images.investBanner },
  { label: "Contact", href: "/#contact", shape: "5", previewSrc: images.heroMedia },
] as const;

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

type NavLinkItem = (typeof NAV_LINKS)[number];

function ArcNavMenuLinkRow({
  item,
  reducedMotion,
  closeMenu,
  assignRef,
}: {
  item: NavLinkItem;
  reducedMotion: boolean;
  closeMenu: () => void;
  assignRef: (el: HTMLAnchorElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 280, damping: 32, mass: 0.55 });
  const springY = useSpring(py, { stiffness: 280, damping: 32, mass: 0.55 });
  const top = useTransform(springY, [0.5, -0.5], ["38%", "62%"]);
  const left = useTransform(springX, [0.5, -0.5], ["62%", "38%"]);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
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

  return (
    <li className="arc-nav-menu-item" data-shape={item.shape}>
      <Link
        ref={assignRef}
        href={item.href}
        onClick={closeMenu}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative flex items-center justify-between gap-4 overflow-visible border-b border-arc-charcoal/10 py-3 font-serif text-3xl font-semibold tracking-tight text-arc-charcoal transition-colors duration-300 last:border-b-0 hover:border-arc-teal/40 hover:text-arc-teal sm:py-4 sm:text-4xl"
      >
        {!reducedMotion ? (
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
          className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-0 scale-x-0 bg-arc-teal-muted/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
          aria-hidden
        />

        {reducedMotion ? (
          <>
            <span className="relative z-10 min-w-0 flex-1">{item.label}</span>
            <ArrowRight
              className="relative z-10 size-7 shrink-0 translate-x-2 text-arc-teal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:size-9"
              strokeWidth={1.75}
              aria-hidden
            />
          </>
        ) : (
          <motion.div
            className="relative z-10 flex w-full min-w-0 items-center justify-between gap-4"
            initial="initial"
            whileHover="hover"
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
    </li>
  );
}

/**
 * Centered logo + fullscreen slide-in menu (GSAP), ARC palette and section anchors.
 * Inspired by a Webflow-style overlay; uses standard GSAP easing (no CustomEase).
 */
export function ArcSiteHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const wasMenuOpened = useRef(false);
  const isMenuOpenRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const logoOpacity = useMotionValue(1);
  /** Fixed-duration fade-in after stop (`null` = not running). */
  const logoFadeInSessionRef = useRef<{ start: number; from: number } | null>(null);
  /** Eased fade-out while scrolling (`null` = idle / fully hidden). */
  const logoFadeOutSessionRef = useRef<{ start: number; from: number } | null>(null);

  isMenuOpenRef.current = isMenuOpen;

  useEffect(() => {
    if (isMenuOpen) {
      logoFadeInSessionRef.current = null;
      logoFadeOutSessionRef.current = null;
      logoOpacity.set(1);
    }
  }, [isMenuOpen, logoOpacity]);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let raf = 0;

    const tick = () => {
      if (cancelled) return;

      const o = logoOpacity.get();

      if (isMenuOpenRef.current) {
        logoFadeInSessionRef.current = null;
        logoFadeOutSessionRef.current = null;
        logoOpacity.set(1);
        raf = requestAnimationFrame(tick);
        return;
      }

      const lenis = getLocomotiveLenis();
      if (!lenis) {
        logoFadeOutSessionRef.current = null;
        if (o >= 0.999) {
          logoFadeInSessionRef.current = null;
          logoOpacity.set(1);
        } else {
          if (logoFadeInSessionRef.current === null) {
            logoFadeInSessionRef.current = {
              start: performance.now(),
              from: o,
            };
          }
          const sess = logoFadeInSessionRef.current;
          const t = Math.min(
            1,
            (performance.now() - sess.start) / LOGO_FADE_IN_DURATION_MS,
          );
          const eased = easeOutCubic(t);
          logoOpacity.set(sess.from + (1 - sess.from) * eased);
          if (t >= 1) logoFadeInSessionRef.current = null;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      const scroll = lenis.animatedScroll;
      const pastTop = scroll >= LOGO_SHOW_BELOW_SCROLL_Y;
      const isStopped = Math.abs(lenis.velocity) < LOGO_VELOCITY_STOP_EPS;
      const wantHidden = pastTop && !isStopped;

      if (wantHidden) {
        logoFadeInSessionRef.current = null;
        if (o <= 0.008) {
          logoFadeOutSessionRef.current = null;
          logoOpacity.set(0);
        } else {
          if (logoFadeOutSessionRef.current === null) {
            logoFadeOutSessionRef.current = {
              start: performance.now(),
              from: o,
            };
          }
          const sess = logoFadeOutSessionRef.current;
          const t = Math.min(
            1,
            (performance.now() - sess.start) / LOGO_FADE_OUT_DURATION_MS,
          );
          const eased = easeInOutQuad(t);
          logoOpacity.set(sess.from * (1 - eased));
          if (t >= 1) logoFadeOutSessionRef.current = null;
        }
      } else {
        /* Near top or scroll idle — same eased fade-in (avoids snap when crossing y < threshold). */
        logoFadeOutSessionRef.current = null;
        if (o >= 0.999) {
          logoFadeInSessionRef.current = null;
          logoOpacity.set(1);
        } else {
          if (logoFadeInSessionRef.current === null) {
            logoFadeInSessionRef.current = {
              start: performance.now(),
              from: o,
            };
          }
          const sess = logoFadeInSessionRef.current;
          const t = Math.min(
            1,
            (performance.now() - sess.start) / LOGO_FADE_IN_DURATION_MS,
          );
          const eased = easeOutCubic(t);
          logoOpacity.set(sess.from + (1 - sess.from) * eased);
          if (t >= 1) logoFadeInSessionRef.current = null;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, logoOpacity]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const overlay = overlayRef.current;
    const menu = menuRef.current;
    const backdrop = backdropRef.current;
    if (!overlay || !menu || !backdrop) return;
    const strips = backdrop.querySelectorAll<HTMLElement>(".arc-nav-backdrop-strip");
    const links = menuLinksRef.current.filter(Boolean);
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(menu, { xPercent: 100 });
    gsap.set(strips, { xPercent: 101 });
    if (links.length) gsap.set(links, { yPercent: 110, opacity: 0, rotate: 6 });
  }, [reducedMotion]);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    if (isMenuOpen) {
      main.style.overflow = "hidden";
    } else {
      main.style.overflow = "";
    }
    return () => {
      main.style.overflow = "";
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

  return (
    <div ref={containerRef}>
      <div
        ref={overlayRef}
        id="arc-nav-overlay"
        className={cn("fixed inset-0 bg-black/55", NAV_STACK_OVERLAY)}
        aria-hidden={!isMenuOpen}
        onClick={closeMenu}
      />

      <nav
        ref={menuRef}
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-y-0 right-0 flex max-h-[100dvh] w-full max-w-[min(100vw,28rem)] flex-col bg-arc-cream text-arc-charcoal shadow-[-12px_0_40px_rgba(0,0,0,0.12)] sm:max-w-[min(100vw,32rem)]",
          NAV_STACK_DRAWER,
        )}
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

        <div className="relative z-10 flex min-h-0 flex-1 flex-col px-8 pb-12 pt-28 sm:px-10 sm:pt-32">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((item, i) => (
              <ArcNavMenuLinkRow
                key={item.href}
                item={item}
                reducedMotion={reducedMotion}
                closeMenu={closeMenu}
                assignRef={(el) => {
                  menuLinksRef.current[i] = el;
                }}
              />
            ))}
          </ul>
        </div>
      </nav>

      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 flex w-full justify-center bg-transparent",
          NAV_STACK_CHROME,
        )}
      >
        <div
          className={cn(
            "pointer-events-none relative mx-auto flex w-full justify-center",
            ARC_PAGE_RAIL_MAX,
          )}
        >
          <Link
            href="/"
            className="pointer-events-auto inline-flex h-32 w-fit shrink-0 items-center justify-center bg-transparent px-4 sm:h-40 sm:px-6 md:h-44 lg:h-48"
            aria-label="ARC Wellness home"
          >
            {reducedMotion ? (
              <Image
                src={images.logo}
                alt="ARC Wellness"
                width={720}
                height={240}
                priority
                placeholder="empty"
                unoptimized
                className="arc-header-logo h-full w-auto max-w-[min(88vw,380px)] object-contain object-center sm:max-w-[min(78vw,520px)] md:max-w-[min(70vw,600px)] lg:max-w-[min(58vw,680px)]"
              />
            ) : (
              <motion.div
                className="inline-flex h-full w-auto max-w-[min(88vw,380px)] sm:max-w-[min(78vw,520px)] md:max-w-[min(70vw,600px)] lg:max-w-[min(58vw,680px)]"
                style={{ opacity: logoOpacity }}
              >
                <Image
                  src={images.logo}
                  alt="ARC Wellness"
                  width={720}
                  height={240}
                  priority
                  placeholder="empty"
                  unoptimized
                  className="arc-header-logo h-full w-auto max-w-[min(88vw,380px)] object-contain object-center sm:max-w-[min(78vw,520px)] md:max-w-[min(70vw,600px)] lg:max-w-[min(58vw,680px)]"
                />
              </motion.div>
            )}
          </Link>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="arc-nav-overlay"
            className="pointer-events-auto absolute right-4 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center gap-3.5 rounded-full border border-white/40 bg-black/25 px-5 py-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-colors hover:bg-black/40 sm:right-6 sm:gap-4 sm:px-6 sm:py-3.5 sm:text-base md:right-10"
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
    </div>
  );
}
