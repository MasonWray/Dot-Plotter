import { describe, expect, it } from 'vitest';
import { seededRandom, stipple } from './stipple';

describe('stipple', () => {
  it('places no dots on blank cells and a dot on every full cell', () => {
    const coverage = new Uint8Array([0, 255, 0, 255, 255, 0]);
    const dots = stipple(coverage, 3, 2, seededRandom(1));
    expect(Array.from(dots).sort((a, b) => a - b)).toEqual([1, 3, 4]);
  });

  it('visits rows in serpentine order', () => {
    const coverage = new Uint8Array(3 * 3).fill(255);
    const dots = stipple(coverage, 3, 3, seededRandom(1));
    expect(Array.from(dots)).toEqual([0, 1, 2, 5, 4, 3, 6, 7, 8]);
  });

  it('places dots in proportion to coverage', () => {
    const cells = 100_000;
    const coverage = new Uint8Array(cells).fill(64);
    const dots = stipple(coverage, 1000, 100, seededRandom(42));
    expect(dots.length / cells).toBeCloseTo(64 / 255, 2);
  });

  it('is reproducible with the same seed', () => {
    const coverage = new Uint8Array(500).fill(128);
    const a = stipple(coverage, 25, 20, seededRandom(7));
    const b = stipple(coverage, 25, 20, seededRandom(7));
    expect(Array.from(a)).toEqual(Array.from(b));
  });
});
