"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type ShowcaseTestimonialItem,
  showcaseTestimonialCardAmbient,
} from "@/client-showcase/mock-page-content";

type MappedTestimonial = {
  id: string;
  name: string;
  designation: string;
  description: string;
  profileImage: string;
  imageAlt: string;
};

function mapItem(t: ShowcaseTestimonialItem): MappedTestimonial {
  return {
    id: t.id,
    name: t.attribution,
    designation: t.context,
    description: t.quote,
    profileImage: t.imageSrc,
    imageAlt: t.imageAlt,
  };
}

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, onOutsideClick: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
}

function ProfileImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-square w-[90px] shrink-0 overflow-hidden rounded-full border-[3px] border-white/45 opacity-95 saturate-[0.88] sepia-[0.12] md:h-[150px] md:w-[150px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="150px"
        loading="lazy"
        decoding="async"
        className={cn("object-cover transition-[filter] duration-300", loaded ? "blur-0" : "blur-sm")}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  onCloseNavigate,
}: {
  testimonial: MappedTestimonial;
  index: number;
  onCloseNavigate: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setIsExpanded(false);
    onCloseNavigate();
  }, [onCloseNavigate]);

  useOutsideClick(panelRef, close);

  useEffect(() => {
    if (!isExpanded) return;

    const scrollY = window.scrollY;
    document.body.dataset.showcaseTScrollY = String(scrollY);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      const y = parseInt(document.body.dataset.showcaseTScrollY ?? "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      delete document.body.dataset.showcaseTScrollY;
      window.scrollTo(0, y);
    };
  }, [isExpanded, close]);

  const excerpt =
    testimonial.description.length > 110
      ? `${testimonial.description.slice(0, 110)}…`
      : testimonial.description;

  const hoverMotion = reduceMotion
    ? undefined
    : ({
        whileHover: {
          rotateX: 2,
          rotateY: 2,
          rotate: 2,
          scale: 1.02,
        },
      } as const);

  return (
    <>
      {mounted &&
        isExpanded &&
        createPortal(
          <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto overflow-x-hidden pt-4 pb-10 sm:pb-12">
            <button
              type="button"
              className="fixed inset-0 bg-arc-charcoal/55 backdrop-blur-md"
              aria-label="Close testimonial overlay"
              onClick={close}
            />
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`showcase-t-author-${testimonial.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.33, 0, 0.2, 1] }}
              className="relative z-[201] mx-4 mb-12 mt-16 w-full max-w-5xl rounded-3xl border border-arc-charcoal/10 bg-gradient-to-b from-[#f2efe8] to-[#faf8f4] p-5 shadow-[0_28px_90px_-30px_rgba(0,0,0,0.45)] md:mt-24 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-[202] flex size-9 items-center justify-center rounded-full bg-arc-charcoal text-white transition-colors hover:bg-arc-charcoal/90 md:right-6 md:top-6"
                onClick={close}
                aria-label="Close"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
              <p className="pr-12 font-serif text-lg font-light text-arc-charcoal/72 underline decoration-arc-charcoal/20 underline-offset-8 md:pr-16 md:text-xl">
                {testimonial.designation}
              </p>
              <p
                id={`showcase-t-author-${testimonial.id}`}
                className="mt-4 font-serif text-2xl font-normal italic text-arc-charcoal/85 md:text-4xl"
              >
                {testimonial.name}
              </p>
              <div className="py-8 font-serif text-xl font-light leading-snug tracking-wide text-arc-charcoal/78 md:text-3xl md:leading-snug">
                <Quote className="mb-4 size-6 shrink-0 text-arc-rose-gold-ink/90" aria-hidden />
                {testimonial.description}
              </div>
            </motion.div>
          </div>,
          document.body,
        )}

      <motion.button
        type="button"
        onClick={() => setIsExpanded(true)}
        className={cn(
          "relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-arc-rose-gold/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
          isExpanded && "pointer-events-none opacity-0",
        )}
        aria-expanded={isExpanded}
        {...(hoverMotion ?? {})}
      >
        <div
          className={cn(
            "relative flex h-[480px] w-[280px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/18 shadow-[0_16px_48px_-28px_rgba(0,0,0,0.35)] sm:h-[500px] sm:w-80 md:h-[550px] md:w-96",
            index % 2 === 1 ? "md:-rotate-1" : "md:rotate-1",
          )}
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <Image
              src={showcaseTestimonialCardAmbient}
              alt=""
              fill
              className="object-cover object-center"
              sizes="400px"
            />
          </div>
          {/* Dark scrim only for type legibility — no cream / white wash over the ambient plate */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/15 to-black/55"
            aria-hidden
          />
          <div className="relative z-[2] shrink-0">
            <ProfileImage src={testimonial.profileImage} alt={testimonial.imageAlt} />
          </div>
          <p className="relative z-[2] mt-4 max-w-[95%] px-3 text-center font-serif text-lg font-normal leading-snug text-white/95 [text-wrap:balance] [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] md:text-xl md:leading-snug">
            {excerpt}
          </p>
          <p className="relative z-[2] mt-5 text-center font-serif text-xl font-semibold text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.5)] md:text-2xl">
            {testimonial.name}
          </p>
          <p className="relative z-[2] mt-2 max-w-[95%] text-center font-serif text-sm font-medium italic text-arc-rose-gold [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] md:text-base">
            {testimonial.designation.length > 40
              ? `${testimonial.designation.slice(0, 40)}…`
              : testimonial.designation}
          </p>
        </div>
      </motion.button>
    </>
  );
}

function Carousel({
  items,
  initialScroll = 0,
}: {
  items: readonly ShowcaseTestimonialItem[];
  initialScroll?: number;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const el = carouselRef.current;
    const track = el?.querySelector("[data-carousel-track]") as HTMLElement | null;
    if (!el || !track || items.length === 0) return;
    const len = items.length;
    const clamped = Math.min(Math.max(0, index), len - 1);
    setActiveIndex(clamped);
    const card = track.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const target = Math.min(card.offsetLeft, maxScroll);
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [items.length]);

  const goNext = useCallback(() => {
    if (activeIndex >= items.length - 1) return;
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, items.length, scrollToIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex <= 0) return;
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const syncIndexFromScroll = useCallback(() => {
    const el = carouselRef.current;
    const track = el?.querySelector("[data-carousel-track]") as HTMLElement | null;
    if (!el || !track || items.length === 0) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const x = el.scrollLeft;
    if (maxScroll > 0 && x >= maxScroll - 2) {
      setActiveIndex(items.length - 1);
      return;
    }
    let best = 0;
    for (let i = 0; i < track.children.length; i++) {
      const c = track.children[i] as HTMLElement;
      if (c.offsetLeft <= x + 8) best = i;
    }
    setActiveIndex(best);
  }, [items.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollLeft = initialScroll;
    syncIndexFromScroll();
  }, [initialScroll, syncIndexFromScroll]);

  const mapped = items.map(mapItem);
  const atStart = activeIndex <= 0;
  const atEnd = items.length === 0 || activeIndex >= items.length - 1;

  return (
    <div className="relative mt-10 w-full">
      <div
        className="flex w-full overflow-x-auto overscroll-x-auto scroll-smooth py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        ref={carouselRef}
        onScroll={syncIndexFromScroll}
      >
        <div className="flex flex-row justify-start gap-4 pl-1 pr-6 md:gap-8 md:pr-12" data-carousel-track>
          {mapped.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.12 * index, ease: "easeOut" },
              }}
              className="shrink-0 rounded-3xl"
            >
              <TestimonialCard
                testimonial={testimonial}
                index={index}
                onCloseNavigate={() => scrollToIndex(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-arc-charcoal text-arc-cream transition-colors duration-200 hover:bg-arc-charcoal/85 disabled:opacity-40"
          onClick={goPrev}
          disabled={atStart}
          aria-label="Previous testimonial"
        >
          <ArrowLeft className="size-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-arc-charcoal text-arc-cream transition-colors duration-200 hover:bg-arc-charcoal/85 disabled:opacity-40"
          onClick={goNext}
          disabled={atEnd}
          aria-label="Next testimonial"
        >
          <ArrowRight className="size-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

type Props = {
  testimonials: readonly ShowcaseTestimonialItem[];
};

/** Horizontal testimonial carousel + expandable cards — aligned to ARC showcase tokens. */
export function ShowcaseTestimonialsCarousel({ testimonials }: Props) {
  return <Carousel items={testimonials} initialScroll={0} />;
}
