import { computed } from "vue";

const modules = import.meta.glob('./langs/*.ts', { eager: true });
const langs: any = {};
for (const path in modules) {
  const p = path.split('/')[2].replace(/\.ts$/g, '');
  langs[p] = (modules[path] as any).default;
}

export function useLocale(lang = navigator.language || 'en')  {

  console.dir(langs);
  const shortLang = lang.split('-')[0];
  const t = computed(() => {
    if (langs[lang]) {
      return langs[lang];
    }
    if (langs[shortLang]) {
      return langs[shortLang];
    }
    return langs['en'];
  })

  return { t };
}