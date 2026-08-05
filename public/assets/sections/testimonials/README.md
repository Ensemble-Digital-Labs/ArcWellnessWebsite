# Testimonials section assets

| File | Use |
|------|-----|
| `testimonials-background.png` | Full-bleed plate behind `#testimonials` (sphere + carousel) |
| `testimonials-background--previous.png` | Prior bronze abstract plate — rollback only |
| `reviewers/*.webp` | Google reviewer profile photos for review cards |

Wired via `TESTIMONIALS_SECTION_BACKGROUND_SRC` in `src/content/backgroundDecoration.ts`.

## Reviewer photos

```bash
# Add GOOGLE_PLACES_API_KEY to .env.local, then:
npm run testimonials:google-photos
```

Writes WebP files here and regenerates `src/content/googleReviewerPhotos.ts`.
Places Details often returns at most ~5 reviews; missing reviewers keep the mint-hero fallback until a file exists.
