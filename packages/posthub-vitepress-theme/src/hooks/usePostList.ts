import { useData } from 'vitepress';
import { postData as posts } from '../store';

function removeFix(str: string, mark: string, direction: 'pre' | 'post') {
  const lastIndex = str.lastIndexOf(mark);

  if (direction === 'post') {
    return str.slice(0, lastIndex);
  }

  return str.slice(lastIndex + 1);
}

export default () => {
  const { site } = useData();

  const themeConfig = site.value.themeConfig;
  const { postInfo = {} } = themeConfig;
  const mergedPosts = posts.map((post) => {
    const { originUrl } = post;
    const urlKey = removeFix(removeFix(originUrl, '/', 'pre'), '.', 'post');

    return {
      ...postInfo[urlKey],
      ...post
    };
  });

  return mergedPosts;
};
