"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AdminInsightImageFieldProps = {
  imageSrc: string;
  imageAlt: string;
  nameHint: string;
  onImageSrcChange: (value: string) => void;
  onImageAltChange: (value: string) => void;
};

export function AdminInsightImageField({
  imageSrc,
  imageAlt,
  nameHint,
  onImageSrcChange,
  onImageAltChange,
}: AdminInsightImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploadError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (nameHint.trim()) formData.append("nameHint", nameHint.trim());

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { error?: string; imageSrc?: string };

      if (!response.ok || !data.imageSrc) {
        setUploadError(data.error ?? "Upload failed.");
        return;
      }

      onImageSrcChange(data.imageSrc);
      if (!imageAlt.trim()) {
        onImageAltChange(nameHint.trim() || "Insight feature image");
      }
    } catch {
      setUploadError("Could not upload image. Try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4 sm:col-span-2">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-arc-charcoal">Feature image</p>
          <p className="mt-1 text-xs text-arc-charcoal/50">
            JPG, PNG, WebP, or GIF, max 5 MB. Shown on the Insights grid and detail page.
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-full border border-arc-charcoal/15 bg-arc-cream px-4 py-2 text-sm font-medium text-arc-charcoal transition-colors hover:border-arc-teal/30 disabled:opacity-60"
        >
          {uploading ? "Uploading…" : "Upload image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {imageSrc ? (
        <div className="overflow-hidden rounded-2xl border border-arc-charcoal/10 bg-arc-cream/40">
          <div className="relative aspect-[4/3] max-h-72 w-full">
            <Image
              src={imageSrc}
              alt={imageAlt || "Preview"}
              fill
              className="object-cover"
              sizes="640px"
              unoptimized
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex min-h-[180px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-arc-charcoal/20 bg-arc-cream/30 px-6 py-10 text-center transition-colors hover:border-arc-teal/35 hover:bg-arc-cream/50 disabled:opacity-60",
          )}
        >
          <span className="text-sm font-medium text-arc-charcoal">Drop an image here or click to upload</span>
          <span className="mt-2 text-xs text-arc-charcoal/50">Recommended: landscape, at least 1200px wide</span>
        </button>
      )}

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Image path</span>
        <input
          value={imageSrc}
          onChange={(e) => onImageSrcChange(e.target.value)}
          placeholder="/assets/insights/uploads/..."
          className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">Image alt text</span>
        <input
          value={imageAlt}
          onChange={(e) => onImageAltChange(e.target.value)}
          className="w-full rounded-xl border border-arc-charcoal/15 px-4 py-3 text-sm outline-none focus:border-arc-teal/40 focus:ring-2 focus:ring-arc-teal/20"
        />
      </label>

      {uploadError ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {uploadError}
        </p>
      ) : null}
    </div>
  );
}
