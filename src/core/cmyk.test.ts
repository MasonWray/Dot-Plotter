import { describe, expect, it } from 'vitest';
import { rgbToCmyk, separateCmyk } from './cmyk';

describe('rgbToCmyk', () => {
  it('maps white to no ink', () => {
    expect(rgbToCmyk(255, 255, 255)).toEqual({ c: 0, m: 0, y: 0, k: 0 });
  });

  it('maps pure black to K only, without NaN', () => {
    expect(rgbToCmyk(0, 0, 0)).toEqual({ c: 0, m: 0, y: 0, k: 1 });
  });

  it('maps primaries to their inks', () => {
    expect(rgbToCmyk(0, 255, 255)).toEqual({ c: 1, m: 0, y: 0, k: 0 });
    expect(rgbToCmyk(255, 0, 255)).toEqual({ c: 0, m: 1, y: 0, k: 0 });
    expect(rgbToCmyk(255, 255, 0)).toEqual({ c: 0, m: 0, y: 1, k: 0 });
  });

  it('puts mid grey entirely in K', () => {
    const { c, m, y, k } = rgbToCmyk(128, 128, 128);
    expect([c, m, y]).toEqual([0, 0, 0]);
    expect(k).toBeCloseTo(1 - 128 / 255);
  });
});

describe('separateCmyk', () => {
  it('agrees with rgbToCmyk for opaque pixels', () => {
    const pixels = [
      [255, 255, 255],
      [0, 0, 0],
      [200, 30, 90],
      [12, 140, 250],
    ];
    const rgba = new Uint8ClampedArray(pixels.flatMap(([r, g, b]) => [r!, g!, b!, 255]));
    const { planes } = separateCmyk(rgba, 2, 2);

    pixels.forEach(([r, g, b], i) => {
      const expected = rgbToCmyk(r!, g!, b!);
      expect(planes.c[i]).toBe(Math.round(expected.c * 255));
      expect(planes.m[i]).toBe(Math.round(expected.m * 255));
      expect(planes.y[i]).toBe(Math.round(expected.y * 255));
      expect(planes.k[i]).toBe(Math.round(expected.k * 255));
    });
  });

  it('treats transparent pixels as blank paper', () => {
    const rgba = new Uint8ClampedArray([0, 0, 0, 0]);
    const { planes } = separateCmyk(rgba, 1, 1);
    expect([planes.c[0], planes.m[0], planes.y[0], planes.k[0]]).toEqual([0, 0, 0, 0]);
  });

  it('rejects a buffer that is too short', () => {
    expect(() => separateCmyk(new Uint8ClampedArray(4), 2, 1)).toThrow(RangeError);
  });
});
