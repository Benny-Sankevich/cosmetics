<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-card class="q-mt-sm">
      <q-card-section class="text-h6 q-pb-none">
        <PurchaseDetails
          :purchaseData="purchaseData"
          @editPurchaseDetails="openCloseDialog"
        />
      </q-card-section>
      <q-card-section class="q-pa-none q-ma-none">
        <AddEditPurchase
          v-if="show_dialog"
          :purchaseFormData="purchaseData"
          @onCloseDialog="openCloseDialog"
        />
        <PurchaseItemsTable :purchaseOrder="purchaseData" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { useStore } from '../../../store';
import { AppConstants } from '../../../core/Export';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    PurchaseItemsTable: defineAsyncComponent(
      () => import('../order-items/PurchaseItemsTable.vue')
    ),
    AddEditPurchase: defineAsyncComponent(
      () => import('./AddEditPurchase.vue')
    ),
    PurchaseDetails: defineAsyncComponent(
      () => import('./PurchaseDetails.vue')
    ),
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const show_dialog = ref(false);
    const purchaseData = computed(() => {
      return store.getters[
        `${AppConstants.PurchaseModule}/${AppConstants.Purchase.GetPurchaseOrderToEdit}`
      ];
    });
    if (!purchaseData.value) {
      router.push({ name: AppConstants.Routes.PurchaseList });
    }
    const openCloseDialog = (): void => {
      show_dialog.value = !show_dialog.value;
    };
    return {
      purchaseData,
      show_dialog,
      openCloseDialog,
    };
  },
});
</script>
