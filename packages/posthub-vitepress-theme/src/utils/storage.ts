interface StorageOptions {
  raw?: boolean;
}

/**
 * 从 localStorage 中获取指定键值对
 *
 * @param key - 要获取的键名
 * @param options - 包含获取选项的对象，其中 raw 表示是否返回原始数据
 * @returns 返回获取到的数据，如果选项中包含 raw，则直接返回数据，否则尝试解析为 JSON 对象
 */
export const get = (key: string, options?: StorageOptions) => {
  const data = localStorage.getItem(key);

  if (options?.raw) {
    return data;
  }

  try {
    return JSON.parse(data || '');
  } catch (error) {}
};

/**
 * 设置值到 localStorage
 *
 * @param key - 要获取的键名
 * @param value - 要设置的值
 * @param options - 包含一个名为 raw 的属性的选项，如果选项中包含 raw，则直接存储 value，否则存储 value 的 JSON 字符串形式
 * @returns {void}
 */
export const set = (key: string, value: any, options?: StorageOptions) => {
  if (options?.raw) {
    localStorage.setItem(key, value);
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
};
