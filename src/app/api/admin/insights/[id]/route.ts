import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  getInsightEntries,
  getInsightEntryById,
  saveInsightEntries,
} from "@/lib/insightsStore";
import { revalidateInsightPaths } from "@/lib/insightsRevalidate";
import { validateInsightEntry } from "@/lib/insightsValidation";
import type { InsightEntry } from "@/content/pages/insights";

type RouteContext = { params: Promise<{ id: string }> };

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

export async function PUT(request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;
  const existing = getInsightEntries();
  const current = getInsightEntryById(id);
  if (!current) {
    return NextResponse.json({ error: "Entry not found." }, { status: 404 });
  }

  let payload: Partial<InsightEntry>;
  try {
    payload = (await request.json()) as Partial<InsightEntry>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validateInsightEntry({ ...current, ...payload, id: current.id }, existing, id);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const entries = existing.map((entry) => (entry.id === id ? validated.entry : entry));
  saveInsightEntries(entries);
  revalidateInsightPaths(entries);

  return NextResponse.json({ entry: validated.entry, entries });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await context.params;
  const existing = getInsightEntries();
  const current = getInsightEntryById(id);
  if (!current) {
    return NextResponse.json({ error: "Entry not found." }, { status: 404 });
  }

  const entries = existing.filter((entry) => entry.id !== id);
  saveInsightEntries(entries);
  revalidateInsightPaths(entries);

  return NextResponse.json({ ok: true, entries });
}
