import { AppConstants } from 'src/core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { PurchaseStateInterface } from './models';

const getters: GetterTree<PurchaseStateInterface, MainStateInterface> = {
  [AppConstants.Supplier.GetAllSuppliers]: (state) => {
    return state.suppliers;
  },
  [AppConstants.Purchase.GetAllPurchaseOrders]: (state) => {
    return state.purchaseOrders;
  },
  [AppConstants.Purchase.GetPurchaseOrderToEdit]: (state) => {
    return state.purchaseOrderToEdit;
  },
};
export default getters;
