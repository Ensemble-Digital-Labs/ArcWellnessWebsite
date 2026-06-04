import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raw = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "..", "documents", "arcwellness-net-crawl-raw.json"),
    "utf8",
  ),
);

const NAV_NOISE =
  /^(Skip to Content|Open Menu|Close Menu|Home|About|Treatments|Overview|Folder:|Back|Book Now|Arc Wellness|Contact Us|Quick Links|Stay Connected|Our Services|Wellness Therapies|Packages|Financing|Contact|Arc Aesthetics|Arc Programs|ExoMind|EmSella|EmSculpt Neo|EmFace|Exion|Daxxify|RHA|Knesko|Nutrient Therapy|Peptide Therapy|Supplements|\d+|©.*|Privacy Policy|Terms and Conditions)$/i;

function cleanBody(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const startIdx = lines.findIndex(
    (l) =>
      l.length > 20 &&
      !NAV_NOISE.test(l) &&
      !l.includes("Skip to Content") &&
      l !== "0",
  );

  const content = lines.slice(Math.max(0, startIdx));
  const filtered = [];
  let navRun = 0;

  for (const line of content) {
    if (NAV_NOISE.test(line) || line === "0") {
      navRun++;
      if (navRun > 3) continue;
      continue;
    }
    navRun = 0;
    if (
      line.includes("5000 Cedar Plaza") ||
      line.includes("636-400-5500") ||
      line.includes("info@arcwellness.net")
    )
      break;
    filtered.push(line);
  }

  return filtered.join("\n\n");
}

function slugToTitle(slug) {
  const map = {
    "/": "Home",
    "/home": "Home (alias)",
    "/about": "About",
    "/contact": "Contact",
    "/financing": "Financing",
    "/aesthetics": "Arc Aesthetics",
    "/plans": "Arc Programs (Plans)",
    "/wellness-therapies": "Wellness Therapies (IV hub)",
    "/vitamin-therapy": "Nutrient / Vitamin Therapy",
    "/new-page-2": "Our Services",
    "/exomind": "ExoMind",
    "/emsella": "EmSella",
    "/emsculpt-neo": "EmSculpt Neo",
    "/emface": "EmFace",
    "/exion": "Exion",
    "/daxxify": "Daxxify",
    "/rha": "RHA",
    "/knesko": "Knesko",
    "/supplements": "Supplements",
    "/supplements-1": "Supplements (duplicate slug)",
  };
  return map[slug] || slug;
}

const SKIP = ["/cart", "/universal/svg/social-accounts.svg", "/home", "/new-page-1", "/our-services"];

const navMap = [
  ["Home", "/", "/"],
  ["About", "/about", "/about"],
  ["Our Services", "/new-page-2", "/treatments"],
  ["Wellness Therapies (IV hub)", "/wellness-therapies", "/treatments#wellness"],
  ["ExoMind", "/exomind", "/treatments/exomind"],
  ["EmSella", "/emsella", "/treatments/emsella"],
  ["EmSculpt Neo", "/emsculpt-neo", "/treatments/emsculpt-neo"],
  ["EmFace", "/emface", "/treatments/emface"],
  ["Exion", "/exion", "/treatments/exion"],
  ["Daxxify", "/daxxify", "/treatments/daxxify"],
  ["RHA", "/rha", "/treatments/rha"],
  ["Knesko", "/knesko", "/treatments/knesko"],
  ["Nutrient Therapy", "/vitamin-therapy", "/treatments/nutrient-therapy"],
  ["Supplements", "/supplements", "/treatments/supplements"],
  ["Arc Aesthetics", "/aesthetics", "/aesthetics"],
  ["Arc Programs", "/plans", "/programs"],
  ["Financing", "/financing", "/financing"],
  ["Contact", "/contact", "/contact"],
  [
    "Book Now",
    "https://booking.mangomint.com/892312",
    "/book (redirect to Mangomint)",
  ],
];

const contentPageCount = raw.pages.filter((p) => !SKIP.includes(p.path)).length;

let md = `# Arc Wellness — full site content inventory

**Source:** [arcwellness.net](https://www.arcwellness.net/)  
**Crawled:** ${raw.crawledAt}  
**Method:** BFS crawl from homepage + sitemap seeds; text extracted from HTML.

Use this document to wire \`src/content/\`, audit the Next.js rebuild, and track gaps vs. the live Squarespace site.

---

## Production contact & booking

| Field | Value |
|--------|--------|
| Brand | Arc Wellness |
| Address | 5000 Cedar Plaza Parkway, Ste. 230, St. Louis, MO 63128 |
| Phone | [636-400-5500](tel:+16364005500) |
| Email | [info@arcwellness.net](mailto:info@arcwellness.net) |
| Booking | [Mangomint — Book Now](https://booking.mangomint.com/892312) |
| Social | [Instagram](https://www.instagram.com/thearcwellness) · [Facebook](https://www.facebook.com/share/1Lx35zTaC7/) · [TikTok](https://www.tiktok.com/@thearcwellness) · [X](https://x.com/arcwellness) |

---

## Live navigation → URL map

| Nav label (live site) | Live URL | Recommended Next.js route |
|------------------------|----------|---------------------------|
`;

for (const [label, liveUrl, nextRoute] of navMap) {
  const live = liveUrl.startsWith("http")
    ? liveUrl
    : `https://www.arcwellness.net${liveUrl}`;
  md += `| ${label} | ${live} | ${nextRoute} |\n`;
}

md += `
---

## Pages crawled (${raw.pageCount} URLs; ${contentPageCount} content pages)

| Path | Title | Status |
|------|-------|--------|
`;

const pages = raw.pages
  .filter((p) => !SKIP.includes(p.path))
  .sort((a, b) => a.path.localeCompare(b.path));

for (const p of pages) {
  md += `| ${p.path} | ${p.meta.title.replace(/&mdash;/g, "—").slice(0, 60)} | ✅ 200 |\n`;
}

md += `
**Not found (404 on live site):** \`/treatments\`, \`/programs\`, \`/peptide-therapy\`, \`/nutrient-therapy\`, \`/privacy\`, \`/terms\`, \`/book\` — use mapped slugs above.

**Duplicate / legacy slugs:** \`/home\` → same as \`/\`; \`/supplements-1\` duplicates \`/supplements\`; footer **Our Services** → \`/new-page-2\` (not \`/our-services\`); \`/wellness-therapies\` is the IV/peptide/supplements hub. Ignore \`/new-page-1\` (legacy peptide slug) and \`/our-services\` (duplicate discovery).

---

`;

for (const p of pages) {
  if (p.path === "/") continue;
  const title = slugToTitle(p.path);
  const clean = cleanBody(p.bodyText);
  const h = p.headings
    .filter((x) => !/^\d+$/.test(x.text) && x.text.length > 2)
    .map((x) => `- H${x.level}: ${x.text}`)
    .join("\n");

  md += `## ${title} (${p.path})

**URL:** https://www.arcwellness.net${p.path}  
**Title tag:** ${p.meta.title.replace(/&mdash;/g, "—")}  
**Meta description:** ${p.meta.description || "_(none)_"}

### Headings

${h || "_(none extracted)_"}

### Body copy

${clean}

---

`;
}

const home = raw.pages.find((p) => p.path === "/");
if (home) {
  const homeHeadings = home.headings
    .filter((x) => !/^\d+$/.test(x.text))
    .map((x) => `- H${x.level}: ${x.text}`)
    .join("\n");

  md += `## Home (/)

**URL:** https://www.arcwellness.net/  
**Title tag:** ${home.meta.title}  
**Meta description:** ${home.meta.description}

### Headings

${homeHeadings}

### Body copy

${cleanBody(home.bodyText)}

---

`;
}

md += `## Footer (site-wide)

- **Address:** 5000 Cedar Plaza Parkway, Ste 230, St Louis, MO 63128
- **Phone:** 636-400-5500
- **Email:** info@arcwellness.net
- **Quick links:** About · Our Services · Wellness Therapies · Packages · Financing · Contact
- **Legal:** © 2025 All Rights Reserved · Privacy Policy · Terms and Conditions _(footer links; no dedicated pages found at /privacy or /terms)_

---

## Next.js rebuild checklist

| Live page | Repo status (May 2026) |
|-----------|--------------------------|
| Homepage | Built — align copy with live sections above |
| About | Built — verify mission/vision/values/founder |
| Treatments hub | Built at \`/treatments\` — map from \`/wellness-therapies\` |
| 12 modality pages | Built at \`/treatments/[slug]\` — compare body copy per page |
| Arc Aesthetics | Route \`/aesthetics\` exists — compare live copy |
| Arc Programs | Route \`/programs\` — live slug is \`/plans\` |
| Financing | Built — live page is minimal |
| Contact | Built — verify hours & form fields |
| Book Now | Mangomint external — \`/book\` redirect |
| Privacy / Terms | Placeholder routes — live footer links may be Squarespace legal pages not in sitemap |

---

## Raw crawl artifact

Machine-readable full extract: \`documents/arcwellness-net-crawl-raw.json\`  
Regenerate: \`node scripts/crawl-arcwellness-net.mjs\` then \`node scripts/generate-arcwellness-inventory.mjs\`
`;

fs.writeFileSync(
  path.join(
    __dirname,
    "..",
    "documents",
    "arcwellness-net-full-content-inventory.md",
  ),
  md,
);
console.log("Wrote documents/arcwellness-net-full-content-inventory.md");
