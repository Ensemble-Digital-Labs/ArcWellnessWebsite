# ARC Wellness — site map (rebuild)

**Deployed (staging):** [arcwellness.netlify.app](https://arcwellness.netlify.app/)  
**Live reference:** [arcwellness.net](https://www.arcwellness.net/)  
**Next.js routes:** `src/app/`  
**Content tracker:** `documents/arc-wellness-content-parity.xlsx`  
**Regenerate tracker:** `npm run content:spreadsheet`  
**Last updated:** 2026-05-27

### Status legend (shareable tracker)

| Status | Meaning |
|--------|---------|
| **Completed** | Built and deployed on [arcwellness.netlify.app](https://arcwellness.netlify.app/) |
| **In progress** | Shipped but one known item still open (see Notes) |
| **Pending** | Blocked on client input or not started |

**Summary:** 25 pages **Completed** · 1 **In progress** (Programs pricing) · 2 **Pending** (Privacy, Terms legal copy)

---

## Primary navigation (header menu)

Matches `src/lib/arcMarketingNav.ts` → `ARC_PRIMARY_NAV_LINKS`.

```
Home (/)
├── About (/about)
├── Treatments (/treatments)              ← live: Our Services (/new-page-2)
│   └── See all treatments (nav expander)
│       ├── ExoMind                       /treatments/exomind
│       ├── EmSella                       /treatments/emsella
│       ├── EmSculpt Neo                  /treatments/emsculpt-neo
│       ├── EmFace                        /treatments/emface
│       ├── Exion                         /treatments/exion
│       ├── Daxxify                       /treatments/daxxify
│       ├── RHA Fillers                   /treatments/rha
│       ├── Knesko                        /treatments/knesko
│       ├── Nutrient Therapy              /treatments/nutrient-therapy
│       ├── Peptide Therapy               /treatments/peptide-therapy
│       └── Supplements                   /treatments/supplements
├── Arc Aesthetics (/aesthetics)
├── Arc Programs (/programs)              ← live: /plans
├── Financing (/financing)
├── Insights (/case-studies)              ★ rebuild only — HLK-style feed hub
│   ├── Case study detail                 /case-studies/[slug]
│   └── Blog post                         /blog/[slug]
├── Contact (/contact)
└── Book (header CTAs → /book, Mangomint embed link)
```

---

## Homepage sections (`/` — `ArcMarketingHome`)

| # | Section | Anchor | Component | Status |
|---|---------|--------|-----------|--------|
| 1 | Scroll-expand hero | — | `ScrollExpandHero` | **Completed** |
| 2 | Concerns / “We hear you” | — | `ArcConcernsPinnedSection` | **Completed** |
| 3 | Welcome / who we are | `#about` | `ArcWelcomeSplitSection` | **Completed** |
| 4 | Founder intro | `#founder` | `ArcFounderIntroSection` | **Completed** |
| 5 | Whole-body care slider | `#services` | `WholeBodySection` → `ArcServicesShowcaseSlider` | **Completed** |
| 6 | Your path intro + steps | `#path` | `YourPathSection` | **Completed** |
| 7 | Testimonials | `#testimonials` | `ArcTestimonialsSection` | **Completed** |
| 8 | Invest / book CTA | `#book` | `InvestCTASection` | **Completed** |
| 9 | Footer | `#contact` | `ArcFooter` | **Completed** |

_Optional polish:_ homepage imagery — **In progress** (swap any remaining stock shots for final clinic photography).

**Global chrome:** `ArcSiteHeader` — fullscreen menu, treatment expander, mobile tap targets (May 2026).

---

## Public marketing routes

| Page | Live URL (reference) | Next.js route | Content / data | Status | Notes |
|------|----------------------|---------------|----------------|--------|-------|
| Home | …/ | `/` | `homepage.ts`, `site.ts` | **Completed** | |
| About | …/about | `/about` | `pages/about.ts` | **Completed** | |
| Treatments hub | …/new-page-2 | `/treatments` | `pages/treatments.ts` (`treatmentsHub`) | **Completed** | |
| Treatment overview | (hub section) | `/treatments/overview` | `treatments.ts` (`overview`) | **Completed** | |
| ExoMind | …/exomind | `/treatments/exomind` | `treatments.ts` | **Completed** | |
| EmSella | …/emsella | `/treatments/emsella` | `treatments.ts` | **Completed** | |
| EmSculpt Neo | …/emsculpt-neo | `/treatments/emsculpt-neo` | `treatments.ts` | **Completed** | |
| EmFace | …/emface | `/treatments/emface` | `treatments.ts` | **Completed** | |
| Exion | …/exion | `/treatments/exion` | `treatments.ts` | **Completed** | |
| Daxxify | …/daxxify | `/treatments/daxxify` | `treatments.ts` | **Completed** | |
| RHA | …/rha | `/treatments/rha` | `treatments.ts` | **Completed** | |
| Knesko | …/knesko | `/treatments/knesko` | `treatments.ts` | **Completed** | |
| Nutrient Therapy | …/vitamin-therapy | `/treatments/nutrient-therapy` | `treatments.ts` | **Completed** | |
| Peptide Therapy | …/new-page-1 | `/treatments/peptide-therapy` | `treatments.ts` | **Completed** | |
| Supplements | …/supplements | `/treatments/supplements` | `treatments.ts` | **Completed** | |
| Arc Aesthetics | …/aesthetics | `/aesthetics` | `pages/aesthetics.ts` | **Completed** | |
| Arc Programs | …/plans | `/programs` | `pages/programs.ts` | **In progress** | Membership/pricing tables still to finalize with client |
| Financing | …/financing | `/financing` | `pages/financing.ts` | **Completed** | |
| Contact | …/contact | `/contact` | `pages/contact.ts`, `siteMeta.ts` | **Completed** | |
| Book | Mangomint | `/book` | `siteMeta.bookingUrl` | **Completed** | |
| Insights hub | _(rebuild only)_ | `/case-studies` | `pages/insights.ts`, `data/insights-entries.json` | **Completed** | |
| Case study detail | _(rebuild only)_ | `/case-studies/[slug]` | `insights-entries.json` | **Completed** | 2 stories |
| Blog post | _(rebuild only)_ | `/blog/[slug]` | `insights-entries.json` | **Completed** | 4 posts |
| Privacy | footer | `/privacy` | `app/privacy/page.tsx` | **Pending** | Waiting on approved legal copy from client |
| Terms | footer | `/terms` | `app/terms/page.tsx` | **Pending** | Waiting on approved legal copy from client |

### Insights content (current)

| Type | Slug | Route |
|------|------|-------|
| Blog | `longevity-habits-that-compound` | `/blog/longevity-habits-that-compound` |
| Blog | `pelvic-health-without-the-stigma` | `/blog/pelvic-health-without-the-stigma` |
| Blog | `iv-support-for-busy-seasons` | `/blog/iv-support-for-busy-seasons` |
| Blog | `peptide-therapy-what-to-expect-first` | `/blog/peptide-therapy-what-to-expect-first` |
| Case study | `strength-after-setback` | `/case-studies/strength-after-setback` |
| Case study | `subtle-aesthetic-refinement` | `/case-studies/subtle-aesthetic-refinement` |

**Note:** No dedicated `/blog` index — listing lives on `/case-studies` with **All · Blogs · Case studies** tabs.

---

## Footer / legal

```
Privacy Policy (/privacy)   — **Pending** (placeholder shell)
Terms & Conditions (/terms) — **Pending** (placeholder shell)
```

Footer component: `ArcFooter.tsx` — address, phone, email, quick links, social (`siteMeta.ts`).

---

## Internal / dev-only (not in public sitemap)

| Route | Purpose |
|-------|---------|
| `/admin/login` | Insights CMS login |
| `/admin/insights` | Insights CMS editor |
| `/client-showcase` | Design mock / alternate homepage |
| `/logodemov1`, `/logodemov2`, `/logodemov3` | Logo placement demos |
| `/sphere-demo` | Testimonial sphere dev |

---

## Excluded from rebuild (live Squarespace)

| Live path | Reason |
|-----------|--------|
| `/home` | Alias of `/` |
| `/our-services` | Duplicate of `/new-page-2` |
| `/new-page-1` | Legacy peptide slug → `/treatments/peptide-therapy` |
| `/supplements-1` | Duplicate of `/supplements` |
| `/cart` | Commerce stub |

---

## Machine-readable sitemap

Next.js generates `https://arcwellness.netlify.app/sitemap.xml` from `src/app/sitemap.ts` (static routes + treatments + insights entries).

---

## Related docs

| Doc | Purpose |
|-----|---------|
| `documents/arc-wellness-content-parity.xlsx` | Section-by-section status per page |
| `documents/content-parity-roadmap.md` | Live → Next copy parity plan |
| `documents/arcwellness-net-full-content-inventory.md` | Crawled live-site copy |
| `documents/site-section-content-inventory.md` | Homepage section copy snapshot (may lag code) |

**Regenerate crawl + inventory:**

```bash
node scripts/crawl-arcwellness-net.mjs
node scripts/generate-arcwellness-inventory.mjs
npm run content:spreadsheet
```
