<template>
  <div>
    <div class="q-gutter-y-md">
      <PurchaseTabs />
    </div>

    <q-page class="q-pa-sm">
      <router-view></router-view>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  components: {
    PurchaseTabs: defineAsyncComponent(
      () => import('../components/purchase/purchase-order/PurchaseTabs.vue')
    ),
  },
});
</script>
