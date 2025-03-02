import { ref, computed, onMounted, onUnmounted, ComputedRef } from 'vue';
import usePostList from './usePostList';
import { type PostInfo } from '../components/layout/components/PHPostList.vue';

export default (userPosts?: ComputedRef<PostInfo[]>) => {
  const posts = computed(() => {
    return userPosts?.value || usePostList();
  });
  const cursor = ref(10);
  const hasMore = computed(() => {
    return cursor.value < posts.value.length;
  });
  const renderPosts = computed(() => {
    return posts.value.slice(
      0,
      cursor.value > posts.value.length ? posts.value.length : cursor.value
    );
  });
  const loadMore = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let nextCursor = cursor.value + 10;

    if (scrollTop + clientHeight + 50 < scrollHeight) {
      return;
    }

    if (nextCursor >= posts.value.length) {
      cursor.value = posts.value.length;
    } else {
      cursor.value = nextCursor;
    }
  };

  onMounted(() => {
    document.addEventListener('scroll', loadMore);
  });

  onUnmounted(() => {
    document.removeEventListener('scroll', loadMore);
  });

  return { renderPosts, hasMore };
};
