<script setup lang="ts">
import { useData, withBase } from 'vitepress';
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import NoMore from '../NoMore.vue';

const { site } = useData();
const themeConfig = site.value.themeConfig;
const { tagInfo = {} } = themeConfig;
const tagList = Object.keys(tagInfo);
</script>

<template>
  <div class="ph-tags__container">
    <div class="ph-tags__title">
      <h3 class="ph-tags__name">标签列表</h3>
      <p class="ph-tags__description">
        快速浏览相关主题的文章列表，发现更多有趣内容。
      </p>
    </div>
    <div class="ph-tags__section">
      <div
        class="ph-tags__item"
        v-for="(tagName, index) in tagList"
        :key="index"
      >
        <VPLink class="link" :href="`/tag?tag=${tagName}`"></VPLink>
        <div class="ph-tags__item-overlay"></div>
        <div
          class="ph-tags__item-cover"
          :style="{
            backgroundImage: `url(${withBase(tagInfo[tagName].cover)})`,
          }"
        ></div>
        <div class="ph-tags__item-content">
          <h3 class="ph-tags__item-title">{{ tagName }}</h3>
          <p class="ph-tags__item-des">{{ tagInfo[tagName].des }}</p>
        </div>
      </div>
    </div>
    <NoMore></NoMore>
  </div>
</template>

<style>
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
  flex-wrap: wrap;
}

.ph-tags__item {
  position: relative;
  margin: 0 20px 40px;
  padding: 0 20px;
  width: 385px;
  height: 245px;
}

.ph-tags__item > a {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.ph-tags__item:hover .ph-tags__item-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.ph-tags__item-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.ph-tags__item-cover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background-size: 100% 100%;
}

.ph-tags__item-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  color: var(--ph-tags-content-text);
}

.ph-tags__item-title {
  margin-bottom: 1rem;
  font-size: 24px;
  font-weight: bold;
}

.ph-tags__item-des {
  font-size: 14px;
}
</style>
