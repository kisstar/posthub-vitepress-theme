import { isClient } from '../constants';

// /posts/vue/2023-01-01-post.html -> /2023/01/01/post
export function transformToRealURL(url: string) {
  return url.replace(
    /.*\/(\d{4})-(\d{1,2})-(\d{1,2})-([\w-]+)\.html/,
    function (_match, year, month, day, title) {
      return `/${year}/${month}/${day}/${title}`;
    }
  );
}

/**
 * 从 URL 中获取参数
 *
 * @param url URL 地址
 * @returns 返回参数字典对象
 */
export function getSearchParams(url?: string) {
  if (!url) {
    if (!isClient) {
      return {};
    }

    url = window.location.href;
  }

  const searchParams = new URL(url).searchParams;

  const params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
}

/**
 * 从 URL 中获取指定键的参数值。
 *
 * @param url - 包含搜索参数的 URL
 * @param key - 要获取的参数的键
 * @returns 指定键的参数值
 */
export function getSearchParam(key: string, url?: string) {
  if (!url) {
    if (!isClient) {
      return '';
    }

    url = window.location.href;
  }

  return getSearchParams(url)[key];
}
