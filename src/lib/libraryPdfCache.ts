"use client";

/**
 * Shared fetch for library PDFs so hover/Read share one download, and reopen
 * does not hit the network again in this session.
 *
 * The Nourishing Table file is ~53MB and is not linearized, so pdf.js cannot
 * paint page 1 until the whole file is present.
 */

export type PdfLoadProgress = {
  loaded: number;
  total: number;
};

type CacheEntry = {
  promise: Promise<ArrayBuffer>;
  loaded: number;
  total: number;
  listeners: Set<(progress: PdfLoadProgress) => void>;
};

const entries = new Map<string, CacheEntry>();
let runtimeWarmed = false;

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

function connection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

function shouldSkipPrefetch() {
  const info = connection();
  if (info?.saveData) return true;
  const type = info?.effectiveType;
  return type === "slow-2g" || type === "2g";
}

function notify(entry: CacheEntry) {
  const progress = { loaded: entry.loaded, total: entry.total };
  entry.listeners.forEach((listener) => listener(progress));
}

async function readResponse(
  response: Response,
  onChunk: (loaded: number, total: number) => void,
): Promise<ArrayBuffer> {
  const total = Number(response.headers.get("content-length")) || 0;
  if (!response.body) {
    const buffer = await response.arrayBuffer();
    onChunk(buffer.byteLength, total || buffer.byteLength);
    return buffer;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    chunks.push(value);
    loaded += value.byteLength;
    onChunk(loaded, total);
  }

  const out = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  onChunk(loaded, total || loaded);
  return out.buffer;
}

function startLoad(src: string): CacheEntry {
  const listeners = new Set<(progress: PdfLoadProgress) => void>();
  const entry: CacheEntry = {
    loaded: 0,
    total: 0,
    listeners,
    promise: Promise.resolve().then(async () => {
      const response = await fetch(src, {
        credentials: "same-origin",
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error(`PDF request failed (${response.status})`);
      }
      return readResponse(response, (loaded, total) => {
        entry.loaded = loaded;
        entry.total = total;
        notify(entry);
      });
    }),
  };
  entries.set(src, entry);
  return entry;
}

export function prefetchLibraryPdfRuntime() {
  if (runtimeWarmed || typeof document === "undefined") return;
  runtimeWarmed = true;
  void import("pdfjs-dist");
  const href = "/assets/library/pdf.worker.min.mjs";
  if (document.querySelector(`link[data-arc-pdf-worker="1"]`)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "script";
  link.href = href;
  link.dataset.arcPdfWorker = "1";
  document.head.appendChild(link);
}

export function prefetchLibraryPdf(src: string) {
  if (shouldSkipPrefetch()) return;
  prefetchLibraryPdfRuntime();
  if (!entries.has(src)) startLoad(src);
}

export function loadLibraryPdfBuffer(
  src: string,
  onProgress?: (progress: PdfLoadProgress) => void,
): Promise<ArrayBuffer> {
  prefetchLibraryPdfRuntime();
  const entry = entries.get(src) ?? startLoad(src);
  if (onProgress) {
    onProgress({ loaded: entry.loaded, total: entry.total });
    entry.listeners.add(onProgress);
  }
  return entry.promise.finally(() => {
    if (onProgress) entry.listeners.delete(onProgress);
  });
}
