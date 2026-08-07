import { defineCondition } from "@/content/pages/conditions/defineCondition";
import {
  conditionService,
  conditionServices,
} from "@/content/pages/conditions/serviceLinks";
import type { ConditionPageContent } from "@/content/pages/conditions/types";

export const CONDITION_CATALOG_PELVIC: readonly ConditionPageContent[] = [
  defineCondition({
    slug: "recurrent-utis",
    seo: {
      title: "Recurrent UTIs | Conditions | Arc Wellness",
      description:
        "Recurring UTIs can be influenced by many factors. Develop a more personalized approach to long-term urinary wellness.",
    },
    hero: {
      title: "Recurrent UTIs",
      subhead: "When Urinary Tract Infections Keep Coming Back",
      paragraphs: [
        "One urinary tract infection can be frustrating. Recurrent infections can begin to affect your confidence, comfort, and quality of life.",
        "You may find yourself constantly worrying about the next infection, avoiding travel or intimacy, or feeling like you've been caught in a cycle of antibiotics without understanding why it keeps happening.",
        "We don't believe recurring urinary tract infections should simply be accepted as \"something you'll always have.\"",
        "Recurring UTIs can be influenced by many factors, including hormonal changes, pelvic floor health, vaginal health, and your body's natural protective defenses. Understanding those contributing factors is the first step toward developing a more personalized approach to long-term urinary wellness.",
      ],
    },
    imagine: {
      title: "Imagine Living Without Constant Worry",
      paragraphs: [
        "Imagine planning a vacation without wondering where the nearest restroom is.",
        "Imagine enjoying intimacy without fear of another infection.",
        "Imagine feeling comfortable, confident, and no longer waiting for symptoms to return.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your urinary, vaginal, and overall wellness.",
      ],
    },
    extras: [
      {
        title: "Supporting the Whole You",
        paragraphs: [
          "If you're experiencing symptoms of a urinary tract infection, prompt medical evaluation and treatment are important.",
          "For those experiencing recurrent UTIs, Arc Wellness focuses on identifying potential contributing factors and supporting your overall urinary and vaginal health through a personalized, physician-guided approach designed to complement your medical care and help reduce recurring concerns.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "Hormone Health",
        "Gut Health",
        "Longevity",
        "Supplements",
        "Peptide Therapy",
        "EmSella®",
      ),
    },
  }),

  defineCondition({
    slug: "pelvic-floor-weakness",
    seo: {
      title: "Pelvic Floor Weakness | Conditions | Arc Wellness",
      description:
        "Understanding what's contributing to pelvic floor changes is the first step toward supporting pelvic health and quality of life.",
    },
    hero: {
      title: "Pelvic Floor Weakness",
      subhead: "When the Muscles You Never Think About Begin to Matter",
      paragraphs: [
        "Your pelvic floor is a group of muscles that quietly supports some of your body's most important daily functions. These muscles help support your bladder and bowel, contribute to core stability, play a role in sexual health, and help you move through life with confidence.",
        "When the pelvic floor becomes weakened, everyday activities like laughing, coughing, exercising, lifting, or even standing for long periods may not feel the same.",
        "Pelvic floor weakness can affect both women and men at different stages of life. Pregnancy, childbirth, aging, hormonal changes, prostate surgery, chronic straining, and other factors can all influence pelvic floor function.",
        "We don't believe changes in bladder control or pelvic floor strength should simply be accepted as a normal part of aging.",
        "Understanding what's contributing to these changes is the first step toward supporting your pelvic health and improving your quality of life.",
      ],
    },
    imagine: {
      title: "Imagine Moving Through Life with Confidence",
      paragraphs: [
        "Pelvic floor health is about much more than bladder control. It's about feeling confident during everyday activities, staying active, maintaining your independence, and enjoying life without constantly thinking about your symptoms.",
        "When your pelvic floor is properly supported, everyday moments can become easier, more comfortable, and more enjoyable.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward improving pelvic health, strength, and overall quality of life.",
      ],
    },
    extras: [
      {
        title: "Pelvic Floor Weakness Can Look Different for Everyone",
        paragraphs: [],
        bulletGroups: [
          {
            heading: "Women may experience",
            items: [
              "Leakage when laughing, coughing, or exercising",
              "Urinary urgency or frequency",
              "Changes after pregnancy, childbirth, or menopause",
              "Reduced pelvic support",
            ],
          },
          {
            heading: "Men may experience",
            items: [
              "Urinary leakage",
              "Urgency or frequency",
              "Changes following prostate surgery",
              "Decreased pelvic floor strength",
            ],
          },
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "EmSella®",
        "Hormone Health",
        "Longevity",
        "Supplements",
        "Peptide Therapy",
      ),
    },
  }),

  defineCondition({
    slug: "urinary-incontinence",
    seo: {
      title: "Urinary Incontinence | Conditions | Arc Wellness",
      description:
        "Urinary incontinence can have many contributing factors. Find a personalized path toward supporting bladder health and quality of life.",
    },
    hero: {
      title: "Urinary Incontinence",
      subhead: "When Bladder Leaks Begin to Affect Your Life",
      paragraphs: [
        "A few drops when you laugh. Leaking when you cough or exercise. Rushing to the restroom and worrying you won't make it in time.",
        "Urinary incontinence is more common than many people realize, yet it's something many people feel uncomfortable talking about.",
        "It can affect your confidence, your daily routine, your ability to travel, exercise, or simply enjoy time with family and friends.",
        "We don't believe bladder leaks should simply be accepted as \"part of getting older.\"",
        "Urinary incontinence can have many contributing factors, including pelvic floor weakness, hormonal changes, aging, prostate surgery, certain medical conditions, and other underlying health concerns. Understanding what's contributing to your symptoms is the first step toward finding a personalized path forward.",
      ],
    },
    imagine: {
      title: "Imagine Living Without Constant Worry",
      paragraphs: [
        "Imagine laughing without hesitation. Taking a walk without planning every restroom stop. Traveling with confidence. Exercising without concern. Living your day without constantly thinking about your bladder.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting bladder health, pelvic function, and your overall quality of life.",
      ],
    },
    extras: [
      {
        title: "Urinary Incontinence Isn't One-Size-Fits-All",
        paragraphs: [
          "Stress Incontinence: Leaks that occur with coughing, sneezing, laughing, lifting, or exercise.",
          "Urgency Incontinence: A sudden, difficult-to-control urge to urinate that may result in leakage before reaching the restroom.",
          "Mixed Incontinence: A combination of stress and urgency symptoms.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "EmSella®",
        "Hormone Health",
        "Longevity",
        "Supplements",
        "Peptide Therapy",
      ),
    },
  }),

  defineCondition({
    slug: "post-prostatectomy-incontinence",
    seo: {
      title: "Post-Prostatectomy Incontinence | Conditions | Arc Wellness",
      description:
        "Support recovery after prostate surgery with a personalized plan for pelvic floor strength, bladder control, and quality of life.",
    },
    hero: {
      title: "Post-Prostatectomy Incontinence",
      subhead: "When Life After Prostate Surgery Isn't What You Expected",
      paragraphs: [
        "Prostate surgery is often an important step toward protecting your health. But for many men, recovery brings an unexpected challenge: urinary leakage that affects everyday life.",
        "Whether it's leaking when you stand, cough, laugh, exercise, or simply feeling like you can't trust your bladder the way you once did, post-prostatectomy incontinence can impact your confidence, independence, and quality of life.",
        "You're not alone. Many men believe this is simply something they have to live with after prostate surgery, but that's not always the case.",
        "We don't believe urinary leakage should define the next chapter of your life.",
        "Understanding your symptoms and the health of your pelvic floor is the first step toward developing a personalized plan designed to support your recovery and help you regain confidence.",
      ],
    },
    imagine: {
      title: "Imagine Getting Back to the Life You Love",
      paragraphs: [
        "Imagine enjoying a round of golf without worrying about leaks. Traveling with confidence. Working in the yard. Going to dinner. Playing with your grandchildren. Simply living your day without constantly thinking about your bladder.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting pelvic floor strength, bladder control, and your overall quality of life.",
      ],
    },
    extras: [
      {
        title: "Supporting Your Recovery",
        paragraphs: [
          "Recovery after prostate surgery looks different for every man.",
          "While your urologist plays the primary role in managing your surgical care, Arc Wellness focuses on supporting your recovery through a personalized, physician-guided approach designed to complement your existing treatment plan and improve your overall wellness and quality of life.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "EmSella®",
        "Hormone Health",
        "Longevity",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "physical-performance",
    seo: {
      title: "Physical Performance | Conditions | Arc Wellness",
      description:
        "Your strength, endurance, mobility, and recovery are influenced by many interconnected factors. Build a stronger, healthier future.",
    },
    hero: {
      title: "Physical Performance",
      subhead: "When Your Body Doesn't Keep Up the Way It Used To",
      paragraphs: [
        "Physical performance isn't just about how much weight you can lift. It's about having the strength, endurance, and confidence to fully enjoy your life.",
        "Whether you're keeping up with your children, walking the golf course, working in the yard, exercising, or simply getting through a busy day, your body should help you enjoy life, not hold you back.",
        "Over time, you may notice that everyday activities require more effort than they once did. You tire more easily, recover more slowly, lose strength, or find yourself avoiding activities you once enjoyed.",
        "We don't believe declining physical performance should simply be accepted as an inevitable part of aging.",
        "Your strength, endurance, mobility, and recovery are influenced by many interconnected factors. Understanding what's contributing to those changes is the first step toward building a stronger, healthier future.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Stronger Every Day",
      paragraphs: [
        "Imagine having the strength to keep up with the people and activities you love.",
        "Imagine feeling energized after a busy day instead of completely exhausted.",
        "Imagine recovering more quickly, moving with confidence, and trusting your body to support the life you want to live.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting strength, endurance, mobility, and long-term physical vitality.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "Longevity",
        "Hormone Health",
        "Metabolic Health",
        "Medical Weight Loss",
        "Peptide Therapy",
        "IV Infusions",
        "Supplements",
        "EmSculpt Neo®",
        "EmSella®",
        "ExoMind®",
      ),
    },
  }),

  defineCondition({
    slug: "intimacy-sexual-wellness",
    seo: {
      title: "Intimacy & Sexual Wellness | Conditions | Arc Wellness",
      description:
        "Intimacy deserves to be part of the conversation. Create a personalized path that supports health, relationships, and quality of life.",
    },
    hero: {
      title: "Intimacy & Sexual Wellness",
      subhead: "When Intimacy Doesn't Feel the Way It Used To",
      paragraphs: [
        "Intimacy is an important part of overall wellness. It's about connection, confidence, closeness, and feeling comfortable in your own body.",
        "Over time, changes in hormones, aging, stress, medical conditions, medications, or pelvic floor health can affect desire, comfort, performance, and intimacy for both women and men.",
        "These changes are common, but that doesn't mean you have to simply accept them.",
        "We believe intimacy deserves to be part of the conversation.",
        "Understanding what's contributing to these changes is the first step toward creating a personalized path that supports your health, your relationships, and your quality of life.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Connected Again",
      paragraphs: [
        "Imagine looking forward to intimacy instead of worrying about it.",
        "Imagine feeling confident, comfortable, and more like yourself.",
        "Imagine having the energy, desire, and confidence to strengthen the connection with your partner and enjoy an important part of life that contributes to your overall well-being.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting intimate wellness, confidence, and healthy relationships.",
      ],
    },
    extras: [
      {
        title: "What This Looks Like",
        paragraphs: [],
        bulletGroups: [
          {
            heading: "What this looks like for Women",
            items: [
              "Low Libido",
              "Vaginal Dryness",
              "Painful Intimacy",
              "Pelvic Floor Weakness",
              "Recurrent UTIs",
              "Urinary Incontinence",
              "Menopause & Intimacy",
            ],
          },
          {
            heading: "What this looks like for Men",
            items: [
              "Erectile Dysfunction",
              "Low Libido",
              "Post-Prostatectomy Incontinence",
              "Pelvic Floor Weakness",
              "Testosterone Deficiency Symptoms",
            ],
          },
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
            "Longevity",
            "Metabolic Health",
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
          heading: "Advanced Wellness Technologies",
          services: [
            conditionService(
              "EmSella®",
              "Support pelvic floor strength, bladder control, confidence, and intimate wellness.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Intimacy is more than physical.",
        "It's about confidence. It's about connection. It's about feeling comfortable in your own body.",
        "Because your relationships, and your quality of life, deserve the same attention as every other aspect of your health.",
      ],
    },
  }),

  defineCondition({
    slug: "male-hormonal-changes",
    seo: {
      title: "Men's Hormonal Changes | Conditions | Arc Wellness",
      description:
        "Hormonal changes are one of many factors that can influence energy, strength, mood, metabolism, and vitality. Understand the bigger picture.",
    },
    hero: {
      title: "Men's Hormonal Changes",
      subhead: "When You Don't Feel Like the Man You Used to Be",
      paragraphs: [
        "Many men don't notice hormonal changes overnight. Instead, they happen gradually.",
        "Energy begins to fade. Building or maintaining muscle becomes more difficult. Recovery takes longer. Motivation isn't what it once was. Sleep changes. Weight starts to accumulate around the midsection. Intimacy may not feel the same, and the confidence that once came naturally can begin to slip away.",
        "It's easy to assume these changes are simply part of getting older. But growing older doesn't have to mean settling for feeling older.",
        "We believe the way you feel deserves to be understood, not dismissed. Hormonal changes are one of many factors that can influence your energy, strength, mood, metabolism, and overall vitality. Understanding the bigger picture is the first step toward creating a personalized plan that supports your health today and for years to come.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Like Yourself Again",
      paragraphs: [
        "Imagine waking up feeling refreshed and ready for the day.",
        "Imagine having the strength and energy to keep up with work, family, hobbies, and the activities you enjoy.",
        "Imagine feeling mentally sharp, physically capable, and confident in your body again.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting healthy hormone balance, strength, vitality, and long-term wellness.",
      ],
    },
    extras: [
      {
        title:
          "Hormonal Changes Are a Normal Part of Aging, But How You Feel Matters",
        paragraphs: [
          "As men age, hormone levels naturally change. While some changes are expected, feeling constantly fatigued, losing strength, struggling with motivation, or experiencing changes in intimacy shouldn't simply be dismissed as \"just getting older.\" Understanding what's contributing to these changes can help you make informed decisions about your health.",
        ],
      },
      {
        title: "Could Hormonal Changes Be Playing a Role?",
        paragraphs: [
          "Every man's experience is different, but hormonal changes may contribute to:",
        ],
        bullets: [
          "Persistent fatigue or low energy",
          "Loss of muscle strength or endurance",
          "Increased body fat, especially around the abdomen",
          "Slower recovery after exercise or physical activity",
          "Reduced motivation or drive",
          "Difficulty concentrating or brain fog",
          "Mood changes or irritability",
          "Lower sex drive",
          "Changes in erectile function",
          "Poor sleep or feeling less rested",
          "Feeling less confident or less like yourself",
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
            "Longevity",
            "Brain Health",
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
          heading: "Advanced Wellness Technologies",
          services: [
            conditionService(
              "EmSella®",
              "Support pelvic floor strength, bladder control, confidence, and intimate wellness.",
            ),
            conditionService(
              "EmSculpt Neo®",
              "Support muscle strength, body composition, and healthy aging.",
            ),
            conditionService(
              "ExoMind™",
              "Support focus, mental resilience, motivation, and cognitive performance as part of your overall wellness journey.",
            ),
          ],
        },
      ],
    },
    related: {
      title: "Related Men's Health Topics",
      intro:
        "Explore other concerns that are commonly connected to men's hormonal health.",
      items: [
        { label: "Physical Performance", href: "/conditions/physical-performance" },
        { label: "Muscle Loss", href: "/conditions/muscle-loss" },
        { label: "Weight Gain", href: "/conditions/weight-gain" },
        { label: "Brain Fog", href: "/conditions/brain-fog" },
        { label: "Poor Recovery", href: "/conditions/poor-recovery" },
        {
          label: "Post-Prostatectomy Incontinence",
          href: "/conditions/post-prostatectomy-incontinence",
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Healthy hormones are about much more than one lab value.",
        "They're part of a complex system that influences how you think, move, sleep, recover, and experience life. At Arc Wellness, we believe the goal isn't simply to optimize testosterone. It's to understand the whole person and create a personalized plan that supports lasting health, vitality, and confidence.",
      ],
    },
  }),

  defineCondition({
    slug: "womens-hormones",
    seo: {
      title: "Women's Hormonal Changes | Conditions | Arc Wellness",
      description:
        "Hormonal changes are one of many factors that influence your overall health. Create a personalized plan that supports you through every stage of life.",
    },
    hero: {
      title: "Women's Hormonal Changes",
      subhead: "When You Don't Feel Like Yourself Anymore",
      paragraphs: [
        "Hormonal changes are a natural part of every woman's life, but they don't always feel natural when you're living through them.",
        "You may notice changes in your energy, mood, sleep, weight, memory, or the way your body responds to exercise and stress. Hot flashes, night sweats, brain fog, vaginal dryness, changes in intimacy, or simply feeling like you've lost a part of yourself can leave you wondering what happened.",
        "These changes often begin gradually and can affect women long before menopause. They may continue during menopause and beyond, influencing how you feel physically, emotionally, and mentally.",
        "We don't believe you should have to simply \"push through\" or accept feeling unlike yourself.",
        "Hormonal changes are one of many factors that influence your overall health. Understanding what's happening within your body is the first step toward creating a personalized plan that supports your health today and for years to come.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Like Yourself Again",
      paragraphs: [
        "Imagine waking up feeling rested. Thinking clearly. Feeling comfortable and confident in your body. Having the energy to enjoy your family, career, hobbies, and the moments that matter most.",
        "Imagine moving through each day feeling balanced, resilient, and more like yourself again.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting healthy hormone balance, vitality, confidence, and long-term wellness.",
      ],
    },
    extras: [
      {
        title: "Could Hormonal Changes Be Playing a Role?",
        paragraphs: [
          "Every woman's experience is unique, but hormonal changes may contribute to:",
        ],
        bullets: [
          "Hot flashes and night sweats",
          "Persistent fatigue or low energy",
          "Weight gain or difficulty losing weight",
          "Brain fog or memory changes",
          "Mood changes, anxiety, or irritability",
          "Poor sleep or waking throughout the night",
          "Reduced muscle strength or slower recovery",
          "Vaginal dryness or discomfort",
          "Changes in sexual desire or intimacy",
          "Irregular menstrual cycles or heavy periods",
          "Feeling unlike yourself",
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
            "Brain Health",
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
          heading: "Advanced Wellness Technologies",
          services: [
            conditionService(
              "EmSella®",
              "Support pelvic floor strength, bladder control, intimate wellness, and confidence.",
            ),
            conditionService(
              "EmSculpt Neo®",
              "Support muscle strength, body composition, and healthy aging.",
            ),
            conditionService(
              "ExoMind™",
              "Support focus, emotional resilience, and cognitive performance as part of your overall wellness journey.",
            ),
          ],
        },
      ],
    },
    related: {
      title: "Related Women's Health Topics",
      intro:
        "Explore other concerns that are commonly connected to women's hormonal health.",
      items: [
        { label: "Brain Fog", href: "/conditions/brain-fog" },
        { label: "Weight Gain", href: "/conditions/weight-gain" },
        {
          label: "Urinary Incontinence",
          href: "/conditions/urinary-incontinence",
        },
        {
          label: "Pelvic Floor Weakness",
          href: "/conditions/pelvic-floor-weakness",
        },
        { label: "Recurrent UTIs", href: "/conditions/recurrent-utis" },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Healthy hormones influence far more than your reproductive health.",
        "They play an important role in your energy, mood, metabolism, sleep, brain function, muscle health, pelvic health, intimacy, and long-term well-being. At Arc Wellness, we believe the goal isn't simply to balance hormones. It's to understand the whole person and create a personalized plan that helps you thrive through every stage of life.",
      ],
    },
  }),
];
