<template>
  <q-page class="window-width row justify-center items-center">
    <About />
  </q-page>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  components: {
    About: defineAsyncComponent(() => import('../components/about/About.vue')),
  },
});
</script>
