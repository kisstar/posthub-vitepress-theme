<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import PHPostMeta from './components/PHPostMeta.vue';

const { frontmatter } = useData();

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <PHPostMeta :post-meta="frontmatter"></PHPostMeta>
    </template>
  </Layout>
</template>
