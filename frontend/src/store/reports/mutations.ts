import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { ReportInterface, ReportStateInterface } from './models';

const mutation: MutationTree<ReportStateInterface> = {
  [AppConstants.Report.MutationSetReportProperties]: (
    state,
    payload: ReportInterface
  ) => {
    state.reportProperties = payload;
  },
};

export default mutation;
