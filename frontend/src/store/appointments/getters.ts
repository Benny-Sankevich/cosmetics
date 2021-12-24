import { AppConstants } from 'src/core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { AppointmentStateInterface } from './models';

const getters: GetterTree<AppointmentStateInterface, MainStateInterface> = {
  [AppConstants.Appointment.GetAppointments]: (state) => {
    return state.appointments;
  },
  [AppConstants.Appointment.GetAwaitingAppointments]: (state) => {
    return state.awaitingApproval;
  },
};
export default getters;
