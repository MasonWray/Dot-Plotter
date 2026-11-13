import { describe, expect, it } from 'vitest';
import { rasterizeDots } from './render';

describe('rasterizeDots', () => {
  it('sizes the image from the grid and cell size', () => {
    const img = rasterizeDots(new Uint32Array(), { cols: 10, rows: 5 }, 2.5);
    expect([img.width, img.height]).toEqual([25, 13]);
    expect(img.alpha.every((v) => v === 0)).toBe(true);
  });

  it('fills a disc inside its cell and leaves the corners clear', () => {
    const cellPx = 8;
    const img = rasterizeDots(new Uint32Array([0]), { cols: 1, rows: 1 }, cellPx);
    const at = (x: number, y: number) => img.alpha[y * img.width + x];
    expect(at(4, 4)).toBe(255);
    expect(at(0, 4)).toBeGreaterThan(0);
    expect(at(0, 0)).toBe(0);
    expect(at(7, 7)).toBe(0);
  });

  it('draws only the dots it is given', () => {
    // 2x1 grid, dot in the right cell only
    const img = rasterizeDots(new Uint32Array([1]), { cols: 2, rows: 1 }, 4);
    expect(img.alpha[2 * img.width + 1]).toBe(0);
    expect(img.alpha[2 * img.width + 6]).toBe(255);
  });
});
