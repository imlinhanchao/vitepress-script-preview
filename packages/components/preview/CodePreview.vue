<template>
  <div class="code-preview">
    <div class="code-slot">
      <slot></slot>
    </div>
    <div class="code-content">
      <div class="code-toolbar">
        <button v-if="logs?.length" @click="toggleCode" :title="isCodeVisible ? '隐藏输出' : '查看输出'" :style="{
          color: isCodeVisible ? 'var(--code-preview-primary-color)' : undefined,
          fontSize: '18px',
        }">
          <OutputIcon />
        </button>
        <button v-if="code" @click="copyCode" title="复制代码">
          <CopyIcon v-if="!copyLoading" />
          <CheckIcon v-else style="color: var(--code-preview-primary-color)" />
        </button>
      </div>
      <div v-if="isCodeVisible" class="code-logs">
        <template v-for="(l, i) in logs" :key="i">
          <pre v-if="l.type != 'dir'"><code><span v-if="l.type != 'log'" :class="l.type + ' block'">{{ l.type.toUpperCase() }}</span><span>{{ l.data }}</span></code></pre>
          <ObjectTree v-else :data="l.data" />
        </template>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup name="CodePreview">
import { onMounted, ref, reactive } from 'vue';
import { loadContext } from '../context';
import CopyIcon from '../icon/Copy.vue';
import OutputIcon from '../icon/Output.vue';
import CheckIcon from '../icon/Check.vue';
import ObjectTree from '../objectTree/ObjectTree.vue';

const props = defineProps<{
  code: string;
  expand?: boolean;
}>();

const isCodeVisible = ref(props.expand || false);
const logs = reactive<{ type: string, data: string }[]>([]);

function toggleCode () {
  isCodeVisible.value = !isCodeVisible.value;
}

const copyLoading = ref(false);
function copyCode () {
  if (copyLoading.value) {
    return;
  }
  copyLoading.value = true;
  const code = document.createElement('textarea');
  code.value = props.code;
  document.body.appendChild(code);
  code.select();
  document.execCommand('copy');
  document.body.removeChild(code);
  setTimeout(() => {
    copyLoading.value = false;
  }, 1000);
}

onMounted(() => {
  const originalConsoleLog = console.log;
  const originalConsoleInfo = console.info;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleDebug = console.debug;

  try {
    // 捕获 console.log 输出
    console.log = (...args: any[]) => {
      logs.push({ type: 'log', data: args.join(' ') });
    };
    console.info = (...args: any[]) => {
      logs.push({ type: 'info', data: args.join(' ') });
    };
    console.error = (...args: any[]) => {
      logs.push({ type: 'error', data: args.join(' ') });
    };
    console.warn = (...args: any[]) => {
      logs.push({ type: 'warn', data: args.join(' ') });
    };
    console.debug = (...args: any[]) => {
      logs.push({ type: 'debug', data: args.join(' ') });
    };
    console.dir = (data) => {
      logs.push({ type: 'dir', data });
    };

    const context = loadContext();
    // 使用 Function 构造函数执行代码
    new Function(...Object.keys(context), props.code)(...Object.values(context));
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  } finally {
    // 恢复原始 console.log
    console.log = originalConsoleLog;
    console.info = originalConsoleInfo;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.debug = originalConsoleDebug;
  }

})
</script>

<style>
:root {
  --code-preview-primary-color: #2196F3;
  --code-preview-bg: #f9f9f9;
  --code-preview-border: #ddd;
  --code-preview-content-bg: #f4f4f4;
  --code-preview-btn-color: #AAA;
  --code-preview-object-key-color: #8e004b;
  --code-preview-object-value-color: #0842a0;
  --code-preview-object-function-color: #fe8d59;
  --code-preview-object-string-color: #dc362e;
  --code-preview-object-hover-color: rgba(0, 0, 0, 0.06);
}

.code-preview {
  border: 1px solid var(--code-preview-border);
  border-radius: 4px;
  background-color: var(--code-preview-bg);
  margin: 16px 0;
}

.code-content {
  margin-top: 8px;
  padding: 8px;
  background-color: var(--code-preview-content-bg);
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
}

.code-content pre {
  margin: 0;
  padding: 0;
}

.code-content pre::before {
  content: '>';
  color: var(--code-preview-border);
  display: inline-block;
  padding: 0 5px;
}

.code-slot {
  padding: 0 16px;
}

.code-toolbar button {
  margin: 0 5px;
  color: var(--code-preview-btn-color);
  cursor: pointer;
}

.code-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.block {
  display: inline-block;
  width: 3.5em;
  padding: 0 2px;
  margin-right: 5px;
  text-align: center;
  font-size: 80%;
  line-height: 1.2;
  border: 1px solid currentColor;
  border-radius: 3px;
}

.log {
  color: var(--code-preview-border);
}

.info {
  color:  #2196F3;
}

.error {
  color: #F44336;
}

.warn {
  color: #FF9800;
}

.debug {
  color: #9E9E9E;
}

.dark {
  --code-preview-bg: #1b1e1f;
  --code-preview-border: #3a3e41;
  --code-preview-content-bg: #1e2122;
  --code-preview-btn-color: #b2aca2;
  --code-preview-object-key-color: #7cacf8;
  --code-preview-object-value-color: #9980ff;
  --code-preview-object-string-color: #5cd5fb;
  --code-preview-object-hover-color: rgba(255, 255, 255, 0.06);
}
</style>