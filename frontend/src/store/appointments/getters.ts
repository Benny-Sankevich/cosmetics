import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { Appointment, AppointmentStateInterface } from './models';

const getters: GetterTree<AppointmentStateInterface, MainStateInterface> = {
  [AppConstants.Appointment.GetAppointments]: (state): Appointment[] => {
    return state.appointments;
  },
  [AppConstants.Appointment.GetAwaitingAppointments]: (
    state
  ): Appointment[] => {
    return state.awaitingApproval;
  },
};
export default getters;
