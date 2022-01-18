import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { Treatment, TreatmentsStateInterface } from './models';

const getters: GetterTree<TreatmentsStateInterface, MainStateInterface> = {
  [AppConstants.Treatments.GetTreatments]: (state): Treatment[] => {
    return state.treatments;
  },
};
export default getters;
