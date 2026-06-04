/** Wrap `value` into `[min, max)` — infinite drag panning. */
export function clinicGalleryWrap(min: number, max: number, value: number): number {
  const range = max - min;
  if (range === 0) return min;
  return ((((value - min) % range) + range) % range) + min;
}
