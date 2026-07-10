# EXION v2 mockup assets (client showcase only)

**Route:** `/client-showcase/exion-v2`  
**Not used on the production site** (`/`, `/treatments/*`, etc.).

## Folder layout

```
public/assets/client-showcase/exion-v2/
├── photos/          ← full-frame photography (hero, cards, before/after)
├── overlays/        ← cutouts after white-bg removal (trails, bokeh, grid)
└── icons/           ← SVG line icons (champagne stroke)
```

Code registry: `src/client-showcase/exion-v2/exion-v2-assets.ts`  
Section map (7 sections): `src/client-showcase/exion-v2/exion-v2-sections.ts`

## Page sections (7)

| § | ID | Tone | Background asset |
|---|-----|------|------------------|
| 1 | `hero` | cream | `hero-section-background.webp` |
| 2 | `stats` | cream | `stats-section-background.webp` |
| 3 | `treatments` | cream | — (plain cream) |
| 4 | `why-different` | dark | `why-different-section-background.webp` |
| 5 | `experience` | dark | `experience-section-background.webp` (§5→§6 wave only) |
| 6 | `results` | cream | — (plain cream) |
| 7 | `cta` | dark | `cta-section-background.webp` |

Curves are baked into composites — **no standalone SVG wave separators** between sections.

## Workflow

1. Generate with **flat white studio backdrop** (not transparent).
2. Remove white background (remove.bg, Photoroom, etc.).
3. Save to the correct subfolder below.
4. Run `npm run assets:webp` from repo root.

---

## photos/ (12 files)

| Filename | Size | Prompt notes |
|----------|------|--------------|
| `hero-model-portrait.webp` | 1200×1500 | Woman, upward gaze, **isolated on flat white background**, 4:5 |
| `hero-exion-device.webp` | 800×1200 | EXION tower, **white studio backdrop**, 2:3 |
| `stats-face-profile.webp` | 1400×1600 | Face profile, white or cream studio, 4:5 |
| `card-emface-treatment.webp` | 900×675 | EMFACE patches, white/cream bg, 4:3 |
| `card-rf-microneedling.webp` | 900×675 | RF handpiece on cheek, white studio, 4:3 |
| `card-clear-laser.webp` | 900×675 | Laser near eye, white studio, 4:3 |
| `results-pair-1-before.webp` | 600×800 | Before, 45° profile, clinical white bg |
| `results-pair-1-after.webp` | 600×800 | After, same angle |
| `results-pair-2-before.webp` | 600×800 | Before, alt profile |
| `results-pair-2-after.webp` | 600×800 | After |
| `results-pair-3-before.webp` | 600×800 | Before, front |
| `results-pair-3-after.webp` | 600×800 | After |

## overlays/ (7 files)

Generate on white → remove bg → save PNG/WebP with alpha.

| Filename | Size | Purpose |
|----------|------|---------|
| `hero-energy-trail-left.webp` | 1600×900 | Gold wisps, hero background (legacy) |
| `hero-energy-trail-right.webp` | 1200×1400 | Wisps around model/device (legacy) |
| `hero-section-background.webp` | wide | **§1 full hero composite background** |
| `stats-section-background.webp` | wide | **§2 stats composite** (face + grid baked in) |
| `why-different-section-background.webp` | wide | **§4 dark section composite** |
| `experience-section-background.webp` | wide | **§5→§6 wave handoff** (dark to cream) |
| `cta-section-background.webp` | wide | **§7 CTA footer composite** |
| `stats-face-grid-overlay.webp` | 600×600 | Hex grid for cheek |
| `dark-bokeh-particles.webp` | 1920×800 | Gold bokeh on dark sections |
| `wave-glow-cream-to-dark.webp` | 1920×400 | Optional extra wave glow |
| `experience-timeline-wave.webp` | 1400×120 | Timeline connector line |
| `experience-icons-row.svg` | vector | Experience §5 — full icon row + labels |
| `cta-energy-trail.webp` | 1200×400 | Footer gold trails |

## icons/ (14 SVG files)

Stroke `#C5A878`, 64×64 viewBox, no background fill.

| Filename |
|----------|
| `icon-stimulate.svg` |
| `icon-rebuild.svg` |
| `icon-renew.svg` |
| `icon-refine.svg` |
| `icon-dual-energy.svg` |
| `icon-fibroblasts.svg` |
| `icon-precise.svg` |
| `icon-safe.svg` |
| `icon-consultation.svg` |
| `icon-personalized-plan.svg` |
| `icon-comfortable-treatment.svg` |
| `icon-visible-results.svg` |
| `icon-maintain.svg` |
| `cta-profile-line-art.svg` |

---

## After drop-in

```bash
npm run assets:webp
```

Preview: http://localhost:3000/client-showcase/exion-v2

Missing files show a dashed placeholder — **no production spa images are used as fallbacks.**
