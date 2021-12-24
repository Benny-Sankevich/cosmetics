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

export interface PurchaseItem {
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
