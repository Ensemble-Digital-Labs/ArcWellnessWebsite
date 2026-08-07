import { defineCondition } from "@/content/pages/conditions/defineCondition";
import { conditionServices } from "@/content/pages/conditions/serviceLinks";
import type { ConditionPageContent } from "@/content/pages/conditions/types";

export const CONDITION_CATALOG_MIND: readonly ConditionPageContent[] = [
  defineCondition({
    slug: "chronic-fatigue",
    seo: {
      title: "Chronic Fatigue | Conditions | Arc Wellness",
      description:
        "Persistent fatigue is often your body's way of telling you that something isn't working as well as it could. Understand why and restore your energy.",
    },
    hero: {
      title: "Chronic Fatigue",
      subhead: "When Rest Doesn't Feel Restorative",
      paragraphs: [
        "You get through the day, but it takes everything you've got. You wake up tired, rely on caffeine to keep going, and wonder why your energy never seems to return, even after a full night's sleep.",
        "Living with chronic fatigue can make everyday tasks feel overwhelming and leave you feeling like you're missing out on the life you want to live.",
        "We don't believe feeling exhausted should simply become your new normal.",
        "Persistent fatigue is often your body's way of telling you that something isn't working as well as it could. Understanding why is the first step toward restoring your energy and helping you feel like yourself again.",
      ],
    },
    imagine: {
      title: "Imagine Waking Up Refreshed Again",
      paragraphs: [
        "Energy is more than simply making it through the day. It affects your ability to enjoy time with your family, pursue the things you love, stay active, think clearly, and feel present in your everyday life.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward restoring your energy and helping you live life more fully.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Hormone Health",
        "Metabolic Health",
        "Gut Health",
        "Brain Health",
        "Longevity",
        "Medical Weight Loss",
        "IV Infusions",
        "Peptide Therapy",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "poor-focus",
    seo: {
      title: "Poor Focus | Conditions | Arc Wellness",
      description:
        "Difficulty focusing is often your body's way of signaling that something may be out of balance. Understand why and restore mental clarity.",
    },
    hero: {
      title: "Poor Focus",
      subhead: "When Staying Focused Feels Like a Constant Struggle",
      paragraphs: [
        "You start one task only to find yourself distracted by another. Conversations become harder to follow, your to-do list keeps growing, and it feels like your mind is constantly racing in different directions.",
        "Difficulty focusing can leave you feeling frustrated, unproductive, and wondering why everyday tasks suddenly seem more challenging than they used to.",
        "We don't believe you should have to settle for feeling mentally scattered.",
        "Difficulty focusing is often your body's way of signaling that something may be out of balance, and understanding why is the first step toward restoring mental clarity and confidence.",
      ],
    },
    imagine: {
      title: "Imagine Feeling More Focused Again",
      paragraphs: [
        "The ability to focus affects nearly every part of your life, from your performance at work to your relationships, productivity, and confidence. When your mind feels clear, everyday tasks become easier, conversations feel more engaging, and you can spend more time enjoying life instead of feeling like you're constantly trying to catch up.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward helping you feel more focused, present, and confident every day.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Gut Health",
        "Metabolic Health",
        "ExoMind®",
        "IV Infusions",
        "Peptide Therapy",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "adhd",
    seo: {
      title: "ADHD | Conditions | Arc Wellness",
      description:
        "Arc Wellness supports overall health for people living with ADHD through a personalized, physician-guided approach that complements your existing care.",
    },
    hero: {
      title: "ADHD",
      subhead: "Looking Beyond the Diagnosis",
      paragraphs: [
        "Living with ADHD can affect far more than your ability to focus. It can influence your productivity, relationships, energy, sleep, and overall sense of well-being. Whether you've lived with ADHD for years or have recently been diagnosed, it can be frustrating to feel like you're constantly working harder just to keep up.",
        "We believe every person's experience is unique.",
        "While ADHD is a complex neurodevelopmental condition, many factors can influence how you feel and function each day. Understanding your overall health can be an important part of supporting your long-term wellness.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Better Equipped for Everyday Life",
      paragraphs: [
        "When your overall health is supported, it can become easier to navigate the demands of daily life with greater confidence and resilience. Small improvements in sleep, energy, nutrition, and overall well-being can have a meaningful impact on how you feel each day.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your overall wellness and helping you thrive.",
      ],
    },
    extras: [
      {
        title: "How Arc Wellness Looks Deeper",
        paragraphs: [
          "Every story deserves to be heard.",
          "At Arc Wellness, your journey begins with a complimentary consultation where we listen.",
          "We want to understand what you're experiencing, how it's affecting your daily life, what you've already tried, and what you're hoping to achieve. Only after understanding your story do we determine the next best steps, drawing from the full range of resources available at Arc Wellness, from advanced testing and innovative therapies to nutrition, lifestyle guidance, and wellness technologies, to create a personalized Blueprint designed around you.",
          "Our approach is designed to complement, not replace, the care you receive from your primary care provider or mental health professional by helping you optimize the aspects of your health that support overall wellness.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Gut Health",
        "Metabolic Health",
        "ExoMind®",
        "IV Infusions",
        "Peptide Therapy",
        "Supplements",
      ),
    },
    disclaimer:
      "ADHD is a medical diagnosis that should be evaluated and managed by a qualified healthcare professional. Arc Wellness does not replace that care. Our role is to support your overall health and wellness through a personalized, physician-guided approach that complements your existing treatment plan when appropriate.",
  }),

  defineCondition({
    slug: "memory-concerns",
    seo: {
      title: "Memory Concerns | Conditions | Arc Wellness",
      description:
        "Changes in memory can sometimes signal that something may be out of balance. Support lifelong brain health with a personalized Arc Blueprint.",
    },
    hero: {
      title: "Memory Concerns",
      subhead: "When Forgetfulness Becomes More Than an Occasional Moment",
      paragraphs: [
        "Forgetting where you left your keys happens to everyone. But when you begin forgetting appointments, struggling to recall conversations, searching for familiar words, or feeling like your memory isn't as sharp as it once was, it's natural to wonder what's changing.",
        "Memory concerns can be unsettling, affecting your confidence, independence, and peace of mind.",
        "We don't believe you should ignore those concerns or simply assume they're an inevitable part of aging.",
        "Changes in memory can sometimes be your body's way of signaling that something may be out of balance, and understanding why is the first step toward supporting lifelong brain health.",
      ],
    },
    imagine: {
      title: "Imagine Feeling More Confident in Your Mind",
      paragraphs: [
        "Your memories are part of who you are. Feeling mentally sharp helps you stay connected to the people you love, enjoy meaningful conversations, remain independent, and confidently navigate everyday life.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting long-term brain health and helping you feel confident in your cognitive wellness.",
      ],
    },
    extras: [
      {
        title: "Supporting Your Cognitive Health",
        paragraphs: [
          "Memory concerns can have many possible causes and should always be discussed with a qualified healthcare professional. While Arc Wellness is not a neurology practice and does not diagnose or treat neurodegenerative conditions, we take a comprehensive, physician-guided approach to supporting overall brain health and identifying opportunities to optimize your wellness.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Gut Health",
        "Metabolic Health",
        "Longevity",
        "ExoMind®",
        "IV Infusions",
        "Peptide Therapy",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "sleep-concerns",
    seo: {
      title: "Sleep Concerns | Conditions | Arc Wellness",
      description:
        "Sleep concerns are often your body's way of signaling that something may be out of balance. Restore healthier, more restorative sleep.",
    },
    hero: {
      title: "Sleep Concerns",
      subhead: "When Rest Doesn't Leave You Feeling Rested",
      paragraphs: [
        "Whether you struggle to fall asleep, wake frequently during the night, or wake up feeling like you barely slept at all, poor sleep can affect every part of your life.",
        "When restful sleep becomes difficult, it can impact your energy, mood, focus, memory, metabolism, and overall well-being, making even the simplest days feel more challenging.",
        "We don't believe restless nights should become something you simply learn to live with.",
        "Sleep concerns are often your body's way of signaling that something may be out of balance, and understanding why is the first step toward restoring healthier, more restorative sleep.",
      ],
    },
    imagine: {
      title: "Imagine Waking Up Rested Again",
      paragraphs: [
        "Quality sleep is the foundation of good health. When you're well-rested, you have more energy, think more clearly, manage stress more effectively, and feel better equipped to enjoy the people and moments that matter most.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward more restful nights and healthier, more energized days.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Gut Health",
        "Metabolic Health",
        "Longevity",
        "Peptide Therapy",
        "ExoMind®",
        "IV Infusions",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "anxiety",
    seo: {
      title: "Anxiety | Conditions | Arc Wellness",
      description:
        "Understanding your overall health may be an important part of supporting long-term wellness when worry begins to take over.",
    },
    hero: {
      title: "Anxiety",
      subhead: "When Worry Begins to Take Over",
      paragraphs: [
        "Everyone feels anxious from time to time. But when worry becomes constant, your mind won't slow down, or you find yourself feeling overwhelmed more often than not, it can begin to affect every part of your life.",
        "Anxiety doesn't just affect your thoughts. It can influence your sleep, energy, focus, relationships, and overall sense of well-being.",
        "While anxiety is a complex condition, understanding your overall health may be an important part of supporting your long-term wellness and helping you feel more like yourself again.",
      ],
    },
    imagine: {
      title: "Imagine Feeling More at Ease",
      paragraphs: [
        "Feeling your best isn't about eliminating every stressful moment. It's about having the resilience, balance, and support to navigate life's challenges with greater confidence and peace of mind.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your overall wellness so you can live with greater balance and confidence.",
      ],
    },
    extras: [
      {
        title: "Supporting the Whole You",
        paragraphs: [
          "If you're experiencing anxiety, you deserve compassionate, comprehensive care. While anxiety should be evaluated and managed by a qualified healthcare professional when appropriate, Arc Wellness focuses on supporting your overall health through a personalized, physician-guided approach designed to complement your existing treatment plan and help you feel your best.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Gut Health",
        "Sleep Health",
        "ExoMind®",
        "IV Infusions",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "depression",
    seo: {
      title: "Depression | Conditions | Arc Wellness",
      description:
        "Arc Wellness supports overall health through a personalized approach designed to complement your existing treatment plan for depression.",
    },
    hero: {
      title: "Depression",
      subhead: "When Joy Feels Out of Reach",
      paragraphs: [
        "There are seasons in life when happiness feels harder to find. You may feel persistently sad, emotionally numb, disconnected from the people you love, or simply not like yourself anymore. Even the things that once brought you joy may begin to feel overwhelming or unimportant.",
        "Depression can affect every part of your life, from your energy and motivation to your sleep, relationships, and overall well-being.",
        "While depression is a complex condition, understanding your overall health may be an important part of supporting your long-term wellness and helping you move toward feeling like yourself again.",
      ],
    },
    imagine: {
      title: "Imagine Rediscovering Joy",
      paragraphs: [
        "Feeling better doesn't mean every day will be perfect. It means having more good days than difficult ones, reconnecting with the people and activities you love, and feeling hopeful about what's ahead.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your overall wellness so you can begin moving forward with renewed hope and confidence.",
      ],
    },
    extras: [
      {
        title: "Supporting the Whole You",
        paragraphs: [
          "If you're experiencing depression, you deserve compassionate, comprehensive care. While depression should be evaluated and managed by a qualified healthcare professional, Arc Wellness focuses on supporting your overall health through a personalized, physician-guided approach designed to complement your existing treatment plan and help you feel your best.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Gut Health",
        "Sleep Health",
        "ExoMind®",
        "IV Infusions",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "stress-burnout",
    seo: {
      title: "Stress & Burnout | Conditions | Arc Wellness",
      description:
        "Stress and burnout are often signs that your body has been carrying more than it was designed to. Restore balance with a personalized path.",
    },
    hero: {
      title: "Stress & Burnout",
      subhead: "When You're Running on Empty",
      paragraphs: [
        "Life can be demanding. Between work, family, responsibilities, and everything in between, it's easy to find yourself constantly pushing forward without taking time to recover.",
        "Over time, ongoing stress can leave you feeling mentally exhausted, physically drained, emotionally overwhelmed, and disconnected from the things that once brought you joy.",
        "We don't believe feeling depleted should become your new normal.",
        "Stress and burnout are often signs that your body has been carrying more than it was designed to for too long, and understanding why you're feeling this way is the first step toward restoring balance.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Like You Have More to Give",
      paragraphs: [
        "When your body and mind are supported, you're better equipped to navigate life's challenges with resilience and clarity. You may notice improved energy, better sleep, greater focus, and the ability to be more present for the people and moments that matter most.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward restoring balance so you can feel more energized, resilient, and engaged in everyday life.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Brain Health",
        "Hormone Health",
        "Sleep Health",
        "Gut Health",
        "ExoMind®",
        "IV Infusions",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "oxidative-stress",
    seo: {
      title: "Oxidative Stress | Conditions | Arc Wellness",
      description:
        "Supporting cellular health may help you maintain energy, resilience, and cognitive function as you age.",
    },
    hero: {
      title: "Oxidative Stress",
      subhead: "When Everyday Wear and Tear Begins to Add Up",
      paragraphs: [
        "Your body is constantly working to repair itself. Every day, it responds to the demands of normal living, from producing energy and fighting illness to recovering from stress and environmental exposures.",
        "Everyday life naturally places stress on your cells. While your body is designed to repair and protect itself, supporting those natural processes becomes increasingly important as we age.",
        "We don't believe healthy aging is simply about adding more years to your life. It's about helping your body function at its best throughout those years.",
        "Understanding how your body is responding to the demands of everyday life is an important step toward supporting long-term health and vitality.",
      ],
    },
    imagine: {
      title: "Imagine Aging with Strength and Vitality",
      paragraphs: [
        "Healthy aging isn't about turning back the clock. It's about helping your body continue to perform at its best for years to come. Supporting cellular health may help you maintain energy, resilience, cognitive function, and overall wellness as you age.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting long-term vitality and helping you live well at every stage of life.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Longevity",
        "Metabolic Health",
        "Hormone Health",
        "Gut Health",
        "Brain Health",
        "IV Infusions",
        "Supplements",
        "Peptide Therapy",
      ),
    },
  }),

  defineCondition({
    slug: "immune-health",
    seo: {
      title: "Immune Health | Conditions | Arc Wellness",
      description:
        "A healthy immune system depends on many interconnected systems working together. Support your long-term health from within.",
    },
    hero: {
      title: "Immune Health",
      subhead: "When Your Body's Defense System Needs Support",
      paragraphs: [
        "Your immune system works around the clock to help protect your body and keep you healthy. It does far more than fight off colds. It plays an important role in healing, recovery, inflammation, and your overall well-being.",
        "When your immune system isn't functioning optimally, you may find yourself getting sick more often, taking longer to recover, feeling run down, or simply not feeling like yourself.",
        "We don't believe your immune system should have to work harder than it needs to.",
        "A healthy immune system doesn't happen by chance. It depends on many interconnected systems working together, and understanding those connections is the first step toward supporting your long-term health.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Stronger from Within",
      paragraphs: [
        "A healthy immune system helps you do more than avoid illness. It supports your body's ability to recover, adapt, and thrive. When your body is supported from the inside out, you may notice improved energy, greater resilience, and increased confidence in your overall health.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your immune system and your long-term wellness.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Gut Health",
        "Longevity",
        "Hormone Health",
        "Metabolic Health",
        "IV Infusions",
        "Supplements",
        "Peptide Therapy",
      ),
    },
  }),

  defineCondition({
    slug: "cognitive-health",
    seo: {
      title: "Cognitive Health | Conditions | Arc Wellness",
      description:
        "Supporting cognitive health today is an investment in lifelong brain performance, resilience, and independence.",
    },
    hero: {
      title: "Cognitive Health",
      subhead: "Protecting the Mind That Powers Your Life",
      paragraphs: [
        "Your brain is involved in every decision you make, every conversation you have, every memory you create, and every goal you pursue.",
        "Cognitive health is about preserving the abilities that allow you to think clearly, learn, solve problems, stay focused, and remain independent throughout life.",
        "As we age, it's natural for some aspects of cognition to change. But healthy aging isn't just about accepting those changes. It's about supporting your brain so it can continue performing at its best for years to come.",
        "We don't believe cognitive health begins when problems appear. It begins with caring for your brain long before symptoms develop.",
      ],
    },
    imagine: {
      title: "Imagine Staying Mentally Strong for Years to Come",
      paragraphs: [
        "Imagine continuing to learn, create, solve problems, and enjoy meaningful conversations with confidence.",
        "Imagine remembering the moments that matter, staying engaged with the people you love, and maintaining the independence that allows you to continue living life on your terms.",
        "Supporting cognitive health is an investment in your future.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting lifelong brain performance, resilience, and cognitive vitality.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "Longevity",
        "Brain Health",
        "Hormone Health",
        "Metabolic Health",
        "Gut Health",
        "ExoMind®",
        "IV Infusions",
        "Peptide Therapy",
        "Supplements",
      ),
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Your memories. Your decisions. Your independence. They all depend on the health of your brain.",
        "Supporting cognitive health today is one of the greatest investments you can make in the life you want to live tomorrow.",
      ],
    },
  }),

  defineCondition({
    slug: "parkinsons-support",
    seo: {
      title: "Parkinson's Support | Conditions | Arc Wellness",
      description:
        "Arc Wellness supports overall health for people living with Parkinson's through personalized care that complements your neurology treatment plan.",
    },
    hero: {
      title: "Parkinson's Support",
      subhead: "Supporting Your Health at Every Stage",
      paragraphs: [
        "Living with Parkinson's disease can bring changes that affect far more than movement. Energy, balance, sleep, mood, cognition, and overall well-being can all become part of the journey.",
        "While every person's experience is different, one thing remains the same. You deserve care that looks at the whole person, not just a diagnosis.",
        "We believe that supporting your overall health can play an important role in helping you maintain strength, resilience, and quality of life throughout your journey.",
      ],
    },
    imagine: {
      title: "Imagine Living with Greater Confidence",
      paragraphs: [
        "Living well with Parkinson's means supporting the things that matter most: maintaining strength, preserving independence, staying mentally engaged, and continuing to enjoy meaningful moments with the people you love.",
        "Every journey is unique, and your care should be, too.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your overall wellness and quality of life.",
      ],
    },
    extras: [
      {
        title: "How Arc Wellness Looks Deeper",
        paragraphs: [
          "Every story deserves to be heard.",
          "At Arc Wellness, your journey begins with a complimentary consultation where we listen.",
          "We want to understand your goals, your concerns, your daily challenges, and what living well means to you. Only after understanding your story do we determine the next best steps, drawing from the full range of resources available at Arc Wellness, from advanced testing and innovative therapies to nutrition, lifestyle guidance, and wellness technologies, to create a personalized Blueprint designed around you.",
        ],
      },
      {
        title: "Supporting the Whole You",
        paragraphs: [
          "If you're living with Parkinson's disease, you deserve compassionate, comprehensive care.",
          "While Parkinson's disease should be diagnosed and managed by a neurologist or other qualified healthcare professional, Arc Wellness focuses on supporting your overall health through a personalized, physician-guided approach designed to complement your existing treatment plan and help you feel your best.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "Brain Health",
        "Cognitive Health",
        "Longevity",
        "Hormone Health",
        "Gut Health",
        "IV Infusions",
        "Supplements",
        "Peptide Therapy",
        "ExoMind®",
      ),
    },
  }),
];
