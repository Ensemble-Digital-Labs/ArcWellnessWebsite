/**
 * Blog slugs ready to show. Others stay off the feed, sitemap, and article route.
 * `null` = show every blog.
 */
export const PUBLISHED_BLOG_SLUGS: ReadonlySet<string> | null = new Set([
  "holiday-plate-healthy-holiday-eating",
  "gratitude-connection-and-longevity",
  "blood-sugar-isnt-just-about-diabetes",
  "insulin-resistance-signs-symptoms",
  "hormones-through-the-decades-st-louis-mo",
  "understanding-chronic-inflammation",
  "is-your-gut-trying-to-tell-you-something",
  "why-youre-tired-even-when-your-labs-are-normal",
  "hair-loss-on-a-glp-1-explained",
  "nervous-system-dysregulation-symptoms-causes-healing",
  "the-skinny-on-fiber",
  "all-calories-arent-created-equal",
  "not-all-preservatives-are-created-equal",
  "winter-blues-seasonal-mood-changes",
  "why-sleep-matters-for-your-health",
  "your-skin-is-talking",
  "what-is-functional-health",
]);

export function isPublishedBlog(slug: string): boolean {
  if (PUBLISHED_BLOG_SLUGS === null) return true;
  return PUBLISHED_BLOG_SLUGS.has(slug);
}
