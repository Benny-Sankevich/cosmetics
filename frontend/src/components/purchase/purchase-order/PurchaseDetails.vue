<template>
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
          @click="editPurchaseDetails"
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
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { PurchaseOrder } from '../../../store/purchase/models';

export default defineComponent({
  props: {
    purchaseData: {
      type: PurchaseOrder,
      required: false,
    },
  },
  emits: ['editPurchaseDetails'],
  setup(props, { emit }) {
    const editPurchaseDetails = () => {
      emit('editPurchaseDetails');
    };
    return {
      editPurchaseDetails,
    };
  },
});
</script>
