import { useEffect, useState } from 'react';
import { FileSelector } from './components/FileSelector';
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

  return (
    <div className={dragging ? 'app dragging' : 'app'}>
      <header className="topbar">
        <div className="brand">
          <img src="./logo192.png" alt="" width={28} height={28} />
          <h1>Dot Plotter</h1>
          <span className="version">v{__APP_VERSION__}</span>
        </div>
        <a className="button subtle" href="https://github.com/MasonWray/Dot-Plotter" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      </header>
      <main className="workspace">
        <div className="sidebar">
          <FileSelector />
          <LayerList />
        </div>
        <Preview />
        <div className="sidebar">
          <OutputSettings />
        </div>
      </main>
    </div>
  );
}
