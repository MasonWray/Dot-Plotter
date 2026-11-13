import type { ChannelPlanes } from './types';

export interface Cmyk {
  c: number;
  m: number;
  y: number;
  k: number;
}

/**
 * Naive RGB to CMYK conversion (no ICC profile). Inputs are 0-255, outputs are 0-1.
 * Pure black returns k = 1 and c = m = y = 0 instead of dividing by zero.
 */
export function rgbToCmyk(r: number, g: number, b: number): Cmyk {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const k = 1 - Math.max(R, G, B);
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 1 };
  const w = 1 - k;
  return { c: (w - R) / w, m: (w - G) / w, y: (w - B) / w, k };
}

/**
 * Splits RGBA pixels into four ink-coverage planes. Transparent pixels are treated as
 * sitting on white paper, so they get no ink.
 */
export function separateCmyk(rgba: ArrayLike<number>, width: number, height: number): ChannelPlanes {
  const count = width * height;
  if (rgba.length < count * 4) {
    throw new RangeError(`Expected ${count * 4} RGBA bytes, got ${rgba.length}`);
  }

  const c = new Uint8Array(count);
  const m = new Uint8Array(count);
  const y = new Uint8Array(count);
  const k = new Uint8Array(count);

  for (let p = 0, i = 0; p < count; p++, i += 4) {
    const a = rgba[i + 3]! / 255;
    // Composite over white, then normalise to 0-1.
    const R = 1 - a + (a * rgba[i]!) / 255;
    const G = 1 - a + (a * rgba[i + 1]!) / 255;
    const B = 1 - a + (a * rgba[i + 2]!) / 255;

    const max = R > G ? (R > B ? R : B) : G > B ? G : B;
    const K = 1 - max;
    k[p] = Math.round(K * 255);
    if (max > 0) {
      c[p] = Math.round(((max - R) / max) * 255);
      m[p] = Math.round(((max - G) / max) * 255);
      y[p] = Math.round(((max - B) / max) * 255);
    }
  }

  return { width, height, planes: { c, m, y, k } };
}
