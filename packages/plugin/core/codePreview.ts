import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';

const container_name = 'script-preview';

export default function codePreviewPlugin(md: MarkdownIt) {
  md.use(container, container_name, {
    validate: function(params: string) {
      return params.trim().startsWith(container_name);
    },
    render: function(tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {

        const params = tokens[idx].info.trim().replace(/\s+/g, ' ').split(' ');
        const bind: any = {};
        const props = ['expand'];

        params.forEach((param: string) => {
          const [key, value] = param.split('=');
          if (!props.includes(key)) return;
          if (value) {
            try { bind[key] = JSON.parse(value) } catch(_e) { bind[key] = value };
          }
        });

        // opening tag
        const startIdx = idx + 1;
        const endIdx = startIdx + tokens.slice(startIdx).findIndex(t => t.type == `container_${container_name}_close`);
        const contentTokens = tokens.slice(startIdx, endIdx).filter(t => t.type === 'inline' && t.content);
        const content = contentTokens.map(t => t.content).join('\n');

        // Remove the original container content tokens
        contentTokens.forEach(t => {
          t.content = `<span>${transformHighlightCode(md, t.content, 'js')}</span>`;
          t.type = 'html_block';
        });

        return `<ClientOnly><CodePreview 
          :code="${toValue(content)}"
          v-bind="${toValue(bind)}"
        >`;
      } else {
        return '</CodePreview></ClientOnly>';
      }
    }
  });
}

function toValue(data: any) {
  if (data === null) return 'null';
  else if (data === undefined) return 'undefined';
  else return JSON.stringify(data).replace(/"/g, '&quot;');
}

const transformHighlightCode = (mdInstance: MarkdownIt, sourceCode: string, suffix: string) =>
  mdInstance.options.highlight!(sourceCode, suffix, '')