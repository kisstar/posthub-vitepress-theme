<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { DEFAULT_POSTS_DIRNAMES } from '../../config';
import PHPostMeta from './components/PHPostMeta.vue';

const { frontmatter, page } = useData();

const isPostPage = DEFAULT_POSTS_DIRNAMES.some((dirname) =>
  page.value.filePath.startsWith(`${dirname}/`)
);

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template v-if="isPostPage" #doc-before>
      <PHPostMeta :post-meta="frontmatter"></PHPostMeta>
    </template>
  </Layout>
</template>
