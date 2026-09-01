"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";

import { cn } from "@/lib/utils";

const WORKER_SRC = "/assets/library/pdf.worker.min.mjs";
const SPREAD_QUERY = "(min-width: 768px) and (min-height: 520px)";
const MAX_BITMAP = 1800;
const DEFAULT_ASPECT = 1.403;
const SWIPE_PX = 56;
const SPINE_PX = 0;
const OPEN_S = 0.52;
const FLIP_S = 0.42;
const SINGLE_S = 0.36;
const SHRINK_S = 0.28;
const PAGE_EASE = [0.22, 0.08, 0.16, 1] as const;
const STAGE_BG = "#2a2724";
const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
const DOUBLE_TAP_ZOOM = 2.4;

type FlipKind = "open" | "close" | "forward" | "back";
type FlipState = {
  kind: FlipKind;
  from: number;
  to: number;
  phase: "leaf" | "shrink";
};

function isPdfjsCancelled(reason: unknown): boolean {
  const name =
    reason && typeof reason === "object" && "name" in reason
      ? String((reason as { name?: string }).name)
      : "";
  return name === "RenderingCancelledException" || name === "AbortException";
}

function nextViewPage(page: number, pageCount: number, spread: boolean) {
  if (spread) {
    if (page <= 1) return Math.min(pageCount, 2);
    const next = page + 2;
    return next > pageCount ? page : next;
  }
  return Math.min(pageCount, page + 1);
}

function prevViewPage(page: number, spread: boolean) {
  if (spread) {
    if (page <= 2) return 1;
    return page - 2;
  }
  return Math.max(1, page - 1);
}

function spreadPages(viewPage: number, pageCount: number) {
  if (viewPage <= 1) {
    return { left: null as number | null, right: 1 as number | null };
  }
  const left = viewPage;
  const right = viewPage + 1 <= pageCount ? viewPage + 1 : null;
  return { left, right };
}

function labelForView(viewPage: number, pageCount: number, spread: boolean) {
  if (!spread) return `Page ${viewPage} of ${pageCount}`;
  if (viewPage <= 1) return `Cover · ${pageCount} pages`;
  const { left, right } = spreadPages(viewPage, pageCount);
  if (left && right) return `Pages ${left}–${right} of ${pageCount}`;
  if (left) return `Page ${left} of ${pageCount}`;
  return `Page ${viewPage} of ${pageCount}`;
}

function flipKindFor(from: number, to: number, spread: boolean): FlipKind {
  if (!spread) return to > from ? "forward" : "back";
  if (from <= 1 && to > 1) return "open";
  if (from > 1 && to <= 1) return "close";
  return to > from ? "forward" : "back";
}

function flipDuration(kind: FlipKind, spread: boolean, reduceMotion: boolean | null) {
  if (reduceMotion) return 0.01;
  if (!spread) return SINGLE_S;
  if (kind === "open" || kind === "close") return OPEN_S;
  return FLIP_S;
}

function snapToViewPage(page: number, pageCount: number, spread: boolean) {
  const n = Math.min(pageCount, Math.max(1, Math.round(page)));
  if (!spread) return n;
  if (n <= 1) return 1;
  return n % 2 === 0 ? n : n - 1;
}

function visibleStageHeight(layoutH: number) {
  const visual = Math.round(window.visualViewport?.height ?? window.innerHeight);
  return Math.max(80, Math.min(layoutH || visual, visual));
}

function pinchDistance(touches: TouchList) {
  const first = touches[0];
  const second = touches[1];
  if (!first || !second) return 0;
  return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
}

function pinchMidpoint(touches: TouchList) {
  const first = touches[0];
  const second = touches[1];
  if (!first || !second) return { x: 0, y: 0 };
  return {
    x: (first.clientX + second.clientX) / 2,
    y: (first.clientY + second.clientY) / 2,
  };
}

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function computePageSize(stageW: number, stageH: number, aspect: number, pages: 1 | 2) {
  if (stageW < 40 || stageH < 40) {
    return { pageW: 0, pageH: 0, padTop: 0, padBottom: 0, padX: 0 };
  }
  const mobile = pages === 1;
  const padX = mobile ? 16 : Math.max(20, Math.round(stageW * 0.04));
  const padTop = mobile ? 12 : Math.max(16, Math.round(stageH * 0.03));
  const padBottom = mobile ? 16 : Math.max(16, Math.round(stageH * 0.03));
  const availW = Math.max(80, stageW - padX * 2);
  const availH = Math.max(80, stageH - padTop - padBottom);
  const spine = pages === 2 ? SPINE_PX : 0;
  let pageW = (availW - spine) / pages;
  let pageH = pageW * aspect;
  if (pageH > availH) {
    pageH = availH;
    pageW = pageH / aspect;
  }
  return {
    pageW: Math.floor(pageW),
    pageH: Math.floor(pageH),
    padTop,
    padBottom,
    padX: mobile ? padX : 0,
  };
}

function addPage(set: Set<number>, page: number | null | undefined, pageCount: number) {
  if (page && page >= 1 && page <= pageCount) set.add(page);
}

function PageFace({ src, blank }: { src: string | undefined; blank?: boolean }) {
  const held = useRef<string | undefined>(undefined);
  if (src) held.current = src;
  const show = blank ? undefined : src ?? held.current;

  return (
    <div className={cn("relative h-full w-full", blank ? "bg-[#d8d0c4]" : "bg-white")}>
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={show}
          alt=""
          draggable={false}
          className="pointer-events-none block h-full w-full object-contain"
        />
      ) : null}
    </div>
  );
}

function SpineShade({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 z-[1] w-3",
        side === "left"
          ? "right-0 bg-gradient-to-l from-black/[0.12] to-transparent"
          : "left-0 bg-gradient-to-r from-black/[0.12] to-transparent",
      )}
      aria-hidden
    />
  );
}

function FoldLight({ side }: { side: "left" | "right" }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          side === "right"
            ? "linear-gradient(90deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 18%, rgba(255,255,255,0.1) 78%, rgba(0,0,0,0.1) 100%)"
            : "linear-gradient(270deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0) 18%, rgba(255,255,255,0.1) 78%, rgba(0,0,0,0.1) 100%)",
      }}
      aria-hidden
    />
  );
}

function usePdfRasters(
  pdf: PDFDocumentProxy | null,
  pageW: number,
  needed: readonly number[],
) {
  const [rasters, setRasters] = useState<Record<number, string>>({});
  const urlsRef = useRef<Map<number, string>>(new Map());
  const paintedAtWidth = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    if (!pdf || pageW < 8) return;
    let cancelled = false;

    const forget = (pageNumber: number) => {
      const url = urlsRef.current.get(pageNumber);
      if (url) URL.revokeObjectURL(url);
      urlsRef.current.delete(pageNumber);
      paintedAtWidth.current.delete(pageNumber);
    };

    const paint = async (pageNumber: number) => {
      const paintedW = paintedAtWidth.current.get(pageNumber);
      if (paintedW && Math.abs(paintedW - pageW) < 10 && urlsRef.current.has(pageNumber)) {
        return;
      }
      const page = await pdf.getPage(pageNumber);
      if (cancelled) {
        try {
          page.cleanup();
        } catch {
          /* already destroyed */
        }
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bitmapWidth = Math.min(Math.max(Math.floor(pageW * dpr), 640), MAX_BITMAP);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: bitmapWidth / base.width });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) {
        page.cleanup();
        return;
      }
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      try {
        await page.render({ canvas, canvasContext: context, viewport }).promise;
      } catch (reason) {
        page.cleanup();
        if (cancelled || isPdfjsCancelled(reason)) return;
        console.error(reason);
        return;
      }
      page.cleanup();
      if (cancelled) return;

      await new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (cancelled) {
            resolve();
            return;
          }
          if (!blob) {
            resolve();
            return;
          }
          const prev = urlsRef.current.get(pageNumber);
          if (prev) URL.revokeObjectURL(prev);
          const url = URL.createObjectURL(blob);
          urlsRef.current.set(pageNumber, url);
          paintedAtWidth.current.set(pageNumber, pageW);
          setRasters(Object.fromEntries(urlsRef.current));
          resolve();
        }, "image/png");
      });
    };

    const run = async () => {
      for (const pageNumber of needed) {
        if (cancelled) return;
        await paint(pageNumber);
      }
      if (cancelled) return;
      const keep = new Set(needed);
      for (const pageNumber of [...urlsRef.current.keys()]) {
        if (!keep.has(pageNumber)) forget(pageNumber);
      }
      setRasters(Object.fromEntries(urlsRef.current));
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [needed, pageW, pdf]);

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  return rasters;
}

export type FlipPager = {
  page: number;
  pageCount: number;
  goToPage: (page: number) => void;
};

export function resetIosViewportZoom() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();

  const meta = document.querySelector('meta[name="viewport"]');
  if (!(meta instanceof HTMLMetaElement)) return;
  const original = meta.getAttribute("content");
  if (!original) return;

  meta.setAttribute("content", `${original.replace(/,?\s*maximum-scale\s*=\s*[\d.]+/gi, "")}, maximum-scale=1`);
  window.setTimeout(() => {
    meta.setAttribute("content", original);
  }, 50);
}

export function PageJumpField({
  page,
  pageCount,
  goToPage,
}: {
  page: number;
  pageCount: number;
  goToPage: (page: number) => void;
}) {
  const [draft, setDraft] = useState(String(page));
  const focusedRef = useRef(false);

  useEffect(() => {
    if (!focusedRef.current) setDraft(String(page));
  }, [page]);

  const commit = () => {
    const n = Number.parseInt(draft.replace(/\D/g, ""), 10);
    if (!Number.isFinite(n)) {
      setDraft(String(page));
      return;
    }
    goToPage(n);
  };

  return (
    <label className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 font-sans text-[16px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
      <span className="sr-only">Go to page</span>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        enterKeyHint="done"
        spellCheck={false}
        aria-label="Page number"
        value={draft}
        onFocus={() => {
          focusedRef.current = true;
        }}
        onBlur={() => {
          focusedRef.current = false;
          commit();
          window.setTimeout(() => {
            if (window.visualViewport && window.visualViewport.scale > 1.01) {
              resetIosViewportZoom();
            }
          }, 0);
        }}
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, "").slice(0, 4))}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            (event.target as HTMLInputElement).blur();
          }
          event.stopPropagation();
        }}
        className="h-9 w-12 rounded-md border border-white/20 bg-white/10 text-center text-[16px] font-semibold tracking-normal text-white outline-none focus:border-white/50 sm:h-9 sm:w-12"
      />
      <span className="whitespace-nowrap">of {pageCount}</span>
    </label>
  );
}

/** Recipe-book page-turn reader: one page on phones, two-page spreads from tablet up. */
export function LibraryBookFlipReader({
  src,
  onPager,
}: {
  src: string;
  onPager?: (pager: FlipPager) => void;
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const zoomLayerRef = useRef<HTMLDivElement>(null);
  const lastStageHRef = useRef(0);
  const turningRef = useRef(false);
  const flipSafetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flipRef = useRef<FlipState | null>(null);
  const goNextRef = useRef<() => void>(() => {});
  const goPrevRef = useRef<() => void>(() => {});

  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [aspect, setAspect] = useState(DEFAULT_ASPECT);
  const [error, setError] = useState<string | null>(null);
  const [spread, setSpread] = useState(false);
  const [viewPage, setViewPage] = useState(1);
  const [flip, setFlip] = useState<FlipState | null>(null);
  const [stage, setStage] = useState({ w: 0, h: 0 });

  flipRef.current = flip;

  const pageCount = pdf?.numPages ?? 1;
  const pagesInView: 1 | 2 = spread ? 2 : 1;
  const { pageW, pageH, padTop, padBottom, padX } = computePageSize(
    stage.w,
    stage.h,
    aspect,
    pagesInView,
  );
  const openW = pageW * 2 + SPINE_PX;

  const neededPages = useMemo(() => {
    const set = new Set<number>();
    const add = (page: number | null | undefined) => addPage(set, page, pageCount);
    add(1);
    add(viewPage);
    add(viewPage - 1);
    add(viewPage + 1);
    add(viewPage + 2);
    add(viewPage + 3);
    const current = spreadPages(viewPage, pageCount);
    add(current.left);
    add(current.right);
    add(spreadPages(nextViewPage(viewPage, pageCount, spread), pageCount).left);
    add(spreadPages(nextViewPage(viewPage, pageCount, spread), pageCount).right);
    add(spreadPages(prevViewPage(viewPage, spread), pageCount).left);
    add(spreadPages(prevViewPage(viewPage, spread), pageCount).right);
    if (flip) {
      add(flip.from);
      add(flip.to);
      add(spreadPages(flip.from, pageCount).left);
      add(spreadPages(flip.from, pageCount).right);
      add(spreadPages(flip.to, pageCount).left);
      add(spreadPages(flip.to, pageCount).right);
    }
    return [...set].sort((a, b) => a - b);
  }, [flip, pageCount, spread, viewPage]);

  const rasters = usePdfRasters(pdf, pageW, neededPages);
  const srcFor = (page: number | null) => (page ? rasters[page] : undefined);

  useEffect(() => {
    const media = window.matchMedia(SPREAD_QUERY);
    const sync = () => setSpread(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setViewPage((page) => {
      if (!spread) return page;
      if (page <= 1) return 1;
      return page % 2 === 0 ? page : page - 1;
    });
  }, [spread]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      const typing =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;
      let h = visibleStageHeight(el.clientHeight);
      if (typing && lastStageHRef.current > 80) {
        h = lastStageHRef.current;
      } else {
        lastStageHRef.current = h;
      }
      setStage((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pdf]);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: PDFDocumentLoadingTask | null = null;

    const destroyTask = () => {
      const task = loadingTask;
      loadingTask = null;
      if (typeof task?.destroy !== "function") return;
      void task.destroy().catch(() => {});
    };

    const load = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;
      loadingTask = pdfjs.getDocument({
        url: src,
        disableRange: true,
        disableStream: true,
      });
      const doc = await loadingTask.promise;
      if (cancelled) {
        destroyTask();
        return;
      }
      try {
        const first = await doc.getPage(1);
        const viewport = first.getViewport({ scale: 1 });
        const nextAspect = viewport.height / viewport.width;
        first.cleanup();
        if (!cancelled) setAspect(nextAspect);
      } catch {
        /* keep default */
      }
      if (cancelled) {
        destroyTask();
        return;
      }
      setPdf(doc);
    };

    void load().catch((reason: unknown) => {
      destroyTask();
      if (cancelled || isPdfjsCancelled(reason)) return;
      setError("This booklet could not be opened here. Close and try again.");
    });

    return () => {
      cancelled = true;
      destroyTask();
    };
  }, [src]);

  const finishFlip = useCallback((nextPage: number) => {
    setViewPage(nextPage);
    setFlip(null);
    turningRef.current = false;
    if (flipSafetyRef.current) {
      clearTimeout(flipSafetyRef.current);
      flipSafetyRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (nextPage: number) => {
      if (turningRef.current) return;
      if (nextPage === viewPage) return;
      if (reduceMotion) {
        setViewPage(nextPage);
        return;
      }
      turningRef.current = true;
      const kind = flipKindFor(viewPage, nextPage, spread);
      setFlip({ kind, from: viewPage, to: nextPage, phase: "leaf" });
      const ms = (flipDuration(kind, spread, false) + (kind === "close" ? SHRINK_S : 0)) * 1000 + 80;
      if (flipSafetyRef.current) clearTimeout(flipSafetyRef.current);
      flipSafetyRef.current = setTimeout(() => finishFlip(nextPage), ms);
    },
    [finishFlip, reduceMotion, spread, viewPage],
  );

  const goNext = useCallback(() => {
    goTo(nextViewPage(viewPage, pageCount, spread));
  }, [goTo, pageCount, spread, viewPage]);

  const goPrev = useCallback(() => {
    goTo(prevViewPage(viewPage, spread));
  }, [goTo, spread, viewPage]);

  goNextRef.current = goNext;
  goPrevRef.current = goPrev;

  const goToPage = useCallback(
    (requested: number) => {
      const target = snapToViewPage(requested, pageCount, spread);
      if (target === viewPage) return;
      turningRef.current = false;
      if (flipSafetyRef.current) {
        clearTimeout(flipSafetyRef.current);
        flipSafetyRef.current = null;
      }
      setFlip(null);
      setViewPage(target);
    },
    [pageCount, spread, viewPage],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (flipSafetyRef.current) clearTimeout(flipSafetyRef.current);
    };
  }, [goNext, goPrev]);

  useEffect(() => {
    const stage = stageRef.current;
    const layer = zoomLayerRef.current;
    if (!stage || !layer || !pdf) return;

    const zoom = { scale: 1, x: 0, y: 0 };
    let pinch: { dist: number; scale: number; cx: number; cy: number } | null = null;
    let pan: { x: number; y: number; origX: number; origY: number } | null = null;
    let swipeX: number | null = null;
    let lastTapAt = 0;
    let lastTapX = 0;
    let lastTapY = 0;
    let didPinch = false;

    const paint = () => {
      if (zoom.scale <= 1.001) {
        zoom.scale = 1;
        zoom.x = 0;
        zoom.y = 0;
        layer.style.transform = "none";
        return;
      }
      layer.style.transformOrigin = "0 0";
      layer.style.transform = `translate3d(${zoom.x}px, ${zoom.y}px, 0) scale(${zoom.scale})`;
    };

    const isControl = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("button, input, label, a"));

    const onStart = (event: TouchEvent) => {
      if (isControl(event.target) && event.touches.length === 1) return;

      if (event.touches.length >= 2) {
        event.preventDefault();
        swipeX = null;
        pan = null;
        didPinch = true;
        const dist = pinchDistance(event.touches) || 1;
        const mid = pinchMidpoint(event.touches);
        const rect = stage.getBoundingClientRect();
        const vx = mid.x - rect.left;
        const vy = mid.y - rect.top;
        pinch = {
          dist,
          scale: zoom.scale,
          cx: (vx - zoom.x) / zoom.scale,
          cy: (vy - zoom.y) / zoom.scale,
        };
        return;
      }

      pinch = null;
      const touch = event.touches[0];
      if (!touch) return;

      if (zoom.scale > 1.02) {
        pan = { x: touch.clientX, y: touch.clientY, origX: zoom.x, origY: zoom.y };
        swipeX = null;
        return;
      }

      swipeX = touch.clientX;
    };

    const onMove = (event: TouchEvent) => {
      if (pinch && event.touches.length >= 2) {
        event.preventDefault();
        const dist = pinchDistance(event.touches) || pinch.dist;
        const mid = pinchMidpoint(event.touches);
        const rect = stage.getBoundingClientRect();
        const next = clampZoom(pinch.scale * (dist / pinch.dist));
        zoom.scale = next;
        zoom.x = mid.x - rect.left - pinch.cx * next;
        zoom.y = mid.y - rect.top - pinch.cy * next;
        paint();
        return;
      }

      if (pan && event.touches.length === 1) {
        event.preventDefault();
        const touch = event.touches[0];
        if (!touch) return;
        zoom.x = pan.origX + (touch.clientX - pan.x);
        zoom.y = pan.origY + (touch.clientY - pan.y);
        paint();
      }
    };

    const onEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) pinch = null;
      if (event.touches.length === 1 && zoom.scale > 1.02) {
        const touch = event.touches[0];
        if (touch) {
          pan = { x: touch.clientX, y: touch.clientY, origX: zoom.x, origY: zoom.y };
        }
      }
      if (event.touches.length > 0) return;

      pan = null;
      const ended = event.changedTouches[0];
      if (zoom.scale <= 1.02) {
        zoom.scale = 1;
        zoom.x = 0;
        zoom.y = 0;
        paint();
      }

      if (!ended || isControl(event.target)) {
        swipeX = null;
        didPinch = false;
        return;
      }

      const now = Date.now();
      const tapDx = ended.clientX - lastTapX;
      const tapDy = ended.clientY - lastTapY;
      if (now - lastTapAt < 280 && Math.hypot(tapDx, tapDy) < 28) {
        lastTapAt = 0;
        swipeX = null;
        didPinch = false;
        const rect = stage.getBoundingClientRect();
        const vx = ended.clientX - rect.left;
        const vy = ended.clientY - rect.top;
        if (zoom.scale > 1.05) {
          zoom.scale = 1;
          zoom.x = 0;
          zoom.y = 0;
        } else {
          zoom.scale = DOUBLE_TAP_ZOOM;
          zoom.x = vx - vx * DOUBLE_TAP_ZOOM;
          zoom.y = vy - vy * DOUBLE_TAP_ZOOM;
        }
        paint();
        return;
      }
      lastTapAt = now;
      lastTapX = ended.clientX;
      lastTapY = ended.clientY;

      if (didPinch || flipRef.current) {
        swipeX = null;
        didPinch = false;
        return;
      }

      if (swipeX != null && zoom.scale <= 1.02) {
        const delta = ended.clientX - swipeX;
        if (delta <= -SWIPE_PX) goNextRef.current();
        if (delta >= SWIPE_PX) goPrevRef.current();
      }
      swipeX = null;
    };

    const zoomAround = (viewX: number, viewY: number, nextScale: number) => {
      const cx = (viewX - zoom.x) / zoom.scale;
      const cy = (viewY - zoom.y) / zoom.scale;
      zoom.scale = clampZoom(nextScale);
      if (zoom.scale <= 1.001) {
        zoom.scale = 1;
        zoom.x = 0;
        zoom.y = 0;
      } else {
        zoom.x = viewX - cx * zoom.scale;
        zoom.y = viewY - cy * zoom.scale;
      }
      paint();
    };

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      event.stopPropagation();
      const rect = stage.getBoundingClientRect();
      const intensity = event.deltaMode === 1 ? 0.05 : 0.003;
      zoomAround(
        event.clientX - rect.left,
        event.clientY - rect.top,
        zoom.scale * Math.exp(-event.deltaY * intensity),
      );
    };

    let pointerPan: { id: number; x: number; y: number; origX: number; origY: number } | null =
      null;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (event.button !== 0 || zoom.scale <= 1.02 || isControl(event.target)) return;
      pointerPan = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        origX: zoom.x,
        origY: zoom.y,
      };
      stage.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerPan || event.pointerId !== pointerPan.id) return;
      event.preventDefault();
      zoom.x = pointerPan.origX + (event.clientX - pointerPan.x);
      zoom.y = pointerPan.origY + (event.clientY - pointerPan.y);
      paint();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (pointerPan?.id === event.pointerId) pointerPan = null;
    };

    const onDoubleClick = (event: MouseEvent) => {
      if (isControl(event.target)) return;
      event.preventDefault();
      const rect = stage.getBoundingClientRect();
      const vx = event.clientX - rect.left;
      const vy = event.clientY - rect.top;
      if (zoom.scale > 1.05) zoomAround(vx, vy, 1);
      else zoomAround(vx, vy, DOUBLE_TAP_ZOOM);
    };

    const onZoomKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      const rect = stage.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (event.key === "=" || event.key === "+" || event.code === "NumpadAdd") {
        event.preventDefault();
        zoomAround(cx, cy, zoom.scale * 1.15);
      } else if (event.key === "-" || event.code === "NumpadSubtract") {
        event.preventDefault();
        zoomAround(cx, cy, zoom.scale / 1.15);
      } else if (event.key === "0" || event.code === "Numpad0") {
        event.preventDefault();
        zoom.scale = 1;
        zoom.x = 0;
        zoom.y = 0;
        paint();
      }
    };

    stage.addEventListener("touchstart", onStart, { passive: false });
    stage.addEventListener("touchmove", onMove, { passive: false });
    stage.addEventListener("touchend", onEnd);
    stage.addEventListener("touchcancel", onEnd);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("dblclick", onDoubleClick);
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("keydown", onZoomKey, true);
    return () => {
      stage.removeEventListener("touchstart", onStart);
      stage.removeEventListener("touchmove", onMove);
      stage.removeEventListener("touchend", onEnd);
      stage.removeEventListener("touchcancel", onEnd);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("keydown", onZoomKey, true);
      layer.style.transform = "none";
    };
  }, [pdf]);

  const canPrev = viewPage > 1 && !flip;
  const canNext = nextViewPage(viewPage, pageCount, spread) !== viewPage && !flip;
  const labelPage = flip?.phase === "leaf" ? flip.from : viewPage;

  useEffect(() => {
    onPager?.({
      page: labelPage,
      pageCount,
      goToPage,
    });
  }, [goToPage, labelPage, onPager, pageCount]);

  const expanded =
    spread &&
    (flip?.kind === "open" ||
      (flip?.kind === "close" && flip.phase === "leaf") ||
      (viewPage > 1 && flip?.kind !== "close"));

  const onLeafComplete = useCallback(() => {
    const currentFlip = flipRef.current;
    if (!currentFlip) return;
    if (currentFlip.kind === "close" && currentFlip.phase === "leaf") {
      setFlip({ ...currentFlip, phase: "shrink" });
      return;
    }
    finishFlip(currentFlip.to);
  }, [finishFlip]);

  if (error) {
    return (
      <p className="flex min-h-0 flex-1 items-center justify-center px-4 py-10 text-center font-sans text-sm text-white/70">
        {error}
      </p>
    );
  }

  if (!pdf) {
    return (
      <p className="flex min-h-0 flex-1 items-center justify-center px-4 py-10 text-center font-sans text-sm text-white/70">
        Loading booklet…
      </p>
    );
  }

  const current = spreadPages(viewPage, pageCount);
  const fromSpread = flip ? spreadPages(flip.from, pageCount) : current;
  const toSpread = flip ? spreadPages(flip.to, pageCount) : current;

  let leftPage: number | null = current.left;
  let rightPage: number | null = current.right;
  if (spread && flip) {
    if (flip.kind === "open") {
      leftPage = toSpread.left;
      rightPage = toSpread.right;
    } else if (flip.kind === "forward") {
      leftPage = fromSpread.left;
      rightPage = toSpread.right;
    } else if (flip.kind === "back") {
      leftPage = toSpread.left;
      rightPage = fromSpread.right;
    } else if (flip.kind === "close") {
      leftPage = fromSpread.left;
      rightPage = flip.phase === "leaf" ? fromSpread.right : 1;
    }
  } else if (!spread) {
    leftPage = null;
    rightPage = flip ? flip.to : viewPage;
  }

  const bookW = expanded ? openW : pageW;
  const duration = flip ? flipDuration(flip.kind, spread, reduceMotion) : FLIP_S;

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col" style={{ background: STAGE_BG }}>
      <div
        ref={stageRef}
        data-arc-modal-scroll
        className="relative min-h-0 flex-1 touch-none overflow-hidden"
      >
        <div
          ref={zoomLayerRef}
          className="flex h-full w-full items-center justify-center will-change-transform"
          style={{
            paddingTop: padTop,
            paddingBottom: padBottom,
            paddingLeft: padX,
            paddingRight: padX,
          }}
        >
        {pageW > 0 ? (
            <motion.div
              className="relative overflow-hidden bg-white"
              initial={false}
              animate={{ width: bookW }}
              transition={{
                duration: flip?.kind === "open" || flip?.phase === "shrink" ? 0.4 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              onAnimationComplete={() => {
                const currentFlip = flipRef.current;
                if (currentFlip?.kind === "close" && currentFlip.phase === "shrink") {
                  finishFlip(currentFlip.to);
                }
              }}
              style={{
                height: pageH,
                perspective: 2800,
                transformStyle: "preserve-3d",
                boxShadow: "0 18px 60px rgba(0,0,0,0.45), 0 2px 10px rgba(0,0,0,0.28)",
              }}
            >
              {spread && expanded ? (
                <div className="flex h-full w-full">
                  <div className="relative h-full min-w-0 flex-1 overflow-hidden">
                    <PageFace key={leftPage ?? "blank"} src={srcFor(leftPage)} blank={!leftPage} />
                    <SpineShade side="left" />
                  </div>
                  <div
                    className="relative z-[2] w-px shrink-0 self-stretch bg-black/15"
                    aria-hidden
                  />
                  <div className="relative h-full min-w-0 flex-1 overflow-hidden">
                    <SpineShade side="right" />
                    <PageFace key={rightPage ?? "right"} src={srcFor(rightPage)} />
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full overflow-hidden">
                  <PageFace src={srcFor(flip && !spread ? flip.to : (rightPage ?? 1))} />
                </div>
              )}

              {spread && flip && flip.phase === "leaf" && (flip.kind === "open" || flip.kind === "forward") ? (
                <motion.div
                  className="absolute top-0 z-20 bg-white"
                  style={{
                    width: pageW,
                    height: pageH,
                    right: 0,
                    originX: 0,
                    originY: 0.5,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotateY: 0, transformPerspective: 2800 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration, ease: PAGE_EASE }}
                  onAnimationComplete={onLeafComplete}
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <PageFace src={srcFor(flip.kind === "open" ? 1 : fromSpread.right)} />
                    <FoldLight side="right" />
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <PageFace src={srcFor(toSpread.left)} />
                    <FoldLight side="left" />
                  </div>
                </motion.div>
              ) : null}

              {spread && flip && flip.phase === "leaf" && (flip.kind === "back" || flip.kind === "close") ? (
                <motion.div
                  className="absolute top-0 z-20 bg-white"
                  style={{
                    width: pageW,
                    height: pageH,
                    left: 0,
                    originX: 1,
                    originY: 0.5,
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotateY: 0, transformPerspective: 2800 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration, ease: PAGE_EASE }}
                  onAnimationComplete={onLeafComplete}
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <PageFace src={srcFor(fromSpread.left)} />
                    <FoldLight side="left" />
                  </div>
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <PageFace src={srcFor(flip.kind === "close" ? 1 : toSpread.right)} />
                    <FoldLight side="right" />
                  </div>
                </motion.div>
              ) : null}

              {!spread && flip ? (
                <motion.div
                  className="absolute inset-0 z-20 overflow-hidden bg-white"
                  style={{
                    originX: flip.kind === "back" ? 1 : 0,
                    originY: 0.5,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  initial={{ rotateY: 0, transformPerspective: 2200 }}
                  animate={{ rotateY: flip.kind === "back" ? 88 : -88 }}
                  transition={{ duration, ease: PAGE_EASE }}
                  onAnimationComplete={onLeafComplete}
                >
                  <PageFace src={srcFor(flip.from)} />
                  <FoldLight side={flip.kind === "back" ? "left" : "right"} />
                </motion.div>
              ) : null}
            </motion.div>
        ) : null}
        </div>

        {!onPager ? (
          <div className="absolute top-3 left-1/2 z-40 -translate-x-1/2">
            <PageJumpField page={labelPage} pageCount={pageCount} goToPage={goToPage} />
          </div>
        ) : null}

        <button
          type="button"
          className={cn(
            "absolute top-1/2 left-2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-[2px] transition-colors sm:left-4",
            canPrev ? "hover:bg-black/50" : "opacity-30",
          )}
          aria-label="Previous page"
          disabled={!canPrev}
          onClick={goPrev}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          className={cn(
            "absolute top-1/2 right-2 z-30 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-[2px] transition-colors sm:right-4",
            canNext ? "hover:bg-black/50" : "opacity-30",
          )}
          aria-label="Next page"
          disabled={!canNext}
          onClick={goNext}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
