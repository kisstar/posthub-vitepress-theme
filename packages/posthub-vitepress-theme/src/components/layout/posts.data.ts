import { createContentLoader } from 'vitepress';
import { transformToRealURL } from '../../utils';

export default createContentLoader('posts/**/*.md', {
  transform(raw) {
    return raw
      .map(({ url, frontmatter }) => {
        const date = new Date(frontmatter.date);

        return {
          ...frontmatter,
          url: transformToRealURL(url),
          timestamp: date.getTime(),
          submitTime: date.toLocaleDateString().replace(/\//g, '-'),
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  },
});

// 本文件默认导出了一个包含了 load() 方法和 watch 属性的对象，请求该文件时
// 在 vitepress 的 staticDataPlugin 插件处理后，返回的内容实际是将 load() 函数返回的数据（content）拼接为：
// export const data = JSON.parse(${JSON.stringify(JSON.stringify(content))})`
// 所以下面导出的 data 并不会被使用，这里仅仅是用来避免编辑器提示错误
// See: https://vitepress.qzxdp.cn/guide/data-loading.html
export const data = [];
