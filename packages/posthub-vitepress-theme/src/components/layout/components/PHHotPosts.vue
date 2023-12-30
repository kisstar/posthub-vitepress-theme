<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue';
import type { PostInfo } from './PHPostList.vue';

defineProps<{ posts: PostInfo[] }>();

// register Swiper custom elements
register();
</script>

<template>
  <div class="ph-hot-post">
    <swiper-container autoplay-delay="2500">
      <swiper-slide v-for="post in posts" :key="post.url">
        <VPLink :href="post.url">
          <div class="ph-hot-post__item">
            <div class="ph-hot-post__item-mask"></div>
            <div
              class="ph-hot-post__item-cover"
              :style="{
                'background-image': `url(${post.banner || post.thumbnail})`
              }"
            ></div>
            <div class="ph-hot-post__item-content">
              <div class="ph-hot-post__item-content-title">
                {{ post.title }}
              </div>
              <div class="ph-hot-post__item-content-des">
                {{ post.summary }}
              </div>
            </div>
          </div>
        </VPLink>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style>
@import '../../../styles/vars.css';

.ph-hot-post__item {
  position: relative;
  margin: 16px 0;
  height: 350px;
  overflow: hidden;

  &:hover {
    .ph-hot-post__item-cover {
      transform: scale(1.05);
    }

    .ph-hot-post__item-mask {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.ph-hot-post__item-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.ph-hot-post__item-cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 100% 100%;
  filter: contrast(50%);
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.ph-hot-post__item-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--ph-hot-post-item-content-text);
  padding: 64px;
}

.ph-hot-post__item-content-des {
  margin-top: 16px;
  font-size: 14px;
}
</style>
