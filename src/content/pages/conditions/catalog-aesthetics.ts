import { defineCondition } from "@/content/pages/conditions/defineCondition";
import {
  conditionService,
  conditionServices,
} from "@/content/pages/conditions/serviceLinks";
import type { ConditionPageContent } from "@/content/pages/conditions/types";

export const CONDITION_CATALOG_AESTHETICS: readonly ConditionPageContent[] = [
  defineCondition({
    slug: "fine-lines-wrinkles",
    seo: {
      title: "Fine Lines & Wrinkles | Conditions | Arc Wellness",
      description:
        "Help your outward appearance reflect the vitality and confidence you feel inside with natural-looking, personalized aesthetic care.",
    },
    hero: {
      title: "Fine Lines & Wrinkles",
      subhead: "When the Reflection in the Mirror Starts to Change",
      paragraphs: [
        "Fine lines and wrinkles are a natural part of life. They tell the story of laughter, sunshine, family, and the experiences that have shaped who you are.",
        "But sometimes the face looking back at you doesn't reflect how vibrant, energized, and youthful you still feel inside.",
        "Changes in collagen, elastin, facial muscle tone, hydration, and the natural aging process can gradually soften definition and create lines that become more noticeable over time.",
        "We don't believe the goal is to erase every line. We believe the goal is helping you look refreshed, natural, and like the very best version of yourself.",
        "Understanding your skin and facial structure is the first step toward creating a personalized aesthetic plan designed around your goals.",
      ],
    },
    imagine: {
      title: "Imagine Looking as Vibrant as You Feel",
      paragraphs: [
        "Imagine seeing a refreshed version of yourself every time you look in the mirror.",
        "Imagine softening lines while preserving the expressions that make you uniquely you.",
        "Imagine looking well-rested, healthy, and naturally confident, without looking overdone.",
        "At Arc Wellness, our goal is to help you achieve natural-looking results that enhance your features, support healthy aging, and allow your confidence to shine through.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      groups: [
        {
          heading: "Aesthetic Treatments",
          services: [
            conditionService(
              "Daxxify®",
              "Relax the appearance of dynamic wrinkles while maintaining natural facial expression.",
            ),
            conditionService(
              "Dermal Fillers",
              "Restore subtle volume and facial balance for refreshed, natural-looking results.",
            ),
          ],
        },
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "EmFace®",
              "Support facial muscle tone while encouraging collagen and elastin production.",
            ),
            conditionService(
              "Exion Face®",
              "Promote firmer, smoother, healthier-looking skin through advanced radiofrequency technology.",
            ),
            conditionService(
              "RF Microneedling",
              "Stimulate collagen remodeling to improve skin texture, tone, and fine lines.",
            ),
            conditionService(
              "Clear RF",
              "Support skin rejuvenation with minimal downtime.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Aesthetic treatments should never change who you are.",
        "They should simply help your outward appearance reflect the vitality, confidence, and energy you already feel inside.",
        "Our philosophy is always natural-looking, personalized care that enhances, not changes, what makes you uniquely you.",
      ],
    },
  }),

  defineCondition({
    slug: "hair-loss",
    seo: {
      title: "Hair Loss | Conditions | Arc Wellness",
      description:
        "Healthy hair begins with understanding what your body may be trying to tell you. Create a personalized plan that supports hair and overall wellness.",
    },
    hero: {
      title: "Hair Loss",
      subhead: "When Your Hair Begins Telling a Bigger Story",
      paragraphs: [
        "Finding more hair in your brush, noticing a widening part, or seeing your hair become thinner over time can be frustrating and emotional.",
        "Hair often plays an important role in how we see ourselves. When it begins to change, it can affect confidence just as much as appearance.",
        "Hair loss is common, but it isn't always \"just genetics.\"",
        "Hormones, nutritional deficiencies, stress, medications, rapid weight loss, aging, thyroid health, inflammation, and metabolic changes can all influence the health of your hair.",
        "We believe healthy hair begins with understanding what your body may be trying to tell you.",
        "Looking deeper is the first step toward creating a personalized plan that supports both your hair and your overall wellness.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Confident Again",
      paragraphs: [
        "Imagine running your fingers through fuller, healthier-looking hair.",
        "Imagine feeling confident styling your hair without worrying about thinning areas.",
        "Imagine knowing you're supporting your body from the inside out, not simply masking the problem.",
        "At Arc Wellness, our goal is to help you better understand the factors influencing your hair health and create a personalized path that supports healthy growth, confidence, and long-term wellness.",
      ],
    },
    extras: [
      {
        title: "Hair Health Is More Than Skin Deep",
        paragraphs: [
          "Healthy hair depends on healthy cells, adequate nutrition, balanced hormones, and a body that has the nutrients it needs to grow and repair.",
          "Rapid weight loss, including weight loss achieved with GLP-1 medications, can sometimes contribute to temporary hair shedding. In many cases, the medication itself isn't the cause. Instead, reduced calorie intake, lower protein consumption, and inadequate intake of key vitamins and minerals can place additional stress on the hair growth cycle.",
          "Iron, vitamin D, zinc, biotin, essential fatty acids, protein, and other nutrients all play important roles in supporting healthy hair growth.",
          "Understanding why hair loss is occurring allows us to create a more personalized approach to supporting healthier hair over time.",
        ],
      },
      {
        title: "Did You Know?",
        paragraphs: [
          "Hair shedding after significant weight loss is more common than many people realize.",
          "Whether weight loss occurs naturally, after surgery, or while taking GLP-1 medications, the body may temporarily shift its resources toward essential functions during periods of rapid change. When combined with inadequate protein or nutritional deficiencies, this can lead to increased hair shedding several weeks or months later.",
          "The good news is that this type of hair loss is often temporary, especially when underlying nutritional needs are identified and addressed.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      groups: [
        {
          heading: "Restore & Optimize",
          services: conditionServices(
            "Hormone Health",
            "Metabolic Health",
            "Gut Health",
            "Longevity",
            "Medical Weight Loss",
          ),
        },
        {
          heading: "Advanced Therapies",
          services: conditionServices(
            "Peptide Therapy",
            "IV Infusions",
            "Supplements",
          ),
        },
        {
          heading: "Advanced Skin & Wellness Technologies",
          services: [
            conditionService(
              "Exion RF Microneedling®",
              "Support healthier skin quality as part of your overall appearance and rejuvenation goals.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Hair is often one of the body's earliest indicators that something may be out of balance.",
        "Rather than focusing only on the hair itself, we believe in understanding the whole person, because healthier hair often begins with supporting healthier hormones, better nutrition, balanced metabolism, and overall wellness.",
      ],
    },
  }),

  defineCondition({
    slug: "hyperpigmentation",
    seo: {
      title: "Hyperpigmentation | Conditions | Arc Wellness",
      description:
        "Understanding what's contributing to pigmentation is the first step toward a personalized plan for clearer, more even-looking skin.",
    },
    hero: {
      title: "Hyperpigmentation",
      subhead: "When Your Skin Tone No Longer Looks Even",
      paragraphs: [
        "Dark spots, sun spots, age spots, melasma, and discoloration are among the most common skin concerns we see.",
        "Sometimes they appear gradually over the years. Other times they seem to develop almost overnight after pregnancy, hormonal changes, acne, inflammation, or increased sun exposure.",
        "While these changes are common, they can make your skin appear older, uneven, or less vibrant than you feel.",
        "We don't believe healthy skin is about perfection. We believe it's about restoring clarity, confidence, and helping your skin reflect the vitality you feel inside.",
        "Understanding what's contributing to your pigmentation is the first step toward creating a personalized treatment plan.",
      ],
    },
    imagine: {
      title: "Imagine Seeing Brighter, More Even Skin",
      paragraphs: [
        "Imagine looking in the mirror and seeing skin that appears brighter, smoother, and more even.",
        "Imagine feeling comfortable without heavy makeup.",
        "Imagine feeling confident knowing your treatment plan is designed specifically for your skin, not a one-size-fits-all solution.",
        "At Arc Wellness, our goal is to help you achieve healthier-looking skin with natural-looking results that enhance your confidence while respecting your skin's unique needs.",
      ],
    },
    extras: [
      {
        title: "Not All Pigmentation Is the Same",
        paragraphs: [
          "Hyperpigmentation can develop for many different reasons, including sun exposure, hormonal changes including pregnancy and menopause, melasma, aging, acne or post-inflammatory skin changes, skin injuries or irritation, and certain medications.",
          "Because different types of pigmentation respond differently to treatment, identifying the underlying cause helps guide the most appropriate approach and supports better long-term results.",
        ],
      },
      {
        title: "Sun Spots or Melasma? Knowing the Difference Matters.",
        paragraphs: [
          "Not all dark spots are created equal.",
          "Some pigmentation is caused by years of sun exposure, while other discoloration is influenced by hormones, inflammation, or changes within the skin itself. Because each type of pigmentation responds differently to treatment, an accurate assessment is one of the most important steps in creating a successful treatment plan.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "Exion Face®",
              "Support healthier skin texture, tone, and overall skin quality through advanced radiofrequency technology.",
            ),
            conditionService(
              "Clear RF",
              "Target uneven pigmentation while promoting smoother, healthier-looking skin with minimal downtime.",
            ),
            conditionService(
              "RF Microneedling",
              "Stimulate collagen remodeling while improving overall skin tone, texture, and the appearance of post-inflammatory discoloration.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Hormone Health",
              "Support overall wellness when hormonal changes may be contributing to skin concerns.",
            ),
            conditionService(
              "Longevity",
              "Promote healthy aging from the inside out.",
            ),
          ],
        },
        {
          heading: "Advanced Therapies",
          services: [
            conditionService(
              "Supplements",
              "Support healthy skin through targeted nutritional support.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Healthy skin is about more than treating what's visible.",
        "It starts with understanding why your skin has changed and creating a personalized plan that supports healthier skin today while helping protect its appearance for the future.",
      ],
    },
  }),

  defineCondition({
    slug: "loose-skin",
    seo: {
      title: "Loose Skin | Conditions | Arc Wellness",
      description:
        "Understanding what is contributing to skin changes is the first step toward firmer, healthier-looking skin without chasing perfection.",
    },
    hero: {
      title: "Loose Skin",
      subhead: "When Your Skin Doesn't Feel as Firm as It Once Did",
      paragraphs: [
        "Our skin naturally changes over time.",
        "You may notice your jawline becoming softer, your neck losing definition, or the skin on your arms, abdomen, thighs, or knees feeling less firm than it once did. For others, loose skin becomes more noticeable after pregnancy or significant weight loss, including weight loss achieved with GLP-1 medications.",
        "These changes are common, but they can affect confidence just as much as the number on the scale.",
        "We don't believe loose skin is simply something you have to accept.",
        "Healthy skin depends on collagen, elastin, muscle support, hydration, nutrition, and the natural aging process. Understanding what is contributing to your skin changes is the first step toward creating a personalized treatment plan that supports firmer, healthier-looking skin.",
      ],
    },
    imagine: {
      title: "Imagine Feeling More Confident in Your Skin",
      paragraphs: [
        "Imagine looking in the mirror and seeing smoother, firmer skin that reflects the healthy lifestyle you've worked so hard to achieve.",
        "Imagine wearing sleeveless tops, shorts, or your favorite outfit with greater confidence.",
        "Imagine celebrating your body's journey while supporting healthier skin for the future.",
        "At Arc Wellness, our goal is to help you better understand your skin, uncover what's possible, and create a personalized treatment plan that supports natural-looking rejuvenation and renewed confidence.",
      ],
    },
    extras: [
      {
        title: "How Arc Wellness Looks Deeper",
        paragraphs: [
          "Every story deserves to be heard.",
          "At Arc Wellness, your journey begins with a complimentary consultation where we listen.",
          "We want to understand your concerns, where you've noticed changes, your medical history, weight loss journey, skincare routine, and the results you're hoping to achieve. Only after understanding your goals do we determine the next best steps, drawing from advanced aesthetic treatments, physician-guided care, and wellness services to create a personalized plan designed specifically for you.",
        ],
      },
      {
        title: "Why Does Skin Become Loose?",
        paragraphs: [
          "Skin firmness changes for many reasons, including natural aging, loss of collagen and elastin, pregnancy and childbirth, significant weight loss, weight loss while taking GLP-1 medications, sun damage, genetics, changes in muscle mass, and hormonal changes.",
          "In many cases, it's not one single factor, but several working together.",
          "Understanding the cause helps guide the most appropriate treatment plan and realistic expectations.",
        ],
      },
      {
        title: "Can Loose Skin Improve Without Surgery?",
        paragraphs: [
          "The answer depends on several factors, including your age, skin quality, the amount of skin laxity, and what caused it in the first place.",
          "For many people with mild to moderate skin laxity, non-surgical treatments that stimulate collagen and elastin production can noticeably improve skin firmness and texture over time. More significant skin laxity may require a combination of therapies, and in some cases, surgery may be the most appropriate option.",
          "Our goal is to recommend the approach that's right for you, based on your skin, your goals, and realistic expectations.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "RF Microneedling",
              "Stimulates your body's natural collagen and elastin production to improve skin firmness, texture, and overall skin quality on the face and body.",
            ),
            conditionService(
              "Clear RF",
              "Supports skin tightening and collagen remodeling with minimal downtime.",
            ),
            conditionService(
              "Exion Face®",
              "Helps improve skin firmness, elasticity, and facial definition through advanced radiofrequency technology.",
            ),
            conditionService(
              "EmFace®",
              "Supports facial muscle tone while encouraging collagen and elastin production for a naturally lifted appearance.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: conditionServices(
            "Hormone Health",
            "Longevity",
            "Medical Weight Loss",
          ),
        },
        {
          heading: "Advanced Therapies",
          services: conditionServices("Peptide Therapy", "Supplements"),
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Healthy, youthful-looking skin isn't about chasing perfection.",
        "It's about supporting your skin's natural ability to renew itself while helping your outward appearance reflect the strength, health, and vitality you feel inside.",
      ],
    },
  }),

  defineCondition({
    slug: "acne",
    seo: {
      title: "Acne | Conditions | Arc Wellness",
      description:
        "Healthy skin begins with understanding why breakouts are happening. Create a personalized plan that supports clearer skin from the inside out.",
    },
    hero: {
      title: "Acne",
      subhead: "When Breakouts Become More Than a Surface Problem",
      paragraphs: [
        "Acne isn't just a teenage concern.",
        "Many adults continue to experience breakouts well into their 20s, 30s, 40s, and beyond. For some, acne appears for the very first time during adulthood, often leaving them wondering why their skin has suddenly changed.",
        "Whether it's occasional breakouts, persistent blemishes, painful cystic acne, or lingering marks after a breakout heals, acne can affect confidence at every stage of life.",
        "We don't believe healthy skin begins with simply treating the blemish. Healthy skin begins with understanding why it's happening.",
        "Hormones, inflammation, stress, nutrition, skincare habits, genetics, and overall health can all influence your skin. Looking deeper allows us to create a personalized plan that supports healthier skin from the inside out.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Comfortable in Your Own Skin",
      paragraphs: [
        "Imagine waking up without worrying about your next breakout.",
        "Imagine feeling confident leaving the house without heavy makeup or constantly trying to cover blemishes.",
        "Imagine knowing you're supporting healthier skin, not just treating today's breakout.",
        "At Arc Wellness, our goal is to help you better understand your skin, uncover what's possible, and create a personalized plan that supports clearer, healthier-looking skin and lasting confidence.",
      ],
    },
    extras: [
      {
        title: "Why Does Acne Happen?",
        paragraphs: [
          "Acne can develop for many different reasons, including hormonal changes, increased oil production, inflammation, certain medications, stress, nutrition, genetics, skincare products, and changes in the skin's natural barrier.",
          "For many people, it's not just one factor. It's a combination of influences working together.",
          "Understanding those contributing factors helps us build a more personalized approach to healthier skin.",
        ],
      },
      {
        title: "Could Your Skin Be Trying to Tell You Something?",
        paragraphs: [
          "Persistent acne can sometimes be a sign that something deeper deserves attention.",
          "Hormonal changes, chronic stress, insulin resistance, gut health, nutritional deficiencies, and inflammation can all contribute to ongoing breakouts. While not every case of acne has an underlying medical cause, understanding the bigger picture can help guide a more personalized approach to improving skin health.",
        ],
      },
      {
        title: "It's Not Just About Today's Breakout",
        paragraphs: [
          "For many people, acne leaves behind more than temporary blemishes. It can result in lingering discoloration, textural changes, scarring, and a loss of confidence that persists long after the skin has healed.",
          "Our goal is not only to help support healthier skin today, but also to improve skin quality over time through personalized care that addresses both active breakouts and their lasting effects.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "RF Microneedling",
              "Help improve acne scars, refine skin texture, and stimulate healthy collagen remodeling.",
            ),
            conditionService(
              "Clear RF",
              "Support clearer, healthier-looking skin while improving overall skin quality.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: conditionServices(
            "Hormone Health",
            "Gut Health",
            "Metabolic Health",
          ),
        },
        {
          heading: "Advanced Therapies",
          services: conditionServices("Supplements", "Peptide Therapy"),
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Healthy skin isn't just about what you put on your face.",
        "It's influenced by what's happening throughout your body. By understanding the connections between hormones, nutrition, inflammation, gut health, lifestyle, and skincare, we can create a more personalized approach to supporting healthier skin and lasting confidence.",
      ],
    },
  }),

  defineCondition({
    slug: "acne-scars",
    seo: {
      title: "Acne Scars | Conditions | Arc Wellness",
      description:
        "Support your skin's natural healing process and restore confidence with personalized collagen-stimulating care for acne scars.",
    },
    hero: {
      title: "Acne Scars",
      subhead: "When the Breakouts Are Gone, but the Reminders Remain",
      paragraphs: [
        "For many people, the most difficult part of acne isn't the breakout itself. It's what gets left behind.",
        "Indented scars, uneven texture, lingering discoloration, and changes in skin tone can continue to affect confidence long after active acne has cleared.",
        "You may find yourself avoiding bright lighting, relying on makeup to camouflage scars, or feeling frustrated that your skin never fully recovered.",
        "We don't believe your skin's story ends with acne.",
        "Healthy skin has an incredible ability to renew itself, and supporting that natural healing process begins with understanding your skin and choosing the right treatment approach.",
      ],
    },
    imagine: {
      title: "Imagine Seeing Smoother, Healthier-Looking Skin",
      paragraphs: [
        "Imagine looking in the mirror and seeing skin that feels smoother, stronger, and more even.",
        "Imagine feeling comfortable in your own skin without focusing on the marks left behind by past breakouts.",
        "Imagine knowing your skin is continuing to improve with every step of your personalized treatment plan.",
        "At Arc Wellness, our goal is to help you support your skin's natural healing process while restoring confidence and achieving healthier-looking skin.",
      ],
    },
    extras: [
      {
        title: "Every Acne Scar Is Different",
        paragraphs: [
          "Not all acne scars respond to the same treatment.",
          "Some scars create shallow depressions in the skin, while others affect texture, tone, or leave behind lingering discoloration. Understanding the type and depth of your scarring helps guide the most appropriate treatment plan and realistic expectations.",
          "Improving acne scars is often a gradual process that focuses on stimulating your skin's natural repair and collagen production over time.",
        ],
      },
      {
        title: "Your Skin Can Continue to Improve",
        paragraphs: [
          "Many people assume acne scars are permanent or that nothing can be done once acne is gone. While every person's skin is different, modern collagen-stimulating treatments can often improve the appearance of scars, soften uneven texture, and support healthier skin over time.",
          "Because collagen remodeling happens gradually, meaningful improvement is typically achieved through a series of treatments and a personalized plan designed around your skin and your goals.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "RF Microneedling",
              "Stimulates your body's natural collagen production to improve acne scars, skin texture, and overall skin quality over time.",
            ),
            conditionService(
              "Clear RF",
              "Supports smoother skin, improves uneven texture, and promotes collagen remodeling with minimal downtime, helping reduce the appearance of acne scars and supporting healthier-looking skin.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Supplements",
              "Support healthy collagen production and overall skin health.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Healing doesn't stop when acne clears.",
        "Your skin is constantly renewing itself, and with the right support, it's possible to improve texture, stimulate collagen, and promote healthier-looking skin over time. Our focus is on creating natural-looking improvements that restore confidence while respecting your skin's unique journey.",
      ],
    },
  }),

  defineCondition({
    slug: "rosacea",
    seo: {
      title: "Rosacea | Conditions | Arc Wellness",
      description:
        "Managing rosacea begins with understanding what may be contributing to flare-ups and creating a personalized plan for calmer skin.",
    },
    hero: {
      title: "Rosacea",
      subhead: "When Your Skin Is Constantly Reacting",
      paragraphs: [
        "Rosacea is more than occasional facial redness.",
        "For many people, it can feel unpredictable. Your skin may flush easily, become persistently red, or develop visible blood vessels, bumps, or irritation that seems to appear without warning. Everyday activities like exercising, enjoying a hot cup of coffee, spending time in the sun, or experiencing stress may suddenly trigger a flare.",
        "These changes can be frustrating and may affect your confidence as much as your skin.",
        "We don't believe managing rosacea begins with simply covering the redness.",
        "Healthy skin begins with understanding what may be contributing to your flare-ups and creating a personalized plan that supports calmer, healthier-looking skin.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Comfortable in Your Own Skin",
      paragraphs: [
        "Imagine looking in the mirror and seeing calmer, healthier-looking skin.",
        "Imagine feeling confident going without heavy makeup or worrying about unexpected flare-ups.",
        "Imagine enjoying everyday activities knowing you have a personalized plan designed around your skin's unique needs.",
        "At Arc Wellness, our goal is to help you better understand your skin, uncover what's possible, and create a personalized path toward supporting healthier skin, greater comfort, and renewed confidence.",
      ],
    },
    extras: [
      {
        title: "Rosacea Is Different for Everyone",
        paragraphs: [
          "Rosacea affects each person differently.",
          "Some people primarily experience facial redness or flushing, while others notice visible blood vessels, bumps, dryness, burning, or increased skin sensitivity.",
          "Common triggers may include sun exposure, heat or temperature changes, emotional stress, spicy foods, alcohol, exercise, certain skincare products, and hormonal changes.",
          "Learning your unique triggers can be an important part of supporting healthier skin and reducing flare-ups over time.",
        ],
      },
      {
        title: "Looking Beyond the Surface",
        paragraphs: [
          "Rosacea isn't caused by poor hygiene, and it isn't simply \"sensitive skin.\"",
          "While the exact cause isn't fully understood, factors such as genetics, inflammation, environmental triggers, hormones, and skin barrier health may all play a role. For some individuals, gut health and lifestyle factors may also influence flare-ups.",
          "Our goal is to help you better understand your skin and develop a thoughtful, individualized approach to supporting healthier skin over time.",
          "Our goal isn't simply to calm today's flare-up. It's to better understand your skin so you can support its health for the long term.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "Clear RF",
              "Support healthier-looking skin while improving overall skin quality with minimal downtime.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: conditionServices(
            "Gut Health",
            "Hormone Health",
            "Longevity",
          ),
        },
        {
          heading: "Advanced Therapies",
          services: [
            conditionService(
              "Supplements",
              "Support overall skin health and help address nutritional factors that may influence skin wellness.",
            ),
          ],
        },
      ],
    },
  }),

  defineCondition({
    slug: "large-pores",
    seo: {
      title: "Large Pores | Conditions | Arc Wellness",
      description:
        "Improving collagen support and overall skin quality can help pores appear smaller and less noticeable over time.",
    },
    hero: {
      title: "Large Pores",
      subhead: "When Your Skin Doesn't Look as Smooth as It Feels",
      paragraphs: [
        "If you've ever looked in the mirror and wished your skin appeared smoother or more refined, you're not alone.",
        "Large or more noticeable pores are one of the most common cosmetic skin concerns. They often become more visible on the nose, cheeks, chin, and forehead, affecting the overall appearance and texture of the skin.",
        "While pore size is influenced in part by genetics, other factors such as aging, sun exposure, increased oil production, collagen loss, and previous acne can make pores appear larger over time.",
        "We don't believe healthy skin is about perfection. We believe it's about supporting healthier skin so it looks smoother, brighter, and naturally refreshed.",
        "Understanding what's contributing to changes in your skin is the first step toward creating a personalized treatment plan.",
      ],
    },
    imagine: {
      title: "Imagine Skin That Looks Smoother and More Refined",
      paragraphs: [
        "Imagine looking in the mirror and seeing healthier-looking skin with improved texture and a more refined appearance.",
        "Imagine applying less makeup because your skin already looks brighter and smoother.",
        "Imagine feeling confident knowing your treatment plan is designed to support your skin's long-term health, not just today's concerns.",
        "At Arc Wellness, our goal is to help you improve overall skin quality, creating a naturally refreshed appearance that reflects healthy, vibrant skin.",
      ],
    },
    extras: [
      {
        title: "Why Do Pores Become More Noticeable?",
        paragraphs: [
          "Several factors can influence the appearance of pores, including natural aging, loss of collagen and skin elasticity, increased oil production, sun damage, genetics, previous acne or acne scarring, and changes in overall skin texture.",
          "While we can't change your natural pore size, improving collagen support and overall skin quality can help pores appear smaller and less noticeable.",
        ],
      },
      {
        title: "Skin Quality Matters More Than Pore Size",
        paragraphs: [
          "Many people focus on making their pores \"disappear,\" but healthy skin is about much more than that.",
          "When collagen is supported and skin texture improves, pores often become less noticeable as the skin appears firmer, smoother, and more even. That's why our focus is on improving overall skin quality rather than chasing a single cosmetic concern.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "RF Microneedling",
              "Stimulates collagen production to improve skin texture, firmness, and the appearance of enlarged pores.",
            ),
            conditionService(
              "Clear RF",
              "Supports collagen remodeling while improving skin texture and creating a smoother, more refined appearance.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Hormone Health",
              "Support healthy skin through overall wellness and hormonal balance.",
            ),
            conditionService(
              "Longevity",
              "Promote healthy aging from the inside out.",
            ),
          ],
        },
        {
          heading: "Advanced Therapies",
          services: [
            conditionService(
              "Supplements",
              "Support healthy skin through targeted nutritional support.",
            ),
          ],
        },
      ],
    },
  }),

  defineCondition({
    slug: "double-chin",
    seo: {
      title: "Double Chin | Conditions | Arc Wellness",
      description:
        "Restore natural definition and help your appearance reflect the confidence and vitality you already feel inside.",
    },
    hero: {
      title: "Double Chin",
      subhead: "When Your Profile No Longer Reflects How You Feel",
      paragraphs: [
        "Changes beneath the chin are a natural part of aging, but they aren't always caused by weight gain.",
        "Over time, genetics, changes in skin elasticity, loss of collagen, muscle changes, and natural shifts in facial structure can all contribute to fullness beneath the chin or a less defined jawline. For some people, these changes develop even when they're at a healthy weight.",
        "You may notice it most in photographs, during video calls, or whenever you catch your reflection from the side.",
        "We don't believe a more youthful profile is about looking different. We believe it's about restoring natural definition and helping your appearance reflect the confidence and vitality you already feel inside.",
        "Understanding what's contributing to these changes is the first step toward creating a personalized treatment plan.",
      ],
    },
    imagine: {
      title: "Imagine Feeling More Confident from Every Angle",
      paragraphs: [
        "Imagine seeing a naturally defined jawline when you look in the mirror.",
        "Imagine smiling for photos without worrying about your profile.",
        "Imagine feeling refreshed, confident, and comfortable knowing your treatment plan was designed specifically for your goals.",
        "At Arc Wellness, our goal is to help you achieve natural-looking definition while supporting healthy skin, facial balance, and lasting confidence.",
      ],
    },
    extras: [
      {
        title: "More Than Just Weight",
        paragraphs: [
          "A \"double chin\" can be influenced by several factors, including genetics, natural aging, loss of collagen and skin elasticity, changes in facial muscle tone, weight gain or weight loss, body composition, and hormonal changes.",
          "Because several factors often contribute to changes beneath the chin, understanding the underlying cause helps us recommend the most appropriate approach and realistic expectations.",
        ],
      },
      {
        title: "A Personalized Approach to Facial Definition",
        paragraphs: [
          "Not every double chin has the same cause, and not every treatment is the right fit for every person.",
          "Some individuals benefit most from improving skin firmness and collagen production. Others may benefit from changes in body composition, strengthening facial support structures, or combining multiple therapies for more comprehensive results.",
          "Our goal is to recommend the approach that's right for your facial anatomy, your goals, and your vision of natural-looking results.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Aesthetic Technologies",
          services: [
            conditionService(
              "EmFace®",
              "Supports facial muscle tone and collagen production while improving the appearance of the lower face and jawline.",
            ),
            conditionService(
              "RF Microneedling",
              "Supports collagen remodeling and improves skin firmness in areas of mild skin laxity.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Medical Weight Loss",
              "Support healthy body composition when excess weight contributes to fullness beneath the chin.",
            ),
            conditionService(
              "Hormone Health",
              "Support overall wellness and healthy aging.",
            ),
            conditionService(
              "Longevity",
              "Promote healthy aging from the inside out.",
            ),
          ],
        },
        {
          heading: "Advanced Therapies",
          services: conditionServices("Peptide Therapy", "Supplements"),
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Facial rejuvenation isn't about changing your appearance.",
        "It's about restoring balance, definition, and confidence in a way that looks natural and uniquely you.",
        "At Arc Wellness, we believe the best results come from understanding the factors contributing to facial changes and creating a personalized plan that supports healthy aging while preserving what makes you, you.",
      ],
    },
  }),

  defineCondition({
    slug: "facial-volume-loss",
    seo: {
      title: "Facial Volume Loss | Conditions | Arc Wellness",
      description:
        "Restore balance, softness, and natural-looking contours that reflect the healthy, vibrant person you are.",
    },
    hero: {
      title: "Facial Volume Loss",
      subhead: "When Your Face No Longer Reflects Your Vitality",
      paragraphs: [
        "As we age, our faces naturally change.",
        "You may notice your cheeks appear flatter, your temples become more hollow, your lips lose fullness, or your facial contours become less defined. These changes often happen gradually, making you look more tired or older than you feel inside.",
        "Facial volume loss isn't simply about wrinkles. It's the result of natural changes in collagen, elastin, fat distribution, bone structure, and skin support that occur over time.",
        "We don't believe the goal is to change your face. We believe the goal is to restore balance, softness, and natural-looking contours that reflect the healthy, vibrant person you are.",
        "Understanding your facial anatomy and your aesthetic goals is the first step toward creating a personalized treatment plan.",
      ],
    },
    imagine: {
      title: "Imagine Looking Refreshed, Not Different",
      paragraphs: [
        "Imagine looking in the mirror and seeing a naturally refreshed version of yourself.",
        "Imagine restoring soft, youthful contours without looking overfilled or artificial.",
        "Imagine friends commenting that you look well-rested or healthy, without being able to tell exactly what's different.",
        "At Arc Wellness, our goal is to enhance your natural beauty with subtle, personalized treatments that restore harmony, confidence, and facial balance.",
      ],
    },
    extras: [
      {
        title: "Why Does Facial Volume Change?",
        paragraphs: [
          "Facial volume naturally changes throughout life due to loss of collagen and elastin, natural aging, changes in facial fat distribution, bone remodeling, weight loss, genetics, sun exposure, and hormonal changes.",
          "These changes are a normal part of aging, but they can influence how rested, youthful, and vibrant your face appears.",
        ],
      },
      {
        title: "Restoration, Not Transformation",
        paragraphs: [
          "Facial aging is rarely caused by just one change.",
          "Fine lines, skin quality, muscle tone, collagen loss, and volume changes all work together to influence your appearance. That's why we take a comprehensive approach, often combining treatments to achieve results that look balanced, refreshed, and natural.",
          "Our goal isn't to chase perfection. It's to help your appearance reflect the vitality and confidence you feel inside.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Facial Rejuvenation",
          services: [
            conditionService(
              "EmFace®",
              "Support facial muscle tone while stimulating collagen and elastin to enhance facial definition and support healthy aging.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Hormone Health",
              "Support healthy aging and overall wellness from the inside out.",
            ),
            conditionService(
              "Longevity",
              "Promote healthy aging that reflects both how you feel and how you look.",
            ),
          ],
        },
        {
          heading: "Advanced Therapies",
          services: [
            conditionService(
              "Supplements",
              "Support healthy collagen production and skin health.",
            ),
          ],
        },
      ],
    },
  }),

  defineCondition({
    slug: "sun-damage",
    seo: {
      title: "Sun Damage | Conditions | Arc Wellness",
      description:
        "Help restore your skin's natural radiance while supporting long-term skin health through personalized, physician-guided care.",
    },
    hero: {
      title: "Sun Damage",
      subhead: "When the Years Begin to Show on Your Skin",
      paragraphs: [
        "Time spent outdoors creates memories that last a lifetime, but over the years, it can also leave its mark on your skin.",
        "Sun exposure gradually affects the skin's collagen, elasticity, texture, and tone. You may notice dark spots, redness, rough patches, fine lines, wrinkles, or skin that simply doesn't appear as bright and healthy as it once did.",
        "These changes happen slowly, often becoming more noticeable with age.",
        "We don't believe healthy skin is about looking younger than you are. We believe it's about helping your skin look as healthy, vibrant, and refreshed as you feel.",
        "Understanding how sun exposure has affected your skin is the first step toward creating a personalized treatment plan that supports healthier skin for years to come.",
      ],
    },
    imagine: {
      title: "Imagine Healthier, More Radiant Skin",
      paragraphs: [
        "Imagine looking in the mirror and seeing brighter, smoother, healthier-looking skin.",
        "Imagine feeling confident with little or no makeup because your skin has a more even tone and youthful glow.",
        "Imagine knowing you're not only improving your skin today but also helping protect it for the future.",
        "At Arc Wellness, our goal is to help restore your skin's natural radiance while supporting long-term skin health through personalized, physician-guided care.",
      ],
    },
    extras: [
      {
        title: "Sun Damage Is More Than Skin Deep",
        paragraphs: [
          "Years of ultraviolet (UV) exposure can gradually affect your skin in ways that aren't always immediately visible.",
          "Common signs of sun damage include uneven skin tone, dark spots and age spots, fine lines and wrinkles, rough skin texture, loss of firmness, redness, dull-looking skin, and reduced collagen and elasticity.",
          "Because many of these changes develop over time, improving overall skin health often requires a comprehensive approach that focuses on both restoration and ongoing protection.",
        ],
      },
      {
        title: "Healthy Skin Is Protected Skin",
        paragraphs: [
          "Improving sun-damaged skin is only part of the journey.",
          "Daily sun protection, a personalized skincare routine, and ongoing skin health all play an important role in maintaining your results and supporting healthy skin for years to come. The best outcomes come from combining treatment with prevention.",
        ],
      },
      {
        title: "When Is It More Than Sun Damage?",
        paragraphs: [
          "Not every spot or skin change is simply a cosmetic concern.",
          "If you notice a new spot that changes in size, shape, color, bleeds, or doesn't heal, it's important to have it evaluated by an appropriate healthcare professional. While many signs of sun damage are cosmetic, protecting your skin also means paying attention to changes that deserve medical evaluation.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized aesthetic plan.",
      groups: [
        {
          heading: "Advanced Skin Rejuvenation",
          services: [
            conditionService(
              "RF Microneedling",
              "Stimulate your body's natural collagen remodeling to improve texture, fine lines, and signs of photoaging.",
            ),
            conditionService(
              "Clear RF",
              "Support healthier-looking skin by improving tone, texture, and overall skin rejuvenation with minimal downtime.",
            ),
          ],
        },
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Longevity",
              "Support healthy aging from the inside out.",
            ),
            conditionService(
              "Hormone Health",
              "Promote healthy skin through whole-body wellness.",
            ),
          ],
        },
        {
          heading: "Advanced Therapies",
          services: [
            conditionService(
              "Supplements",
              "Support healthy skin with nutrients that contribute to collagen production and overall skin wellness.",
            ),
          ],
        },
      ],
    },
  }),
];
