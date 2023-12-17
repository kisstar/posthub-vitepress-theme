const customElements = ['swiper-container', 'swiper-slide'];

const config = {
  rewrites: {
    '(.*)/:year-:month-:day-:name(.*).md': ':year/:month/:day/:name.md'
  },
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return customElements.includes(tag);
        }
      }
    }
  }
};

export default config;
