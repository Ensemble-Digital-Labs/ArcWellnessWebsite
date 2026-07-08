import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { getClientReviewDocument } from "@/lib/clientReviewStore";

const EXPORT_SCRIPT = path.join(
  process.cwd(),
  "scripts",
  "review-export-xlsx.mjs",
);

/** Dev/local only — `scripts/` is not deployed to Netlify. */
export function exportClientReviewToXlsx(): { path: string } {
  if (!fs.existsSync(EXPORT_SCRIPT)) {
    throw new Error(
      "Excel export is only available in local dev (scripts/review-export-xlsx.mjs).",
    );
  }
  const result = spawnSync(process.execPath, [EXPORT_SCRIPT], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "Export script failed.");
  }
  const doc = getClientReviewDocument();
  const xlsxPath =
    doc.meta.sourcePath && fs.existsSync(doc.meta.sourcePath)
      ? doc.meta.sourcePath
      : path.join(
          process.cwd(),
          doc.meta.sourceFile || "ARC_Wellness_Website_Review.xlsx",
        );
  return { path: xlsxPath };
}
