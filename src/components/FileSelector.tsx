import { useAppStore } from '../state/store';
import { OpenImageButton } from './OpenImageButton';

export function FileSelector() {
  const source = useAppStore((s) => s.source);

  const scaled = source && (source.width !== source.originalWidth || source.height !== source.originalHeight);

  return (
    <section className="section">
      <h2 className="section-head">Image</h2>
      <div className="section-body">
        {source ? (
          <p className="meta">
            <span className="filename" title={source.name}>
              {source.name}
            </span>
            <br />
            <span className="mono">
              {source.originalWidth} × {source.originalHeight} px
            </span>
            {scaled && (
              <>
                <br />
                Working at{' '}
                <span className="mono">
                  {source.width} × {source.height}
                </span>
              </>
            )}
          </p>
        ) : (
          <p className="meta">No image open. You can also drop one anywhere on the page.</p>
        )}
        <OpenImageButton className="button block">
          {source ? 'Open another image…' : 'Open image…'}
        </OpenImageButton>
      </div>
    </section>
  );
}
