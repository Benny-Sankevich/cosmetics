<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-card class="q-mt-sm">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section>
            <q-item-label caption class="text-black">
              {{ $t('supplier') }}: {{ purchaseData.supplier?.companyName }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('email') }}: {{ purchaseData.supplier?.email }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('phoneNumber') }}: {{ purchaseData.supplier?.phoneNumber }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('address') }}: {{ purchaseData.supplier?.address }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('contact') }}: {{ purchaseData.supplier?.contact }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <div class="text-h6">
                {{ $t('orderNumber') }}: {{ purchaseData.orderNumber }}
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label align="right">
              <q-btn
                color="primary"
                round
                flat
                icon="edit"
                @click="openCloseDialog"
              >
                <q-tooltip>{{ $t('editOrder') }}</q-tooltip>
              </q-btn>
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('status') }}:
              {{ purchaseData.isConfirmed ? $t('final') : $t('draft') }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('orderDate') }}:
              {{ purchaseData.orderDate.slice(0, 10) }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('createdDate') }}:
              {{ purchaseData.createdDate.slice(0, 10) }}
            </q-item-label>
            <q-item-label caption class="text-black">
              {{ $t('vat') }}:
              {{ purchaseData.addVAT ? '17%' : '0%' }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pa-none q-ma-none">
        <AddEditPurchase
          v-if="show_dialog"
          :purchaseOrderForm="purchaseData"
          @onCloseDialog="openCloseDialog"
        />
        <PurchaseItemsTable :purchaseOrder="purchaseData" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { useStore } from '../../../store';
import { AppConstants } from '../../../core/Export';
export default defineComponent({
  components: {
    PurchaseItemsTable: defineAsyncComponent(
      () => import('../order-items/PurchaseItemsTable.vue')
    ),
    AddEditPurchase: defineAsyncComponent(() => import('./AddEditPurchase.vue')),
  },
  setup() {
    const store = useStore();
    const show_dialog = ref(false);
    const purchaseData =
      store.getters[
        `${AppConstants.PurchaseModule}/${AppConstants.Purchase.GetPurchaseOrderToEdit}`
      ];
    const openCloseDialog = () => {
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
