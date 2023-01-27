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
  fromTime: DateRange;
  toTime: DateRange;
}

export interface DateRange {
  year: number;
  month: number;
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

export interface ColorInterface {
  _id: string;
  color: string;
}

export class AppointmentAvailable {
  _id: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  createdDate: Date;
}

export class Range {
  duration: number;
  date: Date;
  timeStart: string;
  timeEnd: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IMarkerOptions {
  position: ILocation;
  label: string;
}

export class Task {
  constructor() {
    this.id = '';
    this.message = '';
    this.title = '';
    this.isCompleted = false;
  }
  id: string;
  title: string;
  message: string;
  createdDate: string;
  lastModified: string;
  isCompleted: boolean;
}

export class Tasks {
  tasks!: Task[];
}
