import fs from "node:fs";
import path from "node:path";
import type {
  ClientReviewDocument,
  ClientReviewSectionPatch,
} from "@/lib/clientReviewTypes";

const DATA_FILE = path.join(process.cwd(), "data", "client-review.json");

function parseDocument(raw: string): ClientReviewDocument {
  const parsed = JSON.parse(raw) as ClientReviewDocument;
  if (!parsed?.pages || !Array.isArray(parsed.pages)) {
    throw new Error("client-review.json must contain a pages array");
  }
  return parsed;
}

export function getClientReviewDocument(): ClientReviewDocument {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(
      "Missing data/client-review.json — run: npm run review:import",
    );
  }
  return parseDocument(fs.readFileSync(DATA_FILE, "utf8"));
}

export function saveClientReviewDocument(doc: ClientReviewDocument): void {
  fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
  doc.meta.updatedAt = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
}

export function patchClientReviewSection(
  pageId: string,
  sectionId: string,
  patch: ClientReviewSectionPatch,
): ClientReviewDocument {
  const doc = getClientReviewDocument();
  const page = doc.pages.find((p) => p.id === pageId);
  if (!page) throw new Error(`Unknown page: ${pageId}`);

  const section = page.sections.find((s) => s.id === sectionId);
  if (!section) throw new Error(`Unknown section: ${sectionId}`);

  Object.assign(section, patch);
  saveClientReviewDocument(doc);
  return doc;
}
