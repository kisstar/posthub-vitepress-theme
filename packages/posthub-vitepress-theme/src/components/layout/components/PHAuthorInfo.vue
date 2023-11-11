<script setup lang="ts">
import { withBase } from 'vitepress';

interface AuthorInfoUrl {
  text: string;
  link?: string;
}

interface AuthorInfo {
  avatar?: string;
  author?: string;
  description?: string;
  urls?: AuthorInfoUrl[];
}

defineProps<{ authorInfo: AuthorInfo }>();
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
    <ul class="ph-author__urls">
      <li v-for="url in authorInfo.urls" :key="url.text" class="ph-author__url">
        <a v-if="url.link" :href="url.link" target="_blank">
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

.ph-author__urls {
  margin-top: 10px;
}
</style>
