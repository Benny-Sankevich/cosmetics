<template>
  <div>
    <q-dialog v-model="show_dialog" persistent>
      <q-card style="width: 400px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>{{ $t('addOrder') }}</q-toolbar-title>
          <q-btn
            flat
            round
            color="white"
            icon="close"
            @click="closeDialog"
          ></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow">
          <q-form @submit="onSaveOrder" @reset="onReset" class="q-gutter-md">
            <q-select
              :label="$t('supplier')"
              transition-show="scale"
              transition-hide="scale"
              square
              v-model="purchaseForm.supplierId"
              :options="suppliers"
              option-value="_id"
              :option-label="(item) => `${item.companyName}`"
              map-options
              :emit-value="true"
              style="width: 370px"
              :rules="requiredRules"
            >
            </q-select>
            <q-input
              square
              v-model="purchaseForm.orderDate"
              mask="date"
              lazy-rules
              :rules="requiredRules"
              :label="$t('orderDate')"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="purchaseForm.orderDate">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-checkbox
              v-model="purchaseForm.addVAT"
              :label="$t('addVAT') + '?'"
            />
            <q-card-actions align="right">
              <q-btn
                unelevated
                type="reset"
                color="secondary"
                class="text-white"
                :label="$t('reset')"
              />
              <q-btn
                unelevated
                type="submit"
                color="primary"
                class="text-white"
                :label="$t('save')"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import {
  AppConstants,
  functionsService,
  i18n,
  showInfo,
} from '../../../core/Export';
import { useStore } from '../../../store';
import { useRouter } from 'vue-router';
import { requiredRules } from '../../../services/validations-fields';
import { PurchaseOrder } from '../../../store/purchase/models';
export default defineComponent({
  props: {
    purchaseFormData: {
      type: Object as PropType<PurchaseOrder>,
      required: true,
    },
    model: {
      type: String,
      required: false,
    },
  },

  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const purchaseForm = ref(
      functionsService.copyStoreData(props.purchaseFormData)
    );
    const show_dialog = ref(true);
    const suppliers = computed(
      () =>
        store.getters[
          `${AppConstants.PurchaseModule}/${AppConstants.Supplier.GetAllSuppliers}`
        ]
    );

    const onSaveOrder = (): void => {
      let actionType = AppConstants.Purchase.ActionSavePurchaseOrder;
      if (purchaseForm.value?._id) {
        actionType = AppConstants.Purchase.ActionEditPurchaseOrder;
      }
      store
        .dispatch(
          `${AppConstants.PurchaseModule}/${actionType}`,
          purchaseForm.value
        )
        .then(() => {
          // need to pass the data to the parent component
          showInfo(i18n.global.t('msgSavedSuccessfully'));
          closeDialog();
          if (actionType == AppConstants.Purchase.ActionSavePurchaseOrder) {
            router.push({
              name: AppConstants.Routes.PurchaseDetails,
            });
          }
        });
    };
    const closeDialog = (): void => {
      emit('onCloseDialog');
      onReset();
    };
    const onReset = (): void => {
      purchaseForm.value = new PurchaseOrder();
    };
    return {
      purchaseForm,
      show_dialog,
      suppliers,
      requiredRules,
      onSaveOrder,
      onReset,
      closeDialog,
    };
  },
});
</script>
