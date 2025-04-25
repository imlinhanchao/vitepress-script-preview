import DefaultTheme from 'vitepress/theme';
import { CodePreview } from '../../../packages/components';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodePreview', CodePreview);
  }
};