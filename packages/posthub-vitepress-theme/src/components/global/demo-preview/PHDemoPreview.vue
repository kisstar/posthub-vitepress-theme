<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import PHDemoToolbar from './PHDemoToolbar.vue';
import PHSizeGrip from './PHSizeGrip.vue';

interface DemoPreviewProps {
  src?: string;
  height?: string;
}

const props = defineProps<DemoPreviewProps>();

const isPageFullscreen = ref(false);
const isFullscreen = ref(false);
const showToolbar = ref(false);
const previewRef = ref<HTMLDivElement | null>(null);

const previewStyle = computed(() => {
  const styleConf = {
    height:
      isFullscreen.value || isPageFullscreen.value
        ? ''
        : props.height || '400px'
  };

  return styleConf;
});

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

const handleFullscreenChange = () => {
  isFullscreen.value = document.fullscreenElement !== null;

  if (isFullscreen.value) {
    isPageFullscreen.value = false;
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

/**
 * 根据鼠标移动尺寸按钮的距离，调整预览区域的大小
 *
 * @param x 宽度变化量
 * @param y 高度变化量
 */
const handleSizeChange = (x: number, y: number) => {
  const previewRect = previewRef.value?.getBoundingClientRect();

  if (previewRect) {
    let newWidth = previewRect.width + x;
    let newHeight = previewRect.height + y;

    if (newHeight < 100) {
      newHeight = 100;
    }
    if (newWidth < 100) {
      newWidth = 100;
    }

    previewRef.value!.style.width = `${newWidth}px`;
    previewRef.value!.style.height = `${newHeight}px`;
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

<template>
  <div
    ref="previewRef"
    class="ph-demo-preview"
    :class="{ 'page-fullscreen': isPageFullscreen, fullscreen: isFullscreen }"
    :style="previewStyle"
  >
    <div class="ph-demo-preview__content">
      <iframe
        class="ph-demo-preview__content-iframe"
        :src="props.src"
        frameborder="0"
      ></iframe>
    </div>
    <PHDemoToolbar
      v-show="showToolbar"
      :isPageFullscreen="isPageFullscreen"
      :isFullscreen="isFullscreen"
      @togglePageFullscreen="togglePageFullscreen"
      @toggleFullscreen="toggleFullscreen"
    ></PHDemoToolbar>
    <PHSizeGrip
      v-show="showToolbar"
      @pos-change="handleSizeChange"
    ></PHSizeGrip>
  </div>
</template>

<style scoped>
.ph-demo-preview {
  position: relative;
  width: 100%;
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 9;
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

/* 全屏时调整工具栏的展示位置 */
.ph-demo-preview.fullscreen .ph-demo-preview__toolbar,
.ph-demo-preview.page-fullscreen .ph-demo-preview__toolbar {
  right: 0px;
}
</style>
