import { h } from "vue";
import Theme from 'vitepress/theme-without-fonts'; // https://vitepress.dev/zh/guide/extending-default-theme#using-different-fonts

import BlogComment from './components/BlogComment.vue';

import "./style.css";
import "./custom.css";


export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "doc-after": () => h(BlogComment),
    });
  },

  enhanceApp({ app, router }) {
    app.component('BlogComment', BlogComment);
  },
};
