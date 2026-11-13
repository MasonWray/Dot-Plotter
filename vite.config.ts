/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as {
  version: string;
};

export default defineConfig({
  // Relative asset paths, so the build works from any host or sub-path.
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
  // No PostCSS plugins. Set inline so Vite doesn't pick up a config from a parent folder.
  css: { postcss: {} },
  worker: {
    format: 'es',
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
