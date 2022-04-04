<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm q-py-sm">
      <AppointmentsCards />

      <CarouselImages />
    </div>
    <div class="row q-col-gutter-sm q-py-sm">
      <CustomerPricing />

      <Info />
    </div>
    <Footer />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    CarouselImages: defineAsyncComponent(
      () => import('../components/customer/CarouselImages.vue')
    ),
    AppointmentsCards: defineAsyncComponent(
      () => import('../components/customer/cards/CustomerCards.vue')
    ),
    CustomerPricing: defineAsyncComponent(
      () => import('../components/customer/CustomerPricing.vue')
    ),
    Info: defineAsyncComponent(
      () => import('../components/customer/info/Info.vue')
    ),
    Footer: defineAsyncComponent(() => import('../layouts/Footer.vue')),
  },
});
</script>
