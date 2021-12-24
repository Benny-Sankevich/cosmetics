import { AppConstants } from 'src/core/Export';
import { MainStateInterface } from './../index';
import { Appointment, AppointmentStateInterface } from './models';
import { ActionTree } from 'vuex';
import { httpClient } from 'src/utils/http-client';

const actions: ActionTree<AppointmentStateInterface, MainStateInterface> = {
  [AppConstants.Appointment.ActionLoadAppointments]: (context) => {
    return httpClient.post('appointments/get-appointments').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Appointment.MutationSetAppointments,
          response.data as Appointment[]
        );
      }
    });
  },
  [AppConstants.Appointment.ActionSaveAppointment]: (
    context,
    payload: Appointment
  ) => {
    return httpClient
      .post('appointments/add-appointment', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Appointment.MutationSaveAppointment,
            response.data as Appointment
          );
        }
      });
  },

  [AppConstants.Appointment.ActionEditAppointment]: (context, payload: Appointment) => {
    return httpClient
      .post('appointments/update-appointment', payload)
      .then((response) => {        
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Appointment.MutationUpdateAppointment,
            response.data as Appointment
          );
        }
      });
  },

  [AppConstants.Appointment.ActionDeleteAppointment]: (context, payload: string) => {
    return httpClient
      .post('appointments/delete-appointment', payload)
      .then((response) => {
        if (response.status.toString() === '204') {
          context.commit(AppConstants.Appointment.MutationDeleteAppointment, payload);
        }
      });
  },
  [AppConstants.Appointment.ActionLoadAwaitingAppointments]: (context) => {
    return httpClient.post('appointments/get-appointments-awaiting-approval').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Appointment.MutationSetAwaitingAppointments,
          response.data as Appointment[]
        );
      }
    });
  },
  [AppConstants.Appointment.ActionApproveAwaitingAppointments]: (context, payload: Appointment[]) => {
    return httpClient
      .post('appointments/approve-appointments', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Appointment.MutationRemoveAwaitingAppointments,
            response.data as Appointment[]
          );
        }
      });
  },
};

export default actions;
