import type { Channel, Grid, MachineSettings } from '../core/types';

/** Largest source dimension kept for processing; bigger images are scaled down on load. */
export const MAX_WORKING_SIZE = 4096;
/** Largest dimension of the preview bitmaps sent back to the UI. */
export const MAX_PREVIEW_SIZE = 2048;
/** Refuse grids larger than this many cells (4096 x 4096) to keep memory in check. */
export const MAX_GRID_CELLS = 4096 * 4096;

export type WorkerRequest =
  | { id: number; type: 'load'; image: ImageBitmap }
  | { id: number; type: 'generate'; settings: MachineSettings };

export interface LoadResult {
  width: number;
  height: number;
  /** The source size before any downscaling. */
  originalWidth: number;
  originalHeight: number;
  rasters: Record<Channel, ImageBitmap>;
}

export interface GenerateResult {
  grid: Grid;
  layers: Record<Channel, { dots: number; preview: ImageBitmap }>;
  archive: Blob;
  /** Time spent in the worker, in milliseconds. */
  elapsedMs: number;
}

export type WorkerResponse =
  | { id: number; type: 'progress'; message: string }
  | { id: number; type: 'loaded'; result: LoadResult }
  | { id: number; type: 'generated'; result: GenerateResult }
  | { id: number; type: 'error'; message: string };
