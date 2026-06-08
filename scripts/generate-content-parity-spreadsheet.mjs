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
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "about",
    sheet: "About",
    label: "About",
    livePath: "/about",
    nextRoute: "/about",
    contentFile: "src/content/pages/about.ts",
    source: "live",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "insights",
    sheet: "Insights",
    label: "Insights (hub)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies",
    contentFile: "src/content/pages/insights.ts, data/insights-entries.json",
    source: "rebuild-only",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "case-studies-index",
    sheet: "Case Studies",
    label: "Case Studies (index)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies?filter=case-study",
    contentFile: "src/content/pages/insights.ts, data/insights-entries.json",
    source: "rebuild-only",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "case-study-detail",
    sheet: "Case Study Detail",
    label: "Case Study (detail template)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies/[slug]",
    contentFile: "data/insights-entries.json",
    source: "rebuild-only",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "blog-index",
    sheet: "Blog",
    label: "Blog (index)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/case-studies?filter=blog",
    contentFile: "src/content/pages/insights.ts, data/insights-entries.json",
    source: "rebuild-only",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "blog-post-detail",
    sheet: "Blog Post Detail",
    label: "Blog post (detail template)",
    livePath: "(not on arcwellness.net)",
    nextRoute: "/blog/[slug]",
    contentFile: "data/insights-entries.json",
    source: "rebuild-only",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "our-services",
    sheet: "Our Services",
    label: "Our Services (Treatments hub)",
    livePath: "/new-page-2",
    nextRoute: "/treatments",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentsPageContent + ArcTreatmentsPinExplorer — live Our Services copy synced.",
  },
  {
    id: "wellness-therapies",
    sheet: "Wellness Therapies",
    label: "Wellness Therapies (IV hub)",
    livePath: "/wellness-therapies",
    nextRoute: "/treatments#wellness",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "Wellness category + nutrient/peptide/supplements on hub; no separate live URL in rebuild.",
  },
  {
    id: "exomind",
    sheet: "ExoMind",
    label: "ExoMind",
    livePath: "/exomind",
    nextRoute: "/treatments/exomind",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy + FAQs synced.",
  },
  {
    id: "emsella",
    sheet: "EmSella",
    label: "EmSella",
    livePath: "/emsella",
    nextRoute: "/treatments/emsella",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy + FAQs synced.",
  },
  {
    id: "emsculpt-neo",
    sheet: "EmSculpt Neo",
    label: "EmSculpt Neo",
    livePath: "/emsculpt-neo",
    nextRoute: "/treatments/emsculpt-neo",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy + FAQs synced.",
  },
  {
    id: "emface",
    sheet: "EmFace",
    label: "EmFace",
    livePath: "/emface",
    nextRoute: "/treatments/emface",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "exion",
    sheet: "Exion",
    label: "Exion",
    livePath: "/exion",
    nextRoute: "/treatments/exion",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "daxxify",
    sheet: "Daxxify",
    label: "Daxxify",
    livePath: "/daxxify",
    nextRoute: "/treatments/daxxify",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "rha",
    sheet: "RHA",
    label: "RHA",
    livePath: "/rha",
    nextRoute: "/treatments/rha",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "knesko",
    sheet: "Knesko",
    label: "Knesko",
    livePath: "/knesko",
    nextRoute: "/treatments/knesko",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "nutrient-therapy",
    sheet: "Nutrient Therapy",
    label: "Nutrient / Vitamin Therapy",
    livePath: "/vitamin-therapy",
    nextRoute: "/treatments/nutrient-therapy",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "peptide-therapy",
    sheet: "Peptide Therapy",
    label: "Peptide Therapy",
    livePath: "(legacy /new-page-1)",
    nextRoute: "/treatments/peptide-therapy",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "Synced from crawl + treatments.ts (legacy live /new-page-1).",
  },
  {
    id: "supplements",
    sheet: "Supplements",
    label: "Supplements",
    livePath: "/supplements",
    nextRoute: "/treatments/supplements",
    contentFile: "src/content/pages/treatments.ts",
    pageStatus: "Completed",
    pageNotes: "TreatmentDetailContent — live copy synced.",
  },
  {
    id: "aesthetics",
    sheet: "Arc Aesthetics",
    label: "Arc Aesthetics",
    livePath: "/aesthetics",
    nextRoute: "/aesthetics",
    contentFile: "src/content/pages/aesthetics.ts",
    pageStatus: "Completed",
    pageNotes: "Hero + principles synced from live.",
  },
  {
    id: "programs",
    sheet: "Arc Programs",
    label: "Arc Programs",
    livePath: "/plans",
    nextRoute: "/programs",
    contentFile: "src/content/pages/programs.ts",
    pageStatus: "In progress",
    pageNotes: "Page is built and copy is synced; detailed membership/pricing tables still to finalize with the client.",
  },
  {
    id: "financing",
    sheet: "Financing",
    label: "Financing",
    livePath: "/financing",
    nextRoute: "/financing",
    contentFile: "src/content/pages/financing.ts",
    pageStatus: "Completed",
    pageNotes: "SEO + hero synced; live page minimal.",
  },
  {
    id: "contact",
    sheet: "Contact",
    label: "Contact",
    livePath: "/contact",
    nextRoute: "/contact",
    contentFile: "src/content/pages/contact.ts",
    pageStatus: "Completed",
    pageNotes: "ContactPageContent — channels + hero from live.",
  },
  {
    id: "book",
    sheet: "Book Now",
    label: "Book Now",
    livePath: "https://booking.mangomint.com/892312",
    nextRoute: "/book",
    contentFile: "src/app/book/page.tsx",
    pageStatus: "Completed",
    pageNotes: "",
  },
  {
    id: "privacy",
    sheet: "Privacy",
    label: "Privacy Policy",
    livePath: "(footer link — not in sitemap)",
    nextRoute: "/privacy",
    contentFile: "src/app/privacy/page.tsx",
    pageStatus: "Pending",
    pageNotes: "Placeholder page only — waiting on approved Privacy Policy copy from the client.",
  },
  {
    id: "terms",
    sheet: "Terms",
    label: "Terms & Conditions",
    livePath: "(footer link — not in sitemap)",
    nextRoute: "/terms",
    contentFile: "src/app/terms/page.tsx",
    pageStatus: "Pending",
    pageNotes: "Placeholder page only — waiting on approved Terms & Conditions copy from the client.",
  },
  {
    id: "footer",
    sheet: "Site Footer",
    label: "Site-wide footer",
    livePath: "(all pages)",
    nextRoute: "ArcFooter",
    contentFile: "src/components/arc/ArcFooter.tsx",
    pageStatus: "Completed",
    pageNotes: "",
  },
];

/** Completed pages get no overview note — notes are only for In progress / Pending. */
function normalizePageNotes() {
  for (const page of SITEMAP) {
    if (page.pageStatus === "Completed") page.pageNotes = "";
  }
}

const SECTION_HEADERS = [
  "Order",
  "Section",
  "Type",
  "Live reference (heading / element)",
  "Status",
  "Notes",
  "Owner",
];

/** Shareable tracker — use only these three values in the Status column. */
const STATUS_OPTIONS = "Completed | In progress | Pending";

const COMPLETED_PAGE_IDS = new Set([
  "home",
  "about",
  "insights",
  "case-studies-index",
  "case-study-detail",
  "blog-index",
  "blog-post-detail",
  "our-services",
  "wellness-therapies",
  "exomind",
  "emsella",
  "emsculpt-neo",
  "emface",
  "exion",
  "daxxify",
  "rha",
  "knesko",
  "nutrient-therapy",
  "peptide-therapy",
  "supplements",
  "aesthetics",
  "financing",
  "contact",
  "book",
  "footer",
]);

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
    Status: "Completed",
    Notes: "",
    Owner: "",
  });

  if (crawlPage.meta?.description) {
    rows.push({
      Order: order++,
      Section: "SEO — meta description",
      Type: "SEO",
      "Live reference (heading / element)": crawlPage.meta.description.replace(/&mdash;/g, "—"),
      Status: "Completed",
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
        Status: "Completed",
        Notes: "",
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
        Status: "Completed",
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
      Status: "Completed",
      Notes: "",
      Owner: "",
    });
  }

  rows.push({
    Order: order++,
    Section: "Primary CTA / booking",
    Type: "CTA",
    "Live reference (heading / element)": "Book / Explore buttons on live page",
    Status: "Completed",
    Notes: "",
    Owner: "",
  });

  rows.push({
    Order: order++,
    Section: "Imagery / media",
    Type: "Assets",
    "Live reference (heading / element)": "Hero + inline images on live page",
    Status: "In progress",
    Notes: "Optional polish — replace any remaining stock shots with final clinic photography.",
    Owner: "",
  });

  return rows;
}

function defaultFooterSections() {
  return [
    { Order: 1, Section: "Address block", Type: "Contact", "Live reference (heading / element)": "5000 Cedar Plaza Parkway, Ste 230, St Louis, MO 63128", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Phone", Type: "Contact", "Live reference (heading / element)": "636-400-5500", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Email", Type: "Contact", "Live reference (heading / element)": "info@arcwellness.net", Status: "Completed", Notes: "", Owner: "" },
    { Order: 4, Section: "Quick links", Type: "Navigation", "Live reference (heading / element)": "About · Insights · Treatments · Programs · Financing · Contact", Status: "Completed", Notes: "", Owner: "" },
    { Order: 5, Section: "Social links", Type: "Social", "Live reference (heading / element)": "Instagram, Facebook, TikTok, X", Status: "Completed", Notes: "", Owner: "" },
    { Order: 6, Section: "Legal links", Type: "Legal", "Live reference (heading / element)": "Privacy Policy · Terms and Conditions", Status: "Pending", Notes: "Footer links exist; destination pages need client legal copy.", Owner: "" },
    { Order: 7, Section: "Copyright", Type: "Legal", "Live reference (heading / element)": "© 2025 All Rights Reserved", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultBookSections() {
  return [
    { Order: 1, Section: "Mangomint booking URL", Type: "External", "Live reference (heading / element)": "https://booking.mangomint.com/892312", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Intro + contact fallback", Type: "CTA", "Live reference (heading / element)": "/book page + siteMeta.bookingUrl", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultLegalSections(title) {
  return [
    { Order: 1, Section: title, Type: "Legal", "Live reference (heading / element)": "Placeholder page shell only", Status: "Pending", Notes: "Waiting on approved legal copy from the client.", Owner: "" },
  ];
}

function defaultPeptideSections() {
  return [
    { Order: 1, Section: "SEO — page title", Type: "SEO", "Live reference (heading / element)": "Peptide Therapy — Arc Wellness", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Hero / introduction", Type: "Hero / H1", "Live reference (heading / element)": "Peptide therapy overview", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Benefits / who it helps", Type: "Content (H2)", "Live reference (heading / element)": "Synced in treatments.ts", Status: "Completed", Notes: "", Owner: "" },
    { Order: 4, Section: "FAQs", Type: "FAQ block", "Live reference (heading / element)": "Treatment FAQs", Status: "Completed", Notes: "", Owner: "" },
    { Order: 5, Section: "Primary CTA / booking", Type: "CTA", "Live reference (heading / element)": "/book", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultProgramsSections() {
  return [
    { Order: 1, Section: "SEO + hero", Type: "Hero / H1", "Live reference (heading / element)": "Arc Programs page", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Program summaries", Type: "Content (H2)", "Live reference (heading / element)": "programs.ts copy", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Membership / pricing tables", Type: "Content (H2)", "Live reference (heading / element)": "Detailed pricing UI", Status: "In progress", Notes: "Page is completed except pricing tables — layout and final numbers still to confirm with client.", Owner: "" },
    { Order: 4, Section: "Primary CTA / booking", Type: "CTA", "Live reference (heading / element)": "/book", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultHomeSections() {
  return [
    { Order: 1, Section: "Site header + mobile nav", Type: "Navigation", "Live reference (heading / element)": "ArcSiteHeader", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Scroll-expand hero", Type: "Hero / H1", "Live reference (heading / element)": "ScrollExpandHero", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Concerns pin — We hear you", Type: "Content (H2)", "Live reference (heading / element)": "ArcConcernsPinnedSection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 4, Section: "Welcome / who we are", Type: "Content (H2)", "Live reference (heading / element)": "#about — ArcWelcomeSplitSection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 5, Section: "Founder intro", Type: "Content (H2)", "Live reference (heading / element)": "#founder — ArcFounderIntroSection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 6, Section: "Whole-body services slider", Type: "Content (H2)", "Live reference (heading / element)": "#services — WholeBodySection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 7, Section: "Your path intro + 5 steps", Type: "Content (H2)", "Live reference (heading / element)": "#path — YourPathSection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 8, Section: "Testimonials sphere + cards", Type: "Content (H2)", "Live reference (heading / element)": "#testimonials — ArcTestimonialsSection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 9, Section: "Invest / book CTA band", Type: "CTA", "Live reference (heading / element)": "#book — InvestCTASection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 10, Section: "Footer", Type: "Navigation", "Live reference (heading / element)": "ArcFooter", Status: "Completed", Notes: "", Owner: "" },
    { Order: 11, Section: "Imagery / media", Type: "Assets", "Live reference (heading / element)": "public/assets/", Status: "In progress", Notes: "Optional polish — swap any remaining stock placeholders for final clinic photography.", Owner: "" },
  ];
}

function defaultInsightsSections() {
  return [
    { Order: 1, Section: "SEO — page title", Type: "SEO", "Live reference (heading / element)": "Insights | Blogs & Case Studies", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "SEO — meta description", Type: "SEO", "Live reference (heading / element)": "Patient stories, clinical insights…", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Insights feed masthead", Type: "Hero / H1", "Live reference (heading / element)": "ArcInsightsFeedSection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 4, Section: "Filter tabs — All · Blogs · Case studies", Type: "UI", "Live reference (heading / element)": "Underline tab filter", Status: "Completed", Notes: "", Owner: "" },
    { Order: 5, Section: "Article / case study grid", Type: "Listing", "Live reference (heading / element)": "6 seed entries in insights-entries.json", Status: "Completed", Notes: "", Owner: "" },
    { Order: 6, Section: "Detail pages — /blog/[slug], /case-studies/[slug]", Type: "Navigation", "Live reference (heading / element)": "InsightDetailContent", Status: "Completed", Notes: "", Owner: "" },
    { Order: 7, Section: "Admin CMS", Type: "Internal", "Live reference (heading / element)": "/admin/insights", Status: "Completed", Notes: "", Owner: "" },
    { Order: 8, Section: "Invest CTA band", Type: "CTA", "Live reference (heading / element)": "InvestCTASection", Status: "Completed", Notes: "", Owner: "" },
    { Order: 9, Section: "Ongoing editorial", Type: "Content (H2)", "Live reference (heading / element)": "Additional blogs & case studies", Status: "In progress", Notes: "Hub is completed with seed content; team can add more stories over time.", Owner: "" },
  ];
}

function defaultCaseStudiesIndexSections() {
  return [
    { Order: 1, Section: "Case studies tab on Insights hub", Type: "Listing", "Live reference (heading / element)": "/case-studies?filter=case-study", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Case study cards", Type: "Listing", "Live reference (heading / element)": "2 published stories", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "InvestCTASection on hub", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultCaseStudyDetailSections() {
  return [
    { Order: 1, Section: "SEO — title & description", Type: "SEO", "Live reference (heading / element)": "Per entry in insights-entries.json", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Article hero + body", Type: "Hero / H1", "Live reference (heading / element)": "InsightDetailContent", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "Book / contact", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultBlogIndexSections() {
  return [
    { Order: 1, Section: "Blogs tab on Insights hub", Type: "Listing", "Live reference (heading / element)": "/case-studies?filter=blog", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Blog post cards", Type: "Listing", "Live reference (heading / element)": "4 published posts", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "InvestCTASection on hub", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function defaultBlogPostSections() {
  return [
    { Order: 1, Section: "SEO — title & description", Type: "SEO", "Live reference (heading / element)": "Per entry in insights-entries.json", Status: "Completed", Notes: "", Owner: "" },
    { Order: 2, Section: "Article hero + body", Type: "Hero / H1", "Live reference (heading / element)": "InsightDetailContent", Status: "Completed", Notes: "", Owner: "" },
    { Order: 3, Section: "Primary CTA", Type: "CTA", "Live reference (heading / element)": "Book / contact", Status: "Completed", Notes: "", Owner: "" },
  ];
}

function buildPageSections(page, crawlByPath) {
  if (page.id === "home") return defaultHomeSections();
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
  if (page.id === "programs") return defaultProgramsSections();

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
        Section: "Page built in Next.js",
        Type: "Content",
        "Live reference (heading / element)": livePath,
        Status: COMPLETED_PAGE_IDS.has(page.id) ? "Completed" : "Pending",
        Notes: COMPLETED_PAGE_IDS.has(page.id) ? "" : "No crawl row — verify content in repo.",
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

  normalizePageNotes();
  const crawlByPath = loadCrawlByPath();
  const wb = XLSX.utils.book_new();
  const usedNames = new Set(["Overview"]);

  const completedCount = SITEMAP.filter((p) => p.pageStatus === "Completed").length;
  const inProgressCount = SITEMAP.filter((p) => p.pageStatus === "In progress").length;
  const pendingCount = SITEMAP.filter((p) => p.pageStatus === "Pending").length;

  const overviewRows = [
    {
      "#": "",
      Page: "ARC Wellness — site build tracker",
      Source: "",
      "Live URL": "",
      "Next.js route": "",
      "Content file": "",
      "Excel tab": "",
      Sections: "",
      "Page status": "",
      Notes: `Share with team. Status = ${STATUS_OPTIONS}. Completed = shipped on arcwellness.netlify.app. Notes column explains only In progress / Pending items.`,
    },
    {
      "#": "",
      Page: "Summary",
      Source: "",
      "Live URL": "",
      "Next.js route": "",
      "Content file": "",
      "Excel tab": "",
      Sections: SITEMAP.length,
      "Page status": `${completedCount} Completed · ${inProgressCount} In progress · ${pendingCount} Pending`,
      Notes: "Updated 2026-05-27 · Regenerate: npm run content:spreadsheet",
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
