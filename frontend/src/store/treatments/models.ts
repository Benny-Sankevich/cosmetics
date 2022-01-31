export interface TreatmentsStateInterface {
  treatments: Treatment[];
}
export class Treatment {
  _id: string;
  name: string;
  price: number;
  duration: string;
  bgColor: string;
  backgroundColor: string;
  isForReportsAndCustomers: boolean;
}
