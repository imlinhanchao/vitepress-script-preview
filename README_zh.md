# Vitepress Script Preview Plugin

Vitepress Script Preview Plugin 是一个用于 VitePress 的插件，提供了代码预览和运行的功能。通过该插件，用户可以在文档中嵌入代码块，并实时查看代码的输出结果。

## 功能

- 支持在 VitePress 文档中嵌入代码块。
- 实时运行代码并捕获输出（包括 `console.log`、`console.error` 等）。
- 提供代码复制功能。

## 安装

在你的项目中安装插件所需的依赖：

```bash
npm install vitepress-script-preview
```

## 使用方法

1. 在 VitePress 的配置文件中引入插件：

```ts
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress';
import { codePreviewPlugin } from 'vitepress-script-preview';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(codePreviewPlugin);
    }
  },
});
```

2. 在 VitePress 的主题中注册组件：

```ts
// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme';
import 'vitepress-script-preview/components/style.css'; // import commonents styles
import { CodePreview } from 'vitepress-script-preview/components';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview);
  }
};
```

3. 在文档中使用 `script-preview` 容器：

```markdown
::: script-preview

console.log('Hello VitePress!');
console.error('This is an error message.');

:::
```

## 示例

以下是一个完整的示例：

```markdown
# 示例文档

这是一个 VitePress 插件的示例文档。

<script setup>
import { registerContext } from 'vitepress-script-preview/components';

function add(a, b) {
  return a + b;
}

// 脚本内需要调用的函数或变量可以在这里注册
registerContext({
  add
});
</script>

::: script-preview expand=true

console.log(add(1, 2)); // 调用 add 函数
console.info('Hello VitePress!');
console.error('Error example');

:::
```

`expand` 参数用于控制输出的展开状态，默认为 `false`。如果设置为 `true`，则代码块在加载时会自动展开。

## 开发

### 构建组件

```bash
npm run build:comp
```

### 构建插件

```bash
npm run build:plugin
```

### 启动文档开发服务器

```bash
npm run docs:dev
```

