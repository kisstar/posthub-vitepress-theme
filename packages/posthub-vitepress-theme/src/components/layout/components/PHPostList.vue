<script setup lang="ts">
import PHTime from '../../icons/PHTime.vue';
import PHTag from '../../icons/PHTag.vue';

interface PostInfo {
  url: string;
  title: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  author: string;
  location: string;
  submitTime: string;
}

interface PostList {
  posts: PostInfo[];
}

defineProps<PostList>();
</script>

<template>
  <ul class="ph-posts">
    <li v-for="post in posts" :key="post.url" class="ph-post-item">
      <img
        :src="post.thumbnail"
        :alt="post.title"
        class="ph-post-thumbnail"
        loading="lazy"
      />
      <div class="ph-post-info">
        <h3 class="ph-post-title">
          <a :href="post.url">{{ post.title }}</a>
        </h3>
        <p class="ph-post-excerpt">
          {{ post.summary }}
        </p>
        <p class="ph-post-footer">
          <PHTime></PHTime>
          {{ post.author }} 发表于 {{ post.submitTime }}
          <PHTag></PHTag>
          <template v-for="(tag, index) in post.tags" :key="tag">
            <span v-if="index > 0" class="ph-post-tag-divider">/</span>
            <span>{{ tag }}</span>
          </template>
        </p>
      </div>
    </li>
  </ul>
</template>

<style>
.ph-post-item {
  display: flex;
  padding: 1.5rem 0;
}

.ph-post-thumbnail {
  margin-right: 1.5rem;
  align-self: flex-start;
  width: 10rem;
  height: 6.25rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.4);
}

.ph-post-title:hover {
  color: var(--vp-c-brand-1);
}

.ph-post-excerpt {
  margin-top: 0.8rem;
  font-size: 14px;
}

.ph-post-footer {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 14px;
}

/* 时间和标签图标 */
.ph-post-footer svg {
  margin-right: 0.3rem;
  width: 0.875rem;
  height: 0.875rem;
}

.ph-post-footer svg:nth-child(2) {
  margin-left: 1rem;
}

.ph-post-tag-divider {
  margin: 0 0.3rem;
}
</style>
