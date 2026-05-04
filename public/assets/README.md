# Site assets (images, video & static files)

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
| `videos/hero/` | Full-bleed or ambient hero video loops |
| `videos/environment/` | Space / room / facility b-roll |
| `videos/treatments/` | Service- and care-focused footage |
| `videos/lifestyle/` | Editorial, composition, or brand-mood clips |

## Video (`.mov`)

Current clips live under `videos/…` with short kebab-case filenames. **`src/content/site.ts`** exports a `videos` map for use in components (`<video src={videos.heroBackground} … />`).

For broad browser support or smaller payloads, consider transcoding to **MP4 (H.264)** and/or **WebM** and serving multiple `<source>` elements; Safari handles `.mov` well on Apple platforms.

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

### Video paths

After adding e.g. `public/assets/videos/hero/spa-background-oriental-therapy.mov`, reference:

```text
/assets/videos/hero/spa-background-oriental-therapy.mov
```

Prefer importing URLs from `videos` in `src/content/site.ts` so filenames stay centralized.

## When you add photos

Tell the assistant (or drop files and ask to **analyze** them). Useful checks:

- Resolution vs. layout (hero vs. card grid)
- Aspect ratio and cropping
- File size / WebP vs. JPEG
- Alt text and SEO naming

You can also keep a copy of design references under `design/reference/` (outside `public/`) if those files should **not** be published.
