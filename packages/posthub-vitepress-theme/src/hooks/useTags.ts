import useTagInfo from './useTagInfo';

export default () => {
  const tagInfo = useTagInfo();
  const allTags = Object.keys(tagInfo).map((key) => ({ key, ...tagInfo[key] }));

  return allTags;
};
