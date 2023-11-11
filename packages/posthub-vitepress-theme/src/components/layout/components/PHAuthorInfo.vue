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
  <img
    v-if="authorInfo.avatar"
    class="ph-author-avatar"
    width="110"
    height="110"
    alt="avatar"
    :src="withBase(authorInfo.avatar)"
  />
  <p class="ph-author-name">{{ authorInfo.author }}</p>
  <p class="ph-author-description">{{ authorInfo.description }}</p>
  <ul class="ph-author-urls">
    <li v-for="url in authorInfo.urls" :key="url.text" class="ph-author-url">
      <a v-if="url.link" :href="url.link" target="_blank">
        {{ url.text }}
      </a>
      <span v-else>{{ url.text }}</span>
    </li>
  </ul>
</template>

<style>
.ph-author-name {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1em;
}

.ph-author-avatar {
  border-radius: 50%;
}

.ph-author-description {
  margin-top: 10px;
}

.ph-author-urls {
  margin-top: 10px;
}
</style>
