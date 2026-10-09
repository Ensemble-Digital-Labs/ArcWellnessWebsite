"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";

/**
 * Shared pdf.js load for library booklets.
 *
 * Linearized PDFs are opened by URL so range/stream can paint page 1 before
 * the whole file arrives. The document stays cached so close/reopen does not
 * destroy the worker parse. Page position is remembered in sessionStorage.
 */

const WORKER_SRC = "/assets/library/pdf.worker.min.mjs";
const PAGE_KEY_PREFIX = "arc-library-page:";

export type PdfLoadProgress = {
  loaded: number;
  total: number;
};

type CacheEntry = {
  promise: Promise<PDFDocumentProxy>;
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

function pageStorageKey(src: string) {
  return `${PAGE_KEY_PREFIX}${src.split("?")[0]}`;
}

function startLoad(src: string): CacheEntry {
  const listeners = new Set<(progress: PdfLoadProgress) => void>();
  const entry: CacheEntry = {
    loaded: 0,
    total: 0,
    listeners,
    promise: Promise.resolve().then(async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;
      const loadingTask = pdfjs.getDocument({
        url: src,
        disableRange: false,
        disableStream: false,
        disableAutoFetch: false,
        rangeChunkSize: 65536,
      });
      loadingTask.onProgress = (progress: PdfLoadProgress) => {
        entry.loaded = progress.loaded;
        entry.total = progress.total;
        notify(entry);
      };
      try {
        return await loadingTask.promise;
      } catch (error) {
        entries.delete(src);
        throw error;
      }
    }),
  };
  entries.set(src, entry);
  return entry;
}

export function prefetchLibraryPdfRuntime() {
  if (runtimeWarmed || typeof document === "undefined") return;
  runtimeWarmed = true;
  void import("pdfjs-dist");
  const href = WORKER_SRC;
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

export async function loadLibraryPdfDocument(
  src: string,
  onProgress?: (progress: PdfLoadProgress) => void,
): Promise<PDFDocumentProxy> {
  prefetchLibraryPdfRuntime();
  const entry = entries.get(src) ?? startLoad(src);
  if (onProgress) {
    onProgress({ loaded: entry.loaded, total: entry.total });
    entry.listeners.add(onProgress);
  }
  try {
    return await entry.promise;
  } finally {
    if (onProgress) {
      entries.get(src)?.listeners.delete(onProgress);
    }
  }
}

export function readLibraryReaderPage(src: string): number {
  if (typeof sessionStorage === "undefined") return 1;
  try {
    const page = Number(sessionStorage.getItem(pageStorageKey(src)));
    if (Number.isInteger(page) && page >= 1) return page;
  } catch {
    /* private mode */
  }
  return 1;
}

export function writeLibraryReaderPage(src: string, page: number) {
  if (typeof sessionStorage === "undefined") return;
  if (!Number.isInteger(page) || page < 1) return;
  try {
    sessionStorage.setItem(pageStorageKey(src), String(page));
  } catch {
    /* quota / private mode */
  }
}
