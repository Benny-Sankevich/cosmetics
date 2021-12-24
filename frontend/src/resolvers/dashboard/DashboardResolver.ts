import { AppConstants } from 'src/core/Export';
import { appStore, MainStateInterface } from '../../store/index';
import { Store } from 'vuex';

function resolveDashboard() {
  const awaitingAppointmentsPromise = (
    appStore as Store<MainStateInterface>
  ).dispatch(
    `${AppConstants.AppointmentModule}/${AppConstants.Appointment.ActionLoadAwaitingAppointments}`
  );
  const treatmentsPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.TreatmentModule}/${AppConstants.Treatments.ActionLoadTreatments}`
  );
  const translationsPromise = (appStore as Store<MainStateInterface>).dispatch(
    `${AppConstants.UiModule}/${AppConstants.Ui.ActionLoadTranslations}`
  );

  return Promise.all([
    awaitingAppointmentsPromise,
    treatmentsPromise,
    translationsPromise,
  ]);
}

export default resolveDashboard;
