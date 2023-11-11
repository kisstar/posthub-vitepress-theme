import DefaultTheme from 'vitepress/theme';
import PHHome from './components/layout/PHHome.vue';
import PHLayout from './components/layout/PHLayout.vue';

export default {
  extends: DefaultTheme,
  Layout: PHLayout,
  enhanceApp(ctx) {
    ctx.app.component('ph_home', PHHome);
  },
};
