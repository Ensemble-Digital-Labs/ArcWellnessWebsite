# Client showcase (simplified build)

This folder holds **only** the simplified site used for **client / stakeholder previews**.

## Relationship to the main product

| Area | Purpose |
|------|---------|
| **`src/components/arc/`** | Primary homepage: full motion, scroll, and interaction work continues here. **Do not strip this down** for client demos. |
| **`src/client-showcase/`** | Duplicate or lightweight sections, static layouts, and any copy/layout experiments **scoped to the preview**. |
| **`src/app/client-showcase/`** | Next.js route for the preview (`/client-showcase`). |

The production-style homepage remains at **`/`** (`src/app/page.tsx`).

## Design files (mockups, exports)

Use **`design/client-showcase/`** at the repo root for Figma exports, PDFs, and reference images for this simplified build — separate from **`design/reference/`** (main site).

## What’s implemented

- **`ClientShowcaseHome.tsx`** — single-page layout matched to the **ARC homepage mock** (forest + sage palette): `ArcDesignHeader` → `ArcDesignHero` (reception hero) → `WhoWeAreDesign` → `WholeBodyFiveCards` (5 columns, center card ring) → `ProcessTimelineDesign` → patients + shop bands → `SplitPrefooterCTA` → `ArcDesignFooter`.
- **`design-tokens.ts`** — shared hex values for the mock (forest, sage, utility bar, beige).
- **`mock-page-content.ts`** — hero / who-we-are copy, five service cards, and timeline steps.
- **`components/`** — mock-specific components (`ArcDesign*`, `WholeBodyFiveCards`, etc.). Older Vida-style and “simple” components (`VidaStyleHero`, `Simple*`) are still in the folder for reference but are **not** composed on this route by default.
- **`content.ts`** — still used for `showcaseInternalHref()` and any shared helpers.

## Conventions

- Import shared copy and assets from `src/content/` and `public/` when possible so messaging stays aligned.
- Add new preview-only UI under `src/client-showcase/components/`.
- Keep GSAP, Locomotive, and heavy scroll choreography out of this tree unless a specific demo requires it.

## URL

Local: [http://localhost:3000/client-showcase](http://localhost:3000/client-showcase)
