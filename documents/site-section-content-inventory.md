# ARC Wellness homepage — section content inventory

Working snapshot of **what each block says and does today** (for deepening copy, proof points, and production details). Source: `src/app/page.tsx` and section components under `src/components/arc/`.

---

## Global chrome (not a scroll “chapter”)

| Element | Role | Current content / behavior |
|--------|------|----------------------------|
| **Site header** (`ArcSiteHeader` / `SiteHeader`) | Fixed nav | Logo → home; **Menu** opens fullscreen drawer with anchors: About `#about`, Services `#services`, Your path `#path`, Invest in you `#book`, Contact `#contact`. Rows show hover image previews. |
| **Assets** (`src/content/site.ts`) | Image/video paths | Logo, hero bg + center media, who-we-are photo, invest banner, 5 service card images; `videos` map for `.mov` paths (files gitignored). |

---

## 1. Hero — `ScrollExpandHero`

| Field | Current |
|--------|---------|
| **Visuals** | Full-bleed **bg**: `images.heroBg` (exterior sunset). Center **frame** expands on scroll: `images.heroMedia` (reception). |
| **H1 (sr-only)** | Same as visible title below. |
| **Title** (from `page.tsx`) | “Where **Aesthetics**, **Wellness**, and **Longevity** Converge.” — second line: keywords in **Birthstone** script (`TitleEmphasis`), rest in white serif. |
| **Intro** | “ARC Wellness pairs thoughtful aesthetics with whole-body wellness—so you can age intentionally and live with confidence.” |
| **Primary CTA** | Link → `#book` — **“Book Now”** |
| **Secondary** | Button (no action wired): **“Watch our story”** + play icon |
| **Motion** | Pin + scrub; bg fades; center media grows; title lines shift on progress. |

**Depth gaps:** No subhead, no stats/trust, no location/hours, “Watch our story” doesn’t open media, no social proof.

---

## 2. Chapter intro — `ScrollChapterIntroSection` (`id="chapters"`)

| Field | Current |
|--------|---------|
| **Headline** | “Care, chapter by chapter” |
| **Body** | “Scroll through each chapter of care—from philosophy and services to your ongoing path and next step with our team.” |
| **Image** | `images.whoWeAre` (pans on scroll) |
| **Decor** | “01” watermark, teal vertical rule |
| **Motion** | Pin + scrub; image pan + text drift |

**Depth gaps:** Meta copy only—doesn’t introduce *who* ARC is or *what* makes chapters different; no CTA.

---

## 3. Who we are — `WhoWeAreSection` (`id="about"`)

| Field | Current |
|--------|---------|
| **Eyebrow** | “Who we are” |
| **H2** | “Care That’s **Intentional**. Results That **Last**.” (emphasis spans use `TitleEmphasis` / Birthstone in component) |
| **Body** | (1) One roof: aesthetics + wellness + longevity; confidence in skin and health long-term. (2) Evidence-informed + calm experience; plans tailored to goals, pace, lifestyle. (3) Prevention / restoration / refinement; clarity and care. |
| **CTA** | Link → `#book` — **“Book Your Consultation”** |
| **Image** | `images.whoWeAre` — alt: “Consultation at ARC Wellness” |

**Depth gaps:** No provider names, credentials, years in practice, neighborhood, or “why us” differentiators; no second CTA (e.g. tour, philosophy page).

---

## 4. Whole-body services — `WholeBodySection` (`id="services"`)

| Field | Current |
|--------|---------|
| **H2** | “Whole-Body Care. Inside and Out.” |
| **Layout** | Five cards in a row (responsive grid); each has image (`images.services[i]`), title, 3 bullets, italic tagline, **“Learn more →”** → `#contact`. One card (“Strengthen Your Foundation”) is **highlighted** (teal border). |

**Card 1 — Rejuvenate Your Appearance**  
Bullets: Facial aesthetics; Skin quality; Confidence-forward planning.  
Tagline: *“Look refreshed, not different.”*

**Card 2 — Restore Peak Performance**  
Bullets: Energy & recovery; Metabolic health; Athletic longevity.  
Tagline: *“Feel strong in motion and at rest.”*

**Card 3 — Strengthen Your Foundation** (highlight)  
Bullets: Hormone balance; Vitality; Ongoing monitoring.  
Tagline: *“Build resilience from the inside out.”*

**Card 4 — Elevate Sexual Wellness**  
Bullets: Discreet consults; Evidence-based options; Comfort-first care.  
Tagline: *“Well-being that respects your privacy.”*

**Card 5 — Optimize Cognitive Edge**  
Bullets: Focus & clarity; Stress resilience; Healthy aging.  
Tagline: *“Stay sharp for what matters most.”*

**Depth gaps:** Bullets are category labels only—no specific modalities, durations, or “what to expect”; “Learn more” doesn’t go to real service pages; no pricing philosophy, membership teaser, or medical disclaimer where needed.

---

## 5. Patient journey — `YourPathSection` (`id="path"`)

| Field | Current |
|--------|---------|
| **H2** | “Your Path to Feeling and Living at Your Best” |
| **CTA** | Link → `#book` — **“Start Your Journey”** |
| **Steps** (5) | Copy from `src/content/pathSteps.ts`; **UI**: prior mint section + cream sticky bars + white icon cards (`YourPathSection` immersive); reduced-motion horizontal card row. |

1. **Listen** — `STEP 01 · 90 MINUTES` — conversation-first intake.  
2. **Measure** — `STEP 02 · TWO VISITS` — labs, body composition, cognitive assessments.  
3. **Author** — `STEP 03 · ONE WEEK` — five-chapter plan.  
4. **Practice** — `STEP 04 · ONGOING` — monthly rhythm.  
5. **Revise** — `STEP 05 · EACH SEASON` — quarterly updates.

**Depth gaps:** Optional link-out to what to bring / portal; disclaimers if copy reads as clinical promises.

---

## 6. Invest CTA band — `InvestCTASection` (`id="book"`)

| Field | Current |
|--------|---------|
| **Visual** | Full-bleed `images.investBanner` (lobby) + dark overlay |
| **H2** | “Invest in You. Live Fully. Age Intentionally.” |
| **CTA** | Link → `#book` (same section) — **“Book Now”** |

**Depth gaps:** No supporting line, no scheduler embed, no phone; self-anchoring CTA only.

---

## 7. Footer — `ArcFooter` (`id="contact"`)

| Block | Current |
|--------|---------|
| **Marquee** | “Elevated care ✦ Extraordinary results ✦ A life well-lived ✦ ARC Wellness ✦” (repeated) |
| **Brand column** | “ARC WELLNESS”; tagline “Elevated care. Extraordinary results. A life well-lived.”; © year ARC Wellness. |
| **Link columns** (all `href="#"` placeholders) | **About:** Our Story, Providers, Care Philosophy. **Services:** Aesthetics, Wellness, Longevity, Membership. **Patients:** New Patients, Forms, FAQs. **Shop:** Gift Cards, Skincare, Supplements. |
| **Stay connected** | Instagram, Facebook, TikTok (`#`); **“Book Here”** → `#book`; phone **(555) 555-1234**; address **“Your City, ST — coming soon”** |
| **Legal row** | Privacy Policy (`#`), Terms of Use (`#`), **Back to top** (scroll) |

**Depth gaps:** All nav links are stubs; placeholder phone/address; no hours, email, map, or HIPAA note.

---

## Suggested “depth” additions (cross-cutting)

1. **Proof:** Provider names, board certs, press, patient count, years serving STL (when true).  
2. **Concrete services:** Named treatments or programs under each pillar (even if pages are `#` for now).  
3. **Booking path:** Real phone, booking URL, or embedded scheduler on `#book`.  
4. **Footer:** Real links, address, hours, privacy/terms URLs.  
5. **Hero secondary:** Wire “Watch our story” to video modal or `/story` route when asset is ready (`videos` in `site.ts`).  
6. **Chapter intro:** Replace meta “scroll” copy with a substantive thesis line + optional CTA.

---

## File map (where to edit)

| Section | Primary files |
|---------|----------------|
| Hero title/intro/CTAs | `src/app/page.tsx` → `ScrollExpandHero` props; keywords default in `ScrollExpandHero.tsx` |
| Chapter intro | `src/app/page.tsx` |
| Who we are | `WhoWeAreSection.tsx` |
| Service cards | `WholeBodySection.tsx` (`cards` array) |
| Journey steps | `YourPathSection.tsx` (`steps` array) |
| Invest band | `InvestCTASection.tsx` + `page.tsx` image |
| Footer | `ArcFooter.tsx` |
| Images | `src/content/site.ts` + `public/assets/…` |

_Last updated from repo scan; adjust this doc as copy changes._
