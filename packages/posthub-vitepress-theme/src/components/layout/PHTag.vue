<script setup lang="ts">
import { computed, onMounted, type Ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { postData as posts } from '../../store';
import {
  useUrlSearchParams,
  useTags,
  useTagInfo,
  useRenderPosts
} from '../../hooks';
import { PH_RECENT_TAGS_KEY } from '../../constants';
import { storage } from '../../utils';
import { MAX_RECENT_TAGS } from '../../config';
import PHPostList from './components/PHPostList.vue';

const params = useUrlSearchParams<Ref<{ tag?: string }>>();
const tagInfo = useTagInfo();
const allTags = useTags();

const allTagKeys = allTags.map((tag) => tag.key);
const tagKey = computed(() => params.value.tag || '');
const tagPosts = computed(() =>
  posts.filter((post) => post.tagKeys?.includes(tagKey.value))
);
const renderPosts = useRenderPosts(tagPosts.value);

onMounted(() => {
  const recentTagKeys = useLocalStorage<string[]>(PH_RECENT_TAGS_KEY, []);

  // 如果当前标签不在所有标签中，则不记录
  if (!tagKey.value || !allTagKeys.includes(tagKey.value)) {
    return;
  }

  const index = recentTagKeys.value.indexOf(tagKey.value);

  // 如果当前标签在最近标签中，则先删除
  if (~index) {
    recentTagKeys.value.splice(index, 1);
  }

  recentTagKeys.value = [tagKey.value, ...recentTagKeys.value];

  if (recentTagKeys.value.length > MAX_RECENT_TAGS) {
    recentTagKeys.value.length = MAX_RECENT_TAGS;
  }

  storage.set(PH_RECENT_TAGS_KEY, recentTagKeys.value);
});

const localTagInfo = tagInfo[tagKey.value];
</script>

<template>
  <div class="ph-tag__container">
    <div class="ph-tag__title">
      <h3 class="ph-tag__name">{{ localTagInfo?.name }} Tag</h3>
      <p class="ph-tag__description">
        {{ localTagInfo?.des }}
      </p>
    </div>
    <div class="ph-tag__section">
      <PHPostList :posts="renderPosts"></PHPostList>
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
