export interface AppointmentStateInterface {
  appointments: Appointment[];
  awaitingApproval: Appointment[];
}

export class Appointment {
  _id: string;
  userId: string;
  treatmentId: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  price: string;
  isConfirmed: boolean;
  allDay: boolean;
  note: string;
  bgColor: string;
  user: User;
}
export interface User {
  firstName: string;
  lastName: string;
}
