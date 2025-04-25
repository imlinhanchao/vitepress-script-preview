# Vitepress Script Preview Plugin

The Vitepress Script Preview Plugin is a plugin for VitePress that provides code preview and execution functionality. With this plugin, users can embed code blocks in documentation and view the output in real-time.

## Features

- Embed code blocks in VitePress documentation.
- Execute code in real-time and capture output (including `console.log`, `console.error`, etc.).
- Provide a code copy feature.

## Installation

Install the required dependencies for the plugin in your project:

```bash
npm install vitepress-script-preview
```

## Usage

1. Import the plugin in the VitePress configuration file:

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

2. Register the component in the VitePress theme:

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

3. Use the `script-preview` container in your documentation:

```markdown
::: script-preview

console.log('Hello VitePress!');
console.error('This is an error message.');

:::
```

## Example

Here is a complete example:

```markdown
# Example Documentation

This is an example documentation for the VitePress plugin.

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

::: script-preview expand=true

console.log(add(1, 2)); // Call the add function
console.info('Hello VitePress!');
console.error('Error example');

:::
```

The `expand` parameter controls the expanded state of the output. By default, it is set to `false`. If set to `true`, the code block will automatically expand when loaded.

## Development

### Build Components

```bash
npm run build:comp
```

### Build Plugin

```bash
npm run build:plugin
```

### Start Documentation Development Server

```bash
npm run docs:dev
```

