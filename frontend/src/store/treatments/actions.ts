import { AppConstants } from '../../core/Export';
import { MainStateInterface } from './../index';
import { Treatment, TreatmentsStateInterface } from './models';
import { ActionTree } from 'vuex';
import { httpClient } from '../../utils/http-client';

const actions: ActionTree<TreatmentsStateInterface, MainStateInterface> = {
  [AppConstants.Treatments.ActionLoadTreatments]: (
    context
  ): Promise<void | Treatment[]> => {
    return httpClient.post('treatments/get-treatments').then((response) => {
      if (response.status.toString() === '200') {
        context.commit(
          AppConstants.Treatments.MutationSetTreatments,
          response.data as Treatment[]
        );
      }
    });
  },

  [AppConstants.Treatments.ActionSaveTreatment]: (
    context,
    payload: Treatment
  ): Promise<void | Treatment> => {
    return httpClient
      .post('treatments/add-treatment', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Treatments.MutationSaveTreatment,
            response.data as Treatment
          );
        }
      });
  },

  [AppConstants.Treatments.ActionEditTreatment]: (
    context,
    payload: Treatment
  ): Promise<void | Treatment> => {
    return httpClient
      .post('treatments/update-treatment', payload)
      .then((response) => {
        if (response.status.toString() === '201') {
          context.commit(
            AppConstants.Treatments.MutationUpdateTreatment,
            response.data as Treatment
          );
        }
      });
  },

  [AppConstants.Treatments.ActionDeleteTreatment]: (
    context,
    payload: string
  ): Promise<void | Treatment> => {
    return httpClient
      .post('treatments/delete-treatment', payload)
      .then((response) => {
        if (response.status.toString() === '204') {
          context.commit(
            AppConstants.Treatments.MutationDeleteTreatment,
            payload
          );
        }
      });
  },
};

export default actions;
