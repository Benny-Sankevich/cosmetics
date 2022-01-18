import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { ReportInterface, ReportStateInterface } from './models';

const mutation: MutationTree<ReportStateInterface> = {
  [AppConstants.Report.MutationSetReportProperties]: (
    state,
    payload: ReportInterface
  ): void => {
    state.reportProperties = payload;
  },
};

export default mutation;
