export interface ReportStateInterface {
  reportProperties: ReportInterface;
}
export interface ReportPropertiesToView {
  _id: string;
  title: string;
  description: string;
  letter: string;
  year: number;
}
export interface ReportInterface {
  letter: string;
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdDate: string;
  columns: Array<Column>;
  visibleColumns: Array<string>;
  rows: Array<any>;
}
export interface Column {
  name: string;
  label: any;
  align: string;
  field: string;
  format: string;
  sortable: boolean;
  required: boolean;
}
