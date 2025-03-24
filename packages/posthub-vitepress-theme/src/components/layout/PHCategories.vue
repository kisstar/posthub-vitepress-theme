<script setup lang="ts">
import { computed, type Ref } from 'vue';
import { useData } from 'vitepress';
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import { useUrlSearchParams, useRenderPosts } from '../../hooks';
import { postData as posts } from '../../store';
import PHPostList from './components/PHPostList.vue';
import PHNoMore from '../base/PHNoMore.vue';
import PHEmpty from '../base/PHEmpty.vue';

const params = useUrlSearchParams<Ref<{ category?: string }>>();
const categoryKey = computed(() => params.value.category || '');
const categoryPosts = computed(() => {
  if (!categoryKey.value) return posts;

  return posts.filter((post) => post.categoryKeys?.includes(categoryKey.value));
});
const { renderPosts, hasMore } = useRenderPosts(categoryPosts);

const { site } = useData();
const themeConfig = site.value.themeConfig;
const { categoryInfo = {} } = themeConfig;
const categoryList = Object.keys(categoryInfo);
</script>

<template>
  <div class="ph-categories__container">
    <aside class="ph-categories__aside">
      <div class="ph-categories__nav">
        <div class="ph-categories__nav-title">分类</div>
        <VPLink
          v-for="category in categoryList"
          class="ph-categories__nav-item"
          :class="category === params.category ? 'is-active' : ''"
          :key="category"
          :href="`/categories?category=${category}`"
        >
          {{ categoryInfo[category].name }}
        </VPLink>
      </div>
    </aside>
    <div class="ph-categories__section">
      <PHPostList :posts="renderPosts"></PHPostList>
      <PHNoMore v-if="!!renderPosts.length && !hasMore"></PHNoMore>
      <PHEmpty v-if="!renderPosts.length"></PHEmpty>
    </div>
  </div>
</template>

<style>
@import '../../styles/vars.css';

.ph-categories__container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 0 32px;
  max-width: var(--ph-layout-max-width);
}

.ph-categories__aside {
  position: relative;
  margin-right: 20px;
  padding: 8px;
  width: 200px;
  font-size: 16px;
}

.ph-categories__nav {
  position: sticky;
  top: 79px;
  padding-right: 13px;
  text-align: right;
  border-right: 1px solid var(--ph-categories-nav-border);
}

.ph-categories__nav-title {
  padding: 16px 16px 10px 10px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--ph-categories-nav-border);
}

.ph-categories__nav-item {
  display: inline-block;
  padding: 10px 17px;
  width: 100%;
  text-align: right;
  color: var(--ph-categories-title-text);
}

.ph-categories__nav-item:hover,
.ph-categories__nav-item.is-active {
  color: var(--ph-categories--title-hover-text);
}

.ph-categories__section {
  flex: 1;
  max-width: var(--ph-layout-section-max-width);
}
</style>
