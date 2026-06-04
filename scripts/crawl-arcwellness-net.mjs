import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = "https://www.arcwellness.net";

const seedPaths = [
  "/",
  "/home",
  "/about",
  "/contact",
  "/financing",
  "/aesthetics",
  "/plans",
  "/wellness-therapies",
  "/vitamin-therapy",
  "/new-page-2",
  "/exomind",
  "/emsella",
  "/emsculpt-neo",
  "/emface",
  "/exion",
  "/daxxify",
  "/rha",
  "/knesko",
  "/supplements",
  "/supplements-1",
  "/peptide-therapy",
  "/peptides",
  "/nutrient-therapy",
  "/iv-therapy",
  "/privacy-policy",
  "/terms-and-conditions",
  "/privacy",
  "/terms",
  "/book",
  "/book-now",
  "/packages",
  "/programs",
  "/arc-programs",
  "/treatments",
  "/overview",
  "/services",
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/\s+\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractMeta(html) {
  const title =
    (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]
      ?.replace(/<[^>]+>/g, "")
      .trim() || "";
  const desc =
    (
      html.match(/name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i) ||
      []
    )[1] || "";
  const ogTitle =
    (html.match(/property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
      [])[1] || "";
  return { title, description: desc, ogTitle };
}

function extractHeadings(html) {
  const headings = [];
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (text && text.length < 300) headings.push({ level: +m[1], text });
  }
  return headings;
}

function extractLinks(html) {
  const links = new Set();
  const re = /href=["']([^"'#]+(?:#[^"']*)?)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1];
    if (
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    )
      continue;
    if (href.startsWith("/")) href = base + href;
    if (href.startsWith(base)) links.add(href.split("#")[0]);
  }
  return [...links];
}

async function fetchPage(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": "ArcWellnessContentCrawl/1.0" },
  });
  const html = await res.text();
  return { url: res.url, status: res.status, html };
}

function normalizeUrl(url) {
  return url.replace(/\/$/, "") || base;
}

async function main() {
  const valid = new Map();
  const toCheck = new Set(seedPaths.map((p) => normalizeUrl(base + p)));

  const { html: homeHtml, url: homeUrl } = await fetchPage(base + "/");
  valid.set(normalizeUrl(homeUrl), { status: 200, html: homeHtml });
  extractLinks(homeHtml).forEach((u) => toCheck.add(normalizeUrl(u)));

  const checked = new Set();
  const queue = [...toCheck];

  while (queue.length) {
    const url = queue.shift();
    if (checked.has(url)) continue;
    checked.add(url);
    if (!url.startsWith(base) || url.includes(".svg")) continue;
    try {
      const { url: finalUrl, status, html } = await fetchPage(url);
      const key = normalizeUrl(finalUrl);
      if (status === 200 && html.length > 500) {
        valid.set(key, { status, html });
        extractLinks(html).forEach((u) => {
          const n = normalizeUrl(u);
          if (n.startsWith(base) && !checked.has(n)) queue.push(n);
        });
      }
    } catch {
      /* skip */
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  const pages = [...valid.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const output = {
    crawledAt: new Date().toISOString(),
    pageCount: pages.length,
    pages: [],
  };

  for (const [url, { html }] of pages) {
    const meta = extractMeta(html);
    const headings = extractHeadings(html);
    const bodyText = stripHtml(html);
    const pagePath = url.replace(base, "") || "/";
    output.pages.push({
      url,
      path: pagePath,
      meta,
      headings,
      bodyText: bodyText.slice(0, 20000),
      bodyLength: bodyText.length,
    });
  }

  const outDir = path.join(__dirname, "..", "documents");
  fs.writeFileSync(
    path.join(outDir, "arcwellness-net-crawl-raw.json"),
    JSON.stringify(output, null, 2),
  );
  console.log("Crawled", output.pageCount, "pages");
  for (const [u] of pages) {
    console.log(" -", u.replace(base, "") || "/");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
