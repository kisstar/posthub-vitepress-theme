import { useData } from 'vitepress';

export default () => {
  const { site } = useData();

  const themeConfig = site.value.themeConfig;
  const { tagInfo = {} } = themeConfig;
  const allTags = Object.keys(tagInfo).map((key) => tagInfo[key]);

  return allTags;
};
