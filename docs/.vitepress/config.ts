import { defineConfig } from 'vitepress';
import { codePreviewPlugin } from '../../packages/plugin/core';
import path from 'path';

function pathResolve(dir) {
  return path.resolve(__dirname, '..', '..', dir);
}

export default defineConfig({
  base: '/vitepress-script-preview/',
  title: 'Vitepress Script Preview Plugin 脚本预览插件',
  description: 'A VitePress plugin for code preview.',
  markdown: {
    config: (md) => {
      md.use(codePreviewPlugin, { clientOnly: true });
    }
  },
  vite: {
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('packages') + '/',
        },
      ],
    },
  }
});