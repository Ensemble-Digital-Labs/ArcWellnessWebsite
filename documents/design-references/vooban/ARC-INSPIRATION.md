# Vooban → ARC Wellness — design inspiration map

**Source:** [vooban.com](https://vooban.com/)  
**Extracted:** 2026-05-27 via local `extraction tool` (5 pages, fast crawl)  
**Artifacts in this folder:** `DESIGN.md`, `tokens.json`, `tailwind.css`, `preview.html`, `report.html`, `screenshots/`

> Do **not** paste Vooban’s blue/black palette onto ARC. Use their **layout, motion, and hierarchy** ideas with ARC teal, cream, charcoal, and serif headlines.

---

## What Vooban does well (worth borrowing)

### 1. Section rhythm — hard color “chapters”

Full-bleed blocks alternate: **electric blue hero → black statement → white grid → blue stats → white CTA**. Each chapter has one job; transitions are sharp, not muddy gradients.

**ARC translation:** Alternate `arc-teal` / `arc-cream` / charcoal bands (you already do this on the homepage with pinned sections). On inner pages, use the same chapter pattern: one dominant surface per scroll chapter, not mixed backgrounds in one section.

### 2. Oversized display type + tight tracking

Display sizes up to **~76–280px** (extracted), negative letter-spacing, light weights on huge words (“VOOBAN” as environment, not just a headline).

**ARC translation:** Keep **serif** for emotional headlines; scale up one “chapter” line per page (About mission, Treatments index). Pair with small mono/sans overlines (“01 / APPROACH”) in `NB International Mono` style → ARC: small caps sans eyebrow + large serif title.

### 3. Grid-with-rules service index

Hero lists services in a **ruled grid** (thin dividers, numbered labels `01 / STRATÉGIE`).

**ARC translation:** Treatments explorer / services slider: numbered rows, `border-arc-teal/20` rules, hover reveals detail — similar to `ArcTreatmentsPinExplorer` + homepage concerns strip.

### 4. Floating media in the hero

Small **video/card** overlaps the hero block; breaks the flat rectangle.

**ARC translation:** Hero or chapter intro: offset `next/image` or short loop with soft shadow, overlapping the split editorial column (respect `prefers-reduced-motion`).

### 5. Stats as typography

Metrics use **giant numerals** (3, 400+, 225) with tiny captions and adjacent square photos.

**ARC translation:** “By the numbers” band on About or homepage: large serif figures, cream/teal band, one lifestyle photo per stat — no card chrome.

### 6. Case-study cards — image-first, minimal chrome

White grid, category label, title, text link + arrow. **No heavy shadows** (extracted: flat elevation).

**ARC translation:** Treatment cards / blog teasers: image ratio 4:3, one line meta, title, teal underline link — match `ArcScrollEditorialSection` restraint.

### 7. Motion (from `DESIGN.md` §6.5)

- Durations: **~78ms micro**, **150ms small**, **300ms medium**
- Easing: custom CSS vars (`--ease-custom`, `--ease-out`)
- Keyframes: `slideInUp`, marquee (`railCtaMarquee`, `rail`), subtle `pulse` / `ping`
- **`prefers-reduced-motion`** respected on site

**ARC translation:** Align GSAP/Framer defaults to **0.15–0.35s** for UI; chapter reveals on scroll; optional slow marquee on Invest CTA label only when reduced-motion is off.

### 8. Full-screen menu overlay

Top bar stays light; **Menu** opens full viewport overlay (homepage screenshot).

**ARC translation:** Already close with `SiteHeader` overlay nav — ensure inner pages use the same `navMode="site"` shell and identical open/close motion.

### 9. Footer as structured grid

Locations, link columns, newsletter, socials — generous **96px** horizontal padding on desktop (extracted hero/footer).

**ARC translation:** `ArcFooter` column rhythm; keep St. Louis contact block as prominent as Vooban’s Québec/Montréal columns.

---

## Vooban tokens (reference only)

| Role | Hex | Notes |
|------|-----|--------|
| Primary | `#1458e4` | CTAs, blue sections |
| Accent | `#5dceff` | Highlights |
| Ink | `#232020` | Body text |
| Canvas | `#ffffff` | Surfaces |
| Canvas alt | `#ededed` | Subtle panels |

**Fonts:** NB International + NB International Mono (licensed; use ARC’s existing serif + sans stack).

**Layout:** max content ~`1016px`, section gaps often **96px+**, 12-column thinking.

Open `report.html` or `preview.html` in a browser for side-by-side proof vs live CSS sample.

---

## Suggested ARC implementation order

1. **Chapter heroes** on About / Treatments / Contact — already on marketing shell; refine type scale toward Vooban-style “one giant line” per page.
2. **Ruled treatment grid** — ✅ `ArcTreatmentsRuledGrid` on `/treatments`; pin explorer rows use `01 / Category` labels.
3. **Stats band** — ✅ `ArcStatsBandSection` on `/about` (12+ modalities, 3 pillars, physician-led).
4. **Marquee / rail** — optional subtle text rail on Invest CTA (Vooban `rail` animation pattern).
5. **Floating hero media** — ✅ `floatingMedia` on `ScrollChapterIntroSection` (About, Treatments, Contact).

### Vooban motion on `/about` (2026-05-27)

| Piece | Location |
|-------|----------|
| Easing / line+word reveal helpers | `src/lib/arcVoobanMotion.ts` |
| Pin scrub progress rail | `ArcPinProgressRail` — chapter hero, narrative pin, clinic carousel |
| Per-word headline scrub | `ArcVoobanHeadline` — `ScrollChapterIntroSection` |
| Masked line blur + stagger | `ArcScrollSplitReveal` — narrative, carousel header, mission copy |
| Horizontal gallery (scrub + drag + snap) | `ArcClinicCarouselSection` |
| Section enter blur | `scrollReveal.ts` (`[data-scroll-section]`) |
| Editorial image clip reveal | `ArcScrollEditorialSection` (non-pinned) |
| CSS easing tokens | `globals.css` `--arc-ease-out`, `--arc-ease-custom` |

---

## Re-run extraction

```bash
cd "extraction tool"
pnpm engine:extract https://vooban.com/ --fast --output "../documents/design-references/vooban"
```

CLI now runs post-processing (`DESIGN.md`, preview, tailwind) automatically. If DOM collection fails on Windows, ensure `extract.ts` includes the `__name` init-script shim (tsx + Playwright).

---

## Files to hand an agent

| File | Use |
|------|-----|
| `DESIGN.md` | Machine-readable system spec |
| `ARC-INSPIRATION.md` | This file — what to adapt for ARC |
| `prompts/universal.md` | Paste into Cursor for richer Sections 0, 1, 7, 8 |
| `screenshots/homepage-1440.png` | Visual QA |
