"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AdminInsightImageField } from "@/app/admin/insights/AdminInsightImageField";
import type { InsightEntry, InsightKind } from "@/content/pages/insights";
import { insightHref } from "@/content/pages/insights";
import {
  serializeBodyParagraphs,
  slugifyTitle,
} from "@/lib/insightsValidation";
import { cn } from "@/lib/utils";

type Draft = {
  id: string;
  kind: InsightKind;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  imageSrc: string;
  imageAlt: string;
  bodyText: string;
};

function entryToDraft(entry: InsightEntry): Draft {
  return {
    id: entry.id,
    kind: entry.kind,
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    publishedAt: entry.publishedAt,
    imageSrc: entry.imageSrc,
    imageAlt: entry.imageAlt,
    bodyText: serializeBodyParagraphs(entry.body),
  };
}

function emptyDraft(kind: InsightKind = "blog"): Draft {
  return {
    id: "",
    kind,
    slug: "",
    title: "",
    excerpt: "",
    publishedAt: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date()),
    imageSrc: "/assets/sections/clinic-interiors/consultation-lounge-seating.webp",
    imageAlt: "",
    bodyText: "",
  };
}

function draftToPayload(draft: Draft) {
  return {
    id: draft.id || undefined,
    kind: draft.kind,
    slug: draft.slug || slugifyTitle(draft.title),
    title: draft.title,
    excerpt: draft.excerpt,
    publishedAt: draft.publishedAt,
    imageSrc: draft.imageSrc,
    imageAlt: draft.imageAlt,
    body: draft.bodyText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
  };
}

export function AdminInsightsManager({
  initialEntries,
}: {
  initialEntries: InsightEntry[];
}) {
  const router = useRouter();
  const [entries, setEntries] = useState(initialEntries);
  const [selectedId, setSelectedId] = useState<string | null>(initialEntries[0]?.id ?? null);
  const [draft, setDraft] = useState<Draft>(
    initialEntries[0] ? entryToDraft(initialEntries[0]) : emptyDraft(),
  );
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => a.title.localeCompare(b.title)),
    [entries],
  );

  function selectEntry(entry: InsightEntry) {
    setIsNew(false);
    setSelectedId(entry.id);
    setDraft(entryToDraft(entry));
    setMessage("");
    setError("");
  }

  function startNew(kind: InsightKind) {
    const next = emptyDraft(kind);
    setIsNew(true);
    setSelectedId(null);
    setDraft(next);
    setMessage("");
    setError("");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleSave() {
    setPending(true);
    setError("");
    setMessage("");

    try {
      const payload = draftToPayload(draft);
      const response = await fetch(
        isNew ? "/api/admin/insights" : `/api/admin/insights/${selectedId}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await response.json()) as {
        error?: string;
        entries?: InsightEntry[];
        entry?: InsightEntry;
      };

      if (!response.ok) {
        setError(data.error ?? "Could not save entry.");
        return;
      }

      const nextEntries = data.entries ?? entries;
      setEntries(nextEntries);
      const saved = data.entry!;
      setSelectedId(saved.id);
      setDraft(entryToDraft(saved));
      setIsNew(false);
      setMessage("Saved. Public pages will refresh on next visit.");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setPending(false);
    }
  }

  async function handleDelete() {
    if (!selectedId || isNew) return;
    if (!window.confirm("Delete this post? This cannot be undone.")) return;

    setPending(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/insights/${selectedId}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string; entries?: InsightEntry[] };
      if (!response.ok) {
        setError(data.error ?? "Could not delete entry.");
        return;
      }

      const nextEntries = data.entries ?? [];
      setEntries(nextEntries);
      const first = nextEntries[0];
      if (first) selectEntry(first);
      else {
        setIsNew(true);
        setSelectedId(null);
        setDraft(emptyDraft());
      }
      setMessage("Deleted.");
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-5 py-10 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-arc-charcoal/10 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-arc-charcoal">
            Content management
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">Insights posts</h1>
          <p className="mt-2 max-w-xl text-sm text-arc-charcoal/65">
            Edit blogs and case studies shown on{" "}
            <Link href="/library/education" className="underline underline-offset-2">
              /library/education
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/review"
            className="rounded-full border border-arc-charcoal/15 bg-white px-4 py-2 text-sm font-medium hover:border-arc-teal/30"
          >
            Client review
          </Link>
          <button
            type="button"
            onClick={() => startNew("blog")}
            className="rounded-full border border-arc-charcoal/15 bg-white px-4 py-2 text-sm font-medium hover:border-arc-teal/30"
          >
            + New blog
          </button>
          <button
            type="button"
            onClick={() => startNew("case-study")}
            className="rounded-full border border-arc-charcoal/15 bg-white px-4 py-2 text-sm font-medium hover:border-arc-teal/30"
          >
            + New case study
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full px-4 py-2 text-sm font-medium text-arc-charcoal/60 hover:text-arc-charcoal"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-8 grid flex-1 gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <aside className="space-y-2">
          {sortedEntries.map((entry) => {
            const active = entry.id === selectedId && !isNew;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => selectEntry(entry)}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                  active
                    ? "border-arc-teal/35 bg-white shadow-sm"
                    : "border-arc-charcoal/10 bg-white/70 hover:border-arc-charcoal/20",
                )}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-arc-charcoal/45">
                  {entry.kind === "blog" ? "Blog" : "Case study"}
                </p>
                <p className="mt-1 font-medium leading-snug text-arc-charcoal">{entry.title}</p>
                <p className="mt-1 text-xs text-arc-charcoal/50">{entry.publishedAt}</p>
              </button>
            );
          })}
          {sortedEntries.length === 0 ? (
            <p className="text-sm text-arc-charcoal/55">No posts yet. Create one above.</p>
          ) : null}
        </aside>

        <section className="rounded-2xl border border-arc-charcoal/10 bg-white p-5 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-2xl font-semibold">
              {isNew ? "New post" : "Edit post"}
            </h2>
            {!isNew && selectedId ? (
              <Link
                href={insightHref({ kind: draft.kind, slug: draft.slug })}
                className="text-sm font-medium text-arc-charcoal underline-offset-2 hover:underline"
                target="_blank"
              >
                View live →
              </Link>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium">Title</span>
              <input
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    title: e.target.value,
                    slug: d.slug || slugifyTitle(e.target.value),
                  }))
                }
                className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Type</span>
              <select
                value={draft.kind}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, kind: e.target.value as InsightKind }))
                }
                className="w-full rounded-xl border border-arc-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
              >
                <option value="blog">Blog</option>
                <option value="case-study">Case study</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Published date</span>
              <input
                value={draft.publishedAt}
                onChange={(e) => setDraft((d) => ({ ...d, publishedAt: e.target.value }))}
                placeholder="12 May 2026"
                className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium">URL slug</span>
              <input
                value={draft.slug}
                onChange={(e) => setDraft((d) => ({ ...d, slug: slugifyTitle(e.target.value) }))}
                className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium">Excerpt</span>
              <textarea
                value={draft.excerpt}
                onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))}
                rows={3}
                className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
              />
            </label>

            <AdminInsightImageField
              imageSrc={draft.imageSrc}
              imageAlt={draft.imageAlt}
              nameHint={draft.slug || slugifyTitle(draft.title)}
              onImageSrcChange={(value) => setDraft((d) => ({ ...d, imageSrc: value }))}
              onImageAltChange={(value) => setDraft((d) => ({ ...d, imageAlt: value }))}
            />

            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-medium">Body</span>
              <span className="mb-2 block text-xs text-arc-charcoal/50">
                Separate paragraphs with a blank line.
              </span>
              <textarea
                value={draft.bodyText}
                onChange={(e) => setDraft((d) => ({ ...d, bodyText: e.target.value }))}
                rows={12}
                className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm leading-relaxed outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
              />
            </label>
          </div>

          {error ? (
            <p className="mt-5 text-sm font-medium text-red-700" role="alert">
              {error}
            </p>
          ) : null}
          {message ? (
            <p className="mt-5 text-sm font-medium text-arc-charcoal" role="status">
              {message}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={pending}
              className="rounded-full bg-arc-charcoal px-6 py-3 text-sm font-semibold text-white hover:bg-arc-charcoal/90 disabled:opacity-60"
            >
              {pending ? "Saving…" : "Save changes"}
            </button>
            {!isNew && selectedId ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="rounded-full border border-red-300/60 px-6 py-3 text-sm font-semibold text-red-800 hover:bg-red-50 disabled:opacity-60"
              >
                Delete
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
