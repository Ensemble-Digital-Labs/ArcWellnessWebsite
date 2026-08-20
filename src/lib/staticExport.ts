/**
 * True when building the GoDaddy/cPanel static export (`GODADDY_STATIC=1`).
 * Use for build-time decisions (preload URLs, metadata). Client code should prefer
 * `NEXT_PUBLIC_STATIC_EXPORT` which is set by the GoDaddy build script.
 */
export const isGodaddyStaticBuild = process.env.GODADDY_STATIC === "1";

/** Client + server: static hosting has no `/_next/image` optimizer. */
export const isStaticExport =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "1" || isGodaddyStaticBuild;
