# Founder / physician portraits — Dr. Danish Jabbar

Two editorial sets of the **same physician**, plus a homepage **cutout**:

| Pattern | Files | Best for |
|---------|--------|-----------|
| **`physician-jabbar-cutout.png` / `.webp`** | single | Homepage teal card — transparent 4K cutout (person only). |
| **`physician-professional-*.webp`** | `01` … `05` | Formal, clinical, executive tone (neutral expression). |
| **`physician-smiling-*.webp`** | `01` … `06` | Warm, approachable marketing. |

## Defaults

- **`site.ts` → `images.founderPortrait`** → **`physician-jabbar-cutout.webp`** (cutout for the expand card).
- To use a framed photo instead, set `founderPortrait` to a smiling/professional `.webp` path.

## Code

**`src/content/founderPortraits.ts`**

- **`PHYSICIAN_PROFESSIONAL_PORTRAITS`**
- **`PHYSICIAN_SMILING_PORTRAITS`**

Runtime paths use **`.webp`**. After adding PNG/JPEG masters, run `npm run assets:webp`.
