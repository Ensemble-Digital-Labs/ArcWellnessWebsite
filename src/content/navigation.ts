/**
 * Site navigation IA — single source of truth for header mega-menus.
 * Top bar: About · Services · Conditions · Start Here · Arc Library · Contact
 * (Financing + Shop tabs exist in source but are `hidden` until ready — see notes on those items.)
 *
 * Linking convention:
 * - `href` set           → live route
 * - `href` omitted       → non-clickable label (page not built)
 * - `comingSoon: true`   → disabled + "Coming soon"
 * - `future: true`       → disabled + "Future"
 * - `hidden: true`       → omitted from desktop bar + mobile drawer (IA kept)
 *
 * Arc Library uses a slim Start Here–style panel (`arcLibraryMenu`). Full multi-column
 * IA remains in `ARC_LIBRARY_MENU_PRESERVED` for when more library pages ship.
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
  /**
   * Desktop mega-panel horizontal alignment under the floating pill.
   * - `center` (default): centered under the whole pill (wide Services / Conditions).
   * - `tab`: centered under this tab’s trigger (narrow Start Here).
   */
  panelAlign?: "center" | "tab";
  /**
   * When true, the tab is filtered out of `ARC_NAV_TOP_ITEMS` (desktop + mobile).
   * Keep the entry + its `*Menu` IA here so it can be restored without rewriting.
   */
  hidden?: boolean;
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
          leaf("Dermal Fillers", treatmentHrefByLabel["Dermal Fillers"]),
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
          leaf("Brain Fog", "/conditions/brain-fog"),
          leaf("Food Sensitivities", "/conditions/food-sensitivities"),
          leaf("Fine Lines & Wrinkles", "/conditions/fine-lines-wrinkles"),
          leaf("Male Hormonal Changes", "/conditions/male-hormonal-changes"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Chronic Fatigue", "/conditions/chronic-fatigue"),
          leaf("Gut Health", "/conditions/gut-health"),
          leaf("Hair Loss", "/conditions/hair-loss"),
          leaf("Women's Hormones", "/conditions/womens-hormones"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Poor Focus", "/conditions/poor-focus"),
          leaf("ADHD", "/conditions/adhd"),
          leaf("Inflammation", "/conditions/inflammation"),
          leaf("Hyperpigmentation", "/conditions/hyperpigmentation"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Memory Concerns", "/conditions/memory-concerns"),
          leaf("Insulin Resistance", "/conditions/insulin-resistance"),
          leaf("Loose Skin", "/conditions/loose-skin"),
          leaf("Sleep Concerns", "/conditions/sleep-concerns"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Acne", "/conditions/acne"),
          leaf("Anxiety", "/conditions/anxiety"),
          leaf("Oxidative Stress", "/conditions/oxidative-stress"),
          leaf("Acne Scars", "/conditions/acne-scars"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Weight Gain", "/conditions/weight-gain"),
          leaf("Depression", "/conditions/depression"),
          leaf("Immune Health", "/conditions/immune-health"),
          leaf("Rosacea", "/conditions/rosacea"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Food Noise", "/conditions/food-noise"),
          leaf("Stress & Burnout", "/conditions/stress-burnout"),
          leaf("Longevity", "/conditions/longevity"),
          leaf("Large Pores", "/conditions/large-pores"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Cellular Health", "/conditions/cellular-health"),
          leaf("Double Chin", "/conditions/double-chin"),
          leaf("Muscle Loss", "/conditions/muscle-loss"),
          leaf("Poor Recovery", "/conditions/poor-recovery"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Facial Volume Loss", "/conditions/facial-volume-loss"),
          leaf("Physical Performance", "/conditions/physical-performance"),
          leaf("Cognitive Health", "/conditions/cognitive-health"),
          leaf("Parkinson's Support", "/conditions/parkinsons-support"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Sun Damage", "/conditions/sun-damage"),
          leaf("Pelvic Floor Weakness", "/conditions/pelvic-floor-weakness"),
          leaf("Recurrent UTIs", "/conditions/recurrent-utis"),
        ],
      },
    ],
  },
  {
    groups: [
      {
        items: [
          leaf("Urinary Incontinence", "/conditions/urinary-incontinence"),
          leaf(
            "Post Prostatectomy Incontinence",
            "/conditions/post-prostatectomy-incontinence",
          ),
          leaf(
            "Intimacy and Sexual Wellness",
            "/conditions/intimacy-sexual-wellness",
          ),
        ],
      },
    ],
  },
];

/** START HERE — first-visit paths. */
const startHereMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        items: [
          leaf("Book a consultation", siteMeta.bookingUrl),
          leaf("Membership Options", "/programs"),
          leaf("Pricing & Financing", "/financing"),
          // NOTE: Insurance & Payment / FAQ removed from Start Here until live.
          // Restore: soon("Insurance & Payment"), soon("Frequently Asked Questions"),
        ],
      },
    ],
  },
  // NOTE (Aug 2026): "Existing Patients" column removed (Patient Portal / Forms /
  // Prescription Refills were all Soon). Restore when portal/forms go live:
  // {
  //   groups: [{
  //     heading: "Existing Patients",
  //     items: [
  //       soon("Patient Portal"),
  //       soon("Forms"),
  //       soon("Prescription Refills"),
  //     ],
  //   }],
  // },
];

/**
 * Full ARC LIBRARY mega-menu IA (multi-column). Kept for restore when more
 * library pages ship — top bar currently uses the slim `arcLibraryMenu` below.
 */
export const ARC_LIBRARY_MENU_PRESERVED: readonly NavColumn[] = [
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
          leaf("From the Arc Desk", "/case-studies"),
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

/** ARC LIBRARY — Start Here–style slim panel (live links only). */
const arcLibraryMenu: readonly NavColumn[] = [
  {
    groups: [
      {
        items: [leaf("From the Arc Desk", "/case-studies")],
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
          // NOTE: "Contact Our Team" removed — Contact is a top-bar tab.
          // Restore: leaf("Contact Our Team", "/contact"),
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

/**
 * Full top-bar IA (including temporarily hidden tabs).
 * Public export `ARC_NAV_TOP_ITEMS` filters out `hidden` entries.
 */
const ARC_NAV_TOP_ITEMS_SOURCE: readonly NavTopItem[] = [
  { id: "about", label: "About", href: "/about" },
  { id: "services", label: "Services", href: "/treatments", columns: servicesMenu },
  { id: "conditions", label: "Conditions", columns: conditionsMenu, panelColumnsPerRow: 4 },
  { id: "start-here", label: "Start Here", columns: startHereMenu, panelAlign: "tab" },
  {
    id: "arc-library",
    label: "Arc Library",
    href: "/case-studies",
    columns: arcLibraryMenu,
    panelAlign: "tab",
  },
  {
    id: "financing",
    label: "Financing",
    href: "/financing",
    columns: financingMenu,
    // NOTE (Aug 2026): Financing top-bar tab hidden for now.
    // Mega-menu IA stays in `financingMenu` above — do not delete.
    // To show again: set `hidden: false` (or remove this flag).
    // Start Here still links "Pricing & Financing" → `/financing` until that changes.
    hidden: true,
  },
  {
    id: "shop",
    label: "Shop",
    columns: shopMenu,
    // NOTE (Chinh): Shop tab hidden until shop pages / ecommerce are ready.
    // To show again: set `hidden: false` (or remove this flag). Column IA stays in `shopMenu`.
    hidden: true,
  },
  { id: "contact", label: "Contact", href: "/contact" },
];

/** Top-bar items actually rendered in desktop nav + mobile drawer. */
export const ARC_NAV_TOP_ITEMS: readonly NavTopItem[] = ARC_NAV_TOP_ITEMS_SOURCE.filter(
  (item) => !item.hidden,
);

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
