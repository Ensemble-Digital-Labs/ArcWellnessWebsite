"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

const WORKER_SRC = "/assets/library/pdf.worker.min.mjs";

function PdfPageCanvas({
  pdf,
  pageNumber,
}: {
  pdf: PDFDocumentProxy;
  pageNumber: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aspect, setAspect] = useState(1.294);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;

    const render = async () => {
      const page = await pdf.getPage(pageNumber);
      if (cancelled) return;

      const base = page.getViewport({ scale: 1 });
      setAspect(base.height / base.width);

      const cssWidth = wrap.clientWidth || window.innerWidth;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = (cssWidth / base.width) * pixelRatio;
      const viewport = page.getViewport({ scale });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = "100%";
      canvas.style.height = "auto";

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      // pdfjs-dist v6 RenderParameters requires `canvas` (canvasContext optional).
      renderTask = page.render({ canvas, canvasContext: context, viewport });
      await renderTask.promise;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          void render();
        }
      },
      { root: wrap.closest("[data-pdf-scroll]"), rootMargin: "240px 0px" },
    );

    observer.observe(wrap);

    return () => {
      cancelled = true;
      observer.disconnect();
      renderTask?.cancel();
    };
  }, [pdf, pageNumber]);

  return (
    <div
      ref={wrapRef}
      className="overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgba(45,45,45,0.12)]"
      style={{ aspectRatio: `1 / ${aspect}` }}
    >
      <canvas ref={canvasRef} className="block h-auto w-full" />
    </div>
  );
}

/** Renders a PDF as stacked canvases so iPhone can scroll pages natively. */
export function LibraryPdfPages({ src }: { src: string }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let destroyTask: (() => Promise<unknown>) | null = null;

    const load = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = WORKER_SRC;
      const loadingTask = pdfjs.getDocument({
        url: src,
        disableRange: true,
        disableStream: true,
      });
      destroyTask = () => loadingTask.destroy();
      const doc = await loadingTask.promise;
      if (cancelled) {
        return;
      }
      setPdf(doc);
    };

    void load().catch((reason: unknown) => {
      if (cancelled) return;
      const name =
        reason && typeof reason === "object" && "name" in reason
          ? String((reason as { name?: string }).name)
          : "";
      if (name === "AbortException" || name === "RenderingCancelledException") return;
      setError("This booklet could not be opened here. Use Download to view it.");
    });

    return () => {
      cancelled = true;
      void destroyTask?.().catch(() => {});
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
        <PdfPageCanvas key={`${src}-${index + 1}`} pdf={pdf} pageNumber={index + 1} />
      ))}
    </div>
  );
}
