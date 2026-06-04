import fs from "node:fs";
import path from "node:path";
import type { InsightEntry } from "@/content/pages/insights";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "insights-entries.json");

function parseEntries(raw: string): InsightEntry[] {
  const parsed = JSON.parse(raw) as InsightEntry[];
  if (!Array.isArray(parsed)) {
    throw new Error("insights-entries.json must contain an array");
  }
  return parsed;
}

/** Load blogs and case studies from `data/insights-entries.json`. */
export function getInsightEntries(): InsightEntry[] {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(
      "Missing data/insights-entries.json — run the dev server once or restore the file from the repo.",
    );
  }
  return parseEntries(fs.readFileSync(DATA_FILE, "utf8"));
}

export function saveInsightEntries(entries: InsightEntry[]): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}

export function getInsightEntryById(id: string): InsightEntry | undefined {
  return getInsightEntries().find((entry) => entry.id === id);
}
