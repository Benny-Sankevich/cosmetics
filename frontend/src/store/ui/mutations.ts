import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { TranslationInterface, UIStateInterface } from './models';

const mutation: MutationTree<UIStateInterface> = {
  [AppConstants.Ui.MutationSetIsFormDirty]: (state, payload: boolean) => {
    state.isDirty = payload;
  },

  [AppConstants.Ui.MutationAddPendingRequest]: (state, payload: string) => {
    state.pendingHttpRequests.push(payload);
  },

  [AppConstants.Ui.MutationRemovePendingRequest]: (state, payload: string) => {
    const index = state.pendingHttpRequests.findIndex((x) => x === payload);
    if (index > -1) {
      state.pendingHttpRequests.splice(index, 1);
    }
  },

  [AppConstants.Ui.MutationSetTranslations]: (
    state,
    allTranslations: TranslationInterface[]
  ) => {
    state.allTranslations = allTranslations;
  },

  [AppConstants.Ui.MutationSetRouteParamId]: (state, payload: string) => {
    state.routeParamId = payload;
  },

  [AppConstants.Ui.MutationSetUserLangCode]: (state, payload: string) => {
    state.userLangCode = payload;
  },
};

export default mutation;
