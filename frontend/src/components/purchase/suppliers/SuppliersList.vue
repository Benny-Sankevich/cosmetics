<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-table
      :rows="suppliers"
      :columns="columns"
      row-key="name"
      binary-state-sort
      :rows-per-page-options="[15, 20, 30, 40, 0]"
      :filter="filter"
    >
      <template v-slot:top>
        <div class="col-2 q-table__title">{{ $t('supplierList') }}</div>
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn
          color="primary"
          :label="$t('addSupplier')"
          @click="openDialog(null, 'add')"
          no-caps
          icon="add"
          class="q-mr-md"
        />
        <AddEditSupplier
          :supplier="formData"
          :model="model"
          v-if="show_dialog"
          @onCloseDialog="closeDialog"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="companyName" :props="props">
            {{ props.row.companyName }}
          </q-td>
          <q-td key="email" :props="props">
            <div class="text-pre-wrap">{{ props.row.email }}</div>
          </q-td>
          <q-td key="phoneNumber" :props="props">
            {{ props.row.phoneNumber }}
          </q-td>
          <q-td key="contact" :props="props">{{ props.row.contact }}</q-td>
          <q-td key="address" :props="props">{{ props.row.address }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="blue"
              :label="$t('edit')"
              @click="openDialog(props.row, 'edit')"
              size="sm"
              no-caps
            ></q-btn>
            <q-btn
              color="red"
              :label="$t('delete')"
              @click="deleteSupplier(props.row)"
              size="sm"
              no-caps
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { useStore } from '../../../store';
import {
  AppConstants,
  areYouSureDialog,
  i18n,
  showInfo,
} from '../../../core/Export';
import { Supplier } from '../../../store/purchase/models';

export default defineComponent({
  components: {
    AddEditSupplier: defineAsyncComponent(
      () => import('./AddEditSupplier.vue')
    ),
  },
  setup() {
    const store = useStore();
    const filter = ref('');
    const model = ref(null);
    const show_dialog = ref(false);
    const columns = computed(() => {
      return [
        {
          name: 'companyName',
          required: true,
          label: i18n.global.t('companyName'),
          align: 'left',
          sortable: true,
        },
        {
          name: 'email',
          align: 'center',
          label: i18n.global.t('email'),
          field: 'email',
          sortable: true,
        },
        {
          name: 'phoneNumber',
          label: i18n.global.t('phoneNumber'),
          align: 'center',
          field: 'phoneNumber',
          sortable: true,
        },
        {
          name: 'contact',
          label: i18n.global.t('contact'),
          field: 'totalPrice',
        },
        {
          name: 'address',
          label: i18n.global.t('address'),
          field: 'address',
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
        },
      ];
    });
    const formData = ref(null);
    const suppliers = computed(
      () =>
        store.getters[
          `${AppConstants.PurchaseModule}/${AppConstants.Supplier.GetAllSuppliers}`
        ]
    );

    const deleteSupplier = (supplier: Supplier): void => {
      areYouSureDialog().onOk(() =>
        store
          .dispatch(
            `${AppConstants.PurchaseModule}/${AppConstants.Supplier.ActionDeleteSupplier}`,
            supplier
          )
          .then(() => {
            showInfo(i18n.global.t('msgDoneSuccessfully'));
          })
      );
    };
    const openDialog = (supplierData: Supplier, type: string): void => {
      if (supplierData) {
        formData.value = supplierData;
      } else {
        formData.value = new Supplier();
      }
      model.value = type;
      show_dialog.value = true;
    };
    const closeDialog = (): void => {
      show_dialog.value = false;
    };
    return {
      suppliers,
      filter,
      show_dialog,
      model,
      columns,
      formData,
      deleteSupplier,
      openDialog,
      closeDialog,
    };
  },
});
</script>
