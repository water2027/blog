import { h } from "vue";
import Theme from 'vitepress/theme-without-fonts'; // https://vitepress.dev/zh/guide/extending-default-theme#using-different-fonts
// 引入组件库的少量全局样式变量

import "./style.css";
import "./custom.css";


export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },

  enhanceApp({ app, router }) {
    if (typeof window !== 'undefined') {
      import('virtual:pwa-register')
    }
  },
};
