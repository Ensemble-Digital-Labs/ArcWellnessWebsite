/**
 * Shifts yellow-orange gold in the transparent wordmark toward a muted champagne /
 * antique gold (closer to `--arc-champagne`) while preserving alpha.
 *
 * Run: node scripts/refine-logo-gold.cjs
 */
const path = require("path");
const sharp = require("sharp");

const INPUT = path.join(__dirname, "../public/assets/branding/arc-wellness-logo-transparent-gold.png");

/** Target antique champagne — warm, lower chroma than raw yellow-gold. */
const TARGET = { r: 186, g: 148, b: 96 };

function warmthScore(r, g, b) {
  if (r < 90 || g < 70) return 0;
  const yellow = (r + g) * 0.5 - b;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  if (yellow < 24 || sat < 18) return 0;
  return Math.min(1, yellow / 140 + sat / 220);
}

function refinePixel(r, g, b) {
  const w = warmthScore(r, g, b);
  if (w <= 0) return [r, g, b];

  const mix = 0.42 + w * 0.38;
  let nr = r * (1 - mix) + TARGET.r * mix;
  let ng = g * (1 - mix) + TARGET.g * mix;
  let nb = b * (1 - mix) + TARGET.b * mix;

  // Slight depth: deepen shadows, lift highlights without pushing yellow.
  const lum = (nr + ng + nb) / 3;
  if (lum < 120) {
    nr *= 0.94;
    ng *= 0.95;
    nb *= 0.97;
  } else if (lum > 175) {
    nr = Math.min(255, nr * 1.02 + 4);
    ng = Math.min(255, ng * 1.01 + 2);
    nb = Math.min(255, nb * 1.03 + 6);
  }

  return [Math.round(nr), Math.round(ng), Math.round(nb)];
}

(async () => {
  const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += channels) {
    const a = out[i + 3];
    if (a < 8) continue;
    const [r, g, b] = refinePixel(out[i], out[i + 1], out[i + 2]);
    out[i] = r;
    out[i + 1] = g;
    out[i + 2] = b;
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(INPUT);

  console.log("Refined gold tone →", INPUT);
})();
