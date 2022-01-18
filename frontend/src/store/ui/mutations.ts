import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';
import { TranslationInterface, UIStateInterface } from './models';

const mutation: MutationTree<UIStateInterface> = {
  [AppConstants.Ui.MutationSetIsFormDirty]: (state, payload: boolean): void => {
    state.isDirty = payload;
  },

  [AppConstants.Ui.MutationAddPendingRequest]: (
    state,
    payload: string
  ): void => {
    state.pendingHttpRequests.push(payload);
  },

  [AppConstants.Ui.MutationRemovePendingRequest]: (
    state,
    payload: string
  ): void => {
    const index = state.pendingHttpRequests.findIndex((x) => x === payload);
    if (index > -1) {
      state.pendingHttpRequests.splice(index, 1);
    }
  },

  [AppConstants.Ui.MutationSetTranslations]: (
    state,
    allTranslations: TranslationInterface[]
  ): void => {
    state.allTranslations = allTranslations;
  },

  [AppConstants.Ui.MutationSetRouteParamId]: (state, payload: string): void => {
    state.routeParamId = payload;
  },

  [AppConstants.Ui.MutationSetUserLangCode]: (state, payload: string): void => {
    state.userLangCode = payload;
  },
};

export default mutation;
