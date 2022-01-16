<template>
  <q-page class="full-width">
    <div class="q-gutter-y-md">
      <ReportsTabs />
    </div>
    <div class="q-pa-lg row wrap justify-center items-center content-center">
      <router-view></router-view>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  components: {
    ReportsTabs: defineAsyncComponent(
      () => import('../components/reports/ReportsTabs.vue')
    ),
  },
});
</script>
