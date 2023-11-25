import { useData } from 'vitepress';

export default () => {
  const { site } = useData();

  const themeConfig = site.value.themeConfig;
  const { tagInfo = {} } = themeConfig;

  return tagInfo;
};
