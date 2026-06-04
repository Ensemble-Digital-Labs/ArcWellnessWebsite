# Arc Wellness — extraction tool crawl

**Source:** [arcwellness.net](https://www.arcwellness.net/)  
**Tool:** `extraction tool/` (design.md / Playwright extractor)  
**Run:** 2026-06-04  
**Output folder:** `documents/arcwellness-net-extraction/`

## Command used

```bash
cd "extraction tool"
pnpm engine:extract "https://www.arcwellness.net/" \
  --extra-urls "../documents/arcwellness-net-all-urls.txt" \
  --max-pages 25 \
  --output "../documents/arcwellness-net-extraction" \
  --verbose --no-dark-mode
```

URL list: `documents/arcwellness-net-all-urls.txt` (all sitemap pages + homepage).

## Results

| Metric | Value |
|--------|--------|
| Pages crawled | **23** |
| DOM elements extracted | **9,320** |
| Screenshots | **115** (5 viewports × pages) |
| Duration | ~128s extract + crawl |

### Pages successfully crawled

- `/`, `/home`, `/about`, `/aesthetics`, `/financing`, `/plans`
- `/wellness-therapies`, `/new-page-2` (**Our Services** — maps to Next.js `/treatments`)
- All modality pages: `/exomind`, `/emsella`, `/emsculpt-neo`, `/emface`, `/exion`, `/daxxify`, `/rha`, `/knesko`
- `/vitamin-therapy`, `/supplements`, `/supplements-1`
- Discovered extra: `/cart` only

**Excluded (legacy / duplicate):** `/new-page-1`, `/our-services`

### Failed / skipped

| URL | Reason |
|-----|--------|
| `/contact` | CAPTCHA detected (Squarespace bot protection under Playwright) |
| `/new-page` | HTTP 404 (dead link on live site) |

**Not in sitemap:** Privacy / Terms (footer links may point to Squarespace legal URLs). **Booking** is external (Mangomint).

For **contact page copy**, use the earlier text crawl: `documents/arcwellness-net-full-content-inventory.md`.

## Key artifacts

| File | Purpose |
|------|---------|
| `DESIGN.md` | Design system summary for agents |
| `tokens.json` | Colors, type, spacing, components |
| `tailwind.css` | Generated Tailwind theme |
| `preview.html` / `proof.html` / `report.html` | Visual verification |
| `screenshots/` | Per-page viewport captures |
| `extraction-report.json` | Machine-readable crawl report |

## Regenerate

```bash
node scripts/crawl-arcwellness-net.mjs && node scripts/generate-arcwellness-inventory.mjs   # text copy
cd "extraction tool" && pnpm engine:extract ...   # design extraction (this crawl)
```
