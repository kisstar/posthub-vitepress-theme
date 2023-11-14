<script setup lang="ts">
import { withBase } from 'vitepress';
import PHIcon from '../../icons/PHIcon.vue';

interface AuthorInfoUrl {
  text: string;
  link?: string;
  icon?: string;
}

interface AuthorInfo {
  avatar?: string;
  author?: string;
  description?: string;
  urls?: AuthorInfoUrl[];
}

export interface FilterInfo {
  categroyCount: number;
  tagCount: number;
}

defineProps<{ authorInfo: AuthorInfo; filterInfo: FilterInfo }>();
</script>

<template>
  <div class="ph-author">
    <img
      v-if="authorInfo.avatar"
      class="ph-author__avatar"
      width="110"
      height="110"
      alt="avatar"
      :src="withBase(authorInfo.avatar)"
    />
    <p class="ph-author__name">{{ authorInfo.author }}</p>
    <p class="ph-author__description">{{ authorInfo.description }}</p>
    <!-- 分类详情 -->
    <div class="ph-author__filter">
      <button class="ph-author__categroy">
        分类
        <br />
        {{ filterInfo.categroyCount }}
      </button>
      <button class="ph-author__tag">
        标签
        <br />
        {{ filterInfo.tagCount }}
      </button>
    </div>
    <!-- 链接列表 -->
    <ul class="ph-author__urls">
      <li v-for="url in authorInfo.urls" :key="url.text" class="ph-author__url">
        <PHIcon v-if="!url.link && url.icon" :type="url.icon" />
        <a v-if="url.link" :href="url.link" target="_blank">
          <PHIcon v-if="url.icon" :type="url.icon" />
          {{ url.text }}
        </a>
        <span v-else>{{ url.text }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
.ph-author {
  position: sticky;
  top: 79px; /* 导航栏高度 + 侧边栏上外边距 */
}

.ph-author__name {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1em;
}

.ph-author__avatar {
  border-radius: 50%;
}

.ph-author__description {
  margin-top: 10px;
}

.ph-author__filter {
  display: flex;
  margin-top: 1rem;
  padding: 0 20px;
  width: 55%;
  border-top: 1px solid var(--ph-author-info-filter-border);
  border-bottom: 1px solid var(--ph-author-info-filter-border);
}

.ph-author__categroy,
.ph-author__tag {
  text-align: center;
  font-size: 14px;
}

.ph-author__tag {
  margin-left: 2rem;
}

.ph-author__urls {
  margin-top: 10px;
  font-size: 14px;
}

/* 图标 */
.ph-author__urls svg {
  margin-right: 0.3rem;
  width: 14px;
  height: 14px;
}

.ph-author__url,
.ph-author__url a {
  display: flex;
  align-items: center;
}

.ph-author__url a:hover {
  color: var(--ph-author-info-link-hover-text);
}
</style>
