import fs from "node:fs";
import path from "node:path";
import { slugifyTitle } from "@/lib/insightsValidation";

const UPLOAD_DIR = path.join(process.cwd(), "public", "assets", "insights", "uploads");
const PUBLIC_PREFIX = "/assets/insights/uploads";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export type SavedInsightImage = {
  imageSrc: string;
  filename: string;
};

export function ensureInsightsUploadDir(): void {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export async function saveInsightUpload(
  file: File,
  nameHint?: string,
): Promise<SavedInsightImage> {
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error("Upload a JPG, PNG, WebP, or GIF image.");
  }

  if (file.size > MAX_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    throw new Error("Unsupported image type.");
  }

  const base =
    slugifyTitle(nameHint || file.name.replace(/\.[^.]+$/, "")) || "insight-image";
  const filename = `${base}-${Date.now()}${ext}`;

  ensureInsightsUploadDir();

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);

  return {
    imageSrc: `${PUBLIC_PREFIX}/${filename}`,
    filename,
  };
}
