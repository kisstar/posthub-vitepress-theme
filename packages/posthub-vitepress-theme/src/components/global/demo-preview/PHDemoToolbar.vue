<script setup lang="ts">
defineProps<{
  isPageFullscreen: boolean;
  isFullscreen: boolean;
}>();

defineEmits(['togglePageFullscreen', 'toggleFullscreen']);
</script>

<template>
  <div class="ph-demo-preview__toolbar">
    <button
      class="ph-demo-preview__toolbar-item"
      @click="$emit('togglePageFullscreen')"
    >
      <svg
        v-if="isPageFullscreen"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        title="退出网页全屏"
      >
        <path
          d="M908.8 896H115.2c-22.4 0-40-17.6-40-40v-688C75.2 145.6 92.8 128 115.2 128h792c22.4 0 40 17.6 40 40v688c1.6 22.4-16 40-38.4 40zM155.2 816h712V208H155.2v608z"
        ></path>
        <path
          d="M433.6 268.8c22.4 0 40 17.6 40 40v176c0 22.4-17.6 40-40 40h-176c-22.4 0-40-17.6-40-40s17.6-40 40-40h136v-136c0-22.4 17.6-40 40-40zM590.4 499.2h176c22.4 0 40 17.6 40 40s-17.6 40-40 40h-136v136c0 22.4-17.6 40-40 40s-40-17.6-40-40v-176c0-22.4 17.6-40 40-40z"
        ></path>
      </svg>
      <svg
        v-else
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        title="网页全屏"
      >
        <path
          d="M908.8 896H115.2c-22.4 0-40-17.6-40-40v-688C75.2 145.6 92.8 128 115.2 128h792c22.4 0 40 17.6 40 40v688c1.6 22.4-16 40-38.4 40zM155.2 816h712V208H155.2v608z"
        ></path>
        <path
          d="M257.6 524.8c-22.4 0-40-17.6-40-40v-176c0-22.4 17.6-40 40-40h176c22.4 0 40 17.6 40 40s-17.6 40-40 40h-136v136c0 22.4-17.6 40-40 40zM766.4 755.2h-176c-22.4 0-40-17.6-40-40s17.6-40 40-40h136v-136c0-22.4 17.6-40 40-40s40 17.6 40 40v176c0 22.4-17.6 40-40 40z"
        ></path>
      </svg>
    </button>
    <button
      class="ph-demo-preview__toolbar-item"
      @click="$emit('toggleFullscreen')"
    >
      <svg
        v-if="isFullscreen"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        title="退出全屏"
      >
        <path
          d="M213.333333 682.666667l128 0 0 128 85.333333 0 0-213.333333L213.333333 597.333333 213.333333 682.666667zM341.333333 341.333333 213.333333 341.333333l0 85.333333 213.333333 0L426.666667 213.333333 341.333333 213.333333 341.333333 341.333333zM597.333333 810.666667l85.333333 0 0-128 128 0 0-85.333333-213.333333 0L597.333333 810.666667zM682.666667 341.333333 682.666667 213.333333l-85.333333 0 0 213.333333 213.333333 0L810.666667 341.333333 682.666667 341.333333z"
        ></path>
      </svg>
      <svg
        v-else
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        title="全屏展示"
      >
        <path
          d="M298.666667 597.333333h-85.333334v213.333334h213.333334v-85.333334h-128v-128z m-85.333334-170.666666h85.333334v-128h128v-85.333334H213.333333v213.333334z m512 298.666666h-128v85.333334h213.333334V597.333333h-85.333334v128z m-128-512v85.333334h128v128h85.333334V213.333333H597.333333z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<style>
.ph-demo-preview__toolbar {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: -72px;
  bottom: 0;
  padding: 24px;
  background-image: linear-gradient(to top right, transparent 0%, #eef1f5 100%);
}

.ph-demo-preview__toolbar-item {
  margin-bottom: 8px;
}
</style>
