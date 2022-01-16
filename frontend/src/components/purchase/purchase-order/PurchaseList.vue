<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-table
      :rows="purchaseOrders"
      :columns="columns"
      :title="$t('purchaseOrders')"
      row-key="name"
      binary-state-sort
      :rows-per-page-options="[15, 20, 30, 40, 0]"
      :filter="filter"
    >
      <template v-slot:top-right>
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
      </template>

      <template v-slot:top-left>
        <div>
          <q-btn
            color="primary"
            :label="$t('addOrder')"
            @click="openCloseDialog()"
            no-caps
            icon="add"
            class="q-mr-md"
          ></q-btn>
        </div>
        <AddEditPurchase
          v-if="show_dialog"
          :purchaseFormData="newPurchase"
          @onCloseDialog="openCloseDialog"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="orderNumber" :props="props">
            {{ props.row.orderNumber }}
          </q-td>
          <q-td key="companyName" :props="props">
            <div class="text-pre-wrap">
              {{ props.row.supplier?.companyName }}
            </div>
          </q-td>
          <q-td key="addVAT" :props="props">
            {{ props.row.addVAT ? $t('including') : $t('notIncluding') }}
          </q-td>
          <q-td key="totalPrice" :props="props">
            {{ props.row.totalPrice }}
          </q-td>
          <q-td key="orderDate" :props="props">{{
            props.row.orderDate.slice(0, 10)
          }}</q-td>
          <q-td key="createdDate" :props="props">{{
            props.row.createdDate.slice(0, 10)
          }}</q-td>
          <q-td key="isConfirmed" :props="props">{{
            props.row.isConfirmed ? $t('final') : $t('draft')
          }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="blue"
              :label="$t('update')"
              @click="editOrder(props.row)"
              size="sm"
              no-caps
            />
            <q-btn
              color="red"
              :label="$t('delete')"
              size="sm"
              @click="deleteOrder(props.row)"
              no-caps
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { useStore } from '../../../store';
import { AppConstants, i18n, showInfo } from '../../../core/Export';
import { useRouter } from 'vue-router';
import { PurchaseOrder } from '../../../store/purchase/models';
import { useQuasar } from 'quasar';

export default defineComponent({
  components: {
    AddEditPurchase: defineAsyncComponent(
      () => import('./AddEditPurchase.vue')
    ),
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const filter = ref('');
    const show_dialog = ref(false);
    let newPurchase = ref(new PurchaseOrder());

    const columns = [
      {
        name: 'orderNumber',
        required: true,
        label: i18n.global.t('orderNumber'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'companyName',
        required: true,
        label: i18n.global.t('supplier'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'addVAT',
        required: true,
        label: i18n.global.t('vat'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'totalPrice',
        required: true,
        label: i18n.global.t('total'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'orderDate',
        required: true,
        label: i18n.global.t('orderDate'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'createdDate',
        required: true,
        label: i18n.global.t('createdDate'),
        align: 'left',
        sortable: true,
      },

      {
        name: 'isConfirmed',
        required: true,
        label: i18n.global.t('status'),
        align: 'left',
        sortable: true,
      },
      {
        name: 'actions',
        label: '',
        field: 'actions',
      },
    ];

    const purchaseOrders = computed(
      () =>
        store.getters[
          `${AppConstants.PurchaseModule}/${AppConstants.Purchase.GetAllPurchaseOrders}`
        ]
    );
    const openCloseDialog = (): void => {
      show_dialog.value = !show_dialog.value;
    };
    const editOrder = (payload): void => {
      store.commit(
        `${AppConstants.PurchaseModule}/${AppConstants.Purchase.MutationSetPurchaseOrderToEdit}`,
        payload
      );

      router.push({
        name: AppConstants.Routes.PurchaseDetails,
      });
    };
    const deleteOrder = (payload): void => {
      $q.dialog({
        title: `${i18n.global.t('confirm')}`,
        message: `${i18n.global.t('msgAreYouSure?')}`,
        color: 'negative',
        ok: `${i18n.global.t('msgYesImSure')}`,
        cancel: true,
        focus: 'cancel',
      }).onOk(() => {
        store
          .dispatch(
            `${AppConstants.PurchaseModule}/${AppConstants.Purchase.ActionDeletePurchaseOrder}`,
            payload
          )
          .then(() => {
            showInfo(i18n.global.t('msgDoneSuccessfully'));
          });
      });
    };
    return {
      newPurchase,
      show_dialog,
      purchaseOrders,
      filter,
      columns,
      editOrder,
      openCloseDialog,
      deleteOrder,
    };
  },
});
</script>
