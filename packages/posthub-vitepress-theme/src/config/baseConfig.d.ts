import { UserConfig, DefaultTheme } from 'vitepress';
import { type PostInfo } from '../components/layout/components/PHPostList.vue';

export interface CategoryInfo {
  name: string;
}

export interface TagInfo {
  name: string;
  des: string;
}

export interface Config extends DefaultTheme.Config {
  categoryInfo?: {
    [key: string]: CategoryInfo;
  };
  tagInfo?: {
    [key: string]: TagInfo;
  };
  postInfo?: {
    [key: string]: Partial<Exclude<PostInfo, 'url' | 'originUrl'>>;
  };
}

declare const config: UserConfig<Config>;
export default config;
