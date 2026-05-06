"use client";

import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";

import { cn } from "@/lib/utils";

// —— types —— //

export type ImageData = {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  /** When embedded in testimonials, ties a tile to `ArcTestimonialItem.id`. */
  testimonialId?: string;
};

type SphericalPosition = { theta: number; phi: number; radius: number };
type Position3D = { x: number; y: number; z: number };

type WorldPosition = Position3D & {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  depthOpacity: number;
  originalIndex: number;
};

export type SphereImageGridProps = {
  images?: ImageData[];
  className?: string;
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  /** Highlight tiles linked to this id (`testimonialId` or `id`). */
  selectedId?: string | null;
  onImageSelect?: (image: ImageData) => void;
  /** Fullscreen detail modal (off for testimonials — use right-hand card). */
  showModal?: boolean;
  /** Cap `containerSize` to parent width (mobile). */
  fitContainer?: boolean;
  /** **`dark`** — black void styling (testimonial column). */
  theme?: "dark" | "light";
  /**
   * **`arc`** — full-sphere Fibonacci + volumetric dark look (testimonials).
   * **`demo`** — classic pole-spread + XY scale + collision (matches reference **DemoOne**; deterministic, no `Math.random`).
   */
  layoutMode?: "arc" | "demo";
  /** Override default starting angles (`demo` defaults ~15°/15°; `arc` ~22°/-14°). */
  initialRotation?: { x: number; y: number; z: number };
};

const SPHERE_MATH = {
  degreesToRadians: (d: number) => d * (Math.PI / 180),
  normalizeAngle: (angle: number) => {
    let a = angle;
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  },
};

/**
 * Even Fibonacci coverage on a full sphere (avoids equator-only “ring” clustering).
 */
function generateSpherePositions(count: number, radius: number): SphericalPosition[] {
  if (count <= 0) return [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const angleIncrement = (2 * Math.PI) / goldenRatio;
  const positions: SphericalPosition[] = [];

  for (let i = 0; i < count; i++) {
    const t = count <= 1 ? 0.5 : (i + 0.5) / count;
    const inclination = Math.acos(Math.max(-1, Math.min(1, 1 - 2 * t)));
    const azimuth = angleIncrement * i;
    const phi = inclination * (180 / Math.PI);
    const theta = ((azimuth * (180 / Math.PI)) % 360 + 360) % 360;

    positions.push({ theta, phi, radius });
  }
  return positions;
}

/**
 * Reference **DemoOne** distribution: pole emphasis + mapped φ range, with
 * **deterministic** jitter (the original snippet used `Math.random`, which breaks SSR).
 */
function generateDemoSpherePositions(count: number, radius: number): SphericalPosition[] {
  if (count <= 0) return [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const angleIncrement = (2 * Math.PI) / goldenRatio;
  const positions: SphericalPosition[] = [];

  for (let i = 0; i < count; i++) {
    const t = count <= 1 ? 0.5 : i / count;
    const inclination = Math.acos(Math.max(-1, Math.min(1, 1 - 2 * t)));
    const azimuth = angleIncrement * i;
    let phi = inclination * (180 / Math.PI);
    let theta = (azimuth * (180 / Math.PI)) % 360;

    const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
    if (phi < 90) {
      phi = Math.max(5, phi - poleBonus);
    } else {
      phi = Math.min(175, phi + poleBonus);
    }

    phi = 15 + (phi / 180) * 150;

    const thetaJitter = ((i * 17.302) % 20) - 10;
    theta = (theta + thetaJitter) % 360;
    const phiJitter = ((i * 11.713) % 10) - 5;
    phi = Math.max(0, Math.min(180, phi + phiJitter));

    positions.push({ theta, phi, radius });
  }
  return positions;
}

function subscribePrefersReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getPrefersReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Interactive Fibonacci sphere (drag, momentum, auto-rotate, optional modal).
 * Physics uses refs to avoid stale velocity in the animation loop.
 */
export default function SphereImageGrid({
  images = [],
  className,
  containerSize: containerSizeProp = 600,
  sphereRadius: sphereRadiusProp = 200,
  dragSensitivity = 0.8,
  momentumDecay = 0.96,
  maxRotationSpeed = 6,
  baseImageScale = 0.15,
  hoverScale = 1.3,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 0.2,
  selectedId = null,
  onImageSelect,
  showModal = true,
  fitContainer = false,
  theme = "light",
  layoutMode = "arc",
  initialRotation: initialRotationProp,
}: SphereImageGridProps) {
  const isDark = theme === "dark";
  const isDemoLayout = layoutMode === "demo";
  const defaultRotation =
    initialRotationProp ??
    (isDemoLayout ? { x: 15, y: 15, z: 0 } : { x: 22, y: -14, z: 0 });
  const outerRef = useRef<HTMLDivElement>(null);
  const [measuredW, setMeasuredW] = useState(0);
  const [layoutReady, setLayoutReady] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    () => false,
  );
  const [rotation, setRotation] = useState(defaultRotation);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);

  const rotationRef = useRef(defaultRotation);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!fitContainer) return;
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w > 0) setMeasuredW(Math.floor(w));
    });
    ro.observe(el);
    const w = el.clientWidth;
    if (w > 0) setMeasuredW(Math.floor(w));
    return () => ro.disconnect();
  }, [fitContainer]);

  const containerSize = useMemo(() => {
    if (!fitContainer || measuredW <= 0) return containerSizeProp;
    return Math.max(260, Math.min(containerSizeProp, measuredW));
  }, [fitContainer, measuredW, containerSizeProp]);

  const actualSphereRadius =
    sphereRadiusProp > 0 ? sphereRadiusProp : containerSize * 0.5;
  const baseImageSize = containerSize * baseImageScale;

  useLayoutEffect(() => {
    setLayoutReady(true);
  }, []);

  const imagePositions = useMemo(
    () =>
      isDemoLayout
        ? generateDemoSpherePositions(images.length, actualSphereRadius)
        : generateSpherePositions(images.length, actualSphereRadius),
    [images.length, actualSphereRadius, isDemoLayout],
  );

  const clampRotationSpeed = useCallback(
    (speed: number) =>
      Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed)),
    [maxRotationSpeed],
  );

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const rot = rotation;
    const rotXRad = SPHERE_MATH.degreesToRadians(rot.x);
    const rotYRad = SPHERE_MATH.degreesToRadians(rot.y);

    const positions = imagePositions.map((pos, index) => {
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);

      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const depthT = Math.max(0, Math.min(1, depthScale));

      let scale: number;
      let depthOpacity: number;
      let isVisible: boolean;
      let fadeOpacity: number;

      if (isDemoLayout) {
        const fadeZoneStart = -10;
        const fadeZoneEnd = -30;
        isVisible = worldPos.z > fadeZoneEnd;
        fadeOpacity = 1;
        if (worldPos.z <= fadeZoneStart) {
          fadeOpacity = Math.max(
            0,
            (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd),
          );
        }
        const isPoleImage = pos.phi < 30 || pos.phi > 150;
        const distanceFromCenter = Math.sqrt(
          worldPos.x * worldPos.x + worldPos.y * worldPos.y,
        );
        const maxDistance = actualSphereRadius;
        const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);
        const distancePenalty = isPoleImage ? 0.4 : 0.7;
        const centerScale = Math.max(0.3, 1 - distanceRatio * distancePenalty);
        scale = centerScale * Math.max(0.5, 0.8 + depthScale * 0.3);
        depthOpacity = 1;
      } else {
        const fadeZoneStart = isDark ? -4 : -10;
        const fadeZoneEnd = isDark ? -54 : -48;
        isVisible = worldPos.z > fadeZoneEnd;
        fadeOpacity = 1;
        if (worldPos.z <= fadeZoneStart) {
          fadeOpacity = Math.max(
            0,
            (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd),
          );
        }

        if (isDark) {
          /*
           * Volumetric (ref: strong shell on black): steep Z curves so back tiles are
           * small + ghosted; front tiles read large and opaque (~3–4× perceived gap).
           */
          const depthPowScale = Math.pow(depthT, 0.58);
          scale = 0.03 + 0.97 * depthPowScale;
          const depthPowAlpha = Math.pow(depthT, 0.64);
          depthOpacity = 0.07 + 0.93 * depthPowAlpha;
        } else {
          const isPoleImage = pos.phi < 30 || pos.phi > 150;
          const distanceFromCenter = Math.sqrt(
            worldPos.x * worldPos.x + worldPos.y * worldPos.y,
          );
          const maxDistance = actualSphereRadius;
          const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);
          const distancePenalty = isPoleImage ? 0.55 : 0.82;
          const centerScale = Math.max(0.22, 1 - distanceRatio * distancePenalty);
          scale =
            centerScale *
            Math.max(0.42, 0.62 + Math.pow(depthT, 0.92) * 0.55);
          depthOpacity = 0.34 + 0.66 * Math.pow(depthT, 0.78);
        }
      }

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        depthOpacity,
        originalIndex: index,
      };
    });

    const adjusted = [...positions];
    /*
     * Collision pass — reference **demo** layout + light **`arc`** theme.
     * Skip for dark volumetric **`arc`** (testimonials).
     */
    if (isDemoLayout || !isDark) {
      for (let i = 0; i < adjusted.length; i++) {
        const pos = adjusted[i];
        if (!pos.isVisible) continue;
        let adjustedScale = pos.scale;
        const imageSize = baseImageSize * adjustedScale;

        for (let j = 0; j < adjusted.length; j++) {
          if (i === j) continue;
          const other = adjusted[j];
          if (!other.isVisible) continue;
          const otherSize = baseImageSize * other.scale;
          const dx = pos.x - other.x;
          const dy = pos.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (imageSize + otherSize) / 2 + 25;
          if (distance < minDistance && distance > 0) {
            const overlap = minDistance - distance;
            const reductionFactor = Math.max(0.4, 1 - (overlap / minDistance) * 0.6);
            adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
          }
        }
        adjusted[i] = {
          ...pos,
          scale: Math.max(0.25, adjustedScale),
        };
      }
    }
    return adjusted;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize, isDark, isDemoLayout]);

  const worldPositions = calculateWorldPositions();

  const allowSpin = autoRotate && !reduceMotion;

  useEffect(() => {
    if (reduceMotion) return;

    const tick = () => {
      if (!isDraggingRef.current) {
        let vx = velocityRef.current.x * momentumDecay;
        let vy = velocityRef.current.y * momentumDecay;
        if (!allowSpin && Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) {
          vx = 0;
          vy = 0;
        }
        velocityRef.current = { x: vx, y: vy };

        const prev = rotationRef.current;
        let nx = prev.x + clampRotationSpeed(vx);
        let ny = prev.y + clampRotationSpeed(vy);
        if (allowSpin) ny += autoRotateSpeed;
        const next = {
          x: SPHERE_MATH.normalizeAngle(nx),
          y: SPHERE_MATH.normalizeAngle(ny),
          z: prev.z,
        };
        rotationRef.current = next;
        setRotation(next);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, allowSpin, momentumDecay, clampRotationSpeed, autoRotateSpeed]);

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      const rotationDelta = {
        x: -deltaY * dragSensitivity,
        y: deltaX * dragSensitivity,
      };
      const prev = rotationRef.current;
      const next = {
        x: SPHERE_MATH.normalizeAngle(
          prev.x + clampRotationSpeed(rotationDelta.x),
        ),
        y: SPHERE_MATH.normalizeAngle(
          prev.y + clampRotationSpeed(rotationDelta.y),
        ),
        z: prev.z,
      };
      rotationRef.current = next;
      setRotation(next);
      velocityRef.current = {
        x: clampRotationSpeed(rotationDelta.x),
        y: clampRotationSpeed(rotationDelta.y),
      };
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    },
    [dragSensitivity, clampRotationSpeed],
  );

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e: ReactTouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback(
    (e: globalThis.TouchEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch) return;
      const deltaX = touch.clientX - lastMousePos.current.x;
      const deltaY = touch.clientY - lastMousePos.current.y;
      const rotationDelta = {
        x: -deltaY * dragSensitivity,
        y: deltaX * dragSensitivity,
      };
      const prev = rotationRef.current;
      const next = {
        x: SPHERE_MATH.normalizeAngle(
          prev.x + clampRotationSpeed(rotationDelta.x),
        ),
        y: SPHERE_MATH.normalizeAngle(
          prev.y + clampRotationSpeed(rotationDelta.y),
        ),
        z: prev.z,
      };
      rotationRef.current = next;
      setRotation(next);
      velocityRef.current = {
        x: clampRotationSpeed(rotationDelta.x),
        y: clampRotationSpeed(rotationDelta.y),
      };
      lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    },
    [dragSensitivity, clampRotationSpeed],
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [reduceMotion, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const tileRing = isDark
    ? "border-white/18 shadow-[0_10px_36px_rgba(0,0,0,0.88)] focus-visible:ring-offset-black"
    : "border-white/20 shadow-lg focus-visible:ring-offset-white";

  const tileSelected = "border-arc-teal ring-2 ring-arc-teal/75";
  /** Thick mint/teal halo like the reference split-layout mock */
  const tileSelectedDark = cn(
    tileSelected,
    "border-[2.5px] ring-[3px] ring-arc-teal shadow-[0_0_36px_rgba(78,196,176,0.55),0_0_14px_rgba(78,196,176,0.35)]",
  );

  const isTileSelected = (img: ImageData) => {
    if (selectedId == null) return false;
    if (img.testimonialId != null) return img.testimonialId === selectedId;
    return img.id === selectedId;
  };

  const handleTileClick = (image: ImageData) => {
    onImageSelect?.(image);
    if (showModal) setModalImage(image);
  };

  if (!images.length) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-dashed p-8 text-sm",
          isDark ? "border-zinc-600 text-zinc-500" : "border-gray-300 text-gray-500",
          className,
        )}
        style={{ width: containerSize, height: containerSize }}
      >
        No images
      </div>
    );
  }

  if (!layoutReady) {
    return (
      <div ref={outerRef} className={cn("flex justify-center", className)}>
        <div
          className="relative select-none"
          style={{
            width: containerSize,
            height: containerSize,
            perspective: `${Math.round(isDark ? perspective * 1.38 : perspective)}px`,
          }}
          aria-busy
        />
      </div>
    );
  }

  if (reduceMotion) {
    return (
      <div ref={outerRef} className={cn("w-full", className)}>
        <div className="flex flex-wrap justify-center gap-3">
          {images.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => handleTileClick(img)}
              className={cn(
                "relative size-20 overflow-hidden rounded-full border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal focus-visible:ring-offset-2 sm:size-24",
                tileRing,
                isTileSelected(img) ? (isDark ? tileSelectedDark : tileSelected) : null,
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="size-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
        {showModal && modalImage ? (
          <Modal image={modalImage} onClose={() => setModalImage(null)} />
        ) : null}
      </div>
    );
  }

  return (
    <div ref={outerRef} className={cn("flex justify-center", className)}>
      <div
        className="relative cursor-grab select-none active:cursor-grabbing"
        style={{
          width: containerSize,
          height: containerSize,
          perspective: `${Math.round(isDark ? perspective * 1.38 : perspective)}px`,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="relative size-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => {
            const position = worldPositions[index];
            if (!position?.isVisible) return null;

            const imageSize = baseImageSize * position.scale;
            const isHovered = hoveredIndex === index;
            const selectedTile = isTileSelected(image);
            const hoverMul = isHovered
              ? Math.min(hoverScale, hoverScale / Math.max(position.scale, 0.22))
              : 1;
            const selectedMul =
              isDark && !isDemoLayout && selectedTile ? 1.58 : 1;
            const finalScale = hoverMul * selectedMul;
            const opacity = position.fadeOpacity * position.depthOpacity;

            return (
              <div
                key={image.id}
                className="absolute transition-transform duration-200 ease-out"
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  left: `${containerSize / 2 + position.x}px`,
                  top: `${containerSize / 2 + position.y}px`,
                  opacity,
                  transform: `translate(-50%, -50%) scale(${finalScale})`,
                  zIndex: position.zIndex,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <button
                  type="button"
                  onClick={() => handleTileClick(image)}
                  className={cn(
                    "relative size-full overflow-hidden rounded-full border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-arc-teal focus-visible:ring-offset-2",
                    tileRing,
                    isTileSelected(image)
                      ? isDark
                        ? tileSelectedDark
                        : tileSelected
                      : null,
                  )}
                  aria-label={image.title ?? image.alt}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="size-full object-cover"
                    draggable={false}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && modalImage ? (
        <Modal image={modalImage} onClose={() => setModalImage(null)} />
      ) : null}
    </div>
  );
}

function Modal({
  image,
  onClose,
}: {
  image: ImageData;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal
        aria-labelledby="img-sphere-modal-title"
      >
        <div className="relative aspect-square bg-arc-charcoal/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="size-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {(image.title || image.description) && (
          <div className="p-6">
            {image.title ? (
              <h3
                id="img-sphere-modal-title"
                className="mb-2 font-serif text-xl font-semibold text-arc-charcoal"
              >
                {image.title}
              </h3>
            ) : null}
            {image.description ? (
              <p className="font-sans text-sm leading-relaxed text-arc-charcoal/75">
                {image.description}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
