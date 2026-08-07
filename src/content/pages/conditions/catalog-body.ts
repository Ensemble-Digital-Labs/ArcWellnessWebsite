import { defineCondition } from "@/content/pages/conditions/defineCondition";
import {
  conditionService,
  conditionServices,
} from "@/content/pages/conditions/serviceLinks";
import type { ConditionPageContent } from "@/content/pages/conditions/types";

export const CONDITION_CATALOG_BODY: readonly ConditionPageContent[] = [
  defineCondition({
    slug: "food-sensitivities",
    seo: {
      title: "Food Sensitivities | Conditions | Arc Wellness",
      description:
        "Food sensitivities can contribute to inflammation and unwanted symptoms. Understand how your body responds to certain foods.",
    },
    hero: {
      title: "Food Sensitivities",
      subhead: "When Healthy Foods Don't Leave You Feeling Healthy",
      paragraphs: [
        "You eat well, yet you still feel bloated, tired, foggy, or uncomfortable. Maybe certain foods leave you feeling sluggish, trigger headaches, cause digestive upset, or simply make you feel \"off\", even if you can't pinpoint exactly why.",
        "It can be frustrating to feel like you're doing everything right but still not feeling your best.",
        "We don't believe you should have to guess which foods are helping your body and which ones may be working against it.",
        "Food sensitivities can sometimes contribute to ongoing inflammation and unwanted symptoms, and understanding how your body responds to certain foods may be an important step toward feeling better.",
      ],
    },
    extras: [
      {
        title: "Food Sensitivities Are Different from Food Allergies",
        paragraphs: [
          "Food sensitivities and food allergies are not the same. While food allergies can cause immediate and potentially serious immune reactions, food sensitivities often develop more gradually and may contribute to symptoms that are harder to recognize, such as digestive discomfort, fatigue, brain fog, headaches, skin concerns, or joint discomfort.",
          "Our goal is to help you better understand your body's unique responses so you can make informed decisions about your health.",
        ],
      },
    ],
    imagine: {
      title: "Imagine Enjoying Food with Confidence Again",
      paragraphs: [
        "Food should nourish your body, not leave you wondering how you'll feel afterward. When you better understand how your body responds to certain foods, eating can become less confusing and more enjoyable.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward reducing unnecessary inflammation, supporting your body's natural balance, and helping you feel your best.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Gut Health",
        "Functional Lab Testing",
        "Supplements",
        "IV Infusions",
        "Peptide Therapy",
        "Nutrition & Lifestyle Guidance",
      ),
    },
  }),

  defineCondition({
    slug: "gut-health",
    seo: {
      title: "Gut Health | Conditions | Arc Wellness",
      description:
        "Your gut is often one of the body's most important messengers. Understand what it's telling you and restore balance.",
    },
    hero: {
      title: "Gut Health",
      subhead: "When Your Gut Is Trying to Tell You Something",
      paragraphs: [
        "Your gut is often one of the body's most important messengers, and understanding what it's trying to tell you is the first step toward improving your overall health.",
        "When your digestive system isn't functioning optimally, your body often lets you know. You may experience bloating, gas, constipation, diarrhea, food sensitivities, abdominal discomfort, or simply feel like something isn't quite right.",
        "We don't believe digestive concerns should become something you simply learn to live with.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Better from the Inside Out",
      paragraphs: [
        "When your gut is healthy, your entire body benefits. Better digestion can mean more comfortable meals, improved energy, greater mental clarity, a healthier immune system, and feeling more like yourself every day.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward restoring balance and supporting your body's natural ability to thrive.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Gut Health",
        "Food Sensitivity Testing",
        "Hormone Health",
        "Brain Health",
        "Metabolic Health",
        "Supplements",
        "Peptide Therapy",
        "IV Infusions",
      ),
    },
  }),

  defineCondition({
    slug: "inflammation",
    seo: {
      title: "Inflammation | Conditions | Arc Wellness",
      description:
        "Persistent inflammation may be your body's way of signaling that something needs attention. Restore balance and long-term wellness.",
    },
    hero: {
      title: "Inflammation",
      subhead: "When Your Body Is Trying to Get Your Attention",
      paragraphs: [
        "Inflammation is your body's natural response to injury, illness, or infection, and in the short term, it's an important part of healing. But when inflammation lingers longer than it should, it can begin to affect how you feel every day.",
        "You may notice ongoing fatigue, joint discomfort, digestive issues, brain fog, stubborn weight gain, or simply feel like your body isn't functioning the way it once did.",
        "We don't believe feeling \"off\" should become your new normal.",
        "Persistent inflammation may be your body's way of signaling that something needs attention, and understanding why is the first step toward restoring balance and supporting long-term wellness.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Better Every Day",
      paragraphs: [
        "When your body is functioning in balance, everyday life feels different. You have more energy, think more clearly, move more comfortably, and feel better equipped to enjoy the people and moments that matter most.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your body's natural balance and helping you feel your best.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Gut Health",
        "Metabolic Health",
        "Hormone Health",
        "Brain Health",
        "Longevity",
        "IV Infusions",
        "Supplements",
        "Peptide Therapy",
      ),
    },
  }),

  defineCondition({
    slug: "insulin-resistance",
    seo: {
      title: "Insulin Resistance | Conditions | Arc Wellness",
      description:
        "Insulin resistance often develops quietly over time. Understand what's happening beneath the surface and restore metabolic health.",
    },
    hero: {
      title: "Insulin Resistance",
      subhead: "When Your Body Stops Responding the Way It Should",
      paragraphs: [
        "You're eating well, exercising, and doing everything you can to stay healthy, but the scale won't budge. Your energy crashes in the afternoon, sugar cravings seem impossible to ignore, and losing weight feels harder than ever.",
        "It can be frustrating when your efforts don't match your results.",
        "We don't believe you should have to blame yourself when your body isn't responding the way you expect.",
        "Insulin resistance often develops quietly over time, making it difficult to recognize until symptoms begin to affect your daily life. Understanding what's happening beneath the surface is the first step toward restoring your metabolic health.",
      ],
    },
    imagine: {
      title: "Imagine Your Body Working With You Again",
      paragraphs: [
        "When your metabolism is functioning optimally, healthy choices become more rewarding. You may notice improved energy, fewer cravings, better weight management, greater mental clarity, and a renewed sense of confidence in your health journey.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward improving your metabolic health and helping you feel your best.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "Metabolic Health",
        "Medical Weight Loss",
        "Hormone Health",
        "Gut Health",
        "Longevity",
        "IV Infusions",
        "Peptide Therapy",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "longevity",
    seo: {
      title: "Longevity | Conditions | Arc Wellness",
      description:
        "Longevity isn't about adding more years to your life. It's about making sure the years ahead are filled with health, strength, and vitality.",
    },
    hero: {
      title: "Longevity",
      subhead: "It's Not Just About Living Longer. It's About Living Better",
      paragraphs: [
        "Imagine climbing the stairs without hesitation. Traveling with confidence. Playing with your grandchildren. Continuing to do the things you love for years to come.",
        "Longevity isn't about adding more years to your life. It's about making sure the years ahead are filled with the health, strength, and vitality to truly enjoy them.",
        "We don't believe aging means settling for \"good enough.\"",
        "Healthy aging begins long before symptoms appear. The choices you make today can influence how you feel, move, think, and live tomorrow.",
      ],
    },
    imagine: {
      title: "Imagine Living Life on Your Terms",
      paragraphs: [
        "True longevity isn't simply adding years to your life. It's adding life to your years.",
        "It's waking up with energy. Remaining mentally sharp. Moving with confidence. Maintaining your independence. Feeling strong enough to say yes to new adventures. Continuing to make memories with the people you love.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward helping you live with greater vitality, resilience, and confidence for years to come.",
      ],
    },
    extras: [
      {
        title: "The Arc Method",
        paragraphs: [
          "Everything begins with understanding you.",
          "Your physician-guided consultation creates a personalized Blueprint built around your health, your goals, and your future.",
        ],
      },
    ],
    discover: {
      title: "Discover What's Possible",
      intro:
        "Every personalized Arc Blueprint is different. Depending on your goals, your physician may recommend one or more of the following services to help support healthy aging and long-term wellness.",
      groups: [
        {
          heading: "Restore & Optimize",
          services: [
            conditionService(
              "Hormone Health",
              "Support healthy aging, energy, vitality, and overall well-being.",
            ),
            conditionService(
              "Metabolic Health",
              "Build a healthier metabolism and improve long-term health.",
            ),
            conditionService(
              "Brain Health",
              "Support memory, focus, cognitive performance, and mental wellness.",
            ),
            conditionService(
              "Gut Health",
              "Build a healthier foundation for digestion, immunity, inflammation, and overall wellness.",
            ),
            conditionService(
              "Medical Weight Loss",
              "Achieve a healthier body composition while protecting your long-term health.",
            ),
          ],
        },
        {
          heading: "Advanced Therapies",
          services: [
            conditionService(
              "IV Infusions",
              "Deliver targeted nutrients to support recovery, hydration, immune health, and overall vitality.",
            ),
            conditionService(
              "Peptide Therapy",
              "Physician-guided therapies designed to support recovery, healthy aging, metabolism, and performance.",
            ),
            conditionService(
              "Supplements",
              "Personalized recommendations to help fill nutritional gaps and support your long-term wellness plan.",
            ),
          ],
        },
        {
          heading: "Longevity Technologies",
          services: [
            conditionService(
              "ExoMind®",
              "Support cognitive performance, focus, emotional wellness, and brain health.",
            ),
            conditionService(
              "EmSculpt Neo®",
              "Build muscle, reduce fat, and support one of the most important predictors of healthy aging: muscle strength.",
            ),
            conditionService(
              "EmSella®",
              "Strengthen the pelvic floor to support bladder control, confidence, and long-term quality of life.",
            ),
            conditionService(
              "Clear RF™",
              "Refresh and rejuvenate skin through gentle collagen remodeling with minimal downtime.",
            ),
            conditionService(
              "RF Microneedling",
              "Stimulate collagen and elastin production to improve skin texture, firmness, and overall skin health.",
            ),
            conditionService(
              "EmFace®",
              "Support facial muscle tone while stimulating collagen and elastin for a more lifted, refreshed appearance without needles or downtime.",
            ),
            conditionService(
              "Exion®",
              "A versatile platform designed to support skin health, collagen production, texture, tone, and rejuvenation through advanced energy-based treatments.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "The goal isn't simply to live longer.",
        "It's to continue living the life you love, with strength, confidence, independence, and vitality.",
        "That's what longevity means to us.",
      ],
    },
  }),

  defineCondition({
    slug: "cellular-health",
    seo: {
      title: "Cellular Health | Conditions | Arc Wellness",
      description:
        "True wellness begins by supporting the health of the cells that power everything your body does.",
    },
    hero: {
      title: "Cellular Health",
      subhead: "When Health Begins at the Smallest Level",
      paragraphs: [
        "Every heartbeat. Every thought. Every step you take. Every breath you breathe. It all begins with your cells.",
        "Your body is made up of trillions of cells working together every moment of every day. They produce energy, repair tissue, communicate with one another, protect against illness, and help keep every organ and system functioning as it should.",
        "When your cells aren't functioning optimally, you may notice changes long before a diagnosis is ever made. Fatigue, brain fog, slower recovery, decreased performance, and the effects of aging can all reflect how well your body is functioning at its foundation.",
        "We don't believe true wellness begins with simply treating symptoms. It begins by supporting the health of the cells that power everything your body does.",
      ],
    },
    imagine: {
      title: "Imagine Building Health from the Inside Out",
      paragraphs: [
        "When your cells are supported, every system in your body has the opportunity to perform at its best. Energy production, recovery, cognitive function, metabolism, immune health, and healthy aging all begin with a strong cellular foundation.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your health from the inside out, one cell at a time.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      groups: [
        {
          services: [
            conditionService(

              "Discover the factors influencing your health and create a personalized Blueprint.",
            ),
            conditionService(
              "Longevity",
              "Support healthy aging by investing in the health of your cells today.",
            ),
            conditionService(
              "Hormone Health",
              "Optimize the signals that help cells communicate and function effectively.",
            ),
            conditionService(
              "Metabolic Health",
              "Support the way your cells create and use energy.",
            ),
            conditionService(
              "Gut Health",
              "Provide the nutrients your cells need to thrive.",
            ),
            conditionService(
              "Brain Health",
              "Support the cells that power memory, focus, and cognitive performance.",
            ),
            conditionService(
              "IV Infusions",
              "Deliver targeted nutrients directly to support cellular function and recovery.",
            ),
            conditionService(
              "Peptide Therapy",
              "Support the body's natural repair and regenerative processes.",
            ),
            conditionService(
              "Supplements",
              "Provide personalized nutritional support for long-term cellular wellness.",
            ),
            conditionService(
              "ExoMind®",
              "Support healthy brain function and cognitive performance.",
            ),
            conditionService(
              "EmSculpt Neo®",
              "Support muscle health, strength, and metabolic activity.",
            ),
          ],
        },
      ],
    },
    philosophy: {
      title: "The Arc Philosophy",
      paragraphs: [
        "Every organ begins with a cell.",
        "Every system depends on healthy cells.",
        "Every journey toward better health begins by supporting the foundation that makes everything else possible.",
      ],
    },
  }),

  defineCondition({
    slug: "poor-recovery",
    seo: {
      title: "Poor Recovery | Conditions | Arc Wellness",
      description:
        "Your body's ability to recover is influenced by many interconnected systems. Restore resilience with a personalized path.",
    },
    hero: {
      title: "Poor Recovery",
      subhead: "When Your Body Takes Longer to Bounce Back",
      paragraphs: [
        "Recovery is one of the clearest signs of overall health.",
        "Whether it's after exercise, a busy workweek, an illness, travel, or simply the demands of everyday life, your body is designed to repair, restore, and prepare you for what's next.",
        "When recovery slows, you may notice lingering fatigue, sore muscles that last longer than expected, reduced stamina, mental exhaustion, or feeling like your energy never fully returns.",
        "We don't believe feeling constantly depleted should become your new normal.",
        "Your body's ability to recover is influenced by many interconnected systems, and understanding what's affecting that process is the first step toward restoring resilience.",
      ],
    },
    imagine: {
      title: "Imagine Recovering with Confidence",
      paragraphs: [
        "When your body has the support it needs, recovery can become more efficient, helping you feel ready for whatever comes next. You may notice improved energy, greater endurance, less lingering soreness, better sleep, and the confidence to stay active and engaged in the activities you enjoy.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting your body's natural ability to recover, restore, and thrive.",
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
        "Peptide Therapy",
        "Supplements",
        "EmSculpt Neo®",
      ),
    },
  }),

  defineCondition({
    slug: "weight-gain",
    seo: {
      title: "Weight Gain | Conditions | Arc Wellness",
      description:
        "Changes in weight can signal that something may be out of balance. Create lasting, meaningful change with a personalized path.",
    },
    hero: {
      title: "Weight Gain",
      subhead: "When Your Body Begins Working Against You",
      paragraphs: [
        "Weight gain isn't always about eating too much or exercising too little.",
        "Many people find themselves gaining weight despite making healthy choices. Clothes fit differently. Energy begins to decline. Losing weight becomes harder than it used to be, even when you're doing all the \"right\" things.",
        "We don't believe weight gain should simply be dismissed as getting older or lacking willpower.",
        "Changes in weight can be your body's way of signaling that something may be out of balance, and understanding why is the first step toward creating lasting, meaningful change.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Comfortable in Your Body Again",
      paragraphs: [
        "Reaching a healthier weight isn't just about a number on the scale. It's about having more energy, moving with greater confidence, improving your overall health, and feeling like yourself again.",
        "When the underlying factors affecting weight are better understood, lasting progress becomes possible.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward achieving a healthier weight and improving your overall well-being.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(

        "Medical Weight Loss",
        "Metabolic Health",
        "Hormone Health",
        "Gut Health",
        "Brain Health",
        "Longevity",
        "Peptide Therapy",
        "Supplements",
        "IV Infusions",
        "EmSculpt Neo®",
        "EmSella®",
      ),
    },
  }),

  defineCondition({
    slug: "food-noise",
    seo: {
      title: "Food Noise | Conditions | Arc Wellness",
      description:
        "Food noise isn't simply about willpower. Understand the connections that drive constant food thoughts and quiet the chatter.",
    },
    hero: {
      title: "Food Noise",
      subhead: "When Food Is Constantly on Your Mind",
      paragraphs: [
        "For some people, food is simply fuel. For others, it's a constant conversation happening in the background.",
        "Thinking about your next meal while finishing the one you're eating. Feeling distracted by cravings. Replaying what you've eaten or wondering what you should eat next. Feeling like food occupies more mental space than you'd like.",
        "This experience, often called food noise, can be exhausting.",
        "We don't believe food should control your thoughts or your day.",
        "Food noise isn't simply about willpower. It can be influenced by the complex ways your brain, hormones, metabolism, sleep, and hunger signals work together. Understanding those connections is the first step toward quieting the constant chatter.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Free Around Food",
      paragraphs: [
        "Imagine enjoying a meal, feeling satisfied, and moving on with your day.",
        "Imagine making food choices because your body needs nourishment, not because your mind feels consumed by constant cravings or thoughts about eating.",
        "When your body's natural hunger and fullness signals are better supported, food can become something you enjoy rather than something that constantly demands your attention.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward supporting a healthier relationship with food and your overall well-being.",
      ],
    },
    discover: {
      title: "Discover What's Possible",
      intro:
        "Explore the services that may become part of your personalized Arc Blueprint.",
      services: conditionServices(
        "EmSculpt Neo®",
        "Metabolic Health",
        "Hormone Health",
        "Gut Health",
        "Brain Health",
        "Longevity",
        "Peptide Therapy",
        "Supplements",
      ),
    },
  }),

  defineCondition({
    slug: "muscle-loss",
    seo: {
      title: "Muscle Loss | Conditions | Arc Wellness",
      description:
        "Supporting muscle health is one of the most important investments you can make in long-term health, independence, and quality of life.",
    },
    hero: {
      title: "Muscle Loss",
      subhead: "When Strength Begins to Slip Away",
      paragraphs: [
        "Muscle is about so much more than appearance.",
        "It helps you climb stairs, carry groceries, get up from a chair, maintain your balance, recover from illness, and continue doing the things you love. It's one of the foundations of strength, mobility, metabolism, and healthy aging.",
        "As we get older, it's natural to lose some muscle over time. But when that loss accelerates, everyday activities can become more challenging, energy may decline, and maintaining a healthy weight can become increasingly difficult.",
        "We don't believe losing strength should simply be accepted as an inevitable part of aging.",
        "Supporting muscle health is one of the most important investments you can make in your long-term health, independence, and quality of life.",
      ],
    },
    imagine: {
      title: "Imagine Feeling Strong for Years to Come",
      paragraphs: [
        "Imagine feeling confident in your body's ability to keep up with the life you want to live.",
        "Whether it's lifting your grandchild, traveling with ease, staying active, or simply moving through each day with confidence, preserving muscle health supports far more than physical strength. It supports your independence, resilience, and vitality.",
        "At Arc Wellness, our goal is to help you better understand your health, uncover what's possible, and create a personalized path toward maintaining strength, mobility, and confidence at every stage of life.",
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
        "Medical Weight Loss",
        "Peptide Therapy",
        "Supplements",
        "IV Infusions",
        "EmSculpt Neo®",
        "EmSella®",
      ),
    },
  }),
];
