<script setup lang="ts">
import { computed, onMounted, type Ref } from 'vue';
import { useData } from 'vitepress';
import { useLocalStorage } from '@vueuse/core';
import { postData as posts } from '../../store';
import { useUrlSearchParams, useTags } from '../../hooks';
import { PH_RECENT_TAGS_KEY } from '../../constants';
import { storage } from '../../utils';
import { MAX_RECENT_TAGS } from '../../config';
import PHPostList from './components/PHPostList.vue';

const { site } = useData();
const params = useUrlSearchParams<Ref<{ tag?: string }>>();
const allTags = useTags();

const tag = computed(() => params.value.tag || '');
const tagPosts = computed(() =>
  posts.filter((post) => post.tags?.includes(tag.value))
);

onMounted(() => {
  const recentTags = useLocalStorage<string[]>(PH_RECENT_TAGS_KEY, []);

  // 如果当前标签不在所有标签中，则不记录
  if (!tag.value || !allTags.includes(tag.value)) {
    return;
  }

  const index = recentTags.value.indexOf(tag.value);

  // 如果当前标签在最近标签中，则先删除
  if (~index) {
    recentTags.value.splice(index, 1);
  }

  recentTags.value = [tag.value, ...recentTags.value];

  if (recentTags.value.length > MAX_RECENT_TAGS) {
    recentTags.value.length = MAX_RECENT_TAGS;
  }

  storage.set(PH_RECENT_TAGS_KEY, recentTags.value);
});

const themeConfig = site.value.themeConfig;
const { tagInfo = {} } = themeConfig;
const localTagInfo = tagInfo[tag.value];
</script>

<template>
  <div class="ph-tag__container">
    <div class="ph-tag__title">
      <h3 class="ph-tag__name">{{ tag }} Tag</h3>
      <p class="ph-tag__description">
        {{ localTagInfo?.des }}
      </p>
    </div>
    <div class="ph-tag__section">
      <PHPostList :posts="tagPosts"></PHPostList>
    </div>
  </div>
</template>

<style>
@import '../../styles/vars.css';

.ph-tag__container {
  margin: 0 auto;
  padding-right: 5vw;
  padding-left: 5vw;
}

.ph-tag__title {
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ph-tag__name {
  font-weight: 700;
  font-size: 1.5rem;
}

.ph-tag__description {
  margin-top: 1rem;
  width: 80%;
  text-align: center;
  font-size: 14px;
  color: var(--ph-tag-des-text);
}

.ph-tag__section {
  margin: 0 auto 4rem;
  max-width: var(--ph-layout-section-max-width);
}
</style>
