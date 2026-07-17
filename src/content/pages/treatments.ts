import { CLINIC_INTERIOR_ALT, CLINIC_INTERIOR_IMAGES } from "@/content/clinicInteriorImages";
import { MEDICAL_SPA_NAMED_IMAGES } from "@/content/medicalSpaServiceImages";
import { RETAIL_IMAGES } from "@/content/retailImages";
import { images } from "@/content/site";

export type TreatmentCategoryId = "body" | "aesthetics" | "wellness";

export type TreatmentPage = {
  slug: string;
  title: string;
  tagline: string;
  category: TreatmentCategoryId;
  categoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  intro: string;
  highlights?: readonly string[];
  sections: readonly {
    heading?: string;
    body?: string;
    bullets?: readonly string[];
  }[];
  faqs?: readonly { id: string; question: string; answer: string }[];
};

export const treatmentCategories: Record<
  TreatmentCategoryId,
  { label: string; description: string }
> = {
  body: {
    label: "Tech-driven body treatments",
    description:
      "FDA-cleared, non-invasive treatments designed to help you function at your best.",
  },
  aesthetics: {
    label: "Arc aesthetics",
    description: "Injectables, skin technology, and elevated treatment experiences.",
  },
  wellness: {
    label: "Foundational therapies",
    description:
      "Targeted therapies that replenish, repair, and restore vitality at the cellular level.",
  },
};

const img = images;

/** Live `/new-page-2` (Our Services) + `/wellness-therapies` hub copy */
export const treatmentsHub = {
  seo: {
    title: "Overview | Arc Wellness",
    description:
      "Discover science-backed treatments designed to elevate your health, enhance your body, and restore your mind, all under one roof.",
  },
  hero: {
    eyebrow: "Restoration Begins Here",
    title: "Tech-Driven",
    titleEmphasis: "Body Treatments",
    body: "Discover a range of science-backed treatments designed to elevate your health, enhance your body, and restore your mind, all under one roof. Restore balance, strength, and clarity through FDA-cleared, non-invasive treatments designed to help you function at your best.",
  },
  pinExplorer: {
    title: "our modalities",
    subtitle:
      "Each treatment works with your body to create measurable change you can see and feel.",
  },
  ruledGrid: {
    title: "Every",
    titleEmphasis: "pathway",
    subtitle:
      "From neurostimulation and pelvic health to IV nutrients, peptides, and physician-selected supplements. Each treatment works with your body to create measurable change you can see and feel.",
  },
} as const;

export const allTreatments: readonly TreatmentPage[] = [
  {
    slug: "overview",
    title: "Our Services",
    tagline: "Restoration Begins Here",
    category: "body",
    categoryLabel: "Overview",
    imageSrc: img.heroMedia,
    imageAlt: "ARC Wellness reception",
    intro:
      "Discover a range of science-backed treatments designed to elevate your health, enhance your body, and restore your mind, all under one roof.",
    sections: [
      {
        heading: "Tech-Driven Body Treatments",
        body: "Restore balance, strength, and clarity through our FDA-cleared, non-invasive treatments designed to help you function at your best. Each treatment works with your body to create measurable change you can see and feel.",
        bullets: [
          "ExoMind: Calm the mind, sharpen focus, and bring mental clarity back into rhythm through advanced neurostimulation.",
          "EmSella: Strengthen your foundation with a comfortable, chair-based therapy that restores pelvic health and core stability.",
          "EmSculpt Neo: Tone muscle, reduce fat, and rebuild confidence with powerful, non-invasive body contouring technology.",
        ],
      },
      {
        heading: "Foundational Therapies",
        body: "Support your body's natural healing processes through targeted therapies that replenish, repair, and restore vitality at the cellular level.",
        bullets: [
          "Nutrient: Rehydrate, refuel, and recover faster with customized infusions that nourish your body where it matters most.",
          "Peptide: Encourage regeneration and balance with therapeutic peptides that enhance metabolism, repair, and longevity.",
        ],
      },
      {
        heading: "Wellness Essentials",
        body: "Everyday essentials, carefully chosen by our physicians to support lasting energy, a strong immune system, and emotional balance.",
      },
    ],
  },
  {
    slug: "exomind",
    title: "ExoMind",
    tagline: "Reconnect Your Mind to Its Natural Harmony",
    category: "body",
    categoryLabel: "Neuromodulation",
    imageSrc: MEDICAL_SPA_NAMED_IMAGES.exomindBtlConsoleTreatmentBed,
    imageAlt: "ExoMind BTL console and treatment bed at ARC Wellness",
    intro:
      "ExoMind is an advanced neuromodulation treatment designed to gently recalibrate how the brain communicates with itself. Using precise Transcranial Magnetic Stimulation (TMS), it delivers measured magnetic pulses that activate key neural pathways and support healthier brain function.",
    highlights: [
      "Mental clarity without relying on medications",
      "Sessions under 30 minutes, walk in, walk out",
      "Supports ADHD, OCD, and depression symptoms",
    ],
    sections: [
      {
        heading: "Who Can Benefit?",
        body: "ExoMind is for anyone seeking mental clarity, emotional balance, or cognitive renewal without relying on medications or invasive procedures.",
      },
      {
        heading: "What You'll Feel and See",
        bullets: [
          "Relief from stress, anxiety, or emotional imbalance",
          "Improved focus, memory, and productivity",
          "Restored energy and mental clarity",
        ],
      },
      {
        heading: "Calm Your Cravings, Ease Your Pain",
        body: "ExoMind's influence extends beyond mood. By gently stimulating areas of the brain linked to reward, mood, and decision-making, it helps reduce the neurological noise that often drives cravings or emotional eating. The same gentle recalibration supports how the brain perceives and manages pain, helping you experience both mental calm and physical relief.",
      },
      {
        heading: "Honest Stories From Our Clients",
        bullets: [
          "Sharper focus and concentration",
          "Improved mood and emotional balance",
          "Better sleep and lower anxiety",
          "Mental energy without side effects",
        ],
      },
    ],
    faqs: [
      {
        id: "what",
        question: "What is EXOMIND therapy?",
        answer:
          "EXOMIND is a noninvasive, drug-free walk-in walk-out procedure designed to treat symptoms of depression, helping patients regain control and improve their quality of life.",
      },
      {
        id: "how",
        question: "How does it work?",
        answer:
          "FDA-cleared for the treatment of depression, EXOMIND's patented ExoTMSTM technology comfortably stimulates key areas of the brain involved in emotional regulation, cognitive function, and self-control. By activating neural pathways, it helps restore healthy brain activity and enhances neural connectivity.",
      },
      {
        id: "benefits",
        question: "What are the benefits of EXOMIND?",
        answer:
          "rTMS is a noninvasive treatment and is free from common antidepressant drug side effects such as weight gain and sexual dysfunction.",
      },
      {
        id: "right",
        question: "Is EXOMIND right for me?",
        answer:
          "EXOMIND is designed for individuals experiencing depression. Consult with your healthcare provider to determine if EXOMIND is the right option for your mental wellness journey.",
      },
      {
        id: "sessions",
        question: "How many sessions are required?",
        answer:
          "A course of rTMS traditionally requires multiple treatments. Patients should discuss the number of treatments and treatment schedule with their physicians. rTMS treatment effects in reducing depression are temporary, and patients may need to continue other forms of depression therapy.",
      },
      {
        id: "feel",
        question: "What does the therapy feel like?",
        answer:
          "During EXOMIND therapy, you will lie down comfortably while the applicator is placed on your head. As the treatment begins, you may feel a tapping or tingling sensation in the treated area, often described by patients as similar to a head massage. After the session, you can resume normal activities immediately.",
      },
      {
        id: "hurt",
        question: "Does it hurt?",
        answer:
          "Most patients find the therapy comfortable. Sessions are quick, lasting under 30 minutes, and allow you to walk in and walk out with ease.",
      },
      {
        id: "disrupt",
        question: "Will it disrupt my daily life?",
        answer: "EXOMIND seamlessly integrates into your daily routine with minimal disruption.",
      },
      {
        id: "risks",
        question: "What are the risks?",
        answer:
          "Therapy by rTMS is generally well tolerated. Nevertheless it may, for some, cause headache, scalp pain, seizure and hypomania. Please discuss risks and contraindications with your healthcare practitioner before beginning treatment.",
      },
      {
        id: "results",
        question: "How long will the results last?",
        answer:
          "Although the durability of rTMS therapy in the treatment of depression has been suggested in several clinical reports for up to 12 months, MDD patients need to be monitored post treatment and may need to continue or resume antidepressant medications.",
      },
    ],
  },
  {
    slug: "emsella",
    title: "EmSella",
    tagline: "Realign Your Core to Its Natural Strength",
    category: "body",
    categoryLabel: "Pelvic health",
    imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsellaChairPatientLifestyle,
    imageAlt: "Patient seated on an EmSella chair during pelvic floor treatment",
    intro:
      "Emsella is an advanced, non-invasive treatment that uses High Intensity Focused Electromagnetic Energy (HIFEM) to strengthen the pelvic floor muscles, all while you remain fully clothed.",
    sections: [
      {
        heading: "Who Can Benefit?",
        body: "Emsella is ideal for anyone seeking better bladder control, sexual wellness, and core stability without surgery or recovery time.",
      },
      {
        heading: "The Difference You'll Notice, Every Day",
        bullets: [
          "Reduced bladder leaks, urgency, and frequency",
          "Enhanced posture and abdominal control",
          "Stronger pelvic floor and improved core stability",
          "Improved sexual wellness and sensation",
        ],
      },
      {
        heading: "Postpartum and post-prostate recovery",
        body: "Not only for general wellness, it's a trusted solution for postpartum and post-prostate recovery too.",
      },
    ],
    faqs: [
      {
        id: "what",
        question: "What is Emsella?",
        answer:
          "Emsella is a non-invasive treatment that uses high-intensity focused electromagnetic (HIFEM) technology to stimulate pelvic floor muscles. Each session delivers thousands of powerful contractions, similar to doing Kegel exercises, helping strengthen the muscles that support bladder control, sexual health, and core stability.",
      },
      {
        id: "who",
        question: "Who is Emsella for?",
        answer:
          "Women and men who experience urinary incontinence; postpartum women who want to restore pelvic strength; and adults looking to improve sexual health, confidence, and core stability.",
      },
      {
        id: "feel",
        question: "What does a treatment session feel like?",
        answer:
          "During your session, you'll sit comfortably in the Emsella chair, fully clothed. You'll feel strong but painless muscle contractions along with a mild tingling sensation. Most patients describe it as unusual at first but very tolerable.",
      },
      {
        id: "length",
        question: "How long does each session take?",
        answer:
          "Each session lasts about 30 minutes. Most patients complete treatment during their lunch break and return to daily activities immediately afterward.",
      },
      {
        id: "plan",
        question: "How many sessions will I need?",
        answer:
          "A typical treatment plan includes 6 sessions, scheduled twice a week. Your provider will tailor the plan based on your needs and goals.",
      },
      {
        id: "downtime",
        question: "Is there any downtime or recovery?",
        answer:
          "No. Emsella is completely non-invasive, requires no surgery, and has no downtime. You can return to work, exercise, and daily life right after treatment.",
      },
      {
        id: "results",
        question: "When will I see results?",
        answer:
          "Some patients notice improvement after just one session, but most experience significant results after completing the full treatment series. Results continue to improve over the following weeks as muscles strengthen.",
      },
      {
        id: "duration",
        question: "How long do the results last?",
        answer:
          "Results vary, but many patients enjoy improvements for 6–12 months. Maintenance sessions every few months help sustain results long-term.",
      },
      {
        id: "kegels",
        question: "How does Emsella compare to doing Kegels at home?",
        answer:
          "While Kegel exercises can be beneficial, most people struggle to engage the pelvic floor correctly. Emsella delivers the equivalent of 11,000 perfect Kegels in a single session, offering faster and more reliable results.",
      },
      {
        id: "insurance",
        question: "Will insurance cover Emsella?",
        answer:
          "Emsella is considered a wellness and elective treatment, so it is not covered by insurance. Arc Wellness offers package options and financing solutions to make treatment more accessible.",
      },
    ],
  },
  {
    slug: "emsculpt-neo",
    title: "EmSculpt Neo",
    tagline: "Restore Your Body to Its Natural Form",
    category: "body",
    categoryLabel: "Body contouring",
    imageSrc: MEDICAL_SPA_NAMED_IMAGES.emsculptNeoAbdominalTreatmentMale,
    imageAlt: "EmSculpt Neo abdominal treatment in a wellness clinic",
    intro:
      "Emsculpt Neo is an advanced non-invasive treatment that combines two technologies to simultaneously reduce fat and build muscle.",
    highlights: ["No Pain. No Sweat. No downtime.", "~30 minutes per session", "Often 4 weekly sessions"],
    sections: [
      {
        heading: "How it works",
        bullets: [
          "HIFEM Technology: Delivers powerful, supramaximal muscle contractions to strengthen and tone targeted muscles.",
          "Radiofrequency Heating: Gently heats fat cells, helping the body eliminate them permanently while supporting muscle definition.",
        ],
      },
      {
        heading: "Targeted Areas for Transformation",
        body: "Abdomen, buttocks, thighs, arms, calves, and pelvic floor.",
      },
      {
        heading: "Who Can Benefit?",
        body: "EmSculpt Neo is for anyone looking for stronger muscles and a more sculpted physique.",
      },
      {
        heading: "More Than Body Contouring",
        body: "EmSculpt Neo strengthens key muscles to improve functional movement and support everyday activities. It also targets muscles that stabilize the joints and spine, helping reduce discomfort from weakness or imbalance.",
        bullets: [
          "People wanting to enhance body tone and definition",
          "Active individuals looking to break fitness plateaus",
          "Those seeking a non-surgical body contouring solution",
          "Postpartum recovery (core re-strengthening)",
        ],
      },
    ],
    faqs: [
      {
        id: "what",
        question: "What is EmSculpt Neo?",
        answer:
          "EmSculpt Neo is the first and only non-invasive treatment that combines radiofrequency (RF) heating and high-intensity focused electromagnetic (HIFEM) energy. This dual action helps reduce fat and build muscle at the same time.",
      },
      {
        id: "who",
        question: "Who is EmSculpt Neo for?",
        answer:
          "Adults who want to reduce stubborn fat, tone and define muscles, and prefer a non-surgical alternative to body contouring. It can be used on the abdomen, buttocks, arms, thighs, and calves.",
      },
      {
        id: "feel",
        question: "What does a session feel like?",
        answer:
          "You'll feel a gentle warming sensation (from RF) and powerful muscle contractions (from HIFEM). Most patients compare it to an intense workout combined with a warm massage.",
      },
      {
        id: "sessions",
        question: "How many sessions will I need?",
        answer:
          "Most patients benefit from a series of 4 sessions, scheduled once a week. Your provider may recommend additional treatments depending on your goals.",
      },
      {
        id: "downtime",
        question: "Is there any downtime or recovery?",
        answer:
          "No downtime. You can return to work, exercise, or daily activities immediately after your session.",
      },
      {
        id: "when",
        question: "When will I see results?",
        answer:
          "Some patients begin noticing improvements within a few weeks. Optimal results usually appear 2–3 months after completing the full treatment plan as the body continues burning fat and building muscle.",
      },
      {
        id: "exercise",
        question: "How does EmSculpt Neo compare to traditional exercise?",
        answer:
          "One 30-minute EmSculpt Neo session is equivalent to doing 20,000 crunches or squats, while also delivering targeted fat reduction, something no workout can do alone.",
      },
      {
        id: "insurance",
        question: "Is EmSculpt Neo covered by insurance?",
        answer:
          "EmSculpt Neo is considered an elective body-contouring treatment, so it is not covered by insurance. Arc Wellness offers treatment packages and financing options.",
      },
    ],
  },
  {
    slug: "emface",
    title: "EmFace",
    tagline: "The Needle-Free Revolution in Facial Rejuvenation",
    category: "aesthetics",
    categoryLabel: "Facial device",
    imageSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceBtlConsoleFacialTreatment,
    imageAlt: "EmFace facial treatment with BTL console at ARC Wellness",
    intro:
      "EMFACE is the first and only non-invasive procedure that simultaneously treats facial skin and muscles to lift, tone, and reduce wrinkles, all without needles or downtime.",
    sections: [
      {
        heading: "How It Works",
        body: "EMFACE combines two powerful technologies in a single 20-minute session: Synchronized Radiofrequency (RF) gently heats the dermal layers to stimulate collagen and elastin; HIFES™ Technology delivers high-intensity electrical pulses to selectively contract and tone facial muscles for a natural lifting effect from within.",
      },
      {
        heading: "Key Benefits",
        bullets: [
          "Natural Lift: Average of 23% more lift in targeted areas",
          "Wrinkle Reduction: Up to 37% reduction in fine lines and wrinkles",
          "Improved Muscle Tone: Approximately 30% increase in resting muscle tone",
          "No Needles & No Pain: Often compared to a warm facial massage",
          "Zero Downtime: Return to daily activities immediately after your lunchtime lift",
        ],
      },
      {
        heading: "Treatment Areas",
        body: "Forehead (lifts brows, smooths lines), cheeks (volume and definition), jawline and jowls, and submentum (under chin) with dedicated applicators.",
      },
      {
        heading: "Is EMFACE Right for You?",
        body: "EMFACE is suitable for almost anyone seeking a non-surgical alternative to a facelift or a preventative anti-aging strategy, especially those who want to avoid needles, seek natural-looking results, and cannot afford recovery time.",
      },
    ],
  },
  {
    slug: "exion",
    title: "Exion",
    tagline: "The Ultimate Skin Rejuvenation",
    category: "aesthetics",
    categoryLabel: "Skin technology",
    imageSrc: MEDICAL_SPA_NAMED_IMAGES.emfaceCheekApplicatorTreatment,
    imageAlt: "Exion skin treatment at ARC Wellness",
    intro:
      "EXION is an advanced skin rejuvenation treatment designed to improve skin quality, elasticity, and overall appearance with little to no downtime. By combining targeted radiofrequency (RF) with ultrasound technology, Exion stimulates your body's natural production of collagen, elastin, and hyaluronic acid.",
    sections: [
      {
        heading: "Key Benefits & Proven Results",
        bullets: [
          "Natural Hyaluronic Acid Boost: Increases skin HA levels by up to 224% without needles or fillers",
          "Skin Quality Improvement: Boosts collagen by 47% and elastin by 50%",
        ],
      },
      {
        heading: "Key Treatment Options",
        bullets: [
          "Exion Fractional RF (Microneedling): Targets acne scars, deep wrinkles, and stretch marks with less pain than standard microneedling",
          "Exion Face: Needle-free treatment for delicate areas like the eyes and forehead",
          "Exion Clear RF: Clears active acne and improves skin clarity without harsh medications",
        ],
      },
      {
        heading: "Who Benefits Most from EXION?",
        body: "Anyone looking to improve skin quality without the downtime of surgery or the filler look, especially those reversing signs of aging, seeking natural hydration, diminishing acne scars, or preferring a comfortable microneedling experience.",
      },
    ],
    faqs: [
      {
        id: "what",
        question: "What is EXION and how does it work?",
        answer:
          "EXION is an advanced skin rejuvenation treatment that combines targeted radiofrequency (RF) with ultrasound technology to stimulate your body's natural production of collagen, elastin, and hyaluronic acid — improving skin quality, elasticity, and overall appearance with little to no downtime.",
      },
      {
        id: "concerns",
        question: "What can EXION treat?",
        answer:
          "EXION helps improve overall skin quality and elasticity, and can target acne scars, deep wrinkles, stretch marks, and active acne, as well as boost natural hydration for those reversing early signs of aging.",
      },
      {
        id: "options",
        question: "What are the EXION treatment options?",
        answer:
          "There are three main options: Exion Fractional RF (microneedling) for acne scars, deep wrinkles, and stretch marks; Exion Face, a needle-free treatment for delicate areas like the eyes and forehead; and Exion Clear RF, which clears active acne and improves skin clarity.",
      },
      {
        id: "needles",
        question: "Does EXION require needles or fillers?",
        answer:
          "No fillers are needed — EXION can increase your skin's hyaluronic acid levels by up to 224% naturally. Exion Face is completely needle-free, and the Fractional RF (microneedling) option is designed to be more comfortable than standard microneedling.",
      },
      {
        id: "downtime",
        question: "Is there any downtime?",
        answer:
          "EXION is designed to improve skin quality with little to no downtime, making it a comfortable alternative to the recovery and 'filler look' associated with more invasive procedures.",
      },
    ],
  },
  {
    slug: "daxxify",
    title: "DAXXIFY®",
    tagline: "Long-lasting neuromodulator",
    category: "aesthetics",
    categoryLabel: "Injectables",
    imageSrc: RETAIL_IMAGES.injectionBarMenuDisplay,
    imageAlt: "Daxxify consultation at ARC Wellness",
    intro:
      "DAXXIFY® (daxibotulinumtoxinA-lanm) is a premium, long-lasting injectable treatment designed to temporarily smooth moderate to severe frown lines. It's an FDA-approved neuromodulator formulated with a proprietary peptide.",
    sections: [
      {
        heading: "Key Benefits",
        bullets: [
          "Long-Lasting Results: Results last an average of 6 months, with some patients maintaining smooth skin for up to 9 months",
          "Faster Onset: Many patients see visible improvements within just 1–2 days",
          "Fewer Appointments: Most patients only need two treatments per year",
          "Natural-Looking Refresh: Refreshed, youthful appearance while maintaining natural facial expressions",
        ],
      },
      {
        heading: "Target Treatment Areas",
        body: "While primarily FDA-approved for glabellar lines (the 11s), providers also use DAXXIFY for horizontal forehead lines, crow's feet, bunny lines, lip flips, chin dimpling, and masseters (jaw slimming or teeth grinding).",
      },
      {
        heading: "What to Expect During Treatment",
        bullets: [
          "Quick Procedure: A typical session takes only 15–30 minutes",
          "Minimal Discomfort: Injections with a very fine needle; ice or numbing cream available",
          "No Downtime: Return to normal daily activities immediately",
        ],
      },
    ],
  },
  {
    slug: "rha",
    title: "RHA®",
    tagline: "Experience the next generation of dermal fillers",
    category: "aesthetics",
    categoryLabel: "Injectables",
    imageSrc: images.services[0],
    imageAlt: "RHA filler treatment at ARC Wellness",
    intro:
      "The RHA® (Resilient Hyaluronic Acid) Collection is the first and only FDA-approved line of fillers specifically designed to treat dynamic wrinkles and folds.",
    sections: [
      {
        heading: "Why Choose RHA®?",
        bullets: [
          "Designed for Movement: Adapts to your facial expressions for a natural look at rest or in motion",
          "Cleaner Formula: Preserves the natural structure of hyaluronic acid, similar to the HA in your skin",
          "Impressive Longevity: Clinically proven results that last up to 15 months",
        ],
      },
      {
        heading: "Meet the Collection",
        bullets: [
          "RHA Redensity: Delicate areas and fine smoker's lines around the mouth",
          "RHA 2: Moderate dynamic wrinkles around lips and forehead",
          "RHA 3: Moderate-to-severe folds including nasolabial and marionette lines",
          "RHA 4: Deep support and volume for cheeks, jawline, and severe folds",
        ],
      },
      {
        heading: "What to Expect",
        body: "A quick in-office treatment typically lasting 30–45 minutes. Each formulation contains lidocaine for comfort. Most patients return to daily activities immediately; mild swelling or bruising may occur and usually subsides within a few days.",
      },
      {
        heading: "Are You a Candidate?",
        body: "RHA® is ideal for anyone seeking subtle, refreshed results without sacrificing natural expressions. It is safe for all skin types and adults over 21.",
      },
    ],
  },
  {
    slug: "knesko",
    title: "Knesko Collagen Masks",
    tagline: "Elevate your skin and spirit with KNESKO Skin",
    category: "aesthetics",
    categoryLabel: "Skincare",
    imageSrc: CLINIC_INTERIOR_IMAGES.retailKneskoSkinProductDisplay,
    imageAlt: CLINIC_INTERIOR_ALT.retailKneskoSkinProductDisplay,
    intro:
      "Knesko Skin bridges the gap between clinical science and ancient healing through luxurious, gemstone-infused collagen masks. Founded by celebrity esthetician and Reiki Master Lejla Cas, the brand transforms skincare into a high-vibrational ritual that treats the skin, mind, and spirit simultaneously.",
    sections: [
      {
        heading: "The KNESKO Difference",
        bullets: [
          "GEMCLINICAL® Technology: Precious gemstones stabilize active ingredients for deeper delivery",
          "Collagen Hydrogel Material: Holds up to 10x more nutrients than traditional sheet masks",
          "Reiki-Charged Rituals: Every mask is charged with healing Reiki energy",
          "Clean Beauty: Non-toxic, paraben-free, cruelty-free, and biodegradable",
        ],
      },
      {
        heading: "Our KNESKO Collection",
        bullets: [
          "Green Jade Calm, soothes inflammation and reduces redness",
          "Diamond Radiance, brightens and boosts luminosity",
          "Rose Quartz Antioxidant, protects against environmental stress",
          "Nano Gold Repair, promotes healing and revitalises tired, ageing skin",
        ],
      },
      {
        heading: "How to Use the Ritual",
        body: "Cleanse skin, apply the mask for 15–30 minutes while reciting the included mantra, then massage remaining serum into skin, neck, and arms, never wash it off.",
      },
    ],
  },
  {
    slug: "nutrient-therapy",
    title: "Nutrient Therapy",
    tagline: "Thoughtful Support for Modern Fatigue",
    category: "wellness",
    categoryLabel: "IV therapy",
    imageSrc: CLINIC_INTERIOR_IMAGES.ivTherapyReclinerRoom,
    imageAlt: CLINIC_INTERIOR_ALT.ivTherapyReclinerRoom,
    intro:
      "Nutrient Therapy delivers fluids, vitamins, antioxidants, and amino acids directly into the bloodstream to support hydration, nutrient balance, and overall physiological function, especially helpful when the body needs support for recovery, resilience, or restoration.",
    highlights: [
      "Intravenous infusions for deeper hydration and systemic support",
      "Targeted intramuscular injections for quick supplementation",
      "Administered by licensed medical professionals",
    ],
    sections: [
      {
        heading: "Our IV Infusion Options",
        body: "Each plan is tailored to your health goals, lifestyle, and medical history.",
        bullets: [
          "Arc Restore: Foundational infusion for rehydration, steady energy, immune resilience, and recovery",
          "Glutathione: Detox and immune support",
          "ALA (Alpha Lipoic Acid): Inflammation and metabolic support",
          "NAD+, Cellular and cognitive performance support",
        ],
      },
      {
        heading: "Vitamin & Metabolic Support Injections",
        bullets: [
          "B12 Energy Shot: Energy, focus, metabolism, and nervous system health",
          "Vitamin D3 Boost: Immunity, mood regulation, and bone health",
          "MICC Injection: Fat metabolism, liver function, and energy",
          "Power MICC: Enhanced lipotropic formula for metabolic support",
        ],
      },
    ],
    faqs: [
      {
        id: "length",
        question: "How long does an IV session take?",
        answer:
          "Most sessions take about 30–60 minutes, giving your body the time it needs to absorb nutrients effectively.",
      },
      {
        id: "frequency",
        question: "How often can I receive IV infusion?",
        answer:
          "The ideal frequency depends on your unique health needs and goals. Your provider will work with you to create a schedule that supports your wellbeing safely and effectively.",
      },
      {
        id: "safe",
        question: "Is Nutrient Therapy safe?",
        answer:
          "Yes. All infusions are administered by licensed medical professionals in a carefully controlled, sterile environment.",
      },
      {
        id: "results",
        question: "Will I feel results right away?",
        answer:
          "Many people notice a gentle lift in energy and hydration soon after a session. Some benefits build gradually over a few sessions as your body restores balance naturally.",
      },
    ],
  },
  {
    slug: "peptide-therapy",
    title: "Peptide Therapy",
    tagline: "Thoughtful Support for Targeted Wellness",
    category: "wellness",
    categoryLabel: "Peptides",
    imageSrc: CLINIC_INTERIOR_IMAGES.consultationLounge,
    imageAlt: CLINIC_INTERIOR_ALT.consultationLounge,
    intro:
      "Peptide Therapy is a science-based approach that works with your body's natural repair, regulation, and communication systems. By guiding processes related to healing, recovery, and regeneration, these therapies offer targeted support where your body needs it most.",
    highlights: [
      "Prescribed after medical consultation",
      "Subcutaneous delivery",
      "GLOW and Wolverine protocols available",
    ],
    sections: [
      {
        heading: "Our Peptide Offerings",
        body: "All peptides are prescribed following medical consultation to ensure appropriate use, accurate dosing, and alignment with your health profile.",
      },
      {
        heading: "GLOW",
        body: "For collagen stimulation, cellular renewal, and overall skin and hair vitality. Delivered through a subcutaneous injection, $195.",
      },
      {
        heading: "Wolverine",
        body: "For faster healing, reduced inflammation, and optimal recovery. Delivered through a subcutaneous injection, $175.",
      },
      {
        heading: "Who Thrives with Peptides?",
        bullets: [
          "Improve skin health, collagen production, and overall glow",
          "Support faster healing, tissue repair, and recovery",
          "Reduce inflammation and physical strain from workouts or overuse",
          "Enhance mobility, performance, and overall vitality",
        ],
      },
    ],
    faqs: [
      {
        id: "safe",
        question: "Is peptide therapy safe?",
        answer:
          "Yes. At Arc Wellness, all peptides are recommended and guided by licensed medical providers. Each plan is tailored to your health, goals, and medical history, so you can feel confident knowing your care is personalized and closely monitored.",
      },
      {
        id: "duration",
        question: "How long will I need to use peptides?",
        answer:
          "The duration varies depending on your individual goals and how your body responds. Some peptides are used for a few weeks, while others may become part of a longer-term wellness plan. Your provider will work with you to create a schedule that feels right for you.",
      },
      {
        id: "results",
        question: "Will I feel results immediately?",
        answer:
          "Some people experience subtle shifts in energy, focus, or recovery within the first few weeks. Other benefits, such as skin improvement or metabolic balance, often develop gradually with consistent use.",
      },
    ],
  },
  {
    slug: "supplements",
    title: "Supplements",
    tagline: "Your Daily Reset for Everyday Vitality",
    category: "wellness",
    categoryLabel: "Nutrition",
    imageSrc: RETAIL_IMAGES.arcSupplementShelvingUnits,
    imageAlt: "ARC Wellness supplement shelving",
    intro:
      "Supplements can be powerful, but only when they're chosen carefully, dosed correctly, and aligned with the body's real needs. At Arc Wellness, supplements are supportive tools within a broader, physician-guided wellness plan, not generic retail products.",
    sections: [
      {
        heading: "Who Benefits Most from Supplement Support?",
        bullets: [
          "High-cognitive work, study, or emotional challenges",
          "Low energy, poor sleep, or chronic stress",
          "Recovery from illness, burnout, or hormonal imbalance",
          "Regular training or physically demanding routines",
          "Healthy aging, focus, and metabolic balance",
          "Extending benefits between IV, peptide, or body-based treatments",
        ],
      },
      {
        heading: "Core Supplement Offerings",
        body: "Clinically backed, pharmaceutical-grade formulations available exclusively through licensed medical providers, including Foundation, Gut Reset, Women's Longevity, and Brain Health protocols.",
      },
    ],
    faqs: [
      {
        id: "one",
        question: "Do I need to take all five supplements, or can I start with just one?",
        answer:
          "Your supplement plan is fully personalized. Some individuals may start with just one or two formulas based on their goals. Your provider will help determine what combination is most supportive for you.",
      },
      {
        id: "timing",
        question: "How long does it take to notice benefits from supplements?",
        answer:
          "Many people notice subtle changes in energy, focus, or sleep within a few weeks. Some benefits build gradually over time as part of a consistent, personalized wellness plan.",
      },
      {
        id: "standalone",
        question: "Can I use these supplements if I'm not receiving IV therapy or peptide treatments?",
        answer:
          "Absolutely. Our supplements are designed to support overall wellness and can be taken independently. They also complement IV therapy or peptides for those who are using them.",
      },
      {
        id: "which",
        question: "How do I know which supplements are right for me?",
        answer:
          "During your free consultation, your provider will review your health history, lifestyle, and wellness goals. Together, you'll select supplements that are safe, effective, and tailored to you.",
      },
    ],
  },
];

export function getTreatmentBySlug(slug: string): TreatmentPage | undefined {
  return allTreatments.find((t) => t.slug === slug);
}

export function getAllTreatmentSlugs(): string[] {
  return allTreatments.map((t) => t.slug);
}
