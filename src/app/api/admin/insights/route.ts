import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getInsightEntries, saveInsightEntries } from "@/lib/insightsStore";
import { revalidateInsightPaths } from "@/lib/insightsRevalidate";
import { validateInsightEntry } from "@/lib/insightsValidation";
import type { InsightEntry } from "@/content/pages/insights";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json({ entries: getInsightEntries() });
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const existing = getInsightEntries();
  let payload: Partial<InsightEntry>;
  try {
    payload = (await request.json()) as Partial<InsightEntry>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validateInsightEntry(payload, existing);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const entries = [validated.entry, ...existing];
  saveInsightEntries(entries);
  revalidateInsightPaths(entries);

  return NextResponse.json({ entry: validated.entry, entries });
}
