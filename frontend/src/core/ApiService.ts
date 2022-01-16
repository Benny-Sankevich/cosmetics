import { httpClient } from '../utils/http-client';
import {
  ChartReportInterface,
  DateStartEnd,
  ResetPassword,
  Product,
} from '../models/general-models';
import { PurchaseItem } from '../store/purchase/models';
import { Appointment } from '../store/appointments/models';
import { ReportInterface, ReportPropertiesToView } from '../store/reports/models';

class ApiService {
  getTotalUsers(): Promise<number> {
    return httpClient.post('users/get-total-users').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getSumOfOrdersBetweenDate(dateRange: DateStartEnd): Promise<number> {
    return httpClient
      .post('appointments/get-sum-between-date', dateRange)
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getTodayNewUsersAsync(): Promise<number> {
    return httpClient.post('users/get-new-users-today').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getSumOfPurchaseOrdersBetweenDate(dateRange: DateStartEnd): Promise<number> {
    return httpClient
      .post('purchase/get-sum-between-date', dateRange)
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getAllAppointmentsToday(): Promise<Appointment[]> {
    return httpClient
      .post('appointments/get-appointments-today')
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  resetPassword(passwordData: ResetPassword): Promise<void> {
    return httpClient.post('auth/change-password', passwordData);
  }
  getAllProducts(): Promise<Product[]> {
    return httpClient.post('products/get-all-products').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getReportDataByYear(year: number): Promise<ChartReportInterface[]> {
    return httpClient
      .post('summaries/get-summaries-yearly', { year })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getItemsByOrderId(purchaseOrderId: string): Promise<PurchaseItem[]> {
    return httpClient
      .post('purchase/get-items-by-orderId', { purchaseOrderId })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  getReportsList(): Promise<ReportPropertiesToView[]> {
    return httpClient.post('reports/get-report-list').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getReportsData(
    reportParameters: ReportPropertiesToView
  ): Promise<ReportInterface> {
    return httpClient
      .post('reports/get-report-data', reportParameters)
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  addPurchaseItem(purchaseItem: PurchaseItem): Promise<PurchaseItem> {
    return httpClient
      .post('purchase/add-purchase-item', purchaseItem)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  updatePurchaseItem(purchaseItem: PurchaseItem): Promise<PurchaseItem> {
    return httpClient
      .post('purchase/update-purchase-item', purchaseItem)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  deletePurchaseItem(purchaseItem: PurchaseItem): Promise<void> {
    return httpClient.post('purchase/delete-purchase-item', purchaseItem);
  }
  checkEmailNotExist(email: string): Promise<boolean> {
    return httpClient
      .post('auth/check-email', { email: email.toLowerCase() })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
}
export const apiService = new ApiService();
