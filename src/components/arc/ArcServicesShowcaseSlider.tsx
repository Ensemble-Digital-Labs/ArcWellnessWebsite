"use client";

import * as THREE from "three";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type RefObject, type ReactNode } from "react";
import type { ServicesShowcaseSlide } from "@/content/servicesShowcaseSlides";
import { servicesShowcaseNavLabel } from "@/content/servicesShowcaseSlides";
import { cn } from "@/lib/utils";
import { ArcTextReveal } from "@/components/arc/ArcTextReveal";
import { ARC_SERVICES_SHOWCASE_NAV_TOP_FEATHER_CLASS } from "@/lib/arc-layout";
import {
  servicesShowcaseFragmentShader,
  servicesShowcaseVertexShader,
} from "@/components/arc/arcServicesShowcaseShaders";

const SLIDER_CONFIG = {
  settings: {
    transitionDuration: 2.5,
    autoSlideSpeed: 5000,
    currentEffect: "glass" as const,
    currentEffectPreset: "Default" as const,
    globalIntensity: 1.0,
    speedMultiplier: 1.0,
    distortionStrength: 1.0,
    colorEnhancement: 1.0,
    glassRefractionStrength: 1.0,
    glassChromaticAberration: 1.0,
    glassBubbleClarity: 1.0,
    glassEdgeGlow: 1.0,
    glassLiquidFlow: 1.0,
    frostIntensity: 1.5,
    frostCrystalSize: 1.0,
    frostIceCoverage: 1.0,
    frostTemperature: 1.0,
    frostTexture: 1.0,
    rippleFrequency: 25.0,
    rippleAmplitude: 0.08,
    rippleWaveSpeed: 1.0,
    rippleRippleCount: 1.0,
    rippleDecay: 1.0,
    plasmaIntensity: 1.2,
    plasmaSpeed: 0.8,
    plasmaEnergyIntensity: 0.4,
    plasmaContrastBoost: 0.3,
    plasmaTurbulence: 1.0,
    timeshiftDistortion: 1.6,
    timeshiftBlur: 1.5,
    timeshiftFlow: 1.4,
    timeshiftChromatic: 1.5,
    timeshiftTurbulence: 1.4,
  },
};

/** Light editorial photography + cream tab bar below (section may exceed one viewport). */
const SHOWCASE_SHELL_CLASS =
  "relative isolate flex w-full max-w-none flex-col overflow-x-clip rounded-none bg-arc-cream";
/** Full-viewport photography stage — nav sits beneath in document flow. */
const SHOWCASE_MEDIA_STAGE_CLASS =
  "relative h-[100dvh] min-h-[320px] w-full overflow-hidden bg-arc-cream";
/** Frosted glass chip — sits low on the photo; light type for contrast on imagery. */
const SHOWCASE_SLIDE_GLASS_CLASS =
  "inline-flex w-fit max-w-[min(calc(100vw-3rem),40rem)] flex-col items-center gap-2 rounded-2xl border border-white/45 bg-arc-charcoal/45 px-5 py-4 text-center shadow-[0_16px_48px_rgba(0,0,0,0.28)] ring-1 ring-white/20 backdrop-blur-xl supports-[backdrop-filter]:bg-arc-charcoal/38 sm:gap-2.5 sm:px-7 sm:py-5";
/** Anchors the glass pill near the bottom of the photo stage (above the nav feather). */
const SHOWCASE_SLIDE_COPY_WRAP_CLASS =
  "pointer-events-auto absolute inset-x-0 bottom-28 z-[1] flex w-full justify-center px-4 sm:bottom-32 sm:px-6 md:bottom-36";
const SHOWCASE_SLIDE_TITLE_CLASS =
  "max-w-full font-serif text-[1.65rem] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-2xl md:text-[1.85rem] lg:text-3xl [&_span]:text-white";
const SHOWCASE_SLIDE_DESC_CLASS =
  "mx-auto max-w-xl font-sans text-sm font-medium leading-relaxed text-white/92 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:text-[0.9375rem] md:leading-relaxed";
const SHOWCASE_CTRL_BTN_CLASS =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-arc-charcoal/18 bg-white/90 text-arc-charcoal shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-arc-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arc-teal/45";
/** In-flow tab bar — not clipped by the media stage; keeps blur feather above. */
const SHOWCASE_NAV_SHELL_CLASS =
  "pointer-events-none relative z-20 w-full shrink-0";
const SHOWCASE_NAV_CLASS =
  "arc-slide-nav arc-slide-nav--light slides-navigation pointer-events-auto relative flex w-full flex-nowrap items-stretch justify-between gap-0 overflow-x-auto overflow-y-visible overscroll-x-contain bg-arc-cream px-2 py-3.5 shadow-[0_-10px_36px_rgba(131,208,187,0.14),0_-2px_12px_rgba(44,44,44,0.06)] [-ms-overflow-style:none] [scrollbar-width:none] sm:px-4 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-5 [&::-webkit-scrollbar]:hidden";
/** Slide overlay inside the media stage only. */
const SHOWCASE_SLIDE_CONTENT_CLASS =
  "slide-content pointer-events-none absolute inset-0 z-10 flex min-h-0 flex-col px-6 pb-8 pt-[calc(7rem+1.25rem+env(safe-area-inset-top,0px))] sm:px-10 sm:pt-[calc(8.5rem+1.25rem+env(safe-area-inset-top,0px))] md:px-14 md:pt-[calc(9.5rem+1.25rem+env(safe-area-inset-top,0px))] lg:px-16 lg:pt-[calc(10rem+1.25rem+env(safe-area-inset-top,0px))]";

function ServicesShowcaseNav({
  className,
  navRef,
  children,
}: {
  className?: string;
  navRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
}) {
  return (
    <div className={SHOWCASE_NAV_SHELL_CLASS}>
      <div aria-hidden className={ARC_SERVICES_SHOWCASE_NAV_TOP_FEATHER_CLASS} />
      <nav
        ref={navRef}
        id="slidesNav"
        className={cn(SHOWCASE_NAV_CLASS, className)}
        aria-label="Slide navigation"
      >
        {children}
      </nav>
    </div>
  );
}

function getEffectIndex(name: string): number {
  const map: Record<string, number> = {
    glass: 0,
    frost: 1,
    ripple: 2,
    plasma: 3,
    timeshift: 4,
  };
  return map[name] ?? 0;
}

function splitTextForTitle(text: string): string {
  return text
    .split("")
    .map((char) =>
      `<span style="display:inline-block;opacity:0">${char === " " ? "&nbsp;" : char}</span>`,
    )
    .join("");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ShowcaseProps = {
  slides: readonly ServicesShowcaseSlide[];
  className?: string;
};

/** Static crossfade + typography when user prefers reduced motion. */
function ServicesShowcaseReducedMotion({ slides, className }: ShowcaseProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDER_CONFIG.settings.autoSlideSpeed);
    return () => window.clearInterval(t);
  }, [slides.length]);

  const current = slides[index] ?? slides[0];
  if (!current) return null;

  return (
    <section
      className={cn(SHOWCASE_SHELL_CLASS, className)}
      aria-roledescription="carousel"
      aria-label="Whole-body care highlights"
    >
      <div className={SHOWCASE_MEDIA_STAGE_CLASS}>
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.imageSrc}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-out",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <Image
                src={s.imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
        <div className={SHOWCASE_SLIDE_CONTENT_CLASS}>
          <div className={SHOWCASE_SLIDE_COPY_WRAP_CLASS}>
            <div className={SHOWCASE_SLIDE_GLASS_CLASS}>
              <ArcTextReveal variant="line" delayIndex={1}>
                <h2 className={SHOWCASE_SLIDE_TITLE_CLASS}>{current.title}</h2>
              </ArcTextReveal>
              <ArcTextReveal variant="body" delayIndex={2}>
                <p className={SHOWCASE_SLIDE_DESC_CLASS}>{current.description}</p>
              </ArcTextReveal>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-4 md:left-6">
          <button
            type="button"
            className={SHOWCASE_CTRL_BTN_CLASS}
            aria-label="Previous slide"
            onClick={() =>
              setIndex((i) => (i - 1 + slides.length) % slides.length)
            }
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="pointer-events-auto absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-4 md:right-6">
          <button
            type="button"
            className={SHOWCASE_CTRL_BTN_CLASS}
            aria-label="Next slide"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <ServicesShowcaseNav>
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            data-slide-nav-item=""
            data-active={i === index ? "true" : "false"}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
            className={cn(
              "slide-nav-item arc-slide-nav-item",
              i === index && "active",
            )}
          >
            <div className="slide-progress-line" aria-hidden />
            <div className="slide-nav-title arc-slide-nav-label">
              {servicesShowcaseNavLabel(s)}
            </div>
          </button>
        ))}
      </ServicesShowcaseNav>
    </section>
  );
}

function WebGLShowcase({ slides, className }: ShowcaseProps) {
  const [webglReady, setWebglReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterSrc = slides[0]?.imageSrc;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const slidesRef = useRef(slides);
  slidesRef.current = slides;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const navEl = navRef.current;
    if (!root || !canvas || !titleEl || !descEl || !navEl) return;

    const slideList = slidesRef.current;
    if (slideList.length < 2) return;

    let disposed = false;
    let currentSlideIndex = 0;
    let isTransitioning = false;
    let shaderMaterial: THREE.ShaderMaterial | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    const slideTextures: THREE.Texture[] = [];
    let texturesLoaded = false;
    let sliderEnabled = false;
    let progressAnimation: ReturnType<typeof setInterval> | null = null;
    /** Browser timer id, avoid `NodeJS.Timeout` union from Node typings */
    let autoSlideTimer: number | null = null;
    let rafId = 0;
    let isInView = true;

    const gsapCtx = gsap.context(() => {}, root);

    const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
    const PROGRESS_UPDATE_INTERVAL = 50;
    const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

    function renderLoop() {
      if (disposed) return;
      if (!isInView) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(renderLoop);
      if (renderer && scene && camera) renderer.render(scene, camera);
    }

    const loadImageTexture = (src: string) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          src,
          (t) => {
            t.minFilter = THREE.LinearFilter;
            t.magFilter = THREE.LinearFilter;
            // Pass-through: custom ShaderMaterial has no colorspace chunks; marking
            // SRGB + default output encoding made slide photography look too dark.
            t.colorSpace = THREE.NoColorSpace;
            t.userData = {
              size: new THREE.Vector2(t.image.width, t.image.height),
            };
            resolve(t);
          },
          undefined,
          reject,
        );
      });

    const updateShaderUniforms = () => {
      if (!shaderMaterial) return;
      const s = SLIDER_CONFIG.settings;
      const u = shaderMaterial.uniforms;
      u.uGlobalIntensity.value = s.globalIntensity;
      u.uSpeedMultiplier.value = s.speedMultiplier;
      u.uDistortionStrength.value = s.distortionStrength;
      u.uColorEnhancement.value = s.colorEnhancement;
      u.uGlassRefractionStrength.value = s.glassRefractionStrength;
      u.uGlassChromaticAberration.value = s.glassChromaticAberration;
      u.uGlassBubbleClarity.value = s.glassBubbleClarity;
      u.uGlassEdgeGlow.value = s.glassEdgeGlow;
      u.uGlassLiquidFlow.value = s.glassLiquidFlow;
      u.uFrostIntensity.value = s.frostIntensity;
      u.uFrostCrystalSize.value = s.frostCrystalSize;
      u.uFrostIceCoverage.value = s.frostIceCoverage;
      u.uFrostTemperature.value = s.frostTemperature;
      u.uFrostTexture.value = s.frostTexture;
      u.uRippleFrequency.value = s.rippleFrequency;
      u.uRippleAmplitude.value = s.rippleAmplitude;
      u.uRippleWaveSpeed.value = s.rippleWaveSpeed;
      u.uRippleRippleCount.value = s.rippleRippleCount;
      u.uRippleDecay.value = s.rippleDecay;
      u.uPlasmaIntensity.value = s.plasmaIntensity;
      u.uPlasmaSpeed.value = s.plasmaSpeed;
      u.uPlasmaEnergyIntensity.value = s.plasmaEnergyIntensity;
      u.uPlasmaContrastBoost.value = s.plasmaContrastBoost;
      u.uPlasmaTurbulence.value = s.plasmaTurbulence;
      u.uTimeshiftDistortion.value = s.timeshiftDistortion;
      u.uTimeshiftBlur.value = s.timeshiftBlur;
      u.uTimeshiftFlow.value = s.timeshiftFlow;
      u.uTimeshiftChromatic.value = s.timeshiftChromatic;
      u.uTimeshiftTurbulence.value = s.timeshiftTurbulence;
      u.uEffectType.value = getEffectIndex(s.currentEffect);
    };

    const updateNavigationState = (idx: number) => {
      navEl.querySelectorAll("[data-slide-nav-item]").forEach((el, i) => {
        const on = i === idx;
        el.setAttribute("data-active", on ? "true" : "false");
        el.classList.toggle("active", on);
        if (on) el.setAttribute("aria-current", "true");
        else el.removeAttribute("aria-current");
      });
    };

    const updateSlideProgress = (idx: number, prog: number) => {
      const el = navEl
        .querySelectorAll("[data-slide-nav-item]")
        [idx]?.querySelector("[data-progress-fill]") as HTMLElement | null;
      if (el) {
        el.style.width = `${prog}%`;
        el.style.opacity = "1";
      }
    };

    const fadeSlideProgress = (idx: number) => {
      const el = navEl
        .querySelectorAll("[data-slide-nav-item]")
        [idx]?.querySelector("[data-progress-fill]") as HTMLElement | null;
      if (el) {
        el.style.opacity = "0";
        window.setTimeout(() => {
          el.style.width = "0%";
        }, 300);
      }
    };

    const quickResetProgress = (idx: number) => {
      const el = navEl
        .querySelectorAll("[data-slide-nav-item]")
        [idx]?.querySelector("[data-progress-fill]") as HTMLElement | null;
      if (el) {
        el.style.transition = "width 0.2s ease-out";
        el.style.width = "0%";
        window.setTimeout(() => {
          el.style.transition =
            "width 0.1s linear, opacity 0.3s ease";
        }, 200);
      }
    };

    const stopAutoSlideTimer = () => {
      if (progressAnimation) {
        clearInterval(progressAnimation);
        progressAnimation = null;
      }
      if (autoSlideTimer) {
        clearTimeout(autoSlideTimer);
        autoSlideTimer = null;
      }
    };

    const updateContent = (idx: number) => {
      if (!titleEl || !descEl) return;
      gsap.to(titleEl.children, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "power2.in",
      });
      gsap.to(descEl, {
        y: -10,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      window.setTimeout(() => {
        if (disposed) return;
        titleEl.innerHTML = splitTextForTitle(slideList[idx].title);
        descEl.textContent = slideList[idx].description;
        gsap.set(titleEl.children, { opacity: 0 });
        gsap.set(descEl, { y: 20, opacity: 0 });

        const children = titleEl.children;
        const animIdx = idx % 6;
        switch (animIdx) {
          case 0:
            gsap.set(children, { y: 20 });
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
            });
            break;
          case 1:
            gsap.set(children, { y: -20 });
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "back.out(1.7)",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
            });
            break;
          case 2:
            gsap.set(children, {
              filter: "blur(10px)",
              scale: 1.5,
              y: 0,
            });
            gsap.to(children, {
              filter: "blur(0px)",
              scale: 1,
              opacity: 1,
              duration: 1,
              stagger: { amount: 0.5, from: "random" },
              ease: "power2.out",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.3,
              ease: "power2.out",
            });
            break;
          case 3:
            gsap.set(children, { scale: 0, y: 0 });
            gsap.to(children, {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "back.out(1.5)",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
            });
            break;
          case 4:
            gsap.set(children, {
              rotationX: 90,
              y: 0,
              transformOrigin: "50% 50%",
            });
            gsap.to(children, {
              rotationX: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.04,
              ease: "power2.out",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power2.out",
            });
            break;
          case 5:
            gsap.set(children, { x: 30, y: 0 });
            gsap.to(children, {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
            });
            break;
          default:
            gsap.set(children, { y: 20 });
            gsap.to(children, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.03,
              ease: "power3.out",
            });
            gsap.to(descEl, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
            });
        }
      }, 500);
    };

    const navigateToSlide = (targetIndex: number) => {
      if (
        disposed ||
        isTransitioning ||
        targetIndex === currentSlideIndex ||
        !shaderMaterial
      )
        return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);

      const currentTexture = slideTextures[currentSlideIndex];
      const targetTexture = slideTextures[targetIndex];
      if (!currentTexture || !targetTexture) return;

      isTransitioning = true;
      shaderMaterial.uniforms.uTexture1.value = currentTexture;
      shaderMaterial.uniforms.uTexture2.value = targetTexture;
      shaderMaterial.uniforms.uTexture1Size.value =
        currentTexture.userData.size as THREE.Vector2;
      shaderMaterial.uniforms.uTexture2Size.value =
        targetTexture.userData.size as THREE.Vector2;

      updateContent(targetIndex);

      currentSlideIndex = targetIndex;
      updateNavigationState(currentSlideIndex);

      gsap.fromTo(
        shaderMaterial.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_DURATION(),
          ease: "power2.inOut",
          onComplete: () => {
            if (disposed || !shaderMaterial) return;
            shaderMaterial.uniforms.uProgress.value = 0;
            shaderMaterial.uniforms.uTexture1.value = targetTexture;
            shaderMaterial.uniforms.uTexture1Size.value =
              targetTexture.userData.size as THREE.Vector2;
            isTransitioning = false;
            safeStartTimer(100);
          },
        },
      );
    };

    const handleSlideChange = () => {
      if (
        disposed ||
        isTransitioning ||
        !texturesLoaded ||
        !sliderEnabled
      )
        return;
      navigateToSlide((currentSlideIndex + 1) % slideList.length);
    };

    const startAutoSlideTimer = () => {
      if (!texturesLoaded || !sliderEnabled || disposed) return;
      stopAutoSlideTimer();
      let progress = 0;
      const increment =
        (100 / SLIDE_DURATION()) * PROGRESS_UPDATE_INTERVAL;
      progressAnimation = setInterval(() => {
        if (disposed || !sliderEnabled) {
          stopAutoSlideTimer();
          return;
        }
        progress += increment;
        updateSlideProgress(currentSlideIndex, progress);
        if (progress >= 100) {
          if (progressAnimation) clearInterval(progressAnimation);
          progressAnimation = null;
          fadeSlideProgress(currentSlideIndex);
          if (!isTransitioning) handleSlideChange();
        }
      }, PROGRESS_UPDATE_INTERVAL);
    };

    const safeStartTimer = (delay = 0) => {
      stopAutoSlideTimer();
      if (sliderEnabled && texturesLoaded && !disposed) {
        if (delay > 0)
          autoSlideTimer = window.setTimeout(startAutoSlideTimer, delay);
        else startAutoSlideTimer();
      }
    };

    const onVisibility = () => {
      if (document.hidden) stopAutoSlideTimer();
      else if (!isTransitioning) safeStartTimer();
    };

    const viewportObserver = new IntersectionObserver(
      (entries) => {
        isInView = entries.some((entry) => entry.isIntersecting);
        if (!isInView) {
          stopAutoSlideTimer();
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
          return;
        }
        if (texturesLoaded && !disposed && !rafId) {
          rafId = requestAnimationFrame(renderLoop);
        }
        if (!isTransitioning) safeStartTimer(300);
      },
      { threshold: 0.01, rootMargin: "120px" },
    );
    viewportObserver.observe(root);

    const createSlidesNavigation = () => {
      navEl.innerHTML = "";
      slideList.forEach((slide, i) => {
        const item = document.createElement("button");
        item.type = "button";
        item.dataset.slideNavItem = "";
        item.className = "slide-nav-item arc-slide-nav-item";
        item.setAttribute("data-active", i === 0 ? "true" : "false");
        if (i === 0) {
          item.setAttribute("aria-current", "true");
          item.classList.add("active");
        }
        const titleSafe = escapeHtml(servicesShowcaseNavLabel(slide));
        item.innerHTML = `<div class="slide-progress-line"><div class="slide-progress-fill" data-progress-fill="" style="width:0%;opacity:0"></div></div><div class="slide-nav-title arc-slide-nav-label">${titleSafe}</div>`;
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!isTransitioning && i !== currentSlideIndex) {
            stopAutoSlideTimer();
            quickResetProgress(currentSlideIndex);
            navigateToSlide(i);
          }
        });
        navEl.appendChild(item);
      });
    };

    createSlidesNavigation();

    titleEl.innerHTML = splitTextForTitle(slideList[0].title);
    descEl.textContent = slideList[0].description;
    gsap.fromTo(
      titleEl.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.03,
        ease: "power3.out",
        delay: 0.5,
      },
    );
    gsap.fromTo(
      descEl,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 },
    );

    const resize = () => {
      if (disposed || !renderer || !shaderMaterial) return;
      const w = root.clientWidth;
      const h = root.clientHeight;
      renderer.setSize(w, h, false);
      shaderMaterial.uniforms.uResolution.value.set(w, h);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(root);

    (async () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
      });
      // Keep photographic slides at natural brightness (no ACES / double sRGB).
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      renderer.setClearColor(0xf0e3d7, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const w0 = root.clientWidth;
      const h0 = root.clientHeight;
      renderer.setSize(w0, h0, false);

      shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: null },
          uTexture2: { value: null },
          uProgress: { value: 0 },
          uResolution: { value: new THREE.Vector2(w0, h0) },
          uTexture1Size: { value: new THREE.Vector2(1, 1) },
          uTexture2Size: { value: new THREE.Vector2(1, 1) },
          uEffectType: { value: 0 },
          uGlobalIntensity: { value: 1.0 },
          uSpeedMultiplier: { value: 1.0 },
          uDistortionStrength: { value: 1.0 },
          uColorEnhancement: { value: 1.0 },
          uGlassRefractionStrength: { value: 1.0 },
          uGlassChromaticAberration: { value: 1.0 },
          uGlassBubbleClarity: { value: 1.0 },
          uGlassEdgeGlow: { value: 1.0 },
          uGlassLiquidFlow: { value: 1.0 },
          uFrostIntensity: { value: 1.0 },
          uFrostCrystalSize: { value: 1.0 },
          uFrostIceCoverage: { value: 1.0 },
          uFrostTemperature: { value: 1.0 },
          uFrostTexture: { value: 1.0 },
          uRippleFrequency: { value: 25.0 },
          uRippleAmplitude: { value: 0.08 },
          uRippleWaveSpeed: { value: 1.0 },
          uRippleRippleCount: { value: 1.0 },
          uRippleDecay: { value: 1.0 },
          uPlasmaIntensity: { value: 1.2 },
          uPlasmaSpeed: { value: 0.8 },
          uPlasmaEnergyIntensity: { value: 0.4 },
          uPlasmaContrastBoost: { value: 0.3 },
          uPlasmaTurbulence: { value: 1.0 },
          uTimeshiftDistortion: { value: 1.6 },
          uTimeshiftBlur: { value: 1.5 },
          uTimeshiftFlow: { value: 1.4 },
          uTimeshiftChromatic: { value: 1.5 },
          uTimeshiftTurbulence: { value: 1.4 },
        },
        vertexShader: servicesShowcaseVertexShader,
        fragmentShader: servicesShowcaseFragmentShader,
        toneMapped: false,
      });

      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        shaderMaterial,
      );
      scene.add(mesh);

      for (const s of slideList) {
        try {
          slideTextures.push(await loadImageTexture(s.imageSrc));
        } catch {
          // skip failed loads
        }
      }

      if (disposed) {
        slideTextures.forEach((t) => t.dispose());
        mesh.geometry.dispose();
        shaderMaterial.dispose();
        renderer.dispose();
        return;
      }

      if (slideTextures.length >= 2 && shaderMaterial) {
        shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
        shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
        shaderMaterial.uniforms.uTexture1Size.value =
          slideTextures[0].userData.size as THREE.Vector2;
        shaderMaterial.uniforms.uTexture2Size.value =
          slideTextures[1].userData.size as THREE.Vector2;
        if (disposed) return;

        texturesLoaded = true;
        sliderEnabled = true;
        updateShaderUniforms();
        root.classList.add("arc-showcase-loaded");
        setWebglReady(true);
        safeStartTimer(500);
        rafId = requestAnimationFrame(renderLoop);
      }
    })().catch(() => {
      /* textures may fail; section still shows copy */
    });

    const onPrev = () => {
      if (
        disposed ||
        isTransitioning ||
        !texturesLoaded ||
        !sliderEnabled
      )
        return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);
      const n = slideList.length;
      navigateToSlide((currentSlideIndex - 1 + n) % n);
    };

    const onNext = () => {
      if (
        disposed ||
        isTransitioning ||
        !texturesLoaded ||
        !sliderEnabled
      )
        return;
      stopAutoSlideTimer();
      quickResetProgress(currentSlideIndex);
      navigateToSlide((currentSlideIndex + 1) % slideList.length);
    };

    const prevEl = prevBtnRef.current;
    const nextEl = nextBtnRef.current;
    prevEl?.addEventListener("click", onPrev);
    nextEl?.addEventListener("click", onNext);

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      disposed = true;
      viewportObserver.disconnect();
      prevEl?.removeEventListener("click", onPrev);
      nextEl?.removeEventListener("click", onNext);
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      ro.disconnect();
      stopAutoSlideTimer();
      gsapCtx.revert();
      slideTextures.forEach((t) => t.dispose());
      scene?.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const m = obj.material;
          if (!Array.isArray(m)) m.dispose();
        }
      });
      renderer?.dispose();
      renderer = null;
      shaderMaterial = null;
      scene = null;
      camera = null;
    };
  }, []);

  return (
    <section
      className={cn(SHOWCASE_SHELL_CLASS, className)}
      aria-roledescription="carousel"
      aria-label="Whole-body care highlights"
    >
      <div ref={rootRef} className={SHOWCASE_MEDIA_STAGE_CLASS}>
        {posterSrc ? (
          <div className="absolute inset-0 z-0" aria-hidden>
            <Image
              src={posterSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}
        <canvas
          ref={canvasRef}
          className={cn(
            "webgl-canvas absolute inset-0 z-[0] block h-full w-full transition-opacity duration-300 ease-out",
            webglReady ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />
        <div className="pointer-events-auto absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-4 md:left-6">
          <button
            ref={prevBtnRef}
            type="button"
            className={SHOWCASE_CTRL_BTN_CLASS}
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="pointer-events-auto absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-4 md:right-6">
          <button
            ref={nextBtnRef}
            type="button"
            className={SHOWCASE_CTRL_BTN_CLASS}
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className={SHOWCASE_SLIDE_CONTENT_CLASS}>
          <div className={SHOWCASE_SLIDE_COPY_WRAP_CLASS}>
            <div className={SHOWCASE_SLIDE_GLASS_CLASS}>
              <h2
                ref={titleRef}
                id="arc-showcase-title"
                className={cn(
                  SHOWCASE_SLIDE_TITLE_CLASS,
                  "slide-title mb-0 [&_span]:will-change-transform",
                )}
              />
              <p
                ref={descRef}
                id="arc-showcase-desc"
                className={cn(SHOWCASE_SLIDE_DESC_CLASS, "slide-description")}
              />
            </div>
          </div>
        </div>
      </div>

      <ServicesShowcaseNav navRef={navRef} />
    </section>
  );
}

export function ArcServicesShowcaseSlider({ slides, className }: ShowcaseProps) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced) {
    return (
      <ServicesShowcaseReducedMotion slides={slides} className={className} />
    );
  }

  return <WebGLShowcase slides={slides} className={className} />;
}
