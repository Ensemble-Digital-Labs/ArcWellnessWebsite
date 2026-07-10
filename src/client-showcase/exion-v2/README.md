# EXION v2 mockup (client showcase)

**Preview URL:** `/client-showcase/exion-v2`  
**Production:** Do not import this folder from `src/components/arc/`, `src/app/page.tsx`, or `/treatments/*`.

## Scope

| Item | Location |
|------|----------|
| Page route | `src/app/client-showcase/exion-v2/` |
| Components | `src/client-showcase/exion-v2/` |
| Mock assets | `public/assets/client-showcase/exion-v2/` |
| Curve geometry | `exion-v2-curves.ts` (1440px SVG paths + masks) |
| Mock tokens | `exion-v2-tokens.ts` (not `globals.css`) |

## Assets

See `public/assets/client-showcase/exion-v2/README.md`. No fallbacks to production photography.

## Curves

Section transitions use `ExionWaveSeparator` — SVG `geometricPrecision` fill + feather mask + champagne lip glow. Tune paths in `exion-v2-curves.ts` against the client mock at 1440px width.
