import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { TreatmentsStateInterface, Treatment } from './models';

const mutation: MutationTree<TreatmentsStateInterface> = {
  [AppConstants.Treatments.MutationSetTreatments]: (
    state,
    payload: Treatment[]
  ): void => {
    state.treatments = payload;
  },
  [AppConstants.Treatments.MutationSaveTreatment]: (
    state,
    payload: Treatment
  ): void => {
    state.treatments.push(payload);
  },
  [AppConstants.Treatments.MutationUpdateTreatment]: (
    state,
    payload: Treatment
  ): void => {
    const indexToUpdate = state.treatments.findIndex(
      (x) => x._id === payload._id
    );
    state.treatments[indexToUpdate] = payload;
  },
  [AppConstants.Treatments.MutationDeleteTreatment]: (
    state,
    payload: string
  ): void => {
    const IndexToDelete = state.treatments.findIndex((x) => x._id === payload);
    state.treatments.splice(IndexToDelete, 1);
  },
};

export default mutation;
