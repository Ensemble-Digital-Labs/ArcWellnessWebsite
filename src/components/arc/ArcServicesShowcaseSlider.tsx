"use client";

import * as THREE from "three";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ServicesShowcaseSlide } from "@/content/servicesShowcaseSlides";
import {
  servicesShowcaseEyebrow,
  servicesShowcaseNavLabel,
} from "@/content/servicesShowcaseSlides";
import { cn } from "@/lib/utils";
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
      className={cn(
        "relative isolate h-[100dvh] min-h-[320px] w-full max-w-none overflow-hidden rounded-none bg-arc-charcoal",
        className,
      )}
      aria-roledescription="carousel"
      aria-label="Whole-body care highlights"
    >
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
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        aria-hidden
      />
      <div className="slide-content pointer-events-none absolute inset-0 z-10 flex min-h-0 flex-col justify-between px-6 pb-[12rem] pt-[calc(8rem+1.5rem+env(safe-area-inset-top,0px))] sm:px-10 sm:pt-[calc(10rem+1.5rem+env(safe-area-inset-top,0px))] md:px-14 md:pb-52 md:pt-[calc(11rem+1.5rem+env(safe-area-inset-top,0px))] lg:px-16 lg:pt-[calc(12rem+1.5rem+env(safe-area-inset-top,0px))]">
        <h2
          data-scroll-section
          className="shrink-0 text-center font-serif text-2xl font-semibold leading-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-3xl lg:text-[2.5rem]"
        >
          Whole-Body Care. Inside and Out.
        </h2>
        <div className="pointer-events-auto mt-auto mx-auto flex w-full max-w-xl shrink-0 flex-col items-center text-center">
          <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70">
            {servicesShowcaseEyebrow(current)}
          </p>
          <h3 className="mb-3 max-w-full font-serif text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {current.title}
          </h3>
          <p className="mx-auto max-w-md font-sans text-sm leading-relaxed text-white/90 md:text-base">
            {current.description}
          </p>
        </div>
      </div>

      <div className="pointer-events-auto absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 sm:left-4 md:left-6">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white/90 shadow-sm backdrop-blur-sm transition hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          aria-label="Previous slide"
          onClick={() =>
            setIndex((i) => (i - 1 + slides.length) % slides.length)
          }
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>
        <span
          id="slideNumber"
          className="min-w-[1.75ch] font-sans text-sm tabular-nums tracking-[0.2em] text-white/90 md:text-base"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="pointer-events-auto absolute right-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 sm:right-4 md:right-6">
        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white/90 shadow-sm backdrop-blur-sm transition hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
        <span
          id="slideTotal"
          className="min-w-[1.75ch] font-sans text-sm tabular-nums tracking-[0.2em] text-white/70 md:text-base"
        >
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <nav
        id="slidesNav"
        className="arc-slide-nav slides-navigation absolute bottom-0 left-0 right-0 z-20 flex w-full flex-nowrap items-stretch justify-between gap-0 overflow-x-auto overflow-y-hidden overscroll-x-contain border-t border-white/12 bg-gradient-to-t from-black/85 via-black/70 to-black/78 px-2 py-4 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] [-ms-overflow-style:none] [scrollbar-width:none] backdrop-blur-md sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Slide navigation"
      >
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
      </nav>
    </section>
  );
}

function WebGLShowcase({ slides, className }: ShowcaseProps) {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const slideNumberRef = useRef<HTMLSpanElement>(null);
  const slideTotalRef = useRef<HTMLSpanElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const slidesRef = useRef(slides);
  slidesRef.current = slides;

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const eyebrowEl = eyebrowRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const navEl = navRef.current;
    if (!root || !canvas || !eyebrowEl || !titleEl || !descEl || !navEl) return;

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
    /** Browser timer id — avoid `NodeJS.Timeout` union from Node typings */
    let autoSlideTimer: number | null = null;
    let rafId = 0;

    const gsapCtx = gsap.context(() => {}, root);

    const SLIDE_DURATION = () => SLIDER_CONFIG.settings.autoSlideSpeed;
    const PROGRESS_UPDATE_INTERVAL = 50;
    const TRANSITION_DURATION = () => SLIDER_CONFIG.settings.transitionDuration;

    const loadImageTexture = (src: string) =>
      new Promise<THREE.Texture>((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          src,
          (t) => {
            t.minFilter = THREE.LinearFilter;
            t.magFilter = THREE.LinearFilter;
            t.colorSpace = THREE.SRGBColorSpace;
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

    const updateCounter = (idx: number) => {
      if (slideNumberRef.current) {
        slideNumberRef.current.textContent = String(idx + 1).padStart(2, "0");
      }
      if (slideTotalRef.current) {
        slideTotalRef.current.textContent = String(slideList.length).padStart(
          2,
          "0",
        );
      }
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
        const eb = eyebrowRef.current;
        if (eb) eb.textContent = servicesShowcaseEyebrow(slideList[idx]);
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
      updateCounter(currentSlideIndex);
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
    updateCounter(0);

    eyebrowEl.textContent = servicesShowcaseEyebrow(slideList[0]);
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
        antialias: false,
        alpha: false,
      });
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
        texturesLoaded = true;
        sliderEnabled = true;
        updateShaderUniforms();
        root.classList.add("arc-showcase-loaded");
        safeStartTimer(500);
      }

      const renderLoop = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(renderLoop);
        if (renderer && scene && camera) renderer.render(scene, camera);
      };
      rafId = requestAnimationFrame(renderLoop);
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
      ref={rootRef}
      className={cn(
        "slider-wrapper relative isolate h-[100dvh] min-h-[320px] w-full max-w-none overflow-hidden rounded-none bg-arc-charcoal",
        className,
      )}
      aria-roledescription="carousel"
      aria-label="Whole-body care highlights"
    >
      <canvas
        ref={canvasRef}
        className="webgl-canvas absolute inset-0 block h-full w-full"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10"
        aria-hidden
      />

      <div className="pointer-events-auto absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 sm:left-4 md:left-6">
        <button
          ref={prevBtnRef}
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white/90 shadow-sm backdrop-blur-sm transition hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>
        <span
          id="slideNumber"
          ref={slideNumberRef}
          className="min-w-[1.75ch] font-sans text-sm tabular-nums tracking-[0.2em] text-white/90 md:text-base"
        >
          01
        </span>
      </div>

      <div className="pointer-events-auto absolute right-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 sm:right-4 md:right-6">
        <button
          ref={nextBtnRef}
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/15 bg-black/45 text-white/90 shadow-sm backdrop-blur-sm transition hover:bg-black/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
        <span
          id="slideTotal"
          ref={slideTotalRef}
          className="min-w-[1.75ch] font-sans text-sm tabular-nums tracking-[0.2em] text-white/70 md:text-base"
        >
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="slide-content pointer-events-none absolute inset-0 z-10 flex min-h-0 flex-col justify-between px-6 pb-[12rem] pt-[calc(8rem+1.5rem+env(safe-area-inset-top,0px))] sm:px-10 sm:pt-[calc(10rem+1.5rem+env(safe-area-inset-top,0px))] md:px-14 md:pb-52 md:pt-[calc(11rem+1.5rem+env(safe-area-inset-top,0px))] lg:px-16 lg:pt-[calc(12rem+1.5rem+env(safe-area-inset-top,0px))]">
        <h2
          data-scroll-section
          className="shrink-0 text-center font-serif text-2xl font-semibold leading-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-3xl lg:text-[2.5rem]"
        >
          Whole-Body Care. Inside and Out.
        </h2>
        <div className="pointer-events-auto mt-auto mx-auto flex w-full max-w-xl shrink-0 flex-col items-center text-center">
          <p
            ref={eyebrowRef}
            className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.35em] text-white/70"
          >
            {servicesShowcaseEyebrow(slides[0]!)}
          </p>
          <h3
            ref={titleRef}
            id="arc-showcase-title"
            className="slide-title mb-3 max-w-full font-serif text-2xl font-semibold tracking-tight text-white md:text-3xl [&_span]:will-change-transform"
          />
          <p
            ref={descRef}
            id="arc-showcase-desc"
            className="slide-description mx-auto max-w-md font-sans text-sm leading-relaxed text-white/90 md:text-base"
          />
        </div>
      </div>

      <nav
        id="slidesNav"
        ref={navRef}
        className="arc-slide-nav slides-navigation absolute bottom-0 left-0 right-0 z-20 flex w-full flex-nowrap items-stretch justify-between gap-0 overflow-x-auto overflow-y-hidden overscroll-x-contain border-t border-white/12 bg-gradient-to-t from-black/85 via-black/70 to-black/78 px-2 py-4 shadow-[0_-8px_40px_rgba(0,0,0,0.5)] [-ms-overflow-style:none] [scrollbar-width:none] backdrop-blur-md sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Slide navigation"
      />
    </section>
  );
}

export function ArcServicesShowcaseSlider({ slides, className }: ShowcaseProps) {
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setReady(true);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!ready) {
    return (
      <div
        className={cn(
          "h-[100dvh] min-h-[320px] w-full max-w-none animate-pulse rounded-none bg-arc-cream/30",
          className,
        )}
        aria-hidden
      />
    );
  }

  if (reduced) {
    return (
      <ServicesShowcaseReducedMotion slides={slides} className={className} />
    );
  }

  return <WebGLShowcase slides={slides} className={className} />;
}
