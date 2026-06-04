# Arc Wellness — full site content inventory

**Source:** [arcwellness.net](https://www.arcwellness.net/)  
**Crawled:** 2026-06-03T21:33:52.110Z  
**Method:** BFS crawl from homepage + sitemap seeds; text extracted from HTML.

Use this document to wire `src/content/`, audit the Next.js rebuild, and track gaps vs. the live Squarespace site.

---

## Production contact & booking

| Field | Value |
|--------|--------|
| Brand | Arc Wellness |
| Address | 5000 Cedar Plaza Parkway, Ste. 230, St. Louis, MO 63128 |
| Phone | [636-400-5500](tel:+16364005500) |
| Email | [info@arcwellness.net](mailto:info@arcwellness.net) |
| Booking | [Mangomint — Book Now](https://booking.mangomint.com/892312) |
| Social | [Instagram](https://www.instagram.com/thearcwellness) · [Facebook](https://www.facebook.com/share/1Lx35zTaC7/) · [TikTok](https://www.tiktok.com/@thearcwellness) · [X](https://x.com/arcwellness) |

---

## Live navigation → URL map

| Nav label (live site) | Live URL | Recommended Next.js route |
|------------------------|----------|---------------------------|
| Home | https://www.arcwellness.net/ | / |
| About | https://www.arcwellness.net/about | /about |
| Our Services | https://www.arcwellness.net/new-page-2 | /treatments |
| Wellness Therapies (IV hub) | https://www.arcwellness.net/wellness-therapies | /treatments#wellness |
| ExoMind | https://www.arcwellness.net/exomind | /treatments/exomind |
| EmSella | https://www.arcwellness.net/emsella | /treatments/emsella |
| EmSculpt Neo | https://www.arcwellness.net/emsculpt-neo | /treatments/emsculpt-neo |
| EmFace | https://www.arcwellness.net/emface | /treatments/emface |
| Exion | https://www.arcwellness.net/exion | /treatments/exion |
| Daxxify | https://www.arcwellness.net/daxxify | /treatments/daxxify |
| RHA | https://www.arcwellness.net/rha | /treatments/rha |
| Knesko | https://www.arcwellness.net/knesko | /treatments/knesko |
| Nutrient Therapy | https://www.arcwellness.net/vitamin-therapy | /treatments/nutrient-therapy |
| Supplements | https://www.arcwellness.net/supplements | /treatments/supplements |
| Arc Aesthetics | https://www.arcwellness.net/aesthetics | /aesthetics |
| Arc Programs | https://www.arcwellness.net/plans | /programs |
| Financing | https://www.arcwellness.net/financing | /financing |
| Contact | https://www.arcwellness.net/contact | /contact |
| Book Now | https://booking.mangomint.com/892312 | /book (redirect to Mangomint) |

---

## Pages crawled (23 URLs; 19 content pages)

| Path | Title | Status |
|------|-------|--------|
| / | Arc Wellness | Enhance Your Wellness Today | ✅ 200 |
| /about | About | Explore Wellness Options – Take Action Today — Arc W | ✅ 200 |
| /aesthetics | Arc Aesthetics — Arc Wellness | ✅ 200 |
| /contact | Contact | Get Wellness Guidance Now — Arc Wellness | ✅ 200 |
| /daxxify | ExoMIND | Enhance Mental Wellness Today — Arc Wellness | ✅ 200 |
| /emface | ExoMIND | Enhance Mental Wellness Today — Arc Wellness | ✅ 200 |
| /emsculpt-neo | EmSCULPT NEO | Transform Your Body Today — Book Now — Arc We | ✅ 200 |
| /emsella | EmSELLA | Enhance Confidence Today — Arc Wellness | ✅ 200 |
| /exion | ExoMIND | Enhance Mental Wellness Today — Arc Wellness | ✅ 200 |
| /exomind | ExoMIND | Enhance Mental Wellness Today — Arc Wellness | ✅ 200 |
| /financing | Financing | Discover Financing Options Today — Arc Wellness | ✅ 200 |
| /knesko | ExoMIND | Enhance Mental Wellness Today — Arc Wellness | ✅ 200 |
| /new-page-2 | Overview — Arc Wellness | ✅ 200 |
| /plans | Arc Programs — Arc Wellness | ✅ 200 |
| /rha | ExoMIND | Enhance Mental Wellness Today — Arc Wellness | ✅ 200 |
| /supplements | Supplements — Arc Wellness | ✅ 200 |
| /supplements-1 | Supplements (Copy) — Arc Wellness | ✅ 200 |
| /vitamin-therapy | Vitamin Therapy | Revitalize Now — Book Your Vitamin Therapy | ✅ 200 |
| /wellness-therapies | Wellness Therapies Overview — Arc Wellness | ✅ 200 |

**Not found (404 on live site):** `/treatments`, `/programs`, `/peptide-therapy`, `/nutrient-therapy`, `/privacy`, `/terms`, `/book` — use mapped slugs above.

**Duplicate / legacy slugs:** `/home` → same as `/`; `/supplements-1` duplicates `/supplements`; footer **Our Services** → `/new-page-2` (not `/our-services`); **`/new-page-1`** → Peptide Therapy (rebuild: `/treatments/peptide-therapy`); ignore `/our-services` (duplicate discovery).

---

## About (/about)

**URL:** https://www.arcwellness.net/about  
**Title tag:** About | Explore Wellness Options – Take Action Today — Arc Wellness  
**Meta description:** Discover holistic health solutions at Arc Wellness, blending innovative technology with personalized care to enhance vitality, strength, and longevity.

### Headings

- H1: The Arc Toward Lifelong Vitality
- H2: Our Mission
- H4: Vitality, powered by science and care
- H2: Our Vision
- H4: Wellness that lasts a lifetime
- H2: The Values that Shape Arc Wellness
- H3: A Note From Our Founder

### Body copy

About | Explore Wellness Options – Take Action Today — Arc Wellness

The Arc Toward Lifelong Vitality

Every movement begins with a moment of clarity, a question that refuses to be ignored. Arc Wellness began as a question Dr. Jabbar couldn’t stop asking, “Why do so many people who follow medical advice still feel unwell?"

The answer, he realized, lay in patient’s willingness to heal, supported by guidance, care, and human connection.

Our Mission

Vitality, powered by science and care

Our goal is to bridge the gap between traditional medicine and transformative wellness, uniting medical expertise, modern innovation, and restorative therapies to deliver results that elevate your body, mind, and core.

Our Vision

Wellness that lasts a lifetime

We aim to build a connected Arc community where every member is physically well, emotionally resilient, and mentally thriving.

The Values that Shape Arc Wellness

Our values shape every choice we make, from how we listen to how we treat.

Prevention Over Reaction

We believe the best healthcare happens before you need it. By focusing on building resilience early, we help you build a body and mind capable of weathering the years ahead.

Integrity in Care

Before your wellness coach, we are medical professionals first. That means every treatment, recommendation, and result is rooted in medical ethics and evidence-based science. We value your trust more than any trend, which means we promise total transparency about what you need and what you don’t.

Innovation with Purpose

Technology is powerful, but only when it has a purpose. We don’t fill our clinic with gadgets just to look modern. We select specific, high-performance tools that solve real problems. Our goal is simple: use the best tech available to help you feel better and stronger.

Empowerment Through Knowledge

Medical wellness can be complex, but your understanding of it shouldn't be. We strip away the jargon and invite you into the conversation. Informed patients make confident decisions. Through education and open dialogue, we help our clients take ownership of their wellness journey.

Compassion in Action

We know that issues like chronic pain, weight management, or incontinence can feel vulnerable. That’s why we lead with empathy and understanding. From the first consultation to the last session, we help make every client feel seen, heard, and supported.

A Note From Our Founder

As a physician, I’ve dedicated my career to helping people manage their health, but I always knew there was more to offer than prescriptions and routine visits. Too often, I met patients living in quiet survival mode—physically depleted, mentally foggy, and disconnected from themselves. They weren’t simply unwell; they were experiencing a slow erosion of strength, vitality, and joy. That realization inspired Arc Wellness. A space designed to go beyond symptom relief and build lifelong resilience through science, technology, intention, and care. A place where people can see themselves not just as they are, but as they could become across every decade of their lives. At Arc, we take a physician-guided, whole-person approach to wellness focused on prevention, function, and longevity. Through treatments like Emsculpt Neo, Emsella, and ExoMind, alongside IV infusions, peptide therapy, and nutritional support, we help clients create sustainable change in how they live, think, and feel. Thank you for trusting us with your journey.

We’re honored to walk alongside you every step of the way. — Dr. Danish A. Jabbar

Founder & Medical Director, Arc Wellness

---

## Arc Aesthetics (/aesthetics)

**URL:** https://www.arcwellness.net/aesthetics  
**Title tag:** Arc Aesthetics — Arc Wellness  
**Meta description:** _(none)_

### Headings

- H2: Look Like You—Only Better
- H4: Subtle Enhancements. Noticeable Confidence.
- H2: ARC AESTHETICS
- H2: ARC AESTHETICS

### Body copy

Arc Aesthetics — Arc Wellness

Look Like You—Only Better

Subtle Enhancements. Noticeable Confidence.

Arc Aesthetics offers innovative solutions that enhance your features without compromising what makes you unique. Using advanced technologies and expert care, we focus on long-term skin health, subtle enhancements, and real, visible results.

START WITH A FREE CONSULTATION

Neuromodulator

Treatment

Price

$12 / unit

RHA Filler

Syringes

Price per syringe

1 Syringe

$375

2 Syringes

$350 each

3 Syringes

$325 each

4 Syringes

$315 each

Structural Lift Programs

Program

Includes

Investment

Foundational Lift

4 EmFace

4 Exion

Knesko Mask each session

$2,499

Signature Lift

8 EmFace

8 Exion

3 RF Microneedling

Knesko Mask each session

$5,999

Standalone Treatments

Treatment

Price

EmFace Full Face $699

EmFace Single Area $249

Exion Full Face $329

Exion Single Area $99

TMJ Protocol $899

RF Microneedling — Exion Clear + Fractional

Package

Investment

Single $299

3 Pack $799

4 Pack $999

5 Pack $1,299

Arc Radiance Collection — Genesis Z Red Light Therapy

Package

Investment

Single $99

3 Pack $379

6 Pack $549

BOOK YOUR FREE CONUSLTATION

---

## Contact (/contact)

**URL:** https://www.arcwellness.net/contact  
**Title tag:** Contact | Get Wellness Guidance Now — Arc Wellness  
**Meta description:** Contact Arc Wellness for personalized health solutions, consultations, and innovative therapies in St. Louis. Get in touch today to start your wellness journey.

### Headings

- H2: We’re Here When You’re Ready!
- H2: Reach Out Your Way
- H4: Contact Details
- H1: Reach Out. We’ll Listen.
- H2: Every journey finds its curve.
- H2: We’re honored to walk alongside yours!

### Body copy

Contact | Get Wellness Guidance Now — Arc Wellness

We’re Here When You’re Ready!

Finding support shouldn’t feel like another hurdle.

At Arc Wellness, we believe the first step toward healing begins with connection—a message, a call, a quiet moment of reaching out. However you choose to begin, we’re here to listen with care, respect, and understanding.

Reach Out Your Way

You can contact us in the way that feels most comfortable to you—by phone, by email, or by visiting our space in person. Our team responds with care so that every interaction feels human and grounded.

Phone

---

## Daxxify (/daxxify)

**URL:** https://www.arcwellness.net/daxxify  
**Title tag:** ExoMIND | Enhance Mental Wellness Today — Arc Wellness  
**Meta description:** ExoMIND offers FDA-cleared, non-invasive brain wellness therapy to improve mood, focus, and mental resilience. Safe and effective mental health support without medication.

### Headings

- H1: DAXXIFY®
- H2: Key Benefits
- H2: Target Treatment Areas
- H2: What to Expect During Treatment

### Body copy

ExoMIND | Enhance Mental Wellness Today — Arc Wellness

DAXXIFY®

DAXXIFY® (daxibotulinumtoxinA-lanm) is a premium, long-lasting injectable treatment designed to temporarily smooth moderate to severe frown lines. It’s FDA-approved neuromodulator formulated with a proprietary peptide.

BOOK YOUR DAXXIFY CONSULTATION

Key Benefits

Long-Lasting Results: Results last an average of 6 months, with some patients maintaining smooth skin for up to 9 months.

Faster Onset: Many patients see visible improvements within just 1–2 days, compared to the typical 3–7 days for other neurotoxins.

Fewer Appointments: Because it lasts nearly twice as long as traditional options, most patients only need two treatments per year.

Natural-Looking Refresh: It provides a refreshed, youthful appearance while allowing you to maintain natural facial expressions.

Target Treatment Areas

While primarily FDA-approved for glabellar lines (the "11s" between the eyebrows), providers also use it for: Horizontal forehead lines

Crow’s feet around the eyes

Bunny lines (nose wrinkles)

Lip flips and chin dimpling

Masseters (jaw slimming or teeth grinding)

What to Expect During Treatment

Quick Procedure: A typical session takes only 15–30 minutes, making it easy to fit into a lunch break.

Minimal Discomfort: Injections are performed with a very fine needle. Your provider may use ice or numbing cream to ensure comfort.

No Downtime: You can return to your normal daily activities immediately after your appointment.

Treatment

Price

$12 / unit

---

## EmFace (/emface)

**URL:** https://www.arcwellness.net/emface  
**Title tag:** ExoMIND | Enhance Mental Wellness Today — Arc Wellness  
**Meta description:** ExoMIND offers FDA-cleared, non-invasive brain wellness therapy to improve mood, focus, and mental resilience. Safe and effective mental health support without medication.

### Headings

- H2: EMFACE
- H3: The Needle-Free Revolution in Facial Rejuvenation
- H2: How It Works?
- H2: Key Benefits
- H2: Treatment Areas
- H2: Is EMFACE Right for You??

### Body copy

ExoMIND | Enhance Mental Wellness Today — Arc Wellness

The Needle-Free Revolution in Facial Rejuvenation

EMFACE is the first and only non-invasive procedure that simultaneously treats facial skin and muscles to lift, tone, and reduce wrinkles—all without needles or downtime.

BOOK YOUR EMFACE CONSULTATION

How It Works?

EMFACE® combines two powerful technologies in a single 20-minute session: Synchronized Radiofrequency (RF): Gently heats the dermal layers to stimulate the production of collagen and elastin, resulting in firmer, smoother skin.

HIFES™ Technology: Delivers thousands of high-intensity electrical pulses to selectively contract and tone facial muscles, creating a natural lifting effect from within.

Key Benefits

Natural Lift: Average of 23% more lift in targeted areas.

Wrinkle Reduction: Up to 37% reduction in fine lines and wrinkles.

Improved Muscle Tone: Approximately 30% increase in resting muscle tone.

No Needle & No Pain: A comfortable experience often compared to a warm facial massage or a workout for your face.

Zero Downtime: Return to your daily activities immediately after your "lunchtime lift".

Treatment Areas

EMFACE® is versatile and can target multiple concerns: Forehead: Lifts the brows and smooths forehead lines.

Cheeks: Volumizes and scuplts for better definition.

Jawline & Jowls: Tightens and defines the lower face.

Submentum (Under Chin): Specifically addresses double chin concerns with dedicated applicators.

Is EMFACE Right for You??

EMFACE® is suitable for almost anyone seeking a non-surgical alternative to a facelift or looking for a preventative anti-aging strategy. It is especially popular for those who: Want to avoid needles and surgery.

Seek natural-looking results without a "frozen" or overdone look.

Have a busy lifestyle and cannot afford recovery time.

BOOK YOUR EMFACE CONSULTATION

---

## EmSculpt Neo (/emsculpt-neo)

**URL:** https://www.arcwellness.net/emsculpt-neo  
**Title tag:** EmSCULPT NEO | Transform Your Body Today — Book Now — Arc Wellness  
**Meta description:** Discover EmSculpt NEO at Arc Wellness: a non-invasive fat reduction and muscle building treatment with no downtime, delivering visible results in just 30 minutes.

### Headings

- H2: Restore Your Body to Its Natural Form
- H2: Who Can Benefit?
- H2: More Than Body Contouring
- H2: People wanting to enhance body tone and definition
- H2: Active individuals looking to break fitness plateaus
- H2: Those seeking a non-surgical body contouring solution
- H2: Postpartum recovery (core re-strengthening)
- H3: Move through life with confidence with stronger, more resilient muscles.
- H1: FAQs
- H4: What is EmSculpt Neo?
- H4: Who is EmSculpt Neo for?
- H4: What does a session feel like?
- H4: How long does each session take?
- H4: How many sessions will I need?
- H4: Is there any downtime or recovery?
- H4: When will I see results?
- H4: How long do the results last?
- H4: Is EmSculpt Neo safe?
- H4: How does EmSculpt Neo compare to traditional exercise?
- H4: Who should avoid EmSculpt Neo?
- H4: Is EmSculpt Neo covered by insurance?

### Body copy

EmSCULPT NEO | Transform Your Body Today — Book Now — Arc Wellness

Restore Your Body to Its Natural Form

Emsculpt Neo is an advanced non-invasive treatment that combines two technologies to simultaneously reduce fat and build muscle.

SCHEDULE YOUR FREE CONSULTATION

HIFEM Technology

Delivers powerful, supramaximal muscle contractions to strengthen and tone targeted muscles.

Radiofrequency Heating

Gently heats fat cells, helping the body eliminate them permanently while supporting muscle definition.

Targeted Areas for Transformation

Abdomen, Buttocks, Thighs, Arms, Calves, Pelvic floor

Who Can Benefit?

EmSculpt Neo is for anyone looking for stronger muscles and a more sculpted physique. No Pain. No Sweat. No downtime.

More Than Body Contouring

EmSculpt Neo strengthens key muscles to improve functional movement and support everyday activities. It also targets muscles that stabilize the joints and spine, helping reduce discomfort from weakness or imbalance. This strategic approach enhances physical strength while providing therapeutic support for functional pain management.

People wanting to enhance body tone and definition

Active individuals looking to break fitness plateaus

Those seeking a non-surgical body contouring solution

Postpartum recovery (core re-strengthening)

Move through life with confidence with stronger, more resilient muscles.

Start your personalized journey.

Schedule Free Consultation

FAQs

What is EmSculpt Neo?

EmSculpt Neo is the first and only non-invasive treatment that combines radiofrequency (RF) heating and high-intensity focused electromagnetic (HIFEM) energy. This dual action helps reduce fat and build muscle at the same time.

Who is EmSculpt Neo for?

It is ideal for adults who:

Want to reduce stubborn fat that doesn’t respond to diet and exercise.

Want to tone, strengthen, and define their muscles.

Prefer a non-surgical alternative to body contouring. It can be used on the abdomen, buttocks, arms, thighs, and calves.

What does a session feel like?

You’ll feel a gentle warming sensation (from RF) and powerful muscle contractions (from HIFEM). Most patients compare it to an intense workout combined with a warm massage.

How long does each session take?

Each treatment lasts about 30 minutes . Most people schedule sessions during lunch breaks and go right back to daily life.

How many sessions will I need?

Most patients benefit from a series of 4 sessions , scheduled once a week. Your provider may recommend additional treatments depending on your goals.

Is there any downtime or recovery?

No downtime. You can return to work, exercise, or daily activities immediately after your session.

When will I see results?

Some patients begin noticing improvements within a few weeks . Optimal results usually appear 2–3 months after completing the full treatment plan as the body continues burning fat and building muscle.

How long do the results last?

Results last for many months, especially if you maintain a healthy lifestyle. Periodic maintenance sessions can help extend and enhance results.

Is EmSculpt Neo safe?

Yes. EmSculpt Neo is FDA-cleared, non-invasive, and has been studied in multiple clinical trials showing both fat reduction and muscle growth.

How does EmSculpt Neo compare to traditional exercise?

One 30-minute EmSculpt Neo session is equivalent to doing 20,000 crunches or squats , while also delivering targeted fat reduction—something no workout can do alone.

Who should avoid EmSculpt Neo?

It may not be suitable if you have a pacemaker, metal implants in the treatment area, or certain medical conditions. A consultation at Arc Wellness will confirm if you’re a good candidate.

Is EmSculpt Neo covered by insurance?

EmSculpt Neo is considered an elective body-contouring treatment, so it is not covered by insurance . Arc Wellness offers treatment packages and financing options.

---

## EmSella (/emsella)

**URL:** https://www.arcwellness.net/emsella  
**Title tag:** EmSELLA | Enhance Confidence Today — Arc Wellness  
**Meta description:** Discover non-invasive treatments for incontinence, pelvic health, and sexual wellness at EmSELLA. Improve quality of life with safe, effective options.

### Headings

- H2: Realign Your Core to Its Natural Strength
- H3: Who Can Benefit?
- H3: The Difference You’ll Notice, Every Day
- H3: Not only for general wellness, it’s a trusted solution for postpartum and post-prostate recovery too.
- H2: Stories of Real Change
- H2: Feel the difference yourself.
- H1: FAQs
- H4: What is Emsella?
- H4: Who is Emsella for?
- H4: What does a treatment session feel like?
- H4: How long does each session take?
- H4: How many sessions will I need?
- H4: Is there any downtime or recovery?
- H4: When will I see results?
- H4: How long do the results last?
- H4: Is Emsella safe?
- H4: Can I use Emsella if I have a medical condition?
- H4: How does Emsella compare to doing Kegels at home?
- H4: Will insurance cover Emsella?

### Body copy

EmSELLA | Enhance Confidence Today — Arc Wellness

Realign Your Core to Its Natural Strength

Emsella is an advanced, non-invasive treatment that uses High Intensity Focused Electromagnetic Energy (HIFEM) to strengthen the pelvic floor muscles, all while you remain fully clothed.

SCHEDULE YOUR FREE CONSULTATION

Who Can Benefit?

Emsella is ideal for anyone seeking better bladder control, sexual wellness, and core stability without surgery or recovery time.

The Difference You’ll Notice, Every Day

Reduced bladder leaks, urgency, and frequency

Enhanced posture and abdominal control

Stronger pelvic floor and improved core stability

Improved sexual wellness and sensation

Not only for general wellness, it’s a trusted solution for postpartum and post-prostate recovery too.

Stories of Real Change

“ I no longer worry about sudden leaks during the day ”

“ I finally feel strong in my core again—without doing endless Kegels. ”

“ The sessions were quick, painless, and actually kind of relaxing. ”

“ It’s helped me feel like myself again—strong, feminine, and free ”

Feel the difference yourself.

SCHEDULE YOUR FREE CONSULTATION

FAQs

What is Emsella?

Emsella is a non-invasive treatment that uses high-intensity focused electromagnetic (HIFEM) technology to stimulate pelvic floor muscles. Each session delivers thousands of powerful contractions—similar to doing Kegel exercises—helping strengthen the muscles that support bladder control, sexual health, and core stability.

Who is Emsella for?

Emsella is designed for:

Women and men who experience urinary incontinence (leakage when coughing, sneezing, laughing, or exercising).

Postpartum women who want to restore pelvic strength.

Adults looking to improve sexual health, confidence, and core stability.

What does a treatment session feel like?

During your session, you’ll sit comfortably in the Emsella chair, fully clothed. You’ll feel strong but painless muscle contractions along with a mild tingling sensation. Most patients describe it as unusual at first but very tolerable.

How long does each session take?

Each session lasts about 30 minutes . Most patients complete treatment during their lunch break and return to daily activities immediately afterward.

How many sessions will I need?

A typical treatment plan includes 6 sessions, scheduled twice a week . Your provider will tailor the plan based on your needs and goals.

Is there any downtime or recovery?

No. Emsella is completely non-invasive, requires no surgery, and has no downtime. You can return to work, exercise, and daily life right after treatment.

When will I see results?

Some patients notice improvement after just one session , but most experience significant results after completing the full treatment series. Results continue to improve over the following weeks as muscles strengthen.

How long do the results last?

Results vary, but many patients enjoy improvements for 6–12 months . Maintenance sessions every few months help sustain results long-term.

Is Emsella safe?

Yes. Emsella is FDA-cleared, non-invasive, and backed by scientific studies. It is safe and effective for both women and men.

Can I use Emsella if I have a medical condition?

Emsella is safe for most patients. However, it may not be suitable if you have a pacemaker, metal implants in the pelvic area, or are pregnant. A consultation with our team will determine if you are a candidate.

How does Emsella compare to doing Kegels at home?

While Kegel exercises can be beneficial, most people struggle to engage the pelvic floor correctly. Emsella delivers the equivalent of 11,000 perfect Kegels in a single session , offering faster and more reliable results.

Will insurance cover Emsella?

Emsella is considered a wellness and elective treatment, so it is not covered by insurance . Arc Wellness offers package options and financing solutions to make treatment more accessible.

---

## Exion (/exion)

**URL:** https://www.arcwellness.net/exion  
**Title tag:** ExoMIND | Enhance Mental Wellness Today — Arc Wellness  
**Meta description:** ExoMIND offers FDA-cleared, non-invasive brain wellness therapy to improve mood, focus, and mental resilience. Safe and effective mental health support without medication.

### Headings

- H2: EXION
- H3: The Ultimate Skin Rejuvenation
- H2: Key Benefits &amp; Proven Results
- H2: Key Treatment Options
- H2: Who Benefits Most from EXION?

### Body copy

ExoMIND | Enhance Mental Wellness Today — Arc Wellness

The Ultimate Skin Rejuvenation

EXION is an advanced skin rejuvenation treatment designed to improve skin quality, elasticity, and overall appearance with little to no downtime. By combining targeted radiofrequency (RF) with ultrasound technology, Exion stimulates your body’s natural production of collagen, elastin, and hyaluronic acid, helping your skin look healthier, smoother, and more youthful over time.

BOOK YOUR EXION CONSULTATION

Key Benefits & Proven Results

Natural Hyaluronic Acid Boost: Increases skin HA levels by up to 224% without needles or fillers, leading to deep hydration and a "plumper" look.

Skin Quality Improvement: Boosts collagen by 47% and elastin by 50%, effectively smoothing fine lines, wrinkles, and acne scars.

Key Treatment Options

Exion Fractional RF (Microneedling): Uses AI to deliver energy deep into the skin with a single pass. It targets acne scars, deep wrinkles, and stretch marks with less pain than standard microneedling.

Exion Face: A completely needle-free treatment designed for delicate areas like the eyes and forehead. It plumps and hydrates the skin by naturally increasing hyaluronic acid.

Exion Clear RF: A specialized treatment for skin perfection, helping to clear active acne and improve skin clarity without harsh medications.

Who Benefits Most from EXION?

EXION is ideal for anyone looking to improve skin quality without the downtime of surgery or the "filler look." It is perfect for those who: Want to reverse signs of aging like wrinkles and sagging skin.

Suffer from dry or dull skin and want a natural hydration boost.

Are looking to diminish acne scars.

Prefer a needle-free or "comfortable microneedling" experience.

BOOK YOUR EXION CONSULTATION

---

## ExoMind (/exomind)

**URL:** https://www.arcwellness.net/exomind  
**Title tag:** ExoMIND | Enhance Mental Wellness Today — Arc Wellness  
**Meta description:** ExoMIND offers FDA-cleared, non-invasive brain wellness therapy to improve mood, focus, and mental resilience. Safe and effective mental health support without medication.

### Headings

- H1: ExoMind
- H2: Reconnect Your Mind to Its Natural Harmony
- H2: Who Can Benefit?
- H2: What You’ll Feel and See
- H2: ExoMind Supports ADHD , OCD , and depression symptoms too!
- H2: Beyond
- H2: Everyday
- H2: Benefits
- H2: Calm Your Cravings, Ease Your Pain
- H2: Honest Stories From Our Clients
- H2: FAQs
- H4: What is EXOMIND therapy?
- H4: How does it work?
- H4: What are the benefits of EXOMIND?
- H4: Is EXOMIND right for me?
- H4: How many sessions are required?
- H4: What does the therapy feel like?
- H4: Does it hurt?
- H4: Will it disrupt my daily life?
- H4: What are the risks?
- H4: What to do if the patient experiences discomfort during the therapy?
- H4: How long will the results last?
- H4: Are there any alternative treatments?
- H4: What do patients have to say about EXOMIND?

### Body copy

ExoMIND | Enhance Mental Wellness Today — Arc Wellness

Reconnect Your Mind to Its Natural Harmony

ExoMind is an advanced neuromodulation treatment designed to gently recalibrate how the brain communicates with itself. Using precise Transcranial Magnetic Stimulation (TMS), it delivers measured magnetic pulses that activate key neural pathways and support healthier brain function.

BOOK YOUR EXOMIND CONSULTATION

Who Can Benefit?

ExoMind is for anyone seeking mental clarity, emotional balance, or cognitive renewal without relying on medications or invasive procedures.

What You’ll Feel and See

Relief from stress, anxiety, or emotional imbalance

Improved focus, memory, and productivity

Restored energy and mental clarity

ExoMind Supports ADHD , OCD , and depression symptoms too!

Beyond

Everyday

Benefits

Calm Your Cravings, Ease Your Pain

ExoMind’s influence extends beyond mood. By gently stimulating areas of the brain linked to reward, mood, and decision-making, it helps reduce the neurological “noise” that often drives cravings or emotional eating.

The same gentle recalibration that helps quiet cravings also supports how the brain perceives and manages pain. By retraining the pain-related circuits, ExoMind allows the nervous system to relax, helping you experience both mental calm and physical relief.

Honest Stories From Our Clients

Sharper focus and concentration

Improved mood and emotional balance

Better sleep and lower anxiety

Mental energy without side effects

Give your mind the calm it’s been seeking for so long.

BOOK YOUR CONSULTATION TODAY

FAQs

What is EXOMIND therapy?

EXOMIND is a ground-breaking mental wellness therapy that marks a new era in patient care. It is a noninvasive, drug-free walk-in walk-out procedure designed to treat symptoms of depression, helping patients regain control and improve their quality of life.

How does it work?

FDA-cleared for the treatment of depression, EXOMIND's patented ExoTMSTM technology comfortably stimulates key areas of the brain involved in emotional regulation, cognitive function, and self-control. By activating neural pathways, it helps restore healthy brain activity and enhances neural connectivity.

What are the benefits of EXOMIND?

rTMS is a noninvasive treatment and is free from common antidepressant drug side effects such as weight gain and sexual dysfunction.

Is EXOMIND right for me?

EXOMIND is designed for individuals experiencing depression. Consult with your healthcare provider to determine if EXOMIND is the right option for your mental wellness journey.

How many sessions are required?

A course of rTMS traditionally requires multiple treatments. Patients should discuss the number of treatments and treatment schedule with their physicians. rTMS treatment effects in reducing depression are temporary, and patients may need to continue other forms of depression therapy.

What does the therapy feel like?

During EXOMIND therapy, you will lie down comfortably while the applicator is placed on your head. As the treatment begins, you may feel a tapping or tingling sensation in the treated area, often described by patients as similar to a head massage. After the session, you can resume normal activities immediately. In some cases, a slight headache may occur in the treated area, but it typically subsides within minutes.

Does it hurt?

Most patients find the therapy comfortable. Sessions are quick, lasting under 30 minutes, and allow you to walk in and walk out with ease.

Will it disrupt my daily life?

EXOMIND seamlessly integrates into your daily routine with minimal disruption.

What are the risks?

Therapy by rTMS is generally well tolerated. Nevertheless it may, for some, cause headache, scalp pain, seizure and hypomania. As with any medical procedure, there are some risks associated with EXOMIND therapy. Please discuss risks and contraindications with your healthcare practitioner before beginning treatment.

What to do if the patient experiences discomfort during the therapy?

If the patient experiences discomfort, such as finger twitching, pause the therapy and move the applicator anteriorly or posteriorly in 0.2 in (0.5 cm) increments, up to a maximum of 0.6 in (1.5 cm) from the starting position. If repositioning the coil does not alleviate the discomfort, consider decreasing the therapy intensity.

How long will the results last?

Although the durability of rTMS therapy in the treatment of depression has been suggested in several clinical reports for up to 12 months, MDD patients need to be monitored post treatment and may need to continue or resume antidepressant medications.

Are there any alternative treatments?

Alternative treatments such as medications, psychotherapy, and electroconvulsive therapy are available. Consult with your physician what best fits your condition.

What do patients have to say about EXOMIND?

“I am just overall happier. That's what I noticed... I honestly do believe that EXOMIND has changed my life.” -Katherine, Actual Exomind Patient, Phoenix, AZ

“I almost felt it immediately. It was just this little extra boost feeling and as the days went on, it didn't feel so hard to get out of bed and it didn't feel so hard to shower and things just felt easier. It was almost like a lightness, like a weight had been taken off of me.” - Ella, Actual Exomind Patient, Winter Garden, FL

“I think that I was more equipped to handle some of the stress that was coming at me, and I didn't react to it as I had been.” -Chase, Actual Exomind Patient, Denver, CO

“I really felt it with each treatment. I felt it getting better, and better, and my happiness, my joy, everything came back.” -Jennifer, Actual Exomind Patient, Phoenix, AZ

---

## Financing (/financing)

**URL:** https://www.arcwellness.net/financing  
**Title tag:** Financing | Discover Financing Options Today — Arc Wellness  
**Meta description:** Explore flexible financing options for wellness treatments at Arc Wellness. Contact us for support with your payment plan and treatment investments.

### Headings

_(none extracted)_

### Body copy

Financing | Discover Financing Options Today — Arc Wellness

---

## Knesko (/knesko)

**URL:** https://www.arcwellness.net/knesko  
**Title tag:** ExoMIND | Enhance Mental Wellness Today — Arc Wellness  
**Meta description:** ExoMIND offers FDA-cleared, non-invasive brain wellness therapy to improve mood, focus, and mental resilience. Safe and effective mental health support without medication.

### Headings

- H2: Knesko Collagen Masks
- H3: Elevate your skin and spirit with&nbsp; KNESKO Skin !
- H2: The KNESKO Difference
- H2: Our KNESKO Collection
- H2: Specialized Masks for Every Area
- H2: How to Use the Ritual

### Body copy

ExoMIND | Enhance Mental Wellness Today — Arc Wellness

Knesko Collagen Masks

Elevate your skin and spirit with KNESKO Skin !

Knesko Skin bridges the gap between clinical science and ancient healing through luxurious, gemstone-infused collagen masks. Founded by celebrity esthetician and Reiki Master Lejla Cas, the brand transforms skincare into a high-vibrational ritual that treats the skin, mind, and spirit simultaneously.

BOOK APPOINTMENT

The KNESKO Difference

GEMCLINICAL® Technology: This proprietary system uses precious gemstones to stabilize active ingredients and improve their delivery deep into the skin.

Collagen Hydrogel Material: Unlike standard paper masks, KNESKO uses a "second skin" hydrogel with a triple-helix structure that holds up to 10x more nutrients than traditional sheet masks.

Reiki-Charged Rituals: Every mask is personally charged with healing Reiki energy by the founder to promote a state of total relaxation and well-being.

Clean Beauty: Formulas are non-toxic, paraben-free, cruelty-free, and biodegradable.

Our KNESKO Collection

We utilize these four specialized formulas during your session to hydrate, calm, and elevate your final glow: Green Jade Calm: soothes inflammation and reduces redness

Diamond Radiance: brightens and boosts luminosity

Rose Quartz Antioxidant: protects against environmental stress and supports skin repair

Nano Gold Repair: promotes healing and revitalises tired, ageing skin

Specialized Masks for Every Area

KNESKO treatments are designed to target more than just the face. Each collection typically includes: Face Masks: Full-face treatments for complete rejuvenation.

Eye Masks: Specifically contoured for the delicate under-eye area to reduce puffiness and dark circles.

Neck & Décolleté Masks: Targeted treatments to firm and brighten the often-neglected chest and neck areas.

Lip Masks: Infused with collagen and gemstones to plump and hydrate.

How to Use the Ritual

Prep: Cleanse skin thoroughly.

Apply: Place the mask on the skin and leave for 15–30 minutes. For face masks, apply the top half first, then the bottom.

Mindfulness: Each mask comes with a specific mantra (e.g., "I am Loved" for Rose Quartz) to recite while masking.

Finish: Remove the mask and massage the remaining serum into the skin, neck, and arms—never wash it off.

Experience the ultimate fusion of clean beauty and spiritual wellness during your next visit.

BOOK APPOINTMENT

---

## Our Services (/new-page-2)

**URL:** https://www.arcwellness.net/new-page-2  
**Title tag:** Overview — Arc Wellness  
**Meta description:** _(none)_

### Headings

- H4: Restoration Begins Here
- H1: Tech-Driven Body Treatments
- H2: ExoMind
- H2: EmSella
- H2: EmSculpt Neo
- H1: Foundational Therapies
- H2: Nutrient
- H2: Peptide
- H1: Wellness Essentials
- H2: Supplements

### Body copy

Overview — Arc Wellness

Restoration Begins Here

Discover a range of science-backed treatments designed to elevate your health, enhance your body, and restore your mind—all under one roof.

Tech-Driven Body Treatments

Restore balance, strength, and clarity through our FDA-cleared, non-invasive treatments designed to help you function at your best.

Each treatment works with your body to create measurable change you can see and feel.

Calm the mind, sharpen focus, and bring mental clarity back into rhythm through advanced neurostimulation.

EXPLORE EXOMIND

Strengthen your foundation with a comfortable, chair-based therapy that restores pelvic health and core stability.

LEARN MORE ABOUT EMSELLA

Tone muscle, reduce fat, and rebuild confidence with powerful, non-invasive body contouring technology.

SEE EMSCULPT RESULTS

Foundational Therapies

Support your body’s natural healing processes through targeted therapies that replenish, repair, and restore vitality at the cellular level.

Nutrient

Rehydrate, refuel, and recover faster with customized infusions that nourish your body where it matters most.

Explore Nutrition Therapy

Peptide

Encourage regeneration and balance with therapeutic peptides that enhance metabolism, repair, and longevity.

Learn More About Peptide

Wellness Essentials

Everyday essentials, carefully chosen by our physicians to support lasting energy, a strong immune system, and emotional balance.

Browse Supplements

---

## Arc Programs (Plans) (/plans)

**URL:** https://www.arcwellness.net/plans  
**Title tag:** Arc Programs — Arc Wellness  
**Meta description:** _(none)_

### Headings

- H2: Signature Programs &amp; Membership
- H4: More Than Treatments—A Strategy for Results
- H2: A systematic approach to building strength, balance, and control.
- H2: THE ARC METHOD™
- H2: When your system is overwhelmed, this is where recovery begins.
- H2: ARC RESET PROTOCOL
- H2: Precision-guided weight loss, backed by medical expertise.
- H2: MEDICAL WEIGHT OPTIMIZATION
- H2: Understand your body today. Optimize your health for tomorrow.
- H2: ARC 360™ — Physician-Led Longevity Blueprint
- H2: Clinically selected supplements, built around your goals.
- H2: Supplements & Protocols
- H2: Membership Plans
- H3: The easiest way to make results part of your routine.
- H2: ARC MEMBERSHIPS

### Body copy

Arc Programs — Arc Wellness

Signature Programs & Membership

More Than Treatments—A Strategy for Results

Why settle for one treatment when the right combination can do more? Our programs are designed to enhance results by targeting your concerns from multiple angles, helping you achieve visible, lasting improvements faster.

START WITH A FREE CONSULTATION

A systematic approach to building strength, balance, and control.

THE ARC METHOD™

Where science meets structured transformation

Device

Sessions

Frequency

⭐ Foundation Protocol | 1x/week — $1,610

1x / week

Neo

1x / week

1x / week

Total Sessions: 12 | Investment: $1,610

⭐⭐ Acceleration Protocol | 2x/week — $3,520

2x / week

Neo

2x / week

2x / week

Total Sessions: 24 | Investment: $3,520

⭐⭐⭐ Optimization Protocol | 2x/week — $4,990

2x / week

Neo

2x / week

2x / week

Total Sessions: 36 | Investment: $4,990

Single Session — $249 per session

BOOK YOUR FREE CONUSLTATION

When your system is overwhelmed, this is where recovery begins.

ARC RESET PROTOCOL

Nervous System Recovery · Cognitive Resilience · Performance Rebuild

Medical professionals · First responders · Veterans · Social workers

Tier

Includes

Duration

Investment

💎 RESET

8 ExoMind (2x/wk)

6 EmSella (1x/wk)

Weekly B12 x4

Nutritional Coaching

1 Infusion Bundle

1 Supplement Bundle

Burnout Recovery / Entry Point

4 weeks

$1,950

💎💎 REBUILD

10 ExoMind (2x/wk)

8 EmSella (2x/wk)

Weekly B12 x5

2 Infusion Bundles

Nutritional Coaching

2 Supplement Bundles

Nervous System Recalibration

5–6 weeks

$2,650

💎💎💎 RESILIENCE

12 ExoMind (2x/wk)

10 EmSella (2x/wk)

Weekly B12 x6

4 Infusion Bundles

Nutritional Coaching

3 Supplement Bundles

Peak Performance + Longevity

6–8 weeks

$3,450

BOOK YOUR FREE CONUSLTATION

Precision-guided weight loss, backed by medical expertise.

MEDICAL WEIGHT OPTIMIZATION

Physician-supervised · Personalized dosing · Monthly monitoring

The Slim Situation

The Great Shrink

Mission: Lean Possible

0.5 mg

$99

2.5 mg

$149

4 mg

$299

1 mg

$199

5 mg

$249

8 mg

$499

2 mg

$299

7.5 mg

$349

12 mg

$699

BOOK YOUR FREE CONUSLTATION

Understand your body today. Optimize your health for tomorrow.

ARC 360™ — Physician-Led Longevity Blueprint

MD-led · 5-domain risk scoring · 90-day optimization plan · Longevity modeling

CORE

$2,295

90 Minute Discovery Visit

Lab Zoomer Bundle

Blueprint Review Visit

5 Domain Risk Scoring

10–15 Year Modeling

90 Day Plan

ADVANCED

$3,295

Everything in Core

Methylation Zoomer

Cellular Zoomer

Hormone & Metabolic Analysis

Cardiometabolic Review

Infusion Bundle

10% Discount

ELITE

$4,995

Everything in Advanced

ApoE / MTHFR / Factor II-V

Cardio Zoomer

2 Infusion Bundles

Energy Therapy Session

20% Discount

BOOK YOUR FREE CONUSLTATION

Clinically selected supplements, built around your goals.

Supplements & Protocols

Brain Health

CogNova $37.95

Adrenal Balance $49.95

Kinetiq $29.95

Complete Protocol $99

Foundation

Mag Sync $24.95

Omega Complete $34.95

D3 + K2 $24.95

Neuro Fuel $24.95

Super C $24.95

Complete Protocol $119

Gut Reset

Gut Guru $64.99

Mito Prime $32.95

Cytogenix $37.95

FloraVia / FloraMax $39.95

Complete Protocol $149

Women’s Longevity

Harmony $32.95

Adrenal Balance $49.95

UT Guard $34.95

Complete Protocol $99

Additional Support

Berberine $44.95

Cardio Protect $42.95

Breathe Easy+ $42.95

Melatonin $15.59

BOOK YOUR FREE CONUSLTATION

Membership Plans

The easiest way to make results part of your routine.

ARC MEMBERSHIPS

Consistency is the advantage

RADIANCE

$99 / month

✔ 100% Bankable funds

Plus:

1 Monthly MICC Injection

5% Off Supplements

ELEVATE

$149 / month

✔ 100% Bankable funds

Plus:

1 Monthly MICC Injection

1 Monthly Glutathione Injection

10% Off Supplements

PREMIER

$249 / month

✔ 100% Bankable funds

Plus:

1 Monthly MICC Injection

1 Monthly Glutathione Injection

1 Monthly Vitamin D3 Injection

15% Off Supplements

BOOK YOUR FREE CONUSLTATION

---

## RHA (/rha)

**URL:** https://www.arcwellness.net/rha  
**Title tag:** ExoMIND | Enhance Mental Wellness Today — Arc Wellness  
**Meta description:** ExoMIND offers FDA-cleared, non-invasive brain wellness therapy to improve mood, focus, and mental resilience. Safe and effective mental health support without medication.

### Headings

- H1: RHA®
- H3: Experience the next generation of dermal fillers
- H2: Why Choose RHA®?
- H2: Meet the Collection
- H2: What to Expect
- H2: Are You a Candidate?
- H3: Ready to see the RHA® difference?

### Body copy

ExoMIND | Enhance Mental Wellness Today — Arc Wellness

RHA®

Experience the next generation of dermal fillers

The RHA® (Resilient Hyaluronic Acid) Collection is the first and only FDA-approved line of fillers specifically designed to treat dynamic wrinkles and folds.

BOOK YOUR RHA CONSULTATION

Why Choose RHA®?

Traditional fillers can sometimes look stiff or "overdone" when you smile or talk. RHA® is different: Designed for Movement: Formulated to adapt to your facial expressions, ensuring a natural look whether your face is at rest or in motion.

Cleaner Formula: Uses a gentle manufacturing process that preserves the natural structure of Hyaluronic Acid, making it more similar to the HA already found in your skin.

Impressive Longevity: Clinically proven to deliver beautiful, natural-looking results that last up to 15 months.

Meet the Collection

We offer a range of formulations tailored to your specific aesthetic goals: RHA Redensit Mepi: A weightless filler for the most delicate areas, perfect for smoothing fine "smoker’s lines" around the mouth.

RHA 2 Mepi: Best for moderate dynamic wrinkles, such as those around the lips and forehead.

RHA 3 Mepi: Designed for moderate-to-severe folds, including nasolabial folds (smile lines) and marionette lines.

RHA 4 Mepi: Provides deep support and volume for the cheeks, jawline, and severe facial folds.

What to Expect

The Procedure: A quick, in-office treatment typically lasting 30–45 minutes.

Comfort: Each formulation contains a small amount of lidocaine (a local anesthetic) to ensure a comfortable experience.

Recovery: Most patients return to their daily activities immediately. Some mild swelling or bruising may occur but usually subsides within a few days.

Are You a Candidate?

RHA® is ideal for anyone seeking subtle, refreshed results without sacrificing their natural expressions. It is safe for all skin types and adults over 21.

Ready to see the RHA® difference?

Syringes

Price

1 Syringe

$375

2 Syringes

$350 each

3 Syringes

$325 each

4 Syringes

$315 each

Book Your Appointment Today

---

## Supplements (/supplements)

**URL:** https://www.arcwellness.net/supplements  
**Title tag:** Supplements — Arc Wellness  
**Meta description:** _(none)_

### Headings

- H2: Your Daily Reset for Everyday Vitality
- H2: Who Benefits Most from Supplement Support?
- H2: Core Supplement Offerings
- H4: Foundation Supplement Protocol
- H4: Gut Reset Supplement Protocol
- H4: Additional Support
- H4: Women’s Longevity Supplement Protocol
- H4: Brain Heath Supplement Protocol
- H1: FAQs
- H4: Do I need to take all five supplements, or can I start with just one?
- H4: How long does it take to notice benefits from supplements?
- H4: Can I use these supplements if I’m not receiving IV therapy or peptide treatments?
- H4: How do I know which supplements are right for me?

### Body copy

Supplements — Arc Wellness

Your Daily Reset for Everyday Vitality

Supplements can be powerful, but only when they’re chosen carefully, dosed correctly, and aligned with the body’s real needs.

At Arc Wellness, supplements are not treated as generic add-ons or retail products. They are used as supportive tools within a broader, physician-guided wellness plan, designed to reinforce mood stability, immune resilience, metabolic health, and recovery over time. Our supplements are clinically backed, pharmaceutical-grade formulations, available exclusively through licensed medical providers. Each recommendation is made with intention, based on your health goals and lifestyle demands.

Who Benefits Most from Supplement Support?

Our supplement protocols are often helpful for individuals who:

Manage high-cognitive work, study, or emotional challenges

Experience low energy, poor sleep, or chronic stress

Are recovering from illness, burnout, or hormonal imbalance

Train regularly or maintain physically demanding routines

Want to support healthy aging, focus, and metabolic balance

Are receiving IV therapy, peptide therapy, or body-based treatments and want to extend their benefits between sessions

Core Supplement Offerings

All of our supplements provide foundational support for modern health challenges.

Available supplements include:

Foundation Supplement Protocol

Product

Price

Mag Sync

$24.95

Omega Complete

$34.95

Essential D3 + K2

$24.95

Neuro Fuel

$24.95

Super C

$24.95

Complete Protocol

$119

Gut Reset Supplement Protocol

Product

Price

Gut Guru

$64.99

Mito prime

$32.95

Cytogenix

$37.95

FloraVia/FloraMax

$39.95

Complete Protocol

$149

Additional Support

Product

Price

Berberine

$44.95

Breathe Easy+

$44.95

Cardio Protect

$42.95

Melatonin

$15.59

Women’s Longevity Supplement Protocol

Product

Price

Harmony

$32.95

Adrenal Balance

$49.95

UT Guard

$34.95/td>

Complete Protocol

$99

Brain Heath Supplement Protocol

Product

Price

CogNova

$37.95

Adrenal Balance

$49.95

Kinetiq Creatine

$29.95

Complete Protocol

$99

FAQs

Do I need to take all five supplements, or can I start with just one?

Your supplement plan is fully personalized. Some individuals may start with just one or two formulas based on their goals, lifestyle, or ongoing treatments. Your provider will help determine what combination is most supportive for you.

How long does it take to notice benefits from supplements?

Many people notice subtle changes in energy, focus, or sleep within a few weeks. Some benefits, like improved stress resilience or metabolic support, build gradually over time. Supplements work best as part of a consistent, personalized wellness plan.

Can I use these supplements if I’m not receiving IV therapy or peptide treatments?

Absolutely. Our supplements are designed to support overall wellness and can be taken independently. They also complement treatments like IV therapy or peptides for those who are using them.

How do I know which supplements are right for me?

During your free consultation, your provider will review your health history, lifestyle, and wellness goals. Together, you’ll select the supplements that best support your needs—ensuring they’re safe, effective, and tailored to you.

---

## Supplements (duplicate slug) (/supplements-1)

**URL:** https://www.arcwellness.net/supplements-1  
**Title tag:** Supplements (Copy) — Arc Wellness  
**Meta description:** _(none)_

### Headings

- H1: Your Daily Reset for Everyday Vitality
- H4: Supplements can be powerful, but only when they’re chosen carefully, dosed correctly, and aligned with the body’s real needs.
- H2: Who Benefits Most from Supplement Support?
- H1: Core Supplement Offerings
- H4: Reacted Magnesium
- H4: Vitamin K2 with D3
- H4: Methyl B Complex
- H4: Buffered Vitamin C Capsules
- H1: Featured Support for Stress &amp; Sleep Balance
- H3: Cortisol Manager
- H1: Monthly Supplements Made Simple
- H4: All Five Core Supplements in One Simple Bundle
- H1: How Supplements Fit Into Your Care Plan
- H1: FAQs
- H4: Do I need to take all five supplements, or can I start with just one?
- H4: How long does it take to notice benefits from supplements?
- H4: Can I use these supplements if I’m not receiving IV therapy or peptide treatments?
- H4: How do I know which supplements are right for me?

### Body copy

Supplements (Copy) — Arc Wellness

Your Daily Reset for Everyday Vitality

Supplements can be powerful, but only when they’re chosen carefully, dosed correctly, and aligned with the body’s real needs.

At Arc Wellness, supplements are not treated as generic add-ons or retail products. They are used as supportive tools within a broader, physician-guided wellness plan, designed to reinforce mood stability, immune resilience, metabolic health, and recovery over time.

Our supplements are clinically backed, pharmaceutical-grade formulations, available exclusively through licensed medical providers. Each recommendation is made with intention, based on your health goals and lifestyle demands.

Who Benefits Most from Supplement Support?

Our supplement protocols are often helpful for individuals who:

Manage high-cognitive work, study, or emotional challenges

Experience low energy, poor sleep, or chronic stress

Are recovering from illness, burnout, or hormonal imbalance

Train regularly or maintain physically demanding routines

Want to support healthy aging, focus, and metabolic balance

Are receiving IV therapy, peptide therapy, or body-based treatments and want to extend their benefits between sessions

Core Supplement Offerings

All of our supplements provide foundational support for modern health challenges.

Available supplements include:

Reacted Magnesium

An easily absorbed form of magnesium that helps calm the nervous system, ease muscle tension, support restful sleep, and maintain cardiovascular health, without upsetting digestion.

Vitamin K2 with D3

A balanced pairing that supports bone strength, heart health, immune regulation, and proper calcium use—important for maintaining wellness as the body ages.

Methyl B Complex

A thoughtfully formulated B-vitamin blend that supports natural energy levels, cognitive function, emotional balance, and detox pathways, using forms that are well suited for methylation sensitivity.

Buffered Vitamin C Capsules

A gentle, buffered vitamin C option that supports immune function and antioxidant defense, making it appropriate for regular, long-term use without stomach irritation.

Featured Support for Stress & Sleep Balance

Cortisol Manager

A clinically selected adaptogenic supplement for stress patterns that disrupt sleep.

Non-sedating. Designed for regular, consistent use.

Monthly Supplements Made Simple

All Five Core Supplements in One Simple Bundle

💡 Bundle & Save:

Only in $99/month—saving over $50 compared to individual purchases.

Available for monthly in-clinic pickup or local delivery, so staying on track is simple and stress-free.

How Supplements Fit Into Your Care Plan

Unlike retail supplement programs, we integrate supplementation into your overall care strategy.

Your provider considers:

Current therapies (IVs, peptides, EMS-based treatments)

Stress levels, sleep patterns, and energy fluctuations

Lifestyle factors such as work schedule, training load, and nutrition

Long-term wellness goals rather than short-term fixes

This ensures supplements remain supportive, not redundant or excessive.

Book your consultation today, and let’s determine whether supplements belong in your personalized wellness plan.

FAQs

Do I need to take all five supplements, or can I start with just one?

Your supplement plan is fully personalized. Some individuals may start with just one or two formulas based on their goals, lifestyle, or ongoing treatments. Your provider will help determine what combination is most supportive for you.

How long does it take to notice benefits from supplements?

Many people notice subtle changes in energy, focus, or sleep within a few weeks. Some benefits, like improved stress resilience or metabolic support, build gradually over time. Supplements work best as part of a consistent, personalized wellness plan.

Can I use these supplements if I’m not receiving IV therapy or peptide treatments?

Absolutely. Our supplements are designed to support overall wellness and can be taken independently. They also complement treatments like IV therapy or peptides for those who are using them.

How do I know which supplements are right for me?

During your free consultation, your provider will review your health history, lifestyle, and wellness goals. Together, you’ll select the supplements that best support your needs—ensuring they’re safe, effective, and tailored to you.

---

## Nutrient / Vitamin Therapy (/vitamin-therapy)

**URL:** https://www.arcwellness.net/vitamin-therapy  
**Title tag:** Vitamin Therapy | Revitalize Now — Book Your Vitamin Therapy — Arc Wellness  
**Meta description:** Experience customized vitamin therapy infusions to boost energy, immunity, and recovery. Schedule a session at Arc Wellness in St. Louis for fast, effective results.

### Headings

- H2: Thoughtful Support for Modern Fatigue
- H4: At Arc Wellness, Nutrient therapy is offered as:
- H2: Our IV Infusion Options
- H4: Our Signature – Arc Restore
- H4: Glutathione
- H4: ALA (Alpha Lipoic Acid)
- H4: NAD+
- H2: Vitamin &amp; Metabolic Support Injections
- H1: FAQs
- H4: How long does an IV session take?
- H4: How often can I receive IV infusion?
- H4: Is Nutrient Therapy safe?
- H4: Will I feel results right away?

### Body copy

Vitamin Therapy | Revitalize Now — Book Your Vitamin Therapy — Arc Wellness

Thoughtful Support for Modern Fatigue

Nutrient Therapy is a medical wellness service that delivers fluids, vitamins, antioxidants, and amino acids directly into the bloodstream to support hydration, nutrient balance, and overall physiological function.

By bypassing digestion, the therapy allows for more efficient and reliable nutrient delivery, making them especially helpful when the body needs support for recovery, resilience, or restoration.

START WITH A FREE CONSULTATION

At Arc Wellness, Nutrient therapy is offered as:

Intravenous infusions for deeper hydration and systemic support

Targeted intramuscular injections for quick, focused supplementation

Each plan is tailored to your health goals, lifestyle, and medical history. Every infusion or injection is administered by licensed medical professionals.

Our IV Infusion Options

Available IV infusions include:

Our Signature – Arc Restore

A foundational infusion thoughtfully designed to support whole-body balance.

What It Supports

• Rehydration at a cellular level

• Steady energy without overstimulation or crashes

• Immune resilience during periods of stress or fatigue

• Improved mental fatigue and brain fog

• Recovery after illness, burnout, or physical strain

• Long-term skin health, metabolic balance, and healthy aging

Wellness Disclaimer:

Arc Restore is a wellness-focused therapy and works best as part of a personalized care plan guided by our lead physician. This IV infusion is not intended to diagnose, treat, or replace medical care for specific conditions.

Infusions

Price

Arc Restore

$175

ALA

$100

Glutathione

$75

NAD+

$100

Bundle

$299

Glutathione

Detox & Immune Support

A targeted infusion that supports detoxification, reduces oxidative stress, and strengthens immune function.

ALA (Alpha Lipoic Acid)

Inflammation & Metabolic Support

A restorative infusion that calms inflammation, supports nerve function, and boosts metabolic and liver health.

NAD+

Cellular & Cognitive Performance Support

A performance-focused infusion that promotes cellular repair, increases energy, and enhances mental clarity and cognitive function.

Vitamin & Metabolic Support Injections

Injection options include:

B12 Energy Shot – Supports energy, focus, metabolism, and nervous system health

Vitamin D3 Boost – Supports immunity, mood regulation, and bone health

MICC Injection – Supports fat metabolism, liver function, and energy production through a blend of Methionine, Inositol, Choline, and B vitamins

Power MICC – An enhanced lipotropic formula designed to support fat loss, boost energy levels, and optimise metabolic function

Injections

Price

B12 Energy Shot

$25

Vitamin D3 Boost

$35

MICC Injection

$25

Power MICC

$35

Bundle

$200

FAQs

How long does an IV session take?

IV infusions are designed to be comfortable and unhurried. Most sessions take about 30–60 minutes, giving your body the time it needs to absorb nutrients effectively.

How often can I receive IV infusion?

The ideal frequency depends on your unique health needs and goals. Your provider will work with you to create a schedule that supports your wellbeing safely and effectively.

Is Nutrient Therapy safe?

Yes. All infusions are administered by licensed medical professionals in a carefully controlled, sterile environment. We prioritize your safety and comfort every step of the way.

Will I feel results right away?

Many people notice a gentle lift in energy and hydration soon after a session. Some benefits, like enhanced mental clarity or immune support, may build gradually over a few sessions, allowing your body to restore balance naturally.

---

## Peptide Therapy (/new-page-1)

**URL:** https://www.arcwellness.net/new-page-1  
**Title tag:** Peptide Therapy — Arc Wellness  
**Rebuild route:** `/treatments/peptide-therapy`

### Headings

- H2: Thoughtful Support for Targeted Wellness
- H2: Our Peptide Offerings
- H2: GLOW
- H2: Wolverine
- H2: Who Thrives with Peptides?
- H1: FAQs

### Body copy

Thoughtful Support for Targeted Wellness

Peptide Therapy is a science-based approach that works with your body's natural repair, regulation, and communication systems. By guiding processes related to healing, recovery, and regeneration, these therapies offer targeted support where your body needs it most.

Our Peptide Offerings

All peptides are prescribed following medical consultation to ensure appropriate use, accurate dosing, and alignment with your health profile.

GLOW — For collagen stimulation, cellular renewal, and overall skin and hair vitality. Subcutaneous injection — $195.

Wolverine — For faster healing, reduced inflammation, and optimal recovery. Subcutaneous injection — $175.

Who Thrives with Peptides?

Improve skin health, collagen production, and overall glow · Support faster healing, tissue repair, and recovery · Reduce inflammation and physical strain from workouts or overuse · Enhance mobility, performance, and overall vitality

FAQs: Is peptide therapy safe? · How long will I need to use peptides? · Will I feel results immediately?

---

## Wellness Therapies (IV hub) (/wellness-therapies)

**URL:** https://www.arcwellness.net/wellness-therapies  
**Title tag:** Wellness Therapies Overview — Arc Wellness  
**Meta description:** _(none)_

### Headings

- H1: Elevate Your Wellness. Reclaim Your Energy.
- H2: Vitamin &amp; IV Therapy
- H2: Peptide Therapy
- H2: Supplements

### Body copy

Wellness Therapies Overview — Arc Wellness

Elevate Your Wellness. Reclaim Your Energy.

Discover targeted therapies that enhance your body's natural healing — from powerful IV vitamin infusions to advanced peptides and essential supplements.

Vitamin & IV Therapy

Replenish essential nutrients, hydrate deeply, and boost immunity.

Tailored IV blends to support energy, recovery, and wellness.

EXPLORE IV THERAPY

Target inflammation, aging, weight loss, and hormone balance.

Peptides naturally enhance your body's cellular repair and regeneration.

LEARN MORE ABOUT PEPTIDES

Pharmaceutical-grade supplements curated for everyday vitality.

Support immune health, sleep, stress, metabolism, and more.

BROWSE SUPPLEMENTS

---

## Home (/)

**URL:** https://www.arcwellness.net/  
**Title tag:** Arc Wellness | Enhance Your Wellness Today  
**Meta description:** Discover cutting-edge, personalized wellness treatments including body sculpting, cognitive renewal, and vitamin therapy at Arc Wellness in St. Louis.

### Headings

- H1: Arc Wellness
- H4: A New Standard of Care for the Life You Live
- H2: Wellness, Made Personal
- H2: What We Help You Restore
- H2: Your Path Toward Feeling Whole Again
- H4: We’ve simplified wellness into a rhythm that feels natural. One that evolves with your life, not around it.
- H2: What sets us apart isn’t just how we treat; it’s how we care.
- H4: Science with Soul
- H4: Physician-Led Care
- H4: Whole-Person Healing
- H4: Real Access, Real Results
- H3: Answers for the Journey Ahead

### Body copy

Arc Wellness | Enhance Your Wellness Today

A New Standard of Care for the Life You Live

Rooted in vitality, Arc Wellness combines medical expertise with personalized wellness practices to support your body, mind, and core. From non-invasive treatments for weight management, pelvic health, and cognitive performance to restorative therapies and lifestyle guidance, everything we do is designed to help you move, think, and feel with more strength, clarity, and confidence.

Wellness, Made Personal

While our services are modern, our philosophy is simple:

True wellness should be powerful, personal, and accessible to everyone. That’s why we’ve made treatments like peptides, infusions, and supplements available at rates that make long-term wellness sustainable, not exclusive. Because taking care of yourself shouldn’t feel like a luxury.

What We Help You Restore

We focus on the everyday imbalances that slowly steal vitality: Fatigue & Low Energy

Stress & Mental Fog

Core Weakness & Posture

Pelvic Health & Control

Immune & Hormonal Imbalance

EXPLORE OUR SERVICES

Your Path Toward Feeling Whole Again

We’ve simplified wellness into a rhythm that feels natural. One that evolves with your life, not around it.

Treatment

You’ll begin your personalized blend of therapies, guided by medical professionals to deliver results that feel as real as they look.

Adjustments

As your body responds, we refine your care. Small shifts make the difference between progress and transformation.

Free Consultation

We begin with an in-depth conversation to understand your current state and where you want to be. Every plan is created with your goals and lifestyle in mind.

Monitoring

Progress is measured through weekly check-ins. You’ll see how your body and your confidence change over time.

Ongoing Support

Wellness doesn’t end when you leave our doors. We stay connected, offering continued guidance, maintenance options, and the reassurance of care that adapts with you.

What sets us apart isn’t just how we treat; it’s how we care.

Science with Soul

Everything we do is grounded in research and guided by compassion. You’re never just a patient here. You’re a person with a story, and your care reflects that.

Physician-Led Care

Under the guidance of Dr. Jabbar and our clinical team, your care is never one-size-fits-all. It’s designed, adjusted, and evolved for you.

Whole-Person Healing

We don’t chase symptoms. We restore systems—physical, mental, and emotional—for results that last.

Real Access, Real Results

We believe premium wellness shouldn’t live behind a high price tag. Our goal is to bring world-class treatments within reach of everyday people who want to feel their best.

Answers for the Journey Ahead

1. What happens during my first visit?

Your first visit begins with a free consultation and, where needed, a Styku 3D body scan . Together, we’ll discuss your goals, lifestyle, and budget to create a plan that’s realistic and personal.

2. Are your treatments safe?

Yes, safety is at the center of everything we do. Our technologies, including ExoMind, Emsella, and EmSculpt Neo, are FDA-cleared and clinically supported. For IV infusions, peptides, and supplements, each protocol is dosage-monitored and quality-verified. Before any treatment begins, your medical provider reviews your history to ensure every element of your plan is safe and aligns with your health needs.

3. Do you offer financing or payment plans?

Absolutely. We offer both in-house payment options and third-party financing via PatientFi and Cherry, so you can begin your wellness journey now and pay over time.

4. What services are available for men?

All of them! Our services help both men and women. For men, we focus on core strength, pelvic floor health, energy levels, and mental performance through customized, non-invasive therapies.

---

## Footer (site-wide)

- **Address:** 5000 Cedar Plaza Parkway, Ste 230, St Louis, MO 63128
- **Phone:** 636-400-5500
- **Email:** info@arcwellness.net
- **Quick links:** About · Our Services · Wellness Therapies · Packages · Financing · Contact
- **Legal:** © 2025 All Rights Reserved · Privacy Policy · Terms and Conditions _(footer links; no dedicated pages found at /privacy or /terms)_

---

## Next.js rebuild checklist

| Live page | Repo status (May 2026) |
|-----------|--------------------------|
| Homepage | Built — align copy with live sections above |
| About | Built — verify mission/vision/values/founder |
| Treatments hub | Built at `/treatments` — map from `/wellness-therapies` |
| 12 modality pages | Built at `/treatments/[slug]` — compare body copy per page |
| Arc Aesthetics | Route `/aesthetics` exists — compare live copy |
| Arc Programs | Route `/programs` — live slug is `/plans` |
| Financing | Built — live page is minimal |
| Contact | Built — verify hours & form fields |
| Book Now | Mangomint external — `/book` redirect |
| Privacy / Terms | Placeholder routes — live footer links may be Squarespace legal pages not in sitemap |

**Content parity roadmap:** See `documents/content-parity-roadmap.md` for live → Next.js file map, phase order, and per-page checklist.

---

## Raw crawl artifact

Machine-readable full extract: `documents/arcwellness-net-crawl-raw.json`  
Regenerate: `node scripts/crawl-arcwellness-net.mjs` then `node scripts/generate-arcwellness-inventory.mjs`
