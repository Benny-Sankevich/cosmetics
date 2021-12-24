import { AppConstants } from 'src/core/Export';
import { appStore, MainStateInterface } from '../../store/index';

import { Store } from 'vuex';

function resolvePurchase() {
  const suppliersPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.PurchaseModule}/${AppConstants.Supplier.ActionLoadAllSuppliers}`
  );
  const purchaseOrdersPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.PurchaseModule}/${AppConstants.Purchase.ActionLoadAllPurchaseOrders}`
  );
  return Promise.all([suppliersPromise, purchaseOrdersPromise]);
}

export default resolvePurchase;