<template>
  <q-dialog v-model="show_dialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{
          model === 'add' ? $t('addItem') : $t('updateItem')
        }}</q-toolbar-title>
        <q-btn
          flat
          round
          color="white"
          icon="close"
          @click="closeDialog(null)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow">
        <q-form @submit="onSaveItem" class="q-gutter-md">
          <q-select
            transition-show="scale"
            transition-hide="scale"
            square
            v-model="purchaseItemForm.productId"
            :options="products"
            option-label="name"
            option-value="_id"
            :emit-value="true"
            map-options
            :rules="requiredRules"
            :label="$t('product')"
          />
          <q-input
            square
            clearable
            v-model="purchaseItemForm.amount"
            lazy-rules
            :rules="priceRules"
            :label="$t('amount')"
          />
          <q-input
            square
            clearable
            v-model="purchaseItemForm.price"
            lazy-rules
            :rules="priceRules"
            :label="$t('price')"
          />
          <q-card-actions align="right">
            <q-btn
              unelevated
              type="submit"
              color="primary"
              class="text-white"
              >{{ model === 'add' ? $t('save') : $t('update') }}</q-btn
            >
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { PurchaseItem } from '../../../store/purchase/models';
import {
  apiService,
  functionsService,
  priceRules,
  requiredRules,
} from '../../../core/Export';
export default defineComponent({
  props: {
    purchaseItem: {
      type: Object as PropType<PurchaseItem>,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    let purchaseItemForm = ref(props.purchaseItem);
    const show_dialog = ref(true);
    const products = ref([]);

    apiService.getAllProducts().then((res) => {
      products.value = res;
    });
    const onSaveItem = (): void => {
      purchaseItemForm.value.price = functionsService.fixNumber(
        +purchaseItemForm.value.price
      );
      purchaseItemForm.value.totalPrice = calculateTotalPrice(
        purchaseItemForm.value.price,
        purchaseItemForm.value.amount
      );
      closeDialog(purchaseItemForm.value);
    };
    const calculateTotalPrice = (price: number, amount: number): number => {
      return functionsService.fixNumber(price * amount);
    };
    const closeDialog = (dataToSave: PurchaseItem): void => {
      emit('onCloseDialog', dataToSave);
    };
    return {
      requiredRules,
      priceRules,
      show_dialog,
      purchaseItemForm,
      products,
      closeDialog,
      onSaveItem,
    };
  },
});
</script>
