<script setup lang="ts">
import { useData } from 'vitepress';
import PHAuthorInfo from './components/PHAuthorInfo.vue';
import PHPostList from './components/PHPostList.vue';
import { data as posts } from './posts.data';

const { frontmatter } = useData();
</script>

<template>
  <main class="ph-container">
    <aside class="ph-home-aside">
      <PHAuthorInfo :author-info="frontmatter"></PHAuthorInfo>
    </aside>
    <section class="ph-home-section">
      <PHPostList :posts="posts"></PHPostList>
    </section>
  </main>
</template>

<style>
.ph-container {
  display: flex;
  margin: 0 auto;
  padding: 0 32px;
  max-width: var(--vp-layout-max-width);
}

.ph-home-aside {
  margin-top: 1rem;
  width: 278px;
}

.ph-home-section {
  flex: 1;
}
</style>
