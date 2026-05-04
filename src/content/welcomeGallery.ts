import { EDITORIAL_SPA_IMAGES } from "@/content/editorialSpaImages";
import { PATIENT_EXPERIENCE_IMAGES } from "@/content/patientExperienceImages";
import { images } from "@/content/site";

/**
 * Deduplicate while preserving first-seen order (lobby/reception may appear in multiple buckets).
 */
function dedupePaths(paths: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of paths) {
    if (!seen.has(p)) {
      seen.add(p);
      out.push(p);
    }
  }
  return out;
}

/**
 * **About / immersive scroll** collage — reorder or swap paths here; the component uses the
 * **first entries** to fill its fixed tile count (7 slots), then cycles if the list is shorter.
 *
 * Pulls from editorial spa, hero/section photography, services strip, and founder portrait.
 */
export const WELCOME_GALLERY_IMAGE_SRCS: readonly string[] = dedupePaths([
  ...EDITORIAL_SPA_IMAGES,
  ...PATIENT_EXPERIENCE_IMAGES,
  images.heroMedia,
  images.heroBg,
  images.whoWeAre,
  images.investBanner,
  images.founderPortrait,
  ...images.services,
]);

/** Which tile (0–6) matches the reference “middle” slot — strong scroll zoom targets this frame. */
export const WELCOME_GALLERY_FOCAL_INDEX = 0;

/** Primary brand / interior shot for the center zoom — swap to another path from the pool if you prefer. */
export const WELCOME_GALLERY_FOCAL_SRC = images.heroMedia;

/** Collage tile **3** — `public/assets/sections/patient-experience/`. */
export const WELCOME_GALLERY_SLOT_3_SRC = PATIENT_EXPERIENCE_IMAGES[0]!;

/** Collage tile **6** — same folder, second asset (change indices to pick other files). */
export const WELCOME_GALLERY_SLOT_6_SRC = PATIENT_EXPERIENCE_IMAGES[1]!;

/**
 * Seven slots for the immersive collage: **`focal`** is pinned at **`WELCOME_GALLERY_FOCAL_INDEX`**; other
 * slots pull from the deduped pool without repeating the focal when possible. Slots **3** and **6** use
 * **`WELCOME_GALLERY_SLOT_3_SRC`** / **`WELCOME_GALLERY_SLOT_6_SRC`** (`patient-experience` photography).
 */
export function getWelcomeGallerySlots(): string[] {
  const focal = WELCOME_GALLERY_FOCAL_SRC;
  const pool = WELCOME_GALLERY_IMAGE_SRCS.filter((p) => p !== focal);
  const slots: string[] = [];
  let pi = 0;
  for (let i = 0; i < 7; i++) {
    if (i === WELCOME_GALLERY_FOCAL_INDEX) {
      slots.push(focal);
    } else {
      const pick =
        pool.length > 0 ? pool[pi % pool.length]! : focal;
      slots.push(pick);
      pi++;
    }
  }
  if (slots.length > 3) {
    slots[3] = WELCOME_GALLERY_SLOT_3_SRC;
  }
  if (slots.length > 6) {
    slots[6] = WELCOME_GALLERY_SLOT_6_SRC;
  }
  return slots;
}
