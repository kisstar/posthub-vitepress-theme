<script setup lang="ts">
import { formatDate } from '../../../utils';
import PHLocation from '../../icons/PHLocation.vue';
import PHTime from '../../icons/PHTime.vue';

interface PostMeta {
  title: string;
  author: string;
  location: string;
  date: string;
  tags: string[];
}

defineProps<{ postMeta: PostMeta }>();
</script>

<template>
  <div class="ph-post-meta">
    <h1 class="ph-post-meta-title">{{ postMeta.title }}</h1>
    <div class="ph-post-meta-author">
      <PHLocation></PHLocation>
      {{ postMeta.author }} 在 {{ postMeta.location }}
    </div>
    <div class="ph-post-meta-date">
      <PHTime></PHTime>
      <time v-if="postMeta.date" pubdate :datetime="postMeta.date">
        发表于 {{ formatDate(postMeta.date) }}
      </time>
    </div>
    <ul class="ph-post-meta-tags">
      <li v-for="tag in postMeta.tags" :key="tag" class="ph-post-meta-tag">
        <!-- TODO: 提供标签跳转落地页 -->
        <a href="javascript:void(0)">{{ tag }}</a>
      </li>
    </ul>
  </div>
</template>

<style>
.ph-post-meta {
  margin-bottom: 2rem;
  font-size: 14px;
}

/* 地址和时间图标 */
.ph-post-meta svg {
  margin-right: 0.2rem;
  width: 0.875rem;
  height: 0.875rem;
}

.ph-post-meta-title {
  line-height: 2.25;
  font-size: 2.2rem;
  font-weight: 600;
}

.ph-post-meta-author,
.ph-post-meta-date {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-2);
}

.ph-post-meta-date {
  margin-left: 1.5rem;
}

.ph-post-meta-tags {
  display: flex;
  margin-top: 0.5rem;
}

.ph-post-meta-tag {
  margin-right: 0.5rem;
}

.ph-post-meta-tag a {
  position: relative;
  display: inline-block;
  height: 1.5rem;
  padding: 0 1.5rem;
  line-height: 1.5rem;
  border-radius: 3px 0 0 3px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.ph-post-meta-tag a::before {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  content: '';
  background: var(--vp-c-bg);
}

.ph-post-meta-tag a::after {
  position: absolute;
  top: 0;
  right: 0;
  border-top: 0.7rem solid;
  border-bottom: 0.8rem solid;
  border-left: 0.6rem solid;
  content: '';
  background: var(--vp-c-bg);
  border-bottom-color: transparent;
  border-left-color: var(--vp-c-bg-soft);
  border-top-color: transparent;
}
</style>
