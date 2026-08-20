const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://arcwellness.net";

export function isBookingUrl(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed) return false;

  if (/mangomint\.com/i.test(trimmed)) return true;

  // Relative paths are always on-site — never treat them as Mangomint on SSR.
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return false;

  try {
    const base =
      typeof window !== "undefined" ? window.location.origin : SITE_ORIGIN;
    return new URL(trimmed, base).hostname.includes("mangomint.com");
  } catch {
    return false;
  }
}

/** External booking should open a new tab so Lenis / menu state on ARC is not frozen in bfcache. */
export function bookingLinkExternalProps(href: string) {
  if (!isBookingUrl(href)) return {};
  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
