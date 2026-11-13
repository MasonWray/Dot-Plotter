export type Random = () => number;

/**
 * Picks which grid cells get a dot: each cell gets one with probability coverage / 255.
 * Returns cell indices (row * cols + col) in serpentine order, left-to-right on even rows and
 * right-to-left on odd rows, so the pen never travels back across the sheet between rows.
 */
export function stipple(coverage: Uint8Array, cols: number, rows: number, random: Random): Uint32Array {
  if (coverage.length < cols * rows) {
    throw new RangeError(`Expected ${cols * rows} cells, got ${coverage.length}`);
  }
  const out = new Uint32Array(cols * rows);
  let count = 0;

  for (let row = 0; row < rows; row++) {
    const base = row * cols;
    const reverse = (row & 1) === 1;
    for (let i = 0; i < cols; i++) {
      const index = base + (reverse ? cols - 1 - i : i);
      if (random() * 255 < coverage[index]!) out[count++] = index;
    }
  }
  return out.slice(0, count);
}

/** Small seeded PRNG (mulberry32), for reproducible output and tests. */
export function seededRandom(seed: number): Random {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
