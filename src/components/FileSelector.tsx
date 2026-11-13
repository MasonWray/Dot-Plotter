import { useRef } from 'react';
import { useAppStore } from '../state/store';

export function FileSelector() {
  const input = useRef<HTMLInputElement>(null);
  const source = useAppStore((s) => s.source);
  const busy = useAppStore((s) => s.status.kind === 'busy');
  const loadImage = useAppStore((s) => s.loadImage);

  const scaled = source && (source.width !== source.originalWidth || source.height !== source.originalHeight);

  return (
    <section className="panel">
      <h2>Image</h2>
      <div className="panel-body">
        <button type="button" className="button primary" disabled={busy} onClick={() => input.current?.click()}>
          {source ? 'Open another image…' : 'Open image…'}
        </button>
        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void loadImage(file);
            e.target.value = '';
          }}
        />
        {source ? (
          <p className="meta">
            <span className="filename" title={source.name}>{source.name}</span>
            <br />
            {source.originalWidth} × {source.originalHeight} px
            {scaled && ` (working at ${source.width} × ${source.height})`}
          </p>
        ) : (
          <p className="meta">Or drop an image anywhere on the page.</p>
        )}
      </div>
    </section>
  );
}
