/**
 * Implementation notes for `/admin/review` and Excel export.
 *
 * Excel columns (Home row 8 headers):
 *   G — Implementation Status
 *   H — Changed (one bullet per line)
 *   I — Blocked (one bullet per line)
 *
 * NOT CHANGED and FILES stay in admin JSON only — not written to Excel.
 */
export const CLIENT_REVIEW_NOTE_TEMPLATE = `CHANGED:
• 

BLOCKED:
• `;

export function parseReviewNoteSections(notes: string) {
  const sections: Record<string, string[]> = {
    CHANGED: [],
    "NOT CHANGED": [],
    BLOCKED: [],
    FILES: [],
  };
  let current: keyof typeof sections | null = null;

  for (const rawLine of notes.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const header = line.replace(/:$/, "").toUpperCase();
    if (header === "CHANGED") {
      current = "CHANGED";
      continue;
    }
    if (header === "NOT CHANGED" || header === "NOT CHANGED:") {
      current = "NOT CHANGED";
      continue;
    }
    if (header === "BLOCKED") {
      current = "BLOCKED";
      continue;
    }
    if (header === "FILES") {
      current = "FILES";
      continue;
    }
    if (current && line.startsWith("•")) {
      sections[current].push(line.replace(/^•\s*/, ""));
    } else if (current === "FILES") {
      sections.FILES.push(line);
    }
  }

  return sections;
}

function isPlaceholderBullet(text: string): boolean {
  const t = text.trim();
  if (!t) return true;
  return /^\(none/i.test(t);
}

function bulletsToLines(items: string[]): string {
  const kept = items.filter((item) => !isPlaceholderBullet(item));
  if (!kept.length) return "";
  return kept.map((item) => `• ${item}`).join("\n");
}

/** Excel column H — changed work only, one bullet per line. */
export function formatExcelChangedColumn(notes: string): string {
  return bulletsToLines(parseReviewNoteSections(notes).CHANGED);
}

/** Excel column I — blocked items only, one bullet per line. */
export function formatExcelBlockedColumn(notes: string): string {
  return bulletsToLines(parseReviewNoteSections(notes).BLOCKED);
}

/** Rebuild admin notes from Excel H + I after import. */
export function buildReviewNotesFromExcel(changed: string, blocked: string): string {
  const changedItems = changed
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, ""));

  const blockedItems = blocked
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, ""));

  const parts: string[] = ["CHANGED:"];
  if (changedItems.length) {
    parts.push(...changedItems.map((item) => `• ${item}`));
  } else {
    parts.push("• ");
  }

  parts.push("", "BLOCKED:");
  if (blockedItems.length) {
    parts.push(...blockedItems.map((item) => `• ${item}`));
  } else {
    parts.push("• ");
  }

  return parts.join("\n");
}
