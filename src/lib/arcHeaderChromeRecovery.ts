"use client";

import { gsap } from "gsap";

export const ARC_HEADER_CHROME_RESET_EVENT = "arc-header-chrome-reset";

/** Imperative fallback — clears GSAP inline styles that block clicks after bfcache. */
export function forceCloseArcHeaderChromeDom() {
  if (typeof document === "undefined") return;

  const overlay = document.getElementById("arc-nav-overlay");
  const menu = document.getElementById("arc-nav-mobile-drawer");

  if (overlay) {
    gsap.killTweensOf(overlay);
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    overlay.style.pointerEvents = "none";
    overlay.style.visibility = "hidden";
    overlay.style.opacity = "0";
  }

  if (menu) {
    gsap.killTweensOf(menu);
    gsap.set(menu, { xPercent: 100 });
    menu.removeAttribute("inert");
  }

  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  const main = document.getElementById("main");
  if (main) main.style.overflow = "";
}

export function resetArcHeaderChrome() {
  forceCloseArcHeaderChromeDom();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ARC_HEADER_CHROME_RESET_EVENT));
  }
}
