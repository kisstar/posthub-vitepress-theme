<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  list: any[];
  itemHeight: number;
  clientHeight: number;
}

const props = defineProps<Props>();
// 额外渲染数量
const extraCount = 5;
const extraHeight = computed(() => {
  return extraCount * props.itemHeight;
});
// 根据容器高度和 item 高度计算渲染数量
const showCount = computed(() => {
  return Math.floor(props.clientHeight / props.itemHeight);
});
const renderCount = computed(() => {
  return showCount.value + extraCount * 2;
});
// 滚动条高度
const scrollTop = ref(0);
const handleScroll = (e: Event) => {
  const target = e.target as HTMLDivElement;

  if (target.scrollTop + target.clientHeight >= totalHeight.value) {
    scrollTop.value = totalHeight.value - target.clientHeight;
  } else {
    scrollTop.value = target.scrollTop;
  }
};
// 容器高度
const topHeight = computed<number>(() => {
  return scrollTop.value > extraHeight.value
    ? scrollTop.value - extraHeight.value
    : 0;
});
const totalHeight = computed(() => {
  return props.list.length * props.itemHeight;
});
const viewHeight = computed(() => {
  return props.itemHeight * showCount.value;
});
const bottomHeight = computed(() => {
  const value =
    totalHeight.value - topHeight.value - viewHeight.value - extraHeight.value;

  return value > 0 ? value : 0;
});
const containerStyleObj = computed(() => {
  return {
    height: '100%'
  };
});
const styleObj = computed(() => {
  return {
    paddingTop: `${topHeight.value}px`,
    paddingBottom: `${bottomHeight.value}px`
  };
});
// 渲染的开始索引
const startIndex = computed(() => {
  return Math.floor(topHeight.value / props.itemHeight);
});
const showList = computed(() => {
  return props.list.slice(
    startIndex.value,
    startIndex.value + renderCount.value
  );
});
</script>

<template>
  <div
    class="ph-virtual-list"
    :style="containerStyleObj"
    @scroll="handleScroll"
  >
    <div class="ph-virtual-list__wrapper" :style="styleObj">
      <slot :list="showList" />
    </div>
  </div>
</template>

<style>
@import '../../styles/vars.css';

.ph-virtual-list {
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>
