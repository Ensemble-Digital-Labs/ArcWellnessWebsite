/**
 * Site navigation IA — single source of truth for header mega-menus.
 * Top bar: About · Services · Conditions · Start Here · Arc Library · Financing · Shop · Contact
 *
 * Linking convention:
 * - `href` set           → live route
 * - `href` omitted       → non-clickable label (page not built)
 * - `comingSoon: true`   → disabled + "Coming soon"
 * - `future: true`       → disabled + "Future"
 */
import { siteMeta } from "@/content/siteMeta";
import { ARC_TREATMENT_NAV_LINKS } from "@/lib/arcMarketingNav";

export type NavLeaf = {
  label: string;
  href?: string;
  comingSoon?: boolean;
  future?: boolean;
};

export type NavGroup = {
  heading?: string;
  headingHref?: string;
  items: readonly NavLeaf[];
};

export type NavColumn = {
  groups: readonly NavGroup[];
};

export type NavTopItem = {
  id: string;
  label: string;
  /** Simple top-level link (no dropdown). */
  href?: string;
  /** Mega-menu columns (desktop) / accordion sections (mobile). */
  columns?: readonly NavColumn[];
};

export const ARC_NAV_BOOK_CTA = {
  label: "Book now",
  href: siteMeta.bookingUrl,
} as const;

/** Simple homepage link — desktop bar + mobile drawer (not in mega-menu IA columns). */
export const ARC_NAV_HOME_ITEM: NavTopItem = { id: "home", label: "Home", href: "/" };

const treatmentHrefByLabel = Object.fromEntries(
  ARC_TREATMENT_NAV_LINKS.map((t) => [t.label, t.href]),
) as Record<string, string>;

function leaf(label: string, href?: string): NavLeaf {
  return href ? { label, href } : { label };
}

function soon(label: string): NavLeaf {
  return { label, comingSoon: true };
}

function future(label: string): NavLeaf {
  return { label, future: true };
}

/** SERVICES — The Arc Method hub + four service groups (client IA). */
const servicesMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        heading: "The Arc Method",
        headingHref: "/treatments",
        items: [],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Restore & Optimize",
        items: [
          soon("Hormone Health"),
          soon("Metabolic Health"),
          soon("Gut Health"),
          soon("Brain Health"),
          soon("Longevity"),
          soon("Medical Weight Loss"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Advanced Therapies",
        items: [
          leaf("Infusions", treatmentHrefByLabel["Infusion Therapy"]),
          leaf("Peptides", treatmentHrefByLabel["Peptide Therapy"]),
          soon("Injections"),
          leaf("Supplements", treatmentHrefByLabel["Supplements"]),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Aesthetics",
        items: [
          soon("Injectables"),
          leaf("Fillers", treatmentHrefByLabel["RHA Fillers"]),
          leaf("Exion", treatmentHrefByLabel["Exion"]),
          leaf("EmFace", treatmentHrefByLabel["EmFace"]),
          soon("RF Microneedling"),
          soon("Clear RF"),
          soon("Genesis Z"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Strength & Confidence",
        items: [
          leaf("EmSella", treatmentHrefByLabel["EmSella"]),
          leaf("EmSculpt Neo", treatmentHrefByLabel["EmSculpt Neo"]),
          leaf("ExoMind", treatmentHrefByLabel["ExoMind"]),
        ],
      },
    ],
  },
];

/** CONDITIONS — "What would you like to improve?" grid (pages TBD). */
const conditionsMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        items: [
          soon("Brain Fog"),
          soon("Food Sensitivities"),
          soon("Fine Lines & Wrinkles"),
          soon("Low Testosterone"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Chronic Fatigue"),
          soon("Gut Health"),
          soon("Hair Loss"),
          soon("Menopause"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Poor Focus / ADHD"),
          soon("Inflammation"),
          soon("Hyperpigmentation"),
          soon("Hormonal Imbalance"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Memory Concerns"),
          soon("Insulin Resistance"),
          soon("Loose Skin"),
          soon("Low Libido"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Sleep Concerns"),
          soon("Liver Health"),
          soon("Acne"),
          soon("Sexual Wellness"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Anxiety"),
          soon("Oxidative Stress"),
          soon("Acne Scars"),
          soon("Weight Gain"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Depression"),
          soon("Immune Health"),
          soon("Rosacea"),
          soon("Food Noise"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Stress & Burnout"),
          soon("Longevity"),
          soon("Large Pores"),
          soon("Medical Weight Loss"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Low Energy"),
          soon("Cellular Health"),
          soon("Double Chin"),
          soon("Muscle Loss"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Poor Recovery"),
          soon("Healthy Aging"),
          soon("Facial Volume Loss"),
          soon("Strength & Performance"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Cognitive Health"),
          soon("Parkinson's Support"),
          soon("Thin Lips"),
          soon("Pelvic Floor Weakness"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Mental Clarity"),
          soon("Chronic UTIs"),
          soon("Sun Damage"),
          soon("Urinary Incontinence"),
        ],
      },
    ],
  },
];

/** START HERE — new vs existing patients. */
const startHereMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        heading: "Your First Visit",
        items: [
          leaf("Book a consultation", siteMeta.bookingUrl),
          leaf("Membership Options", "/programs"),
          leaf("Pricing & Financing", "/financing"),
          soon("Insurance & Payment"),
          soon("Frequently Asked Questions"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Existing Patients",
        items: [
          soon("Patient Portal"),
          soon("Forms"),
          soon("Prescription Refills"),
          leaf("Contact Your Care Team", "/contact"),
        ],
      },
    ],
  },
];

/** ARC LIBRARY — content hub (interim: case-studies). */
const arcLibraryMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        heading: "From the Desk at ARC",
        items: [soon("Physician Perspectives")],
      },
      {
        heading: "Health Topics",
        items: [
          soon("Hormone Health"),
          soon("Gut Health"),
          soon("Wellness Updates"),
          soon("Longevity"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Blueprint Guides",
        items: [
          soon("Brain Health Blueprint"),
          soon("Blueprint Foods"),
          soon("Lab Marker Guides"),
          soon("Supplement Education"),
        ],
      },
      {
        heading: "Healthy Living",
        items: [
          leaf("Latest Insights", "/case-studies"),
          soon("Healthy Recipes"),
          soon("Nutrition & Lifestyle"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Featured Articles",
        items: [
          soon("Metabolic Health"),
          soon("Nutrition Guides"),
          soon("Downloadable Resources"),
          soon("Condition Guides"),
        ],
      },
      {
        heading: "Resources",
        items: [
          soon("Healthy Aging"),
          soon("Frequently Asked Questions"),
          soon("Videos & Webinars"),
        ],
      },
    ],
  },
];

/** FINANCING — payment paths (interim links to /financing). */
const financingMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        heading: "Payment Options",
        items: [
          leaf("Payment Methods Accepted", "/financing"),
          leaf("HSA / FSA Information", "/financing"),
          soon("Membership Billing"),
          soon("Gift Cards"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "PatientFi Financing",
        items: [
          soon("Apply with PatientFi"),
          soon("Monthly Payment Options"),
          soon("Instant Decisions"),
          soon("PatientFi Application"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Helpful Information",
        items: [
          leaf("How Financing Works", "/financing"),
          soon("Frequently Asked Questions"),
          future("Financing Calculator"),
          leaf("Contact Our Team", "/contact"),
        ],
      },
    ],
  },
];

/** SHOP — marketing shells; most SKUs marked future. */
const shopMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        heading: "Supplements",
        items: [
          soon("Foundational Wellness"),
          future("Hormone Health"),
          future("Gut Health"),
          future("Brain Health"),
          future("Cardiovascular Health"),
          future("Immune Health"),
          future("Longevity"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Nutrition",
        items: [
          soon("Protein & Nutrition"),
          future("Healthy Snacks"),
          future("Functional Foods"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Skin Health",
        items: [
          soon("Medical Grade Skincare"),
          future("Cleansers"),
          future("Serums"),
          future("Moisturizers"),
          future("Sunscreens"),
          future("Treatment Enhancers"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        heading: "Gifting & More",
        items: [
          soon("Gift Cards"),
          future("Arc Apparel"),
          future("Wellness Bundles"),
          future("Seasonal Collections"),
          future("New Arrivals"),
          future("Best Sellers"),
        ],
      },
    ],
  },
];

export const ARC_NAV_TOP_ITEMS: readonly NavTopItem[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "services", label: "Services", href: "/treatments", columns: servicesMenu },
  { id: "conditions", label: "Conditions", columns: conditionsMenu },
  { id: "start-here", label: "Start Here", columns: startHereMenu },
  { id: "arc-library", label: "Arc Library", columns: arcLibraryMenu },
  { id: "financing", label: "Financing", href: "/financing", columns: financingMenu },
  { id: "shop", label: "Shop", columns: shopMenu },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

/** Flatten columns for simple horizontal submenus when mega grid is too wide. */
export function flattenNavColumns(columns: readonly NavColumn[]): NavLeaf[] {
  const out: NavLeaf[] = [];
  for (const col of columns) {
    for (const group of col.groups) {
      if (group.headingHref) {
        out.push({ label: group.heading!, href: group.headingHref });
      }
      out.push(...group.items);
    }
  }
  return out;
}

export function navItemHasPanel(item: NavTopItem): boolean {
  return Boolean(item.columns?.length);
}
