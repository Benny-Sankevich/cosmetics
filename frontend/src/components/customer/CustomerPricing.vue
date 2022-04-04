<template>
  <div class="row col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <div
      class="col-lg-6 col-md-3 col-xs-12 col-sm-12"
      v-for="treatment in pricingData"
      :key="treatment._id"
    >
      <CardPricing :treatment="treatment" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { apiService } from '../../core/ApiService';

export default defineComponent({
  components: {
    CardPricing: defineAsyncComponent(() => import('./cards/CardPricing.vue')),
  },
  setup() {
    const pricingData = ref([]);

    apiService
      .getCustomersTreatments()
      .then((res) => (pricingData.value = res));

    return {
      pricingData,
    };
  },
});
</script>
