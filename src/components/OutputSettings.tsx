import { gridFor } from '../core/types';
import { isOutputStale, useAppStore } from '../state/store';
import { MAX_GRID_CELLS } from '../worker/protocol';
import { NumberField } from './NumberField';

export function OutputSettings() {
  const settings = useAppStore((s) => s.settings);
  const source = useAppStore((s) => s.source);
  const output = useAppStore((s) => s.output);
  const busy = useAppStore((s) => s.status.kind === 'busy');
  const { setSetting, setStockWidth, setStockHeight, generate } = useAppStore.getState();

  const grid = gridFor(settings);
  const cells = grid.cols * grid.rows;
  const tooLarge = cells > MAX_GRID_CELLS;
  const stale = isOutputStale(output, settings);
  const downloadName = `${source?.name.replace(/\.[^.]+$/, '') ?? 'dot-plotter'}-gcode.zip`;

  return (
    <section className="panel">
      <h2>Output</h2>
      <div className="panel-body">
        <fieldset>
          <legend>Stock</legend>
          <NumberField label="Width" unit="mm" value={settings.stockWidth} onChange={setStockWidth} disabled={busy} />
          <NumberField label="Height" unit="mm" value={settings.stockHeight} onChange={setStockHeight} disabled={busy} />
          <NumberField
            label="Tool diameter"
            unit="mm"
            step={0.05}
            value={settings.toolDiameter}
            onChange={(v) => setSetting('toolDiameter', v)}
            disabled={busy}
          />
          <p className={tooLarge ? 'meta warning' : 'meta'}>
            {grid.cols.toLocaleString()} × {grid.rows.toLocaleString()} dot grid
            {tooLarge && ' is too large. Use a bigger tool or smaller stock.'}
          </p>
        </fieldset>

        <fieldset>
          <legend>Machine</legend>
          <NumberField
            label="Travel feedrate"
            unit="mm/min"
            value={settings.feedrateTravel}
            onChange={(v) => setSetting('feedrateTravel', v)}
            disabled={busy}
          />
          <NumberField
            label="Plunge feedrate"
            unit="mm/min"
            value={settings.feedratePlunge}
            onChange={(v) => setSetting('feedratePlunge', v)}
            disabled={busy}
          />
          <NumberField
            label="Travel height"
            unit="mm"
            value={settings.heightTravel}
            onChange={(v) => setSetting('heightTravel', v)}
            disabled={busy}
          />
          <NumberField
            label="Plunge height"
            unit="mm"
            min={-Infinity}
            value={settings.heightPlunge}
            onChange={(v) => setSetting('heightPlunge', v)}
            disabled={busy}
          />
        </fieldset>

        <div className="actions">
          <button
            type="button"
            className="button primary"
            disabled={!source || busy || tooLarge}
            onClick={() => void generate()}
          >
            {output ? 'Regenerate' : 'Generate G-code'}
          </button>
          {output && (
            <a className="button" href={output.url} download={downloadName}>
              Download ZIP
            </a>
          )}
        </div>
        {output && (
          <p className="meta">
            {output.totalDots.toLocaleString()} dots in {(output.elapsedMs / 1000).toFixed(1)} s
          </p>
        )}
        {stale && <p className="meta warning">Settings changed since the last generate.</p>}
      </div>
    </section>
  );
}
