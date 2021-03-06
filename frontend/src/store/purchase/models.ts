export interface PurchaseStateInterface {
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  purchaseOrderToEdit: PurchaseOrder;
}

export class Supplier {
  _id: string;
  companyName: string;
  contact: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export class PurchaseOrder {
  constructor() {
    this.supplierId = null;
    this.orderDate = null;
  }
  _id: string;
  isConfirmed: boolean;
  supplierId: string;
  orderDate: Date;
  orderNumber: string;
  supplier: Supplier;
}

export class PurchaseItem {
  _id: string;
  purchaseOrderId: string;
  productId: string;
  price: number;
  amount: number;
  totalPrice: number;
}
