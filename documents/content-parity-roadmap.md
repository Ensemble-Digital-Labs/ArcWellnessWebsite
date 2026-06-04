# Content parity roadmap — arcwellness.net → Next.js rebuild

**Goal:** Recreate every public page from [arcwellness.net](https://www.arcwellness.net/) with **identical copy, structure, and CTAs** inside the premium Next.js site (layout may differ; words and section order should match live).

**Homepage (`/`):** **Out of scope for copy sync** — keep the current premium rebuild (`src/content/homepage.ts`, `ArcMarketingHome`). Inner pages pull from the crawl below.

**Source of truth for copy:** `documents/arcwellness-net-full-content-inventory.md`  
**Raw extract:** `documents/arcwellness-net-crawl-raw.json`  
**Design reference (optional):** `documents/arcwellness-net-extraction/` (screenshots + DESIGN.md)

Regenerate inventory after live site changes:

```bash
node scripts/crawl-arcwellness-net.mjs
node scripts/generate-arcwellness-inventory.mjs
npm run content:spreadsheet
```

**Sitemap:** `documents/sitemap.md`  
**Excel tracker:** `documents/arc-wellness-content-parity.xlsx` (Overview + one tab per page with sections, status, notes)

---

## Live site → Next.js route map

| # | Live label | Live URL | Next.js route | Content file(s) | UI component(s) |
|---|------------|----------|---------------|-----------------|-----------------|
| 1 | Home | `/` | `/` | `src/content/homepage.ts`, `src/content/site.ts` | `ArcMarketingHome`, section components under `src/components/arc/` |
| 2 | About | `/about` | `/about` | `src/content/pages/about.ts` | `AboutPageContent` |
| 3 | Our Services | `/new-page-2` | `/treatments` | `src/content/pages/treatments.ts` (`treatmentsHub`, `overview` slug) | `TreatmentsPageContent`, `ArcTreatmentsPinExplorer` |
| 4 | Wellness Therapies | `/wellness-therapies` | `/treatments#wellness` or hub section | `treatments.ts` (wellness category + nutrient/peptide/supplements) | Same hub + detail pages |
| 5 | ExoMind | `/exomind` | `/treatments/exomind` | `treatments.ts` | `TreatmentDetailContent` |
| 6 | EmSella | `/emsella` | `/treatments/emsella` | `treatments.ts` | `TreatmentDetailContent` |
| 7 | EmSculpt Neo | `/emsculpt-neo` | `/treatments/emsculpt-neo` | `treatments.ts` | `TreatmentDetailContent` |
| 8 | EmFace | `/emface` | `/treatments/emface` | `treatments.ts` | `TreatmentDetailContent` |
| 9 | Exion | `/exion` | `/treatments/exion` | `treatments.ts` | `TreatmentDetailContent` |
| 10 | Daxxify | `/daxxify` | `/treatments/daxxify` | `treatments.ts` | `TreatmentDetailContent` |
| 11 | RHA | `/rha` | `/treatments/rha` | `treatments.ts` | `TreatmentDetailContent` |
| 12 | Knesko | `/knesko` | `/treatments/knesko` | `treatments.ts` | `TreatmentDetailContent` |
| 13 | Nutrient Therapy | `/vitamin-therapy` | `/treatments/nutrient-therapy` | `treatments.ts` | `TreatmentDetailContent` |
| 14 | Peptide Therapy | `/new-page-1` | `/treatments/peptide-therapy` | `treatments.ts` | `TreatmentDetailContent` |
| 15 | Supplements | `/supplements` | `/treatments/supplements` | `treatments.ts` | `TreatmentDetailContent` |
| 16 | Arc Aesthetics | `/aesthetics` | `/aesthetics` | `src/content/pages/aesthetics.ts` | aesthetics page components |
| 17 | Arc Programs | `/plans` | `/programs` | `src/content/pages/programs.ts` | programs page |
| 18 | Financing | `/financing` | `/financing` | `src/content/pages/financing.ts` | financing page |
| 19 | Contact | `/contact` | `/contact` | `src/content/pages/contact.ts`, `src/content/siteMeta.ts` | `ContactPageContent` |
| 20 | Book Now | Mangomint | `/book` | redirect / embed config | `book/page.tsx` |
| 21 | Privacy / Terms | footer links | `/privacy`, `/terms` | **placeholders** — need client/legal copy | placeholder pages |

**Ignore on live site:** `/our-services` (duplicate), `/supplements-1` (duplicate), `/cart` (commerce stub). **`/new-page-1`** is the live Peptide Therapy page (Squarespace legacy slug).

---

## Current status (high level)

| Area | Routes | Copy parity | Notes |
|------|--------|-------------|-------|
| Homepage | ✅ | ⏸ **Frozen** | Premium scroll layout stays; **do not** replace with live Squarespace copy unless requested |
| About | ✅ | 🟡 Partial | Mission/vision/founder aligned; verify exact live paragraphs |
| Treatments hub | ✅ | 🟢 Synced | Live **Our Services** copy in `treatmentsHub` + overview |
| Wellness hub | ✅ merged | 🟢 Synced | Nutrient/peptide/supplements copy from live |
| 12 modality pages | ✅ | 🟢 Synced | `treatments.ts` batch 1 — FAQs on major device/wellness pages |
| Aesthetics | ✅ | 🟢 Synced | Hero + principles from live |
| Programs | ✅ | 🟡 Partial | Hero + program summaries; full pricing tables TBD in UI |
| Financing | ✅ | 🟢 Synced | SEO + hero; live page minimal |
| Contact | ✅ | 🟢 Synced | Hero + channels from live |
| Book | ✅ | 🟡 | Wire Mangomint URL from inventory |
| Privacy / Terms | placeholder | 🔴 Missing | Not on live sitemap — obtain from client |
| Case studies | ✅ extra | N/A | Not on live site — see **Insights** hub at `/case-studies` |
| **Insights hub** | ✅ shell | 🔴 New content | `/case-studies` — case studies + blog (rebuild only) |
| **Blog** | 🔴 to build | 🔴 New content | `/blog` + `/blog/[slug]` planned |

Legend: ✅ done structurally · 🟡 needs copy pass · 🔴 needs full review

---

## What “identical” means for this rebuild

1. **Copy:** Headlines, body paragraphs, bullets, FAQs, button labels, and meta title/description match live (minor punctuation OK).
2. **Section order:** Same narrative flow (hero → benefits → who it’s for → FAQs → CTA) per treatment template on live.
3. **Links:** Internal links resolve to Next.js routes in the table above; Book → Mangomint.
4. **Layout:** The rebuild uses a **premium** design system (scroll hero, glass cards, pins) — do **not** clone Squarespace pixel-for-pixel unless requested; **content** is what must match.
5. **Assets:** Replace stock/placeholder images with clinic photography under `public/assets/` as production art arrives.

---

## Recommended sync order

Work top-down so nav and CTAs stay consistent:

### Phase 1 — Global & hub (1–2 sessions)
1. `siteMeta.ts` — phone, email, address, hours, social, booking URL *(verify vs inventory)*
2. ~~`homepage.ts`~~ — **skipped** (homepage frozen)
3. `treatments.ts` — `treatmentsHub` + `overview` slug from inventory **Our Services** (`/new-page-2`)
4. `arcMarketingNav.ts` / footer — labels match live nav (“Our Services” → `/treatments`)

### Phase 2 — Treatment detail pages (batch)
For each slug in `allTreatments`, open the matching inventory section and update:
- `title`, `tagline`, `intro`
- `sections[]` headings + body + bullets
- `faqs[]`
- SEO title/description where live meta is correct (ignore wrong shared “ExoMIND” title tags on some live pages)

**Order:** ExoMind → EmSella → EmSculpt Neo → EmFace → Exion → Daxxify → RHA → Knesko → Nutrient → Peptide → Supplements

### Phase 3 — Secondary marketing pages
1. `about.ts` ← inventory § About  
2. `aesthetics.ts` ← inventory § Arc Aesthetics  
3. `programs.ts` ← inventory § Arc Programs (`/plans`)  
4. `financing.ts` ← inventory § Financing  
5. `contact.ts` ← inventory § Contact  

### Phase 4 — Legal & QA
1. Privacy / Terms from client or Squarespace legal export  
2. Cross-page link audit (footer quick links)  
3. Mobile QA all routes  
4. Optional: re-run extraction crawl for visual diff (`documents/arcwellness-net-extraction/`)

---

## Per-page checklist (copy editor)

Use this for each page before marking done:

- [ ] Hero eyebrow / H1 / subcopy matches live
- [ ] All H2/H3 sections present in same order
- [ ] CTAs: label + destination ( `/book`, `/contact`, `/treatments/...` )
- [ ] FAQs complete (homepage + treatment pages)
- [ ] Meta `title` + `description` in page `seo` export
- [ ] No lorem / placeholder left in that route
- [ ] Spot-check on 375px and 1280px width

---

## Key file index

| Purpose | Path |
|---------|------|
| Homepage copy | `src/content/homepage.ts` |
| Site contact / meta | `src/content/siteMeta.ts` |
| All treatments | `src/content/pages/treatments.ts` |
| About | `src/content/pages/about.ts` |
| Aesthetics | `src/content/pages/aesthetics.ts` |
| Programs | `src/content/pages/programs.ts` |
| Financing | `src/content/pages/financing.ts` |
| Contact | `src/content/pages/contact.ts` |
| Shared FAQs | `src/content/pages/shared.ts` |
| Live copy inventory | `documents/arcwellness-net-full-content-inventory.md` |
| URL list for crawls | `documents/arcwellness-net-all-urls.txt` |

---

## Two live hubs → one `/treatments` route

The live Squarespace site splits:

- **`/new-page-2` (Our Services)** — device + foundational therapies grid (“Tech-Driven Body Treatments”, ExoMind, EmSella, EmSculpt, nutrient, peptide, supplements)
- **`/wellness-therapies`** — IV / peptide / supplements hub with overlapping CTAs

The Next.js **`/treatments`** page should present **both narratives**: pin explorer / featured tabs for devices + “see all” for full list, and a clear **wellness therapies** band or anchor (`#wellness`) for IV/peptide/supplements copy from `/wellness-therapies`.

---

## Next step

Pick a phase to execute in code (e.g. “sync all treatment pages from inventory” or “homepage copy pass only”). Each pass should be one PR-sized chunk: content file edits only, then visual QA.
