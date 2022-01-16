import { AppConstants } from '../../core/Export';
import { MainStateInterface } from '../../store';
import { GetterTree } from 'vuex';
import { ReportStateInterface } from './models';

const getters: GetterTree<ReportStateInterface, MainStateInterface> = {
  [AppConstants.Report.GetReportProperties]: (state) => {
    return state.reportProperties;
  },
};
export default getters;
