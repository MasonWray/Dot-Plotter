import { CHANNEL_INFO, CHANNELS } from '../core/types';
import { useAppStore } from '../state/store';

export function LayerList() {
  const layers = useAppStore((s) => s.layers);
  const hasSource = useAppStore((s) => s.source !== undefined);
  const toggleRaster = useAppStore((s) => s.toggleRaster);
  const toggleVector = useAppStore((s) => s.toggleVector);

  return (
    <section className="panel">
      <h2>Layers</h2>
      <ul className="layers">
        {CHANNELS.map((ch) => {
          const { name, color } = CHANNEL_INFO[ch];
          const layer = layers[ch];
          return (
            <li key={ch} className="layer">
              <span className="swatch" style={{ background: `rgb(${color.r} ${color.g} ${color.b})` }} />
              <span className="layer-name">
                {name}
                {layer.dots !== undefined && <span className="meta"> {layer.dots.toLocaleString()} dots</span>}
              </span>
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
            </li>
          );
        })}
      </ul>
    </section>
  );
}
