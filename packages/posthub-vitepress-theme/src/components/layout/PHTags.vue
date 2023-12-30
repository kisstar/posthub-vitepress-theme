<script setup lang="ts">
import { computed } from 'vue';
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import { useLocalStorage } from '@vueuse/core';
import { PH_RECENT_TAGS_KEY } from '../../constants';
import { useTags, useTagInfo } from '../../hooks';
import PHEmpty from '../base/PHEmpty.vue';

interface TagInfo {
  key: string;
  name: string;
}

interface TagBlock {
  title: string;
  tags: TagInfo[];
}

const recentTagKeys = useLocalStorage(PH_RECENT_TAGS_KEY, []);
const tagInfo = useTagInfo();
const allTags = useTags();

const tagBlocks = computed<TagBlock[]>(() => {
  const blocks: TagBlock[] = [];

  if (recentTagKeys.value.length > 0) {
    blocks.push({
      title: '最近浏览',
      tags: recentTagKeys.value
        .map((key) => ({ key, ...tagInfo[key] }))
        .filter(Boolean),
    });
  }
  if (allTags.length > 0) {
    blocks.push({
      title: '热门标签',
      tags: allTags,
    });
  }

  return blocks;
});
</script>

<template>
  <div class="ph-tags__container">
    <div class="ph-tags__title">
      <h3 class="ph-tags__name">标签列表</h3>
      <p class="ph-tags__description">
        快速浏览相关主题的文章列表，发现更多有趣内容。
      </p>
    </div>
    <div class="ph-tags__section" v-for="block in tagBlocks">
      <div class="ph-tags__aside">{{ block.title }}</div>
      <div class="ph-tags__items">
        <div
          class="ph-tags__item"
          v-for="(tag, index) in block.tags"
          :key="index"
        >
          <VPLink :href="`/tag?tag=${tag.key}`">
            {{ tag.name }}
          </VPLink>
        </div>
      </div>
    </div>
    <PHEmpty v-if="!allTags.length"></PHEmpty>
  </div>
</template>

<style>
@import '../../styles/vars.css';

.ph-tags__container {
  margin: 0 auto;
  padding-right: 5vw;
  padding-left: 5vw;
}

.ph-tags__title {
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ph-tags__name {
  font-weight: 700;
  font-size: 1.5rem;
}

.ph-tags__description {
  margin-top: 1rem;
  width: 80%;
  text-align: center;
  font-size: 14px;
  color: var(--ph-tags-des-text);
}

.ph-tags__section {
  display: flex;
  margin: 0 auto 4rem;
  max-width: var(--ph-layout-section-max-width);
}

.ph-tags__aside {
  padding: 8px;
  max-width: var(--ph-layout-aside-width);
  text-align: right;
}

.ph-tags__items {
  flex: 1;
}

.ph-tags__item {
  display: inline-block;
  margin: 0.5rem;
  padding: 3px 6px;
  line-height: 20px;
  font-size: 12px;
  border-radius: 4px;
  color: var(--ph-tags-tag-text);
  background-color: var(--ph-tags-tag-bg);
}
</style>
