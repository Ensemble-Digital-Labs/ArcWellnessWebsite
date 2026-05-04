# Video clips

`.mov` files in **`hero/`**, **`environment/`**, **`treatments/`**, and **`lifestyle/`** may be **gitignored** when large (GitHub file limits). Paths stay defined in **`src/content/site.ts`** as `/assets/videos/...`.

## Inventory (treatments)

| File | `videos.treatments` key |
|------|-------------------------|
| `face-care-cosmetologist.mov` | `faceCareCosmetologist` |
| `face-massage-relaxing.mov` | `faceMassageRelaxing` |
| `face-head-massage.mov` | `faceHeadMassage` |
| `body-massage-spa-wellness.mov` | `bodyMassageSpa` |
| `facial-mask-skincare-spa.mov` | `facialMaskSkincare` |

**Local dev:** drop `.mov` files in the folders above to match `site.ts` (or swap to hosted URLs / MP4 in code).

**Deploy:** upload assets with your host, **Git LFS**, or a CDN.
