# Founder / physician portraits — Dr. Danish Jabbar

Two editorial sets of the **same physician**:

| Pattern | Files | Best for |
|---------|--------|-----------|
| **`physician-professional-*.png`** | `01` … `05` | Formal, clinical, executive tone (neutral expression). |
| **`physician-smiling-*.png`** | `01` … `06` | Warm, approachable marketing. |

## Defaults

- **`site.ts` → `images.founderPortrait`** → **`physician-professional-01.png`** (professional lead).
- To use a **smiling** hero instead, set `founderPortrait` to **`/assets/sections/founder/physician-smiling-01.png`**.

## Code

**`src/content/founderPortraits.ts`**

- **`PHYSICIAN_PROFESSIONAL_PORTRAITS`**
- **`PHYSICIAN_SMILING_PORTRAITS`**

Rename files to final marketing labels when legal/compliance approves (e.g. `danish-jabbar-portrait-approved.png`) and update paths in **`founderPortraits.ts`** + **`site.ts`**.
