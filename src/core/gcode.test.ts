import { describe, expect, it } from 'vitest';
import { dotPosition, formatNumber, generateGcode } from './gcode';
import { DEFAULT_SETTINGS } from './types';

describe('formatNumber', () => {
  it('rounds to 4 decimals and trims zeros', () => {
    expect(formatNumber(1.23456)).toBe('1.2346');
    expect(formatNumber(2)).toBe('2');
    expect(formatNumber(0.1 + 0.2)).toBe('0.3');
    expect(formatNumber(-0.00001)).toBe('0');
  });
});

describe('dotPosition', () => {
  const grid = { cols: 4, rows: 3 };

  it('puts the top-left cell at the top-left of the stock, with Y flipped', () => {
    expect(dotPosition(0, grid, 1)).toEqual({ x: 0.5, y: 2.5 });
  });

  it('puts the bottom-right cell near the machine origin corner', () => {
    expect(dotPosition(11, grid, 1)).toEqual({ x: 3.5, y: 0.5 });
  });

  it('scales by tool diameter', () => {
    expect(dotPosition(5, grid, 0.4)).toEqual({ x: 1.5 * 0.4, y: 1.5 * 0.4 });
  });
});

describe('generateGcode', () => {
  const settings = { ...DEFAULT_SETTINGS, toolDiameter: 1 };
  const grid = { cols: 2, rows: 2 };
  const text = (bytes: Uint8Array) => new TextDecoder().decode(bytes);

  it('writes a header and one move/plunge/lift per dot', () => {
    const gcode = text(generateGcode(new Uint32Array([0, 3]), grid, settings, 'Cyan'));
    expect(gcode.endsWith('\n')).toBe(true);
    const lines = gcode.trim().split('\n');

    expect(lines[0]).toBe('; Dot Plotter - Cyan layer');
    expect(lines).toContain('G21 ; units: mm');
    expect(lines).toContain('G90 ; absolute positioning');
    expect(lines).toContain('G28 ; home');

    const body = lines.slice(lines.indexOf('G28 ; home') + 2);
    expect(body).toEqual([
      'G0 X0.5 Y1.5 F2000',
      'G1 Z0.2 F1200',
      'G0 Z3 F2000',
      'G0 X1.5 Y0.5 F2000',
      'G1 Z0.2 F1200',
      'G0 Z3 F2000',
    ]);
  });

  it('writes only the header when there are no dots', () => {
    const gcode = text(generateGcode(new Uint32Array(), grid, settings, 'Black'));
    expect(gcode).not.toContain('G1 ');
  });

  it('formats every dot the same way dotPosition places it', () => {
    const big = { cols: 37, rows: 23 };
    const tool = 0.35;
    const dots = new Uint32Array([0, 36, 37, 400, big.cols * big.rows - 1]);
    const moves = text(generateGcode(dots, big, { ...settings, toolDiameter: tool }, 'K'))
      .split('\n')
      .filter((l) => l.startsWith('G0 X') && !l.startsWith('G0 X0 Y0 Z'));
    expect(moves).toEqual(
      Array.from(dots, (i) => {
        const { x, y } = dotPosition(i, big, tool);
        return `G0 X${formatNumber(x)} Y${formatNumber(y)} F2000`;
      }),
    );
  });
});
