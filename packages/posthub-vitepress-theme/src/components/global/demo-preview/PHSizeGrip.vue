<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const emit = defineEmits<{
  (e: 'pos-change', x: number, y: number): void;
}>();

const sizeGripRef = ref<HTMLDivElement | null>(null);

// 当鼠标按下时，监听鼠标移动事件，计算出水平和垂直移动的距离，通过事件传递给父组件
const handleMouseDown = (e: MouseEvent) => {
  if (!sizeGripRef.value) return;

  let startX = e.clientX;
  let startY = e.clientY;
  let animationFrameId: number;

  const handleMouseMove = (e: MouseEvent) => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      startX = e.clientX;
      startY = e.clientY;
      emit('pos-change', deltaX, deltaY);
    });
  };

  const handleMouseUp = () => {
    cancelAnimationFrame(animationFrameId);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

onMounted(() => {
  sizeGripRef.value?.addEventListener('mousedown', handleMouseDown);
});

onUnmounted(() => {
  sizeGripRef.value?.removeEventListener('mousedown', handleMouseDown);
});
</script>

<template>
  <div class="ph-demo-preview__win-size-grip" ref="sizeGripRef"></div>
</template>

<style>
.ph-demo-preview__win-size-grip {
  position: absolute;
  width: 24px;
  height: 24px;
  bottom: 0;
  right: 0;
  cursor: nwse-resize;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  background: repeating-linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.5),
    hsla(0, 0%, 100%, 0.5) 2px,
    #000 0,
    #000 4px
  );
}
</style>
