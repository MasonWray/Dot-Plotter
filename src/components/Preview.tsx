import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CHANNELS } from '../core/types';
import { useAppStore } from '../state/store';
import { BrandMark, SheetMarks } from './Marks';
import { OpenImageButton } from './OpenImageButton';
import { Ruler } from './Ruler';

/** Long side of the preview canvas's backing store, in device pixels. */
const PREVIEW_RESOLUTION = 2048;
/** Space kept around the sheet for crop and registration marks, in CSS pixels. */
const SHEET_MARGIN = 48;

interface Size {
  width: number;
  height: number;
}

/** Fits a sheet of the given aspect ratio into the stage, centred, in whole CSS pixels. */
function fitSheet(stage: Size, aspect: number) {
  const availW = Math.max(0, stage.width - SHEET_MARGIN * 2);
  const availH = Math.max(0, stage.height - SHEET_MARGIN * 2);
  let width = availW;
  let height = width / aspect;
  if (height > availH) {
    height = availH;
    width = height * aspect;
  }
  width = Math.round(width);
  height = Math.round(height);
  return {
    width,
    height,
    left: Math.round((stage.width - width) / 2),
    top: Math.round((stage.height - height) / 2),
  };
}

/** Tracks an element's content size. */
function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, size] as const;
}

const mm = (n: number) => n.toFixed(1);

export function Preview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stageRef, stage] = useElementSize<HTMLDivElement>();
  const [cursor, setCursor] = useState<{ x: number; y: number }>();
  const source = useAppStore((s) => s.source);
  const layers = useAppStore((s) => s.layers);
  const output = useAppStore((s) => s.output);
  const status = useAppStore((s) => s.status);
  const settings = useAppStore((s) => s.settings);

  // The preview shows the last output if there is one, so measure against the sheet it was made for.
  const sheetMm = output?.settings ?? settings;
  const aspect = output
    ? output.grid.cols / output.grid.rows
    : source
      ? source.width / source.height
      : settings.stockWidth / settings.stockHeight;
  const sheet = fitSheet(stage, aspect);
  const pxPerMmX = sheet.width / sheetMm.stockWidth;
  const pxPerMmY = sheet.height / sheetMm.stockHeight;

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

  const ready = stage.width > 0 && sheet.width > 0;

  return (
    <section className="stage-area" aria-label="Preview">
      <div className="ruler-corner" />
      <Ruler
        orientation="horizontal"
        length={stage.width}
        origin={sheet.left}
        pxPerMm={pxPerMmX}
        cursor={cursor && sheet.left + cursor.x}
      />
      {/* Machine Y = 0 is the bottom edge of the sheet, so the vertical ruler counts upward. */}
      <Ruler
        orientation="vertical"
        length={stage.height}
        origin={sheet.top + sheet.height}
        pxPerMm={pxPerMmY}
        direction={-1}
        cursor={cursor && sheet.top + cursor.y}
      />

      <div className="stage" ref={stageRef}>
        {ready && (
          <div
            className={source ? 'sheet' : 'sheet empty'}
            style={{ left: sheet.left, top: sheet.top, width: sheet.width, height: sheet.height }}
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onPointerLeave={() => setCursor(undefined)}
          >
            {source ? (
              <canvas ref={canvasRef} aria-label="Preview of the plotted image" />
            ) : (
              <div className="empty-state">
                <BrandMark />
                <h2>Open an image to plot</h2>
                <p>It will be split into cyan, magenta, yellow and black, then turned into dots for each pen.</p>
                <OpenImageButton className="button primary">Open image…</OpenImageButton>
              </div>
            )}
            <SheetMarks />
          </div>
        )}
        {status.kind === 'error' && (
          <p className="stage-error" role="alert">
            {status.message}
          </p>
        )}
      </div>

      <footer className="statusbar">
        <span>
          X <span className="mono">{cursor ? mm(cursor.x / pxPerMmX) : '—'}</span>
          {'  '}Y <span className="mono">{cursor ? mm((sheet.height - cursor.y) / pxPerMmY) : '—'}</span> mm
        </span>
        <span>
          Sheet{' '}
          <span className="mono">
            {sheetMm.stockWidth} × {sheetMm.stockHeight}
          </span>{' '}
          mm
        </span>
        {output && (
          <span>
            Grid{' '}
            <span className="mono">
              {output.grid.cols.toLocaleString()} × {output.grid.rows.toLocaleString()}
            </span>
          </span>
        )}
        {output && (
          <span className="push">
            <span className="mono">{output.totalDots.toLocaleString()}</span> dots
          </span>
        )}
      </footer>
    </section>
  );
}
