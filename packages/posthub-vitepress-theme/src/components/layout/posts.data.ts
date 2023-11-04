import { createContentLoader } from 'vitepress';

export default createContentLoader('posts/**/*.md', {
  transform(raw) {
    return raw
      .map(({ url, frontmatter }) => {
        const date = new Date(frontmatter.date);

        return {
          ...frontmatter,
          url,
          timestamp: date.getTime(),
          submitTime: date.toLocaleDateString().replace(/\//g, '-'),
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  },
});
