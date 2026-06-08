/**
 * Concerns pinned section — panel photography + section plate.
 * See `public/assets/sections/concerns/README.md`.
 */

/** Bump when PNGs change — busts browser + `next/image` optimizer cache. */
export const CONCERNS_ASSETS_VERSION = "20260607-light";

function concernsAssetPath(path: string): string {
  return `${path}?v=${CONCERNS_ASSETS_VERSION}`;
}

export const CONCERNS_SECTION_BG = concernsAssetPath(
  "/assets/sections/concerns/concerns-section-background.png",
);

/** Prior panel art — rollback only. */
export const CONCERNS_PANEL_IMAGES_PREVIOUS = {
  lowEnergyBurnout:
    "/assets/sections/concerns/concern-low-energy-burnout--previous.png",
  hormonalImbalanceWeightGain:
    "/assets/sections/concerns/concern-hormonal-imbalance-weight-gain--previous.png",
  poorSleepRecovery:
    "/assets/sections/concerns/concern-poor-sleep-recovery--previous.png",
  agingSkinBodyChanges:
    "/assets/sections/concerns/concern-aging-skin-body-changes--previous.png",
  brainFogFocusIssues:
    "/assets/sections/concerns/concern-brain-fog-focus-issues--previous.png",
} as const;

export const CONCERNS_PANEL_IMAGES = {
  lowEnergyBurnout: concernsAssetPath(
    "/assets/sections/concerns/concern-low-energy-burnout.png",
  ),
  hormonalImbalanceWeightGain: concernsAssetPath(
    "/assets/sections/concerns/concern-hormonal-imbalance-weight-gain.png",
  ),
  poorSleepRecovery: concernsAssetPath(
    "/assets/sections/concerns/concern-poor-sleep-recovery.png",
  ),
  agingSkinBodyChanges: concernsAssetPath(
    "/assets/sections/concerns/concern-aging-skin-body-changes.png",
  ),
  brainFogFocusIssues: concernsAssetPath(
    "/assets/sections/concerns/concern-brain-fog-focus-issues.png",
  ),
} as const;

export const CONCERN_PANELS = [
  {
    title: "Low Energy & Burnout",
    image: CONCERNS_PANEL_IMAGES.lowEnergyBurnout,
    blurb:
      "We connect sleep, stress, hormones, and nutrition so fatigue is understood as a pattern—not dismissed as “just busy.”",
  },
  {
    title: "Hormonal Imbalance & Weight Gain",
    image: CONCERNS_PANEL_IMAGES.hormonalImbalanceWeightGain,
    blurb:
      "Metabolic and hormonal insight paired with lifestyle support, aimed at sustainable change rather than quick fixes.",
  },
  {
    title: "Poor Sleep & Recovery",
    image: CONCERNS_PANEL_IMAGES.poorSleepRecovery,
    blurb:
      "From circadian rhythm to stress load, we map what blocks restorative sleep and recovery in your real life.",
  },
  {
    title: "Aging Skin & Body Changes",
    image: CONCERNS_PANEL_IMAGES.agingSkinBodyChanges,
    blurb:
      "Evidence-based aesthetics and longevity-aligned care, tuned to how you want to look and feel over time.",
  },
  {
    title: "Brain Fog & Focus Issues",
    image: CONCERNS_PANEL_IMAGES.brainFogFocusIssues,
    blurb:
      "Whole-person assessment to clarify cognition—nutrition, sleep, hormones, and stress—before jumping to stimulants alone.",
  },
] as const;
