/**
 * For each destination index along one axis, the [start, end) range of source indices it covers.
 * Always at least one source index, so upsampling falls back to nearest-neighbour.
 */
function spans(srcSize: number, dstSize: number): Uint32Array {
  const out = new Uint32Array(dstSize * 2);
  for (let d = 0; d < dstSize; d++) {
    const start = Math.min(srcSize - 1, Math.floor((d * srcSize) / dstSize));
    const end = Math.max(start + 1, Math.min(srcSize, Math.floor(((d + 1) * srcSize) / dstSize)));
    out[d * 2] = start;
    out[d * 2 + 1] = end;
  }
  return out;
}

/** Resizes an 8-bit single-channel plane with a box filter (area average when shrinking). */
export function resamplePlane(
  src: Uint8Array,
  srcWidth: number,
  srcHeight: number,
  dstWidth: number,
  dstHeight: number,
): Uint8Array {
  if (src.length < srcWidth * srcHeight) {
    throw new RangeError(`Expected ${srcWidth * srcHeight} values, got ${src.length}`);
  }
  const dst = new Uint8Array(dstWidth * dstHeight);
  const xs = spans(srcWidth, dstWidth);
  const ys = spans(srcHeight, dstHeight);

  for (let dy = 0; dy < dstHeight; dy++) {
    const y0 = ys[dy * 2]!;
    const y1 = ys[dy * 2 + 1]!;
    for (let dx = 0; dx < dstWidth; dx++) {
      const x0 = xs[dx * 2]!;
      const x1 = xs[dx * 2 + 1]!;
      let sum = 0;
      for (let y = y0; y < y1; y++) {
        const row = y * srcWidth;
        for (let x = x0; x < x1; x++) sum += src[row + x]!;
      }
      dst[dy * dstWidth + dx] = Math.round(sum / ((x1 - x0) * (y1 - y0)));
    }
  }
  return dst;
}
