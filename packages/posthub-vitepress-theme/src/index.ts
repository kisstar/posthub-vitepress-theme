import DefaultTheme from 'vitepress/theme';
import PHHome from './components/layout/PHHome.vue';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('ph_home', PHHome);
  },
};
