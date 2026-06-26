/**
 * Matches the lighter arch gold (top) to the richer wordmark gold (bottom).
 *
 * Run: node scripts/harmonize-logo-gold.cjs
 */
const path = require("path");
const sharp = require("sharp");

const INPUT = path.join(__dirname, "../public/assets/branding/arc-wellness-logo-transparent-gold.png");

function isGoldPixel(r, g, b) {
  if (r < 80 || g < 60) return false;
  const yellow = (r + g) * 0.5 - b;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  return yellow > 20 && sat > 14;
}

function bandAverage(data, width, height, channels, y0, y1) {
  let rs = 0;
  let gs = 0;
  let bs = 0;
  let n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i + 3] < 128) continue;
      if (!isGoldPixel(data[i], data[i + 1], data[i + 2])) continue;
      rs += data[i];
      gs += data[i + 1];
      bs += data[i + 2];
      n++;
    }
  }
  if (!n) return null;
  return { r: rs / n, g: gs / n, b: bs / n, n };
}

function clampByte(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

(async () => {
  const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  const topRef = bandAverage(data, width, height, channels, 0, Math.floor(height * 0.38));
  const bottomRef = bandAverage(data, width, height, channels, Math.floor(height * 0.48), height);

  if (!topRef || !bottomRef) {
    throw new Error("Could not sample gold reference bands");
  }

  console.log("Top arch gold avg:", Math.round(topRef.r), Math.round(topRef.g), Math.round(topRef.b));
  console.log("Bottom text gold avg:", Math.round(bottomRef.r), Math.round(bottomRef.g), Math.round(bottomRef.b));

  const archCutoff = Math.floor(height * 0.5);
  const scaleR = bottomRef.r / topRef.r;
  const scaleG = bottomRef.g / topRef.g;
  const scaleB = bottomRef.b / topRef.b;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const a = out[i + 3];
      if (a < 8) continue;

      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      if (!isGoldPixel(r, g, b)) continue;
      if (y >= archCutoff) continue;

      const lum = (r + g + b) / 3;
      const yT = 1 - y / archCutoff;
      const positionMix = Math.pow(yT, 0.72);
      const lightMix = Math.min(1, Math.max(0, (lum - 155) / 85));
      const mix = positionMix * (0.55 + lightMix * 0.45);

      const shiftedR = r * (1 + (scaleR - 1) * mix);
      const shiftedG = g * (1 + (scaleG - 1) * mix);
      const shiftedB = b * (1 + (scaleB - 1) * mix);

      const targetR = bottomRef.r + (lum - bottomRef.r) * 0.12;
      const targetG = bottomRef.g + (lum - bottomRef.g) * 0.1;
      const targetB = bottomRef.b + (lum - bottomRef.b) * 0.08;

      const blend = mix * 0.38;
      out[i] = clampByte(shiftedR * (1 - blend) + targetR * blend);
      out[i + 1] = clampByte(shiftedG * (1 - blend) + targetG * blend);
      out[i + 2] = clampByte(shiftedB * (1 - blend) + targetB * blend);
    }
  }

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(INPUT);

  const { data: after } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const topAfter = bandAverage(after, width, height, channels, 0, Math.floor(height * 0.38));
  const bottomAfter = bandAverage(after, width, height, channels, Math.floor(height * 0.48), height);
  console.log(
    "After — top:",
    Math.round(topAfter.r),
    Math.round(topAfter.g),
    Math.round(topAfter.b),
    "| bottom:",
    Math.round(bottomAfter.r),
    Math.round(bottomAfter.g),
    Math.round(bottomAfter.b),
  );
  console.log("Harmonized →", INPUT);
})();
