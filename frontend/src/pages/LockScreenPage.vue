<template>
  <q-page class="window-width row justify-center items-center">
    <LockScreen />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    LockScreen: defineAsyncComponent(
      () => import('../components/auth/LockScreen.vue')
    ),
  },
});
</script>
