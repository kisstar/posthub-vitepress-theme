<script setup lang="ts">
import { useData } from 'vitepress';
import PHAuthorInfo from './components/PHAuthorInfo.vue';
import PHPostList from './components/PHPostList.vue';
import { data as posts } from './posts.data';

const { frontmatter } = useData();
</script>

<template>
  <main class="ph-home__container">
    <aside class="ph-home__aside">
      <PHAuthorInfo :author-info="frontmatter"></PHAuthorInfo>
    </aside>
    <section class="ph-home__section">
      <PHPostList :posts="posts"></PHPostList>
    </section>
  </main>
</template>

<style>
@import '../../styles/vars.css';

.ph-home__container {
  display: flex;
  margin: 0 auto;
  padding: 0 32px;
  max-width: var(--ph-layout-max-width);
}

.ph-home__aside {
  position: relative;
  margin-top: 1rem;
  width: 278px;
}

.ph-home__section {
  flex: 1;
}
</style>
