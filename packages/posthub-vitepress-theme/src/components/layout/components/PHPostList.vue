<script setup lang="ts">
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import { useTagInfo } from '../../../hooks';
import PHTime from '../../icons/PHTime.vue';
import PHTag from '../../icons/PHTag.vue';

export interface PostInfo {
  originUrl: string;
  url: string;
  title: string;
  summary: string;
  thumbnail: string;
  tagKeys: string[];
  categoryKeys: string[];
  author: string;
  location: string;
  submitTime: string;
  // 用于首页热门文章轮播图
  banner?: string;
  hot?: boolean;
}

defineProps<{ posts: PostInfo[] }>();

const tagInfo = useTagInfo();
</script>

<template>
  <ul class="ph-posts">
    <li v-for="post in posts" :key="post.url" class="ph-post__item">
      <img
        :src="post.thumbnail"
        :alt="post.title"
        class="ph-post__thumbnail"
        loading="lazy"
      />
      <div class="ph-post__info">
        <h3 class="ph-post__title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <p class="ph-post__excerpt">
          {{ post.summary }}
        </p>
        <p class="ph-post__footer">
          <PHTime></PHTime>
          {{ post.author }} 发表于 {{ post.submitTime }}
          <PHTag></PHTag>
          <template v-for="(tagKey, index) in post.tagKeys" :key="tagKey">
            <span v-if="index > 0" class="ph-post__tag-divider">/</span>
            <VPLink :href="`/tag?tag=${tagKey}`">
              {{ tagInfo[tagKey].name }}
            </VPLink>
          </template>
        </p>
      </div>
    </li>
  </ul>
</template>

<style>
@import '../../../styles/vars.css';

.ph-post__item {
  display: flex;
  padding: 1.5rem 0;
}

.ph-post__thumbnail {
  margin-right: 1.5rem;
  align-self: flex-start;
  width: 10rem;
  height: 6.25rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.4);
}

.ph-post__title {
  color: var(--ph-post-list-title-text);
}

.ph-post__title:hover {
  color: var(--ph-post-list-title-hover-text);
}

.ph-post__excerpt {
  margin-top: 0.8rem;
  font-size: 14px;
  color: var(--ph-post-list-excerpt-text);
}

.ph-post__footer {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 14px;
  color: var(--ph-post-list-footer-text);
}

/* 时间和标签图标 */
.ph-post__footer svg {
  margin-right: 0.3rem;
  width: 0.875rem;
  height: 0.875rem;
}

.ph-post__footer svg:nth-child(2) {
  margin-left: 1rem;
}

.ph-post__tag-divider {
  margin: 0 0.3rem;
}
</style>
