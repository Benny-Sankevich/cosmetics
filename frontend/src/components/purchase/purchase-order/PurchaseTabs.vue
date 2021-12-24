<template>
  <div class="q-gutter-y-md">
    <q-tabs inline-label class="bg-light-blue-13 text-white shadow-2">
      <q-route-tab
        default
        name="purchase-list"
        icon="list"
        :label="$t('purchaseOrders')"
        :to="purchaseListRoute"
      />
      <q-route-tab
        name="suppliers-list"
        icon="contacts"
        :label="$t('supplierList')"
        :to="suppliersListRoute"
      />
      <q-route-tab
        v-if="isPurchaseDetailsRoute"
        name="purchase-details"
        icon="info"
        :label="$t('purchaseInfo')"
        :to="purchaseDetailsRoute"
      />
    </q-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppConstants } from '../../../core/Export';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const isPurchaseDetailsRoute = computed(() => {
      return useRoute().name === 'PurchaseDetails';
    });
    return {
      isPurchaseDetailsRoute,
      suppliersListRoute: {
        name: AppConstants.Routes.SuppliersList,
      },
      purchaseListRoute: {
        name: AppConstants.Routes.PurchaseList,
      },
      purchaseDetailsRoute: {
        name: AppConstants.Routes.PurchaseDetails,
      },
    };
  },
});
</script>
