/**
 * Adds a real alpha channel to `arc-wellness-logo-v3.png` by treating pixels near
 * the average corner color as background (cream / off-white plate).
 *
 * Run: node scripts/make-logo-transparent.cjs
 */
const path = require("path");
const sharp = require("sharp");

const INPUT = path.join(__dirname, "../public/assets/branding/arc-wellness-logo-v3.png");

function dist(r, g, b, r0, g0, b0) {
  return Math.hypot(r - r0, g - g0, b - b0);
}

(async () => {
  const { data, info } = await sharp(INPUT).raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 3 && channels !== 4) {
    throw new Error(`Expected 3 (RGB) or 4 (RGBA) channels, got ${channels}`);
  }

  const stride = channels;
  const idx = (x, y) => (y * width + x) * stride;
  const corners = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  let br = 0;
  let bg = 0;
  let bb = 0;
  for (const [x, y] of corners) {
    const i = idx(x, y);
    br += data[i];
    bg += data[i + 1];
    bb += data[i + 2];
  }
  br /= corners.length;
  bg /= corners.length;
  bb /= corners.length;

  const lo = 22;
  const hi = 52;
  const out = Buffer.alloc(width * height * 4);
  let p = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = idx(x, y);
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Ignore any existing alpha when re-running on an already-processed PNG.
      const d = dist(r, g, b, br, bg, bb);
      let a = 255;
      if (d <= lo) a = 0;
      else if (d < hi) a = Math.round((255 * (d - lo)) / (hi - lo));

      out[p] = r;
      out[p + 1] = g;
      out[p + 2] = b;
      out[p + 3] = a;
      p += 4;
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(INPUT);

  console.log("Wrote RGBA PNG to", INPUT);
  console.log("Estimated background RGB:", Math.round(br), Math.round(bg), Math.round(bb));
})();
