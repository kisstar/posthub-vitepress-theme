import { ref, computed, onMounted, onUnmounted } from 'vue';
import usePostList from './usePostList';
import { type PostInfo } from '../components/layout/components/PHPostList.vue';

export default (userPosts?: PostInfo[]) => {
  const posts = userPosts || usePostList();
  const cursor = ref(10);
  const renderPosts = computed(() => {
    return posts.slice(
      0,
      cursor.value > posts.length ? posts.length : cursor.value
    );
  });
  const loadMore = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    let nextCursor = cursor.value + 10;

    if (scrollTop + clientHeight + 50 < scrollHeight) {
      return;
    }

    if (nextCursor >= posts.length) {
      cursor.value = posts.length;
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

  return renderPosts;
};
