"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  PDFPageProxy,
  RenderTask,
} from "pdfjs-dist";

import { cn } from "@/lib/utils";

const WORKER_SRC = "/assets/library/pdf.worker.min.mjs";

/** Phone CSS width is small; undersampled canvases look soft, especially photo spreads. */
const MIN_BITMAP_WIDTH_NARROW = 2000;
const MIN_BITMAP_WIDTH_WIDE = 1400;
const MAX_BITMAP_WIDTH = 3200;
const RESIZE_WIDTH_SLACK_PX = 16;
const DEFAULT_PAGE_ASPECT = 1.294;

/** One page paint at a time so iPhone does not queue many 2000px canvases. */
let paintQueue: Promise<void> = Promise.resolve();

function enqueuePaint(work: () => Promise<void>): Promise<void> {
  const run = paintQueue.then(work, work);
  paintQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function targetBitmapWidth(cssWidth: number): number {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  const minBitmap = narrow ? MIN_BITMAP_WIDTH_NARROW : MIN_BITMAP_WIDTH_WIDE;
  return Math.min(Math.max(Math.floor(cssWidth * dpr), minBitmap), MAX_BITMAP_WIDTH);
}

function isPdfjsCancelled(reason: unknown): boolean {
  const name =
    reason && typeof reason === "object" && "name" in reason
      ? String((reason as { name?: string }).name)
      : "";
  return (
    name === "RenderingCancelledException" ||
    name === "AbortException" ||
    name === "UnexpectedResponseException"
  );
}

function releaseCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  canvas.width = 1;
  canvas.height = 1;
}

const livePageDrops = new Map<number, () => void>();
const MAX_LIVE_PAGES = 6;

function pageIsInPaintWindow(wrap: HTMLElement, root: Element | null, marginPx = 120) {
  const rootRect = root
    ? root.getBoundingClientRect()
    : { top: 0, bottom: window.innerHeight };
  const rect = wrap.getBoundingClientRect();
  return rect.bottom >= rootRect.top - marginPx && rect.top <= rootRect.bottom + marginPx;
}

function claimLivePage(pageNumber: number, drop: () => void) {
  livePageDrops.set(pageNumber, drop);
  if (livePageDrops.size <= MAX_LIVE_PAGES) return;

  let farthest = pageNumber;
  let farthestDist = -1;
  for (const n of livePageDrops.keys()) {
    const dist = Math.abs(n - pageNumber);
    if (dist > farthestDist) {
      farthestDist = dist;
      farthest = n;
    }
  }
  if (farthest === pageNumber) return;
  const evict = livePageDrops.get(farthest);
  livePageDrops.delete(farthest);
  evict?.();
}

function releaseLivePage(pageNumber: number) {
  livePageDrops.delete(pageNumber);
}

function PdfPageCanvas({
  pdf,
  pageNumber,
  defaultAspect,
}: {
  pdf: PDFDocumentProxy;
  pageNumber: number;
  defaultAspect: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aspect, setAspect] = useState(defaultAspect);

  useEffect(() => {
    setAspect(defaultAspect);
  }, [defaultAspect]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let cancelled = false;
    let visible = false;
    let lastBitmapWidth = 0;
    let lastCssWidth = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let enterTimer: ReturnType<typeof setTimeout> | null = null;
    let renderTask: RenderTask | null = null;
    let page: PDFPageProxy | null = null;

    releaseCanvas(canvas);

    const freePage = (cancelRender: boolean) => {
      if (cancelRender) {
        renderTask?.cancel();
      }
      renderTask = null;
      try {
        page?.cleanup();
      } catch {
        /* already destroyed */
      }
      page = null;
    };

    const dropPaint = () => {
      visible = false;
      lastBitmapWidth = 0;
      lastCssWidth = 0;
      releaseLivePage(pageNumber);
      freePage(true);
      releaseCanvas(canvas);
    };

    const render = async () => {
      if (cancelled || !visible) return;

      const scrollRoot = wrap.closest("[data-pdf-scroll]");
      if (!pageIsInPaintWindow(wrap, scrollRoot)) {
        dropPaint();
        return;
      }

      page = await pdf.getPage(pageNumber);
      if (cancelled || !visible) {
        freePage(true);
        return;
      }

      const base = page.getViewport({ scale: 1 });
      const nextAspect = base.height / base.width;
      setAspect((prev) => (Math.abs(prev - nextAspect) < 0.001 ? prev : nextAspect));

      const cssWidth = wrap.clientWidth || window.innerWidth;
      if (cssWidth <= 0) {
        freePage(true);
        return;
      }

      const bitmapWidth = targetBitmapWidth(cssWidth);
      if (
        canvas.width > 1 &&
        bitmapWidth === lastBitmapWidth &&
        Math.abs(cssWidth - lastCssWidth) < RESIZE_WIDTH_SLACK_PX
      ) {
        freePage(false);
        return;
      }

      const scale = bitmapWidth / base.width;
      const viewport = page.getViewport({ scale });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) {
        freePage(true);
        return;
      }
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      claimLivePage(pageNumber, dropPaint);
      renderTask = page.render({ canvas, canvasContext: context, viewport });
      try {
        await renderTask.promise;
        if (cancelled || !visible) {
          releaseCanvas(canvas);
          return;
        }
        lastBitmapWidth = bitmapWidth;
        lastCssWidth = cssWidth;
      } catch (reason) {
        if (cancelled || isPdfjsCancelled(reason)) return;
        throw reason;
      } finally {
        freePage(false);
      }
    };

    const requestRender = () => {
      void enqueuePaint(async () => {
        if (cancelled || !visible) return;
        try {
          await render();
        } catch (reason: unknown) {
          if (cancelled || isPdfjsCancelled(reason)) return;
          console.error(reason);
        }
      });
    };

    const scrollRoot = wrap.closest("[data-pdf-scroll]");

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((entry) => entry.isIntersecting);
        if (enterTimer) {
          clearTimeout(enterTimer);
          enterTimer = null;
        }
        if (!hit) {
          dropPaint();
          return;
        }
        enterTimer = setTimeout(() => {
          if (cancelled) return;
          visible = true;
          requestRender();
        }, 64);
      },
      {
        root: scrollRoot,
        rootMargin: "120px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(wrap);

    const onScroll = () => {
      if (cancelled || !visible) return;
      if (!pageIsInPaintWindow(wrap, scrollRoot)) dropPaint();
    };
    scrollRoot?.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      if (!visible) return;
      const cssWidth = wrap.clientWidth;
      if (Math.abs(cssWidth - lastCssWidth) < RESIZE_WIDTH_SLACK_PX) return;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestRender();
      }, 220);
    });
    resizeObserver.observe(wrap);

    return () => {
      cancelled = true;
      observer.disconnect();
      resizeObserver.disconnect();
      scrollRoot?.removeEventListener("scroll", onScroll);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (enterTimer) clearTimeout(enterTimer);
      dropPaint();
    };
  }, [pdf, pageNumber]);

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgba(45,45,45,0.12)]"
      style={{ aspectRatio: `1 / ${aspect}` }}
    >
      <canvas ref={canvasRef} width={1} height={1} className="block h-auto w-full" />
    </div>
  );
}

/** Renders a PDF as stacked canvases so iPhone can scroll pages natively. */
export function LibraryPdfPages({ src }: { src: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [defaultAspect, setDefaultAspect] = useState(DEFAULT_PAGE_ASPECT);
  const [error, setError] = useState<string | null>(null);

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
        if (!cancelled) setDefaultAspect(nextAspect);
      } catch {
        /* keep default placeholder ratio */
      }

      if (cancelled) {
        destroyTask();
        return;
      }
      setPdf(doc);
    };

    void load().catch((reason: unknown) => {
      destroyTask();
      if (cancelled) return;
      if (isPdfjsCancelled(reason)) return;
      setError("This booklet could not be opened here. Close and try again.");
    });

    return () => {
      cancelled = true;
      destroyTask();
    };
  }, [src]);

  if (error) {
    return (
      <p className="px-4 py-10 text-center font-sans text-sm text-arc-charcoal/70">
        {error}
      </p>
    );
  }

  if (!pdf) {
    return (
      <p className="px-4 py-10 text-center font-sans text-sm text-arc-charcoal/70">
        Loading booklet…
      </p>
    );
  }

  return (
    <div className="space-y-4 px-3 py-4 sm:px-5 sm:py-5">
      {Array.from({ length: pdf.numPages }, (_, index) => (
        <PdfPageCanvas
          key={`${src}-${index + 1}`}
          pdf={pdf}
          pageNumber={index + 1}
          defaultAspect={defaultAspect}
        />
      ))}
    </div>
  );
}

const MIN_PDF_ZOOM = 1;
const MAX_PDF_ZOOM = 3.5;

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

/** Scroll shell with iPhone pinch / double-tap zoom for stacked PDF pages. */
export function LibraryPdfScroller({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sizerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const sizer = sizerRef.current;
    const inner = innerRef.current;
    if (!scroller || !sizer || !inner) return;

    let zoom = 1;
    let pinching = false;
    let pinchStartDist = 1;
    let pinchStartZoom = 1;
    let lastTapAt = 0;
    let lastTapX = 0;
    let lastTapY = 0;

    const applyZoom = (next: number, clientX: number, clientY: number) => {
      const clamped = Math.min(MAX_PDF_ZOOM, Math.max(MIN_PDF_ZOOM, next));
      const prev = zoom;
      if (Math.abs(clamped - prev) < 0.004) return;

      const rect = scroller.getBoundingClientRect();
      const originX = clientX - rect.left + scroller.scrollLeft;
      const originY = clientY - rect.top + scroller.scrollTop;
      const ratio = clamped / prev;

      zoom = clamped;
      if (clamped === 1) {
        inner.style.transform = "none";
        inner.style.width = "100%";
        sizer.style.width = "100%";
        sizer.style.height = "auto";
        scroller.scrollLeft = 0;
        return;
      }

      inner.style.transformOrigin = "0 0";
      inner.style.transform = `scale(${clamped})`;
      sizer.style.width = `${clamped * 100}%`;
      inner.style.width = `${100 / clamped}%`;
      sizer.style.height = `${inner.offsetHeight * clamped}px`;
      scroller.scrollLeft = originX * ratio - (clientX - rect.left);
      scroller.scrollTop = originY * ratio - (clientY - rect.top);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        pinching = true;
        pinchStartDist = pinchDistance(event.touches) || 1;
        pinchStartZoom = zoom;
        lastTapAt = 0;
        return;
      }

      const touch = event.touches[0];
      if (!touch) return;
      const now = performance.now();
      const nearLast = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY) < 44;
      if (now - lastTapAt < 280 && nearLast) {
        event.preventDefault();
        applyZoom(zoom > 1.05 ? 1 : 2, touch.clientX, touch.clientY);
        lastTapAt = 0;
        return;
      }
      lastTapAt = now;
      lastTapX = touch.clientX;
      lastTapY = touch.clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!pinching || event.touches.length < 2) return;
      event.preventDefault();
      const point = pinchMidpoint(event.touches);
      applyZoom(
        pinchStartZoom * (pinchDistance(event.touches) / pinchStartDist),
        point.x,
        point.y,
      );
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length < 2) pinching = false;
    };

    const preventSafariGesture = (event: Event) => {
      event.preventDefault();
    };

    const syncHeight = () => {
      if (zoom === 1) {
        sizer.style.height = "auto";
        return;
      }
      sizer.style.height = `${inner.offsetHeight * zoom}px`;
    };

    scroller.addEventListener("touchstart", onTouchStart, { passive: false });
    scroller.addEventListener("touchmove", onTouchMove, { passive: false });
    scroller.addEventListener("touchend", onTouchEnd);
    scroller.addEventListener("touchcancel", onTouchEnd);
    scroller.addEventListener("gesturestart", preventSafariGesture);
    scroller.addEventListener("gesturechange", preventSafariGesture);
    scroller.addEventListener("gestureend", preventSafariGesture);

    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(inner);

    return () => {
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("touchmove", onTouchMove);
      scroller.removeEventListener("touchend", onTouchEnd);
      scroller.removeEventListener("touchcancel", onTouchEnd);
      scroller.removeEventListener("gesturestart", preventSafariGesture);
      scroller.removeEventListener("gesturechange", preventSafariGesture);
      scroller.removeEventListener("gestureend", preventSafariGesture);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={scrollerRef}
      data-pdf-scroll
      data-arc-modal-scroll
      className={cn(
        "min-h-0 overflow-auto overscroll-contain [touch-action:pan-x_pan-y]",
        className,
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div ref={sizerRef} className="relative w-full">
        <div ref={innerRef} className="w-full origin-top-left">
          {children}
        </div>
      </div>
    </div>
  );
}
