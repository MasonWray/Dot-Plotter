import { useEffect, useRef } from 'react';
import { CHANNELS } from '../core/types';
import { useAppStore } from '../state/store';

/** Long side of the preview canvas's backing store, in device pixels. */
const PREVIEW_RESOLUTION = 2048;

export function Preview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const source = useAppStore((s) => s.source);
  const layers = useAppStore((s) => s.layers);
  const output = useAppStore((s) => s.output);
  const status = useAppStore((s) => s.status);

  const aspect = output ? output.grid.cols / output.grid.rows : source ? source.width / source.height : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !source) return;

    canvas.width = Math.round(aspect >= 1 ? PREVIEW_RESOLUTION : PREVIEW_RESOLUTION * aspect);
    canvas.height = Math.round(aspect >= 1 ? PREVIEW_RESOLUTION / aspect : PREVIEW_RESOLUTION);

    // Paper, then inks multiplied on top, which is roughly how overlapping inks mix.
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'multiply';
    ctx.imageSmoothingQuality = 'high';

    for (const ch of CHANNELS) {
      const layer = layers[ch];
      if (layer.rasterVisible && layer.raster) ctx.drawImage(layer.raster, 0, 0, canvas.width, canvas.height);
    }
    for (const ch of CHANNELS) {
      const layer = layers[ch];
      if (layer.vectorVisible && layer.vector) ctx.drawImage(layer.vector, 0, 0, canvas.width, canvas.height);
    }
  }, [source, layers, aspect]);

  return (
    <section className="panel preview">
      <h2>
        Preview
        {status.kind === 'busy' && <span className="status busy" role="status">{status.message}…</span>}
      </h2>
      <div className="preview-stage">
        {source ? (
          <canvas ref={canvasRef} style={{ aspectRatio: String(aspect) }} aria-label="Preview of the plotted image" />
        ) : (
          <div className="empty">
            <img src="./logo192.png" alt="" width={96} height={96} />
            <p>Open an image to split it into cyan, magenta, yellow and black dots.</p>
          </div>
        )}
      </div>
      {status.kind === 'error' && (
        <p className="status error" role="alert">
          {status.message}
        </p>
      )}
    </section>
  );
}
