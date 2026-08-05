# peptide-therapy assets

| File | Used by |
|------|---------|
| `peptide-therapy-hero.png` / `.webp` | hero |
| `peptide-therapy-mechanism.png` / `.webp` | mechanism |
| `peptide-therapy-card-physician-led.png` / `.webp` | treatments card 1 |
| `peptide-therapy-card-support-physiology.png` / `.webp` | treatments card 2 |
| `peptide-therapy-card-where-support-fits.png` / `.webp` | treatments card 3 |

Cream/dark plates still reuse shared EXION plates.

Bump `PEPTIDE_ASSETS_VERSION` in `src/content/pages/peptide-therapy.ts` when
replacing a raster under the same filename, or caches will serve the old image.
