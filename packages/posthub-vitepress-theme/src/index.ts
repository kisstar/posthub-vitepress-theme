import DefaultTheme from 'vitepress/theme';
// global components
import PHDemoPreview from './components/global/demo-preview';
// layout components
import PHHome from './components/layout/PHHome.vue';
import PHLayout from './components/layout/PHLayout.vue';
import PHTags from './components/layout/PHTags.vue';
import PHTag from './components/layout/PHTag.vue';
import PHCategories from './components/layout/PHCategories.vue';

export default {
  extends: DefaultTheme,
  Layout: PHLayout,
  enhanceApp(ctx) {
    // global components
    ctx.app.component('ph-demo-preview', PHDemoPreview);
    // layout components
    ctx.app.component('ph_home', PHHome);
    ctx.app.component('ph_tags', PHTags);
    ctx.app.component('ph_tag', PHTag);
    ctx.app.component('ph_categories', PHCategories);
  }
};

export type { Config } from './config/baseConfig.d.ts';
