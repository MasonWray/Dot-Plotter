import { CHANNEL_INFO, CHANNELS } from '../core/types';
import { useAppStore } from '../state/store';

export function LayerList() {
  const layers = useAppStore((s) => s.layers);
  const hasSource = useAppStore((s) => s.source !== undefined);
  const toggleRaster = useAppStore((s) => s.toggleRaster);
  const toggleVector = useAppStore((s) => s.toggleVector);

  return (
    <section className="section">
      <h2 className="section-head">Layers</h2>
      <ul className="layers">
        {CHANNELS.map((ch) => {
          const { name } = CHANNEL_INFO[ch];
          const layer = layers[ch];
          const coverage = layer.coverage ?? 0;
          return (
            <li key={ch} className="layer" data-channel={ch}>
              <span className="ink-chip" aria-hidden="true">
                {ch.toUpperCase()}
              </span>
              <span className="layer-name">{name}</span>
              <span className="toggles">
                <button
                  type="button"
                  className="toggle"
                  aria-pressed={layer.rasterVisible}
                  disabled={!hasSource}
                  onClick={() => toggleRaster(ch)}
                  title={`Show the ${name.toLowerCase()} ink image`}
                >
                  Image
                </button>
                <button
                  type="button"
                  className="toggle"
                  aria-pressed={layer.vectorVisible}
                  disabled={!layer.vector}
                  onClick={() => toggleVector(ch)}
                  title={`Show the ${name.toLowerCase()} dots`}
                >
                  Dots
                </button>
              </span>
              <span className="layer-stats">
                <span
                  className="coverage"
                  role="meter"
                  aria-label={`${name} ink coverage`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(coverage * 100)}
                >
                  <span style={{ width: `${coverage * 100}%` }} />
                </span>
                <span className="mono">{hasSource ? `${Math.round(coverage * 100)}%` : '–'}</span>
                {layer.dots !== undefined && <span className="mono">{layer.dots.toLocaleString()} dots</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
