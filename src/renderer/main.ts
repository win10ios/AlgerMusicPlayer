import './index.css';
import 'animate.css';
import 'remixicon/fonts/remixicon.css';

import { createApp } from 'vue';

import i18n from '@/../i18n/renderer';
import router from '@/router';
import pinia from '@/store';

// 在 Web 环境中加载适配器
if (typeof window !== 'undefined' && !window.electron) {
  // 动态导入 Web 适配器
  import('../preload/web-adapter.js');
}

import App from './App.vue';
import directives from './directive';
import { initAppShortcuts } from './utils/appShortcuts';

const app = createApp(App);

Object.keys(directives).forEach((key: string) => {
  app.directive(key, directives[key as keyof typeof directives]);
});

app.use(pinia);
app.use(router);
app.use(i18n as any);
app.mount('#app');

// 初始化应用内快捷键
initAppShortcuts();
