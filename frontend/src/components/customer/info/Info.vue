<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <CardInfo />

      <MapMarker />
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    MapMarker: defineAsyncComponent(() => import('./MapMarker.vue')),
    CardInfo: defineAsyncComponent(() => import('../cards/CardInfo.vue')),
  },
});
</script>
