import { AppConstants } from '../../core/Export';
import { appStore, MainStateInterface } from '../../store/index';

import { Store } from 'vuex';

function resolveCalendar() {
  const appointmentsPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.AppointmentModule}/${AppConstants.Appointment.ActionLoadAppointments}`
  );
  const usersPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.UsersModule}/${AppConstants.Users.ActionLoadUsers}`
  );

  return Promise.all([appointmentsPromise, usersPromise]);
}

export default resolveCalendar;
