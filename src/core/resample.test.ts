import { describe, expect, it } from 'vitest';
import { resamplePlane } from './resample';

describe('resamplePlane', () => {
  it('averages blocks when shrinking', () => {
    // 4x2 -> 2x1: left block [0, 100, 0, 100] -> 50, right block [255 x4] -> 255
    const src = new Uint8Array([0, 100, 255, 255, 100, 0, 255, 255]);
    expect(Array.from(resamplePlane(src, 4, 2, 2, 1))).toEqual([50, 255]);
  });

  it('repeats pixels when enlarging', () => {
    const src = new Uint8Array([10, 20]);
    expect(Array.from(resamplePlane(src, 2, 1, 4, 2))).toEqual([10, 10, 20, 20, 10, 10, 20, 20]);
  });

  it('returns an identical plane at the same size', () => {
    const src = new Uint8Array([1, 2, 3, 4, 5, 6]);
    expect(Array.from(resamplePlane(src, 3, 2, 3, 2))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('handles sizes that do not divide evenly', () => {
    const src = new Uint8Array(7 * 5).fill(200);
    const out = resamplePlane(src, 7, 5, 3, 2);
    expect(out.length).toBe(6);
    expect(Array.from(out).every((v) => v === 200)).toBe(true);
  });
});
