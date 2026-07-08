import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  exportClientReviewToXlsx,
  getClientReviewDocument,
  patchClientReviewSection,
} from "@/lib/clientReviewStore";
import type { ClientReviewSectionPatch } from "@/lib/clientReviewTypes";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  return NextResponse.json(getClientReviewDocument());
}

export async function PATCH(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: {
    pageId?: string;
    sectionId?: string;
    patch?: ClientReviewSectionPatch;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { pageId, sectionId, patch } = body;
  if (!pageId || !sectionId || !patch) {
    return NextResponse.json(
      { error: "pageId, sectionId, and patch are required." },
      { status: 400 },
    );
  }

  try {
    const doc = patchClientReviewSection(pageId, sectionId, patch);
    return NextResponse.json({ ok: true, meta: doc.meta });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const url = new URL(request.url);
  if (url.searchParams.get("action") !== "export") {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }

  try {
    const { path: xlsxPath } = exportClientReviewToXlsx();
    return NextResponse.json({ ok: true, path: xlsxPath });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Export failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
