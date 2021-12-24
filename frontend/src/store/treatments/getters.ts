import { AppConstants } from 'src/core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { TreatmentsStateInterface } from './models';

const getters: GetterTree<TreatmentsStateInterface, MainStateInterface> = {
  [AppConstants.Treatments.GetTreatments]: (state) => {
    return state.treatments;
  },
};
export default getters;
