import { AppConstants } from '../../core/Export';
import { MainStateInterface } from './../index';
import {
  Supplier,
  PurchaseStateInterface,
  PurchaseOrder,
} from './models';
import { ActionTree } from 'vuex';
import { httpClient } from '../../utils/http-client';

const actions: ActionTree<PurchaseStateInterface, MainStateInterface> = {
  [AppConstants.Supplier.ActionLoadAllSuppliers]: (context) => {
    return httpClient.post('suppliers/get-suppliers').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Supplier.MutationSetSuppliers,
          response.data as Supplier[]
        );
      }
    });
  },
  [AppConstants.Supplier.ActionSaveSupplier]: (
    context,
    payload: Supplier
  ) => {
    return httpClient
      .post('suppliers/add-supplier', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Supplier.MutationSaveSupplier,
            response.data as Supplier
          );
        }
      });
  },
  [AppConstants.Supplier.ActionEditSupplier]: (
    context,
    payload: Supplier
  ) => {
    return httpClient
      .post('suppliers/update-supplier', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Supplier.MutationUpdateSupplier,
            response.data as Supplier
          );
        }
      });
  },
  [AppConstants.Supplier.ActionDeleteSupplier]: (context, payload: string) => {
    return httpClient
      .post('suppliers/delete-supplier', payload)
      .then((response) => {
        if (response.status.toString() === '204') {
          context.commit(AppConstants.Supplier.MutationDeleteSupplier, payload);
        }
      });
  },

  [AppConstants.Purchase.ActionLoadAllPurchaseOrders]: (context) => {
    return httpClient.post('purchase/get-all-orders').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Purchase.MutationSetPurchaseOrders,
          response.data as PurchaseOrder[]
        );
      }
    });
  },
  [AppConstants.Purchase.ActionSavePurchaseOrder]: (
    context,
    payload: PurchaseOrder
  ) => {
    return httpClient
      .post('purchase/add-purchase-order', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Purchase.MutationSavePurchaseOrder,
            response.data as PurchaseOrder
          );
          context.commit(
            AppConstants.Purchase.MutationSetPurchaseOrderToEdit,
            response.data as PurchaseOrder
          );
        }
      });
  },
  [AppConstants.Purchase.ActionEditPurchaseOrder]: (
    context,
    payload: PurchaseOrder
  ) => {
    return httpClient
      .post('purchase/update-purchase-order', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Purchase.MutationUpdatePurchaseOrder,
            response.data as PurchaseOrder
          );
          context.commit(
            AppConstants.Purchase.MutationSetPurchaseOrderToEdit,
            response.data as PurchaseOrder
          );
        }
      });
  },
  [AppConstants.Purchase.ActionDeletePurchaseOrder]: (
    context,
    payload: PurchaseOrder
  ) => {
    return httpClient
      .post('purchase/delete-purchase-order', payload)
      .then((response) => {
        if (response.status.toString() === '204') {
          context.commit(
            AppConstants.Purchase.MutationDeletePurchaseOrder,
            payload
          );
        }
      });
  },
};

export default actions;
