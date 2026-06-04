/**
 * Builds arc-wellness-content-parity.xlsx — Overview tab + one tab per page
 * with sections, status, and notes for content recreation tracking.
 *
 * Usage: node scripts/generate-content-parity-spreadsheet.mjs
 * Requires: xlsx (devDependency)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RAW_PATH = path.join(ROOT, "documents", "arcwellness-net-crawl-raw.json");
const OUT_PATH = path.join(ROOT, "documents", "arc-wellness-content-parity.xlsx");
const OUT_FALLBACK = path.join(ROOT, "documents", "arc-wellness-content-parity.generated.xlsx");

const BASE = "https://www.arcwellness.net";

/** Canonical pages for the rebuild (order = overview row order). */
const SITEMAP = [
  {
    id: "home",
    sheet: "Home",
    label: "Home",
    livePath: "/",
    nextRoute: "/",
    contentFile: "src/content/homepage.ts",
    source: "live",
    pageStatus: "Partial",
    pageNotes: "Premium scroll layout built; sync copy from live homepage sections.",
  },
  {
    id: "about",
    sheet: "About",
    label: "About",
    livePath: "/about",
    nextRoute: "/about",
    contentFile: "src/content/pages/about.ts",
    source: "live",
    pageStatus: "Partial",
    pageNotes: "Mission/vision/founder present; verify exact live paragraphs.",
  },
  {
    id: "insights",
    sheet: "Insights",
    label: "Insights (hub)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies",
    contentFile: "src/content/pages/case-studies.ts",
    source: "rebuild-only",
    pageStatus: "In progress",
    pageNotes: "Footer “Insights” → /case-studies. Hub for case studies + blog. Not on live Squarespace site.",
  },
  {
    id: "case-studies-index",
    sheet: "Case Studies",
    label: "Case Studies (index)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies#case-studies",
    contentFile: "src/content/pages/case-studies.ts",
    source: "rebuild-only",
    pageStatus: "Not started",
    pageNotes: "Listing grid on Insights hub; may split to dedicated route later.",
  },
  {
    id: "case-study-detail",
    sheet: "Case Study Detail",
    label: "Case Study (detail template)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies/[slug]",
    contentFile: "src/content/pages/case-studies.ts (entries TBD)",
    source: "rebuild-only",
    pageStatus: "Not started",
    pageNotes: "Route + dynamic page to build. One row per published case study.",
  },
  {
    id: "blog-index",
    sheet: "Blog",
    label: "Blog (index)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/blog",
    contentFile: "src/content/pages/blog.ts (to create)",
    source: "rebuild-only",
    pageStatus: "Not started",
    pageNotes: "Blog listing page to build; linked from Insights hub.",
  },
  {
    id: "blog-post-detail",
    sheet: "Blog Post Detail",
    label: "Blog post (detail template)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/blog/[slug]",
    contentFile: "src/content/pages/blog.ts (entries TBD)",
    source: "rebuild-only",
    pageStatus: "Not started",
    pageNotes: "Route + dynamic page to build. One row per published article.",
  },
  {
    id: "our-services",
    sheet: "Our Services",
    label: "Our Services (Treatments hub)",
    livePath: "/new-page-2",
    nextRoute: "/treatments",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "Live footer Our Services → new-page-2. Sync treatmentsHub + overview slug.",
  },
  {
    id: "wellness-therapies",
    sheet: "Wellness Therapies",
    label: "Wellness Therapies (IV hub)",
    livePath: "/wellness-therapies",
    nextRoute: "/treatments#wellness",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "Merged into treatments route; add/verify wellness anchor section.",
  },
  {
    id: "exomind",
    sheet: "ExoMind",
    label: "ExoMind",
    livePath: "/exomind",
    nextRoute: "/treatments/exomind",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "emsella",
    sheet: "EmSella",
    label: "EmSella",
    livePath: "/emsella",
    nextRoute: "/treatments/emsella",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "emsculpt-neo",
    sheet: "EmSculpt Neo",
    label: "EmSculpt Neo",
    livePath: "/emsculpt-neo",
    nextRoute: "/treatments/emsculpt-neo",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "emface",
    sheet: "EmFace",
    label: "EmFace",
    livePath: "/emface",
    nextRoute: "/treatments/emface",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "exion",
    sheet: "Exion",
    label: "Exion",
    livePath: "/exion",
    nextRoute: "/treatments/exion",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "daxxify",
    sheet: "Daxxify",
    label: "Daxxify",
    livePath: "/daxxify",
    nextRoute: "/treatments/daxxify",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "rha",
    sheet: "RHA",
    label: "RHA",
    livePath: "/rha",
    nextRoute: "/treatments/rha",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "knesko",
    sheet: "Knesko",
    label: "Knesko",
    livePath: "/knesko",
    nextRoute: "/treatments/knesko",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "nutrient-therapy",
    sheet: "Nutrient Therapy",
    label: "Nutrient / Vitamin Therapy",
    livePath: "/vitamin-therapy",
    nextRoute: "/treatments/nutrient-therapy",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "peptide-therapy",
    sheet: "Peptide Therapy",
    label: "Peptide Therapy",
    livePath: "(legacy /new-page-1)",
    nextRoute: "/treatments/peptide-therapy",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "Legacy live slug removed from crawl; sync from nav + treatments.ts draft.",
  },
  {
    id: "supplements",
    sheet: "Supplements",
    label: "Supplements",
    livePath: "/supplements",
    nextRoute: "/treatments/supplements",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Partial",
    pageNotes: "",
  },
  {
    id: "aesthetics",
    sheet: "Arc Aesthetics",
    label: "Arc Aesthetics",
    livePath: "/aesthetics",
    nextRoute: "/aesthetics",
    contentFile: "src/content/pages/aesthetics.ts",
    pageStatus: "Review",
    pageNotes: "Full copy pass needed vs live.",
  },
  {
    id: "programs",
    sheet: "Arc Programs",
    label: "Arc Programs",
    livePath: "/plans",
    nextRoute: "/programs",
    contentFile: "src/content/pages/programs.ts",
    pageStatus: "Review",
    pageNotes: "Live slug is /plans.",
  },
  {
    id: "financing",
    sheet: "Financing",
    label: "Financing",
    livePath: "/financing",
    nextRoute: "/financing",
    contentFile: "src/content/pages/financing.ts",
    pageStatus: "Partial",
    pageNotes: "Live page is minimal.",
  },
  {
    id: "contact",
    sheet: "Contact",
    label: "Contact",
    livePath: "/contact",
    nextRoute: "/contact",
    contentFile: "src/content/pages/contact.ts",
    pageStatus: "Partial",
    pageNotes: "Verify hours, form fields, hero.",
  },
  {
    id: "book",
    sheet: "Book Now",
    label: "Book Now",
    livePath: "https://booking.mangomint.com/892312",
    nextRoute: "/book",
    contentFile: "src/app/book/page.tsx",
    pageStatus: "Partial",
    pageNotes: "Redirect or embed Mangomint.",
  },
  {
    id: "privacy",
    sheet: "Privacy",
    label: "Privacy Policy",
    livePath: "(footer link — not in sitemap)",
    nextRoute: "/privacy",
    contentFile: "src/app/privacy/page.tsx",
    pageStatus: "Not started",
    pageNotes: "Need approved legal copy from client.",
  },
  {
    id: "terms",
    sheet: "Terms",
    label: "Terms & Conditions",
    livePath: "(footer link — not in sitemap)",
    nextRoute: "/terms",
    contentFile: "src/app/terms/page.tsx",
    pageStatus: "Not started",
    pageNotes: "Need approved legal copy from client.",
  },
  {
    id: "footer",
    sheet: "Site Footer",
    label: "Site-wide footer",
    livePath: "(all pages)",
    nextRoute: "ArcFooter",
    contentFile: "src/components/arc/ArcFooter.tsx",
    pageStatus: "Partial",
    pageNotes: "Address, phone, email, quick links, legal, social.",
  },
];

const SECTION_HEADERS = [
  "Order",
  "Section",
  "Type",
  "Live reference (heading / element)",
  "Status",
  "Notes",
  "Owner",
];

const STATUS_OPTIONS =
  "Pending | In progress | Review | Done | Blocked | N/A";

function loadCrawlByPath() {
  const raw = JSON.parse(fs.readFileSync(RAW_PATH, "utf8"));
  const map = new Map();
  for (const p of raw.pages) {
    map.set(p.path, p);
  }
  return map;
}

function headingType(level, text, inFaq) {
  if (inFaq) return "FAQ item";
  if (level === 1) return "Hero / H1";
  if (level === 4 && text.length < 80) return "Eyebrow / lead";
  if (/^faq/i.test(text)) return "FAQ block";
  if (/book|appointment|explore|learn more|browse|see /i.test(text)) return "CTA";
  return "Content (H2)";
}

function sectionsFromCrawl(crawlPage) {
  const rows = [];
  let order = 1;

  rows.push({
    Order: order++,
    Section: "SEO — page title",
    Type: "SEO",
    "Live reference (heading / element)": crawlPage.meta?.title?.replace(/&mdash;/g, "—") || "",
    Status: "Pending",
    Notes: "",
    Owner: "",
  });

  if (crawlPage.meta?.description) {
    rows.push({
      Order: order++,
      Section: "SEO — meta description",
      Type: "SEO",
      "Live reference (heading / element)": crawlPage.meta.description.replace(/&mdash;/g, "—"),
      Status: "Pending",
      Notes: "",
      Owner: "",
    });
  }

  let inFaq = false;
  const headings = (crawlPage.headings || []).filter(
    (h) => !/^\d+$/.test(h.text.trim()),
  );

  for (const h of headings) {
    const text = h.text.replace(/\s+/g, " ").trim();
    if (!text) continue;

    if (/^faq/i.test(text) && h.level <= 2) {
      inFaq = true;
      rows.push({
        Order: order++,
        Section: text,
        Type: "FAQ block",
        "Live reference (heading / element)": text,
        Status: "Pending",
        Notes: "Group all FAQ Q&A under this section",
        Owner: "",
      });
      continue;
    }

    if (inFaq && h.level >= 3) {
      rows.push({
        Order: order++,
        Section: text,
        Type: "FAQ item",
        "Live reference (heading / element)": text,
        Status: "Pending",
        Notes: "",
        Owner: "",
      });
      continue;
    }

    if (inFaq && h.level <= 2 && !/^faq/i.test(text)) {
      inFaq = false;
    }

    const type = headingType(h.level, text, false);
    rows.push({
      Order: order++,
      Section: text,
      Type: type,
      "Live reference (heading / element)": `H${h.level}: ${text}`,
      Status: "Pending",
      Notes: "",
      Owner: "",
    });
  }

  rows.push({
    Order: order++,
    Section: "Primary CTA / booking",
    Type: "CTA",
    "Live reference (heading / element)": "Book / Explore buttons on live page",
    Status: "Pending",
    Notes: "Wire to /book or /contact as on live site",
    Owner: "",
  });

  rows.push({
    Order: order++,
    Section: "Imagery / media",
    Type: "Assets",
    "Live reference (heading / element)": "Hero + inline images on live page",
    Status: "Pending",
    Notes: "Replace with production assets in public/assets/",
    Owner: "",
  });

  return rows;
}

function defaultFooterSections() {
  return [
    { Order: 1, Section: "Address block", Type: "Contact", "Live reference (heading / element)": "5000 Cedar Plaza Parkway, Ste 230, St Louis, MO 63128", Status: "Pending", Notes: "", Owner: "" },
    { Order: 2, Section: "Phone", Type: "Contact", "Live reference (heading / element)": "636-400-5500", Status: "Pending", Notes: "", Owner: "" },
    { Order: 3, Section: "Email", Type: "Contact", "Live reference (heading / element)": "info@arcwellness.net", Status: "Pending", Notes: "", Owner: "" },
    { Order: 4, Section: "Quick links", Type: "Navigation", "Live reference (heading / element)": "About · Insights · Our Services · Wellness Therapies · Packages · Financing · Contact", Status: "Pending", Notes: "Insights → /case-studies; Our Services → /treatments", Owner: "" },
    { Order: 5, Section: "Social links", Type: "Social", "Live reference (heading / element)": "Instagram, Facebook, TikTok, X", Status: "Pending", Notes: "See siteMeta.ts", Owner: "" },
    { Order: 6, Section: "Legal links", Type: "Legal", "Live reference (heading / element)": "Privacy Policy · Terms and Conditions", Status: "Pending", Notes: "", Owner: "" },
    { Order: 7, Section: "Copyright", Type: "Legal", "Live reference (heading / element)": "© 2025 All Rights Reserved", Status: "Pending", Notes: "", Owner: "" },
  ];
}

function defaultBookSections() {
  return [
    { Order: 1, Section: "Mangomint booking URL", Type: "External", "Live reference (heading / element)": "https://booking.mangomint.com/892312", Status: "Pending", Notes: "Redirect or iframe on /book", Owner: "" },
    { Order: 2, Section: "Nav CTA consistency", Type: "CTA", "Live reference (heading / element)": "Book Now in header", Status: "Pending", Notes: "", Owner: "" },
  ];
}

function defaultLegalSections(title) {
  return [
    { Order: 1, Section: title, Type: "Legal", "Live reference (heading / element)": "Footer link only — no crawlable page on live site", Status: "Not started", Notes: "Obtain approved copy from client", Owner: "" },
  ];
}

function defaultPeptideSections() {
  return [
    { Order: 1, Section: "SEO — page title", Type: "SEO", "Live reference (heading / element)": "Peptide Therapy — Arc Wellness", Status: "Pending", Notes: "Legacy URL was /new-page-1", Owner: "" },
    { Order: 2, Section: "Hero / introduction", Type: "Hero / H1", "Live reference (heading / element)": "Peptide therapy overview", Status: "Pending", Notes: "Cross-check treatments.ts + live nav", Owner: "" },
    { Order: 3, Section: "Benefits / who it helps", Type: "Content (H2)", "Live reference (heading / element)": "", Status: "Pending", Notes: "", Owner: "" },
    { Order: 4, Section: "FAQs", Type: "FAQ block", "Live reference (heading / element)": "", Status: "Pending", Notes: "", Owner: "" },
    { Order: 5, Section: "Primary CTA / booking", Type: "CTA", "Live reference (heading / element)": "", Status: "Pending", Notes: "", Owner: "" },
  ];
}

function defaultInsightsSections() {
  return [
    { Order: 1, Section: "SEO — page title", Type: "SEO", "Live reference (heading / element)": "Blogs & Case Studies | Arc Wellness", Status: "In progress", Notes: "case-studies.ts", Owner: "" },
    { Order: 2, Section: "SEO — meta description", Type: "SEO", "Live reference (heading / element)": "Patient stories, clinical insights, and wellness education…", Status: "In progress", Notes: "", Owner: "" },
    { Order: 3, Section: "Hero — Insights eyebrow + headline", Type: "Hero / H1", "Live reference (heading / element)": "Insights · Stories & case studies", Status: "In progress", Notes: "ScrollChapterIntroSection", Owner: "" },
    { Order: 4, Section: "Hero — intro body + primary CTA", Type: "CTA", "Live reference (heading / element)": "Book a free consultation → /book", Status: "In progress", Notes: "", Owner: "" },
    { Order: 5, Section: "Case studies preview / entry", Type: "Navigation", "Live reference (heading / element)": "Link or embed to #case-studies listing", Status: "Not started", Notes: "Replace coming-soon-only layout with real index", Owner: "" },
    { Order: 6, Section: "Blog preview / entry", Type: "Navigation", "Live reference (heading / element)": "Link to /blog index", Status: "Not started", Notes: "New section on Insights hub", Owner: "" },
    { Order: 7, Section: "Coming soon banner (interim)", Type: "Content (H2)", "Live reference (heading / element)": "New articles on the way", Status: "In progress", Notes: "Remove when content live", Owner: "" },
    { Order: 8, Section: "Editorial band — Stay connected", Type: "Content (H2)", "Live reference (heading / element)": "Wellness made personal", Status: "In progress", Notes: "ArcScrollEditorialSection", Owner: "" },
    { Order: 9, Section: "Invest / membership CTA band", Type: "CTA", "Live reference (heading / element)": "InvestCTASection", Status: "In progress", Notes: "", Owner: "" },
    { Order: 10, Section: "Imagery / media", Type: "Assets", "Live reference (heading / element)": "Hero + editorial images", Status: "Pending", Notes: "clinic interior assets", Owner: "" },
  ];
}

function defaultCaseStudiesIndexSections() {
  return [
    { Order: 1, Section: "Section intro / headline", Type: "Hero / H1", "Live reference (heading / element)": "Case studies", Status: "Not started", Notes: "On Insights hub or dedicated index", Owner: "" },
    { Order: 2, Section: "Featured case study (optional)", Type: "Content (H2)", "Live reference (heading / element)": "Highlight card", Status: "Not started", Notes: "", Owner: "" },
    { Order: 3, Section: "Case study grid / list", Type: "Listing", "Live reference (heading / element)": "Card per story: title, excerpt, treatment tags, image", Status: "Not started", Notes: "Content entries in case-studies.ts", Owner: "" },
    { Order: 4, Section: "Filters / categories (optional)", Type: "UI", "Live reference (heading / element)": "By treatment or concern", Status: "Not started", Notes: "", Owner: "" },
    { Order: 5, Section: "Empty state copy", Type: "Content (H2)", "Live reference (heading / element)": "When no stories published yet", Status: "In progress", Notes: "Currently covered by coming soon", Owner: "" },
    { Order: 6, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "Book consult / Contact", Status: "Pending", Notes: "", Owner: "" },
  ];
}

function defaultCaseStudyDetailSections() {
  return [
    { Order: 1, Section: "SEO — title & description", Type: "SEO", "Live reference (heading / element)": "Per case study entry", Status: "Not started", Notes: "/case-studies/[slug]", Owner: "" },
    { Order: 2, Section: "Hero — patient / story title", Type: "Hero / H1", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 3, Section: "Context — concern & goals", Type: "Content (H2)", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 4, Section: "Treatment plan summary", Type: "Content (H2)", "Live reference (heading / element)": "Modalities used", Status: "Not started", Notes: "Link to /treatments/…", Owner: "" },
    { Order: 5, Section: "Results / outcomes", Type: "Content (H2)", "Live reference (heading / element)": "Before/after or narrative", Status: "Not started", Notes: "HIPAA-compliant copy only", Owner: "" },
    { Order: 6, Section: "Pull quote / testimonial", Type: "Content (H2)", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 7, Section: "Gallery / imagery", Type: "Assets", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 8, Section: "Related case studies", Type: "Navigation", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 9, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "Book consultation", Status: "Not started", Notes: "", Owner: "" },
  ];
}

function defaultBlogIndexSections() {
  return [
    { Order: 1, Section: "SEO — page title & description", Type: "SEO", "Live reference (heading / element)": "Blog | Arc Wellness Insights", Status: "Not started", Notes: "New route /blog", Owner: "" },
    { Order: 2, Section: "Hero — blog headline & intro", Type: "Hero / H1", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 3, Section: "Featured article (optional)", Type: "Content (H2)", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 4, Section: "Article grid / list", Type: "Listing", "Live reference (heading / element)": "Card: title, excerpt, date, category, image", Status: "Not started", Notes: "blog.ts entries", Owner: "" },
    { Order: 5, Section: "Categories / tags filter", Type: "UI", "Live reference (heading / element)": "Longevity, aesthetics, recovery, etc.", Status: "Not started", Notes: "", Owner: "" },
    { Order: 6, Section: "Newsletter / subscribe (optional)", Type: "CTA", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 7, Section: "Link back to Insights hub", Type: "Navigation", "Live reference (heading / element)": "/case-studies", Status: "Not started", Notes: "", Owner: "" },
    { Order: 8, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "Book / Contact", Status: "Not started", Notes: "", Owner: "" },
  ];
}

function defaultBlogPostSections() {
  return [
    { Order: 1, Section: "SEO — title & description", Type: "SEO", "Live reference (heading / element)": "Per blog post entry", Status: "Not started", Notes: "/blog/[slug]", Owner: "" },
    { Order: 2, Section: "Hero — article title", Type: "Hero / H1", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 3, Section: "Byline — author, date, category", Type: "Meta", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 4, Section: "Featured image", Type: "Assets", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 5, Section: "Article body (MDX or rich text)", Type: "Content (H2)", "Live reference (heading / element)": "H2/H3 sections", Status: "Not started", Notes: "", Owner: "" },
    { Order: 6, Section: "Pull quotes / callouts", Type: "Content (H2)", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 7, Section: "Related articles", Type: "Navigation", "Live reference (heading / element)": "", Status: "Not started", Notes: "", Owner: "" },
    { Order: 8, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "Book / treatments", Status: "Not started", Notes: "", Owner: "" },
  ];
}

function buildPageSections(page, crawlByPath) {
  if (page.id === "insights") return defaultInsightsSections();
  if (page.id === "case-studies-index") return defaultCaseStudiesIndexSections();
  if (page.id === "case-study-detail") return defaultCaseStudyDetailSections();
  if (page.id === "blog-index") return defaultBlogIndexSections();
  if (page.id === "blog-post-detail") return defaultBlogPostSections();
  if (page.id === "footer") return defaultFooterSections();
  if (page.id === "book") return defaultBookSections();
  if (page.id === "privacy") return defaultLegalSections("Privacy Policy body");
  if (page.id === "terms") return defaultLegalSections("Terms & Conditions body");
  if (page.id === "peptide-therapy") return defaultPeptideSections();

  const livePath =
    typeof page.livePath === "string" && page.livePath.startsWith("/")
      ? page.livePath
      : null;

  if (!livePath) {
    return [
      {
        Order: 1,
        Section: "Configure from live site",
        Type: "Content",
        "Live reference (heading / element)": page.livePath,
        Status: "Pending",
        Notes: "",
        Owner: "",
      },
    ];
  }

  const crawl = crawlByPath.get(livePath);
  if (!crawl) {
    return [
      {
        Order: 1,
        Section: "No crawl data — run crawl script",
        Type: "Content",
        "Live reference (heading / element)": livePath,
        Status: "Blocked",
        Notes: "node scripts/crawl-arcwellness-net.mjs",
        Owner: "",
      },
    ];
  }

  return sectionsFromCrawl(crawl);
}

function sanitizeSheetName(name, used) {
  let s = name.replace(/[\\/?*[\]:]/g, "").trim();
  if (s.length > 31) s = s.slice(0, 31);
  let base = s;
  let n = 2;
  while (used.has(s)) {
    const suffix = ` ${n}`;
    s = base.slice(0, 31 - suffix.length) + suffix;
    n++;
  }
  used.add(s);
  return s;
}

function main() {
  if (!fs.existsSync(RAW_PATH)) {
    console.error("Missing crawl raw JSON. Run: node scripts/crawl-arcwellness-net.mjs");
    process.exit(1);
  }

  const crawlByPath = loadCrawlByPath();
  const wb = XLSX.utils.book_new();
  const usedNames = new Set(["Overview"]);

  const overviewRows = [
    {
      "#": "",
      Page: "ARC Wellness — content parity tracker",
      Source: "",
      "Live URL": "",
      "Next.js route": "",
      "Content file": "",
      "Excel tab": "",
      Sections: "",
      "Page status": "",
      Notes: `Status values: ${STATUS_OPTIONS}. Source: live = arcwellness.net · rebuild-only = new in Next.js. Regenerate: npm run content:spreadsheet`,
    },
    {},
  ];

  SITEMAP.forEach((page, i) => {
    const sections = buildPageSections(page, crawlByPath);
    const liveUrl =
      typeof page.livePath === "string" && page.livePath.startsWith("/")
        ? `${BASE}${page.livePath}`
        : page.livePath;
    const source = page.source || "live";

    overviewRows.push({
      "#": i + 1,
      Page: page.label,
      Source: source === "rebuild-only" ? "Rebuild only" : "Live site",
      "Live URL": liveUrl,
      "Next.js route": page.nextRoute,
      "Content file": page.contentFile,
      "Excel tab": page.sheet,
      Sections: sections.length,
      "Page status": page.pageStatus,
      Notes: page.pageNotes,
    });

    const sheetName = sanitizeSheetName(page.sheet, usedNames);
    const sheetRows = [
      {
        Order: "",
        Section: page.label,
        Type: source === "rebuild-only" ? "Rebuild only" : "Live parity",
        "Live reference (heading / element)": liveUrl,
        Status: "",
        Notes: page.pageNotes,
        Owner: "",
      },
      {
        Order: "",
        Section: `Next.js: ${page.nextRoute}`,
        Type: "",
        "Live reference (heading / element)": page.contentFile,
        Status: page.pageStatus,
        Notes: "",
        Owner: "",
      },
      {},
      Object.fromEntries(SECTION_HEADERS.map((h) => [h, h])),
      ...sections,
    ];

    const ws = XLSX.utils.json_to_sheet(sheetRows, { skipHeader: true });
    ws["!cols"] = [
      { wch: 6 },
      { wch: 42 },
      { wch: 14 },
      { wch: 55 },
      { wch: 14 },
      { wch: 36 },
      { wch: 12 },
    ];
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  const overviewWs = XLSX.utils.json_to_sheet(overviewRows, { skipHeader: true });
  overviewWs["!cols"] = [
    { wch: 4 },
    { wch: 32 },
    { wch: 14 },
    { wch: 42 },
    { wch: 28 },
    { wch: 34 },
    { wch: 18 },
    { wch: 10 },
    { wch: 14 },
    { wch: 48 },
  ];
  XLSX.utils.book_append_sheet(wb, overviewWs, "Overview");

  try {
    XLSX.writeFile(wb, OUT_PATH);
    console.log(`Wrote ${OUT_PATH}`);
  } catch (err) {
    if (err?.code === "EBUSY") {
      XLSX.writeFile(wb, OUT_FALLBACK);
      console.log(`Wrote ${OUT_FALLBACK}`);
      console.log("  (Close arc-wellness-content-parity.xlsx in Excel, then re-run to overwrite.)");
    } else {
      throw err;
    }
  }
  console.log(`  Pages: ${SITEMAP.length} (+ Overview tab)`);
}

main();
