import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vitepress';
import { getSearchParams } from '../utils';
import { isClient } from '../constants';

export default function useUrlSearchParams<T>() {
  const router = useRouter();
  const params = ref(getSearchParams());
  const updateParams = () => {
    const newParams = getSearchParams();

    params.value = newParams;
  };

  if (isClient) {
    let originOnAfterRouteChanged = (to: string) => {};

    if (router.onAfterRouteChanged) {
      originOnAfterRouteChanged = router.onAfterRouteChanged;
    }

    router.onAfterRouteChanged = (...args) => {
      updateParams();
      originOnAfterRouteChanged(...args);
    };

    onUnmounted(() => {
      router.onAfterRouteChanged = originOnAfterRouteChanged;
    });
  }

  return params as T;
}
