# ARC Wellness — content draft from [arcwellness.net](https://www.arcwellness.net/)

Working copy for **additional routes** beyond the current marketing homepage. Source: live Squarespace site (May 2026). Use for `src/content/` and future `src/app/*/page.tsx` — **not** auto-wired until approved.

**Production facts (use site-wide)**

| Field | Value |
|--------|--------|
| Legal / brand | Arc Wellness |
| Address | 5000 Cedar Plaza Parkway, Ste. 230, St. Louis, MO 63128 |
| Phone | [636-400-5500](tel:+16364005500) |
| Email | [info@arcwellness.net](mailto:info@arcwellness.net) |
| Online booking | [Mangomint — Book Now](https://booking.mangomint.com/892312) |
| Hours (contact page) | Monday–Friday, 9 AM–5 PM |
| Social | [Instagram](https://www.instagram.com/thearcwellness) · [Facebook](https://www.facebook.com/share/1Lx35zTaC7/) · [TikTok](https://www.tiktok.com/@thearcwellness) · [X](https://x.com/arcwellness) |

---

## Recommended site map (new Next.js build)

| Route | Purpose | Status in repo today |
|-------|---------|----------------------|
| `/` | Marketing homepage (scroll experience) | **Built** — copy partially diverges from live site (see alignment notes) |
| `/about` | Mission, vision, values, founder letter | **Not built** |
| `/treatments` | Hub: categories + links to modalities | **Not built** |
| `/treatments/[slug]` | One page per modality (see slugs below) | **Not built** |
| `/programs` | Arc Programs (packages / continuity) | **Not built** — confirm live URL slug with client |
| `/aesthetics` | Arc Aesthetics overview | **Not built** |
| `/financing` | PatientFi, Cherry, in-house options | **Not built** (live page is thin) |
| `/contact` | Form, hours, map, contact channels | **Not built** |
| `/book` | Redirect or embed → Mangomint | **Not built** (homepage uses `#book` band only) |
| `/privacy` · `/terms` | Legal | **Not built** (footer placeholders) |

**Treatment slugs** (match live nav where possible):

`overview` · `exomind` · `emsella` · `emsculpt-neo` · `emface` · `exion` · `daxxify` · `rha` · `knesko` · `nutrient-therapy` · `peptide-therapy` · `supplements`

---

## Alignment notes — homepage vs live site

| Topic | Live [arcwellness.net](https://www.arcwellness.net/) | Current Next.js homepage |
|--------|------------------------------------------------------|---------------------------|
| Location | St. Louis, MO (Cedar Plaza) | Copy mentions **Presidio** — **update to St. Louis** unless a second location is intentional |
| Hero thesis | “A New Standard of Care for the Life You Live” | “Where Aesthetics, Wellness, and Longevity Converge” — stronger for new brand; optional subhead from live site |
| Path steps | 5 steps (consult → treatment → adjust → monitor → support) | 4 steps (Listen → Measure → Plan → Partner) — **pick one model** or merge |
| Concerns | Fatigue, stress/fog, core/posture, pelvic, immune/hormonal | Overlapping set with different labels — map 1:1 in content pass |
| FAQ | On homepage (4 Qs) | FAQ content in `homepage.ts` but **section not mounted** — reuse copy below |
| Footer | Real address, phone, email | Placeholder address/phone in `ArcFooter.tsx` |

---

## Global chrome (header / footer)

### Header nav (match live IA)

- Home → `/`
- About → `/about`
- Treatments → `/treatments` (mega or drawer: Overview + device/therapy links)
- Arc Aesthetics → `/aesthetics`
- Arc Programs → `/programs`
- Financing → `/financing`
- Contact → `/contact`
- **Book Now** (primary CTA) → `/book` or Mangomint URL

### Footer — production copy draft

**Tagline:** Elevated care. Extraordinary results. A life well-lived.

**Contact column**

- 5000 Cedar Plaza Parkway, Ste. 230  
  St. Louis, MO 63128  
- [636-400-5500](tel:+16364005500)  
- [info@arcwellness.net](mailto:info@arcwellness.net)  
- Mon–Fri: 9 AM – 5 PM  

**Quick links**

- About → `/about`
- Our Services → `/treatments`
- Wellness Therapies → `/treatments#wellness`
- Packages → `/programs`
- Financing → `/financing`
- Contact → `/contact`

**Legal**

- © {year} Arc Wellness. All rights reserved.
- [Privacy Policy](/privacy) · [Terms and Conditions](/terms)

---

## `/` — Homepage (live site reference)

Use to **audit** existing sections; tighten or replace placeholder copy.

### Hero

- **H1:** Arc Wellness  
- **Subhead:** A New Standard of Care for the Life You Live  
- **Body:** Rooted in vitality, Arc Wellness combines medical expertise with personalized wellness practices to support your body, mind, and core. From non-invasive treatments for weight management, pelvic health, and cognitive performance to restorative therapies and lifestyle guidance, everything we do is designed to help you move, think, and feel with more strength, clarity, and confidence.  
- **Primary CTA:** Book Now  
- **Secondary CTA:** Explore our services → `/treatments`

### Wellness, made personal (≈ `#about` on new site)

- **H2:** Wellness, Made Personal  
- While our services are modern, our philosophy is simple: true wellness should be powerful, personal, and accessible to everyone.  
- That’s why we’ve made treatments like peptides, infusions, and supplements available at rates that make long-term wellness sustainable, not exclusive.  
- Because taking care of yourself shouldn’t feel like a luxury.  

### What we help you restore (≈ concerns section)

- **H2:** What We Help You Restore  
- **Intro:** We focus on the everyday imbalances that slowly steal vitality:  
- **Pillars:**  
  - Fatigue & Low Energy  
  - Stress & Mental Fog  
  - Core Weakness & Posture  
  - Pelvic Health & Control  
  - Immune & Hormonal Imbalance  
- **CTA:** Explore our services  

### Your path (5-step — live site order)

- **H2:** Your Path Toward Feeling Whole Again  
- **Subhead:** We’ve simplified wellness into a rhythm that feels natural—one that evolves with your life, not around it.  

| Step | Title | Body (from live site) |
|------|--------|------------------------|
| 1 | Free consultation | We begin with an in-depth conversation to understand your current state and where you want to be. Every plan is created with your goals and lifestyle in mind. |
| 2 | Treatment | You’ll begin your personalized blend of therapies, guided by medical professionals to deliver results that feel as real as they look. |
| 3 | Adjustments | As your body responds, we refine your care. Small shifts make the difference between progress and transformation. |
| 4 | Monitoring | Progress is measured through weekly check-ins. You’ll see how your body and your confidence change over time. |
| 5 | Ongoing support | Wellness doesn’t end when you leave our doors. We stay connected—continued guidance, maintenance options, and care that adapts with you. |

### Differentiators (not on current homepage — candidate band)

- **Pull quote:** What sets us apart isn’t just how we treat; it’s how we care.  

| Title | Body |
|--------|------|
| Science with Soul | Everything we do is grounded in research and guided by compassion. You’re never just a patient here—you’re a person with a story, and your care reflects that. |
| Physician-Led Care | Under the guidance of Dr. Jabbar and our clinical team, your care is never one-size-fits-all. It’s designed, adjusted, and evolved for you. |
| Whole-Person Healing | We don’t chase symptoms. We restore systems—physical, mental, and emotional—for results that last. |
| Real Access, Real Results | We believe premium wellness shouldn’t live behind a high price tag. Our goal is to bring world-class treatments within reach of everyday people who want to feel their best. |

### Homepage FAQ (live site — mount in `ArcFaqSection` or `/about#faq`)

1. **What happens during my first visit?**  
   Your first visit begins with a **free consultation** and, where needed, a **Styku 3D body scan**. Together, we’ll discuss your goals, lifestyle, and budget to create a plan that’s realistic and personal.

2. **Are your treatments safe?**  
   Yes. Our technologies—including ExoMind, Emsella, and EmSculpt Neo—are **FDA-cleared** and clinically supported. For IV infusions, peptides, and supplements, each protocol is dosage-monitored and quality-verified. Before any treatment begins, your medical provider reviews your history.

3. **Do you offer financing or payment plans?**  
   Yes. In-house payment options and third-party financing via **PatientFi** and **Cherry**—begin your journey now and pay over time.

4. **What services are available for men?**  
   All of them. For men, we focus on core strength, pelvic floor health, energy levels, and mental performance through customized, non-invasive therapies.

---

## `/about` — About

**SEO title:** About Arc Wellness | Physician-Led Wellness in St. Louis  
**Meta description:** Mission, values, and founder story—whole-person wellness combining medical expertise, innovation, and restorative therapies.

### Hero

- **H1:** The Arc Toward Lifelong Vitality  
- Every movement begins with a moment of clarity—a question that refuses to be ignored.  
- Arc Wellness began as a question Dr. Jabbar couldn’t stop asking: *“Why do so many people who follow medical advice still feel unwell?”*  
- The answer, he realized, lay in patients’ willingness to heal—supported by guidance, care, and human connection.

### Our mission

- **H2:** Our Mission  
- **Subhead:** Vitality, powered by science and care  
- Bridge the gap between traditional medicine and transformative wellness—uniting medical expertise, modern innovation, and restorative therapies to elevate your body, mind, and core.

### Our vision

- **H2:** Our Vision  
- **Subhead:** Wellness that lasts a lifetime  
- Build a connected Arc community where every member is physically well, emotionally resilient, and mentally thriving.

### Values

- **H2:** The Values that Shape Arc Wellness  
- **Intro:** Our values shape every choice we make—from how we listen to how we treat.  

| Value | Summary |
|--------|---------|
| Prevention over reaction | Build resilience before you need crisis care. |
| Integrity in care | Medical professionals first—evidence-based, transparent about what you need and what you don’t. |
| Innovation with purpose | High-performance tools that solve real problems—not gadgets for show. |
| Empowerment through knowledge | Plain language, open dialogue, confident decisions. |
| Compassion in action | Empathy for vulnerable concerns—from first consult to last session. |

### Founder note

- **H2:** A Note From Our Founder  
- As a physician, I’ve dedicated my career to helping people manage their health—but I always knew there was more to offer than prescriptions and routine visits.  
- Too often I met patients in quiet survival mode—physically depleted, mentally foggy, disconnected from themselves.  
- That realization inspired Arc Wellness: science, technology, intention, and care—prevention, function, and longevity across every decade of life.  
- Treatments include Emsculpt Neo, Emsella, ExoMind, IV infusions, peptide therapy, and nutritional support.  
- **Sign-off:** — Dr. Danish A. Jabbar, Founder & Medical Director, Arc Wellness  

**CTA:** Book a free consultation → `/book`

---

## `/treatments` — Treatments hub

**SEO title:** Treatments & Therapies | Arc Wellness St. Louis  
**Meta description:** FDA-cleared devices, IV therapy, peptides, aesthetics, and supplements—physician-led plans for energy, core strength, mind, and skin.

### Hero

- **H1:** Treatments designed for how you live  
- **Body:** From cognitive performance and pelvic health to body composition and skin—every modality is selected for clinical purpose and integrated into one plan.  
- **CTA:** Book a free consultation  

### Category blocks (link to child pages)

#### Body & core (devices)

| Treatment | Slug | One-line |
|-----------|------|----------|
| Overview | `overview` | How we combine modalities into one plan |
| ExoMind | `exomind` | TMS neuromodulation for mood, focus, cravings, pain perception |
| EmSella | `emsella` | Pelvic floor strengthening (draft detail page) |
| EmSculpt Neo | `emsculpt-neo` | Simultaneous fat reduction + muscle building |
| EmFace | `emface` | Facial toning / lift (draft from live nav) |
| Exion | `exion` | Skin remodeling (draft from live nav) |

#### Aesthetics & injectables

| Treatment | Slug | One-line |
|-----------|------|----------|
| Daxxify | `daxxify` | Long-lasting neuromodulator |
| RHA | `rha` | Resilient hyaluronic acid fillers |
| Knesko | `knesko` | Luxury treatment masks / skincare |

#### Wellness therapies

| Treatment | Slug | One-line |
|-----------|------|----------|
| Nutrient therapy | `nutrient-therapy` | IV infusions tailored to goals |
| Peptide therapy | `peptide-therapy` | Protocol-based peptide support |
| Supplements | `supplements` | Quality-verified nutritional support |

#### Programs & aesthetics brands

- **Arc Aesthetics** → `/aesthetics`  
- **Arc Programs** → `/programs`  

### Cross-cutting trust strip

- FDA-cleared technologies where applicable  
- Physician review before treatment  
- Financing available (PatientFi, Cherry, in-house)  

---

## `/treatments/exomind` — ExoMind (sample modality page)

*Pattern for other treatment pages: hero → who benefits → experience → benefits → FAQs → CTA.*

### Hero

- **H1:** ExoMind  
- **Subhead:** Reconnect your mind to its natural harmony  
- Advanced neuromodulation using Transcranial Magnetic Stimulation (TMS)—measured magnetic pulses that activate key neural pathways and support healthier brain function.  
- **CTA:** Book your ExoMind consultation  

### Who can benefit

Anyone seeking mental clarity, emotional balance, or cognitive renewal **without** relying on medications or invasive procedures. Also supports ADHD, OCD, and depression symptoms (per live site—keep clinical review).

### What you may notice

- Relief from stress, anxiety, or emotional imbalance  
- Improved focus, memory, and productivity  
- Restored energy and mental clarity  

### Beyond everyday benefits

- **Cravings / emotional eating:** Stimulates reward and decision pathways to reduce neurological “noise.”  
- **Pain perception:** Retrains pain-related circuits for mental calm and physical relief.  

### Client themes (paraphrase; use approved quotes only)

- Sharper focus · Better mood · Better sleep · Mental energy without drug side effects  

### FAQ (abbreviated — full list on live `/exomind`)

- What is ExoMind? Non-invasive, drug-free walk-in/walk-out care for depression symptoms (FDA-cleared TMS).  
- How does it work? Comfortable stimulation of emotional regulation and cognitive pathways.  
- How many sessions? Discuss schedule with your physician; effects may need maintenance.  
- Does it hurt? Most patients find it comfortable; under 30 minutes per session.  
- Risks? Discuss with provider—headache, scalp discomfort, and rare serious events per labeling.  

**CTA:** Book your consultation today  

---

## `/treatments/emsculpt-neo` — EmSculpt Neo (sample)

### Hero

- **H1:** EmSculpt Neo  
- **Subhead:** Restore your body to its natural form  
- Non-invasive dual technology: **HIFEM** muscle contractions + **radiofrequency** heating for fat reduction and muscle definition.  
- **CTA:** Schedule your free consultation  

### Highlights

- **Areas:** Abdomen, buttocks, thighs, arms, calves, pelvic floor  
- **Who:** Stronger muscles, sculpted physique, fitness plateaus, non-surgical contouring, postpartum core re-strengthening  
- **Experience:** Warmth + intense contractions; ~30 minutes; no downtime  
- **Plan:** Often 4 weekly sessions; optimal results 2–3 months after series  

### FAQ (short)

- FDA-cleared · Not insurance-covered · Packages & financing at Arc  

---

## `/treatments/emsella` — EmSella (draft stub)

*Live page not fetched—structure from nav + brand context.*

- **H1:** EmSella  
- **Subhead:** Pelvic floor wellness without surgery  
- FDA-cleared HIFEM chair for pelvic floor strengthening—incontinence, postpartum recovery, core stability.  
- **CTA:** Book consultation  
- **Sections to write with client:** who it helps, session length, what it feels like, pairing with EmSculpt Neo for core/pelvic, FAQs  

---

## `/treatments/emface` · `/exion` · `/daxxify` · `/rha` · `/knesko` — Aesthetics stubs

Use shared template:

1. Hero (name + one sentence)  
2. What it is / FDA or regulatory status if applicable  
3. Who it’s for  
4. What to expect (visit length, downtime)  
5. How it fits an Arc plan  
6. FAQ (3–6)  
7. Book CTA  

*Pull final clinical copy from live pages or clinical team.*

---

## `/treatments/nutrient-therapy` · `/peptide-therapy` · `/supplements`

### Nutrient therapy (IV)

- Physician-designed infusion protocols  
- Dosage-monitored, quality-verified  
- Goals: energy, immunity, recovery, hydration—personalized after consult  

### Peptide therapy

- Protocol-based support for metabolism, recovery, vitality  
- Integrated with labs and lifestyle—not standalone “trend” dosing  

### Supplements

- Curated, quality-verified products  
- Priced for sustainable long-term use (aligns with “accessible wellness” positioning)  

---

## `/aesthetics` — Arc Aesthetics

**H1:** Arc Aesthetics  
**Body:** Medical-grade skin and facial care—injectables, laser, and treatment experiences that match the rest of your wellness plan. Natural refinement, physician oversight, honest timelines.  

**Link out:** Daxxify · RHA · Knesko · EmFace · Exion (as applicable)  

**CTA:** Book an aesthetics consultation  

---

## `/programs` — Arc Programs

*Live content not retrieved—draft structure for client fill-in.*

- **H1:** Arc Programs  
- **Body:** Continuity options for patients who want rhythm, accountability, and priority access—packages that bundle consult, treatment series, and follow-up.  
- **Sections:** Membership tiers (if any) · Seasonal wellness tracks · Men’s / women’s focus tracks · What’s included vs à la carte  
- **CTA:** Ask about programs at your free consult  

---

## `/financing` — Financing

**H1:** Invest in wellness on your timeline  
**Body:** Care shouldn’t wait because of upfront cost. Arc Wellness offers:

- **In-house payment options**  
- **PatientFi**  
- **Cherry**  

Begin your plan now; pay over time. Your care team explains options during your free consultation—no pressure, full transparency.

**CTA:** Book a free consultation · Contact us with questions  

---

## `/contact` — Contact

**H1:** We’re here when you’re ready  
**Intro:** Finding support shouldn’t feel like another hurdle. However you begin—a message, a call, or a visit—we listen with care, respect, and understanding.

### Reach out your way

| Channel | Copy |
|---------|------|
| Phone | If we’re with a client, leave a message—we return every call within one business day. **636-400-5500** |
| Email | A few words about what you’re looking for is enough. **info@arcwellness.net** |
| Visit | 5000 Cedar Plaza Parkway, Ste. 230, St. Louis, MO 63128 |

### Hours

Monday – Friday: 9 AM – 5 PM  

### Form (fields)

- Name · Email · Phone (optional)  
- “What brings you here?” (textarea)  
- Preferred contact method  
- Submit → care team (wire to CRM/email when ready)  

**Closing line:** Every journey finds its curve. We’re honored to walk alongside yours.  

---

## `/book` — Booking

- Short reassurance copy + embedded Mangomint or prominent button:  
  **[Book now](https://booking.mangomint.com/892312)**  
- Phone fallback: 636-400-5500  

---

## `/privacy` · `/terms`

- Replace footer `#` links with legal pages (client to supply approved PDF/HTML or attorney copy).  
- Minimum: HIPAA notice if applicable, privacy policy, terms of use, SMS/email consent if marketing forms exist.  

---

## Implementation checklist (engineering)

1. Add `src/content/siteMeta.ts` — address, phone, email, booking URL, hours, social URLs.  
2. Replace footer placeholders in `ArcFooter.tsx` with production values.  
3. Fix homepage Presidio → St. Louis unless intentional.  
4. Reconcile path model (4 vs 5 steps) with client.  
5. Mount FAQ section or add `/about#faq`.  
6. Create routes incrementally: **About → Contact → Treatments hub → top 3 treatment pages (ExoMind, EmSculpt Neo, overview)**.  
7. Wire all “Book” CTAs to Mangomint.  

---

## Sources

- [arcwellness.net](https://www.arcwellness.net/) — homepage, nav, footer  
- [About](https://www.arcwellness.net/about)  
- [Contact](https://www.arcwellness.net/contact)  
- [Financing](https://www.arcwellness.net/financing)  
- [ExoMind](https://www.arcwellness.net/exomind)  
- [EmSculpt Neo](https://www.arcwellness.net/emsculpt-neo)  
- Booking: [Mangomint](https://booking.mangomint.com/892312)  

_Last drafted: 2026-05-27. Clinical claims require provider review before publish._
