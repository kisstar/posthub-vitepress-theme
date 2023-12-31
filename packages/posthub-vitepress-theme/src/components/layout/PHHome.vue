<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useData } from 'vitepress';
import PHAuthorInfo, { type FilterInfo } from './components/PHAuthorInfo.vue';
import PHPostList from './components/PHPostList.vue';
import { usePostList, useRenderPosts } from '../../hooks';
import PHHotPosts from './components/PHHotPosts.vue';
import NoMore from '../base/NoMore.vue';
import PHEmpty from '../base/PHEmpty.vue';

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
const renderPosts = useRenderPosts();
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
      <PHPostList :posts="renderPosts"></PHPostList>
      <NoMore v-if="!!renderPosts.length"></NoMore>
      <PHEmpty v-if="!renderPosts.length"></PHEmpty>
    </section>
  </main>
</template>

<style>
@import '../../styles/vars.css';

.ph-home__container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 32px;
  max-width: var(--ph-layout-max-width);
}

.ph-home__container.row-reverse {
  flex-direction: row-reverse;
}

.ph-home__container.row-reverse .ph-home__aside {
  padding-left: 2rem;
}

.ph-home__aside {
  position: relative;
  margin-top: 1rem;
  width: var(--ph-layout-aside-width);
}

.ph-home__section {
  flex: 1;
  max-width: var(--ph-layout-section-max-width);
}
</style>
