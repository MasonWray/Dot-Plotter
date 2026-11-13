import type { MachineSettings } from '../core/types';
import type { GenerateResult, LoadResult, WorkerRequest, WorkerResponse } from './protocol';

type Pending = {
  resolve: (value: never) => void;
  reject: (error: Error) => void;
  onProgress?: (message: string) => void;
};

/** Promise wrapper around the processing worker. Requests run one at a time, in order. */
export class ProcessorClient {
  private worker = new Worker(new URL('./processor.worker.ts', import.meta.url), { type: 'module' });
  private pending = new Map<number, Pending>();
  private nextId = 1;

  constructor() {
    this.worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const message = event.data;
      const entry = this.pending.get(message.id);
      if (!entry) return;
      switch (message.type) {
        case 'progress':
          entry.onProgress?.(message.message);
          return;
        case 'error':
          this.pending.delete(message.id);
          entry.reject(new Error(message.message));
          return;
        default:
          this.pending.delete(message.id);
          entry.resolve(message.result as never);
      }
    };
    this.worker.onerror = (event) => {
      const error = new Error(event.message || 'The processing worker crashed.');
      for (const entry of this.pending.values()) entry.reject(error);
      this.pending.clear();
    };
  }

  private send<T>(request: WorkerRequest, transfer: Transferable[], onProgress?: (m: string) => void) {
    return new Promise<T>((resolve, reject) => {
      this.pending.set(request.id, { resolve: resolve as (value: never) => void, reject, onProgress });
      this.worker.postMessage(request, transfer);
    });
  }

  load(image: ImageBitmap, onProgress?: (m: string) => void): Promise<LoadResult> {
    return this.send({ id: this.nextId++, type: 'load', image }, [image], onProgress);
  }

  generate(settings: MachineSettings, onProgress?: (m: string) => void): Promise<GenerateResult> {
    return this.send({ id: this.nextId++, type: 'generate', settings }, [], onProgress);
  }
}

/**
 * Decodes an image file to a bitmap. createImageBitmap decodes off the main thread; SVGs and
 * other formats it can't read fall back to an <img> element.
 */
export async function decodeImage(file: Blob): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file);
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return await createImageBitmap(img);
    } catch {
      throw new Error('This file could not be read as an image.');
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}
