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
  /**
   * Pin the desktop panel to this many columns per row. Without it, columns wrap
   * on their own content width, which gives ragged rows on long lists.
   */
  panelColumnsPerRow?: number;
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

/** SERVICES — Arc 360 hub + four service groups (client IA). */
const servicesMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        heading: "Arc 360",
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
          leaf("Hormone Health", "/treatments/hormone-health"),
          leaf("Metabolic Health", "/treatments/metabolic-health"),
          leaf("Gut Health", "/treatments/gut-health"),
          leaf("Brain Health", "/treatments/brain-health"),
          leaf("Longevity", "/treatments/longevity"),
          leaf("Medical Weight Loss", "/treatments/medical-weight-loss"),
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
          leaf("Neuromodulators", "/treatments/neuromodulators"),
          leaf("Fillers", treatmentHrefByLabel["RHA Fillers"]),
          leaf("Exion", treatmentHrefByLabel["Exion"]),
          leaf("EmFace", treatmentHrefByLabel["EmFace"]),
          leaf("RF Microneedling", "/treatments/rf-microneedling"),
          leaf("Clear RF", "/treatments/clear-rf"),
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
          soon("Male Hormonal Changes"),
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
          soon("Women's Hormones"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Poor Focus"),
          soon("ADHD"),
          soon("Inflammation"),
          soon("Hyperpigmentation"),
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
          soon("Sleep Concerns"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Acne"),
          soon("Anxiety"),
          soon("Oxidative Stress"),
          soon("Acne Scars"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Weight Gain"),
          soon("Depression"),
          soon("Immune Health"),
          soon("Rosacea"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Food Noise"),
          soon("Stress & Burnout"),
          soon("Longevity"),
          soon("Large Pores"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Cellular Health"),
          soon("Double Chin"),
          soon("Muscle Loss"),
          soon("Poor Recovery"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Facial Volume Loss"),
          soon("Physical Performance"),
          soon("Cognitive Health"),
          soon("Parkinson's Support"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Sun Damage"),
          soon("Pelvic Floor Weakness"),
          soon("Recurrent UTIs"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          soon("Urinary Incontinence"),
          soon("Post Prostatectomy Incontinence"),
          soon("Intimacy and Sexual Wellness"),
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
  { id: "conditions", label: "Conditions", columns: conditionsMenu, panelColumnsPerRow: 4 },
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

/** Exact for `/`; otherwise exact or nested path under `href`. */
export function isNavHrefActive(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Exact route match only (mega-menu leaves / hub headings). */
export function isNavHrefExact(href: string, pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === href;
}

/** True when the current route matches this top item or any link in its mega-menu. */
export function isNavItemActive(item: NavTopItem, pathname: string | null): boolean {
  if (!pathname) return false;
  if (item.href && isNavHrefActive(item.href, pathname)) return true;
  if (!item.columns) return false;
  for (const column of item.columns) {
    for (const group of column.groups) {
      if (group.headingHref && isNavHrefExact(group.headingHref, pathname)) {
        return true;
      }
      for (const leaf of group.items) {
        if (leaf.href && isNavHrefExact(leaf.href, pathname)) return true;
      }
    }
  }
  return false;
}
