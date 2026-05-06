/**
 * Patient journey steps for `#path` (immersive sticky + reduced-motion layout).
 * Copy aligned to the five-phase care narrative (listen → measure → author → practice → revise).
 */
export type PathJourneyStep = {
  id: number;
  /** Lowercase Roman label inside the timeline node (e.g. `i`, `ii`). */
  roman: string;
  title: string;
  /** Eyebrow e.g. `STEP 01 · 90 MINUTES` */
  meta: string;
  body: string;
};

export const PATH_JOURNEY_STEPS: readonly PathJourneyStep[] = [
  {
    id: 1,
    roman: "i",
    title: "Listen",
    meta: "STEP 01 · 90 MINUTES",
    body: "A conversation, not an intake. We ask about your sleep, your work, your weeks. Patterns surface before any test does.",
  },
  {
    id: 2,
    roman: "ii",
    title: "Measure",
    meta: "STEP 02 · TWO VISITS",
    body: "Comprehensive panels, body composition, cognitive assessments. We capture the numbers that matter — and the ones most clinics miss.",
  },
  {
    id: 3,
    roman: "iii",
    title: "Author",
    meta: "STEP 03 · ONE WEEK",
    body: "Your team meets — without you in the room — and writes a plan in five chapters: surface, shape, foundation, mind, and the long view.",
  },
  {
    id: 4,
    roman: "iv",
    title: "Practice",
    meta: "STEP 04 · ONGOING",
    body: "We meet monthly. Treatments, coaching, refinements — kept small enough to actually do, long enough to actually work.",
  },
  {
    id: 5,
    roman: "v",
    title: "Revise",
    meta: "STEP 05 · EACH SEASON",
    body: "Every quarter we re-measure and rewrite. The plan ages with you, in pencil, never in stone.",
  },
] as const;
