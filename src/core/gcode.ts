import type { Grid, MachineSettings } from './types';

const encoder = new TextEncoder();

/** Rounds to 4 decimal places and drops trailing zeros. */
export function formatNumber(n: number): string {
  const rounded = Math.round(n * 10000) / 10000;
  return String(Object.is(rounded, -0) ? 0 : rounded);
}

/**
 * Machine coordinates of a dot's centre. The image's top-left is at the top-left of the stock,
 * so Y is flipped: machine Y = 0 is the bottom edge.
 */
export function dotPosition(index: number, grid: Grid, toolDiameter: number): { x: number; y: number } {
  const col = index % grid.cols;
  const row = Math.floor(index / grid.cols);
  return {
    x: (col + 0.5) * toolDiameter,
    y: (grid.rows - row - 0.5) * toolDiameter,
  };
}

/**
 * Writes the G-code for one layer as UTF-8 bytes. Every dot is a travel move, a plunge and a lift.
 *
 * Output can run to millions of lines, so instead of building a string per line, each column's
 * X word and each row's Y word is encoded once and the pieces are copied into a single buffer.
 */
export function generateGcode(
  dots: Uint32Array,
  grid: Grid,
  settings: MachineSettings,
  layerName: string,
): Uint8Array {
  const f = formatNumber;
  const tool = settings.toolDiameter;

  const header = encoder.encode(
    [
      `; Dot Plotter - ${layerName} layer`,
      `; ${dots.length} dots on a ${grid.cols} x ${grid.rows} grid, tool diameter ${f(tool)}`,
      'G21 ; units: mm',
      'G90 ; absolute positioning',
      'G28 ; home',
      `G0 X0 Y0 Z${f(settings.heightTravel)} F${f(settings.feedrateTravel)}`,
      '',
    ].join('\n'),
  );

  const xWords = Array.from({ length: grid.cols }, (_, col) =>
    encoder.encode(`G0 X${f(dotPosition(col, grid, tool).x)}`),
  );
  const yWords = Array.from({ length: grid.rows }, (_, row) =>
    encoder.encode(` Y${f(dotPosition(row * grid.cols, grid, tool).y)} F${f(settings.feedrateTravel)}\n`),
  );
  const penDownUp = encoder.encode(
    `G1 Z${f(settings.heightPlunge)} F${f(settings.feedratePlunge)}\n` +
      `G0 Z${f(settings.heightTravel)} F${f(settings.feedrateTravel)}\n`,
  );

  let size = header.length + dots.length * penDownUp.length;
  for (const index of dots) {
    size += xWords[index % grid.cols]!.length + yWords[Math.floor(index / grid.cols)]!.length;
  }

  const out = new Uint8Array(size);
  out.set(header, 0);
  let offset = header.length;
  for (const index of dots) {
    const x = xWords[index % grid.cols]!;
    const y = yWords[Math.floor(index / grid.cols)]!;
    out.set(x, offset);
    offset += x.length;
    out.set(y, offset);
    offset += y.length;
    out.set(penDownUp, offset);
    offset += penDownUp.length;
  }
  return out;
}
