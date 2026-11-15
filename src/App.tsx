import { useEffect, useState } from 'react';
import { FileSelector } from './components/FileSelector';
import { BrandMark } from './components/Marks';
import { LayerList } from './components/LayerList';
import { OutputSettings } from './components/OutputSettings';
import { Preview } from './components/Preview';
import { useAppStore } from './state/store';

/** Accepts an image dropped anywhere on the page. */
function useFileDrop() {
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const hasFiles = (e: DragEvent) => e.dataTransfer?.types.includes('Files') ?? false;
    const onOver = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setDragging(true);
    };
    const onLeave = (e: DragEvent) => {
      if (e.relatedTarget === null) setDragging(false);
    };
    const onDrop = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer?.files[0];
      const { status, loadImage } = useAppStore.getState();
      if (file && status.kind !== 'busy') void loadImage(file);
    };
    window.addEventListener('dragover', onOver);
    window.addEventListener('dragleave', onLeave);
    window.addEventListener('drop', onDrop);
    return () => {
      window.removeEventListener('dragover', onOver);
      window.removeEventListener('dragleave', onLeave);
      window.removeEventListener('drop', onDrop);
    };
  }, []);

  return dragging;
}

export function App() {
  const dragging = useFileDrop();
  const status = useAppStore((s) => s.status);
  const sourceName = useAppStore((s) => s.source?.name);

  const classes = ['app', dragging && 'dragging', status.kind === 'busy' && 'busy'].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <header className="topbar">
        <div className="brand">
          <BrandMark />
          <h1>Dot Plotter</h1>
          <span className="version">v{__APP_VERSION__}</span>
        </div>
        {sourceName && (
          <span className="doc-tab" title={sourceName}>
            {sourceName}
          </span>
        )}
        <span className={`topbar-status ${status.kind}`} role="status">
          {status.kind === 'busy' ? `${status.message}…` : status.kind === 'error' ? 'Error' : 'Ready'}
        </span>
        <a className="button ghost" href="https://github.com/MasonWray/Dot-Plotter" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </header>
      <main className="workspace">
        <aside className="sidebar left">
          <FileSelector />
          <LayerList />
        </aside>
        <Preview />
        <aside className="sidebar right">
          <OutputSettings />
        </aside>
      </main>
    </div>
  );
}
