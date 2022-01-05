<template>
  <div>
    <q-dialog v-model="show_dialog" persistent>
      <q-card style="width: 400px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>{{
            model === 'add' ? $t('addSupplier') : $t('updateSupplier')
          }}</q-toolbar-title>
          <q-btn
            flat
            round
            color="white"
            icon="close"
            @click="closeDialog"
          ></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow">
          <q-form @submit="onSave" @reset="onReset" class="q-gutter-md">
            <q-input
              autofocus
              clearable
              square
              v-model="supplierForm.companyName"
              lazy-rules
              :rules="nameRules"
              :label="$t('companyName')"
            />
            <q-input
              square
              clearable
              v-model="supplierForm.email"
              lazy-rules
              :rules="emailRules"
              :label="$t('email')"
            />
            <q-input
              square
              clearable
              v-model="supplierForm.phoneNumber"
              lazy-rules
              :rules="phoneNumberRules"
              :label="$t('phoneNumber')"
            />
            <q-input
              square
              clearable
              v-model="supplierForm.address"
              lazy-rules
              :rules="nameRules"
              :label="$t('address')"
            />
            <q-input
              square
              clearable
              v-model="supplierForm.contact"
              lazy-rules
              :rules="nameRules"
              :label="$t('contact')"
            />

            <q-card-actions align="right">
              <q-btn
                v-if="model === 'add'"
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
                :label="model === 'add' ? $t('save') : $t('update')"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { AppConstants, i18n, showInfo } from '../../../core/Export';
import { useStore } from '../../../store';
import { Supplier } from '../../../store/purchase/models';
import {
  nameRules,
  emailRules,
  phoneNumberRules,
} from '../../../services/validations-fields';
export default defineComponent({
  props: {
    supplier: {
      type: Object as PropType<Supplier>,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const store = useStore();
    let supplierForm = ref(JSON.parse(JSON.stringify(props.supplier)));
    const show_dialog = ref(true);

    const onSave = (): void => {
      let actionType = AppConstants.Supplier.ActionSaveSupplier;
      if (supplierForm.value._id) {
        actionType = AppConstants.Supplier.ActionEditSupplier;
      }
      store.dispatch(
        `${AppConstants.PurchaseModule}/${actionType}`,
        supplierForm.value
      );
      showInfo(i18n.global.t('msgSavedSuccessfully'));
      closeDialog();
    };
    const closeDialog = (): void => {
      emit('onCloseDialog');
      onReset();
    };
    const onReset = (): void => {
      supplierForm.value = new Supplier();
    };
    return {
      show_dialog,
      supplierForm,
      nameRules,
      phoneNumberRules,
      emailRules,
      closeDialog,
      onSave,
      onReset,
    };
  },
});
</script>
