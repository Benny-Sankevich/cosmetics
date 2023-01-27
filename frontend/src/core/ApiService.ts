import { Task } from './../models/general-models';
import { Treatment } from './../store/treatments/models';
import { httpClient } from '../utils/http-client';
import {
  ChartReportInterface,
  DateStartEnd,
  ResetPassword,
  Product,
  ColorInterface,
  AppointmentAvailable,
  Range,
} from '../models/general-models';
import { PurchaseItem } from '../store/purchase/models';
import { Appointment } from '../store/appointments/models';
import {
  ReportInterface,
  ReportPropertiesToView,
} from '../store/reports/models';

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
  getColors(): Promise<ColorInterface[]> {
    return httpClient.post('general/get-colors').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }
  getAllAppointmentsAvailable(): Promise<AppointmentAvailable[]> {
    return httpClient
      .post('appointments/get-all-appointments-available')
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
  addAppointmentsAvailable(
    appointmentsAvailable: AppointmentAvailable
  ): Promise<AppointmentAvailable> {
    return httpClient
      .post('appointments/add-appointment-available', appointmentsAvailable)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  addAppointmentsAvailableByRange(
    range: Range
  ): Promise<AppointmentAvailable[]> {
    return httpClient
      .post('appointments/add-appointments-available-by-range', range)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  updateAppointmentsAvailable(
    appointmentsAvailable: AppointmentAvailable
  ): Promise<AppointmentAvailable> {
    return httpClient
      .post('appointments/update-appointment-available', appointmentsAvailable)
      .then((response) => {
        if (response.status.toString() === '201') {
          return response.data;
        }
      });
  }
  deleteAppointmentsAvailable(
    appointmentsAvailable: AppointmentAvailable
  ): Promise<void> {
    return httpClient.post(
      'appointments/delete-appointment-available',
      appointmentsAvailable
    );
  }
  getAppointmentsByUser(userId: string): Promise<Appointment[]> {
    return httpClient
      .post('appointments/get-appointments-by-user', { userId })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }

  getCustomersTreatments(): Promise<Treatment[]> {
    return httpClient
      .post('treatments/get-customers-treatments')
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }

  getAllTasks(): Promise<Task[]> {
    return httpClient.post('tasks/get-all-tasks').then((response) => {
      if (response.status.toString() === '200') {
        return response.data;
      }
    });
  }

  addTask(task: Task): Promise<Task> {
    return httpClient.post('tasks/add-task', task).then((response) => {
      if (response.status.toString() === '201') {
        return response.data;
      }
    });
  }

  updateTask(task: Task): Promise<Task> {
    return httpClient.post('tasks/update-task', task).then((response) => {
      if (response.status.toString() === '201') {
        return response.data;
      }
    });
  }

  deleteTask(task: Task): Promise<void> {
    return httpClient.post('tasks/delete-task', task);
  }

  getMonthlyAppointments(date: Date): Promise<Appointment[]> {
    return httpClient
      .post('appointments/get-monthly-appointments', { date })
      .then((response) => {
        if (response.status.toString() === '200') {
          return response.data;
        }
      });
  }
}
export const apiService = new ApiService();
