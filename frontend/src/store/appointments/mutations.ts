import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { AppointmentStateInterface, Appointment } from './models';

const mutation: MutationTree<AppointmentStateInterface> = {
  [AppConstants.Appointment.MutationSetAppointments]: (
    state,
    payload: Appointment[]
  ): void => {
    state.appointments = payload;
  },

  [AppConstants.Appointment.MutationSaveAppointment]: (
    state,
    payload: Appointment
  ): void => {
    state.appointments.unshift(payload);
  },
  [AppConstants.Appointment.MutationUpdateAppointment]: (
    state,
    payload: Appointment
  ): void => {
    const indexToUpdate = state.appointments.findIndex(
      (x) => x._id === payload._id
    );
    state.appointments[indexToUpdate] = payload;
  },
  [AppConstants.Appointment.MutationDeleteAppointment]: (
    state,
    payload: string
  ): void => {
    const IndexToDelete = state.appointments.findIndex(
      (x) => x._id === payload
    );
    state.appointments.splice(IndexToDelete, 1);
  },
  [AppConstants.Appointment.MutationSetAwaitingAppointments]: (
    state,
    payload: Appointment[]
  ): void => {
    state.awaitingApproval = payload;
  },
  [AppConstants.Appointment.MutationRemoveAwaitingAppointments]: (
    state,
    payload: Appointment[]
  ): void => {
    for (const item of payload) {
      const IndexToDelete = state.awaitingApproval.findIndex(
        (x) => x._id === item._id
      );
      state.awaitingApproval.splice(IndexToDelete, 1);
    }
  },
};

export default mutation;
