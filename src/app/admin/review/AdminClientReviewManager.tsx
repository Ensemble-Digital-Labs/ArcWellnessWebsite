"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type {
  ClientReviewDocument,
  ClientReviewPage,
  ClientReviewSection,
  ClientReviewSectionPatch,
} from "@/lib/clientReviewTypes";
import {
  CLIENT_REVIEW_IMPL_OPTIONS,
  CLIENT_REVIEW_PRIORITY_OPTIONS,
  CLIENT_REVIEW_STATUS_OPTIONS,
} from "@/lib/clientReviewTypes";
import {
  CLIENT_REVIEW_NOTE_TEMPLATE,
  parseReviewNoteSections,
} from "@/lib/clientReviewNoteFormat";
import { cn } from "@/lib/utils";

type SectionDraft = ClientReviewSection;

function implBadgeClass(status: string) {
  switch (status) {
    case "Done":
      return "bg-emerald-100 text-emerald-900";
    case "In Progress":
      return "bg-amber-100 text-amber-950";
    case "Deferred":
      return "bg-slate-200 text-slate-800";
    default:
      return "bg-arc-charcoal/8 text-arc-charcoal/70";
  }
}

function ReviewField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-arc-charcoal/55">
        {label}
      </span>
      {children}
    </label>
  );
}

const fieldClass =
  "w-full rounded-lg border border-arc-charcoal/12 bg-white px-3 py-2 text-sm text-arc-charcoal shadow-sm outline-none transition focus:border-arc-teal/50 focus:ring-2 focus:ring-arc-teal/20";

function ImplementationNotePreview({ notes }: { notes: string }) {
  const parsed = useMemo(() => parseReviewNoteSections(notes), [notes]);
  const hasStructured =
    parsed.CHANGED.length > 0 ||
    parsed.BLOCKED.length > 0 ||
    parsed["NOT CHANGED"].length > 0;

  if (!notes.trim()) {
    return (
      <p className="mt-2 text-xs italic text-arc-charcoal/45">No implementation notes yet.</p>
    );
  }

  if (!hasStructured) {
    return (
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-arc-charcoal/65">{notes}</p>
    );
  }

  return (
    <div className="mt-2 space-y-2 text-xs leading-relaxed">
      {parsed.CHANGED.length > 0 ? (
        <div>
          <p className="font-semibold uppercase tracking-wide text-emerald-800">Changed</p>
          <ul className="mt-0.5 list-inside list-disc text-arc-charcoal/75">
            {parsed.CHANGED.slice(0, 3).map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
            {parsed.CHANGED.length > 3 ? (
              <li className="list-none text-arc-charcoal/45">+{parsed.CHANGED.length - 3} more…</li>
            ) : null}
          </ul>
        </div>
      ) : null}
      {parsed.BLOCKED.length > 0 ? (
        <div>
          <p className="font-semibold uppercase tracking-wide text-amber-900">Blocked</p>
          <ul className="mt-0.5 list-inside list-disc text-arc-charcoal/75">
            {parsed.BLOCKED.slice(0, 2).map((item) => (
              <li key={item.slice(0, 40)}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function SectionCard({
  pageId,
  section,
  onPatch,
  saveState,
}: {
  pageId: string;
  section: SectionDraft;
  onPatch: (pageId: string, sectionId: string, patch: ClientReviewSectionPatch) => void;
  saveState: "idle" | "saving" | "saved" | "error";
}) {
  const [open, setOpen] = useState(
    section.implementationStatus === "In Progress" ||
      section.status === "Needs Changes",
  );

  const queuePatch = (patch: ClientReviewSectionPatch) => {
    onPatch(pageId, section.id, patch);
  };

  return (
    <article className="rounded-xl border border-arc-charcoal/10 bg-white/90 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
      >
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-semibold leading-snug text-arc-charcoal">
            {section.section}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {section.status ? (
              <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-rose-900">
                {section.status}
              </span>
            ) : null}
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide",
                implBadgeClass(section.implementationStatus),
              )}
            >
              {section.implementationStatus || "Not Started"}
            </span>
            {section.priority ? (
              <span className="rounded-full bg-arc-teal-muted/60 px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-arc-teal-ink">
                {section.priority}
              </span>
            ) : null}
          </div>
          <ImplementationNotePreview notes={section.implementationNotes} />
        </div>
        <span className="shrink-0 pt-1 text-xs text-arc-charcoal/45">{open ? "−" : "+"}</span>
      </button>

      {open ? (
        <div className="space-y-4 border-t border-arc-charcoal/8 px-4 pb-5 pt-4 sm:px-5">
          {section.currentContent ? (
            <div>
              <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-arc-charcoal/55">
                Current content (reference)
              </p>
              <p className="max-h-36 overflow-y-auto rounded-lg bg-arc-cream/80 p-3 text-sm leading-relaxed text-arc-charcoal/80">
                {section.currentContent}
              </p>
            </div>
          ) : null}

          <ReviewField label="Client feedback">
            <textarea
              rows={4}
              className={cn(fieldClass, "resize-y")}
              value={section.feedback}
              onChange={(e) => queuePatch({ feedback: e.target.value })}
            />
          </ReviewField>

          <div className="grid gap-4 sm:grid-cols-3">
            <ReviewField label="Client status">
              <select
                className={fieldClass}
                value={section.status}
                onChange={(e) => queuePatch({ status: e.target.value })}
              >
                {CLIENT_REVIEW_STATUS_OPTIONS.map((opt) => (
                  <option key={opt || "empty"} value={opt}>
                    {opt || ""}
                  </option>
                ))}
              </select>
            </ReviewField>

            <ReviewField label="Priority">
              <select
                className={fieldClass}
                value={section.priority}
                onChange={(e) => queuePatch({ priority: e.target.value })}
              >
                {CLIENT_REVIEW_PRIORITY_OPTIONS.map((opt) => (
                  <option key={opt || "empty"} value={opt}>
                    {opt || ""}
                  </option>
                ))}
              </select>
            </ReviewField>

            <ReviewField label="Implementation status">
              <select
                className={fieldClass}
                value={section.implementationStatus}
                onChange={(e) => queuePatch({ implementationStatus: e.target.value })}
              >
                {CLIENT_REVIEW_IMPL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </ReviewField>
          </div>

          <ReviewField label="Implementation notes (exports to Excel column H)">
            <div className="mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-md border border-arc-charcoal/12 bg-arc-cream/80 px-2.5 py-1 text-[0.68rem] font-medium text-arc-charcoal/70 hover:bg-arc-cream"
                onClick={() =>
                  queuePatch({
                    implementationNotes:
                      section.implementationNotes.trim() || CLIENT_REVIEW_NOTE_TEMPLATE,
                  })
                }
              >
                Insert template
              </button>
            </div>
            <textarea
              rows={12}
              className={cn(fieldClass, "resize-y font-mono text-[0.8125rem] leading-relaxed")}
              placeholder={CLIENT_REVIEW_NOTE_TEMPLATE}
              value={section.implementationNotes}
              onChange={(e) => queuePatch({ implementationNotes: e.target.value })}
            />
            <p className="mt-1.5 text-[0.68rem] leading-relaxed text-arc-charcoal/50">
              Use CHANGED / NOT CHANGED / BLOCKED / FILES, each bullet exports to the Excel
              Implementation Notes cell for this row.
            </p>
          </ReviewField>

          {saveState === "saving" ? (
            <p className="text-xs text-arc-charcoal/50">Saving…</p>
          ) : saveState === "saved" ? (
            <p className="text-xs text-emerald-700">Saved</p>
          ) : saveState === "error" ? (
            <p className="text-xs text-rose-700">Could not save, retry by editing a field.</p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function AdminClientReviewManager({
  initialDoc,
}: {
  initialDoc: ClientReviewDocument;
}) {
  const router = useRouter();
  const [doc, setDoc] = useState(initialDoc);
  const [activePageId, setActivePageId] = useState(initialDoc.pages[0]?.id ?? "");
  const [implFilter, setImplFilter] = useState<string>("all");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const saveTimers = useRef<Map<string, number>>(new Map());
  const pendingPatches = useRef<Map<string, ClientReviewSectionPatch>>(new Map());

  const activePage = useMemo(
    () => doc.pages.find((p) => p.id === activePageId) ?? doc.pages[0],
    [doc.pages, activePageId],
  );

  const stats = useMemo(() => {
    const all = doc.pages.flatMap((p) => p.sections);
    return {
      total: all.length,
      done: all.filter((s) => s.implementationStatus === "Done").length,
      inProgress: all.filter((s) => s.implementationStatus === "In Progress").length,
      notStarted: all.filter((s) => s.implementationStatus === "Not Started").length,
    };
  }, [doc.pages]);

  const filteredSections = useMemo(() => {
    if (!activePage) return [];
    if (implFilter === "all") return activePage.sections;
    return activePage.sections.filter((s) => s.implementationStatus === implFilter);
  }, [activePage, implFilter]);

  const flushSave = useCallback(async (pageId: string, sectionId: string) => {
    const key = `${pageId}:${sectionId}`;
    const patch = pendingPatches.current.get(key);
    if (!patch) return;

    pendingPatches.current.delete(key);
    setSaveState("saving");

    try {
      const response = await fetch("/api/admin/review", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, sectionId, patch }),
      });
      const data = (await response.json()) as { error?: string; meta?: ClientReviewDocument["meta"] };
      if (!response.ok) {
        setSaveState("error");
        setError(data.error ?? "Save failed.");
        return;
      }
      if (data.meta) {
        setDoc((prev) => ({ ...prev, meta: data.meta! }));
      }
      setSaveState("saved");
      setError("");
    } catch {
      setSaveState("error");
      setError("Could not reach the server.");
    }
  }, []);

  const queuePatch = useCallback(
    (pageId: string, sectionId: string, patch: ClientReviewSectionPatch) => {
      setDoc((prev) => ({
        ...prev,
        pages: prev.pages.map((page) =>
          page.id !== pageId
            ? page
            : {
                ...page,
                sections: page.sections.map((section) =>
                  section.id === sectionId ? { ...section, ...patch } : section,
                ),
              },
        ),
      }));

      const key = `${pageId}:${sectionId}`;
      pendingPatches.current.set(key, {
        ...pendingPatches.current.get(key), ...patch,
      });

      const existing = saveTimers.current.get(key);
      if (existing) window.clearTimeout(existing);
      saveTimers.current.set(
        key,
        window.setTimeout(() => {
          void flushSave(pageId, sectionId);
        }, 700),
      );
    },
    [flushSave],
  );

  useEffect(() => {
    const timers = saveTimers.current;
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers.clear();
    };
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleExport() {
    setExporting(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/admin/review?action=export", { method: "POST" });
      const data = (await response.json()) as { error?: string; path?: string };
      if (!response.ok) {
        setError(data.error ?? "Export failed.");
        return;
      }
      setMessage(`Excel updated: ${data.path ?? "ARC_Wellness_Website_Review.xlsx"}`);
    } catch {
      setError("Could not export to Excel.");
    } finally {
      setExporting(false);
    }
  }

  function pageCounts(page: ClientReviewPage) {
    const done = page.sections.filter((s) => s.implementationStatus === "Done").length;
    return `${done}/${page.sections.length}`;
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col px-5 py-10 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-arc-charcoal/10 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-arc-charcoal/55">
            Client feedback tracker
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold">Website review</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-arc-charcoal/70">
            Edit feedback and implementation status in real time while you change the site.
            Changes auto-save to{" "}
            <code className="rounded bg-arc-charcoal/5 px-1.5 py-0.5 text-xs">
              data/client-review.json
            </code>
            . Export when you want the Excel file updated.
          </p>
          <p className="mt-2 text-xs text-arc-charcoal/50">
            Source: {doc.meta.sourceFile}
            {doc.meta.lastExportedAt
              ? ` · Excel last exported ${new Date(doc.meta.lastExportedAt).toLocaleString()}`
              : " · Not exported to Excel yet"}
            {" · "}
            {stats.done} done · {stats.inProgress} in progress · {stats.notStarted} not started
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/insights"
            className="rounded-full border border-arc-charcoal/15 px-4 py-2 text-sm font-medium hover:bg-white"
          >
            Insights
          </Link>
          <button
            type="button"
            onClick={() => void handleExport()}
            disabled={exporting}
            className="rounded-full bg-arc-teal px-4 py-2 text-sm font-semibold text-white hover:bg-arc-teal-ink disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Export to Excel"}
          </button>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="rounded-full border border-arc-charcoal/15 px-4 py-2 text-sm font-medium hover:bg-white"
          >
            Log out
          </button>
        </div>
      </div>

      {message ? (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{message}</p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-900">{error}</p>
      ) : null}

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-arc-charcoal/55">
            Pages
          </p>
          <nav className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {doc.pages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => setActivePageId(page.id)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-2 text-left text-sm transition lg:w-full",
                  page.id === activePage?.id
                    ? "bg-arc-teal text-white"
                    : "bg-white text-arc-charcoal hover:bg-arc-cream",
                )}
              >
                <span className="block font-medium">{page.label}</span>
                <span
                  className={cn(
                    "text-xs",
                    page.id === activePage?.id ? "text-white/80" : "text-arc-charcoal/50",
                  )}
                >
                  {pageCounts(page)} done
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          {activePage ? (
            <>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-serif text-2xl font-semibold">{activePage.label}</h2>
                  {activePage.url ? (
                    <a
                      href={activePage.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm text-arc-teal-ink underline-offset-2 hover:underline"
                    >
                      {activePage.url}
                    </a>
                  ) : null}
                </div>
                <select
                  className={cn(fieldClass, "w-auto min-w-[10rem]")}
                  value={implFilter}
                  onChange={(e) => setImplFilter(e.target.value)}
                >
                  <option value="all">All sections</option>
                  {CLIENT_REVIEW_IMPL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                {filteredSections.map((section) => (
                  <SectionCard
                    key={section.id}
                    pageId={activePage.id}
                    section={section}
                    onPatch={queuePatch}
                    saveState={saveState}
                  />
                ))}
                {filteredSections.length === 0 ? (
                  <p className="text-sm text-arc-charcoal/60">No sections match this filter.</p>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
