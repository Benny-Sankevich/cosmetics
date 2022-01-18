import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { PurchaseStateInterface, Supplier, PurchaseOrder } from './models';

const mutation: MutationTree<PurchaseStateInterface> = {
  [AppConstants.Supplier.MutationSetSuppliers]: (
    state,
    payload: Supplier[]
  ): void => {
    state.suppliers = payload;
  },
  [AppConstants.Supplier.MutationSaveSupplier]: (
    state,
    payload: Supplier
  ): void => {
    state.suppliers.push(payload);
  },
  [AppConstants.Supplier.MutationUpdateSupplier]: (
    state,
    payload: Supplier
  ): void => {
    const indexToUpdate = state.suppliers.findIndex(
      (x) => x._id === payload._id
    );
    state.suppliers[indexToUpdate] = payload;
  },
  [AppConstants.Supplier.MutationDeleteSupplier]: (
    state,
    payload: Supplier
  ): void => {
    const IndexToDelete = state.suppliers.findIndex(
      (x) => x._id === payload._id
    );
    state.suppliers.splice(IndexToDelete, 1);
  },

  [AppConstants.Purchase.MutationSetPurchaseOrders]: (
    state,
    payload: PurchaseOrder[]
  ): void => {
    state.purchaseOrders = payload;
  },
  [AppConstants.Purchase.MutationSavePurchaseOrder]: (
    state,
    payload: PurchaseOrder
  ): void => {
    state.purchaseOrders.push(payload);
  },
  [AppConstants.Purchase.MutationUpdatePurchaseOrder]: (
    state,
    payload: PurchaseOrder
  ): void => {
    const indexToUpdate = state.purchaseOrders.findIndex(
      (x) => x._id === payload._id
    );
    state.purchaseOrders[indexToUpdate] = payload;
  },
  [AppConstants.Purchase.MutationDeletePurchaseOrder]: (
    state,
    payload: PurchaseOrder
  ): void => {
    const IndexToDelete = state.purchaseOrders.findIndex(
      (x) => x._id === payload._id
    );
    state.purchaseOrders.splice(IndexToDelete, 1);
  },
  [AppConstants.Purchase.MutationSetPurchaseOrderToEdit]: (
    state,
    payload: PurchaseOrder
  ): void => {
    state.purchaseOrderToEdit = payload;
  },
};

export default mutation;
