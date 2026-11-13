import { create } from 'zustand';
import { CHANNELS, DEFAULT_SETTINGS } from '../core/types';
import type { Channel, Grid, MachineSettings } from '../core/types';
import { ProcessorClient, decodeImage } from '../worker/client';

export interface LayerState {
  rasterVisible: boolean;
  vectorVisible: boolean;
  /** Tinted ink-coverage image, made when an image is loaded. */
  raster?: ImageBitmap;
  /** Dot preview from the last generate. */
  vector?: ImageBitmap;
  dots?: number;
}

export interface SourceInfo {
  name: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

export type Status =
  | { kind: 'idle' }
  | { kind: 'busy'; message: string }
  | { kind: 'error'; message: string };

export interface Output {
  url: string;
  grid: Grid;
  totalDots: number;
  elapsedMs: number;
  /** Settings the output was made with, to tell whether it is out of date. */
  settings: MachineSettings;
}

interface AppState {
  source?: SourceInfo;
  layers: Record<Channel, LayerState>;
  settings: MachineSettings;
  status: Status;
  output?: Output;

  loadImage(file: File): Promise<void>;
  generate(): Promise<void>;
  setSetting<K extends keyof MachineSettings>(key: K, value: MachineSettings[K]): void;
  /** Sets the stock width and keeps the source aspect ratio. */
  setStockWidth(width: number): void;
  /** Sets the stock height and keeps the source aspect ratio. */
  setStockHeight(height: number): void;
  toggleRaster(channel: Channel): void;
  toggleVector(channel: Channel): void;
}

let client: ProcessorClient | undefined;
const processor = () => (client ??= new ProcessorClient());

const round2 = (n: number) => Math.round(n * 100) / 100;

function initialLayers(): Record<Channel, LayerState> {
  return Object.fromEntries(
    CHANNELS.map((ch) => [ch, { rasterVisible: true, vectorVisible: false }]),
  ) as Record<Channel, LayerState>;
}

function releaseOutput(state: Pick<AppState, 'layers' | 'output'>, keepRasters: boolean) {
  if (state.output) URL.revokeObjectURL(state.output.url);
  for (const ch of CHANNELS) {
    state.layers[ch].vector?.close();
    if (!keepRasters) state.layers[ch].raster?.close();
  }
}

export const useAppStore = create<AppState>()((set, get) => ({
  layers: initialLayers(),
  settings: DEFAULT_SETTINGS,
  status: { kind: 'idle' },

  async loadImage(file) {
    const progress = (message: string) => set({ status: { kind: 'busy', message } });
    progress(`Reading ${file.name}`);
    try {
      const bitmap = await decodeImage(file);
      const result = await processor().load(bitmap, progress);

      releaseOutput(get(), false);
      const layers = initialLayers();
      for (const ch of CHANNELS) layers[ch].raster = result.rasters[ch];

      const { settings } = get();
      set({
        source: {
          name: file.name,
          width: result.width,
          height: result.height,
          originalWidth: result.originalWidth,
          originalHeight: result.originalHeight,
        },
        layers,
        output: undefined,
        settings: { ...settings, stockHeight: round2((settings.stockWidth * result.height) / result.width) },
        status: { kind: 'idle' },
      });
    } catch (error) {
      set({ status: { kind: 'error', message: error instanceof Error ? error.message : String(error) } });
    }
  },

  async generate() {
    const { settings } = get();
    const progress = (message: string) => set({ status: { kind: 'busy', message } });
    progress('Starting');
    try {
      const result = await processor().generate(settings, progress);
      const state = get();
      releaseOutput(state, true);

      const layers = { ...state.layers };
      for (const ch of CHANNELS) {
        layers[ch] = {
          ...layers[ch],
          vector: result.layers[ch].preview,
          dots: result.layers[ch].dots,
          vectorVisible: true,
          rasterVisible: false,
        };
      }
      set({
        layers,
        output: {
          url: URL.createObjectURL(result.archive),
          grid: result.grid,
          totalDots: CHANNELS.reduce((sum, ch) => sum + result.layers[ch].dots, 0),
          elapsedMs: result.elapsedMs,
          settings,
        },
        status: { kind: 'idle' },
      });
    } catch (error) {
      set({ status: { kind: 'error', message: error instanceof Error ? error.message : String(error) } });
    }
  },

  setSetting(key, value) {
    set({ settings: { ...get().settings, [key]: value } });
  },

  setStockWidth(width) {
    const { source, settings } = get();
    const stockHeight = source ? round2((width * source.height) / source.width) : settings.stockHeight;
    set({ settings: { ...settings, stockWidth: width, stockHeight } });
  },

  setStockHeight(height) {
    const { source, settings } = get();
    const stockWidth = source ? round2((height * source.width) / source.height) : settings.stockWidth;
    set({ settings: { ...settings, stockWidth, stockHeight: height } });
  },

  toggleRaster(channel) {
    const layers = get().layers;
    set({ layers: { ...layers, [channel]: { ...layers[channel], rasterVisible: !layers[channel].rasterVisible } } });
  },

  toggleVector(channel) {
    const layers = get().layers;
    set({ layers: { ...layers, [channel]: { ...layers[channel], vectorVisible: !layers[channel].vectorVisible } } });
  },
}));

export function isOutputStale(output: Output | undefined, settings: MachineSettings): boolean {
  if (!output) return false;
  return (Object.keys(settings) as (keyof MachineSettings)[]).some((key) => output.settings[key] !== settings[key]);
}
