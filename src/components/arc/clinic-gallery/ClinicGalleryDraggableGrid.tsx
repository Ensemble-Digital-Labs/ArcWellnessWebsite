"use client";

import Image from "next/image";
import {
  animate,
  cubicBezier,
  motion,
  useMotionValue,
  type Variants,
} from "framer-motion";
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cva } from "class-variance-authority";
import type { ClinicCarouselSlide } from "@/components/arc/ArcClinicCarouselSection";
import { clinicGalleryWrap } from "@/components/arc/clinic-gallery/clinicGalleryWrap";
import { cn } from "@/lib/utils";

type GridVariant = "default" | "masonry";

const GridVariantContext = createContext<GridVariant>("default");

const tileVariants: Variants = {
  initial: { opacity: 0, scale: 0.88 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() * 0.45 + 0.35,
      duration: 1.1,
      ease: cubicBezier(0.18, 0.71, 0.11, 1),
    },
  }),
};

function ClinicGalleryTile({
  slide,
  className,
  disableEntrance = false,
  disableHoverMotion = false,
}: {
  slide: ClinicCarouselSlide;
  className?: string;
  disableEntrance?: boolean;
  disableHoverMotion?: boolean;
}) {
  const variant = useContext(GridVariantContext);

  const tileStyles = cva(
    "group relative aspect-[4/5] w-[min(72vw,280px)] shrink-0 overflow-hidden will-change-transform sm:w-[min(42vw,300px)] md:w-[280px]",
    {
      variants: {
        variant: {
          default: "rounded-sm",
          masonry: "even:mt-[28%] rounded-sm",
        },
      },
      defaultVariants: { variant: "default" },
    },
  );

  return (
    <motion.div
      tabIndex={0}
      className={cn(
        tileStyles({ variant }),
        "outline-none focus-visible:ring-2 focus-visible:ring-arc-teal/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]",
        className,
      )}
      variants={tileVariants}
      initial={disableEntrance ? false : "initial"}
      animate={disableEntrance ? undefined : "animate"}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className={cn(
          "object-cover",
          !disableHoverMotion &&
            "transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]",
          slide.objectPosition ?? "object-center",
        )}
        sizes="(max-width: 768px) 72vw, 280px"
        draggable={false}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-arc-charcoal/80 via-arc-charcoal/20 to-transparent",
          !disableHoverMotion &&
            "opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-within:opacity-100",
          disableHoverMotion && "opacity-80",
        )}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {slide.caption ? (
          <p
            className={cn(
              "mb-2.5 max-w-[24ch] font-serif text-lg leading-snug text-white sm:mb-3 sm:text-xl md:text-[1.35rem]",
              !disableHoverMotion &&
                "translate-y-5 opacity-0 transition-all duration-[550ms] ease-[cubic-bezier(0.18,0.71,0.11,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
              disableHoverMotion && "opacity-100",
            )}
          >
            {slide.caption}
          </p>
        ) : null}
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.26em] text-arc-teal sm:text-[11px]">
          {slide.label}
        </p>
      </div>
    </motion.div>
  );
}

const GridBody = memo(function GridBody({ slides }: { slides: readonly ClinicCarouselSlide[] }) {
  const variant = useContext(GridVariantContext);

  const bodyStyles = cva("grid h-fit w-fit grid-cols-[repeat(2,1fr)] sm:grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(6,1fr)]", {
    variants: {
      variant: {
        default: "gap-6 p-6 md:gap-14 md:p-14",
        masonry: "gap-x-6 px-6 md:gap-x-14 md:px-14",
      },
    },
    defaultVariants: { variant: "default" },
  });

  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={`grid-repeat-${index}`} className={bodyStyles({ variant })}>
          {slides.map((slide, i) => (
            <ClinicGalleryTile key={`${index}-${slide.src}-${i}`} slide={slide} />
          ))}
        </div>
      ))}
    </>
  );
});

export function ClinicGalleryDraggableGrid({
  slides,
  className,
  variant = "default",
}: {
  slides: readonly ClinicCarouselSlide[];
  className?: string;
  variant?: GridVariant;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = ref.current?.getBoundingClientRect();
    if (!container) return;

    const { width, height } = container;

    const unsubX = x.on("change", (latest) => {
      x.set(clinicGalleryWrap(-width / 2, 0, latest));
    });

    const unsubY = y.on("change", (latest) => {
      y.set(clinicGalleryWrap(-height / 2, 0, latest));
    });

    const handleWheel = (event: WheelEvent) => {
      if (isDragging) return;
      event.preventDefault();
      animate(y, y.get() - event.deltaY * 2.2, {
        type: "tween",
        duration: 1.1,
        ease: cubicBezier(0.18, 0.71, 0.11, 1),
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      unsubX();
      unsubY();
      window.removeEventListener("wheel", handleWheel);
    };
  }, [x, y, isDragging]);

  return (
    <GridVariantContext.Provider value={variant}>
      <div className={cn("h-full min-h-0 flex-1 overflow-hidden", className)}>
        <motion.div
          ref={ref}
          className="grid h-fit w-fit cursor-grab grid-cols-[repeat(2,1fr)] bg-[#141414] active:cursor-grabbing will-change-transform"
          drag
          dragMomentum
          dragTransition={{
            timeConstant: 200,
            power: 0.28,
            restDelta: 0,
            bounceStiffness: 0,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{ x, y }}
        >
          <GridBody slides={slides} />
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
}

/** Static grid fallback when reduced motion is preferred. */
export function ClinicGalleryStaticGrid({
  slides,
  className,
  initialSlideIndex = 0,
}: {
  slides: readonly ClinicCarouselSlide[];
  className?: string;
  initialSlideIndex?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const didInitialFocusRef = useRef(false);

  useLayoutEffect(() => {
    if (didInitialFocusRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    didInitialFocusRef.current = true;

    const focus = container.querySelector<HTMLElement>("[data-gallery-focus]");
    if (!focus) {
      container.scrollTop = 0;
      return;
    }
    const containerTop = container.getBoundingClientRect().top;
    const focusTop = focus.getBoundingClientRect().top;
    container.scrollTop += focusTop - containerTop - 16;
  }, [initialSlideIndex, slides.length]);

  return (
    <div
      ref={scrollRef}
      data-arc-clinic-gallery-scroll
      className={cn(
        "flex-1 overflow-y-auto overscroll-contain px-6 py-8 touch-pan-y",
        "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            data-gallery-focus={index === initialSlideIndex ? "" : undefined}
            className={cn(index === initialSlideIndex && "scroll-mt-4")}
          >
            <ClinicGalleryTile
              slide={slide}
              className="w-full even:mt-0"
              disableEntrance
            />
          </div>
        ))}
      </div>
    </div>
  );
}
