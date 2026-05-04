# Homepage section model — reference vs ARC plan

Reference reviewed: **Avani Derm Spa**–style homepage (many stacked blocks: hero taglines, welcome + image, review bar, full-bleed lobby, philosophy, founders, services hub, injectables feature, clinical positioning, “difference” cards, testimonials, team strip, etc.).

**Your direction:** Same *kind* of storytelling (USP, proof, emotion, services) but **fewer** blocks, each **more concentrated** — including **micro-sections** that are **only a catchphrase + one sharp USP line** (no long body).

**Brand note for implementation:** Keep ARC palette (**teal / cream / charcoal**, serif + sans + Birthstone for accents) — do not copy Avani’s gold-heavy UI; copy the **rhythm** and **information architecture**, not the colors.

---

## What the reference does well (patterns to borrow)

| Pattern | Role |
|--------|------|
| **Script + sans headline** | Emotional hook + clarity in one glance |
| **Two-column welcome** | Image + short proof-led copy + single CTA |
| **Trust / review row** | Social proof without a paragraph |
| **Full-bleed “mood” hero** | Logo + one line on photography |
| **Centered thesis** | One H1-style line + subline + one tight paragraph |
| **Split testimonial** | Photo + quote (depth without many words) |
| **Service spotlight** | One modality with headline + USP + 2 links |
| **USP cards (2-up)** | Two differentiators side by side |

---

## Proposed ARC homepage — **fewer, denser** sections

Roughly **8–9 scroll experiences** (vs 15+ on the reference). Pin/scrub can stay on **hero + 1–2** signature moments only; other blocks can be **short pinned** or **normal flow** so the page doesn’t feel endless.

| Order | Section type | What’s on screen | Depth |
|------:|--------------|------------------|-------|
| **1** | **Hero** (existing, refine) | Full-bleed + expanding frame + title + intro + Book + Watch | High motion; keep copy tight |
| **2** | **Micro: USP + catchphrase only** | e.g. serif line + optional one-line USP (Birthstone on one word); optional “Explore” chevron → `#about` | **No paragraph** — 2–4 seconds read |
| **3** | **Welcome / thesis** | Image + **2 short paragraphs** max + **one bold local or proof phrase** + one link | Replaces part of current “Who we are” weight |
| **4** | **Trust strip** (if you have data) | Single row: ratings / press / “years serving STL” / partner logos — **no essay** | Optional until real numbers exist |
| **5** | **Whole-body pillars** | **3 cards** (not 5): merge adjacent themes OR “featured + see all” | Concentrated grid |
| **6** | **Micro: second catchphrase** | Different emotional beat — e.g. “Intentional care at every age.” only | **USP strip** |
| **7** | **Path** | **3 steps** (Consult → Plan & treat → Sustain) OR keep 5 but **smaller** horizontal cards | Lighter than today |
| **8** | **Invest CTA** | Full-bleed + headline + **one supporting sentence** + Book | Slightly more depth than now |
| **9** | **Footer** | Real links, phone, address, hours | Production |

**Optional later (not required for v1):** testimonial split, single **service spotlight** (rotating), founders / team strip — add only when assets and copy exist.

---

## “USP + catchphrase only” — spec for dev

- **Height:** `min-h-[50dvh]`–`min-h-[70dvh]` or fixed `py-24`–`py-32` — enough breath, no empty half-screen unless intentional.
- **Copy structure:**  
  - Line 1: **Catchphrase** (large serif or serif + one script word).  
  - Line 2: **USP** (smaller sans, max ~120 characters).  
- **Optional:** small label above (`tracking-widest` uppercase teal).  
- **Optional:** single text link or scroll cue — no button row.
- **Motion:** subtle fade/slide on enter (`data-scroll-section`) or static; **no** second pin unless you want a “beat” here.

---

## Mapping from **current** ARC homepage

| Current | Proposed action |
|---------|-----------------|
| `ScrollChapterIntro` (meta “scroll through chapters…”) | **Replace** with micro USP strip **or** merge into Welcome |
| `WhoWeAreSection` | Shorten body; move one proof sentence to Welcome; keep one strong H2 |
| `WholeBodySection` (5 cards) | **Reduce to 3** or 3 + “View all services” |
| `YourPathSection` (5 steps) | **Reduce to 3** or compress copy per step |
| `InvestCTASection` | Add **one** supporting line |
| `ArcFooter` | Replace placeholders when ready |

---

## Next implementation steps (when you say go)

1. Add **`ArcMicroStatementSection`** (or similar) component: props `eyebrow?`, `headline`, `uspLine?`, `href?`, `linkLabel?`.  
2. Update **`page.tsx`** order and replace chapter intro with micro + welcome split.  
3. Refactor **`WholeBodySection`** cards to accept `maxCards` or a slimmer `cards` array from `site.ts`.  
4. Optional **`ArcTrustStrip`** when you have review counts / logos.

---

_File purpose: align “Avani-like depth” with “fewer, more concentrated” ARC sections and explicit USP-only strips._
