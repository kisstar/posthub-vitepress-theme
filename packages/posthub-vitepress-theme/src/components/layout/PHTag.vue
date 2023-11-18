<script setup lang="ts">
import { useData } from 'vitepress';
import { getSearchParam } from '../../utils';
import { postData as posts } from '../../store';
import PHPostList from './components/PHPostList.vue';

const { site } = useData();

const tag = getSearchParam('tag');
const tagPosts = posts.filter((post) => post.tags?.includes(tag));

const themeConfig = site.value.themeConfig;
const { tagInfo = {} } = themeConfig;
const localTagInfo = tagInfo[tag];
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
.ph-tag__container {
  margin: 0 auto;
  padding-right: 5vw;
  padding-left: 5vw;
  max-width: calc(750px + 10vw);
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
  margin-bottom: 4rem;
}
</style>
