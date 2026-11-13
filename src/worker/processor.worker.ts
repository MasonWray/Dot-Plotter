/// <reference lib="webworker" />
import { zipSync } from 'fflate';
import { separateCmyk } from '../core/cmyk';
import { generateGcode } from '../core/gcode';
import { rasterizeDots } from '../core/render';
import { resamplePlane } from '../core/resample';
import { stipple } from '../core/stipple';
import { CHANNEL_INFO, CHANNELS, gridFor } from '../core/types';
import type { Channel, ChannelPlanes, Grid, MachineSettings, Rgb } from '../core/types';
import {
  MAX_GRID_CELLS,
  MAX_PREVIEW_SIZE,
  MAX_WORKING_SIZE,
  type GenerateResult,
  type LoadResult,
  type WorkerRequest,
  type WorkerResponse,
} from './protocol';

declare const self: DedicatedWorkerGlobalScope;

let source: ChannelPlanes | undefined;

function post(message: WorkerResponse, transfer: Transferable[] = []) {
  self.postMessage(message, transfer);
}

function fit(width: number, height: number, max: number) {
  const scale = Math.min(1, max / Math.max(width, height));
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

function context2d(width: number, height: number) {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('This browser could not create a 2D canvas in a worker.');
  return { canvas, ctx };
}

/** Turns a coverage buffer into a bitmap of the ink colour, with coverage as alpha. */
function tintedBitmap(alpha: Uint8Array, width: number, height: number, color: Rgb): ImageBitmap {
  const { canvas, ctx } = context2d(width, height);
  const image = ctx.createImageData(width, height);
  const px = image.data;
  for (let p = 0, i = 0; p < alpha.length; p++, i += 4) {
    px[i] = color.r;
    px[i + 1] = color.g;
    px[i + 2] = color.b;
    px[i + 3] = alpha[p]!;
  }
  ctx.putImageData(image, 0, 0);
  return canvas.transferToImageBitmap();
}

/** A tinted bitmap of one ink plane, scaled down to preview size. */
function rasterBitmap(plane: Uint8Array, width: number, height: number, color: Rgb): ImageBitmap {
  const size = fit(width, height, MAX_PREVIEW_SIZE);
  const scaled = resamplePlane(plane, width, height, size.width, size.height);
  return tintedBitmap(scaled, size.width, size.height, color);
}

/** The dots drawn as discs one tool diameter wide. */
function dotsBitmap(dots: Uint32Array, grid: Grid, color: Rgb): ImageBitmap {
  const cellPx = Math.min(8, MAX_PREVIEW_SIZE / Math.max(grid.cols, grid.rows));
  const { width, height, alpha } = rasterizeDots(dots, grid, cellPx);
  return tintedBitmap(alpha, width, height, color);
}

async function load(id: number, image: ImageBitmap): Promise<void> {
  const originalWidth = image.width;
  const originalHeight = image.height;
  if (originalWidth === 0 || originalHeight === 0) {
    image.close();
    throw new Error('This image has no size.');
  }

  let bitmap = image;
  const size = fit(originalWidth, originalHeight, MAX_WORKING_SIZE);
  if (size.width !== originalWidth || size.height !== originalHeight) {
    post({ id, type: 'progress', message: `Scaling down from ${originalWidth} x ${originalHeight}` });
    bitmap = await createImageBitmap(image, {
      resizeWidth: size.width,
      resizeHeight: size.height,
      resizeQuality: 'high',
    });
    image.close();
  }

  post({ id, type: 'progress', message: 'Separating CMYK channels' });
  const { ctx } = context2d(size.width, size.height);
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const pixels = ctx.getImageData(0, 0, size.width, size.height).data;
  source = separateCmyk(pixels, size.width, size.height);

  const rasters = {} as Record<Channel, ImageBitmap>;
  for (const ch of CHANNELS) {
    rasters[ch] = rasterBitmap(source.planes[ch], size.width, size.height, CHANNEL_INFO[ch].color);
  }

  const result: LoadResult = { width: size.width, height: size.height, originalWidth, originalHeight, rasters };
  post({ id, type: 'loaded', result }, Object.values(rasters));
}

function generate(id: number, settings: MachineSettings): void {
  const started = performance.now();
  if (!source) throw new Error('Load an image first.');
  if (!(settings.toolDiameter > 0) || !(settings.stockWidth > 0) || !(settings.stockHeight > 0)) {
    throw new Error('Stock size and tool diameter must be greater than zero.');
  }

  const grid = gridFor(settings);
  if (grid.cols * grid.rows > MAX_GRID_CELLS) {
    throw new Error(
      `That is a ${grid.cols} x ${grid.rows} dot grid, which is too large. ` +
        'Use a larger tool diameter or a smaller stock size.',
    );
  }

  const files: Record<string, Uint8Array> = {};
  const layers = {} as GenerateResult['layers'];

  for (const ch of CHANNELS) {
    const { name, color } = CHANNEL_INFO[ch];
    post({ id, type: 'progress', message: `Generating ${name}` });
    const coverage = resamplePlane(source.planes[ch], source.width, source.height, grid.cols, grid.rows);
    const dots = stipple(coverage, grid.cols, grid.rows, Math.random);
    files[`${name}.gcode`] = generateGcode(dots, grid, settings, name);
    layers[ch] = { dots: dots.length, preview: dotsBitmap(dots, grid, color) };
  }

  post({ id, type: 'progress', message: 'Packing ZIP archive' });
  // G-code is very repetitive, so the fastest level still shrinks it about 15x.
  const zipped = zipSync(files, { level: 1 });
  const archive = new Blob([zipped as Uint8Array<ArrayBuffer>], { type: 'application/zip' });

  const result: GenerateResult = { grid, layers, archive, elapsedMs: performance.now() - started };
  post(
    { id, type: 'generated', result },
    CHANNELS.map((ch) => layers[ch].preview),
  );
}

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const request = event.data;
  try {
    if (request.type === 'load') await load(request.id, request.image);
    else generate(request.id, request.settings);
  } catch (error) {
    post({ id: request.id, type: 'error', message: error instanceof Error ? error.message : String(error) });
  }
};
