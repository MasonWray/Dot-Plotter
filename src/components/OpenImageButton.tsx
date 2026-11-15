import { useRef, type ReactNode } from 'react';
import { useAppStore } from '../state/store';

interface Props {
  className?: string;
  children: ReactNode;
}

/** A button that opens the file picker and loads the chosen image. */
export function OpenImageButton({ className = 'button', children }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const busy = useAppStore((s) => s.status.kind === 'busy');
  const loadImage = useAppStore((s) => s.loadImage);

  return (
    <>
      <button type="button" className={className} disabled={busy} onClick={() => input.current?.click()}>
        {children}
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
    </>
  );
}
