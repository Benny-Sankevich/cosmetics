import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { PurchaseOrder, PurchaseStateInterface, Supplier } from './models';

const getters: GetterTree<PurchaseStateInterface, MainStateInterface> = {
  [AppConstants.Supplier.GetAllSuppliers]: (state): Supplier[] => {
    return state.suppliers;
  },
  [AppConstants.Purchase.GetAllPurchaseOrders]: (state): PurchaseOrder[] => {
    return state.purchaseOrders;
  },
  [AppConstants.Purchase.GetPurchaseOrderToEdit]: (state): PurchaseOrder => {
    return state.purchaseOrderToEdit;
  },
};
export default getters;
