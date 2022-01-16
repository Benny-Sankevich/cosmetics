import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { PurchaseStateInterface, Supplier, PurchaseOrder } from './models';

const mutation: MutationTree<PurchaseStateInterface> = {
  [AppConstants.Supplier.MutationSetSuppliers]: (
    state,
    payload: Supplier[]
  ) => {
    state.suppliers = payload;
  },
  [AppConstants.Supplier.MutationSaveSupplier]: (state, payload: Supplier) => {
    state.suppliers.push(payload);
  },
  [AppConstants.Supplier.MutationUpdateSupplier]: (
    state,
    payload: Supplier
  ) => {
    const indexToUpdate = state.suppliers.findIndex(
      (x) => x._id === payload._id
    );
    state.suppliers[indexToUpdate] = payload;
  },
  [AppConstants.Supplier.MutationDeleteSupplier]: (
    state,
    payload: Supplier
  ) => {
    const IndexToDelete = state.suppliers.findIndex(
      (x) => x._id === payload._id
    );
    state.suppliers.splice(IndexToDelete, 1);
  },

  [AppConstants.Purchase.MutationSetPurchaseOrders]: (
    state,
    payload: PurchaseOrder[]
  ) => {
    state.purchaseOrders = payload;
  },
  [AppConstants.Purchase.MutationSavePurchaseOrder]: (
    state,
    payload: PurchaseOrder
  ) => {
    state.purchaseOrders.push(payload);
  },
  [AppConstants.Purchase.MutationUpdatePurchaseOrder]: (
    state,
    payload: PurchaseOrder
  ) => {
    const indexToUpdate = state.purchaseOrders.findIndex(
      (x) => x._id === payload._id
    );
    state.purchaseOrders[indexToUpdate] = payload;
  },
  [AppConstants.Purchase.MutationDeletePurchaseOrder]: (
    state,
    payload: PurchaseOrder
  ) => {
    const IndexToDelete = state.purchaseOrders.findIndex(
      (x) => x._id === payload._id
    );
    state.purchaseOrders.splice(IndexToDelete, 1);
  },
  [AppConstants.Purchase.MutationSetPurchaseOrderToEdit]: (
    state,
    payload: PurchaseOrder
  ) => {
    state.purchaseOrderToEdit = payload;
  },
};

export default mutation;
