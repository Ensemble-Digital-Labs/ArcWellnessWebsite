/**
 * EXION v2 mockup-only asset registry.
 *
 * Files live under `public/assets/client-showcase/exion-v2/` (photos, overlays, icons).
 * **Not used on the production site** — no fallbacks to `/assets/sections/` or treatments content.
 *
 * @see public/assets/client-showcase/exion-v2/README.md
 */
import { EXION_V2_ASSET_ROOT } from "@/client-showcase/exion-v2/exion-v2-tokens";

const PHOTOS = `${EXION_V2_ASSET_ROOT}/photos`;
const OVERLAYS = `${EXION_V2_ASSET_ROOT}/overlays`;
const ICONS = `${EXION_V2_ASSET_ROOT}/icons`;

export type ExionV2AssetRef = { src: string; alt: string };

function photo(filename: string, alt: string): ExionV2AssetRef {
  return { src: `${PHOTOS}/${filename}`, alt };
}

function overlay(filename: string): ExionV2AssetRef {
  return { src: `${OVERLAYS}/${filename}`, alt: "" };
}

export const exionV2Assets = {
  hero: {
    background: overlay("hero-section-background.webp"),
    model: photo("hero-model-portrait.webp", "EXION mock — hero model portrait"),
    device: photo("hero-exion-device.webp", "EXION mock — device product shot"),
    energyLeft: overlay("hero-energy-trail-left.webp"),
    energyRight: overlay("hero-energy-trail-right.webp"),
  },
  stats: {
    background: overlay("stats-section-background.webp"),
    face: photo("stats-face-profile.webp", "EXION mock — stats face profile"),
    gridOverlay: overlay("stats-face-grid-overlay.webp"),
  },
  cards: {
    emface: photo("card-emface-treatment.webp", "EXION mock — EMFACE treatment"),
    microneedling: photo("card-rf-microneedling.webp", "EXION mock — RF microneedling"),
    clearLaser: photo("card-clear-laser.webp", "EXION mock — clear laser resurfacing"),
  },
  whyDifferent: {
    background: overlay("why-different-section-background.webp"),
  },
  experience: {
    background: overlay("experience-section-background.webp"),
  },
  cta: {
    background: overlay("cta-section-background.webp"),
  },
  decorative: {
    darkBokeh: overlay("dark-bokeh-particles.webp"),
    waveGlow: overlay("wave-glow-cream-to-dark.webp"),
    timelineWave: overlay("experience-timeline-wave.webp"),
    experienceIconsRow: `${OVERLAYS}/experience-icons-row.svg`,
    ctaTrail: overlay("cta-energy-trail.webp"),
  },
  results: [
    {
      before: photo("results-pair-1-before.webp", "EXION mock — before, profile"),
      after: photo("results-pair-1-after.webp", "EXION mock — after, profile"),
    },
    {
      before: photo("results-pair-2-before.webp", "EXION mock — before, alt profile"),
      after: photo("results-pair-2-after.webp", "EXION mock — after, alt profile"),
    },
    {
      before: photo("results-pair-3-before.webp", "EXION mock — before, front"),
      after: photo("results-pair-3-after.webp", "EXION mock — after, front"),
    },
  ],
  icons: {
    stimulate: `${ICONS}/icon-stimulate.svg`,
    rebuild: `${ICONS}/icon-rebuild.svg`,
    renew: `${ICONS}/icon-renew.svg`,
    refine: `${ICONS}/icon-refine.svg`,
    dualEnergy: `${ICONS}/icon-dual-energy.svg`,
    fibroblasts: `${ICONS}/icon-fibroblasts.svg`,
    precise: `${ICONS}/icon-precise.svg`,
    safe: `${ICONS}/icon-safe.svg`,
    consultation: `${ICONS}/icon-consultation.svg`,
    plan: `${ICONS}/icon-personalized-plan.svg`,
    treatment: `${ICONS}/icon-comfortable-treatment.svg`,
    results: `${ICONS}/icon-visible-results.svg`,
    maintain: `${ICONS}/icon-maintain.svg`,
    ctaProfile: `${ICONS}/cta-profile-line-art.svg`,
  },
} as const;

export function exionV2ImageSrc(ref: ExionV2AssetRef): string {
  return ref.src;
}

export function exionV2ImageAlt(ref: ExionV2AssetRef): string {
  return ref.alt;
}
