export type Channel = 'c' | 'm' | 'y' | 'k';

export const CHANNELS: readonly Channel[] = ['c', 'm', 'y', 'k'];

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export const CHANNEL_INFO: Record<Channel, { name: string; color: Rgb }> = {
  c: { name: 'Cyan', color: { r: 0, g: 255, b: 255 } },
  m: { name: 'Magenta', color: { r: 255, g: 0, b: 255 } },
  y: { name: 'Yellow', color: { r: 255, g: 255, b: 0 } },
  k: { name: 'Black', color: { r: 0, g: 0, b: 0 } },
};

/** Machine and output settings. Lengths are in machine units (normally mm), feedrates in units/min. */
export interface MachineSettings {
  stockWidth: number;
  stockHeight: number;
  toolDiameter: number;
  feedrateTravel: number;
  feedratePlunge: number;
  heightTravel: number;
  heightPlunge: number;
}

export const DEFAULT_SETTINGS: MachineSettings = {
  stockWidth: 200,
  stockHeight: 200,
  toolDiameter: 0.4,
  feedrateTravel: 2000,
  feedratePlunge: 1200,
  heightTravel: 3,
  heightPlunge: 0.2,
};

/** One 8-bit ink-coverage value per pixel (0 = no ink, 255 = full ink) for each CMYK channel. */
export interface ChannelPlanes {
  width: number;
  height: number;
  planes: Record<Channel, Uint8Array>;
}

/** The dot grid: one cell per tool diameter across the stock. */
export interface Grid {
  cols: number;
  rows: number;
}

export function gridFor(settings: MachineSettings): Grid {
  return {
    cols: Math.max(1, Math.round(settings.stockWidth / settings.toolDiameter)),
    rows: Math.max(1, Math.round(settings.stockHeight / settings.toolDiameter)),
  };
}
