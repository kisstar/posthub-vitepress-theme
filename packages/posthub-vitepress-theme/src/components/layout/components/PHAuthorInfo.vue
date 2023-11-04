<script setup lang="ts">
import { withBase, useData } from 'vitepress';

const { frontmatter } = useData();
</script>

<template>
  <img
    v-if="frontmatter.avatar"
    class="ph-author-avatar"
    width="110"
    height="110"
    alt="avatar"
    :src="withBase(frontmatter.avatar)"
  />
  <p class="ph-author-name">{{ frontmatter.author }}</p>
  <p class="ph-author-description">{{ frontmatter.description }}</p>
  <ul class="ph-author-urls">
    <li v-for="url in frontmatter.urls" :key="url.text" class="ph-author-url">
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
