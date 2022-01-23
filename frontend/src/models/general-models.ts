export interface YearReportData {
  type: string;
  label: string;
  treatmentId: string;
  data: [];
  borderWidth: number;
  backgroundColor: string;
  stack: string;
}

export interface DateStartEnd {
  fromTime: string;
  toTime: string;
}

export class ResetPassword {
  email: string;
  password: string;
  oldPassword: string;
}

export interface PurchaseItemInterface {
  _id: string;
  purchaseOrderId: string;
  productId: string;
  amount: number;
  price: number;
  totalPrice: number;
  createdDate: string;
  isActive: boolean;
  product: Product;
}

export interface Product {
  _id: string;
  name: string;
  createdDate: string;
  isActive: boolean;
}

export interface RouteMetaInterface {
  resolve(): Promise<any>;
}

export interface ChartReportInterface {
  type: string;
  label: string;
  treatmentId: string;
  data: Array<number>;
  borderWidth: number;
  backgroundColor: string;
  stack: string;
}

export interface CustomerListInterface {
  icon: string;
  label: string;
  field: any;
  textColor: string;
  type: any;
}

export interface SizeInterface {
  width: string;
  height: string;
}

export class CalendarEventInterface {
  _id: string;
  userId: string;
  treatmentId: string;
  name: string;
  firstName: string;
  lastName: string;
  start: string;
  end: string;
  startTime: string;
  endTime: string;
  bgcolor: string;
  email: string;
  phoneNumber: string;
  allDay: boolean;
  isConfirmed: boolean;
  note: string;
}
