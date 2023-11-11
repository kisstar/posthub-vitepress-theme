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
    <h1 class="ph-post-meta__title">{{ postMeta.title }}</h1>
    <div class="ph-post-meta__author">
      <PHLocation></PHLocation>
      {{ postMeta.author }} 在 {{ postMeta.location }}
    </div>
    <div class="ph-post-meta__date">
      <PHTime></PHTime>
      <time v-if="postMeta.date" pubdate :datetime="postMeta.date">
        发表于 {{ formatDate(postMeta.date) }}
      </time>
    </div>
    <ul class="ph-post-meta__tags">
      <li v-for="tag in postMeta.tags" :key="tag" class="ph-post-meta__tag">
        <!-- TODO: 提供标签跳转落地页 -->
        <a href="javascript:void(0)">{{ tag }}</a>
      </li>
    </ul>
  </div>
</template>

<style>
@import '../../../styles/vars.css';

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

.ph-post-meta__title {
  line-height: 2.25;
  font-size: 2.2rem;
  font-weight: 600;
}

.ph-post-meta__author,
.ph-post-meta__date {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-2);
}

.ph-post-meta__date {
  margin-left: 1.5rem;
}

.ph-post-meta__tags {
  display: flex;
  margin-top: 0.5rem;
}

.ph-post-meta__tag {
  margin-right: 0.5rem;
}

.ph-post-meta__tag a {
  position: relative;
  display: inline-block;
  height: 1.5rem;
  padding: 0 1.5rem;
  line-height: 1.5rem;
  border-radius: 3px 0 0 3px;
  background-color: var(--ph-post-meta-tag-bg);
  color: var(--ph-post-meta-tag-text);
}

.ph-post-meta__tag a::before {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  content: '';
  background: var(--ph-post-meta-tag-pseudo-bg);
}

.ph-post-meta__tag a::after {
  position: absolute;
  top: 0;
  right: 0;
  border-top: 0.7rem solid;
  border-bottom: 0.8rem solid;
  border-left: 0.6rem solid;
  content: '';
  background: var(--ph-post-meta-tag-pseudo-bg);
  border-bottom-color: transparent;
  border-left-color: var(--ph-post-meta-tag-pseudo-border);
  border-top-color: transparent;
}
</style>
