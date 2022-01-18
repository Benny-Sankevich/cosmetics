import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '../index';
import { UIStateInterface } from './models';

const getters: GetterTree<UIStateInterface, MainStateInterface> = {
  [AppConstants.Ui.GetIsFormDirty]: (state): boolean => {
    return state.isDirty;
  },

  [AppConstants.Ui.GetPendingRequestsCount]: (state): number => {
    return state.pendingHttpRequests.length;
  },

  [AppConstants.Ui.GetAllTranslations]: (state): any => {
    return state.allTranslations.reduce(
      (prevValue, translation) => ({
        ...prevValue,
        [translation.code]: translation.value,
      }),
      {}
    );
  },

  [AppConstants.Ui.GetRouteParamId]: (state): string => {
    return state.routeParamId;
  },

  [AppConstants.Ui.GetUserLangCode]: (state): string => {
    return state.userLangCode;
  },
};

export default getters;
