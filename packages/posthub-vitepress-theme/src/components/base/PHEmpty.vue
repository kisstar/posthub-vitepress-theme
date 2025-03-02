<script setup lang="ts">
interface Props {
  imgSrc?: string;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: '什么都还没有哟!'
});
</script>

<template>
  <div class="ph-empty">
    <img class="ph-empty__img" v-if="imgSrc" :src="imgSrc" :alt="message" />
    <svg
      class="ph-empty__icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
    >
      <path
        d="M768 85.333333H256a128 128 0 0 0-128 128v597.333334a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128V213.333333a128 128 0 0 0-128-128z m42.666667 725.333334a42.666667 42.666667 0 0 1-42.666667 42.666666H256a42.666667 42.666667 0 0 1-42.666667-42.666666V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h512a42.666667 42.666667 0 0 1 42.666667 42.666666z"
        fill="currentColor"
      ></path>
      <path
        d="M298.666667 298.666667m42.666666 0l341.333334 0q42.666667 0 42.666666 42.666666l0 0q0 42.666667-42.666666 42.666667l-341.333334 0q-42.666667 0-42.666666-42.666667l0 0q0-42.666667 42.666666-42.666666Z"
        fill="currentColor"
      ></path>
      <path
        d="M298.666667 469.333333m42.666666 0l341.333334 0q42.666667 0 42.666666 42.666667l0 0q0 42.666667-42.666666 42.666667l-341.333334 0q-42.666667 0-42.666666-42.666667l0 0q0-42.666667 42.666666-42.666667Z"
        fill="currentColor"
      ></path>
      <path
        d="M298.666667 640m42.666666 0l341.333334 0q42.666667 0 42.666666 42.666667l0 0q0 42.666667-42.666666 42.666666l-341.333334 0q-42.666667 0-42.666666-42.666666l0 0q0-42.666667 42.666666-42.666667Z"
        fill="currentColor"
      ></path>
    </svg>
    <p class="ph-empty__message">{{ message }}</p>
  </div>
</template>

<style>
@import '../../styles/vars.css';

.ph-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--ph-empty-color);
}

.ph-empty__img {
  max-height: 200px;
}

.ph-empty__message {
  margin-top: 12px;
}
</style>
