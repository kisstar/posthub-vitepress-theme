const config = {
  rewrites: {
    '(.*)/:year-:month-:day-:name(.*).md': ':year/:month/:day/:name.md'
  },
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/
  ]
};

export default config;
