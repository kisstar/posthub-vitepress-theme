// /posts/vue/2023-01-01-post.html -> /2023/01/01/post
export function transformToRealURL(url: string) {
  return url.replace(
    /.*\/(\d{4})-(\d{1,2})-(\d{1,2})-([\w-]+)\.html/,
    function (_match, year, month, day, title) {
      return `/${year}/${month}/${day}/${title}`;
    }
  );
}
