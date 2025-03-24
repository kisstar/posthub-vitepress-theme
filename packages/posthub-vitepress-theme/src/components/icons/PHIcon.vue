<script lang="ts">
import { defineComponent, h } from 'vue';
import PHGitHub from './PHGitHub.vue';
import PHLocation from './PHLocation.vue';
import PHJueJin from './PHJueJin.vue';
import PHEmail from './PHEmail.vue';
import PHTwitter from './PHTwitter.vue';
import PHTime from './PHTime.vue';
import PHTag from './PHTag.vue';

const components = {
  location: PHLocation,
  github: PHGitHub,
  juejin: PHJueJin,
  email: PHEmail,
  twitter: PHTwitter,
  time: PHTime,
  tag: PHTag,
};

export default defineComponent({
  props: {
    type: String,
  },
  setup(props) {
    const comp = components[props.type || ''];

    return () => {
      if (comp) {
        // 如果组件存在，渲染该组件
        return h(comp);
      } else if (props.type?.startsWith('http')) {
        // 如果 type 以 http 开头，渲染一个图片
        return h('img', { src: props.type });
      } else if (props.type) {
        // 如果 type 有值但组件不存在且不以 http 开头，渲染一个 svg 元素
        return h('div', {
          innerHTML: props.type,
        });
      } else {
        // 如果 type 没有值，不渲染任何内容
        return null;
      }
    };
  },
});
</script>
