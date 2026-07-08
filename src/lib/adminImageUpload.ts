import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { slugifyTitle } from "@/lib/insightsValidation";

const UPLOAD_DIR = path.join(process.cwd(), "public", "assets", "insights", "uploads");
const PUBLIC_PREFIX = "/assets/insights/uploads";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

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

  const base =
    slugifyTitle(nameHint || file.name.replace(/\.[^.]+$/, "")) || "insight-image";
  const filename = `${base}-${Date.now()}.webp`;

  ensureInsightsUploadDir();

  const buffer = Buffer.from(await file.arrayBuffer());
  const webpBuffer = await sharp(buffer, { animated: file.type === "image/gif" })
    .webp({ quality: 85, effort: 4 })
    .toBuffer();

  fs.writeFileSync(path.join(UPLOAD_DIR, filename), webpBuffer);

  return {
    imageSrc: `${PUBLIC_PREFIX}/${filename}`,
    filename,
  };
}
