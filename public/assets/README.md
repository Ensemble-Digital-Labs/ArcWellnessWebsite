# Site assets (images & static files)

Files here are served by Next.js from the **site root URL** `/assets/...`.

## Layout

| Folder | Use for |
|--------|---------|
| `hero/` | Hero background, center media, anything above the fold |
| `sections/who-we-are/` | Who we are / team / consultation photography |
| `sections/whole-body/` | Service card thumbnails |
| `sections/your-path/` | Journey / steps imagery (if needed) |
| `sections/invest-cta/` | Full-bleed CTA band image |
| `branding/` | Logos, marks, icons you export as PNG/SVG |
| `misc/` | Anything that doesn’t fit above |

## Using images in code

After adding e.g. `public/assets/hero/entrance.jpg`, reference it as:

```text
/assets/hero/entrance.jpg
```

With `next/image`:

```tsx
<Image src="/assets/hero/entrance.jpg" alt="..." width={1920} height={1080} />
```

Then point `src/content/site.ts` (or your component props) at those paths instead of remote URLs.

## When you add photos

Tell the assistant (or drop files and ask to **analyze** them). Useful checks:

- Resolution vs. layout (hero vs. card grid)
- Aspect ratio and cropping
- File size / WebP vs. JPEG
- Alt text and SEO naming

You can also keep a copy of design references under `design/reference/` (outside `public/`) if those files should **not** be published.
