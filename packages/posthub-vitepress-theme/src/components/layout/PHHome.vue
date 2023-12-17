<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useData } from 'vitepress';
import PHAuthorInfo, { type FilterInfo } from './components/PHAuthorInfo.vue';
import PHPostList from './components/PHPostList.vue';
import { usePostList } from '../../hooks';
import PHHotPosts from './components/PHHotPosts.vue';

const { frontmatter, site } = useData();
const posts = usePostList();

const filterInfo: ComputedRef<FilterInfo> = computed(() => {
  const themeConfig = site.value.themeConfig;
  const { categoryInfo = {}, tagInfo = {} } = themeConfig;

  return {
    categoryCount: Object.keys(categoryInfo).length,
    tagCount: Object.keys(tagInfo).length
  };
});
const hotPosts: ComputedRef = computed(() => {
  return posts.filter((post) => post.hot);
});
</script>

<template>
  <main class="ph-home__container">
    <aside class="ph-home__aside">
      <PHAuthorInfo
        :author-info="frontmatter"
        :filter-info="filterInfo"
      ></PHAuthorInfo>
    </aside>
    <section class="ph-home__section">
      <PHHotPosts :posts="hotPosts"></PHHotPosts>
      <PHPostList :posts="posts"></PHPostList>
    </section>
  </main>
</template>

<style>
@import '../../styles/vars.css';

.ph-home__container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  margin: 0 auto;
  padding: 0 32px;
  max-width: var(--ph-layout-max-width);
}

.ph-home__aside {
  position: relative;
  margin-top: 1rem;
  padding-left: 2rem;
  width: var(--ph-layout-aside-width);
}

.ph-home__section {
  flex: 1;
  max-width: var(--ph-layout-section-max-width);
}
</style>
