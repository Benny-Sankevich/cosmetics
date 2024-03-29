<template>
  <q-table
    :rows="data"
    :columns="columns"
    row-key="name"
    binary-state-sort
    :rows-per-page-options="[0]"
    :hide-pagination="true"
  >
    <template v-slot:top-right>
      <div class="text-h6">{{ $t('total') }}: {{ totalSum }}</div>
    </template>

    <template v-slot:top-left>
      <q-btn
        color="primary"
        :label="$t('addItem')"
        @click="openDialog(null, 'add')"
        no-caps
      ></q-btn>
      <AddEditPurchaseItem
        :purchaseItem="purchaseItem"
        :model="model"
        v-if="show_dialog"
        @onCloseDialog="closeDialog($event)"
      />
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="productId" :props="props">
          {{ props.row.product.name }}
        </q-td>
        <q-td key="amount" :props="props">
          <div class="text-pre-wrap">{{ props.row.amount }}</div>
        </q-td>
        <q-td key="price" :props="props">
          {{ props.row.price }}
        </q-td>
        <q-td key="totalPrice" :props="props">{{ props.row.totalPrice }}</q-td>
        <q-td key="actions" :props="props">
          <q-btn
            color="blue"
            :label="$t('update')"
            @click="openDialog(props.row, 'edit')"
            size="sm"
            no-caps
          />
          <q-btn
            color="red"
            :label="$t('delete')"
            @click="deleteItem(props.row)"
            size="sm"
            no-caps
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script lang="ts">
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  PropType,
  computed,
} from 'vue';
import {
  apiService,
  i18n,
  showInfo,
  functionsService,
  areYouSureDialog,
} from '../../../core/Export';
import { PurchaseItemInterface } from '../../../models/general-models';
import { PurchaseItem, PurchaseOrder } from '../../../store/purchase/models';

export default defineComponent({
  props: {
    purchaseOrder: {
      type: Object as PropType<PurchaseOrder>,
      required: true,
    },
  },
  components: {
    AddEditPurchaseItem: defineAsyncComponent(
      () => import('./AddEditPurchaseItem.vue')
    ),
  },
  setup(props) {
    const show_dialog = ref(false);
    const totalSum = ref(0);
    const data = ref([]);
    const model = ref(null);
    const purchaseItem = ref(new PurchaseItem());

    const getPurchaseItems = (): void => {
      apiService.getItemsByOrderId(props.purchaseOrder?._id).then((res) => {
        data.value = res as PurchaseItemInterface[];
        if (data.value.length > 0) {
          calculateTotalSumOfOrder();
        }
      });
    };
    getPurchaseItems();
    const columns = computed(() => {
      return [
        {
          name: 'productId',
          required: true,
          label: i18n.global.t('product'),
          align: 'left',
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'price',
          align: 'center',
          label: i18n.global.t('amount'),
          field: 'price',
          sortable: true,
        },
        {
          name: 'amount',
          label: i18n.global.t('price'),
          align: 'center',
          field: 'amount',
          sortable: true,
        },
        {
          name: 'totalPrice',
          label: i18n.global.t('total'),
          field: 'totalPrice',
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
        },
      ];
    });

    const addItem = (payload: PurchaseItem): void => {
      apiService.addPurchaseItem(payload).then(() => {
        showInfo(i18n.global.t('msgSavedSuccessfully'));
        getPurchaseItems();
      });
    };
    const editItem = (payload: PurchaseItem): void => {
      apiService.updatePurchaseItem(payload).then(() => {
        showInfo(i18n.global.t('msgSavedSuccessfully'));
        getPurchaseItems();
      });
    };
    const deleteItem = (payload: PurchaseItem): void => {
      areYouSureDialog().onOk(async () => {
        await apiService.deletePurchaseItem(payload);
        data.value.splice(
          functionsService.findIndex(data.value, payload._id),
          1
        );
        calculateTotalSumOfOrder();
        showInfo(i18n.global.t('msgDoneSuccessfully'));
      });
    };

    const openDialog = (purchaseItemData: PurchaseItem, type: string): void => {
      model.value = type;
      if (purchaseItemData) {
        purchaseItem.value = { ...purchaseItemData };
      } else {
        purchaseItem.value = new PurchaseItem();
        purchaseItem.value.purchaseOrderId = functionsService.copyStoreData(
          props.purchaseOrder?._id
        );
      }
      show_dialog.value = true;
    };

    const closeDialog = (event: PurchaseItem): void => {
      show_dialog.value = false;
      if (event) {
        if (event._id) {
          editItem(event);
        } else {
          addItem(event);
        }
      }
    };
    const calculateTotalSumOfOrder = (): void => {
      totalSum.value = functionsService.calculateTotalPriceArray(data.value);
    };

    return {
      model,
      purchaseItem,
      show_dialog,
      totalSum,
      columns,
      data,
      closeDialog,
      openDialog,
      deleteItem,
    };
  },
});
</script>
