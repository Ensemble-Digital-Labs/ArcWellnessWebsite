# ARC Wellness — site map (live → rebuild)

**Live site:** [arcwellness.net](https://www.arcwellness.net/)  
**Rebuild:** Next.js App Router (`src/app/`)  
**Content tracker:** `documents/arc-wellness-content-parity.xlsx`  
**Regenerate tracker:** `npm run content:spreadsheet`

---

## Primary navigation

```
Home (/)
├── About (/about)
├── Insights (/case-studies)            ★ REBUILD ONLY — not on arcwellness.net
│   ├── Case studies listing            #case-studies (on hub; index to expand)
│   ├── Case study detail               /case-studies/[slug] — to build
│   ├── Blog listing                    /blog — to build
│   └── Blog post                       /blog/[slug] — to build
├── Treatments (/treatments)          ← live: Our Services (/new-page-2)
│   ├── Wellness Therapies hub        ← live: /wellness-therapies (#wellness)
│   ├── ExoMind                       ← /exomind
│   ├── EmSella                       ← /emsella
│   ├── EmSculpt Neo                  ← /emsculpt-neo
│   ├── EmFace                        ← /emface
│   ├── Exion                         ← /exion
│   ├── Daxxify                       ← /daxxify
│   ├── RHA                           ← /rha
│   ├── Knesko                        ← /knesko
│   ├── Nutrient Therapy              ← /vitamin-therapy
│   ├── Peptide Therapy               ← (legacy /new-page-1; content in rebuild)
│   └── Supplements                   ← /supplements
├── Arc Aesthetics (/aesthetics)
├── Arc Programs (/programs)          ← live: /plans
├── Financing (/financing)
├── Contact (/contact)
└── Book Now (/book → Mangomint)
```

## Footer / legal

```
Privacy Policy (/privacy)   — placeholder; obtain legal copy
Terms & Conditions (/terms) — placeholder; obtain legal copy
```

## Excluded (do not rebuild as separate pages)

| Live path | Reason |
|-----------|--------|
| `/home` | Alias of `/` |
| `/our-services` | Duplicate of `/new-page-2` |
| `/new-page-1` | Legacy peptide slug — content lives at `/treatments/peptide-therapy` |
| `/supplements-1` | Duplicate of `/supplements` |
| `/cart` | Squarespace commerce stub |

---

## Rebuild-only pages (not on arcwellness.net)

These are **new** in the Next.js site. Footer links **Insights** → `/case-studies`.

| Page | Next.js route | Content file | Status |
|------|---------------|--------------|--------|
| Insights (hub) | `/case-studies` | `src/content/pages/insights.ts` | **Live** — 3 tabs: All · Blogs · Case studies (HLK-style feed) |
| Case studies index | `/case-studies?filter=case-study` | `ArcInsightsFeedSection` | Same hub, filtered |
| Case study detail | `/case-studies/[slug]` | `insights.ts` entries | **Live** |
| Blog index | `/case-studies?filter=blog` | `ArcInsightsFeedSection` | Same hub, filtered |
| Blog post | `/blog/[slug]` | `insights.ts` entries | **Live** |

---

## Route reference

| Page | Live URL | Next.js route | Content file |
|------|----------|---------------|--------------|
| Home | https://www.arcwellness.net/ | `/` | `src/content/homepage.ts` |
| About | …/about | `/about` | `src/content/pages/about.ts` |
| **Insights (hub)** | **_(rebuild only)_** | **`/case-studies`** | **`src/content/pages/case-studies.ts`** |
| **Case studies index** | **_(rebuild only)_** | **`/case-studies#case-studies`** | **`case-studies.ts`** |
| **Case study detail** | **_(rebuild only)_** | **`/case-studies/[slug]`** | **TBD** |
| **Blog index** | **_(rebuild only)_** | **`/blog`** | **`blog.ts` (to create)** |
| **Blog post** | **_(rebuild only)_** | **`/blog/[slug]`** | **TBD** |
| Our Services | …/new-page-2 | `/treatments` | `src/content/pages/treatments.ts` |
| Wellness Therapies | …/wellness-therapies | `/treatments#wellness` | `treatments.ts` |
| ExoMind | …/exomind | `/treatments/exomind` | `treatments.ts` |
| EmSella | …/emsella | `/treatments/emsella` | `treatments.ts` |
| EmSculpt Neo | …/emsculpt-neo | `/treatments/emsculpt-neo` | `treatments.ts` |
| EmFace | …/emface | `/treatments/emface` | `treatments.ts` |
| Exion | …/exion | `/treatments/exion` | `treatments.ts` |
| Daxxify | …/daxxify | `/treatments/daxxify` | `treatments.ts` |
| RHA | …/rha | `/treatments/rha` | `treatments.ts` |
| Knesko | …/knesko | `/treatments/knesko` | `treatments.ts` |
| Nutrient Therapy | …/vitamin-therapy | `/treatments/nutrient-therapy` | `treatments.ts` |
| Peptide Therapy | https://www.arcwellness.net/new-page-1 | `/treatments/peptide-therapy` | `treatments.ts` |
| Supplements | …/supplements | `/treatments/supplements` | `treatments.ts` |
| Arc Aesthetics | …/aesthetics | `/aesthetics` | `src/content/pages/aesthetics.ts` |
| Arc Programs | …/plans | `/programs` | `src/content/pages/programs.ts` |
| Financing | …/financing | `/financing` | `src/content/pages/financing.ts` |
| Contact | …/contact | `/contact` | `src/content/pages/contact.ts` |
| Book Now | booking.mangomint.com | `/book` | `src/app/book/page.tsx` |
| Privacy | footer | `/privacy` | placeholder |
| Terms | footer | `/terms` | placeholder |

---

## Related docs

- Copy inventory: `documents/arcwellness-net-full-content-inventory.md`
- Parity roadmap: `documents/content-parity-roadmap.md`
- Crawl URL list: `documents/arcwellness-net-all-urls.txt`
