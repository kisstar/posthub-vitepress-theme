import { UserConfig, DefaultTheme } from 'vitepress';

export interface CategoryInfo {
  name: string;
}

export interface TagInfo {
  name: string;
  des: string;
}

export interface Config extends DefaultTheme.Config {
  categoryInfo: {
    [key: string]: CategoryInfo;
  };
  tagInfo: {
    [key: string]: TagInfo;
  };
}

declare const config: UserConfig<Config>;
export default config;
