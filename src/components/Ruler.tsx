import { useEffect, useRef } from 'react';

interface Props {
  orientation: 'horizontal' | 'vertical';
  /** Length of the ruler in CSS pixels. */
  length: number;
  /** Position along the ruler, in CSS pixels, of 0 mm. */
  origin: number;
  /** Scale, and which way millimetres count: 1 for right/down, -1 for left/up. */
  pxPerMm: number;
  direction?: 1 | -1;
  /** Cursor position along the ruler in CSS pixels, if the pointer is over the sheet. */
  cursor?: number;
}

/** Thickness of a ruler in CSS pixels. Matches --ruler in styles.css. */
const THICKNESS = 20;
/** Candidate minor tick spacings, in mm. */
const STEPS = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
/** Smallest gap between minor ticks, in CSS pixels. */
const MIN_TICK_GAP = 6;

/** A millimetre ruler drawn on a canvas, like the rulers in a drawing or CAM program. */
export function Ruler({ orientation, length, origin, pxPerMm, direction = 1, cursor }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || length <= 0 || !(pxPerMm > 0)) return;

    const horizontal = orientation === 'horizontal';
    const dpr = window.devicePixelRatio || 1;
    const w = horizontal ? length : THICKNESS;
    const h = horizontal ? THICKNESS : length;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const style = getComputedStyle(canvas);
    const tickColor = style.getPropertyValue('--ruler-tick').trim();
    const textColor = style.getPropertyValue('--ruler-text').trim();
    const cursorColor = style.getPropertyValue('--ruler-cursor').trim();

    // Minor ticks at least MIN_TICK_GAP apart; labels every 10 minor ticks (5 for 2-steps).
    const minor = STEPS.find((s) => s * pxPerMm >= MIN_TICK_GAP) ?? STEPS[STEPS.length - 1]!;
    const perMajor = String(minor).includes('2') ? 5 : 10;

    const mmAt = (px: number) => ((px - origin) / pxPerMm) * direction;
    const pxAt = (mm: number) => origin + (mm / direction) * pxPerMm;
    const from = Math.floor(Math.min(mmAt(0), mmAt(length)) / minor);
    const to = Math.ceil(Math.max(mmAt(0), mmAt(length)) / minor);

    ctx.fillStyle = tickColor;
    ctx.font = `10px ${style.getPropertyValue('--font-mono')}`;
    for (let i = from; i <= to; i++) {
      const p = Math.round(pxAt(i * minor)) + 0.5;
      const major = i % perMajor === 0;
      const mid = !major && perMajor === 10 && i % 5 === 0;
      const size = major ? THICKNESS : mid ? THICKNESS * 0.45 : THICKNESS * 0.25;

      ctx.fillStyle = tickColor;
      if (horizontal) ctx.fillRect(p - 0.5, THICKNESS - size, 1, size);
      else ctx.fillRect(THICKNESS - size, p - 0.5, size, 1);

      if (major) {
        const label = String(Number((i * minor).toFixed(1)));
        ctx.fillStyle = textColor;
        if (horizontal) {
          ctx.textBaseline = 'top';
          ctx.fillText(label, p + 3, 2);
        } else {
          ctx.save();
          ctx.translate(2, p - 3);
          ctx.rotate(-Math.PI / 2);
          ctx.textBaseline = 'top';
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }
      }
    }

    if (cursor !== undefined) {
      const p = Math.round(cursor) + 0.5;
      ctx.fillStyle = cursorColor;
      if (horizontal) ctx.fillRect(p - 0.5, 0, 1, THICKNESS);
      else ctx.fillRect(0, p - 0.5, THICKNESS, 1);
    }
  }, [orientation, length, origin, pxPerMm, direction, cursor]);

  // The canvas is absolutely positioned so its pixel size never feeds back into the layout.
  return (
    <div className={`ruler ${orientation}`} aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
