<template>
  <div
    ref="previewRef"
    class="ph-demo-preview"
    :class="{ 'page-fullscreen': isPageFullscreen, fullscreen: isFullscreen }"
    :style="{ height: props.height || '400px' }"
  >
    <div class="ph-demo-preview__content">
      <iframe
        class="ph-demo-preview__content-iframe"
        :src="props.src"
        frameborder="0"
      ></iframe>
    </div>
    <div class="ph-demo-preview__toolbar" v-show="showToolbar">
      <button
        class="ph-demo-preview__toolbar-item"
        @click="togglePageFullscreen"
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
      <button class="ph-demo-preview__toolbar-item" @click="toggleFullscreen">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface DemoPreviewProps {
  src?: string;
  height?: string;
}

const props = defineProps<DemoPreviewProps>();

const isPageFullscreen = ref(false);
const isFullscreen = ref(false);
const showToolbar = ref(false);
const previewRef = ref<HTMLDivElement | null>(null);

const togglePageFullscreen = () => {
  isPageFullscreen.value = !isPageFullscreen.value;

  if (isFullscreen.value) {
    toggleFullscreen();
  }
};

const toggleFullscreen = () => {
  const content = previewRef.value;

  if (content) {
    if (isFullscreen.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      if (content.requestFullscreen) {
        content.requestFullscreen();
      }
    }

    isFullscreen.value = !isFullscreen.value;
  }
};

// 在预览区域内移动鼠标时，显示工具栏，并在停止移动 3 秒后隐藏
let mouseMoveTimer: number | null = null;
const handleMouseMove = (e: MouseEvent) => {
  const previewRect = previewRef.value?.getBoundingClientRect();

  // 判断鼠标是否在预览区域内
  if (
    previewRect &&
    e.clientY > previewRect.top &&
    e.clientY < previewRect.bottom &&
    e.clientX > previewRect.left &&
    e.clientX < previewRect.right
  ) {
    if (mouseMoveTimer) {
      clearTimeout(mouseMoveTimer);
      mouseMoveTimer = null;
    }

    showToolbar.value = true;
    mouseMoveTimer = setTimeout(() => {
      showToolbar.value = false;
    }, 3000);
  }
};

const handleFullscreenChange = () => {
  isFullscreen.value = document.fullscreenElement !== null;

  if (isFullscreen.value) {
    isPageFullscreen.value = false;
  }
};

onMounted(() => {
  // 监听全屏状态变化
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  // 监听鼠标移动事件
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  // 移除全屏状态变化监听
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  // 移除鼠标移动事件监听
  window.removeEventListener('mousemove', handleMouseMove);
  // 清除定时器
  if (mouseMoveTimer) {
    clearTimeout(mouseMoveTimer);
  }
});
</script>

<style scoped>
.ph-demo-preview {
  position: relative;
  width: 100%;
  background: #fff;
}

.ph-demo-preview.page-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.ph-demo-preview__content {
  width: 100%;
  height: 100%;
}

/* iframe 模式的容器 */
.ph-demo-preview__content-iframe {
  width: 100%;
  height: 100%;
  pointer-events: none; /* 禁止 iframe 捕获鼠标事件：iframe 元素默认会捕获鼠标事件，导致外部容器无法接收到鼠标移动事件 */
}

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

/* 全屏时调整工具栏的展示位置 */
.ph-demo-preview.fullscreen .ph-demo-preview__toolbar,
.ph-demo-preview.page-fullscreen .ph-demo-preview__toolbar {
  right: 0px;
}

.ph-demo-preview__toolbar-item {
  margin-bottom: 8px;
}
</style>
