import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    outDir: '../../dist/components',
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'components',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
  plugins: [
    vue(),
    dts({
      outDir: '../../dist/components',
      insertTypesEntry: true,
    }),
  ],
});
