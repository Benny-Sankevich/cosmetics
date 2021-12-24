import { AppConstants } from '../../core/Export';
import { RouteRecordRaw } from 'vue-router';
import resolvePurchase from 'src/resolvers/purchase/PurchaseResolver';

const purchaseRoutes: RouteRecordRaw = {
  path: 'purchase',
  name: AppConstants.Routes.Purchase,
  meta: {
    resolve: resolvePurchase,
  },
  component: () => import('../../pages/PurchasePage.vue'),
  children: [
    {
      path: '',
      name: AppConstants.Routes.PurchaseList,
      component: () => import('../../components/purchase/purchase-order/PurchaseList.vue'),
    },
    {
      path: 'details',
      name: AppConstants.Routes.PurchaseDetails,
      component: () => import('../../components/purchase/purchase-order/ViewEditPurchase.vue'),
    },
    {
      path: 'suppliers',
      name: AppConstants.Routes.SuppliersList,
      component: () => import('../../components/purchase/suppliers/SuppliersList.vue'),
    },
  ],
};

export { purchaseRoutes };
