import type { InsightEntry, InsightKind } from "@/content/pages/insights";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function parseBodyParagraphs(bodyText: string): string[] {
  return bodyText
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function serializeBodyParagraphs(body: readonly string[]): string {
  return body.join("\n\n");
}

export function validateInsightEntry(
  entry: Partial<InsightEntry>,
  existing: InsightEntry[],
  editingId?: string,
): { ok: true; entry: InsightEntry } | { ok: false; error: string } {
  const kind = entry.kind;
  if (kind !== "blog" && kind !== "case-study") {
    return { ok: false, error: "Kind must be blog or case-study." };
  }

  const title = entry.title?.trim() ?? "";
  const slug = (entry.slug?.trim() || slugifyTitle(title)).toLowerCase();
  const excerpt = entry.excerpt?.trim() ?? "";
  const publishedAt = entry.publishedAt?.trim() ?? "";
  const imageSrc = entry.imageSrc?.trim() ?? "";
  const imageAlt = entry.imageAlt?.trim() ?? "";
  const body = Array.isArray(entry.body)
    ? entry.body.map((p) => p.trim()).filter(Boolean)
    : parseBodyParagraphs(String(entry.body ?? ""));

  if (!title) return { ok: false, error: "Title is required." };
  if (!SLUG_PATTERN.test(slug)) {
    return { ok: false, error: "Slug must use lowercase letters, numbers, and hyphens." };
  }
  if (!excerpt) return { ok: false, error: "Excerpt is required." };
  if (!publishedAt) return { ok: false, error: "Published date is required." };
  if (!imageSrc.startsWith("/")) {
    return { ok: false, error: "Image path must start with / (e.g. /assets/...)." };
  }
  if (!imageAlt) return { ok: false, error: "Image alt text is required." };
  if (body.length === 0) return { ok: false, error: "Body must include at least one paragraph." };

  const duplicateSlug = existing.some(
    (item) => item.kind === kind && item.slug === slug && item.id !== editingId,
  );
  if (duplicateSlug) {
    return { ok: false, error: `Another ${kind} post already uses slug “${slug}”.` };
  }

  const id = editingId?.trim() || entry.id?.trim() || `${kind}-${slug}`.slice(0, 80);

  return {
    ok: true,
    entry: {
      id,
      kind: kind as InsightKind,
      slug,
      title,
      excerpt,
      publishedAt,
      imageSrc,
      imageAlt,
      body,
      // Preserve typed article layout when admin edits metadata/body text.
      ...(entry.article ? { article: entry.article } : {}),
      ...(entry.seo ? { seo: entry.seo } : {}),
      ...(entry.titleLines?.length
        ? { titleLines: entry.titleLines.map((l) => String(l).trim()).filter(Boolean) }
        : {}),
    },
  };
}
