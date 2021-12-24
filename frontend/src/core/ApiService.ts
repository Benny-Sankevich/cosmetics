import { PurchaseItem } from '../store/purchase/models';
import { DateStartEnd, ResetPassword } from 'src/models/general-models';
import { httpClient } from 'src/utils/http-client';

class ApiService {
  getTotalUsers() {
    return httpClient.post('users/get-total-users').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getSumOfOrdersBetweenDate(dateRange: DateStartEnd) {
    return httpClient
      .post('appointments/get-sum-between-date', dateRange)
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getTodayNewUsersAsync() {
    return httpClient.post('users/get-new-users-today').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getAllAppointmentsToday() {
    return httpClient
      .post('appointments/get-appointments-today')
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  resetPassword(passwordData: ResetPassword) {
    return httpClient
      .post('auth/change-password', passwordData)
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getAllProducts() {
    return httpClient.post('products/get-all-products').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getSumOfPurchaseOrdersBetweenDate(dateRange: DateStartEnd) {
    return httpClient
      .post('purchase/get-sum-between-date', dateRange)
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getReportDataByYear(year: number) {
    return httpClient
      .post('reports/get-year-data-report', { year })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getItemsByOrderId(purchaseOrderId: string) {
    return httpClient
      .post('purchase/get-items-by-orderId', { purchaseOrderId })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  addPurchaseItem(purchaseItem: PurchaseItem) {
    return httpClient
      .post('purchase/add-purchase-item', purchaseItem)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  updatePurchaseItem(purchaseItem: PurchaseItem) {
    return httpClient
      .post('purchase/update-purchase-item', purchaseItem)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  deletePurchaseItem(purchaseItem: PurchaseItem) {
    return httpClient
      .post('purchase/delete-purchase-item', purchaseItem)
      .then((response) => {
        if (response.status.toString() === '204') {
          return response.status;
        }
      });
  }
  checkEmailNotExist(email: string) {
    return httpClient
      .post('auth/check-email', { email: email })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
}
export const apiService = new ApiService();
