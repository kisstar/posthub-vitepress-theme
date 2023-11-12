<script lang="ts">
import { h } from 'vue';
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

export default {
  props: {
    type: String,
  },
  setup(props) {
    return () => h(components[props.type || '']);
  },
};
</script>
