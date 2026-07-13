/** Routes that should keep default Next.js navigation (no curtain / fade). */
const ARC_ROUTE_TRANSITION_EXCLUDED_PREFIXES = [
  "/admin",
  "/client-showcase",
  "/logodemov",
  "/sphere-demo",
] as const;

export function isArcRouteTransitionPath(pathname: string): boolean {
  if (!pathname) return false;
  return !ARC_ROUTE_TRANSITION_EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export type ParsedInternalHref = {
  pathname: string;
  hash: string;
};

/** Same-origin in-app href only — returns `null` for external, mailto, tel, or hash-only. */
export function parseInternalArcHref(href: string): ParsedInternalHref | null {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return null;
  }

  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    return { pathname: url.pathname, hash: url.hash };
  } catch {
    return null;
  }
}

export function shouldAnimateArcRouteChange(fromPath: string, toPath: string): boolean {
  if (fromPath === toPath) return false;
  if (!isArcRouteTransitionPath(fromPath) || !isArcRouteTransitionPath(toPath)) {
    return false;
  }
  return true;
}
