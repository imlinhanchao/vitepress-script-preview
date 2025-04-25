# Vitepress Script Preview Plugin 脚本预览插件

The Vitepress Script Preview Plugin is a plugin for VitePress that provides code preview and execution functionality. With this plugin, users can embed code blocks in documentation and view the output in real-time.

Vitepress Script Preview Plugin 是一个用于 VitePress 的插件，提供了代码预览和运行的功能。通过该插件，用户可以在文档中嵌入代码块，并实时查看代码的输出结果。

<script setup>
import { registerContext } from '@/components';
function add(a, b) {
  return a + b;
}
// Functions or variables that need to be called within the script can be registered here.
registerContext({
  add
});
</script>

## Example 示例

::: script-preview expand=true

console.log('1 + 2 =', add(1, 2)); // Call the add function
console.info('Hello VitePress!');
console.error('Error example');
console.warn('Warning example');
console.debug('Debug example');

:::

## How to Use 如何使用

1. Install the plugin in your VitePress project:  安装插件到你的 VitePress 项目中：

```bash
npm install vitepress-script-preview --save-dev
```

2. Register the plugin in your VitePress config file (usually `.vitepress/config.js` or `.vitepress/config.ts`): 在你的 VitePress 配置文件中注册插件（通常是 `.vitepress/config.js` 或 `.vitepress/config.ts`）：

```javascript
import { defineConfig } from 'vitepress';
import { codePreviewPlugin } from 'vitepress-script-preview';

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(codePreviewPlugin);
    }
  }
});
```

3. Register the component in your VitePress theme and import component style: 在你的 VitePress 主题中注册组件并导入组件样式：

```javascript
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

4. Use the `script-preview` container in your documentation: 在你的文档中使用 `script-preview` 容器：

```markdown
::: script-preview expand=true

console.log('Hello VitePress!');
console.error('This is an error message.');

:::
```

> Note: The `expand` attribute is optional. If set to `true`, the code block will be expanded by default. 注意：`expand` 属性是可选的。如果设置为 `true`，代码块将默认展开。

## Register Context 注册上下文

If you want to call functions or variables defined in the script within the `script-preview` container, you can register them using the `registerContext` function. For example: 如果你想在 `script-preview` 容器中调用脚本中定义的函数或变量，可以使用 `registerContext` 函数注册它们。例如：

```vue
<script setup>
import { registerContext } from 'vitepress-script-preview/components';

function add(a, b) {
  return a + b;
}

// Functions or variables that need to be called within the script can be registered here.
registerContext({
  add
});
</script>
```

This allows you to call the `add` function within the `script-preview` container. 这允许你在 `script-preview` 容器中调用 `add` 函数。

```markdown
::: script-preview

console.log('1 + 2 =', add(1, 2)); // Call the add function

:::
```