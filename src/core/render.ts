import type { Grid } from './types';

export interface AlphaImage {
  width: number;
  height: number;
  /** One coverage value per pixel, 0-255. */
  alpha: Uint8Array;
}

/**
 * Draws each dot as an anti-aliased disc one cell wide into a coverage buffer. Much faster than
 * canvas arc() calls when there are millions of dots.
 *
 * @param cellPx Preview pixels per grid cell.
 */
export function rasterizeDots(dots: Uint32Array, grid: Grid, cellPx: number): AlphaImage {
  const width = Math.max(1, Math.ceil(grid.cols * cellPx));
  const height = Math.max(1, Math.ceil(grid.rows * cellPx));
  const alpha = new Uint8Array(width * height);
  const r = Math.max(0.5, cellPx / 2);

  for (const index of dots) {
    const cx = ((index % grid.cols) + 0.5) * cellPx;
    const cy = (Math.floor(index / grid.cols) + 0.5) * cellPx;
    const x0 = Math.max(0, Math.floor(cx - r));
    const x1 = Math.min(width, Math.ceil(cx + r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const y1 = Math.min(height, Math.ceil(cy + r));

    for (let py = y0; py < y1; py++) {
      const dy = py + 0.5 - cy;
      const row = py * width;
      for (let px = x0; px < x1; px++) {
        const dx = px + 0.5 - cx;
        // Coverage falls off over the one pixel straddling the edge.
        const coverage = r + 0.5 - Math.sqrt(dx * dx + dy * dy);
        if (coverage <= 0) continue;
        const value = coverage >= 1 ? 255 : Math.round(coverage * 255);
        if (value > alpha[row + px]!) alpha[row + px] = value;
      }
    }
  }
  return { width, height, alpha };
}
